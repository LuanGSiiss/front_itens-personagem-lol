import React from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

export default function Rotas() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <div>
                        <h1>Pagina Inicial - Itens Personsagem Lol</h1>
                        
                    </div>
                }/>
            </Routes>
        </BrowserRouter>
    )
}