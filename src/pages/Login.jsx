import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importamos Link para la navegación

export default function Login() {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('https://app-tienda-vm7j.onrender.com/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            if (res.ok) {
                sessionStorage.setItem('admin_pass', password);
                navigate('/dashboard');
            } else {
                alert("⚠️ Clave incorrecta");
            }
        } catch (error) {
            alert("Error conectando al servidor");
        }
    };

    return (
        <div className="min-h-screen bg-tech-bg flex flex-col items-center justify-center p-6 font-sans">

            {/* BOTÓN PARA VOLVER A LA TIENDA (Fuera del cuadro blanco) */}
            <Link
                to="/"
                className="mb-6 text-slate-400 hover:text-tech-accent flex items-center gap-2 transition-colors group"
            >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                Volver a la tienda principal
            </Link>

            <div className="bg-tech-card p-10 rounded-2xl border border-slate-700 w-full max-w-md shadow-2xl">
                <div className="text-center mb-8">
                    <div className="text-4xl mb-4 text-tech-accent">🔐</div>
                    <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Acceso Restringido</h2>
                    <p className="text-slate-500 text-sm mt-2 font-medium">Panel de Control TechStore</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs text-slate-500 mb-2 uppercase font-bold tracking-widest">Contraseña Maestra</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-tech-accent outline-none transition-all text-center text-lg"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>

                    <button className="w-full bg-tech-accent hover:bg-cyan-400 text-black font-black py-4 rounded-lg transition-all shadow-lg shadow-cyan-500/20 uppercase tracking-widest">
                        Desbloquear Panel
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                    <p className="text-[10px] text-slate-600 uppercase tracking-widest">Sistema de seguridad activo v2.0</p>
                </div>
            </div>
        </div>
    );
}