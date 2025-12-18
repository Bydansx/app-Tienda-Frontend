import { useState, useEffect } from 'react';
import './App.css';

// Importamos tus páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
    const [vista, setVista] = useState("tienda"); // 'tienda', 'login', 'admin'
    const [productos, setProductos] = useState([]);
    const [token, setToken] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

    // Tus categorías oficiales
    const categorias = ["Todas", "Electrónica", "Eléctrico", "Mecatrónico", "Módulos", "Mecánico"];

    // Cargar productos
    const cargarProductos = () => {
        fetch("https://app-tienda-vm7j.onrender.com/api/productos")
            .then(res => res.json())
            .then(data => setProductos(data))
            .catch(err => console.error("Error cargando productos:", err));
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    // Lógica de Login
    const intentarLogin = (pass) => {
        setToken(pass);
        setVista("admin");
    };

    // NAVEGACIÓN (Switch sencillo)
    if (vista === "login") {
        return <Login onLogin={intentarLogin} alVolver={() => setVista("tienda")} />;
    }

    if (vista === "admin") {
        return (
            <Dashboard
                productos={productos}
                token={token}
                alCerrarSesion={() => { setToken(""); setVista("tienda"); }}
                recargarProductos={cargarProductos}
            />
        );
    }

    // Vista por defecto: HOME / TIENDA
    return (
        <Home
            productos={productos}
            alIrAlLogin={() => setVista("login")}
            categorias={categorias}
            categoriaSeleccionada={categoriaSeleccionada}
            setCategoriaSeleccionada={setCategoriaSeleccionada}
        />
    );
}

export default App;