
// import { MoneyFormatter } from '../utils/helpers';
import rklogo from '../images/rklogo'
import { MoneyFormatter } from '../utils/helpers';
const conversor = require('conversor-numero-a-letras-es-ar');


function Detalles(doc, starty, margin_left ) {

    let CLIENTE_NOMBRE, HOTEL , DESTINO, FECHA_SALIDA, FECHA_REGRESO, ABORDA, 
 adultos_juniors, menores_cargo, menores_sin_cargo, 
 TRAVELAGENCY_NOMBRE, TRAVELAGENCY_TELEFONO,TRAVELAGENCY_CIUDAD, AGENTE, CLAVE, INCLUYE, 
 redondo, OBSERVACIONES, LOGOAGENCIA = ""

     let secondColumn_left = 300;
     let threeColumn = 200;
     let increment = 17;

     

     let color= "#004085"; 
     let fillColor = "#cce5ff"
     let completePage = doc.internal.pageSize.width-(margin_left*2)
     var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
     

    //FECHA CONTRATO
     //doc.setFontSize(8); 
     doc.setTextColor("#155724") 
     doc.setFillColor("#d4edda") 
     doc.roundedRect(margin_left, starty, completePage, 17, 13, 0, 'F');
     doc.text(secondColumn_left, starty+13, "FECHA CONTRATO:");
     doc.text(secondColumn_left + 160, starty+13, "14 Sept 2021");
     starty += increment;

     // ID CONTRATO
     doc.setFillColor("#d4edda") 
     doc.roundedRect(margin_left, starty, completePage, 17, 13, 0, 'F');
     doc.text(margin_left*2, starty+13, "CONTRATO:");     
     doc.text(margin_left*2 + 80, starty+13, "12345678901234567890");

     doc.text(secondColumn_left, starty+13, "CLAVE DE RESERVACION:");

     doc.text(secondColumn_left+160, starty+13, "1234-1234");

     
     starty = finSeccion(starty, increment)
     

     let sizeRectangle = 80;
     doc.setFillColor(fillColor) 
     let tmpy = starty
     doc.roundedRect(margin_left, starty, completePage, 17, 0, 0, 'F');
     doc.setTextColor(color) 
     doc.text("DATOS DEL CONTRATANTE", pageWidth / 2, starty+13, 'center');    
     starty += increment;
     sizeRectangle =  40;
     doc.roundedRect(margin_left, starty, completePage, sizeRectangle, 2, 2, 'S');
     doc.text(margin_left*2, starty+13, "NOMBRE:"); linea2(doc, starty,margin_left, completePage)
     
     doc.text(secondColumn_left, starty+13, "TELEFONO:");   linea2(doc, starty,margin_left, completePage)
     starty += increment;

     doc.text(margin_left*2, starty+13, "DOMICILIO:");    linea2(doc, starty,margin_left, completePage)

     starty = tmpy+=sizeRectangle;   
     starty = finSeccion(starty,increment)

     // ITINERARIO
     doc.setFillColor(fillColor) 
     doc.setTextColor(color) 
     doc.roundedRect(margin_left, starty, completePage, 17, 13, 0, 'F');
     doc.text("ITINERARIO", pageWidth / 2, starty+13, 'center');
     starty += increment;
     sizeRectangle = 242;
     doc.roundedRect(margin_left, starty, completePage, sizeRectangle, 2, 2, 'S');
     doc.text(margin_left*2, starty+13, "NOMBRE:");   linea2(doc, starty,margin_left, completePage)     
     doc.text(secondColumn_left, starty+13, "TELEFONO:"); linea2(doc, starty,margin_left, completePage)
     starty += increment;

     doc.text(margin_left*2, starty+13, "DESTINO:");  linea2(doc, starty,margin_left, completePage)   
     doc.text(secondColumn_left, starty+13, "UBICACION:");  linea2(doc, starty,margin_left, completePage)
     starty += increment;


     doc.text(margin_left*2, starty+13, "FECHA DE SALIDA:");  
     doc.text(margin_left+threeColumn, starty+13, "PRESENTARSE:");  
     doc.text(threeColumn*2, starty+13, "HORA SALIDA:"); 
     starty += increment;

     doc.text(margin_left*2, starty+13, "DOMICILIO SALIDA:"); linea2(doc, starty,margin_left, completePage)
     starty += increment;

     doc.text(margin_left*2, starty+13, "UBICACION:");  linea2(doc, starty,margin_left, completePage)
     starty += increment;    

     doc.text(margin_left*2, starty+13, "REFERENCIAS:"); linea2(doc, starty,margin_left, completePage)
     starty += increment;

     doc.text(margin_left*2, starty+13, "FECHA DE REGRESO:"); linea2(doc, starty,margin_left, completePage)    
     doc.text(secondColumn_left, starty+13, "HORA DE REGRESO:"); linea2(doc, starty,margin_left, completePage)
     starty += increment;

     doc.text(margin_left*2, starty+13, "Detalles del traslado: (Traslados incluidos en el costo del servicio):");

     doc.roundedRect(margin_left*2, starty+18, completePage-40, 100, 2, 2, 'S');
     
     
     //ADD RECTANGLE
     starty += 6*increment; // text area itinerario

     starty = finSeccion(starty, increment)
     
     
     //Mensaje advertencia
     doc.setTextColor('#721c24')
     doc.setFillColor('#f8d7da');
     doc.roundedRect(margin_left, starty, completePage, 34, 13, 0, 'F');
     var splittraslados = doc.splitTextToSize("Traslados, Paradas o cualquier paseo no reportado en el contrato tiene costo extra y tiene que ser liquidado al momento, directamente con el operador.", completePage-40);
     doc.text(splittraslados, pageWidth / 2, starty+13, 'center');
     starty = tmpy+=sizeRectangle;
     starty += increment+40; //extra increment porue la leyenda de advertencia cubre 2 lineas
     starty = finSeccion(starty, increment)
     
     
     
     // UNIDAD CONTRATADA
     
     doc.setTextColor(color)
     doc.setFillColor(fillColor);
     doc.roundedRect(margin_left, starty, completePage, 17, 13, 0, 'F');
     doc.text("UNIDAD CONTRATADA", pageWidth / 2, starty+13, 'center');
     starty += increment;
     
     sizeRectangle = 70;
     doc.roundedRect(margin_left, starty, completePage, sizeRectangle, 2, 2, 'S');
     doc.text(margin_left*2, starty+13, "TIPO DE UNIDAD"); linea2(doc, starty,margin_left, completePage)   
     doc.text(secondColumn_left, starty+13, "CAPACIDAD:");
     starty += increment;

     doc.text(margin_left*2, starty+13, 'EQUIPADA CON:'); linea2(doc, starty,margin_left, completePage) 
     starty += increment;
     
     doc.text(margin_left*2, starty+13, 'Aire acondicionado,  Estereo,  Sanitarios, TV/DVD Microfono,  Seguro de pasajeros');
     starty += increment; // extra increment por si hay mas cosas que se agregan
     starty = finSeccion(starty,increment)

     // PAGOS
     doc.setFillColor(fillColor) 
     doc.roundedRect(margin_left, starty, completePage, 17, 13, 0, 'F');
     doc.text("PAGOS", pageWidth / 2, starty+13, 'center');
     starty += increment;
     sizeRectangle = 50;
     doc.roundedRect(margin_left, starty, completePage, sizeRectangle, 2, 2, 'S');
     doc.text(margin_left*2, starty+13, "IMPORTE TOTAL:");     
     doc.text(secondColumn_left, starty+13, "$--------");
     starty += increment;
     doc.text(margin_left*2, starty+13, "ANTICIPO:");     
     doc.text(secondColumn_left, starty+13, "$--------");
     starty += increment;
     doc.text(margin_left*2, starty+13, "SALDO A PAGAR AL INICIO DEL VIAJE:");     
     doc.text(secondColumn_left, starty+13, "$--------");
     
     starty = finSeccion(starty,increment)

     

     //boostrap colors alerts 
     doc.setTextColor('#856404')
     doc.setFillColor('#fff3cd');
     doc.roundedRect(margin_left, starty, completePage, 34, 13, 0, 'F');
     var splitTitle = doc.splitTextToSize('ACEPTO TERMINOS Y CONDICIONES DE TRANSPORTES TURISTICOS RECORRIENDO KILOMETROS S.A. DE C.V.', completePage);
     doc.text(splitTitle, pageWidth / 2, starty+13, 'center');
     doc.setTextColor(color)
     doc.setFillColor(fillColor);
     starty = finSeccion(starty,increment)
     starty = finSeccion(starty,increment)

     
    
     // FIRMAS
     
     
     sizeRectangle = 80;
     doc.text(margin_left*2, starty+13, "FIRMA DEL CLIENTE");    
     doc.text(secondColumn_left, starty+13, "FIRMA PROVEDOR DE SERVICIOS:"); 

}

