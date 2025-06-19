import React, { useEffect, useState } from "react";
import './consulta-classes-styles.css';
import api from "../../../services/api";
import {FiEdit, FiTrash } from "react-icons/fi"
import { Link } from "react-router";

export default function ConsultaClasses() {
    
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        if(classes.length <= 0) {
            api.get('Classe').then(
                response => {
                    setClasses(response.data);
                }
            )
        }
    })
    
    return(
        <div className="classes-container">
            <Link className="button" to="/">Página Inicial</Link>
            <h1>Lista de Classes</h1>
            <Link className="button" to="incluir">Nova Classe</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descrição</th>
                        <th className="thOpcoes">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        classes.map(classe => (
                            <tr>
                                <td>{classe.codigo}</td>
                                <td>{classe.descricao}</td>
                                <td className="tdOpcoes">
                                    <Link to={`alterar/${classe.codigo}`}>
                                        <button type="button">
                                            <FiEdit size="25" color="#17202a" />
                                        </button>
                                    </Link>
                                    <Link to={`excluir/${classe.codigo}`}>
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