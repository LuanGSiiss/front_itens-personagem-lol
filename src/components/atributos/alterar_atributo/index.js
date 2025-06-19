import React, { useCallback, useEffect, useState } from "react";
import './alterar-atributo-styles.css';
import { FiCornerDownLeft, FiFileText } from "react-icons/fi";
import { Link, useParams } from "react-router";
import api from "../../../services/api";

export default function AlterarAtributo(){

    const {codigo} = useParams();
    const [descricao, setDescricao] = useState('');
    const [apresentacao, setApresentacao] = useState('');
    const [load, setLoad] = useState(false);

    const loadAtributo = useCallback(async () => {
        try{
            const response = await api.get('Atributo/'+codigo);
            setDescricao(response.data.descricao);
            setApresentacao(response.data.apresentacao);
        }catch(error){
            alert("Erro ao carregar Atributo!" + error);
        }
    }, [codigo, setDescricao, setApresentacao])

    useEffect(() => {
        if(!load){
            loadAtributo();
            setLoad(true);
        }
    }, [load, loadAtributo, setLoad])

    async function putAtributo() {
        if (codigo && descricao && apresentacao) {
            try{
                const data = {
                    codigo,
                    descricao,
                    apresentacao
                }
    
                await api.put('Atributo', data)
                    .then(alert("Atributo alterado"));
                
            }catch(error){
                alert("Erro ao alterar Atributo!" + error);
            }
        } else {
            alert('Há campos obrigatórios que não estão preenchidos');
        }
    }

    return(
        <div className="alterar-atributo-container">
            <div className="content">
                <section className="form">
                    <FiFileText size={105} color="#17202a" /> 
                    <h1>Alterar Atributo</h1>
                    <Link className="back-link" to="/atributos">
                        <FiCornerDownLeft size={105} color="#17202a" />
                    </Link>
                </section>
                <form onSubmit={putAtributo}>
                    <input placeholder="Código" value={codigo}  readOnly/>
                    <input placeholder="Descrição" maxLength={50} value={descricao} onChange={e => setDescricao(e.target.value)} required/>
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