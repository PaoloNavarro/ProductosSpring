"use client"
import React, { useState, useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button, ButtonGroup } from 'primereact/button';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const ProductTable = ({ products }) => {
  const router = useRouter();
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const [localProducts, setLocalProducts] = useState(products);

  //metodo para borrar
  const deleteProduct = async (productId) => {
    try {
      const res = await axios.delete(`http://localhost:8092/api/v1/producto/${productId}`);
      if (res.status === 204) {
        router.push("/productos");
        router.refresh();
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  
    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Cofirmado', detail: 'Se ha eliminado el producto con exito', life: 3000 });
    }
    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rechazado', detail: 'Te has arrepentido de borrar el producto', life: 3000 });
    }

  const confirm = (productId) => {
    confirmDialog({
      message: '¿Estás seguro de que quieres eliminar este producto?',
      header: 'Confirmacion de eliminación',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      reject,
      accept:() => {
        deleteProduct(productId);
        accept(); // Mostrar el toast después de eliminar el producto
      }
    });
  };
  

  //metodo para editar
  const editProduct = (productId) => {
    router.replace(`/productos/edit/${productId}`);
  };

  //botones.
  const actionBodyTemplate = (rowData) => {
    return (
      <div>
 
        <Button label="Editar" style={{ marginRight: '10px' }} onClick={() => editProduct(rowData.id)} />
        <Button onClick={() => confirm(rowData.id)} label="Eliminar" severity='danger' />
      </div>
    );
  };


  //buscador
  const header = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>

      
      <InputText
        type="search"
        onInput={(e) => setGlobalFilter(e.target.value)}
        placeholder="Buscar producto"
        style={{ marginRight: '10px' }}
      />
      <i className="pi pi-search mr-2" />

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
        <Column field="nombre" header="Nombre" sortable />
        <Column field="precio" header="Precio" sortable />
        <Column field="cantidad" header="Cantidad" sortable />
        <Column field="descripcion" header="Descripción" sortable />

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
