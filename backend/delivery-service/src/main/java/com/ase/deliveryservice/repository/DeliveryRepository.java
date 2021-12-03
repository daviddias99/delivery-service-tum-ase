package com.ase.deliveryservice.repository;


import com.ase.deliveryservice.entity.Delivery;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DeliveryRepository extends MongoRepository<Delivery,String> {

    public Delivery findByTrackingId(String trackingId);

    public Delivery getById(String id);

}

