import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");

    // Categorías de Agetronica
    const categorias = ["Todos", "Microcontroladores", "Impresión 3D", "Kits Educativos", "Componentes"];

    useEffect(() => {
        // RECUERDA: Usa tu URL de Render aquí
        fetch("https://app-tienda-vm7j.onrender.com/api/productos")
            .then(res => res.json())
            .then(data => setProductos(data));
    }, []);

    const productosFiltrados = productos.filter(producto => {
        // Si la descripción o el nombre coinciden con la búsqueda
        const textoBusqueda = busqueda.toLowerCase();
        const coincideTexto = producto.nombre.toLowerCase().includes(textoBusqueda) ||
            (producto.descripcion && producto.descripcion.toLowerCase().includes(textoBusqueda));

        const coincideCategoria = categoriaSeleccionada === "Todos" || producto.categoria === categoriaSeleccionada;

        return coincideTexto && coincideCategoria;
    });

    return (
        <div className="agetronica-container">
            <header className="header">
                <h1 className="logo">⚡ Agetronica</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
            </header>

            <nav className="categorias-nav">
                {categorias.map(cat => (
                    <button
                        key={cat}
                        className={`btn-categoria ${categoriaSeleccionada === cat ? 'activo' : ''}`}
                        onClick={() => setCategoriaSeleccionada(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </nav>

            <main className="productos-grid">
                {productosFiltrados.length > 0 ? (
                    productosFiltrados.map(prod => (
                        <div key={prod.id} className="card-producto">
                            <div className="card-img">
                                <img src={prod.imagen || "https://via.placeholder.com/150"} alt={prod.nombre} />
                            </div>
                            <div className="card-info">
                                <h3>{prod.nombre}</h3>
                                <span className="etiqueta">{prod.categoria || "General"}</span>

                                {/* AQUI ESTÁ LA NUEVA DESCRIPCIÓN */}
                                <p className="descripcion">
                                    {prod.descripcion || "Sin descripción disponible."}
                                </p>

                                <div className="precio-row">
                                    <span className="precio">${prod.precio}</span>
                                    <button className="btn-comprar">Añadir</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-resultados">
                        <p>😕 No encontramos nada con esa búsqueda.</p>
                    </div>
                )}
            </main>
        </div>
    );
}



export default App;