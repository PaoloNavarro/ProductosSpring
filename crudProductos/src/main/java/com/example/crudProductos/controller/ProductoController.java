package com.example.crudProductos.controller;

import com.example.crudProductos.model.dto.ProductoDto;
import com.example.crudProductos.model.entity.Producto;
import com.example.crudProductos.service.IProducto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.std.ec.model.payload.MensajeResponse;

import java.util.List;


@RestController
@RequestMapping("/api/v1")

public class ProductoController {

    @Autowired
    private IProducto productoService;



    @GetMapping("productos")
    public ResponseEntity<?> showAll() {
        List<Producto> getList = productoService.listAlll();
        if (getList == null) {
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mnesaje("No hay registros")
                            .object(null)
                            .build()
                    , HttpStatus.OK);
        }

        return new ResponseEntity<>(
                MensajeResponse.builder()
                        .mnesaje("")
                        .object(getList)
                        .build()
                , HttpStatus.OK);
    }

    @PostMapping("producto")
    public ResponseEntity<?> create (@RequestBody ProductoDto productoDto){
        Producto productosave = null;
        try {

            productosave = productoService.save(productoDto);
            return new ResponseEntity<>(com.std.ec.model.payload.MensajeResponse.builder()
                    .mnesaje("Guardado correctamente")
                    .object(productoDto.builder()
                            .id(productosave.getId())
                            .nombre(productosave.getNombre() )
                            .descripcion(productosave.getDescripcion())
                            .imge(productosave.getImge())
                            .precio(productosave.getPrecio())
                            .cantidad(productosave.getCantidad())
                            .build())
                    .build()
                    , HttpStatus.CREATED);
        } catch (DataAccessException exDt) {
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mnesaje(exDt.getMessage())
                            .object(null)
                            .build()
                    , HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @PutMapping("producto/{id}")
    public ResponseEntity<?>  update(@RequestBody ProductoDto productoDto, @PathVariable Integer id){
        Producto productoUpdate = null;
        try {
            if (productoService.existsById(id)) {
                productoDto.setId(id);
                productoUpdate = productoService.save(productoDto);
                return new ResponseEntity<>(MensajeResponse.builder()
                        .mnesaje("Guardado correctamente")
                        .object(productoDto.builder()
                                .id(productoUpdate.getId())
                                .nombre(productoUpdate.getNombre())
                                .descripcion(productoUpdate.getDescripcion())
                                .precio(productoUpdate.getPrecio())
                                .cantidad(productoUpdate.getCantidad())
                                .imge(productoUpdate.getImge())
                                .build())
                        .build()
                        , HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(
                        MensajeResponse.builder()
                                .mnesaje("El registro que intenta actualizar no se encuentra en la base de datos.")
                                .object(null)
                                .build()
                        , HttpStatus.NOT_FOUND);
            }
        } catch (DataAccessException exDt) {
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mnesaje(exDt.getMessage())
                            .object(null)
                            .build()
                    , HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @DeleteMapping("producto/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id){
        try {
            Producto productoDelete = productoService.findbyid(id);
            productoService.delete(productoDelete);
            return new ResponseEntity<>(productoDelete, HttpStatus.NO_CONTENT);
        }catch (DataAccessException exDt) {
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mnesaje(exDt.getMessage())
                            .object(null)
                            .build()
                    , HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @GetMapping("producto/{id}")
    public ResponseEntity<?> showById(@PathVariable Integer id) {
        Producto producto = productoService.findbyid(id);

        if (producto == null) {
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mnesaje("El registro que intenta buscar, no existe!!")
                            .object(null)
                            .build()
                    , HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(
                MensajeResponse.builder()
                        .mnesaje("")
                        .object(ProductoDto.builder()
                                .id(producto.getId())
                                .nombre(producto.getNombre())
                                .descripcion(producto.getDescripcion())
                                .precio(producto.getPrecio())
                                .cantidad(producto.getCantidad())
                                .imge(producto.getImge())
                                .build())
                        .build()
                , HttpStatus.OK);
    }
}
