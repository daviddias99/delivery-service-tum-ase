package com.ase.boxservice.dto;

import com.ase.boxservice.entity.BoxAddress;
import com.ase.boxservice.entity.BoxStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoxDto {

    private String id;

    private String name;

    private BoxStatus status;

    private BoxAddress address;

}
