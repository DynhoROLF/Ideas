import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logoPixS.png'
import gerenciamentoImg from '../../assets/GerenciandoFoto.png'

export default function Logon(){
    const [id, setId] = useState('');
    const history     = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try{
            const response = await api.post('session', { id });

            localStorage.setItem('userId', id);
            localStorage.setItem('userName', response.data.name);
            
            history.push('/profile');
            console.log(response.data.name);

        } catch (err) {
            
            alert('Falha no Login, tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={ logoImg } alt="PIX" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                    placeholder="Sua ID" 
                    value={id}
                    onChange={e => setId(e.target.value)}
                    />

                    <button className = "button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#4158D0" />
                        Não tenho Cadastro
                    </Link>
                </form>

            </section>

            <img src={gerenciamentoImg} alt="Gerent" />
        </div>
    );
}