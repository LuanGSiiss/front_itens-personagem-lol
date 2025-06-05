import React, { useEffect, useState } from "react";
import './consulta-atributos-styles.css';
import api from "../../../services/api";
import {FiEdit, FiTrash } from "react-icons/fi"
import { Link } from "react-router";

export default function Atributos() {
    
    const [atributos, setAtributos] = useState([]);

    useEffect(() => {
        if(atributos.length <= 0) {
            api.get('Atributo').then(
                response => {
                    setAtributos(response.data);
                }
            )
        }
    })
    
    return(
        <div className="atributos-container">
            <h1>Lista de Atributos</h1>
            <Link className="button" to="incluir">Novo Atributo</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descrição</th>
                        <th>Apresentação</th>
                        <th className="thOpcoes">Opções</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {
                        
                        atributos.map(atributo => (
                            <tr>
                                <td>{atributo.codigo}</td>
                                <td>{atributo.descricao}</td>
                                <td>{atributo.apresentacao}</td>
                                <td className="tdOpcoes">
                                    <Link to={`alterar/${atributo.codigo}`}>
                                        <button type="button">
                                            <FiEdit size="25" color="#17202a" />
                                        </button>
                                    </Link>
                                    <Link to={`excluir/${atributo.codigo}`}>
                                        <button type="button">
                                            <FiTrash size="25" color="#FF5555" />
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