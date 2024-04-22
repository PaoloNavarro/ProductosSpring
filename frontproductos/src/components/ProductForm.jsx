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
  
  const [errors, setErrors] = useState({});
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!product.name) {
      errors.name = "El nombre es requerido";
      valid = false;
    }

    if (!product.price) {
      errors.price = "El precio es requerido";
      valid = false;
    }else if (parseFloat(product.price) <= 0) {
      errors.price = "El precio debe ser mayor que cero";
      valid = false;
    }

    if (!product.cantidad) {
      errors.cantidad = "La cantidad es requerida";
      valid = false;
    }else if (parseInt(product.cantidad) <= 0) {
      errors.cantidad = "La cantidad debe ser mayor que cero";
      valid = false;
    }

    if (!product.description) {
      errors.description = "La descripción es requerida";
      valid = false;
    }


    setErrors(errors);

    return valid;
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
          imagen: res.data.object.imge || ""
        });

      }).catch((error=>{
        console.error("Error fetching product:", error);
      }));
    }
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }


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
    router.push("/productos") 
   };

  return (
    <div className="card">
      <form
        onSubmit={handleSubmit}
        ref={form}
      >
        <label
          htmlFor="name"
        >
          Nombre:
        </label>
        <InputText
          name="name"
          type="text"
          placeholder="nombre"
          onChange={handleChange}
          value={product.name}
        />
         {errors.name && <small className="p-error">{errors.name}</small>}

        <label
          htmlFor="price"
        >
          Precio:
        </label>
        <InputText
          name="price"
          type="text"
          keyfilter="money"
          onChange={handleChange}
          value={product.price}
        />
        {errors.price && <small className="p-error">{errors.price}</small>}

        <label
          htmlFor="cantidad"
        >
          Cantidad:
        </label>
        <InputText
          name="cantidad"
          type="text"
          keyfilter="int"
          onChange={handleChange}
          value={product.cantidad}
        />
        {errors.cantidad && <small className="p-error">{errors.cantidad}</small>}

        <label
          htmlFor="name"
        >
          Description:
        </label>
        <InputTextarea
          name="description"
          rows={3}
          placeholder="descripcion"
          onChange={handleChange}
          value={product.description}
        />
        {errors.description && <small className="p-error">{errors.description}</small>}

        <label
          htmlFor="name"
        >
          Url de la imagen:
        </label>
        <textarea
          name="imagen"
          rows={3}
          placeholder="url imagen"
          onChange={handleChange}
          value={product.imagen} 
        />

       
    

      <Button>
        {params.id ? "Actualizar Producto" : "Agregar Producto"}
      </Button>

      </form>
    </div>
  );
}

export default ProductForm;