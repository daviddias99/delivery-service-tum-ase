package com.ase.userservice.service.serviceImpl;

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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Slf4j
@Service(value = "userService")
public class UserServiceImpl implements UserService {

  @Autowired private UserRepository userRepository;
  @Autowired private ModelMapper modelMapper;



  @Override
  public UserDto getById(String id) {

    if (!userRepository.existsById(new ObjectId(id)).booleanValue()) return null;

    User tempUser = userRepository.findById(new ObjectId(id));

    if (tempUser == null) {
      log.warn("user can't be found");
      return null;
    }



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
    List<User> data = userRepository.findAll();
    return Arrays.asList(modelMapper.map(data, UserDto[].class));
  }

  @Override
  public Boolean deleteUser(String id) {
    if (userRepository.existsById(new ObjectId(id)).booleanValue()) {
      userRepository.deleteById(id);
      return true;
    } else {
      return false;
    }
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
    List<User> users = userRepository.findAllByRole(role);
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
