package com.ase.deliveryservice.repository;


import com.ase.deliveryservice.entity.Delivery;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface DeliveryRepository extends MongoRepository<Delivery,String> {




    public Delivery getByTrackingNumber(String trackingNumber);

    public List<Delivery> getAllByDeliverer_Id(String id);

    public List<Delivery> getAllByBox_Id(String id);

    public List<Delivery> getAllByCustomer_Id(String id);

    public Delivery findById(ObjectId id);

    public void deleteById(ObjectId id);

    public Boolean existsById(ObjectId id);

    public Boolean existsByCustomerId(String id);

    public List<Delivery> getByCustomerId(String id);



}