function finSeccion(y, increment){
    return y + 5 + increment;
}

function linea2(doc, starty,margin_left, completePage){
    doc.setLineDash([1, 1], 0);
    
    let margin_between_text_line = 15
    doc.setDrawColor(71, 217, 252); //line color
    // doc.setLineWidth(1); //line width
    
    doc.line(margin_left*2,
        starty+margin_between_text_line,
        completePage,
        starty+margin_between_text_line
        );
    
    doc.setDrawColor(0);
    doc.setLineWidth(0);
    doc.setLineDash(0);
}

function linea(doc, margin, starty){
    doc.setLineDash([1, 1], 0);
    
    let margin_between_text_line = 15
    doc.setDrawColor(71, 217, 252); //line color
    // doc.setLineWidth(1); //line width
    
    doc.line(margin*2,
        starty+margin_between_text_line,
        margin*10,
        starty+margin_between_text_line
        );
    
    doc.setDrawColor(0);
    doc.setLineWidth(0);
    doc.setLineDash(0);
}



// var params = JSON.stringify({
//     "clave_reservacion": document.getElementsByName("clave_reservacion")[0].value,
//   "nombre_contrato": document.getElementsByName("nombre_contrato")[0].value,
//   "fecha_contrato": document.getElementsByName("fecha_contrato")[0].value,
//   "nombre_contratante": document.getElementsByName("nombre_contratante")[0].value,
//   "telefono_contratante": document.getElementsByName("telefono_contratante")[0].value,
//   "cliente_itinerario": document.getElementsByName("cliente_itinerario")[0].value,
//   "telefono_itinerario": document.getElementsByName("telefono_itinerario")[0].value,
//   "destino_itinerario": document.getElementsByName("destino_itinerario")[0].value,
//   "ubicacion_destino_itinerario": document.getElementsByName("ubicacion_destino_itinerario")[0].value,
//   "fechasalida_itineario": document.getElementsByName("fechasalida_itineario")[0].value,
//   "presentarse_itineario": document.getElementsByName("presentarse_itineario")[0].value,
//   "horasalida_itineario": document.getElementsByName("horasalida_itineario")[0].value,
//   "direccionsalida_itinerario": document.getElementsByName("direccionsalida_itinerario")[0].value,
//   "ubicacion_direccion_salida_itinerario": document.getElementsByName("ubicacion_direccion_salida_itinerario")[0].value,
//   "colonia_itineario": document.getElementsByName("colonia_itineario")[0].value,
//   "ciudad_itineario": document.getElementsByName("ciudad_itineario")[0].value,
//   "entrecalles_itinerario": document.getElementsByName("entrecalles_itinerario")[0].value,
//   "referencias_itinerario": document.getElementsByName("referencias_itinerario")[0].value,
//   "detalles_itineario": document.getElementsByName("detalles_itineario")[0].value,
//   "fecharegreso_itinerario": document.getElementsByName("fecharegreso_itinerario")[0].value,
//   "horaregreso_itineario": document.getElementsByName("horaregreso_itineario")[0].value,
//   "unidad_unidad": document.getElementsByName("unidad_unidad")[0][document.getElementsByName("unidad_unidad")[0].selectedIndex].text,
//   "capacidad_unidad": document.getElementsByName("capacidad_unidad")[0].value,
//   "ACC_unidad": document.getElementsByName("ACC_unidad")[0].value,
//   "estereo_unidad": document.getElementsByName("estereo_unidad")[0].value,
//   "sanitarios_unidad": document.getElementsByName("sanitarios_unidad")[0].value,
//   "tvdvd_unidad": document.getElementsByName("tvdvd_unidad")[0].value,
//   "microfono_unidad": document.getElementsByName("microfono_unidad")[0].value,
//   "seguro_unidad": document.getElementsByName("seguro_unidad")[0].value,
//   "otros_unidad": document.getElementsByName("otros_unidad")[0].value,
//   "total_pagos": document.getElementsByName("total_pagos")[0].value,
//   "anticipo_pagos": document.getElementsByName("anticipo_pagos")[0].value,
//   "pendiente_pagos": document.getElementsByName("pendiente_pagos")[0].value
// });
function Contrato(doc, info, qr) {
          info = JSON.parse(info)
        
          let color_encabezado = (170, 182, 198);//(255,255,255);
          let azul_fuerte_letras = (29,34,78)
            //  doc.setFillColor(170, 182, 198) //azul bajito
            //doc.setFillColor(194, 194, 194) //azul bajito
            doc.setFillColor(255, 255, 255) //azul bajito
          
          doc.ellipse(-20, -50, 950, 131, 'F');
          doc.setDrawColor(170, 182, 198);   //azul bajito
          doc.setDrawColor(0, 0, 0);   //azul bajito
          //doc.ellipse(-20, -45, 950, 131, 'D');
          //doc.ellipse(-20, -40, 950, 131, 'D');
          


          try {
            doc.addImage(rklogo, 'PNG', 20, 20, 130, 40);
            
          } catch (error) {
            console.log(rklogo)
          }
          doc.setFontSize(10);

          
          doc.setTextColor(29,34,78) //azul fuerte
          
          doc.text(160, 30, 'Contrato de prestación de servicios de Transporte');
          doc.setFontSize(11);
          doc.textWithLink( 'RECORRIENDO KILOMETROS SA DE CV',160, 45,{ url: 'http://recorriendokilometros.com.mx/' });
          doc.text(240, 60, 'RKI180820PJA');
          doc.setFontSize(6);
          doc.text(220, 70, 'PERMISO NO. 1431RKI28092021041901000');
          

          doc.setFontSize(8);
          doc.setDrawColor(0);
          
          doc.setFillColor(29,34,78) //rojo
          doc.roundedRect(390, 30, 90, 44, 3, 3, 'FD'); //Fill D/border
          
          doc.setTextColor(255,255,255);
          doc.text(395, 43, 'FECHA CONTRATO:');
          doc.text(420, 63, 'FOLIO:');
          
          doc.setTextColor(0,0,0);
          doc.setFontSize(11);
          doc.text(495, 43, info.fecha_contrato);
          doc.text(495, 66, info.clave_reservacion);
          

          

        //   doc.setDrawColor(0);
        //   doc.setFillColor(255, 255, 255);
        //   doc.rect(400, 52, 100, 25,'F'); 
          
          doc.setTextColor(29,34,78);
          doc.line(390, 52, 570, 52);
          
        //   doc.text(502, 64, Folio+"");
          //doc.text(600, 64, 'E');
        
          doc.setDrawColor(0);
          doc.setFillColor(255, 255, 255);
          doc.roundedRect(390, 30, 180, 44, 3, 3); //  Black square with rounded corners
           ///       x    y  ancho altura 
           

           let starty = 90;
           let increment = 24;
           let tabinsidesection = 17
           let color_labels = (255,255,255);//(255,255,255);
           let color_azules = (62, 53, 125);//(255,255,255);
           let color_valores = (0,0,0);//(255,255,255);
           doc.setDrawColor(29,34,78);
           doc.setLineWidth(.8)
   
           doc.setTextColor(color_valores)
           doc.setFont('helvetica', "bold")
           doc.text(20, starty+13, 'DATOS DEL CONTRATANTE');
           doc.setFont('helvetica', "normal")
           starty += tabinsidesection; 
   
           doc.setFillColor(126, 152, 186) //azul relleno
           doc.roundedRect(15, starty, 163, 34, 6, 6, 'F');
           doc.rect(170, starty, 10, 34, 'F')
           doc.roundedRect(15, starty, 550, 34, 6, 6, 'D');
   
   
           doc.setTextColor(color_labels);
           doc.text(20, starty+13, 'NOMBRE DEL CONTRATANTE');
           doc.setTextColor(color_valores) 
           doc.text(180, starty+13, info.nombre_contratante);
           doc.setLineWidth(.5)

           doc.setFillColor(126, 152, 186) //azul relleno
           doc.rect(430, starty, 33, 17, 'F');
           doc.setTextColor(color_labels)
           doc.text(435, starty+13, 'TEL.');
           doc.setTextColor(color_valores)
           doc.text(465, starty+13, info.telefono_itinerario);

           doc.line(15, starty+17, 565, starty+17);
           
   
           starty += tabinsidesection;
           
           doc.setFillColor(126, 152, 186) //azul relleno
           doc.setTextColor(color_labels)
           doc.text(20, starty+13, 'ENCARGADO DE LA UNIDAD');
           doc.setTextColor(color_valores)
           doc.text(180, starty+13, info.cliente_itinerario);
           
           doc.setFillColor(126, 152, 186) //azul relleno
           doc.rect(430, starty, 33, 17, 'F');
           doc.setTextColor(color_labels)
           doc.text(435, starty+13, 'TEL.');
           doc.setTextColor(color_valores)
           doc.text(465, starty+13, info.telefono_contratante);
           
           starty += tabinsidesection;
           
           doc.setLineWidth(.8)
           starty += tabinsidesection; 
           doc.setTextColor(color_valores)
           doc.setFont('helvetica', "bold")
           doc.text(20, starty+13, 'DATOS DE SALIDA Y REGRESO DE VIAJE');
           doc.setFont('helvetica', "normal")
           
           
           starty += tabinsidesection;
           // rectangulo de toda la seccion  DATOS DE SALIDA Y REGRESO DE VIAJE
           doc.setTextColor(color_valores)
           doc.roundedRect(15, starty, 550, 260, 3, 3, 'D');
           // rectangulo de toda la seccion  DATOS DE SALIDA Y REGRESO DE VIAJE
   
           doc.setLineWidth(.5)
           doc.setTextColor(color_azules)
           doc.text(30, starty+13, 'DESTINO');
           doc.setTextColor(color_valores)
           doc.text(110, starty+13, info.destino_itinerario);
           doc.line(15, starty+17, 565, starty+17);
           
           
           doc.setTextColor(color_azules)
           doc.text(335, starty+13, 'FECHA DE SALIDA');
           doc.setTextColor(color_valores)
           doc.text(444, starty+13, info.fechasalida_itineario);
           
           
           starty += tabinsidesection; 
   
           doc.setTextColor(color_azules)
           doc.text(30, starty+13, 'PRESENTARSE');
           doc.setTextColor(color_valores)
           doc.text(130, starty+13, info.presentarse_itineario);
           doc.line(15, starty+17, 565, starty+17);
           
           
           doc.setTextColor(color_azules)
           doc.text(335, starty+13, 'HORA DE SALIDA');
           doc.setTextColor(color_valores)
           doc.text(444, starty+13, info.horasalida_itineario);
           
           starty += tabinsidesection; 
   
           doc.setTextColor(color_azules)
           doc.text(30, starty+13, 'DIRECCION DE SALIDA');
           doc.setTextColor(color_valores)
           doc.text(190, starty+13, info.direccionsalida_itinerario);
           doc.line(15, starty+17, 565, starty+17);
           
           
       starty += tabinsidesection; 
   
           doc.setTextColor(color_azules)
           doc.text(30, starty+13, 'COLONIA');
           doc.setTextColor(color_valores)
           doc.text(165, starty+13, info.colonia_itineario);
           doc.line(15, starty+17, 565, starty+17);

           doc.setTextColor(color_azules)
           doc.text(335, starty+13, 'CIUDAD');
           doc.setTextColor(color_valores)
           doc.text(444, starty+13, info.ciudad_itineario);
           
           starty += tabinsidesection; 
   
           doc.setTextColor(color_azules)
           doc.text(30, starty+13, 'UBICACION');
           doc.setTextColor(color_valores)
           doc.text(165, starty+13, info.ubicacion_direccion_salida_itinerario);
           doc.setTextColor(29,34,78)
           doc.textWithLink( info.ubicacion_direccion_salida_itinerario,165, starty+13,{ url: info.ubicacion_direccion_salida_itinerario });
           doc.setTextColor(color_azules)
           doc.line(15, starty+17, 565, starty+17);

           

           
           starty += tabinsidesection; 
           doc.setTextColor(color_azules)
           doc.text(30, starty+13, 'ENTRE LAS CALLES');
           doc.setTextColor(color_valores)
           doc.text(165, starty+13, info.entrecalles_itinerario);
           doc.line(15, starty+17, 565, starty+17);
           
           
           
           starty += tabinsidesection; 
   
           doc.setTextColor(color_azules)
           doc.text(30, starty+13, 'PUNTO DE REFERENCIA');
           doc.setTextColor(color_valores)
           
           let splitpuntoreferencia = doc.splitTextToSize(info.referencias_itinerario, 390);
           doc.text(165, starty+13, splitpuntoreferencia);
   
           doc.line(15, starty+40, 565, starty+40);
           
           starty += tabinsidesection+20; 

           doc.setTextColor(color_azules)
           doc.text(30, starty+13, 'FECHA DE REGRESO');
           doc.setTextColor(color_valores)
           doc.text(165, starty+13, info.fecharegreso_itinerario);
           doc.line(15, starty+17, 565, starty+17);
           
           
           doc.setTextColor(color_azules)
           doc.text(335, starty+13, 'HORA DE REGRESO');
           doc.setTextColor(color_valores)
           doc.text(450, starty+13, info.horaregreso_itineario);

        starty += increment; 
        
           doc.setTextColor(color_azules)
           doc.text(30, starty+13, 'ITINERARIO');
           doc.setTextColor(color_valores)
   
            doc.roundedRect(30, starty+15, 500, 57, 3, 3, 'D');
   
           var splitObservacion = doc.splitTextToSize(info.detalles_itineario, 490);
           var splitObservacion = "" 
           doc.text(40, starty+increment+6, splitObservacion);
           
           starty += increment; 
           starty += increment; 
           starty += increment; 
   
           
           
   
           starty += increment; 
           doc.setTextColor(color_valores)
   
           console.log(doc.getFont())
           console.log(doc.getFontList())
           doc.setFontSize(9)
           doc.setFont('helvetica', "italic")
           var splitObservacion = doc.splitTextToSize('IMPORTANTE: TRASLADO O PASEO EXTRA NO ESPECIFICADO TIENE COSTO EXTRA Y TENDRA QUE SER LIQUIDADO AL MOMENTO DE REALIZARLO DIRECTO CON EL OPERADOR', 550);
           doc.text(20, starty+13, splitObservacion);
           doc.setFontSize(11)
           doc.setFont('helvetica', "normal")
   
   
           //FIN RECTANGULO
           starty += tabinsidesection*2; 
           doc.setLineWidth(.8)
           doc.setTextColor(color_valores)
           doc.setFont('helvetica', "bold")
           doc.text(20, starty+13, 'CARACTERISTICAS DE LA UNIDAD CONTRATADA');
           doc.setFont('helvetica', "normal")
           starty += tabinsidesection;
           // rectangulo de toda la seccion TIPO UNIDAD
           doc.setTextColor(color_valores)
           doc.roundedRect(15, starty, 550, 90, 3, 3, 'D');
           // rectangulo de toda la seccion TIPO UNIDAD
   
           doc.setLineWidth(.5)
           doc.setTextColor(color_azules)
           doc.text(30, starty+13, 'TIPO DE UNIDAD');
           doc.setTextColor(color_valores)
           doc.text(124, starty+13, info.unidad_unidad);
           doc.line(15, starty+17, 565, starty+17);
           
           
           doc.setTextColor(color_azules)
           doc.text(250, starty+13, 'CAPACIDAD');
           doc.setTextColor(color_valores)
           doc.text(350, starty+13, info.capacidad_unidad);
   
          
   
           starty += tabinsidesection; 
           doc.setTextColor(color_azules)
           doc.text(30, starty+13, 'UNIDAD EQUIPADA CON:');
   
   
           starty += increment+5; 
           
           doc.setFontSize(8)
           
           doc.circle(60, starty, 7, 'D'); //AIRE   
           //doc.text(57, starty+3, EQUIPADA.includes('AIRE ACONDICIONADO') ? 'X' : '');
           doc.text(57, starty+3, info.ACC_unidad ? 'X' : '');
           doc.text(70, starty+3, 'AIRE ACONDICIONADO'); 
   
           doc.circle(180, starty, 7, 'D'); //sanitario
          doc.text(177, starty+3, info.sanitarios_unidad ? 'X' : '');
           doc.text(190, starty+3, 'SANITARIO');
   
           doc.circle(300, starty, 7, 'D'); //TV/DVD
          doc.text(297, starty+3, info.tvdvd_unidad ? 'X' : ''); 

           doc.text(310, starty+3, 'TV/DVD');
   
           doc.circle(420, starty, 7, 'D');  //Microfono
           doc.text(417, starty+3, info.microfono_unidad ? 'X' : '');
           doc.text(430, starty+3, 'MICROFONO');
           
           starty += increment; 
   
           doc.circle(60, starty, 7, 'D'); //STEREO
           doc.text(57, starty+3, info.estereo_unidad ? 'X' : '');
           // doc.text(57, starty+3, true ? 'X' : '');
           doc.text(70, starty+3, 'STEREO');
           
           doc.circle(180, starty, 7, 'D'); //SEGURO DE PASAJEROS
           doc.text(177, starty+3, true ? 'X' : '');
            //    doc.text(177, starty+3, EQUIPADA.includes('SEGURO DE PASAJERO') ? 'X' : '');
            //    doc.text(177, starty+3, EQUIPADA.includes('SEGURO DE VIAJERO') ? 'X' : '');
               
           doc.text(190, starty+3, 'SEGURO DE PASAJEROS');
   
           doc.circle(380, starty, 7, 'D'); //OTROS
           doc.text(390, starty+3, 'OTROS:');
   
           doc.setFontSize(11)
           doc.setLineWidth(.8)
           
           starty += tabinsidesection; 
           doc.setTextColor(color_valores)
           doc.setFont('helvetica', "bold")
           doc.text(20, starty+13, 'PAGOS');
           doc.setFont('helvetica', "normal")
           starty += tabinsidesection; 
           doc.setTextColor(color_valores)
           doc.roundedRect(15, starty, 550, 60, 3, 3, 'D');
           // rectangulo de toda la seccion TIPO UNIDAD
           
           let ClaseConversor = conversor.conversorNumerosALetras;
           let miConversor = new ClaseConversor();
   
           doc.setLineWidth(.5)
           doc.line(15, starty+20, 565, starty+20);
           starty += tabinsidesection; 
           doc.setTextColor(color_azules)
           doc.text(30, starty, 'IMPORTE TOTAL');
           doc.setTextColor(color_valores)
           let IMPORTE_TOTAL = ""
           try{
           doc.text(120, starty, info.total_pagos +  ' '+  miConversor.convertToText(info.total_pagos.replace('$', '').replace(',', '').replace('.00', '').trim()));
           }catch(error){
               doc.text(120, starty, info.total_pagos.replace('$', '').replace(',', '').trim())
           }
           
           doc.line(15, starty+22, 565, starty+22);
           starty += tabinsidesection; 
           
           doc.setTextColor(color_azules)
           doc.text(30, starty, 'ANTICIPO');
           doc.setTextColor(color_valores)
           let ANTICIPO  = ""
           try{
               doc.text(120, starty, info.anticipo_pagos +  ' '+  miConversor.convertToText(info.anticipo_pagos.replace('$', '').replace(',', '').replace('.00', '').trim()));
           }catch(error){
               doc.text(120, starty, ANTICIPO)
           }
           
   
           starty += tabinsidesection; 
           doc.setTextColor(color_azules)
           doc.text(30, starty, 'SALDO');
           doc.setTextColor(color_valores)
           let SALDO = ""
           try{
           doc.text(120, starty, info.pendiente_pagos +  ' '+  miConversor.convertToText(info.pendiente_pagos.replace('$', '').replace(',', '').replace('.00', '').trim()));
           }catch(error){
               doc.text(120, starty, SALDO)
           }
           
           starty += increment; 
           doc.setFontSize(8);
            // rectangulo de toda la seccion TIPO UNIDAD
            doc.setTextColor(color_valores)
            doc.roundedRect(15, starty-10, 550, 105, 3, 3, 'D');
            // rectangulo de toda la seccion TIPO UNIDAD
   
          
   
           doc.setTextColor(color_azules)
           var derivado = doc.splitTextToSize("Derivado del Servicio de Transporte Terrestre que solicite a la empresa RECORRIENDO KILOMETROS S.A. de C.V., y una vez que he leido el total de las condiciones que se adjuntan al presente contrato, estoy de acuerdo con el total de su contenido.", 530);
           doc.text(20, starty, derivado);

           starty += increment;

           try {
            doc.addImage(qr, 'png', 500, starty, 45, 45);
            doc.text(505, starty+55, info.clave_reservacion);
          } catch (error) {
            console.log(qr)
          }
           
           starty += increment*2; 
           doc.line(90, starty-10, 240, starty-10);
           
           doc.text(90, starty, 'Nombre y Firma de aceptación del Cliente');
           doc.line(300, starty-10, 450, starty-10);
   
           let VENDEDOR = ""
           doc.text(345, starty-20, VENDEDOR);
           
           doc.text(330, starty, 'Nombre y Firma del vendedor');

           

           starty += tabinsidesection;
           // doc.text(150, starty, 'TELEFONO DE EMERGENCIA: GUSTAVO JAUREGUI 333-808-6093');

          
   
           starty += tabinsidesection;
           doc.text(20, starty, 'NOTA IMPORTANTE: A la firma del contrato deberá cubrirse el 20% del importe total, y el saldo una semana antes de la realización del viaje.');
   
           doc.setFontSize(10);

}



