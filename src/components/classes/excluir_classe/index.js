import React from "react";
import './excluir-classe-styles.css';
import { FiCornerDownLeft, FiFileMinus } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router";
import api from "../../../services/api";

export default function ExcluirClasse(){

    const {codigo} = useParams();
    const navigate = useNavigate();

    async function deletaClasse() {
        if (codigo) {
            try{
                await api.delete('Classe/'+codigo);
                alert("Classe excluída!");
                navigate("/classes");
            }catch(error){
                alert("Erro ao excluir Classe!" + error);
            }
        } else {
            alert('Código está em branco');
        }
    }

    return(
        <div className="excluir-classe-container">
            <div className="content">
                <section className="form">
                    <FiFileMinus size={105} color="#17202a" /> 
                    <h1>Excluir Classe</h1>
                    <Link className="back-link" to="/classes">
                        <FiCornerDownLeft size={105} color="#17202a" />
                    </Link>
                </section>
                <div className="formExibir">
                    <h1>Codigo: {codigo}</h1>
                    <button className="button" onClick={deletaClasse}>Excluir</button>
                </div>
            </div>
        </div>
    )
}