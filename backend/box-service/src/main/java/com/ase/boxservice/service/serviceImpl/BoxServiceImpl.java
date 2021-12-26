package com.ase.boxservice.service.serviceImpl;

import com.ase.boxservice.dto.BoxDto;
import com.ase.boxservice.entity.Box;
import com.ase.boxservice.entity.BoxStatus;
import com.ase.boxservice.repository.BoxRepository;
import com.ase.boxservice.service.BoxService;
import com.ase.client.com.ase.contract.ResponseMessage;
import feign.Response;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;

@Slf4j
@Service(value = "boxService")
public class BoxServiceImpl implements BoxService {
    @Autowired
    private BoxRepository boxRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    @Transactional
    public ResponseMessage save(BoxDto boxDto) {
        ResponseMessage responseMessage = new ResponseMessage();
        Box tempBox = modelMapper.map(boxDto, Box.class);
        if(boxRepository.existsByName(boxDto.getName())){
            responseMessage.setResponseType(0);
            responseMessage.setResponseMessage("This box name is already in use");
            return responseMessage;
        }
        tempBox.setStatus(BoxStatus.free);
        boxRepository.save(tempBox);
        responseMessage.setResponseType(1);
        responseMessage.setResponseMessage("Successfully created!");
        return responseMessage;
    }

    @Override
    public BoxDto getById(String id) {
        Box tempBox = boxRepository.findById(new ObjectId(id));
        return modelMapper.map(tempBox, BoxDto.class);
    }


    @Override
    public List<BoxDto> getAll() {
        List<Box> data = boxRepository.findAll();
        return Arrays.asList(modelMapper.map(data, BoxDto[].class));
    }

    @Override
    public Boolean deleteBox(String id) {
        ObjectId objectId = new ObjectId(id);
        if(boxRepository.existsById(objectId)){
            Box dbBox = boxRepository.findById(objectId);
            dbBox.setStatus(BoxStatus.inactive);
            boxRepository.save(dbBox);
            return true;
        }
        return false;
    }

    @Override
    public ResponseMessage updateBox(BoxDto boxDto, String id) {

        ResponseMessage responseMessage = new ResponseMessage();

        Box dbBox = boxRepository.findById(new ObjectId(id));

        if(dbBox==null){
            responseMessage.setResponseType(0);
            responseMessage.setResponseMessage("can't find the box in database");
            return responseMessage;
        }

        dbBox.setName(boxDto.getName());
        dbBox.setAddress(boxDto.getAddress());
        dbBox.setStatus(boxDto.getStatus());

        boxRepository.save(dbBox);
        responseMessage.setResponseType(1);
        responseMessage.setResponseMessage("Box is successfully updated!");
        return responseMessage;
    }
}
