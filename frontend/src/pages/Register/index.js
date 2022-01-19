import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/logoPixS.png';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';



export default function Register(){
    const [name, setName ]         = useState('');
    const [email, setEmail ]       = useState('');
    const [whatsapp, setWhatsapp ] = useState('');
    const [city, setCity ]         = useState('');
    const [uf, setUf ]             = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        console.log({name, email, whatsapp, city, uf});

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        try {
            const response = await api.post('users', data);
            alert(`Seu ID de acesso: ${response.data.id}`);

            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="PIX" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na empresa e
                    faça sua contribuição. 0800-727-30</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#4158D0" />
                        Voltar para Login
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        type="whatsapp" 
                        placeholder="Número para Contato" 
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input 
                            placeholder="UF" 
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    
        )

}