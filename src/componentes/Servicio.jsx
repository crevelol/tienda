import React from 'react'

import Header from './Header'

import Carousel from 'react-elastic-carousel';
import _ from "underscore";

import axios from 'axios';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';

import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

import { useLocation, useNavigate, useParams} from 'react-router-dom';

export function withRouter( Child ) {
    return ( props ) => {
      const location = useLocation();
      const navigate = useNavigate();
      const params = useParams();
      return <Child { ...props } navigate={ navigate } location={ location } params={ params}/>;
    }
}

const rest = 'https://0nic8g379k.execute-api.sa-east-1.amazonaws.com/dev/tratego';
const s3_s = 'https://tratego246b0be5c8cb404cb931ed626cc6cc1e161530-dev.s3.sa-east-1.amazonaws.com/public/servicio';

class Servicio extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        email: '',
        password: '',
        persona: [],
        servicio: [],
        servicios: [],
        carrito: [],
        cantidad: 1,
        precio: 0,
        puntos: 0,
        showM: false,
    }

    componentDidMount() {
        this.cargar()
    }

    cargar = async() =>{
        const { cookies } = this.props;
        await this.setState({persona: cookies.get('persona')});
        await this.setState({puntos: cookies.get('puntos')})
        await this.logear();
        this.cargarServicio();

        if(cookies.get('carrito')!==undefined){
            this.setState({carrito: cookies.get('carrito')})
        }else{
            this.setState({carrito: []})
        }
        if(cookies.get('precios')!==undefined){
            this.setState({precio: parseFloat(cookies.get('precios'))})
        }else{
            this.setState({precio: 0})
        }
    }

    logear = async() => {
        const { cookies } = this.props;
        const query = JSON.stringify({
            "id_listado": cookies.get('persona').id_listado,
            "sucursal": 1,
            "grupo": cookies.get('persona').id_grupo
        });
    
        await axios.post(`${rest}/persona/login`,JSON.parse(query),{ headers:{"Content-Type":"application/json"}})
            .then(res => {
                const con = res.data;
                var c = Object.values(con);
                this.cargarDatos(c);
        });
    }

    cargarDatos = async(c) => {
        await this.setState({servicios: c[3]});
    }

    cargarServicio = async () => {
        if(this.props.params!==undefined){
            const fil = _.where(this.state.servicios, {id_catalogo: parseInt(this.props.params.id)});
            console.log(this.props.params.id)
            await this.setState({servicio: fil[0]})
        }else{
            await this.setState({servicio: []});
        }
    }

    agregarCarrito = async (serv) => {
        const { cookies } = this.props;
        var con = this.state.carrito;

        var num = con.filter((obj) =>{
            var num = 0
            if(obj.id_catalogo === serv.id_catalogo){
                num+=1
            }
            return num
        })

        if(num>0){
            con.find((obj)=>
                obj.unidades += parseInt(this.state.cantidad)
            )
        }else{
            con.push(serv)
            Object.defineProperty(con[con.length-1],'unidades',{value: this.state.cantidad,
                writable: true,
                enumerable: true,
                configurable: true})
        }

        await this.setState({carrito: con})
        var unidades = 0;
        for (var i = 0; i < this.state.carrito.length; i++){
            if(this.state.carrito[i].unidades !== undefined){
                unidades += parseInt(this.state.carrito[i].unidades);
            }else{
                unidades += parseInt(this.state.carrito[i].unidades);
            }
        }

        var precio = 0;
        if(this.props.cookies.get("persona").tipo === "club"){
            cookies.set('carrito', this.state.carrito, {path: "/beneficios", maxAge: 3600});
            
            this.state.carrito.map((ca)=>{
                if(ca.valor_venta !== undefined){
                    precio += parseFloat(ca.valor_venta)*ca.unidades;
                }else{
                    precio += parseFloat(ca.costo)*ca.unidades;
                }
                
                return parseFloat(precio).toFixed(2);
            })
            this.setState({carrito: cookies.get('carrito')})
            cookies.set('precios', precio, {path: "/beneficios", maxAge: 3600});
            this.setState({precio: cookies.get('precios')})
        }else if(unidades<=this.state.puntos && this.props.cookies.get("persona").tipo === "gift"){
            cookies.set('carrito', this.state.carrito, {path: "/beneficios", maxAge: 3600});
            this.state.carrito.map((ca)=>{
                if(ca.valor_venta !== undefined){
                    precio += parseFloat(ca.valor_venta)*ca.unidades;
                }else{
                    precio += parseFloat(ca.costo)*ca.unidades;
                }
                return parseFloat(precio).toFixed(2);
            })
            this.setState({carrito: cookies.get('carrito')})
            cookies.set('precios', precio, {path: "/beneficios", maxAge: 3600});
            this.setState({precio: cookies.get('precios')})
        }else if(unidades>this.state.puntos && this.props.cookies.get("persona").tipo === "gift"){
            this.setState({showM: true})
        }
    }

    canHandleChange = event => {
        this.setState({ cantidad: event.target.value });
    }

    handleCloseRepetida = async () => {
        this.setState({showM: false});
    };

    render() {
        return (
            <React.Fragment>
                <Dialog
                    open={this.state.showM}
                    onClose={this.handleCloseRepetida}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Sobrepaso la cantidad de regalos que puede adquirir"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        El programa te da solo {this.state.puntos} regalos para elejir de manera gratuita.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleCloseRepetida} color="primary">
                        Aceptar
                    </Button>
                    </DialogActions>
                </Dialog>
                <Header carrito={this.state.carrito.length} precios={this.state.precio} nombre={this.state.persona.nombre}/>
                <div className="seleccion_p">
                    <div className="img_produ_g2">
                        <Carousel itemsToScroll={1} itemsToShow={1}>
                            <img src={`${s3_s}/${this.state.servicio.archivo}`} alt=""/>
                            <img src={`${s3_s}/${this.state.servicio.archivo}`} alt=""/>
                            <img src={`${s3_s}/${this.state.servicio.archivo}`} alt=""/>
                            <img src={`${s3_s}/${this.state.servicio.archivo}`} alt=""/>
                        </Carousel>
                    </div>
                    <div className="cuadro img_produ_g">
                        {this.props.cookies.get('persona').tipo === "club" && 
                            <div className="cuadro_producto2">
                                <div>
                                <label className="producto_nombre">{this.state.servicio.procedimiento}</label>
                                <br/>
                                <div className="prec_cant">
                                    <div>
                                        <label className="producto_precio">USD $ {this.state.servicio.costo}</label>
                                    </div>
                                    <div>
                                        <label className="producto_cantidad">Cantidad :</label>
                                        <input className="input_cantidad" type="number" min="1" value={this.state.cantidad} onChange={this.canHandleChange}/>
                                    </div>
                                </div>
                                <button className="agregar_carrito" style={{background: this.props.cookies.get('persona').color2}} onClick={()=>this.agregarCarrito(this.state.servicio)}>Agregar al carrito</button>
                                </div>
                            </div>
                        }
                        {this.props.cookies.get('persona').tipo === "gift" && 
                            <div className="cuadro_producto2">
                                <div>
                                <label className="producto_nombre">{this.state.servicio.procedimiento}</label>
                                <br/>
                                <div className="prec_cant">
                                    <div>
                                        <label className="producto_precio">USD $ GRATIS</label>
                                    </div>
                                    <div>
                                        <label className="producto_cantidad">Cantidad :</label>
                                        <input className="input_cantidad" type="number" min="1" value={this.state.cantidad} onChange={this.canHandleChange}/>
                                    </div>
                                </div>
                                <button className="agregar_carrito" style={{background: this.props.cookies.get('persona').color2}} onClick={()=>this.agregarCarrito(this.state.servicio)}>Agregar al carrito</button>
                                </div>
                            </div>
                        }
                        <div className="cuadro_producto">
                            <label className="produ_descripcion">Descripcion</label>
                            <br/>
                            <label className="producto_descripcion">{this.state.servicio.descripcion}</label>
                        </div>
                    </div>
                    
                </div>
            </React.Fragment>
        )
    }
}

export default withCookies(withRouter(Servicio));