"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';


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
    <div className="card ">
      <form
        onSubmit={handleSubmit}
        ref={form}
      >
        <label
          htmlFor="name"
        >
          Product Name:
        </label>
        <InputText
          name="name"
          type="text"
          placeholder="name"
          onChange={handleChange}
          value={product.name}
        />

        <label
          htmlFor="price"
        >
          Product Price:
        </label>
        <InputText
          name="price"
          type="text"
          keyfilter="money"

          placeholder="0"
          onChange={handleChange}
          value={product.price}
        />
        <label
          htmlFor="cantidad"
        >
          Product cantidad:
        </label>
        <InputText
          name="cantidad"
          type="text"
          keyfilter="int"
          placeholder="0"
          onChange={handleChange}
          value={product.cantidad}
        />

        <label
          htmlFor="name"
        >
          Product Description:
        </label>
        <InputTextarea
          name="description"
          rows={3}
          placeholder="description"
          onChange={handleChange}
          value={product.description}
        />
        <label
          htmlFor="name"
        >
          Product imgane:
        </label>
        <textarea
          name="imagen"
          rows={3}
          placeholder="url imagen"
          onChange={handleChange}
          value={product.imagen}
        />

       
    

        <Button>
          {params.id ? "Update Product" : "Create Product"}
        </Button>
      </form>
    </div>
  );
}

export default ProductForm;