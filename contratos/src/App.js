import './App.css';
import React from 'react';
import ContratoPDF from './utils/ContratoPDF';
import { jsPDF } from "jspdf";
import QRCode from "qrcode.react";

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
		embed: '',
		formValues: { clave_reservacion: '', tvdvd_unidad: true}
    }

    this.leer_contrato = this.leer_contrato.bind(this);
    this.Guardar_Reservacion = this.Guardar_Reservacion.bind(this);
	this.crear_PDF = this.crear_PDF.bind(this);
	this.infoContrato = this.infoContrato.bind(this);
	this.ClaveReservacion = this.ClaveReservacion.bind(this);
    
  }

  componentDidMount(){
    //this.crear_PDF()
    
  }

  crear_PDF = () => {
	  let development = false
	const doc = new jsPDF('p', 'pt', 'letter');

	
    this.infoContrato().then((form_data) => {
		const qrCodeCanvas = document.querySelector('canvas');
		const qrCodeDataUri = qrCodeCanvas.toDataURL('image/jpg', 0.3);
		ContratoPDF.Contrato(doc, form_data, qrCodeDataUri, document.getElementsByName("nombre_contrato")[0].value)
	
		let data = doc.output('datauristring');
		if(development){
		
		
			doc.output('datauristring'); //returns the data uri string
			alert(data)
		   let iframe = `<iframe type="application/pdf" src="${data}#toolbar=0&navpanes=0" width="100%" height="1100px" frameborder="0"></iframe>`;
		   alert(iframe)
		   this.setState({
			   embed: iframe
			 });
   
	   }else {
		   doc.output('save', `${document.getElementsByName("nombre_contrato")[0].value}.pdf`); 
	   }
	})
	
	
	
  }

  obtener_contrato = () => {
	return new Promise((resolve, reject) => {
		
	   			

		var http = new XMLHttpRequest();
		var url = "http://ec2-54-89-234-112.compute-1.amazonaws.com:9000/leercontrato";
		var params = JSON.stringify({ "nombre_contrato": document.getElementsByName("nombre_contrato")[0].value});
		http.open("POST", url, true);
		
		//Send the proper header information along with the request
		http.setRequestHeader("Content-type", "application/JSON");
		http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState === 4 && http.status === 200) {
				var data = JSON.parse(http.responseText);
				
				var jsonvar = JSON.stringify(data);
				
				var objjson = JSON.parse(jsonvar);
				
				var inputs = Array.prototype.slice.call(document.querySelectorAll('form input'));
				inputs.push(document.querySelectorAll('form textarea')[0]);
				inputs.push(document.querySelectorAll('form select')[0])
				
				// let obj = { ...objjson, fecharegreso_itinerario: new Date(objjson.fecharegreso_itinerario), fechasalida_itineario: new Date(objjson.fechasalida_itineario).toISOString().slice(0, 10) , fecha_contrato: new Date(objjson.fecha_contrato).toISOString().slice(0, 10)}
				// console.log(obj.fecharegreso_itinerario)
				resolve({objjson, inputs, data})
				
			}
		}
		http.onerror = function () {
			reject({
			  status: this.status,
			  statusText: http.statusText
			});
		  };


		http.send(params);
	})
	

  }

  leer_contrato = () => {
       this.obtener_contrato()
	   .then((res)=> {
		   console.log(res)
		Object.keys(res.objjson).map(function (dataItem) {
			res.inputs.map(function (inputItem) {
				
				return (inputItem.name === dataItem) ? inputItem.value = res.data[dataItem]  :false;
				
			});
		});
	   }).then(() => {
		this.setState({formValues: {clave_reservacion: document.getElementsByName("clave_reservacion")[0].value}})
	   })
	}
  
  ClaveReservacion = () =>{
    // debugger;
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
          
          
          document.getElementsByName("clave_reservacion")[0].value = http.responseText;
          //var data = JSON.parse(http.responseText);
          resolve();
        }
      }
      http.send(params);

    });
    
  }

  infoContrato = () => {
	return new Promise((resolve, reject) => {
		var params = JSON.stringify({
			"clave_reservacion": document.getElementsByName("clave_reservacion")[0].value,
		  "nombre_contrato": document.getElementsByName("nombre_contrato")[0].value,
		  "fecha_contrato": document.getElementsByName("fecha_contrato")[0].value,
		  "nombre_contratante": document.getElementsByName("nombre_contratante")[0].value,
		  "telefono_contratante": document.getElementsByName("telefono_contratante")[0].value,
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
		  "unidad_unidad": document.getElementsByName("unidad_unidad")[0][document.getElementsByName("unidad_unidad")[0].selectedIndex].text,
		  "capacidad_unidad": document.getElementsByName("capacidad_unidad")[0].value,
		  "ACC_unidad": document.getElementsByName("ACC_unidad")[0].checked,
		  "estereo_unidad": document.getElementsByName("estereo_unidad")[0].checked,
		  "sanitarios_unidad": document.getElementsByName("sanitarios_unidad")[0].checked,
		  "tvdvd_unidad": document.getElementsByName("tvdvd_unidad")[0].checked,
		  "microfono_unidad": document.getElementsByName("microfono_unidad")[0].checked,
		  "seguro_unidad": document.getElementsByName("seguro_unidad")[0].checked,
		  "otros_unidad": document.getElementsByName("otros_unidad")[0].value,
		  "total_pagos": document.getElementsByName("total_pagos")[0].value,
		  "anticipo_pagos": document.getElementsByName("anticipo_pagos")[0].value,
		  "pendiente_pagos": document.getElementsByName("pendiente_pagos")[0].value
		});
		
		
		

		resolve(params)
	})
	
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
        "unidad_unidad": document.getElementsByName("unidad_unidad")[0][document.getElementsByName("unidad_unidad")[0].selectedIndex].text,
        "capacidad_unidad": document.getElementsByName("capacidad_unidad")[0].value,
        "ACC_unidad": document.getElementsByName("ACC_unidad")[0].checked,
		"estereo_unidad": document.getElementsByName("estereo_unidad")[0].checked,
		"sanitarios_unidad": document.getElementsByName("sanitarios_unidad")[0].checked,
		"tvdvd_unidad": document.getElementsByName("tvdvd_unidad")[0].checked,
		"microfono_unidad": document.getElementsByName("microfono_unidad")[0].checked,
		"seguro_unidad": document.getElementsByName("seguro_unidad")[0].checked,
        "otros_unidad": document.getElementsByName("otros_unidad")[0].value,
        "total_pagos": document.getElementsByName("total_pagos")[0].value,
        "anticipo_pagos": document.getElementsByName("anticipo_pagos")[0].value,
        "pendiente_pagos": document.getElementsByName("pendiente_pagos")[0].value
      });
	  console.log(document.getElementsByName("tvdvd_unidad")[0].checked)

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
    // debugger;
    this.ClaveReservacion().then(()=>{
      this.Guardar();
    });
  }

  handleChange(event) {
	event.preventDefault();
        let formValues = this.state.formValues;
        let name = event.target.name;
        let value = event.target.value;

        formValues[name] = value;

        this.setState({formValues})
}

  



  render() {
    let {formValues } = this.state
    return <div className="App">

	<div id="booking" className="section">
		<div className="row">
		<div className="booking-form">
			<form>
			<div className="row">
			<div className="col-sm-6"></div>
				<div className="col-sm-6">
					<div className="form-group">
						<span className="form-label">Fecha del contrato:</span>
						<input type="text" className="form-control" placeholder="dd/mm/ññññ"
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


					

					<div className="col-md-6">
						<div className="form-group">
							<span className="form-label">Nombre encargado de la unidad:</span>
							<input type="text" className="form-control" id="inputtext"
							 	placeholder="Encargado"
								name="cliente_itinerario"/>
						</div>
					</div>

					<div className="col-md-6">
						<div className="form-group">
							<span className="form-label">Telefono:</span>
							<input type="text" className="form-control" id="inputtext_telefono"
							placeholder="Telefono"
							name="telefono_itinerario"/>
						</div>
					</div>
				</div>   
      
			

					<div className="row">
						<div className="col-sm-4">
							<div className="input-group">
								<span className="form-label">Fecha salida</span>
								<input className="form-control" 
									name="fechasalida_itineario" 
									id="inputtext_date" placeholder="dd/mm/ññññ"
									
									type="text" required/>								
							</div>
						</div>
						<div className="col-sm-4">
							<div className="input-group">
								<span className="form-label">Presentarse:</span>
								<input type="text" className="form-control"
								
									 id="inputtext"
									 placeholder="00:00"
									 name="presentarse_itineario"/>
									 <small>hrs.</small>

								
								
							</div>
						</div>
						<div className="col-md-4">
							<div className="input-group">
								<span className="form-label">Hora salida:</span>
								<input type="text" className="form-control"
									 id="inputtext"
									 placeholder="00:00"
									 name="horasalida_itineario"/>
								<small>hrs.</small>
							</div>
						</div>

						<div className="col-md-4">
							<div className="input-group">
								<span className="form-label">Fecha de regreso:</span>
								<input className="form-control" 
									id="inputtext_date" placeholder="dd/mm/ññññ"
									type="text" name="fecharegreso_itinerario"/>
								<span className="focus-border"></span>
							</div>
						</div>
						<div className="col-md-4">
							<div className="input-group">
								<span className="form-label">Hora de regreso:</span>
								<input type="text" className="form-control" 
									id="inputtext" 
									placeholder="00:00"  name="horaregreso_itineario"/>
								<small>hrs.</small>
							</div>
						</div>


						<div className="col-md-12">
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

						<div className="col-md-12">
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
						<div className="col-md-12">
							<div className="form-group">
								<span className="form-label">Ubicacion direccion de salida:</span>
								<input type="text" className="form-control" 
									id="ubicacion" 
									placeholder=""  
									name="ubicacion_direccion_salida_itinerario"/>
								<span className="focus-border"></span>
							</div>
						</div>
						
						<div className="col-md-12">
							<div className="form-group">
								<span className="form-label">Destino:</span>
								<input type="text" className="form-control" 
									id="inputtext" 
									placeholder=""  
									name="destino_itinerario"/>
								<span className="focus-border"></span>
							</div>
						</div>
						<div className="col-md-12">
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
								{/* <input type="text" className="form-control" id="inputtext" placeholder="Bus/Sprinter/Hiace/auto"  name="unidad_unidad"/> */}
								<select id="unidad_unidad" name="unidad_unidad">
									<option value="Sprinter/Crafter">Sprinter/Crafter</option>
									<option value="Hiace/Urvan">Hiace/Urvan</option>
									<option value="auto">auto</option>
									<option value="minivan">minivan</option>
									<option value="autobus">Autobus</option>
								</select>
								<span className="focus-border"></span>
							</div>
						</div>
						<div className="col-md-6">
							<div className="input-group">
								<span className="form-label">Capacidad:</span>
									<input type="number" id="capacidad_unidad" name="capacidad_unidad" min="1" max="800"/>
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
										<input type="checkbox" value="" name="ACC_unidad" defaultChecked="checked"  value={this.state.formValues["ACC_unidad"]} onChange={this.handleChange.bind(this)}/>Aire acondicionado
									</label>
								</div>
								<div className="col-md-4">
									<label>
										<input type="checkbox" value="" name="estereo_unidad" defaultChecked="checked"  value={this.state.formValues["estereo_unidad"]} onChange={this.handleChange.bind(this)} />Estereo
									</label>
								</div>
								<div className="col-md-4">
									<label>
										<input type="checkbox"  name="sanitarios_unidad" value={this.state.formValues["sanitarios_unidad"]} onChange={this.handleChange.bind(this)} />Sanitarios
									</label>
								</div>
							</div>
							<div className="row">
								<div className="col-md-4">
									<label>
										<input type="checkbox" value="" name="tvdvd_unidad" defaultChecked="checked" value={this.state.formValues["tvdvd_unidad"]} onChange={this.handleChange.bind(this)}/>TV/DVD
									</label>
								</div>
								<div className="col-md-4">
									<label>
										<input type="checkbox" value="" name="microfono_unidad" />Microfono
									</label>
								</div>
								<div className="col-md-4">
									<label>
										<input type="checkbox" value="" name="seguro_unidad" defaultChecked="checked" value={this.state.formValues["seguro_unidad"]} onChange={this.handleChange.bind(this)}/>Seguro de pasajeros
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
					<div className="col-md-12">
						<div className="input-group" >
							<span className="input-group-addon">Identificador del contrato:</span>
							<input type="text" className="form-control" id="inputtext"  placeholder=""  name="nombre_contrato"/>
							<span className="focus-border"></span>
						</div>
					</div>
					<div className="col-md-8">
						<div className="input-group">
							<span className="input-group-addon">Clave de reservacion:</span>
							<input type="text" className="form-control clave" placeholder=""  name="clave_reservacion" value={this.state.formValues["clave_reservacion"]} onChange={this.handleChange.bind(this)} />
							<span className="focus-border"></span>
						</div>
					</div>
					<div className="col-md-2" id="qr_code"> 
						<QRCode value={`http://recorriendokilometros.com.mx/${formValues["clave_reservacion"]}`} 
						imageSrc='https://static.zpao.com/favicon.png' 
						includeImage='true'
						imageH='24'
						imageW='24'
						imageX='0'
						imageY='0'
						imageSrc='https://static.zpao.com/favicon.png'
						imageExcavate='true'
						centerImage='true'
						onChange={this.handleChange.bind(this)}
						size={parseInt("65")} style={{ marginRight: 20 }}/>
					</div>
					
				</div>
				
			</form>

			<input onClick={this.leer_contrato}  id="leercontrato" type="submit" value="Leer contrato"/>
			<input onClick={this.Guardar_Reservacion} id="guardarcontrato" type="submit" value="Guardar contrato"/> 
			<input onClick={this.crear_PDF} id="crearpdf" type="submit" value="crear PDF"/> 
			{/* <button onClick={this.leer_contrato} id="leercontrato">Leer contrato</button> */}
			{/* <button onClick={this.Guardar_Reservacion} id="guardarcontrato">Guardar contrato</button> */}
			{/* <button onClick={this.crear_PDF} id="guardarcontrato">crear PDF</button> */}
		</div>

		<div className="previewHTML" dangerouslySetInnerHTML={{ __html: this.state.embed}}/>
	</div>
</div> 
</div>
	
    
  }
}

export default App;
