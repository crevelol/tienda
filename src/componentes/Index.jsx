import React from 'react'

import Header from './Header';
import Beneficiario from './Beneficiario';

import { instanceOf } from 'prop-types';

import { withCookies, Cookies } from 'react-cookie';

class Index extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        carrito: [],
        precio: '',
        persona: '',
    }
    
    componentDidMount() {
        this.cargar()
        
    }

    cargar = async() =>{
        const { cookies } = this.props;
        if(cookies.get('persona')===undefined){
            window.location.href='/login';
        }
        await this.setState({persona: cookies.get('persona')});
        
        if(cookies.get('carrito')!==undefined){
            this.setState({carrito: cookies.get('carrito')})
        }else{
            this.setState({carrito: []})
        }
        if(cookies.get('precios')!==undefined){
            this.setState({precio: cookies.get('precios')})
        }else{
            this.setState({precio: 0})
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header carrito={this.state.carrito.length} precios={this.state.precio} nombre={this.state.persona.nombre}/>
                <Beneficiario/>
            </React.Fragment>
        )
    }
}

export default withCookies(Index);