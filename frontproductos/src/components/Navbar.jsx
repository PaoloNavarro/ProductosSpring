import Link from "next/link";


function Navbar() {
  return (
    <nav className="bg-zinc-900 text-white py-3 mb-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h3 className="text-3xl">Productos</h3>
        </Link>

        <ul>
          <li>
          
            <a href="/productos/new"rel="noopener noreferrer" className="p-button font-bold">
              Agregar Producto
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;