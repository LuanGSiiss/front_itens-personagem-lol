import React, { useEffect, useState } from "react";
import './consulta-itens-styles.css';
import api from "../../../services/api";
import {FiEdit, FiTrash } from "react-icons/fi"
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router";

export default function ConsultaItens() {
    
    const [itens, setItens] = useState([]);
    
    useEffect(() => {
        let montado = true;
        let tempoTentarNovamente;

        const carregarItens = async () => {
            try {
                const response = await api.get("Item");
                if (montado) {
                    if (response.data.length > 0) {
                        setItens(response.data);
                    } else {
                        console.log("Nenhum Item encontrado, tentando novamente em 5 segundos...");
                        tempoTentarNovamente = setTimeout(carregarItens, 5000); // tenta de novo em 5s
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar Itens:" + error);
            }
        };
        
        carregarItens();

        return () => {
            montado = false;
            clearTimeout(tempoTentarNovamente); // limpa o timeout se o componente for desmontado
        };
    }, []);

    return(
        <div className="itens-container">
            <Link className="button" to="/">Página Inicial</Link>
            <h1>Lista de Itens</h1>
            <Link className="button" to="incluir">Novo Item</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Classe</th>
                        <th className="thOpcoes">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        itens.map(item => (
                            <tr>
                                <td>{item.codigo}</td>
                                <td>{item.nome}</td>
                                <td>{item.preco}</td>
                                <td>{item.classe.descricao}</td>
                                <td className="tdOpcoes">
                                    <Link to={`alterar/${item.codigo}`}>
                                        <button type="button">
                                            <FiEdit size="25" color="#17202a" />
                                        </button>
                                    </Link>
                                    <Link to={`excluir/${item.codigo}`}>
                                        <button type="button">
                                            <FiTrash size="25" color="#FF5555" />
                                        </button>
                                    </Link>
                                    <Link to={`visualizar/${item.codigo}`}>
                                        <button type="button">
                                            <IoEyeSharp size="25" color="#0000FF" />
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