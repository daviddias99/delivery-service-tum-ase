package com.ase.authservice.service.serviceimpl;

import com.ase.authservice.entity.User;
import com.ase.authservice.jwt.JwtUtil;
import com.ase.authservice.repository.UserRepository;
import com.ase.authservice.service.AuthService;
import com.ase.client.com.ase.contract.UserDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import javax.servlet.http.HttpServletRequest;
import java.util.Base64;

@Component
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found!");
        }

        org.springframework.security.core.userdetails.User springUser =
                new org.springframework.security.core.userdetails.User(
                        user.getUsername(),
                        user.getPassword(),
                        //TODO: Setup role authorities
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



    public ResponseEntity<String> authenticateUser(String authorization,
                                                   HttpServletRequest request) throws Exception {

        // decodes request header and splits into username/pw
        String headerString = authorization.substring("Basic".length()).trim();
        String decoded = new String(Base64.getDecoder().decode(headerString));
        String username = decoded.split(":", 2)[0];
        String password = decoded.split(":", 2)[1];

        // get user by given username
        UserDetails user = loadUserByUsername(username);
        if (user == null) {
            throw new BadCredentialsException("1000");
        }

        // authenticate using authManager and token of username and password
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user, password, user.getAuthorities());
        Authentication auth = null;

        try{
            auth = authManager.authenticate(token);
            SecurityContextHolder.getContext().setAuthentication(auth);
            final String jwt = jwtUtil.generateToken(user);

            return new ResponseEntity<>(jwt, HttpStatus.OK);
        } catch (BadCredentialsException e){
            e.printStackTrace();
            return new ResponseEntity<>("Email or password is incorrect", HttpStatus.BAD_REQUEST);
        } catch (Exception ex){
            ex.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
