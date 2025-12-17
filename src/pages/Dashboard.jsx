import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({ nombre: '', precio: '', categoria: '', img: '' });
    const [editandoId, setEditandoId] = useState(null);
    const token = sessionStorage.getItem('admin_pass');

    useEffect(() => {
        if (!token) {
            navigate('/admin');
        } else {
            cargarProductos();
        }
    }, [token, navigate]);

    const cargarProductos = async () => {
        try {
            const res = await fetch('https://app-tienda-vm7j.onrender.com/api/productos');
            const data = await res.json();
            setProductos(data);
        } catch (error) {
            console.error("Error cargando productos:", error);
        }
    };

    const prepararEdicion = (producto) => {
        setEditandoId(producto.id);
        setForm({
            nombre: producto.nombre,
            precio: producto.precio,
            categoria: producto.categoria || '',
            img: producto.img
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelarEdicion = () => {
        setEditandoId(null);
        setForm({ nombre: '', precio: '', categoria: '', img: '' });
    };

    const eliminarProducto = async (id) => {
        if (!confirm("¿Eliminar este producto permanentemente?")) return;
        try {
            const res = await fetch(`https://app-tienda-vm7j.onrender.com/api/productos/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: token })
            });
            if (res.ok) cargarProductos();
        } catch (error) {
            alert("Error al eliminar");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editandoId
            ? `https://app-tienda-vm7j.onrender.com/api/productos/${editandoId}`
            : 'https://app-tienda-vm7j.onrender.com/api/productos';

        const metodo = editandoId ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method: metodo,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, password: token })
            });

            if (res.ok) {
                alert(editandoId ? "¡Producto actualizado!" : "¡Producto creado!");
                cancelarEdicion();
                cargarProductos();
            } else {
                alert("Error de autorización");
            }
        } catch (error) {
            alert("Error en la conexión");
        }
    };

    if (!token) return null;

    return (
        <div className="min-h-screen bg-tech-bg text-white p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10 border-b border-slate-800 pb-6">
                    <h1 className="text-3xl font-black text-tech-accent italic uppercase tracking-tighter">Admin_Panel</h1>
                    <button
                        onClick={() => { sessionStorage.clear(); navigate('/admin'); }}
                        className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all text-xs font-bold border border-red-500/20"
                    >
                        CERRAR SESIÓN
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* COLUMNA FORMULARIO */}
                    <div className={`bg-tech-card p-8 rounded-2xl border ${editandoId ? 'border-yellow-500/50' : 'border-slate-700'} shadow-2xl h-fit transition-all`}>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="text-2xl">{editandoId ? '📝' : '➕'}</span>
                            {editandoId ? 'Editando Producto' : 'Nuevo Producto'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase text-slate-500 font-bold ml-1">Nombre del Dispositivo</label>
                                <input value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} placeholder="Ej: Arduino Uno R3" className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg outline-none focus:border-tech-accent transition-all" required />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase text-slate-500 font-bold ml-1">Precio de Venta</label>
                                <input value={form.precio} onChange={e => setForm({...form, precio: e.target.value})} placeholder="Ej: $15.00" className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg outline-none focus:border-tech-accent transition-all" required />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase text-slate-500 font-bold ml-1">Enlace de Imagen (URL)</label>
                                <input value={form.img} onChange={e => setForm({...form, img: e.target.value})} placeholder="https://..." className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg outline-none focus:border-tech-accent transition-all" />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button className={`flex-1 ${editandoId ? 'bg-yellow-500' : 'bg-tech-accent'} text-black font-black py-4 rounded-lg hover:scale-[1.02] active:scale-95 transition-all shadow-lg`}>
                                    {editandoId ? 'GUARDAR CAMBIOS' : 'PUBLICAR EN TIENDA'}
                                </button>
                                {editandoId && (
                                    <button type="button" onClick={cancelarEdicion} className="bg-slate-700 text-white px-6 rounded-lg font-bold hover:bg-slate-600 transition-colors">
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* COLUMNA INVENTARIO */}
                    <div className="bg-tech-card p-8 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
                        <h2 className="text-xl font-bold mb-6 text-slate-400 flex items-center gap-2">
                            <span className="text-2xl">📦</span> Inventario Actual
                        </h2>
                        <div className="space-y-4 h-[500px] overflow-y-auto pr-3 custom-scrollbar">
                            {productos.length === 0 ? (
                                <p className="text-slate-600 text-center mt-10 italic">No hay productos en la base de datos...</p>
                            ) : (
                                productos.map(p => (
                                    <div key={p.id} className="flex items-center justify-between bg-slate-800/30 p-4 rounded-xl border border-slate-800 hover:border-slate-600 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-black rounded-lg overflow-hidden border border-slate-700">
                                                <img src={p.img || 'https://via.placeholder.com/150'} alt={p.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-white truncate w-32 md:w-48">{p.nombre}</p>
                                                <p className="text-tech-accent font-black text-xs mt-1">{p.precio}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => prepararEdicion(p)} className="p-2.5 bg-yellow-500/10 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-white transition-all" title="Editar">
                                                ✏️
                                            </button>
                                            <button onClick={() => eliminarProducto(p.id)} className="p-2.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all" title="Eliminar">
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}