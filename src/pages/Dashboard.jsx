import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({ nombre: '', precio: '', categoria: '', img: '' });

    // 1. Recuperamos la contraseña guardada en la sesión
    const passGuardada = sessionStorage.getItem('admin_pass');

    useEffect(() => {
        // 🛡️ SEGURIDAD: Si no hay contraseña guardada, lo mandamos al login inmediatamente
        if (!passGuardada) {
            navigate('/admin');
            return;
        }
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        const res = await fetch('https://app-tienda-vm7j.onrender.com/api/productos');
        const data = await res.json();
        setProductos(data);
    };

    // 🗑️ FUNCIÓN PARA BORRAR
    const eliminarProducto = async (id) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este producto?")) return;

        const res = await fetch(`https://app-tienda-vm7j.onrender.com/api/productos/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: passGuardada }) // Enviamos la clave para que el servidor nos deje borrar
        });

        if (res.ok) {
            alert("Producto eliminado");
            cargarProductos(); // Refrescamos la lista
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('https://app-tienda-vm7j.onrender.com/api/productos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, password: passGuardada })
        });

        if (res.ok) {
            alert("¡Producto añadido!");
            setForm({ nombre: '', precio: '', categoria: '', img: '' });
            cargarProductos();
        }
    };

    if (!passGuardada) return null; // No mostramos nada si no hay permiso

    return (
        <div className="min-h-screen bg-tech-bg text-white p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold border-l-4 border-tech-accent pl-4">Panel de Control</h1>
                    <button onClick={() => { sessionStorage.clear(); navigate('/admin'); }} className="text-red-400 text-sm hover:underline">Cerrar Sesión</button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* COLUMNA IZQUIERDA: FORMULARIO */}
                    <div className="bg-tech-card p-6 rounded-xl border border-slate-700 h-fit">
                        <h2 className="text-xl font-bold mb-4">Agregar Nuevo Item</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input name="nombre" value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} placeholder="Nombre del producto" className="w-full bg-slate-900 border border-slate-700 p-3 rounded" required />
                            <input name="precio" value={form.precio} onChange={(e) => setForm({...form, precio: e.target.value})} placeholder="Precio (ej: $15.00)" className="w-full bg-slate-900 border border-slate-700 p-3 rounded" required />
                            <input name="img" value={form.img} onChange={(e) => setForm({...form, img: e.target.value})} placeholder="URL de la imagen" className="w-full bg-slate-900 border border-slate-700 p-3 rounded" />
                            <button className="w-full bg-tech-accent text-black font-bold py-3 rounded hover:bg-cyan-400">Publicar Producto</button>
                        </form>
                    </div>

                    {/* COLUMNA DERECHA: LISTA DE PRODUCTOS CON BOTÓN BORRAR */}
                    <div className="bg-tech-card p-6 rounded-xl border border-slate-700">
                        <h2 className="text-xl font-bold mb-4 text-slate-400">Inventario Actual</h2>
                        <div className="space-y-3 h-[400px] overflow-y-auto pr-2">
                            {productos.map(p => (
                                <div key={p.id} className="flex items-center justify-between bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                                    <div className="flex items-center gap-3">
                                        <img src={p.img} className="w-10 h-10 object-cover rounded" />
                                        <div>
                                            <p className="text-sm font-bold">{p.nombre}</p>
                                            <p className="text-xs text-tech-accent">{p.precio}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => eliminarProducto(p.id)}
                                        className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-2 rounded-lg transition-all"
                                    >
                                        🗑️ Borrar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}