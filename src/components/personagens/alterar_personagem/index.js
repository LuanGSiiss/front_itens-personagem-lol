import React, { useCallback, useEffect, useState } from "react";
import './alterar-personagem-styles.css';
import { FiCornerDownLeft, FiFileText } from "react-icons/fi";
import { Link, useParams } from "react-router";
import api from "../../../services/api";

export default function AlterarPersonagem(){

    const {codigo} = useParams();
    const [nome, setNome] = useState('');
    const [classeCodigo, setClasseCodigo] = useState('');
    const [classes, setClasses] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        if(classes.length <= 0) {
            api.get('Classe').then(
                response => {
                    setClasses(response.data);
                }
            )
        }
    }, [])

    const loadPersonagem = useCallback(async () => {
        try{
            const response = await api.get('Personagem/'+codigo);
            setNome(response.data.nome);
            setClasseCodigo(response.data.classeCodigo);
        }catch(error){
            alert("Erro ao carregar Personagem!" + error);
        }
    }, [codigo, setNome, setClasseCodigo])

    useEffect(() => {
        if(!load){
            loadPersonagem();
            setLoad(true);
        }
    }, [load, loadPersonagem, setLoad])

    async function putPersonagem() {
        if (codigo && nome && classeCodigo) {
            try{
                const data = {
                    codigo,
                    nome,
                    classeCodigo
                }
    
                await api.put('Personagem', data)
                    .then(alert("Personagem alterado"));
                
            }catch(error){
                alert("Erro ao alterar Personagem!" + error);
            }
        } else {
            alert('Há campos obrigatórios que não estão preenchidos');
        }
    }

    return(
        <div className="alterar-personagem-container">
            <div className="content">
                <section className="form">
                    <FiFileText size={105} color="#17202a" /> 
                    <h1>Alterar Personagem</h1>
                    <Link className="back-link" to="/personagens">
                        <FiCornerDownLeft size={105} color="#17202a" />
                    </Link>
                </section>
                <form onSubmit={putPersonagem}>
                    <input placeholder="Código" value={codigo}  readOnly/>
                    <input placeholder="Nome" maxLength={30} value={nome} onChange={e => setNome(e.target.value)} required/>
                    <select value={classeCodigo} onChange={e => setClasseCodigo(e.target.value)} required>
                        {classes.map(classe => (
                            <option value={classe.codigo}>{classe.descricao}</option>
                        ))}
                    </select>
                    <button className="button" type="submit">Salvar</button>
                </form>
            </div>
        </div>
    )
}