import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await fetch('https://app-tienda-vm7j.onrender.com/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });

        if (res.ok) {
            // 🔑 GUARDAMOS EL PERMISO: Usamos sessionStorage para que si cierra la pestaña, tenga que loguearse de nuevo.
            sessionStorage.setItem('admin_pass', password);
            navigate('/dashboard'); // Si es correcto, lo deja pasar al panel
        } else {
            alert("⚠️ Contraseña incorrecta. Acceso denegado.");
        }
    };

    return (
        <div className="min-h-screen bg-tech-bg flex items-center justify-center p-6">
            <div className="bg-tech-card p-8 rounded-2xl border border-slate-700 w-full max-w-md shadow-2xl">
                <div className="text-center mb-8">
                    <div className="bg-tech-accent w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 text-black font-bold text-2xl">🔒</div>
                    <h2 className="text-2xl font-bold text-white">Acceso de Administrador</h2>
                    <p className="text-slate-400 text-sm">Introduce la clave para gestionar la tienda</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="password"
                        placeholder="Clave maestra"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-tech-accent outline-none transition-all"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="w-full bg-tech-accent hover:bg-cyan-400 text-black font-bold py-3 rounded-lg transition-all transform active:scale-95">
                        Desbloquear Panel
                    </button>
                </form>
            </div>
        </div>
    );
}