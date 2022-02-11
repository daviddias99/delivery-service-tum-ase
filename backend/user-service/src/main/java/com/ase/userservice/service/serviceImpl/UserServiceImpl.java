package com.ase.userservice.service.serviceImpl;

import com.ase.client.BoxServiceClient;
import com.ase.client.DeliveryServiceClient;
import com.ase.client.com.ase.contract.ResponseMessage;
import com.ase.userservice.dto.RegistrationDto;
import com.ase.userservice.entity.User;
import com.ase.userservice.repository.UserRepository;
import com.ase.userservice.service.UserService;
import com.ase.client.com.ase.contract.UserDto;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Slf4j
@Service(value = "userService")
public class UserServiceImpl implements UserService {

  @Autowired private UserRepository userRepository;
  @Autowired private ModelMapper modelMapper;
  @Autowired private DeliveryServiceClient deliveryServiceClient;

  private final String service_cookie = "jwt=eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6W3sicm9sZSI6IlJPTEVfQk9YIn1dLCJzdWIiOiJCT1giLCJpc3MiOiJhc2VEZWxpdmVyeSIsImlhdCI6MTY0MjAwNTE2OCwiZXhwIjo0MDcyMzUxMjQxfQ.UHdagX4q4DD-3rZd9XoDChRZ926iN0WSqibuXZqI4B3TS5T1PT_Vz1UN_UzpQFxTDWd1Cze7Kj67veeWWA4ZOyHY14At_IHVdcVZqZF2ezxwrKXNKOeHZB7_gFtHqc27uscjf6CbckpCcgnML9r857BMNlOO3kf--Tz1pyYlK-jJzz6sj_sSW1RNln6MZmi6_K59vZryemvFkth4cukKzUkwsNzOu6H2nJtY0Cqhqp5OPKf1QOEKRUgE_aX6EBVf8598aFp3YNoUU9y8HravhiMKV1Y9jDt89sIn_Mf86wpAAnk-zkRAeWdPLvHQRNwRarGWYkBrZb9qZcdCz-AJ1g";

  @Override
  public UserDto getById(String id){

    if (!userRepository.existsById(new ObjectId(id)).booleanValue()){
      log.warn("user can't be found");
      return null;
    }

    User tempUser = userRepository.findById(new ObjectId(id));

    return modelMapper.map(tempUser, UserDto.class);
  }


  @Override
  public UserDto getByIdandCheckRole(String id,String role) {

    if (!userRepository.existsById(new ObjectId(id)).booleanValue()) return null;

    User tempUser = userRepository.findById(new ObjectId(id));

    if (tempUser == null) {
      log.warn("user can't be found");
      return null;
    }

    if(!tempUser.getRole().equals(role)){
      log.warn("wrong role:"+tempUser.getRole()+":->"+role);
      return null;
    }


    return modelMapper.map(tempUser, UserDto.class);
  }


  @Override
  public UserDto getByRfid(String rfId) {
    if (!userRepository.existsByRfId(rfId).booleanValue()) {
      log.warn("user can't be found with the rfid " + rfId);
      return null;
    }

    User tempUser = userRepository.findByRfId(rfId);

    return modelMapper.map(tempUser, UserDto.class);
  }

  @Override
  public List<UserDto> getAll() {
    List<User> data = userRepository.findAll().stream().filter(p -> !p.getRfId().equals("deleted")).collect(Collectors.toList());
    return Arrays.asList(modelMapper.map(data, UserDto[].class));
  }

  @Override
  public Boolean deleteUser(String id) {
    if (!userRepository.existsById(new ObjectId(id)))
      return false;

    UserDto userDto = getById(id);
    if(userDto.getRole().equals("CUSTOMER")){

      Boolean hasPendingDelivery = deliveryServiceClient.hasPendingDelivery(service_cookie, id).getBody();

      if(hasPendingDelivery)
        return false;
    }

    if(userDto.getRole().equals("DELIVERER")){

      Boolean hasActiveDeliveries = deliveryServiceClient.hasDelivererActiveDeliveries(service_cookie, id).getBody();

      if(hasActiveDeliveries)
        return false;
    }



      userDto.setEmail("deleted");
      userDto.setRfId("deleted");
      userDto.setFirstName("deleted");
      userDto.setSurname("deleted");
      UserDto userUpdated = updateUser(userDto,id);
      if(userUpdated!=null)
        return true;

    return false;




  }

  @Override
  @Transactional
  public ResponseMessage save(RegistrationDto registrationDto, String role, String cookie) {
    log.warn("UserService: save method is on");
    ResponseMessage saveResp = new ResponseMessage();
    registrationDto.setEmail(registrationDto.getEmail().toLowerCase());

    if (userRepository.existsByEmail(registrationDto.getEmail()).booleanValue()) {
      saveResp.setResponseType(0);
      saveResp.setResponseMessage("This e-mail already is in use. Please enter a new one");
      return saveResp;
    }

    User tempuser = modelMapper.map(registrationDto, User.class);
    tempuser.setRole(role);

    /*
     * //SAVE BY USING AUTH'S REGISTER METHOD
     * Authentication auth = SecurityContextHolder.getContext().getAuthentication();
     * UserDto userDto = modelMapper.map(registrationDto, UserDto.class);
     * UserDto dbUser = authServiceClient.register(cookie,userDto).getBody();
     * return saveResp;
     */

    try {
      userRepository.save(tempuser);
    } catch (Exception e) {
      saveResp.setResponseType(0);
      saveResp.setResponseMessage("Unexpected problem occured! Please try again layer");
      return saveResp;
    }
    saveResp.setResponseType(1);
    saveResp.setResponseMessage("Successfull registration!");
    return saveResp;
  }

  @Override
  public UserDto updateUser(UserDto tempUser, String id) {
    User dbUser = userRepository.findById(new ObjectId(id));
    if (!dbUser.getEmail().equals(tempUser.getEmail())
        && userRepository
            .existsByEmail(tempUser.getEmail().toLowerCase())
            .booleanValue()) { // check if e-mail
      // is already used
      // by another user
      return null;
    }

    dbUser.setSurname(tempUser.getSurname());
    dbUser.setFirstName(tempUser.getFirstName());
    dbUser.setEmail(tempUser.getEmail().toLowerCase());
    userRepository.save(dbUser);
    return tempUser;
  }

  @Override
  public List<UserDto> getAllByRole(String role) {
    List<User> users = userRepository.findAllByRole(role).stream().filter(p -> !p.getRfId().equals("deleted")).collect(Collectors.toList());
    return Arrays.asList(modelMapper.map(users, UserDto[].class));
  }

  public static String getAlphaNumericString(int n) {

    // length is bounded by 256 Character
    byte[] array = new byte[256];
    new Random().nextBytes(array);

    String randomString = new String(array, Charset.forName("UTF-8"));

    // Create a StringBuffer to store the result
    StringBuffer r = new StringBuffer();

    // remove all spacial char
    String AlphaNumericString = randomString.replaceAll("[^A-Za-z0-9]", "");

    // Append first 20 alphanumeric characters
    // from the generated random String into the result
    for (int k = 0; k < AlphaNumericString.length(); k++) {

      if (Character.isLetter(AlphaNumericString.charAt(k)) && (n > 0)
          || Character.isDigit(AlphaNumericString.charAt(k)) && (n > 0)) {

        r.append(AlphaNumericString.charAt(k));
        n--;
      }
    }

    // return the resultant string
    return r.toString();
  }
}
