import React from 'react'

import axios from 'axios';

import img_fondo from '../img/beneficiario/fondo_login.jpg';

import { instanceOf } from 'prop-types';

import { withCookies, Cookies } from 'react-cookie';

var completa = {
    height : "100vh",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    backgroundColor: '#EDEDED',
    }

var imagen_fondo = {
    backgroundImage: `url(${img_fondo})`,
    backgroundSize: '100vh 100vh',
}

var login = {
    backgroundColor: 'white',
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    height : "90vh"
}

const rest = 'https://0nic8g379k.execute-api.sa-east-1.amazonaws.com/dev/tratego';

const s3 = 'https://tratego246b0be5c8cb404cb931ed626cc6cc1e161530-dev.s3.sa-east-1.amazonaws.com/public/empresa';

class Login extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
        email: '',
        password: '',
        showG: true,
        empresa: [],
        error: false,
        grupos: [],
        grupo: 0,
        compras: 0
        };
        this.onChangeValue = this.onChangeValue.bind(this);
    }

    componentDidMount() {
        this.cargarInterfaz();
    }

    async onChangeValue(event) {
        let re = await event.target.value;
        this.setState({ grupo: re});
    }

    emaHandleChange = (event) => {
        this.setState({email: event.target.value})
    }

    passHandleChange = (event) => {
        this.setState({password: event.target.value})
    }

    cargarInterfaz = async() => {
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

    selecGrupo = async() => {
        const query = JSON.stringify({
            "correo": this.state.email,
            "password": this.state.password,
            "id_empresa": this.state.empresa[0].id_empresa
        });
    
        await axios.post(`${rest}/persona/grupo`,JSON.parse(query),{ headers:{"Content-Type":"application/json"}})
            .then(res => {
                const con = res.data;
                var c = Object.values(con);
                this.setState({grupos: c[1]});
        });
    }

    cargarDatos = async(c) => {
        const { cookies } = this.props;
        await cookies.set('persona', c[1], { path: '/', maxAge: 3600 });
    }

    logear = async() => {
        if(this.state.email!==""&&this.state.password!==""){
            const query = JSON.stringify({
                "correo": this.state.email,
                "password": this.state.password,
                "grupo": this.state.grupo
            });
    
            await axios.post(`${rest}/persona/login/inicial`,JSON.parse(query),{ headers:{"Content-Type":"application/json"}})
                .then(res => {
                    const con = res.data;
                    var c = Object.values(con);
                    this.cargarDatos(c);
            });
        }
    }

    logear_compras = async() => {
        if(this.state.email!==""&&this.state.password!==""){
            const query = JSON.stringify({
                "correo": this.state.email,
                "password": this.state.password,
                "grupo": this.state.grupo
            });
    
            await axios.post(`${rest}/persona/login/inicial/compras`,JSON.parse(query),{ headers:{"Content-Type":"application/json"}})
                .then(res => {
                    const con = res.data;
                    var c = Object.values(con);
                    this.cargarDatos(c);
            });
        }
    }

    compras = async() => {
        if(this.state.email!==""&&this.state.password!==""){
            const query = JSON.stringify({
                "correo": this.state.email,
                "password": this.state.password,
                "grupo": this.state.grupo
            });
    
            await axios.post(`${rest}/persona/login/compras`,JSON.parse(query),{ headers:{"Content-Type":"application/json"}})
                .then(res => {
                    const con = res.data;
                    var c = Object.values(con);
                    console.log(c[1].length)
                    this.setState({compras: c[1].length})
            });
        }
    }

    loghandleSubmit = async event => {
        event.preventDefault();
        await this.selecGrupo();
        if(this.state.grupos.length === 1){
            await this.setState({grupo: this.state.grupos[0].id_grupo})
            await this.compras();
            if(this.state.compras>0){
                await this.logear_compras();
            }else{
                await this.logear();
            }
            window.location.href='/beneficios';
        }else if(this.state.grupos.length > 1){
            this.setState({showG: !this.state.showG})
        }else if(this.state.grupos.length === 0){
            this.setState({error: true})
        }
    }

    log2handleSubmit = async event => {
        event.preventDefault();
        if(this.state.compras>0){
            await this.logear_compras();
        }else{
            await this.logear();
        }
        window.location.href='/beneficios';
    }

    render() {
        if(this.state.showG && this.state.empresa[0] !== undefined){
            return (
                <div style={completa}>
                    <div className="container login">
                        <div className="row">
                            <div className="col fondo_login" style={imagen_fondo}>
                                <img src={`${s3}/${this.state.empresa[0].archivo}`} alt={this.state.empresa[0].nombre_negocio}/>
                                <h4>Bienvenido a tus beneficios</h4>
                                <h4>Gracias por preferirnos</h4>
                            </div>
                            <div className="col" style={login}>
                                <div className="container centrar_login">
                                    <div className="row">
                                        <div className="col">
                                            <label className="letra_login">INGRESO A SU CUENTA</label>
                                        </div>
                                    </div>
                                    <br/>
                                    <form onSubmit={this.loghandleSubmit}>
                                    <div className="row">
                                        <div className="col">
                                            <input className="formulario_login" id="correo" type="text" placeholder="Usuario" value={this.state.email} onChange={this.emaHandleChange}/>
                                            <input className="formulario_login" id="contraseña" type="password" placeholder="Password" value={this.state.password} onChange={this.passHandleChange}/>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col">
                                            <button className="formulario_submit" type="submit" style={{background: this.state.empresa[0].color2}}><strong>INGRESAR</strong></button>
                                        </div>
                                    </div>
                                    <br/>
                                    {this.state.error ? <label className="fallido2">Datos ingresados incorrectos</label> : <label></label>}
                                    <br/>
                                    <br/>
                                    </form>
                                    <label className="olvido">Olvidaste tu <a href="http://localhost:3000/admin" style={{color: this.state.empresa[0].color2}}>contraseña?</a></label>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </div>
            )
        }else if(!this.state.showG && this.state.empresa[0] !== undefined){
            return(
                <div style={completa}>
                    <form onSubmit={this.log2handleSubmit}>
                    <div className="form-group">
                    
                        <label>Seleccione su grupo</label>
                        <br/>
                        <br/>
                        <div onChange={this.onChangeValue}>
                            {this.state.grupos.map((grupo) =>(
                                <div className="form-check form-check-inline" key={grupo.id_grupo}>
                                    <input className="form-check-input" type="radio" name="grupos" value={grupo.id_grupo} onChange={this.onChangeValue} checked={parseInt(this.state.grupo) === grupo.id_grupo}/>
                                    <label className="form-check-label">{grupo.nombre_grupo}({grupo.cod})</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <br/>
                    <button type="submit"><strong>INGRESAR</strong></button>
                    </form>
                </div>
            )
        }else if(this.state.showG && this.state.empresa[0] === undefined){
            return(
                <div style={completa}>
                    <iframe src="https://giphy.com/embed/jAYUbVXgESSti" title="cargando" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                </div>
            )
        }
    }
}

export default withCookies(Login);