function xcenter(doc, phrase){
    return (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(phrase) * doc.internal.getFontSize() / 2);
    
}

function pieCharter(doc){
    let starty = 635;
    let incremento = 17;

    //doc.addImage(footer, 'PNG', 0, starty, doc.internal.pageSize.width, 305);
    
    doc.setLineDash([1, 1], 0);
    doc.line(15, starty-incremento, 560, starty-incremento);
    
    doc.setTextColor(7, 109, 150) // azul blue
    doc.setFontSize(11);
    const salidas1 = "Los puntos de Salida son:";
    doc.text(30, starty, salidas1);
    const salidas2 = "5:30 am Soriana Rio Nilo a un costado de Banamex (Rio Nilo y Patria)";
    starty += incremento; 
    doc.text(30, starty, salidas2);
    const salidas3 = "6:00 am Plaza Forum sobre Blvd Tlaquepaque";
    starty += incremento; 
    doc.text(30, starty, salidas3);
    const salidas4 = "7:00 am Minerva Frente al Hotel Fiesta Americana Minerva";
    starty += incremento; 
    doc.text(30, starty, salidas4);
    const salidas5 = "7:15 am Central Zapopan en Oxxo y Pollo Pepe";
    starty += incremento; 
    doc.text(30, starty, salidas5);
    const salidas6 = "Se les pide estar 30 min antes para su registro";
    starty += incremento; 
    doc.text(30, starty, salidas6);

    doc.setLineDash([1, 1], 0);
    doc.line(15, starty+5, 560, starty+5);

    doc.setFontSize(12)
    doc.setFont("normal" ,"bold");
    
    doc.setTextColor(7, 109, 150) // azul blue
    const leyenda1  = "TELEFONO DE EMERGENCIA EN LA SALIDA 333-808-6093 CON GUSTAVO JAUREGUI";
    starty += incremento; 
    
    doc.text(leyenda1, xcenter(doc,leyenda1), starty );
    // doc.text(30, starty, leyenda1);
    const leyenda2  = "FAVOR DE PRESENTARSE 30 MINUTOS ANTE DE SU SALIDA";
    starty += incremento; 
    doc.text(leyenda2, xcenter(doc,leyenda2), starty );

    doc.setFontSize(8)
    doc.setTextColor(72,59, 130)
    const leyenda3  = "Av. Fidel Velazquez #643-A, Col. Santa Elena Alcande., Cp.P. 44230, Guadalajara, Jal. "
    starty += incremento; 
    doc.text(leyenda3, xcenter(doc,leyenda3), starty );
    const leyenda4  = "Tel. (33) 3631 3036 con 10 líneas";
    starty += incremento; 
    doc.text(leyenda4, xcenter(doc,leyenda4), starty );

}

