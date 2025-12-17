import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault(); // Evita que la página se recargue
        // Aquí validaremos la contraseña en el futuro
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-tech-bg relative overflow-hidden">

            {/* Círculo de fondo decorativo */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-tech-accent/20 rounded-full blur-[100px]"></div>

            <div className="bg-tech-card p-8 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-block p-3 rounded-full bg-slate-800 text-tech-accent text-2xl mb-4">🔒</div>
                    <h2 className="text-2xl font-bold text-white">Acceso Administrativo</h2>
                    <p className="text-slate-400 text-sm mt-2">Ingresa la contraseña maestra para gestionar la tienda</p>
                </div>

                <form className="space-y-6">
                    <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">Contraseña</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-tech-accent focus:ring-1 focus:ring-tech-accent transition-all"
                        />
                    </div>

                    <button onClick={handleLogin} className="w-full bg-tech-accent hover:bg-cyan-400 text-black font-bold py-3 px-4 rounded-lg transition-all shadow-lg">
                        Ingresar al Panel
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <a href="/" className="text-slate-500 text-sm hover:text-white transition-colors">← Volver a la tienda</a>
                </div>
            </div>
        </div>
    );
}