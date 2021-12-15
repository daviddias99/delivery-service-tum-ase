package com.ase.boxservice.service.serviceImpl;

import com.ase.boxservice.dto.BoxDto;
import com.ase.boxservice.entity.Box;
import com.ase.boxservice.entity.BoxStatus;
import com.ase.boxservice.repository.BoxRepository;
import com.ase.boxservice.service.BoxService;
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
    public BoxDto save(BoxDto boxDto) {
        Box tempBox = modelMapper.map(boxDto, Box.class);
        tempBox.setStatus(BoxStatus.free);
        tempBox = boxRepository.save(tempBox);
        boxDto.setId(tempBox.getId());
        return boxDto;
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
    public String updateBox(BoxDto boxDto, String id) {


        Box dbBox = boxRepository.findById(new ObjectId(id));

        dbBox.setName(boxDto.getName());
        dbBox.setAddress(boxDto.getAddress());
        dbBox.setStatus(boxDto.getStatus());

        boxRepository.save(dbBox);
        return "updated!";

    }
}
