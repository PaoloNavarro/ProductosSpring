"use client"
import { Menubar } from 'primereact/menubar';


function Navbar() {
  const items = [
    {
      label: 'Productos',
      icon: 'pi pi-home',
      url: '/productos'
    },
    {
      label: 'New Product',
      icon: 'pi pi-plus',
      command: () => { window.location.href = '/productos/new'; }

    },
    {
      label: 'Productos',
      icon: 'pi pi-search',
      items: [
        {
          label: 'New Product',
          icon: 'pi pi-plus',
          command: () => { window.location.href = '/productos/new'; }
        }
      ]
    }
  ];

  return (
    <nav>
        

        <Menubar model={items} />
      
    </nav>
  );
}

export default Navbar;