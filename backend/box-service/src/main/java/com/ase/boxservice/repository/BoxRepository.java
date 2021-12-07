package com.ase.boxservice.repository;

import com.ase.boxservice.entity.Box;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoxRepository extends MongoRepository<Box, String>{

    Box findByAddress(String address);
    Box getById(String id);

}


