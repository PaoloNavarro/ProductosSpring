"use client"
import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const ProductTable = ({ products }) => {
  const router = useRouter();
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);

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
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Se ha elimiado el producto con exito', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'Te has arrepentido de borrar el producto', life: 3000 });
    }

  const confirm2 = (productId) => {
    confirmDialog({
      message: '¿Estás seguro de que quieres eliminar este producto?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: () => deleteProduct(productId),
      reject
    });
  };

  //metodo para editar
  const editProduct = (productId) => {
    router.push(`/productos/edit/${productId}`);
  };

  //botones.
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="card flex flex-wrap gap-2 justify-content-center">
        <Button label="Editar" onClick={() => editProduct(rowData.id)} />
        <Button onClick={() => confirm2(rowData.id)} icon="pi pi-times" label="Delete" severity='danger' />

      </div>
    );
  };


  //buscador
  const header = (
    <div className="textAlign: 'left'">
      <i className="pi pi-search mr-2" />
      <InputText
        type="search"
        onInput={(e) => setGlobalFilter(e.target.value)}
        placeholder="Buscar producto"
        className="border border-gray-300 rounded-md px-3 py-2"
      />
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
      >
        <Column field="nombre" header="Nombre" sortable />
        <Column field="precio" header="Precio" sortable />
        <Column field="cantidad" header="Cantidad" sortable />
        <Column field="descripcion" header="Descripción" sortable />
        <Column
          body={actionBodyTemplate}
          header="Acciones"
          style={{ textAlign: 'center', width: '19em' }}
          className="text-center"
        />
      </DataTable>
    </>
  );
};

export default ProductTable;
