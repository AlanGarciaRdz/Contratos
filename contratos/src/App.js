import "./App.css";
import React from "react";
import ContratoPDF from "./utils/ContratoPDF";
import { jsPDF } from "jspdf";
import QRCode from "qrcode.react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      embed: "",
      formValues: { nombre_contrato: "", tvdvd_unidad: true },
    };

    this.leer_contrato = this.leer_contrato.bind(this);
    this.Guardar_Reservacion = this.Guardar_Reservacion.bind(this);
    this.crear_PDF = this.crear_PDF.bind(this);
    this.infoContrato = this.infoContrato.bind(this);
    this.ClaveReservacion = this.ClaveReservacion.bind(this);
  }

  componentDidMount() {
    this.apiUrl = process.env.REACT_APP_API_URL;
  }

  crear_PDF = () => {
    let development = false;
    const doc = new jsPDF("p", "pt", "letter");

    this.infoContrato().then((form_data) => {
      const qrCodeCanvas = document.querySelector("canvas");
      const qrCodeDataUri = qrCodeCanvas.toDataURL("image/jpg", 0.3);
      ContratoPDF.Contrato(
        doc,
        form_data,
        qrCodeDataUri,
        document.getElementsByName("nombre_contrato")[0].value
      );

      let data = doc.output("datauristring");
      if (development) {
        doc.output("datauristring"); //returns the data uri string
        alert(data);
        let iframe = `<iframe type="application/pdf" src="${data}#toolbar=0&navpanes=0" width="100%" height="1100px" frameborder="0"></iframe>`;
        alert(iframe);
        this.setState({
          embed: iframe,
        });
      } else {
        doc.output(
          "save",
          `${document.getElementsByName("nombre_contrato")[0].value}.pdf`
        );
      }
    });
  };

  obtener_contrato = () => {
    return new Promise((resolve, reject) => {
      var http = new XMLHttpRequest();
      var url = `${this.apiUrl}/${
        document.getElementsByName("nombre_contrato")[0].value
      }`;
      var params = JSON.stringify({
        nombre_contrato: document.getElementsByName("nombre_contrato")[0].value,
      });
      http.open("GET", url, true);

      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/JSON");
      http.onreadystatechange = function () {
        //Call a function when the state changes.
        if (http.readyState === 4 && http.status === 200) {
          var data = JSON.parse(http.responseText);

          var jsonvar = JSON.stringify(data);

          var objjson = JSON.parse(jsonvar);

          var inputs = Array.prototype.slice.call(
            document.querySelectorAll("form input")
          );
          inputs.push(document.querySelectorAll("form textarea")[0]);
          inputs.push(document.querySelectorAll("form select")[0]);

          resolve({ objjson, inputs, data });
        }
      };
      http.onerror = function () {
        reject({
          status: this.status,
          statusText: http.statusText,
        });
      };

      http.send(params);
    });
  };

  leer_contrato = () => {
    if (document.getElementsByName("nombre_contrato")[0].value !== "") {
      this.obtener_contrato()
        .then((res) => {
          console.log(res);
          Object.keys(res.objjson).forEach(function (dataItem) {
            res.inputs.forEach(function (inputItem) {
              return inputItem.name === dataItem
                ? (inputItem.value = res.data[dataItem])
                : false;
            });
          });
        })
    } else {
      console.log("nombre esta vacio");
    }
  };

  ClaveReservacion = () => {
    // debugger;
	if(document.getElementsByName("nombre_contrato")[0].value == ''){
		return new Promise((resolve, reject) => {
			var http = new XMLHttpRequest();
			var url = `${this.apiUrl}/clave`;
			http.open("GET", url, true);
			http.onreadystatechange = function () {
				// Call a function when the state changes.
				if (http.readyState === 4 && http.status === 200) {
					document.getElementsByName("nombre_contrato")[0].value =
						http.responseText;
					resolve();
				}
			};

			// No need to set the Content-type header for a GET request
			http.send();
		});
	}

  };

  infoContrato = () => {
    return new Promise((resolve, reject) => {
      var params = JSON.stringify({
        nombre_contrato: document.getElementsByName("nombre_contrato")[0].value,
        fecha_contrato: document.getElementsByName("fecha_contrato")[0].value,
        nombre_contratante:
          document.getElementsByName("nombre_contratante")[0].value,
        telefono_contratante: document.getElementsByName(
          "telefono_contratante"
        )[0].value,
        cliente_itinerario:
          document.getElementsByName("cliente_itinerario")[0].value,
        telefono_itinerario: document.getElementsByName(
          "telefono_itinerario"
        )[0].value,
        destino_itinerario:
          document.getElementsByName("destino_itinerario")[0].value,
        ubicacion_destino_itinerario: document.getElementsByName(
          "ubicacion_destino_itinerario"
        )[0].value,
        fechasalida_itinerario: document.getElementsByName(
          "fechasalida_itinerario"
        )[0].value,
        presentarse_itinerario: document.getElementsByName(
          "presentarse_itinerario"
        )[0].value,
        horasalida_itinerario: document.getElementsByName(
          "horasalida_itinerario"
        )[0].value,
        direccionsalida_itinerario: document.getElementsByName(
          "direccionsalida_itinerario"
        )[0].value,
        ubicacion_direccion_salida_itinerario: document.getElementsByName(
          "ubicacion_direccion_salida_itinerario"
        )[0].value,
        referencias_itinerario: document.getElementsByName(
          "referencias_itinerario"
        )[0].value,
        detalles_itinerario:
          document.getElementsByName("detalles_itinerario")[0].value,
        fecharegreso_itinerario: document.getElementsByName(
          "fecharegreso_itinerario"
        )[0].value,
        horaregreso_itinerario: document.getElementsByName(
          "horaregreso_itinerario"
        )[0].value,
        unidad_unidad:
          document.getElementsByName("unidad_unidad")[0][
            document.getElementsByName("unidad_unidad")[0].selectedIndex
          ].text,
        capacidad_unidad:
          document.getElementsByName("capacidad_unidad")[0].value,
        ACC_unidad: document.getElementsByName("ACC_unidad")[0].checked,
        estereo_unidad: document.getElementsByName("estereo_unidad")[0].checked,
        sanitarios_unidad:
          document.getElementsByName("sanitarios_unidad")[0].checked,
        tvdvd_unidad: document.getElementsByName("tvdvd_unidad")[0].checked,
        microfono_unidad:
          document.getElementsByName("microfono_unidad")[0].checked,
        seguro_unidad: document.getElementsByName("seguro_unidad")[0].checked,
        otros_unidad: document.getElementsByName("otros_unidad")[0].value,
        total_pagos: document.getElementsByName("total_pagos")[0].value,
        anticipo_pagos: document.getElementsByName("anticipo_pagos")[0].value,
        pendiente_pagos: document.getElementsByName("pendiente_pagos")[0].value,
      });

      resolve(params);
    });
  };

  Guardar = () => {

	document.getElementsByName("nombre_contrato")[0].value = this.ClaveReservacion()
    var http = new XMLHttpRequest();
    var url = `${this.apiUrl}/guardar`;
    //var params = "nombre_contrato=07_08_Ivania_SanAndres";
    //console.log(document.getElementsByName("fecha_contrato")[0].value);

    var params = JSON.stringify({
      nombre_contrato: document.getElementsByName("nombre_contrato")[0].value,
      fecha_contrato: document.getElementsByName("fecha_contrato")[0].value,
      nombre_contratante:
        document.getElementsByName("nombre_contratante")[0].value,
      telefono_contratante: document.getElementsByName(
        "telefono_contratante"
      )[0].value,
      // "direccion_contratante": document.getElementsByName("direccion_contratante")[0].value,
      cliente_itinerario:
        document.getElementsByName("cliente_itinerario")[0].value,
      telefono_itinerario: document.getElementsByName("telefono_itinerario")[0]
        .value,
      destino_itinerario:
        document.getElementsByName("destino_itinerario")[0].value,
      ubicacion_destino_itinerario: document.getElementsByName(
        "ubicacion_destino_itinerario"
      )[0].value,
      fechasalida_itinerario: document.getElementsByName(
        "fechasalida_itinerario"
      )[0].value,
      presentarse_itinerario: document.getElementsByName(
        "presentarse_itinerario"
      )[0].value,
      horasalida_itinerario: document.getElementsByName(
        "horasalida_itinerario"
      )[0].value,
      direccionsalida_itinerario: document.getElementsByName(
        "direccionsalida_itinerario"
      )[0].value,
      ubicacion_direccion_salida_itinerario: document.getElementsByName(
        "ubicacion_direccion_salida_itinerario"
      )[0].value,
      referencias_itinerario: document.getElementsByName(
        "referencias_itinerario"
      )[0].value,
      detalles_itinerario:
        document.getElementsByName("detalles_itinerario")[0].value,
      fecharegreso_itinerario: document.getElementsByName(
        "fecharegreso_itinerario"
      )[0].value,
      horaregreso_itinerario: document.getElementsByName(
        "horaregreso_itinerario"
      )[0].value,
      unidad_unidad:
        document.getElementsByName("unidad_unidad")[0][
          document.getElementsByName("unidad_unidad")[0].selectedIndex
        ].text,
      capacidad_unidad: document.getElementsByName("capacidad_unidad")[0].value,
      ACC_unidad: document.getElementsByName("ACC_unidad")[0].checked,
      estereo_unidad: document.getElementsByName("estereo_unidad")[0].checked,
      sanitarios_unidad:
        document.getElementsByName("sanitarios_unidad")[0].checked,
      tvdvd_unidad: document.getElementsByName("tvdvd_unidad")[0].checked,
      microfono_unidad:
        document.getElementsByName("microfono_unidad")[0].checked,
      seguro_unidad: document.getElementsByName("seguro_unidad")[0].checked,
      otros_unidad: document.getElementsByName("otros_unidad")[0].value,
      total_pagos: document.getElementsByName("total_pagos")[0].value,
      anticipo_pagos: document.getElementsByName("anticipo_pagos")[0].value,
      pendiente_pagos: document.getElementsByName("pendiente_pagos")[0].value,
    });
    console.log(document.getElementsByName("tvdvd_unidad")[0].checked);

    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/JSON");

    http.onreadystatechange = function () {
      //Call a function when the state changes.

      if (http.readyState === 4 && http.status === 200) {
        alert(http.responseText);
        //var data = JSON.parse(http.responseText);
      }
    };
    http.send(params);
  };

  Guardar_Reservacion = () => {
    // debugger;

      this.Guardar();

  };

  handleChange(event) {
    event.preventDefault();
    let formValues = this.state.formValues;
    let name = event.target.name;
    let value = event.target.value;

    formValues[name] = value;

    this.setState({ formValues });
  }

  render() {
    let { formValues } = this.state;
    return (
      <div className="App">
        <div id="booking" className="section">
          <div className="row">
            <div className="booking-form">
              <form>
                <div className="row">
                  <div className="col-sm-6"></div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <span className="form-label">Fecha del contrato:</span>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="dd/mm/ññññ"
                        name="fecha_contrato"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <span className="form-label">
                        Nombre del contratante:
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="inputtext"
                        placeholder="Nombre de quien contrata"
                        name="nombre_contratante"
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <span className="form-label">Telefono:</span>
                      <input
                        type="text"
                        className="form-control"
                        id="inputtext_telefono"
                        placeholder="Telefono"
                        name="telefono_contratante"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <span className="form-label">
                        Nombre encargado de la unidad:
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="inputtext"
                        placeholder="Encargado"
                        name="cliente_itinerario"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <span className="form-label">Telefono:</span>
                      <input
                        type="text"
                        className="form-control"
                        id="inputtext_telefono"
                        placeholder="Telefono"
                        name="telefono_itinerario"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-4">
                    <div className="input-group">
                      <label className="form-label">Fecha de Salida</label>
                      <input
                        className="form-control"
                        name="fechasalida_itinerario"
                        id="inputtext_date"
                        placeholder="dd/mm/ññññ"
                        type="date"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <div className="input-group">
                      <label className="form-label">Presentarse</label>
                      <div className="time-input-group">
                        <input
                          type="time"
                          className="form-control"
                          id="inputtext"
                          placeholder="00:00"
                          name="presentarse_itinerario"
                        />
                        <small>hrs.</small>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-group">
                      <label className="form-label">Hora de Salida</label>
                      <div className="time-input-group">
                        <input
                          type="time"
                          className="form-control"
                          id="inputtext"
                          placeholder="00:00"
                          name="horasalida_itinerario"
                        />
                        <small>hrs.</small>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-group">
                      <label className="form-label">Fecha de Regreso</label>
                      <input
                        className="form-control"
                        id="inputtext_date"
                        placeholder="dd/mm/ññññ"
                        type="date"
                        name="fecharegreso_itinerario"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="input-group">
                      <label className="form-label">Hora de Regreso</label>
                      <div className="time-input-group">
                        <input
                          type="time"
                          className="form-control"
                          id="inputtext"
                          placeholder="00:00"
                          name="horaregreso_itinerario"
                        />
                        <small>hrs.</small>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <span className="form-label">
                        Direccion de salida - Colonia - Ciudad{" "}
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="inputtext"
                        placeholder=""
                        name="direccionsalida_itinerario"
                      />
                      <span className="focus-border"></span>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <span className="form-label">
                        Referencias - Entre calles
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="inputtext"
                        placeholder=""
                        name="referencias_itinerario"
                      />
                      <span className="focus-border"></span>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <span className="form-label">
                        Ubicacion direccion de salida:
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="ubicacion"
                        placeholder=""
                        name="ubicacion_direccion_salida_itinerario"
                      />
                      <span className="focus-border"></span>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <span className="form-label">Destino - Direccion:</span>
                      <input
                        type="text"
                        className="form-control"
                        id="inputtext"
                        placeholder=""
                        name="destino_itinerario"
                      />
                      <span className="focus-border"></span>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <span className="form-label">Ubicacion Destino:</span>
                      <input
                        type="text"
                        className="form-control"
                        id="ubicacion"
                        placeholder=""
                        name="ubicacion_destino_itinerario"
                      />
                      <span className="focus-border"></span>
                    </div>
                  </div>

                  {/*<!-- ITINERARIO --> */}
                  <div className="col-md-12">
                    <span className="form-label ">Itinerario</span>
                    <textarea
                      className="form-control"
                      id="inputtext"
                      rows="15"
                      name="detalles_itinerario"
                      style={{ minHeight: "100px" }}
                    ></textarea>
                    <span className="focus-border"></span>
                  </div>
                </div>

                {/* UNIDAD CONTRATADA */}

                <div className="card">
                  <div className="card-header">UNIDAD CONTRATADA</div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="unidad_unidad">Tipo de unidad:</label>
                          <select
                            className="form-control"
                            id="unidad_unidad"
                            name="unidad_unidad"
                          >
                            <option value="Sprinter/Crafter">
                              Sprinter/Crafter
                            </option>
                            <option value="Hiace/Urvan">
                              Hiace/Urvan/Transit
                            </option>
                            <option value="auto">Automovil</option>
                            <option value="minivan">Minivan</option>
                            <option value="autobus">Autobus</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="capacidad_unidad">Capacidad:</label>
                          <div className="input-group">
                            <input
                              type="number"
                              className="form-control"
                              id="capacidad_unidad"
                              name="capacidad_unidad"
                              min="1"
                              max="800"
                            />
                            <div className="input-group-append">
                              <span className="input-group-text">
                                Pasajeros
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <label>Unidad equipada con:</label>

                        <div className="row">
                          <div className="col-md-12">
                            <div className="row">
                              <div className="col-md-4">
                                <label>
                                  <input
                                    type="checkbox"
                                    name="ACC_unidad"
                                    defaultChecked="checked"
                                    value={this.state.formValues["ACC_unidad"]}
                                    onChange={this.handleChange.bind(this)}
                                  />
                                  Aire acondicionado
                                </label>
                              </div>
                              <div className="col-md-4">
                                <label>
                                  <input
                                    type="checkbox"
                                    name="estereo_unidad"
                                    defaultChecked="checked"
                                    value={
                                      this.state.formValues["estereo_unidad"]
                                    }
                                    onChange={this.handleChange.bind(this)}
                                  />
                                  Estereo
                                </label>
                              </div>
                              <div className="col-md-4">
                                <label>
                                  <input
                                    type="checkbox"
                                    name="sanitarios_unidad"
                                    value={
                                      this.state.formValues["sanitarios_unidad"]
                                    }
                                    onChange={this.handleChange.bind(this)}
                                  />
                                  Sanitarios
                                </label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4">
                                <label>
                                  <input
                                    type="checkbox"
                                    name="tvdvd_unidad"
                                    defaultChecked="checked"
                                    value={
                                      this.state.formValues["tvdvd_unidad"]
                                    }
                                    onChange={this.handleChange.bind(this)}
                                  />
                                  TV/DVD
                                </label>
                              </div>
                              <div className="col-md-4">
                                <label>
                                  <input
                                    type="checkbox"
                                    value=""
                                    name="microfono_unidad"
                                  />
                                  Microfono
                                </label>
                              </div>
                              <div className="col-md-4">
                                <label>
                                  <input
                                    type="checkbox"
                                    name="seguro_unidad"
                                    defaultChecked="checked"
                                    value={
                                      this.state.formValues["seguro_unidad"]
                                    }
                                    onChange={this.handleChange.bind(this)}
                                  />
                                  Seguro de pasajeros
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="otros_unidad">OTROS:</label>
                              <input
                                type="text"
                                className="form-control"
                                id="otros_unidad"
                                name="otros_unidad"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*
				<!-- Unidad contratada --> */}

                {/*
				<!-- Pagos--> */}

                <div className="panel panel-default">
                  <div className="panel-heading">PAGOS</div>
                  <div className="panel-body">
                    <div className="col-md-12">
                      <span className="input-group-addon">Importe Total: </span>
                      <input
                        type="text"
                        className="form-control"
                        id="inputtext"
                        placeholder="Numero y letra"
                        name="total_pagos"
                      />
                      <span className="focus-border"></span>
                    </div>
                    <div className="col-md-12">
                      <span className="input-group-addon">Anticipo (s): </span>
                      <input
                        type="text"
                        className="form-control"
                        id="inputtext"
                        placeholder="Numero y letra"
                        name="anticipo_pagos"
                      />
                      <span className="focus-border"></span>
                    </div>
                    <div className="col-md-12">
                      <span className="input-group-addon">
                        Saldo a pagar al incio del viaje:
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="inputtext"
                        placeholder="Numero y letra"
                        name="pendiente_pagos"
                      />
                      <span className="focus-border"></span>
                    </div>
                  </div>
                </div>

                {/*
				<!-- Pie de contrato--> */}

                <div className="row">
                  <div className="col-md-12">
                    <div className="input-group">
                      <span className="input-group-addon">
					  Clave de reservacion / Contrato:
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="nombre_contrato"
                        placeholder=""
                        name="nombre_contrato"
                      />
                      <span className="focus-border"></span>
                    </div>
                  </div>
                  <div className="col-md-2" id="qr_code">
                    <QRCode
                      value={`http://recorriendokilometros.com.mx/${formValues["nombre_contrato"]}`}
                    //   includeImage="true"
                    //   imageH="24"
                    //   imageW="24"
                    //   imageX="0"
                    //   imageY="0"
                    //   imageExcavate="true"
                    //   centerImage="true"
                      onChange={this.handleChange.bind(this)}
                      size={parseInt("65")}
                      style={{ marginRight: 20 }}
                    />
                  </div>
                </div>
              </form>

              <input
                onClick={this.leer_contrato}
                id="leercontrato"
                type="submit"
                value="Leer contrato"
              />
              <input
                onClick={this.Guardar_Reservacion}
                id="guardarcontrato"
                type="submit"
                value="Guardar contrato"
              />
              <input
                onClick={this.crear_PDF}
                id="crearpdf"
                type="submit"
                value="crear PDF"
              />
            </div>

            <div
              className="previewHTML"
              dangerouslySetInnerHTML={{ __html: this.state.embed }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
