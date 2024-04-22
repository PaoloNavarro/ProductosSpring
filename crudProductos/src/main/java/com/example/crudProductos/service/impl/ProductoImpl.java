package com.example.crudProductos.service.impl;

import com.example.crudProductos.model.dao.ProductoDao;
import com.example.crudProductos.model.dto.ProductoDto;
import com.example.crudProductos.model.entity.Producto;
import com.example.crudProductos.service.IProducto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoImpl implements IProducto {
    @Autowired
    private ProductoDao productoDao;

    @Override
    public List<Producto> listAlll() {
        return (List) productoDao.findAll();
    }

    @Transactional
    @Override
    public Producto save(ProductoDto productoDto) {
        Producto producto = Producto.builder()
                .id(productoDto.getId())
                .nombre(productoDto.getNombre())
                .descripcion(productoDto.getDescripcion())
                .precio(productoDto.getPrecio())
                .cantidad(productoDto.getCantidad())
                .imge(productoDto.getImge())
                .build();
        return productoDao.save(producto);
    }
    @Override
    public Producto findbyid(Integer id) {
        return productoDao.findById(id).orElse(null);
    }

    @Transactional
    @Override
    public void delete(Producto producto) {
        productoDao.delete(producto);
    }
    @Override
    public boolean existsById(Integer id) {
        return productoDao.existsById(id);
    }
}
