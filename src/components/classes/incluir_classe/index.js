import React, { useState } from "react";
import './incluir-classe-styles.css';
import { FiCornerDownLeft, FiFilePlus } from "react-icons/fi";
import { Link } from "react-router";
import api from "../../../services/api";

export default function IncluirClasse() {

    const [descricao, setDescricao] = useState('');

    async function postClasse(event) {
        if(descricao) {
            try {
                const data = {
                    descricao,
                }
                await api
                    .post('Classe', data)
                    .then(alert('Classe cadastrado'));
            } catch(error) {
            alert('Erro ao salvar Classe ' + error);
            }
        } else {
            alert('Há campos obrigatórios que não estão preenchidos');
        }
    }

    return (
        <div className="incluir-classe-container">
            <div className="content">
                <section className="form">
                    <FiFilePlus size={105} color="#17202a" />
                    <h1>Nova Classe</h1>
                    <Link className="back-list" to="/classes">
                        <FiCornerDownLeft size={105} color="#17202a" />
                    </Link>
                </section>
                <form onSubmit={postClasse}>
                    <input placeholder="Descrição" maxLength={20} onChange={e => setDescricao(e.target.value)} required/>
                    <button className="button" type="submit">Salvar</button>
                </form>
            </div>
        </div>
    )
}

