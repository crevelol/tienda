import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './lib/icofont/icofont.min.css'
import './lib/boxicons/css/boxicons.min.css'
import './lib/remixicon/remixicon.css'

import React from 'react'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login from './componentes/Login';
import Index from './componentes/Index';
import Bienvenida from './componentes/Bienvenida';
import Busqueda from './componentes/Busqueda';
import Producto from './componentes/Producto';
import Servicio from './componentes/Servicio';
import Carrito from './componentes/Carrito';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Bienvenida/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/beneficios" element={<Index/>}/>
        <Route path="/beneficios/busqueda/:id" element={<Busqueda/>}>
          <Route path="/beneficios/busqueda/:id/:busqueda" element={<Busqueda/>}/>
        </Route>
        <Route exact path="/beneficios/producto/:id" element={<Producto/>}/>
        <Route exact path="/beneficios/servicio/:id" element={<Servicio/>}/>
        <Route path="/beneficios/carrito" element={<Carrito/>}/>
      </Routes>
    </Router>
  );
}

export default App;
