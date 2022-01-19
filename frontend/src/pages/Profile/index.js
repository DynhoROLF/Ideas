import React, { useEffect, useState }  from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css'

import logoImg from '../../assets/logoPixS.png'

export default function Profile() {
    const [ideas, setIdeas] = useState([]);

    const history  = useHistory();
    const userId   = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: userId,
            }
        }).then(response => {
            setIdeas(response.data);
        })
    }, [userId]);

    async function handleDeleteIdea(id){
        try {
            await api.delete(`ideas/${id}`, {
                headers: {
                    Authorization: userId,
                }
            });

            setIdeas(ideas.filter(idea => idea.id !== id))
        } catch (err) {
            alert('Erro ao deletar o caso, tente novamente.')
        }
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt = "PIX" />
                <span>Bem vindo, {userName}</span>

                <Link className="button" to="/ideas/new">Cadastrar nova ideia </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#4158D0" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {ideas.map(idea => (
                    <li key={idea.id}>
                    <strong>CASO:</strong>
                    <p>{idea.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{idea.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(idea.value)}</p>

                    <button onClick={() => handleDeleteIdea(idea.id)} type='button'>
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
                ))}
            </ul>
        </div>

    );
}