function FormaPago(doc, forma_pago){

    doc.setFillColor(230, 248, 255);
    doc.roundedRect(15, 205, 185, 22, 3, 3, 'F');

    doc.text(30, 220, 'FORMA DE PAGO');
    doc.text(200, 220, forma_pago);

    doc.roundedRect(15, 205, 582, 22, 3, 3);

}

function PagosRegistrados(doc, total, registrados, pendiente){

    doc.setFillColor(230, 248, 255);
    doc.roundedRect(15, 255, 180, 22, 3, 3, 'F');

    doc.text(30, 250, 'IMPORTE TOTAL');
    doc.text(200, 250, total);

    // doc.setFillColor(230, 248, 255);
    // doc.roundedRect(15, 205, 255, 22, 3, 3, 'F');
    doc.text(30, 275, 'PAGOS REGISTRADOS');
    doc.text(200, 275, registrados);

    // doc.setFillColor(230, 248, 255);
    // doc.roundedRect(15, 205, 285, 22, 3, 3, 'F');
    doc.text(30, 300, 'SALDO PENDIENTE');
    doc.text(200, 300, pendiente);


    doc.roundedRect(15, 235, 582, 66, 3, 3);

}

function Fecha(doc, FECHA_ENTRADA, FECHA_SALIDA, TOTAL_NOCHES) {
    

    doc.setDrawColor(0);
    doc.setFillColor(230, 93, 101);
    doc.roundedRect(15, 210, 582, 50, 3, 3, 'FD'); //  Black square with rounded corners
    
    
    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
    doc.rect(15, 235, 582, 25,'F');


    doc.setTextColor(255,255,255);
    doc.text(60, 225, 'FECHA ENTRADA');
    doc.setTextColor(0,0,0);
    doc.text(70, 253, FECHA_ENTRADA);


    doc.setTextColor(255,255,255);
    doc.text(240, 225, 'FECHA SALIDA');
    doc.setTextColor(0,0,0);
    doc.text(250, 253, FECHA_SALIDA);


    doc.setTextColor(255,255,255);
    doc.text(420, 225, 'TOTAL NOCHES');
    doc.setTextColor(0,0,0);
    doc.text(430, 253, TOTAL_NOCHES);

    //doc.setDrawColor(0);
    
    doc.roundedRect(15, 210, 582, 50, 3, 3);

   
}

