package com.ase.userservice.repository;

import com.ase.userservice.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepository extends MongoRepository<User,String> {


    User findByEmail(String email);
    User findById(ObjectId id);
    User findByUsername(String username);
    User findByRfId(String rfId);

    List<User> findAllByRole(String role);

    Boolean existsById(ObjectId id);



    Boolean existsByUsername(String username);

    Boolean existsByRfId(String rfId);

    Boolean existsByEmail(String email);

}
