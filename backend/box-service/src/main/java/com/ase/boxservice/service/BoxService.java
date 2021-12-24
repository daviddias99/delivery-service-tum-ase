package com.ase.boxservice.service;


import com.ase.boxservice.dto.BoxDto;
import com.ase.client.com.ase.contract.ResponseMessage;

import java.util.List;

public interface BoxService {

    ResponseMessage save(BoxDto box);

    BoxDto getById(String id);


    List<BoxDto> getAll();

    Boolean deleteBox(String id);

    ResponseMessage updateBox(BoxDto boxDto, String id);
}
