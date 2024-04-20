package com.example.crudProductos.model.dto;

import jakarta.persistence.Column;
import lombok.*;

import java.io.Serializable;

@Data
@ToString
@Builder
public class ProductoDto implements Serializable {

    private Integer id;
    private String nombre;
    private String descripcion;
    private double precio;
    private int cantidad;
    private String imge;


}
