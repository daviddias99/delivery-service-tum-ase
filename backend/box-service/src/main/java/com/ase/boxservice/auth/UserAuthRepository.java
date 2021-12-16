package com.ase.boxservice.auth;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserAuthRepository extends MongoRepository<User,String> {


    User findByEmail(String email);
    User findById(ObjectId id);
    User findByUsername(String username);

    public Boolean existsById(ObjectId id);

}
