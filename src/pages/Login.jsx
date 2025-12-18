import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
            <Link to="/" className="mb-6 text-slate-400 hover:text-cyan-400 flex items-center gap-2">
                ← Volver a la tienda
            </Link>

            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-md shadow-2xl">
                <h2 className="text-2xl font-bold text-white text-center mb-6 uppercase tracking-widest">Admin Login</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-black border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none text-center"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-lg transition-all">
                        ENTRAR
                    </button>
                </form>
            </div>
        </div>
    );
}