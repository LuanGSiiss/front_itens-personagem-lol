import React, { useEffect, useState } from "react";
import './visualizar-item-styles.css';
import { useParams, Link } from "react-router-dom";
import api from "../../../services/api";

export default function VisualizarItem() {
    const { codigo } = useParams();
    const [item, setItem] = useState(null);
    const [classe, setClasse] = useState('');
    const [atributos, setAtributos] = useState([]);
    const [efeitosPassivos, setEfeitosPassivos] = useState([]);

    useEffect(() => {
        async function carregarItem() {
            try {
                const response = await api.get(`Item/${codigo}`);
                setItem(response.data);
                
                const classeResp = await api.get(`Classe/${response.data.classeCodigo}`);
                setClasse(classeResp.data.descricao);

                const atributosResp = await api.get(`ItemAtributo/item/${codigo}`);
                setAtributos(atributosResp.data);

                const efeitosResp = await api.get(`EfeitoPassivo/item/${codigo}`);
                setEfeitosPassivos(efeitosResp.data);

                console.log(atributos);
            } catch (error) {
                alert("Erro ao carregar item.");
            }
        }
        carregarItem();
    }, [codigo]);

    if (!item) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="visualizar-item-container">
            <div className="content">
                <section className="form">
                    <h1>Visualizar Item</h1>
                    <div className="item-dados">
                        <strong>Nome:</strong>
                        <p>{item.nome}</p>

                        <strong>Preço:</strong>
                        <p>{item.preco}</p>

                        <strong>Classe:</strong>
                        <p>{classe}</p>

                        <strong>Efeito Ativo:</strong>
                        <p>{item.efeitoAtivo || "Nenhum"}</p>
                    </div>

                    <div className="item-atributos">
                        <h3>Atributos</h3>
                        {atributos.map((attr, index) => (
                            <div className="atributo-item">
                                <p key={index}>
                                <strong>{attr.descricao || `Atributo ${attr.atributoCodigo}`}</strong>: {attr.valor}
                                </p>
                            </div>
                        ))}
                
                    </div>
                    
                    <div className="item-efeitos">
                        <h3>Efeitos Passivos</h3>
                        {efeitosPassivos.map((efeito, index) => (
                            <div>
                                <p key={index}>
                                <strong>{efeito.nome}</strong>: {efeito.descricao}
                            </p>
                            </div>
                            
                        ))}
                    
                    </div>
                    <Link className="button-voltar" to="/itens">
                        Voltar
                    </Link>
                </section>
            </div>
        </div>
    );
}
