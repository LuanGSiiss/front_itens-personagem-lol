import React, { useEffect, useState } from "react";
import './incluir-personagem-styles.css';
import { FiCornerDownLeft, FiFilePlus } from "react-icons/fi";
import { Link } from "react-router";
import api from "../../../services/api";

export default function IncluirPersonagem() {

    const [nome, setNome] = useState('');
    const [classeCodigo, setClasseCodigo] = useState('');
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        if(classes.length <= 0) {
            api.get('Classe').then(
                response => {
                    setClasses(response.data);
                }
            )
        }
    }, [])

    async function postPersonagem(event) {
        if(nome && classeCodigo) {
            try {
                const data = {
                    nome,
                    classeCodigo
                }
                await api
                    .post('Personagem', data)
                    .then(alert('Personagem cadastrado'));
            } catch(error) {
                alert('Erro ao salvar Personagem ' + error);
            }
        } else {
            alert('Há campos obrigatórios que não estão preenchidos');
        }
    }

    return (
        <div className="incluir-personagem-container">
            <div className="content">
                <section className="form">
                    <FiFilePlus size={105} color="#17202a" />
                    <h1>Novo Personagem</h1>
                    <Link className="back-list" to="/personagens">
                        <FiCornerDownLeft size={105} color="#17202a" />
                    </Link>
                </section>
                <form onSubmit={postPersonagem}>
                    <input placeholder="Nome" maxLength={30} onChange={e => setNome(e.target.value)} required/>
                    <select value={classeCodigo} onChange={e => setClasseCodigo(e.target.value)} required>
                        <option value="">Selecione uma Classe...</option>
                        {classes.map(classe => (
                            <option value={classe.codigo}>{classe.descricao}</option>
                        ))}
                    </select>
                    <button className="button" type="submit">Salvar</button>
                </form>
            </div>
        </div>
    )
}

