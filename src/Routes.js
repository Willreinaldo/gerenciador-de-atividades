
import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';

//Páginas da aplicação
import Login from './pages/User/Login';
//Página de rota não encontrada
import NotFound from './pages/NotFound';

export default function Routers() {
    return(
        <BrowserRouter>
                <Routes>
                    {/* Login */}
                    <Route path={'/login'} component={Login} exact/>
                    {/* Rota de home */}
                    {/* Rotas inexistentes */}
                    <Route path={'*'} component={NotFound}/>
                </Routes>
        </BrowserRouter>
    )
}
