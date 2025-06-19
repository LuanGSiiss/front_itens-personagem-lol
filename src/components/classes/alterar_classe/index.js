import React, { useCallback, useEffect, useState } from "react";
import './alterar-classe-styles.css';
import { FiCornerDownLeft, FiFileText } from "react-icons/fi";
import { Link, useParams } from "react-router";
import api from "../../../services/api";

export default function AlterarClasse(){

    const {codigo} = useParams();
    const [descricao, setDescricao] = useState('');
    const [load, setLoad] = useState(false);

    const loadClasse = useCallback(async () => {
        try{
            const response = await api.get('Classe/'+codigo);
            setDescricao(response.data.descricao);
        }catch(error){
            alert("Erro ao carregar Classe!" + error);
        }
    },[codigo, setDescricao])

    useEffect(() => {
        if(!load){
            loadClasse();
            setLoad(true);
        }
    },[load, loadClasse, setLoad])

    async function putClasse() {
        if (codigo && descricao) {
            try{
                const data = {
                    codigo,
                    descricao
                }
    
                await api.put('Classe', data)
                    .then(alert("Classe alterada"));
    
            }catch(error){
                alert("Erro ao alterar Classe!" + error);
            }
        } else {
            alert('Há campos obrigatórios que não estão preenchidos');
        }
    }

    return(
        <div className="alterar-classe-container">
            <div className="content">
                <section className="form">
                    <FiFileText size={105} color="#17202a" /> 
                    <h1>Alterar Classe</h1>
                    <Link className="back-link" to="/classes">
                        <FiCornerDownLeft size={105} color="#17202a" />
                    </Link>
                </section>
                <form onSubmit={putClasse}>
                    <input placeholder="Código" value={codigo}  readOnly/>
                    <input placeholder="Descrição" maxLength={50} value={descricao} onChange={e => setDescricao(e.target.value)} required/>
                    <button className="button" type="submit">Salvar</button>
                </form>
            </div>
        </div>
    )
}