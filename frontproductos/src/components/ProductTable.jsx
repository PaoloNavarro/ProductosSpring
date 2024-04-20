"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";


function ProductTable({ products }) {
    const router = useRouter();

  return (
    <table className="table-auto w-full bg-white">
      <thead>
        <tr>
          <th className="px-4 py-2">Nombre</th>
          <th className="px-4 py-2">Precio</th>
          <th className="px-4 py-2">Cantidad</th>
          <th className="px-4 py-2">Descripción</th>
          <th className="px-4 py-2">Img</th>
          <th className="px-4 py-2">Acciones</th> {/* Encabezado para botones de acciones */}
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id} className="bg-white border-gray-800 hover:bg-gray-100 hover:cursor-pointer">
            <td className="border px-4 py-2">
              <Link href={`/productos/${product.id}`}>
                <p className="text-blue-500 hover:underline">{product.nombre}</p>
              </Link>
            </td>
            <td className="border px-4 py-2">{product.precio}</td>
            <td className="border px-4 py-2">{product.cantidad}</td>
            <td className="border px-4 py-2">{product.descripcion}</td>
            <td className="border px-4 py-2">{product.imagen}</td>

            <td className="border px-4 py-2">
              {/* Botones de editar y eliminar */}
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2"
               onClick={() => {
                router.push(`/productos/edit/${product.id}`);
              }}
              >
                Editar
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
                onClick={async () => {
                  if (confirm("are you sure you want to delete this prodcut?")) {
                    const res = await axios.delete("http://localhost:8092/api/v1/producto/" + product.id);
                    if (res.status === 204) {
                      router.push("/productos");
                      router.refresh();
                    }
                  }
                }}
              
              >
                
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
