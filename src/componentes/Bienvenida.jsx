import React from 'react'

import axios from 'axios';

import regalos from '../img/inicio/regalos.png';
import serpentinas from '../img/inicio/serpentinas.png';
import serpentinas2 from '../img/inicio/serpentinas2.png';

import { instanceOf } from 'prop-types';

import { withCookies, Cookies } from 'react-cookie';

var completa = {
    height : "100vh",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    backgroundColor: '#EDEDED',
}
    
const rest = 'https://0nic8g379k.execute-api.sa-east-1.amazonaws.com/dev/tratego';

const s3 = 'https://tratego246b0be5c8cb404cb931ed626cc6cc1e161530-dev.s3.sa-east-1.amazonaws.com/public/empresa';

class Bienvenida extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
        empresa: []
        };
    }

    componentDidMount() {
        this.cargarInterfaz();
    }

    cargarInterfaz = async() => {
        //window.location.hostname
        const query = JSON.stringify({
            "dominio": "tienda-cebc4.web.app"
        });
    
        await axios.post(`${rest}/contrato/dominio`,JSON.parse(query),{ headers:{"Content-Type":"application/json"}})
            .then(res => {
                const con = res.data;
                var c = Object.values(con);
                this.setState({empresa: c[1]});
        });
    }

    irlogin = () => {
        window.location.href='/login';
    }

    render() {
        if(this.state.empresa[0] !== undefined){
            return (
                <div style={completa}>
                    <div className="empresa_bienvenida" style={{background: this.state.empresa[0].color1}}>
                        <div>
                            <img src={`${s3}/${this.state.empresa[0].archivo}`} alt={this.state.empresa[0].nombre_negocio} className="logo_inicio"/>
                            <br/>
                            <img src={regalos} className="imagen_regalo" alt="regalos"/>
                            <h3>Reciba sus beneficios aqui</h3>
                            <button style={{background: this.state.empresa[0].color2}} onClick={this.irlogin}>Acceder</button>
                        </div>
                        <img src={serpentinas} className="imagen_serpentinas" alt="regalos"/>
                    <img src={serpentinas2} className="imagen_serpentinas2" alt="regalos"/>
                    </div>
                </div>
            )
        }else{
            return (
                <div style={completa}>
                    <iframe src="https://giphy.com/embed/jAYUbVXgESSti" title="cargando" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                </div>
            )
        }
    }
}

export default withCookies(Bienvenida);