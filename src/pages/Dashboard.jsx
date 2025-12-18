import { useState } from 'react';

function Dashboard({ productos, token, alCerrarSesion, recargarProductos }) {
    const [form, setForm] = useState({ nombre: "", precio: "", categoria: "Electrónica", descripcion: "", imagen: "" });
    const [editandoId, setEditandoId] = useState(null);

    // URL DE TU BACKEND
    const API_URL = "https://app-tienda-vm7j.onrender.com/api/productos";

    const guardarProducto = async (e) => {
        e.preventDefault();
        const metodo = editandoId ? "PUT" : "POST";
        const url = editandoId ? `${API_URL}/${editandoId}` : API_URL;

        try {
            const res = await fetch(url, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, password: token })
            });

            if (res.ok) {
                alert(editandoId ? "¡Producto Actualizado!" : "¡Producto Creado!");
                setForm({ nombre: "", precio: "", categoria: "Electrónica", descripcion: "", imagen: "" });
                setEditandoId(null);
                recargarProductos();
            } else {
                alert("Error: Contraseña incorrecta o fallo en servidor");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión");
        }
    };

    const borrarProducto = async (id) => {
        if (!confirm("¿Seguro que quieres borrar esto?")) return;
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: token })
            });
            if (res.ok) {
                alert("Producto eliminado");
                recargarProductos();
            }
        } catch (error) { alert("Error al borrar"); }
    };

    const cargarParaEditar = (prod) => {
        setForm(prod);
        setEditandoId(prod.id);
    };

    return (
        <div className="agetronica-app dark-theme">
            <header className="main-header" style={{background: '#2d0a0a'}}>
                <div className="container header-content">
                    <h2 className="logo-text">PANEL DE CONTROL</h2>
                    <button className="btn btn-outline" onClick={alCerrarSesion}>Cerrar Sesión</button>
                </div>
            </header>

            <div className="container main-layout">
                {/* FORMULARIO */}
                <div className="admin-form-container">
                    <h3>{editandoId ? "✏️ Editando Producto" : "➕ Nuevo Producto"}</h3>
                    <form onSubmit={guardarProducto} className="admin-form">
                        <input type="text" placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required className="input-dark" />
                        <input type="number" placeholder="Precio" value={form.precio} onChange={e => setForm({...form, precio: e.target.value})} required className="input-dark" />
                        <select value={form.categoria} onChange={e => setForm({...form, categoria: e.target.value})} className="input-dark">
                            <option>Electrónica</option>
                            <option>Eléctrico</option>
                            <option>Mecatrónico</option>
                            <option>Módulos</option>
                            <option>Mecánico</option>
                        </select>
                        <textarea placeholder="Descripción" value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} className="input-dark" rows="3"></textarea>
                        <input type="text" placeholder="URL de Imagen" value={form.imagen} onChange={e => setForm({...form, imagen: e.target.value})} className="input-dark" />

                        <div className="form-buttons">
                            <button type="submit" className="btn btn-primary">{editandoId ? "Actualizar" : "Crear"}</button>
                            {editandoId && <button type="button" onClick={() => {setEditandoId(null); setForm({ nombre: "", precio: "", categoria: "Electrónica", descripcion: "", imagen: "" })}} className="btn btn-outline">Cancelar</button>}
                        </div>
                    </form>
                </div>

                {/* LISTA DE PRODUCTOS */}
                <div className="admin-list">
                    <h3>Inventario ({productos.length})</h3>
                    <div className="admin-grid">
                        {productos.map(p => (
                            <div key={p.id} className="admin-card">
                                <div className="admin-card-info">
                                    <strong>{p.nombre}</strong>
                                    <span style={{color: '#00d2d3'}}>${p.precio}</span>
                                </div>
                                <div className="admin-card-actions">
                                    <button onClick={() => cargarParaEditar(p)} className="btn-icon">✏️</button>
                                    <button onClick={() => borrarProducto(p.id)} className="btn-icon delete">🗑️</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;