import React from "react";

import Header from "./Header";

import Rating from "@material-ui/lab/Rating";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";

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

const rest =
  "https://0nic8g379k.execute-api.sa-east-1.amazonaws.com/dev/tratego";
const s3_p =
  "https://tratego246b0be5c8cb404cb931ed626cc6cc1e161530-dev.s3.sa-east-1.amazonaws.com/public/producto";
const s3_s =
  "https://tratego246b0be5c8cb404cb931ed626cc6cc1e161530-dev.s3.sa-east-1.amazonaws.com/public/servicio";

class Busqueda extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  state = {
    persona: [],
    categorias: [],
    subcategorias: [],
    subcategoria: "",
    buscador: this.props.params.busqueda,
    carrito: [],
    id_productos: [],
    id_productos2: [],
    id_cate_p: "",
    id_cate_s: "",
    productos: [],
    servicios: [],
    productos_c: [],
    servicios_c: [],
    filtro_produ: false,
    filtro_servi: false,
  };

  componentDidMount() {
    this.cargarBuscador();
    this.logear();
    const { cookies } = this.props;
    this.setState({ persona: cookies.get("persona") });
    if (cookies.get("carrito") !== undefined) {
      this.setState({ carrito: cookies.get("carrito") });
    } else {
      this.setState({ carrito: [] });
    }
    if (cookies.get("precios") !== undefined) {
      this.setState({ precio: cookies.get("precios") });
    } else {
      this.setState({ precio: 0 });
    }
    if (
      this.props.params !== undefined &&
      Object.keys(this.props.params).length === 1
    ) {
      this.setState({ subcategoria: this.props.params.id });
    } else {
      this.setState({ subcategoria: "all" });
    }
    this.repetido();
  }

  logear = async () => {
    const { cookies } = this.props;
    const query = JSON.stringify({
      id_listado: cookies.get("persona").id_listado,
      sucursal: 1,
      grupo: cookies.get("persona").id_grupo,
    });

    await axios
      .post(`${rest}/persona/login`, JSON.parse(query), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        const con = res.data;
        var c = Object.values(con);
        this.cargarDatos(c);
      });
  };

  cargarDatos = async (c) => {
    await this.setState({ categorias: c[1] });
    await this.setState({ subcategorias: c[4] });
    await this.setState({ productos: c[2] });
    await this.setState({ servicios: c[3] });
    await this.setState({ productos_c: c[2] });
    await this.setState({ servicios_c: c[3] });
    await this.findMatchesS(this.state.buscador);
    await this.findMatchesP(this.state.buscador);

    this.repetido();
    for (var i = 0; i < this.state.productos.length; i++){
      if(parseInt(this.state.subcategoria) === this.state.productos[i].id_subcategoria){
        this.setState({filtro_produ: true})
        break;
      }
    }
    for (var j = 0; j < this.state.servicios.length; j++){
      if(parseInt(this.state.subcategoria) === this.state.servicios[j].id_subcategoria){
        this.setState({filtro_servi: true})
        break;
      }
    }
  };

  cargarBuscador = async () => {
    if (
      this.props.params !== undefined &&
      Object.keys(this.props.params).length === 2
    ) {
      await this.setState({ buscador: this.props.params.busqueda });
    } else {
      this.setState({ buscador: "" });
    }
  };

  repetido = async () => {
    var produ = [...this.state.productos_c];
    var servi = [...this.state.servicios_c];
    for (var i = 0; i < servi.length; i++) {
      produ.push(servi[i]);
    }

    var id = produ.map(function (prod) {
      return prod.id_subcategoria;
    });
    var ordenado = id.sort();

    var id2 = produ.map(function (prod) {
      return prod.id_categoria;
    });
    var ordenado2 = id2.sort();

    var unique = ordenado.filter(function (value, index) {
      return value !== ordenado[index + 1];
    });

    var unique2 = ordenado2.filter(function (value, index) {
      return value !== ordenado2[index + 1];
    });

    await this.setState({ id_productos: unique });
    await this.setState({ id_productos2: unique2 });
  };

  mostrarCategoria = async (id) => {
    if (this.state.id_cate_p === "") {
      await this.setState({ id_cate_p: id });
    } else {
      await this.setState({ id_cate_p: "" });
    }
  };

  mostrarServicio = async (id) => {
    if (this.state.id_cate_s === "") {
      await this.setState({ id_cate_s: id });
    } else {
      await this.setState({ id_cate_s: "" });
    }
  };

  escogerProducto = (id) => {
    window.location.href = `/beneficios/producto/${id}`;
  };

  escogerServicio = (id) => {
    window.location.href = `/beneficios/servicio/${id}`;
  };

  findMatchesP = async (wordToSearch) => {
    const res = this.state.productos.filter((place) => {
      const regex = new RegExp(wordToSearch, "gi");

      return place.nombre.match(regex) || place.descripcion.match(regex);
    });

    await this.setState({ productos: res });
  };

  findMatchesS = async (wordToSearch) => {
    console.log(this.state.servicios);
    const res2 = this.state.servicios.filter((place) => {
      console.log(wordToSearch);
      const regex2 = new RegExp(wordToSearch, "gi");

      return (
        place.procedimiento.match(regex2) || place.descripcion.match(regex2)
      );
    });

    await this.setState({ servicios: res2 });
  };

  render() {
    return (
      <React.Fragment>
        <Header
          carrito={this.state.carrito.length}
          precios={this.state.precio}
          nombre={this.state.persona.nombre}
          buscador={this.state.buscador}
        />
        <div className="busqueda_header">
          <div
            id="catego_bus"
            style={{ background: this.props.cookies.get("persona").color2 }}
          >
            Categorias
          </div>
          <div
            id="pro_ser_bus"
            style={{ background: this.props.cookies.get("persona").color1 }}
          >
            {this.state.subcategoria !== "all" && (
              <button
                className="botonMostrar"
                disabled={this.state.subcategoria === "all"}
                style={{ background: this.props.cookies.get("persona").color2 }}
                onClick={() => this.setState({ subcategoria: "all" })}
              >
                Mostrar todas las categorias
              </button>
            )}
          </div>
        </div>
        <div className="busqueda_header">
          <div className="catego">
            <div id="opciones2">
              {this.state.categorias.map((ca) => {
                if (
                  this.state.id_productos2.find(
                    (element) => element === ca.id_categoria
                  ) !== undefined
                ) {
                  return (
                    <ul key={ca.id_categoria} className="catego_2">
                      <li
                        onClick={() => {
                          this.mostrarCategoria(ca.id_categoria);
                        }}
                      >
                        <label>
                          {ca.categoria}
                          <i className="icofont-curved-right" />
                        </label>
                      </li>
                      {this.state.subcategorias.map((sub) => {
                        if (
                          this.state.id_cate_p === ca.id_categoria &&
                          sub.id_categoria === ca.id_categoria &&
                          this.state.id_productos.find(
                            (element) => element === sub.id_subcategoria
                          ) !== undefined
                        ) {
                          return (
                            <ul className="subcatego">
                              <a
                                href={`/beneficios/busqueda/${sub.id_subcategoria}`}
                              >
                                <li>{sub.subcategoria}</li>
                              </a>
                            </ul>
                          );
                        }
                        return "";
                      })}
                    </ul>
                  );
                }
                return "";
              })}
            </div>
          </div>
          <div id="pro_ser_bus_2">
            <div className="productos">
            {(this.state.servicios.length === 0 || this.state.productos.length === 0) && (
                <div className="cargador">
                  <CircularProgress size={70} />
                </div>
              )}
              {this.state.filtro_produ ? 
                <div className="info_cuadros_b">
                  <label>Productos Nuevos</label>
                </div>
               : 
                <React.Fragment></React.Fragment>
              }
              <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1">
                {this.state.productos.map((prod) => {
                  if (
                    prod.id_subcategoria ===
                      parseInt(this.state.subcategoria) ||
                    this.state.subcategoria === "all"
                  ) {
                    return (
                      <div className="caja_produ col">
                        <div
                          key={prod.id_producto}
                          className="produ"
                          onClick={() =>
                            this.escogerProducto(prod.id_inventario)
                          }
                        >
                          <div className="produ_img">
                            <img src={`${s3_p}/${prod.archivo}`} alt="" />
                          </div>
                          <div className="produ_texto">
                            <label className="descripcion_produ">
                              {prod.nombre}
                            </label>
                            <br />
                            <Rating
                              name="read-only"
                              value={5}
                              readOnly
                              size="medium"
                              className="estrella"
                            />
                            <br />
                            <label className="precio_produ">
                              {" "}
                              $ {prod.valor_venta}
                            </label>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return "";
                })}
              </div>
              {this.state.filtro_servi ? 
                <div className="info_cuadros_b">
                  <label>Servicios Nuevos</label>
                </div>
               : 
                <React.Fragment></React.Fragment>
              }
              <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1">
                {this.state.servicios.map((servi) => {
                  if (
                    servi.id_subcategoria ===
                      parseInt(this.state.subcategoria) ||
                    this.state.subcategoria === "all"
                  ) {
                    return (
                      <div className="caja_produ col">
                        <div
                          key={servi.id_catalogo}
                          className="produ"
                          onClick={() =>
                            this.escogerServicio(servi.id_catalogo)
                          }
                        >
                          <div className="produ_img">
                            <img src={`${s3_s}/${servi.archivo}`} alt="" />
                          </div>
                          <div className="produ_texto">
                            <label className="descripcion_produ">
                              {servi.procedimiento}
                            </label>
                            <br />
                            <Rating
                              name="read-only"
                              value={5}
                              readOnly
                              size="medium"
                              className="estrella"
                            />
                            <br />
                            <label className="precio_produ">
                              {" "}
                              $ {servi.costo}
                            </label>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return "";
                })}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withCookies(withRouter(Busqueda));
