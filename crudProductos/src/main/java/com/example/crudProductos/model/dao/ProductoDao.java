package com.example.crudProductos.model.dao;

import com.example.crudProductos.model.entity.Producto;
import org.springframework.data.repository.CrudRepository;

public interface ProductoDao extends CrudRepository<Producto,Integer> {
}
