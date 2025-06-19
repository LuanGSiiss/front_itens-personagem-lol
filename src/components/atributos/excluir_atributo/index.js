import React from "react";
import './excluir-atributo-styles.css';
import { FiCornerDownLeft, FiFileMinus } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router";
import api from "../../../services/api";

export default function ExcluirAtributo(){

    const {codigo} = useParams();
    const navigate = useNavigate();

    async function deleteAtributo() {
        if (codigo) {
            try{
                await api.delete('Atributo/'+codigo)
                    .then(alert("Atributo excluído!"));
                navigate("/atributos");
            }catch(error){
                alert("Erro ao excluir Atributo!" + error);
            }
        } else {
            alert('Código está em branco');
        }
    }

    return(
        <div className="excluir-atributo-container">
            <div className="content">
                <section className="form">
                    <FiFileMinus size={105} color="#17202a" /> 
                    <h1>Excluir Atributo</h1>
                    <Link className="back-link" to="/atributos">
                        <FiCornerDownLeft size={105} color="#17202a" />
                    </Link>
                </section>
                <div className="formExibir">
                    <h1>Codigo: {codigo}</h1>
                    <button className="button" onClick={deleteAtributo}>Excluir</button>
                </div>
            </div>
        </div>
    )
}