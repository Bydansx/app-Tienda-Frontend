import { useState } from 'react';

function Login({ onLogin, alVolver }) {
    const [pass, setPass] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(pass);
    };

    return (
        <div className="login-overlay">
            <div className="login-box">
                <h2 className="logo-text" style={{textAlign: 'center', marginBottom: '20px'}}>ACCESO ADMIN</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Contraseña Maestra..."
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                        className="input-dark"
                    />
                    <button type="submit" className="btn btn-primary full-width">INGRESAR</button>
                </form>
                <button onClick={alVolver} className="btn-link">← Volver a la Tienda</button>
            </div>
        </div>
    );
}

export default Login;