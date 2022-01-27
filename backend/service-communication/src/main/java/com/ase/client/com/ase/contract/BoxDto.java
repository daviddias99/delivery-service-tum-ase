package com.ase.client.com.ase.contract;


import com.ase.client.entity.BoxAddress;
import com.ase.client.entity.BoxStatus;
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
