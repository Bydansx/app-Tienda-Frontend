/* eslint-disable */
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({ nombre: '', precio: '', categoria: '', img: '' });
    const [editandoId, setEditandoId] = useState(null);
    const token = sessionStorage.getItem('admin_pass');

    const cargarProductos = useCallback(async () => {
        try {
            const res = await fetch('https://app-tienda-vm7j.onrender.com/api/productos');
            const data = await res.json();
            setProductos(data);
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        if (!token) {
            navigate('/admin');
        } else {
            cargarProductos();
        }
    }, [token, navigate, cargarProductos]);

    const prepararEdicion = (p) => {
        setEditandoId(p.id);
        setForm({ nombre: p.nombre, precio: p.precio, categoria: p.categoria || '', img: p.img });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelarEdicion = () => {
        setEditandoId(null);
        setForm({ nombre: '', precio: '', categoria: '', img: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editandoId
            ? `https://app-tienda-vm7j.onrender.com/api/productos/${editandoId}`
            : 'https://app-tienda-vm7j.onrender.com/api/productos';

        try {
            await fetch(url, {
                method: editandoId ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, password: token })
            });
            cancelarEdicion();
            cargarProductos();
        } catch (err) {
            alert("Error de conexión");
        }
    };

    const eliminarProducto = async (id) => {
        if (!window.confirm("¿Borrar?")) return;
        try {
            await fetch(`https://app-tienda-vm7j.onrender.com/api/productos/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: token })
            });
            cargarProductos();
        } catch (err) {
            console.log(err);
        }
    };

    if (!token) return null;

    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10 border-b border-slate-800 pb-6">
                    <h1 className="text-2xl font-black text-cyan-400">ADMIN DASHBOARD</h1>
                    <button onClick={() => { sessionStorage.clear(); navigate('/admin'); }} className="text-red-500 font-bold border border-red-500/30 px-4 py-2 rounded">LOGOUT</button>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
                        <h2 className="text-lg font-bold mb-6">{editandoId ? 'Editar Item' : 'Nuevo Producto'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} placeholder="Nombre" className="w-full bg-black/50 border border-slate-700 p-3 rounded-xl text-white" required />
                            <input value={form.precio} onChange={e => setForm({...form, precio: e.target.value})} placeholder="Precio" className="w-full bg-black/50 border border-slate-700 p-3 rounded-xl text-white" required />
                            <input value={form.img} onChange={e => setForm({...form, img: e.target.value})} placeholder="URL Imagen" className="w-full bg-black/50 border border-slate-700 p-3 rounded-xl text-white" />
                            <div className="flex gap-2 pt-2">
                                <button className="flex-1 bg-cyan-500 text-black font-bold py-3 rounded-xl">{editandoId ? 'ACTUALIZAR' : 'PUBLICAR'}</button>
                                {editandoId && <button type="button" onClick={cancelarEdicion} className="bg-slate-800 px-4 rounded-xl">X</button>}
                            </div>
                        </form>
                    </div>

                    <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
                        <h2 className="text-lg font-bold mb-6 text-slate-500">Inventario</h2>
                        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                            {productos.map(p => (
                                <div key={p.id} className="flex justify-between bg-black/40 p-3 rounded-xl border border-slate-800">
                                    <div className="flex gap-3">
                                        <img src={p.img || 'https://via.placeholder.com/50'} className="w-10 h-10 object-cover rounded-lg" alt=""/>
                                        <div><p className="font-bold text-sm">{p.nombre}</p><p className="text-cyan-400 text-xs">{p.precio}</p></div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => prepararEdicion(p)} className="text-yellow-500">✏️</button>
                                        <button onClick={() => eliminarProducto(p.id)} className="text-red-500">🗑️</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}