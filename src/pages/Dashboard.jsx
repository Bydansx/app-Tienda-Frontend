import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    const [password, setPassword] = useState(''); // Estado para la contraseña
    const [form, setForm] = useState({ nombre: '', precio: '', categoria: '', img: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const respuesta = await fetch('https://app-tienda-vm7j.onrender.com/api/productos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, password }) // Enviamos los datos + la contraseña
            });

            if (respuesta.ok) {
                alert("¡Producto publicado con éxito!");
                navigate('/');
            } else {
                alert("❌ Contraseña incorrecta o error en el servidor");
            }
        } catch (error) {
            alert("Error de conexión");
        }
    };

    return (
        <div className="min-h-screen bg-tech-bg text-white p-12 font-sans">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 border-b border-slate-700 pb-4 text-tech-accent">Panel de Control Seguro</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-tech-card p-6 rounded-xl border border-slate-700 space-y-4">
                        {/* CAMPO DE CONTRASEÑA */}
                        <div className="mb-6 p-4 bg-slate-900 rounded-lg border border-yellow-500/30">
                            <label className="block text-xs font-bold text-yellow-500 mb-2 uppercase tracking-widest">Contraseña Maestra</label>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black border border-slate-700 rounded p-2 focus:border-yellow-500 outline-none"
                                placeholder="Escribe el secreto..."
                            />
                        </div>

                        {/* RESTO DEL FORMULARIO */}
                        <input name="nombre" onChange={handleChange} placeholder="Nombre" className="w-full bg-slate-900 border border-slate-700 rounded p-3 mb-4 outline-none focus:border-tech-accent" />
                        <div className="grid grid-cols-2 gap-4">
                            <input name="precio" onChange={handleChange} placeholder="Precio (ej: $10)" className="w-full bg-slate-900 border border-slate-700 rounded p-3 outline-none focus:border-tech-accent" />
                            <select name="categoria" onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded p-3 outline-none focus:border-tech-accent text-slate-400">
                                <option>Categoría...</option>
                                <option>Electrónica</option>
                                <option>Mecatrónica</option>
                            </select>
                        </div>
                        <input name="img" onChange={handleChange} placeholder="URL de imagen" className="w-full bg-slate-900 border border-slate-700 rounded p-3 outline-none focus:border-tech-accent" />

                        <button onClick={handleSubmit} className="w-full bg-tech-accent hover:bg-cyan-400 text-black font-bold py-3 rounded-lg transition-all">
                            Verificar y Publicar
                        </button>
                    </div>

                    {/* PREVIEW */}
                    <div className="opacity-50 grayscale hover:grayscale-0 transition-all">
                        <p className="text-xs text-slate-500 mb-2 uppercase">Previsualización</p>
                        <div className="bg-tech-card rounded-xl overflow-hidden border border-slate-700 p-4">
                            <h4 className="font-bold">{form.nombre || '---'}</h4>
                            <p className="text-tech-accent">{form.precio || '$0.00'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}