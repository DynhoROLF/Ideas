import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logoPixS.png'
import api from '../../services/api';

export default function NewIdea() {
    const [title, setTitle]             = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue]             = useState('');

    const history = useHistory();

    const userId = localStorage.getItem('userId');

    async function handleNewIdea(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('ideas', data, {
                headers: {
                    Authorization: userId,
                }
            })

            alert('Ideia cadastrada com sucesso!!');
            history.push('/profile');
            
        } catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.');
        }    
    }

    return (
        <div className="new-idea-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="PIX" />

                    <h1>Cadastrar novo Caso</h1>
                    <p>Descreva sua ideia detalhadamente para encontrar um patrocinador</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#4158D0" />
                        Voltar para Home
                    </Link>
                </section>

                <form onSubmit={handleNewIdea}>
                    <input 
                        placeholder="Título da Ideia"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}