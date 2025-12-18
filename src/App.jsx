import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

    // Categorías basadas en tu diseño de referencia
    const categorias = ["Todas", "Electrónica", "Eléctrico", "Mecatrónico", "Módulos", "Mecánico"];

    useEffect(() => {
        // 🔥 ¡IMPORTANTE! USA TU URL DEL BACKEND EN RENDER AQUÍ 🔥
        fetch("https://app-tienda-vm7j.onrender.com/api/productos")
            .then(res => res.json())
            .then(data => setProductos(data));
    }, []);

    const productosFiltrados = productos.filter(producto => {
        const textoBusqueda = busqueda.toLowerCase();
        const coincideTexto = producto.nombre.toLowerCase().includes(textoBusqueda) ||
            (producto.descripcion && producto.descripcion.toLowerCase().includes(textoBusqueda));

        const coincideCategoria = categoriaSeleccionada === "Todas" || producto.categoria === categoriaSeleccionada;

        return coincideTexto && coincideCategoria;
    });

    return (
        <div className="agetronica-app dark-theme">
            {/* --- HEADER --- */}
            <header className="main-header">
                <div className="container header-content">
                    <div className="logo-container">
                        <div className="logo-icon">⚡</div>
                        <h1 className="logo-text">AGETRONICA</h1>
                    </div>
                    <nav className="main-nav">
                        <a href="#" className="nav-link active">Inicio</a>
                        <a href="#" className="nav-link">Tienda</a>
                    </nav>
                    <div className="header-icons">
                        <button className="icon-btn">🛒</button>
                        <button className="icon-btn">👤</button>
                    </div>
                </div>
            </header>

            {/* --- HERO BANNER --- */}
            <section className="hero-banner">
                <div className="container hero-content">
                    <span className="hero-badge">🔥 NUEVA COLECCIÓN 2025</span>
                    <h2 className="hero-title">INGENIERÍA<br />DEL FUTURO</h2>
                    <p className="hero-subtitle">
                        Componentes de alta gama para tus proyectos más ambiciosos. Desde microcontroladores hasta actuadores industriales.
                    </p>
                    <div className="hero-buttons">
                        <button className="btn btn-primary">Ver Catálogo →</button>
                        <button className="btn btn-outline">Nuestros Servicios</button>
                    </div>
                </div>
            </section>

            {/* --- ÁREA PRINCIPAL: SIDEBAR + TIENDA --- */}
            <div className="container main-layout">
                {/* SIDEBAR (FILTROS) */}
                <aside className="sidebar">
                    <div className="sidebar-section">
                        <h3 className="sidebar-title">BUSCAR</h3>
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                            <span className="search-icon">🔍</span>
                        </div>
                    </div>
                    <div className="sidebar-section">
                        <h3 className="sidebar-title">CATEGORÍAS</h3>
                        <ul className="category-list">
                            {categorias.map(cat => (
                                <li key={cat}>
                                    <button
                                        className={`category-btn ${categoriaSeleccionada === cat ? 'active' : ''}`}
                                        onClick={() => setCategoriaSeleccionada(cat)}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* GRILLA DE PRODUCTOS */}
                <main className="shop-content">
                    <div className="shop-header">
                        <h2 className="shop-title">TODOS LOS PRODUCTOS</h2>
                        <p className="results-count">Mostrando {productosFiltrados.length} resultados</p>
                    </div>

                    <div className="products-grid">
                        {productosFiltrados.length > 0 ? (
                            productosFiltrados.map(prod => (
                                <div key={prod.id} className="product-card">
                                    <div className="product-img-container">
                                        <img src={prod.imagen || "https://via.placeholder.com/300x200?text=Sin+Imagen"} alt={prod.nombre} className="product-img" />
                                        {/* Ejemplo de etiqueta (puedes añadir lógica para mostrarla si stock es 0) */}
                                        {/* <span className="badge-sold-out">AGOTADO</span> */}
                                    </div>
                                    <div className="product-info">
                                        <span className="product-category">{prod.categoria || "General"}</span>
                                        <h3 className="product-title">{prod.nombre}</h3>
                                        <p className="product-description">{prod.descripcion ? prod.descripcion.substring(0, 60) + "..." : "Sin descripción."}</p>
                                        <div className="product-footer">
                                            <span className="product-price">${prod.precio}</span>
                                            <button className="btn btn-sm btn-primary">
                                                🛒 Agregar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-results">
                                <p>😕 No encontramos productos con esos filtros.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* --- FOOTER --- */}
            <footer className="main-footer">
                <div className="container footer-content">
                    <div className="footer-col brand-col">
                        <div className="logo-container">
                            <div className="logo-icon">⚡</div>
                            <h2 className="logo-text">AGETRONICA</h2>
                        </div>
                        <p className="footer-desc">
                            Tu tienda de confianza para componentes electrónicos, mecatrónica y hardware industrial. Calidad e innovación en cada pieza.
                        </p>
                    </div>
                    <div className="footer-col">
                        <h4 className="footer-title">CONTACTO</h4>
                        <ul className="footer-links">
                            <li>📍 Av. Tecnología 123, Ciudad Futura</li>
                            <li>📞 +52 555 123 4567</li>
                            <li>✉️ contacto@agetronica.com</li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4 className="footer-title">CATEGORÍAS</h4>
                        <ul className="footer-links">
                            <li><a href="#">Electrónica</a></li>
                            <li><a href="#">Eléctrico</a></li>
                            <li><a href="#">Mecatrónico</a></li>
                            <li><a href="#">Módulos</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4 className="footer-title">SÍGUENOS</h4>
                        <div className="social-icons">
                            <a href="#" className="social-icon">📘</a>
                            <a href="#" className="social-icon">📷</a>
                            <a href="#" className="social-icon">🐦</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2025 Agetronica. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

export default App;