import React from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import IncluirAtributo from "./components/atributos/incluir_atributo";
import AlterarAtributo from "./components/atributos/alterar_atributo";
import ExcluirAtributo from "./components/atributos/excluir_atributo";
import ConsultaAtributos from "./components/atributos/consulta_atributos";
import ConsultaClasses from "./components/classes/consulta_classes";
import IncluirClasse from "./components/classes/incluir_classe";
import AlterarClasse from "./components/classes/alterar_classe";
import ExcluirClasse from "./components/classes/excluir_classe";
import ConsultaPersonagens from "./components/personagens/consulta_personagens";
import IncluirPersonagem from "./components/personagens/incluir_personagem";
import AlterarPersonagem from "./components/personagens/alterar_personagem";
import ExcluirPersonagem from "./components/personagens/excluir_personagem";
import ConsultaItens from "./components/itens/consulta_itens";
import IncluirItem from "./components/itens/incluir_item";
import VisualizarItem from "./components/itens/visualizar_item";

export default function Rotas() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <div>
                        <h1>Pagina Inicial</h1>
                        <Link className="button" to="atributos">Atributos</Link>
                        <Link className="button" to="classes">Classes</Link>
                        <Link className="button" to="personagens">Personagens</Link>
                        <Link className="button" to="itens">Itens</Link>
                    </div>
                }/>

                <Route path="/atributos" element={<ConsultaAtributos />}/>
                <Route path="/atributos/incluir" element={<IncluirAtributo />}/>
                <Route path="/atributos/alterar/:codigo" element={<AlterarAtributo />} />
                <Route path="/atributos/excluir/:codigo" element={<ExcluirAtributo />} />

                <Route path="/classes" element={<ConsultaClasses />}/>
                <Route path="/classes/incluir" element={<IncluirClasse />}/>
                <Route path="/classes/alterar/:codigo" element={<AlterarClasse />} />
                <Route path="/classes/excluir/:codigo" element={<ExcluirClasse />} />

                <Route path="/personagens" element={<ConsultaPersonagens />}/>
                <Route path="/personagens/incluir" element={<IncluirPersonagem />}/>
                <Route path="/personagens/alterar/:codigo" element={<AlterarPersonagem />} />
                <Route path="/personagens/excluir/:codigo" element={<ExcluirPersonagem />} />

                <Route path="/itens" element={<ConsultaItens />} />
                <Route path="/itens/incluir" element={<IncluirItem />} />
                <Route path="/itens/visualizar/:codigo" element={<VisualizarItem />} />
            </Routes>
        </BrowserRouter>
    )
}