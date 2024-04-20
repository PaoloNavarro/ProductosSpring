"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    cantidad: 0,
    imagen: "",
  });
  const [file, setFile] = useState(null);
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (params.id) {
      axios.get("http://localhost:8092/api/v1/producto/" + params.id)
      .then((res) => {
        console.log("Datos recibidos:", res.data.object.nombre); // Muestra los datos recibidos en la consola

        setProduct({
          name: res.data.object.nombre,
          price: res.data.object.precio,
          description: res.data.object.descripcion,
          cantidad: res.data.object.cantidad,
          imagen: res.data.object.image || ""
        });

      }).catch((error=>{
        console.error("Error fetching product:", error);
      }));
    }
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", product.name);
    formData.append("precio", product.price);
    formData.append("descripcion", product.description);
    formData.append("cantidad",product.cantidad)
    formData.append("imge", product.imagen);
   

    if (!params.id) {
      const res = await axios.post("http://localhost:8092/api/v1/producto", formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      const res = await axios.put("http://localhost:8092/api/v1/producto/" + params.id, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    form.current.reset();
    router.refresh();
    router.push("/productos");
  };

  return (
    <div className="flex ">
      <form
        className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
        ref={form}
      >
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Product Name:
        </label>
        <input
          name="name"
          type="text"
          placeholder="name"
          onChange={handleChange}
          value={product.name}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />

        <label
          htmlFor="price"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Product Price:
        </label>
        <input
          name="price"
          type="text"
          placeholder="00.00"
          onChange={handleChange}
          value={product.price}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />
        <label
          htmlFor="cantidad"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Product cantidad:
        </label>
        <input
          name="cantidad"
          type="text"
          placeholder="0"
          onChange={handleChange}
          value={product.cantidad}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />

        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Product Description:
        </label>
        <textarea
          name="description"
          rows={3}
          placeholder="description"
          onChange={handleChange}
          value={product.description}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Product imgane:
        </label>
        <textarea
          name="imagen"
          rows={3}
          placeholder="url imagen"
          onChange={handleChange}
          value={product.imagen}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />

       
    

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {params.id ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;