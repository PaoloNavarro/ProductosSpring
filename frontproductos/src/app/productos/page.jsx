import React from 'react';
import axios from 'axios';
import ProductTable from "@/components/ProductTable";

async function loadProductos() {
    const { data } = await axios.get('http://localhost:8092/api/v1/productos');
    return data.object; // Devolver directamente el array de productos dentro de data.object
}

async function page() {
    try {
        const products = await loadProductos();
        if (!Array.isArray(products)) {
            console.error('Los productos no son un array:', products);
            return null;
        }
        return (
            <ProductTable products={products} />
        );
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        return null;
    }
}

export default page;
