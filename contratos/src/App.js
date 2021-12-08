import './App.css';
import React from 'react';
import ContratoPDF from './utils/ContratoPDF';
import { jsPDF } from "jspdf";

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
		embed: ''
    }

    this.leer_contrato = this.leer_contrato.bind(this);
    this.Guardar_Reservacion = this.Guardar_Reservacion.bind(this);
	this.crear_PDF = this.crear_PDF.bind(this);
    
  }

  crear_PDF = () => {
	const doc = new jsPDF('p', 'pt', 'letter');
        
	ContratoPDF.Contrato(doc, "PAPELETA", "cantidad")
	
	let data = doc.output('datauristring');
	// doc.output('save', 'filename.pdf'); //Try to save PDF as a file (not works on ie before 10, and some mobile devices)
	// doc.output('datauristring');        //returns the data uri string
	// doc.output('datauri');              //opens the data uri in current window
	// doc.output('dataurlnewwindow');     //opens the data uri in new window

	

	// let starty = 90;
	// let increment = 24;
	// let tabinsidesection = 17
	// let color_labels = (255,255,255);//(255,255,255);
	// let color_azules = (62, 53, 125);//(255,255,255);
	// let color_valores = (0,0,0);//(255,255,255);
	// doc.setDrawColor(29,34,78);
	// doc.setLineWidth(.8)

	// doc.setTextColor(color_valores)
	// doc.setFont('helvetica', "bold")
	// doc.text(20, starty+13, 'DATOS DEL CONTRATANTE');
	// doc.setFont('helvetica', "normal")
	// starty += tabinsidesection; 

	// doc.setFillColor(126, 152, 186) //azul relleno
	// doc.roundedRect(15, starty, 90, 51, 6, 6, 'F');
	// doc.rect(95, starty, 10, 51, 'F')
	// doc.roundedRect(15, starty, 550, 51, 6, 6, 'D');


	// doc.setTextColor(color_labels);
	// doc.text(30, starty+13, 'NOMBRE');
	// doc.setTextColor(color_valores) 
	// doc.text(110, starty+13, "fasd");
	// doc.setLineWidth(.5)
	// doc.line(15, starty+17, 565, starty+17);

	// this.setState({
	//   embed: iframe
	// });

	doc.output('save', 'filename.pdf'); 
  }

  leer_contrato = () => {
    
    debugger;
		var http = new XMLHttpRequest();
		var url = "http://ec2-54-89-234-112.compute-1.amazonaws.com:9000/leercontrato";
		var params = JSON.stringify({ "nombre_contrato": document.getElementsByName("nombre_contrato")[0].value});
		http.open("POST", url, true);
		
		//Send the proper header information along with the request
		http.setRequestHeader("Content-type", "application/JSON");
		http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState === 4 && http.status === 200) {
				var data = JSON.parse(http.responseText);
				console.log(data);
        var jsonvar = JSON.stringify(data);
				console.log(jsonvar);
				var objjson = JSON.parse(jsonvar);
				console.log(objjson);
				var inputs = Array.prototype.slice.call(document.querySelectorAll('form input'));
				inputs.push(document.querySelectorAll('form textarea')[0]);
				console.log(inputs);
				Object.keys(objjson).map(function (dataItem) {
					inputs.map(function (inputItem) {
						return (inputItem.name === dataItem) ? (inputItem.value = data[dataItem]) : false;
				
					});
				});
				
			}
		}
		http.send(params);

	}
  
  ClaveReservacion = () =>{
    debugger;
    return new Promise((resolve, reject) => {
      var http = new XMLHttpRequest();
      //var url = "http://localhost:3000/clave";
      var url = "http://ec2-54-89-234-112.compute-1.amazonaws.com:9000/clave";
      var params = JSON.stringify({
        "fecha_contrato": document.getElementsByName("fechasalida_itineario")[0].value,
        "destino_itinerario": document.getElementsByName("destino_itinerario")[0].value
      });

      http.open("POST", url, true);
      
      http.setRequestHeader("Content-type", "application/JSON");
      http.onreadystatechange = function() {//Call a function when the state changes.
        
        if(http.readyState === 4 && http.status === 200) {
          
          //alert(http.responseText);
          document.getElementsByName("clave_reservacion")[0].value = http.responseText;
          //var data = JSON.parse(http.responseText);
          resolve();
        }
      }
      http.send(params);

    });
    
  }

  
  

  Guardar = () => {

    var http = new XMLHttpRequest();
    //var url = "http://localhost:3000/guardarcontrato";
    var url = "http://ec2-54-89-234-112.compute-1.amazonaws.com:9000/guardarcontrato";
    //var params = "nombre_contrato=07_08_Ivania_SanAndres";
    //console.log(document.getElementsByName("fecha_contrato")[0].value);
    var params = JSON.stringify({
          "clave_reservacion": document.getElementsByName("clave_reservacion")[0].value,
        "nombre_contrato": document.getElementsByName("nombre_contrato")[0].value,
        "fecha_contrato": document.getElementsByName("fecha_contrato")[0].value,
        "nombre_contratante": document.getElementsByName("nombre_contratante")[0].value,
        "telefono_contratante": document.getElementsByName("telefono_contratante")[0].value,
        // "direccion_contratante": document.getElementsByName("direccion_contratante")[0].value,
        "cliente_itinerario": document.getElementsByName("cliente_itinerario")[0].value,
        "telefono_itinerario": document.getElementsByName("telefono_itinerario")[0].value,
        "destino_itinerario": document.getElementsByName("destino_itinerario")[0].value,
        "ubicacion_destino_itinerario": document.getElementsByName("ubicacion_destino_itinerario")[0].value,
        "fechasalida_itineario": document.getElementsByName("fechasalida_itineario")[0].value,
        "presentarse_itineario": document.getElementsByName("presentarse_itineario")[0].value,
        "horasalida_itineario": document.getElementsByName("horasalida_itineario")[0].value,
        "direccionsalida_itinerario": document.getElementsByName("direccionsalida_itinerario")[0].value,
        "ubicacion_direccion_salida_itinerario": document.getElementsByName("ubicacion_direccion_salida_itinerario")[0].value,
        "colonia_itineario": document.getElementsByName("colonia_itineario")[0].value,
        "ciudad_itineario": document.getElementsByName("ciudad_itineario")[0].value,
        "entrecalles_itinerario": document.getElementsByName("entrecalles_itinerario")[0].value,
        "referencias_itinerario": document.getElementsByName("referencias_itinerario")[0].value,
        "detalles_itineario": document.getElementsByName("detalles_itineario")[0].value,
        "fecharegreso_itinerario": document.getElementsByName("fecharegreso_itinerario")[0].value,
        "horaregreso_itineario": document.getElementsByName("horaregreso_itineario")[0].value,
        "unidad_unidad": document.getElementsByName("unidad_unidad")[0].value,
        "capacidad_unidad": document.getElementsByName("capacidad_unidad")[0].value,
        "ACC_unidad": document.getElementsByName("ACC_unidad")[0].value,
        "estereo_unidad": document.getElementsByName("estereo_unidad")[0].value,
        "sanitarios_unidad": document.getElementsByName("sanitarios_unidad")[0].value,
        "tvdvd_unidad": document.getElementsByName("tvdvd_unidad")[0].value,
        "microfono_unidad": document.getElementsByName("microfono_unidad")[0].value,
        "seguro_unidad": document.getElementsByName("seguro_unidad")[0].value,
        "otros_unidad": document.getElementsByName("otros_unidad")[0].value,
        "total_pagos": document.getElementsByName("total_pagos")[0].value,
        "anticipo_pagos": document.getElementsByName("anticipo_pagos")[0].value,
        "pendiente_pagos": document.getElementsByName("pendiente_pagos")[0].value
      });

    http.open("POST", url, true);
    

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/JSON");
    
    http.onreadystatechange = function() {//Call a function when the state changes.
      
      if(http.readyState === 4 && http.status === 200) {
        
        alert(http.responseText);
        //var data = JSON.parse(http.responseText);
      }
    }
    http.send(params);


  }

  Guardar_Reservacion = () => {
    debugger;
    Promise.resolve(this.ClaveReservacion).then(()=>{
      this.Guardar();
    });
  }

  



  render() {

    return <div className="App">
	<div id="booking" className="section">
		<div class="row">
		<div class="booking-form">
			<div class="form-header">
				<h1>CONTRATO RK</h1>
			</div>
			<form>
				
			<div className="row">
			<div className="col-sm-6"></div>
				<div className="col-sm-6">
					<div className="form-group">
						<span className="form-label">Fecha del contrato:</span>
						<input type="text" className="form-control" 
				  id="inputtext_date" placeholder="DD/MM/ÑÑÑÑ" 
				   name="fecha_contrato"/>
					</div>
				</div>
				
			</div>

				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<span className="form-label">Nombre del contratante:</span>
							<input type="text" className="form-control" id="inputtext" 
								placeholder="Nombre de quien contrata" 
								 
								name="nombre_contratante"/>
						</div>
					</div>

					<div className="col-sm-6">
						<div className="form-group">
							<span className="form-label">Telefono:</span>
							<input type="text" className="form-control" id="inputtext_telefono"
								placeholder="Telefono"
								
								name="telefono_contratante"/>
						</div>
					</div>


					

					<div className="col-md-1">
						<div className="form-group">
							<span className="form-label">Nombre encargado de la unidad:</span>
							<input type="text" className="form-control" id="inputtext"
							 	placeholder="Encargado"
								name="cliente_itinerario"/>
						</div>
					</div>

					<div className="col-md-1">
						<div className="form-group">
							<span className="form-label">Telefono:</span>
							<input type="text" className="form-control" id="inputtext_telefono"
							placeholder="Telefono"
							name="telefono_itinerario"/>
						</div>
					</div>
				</div>   
      
				{/* <!-- DATOS CONTRATANTE --> */}

				{/* <!-- ITINERARIO --> */}
				{/* <span className="form-label-section">ITINERARIO</span> */}

				{/* <div className="panel panel-default"> */}

				{/* <span class="form-label">Pickup Date</span>
				<input class="form-control" type="date" required> */}

					<div className="row">
						<div className="col-sm-4">
							<div className="input-group">
								<span class="form-label">Fecha salida</span>
								<input class="form-control" 
									name="fechasalida_itineario" 
									id="inputtext_date" 
									placeholder="MM/DD/YYYY" 
									type="date" required/>								
							</div>
						</div>
						<div className="col-sm-4">
							<div className="input-group">
								<span className="form-label">Presentarse:</span>
								<input type="text" className="form-control"
									 id="inputtext"
									 placeholder="00:00 hrs"
									 name="presentarse_itineario"/>

								
								
							</div>
						</div>
						<div className="col-md-4">
							<div className="input-group">
								<span className="form-label">Hora salida:</span>
								<input type="text" className="form-control"
									 id="inputtext"
									 placeholder="00:00 hrs"
									 name="horasalida_itineario"/>
							</div>
						</div>

						<div className="col-md-4">
							<div className="input-group">
								<span className="form-label">Fecha de regreso:</span>
								<input type="text" className="form-control" 
									id="inputtext_date" 
									placeholder="DD/MM/YYYY"  name="fecharegreso_itinerario"/>
								<span className="focus-border"></span>
							</div>
						</div>
						<div className="col-md-4">
							<div className="input-group">
								<span className="form-label">Hora de regreso:</span>
								<input type="text" className="form-control" 
									id="inputtext" 
									placeholder="00:00"  name="horaregreso_itineario"/>
								<span className="focus-border"></span>
								<span className="form-label">hrs</span>
							</div>
						</div>


						<div className="col-md-1">
							<div className="form-group">
								<span className="form-label">Direccion de salida:</span>
								<input type="text" className="form-control" 
									id="inputtext" 
									placeholder=""  
									name="direccionsalida_itinerario"/>
								<span className="focus-border"></span>
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group">
								<span className="form-label">Ubicacion direccion de salida:</span>
								<input type="text" className="form-control" 
									id="ubicacion" 
									placeholder=""  
									name="ubicacion_direccion_salida_itinerario"/>
								<span className="focus-border"></span>
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group">
								<span className="form-label">Colonia:</span>
								<input type="text" className="form-control" 
									id="inputtext" 
									placeholder=""  
									name="colonia_itineario"/>
								<span className="focus-border"></span>
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group">
								<span className="form-label">Ciudad:</span>
								<input type="text" className="form-control" 
									id="inputtext" 
									placeholder=""  
									name="ciudad_itineario"/>
								<span className="focus-border"></span>
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group">
								<span className="form-label">Entre calles:</span>
								<input type="text" className="form-control" 
									id="inputtext" 
									placeholder=""  
									name="entrecalles_itinerario"/>
								<span className="focus-border"></span>
							</div>
						</div>
						<div className="col-md-12">
							<div className="form-group">
								<span className="form-label">Referencias:</span>
								<input type="text" className="form-control" 
									id="inputtext" 
									placeholder=""  
									name="referencias_itinerario"/>
								<span className="focus-border"></span>
							</div>
						</div>
						<div className="col-md-1">
							<div className="form-group">
								<span className="form-label">Destino:</span>
								<input type="text" className="form-control" 
									id="inputtext" 
									placeholder=""  
									name="destino_itinerario"/>
								<span className="focus-border"></span>
							</div>
						</div>
						<div className="col-md-4">
							<div className="form-group">
								<span className="form-label">Ubicacion:</span>
								<input type="text" className="form-control" 
									id="ubicacion" 
									placeholder=""  
									name="ubicacion_destino_itinerario"/>
								<span className="focus-border"></span>
							</div>
						</div>
						
						<div className="col-md-12">
							<span className="form-label " >Detalles del traslado: (Traslados incluidos en el costo del servicio):</span>
							<textarea className="form-control" id="inputtext" rows="5"  name="detalles_itineario"></textarea>
						</div>
					</div>
				{/* </div>   */}
{/* 
				<!-- ITINERARIO --> */}

{/* 
				<!-- Unidad contratada --> */}

				<div className="panel panel-default">
					<div className="panel-heading">UNIDAD CONTRATADA</div>
					<div className="panel-body">
						<div className="col-md-6">
							<div className="input-group">
								<span className="form-label">Tipo de unidad:</span>
								<input type="text" className="form-control" id="inputtext" placeholder="Bus/Sprinter/Hiace/auto"  name="unidad_unidad"/>
								<span className="focus-border"></span>
							</div>
						</div>
						<div className="col-md-6">
							<div className="input-group">
								<span className="form-label">Capacidad:</span>
								<input type="text" className="form-control" id="inputtext" placeholder=""  name="capacidad_unidad"/>
								<span className="focus-border"></span>
								<span className="form-label">Pasajeros</span>
							</div>
						</div>
						<div className="col-md-12">
							<div className="input-group">
								<span className="form-label">Unidad equipada con:</span>
							</div>
							<div className="row">
								<div className="col-md-4">
									<label>
										<input type="checkbox" value="" name="ACC_unidad" checked="si"/>Aire acondicionado
									</label>
								</div>
								<div className="col-md-4">
									<label>
										<input type="checkbox" value="" name="estereo_unidad" checked="si"/>Estereo
									</label>
								</div>
								<div className="col-md-4">
									<label>
										<input type="checkbox" value="" name="sanitarios_unidad" />Sanitarios
									</label>
								</div>
							</div>
							<div className="row">
								<div className="col-md-4">
									<label>
										<input type="checkbox" value="" name="tvdvd_unidad" checked="si"/>TV/DVD
									</label>
								</div>
								<div className="col-md-4">
									<label>
										<input type="checkbox" value="" name="microfono_unidad" />Microfono
									</label>
								</div>
								<div className="col-md-4">
									<label>
										<input type="checkbox" value="" name="seguro_unidad" checked="si"/>Seguro de pasajeros
									</label>
								</div>
							</div>
							<div className="row">
								<div className="input-group">
									<span className="form-label">OTROS:</span>
									<input type="text" className="form-control" id="inputtext" placeholder=""  name="otros_unidad"/>
									<span className="focus-border"></span>
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
							<input type="text" className="form-control" id="inputtext" placeholder="Numero y letra"  name="total_pagos"/>
							<span className="focus-border"></span>
						</div>
						<div className="col-md-12">
							<span className="input-group-addon">Anticipo (s): </span>
							<input type="text" className="form-control" id="inputtext" placeholder="Numero y letra"  name="anticipo_pagos"/>
							<span className="focus-border"></span>
						</div>
						<div className="col-md-12">
							<span className="input-group-addon">Saldo a pagar al incio del viaje:</span>
							<input type="text" className="form-control" id="inputtext" placeholder="Numero y letra"  name="pendiente_pagos"/>
							<span className="focus-border"></span>
						</div>
					</div>
				</div>

{/* 
				<!-- Pie de contrato--> */}

	
				<div className="row">
					<div className="col-md-1">
						<div className="input-group" >
							<span className="input-group-addon">Identificador del contrato:</span>
							<input type="text" className="form-control" id="inputtext"  placeholder=""  name="nombre_contrato"/>
							<span className="focus-border"></span>
						</div>
					</div>
					<div className="col-md-4">
						<div className="input-group">
							<span className="input-group-addon">Clave de reservacion:</span>
							<input type="text" className="form-control clave" placeholder=""  name="clave_reservacion" />
							<span className="focus-border"></span>
						</div>
					</div>
				</div>
				<div className="previewHTML" dangerouslySetInnerHTML={{ __html: this.state.embed}}/>
			</form>
			<button onClick={this.leer_contrato} id="leercontrato">Leer contrato</button>
			<button onClick={this.Guardar_Reservacion} id="guardarcontrato">Guardar contrato</button>
			<button onClick={this.crear_PDF} id="guardarcontrato">crear PDF</button>
		</div>
	</div>
</div> 
</div>
	
    
  }
}

export default App;
