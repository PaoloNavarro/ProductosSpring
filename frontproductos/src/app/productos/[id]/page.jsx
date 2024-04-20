
import React from 'react';
import axios from 'axios';

async function loadProductos(productid) {
    const { data } = await axios.get('http://localhost:8092/api/v1/productos'+productid);
    return data.object; // Devolver directamente el array de productos dentro de data.object
}

async function page() {
  
}

export default page;
