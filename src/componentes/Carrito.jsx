import React from "react";

import Header from "./Header";

import axios from "axios";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { IconButton } from "@material-ui/core";

import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";

import { useLocation, useNavigate, useParams } from "react-router-dom";

export function withRouter(Child) {
  return (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return (
      <Child
        {...props}
        navigate={navigate}
        location={location}
        params={params}
      />
    );
  };
}

function Retiro(props) {
  if (props.value[0] === "domicilio/oficina") {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="cuadro_retiro_c">
              <table>
                <tr>
                  <td>
                    <b>Direccion </b>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={props.value[1]}
                      onChange={props.onChange[0]}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Referencia</b>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={props.value[2]}
                      onChange={props.onChange[1]}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Fecha </b>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={props.value[3]}
                      onChange={props.onChange[2]}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Hora </b>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={props.value[4]}
                      onChange={props.onChange[3]}
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (props.value[0] === "endoso") {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="cuadro_retiro">
              <table>
                <tr>
                  <td>
                    <b>Direccion </b>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={props.value[1]}
                      onChange={props.onChange[0]}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Referencia</b>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={props.value[2]}
                      onChange={props.onChange[1]}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Fecha </b>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={props.value[3]}
                      onChange={props.onChange[2]}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Hora </b>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={props.value[4]}
                      onChange={props.onChange[3]}
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="col">
            <div className="cuadro_retiro">
              <table>
                <tr>
                  <td>
                    <b>Nombre</b>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={props.value[5]}
                      onChange={props.onChange[4]}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Mensaje</b>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={props.value[6]}
                      onChange={props.onChange[5]}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Telefono</b>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={props.value[7]}
                      onChange={props.onChange[6]}
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (props.value[0] === "retiro") {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7828383369174!2d-78.51467498570939!3d-0.24163813544564142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d599a3c3f60021%3A0x6097c215567bef32!2sAv.%20Napo%2C%20Quito%20170121!5e0!3m2!1ses!2sec!4v1632092997007!5m2!1ses!2sec"
              width="550"
              height="320"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              title="mapa"
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
}

function Pago(props) {
  if (props.value[0] === "efectivo") {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <label>Efectivo</label>
          </div>
        </div>
      </div>
    );
  } else if (props.value[0] === "tarjeta") {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <label>Tatjeta</label>
          </div>
        </div>
      </div>
    );
  } else if (props.value[0] === "transferencia") {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <label>Transferencia</label>
          </div>
        </div>
      </div>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
}

const rest =
  "https://0nic8g379k.execute-api.sa-east-1.amazonaws.com/dev/tratego";

class Carrito extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  state = {
    persona: [],
    producto: [],
    carrito: [],
    precio: 0,
    pagos: "efectivo",
    entrega: "retiro",

    direccion: "",
    referencia: "",
    fecha: "",
    hora: "",

    nombre: "",
    mensaje: "",
    telefono: "",

    puntos: "",
    valor_punto: 0,
    usados: 0,
    menor: false,
    contar: 0,

    subtotal: 0,
    total_pagar: 0,
  };

  componentDidMount() {
    this.cargar();
  }

  cargar = async () => {
    const { cookies } = this.props;
    await this.setState({ persona: cookies.get("persona") });
    await this.setState({ puntos: cookies.get("puntos") });
    await cookies.set("valor_punto", cookies.get("persona").valor_punto, {
      path: "/beneficios",
      maxAge: 3600,
    });
    await this.setState({ valor_punto: cookies.get("valor_punto") });
    //await this.logear();
    //this.setState({producto: cookies.get('produ')[0]})

    if (cookies.get("carrito") !== undefined) {
      this.setState({ carrito: cookies.get("carrito") });
    } else {
      this.setState({ carrito: [] });
    }
    if (cookies.get("precios") !== undefined) {
      this.setState({ precio: parseFloat(cookies.get("precios")) });
    } else {
      this.setState({ precio: 0 });
    }
    this.calcularSubtotal();
    this.pagar();
    console.log(this.state.carrito);
    console.log(this.state.precio);
  };

  constructor() {
    super();
    this.onChangeValue1 = this.onChangeValue1.bind(this);
    this.onChangeValue2 = this.onChangeValue2.bind(this);
  }

  async onChangeValue1(event) {
    let re = await event.target.value;
    this.setState({ pagos: re });
  }

  async onChangeValue2(event) {
    let re = await event.target.value;
    this.setState({ entrega: re });
  }

  /*initMap = (map)=> {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });
    }*/

  insertarCompraD = async () => {
    const query = JSON.stringify({
      tipo_pago: this.state.pagos,
      tipo_entrega: this.state.entrega,
      estado: "Comprado",

      carrito: this.state.carrito,

      direccion: this.state.direccion,
      referencia: this.state.referencia,
      hora: this.state.hora,
      fecha: this.state.fecha,
    });

    await axios
      .post(`${rest}/compra/domicilio`, JSON.parse(query), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        const con = res.data;
        var c = Object.values(con);
        console.log(c);
      });
  };

  insertarCompraE = async () => {
    const query = JSON.stringify({
      tipo_pago: this.state.pagos,
      tipo_entrega: this.state.entrega,
      estado: "Comprado",

      carrito: this.state.carrito,

      direccion: this.state.direccion,
      referencia: this.state.referencia,
      hora: this.state.hora,
      fecha: this.state.fecha,

      nombre: this.state.nombre,
      mensaje: this.state.mensaje,
      telefono: this.state.telefono,
    });

    await axios
      .post(`${rest}/compra/endoso`, JSON.parse(query), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        const con = res.data;
        var c = Object.values(con);
        console.log(c);
      });
  };

  insertarCompraR = async () => {
    if (this.props.cookies.get("persona").tipo === "club") {
      const query = JSON.stringify({
        tipo_pago: this.state.pagos,
        tipo_entrega: this.state.entrega,
        estado: "Pendiente",
        puntos_usados: this.state.usados,

        carrito: this.state.carrito,
      });
      await axios
        .post(`${rest}/compra/retiro`, JSON.parse(query), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          const con = res.data;
          Object.values(con);
        });
    } else if (this.props.cookies.get("persona").tipo === "gift") {
      var unidades = 0;
      this.state.carrito.map((ca) => {
        if (ca.unidades !== undefined) {
          unidades += parseInt(ca.unidades);
        } else {
          unidades += parseInt(ca.unidades);
        }
        return unidades;
      });
      const query = JSON.stringify({
        tipo_pago: this.state.pagos,
        tipo_entrega: this.state.entrega,
        estado: "Pendiente",
        puntos_usados: unidades,

        carrito: this.state.carrito,
      });
      await axios
        .post(`${rest}/compra/retiro`, JSON.parse(query), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          const con = res.data;
          Object.values(con);
        });
    }
  };

  calcularTotal = (precio, unidad) => {
    var total = parseFloat(precio) * parseFloat(unidad);
    return parseFloat(total);
  };

  calcularSubtotal = async () => {
    var subtotal = 0;
    for (var i = 0; i < this.state.carrito.length; i++) {
      if (this.state.carrito[i].valor_venta !== undefined) {
        subtotal +=
          this.state.carrito[i].valor_venta * this.state.carrito[i].unidades;
      } else {
        subtotal +=
          this.state.carrito[i].costo * this.state.carrito[i].unidades;
      }
    }
    subtotal = subtotal.toFixed(2);
    if (this.props.cookies.get("persona").tipo === "gift") {
      await this.setState({ subtotal: 0 });
    } else if (this.props.cookies.get("persona").tipo === "club") {
      await this.setState({ subtotal: parseFloat(subtotal) });
    }
  };

  comprarProductos = async () => {
    const { cookies } = this.props;
    if (this.state.entrega === "domicilio/oficina") {
      await this.insertarCompraD();
    } else if (this.state.entrega === "endoso") {
      await this.insertarCompraE();
    } else if (this.state.entrega === "retiro") {
      await this.insertarCompraR();
    }
    await cookies.set("carrito", [], { path: "/beneficios", maxAge: 3600 });
    await cookies.set("precios", 0, { path: "/beneficios", maxAge: 3600 });
  };

  dirHandleChange = (event) => {
    this.setState({ direccion: event.target.value });
  };

  refHandleChange = (event) => {
    this.setState({ referencia: event.target.value });
  };

  fecHandleChange = (event) => {
    this.setState({ fecha: event.target.value });
  };

  horHandleChange = (event) => {
    this.setState({ hora: event.target.value });
  };

  nomHandleChange = (event) => {
    this.setState({ nombre: event.target.value });
  };

  mensajeHandleChange = (event) => {
    this.setState({ mensaje: event.target.value });
  };

  telHandleChange = (event) => {
    this.setState({ telefono: event.target.value });
  };

  usarTodo = async () => {
    var puntos = 0;
    while (true) {
      puntos += 1;
      if (this.state.valor_punto * puntos >= this.state.total_pagar) {
        break;
      }
    }
    await this.setState({ usados: puntos });
    this.pagar();
  };

  handleEliminar = async (id) => {
    const { cookies } = this.props;
    const res = this.state.carrito;
    res.forEach(async (currentValue, index, arr) => {
      var total = 0;
      if (currentValue.id_inventario === id) {
        const pre = currentValue.unidades * currentValue.valor_venta;
        await this.setState({ precio: this.state.precio - pre });
        await this.setState({ subtotal: this.state.subtotal - pre });
        total = this.state.subtotal * 0.12 + this.state.subtotal;
        if (total === 0) {
          await this.setState({ total_pagar: "GRATIS" });
        } else {
          await this.setState({ total_pagar: total });
        }
        res.splice(index, 1);
        await this.setState({ carrito: res });
        cookies.set("carrito", this.state.carrito, { path: "/beneficios" });
        cookies.set("precios", parseFloat(this.state.precio), {
          path: "/beneficios",
        });
      }
      if (currentValue.id_catalogo === id) {
        const pre = currentValue.unidades * currentValue.costo;
        await this.setState({ precio: this.state.precio - pre });
        await this.setState({ subtotal: this.state.subtotal - pre });
        total = this.state.subtotal * 0.12 + this.state.subtotal;
        if (total === 0) {
          await this.setState({ total_pagar: "GRATIS" });
        } else {
          await this.setState({ total_pagar: total });
        }

        res.splice(index, 1);
        await this.setState({ carrito: res });
        cookies.set("carrito", this.state.carrito, { path: "/beneficios" });
        cookies.set("precios", parseFloat(this.state.precio), {
          path: "/beneficios",
        });
      }
    });
    this.setState({usados: 0})
    this.pagar();
  };

  sumar = async () => {
    if (this.state.usados < this.state.puntos && this.state.total_pagar > 0) {
      if (this.state.menor === true) {
        await this.setState({ usados: this.state.usados + 1 });
        await this.setState({ contar: this.state.contar + 1 });
      } else {
        await this.setState({ usados: this.state.usados + 10 });
      }
      this.pagar();
    }
  };

  restar = async () => {
    if (this.state.usados > 0) {
      if (this.state.menor === true) {
        await this.setState({ usados: this.state.usados - 1 });
        await this.setState({ contar: this.state.contar - 1 });
      } else {
        await this.setState({ usados: this.state.usados - 10 });
      }
      this.pagar();
    }
  };

  pagar = async () => {
    var total = this.state.subtotal * 0.12 + this.state.subtotal;
    var comprob =
      parseFloat(this.state.valor_punto) * parseFloat(this.state.usados + 10);
    if (total - comprob < 0) {
      if (this.state.contar === 0) {
        await this.setState({ menor: !this.state.menor });
      }
    }

    total =
      total -
      parseFloat(this.state.valor_punto) * parseFloat(this.state.usados);
    total = total.toFixed(2);
    if (total <= 0) {
      await this.setState({ total_pagar: "GRATIS" });
    } else {
      await this.setState({ total_pagar: total });
    }
  };

  render() {
    const d = (
      <Retiro
        value={[
          this.state.entrega,
          this.state.direccion,
          this.state.referencia,
          this.state.fecha,
          this.state.hora,
          this.state.nombre,
          this.state.mensaje,
          this.state.telefono,
        ]}
        onChange={[
          this.dirHandleChange,
          this.refHandleChange,
          this.fecHandleChange,
          this.horHandleChange,
          this.nomHandleChange,
          this.menHandleChange,
          this.telHandleChange,
        ]}
      />
    );
    const p = <Pago value={[this.state.pagos]} />;
    return (
      <React.Fragment>
        <Header
          carrito={this.state.carrito.length}
          precios={this.state.precio}
          nombre={this.state.persona.nombre}
        />
        <div className="carrito_t">
          <label>Carrito de compras</label>
          <TableContainer component={Paper}>
            <Table aria-label="spanning table">
              <TableHead>
                {this.props.cookies.get("persona").tipo === "club" && (
                  <TableRow
                    className="enca_carrito"
                    style={{
                      background: this.props.cookies.get("persona").color1,
                    }}
                  >
                    <TableCell>
                      <b className="enca_carrito_text">Descripcion</b>
                    </TableCell>
                    <TableCell align="right">
                      <b className="enca_carrito_text">Valor Unitario</b>
                    </TableCell>
                    <TableCell align="right">
                      <b className="enca_carrito_text">Unidades</b>
                    </TableCell>
                    <TableCell align="right">
                      <b className="enca_carrito_text">Precio</b>
                    </TableCell>
                    <TableCell align="right" style={{ width: 100 }}>
                      <b className="enca_carrito_text">Funciones</b>
                    </TableCell>
                  </TableRow>
                )}
                {this.props.cookies.get("persona").tipo === "gift" && (
                  <TableRow className="enca_carrito">
                    <TableCell>
                      <b className="enca_carrito_text">Descripcion</b>
                    </TableCell>
                    <TableCell align="right">
                      <b className="enca_carrito_text">Unidades</b>
                    </TableCell>
                    <TableCell align="right">
                      <b className="enca_carrito_text">Precio</b>
                    </TableCell>
                    <TableCell align="right" style={{ width: 100 }}>
                      <b className="enca_carrito_text">Funciones</b>
                    </TableCell>
                  </TableRow>
                )}
              </TableHead>
              <TableBody>
                {this.state.carrito.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <h3 className="carro_vacio">El carrito esta vacio</h3>
                    </TableCell>
                  </TableRow>
                )}
                {this.state.carrito.map((car) => {
                  if (
                    car.nombre !== undefined &&
                    this.props.cookies.get("persona").tipo === "club"
                  ) {
                    return (
                      <TableRow key={car.id}>
                        <TableCell className="tabla_text">
                          {car.nombre}
                        </TableCell>
                        <TableCell className="tabla_text" align="right">
                          {car.valor_venta}
                        </TableCell>
                        <TableCell className="tabla_text" align="right">
                          {car.unidades}
                        </TableCell>
                        <TableCell className="tabla_text" align="right">
                          {this.calcularTotal(car.valor_venta, car.unidades)}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="inherit"
                            onClick={() =>
                              this.handleEliminar(car.id_inventario)
                            }
                          >
                            <DeleteIcon
                              className="tabla_text"
                              fontSize="small"
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  } else if (
                    car.procedimiento !== undefined &&
                    this.props.cookies.get("persona").tipo === "club"
                  ) {
                    return (
                      <TableRow key={car.id}>
                        <TableCell>{car.procedimiento}</TableCell>
                        <TableCell align="right">{car.costo}</TableCell>
                        <TableCell align="right">{car.unidades}</TableCell>
                        <TableCell align="right">
                          {this.calcularTotal(car.costo, car.unidades)}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="inherit"
                            onClick={() => this.handleEliminar(car.id_catalogo)}
                          >
                            <DeleteIcon
                              className="tabla_text"
                              fontSize="small"
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  } else if (
                    car.nombre !== undefined &&
                    this.props.cookies.get("persona").tipo === "gift"
                  ) {
                    return (
                      <TableRow key={car.id}>
                        <TableCell className="tabla_text">
                          {car.nombre}
                        </TableCell>

                        <TableCell className="tabla_text" align="right">
                          {car.unidades}
                        </TableCell>
                        <TableCell className="tabla_text" align="right">
                          <b>Gratis</b>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="inherit"
                            onClick={() =>
                              this.handleEliminar(car.id_inventario)
                            }
                          >
                            <DeleteIcon
                              className="tabla_text"
                              fontSize="small"
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  } else if (
                    car.procedimiento !== undefined &&
                    this.props.cookies.get("persona").tipo === "gift"
                  ) {
                    return (
                      <TableRow key={car.id}>
                        <TableCell className="tabla_text">
                          {car.procedimiento}
                        </TableCell>

                        <TableCell className="tabla_text" align="right">
                          {car.unidades}
                        </TableCell>
                        <TableCell className="tabla_text" align="right">
                          <b>Gratis</b>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="inherit"
                            onClick={() => this.handleEliminar(car.id_catalogo)}
                          >
                            <DeleteIcon
                              className="tabla_text"
                              fontSize="small"
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  }
                  return "";
                })}
                {this.props.cookies.get("persona").tipo === "club" && (
                  <TableRow>
                    <TableCell rowSpan={5} />
                    <TableCell colSpan={1}>
                      <b>
                        Monedas :{" "}
                        {Intl.NumberFormat("de-DE").format(
                          this.state.puntos - this.state.usados
                        )}
                      </b>
                    </TableCell>
                    <TableCell colSpan={1} align="right">
                      <button
                        className="boton_todos"
                        style={{
                          background: this.props.cookies.get("persona").color2,
                        }}
                        onClick={this.usarTodo}
                      >
                        Usar todos los puntos
                      </button>
                    </TableCell>
                    <TableCell colSpan={1} align="center">
                      <IconButton
                        color="secondary"
                        size="small"
                        onClick={this.restar}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <b className="puntos_carrito">{this.state.usados}</b>
                      <IconButton
                        color="secondary"
                        size="small"
                        onClick={this.sumar}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )}
                {this.props.cookies.get("persona").tipo === "gift" && (
                  <TableRow>
                    <TableCell rowSpan={5} />
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell colSpan={2} align="center">
                      {this.state.subtotal}
                    </TableCell>
                  </TableRow>
                )}
                {this.props.cookies.get("persona").tipo === "club" && (
                  <TableRow>
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell colSpan={2} align="center">
                      {this.state.subtotal}
                    </TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell>IVA</TableCell>
                  <TableCell align="right">12%</TableCell>
                  <TableCell colSpan={2} align="center">
                    {(this.state.subtotal * 0.12).toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell colSpan={2} align="center">
                    {this.state.total_pagar}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <label>Tipo de entrega</label>
          <Paper>
            <div onChange={this.onChangeValue2} className="entrega_boton">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="propiedad"
                  value="retiro"
                  onChange={() => true}
                  checked={this.state.entrega === "retiro"}
                />
                <b>Proveedor</b>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="propiedad"
                  value="domicilio/oficina"
                  onChange={() => true}
                  checked={this.state.entrega === "domicilio/oficina"}
                />
                <b>Domicilio/Oficina </b>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="propiedad"
                  value="endoso"
                  onChange={() => true}
                  checked={this.state.entrega === "endoso"}
                />
                <b>Endoso </b>
              </div>
            </div>
            {d}
            <br />
          </Paper>
          <br />
          <label>Tipo de pago</label>
          <Paper>
            <div className="form-group">
              <div onChange={this.onChangeValue1} className="entrega_boton">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="pagos"
                    value="efectivo"
                    onChange={() => true}
                    checked={this.state.pagos === "efectivo"}
                  />
                  <b>Efectivo </b>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="pagos"
                    value="tarjeta"
                    onChange={() => true}
                    checked={this.state.pagos === "tarjeta"}
                  />
                  <b>Tarjeta </b>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="pagos"
                    value="transferencia"
                    onChange={() => true}
                    checked={this.state.pagos === "transferencia"}
                  />
                  <b>Transferencia </b>
                </div>
              </div>
            </div>
            {p}
            <br />
          </Paper>
          <div className="div_compra">
            <button
              className="boton_compra"
              onClick={this.comprarProductos}
              style={{ background: this.props.cookies.get("persona").color2 }}
            >
              Comprar
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withCookies(withRouter(Carrito));
