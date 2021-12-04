package com.ase.authservice.service.serviceimpl;

import com.ase.authservice.entity.User;
import com.ase.authservice.repository.UserRepository;
import com.ase.authservice.service.AuthService;
import com.ase.client.com.ase.contract.UserDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        boolean enabled = true;
        boolean accountNonExpired = true;
        boolean credentialsNonExpired = true;
        boolean accountNonLocked = true;

        org.springframework.security.core.userdetails.User springUser =
                new org.springframework.security.core.userdetails.User(
                        user.getUsername(),
                        user.getPassword(),
                        enabled,
                        accountNonExpired,
                        credentialsNonExpired,
                        accountNonLocked,
                        AuthorityUtils.NO_AUTHORITIES);

        return springUser;
    }

    @Override
    @Transactional
    public UserDto register(UserDto userDto) {
        User tempUser = modelMapper.map(userDto, User.class);
        tempUser = userRepository.save(tempUser);
        userDto.setId(tempUser.getId());
        return userDto;
    }

}
