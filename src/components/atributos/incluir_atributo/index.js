import React, { useState } from "react";
import './incluir-atributo-styles.css';
import { FiCornerDownLeft, FiFilePlus } from "react-icons/fi";
import { Link } from "react-router";
import api from "../../../services/api";

export default function IncluirAtributo() {

    const [descricao, setDescricao] = useState('');
    const [apresentacao, setApresentacao] = useState('');

    async function postAtributo(event) {
        if(descricao && apresentacao) {
            try {
                const data = {
                    descricao,
                    apresentacao
                }
                await api
                    .post('Atributo', data)
                    .then(alert('Atributo cadastrado'));
            } catch(error) {
            alert('Erro ao salvar Atributo ' + error);
            }
        } else {
            alert('Há campos obrigatórios que não estão preenchidos');
        }
    }

    return (
        <div className="incluir-atributo-container">
            <div className="content">
                <section className="form">
                    <FiFilePlus size={105} color="#17202a" />
                    <h1>Novo Atributo</h1>
                    <Link className="back-list" to="/atributos">
                        <FiCornerDownLeft size={105} color="#17202a" />
                    </Link>
                </section>
                <form onSubmit={postAtributo}>
                    <input placeholder="Descrição" maxLength={50} onChange={e => setDescricao(e.target.value)} required/>
                    <select value={apresentacao} onChange={e => setApresentacao(e.target.value)} required>
                        <option value="">Selecione uma Apresentação...</option>
                        <option value="Absoluto">Absoluto</option>
                        <option value="Porcentagem">Porcentagem</option>
                    </select>
                    <button className="button" type="submit">Salvar</button>
                </form>
            </div>
        </div>
    )
}

