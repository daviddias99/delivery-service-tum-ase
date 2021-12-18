package com.ase.userservice.service.serviceImpl;


import com.ase.client.AuthServiceClient;
import com.ase.client.com.ase.contract.ResponseMessage;
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

import java.util.Arrays;
import java.util.List;

@Slf4j
@Service(value = "userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AuthServiceClient authServiceClient;

    @Override
    public UserDto getById(String id) {

        User tempUser = userRepository.findById(new ObjectId(id));


        if(tempUser==null){
            log.warn("user can't be found");
            return null;
        }
        return modelMapper.map(tempUser, UserDto.class);
    }

    @Override
    public List<UserDto> getAll() {
        List<User> data = userRepository.findAll();
        return Arrays.asList(modelMapper.map(data, UserDto[].class));
    }


    @Override
    public Boolean deleteUser(String id) {
        if(userRepository.existsById(new ObjectId(id))){
            userRepository.deleteById(id);
            return true;
        }
        else{
            return false;
        }

    }


    @Override
    @Transactional
    public ResponseMessage save(UserDto userDto,String role) {
        log.warn("UserService: save method is on");
        ResponseMessage saveResp = new ResponseMessage();
        userDto.setEmail(userDto.getEmail().toLowerCase());
        if(userRepository.existsByUsername(userDto.getUsername())){
            saveResp.setResponseType(0);
            saveResp.setResponseMessage("This e-mail already is in use. Please enter a new one");
            return saveResp;
        }

        if(userRepository.existsByEmail(userDto.getEmail())){
            saveResp.setResponseType(1);
            saveResp.setResponseMessage("This username already is in use. Please enter a new one");
            return saveResp;

        }
        String token = "Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6W3sicm9sZSI6IlJPTEVfQ1VTVE9NRVIifV0sInN1YiI6InRlc3QxIiwiaXNzIjoiYXNlRGVsaXZlcnkiLCJpYXQiOjE2Mzk3NDYzNzEsImV4cCI6MTYzOTc2NDM3MX0.aMc6GH2WbreY-mfklq4t9Vn99mRbIQ7KZSAsfe6BZCi_5hTY_jwdpp5oP0163r5qDWxh0Tk4SsWGmhzjG6ZEYuJrYatVOTyKImPsZQJYo8lXlnvx70li4bVifr-oI_ixDgHviSlfILUXiJGqC9QPKsWUPELFlS8rQzhqAHoZb8dfm-c1uSJhYBjn498CXK9Ktl3fF_SMf5ArSibZ1p6cKyhR2a0SdMe5RjB-vGjmjQKTuPiohSQ-KJdGDNT4t7UnoldBmKj6WSEFruvYN0Ae4hX3uj5fJtF_YQNZwsIu9JdJIGmd7ilystB5bpVrHxfT8W_mjzeVLBIAg_nGWcmjXQ";
        userDto.setRole(role);
        UserDto dbUser = authServiceClient.register(token,userDto).getBody();

        /*
        try {
            UserDto dbUser = authServiceClient.register(userDto).getBody();
        }
        catch (Exception e){
            log.warn("exception:",e.getStackTrace().);
            log.warn("exception message:",e.getMessage());
            saveResp.setResponseType(0);
            saveResp.setResponseMessage("Unexpected problem occured! Please try again layer");
            return saveResp;
        }
*/
        saveResp.setResponseType(1);
        saveResp.setResponseMessage("Successfull registration!");
        return saveResp;

    }





    @Override
    public String updateUser(UserDto tempUser,String id){
        User dbUser = userRepository.findById(new ObjectId(id));

        if(!dbUser.getEmail().equals(tempUser.getEmail()) ){ //check if e-mail is already used by another user
            if(userRepository.existsByEmail(tempUser.getEmail().toLowerCase())){
                return "This e-mail already is in use. Please enter a new one";
            }
        }

        dbUser.setSurname(tempUser.getSurname());
        dbUser.setFirstName(tempUser.getFirstName());
        dbUser.setEmail(tempUser.getEmail().toLowerCase());
        userRepository.save(dbUser);
        return "updated!";

    }








}
