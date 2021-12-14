package com.ase.userservice.service.serviceImpl;


import com.ase.userservice.entity.User;
import com.ase.userservice.repository.UserRepository;
import com.ase.userservice.service.UserService;
import com.ase.client.com.ase.contract.UserDto;
import lombok.extern.slf4j.Slf4j;
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

    @Override
    public UserDto getById(String id) {
        User tempUser = userRepository.getById(id);
        return modelMapper.map(tempUser, UserDto.class);
    }

    @Override
    public List<UserDto> getAll() {
        List<User> data = userRepository.findAll();
        return Arrays.asList(modelMapper.map(data, UserDto[].class));
    }


    @Override
    public Boolean deleteUser(String id) {
        if(userRepository.existsById(id)){
            userRepository.deleteById(id);
            return true;
        }
        else{
            return false;
        }

    }


    @Override
    @Transactional
    public UserDto save(UserDto userDto) {
        User tempUser = modelMapper.map(userDto, User.class);
        tempUser = userRepository.save(tempUser);
        userDto.setId(tempUser.getId());
        return userDto;
    }




    @Override
    public Boolean isEmailExists(String email) {
        if(userRepository.findByEmail(email.toLowerCase())==null){
            return false;
        }
        return true;
    }


    @Override
    public String updateUser(UserDto tempUser,String id){
        User dbUser = userRepository.getById(id);

        if(!dbUser.getEmail().equals(tempUser.getEmail()) ){ //check if e-mail is already used by another user
            if(this.isEmailExists(tempUser.getEmail())){
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
