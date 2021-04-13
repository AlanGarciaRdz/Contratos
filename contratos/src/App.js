import './App.css';
import React from 'react';

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
    }


    this.leer_contrato = this.leer_contrato.bind(this);
    this.Guardar_Reservacion = this.Guardar_Reservacion.bind(this);
    
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
        "direccion_contratante": document.getElementsByName("direccion_contratante")[0].value,
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
      <header className="App-header">
        <form>
          <div className="row"></div>
          <div className="col-md-8">
        	<h4 className="text-primary">CONTRATO DE PRESTACION DE SERVICIOS DE TRANSPORTE</h4>
        	<h5 className="text-primary-Razon">Recorriendo Kilometros S.A. de C.V.</h5>
        	<h5 className="text-primary">RKI180820PJA</h5>
        	<h5 className="text-primary">contacto@recorriendokilometros.com.mx</h5>
        	<h5 className="text-primary">Telefonos: 3316954455 - 3322553662 </h5>
        </div>
        
        <div className="col-md-4 .col-3">
          <span className="input-group-addon" id="basic-addon1">Fecha del contrato</span>
		      <input type="text" className="form-controls effect-1" id="inputtext_date" placeholder="DD/MM/ÑÑÑÑ" aria-describedby="basic-addon1" name="fecha_contrato"/>
			    <span className="focus-border"></span>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading" id="titulos" >DATOS DEL CONTRATANTE</div>
        <div className="panel-body">

          <div className="col-md-8">
            <div className="input-group .col-3">
            <span className="input-group-addon" id="basic-addon1">Nombre del contratante: </span>
            <input type="text" className="form-controls effect-1" id="inputtext" placeholder="" aria-describedby="basic-addon1" name="nombre_contratante"/>
            <span className="focus-border"></span>
          </div>
  	      </div>
          <div className="col-md-4">
            <div className="input-group">
            <span className="input-group-addon" id="basic-addon1">Telefono:</span>
            <input type="text" className="form-controls effect-1" id="inputtext_telefono" placeholder="" aria-describedby="basic-addon1" name="telefono_contratante"/>
            <span className="focus-border"></span>
              </div>
          </div>
        <div className="col-md-12">
          <div className="input-group">
            <span className="input-group-addon" id="basic-addon1">Direccion:</span>
            <input type="text" className="form-controls effect-1" id="inputtext" placeholder="" aria-describedby="basic-addon1" name="direccion_contratante"/>	
            <span className="focus-border"></span>
          </div>
        </div> 

        <div className="col-md-8">
  		<div className="input-group">
		  <span className="input-group-addon" id="basic-addon1">Nombre encargado de la unidad: </span>
		  <input type="text" className="form-controls effect-1" id="inputtext" placeholder="" aria-describedby="basic-addon1" name="cliente_itinerario"/>
		  <span className="focus-border"></span>
	 	</div>
  	</div>
    <div className="col-md-4">
    	<div className="input-group">
		  <span className="input-group-addon" id="basic-addon1">Telefono:</span>
		  <input type="text" className="form-controls effect-1" id="inputtext_telefono" placeholder="" aria-describedby="basic-addon1" name="telefono_itinerario"/>
		  <span className="focus-border"></span>
  	    </div>
    </div>


        </div>   
      </div>   
{/* <!-- DATOS CONTRATANTE --> */}


