package com.ase.userservice.repository;

import com.ase.userservice.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends MongoRepository<User,String> {


    User findByEmail(String email);
    User findById(ObjectId id);
    User findByUsername(String username);

    public Boolean existsById(ObjectId id);

}
