"use client"
import React, { useState, useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button, ButtonGroup } from 'primereact/button';  
import { Checkbox } from 'primereact/checkbox';        
import axios from 'axios';
import { useRouter } from "next/navigation";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Tag } from 'primereact/tag';


const ProductTable = () => {
  const router = useRouter();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false); 
  const [products, setProducts] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);

  //use effect para el traer los datos
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get('http://localhost:8092/api/v1/productos');
      setProducts(data.object);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  };

  //eliminar un producto.
  const deleteProduct = async (productId) => {
    try {
      const res = await axios.delete(`http://localhost:8092/api/v1/producto/${productId}`);
      if (res.status === 204) {
        router.refresh();
        setProducts(products.filter(product => product.id !== productId));
        router.push("/productos");
        toast.current.show({ severity: 'info', summary: 'Cofirmado', detail: 'Se ha eliminado el producto con éxito', life: 3000 });

      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      toast.current.show({ severity: 'warn', summary: 'Error', detail: error, life: 3000 });

    }
  };
  //eliminar muchos productos.
  const deleteProducts = async (productId) => {
    try {
      const res = await axios.delete(`http://localhost:8092/api/v1/producto/${productId}`);
      if (res.status === 204) {
     
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      toast.current.show({ severity: 'warn', summary: 'Error', detail: error, life: 3000 });

    }
  };

  const deleteSelectedProducts = () => {
    confirmDialog({
      message: '¿Estás seguro de que quieres eliminar los productos seleccionados?',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => {
        selectedProducts.forEach((product) => {
          deleteProducts(product.id);
          const updatedProducts = products.filter(product => !selectedProducts.some(selected => selected.id === product.id));
          setProducts(updatedProducts);
        });
        setSelectedProducts([]);
        toast.current.show({ severity: 'info', summary: 'Cofirmado', detail: 'Se han eliminado los productos con éxito', life: 5000 });

      },
      reject: () => {
        toast.current.show({ severity: 'warn', summary: 'Rechazado', detail: 'Te has arrepentido de borrar los productos', life: 3000 });
      }
    });
  };

  

  const confirm = (productId) => {
    confirmDialog({
      message: '¿Estás seguro de que quieres eliminar este producto?',
      header: 'Confirmacion de eliminación',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      reject:()=>{
        toast.current.show({ severity: 'warn', summary: 'Rechazado', detail: 'Te has arrepentido de borrar el producto', life: 3000 });
      }
      ,
      accept: () => {
        deleteProduct(productId);
      }
    });
  };

  const editProduct = (productId) => {
    router.replace(`/productos/edit/${productId}`);
  };

  // Template para renderizar la imagen
  const imageBodyTemplate = (rowData) => {
    return (
      <img src={rowData.imge} alt="Product" style={{ width: '50px' }} />
    );
  };

  //botones que se ven la tabla: EDITAR Y BORRAR.
  const actionBodyTemplate = (rowData) => {
    return (
      <div>
        <Button label="Editar" style={{ marginRight: '10px' }} onClick={() => editProduct(rowData.id)} />
        <Button onClick={() => confirm(rowData.id)} label="Eliminar" severity='danger' />
      </div>
    );
  };

  //botones que se ven la tabla: CHECKBOX
  const actionBodyTemplate2 = (rowData) => {
    return (
      <div>
        <Checkbox
          inputId={`checkbox-${rowData.id}`}
          checked={isSelected(rowData)}
          onChange={(e) => handleCheckboxChange(e, rowData)}
        />
      </div>
    );
  };
  const quantityStatusTemplate = (rowData) => {
    let status;
    let severity;
    if (rowData.cantidad === 0) {
      status = 'Sold Out';
      severity = 'warning'; // Cambiar a 'warning' para Sold Out
    } else if (rowData.cantidad <= 10) {
      status = 'Low Stock';
      severity = 'danger'; // Cambiar a 'danger' para Low Stock
    } else {
      status = 'Stock';
      severity = 'success'; // Cambiar a 'success' para Stock
    }
    return (
      <div>
        <span>{rowData.cantidad}</span>
        <span style={{ marginLeft: '5px' }}>
          <Tag severity={severity}>{status}</Tag>
        </span>
      </div>
    );
  };
  
  

    //sabber si esta o no selccionado
    const isSelected = (product) => selectedProducts.some((selected) => selected.id === product.id);

    //fucion para selecciionar un producto
    const handleCheckboxChange = (e, product) => {
      if (e.checked) {
        setSelectedProducts([...selectedProducts, product]);
      } else {
        setSelectedProducts(selectedProducts.filter((selected) => selected.id !== product.id));
      }
    };
   // Función para seleccionar/deseleccionar todos los productos
      const handleSelectAll = (e) => {
        setSelectAll(e.checked);
        if (e.checked) {
          setSelectedProducts([...products]);
        } else {
          setSelectedProducts([]);
        }
      };

  //botones del header de la tabla.
  const header = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Checkbox inputId="selectAllCheckbox" checked={selectAll} onChange={handleSelectAll} />
      <label htmlFor="selectAllCheckbox">Seleccionar Todos</label>
      <Button
        label="Eliminar seleccionados"
        className="p-button-danger"
        style={{ marginLeft: '20px' }}
        disabled={selectedProducts.length === 0}
        onClick={deleteSelectedProducts}
      />
      <div style={{ marginLeft: 'auto' }}>
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar producto"
          style={{ marginRight: '10px' }}
        />
        <i className="pi pi-search mr-2" />
      </div>
    </div>
  );
  
  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />

      <DataTable
        value={products}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 20]}
        globalFilter={globalFilter}
        header={header}
        emptyMessage="No se encontraron productos."
        className='tabla'
      >
        <Column
          body={actionBodyTemplate2}
          header="Acciones"
          style={{ textAlign: 'center', width: '5em'  }}
          className="text-center"
        />
        <Column field="nombre" header="Nombre" sortable filter filterPlaceholder="Buscar por nombre" filterMatchMode="contains" />
        <Column field="precio" header="Precio" sortable filter filterPlaceholder="Buscar por precio" filterMatchMode="equals" />
        <Column
          field="cantidad"
          header="Cantidad / Estatus"
          body={quantityStatusTemplate}
          style={{ textAlign: 'center', width: '12em' }}
          className="text-center"
          sortable filter filterPlaceholder="Buscar por cantidad" filterMatchMode="equals"
        />
        <Column field="descripcion" header="Descripción" sortable filter filterPlaceholder="Buscar por descripción" filterMatchMode="contains" />
        <Column field="imge" header="Imagen" body={imageBodyTemplate} />
     
        <Column
          body={actionBodyTemplate}
          header="Acciones"
          style={{ textAlign: 'center', width: '19em'  }}
          className="text-center"
        />
      </DataTable>
    </>
  );
};

export default ProductTable;
