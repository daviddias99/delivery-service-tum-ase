package com.ase.boxservice.service.serviceImpl;

import com.ase.boxservice.dto.BoxDto;
import com.ase.boxservice.entity.Box;
import com.ase.boxservice.entity.BoxStatus;
import com.ase.boxservice.repository.BoxRepository;
import com.ase.boxservice.service.BoxService;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service(value = "boxService")
public class BoxServiceImpl implements BoxService {
    @Autowired
    private BoxRepository boxRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    @Transactional
    public BoxDto save(BoxDto boxDto) {

        if(boxRepository.existsByName(boxDto.getName()).booleanValue()  || boxDto.getName()==null  || boxDto.getName().equals("")){
            return null;
        }
        Box tempBox = modelMapper.map(boxDto, Box.class);
        tempBox.setStatus(BoxStatus.free);
        tempBox = boxRepository.save(tempBox);
        boxDto.setId(tempBox.getId());
        return boxDto;
    }

    @Override
    public BoxDto getById(String id) {
        if(!boxRepository.existsById(new ObjectId(id)).booleanValue())
            return null;
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
        if(boxRepository.existsById(objectId).booleanValue()) {
            Box dbBox = boxRepository.findById(objectId);
            if (dbBox.getStatus() == BoxStatus.free) {
                dbBox.setStatus(BoxStatus.inactive);
                boxRepository.save(dbBox);
                return true;
            }
        }
        return false;
    }

    @Override
    public BoxDto updateBox(BoxDto boxDto, String id) {

        Box dbBox = boxRepository.findById(new ObjectId(id));

        if(dbBox==null){
            return null;
        }

        dbBox.setName(boxDto.getName());
        dbBox.setAddress(boxDto.getAddress());
        boxRepository.save(dbBox);

        return boxDto;
    }
}
