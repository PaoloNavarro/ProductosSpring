"use client"
import { Menubar } from 'primereact/menubar';


function Navbar() {
  const items = [
    {
      label: 'Productos',
      icon: 'pi pi-tag',
      url: '/productos'
    },
    {
      label: 'Agregar Producto',
      icon: 'pi pi-plus',
      command: () => { window.location.href = '/productos/new'; }

    }
  ];

  return (
    <nav>
        

        <Menubar model={items} />
      
    </nav>
  );
}

export default Navbar;