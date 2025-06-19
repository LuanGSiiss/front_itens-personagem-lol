import React, { useEffect, useState } from "react";
import './incluir-item-styles.css';
import { FiCornerDownLeft, FiFilePlus } from "react-icons/fi";
import { Link } from "react-router";
import api from "../../../services/api";

export default function IncluirItem() {

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [efeitoAtivo, setEfeitoAtivo] = useState('');
    const [classeCodigo, setClasseCodigo] = useState('');
    const [efeitosPassivos, setEfeitosPassivos] = useState([
        {nome: "", descricao: ""}
    ]);
    const [itemAtributos, setItemAtributos] = useState([
        { atributoCodigo: 0, valor: 0}
    ]);

    const [classes, setClasses] = useState([]);
    const [atributos, setAtributos] = useState([]);
    

    //Carregar Classes
    useEffect(() => {
        if(classes.length <= 0) {
            api.get('Classe').then(
                response => {
                    setClasses(response.data);
                }
            )
        }
    }, [])

    //Carregar Atributos
    useEffect(() => {
        if(atributos.length <= 0) {
            api.get('Atributo').then(
                response => {
                    setAtributos(response.data);
                }
            )
        }
    }, [])

    //Parte do Efeito Passivo
    const adicionarEfeitoPassivo = () => {
        setEfeitosPassivos([...efeitosPassivos, {nome: "", descricao: ""}]);
        console.log(efeitosPassivos);
    }

    const atualizarEfeito = (index, campo, valor) => {
        const novosEfeitos = [...efeitosPassivos];
        novosEfeitos[index][campo] = valor;
        setEfeitosPassivos(novosEfeitos);
    };

    const removerEfeitoPassivo = (index) => {
        const novosEfeitos = efeitosPassivos.filter((_, i) => i !== index);
        setEfeitosPassivos(novosEfeitos);
    };

    //Parte de Atributos
    const adicionarItemAtributo = () => {
        setItemAtributos([...itemAtributos, { atributoCodigo: 0, valor: 0}]);
        console.log(itemAtributos);
    }

    const atualizarItemAtributo = (index, campo, valor) => {
        const novosItemAtributos= [...itemAtributos];
        novosItemAtributos[index][campo] = valor;
        setItemAtributos(novosItemAtributos);
    };

    const removerItemAtributo = (index) => {
        const novos  = itemAtributos.filter((_, i) => i !== index);
        setItemAtributos(novos);
    };

    async function postItem(event) {

        const atributosValidos = itemAtributos.every(attr => attr.atributoCodigo && attr.valor);
        const efeitosValidos = efeitosPassivos.every(e => e.nome && e.descricao);
        
        if(nome && preco && classeCodigo && atributosValidos && efeitosValidos) {
            //Primeiro o Item
            try {
                const data = {
                    nome,
                    preco,
                    efeitoAtivo,
                    classeCodigo
                }
                const response = await api
                    .post('Item', data);
                const itemCodigo = response.data.codigo

                //Cadastrar Atributos associados
                for (const atributo of itemAtributos) {
                    await api.post('ItemAtributo', {
                        itemCodigo: itemCodigo,
                        atributoCodigo: atributo.atributoCodigo,
                        valor: atributo.valor
                    });
                }

                //Cadastrar Efeitos Passivos associados
                for (const efeito of efeitosPassivos) {
                    await api.post('EfeitoPassivo', {
                        nome: efeito.nome,
                        descricao: efeito.descricao,
                        itemCodigo: itemCodigo
                    });
                }

                alert('Item, Atributos e Efeitos passivos cadastrados com sucesso!');

            } catch(error) {
            alert('Erro ao salvar Item ' + error);
            }
        } else {
            alert('Há campos obrigatórios que não estão preenchidos');
        }
    }

    return (
        <div className="incluir-item-container">
            <div className="content">
                <section className="form">
                    <FiFilePlus size={105} color="#17202a" />
                    <h1>Novo Item</h1>
                    <Link className="back-list" to="/itens">
                        <FiCornerDownLeft size={105} color="#17202a" />
                    </Link>
                </section>
                <form onSubmit={postItem}>
                    <input placeholder="Nome" maxLength={100} onChange={e => setNome(e.target.value)} required/>
                    <input type="number" placeholder="Preco" onChange={e => setPreco(e.target.value)} required/>
                    <input placeholder="EfeitoAtivo" maxLength={400} onChange={e => setEfeitoAtivo(e.target.value)} />
                    <select value={classeCodigo} onChange={e => setClasseCodigo(e.target.value)} required>
                        <option value="">Selecione uma Classe...</option>
                        {classes.map(classe => (
                            <option value={classe.codigo}>{classe.descricao}</option>
                        ))}
                    </select>
                    <div>
                        <h3>Atributos</h3>
                        {itemAtributos.map((ItemAtributo, index) => (
                            <div key={index} style={{ marginBottom: "15px", border: "1px solid #ccc", padding: "10px" }}>
                                <select value={ItemAtributo.atributoCodigo} required
                                    onChange={(e) => atualizarItemAtributo(index, "atributoCodigo", e.target.value)} style={{ display: "block", marginBottom: "8px" }}
                                >
                                    <option value="">Selecione o Atributo...</option>
                                    {atributos.map((atributo, i) => (
                                        <option key={i} value={atributo.codigo}>{atributo.descricao} - {atributo.apresentacao}</option>
                                    ))}
                                </select>

                                <input type="number" placeholder="Valor" value={ItemAtributo.valor} required
                                    onChange={(e) => atualizarItemAtributo(index, "valor", e.target.value)}
                                    style={{ display: "block", marginBottom: "8px" }}
                                />
                                <button type="button" onClick={() => removerItemAtributo(index)}>Remover</button>
                            </div>
                        ))}

                        <button type="button" onClick={adicionarItemAtributo}>Adicionar Atributo</button>
                    </div>
                    <div>
                        <h3>Efeitos Passivos</h3>
                        {efeitosPassivos.map((efeito, index) => (
                            <div key={index} style={{ marginBottom: "15px", border: "1px solid #ccc", padding: "10px" }}>
                                <input type="text" placeholder="Nome do efeito" value={efeito.nome} required
                                    onChange={(e) => atualizarEfeito(index, "nome", e.target.value)}
                                    style={{ display: "block", marginBottom: "8px" }}
                                />
                                <input type="text" placeholder="Descrição" value={efeito.descricao} required
                                    onChange={(e) => atualizarEfeito(index, "descricao", e.target.value)}
                                    style={{ display: "block", marginBottom: "8px" }}
                                />
                                <button type="button" onClick={() => removerEfeitoPassivo(index)}>Remover</button>
                            </div>
                        ))}

                        <button type="button" onClick={adicionarEfeitoPassivo}>Adicionar efeito</button>
                    </div>

                    <button className="button" type="submit">Salvar</button>
                </form>
            </div>
        </div>
    )
}

