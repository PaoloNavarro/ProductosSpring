package com.example.crudProductos.service;

import com.example.crudProductos.model.dto.ProductoDto;
import com.example.crudProductos.model.entity.Producto;

import java.util.List;

public interface IProducto {

    List<Producto> listAlll();

    Producto save(ProductoDto producto);

    Producto findbyid(Integer id);

    void delete(Producto producto);
    boolean existsById(Integer id);

}