{/* <!-- ITINERARIO --> */}
<div className="panel panel-default"> 
  <div className="panel-heading">ITINERARIO</div>
  <div className="panel-body">
    
    <div className="col-md-4">
    	<div className="input-group">
		  <span className="input-group-addon" id="basic-addon1">Fecha salida</span>
		  <input type="text" className="form-controls effect-1" id="inputtext_date" placeholder="DD/MM/YYYY" aria-describedby="basic-addon1" name="fechasalida_itineario"/>
		  <span className="focus-border"></span>
  	</div>
    	
    </div>
    <div className="col-md-4">
    	<div className="input-group">
		  <span className="input-group-addon" id="basic-addon1">Presentarse:</span>
		  <input type="text" className="form-controls effect-1" id="inputtext" placeholder="00:00" aria-describedby="basic-addon1" name="presentarse_itineario"/>
		  <span className="focus-border"></span>
		  <span className="input-group-addon">hrs</span>
  	     </div>
    	
    </div>
    <div className="col-md-4">
    	<div className="input-group">
		  <span className="input-group-addon" id="basic-addon1">Hora salida:</span>
		  <input type="text" className="form-controls effect-1" id="inputtext" placeholder="00:00" aria-describedby="basic-addon1" name="horasalida_itineario"/>
		  <span className="focus-border"></span>
		  <span className="input-group-addon">hrs</span>
  	     </div>
    </div>
    <div className="col-md-12">
		<div className="input-group">
			<span className="input-group-addon" id="basic-addon1">Direccion de salida:</span>
			<input type="text" className="form-controls effect-1" id="inputtext" placeholder="" aria-describedby="basic-addon1" name="direccionsalida_itinerario"/>	
			<span className="focus-border"></span>
	 	</div>
	</div> 
	<div className="col-md-6">
		<div className="input-group">
				<span className="input-group-addon" id="basic-addon1">Ubicacion direccion de salida:</span>
				<input type="text" className="form-controls effect-1" id="ubicacion" placeholder="" aria-describedby="basic-addon1" name="ubicacion_direccion_salida_itinerario"/>
				<span className="focus-border"></span>
		</div>
	</div>

	<div className="col-md-6">
    	<div className="input-group">
		  <span className="input-group-addon" id="basic-addon1">Colonia:</span>
		  <input type="text" className="form-controls effect-1" id="inputtext" placeholder="" aria-describedby="basic-addon1" name="colonia_itineario"/>
		  <span className="focus-border"></span>
  	     </div>
    	
    </div>
    <div className="col-md-6">
    	<div className="input-group">
		  <span className="input-group-addon" id="basic-addon1">Ciudad:</span>
		  <input type="text" className="form-controls effect-1" id="inputtext" placeholder="" aria-describedby="basic-addon1" name="ciudad_itineario"/>
		  <span className="focus-border"></span>
  	     </div>
    	
    </div>
    <div className="col-md-6">
    	<div className="input-group">
		  <span className="input-group-addon" id="basic-addon1">Entre calles:</span>
		  <input type="text" className="form-controls effect-1" id="inputtext" placeholder="" aria-describedby="basic-addon1" name="entrecalles_itinerario"/>
		  <span className="focus-border"></span>
  	     </div>
    </div>
    <div className="col-md-12">
		<div className="input-group">
			<span className="input-group-addon" id="basic-addon1">Referencias:</span>
			<input type="text" className="form-controls effect-1" id="inputtext" placeholder="" aria-describedby="basic-addon1" name="referencias_itinerario"/>	
			<span className="focus-border"></span>
	 	</div>
	</div> 
  <div className="col-md-8">
  		<div className="input-group">
		  <span className="input-group-addon" id="basic-addon1">Destino:</span>
		  <input type="text" className="form-controls effect-1" id="inputtext" placeholder="" aria-describedby="basic-addon1" name="destino_itinerario"/>
		  <span className="focus-border"></span>
		</div>
		
	  </div>
	<div className="col-md-4">
		<div className="input-group">
				<span className="input-group-addon" id="basic-addon1">Ubicacion:</span>
				<input type="text" className="form-controls effect-1" id="ubicacion" placeholder="" aria-describedby="basic-addon1" name="ubicacion_destino_itinerario"/>
				<span className="focus-border"></span>
		</div>
	</div>

  <div className="col-md-4">
    	<div className="input-group">
		  <span className="input-group-addon" id="basic-addon1">Fecha de regreso:</span>
		  <input type="text" className="form-controls effect-1" id="inputtext_date" placeholder="DD/MM/YYYY" aria-describedby="basic-addon1" name="fecharegreso_itinerario"/>
		  <span className="focus-border"></span>
  	     </div>
    	
    </div>
    <div className="col-md-4">
    	<div className="input-group">
		  <span className="input-group-addon" id="basic-addon1">Hora de regreso:</span>
		  <input type="text" className="form-controls effect-1" id="inputtext" placeholder="00:00" aria-describedby="basic-addon1" name="horaregreso_itineario"/>
		  <span className="focus-border"></span>
		  <span className="input-group-addon">hrs</span>
  	     </div>
    	
    </div>

	<div className="col-md-12">
	<span className="input-group-addon "  id="basic-addon1">Detalles del traslado: (Traslados incluidos en el costo del servicio):</span>
	<textarea className="form-controls effect-1" id="inputtext" rows="5"  name="detalles_itineario"></textarea>

	<div className="alert alert-danger upper font-error" role="alert">
	  <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
	  <span className="sr-only">Error:</span>
	   Traslados,  Paradas o cualquier paseo no reportado en el contrato tiene costo extra y tiene que ser liquidado al momento, directamente con el operador.
	</div>

    


	</div>
    </div>
  </div>  
{/* <!-- ITINERARIO --> */}

