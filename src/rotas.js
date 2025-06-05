import React from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Atributos from "./components/atributos/consulta_atributos";

export default function Rotas() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <div>
                        <h1>Pagina Inicial</h1>
                        <Link className="button" to="atributos">Atributos</Link>
                    </div>
                }/>
                <Route path="/atributos" element={<Atributos />}/>
            </Routes>
        </BrowserRouter>
    )
}