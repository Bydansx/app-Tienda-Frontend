import { useState } from 'react';

function Home({ productos, alIrAlLogin, categorias, categoriaSeleccionada, setCategoriaSeleccionada }) {
    const [busqueda, setBusqueda] = useState("");

    const productosFiltrados = productos.filter(producto => {
        const textoBusqueda = busqueda.toLowerCase();
        const coincideTexto = producto.nombre.toLowerCase().includes(textoBusqueda) ||
            (producto.descripcion && producto.descripcion.toLowerCase().includes(textoBusqueda));
        const coincideCategoria = categoriaSeleccionada === "Todas" || producto.categoria === categoriaSeleccionada;
        return coincideTexto && coincideCategoria;
    });

    return (
        <div className="agetronica-app dark-theme">
            {/* HEADER */}
            <header className="main-header">
                <div className="container header-content">
                    <div className="logo-container">
                        <div className="logo-icon">⚡</div>
                        <h1 className="logo-text">AGETRONICA</h1>
                    </div>
                    <nav className="main-nav">
                        <button className="nav-link active">Tienda</button>
                        <button className="nav-link" onClick={() => alert("¡Pronto tendremos página de Nosotros!")}>Nosotros</button>
                    </nav>
                    <div className="header-icons">
                        <button className="icon-btn" onClick={alIrAlLogin} title="Panel de Administración">👤</button>
                    </div>
                </div>
            </header>

            {/* HERO BANNER */}
            <section className="hero-banner">
                <div className="container hero-content">
                    <span className="hero-badge">🔥 NUEVA COLECCIÓN 2025</span>
                    <h2 className="hero-title">INGENIERÍA<br />DEL FUTURO</h2>
                    <p className="hero-subtitle">Componentes de alta gama para tus proyectos. Calidad Agetronica garantizada.</p>
                </div>
            </section>

            {/* CONTENIDO PRINCIPAL */}
            <div className="container main-layout">
                {/* SIDEBAR */}
                <aside className="sidebar">
                    <div className="sidebar-section">
                        <h3 className="sidebar-title">BUSCAR</h3>
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Buscar..."
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
                        <h2 className="shop-title">CATÁLOGO</h2>
                        <p className="results-count">{productosFiltrados.length} resultados</p>
                    </div>

                    <div className="products-grid">
                        {productosFiltrados.map(prod => (
                            <div key={prod.id} className="product-card">
                                <div className="product-img-container">
                                    <img src={prod.imagen || "https://via.placeholder.com/300?text=Sin+Imagen"} alt={prod.nombre} className="product-img" />
                                </div>
                                <div className="product-info">
                                    <span className="product-category">{prod.categoria || "General"}</span>
                                    <h3 className="product-title">{prod.nombre}</h3>
                                    <p className="product-description">{prod.descripcion || "Sin descripción"}</p>
                                    <div className="product-footer">
                                        <span className="product-price">${prod.precio}</span>
                                        <button className="btn btn-sm btn-primary" onClick={() => alert(`Agregado: ${prod.nombre}`)}>🛒 +</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            {/* FOOTER */}
            <footer className="main-footer">
                <div className="container footer-bottom">
                    <p>© 2025 Agetronica - Potencia tu creatividad</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;