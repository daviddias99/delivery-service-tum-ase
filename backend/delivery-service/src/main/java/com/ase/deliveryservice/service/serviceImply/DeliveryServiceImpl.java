package com.ase.deliveryservice.service.serviceImply;


import com.ase.client.UserServiceClient;
import com.ase.deliveryservice.dto.DeliveryDto;
import com.ase.deliveryservice.entity.Delivery;
import com.ase.deliveryservice.repository.DeliveryRepository;
import com.ase.deliveryservice.service.DeliveryService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Slf4j
@Service
public class DeliveryServiceImpl  implements DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserServiceClient userServiceClient;



    @Override
    public DeliveryDto save(DeliveryDto deliveryDto) {
        Delivery temptDelivery = modelMapper.map(deliveryDto, Delivery.class);
        temptDelivery = deliveryRepository.save(temptDelivery);
        deliveryDto.setId(temptDelivery.getId());
        return deliveryDto;
    }


}
