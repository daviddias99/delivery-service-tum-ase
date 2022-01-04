package com.ase.boxservice.service;


import com.ase.boxservice.dto.BoxDto;
import java.util.List;

public interface BoxService {

    BoxDto save(BoxDto box);

    BoxDto getById(String id);


    List<BoxDto> getAll();

    Boolean deleteBox(String id);

    BoxDto updateBox(BoxDto boxDto, String id);
}