{/* <!-- Unidad contratada --> */}
<div className="panel panel-default"> 
  <div className="panel-heading">UNIDAD CONTRATADA</div>
  <div className="panel-body">
  	
  	<div className="col-md-6">
    	<div className="input-group">
		  <span className="input-group-addon" id="basic-addon1">Tipo de unidad:</span>
		  <input type="text" className="form-controls effect-1" id="inputtext" placeholder="Bus/Sprinter/Hiace/auto" aria-describedby="basic-addon1" name="unidad_unidad"/>
		  <span className="focus-border"></span>
  	     </div>
    	
    </div>
    <div className="col-md-6">
    	<div className="input-group">
		  <span className="input-group-addon" id="basic-addon1">Capacidad:</span>
		  <input type="text" className="form-controls effect-1" id="inputtext" placeholder="" aria-describedby="basic-addon1" name="capacidad_unidad"/>
		  <span className="focus-border"></span>
		  <span className="input-group-addon">Pasajeros</span>
  	     </div>
    	
    </div>
    <div className="col-md-12">
    	<div className="input-group">
		  <span className="input-group-addon" id="basic-addon1">Unidad equipada con:</span>
  	    </div>
  	    <div className="row">
	  	    <div className="col-md-4"><label><input type="checkbox" value="" name="ACC_unidad" checked="si"/>Aire acondicionado</label></div>
	  	    <div className="col-md-4"><label><input type="checkbox" value="" name="estereo_unidad" checked="si"/>Estereo</label></div>
	  	    <div className="col-md-4"><label><input type="checkbox" value="" name="sanitarios_unidad" />Sanitarios</label></div>
	    </div>
	    <div className="row">
	  	    <div className="col-md-4"><label><input type="checkbox" value="" name="tvdvd_unidad" checked="si"/>TV/DVD</label></div>
	  	    <div className="col-md-4"><label><input type="checkbox" value="" name="microfono_unidad" />Microfono</label></div>
	  	    <div className="col-md-4"><label><input type="checkbox" value="" name="seguro_unidad" checked="si"/>Seguro de pasajeros</label></div>
	    </div>
	    <div className="row">
	    	<div className="input-group">
		  		<span className="input-group-addon" id="basic-addon1">OTROS:</span>
				  <input type="text" className="form-controls effect-1" id="inputtext" placeholder="" aria-describedby="basic-addon1" name="otros_unidad"/>
				  <span className="focus-border"></span>
  	     	</div>
	    </div>

    </div>
    


  </div>


</div>  
{/* <!-- Unidad contratada --> */}

{/* <!-- Pagos--> */}
<div className="panel panel-default"> 
  <div className="panel-heading">PAGOS</div>
  <div className="panel-body">

  <div className="col-md-12">
    	

  	<span className="input-group-addon" id="basic-addon1">Importe Total: </span>
	  <input type="text" className="form-controls effect-1" id="inputtext" placeholder="Numero y letra" aria-describedby="basic-addon1" name="total_pagos"/>
	  <span className="focus-border"></span>
  </div>

  <div className="col-md-12">
  	<span className="input-group-addon" id="basic-addon1">Anticipo (s): </span>
	  <input type="text" className="form-controls effect-1" id="inputtext" placeholder="Numero y letra" aria-describedby="basic-addon1" name="anticipo_pagos"/>
	  <span className="focus-border"></span>
  </div>
  <div className="col-md-12">
  	<span className="input-group-addon" id="basic-addon1">Saldo a pagar al incio del viaje:</span>
	  <input type="text" className="form-controls effect-1" id="inputtext" placeholder="Numero y letra" aria-describedby="basic-addon1" name="pendiente_pagos"/>
	  <span className="focus-border"></span>
  </div>

	</div>

</div>

{/* <!-- Pie de contrato--> */}
<div className="panel panel-default"> 
	<div className="panel-heading">ACEPTO TERMINOS Y CONDICIONES DE TRANSPORTES TURISTICOS RECORRIENDO KILOMETROS SA DE CV </div>
  <div className="panel-body">

  	<div className="col-md-6">
    	<div className="input-group">
		  <span className="input-group-addon" id="basic-addon1">Fima cliente</span>
		  
  	     </div>
    	
    </div>
    <div className="col-md-6">
    	<div className="input-group">
		  <span className="input-group-addon" id="basic-addon1">Firma Prestador de servicios</span>
		  
  	     </div>
    	
    </div>
  </div>

</div>





	<div className="row">
		<div className="col-md-8">
			<div className="input-group" >
				<span className="input-group-addon" id="basic-addon1">Identificador del contrato:</span>
				<input type="text" className="form-controls effect-1" id="inputtext"  placeholder="" aria-describedby="basic-addon1" name="nombre_contrato"/>
				<span className="focus-border"></span>
			</div>
		</div>
		<div className="col-md-4">

			<div className="input-group">
				<span className="input-group-addon" id="basic-addon1">Clave de reservacion:</span>
				<input type="text" className="form-controls effect-1 clave" placeholder="" aria-describedby="basic-addon1" name="clave_reservacion" />
				<span className="focus-border"></span>
			</div>
		</div>
	</div>




        
  </form>    
      </header>
      
      <button onClick={this.leer_contrato} id="leercontrato">Leer contrato</button>
      <button onClick={this.Guardar_Reservacion} id="guardarcontrato">Guardar contrato</button>
      

    </div>
    
  }
}

export default App;
