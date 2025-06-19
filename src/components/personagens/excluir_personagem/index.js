import React from "react";
import './excluir-personagem-styles.css';
import { FiCornerDownLeft, FiFileMinus } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router";
import api from "../../../services/api";

export default function ExcluirPersonagem(){

    const {codigo} = useParams();
    const navigate = useNavigate();

    async function deletePersonagem() {
        if (codigo) {
            try{
                await api.delete('Personagem/'+codigo)
                    .then(alert("Personagem excluído!"));
                navigate("/personagens");
            }catch(error){
                alert("Erro ao excluir Personagem!" + error);
            }
        } else {
            alert('Código está em branco');
        }
    }

    return(
        <div className="excluir-personagem-container">
            <div className="content">
                <section className="form">
                    <FiFileMinus size={105} color="#17202a" /> 
                    <h1>Excluir Personagem</h1>
                    <Link className="back-link" to="/personagens">
                        <FiCornerDownLeft size={105} color="#17202a" />
                    </Link>
                </section>
                <div className="formExibir">
                    <h1>Codigo: {codigo}</h1>
                    <button className="button" onClick={deletePersonagem}>Excluir</button>
                </div>
            </div>
        </div>
    )
}