import React from "react";

import Rating from "@material-ui/lab/Rating";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";

import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";

import promo_g from "../img/beneficiario/promo_g.jfif";
import promo_p1 from "../img/beneficiario/promo_p1.jfif";
import promo_p2 from "../img/beneficiario/promo_p2.jfif";

var imagen_fondo_g = {
  backgroundImage: `url(${promo_p1})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

var imagen_fondo_p1 = {
  backgroundImage: `url(${promo_g})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right",
};

var imagen_fondo_p2 = {
  backgroundImage: `url(${promo_p2})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

const rest =
  "https://0nic8g379k.execute-api.sa-east-1.amazonaws.com/dev/tratego";
const s3_p =
  "https://tratego246b0be5c8cb404cb931ed626cc6cc1e161530-dev.s3.sa-east-1.amazonaws.com/public/producto";
const s3_s =
  "https://tratego246b0be5c8cb404cb931ed626cc6cc1e161530-dev.s3.sa-east-1.amazonaws.com/public/servicio";

class Beneficiario extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.logear();
    this.state = {
      categorias: [],
      subcategorias: [],
      productos: [],
      servicios: [],
      id_productos: [],
      id_productos2: [],
      id_cate_p: "",
      id_cate_s: "",
      puntos: "",
    };
  }

  logear = async () => {
    const { cookies } = this.props;
    const query = JSON.stringify({
      id_listado: cookies.get("persona").id_listado,
      sucursal: 3,
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
    const { cookies } = this.props;
    await this.setState({ categorias: c[1] });
    await this.setState({ subcategorias: c[4] });
    await this.setState({ productos: c[2] });
    await this.setState({ servicios: c[3] });
    await cookies.set("puntos", cookies.get("persona").puntos, {
      path: "/beneficios",
    });
    await this.setState({ puntos: cookies.get("puntos") });
    this.repetido();
  };

  repetido = async () => {
    var produ = [...this.state.productos];
    var servi = [...this.state.servicios];
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

  loghandleSubmit = async (event) => {
    event.preventDefault();
    window.location.href = "/";
  };

  escogerProducto = (id) => {
    window.location.href = `/beneficios/producto/${id}`;
  };

  escogerServicio = (id) => {
    window.location.href = `/beneficios/servicio/${id}`;
  };

  asignarCategoria = (id) => {
    const a = this.state.categorias.find((item) => item.id_categoria === id);
    return a.categoria;
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

  cerrarsesion = () => {
    const { cookies } = this.props;
    cookies.remove("persona", { path: "/" });
    cookies.remove("carrito", { path: "/beneficios" });
    cookies.remove("puntos", { path: "/beneficios" });
    cookies.remove("precios", { path: "/beneficios" });
    window.location.href = "/login";
  };

  render() {
    if (
      this.state.servicios.length > 0 ||
      this.state.productos.length > 0
    ) {
      return (
        <React.Fragment>
          <div className="enca_b">
            <div className="catego">
              <div
                id="inicio"
                style={{ background: this.props.cookies.get("persona").color2 }}
              >
                <b>Categorias</b>
              </div>
              <div id="opciones">
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
                              <ul
                                className="subcatego"
                                key={sub.id_subcategoria}
                              >
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
            <div className="bnav">
              <div
                className="menu"
                style={{ background: this.props.cookies.get("persona").color1 }}
              >
                <div className="icono_coin_div">
                  <b className="icono_coin2">
                    ENTREGAS DISPONIBLES :{" "}
                    <i className="icofont-motor-biker"> 2</i>
                  </b>
                  {this.props.cookies.get("persona").tipo === "club" && (
                    <b className="icono_coin">
                      MONEDAS :{" "}
                      <i className="icofont-money-bag">
                        {" "}
                        {Intl.NumberFormat("de-DE").format(this.state.puntos)}
                      </i>
                    </b>
                  )}
                  {this.props.cookies.get("persona").tipo === "gift" && (
                    <b className="icono_coin">
                      REGALOS A ELECCION :{" "}
                      <i className="icofont-gift"> {this.state.puntos}</i>
                    </b>
                  )}
                </div>
              </div>
              <div id="contenido">
                <div className="producto">
                  <div className="grande" style={imagen_fondo_g}>
                    {/*
                                      <br/>
                                      <br/>
                                      <b>Estamos para ti</b>
                                      <br/>
                                      <b>Soluciones integrales</b>
                                      <br/>
                                      <b>Tecnología de vanguardia</b>
                                      */}
                  </div>
                  <div className="pequeño1" style={imagen_fondo_p1}></div>
                  <div className="pequeño2" style={imagen_fondo_p2}></div>
                  <div className="pequeño3"></div>
                </div>
                <div className="iconos">
                  <div className="icono">
                    <i className="ri-gift-line"></i>
                    <b>Recompensas de fidelidad</b>
                  </div>
                  <div className="icono">
                    <i className="ri-coins-line"></i>
                    <b>Precios mas bajos</b>
                  </div>
                  <div className="icono">
                    <i className="ri-truck-line"></i>
                    <div>
                      <b>Entregas gratuitas</b>
                    </div>
                  </div>
                  <div className="icono">
                    <i className="ri-secure-payment-fill"></i>
                    <div>
                      <b>Compras seguras</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="info_publicidad">
            <label>Premiamos tu fidelidad con 200 Ambamonedas</label>
            <br />
            <label className="texto_menor">
              Las cuales podrás utilizarlas para obtener servicios y productos
              de tu preferencia.
            </label>
            <br />
            <button
              onClick={() =>
                (window.location.href = "/beneficios/busqueda/todos")
              }
            >
              Explorar
            </button>
          </div>
          <hr
            className="best_linea"
            style={{
              border: "1px solid " + this.props.cookies.get("persona").color2,
            }}
          />
          <div className="fondo_beneficiario">
            <div className="info_cuadros">
              <label>Servicios Nuevos</label>
            </div>
            <div className="productos">
              <div className="row row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-1">
                {this.state.servicios.map((servi) => {
                  if (this.props.cookies.get("persona").tipo === "club") {
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
                  } else if (
                    this.props.cookies.get("persona").tipo === "gift"
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
                            <label className="precio_produ">REGALO</label>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return "";
                })}
              </div>
            </div>

            <div className="info_cuadros">
              <label>Productos Nuevos</label>
            </div>

            <div className="productos">
              <div className="row row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-1">
                {this.state.productos.map((prod) => {
                  if (this.props.cookies.get("persona").tipo === "club") {
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
                              size="small"
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
                  } else if (
                    this.props.cookies.get("persona").tipo === "gift"
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
                              size="small"
                              className="estrella"
                            />
                            <br />
                            <label className="precio_produ">REGALO</label>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return "";
                })}
              </div>
            </div>

            {/*<h1>{this.state.email}</h1>
                      <h1>{this.state.persona.nombre}</h1>
                          <h1>{this.state.persona.cedula}</h1>*/}
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <div className="cargador_completo">
          <CircularProgress size={70} />
        </div>
      );
    }
  }
}

export default withCookies(Beneficiario);
