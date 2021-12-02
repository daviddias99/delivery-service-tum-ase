package com.ase.userservice.repository;

import com.ase.userservice.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends MongoRepository<User,String> {


    User findByEmail(String email);

    User getById(String id);

    User findByUsername(String username);
}
