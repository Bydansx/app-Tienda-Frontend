import React, { useState, useEffect } from 'react';

export default function Home() {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [notificacion, setNotificacion] = useState(null);

    // NUEVO: Estado para abrir/cerrar el carrito
    const [carritoAbierto, setCarritoAbierto] = useState(false);

    // Cargar datos al inicio
    useEffect(() => {
        fetch('https://app-tienda-vm7j.onrender.com/api/productos')
            .then(res => res.json())
            .then(data => setProductos(data))
            .catch(err => console.error(err));

        const carritoGuardado = JSON.parse(localStorage.getItem('carritoTechStore')) || [];
        setCarrito(carritoGuardado);
    }, []);

    const agregarAlCarrito = (producto) => {
        const nuevoCarrito = [...carrito, producto];
        setCarrito(nuevoCarrito);
        localStorage.setItem('carritoTechStore', JSON.stringify(nuevoCarrito));
        setNotificacion(`¡${producto.nombre} añadido!`);
        setTimeout(() => setNotificacion(null), 3000);
    };

    // NUEVO: Función para eliminar un item del carrito
    const eliminarDelCarrito = (index) => {
        const nuevoCarrito = [...carrito]; // Copiamos el carrito actual
        nuevoCarrito.splice(index, 1); // Sacamos el elemento en esa posición
        setCarrito(nuevoCarrito);
        localStorage.setItem('carritoTechStore', JSON.stringify(nuevoCarrito));
    };

    // NUEVO: Calcular el Total
    // Limpiamos el signo "$" y convertimos a número para sumar
    const total = carrito.reduce((suma, item) => {
        const precioNumero = parseFloat(item.precio.replace('$', ''));
        return suma + precioNumero;
    }, 0);

    // NUEVO: Enviar pedido por WhatsApp
    const enviarPedido = () => {
        const telefono = "5930992909082"; // ¡PON TU NÚMERO AQUÍ! (Con código de país, sin +)
        const mensaje = carrito.map(item => `- ${item.nombre} (${item.precio})`).join('%0A');
        const url = `https://wa.me/${telefono}?text=Hola, quiero comprar:%0A${mensaje}%0A%0ATotal: $${total.toFixed(2)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="min-h-screen font-sans selection:bg-tech-accent selection:text-black pb-20 relative">

            {/* NOTIFICACIÓN */}
            {notificacion && (
                <div className="fixed bottom-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-2xl z-50 animate-bounce">
                    ✅ {notificacion}
                </div>
            )}

            {/* --- MODAL DEL CARRITO (NUEVO) --- */}
            {/* Solo se muestra si carritoAbierto es true */}
            {carritoAbierto && (
                <div className="fixed inset-0 z-[60] flex justify-end">
                    {/* Fondo oscuro que cierra el carrito al hacer clic */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setCarritoAbierto(false)}></div>

                    {/* Panel lateral */}
                    <div className="relative w-full max-w-md bg-tech-card h-full shadow-2xl p-6 border-l border-slate-700 flex flex-col transition-transform">
                        <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                            <h2 className="text-2xl font-bold text-white">Tu Carrito</h2>
                            <button onClick={() => setCarritoAbierto(false)} className="text-slate-400 hover:text-white text-xl">✕</button>
                        </div>

                        {/* Lista de items */}
                        <div className="flex-1 overflow-y-auto space-y-4">
                            {carrito.length === 0 ? (
                                <p className="text-slate-500 text-center mt-10">El carrito está vacío 😢</p>
                            ) : (
                                carrito.map((item, index) => (
                                    <div key={index} className="flex gap-4 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                                        <img src={item.img} alt={item.nombre} className="w-16 h-16 object-cover rounded" />
                                        <div className="flex-1">
                                            <h4 className="text-white font-medium text-sm">{item.nombre}</h4>
                                            <p className="text-tech-accent font-bold">{item.precio}</p>
                                        </div>
                                        <button onClick={() => eliminarDelCarrito(index)} className="text-red-400 hover:text-red-300 text-sm px-2">
                                            Eliminar
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Total y Botón Pagar */}
                        <div className="mt-6 border-t border-slate-700 pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-slate-400">Total a pagar:</span>
                                <span className="text-2xl font-bold text-white">${total.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={enviarPedido}
                                disabled={carrito.length === 0}
                                className="w-full bg-green-500 hover:bg-green-400 disabled:bg-slate-700 disabled:text-slate-500 text-black font-bold py-3 rounded-lg transition-all"
                            >
                                Comprar por WhatsApp 📱
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* NAVBAR */}
            <nav className="border-b border-slate-800 bg-tech-bg/90 backdrop-blur-md fixed w-full top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="bg-tech-accent w-8 h-8 flex items-center justify-center rounded font-bold text-black text-xl">T</div>
                        <h1 className="text-xl font-bold tracking-wider">TECH<span className="text-tech-accent">STORE</span></h1>
                    </div>
                    <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
                        <a href="/" className="text-tech-accent">Tienda</a>
                        <a href="/dashboard" className="hover:text-tech-accent transition-colors">Admin</a>
                    </div>

                    {/* BOTÓN DEL CARRITO (Ahora abre el modal) */}
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setCarritoAbierto(true)}
                            className="relative text-slate-300 hover:text-white transition-transform hover:scale-110"
                        >
                            🛒
                            {carrito.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-tech-accent text-[10px] text-black font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                    {carrito.length}
                  </span>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <div className="pt-32 pb-20 px-6 text-center bg-gradient-to-b from-tech-bg to-tech-card">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                    INGENIERÍA DEL <span className="text-tech-accent">FUTURO</span>
                </h1>
            </div>

            {/* PRODUCTOS */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                <h3 className="text-2xl font-bold mb-8 text-white border-l-4 border-tech-accent pl-4">Catálogo Disponible</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {productos.map((prod) => (
                        <div key={prod.id} className="bg-tech-card rounded-xl overflow-hidden border border-slate-700 hover:border-tech-accent/50 hover:shadow-xl transition-all flex flex-col justify-between">
                            <div className="h-48 overflow-hidden relative">
                                <img src={prod.img} alt={prod.nombre} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"/>
                            </div>
                            <div className="p-6">
                                <h4 className="text-lg font-bold mb-2 text-white">{prod.nombre}</h4>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-2xl font-bold text-tech-accent">{prod.precio}</span>
                                    <button
                                        onClick={() => agregarAlCarrito(prod)}
                                        className="bg-slate-800 hover:bg-tech-accent hover:text-black text-white px-4 py-2 rounded-lg transition-all active:scale-95 font-medium"
                                    >
                                        Añadir +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}