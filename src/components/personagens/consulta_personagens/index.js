import React, { useEffect, useState } from "react";
import './consulta-personagens-styles.css';
import api from "../../../services/api";
import {FiEdit, FiTrash } from "react-icons/fi";
import { FaMintbit } from "react-icons/fa6";
import { Link } from "react-router";

export default function ConsultaPersonagens() {
    
    const [personagens, setPersonagens] = useState([]);

    useEffect(() => {
        let montado = true;
        let tempoTentarNovamente;

        const carregarPersonagens = async () => {
            try {
                const response = await api.get("Personagem");
                if (montado) {
                    if (response.data.length > 0) {
                        setPersonagens(response.data);
                    } else {
                        console.log("Nenhum personagem encontrado, tentando novamente em 5 segundos...");
                        tempoTentarNovamente = setTimeout(carregarPersonagens, 5000); // tenta de novo em 5s
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar personagens:" + error);
            }
        };
        
        carregarPersonagens();

        return () => {
            montado = false;
            clearTimeout(tempoTentarNovamente); // limpa o timeout se o componente for desmontado
        };
    }, []);

    return(
        <div className="personagens-container">
            <Link className="button" to="/">Página Inicial</Link>
            <h1>Lista de Personagens</h1>
            <Link className="button" to="incluir">Novo Personagem</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Classe</th>
                        <th className="thOpcoes">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        personagens.map(personagem => (
                            <tr>
                                <td>{personagem.codigo}</td>
                                <td>{personagem.nome}</td>
                                <td>{personagem.classe.descricao}</td>
                                <td className="tdOpcoes">
                                    <Link to={`alterar/${personagem.codigo}`}>
                                        <button type="button">
                                            <FiEdit size="25" color="#17202a" />
                                        </button>
                                    </Link>
                                    <Link to={`excluir/${personagem.codigo}`}>
                                        <button type="button">
                                            <FiTrash size="25" color="#FF5555" />
                                        </button>
                                    </Link>
                                    <Link to={`itens/${personagem.codigo}`}>
                                        <button type="button">
                                            <FaMintbit size="25" color="#0000FF" />
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}