import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos para poder redirigir al usuario

export default function Dashboard() {
    const navigate = useNavigate(); // Hook de navegación

    const [form, setForm] = useState({
        nombre: '',
        precio: '',
        categoria: '',
        img: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // --- FUNCIÓN NUEVA: ENVÍO DE DATOS ---
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue sola

        // Validación básica: Si faltan datos, no enviamos nada
        if (!form.nombre || !form.precio) {
            alert("Por favor completa al menos el nombre y el precio");
            return;
        }

        try {
            // Enviamos la "carta" al servidor
            const respuesta = await fetch('https://app-tienda-vm7j.onrender.com/api/productos',{
                method: 'POST', // Método para CREAR
                headers: {
                    'Content-Type': 'application/json', // Avisamos que enviamos datos JSON
                },
                body: JSON.stringify(form) // Convertimos nuestros datos a texto JSON
            });

            if (respuesta.ok) {
                alert("¡Producto creado con éxito!");
                navigate('/'); // Nos lleva a la tienda para ver el producto nuevo
            } else {
                alert("Error al guardar en el servidor");
            }

        } catch (error) {
            console.error("Error de conexión:", error);
            alert("No se pudo conectar con el servidor");
        }
    };

    return (
        <div className="min-h-screen bg-tech-bg text-white p-6 md:p-12">
            <div className="flex justify-between items-center mb-10 border-b border-slate-700 pb-4">
                <h2 className="text-3xl font-bold">Panel de Administración</h2>
                <a href="/" className="text-sm text-slate-400 hover:text-white">← Volver a la Tienda</a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Formulario */}
                <div className="bg-tech-card p-8 rounded-xl border border-slate-700">
                    <h3 className="text-xl font-bold mb-6 text-tech-accent">Nuevo Producto</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm mb-2 text-slate-400">Nombre</label>
                            <input name="nombre" onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded p-3 focus:border-tech-accent outline-none" placeholder="Ej: Super Motor" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-2 text-slate-400">Precio</label>
                                <input name="precio" onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded p-3 focus:border-tech-accent outline-none" placeholder="$0.00" />
                            </div>
                            <div>
                                <label className="block text-sm mb-2 text-slate-400">Categoría</label>
                                <select name="categoria" onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded p-3 focus:border-tech-accent outline-none text-slate-300">
                                    <option>Seleccionar...</option>
                                    <option>Electrónica</option>
                                    <option>Mecatrónica</option>
                                    <option>Módulos</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm mb-2 text-slate-400">URL Imagen</label>
                            <input name="img" onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded p-3 focus:border-tech-accent outline-none" placeholder="https://..." />
                        </div>

                        {/* BOTÓN CONECTADO A LA FUNCIÓN */}
                        <button onClick={handleSubmit} className="w-full bg-tech-accent hover:bg-cyan-400 text-black font-bold py-3 rounded mt-4 transition-all">
                            Publicar Producto Real
                        </button>
                    </div>
                </div>

                {/* Preview */}
                <div>
                    <h3 className="text-xl font-bold mb-6 text-slate-400">Vista Previa</h3>
                    <div className="bg-tech-card rounded-xl overflow-hidden border border-slate-700 w-full max-w-sm mx-auto shadow-2xl">
                        <div className="h-64 bg-slate-800 flex items-center justify-center overflow-hidden relative">
                            {form.img ? <img src={form.img} alt="Preview" className="w-full h-full object-cover" /> : <span className="text-slate-600">Sin Imagen</span>}
                        </div>
                        <div className="p-6">
                            <h4 className="text-xl font-bold mb-2 text-white">{form.nombre || "Nombre"}</h4>
                            <p className="text-3xl font-bold text-tech-accent">{form.precio || "$0.00"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}