function Cliente (doc,  NOMBRE_PASAJERO, TOTAL_PAGADO) {

    doc.setDrawColor(0);
    doc.setFillColor(230, 93, 101);
    doc.roundedRect(15, 310, 582, 50, 3, 3, 'FD'); //  Black square with rounded corners
    
    
    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
    doc.rect(15, 335, 582, 25,'F');


    doc.setTextColor(255,255,255);
    doc.text(60, 325, 'NOMBRE PASAJERO');
    doc.setTextColor(0,0,0);
    doc.text(70, 353, NOMBRE_PASAJERO);


    doc.setTextColor(255,255,255);
    doc.text(440, 325, 'TOTAL PAGADO');
    doc.setTextColor(0,0,0);
    console.log(TOTAL_PAGADO)
    //doc.text(460, 353, MoneyFormatter(TOTAL_PAGADO) );

}

function Cuadros (doc, NUM_HABITACIONES, NOMBRE_AGENCIA,  NUM_SGL, NUM_DBL, NUM_TPL,  NUM_CPL,  CIUDAD_AGENCIA, MEN_CC, MEN_SC,  MEN_JR, TELEFONO_AGENCIA, PLAN_CONTRATADO, CONTACTO_AGENCIA,  CONFIRMADO_POR, OBSERVACIONES, CLAVE) {

    doc.setDrawColor(0);
    doc.setFillColor(230, 93, 101);
    doc.roundedRect(15, 410, 582, 25, 3, 3, 'FD'); //  Black square with rounded corners
    
    
    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
    doc.rect(5, 435, 582, 25,'F');


    doc.setTextColor(255,255,255);
    doc.text(60, 425, 'RELACION DE HABITACIONES');
    doc.setTextColor(0,0,255);
    doc.setFontSize(11);
    doc.text(30, 448, 'No. DE HABITACIONES RESERVADAS:');
    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.text(30, 458, NUM_HABITACIONES);
    //
    doc.setTextColor(0,0,255);
    doc.setFontSize(11);
    doc.text(30, 472, 'DESGLOCE OCUPACION:');
    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.text(30, 485, `SGL: ${NUM_SGL} DBL: ${NUM_DBL} TPL: ${NUM_TPL} CPL: ${NUM_CPL}`);
    //
    doc.setTextColor(0,0,255);
    doc.setFontSize(11);
    doc.text(30, 499, 'MENORES:');
    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.text(30, 510, `C/C: ${MEN_CC} S/C ${MEN_SC} JR ${MEN_JR} `);
    //
    doc.setTextColor(0,0,255);
    doc.setFontSize(11);
    doc.text(30, 520, 'PLAN CONTRADO');
    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.text(30, 530, PLAN_CONTRATADO);
    //
    doc.setTextColor(0,0,255);
    doc.setFontSize(11);
    doc.text(30, 550, 'CONFIRMADO POR');
    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.text(30, 560, CONFIRMADO_POR);
    //
    doc.setTextColor(0,0,255);
    doc.setFontSize(11);
    doc.text(30, 574, 'CLAVE');
    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.text(30, 584, CLAVE);
    
    //DATOS AGENCIA
    doc.setTextColor(255,255,255);
    doc.text(390, 425, 'DATOS DE LA AGENCIA');
    doc.setTextColor(0,0,0);
    doc.setTextColor(0,0,255);
    doc.setFontSize(11);
    doc.text(390, 448, 'NOMBRE DE LA AGENCIA');
    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.text(390, 458, NOMBRE_AGENCIA);
    //
    doc.setTextColor(0,0,255);
    doc.setFontSize(11);
    doc.text(390, 472, 'CIUDAD');
    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.text(390, 485, CIUDAD_AGENCIA);
    //
    doc.setTextColor(0,0,255);
    doc.setFontSize(11);
    doc.text(390, 499, 'TELEFONO');
    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.text(390, 510, TELEFONO_AGENCIA);
    //
    doc.setTextColor(0,0,255);
    doc.setFontSize(11);
    doc.text(390, 520, 'CONTACTO');
    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.text(390, 5410, CONTACTO_AGENCIA);
    //
    doc.setTextColor(0,0,255);
    doc.setFontSize(11);
    doc.text(390, 550, 'OBSERVACIONES');
    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.text(390, 560, OBSERVACIONES);
    

}




export default {
    Contrato,
    pieCharter,
    Cliente,
    Cuadros,
    Fecha,
    FormaPago,
    PagosRegistrados
}