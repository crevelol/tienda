import React from 'react'

import SearchIcon from '@material-ui/icons/Search';

import AccountCircle from '@material-ui/icons/AccountCircle';

import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

const s3 = 'https://tratego246b0be5c8cb404cb931ed626cc6cc1e161530-dev.s3.sa-east-1.amazonaws.com/public/empresa';

class Header extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        carrito: '',
        precios: '',
        buscador: this.props.buscador,
    }

    abrirCarrito = ()=>{
        window.location.href='/beneficios/carrito';
    }

    abrirBuscador = (event)=>{
        if(this.state.buscador!==undefined){
            window.location.href=`/beneficios/busqueda/all/${this.state.buscador}`;
        }else{
            window.location.href=`/beneficios/busqueda/all/${""}`;
        }
        event.preventDefault();
    }

    busHandleChange = (event) => {
        this.setState({buscador: event.target.value})
    }

    cerrarsesion = ()=>{
        const { cookies } = this.props;
        cookies.remove('persona',{path: "/"})
        cookies.remove('carrito',{path: "/beneficios"})
        cookies.remove('puntos',{path: "/beneficios"})
        cookies.remove('precios',{path: "/beneficios"})
        window.location.href='/login';
    }

    render() {
        return (
            <React.Fragment>
                <div className="heade">
                    <div className="row">
                        <div className="col-lg-3 col-md-12 head_b">
                            <a href="/beneficios">
                                <img src={`${s3}/${this.props.cookies.get('persona').archivo}`} alt="logo"/>
                            </a>
                        </div>
                        <div className="col-lg-5 col-md-12 head_b">
                            <form onSubmit={this.abrirBuscador}>
                                {/*
                                    <select className="select-selected">
                                        <option>Categorias</option>
                                    </select>
                                */}
                                <input type="text" value={this.state.buscador} onChange={this.busHandleChange}/>
                                <button type="submit" className="boton_buscar" style={{background: this.props.cookies.get('persona').color2, border: 'none'}}>
                                    <SearchIcon fontSize="medium"/> 
                                </button>
                            </form>
                        </div>
                        <div className="col-lg-2 col-md-6 col-4 head_b" onClick={this.cerrarsesion}>
                            <AccountCircle className="cuenta" style={{color: this.props.cookies.get('persona').color2}}/>
                            <b style={{color: this.props.cookies.get('persona').color2}}> {this.props.nombre}</b>
                        </div>
                        <div className="col-lg-2 col-md-6 col-8 head_b">
                            <div style={{color: this.props.cookies.get('persona').color2}}>
                                {this.props.cookies.get('persona').tipo === "gift" && <strong>Carrito de regalos</strong>}
                                {this.props.cookies.get('persona').tipo === "club" && <strong>Carrito de compras</strong>}
                                <br/>
                                {this.props.cookies.get('persona').tipo === "club" && 
                                    <label>{this.props.carrito} item ${this.props.precios}</label>
                                }
                                {this.props.cookies.get('persona').tipo === "gift" && 
                                    <label>{this.props.carrito} item GRATIS</label>
                                }
                            </div>
                            <div>
                                <button className="boton_carro" onClick={this.abrirCarrito} >
                                    <i className='bx bx-cart'></i>
                                </button>
                            </div> 
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withCookies(Header);