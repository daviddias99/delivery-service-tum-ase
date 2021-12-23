package com.ase.boxservice.repository;

import com.ase.boxservice.entity.Box;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoxRepository extends MongoRepository<Box, String>{

    Box findByAddress(String address);


    public Box findById(ObjectId id);

    public void deleteById(ObjectId id);

    public Boolean existsById(ObjectId id);

    public Boolean existsByName(String name);

}


