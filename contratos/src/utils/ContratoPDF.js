
// import { MoneyFormatter } from '../utils/helpers';


function Detalles(doc, starty, margin_left ) {

    let CLIENTE_NOMBRE, HOTEL , DESTINO, FECHA_SALIDA, FECHA_REGRESO, ABORDA, 
 adultos_juniors, menores_cargo, menores_sin_cargo, 
 TRAVELAGENCY_NOMBRE, TRAVELAGENCY_TELEFONO,TRAVELAGENCY_CIUDAD, AGENTE, CLAVE, INCLUYE, 
 redondo, OBSERVACIONES, LOGOAGENCIA = ""

     let secondColumn_left = 300;
     let threeColumn = 200;
     let increment = 17;
     let color_TITLES= "#000000"; 
     let color_valores = (0,0,0);
     let fillColor = "#ddd"
     let fillColor_id = "#bbb"
     let completePage = doc.internal.pageSize.width-(margin_left*2)


     // ID CONTRATO
     doc.setFillColor(fillColor_id) 
     doc.roundedRect(margin_left, starty, completePage, 17, 13, 0, 'F');
     doc.text(margin_left*2, starty+13, "IDENTIFICADOR CONTRATO:");     
     doc.text(secondColumn_left, starty+13, "CLAVE DE RESERVACION:");

     starty += increment;
     
     let sizeRectangle = 80;
     




     doc.setFillColor(fillColor) 
     let tmpy = starty
     doc.roundedRect(margin_left, starty, completePage, 17, 13, 0, 'F');
     doc.setTextColor(color_TITLES) 
     doc.text(margin_left*2, starty+13, 'DATOS DEL CONTRATANTE');
     starty += increment;
     doc.setTextColor(color_valores)
     sizeRectangle =  40;
     doc.roundedRect(margin_left, starty, completePage, sizeRectangle, 13, 0, 'D');
     doc.text(margin_left*2, starty+13, "NOMBRE:");     
     doc.text(secondColumn_left, starty+13, "TELEFONO:");
     starty += increment;
     doc.text(margin_left*2, starty+13, "DIRECCION:");

     starty = tmpy+=sizeRectangle;
     starty += increment;

     // ITINERARIO
     doc.setFillColor(fillColor) 
     doc.roundedRect(margin_left, starty, completePage, 17, 13, 0, 'F');
     

     doc.text(margin_left*2, starty+13, 'ITINERARIO');
     starty += increment;
     sizeRectangle = 180;
     doc.roundedRect(margin_left, starty, completePage, sizeRectangle, 13, 0, 'D');
     doc.text(margin_left*2, starty+13, "NOMBRE:");     
     doc.text(secondColumn_left, starty+13, "TELEFONO:");

     starty += increment;
     doc.text(margin_left*2, starty+13, "DESTINO:");     
     doc.text(secondColumn_left, starty+13, "UBICACION:");

     starty += increment;
     doc.text(margin_left*2, starty+13, "FECHA DE SALIDA:");
     doc.text(margin_left+threeColumn, starty+13, "PRESENTARSE:");
     doc.text(threeColumn*2, starty+13, "HORA SALIDA:");

     starty += increment;
     doc.text(margin_left*2, starty+13, "DOMICILIO SALIDA:"); 
     
     starty += increment;    
     doc.text(margin_left*2, starty+13, "UBICACION:");

     starty += increment;    
     doc.text(margin_left*2, starty+13, "REFERENCIAS:");

     starty += increment;
     doc.text(margin_left*2, starty+13, "FECHA DE REGRESO:");     
     doc.text(secondColumn_left, starty+13, "HORA DE REGRESO:");

     starty += increment;    
     doc.text(margin_left*2, starty+13, "Detalles del traslado: (Traslados incluidos en el costo del servicio):");
     
     //ADD RECTANGLE

     starty += increment; 
     starty += increment; 
     doc.text(margin_left*2, starty+13, "Traslados, Paradas o cualquier paseo no reportado en el contrato tiene costo extra y tiene que ser liquidado al momento, directamente con el operador.");
     

     starty = tmpy+=sizeRectangle;
     starty += increment;
     starty += increment;

     // UNIDAD CONTRATADA
     doc.setFillColor(fillColor) 
     doc.roundedRect(margin_left, starty, completePage, 17, 13, 0, 'F');
     

     doc.text(margin_left*2, starty+13, 'UNIDAD CONTRATADA');
     starty += increment;
     sizeRectangle = 100;
     doc.roundedRect(margin_left, starty, completePage, sizeRectangle, 13, 0, 'D');
     doc.text(margin_left*2, starty+13, "TIPO DE UNIDAD");     
     doc.text(secondColumn_left, starty+13, "CAPACIDAD:");
     starty += increment;
     doc.text(margin_left*2, starty+13, 'EQUIPADA CON:');
     
     doc.text(margin_left+120, starty+13, 'Aire acondicionado,  Estereo,  Sanitarios, TV/DVD Microfono,  Seguro de pasajeros');
     starty += increment;

     // PAGOS
     doc.setFillColor(fillColor) 
     doc.roundedRect(margin_left, starty, completePage, 17, 13, 0, 'F');
     

     doc.text(margin_left*2, starty+13, 'PAGOS');
     starty += increment;
     sizeRectangle = 50;
     doc.roundedRect(margin_left, starty, completePage, sizeRectangle, 13, 0, 'D');
     doc.text(margin_left*2, starty+13, "IMPORTE TOTAL:");     
     doc.text(secondColumn_left, starty+13, "$--------");
     starty += increment;
     doc.text(margin_left*2, starty+13, "ANTICIPO:");     
     doc.text(secondColumn_left, starty+13, "$--------");
     starty += increment;
     doc.text(margin_left*2, starty+13, "SALDO A PAGAR AL INICIO DEL VIAJE:");     
     doc.text(secondColumn_left, starty+13, "$--------");
     starty += increment;

     // FIRMAS
     doc.setFillColor(fillColor) 
     doc.roundedRect(margin_left, starty, completePage, 17, 13, 0, 'F');
     

     doc.text(margin_left*2, starty+13, 'ACEPTO TERMINOS Y CONDICIONES DE TRANSPORTES TURISTICOS RECORRIENDO KILOMETROS S.A. DE C.V.');
     starty += increment;
     starty += increment;
     sizeRectangle = 80;
     doc.text(margin_left*2, starty+13, "FIRMA DEL CLIENTE");     
     doc.text(secondColumn_left, starty+13, "FIRMA PROVEDOR DE SERVICIOS:");
     
     
     
     
     


     
     

     // starty += increment; 
     // doc.setFillColor(232,68, 86) //red
     // doc.roundedRect(15, starty, 185, 17, 3, 3, 'F');
     // doc.setTextColor(color_labels)
     // doc.text(30, starty+13, 'HOTEL / DESTINO');
     
     // starty += increment; 
     // doc.setTextColor(color_valores)
     // var splithoteldestino= doc.splitTextToSize(HOTEL  + ' / ' +  DESTINO, 400);
     // doc.text(40, starty+13, splithoteldestino);

     // // doc.text(40, starty+13, HOTEL  + ' / ' +  DESTINO);
     // doc.roundedRect(15, starty, 550, 30, 3, 3, 'D');
     
     // //FECHA
     // starty += increment+10; 
     // doc.setFillColor(232,68, 86) //red
     // doc.roundedRect(15, starty, 550, 17, 3, 3, 'F');
     // doc.setTextColor(color_labels)
     // doc.text(30, starty+13, 'FECHA DE SALIDA');
     // doc.text(150, starty+13, 'FECHA DE REGRESO');
     // doc.text(300, starty+13, 'ABORDA EN Y HORARIO');
     
     // starty += increment; 
     // doc.setTextColor(color_valores) 
     // doc.text(50, starty+13, FECHA_SALIDA);
     // doc.text(180, starty+13, FECHA_REGRESO);
     // //doc.text(300, starty+13, "MINERVA A LAS 07:00HRS");
     // //doc.textWithLink( ABORDA,300, starty+13,{ url: 'https://goo.gl/maps/KgRQhTxJQoMNe8nv9' });

     // var splitAborda = doc.splitTextToSize(ABORDA, 250);
     // doc.text(300, starty+13, splitAborda);


     // doc.roundedRect(15, starty, 550, 30, 3, 3, 'D');

     // //adultos y juniors
     // starty += increment+10; 
     // doc.setFillColor(232,68, 86) //red
     // doc.roundedRect(15, starty, 95, 33, 3, 3, 'F');
     // doc.setTextColor(color_labels)
     // doc.text(30, starty+13, 'No. ADULTOS ');
     // doc.text(30, starty+28, 'Y JUNIORS ');
     
     // doc.setTextColor(color_valores) 
     // doc.roundedRect(120, starty, 40, 33, 3, 3, 'D');
     // doc.text(130, starty+20, adultos_juniors);


     // //menores cargo
     // doc.setFillColor(232,68, 86) //red
     // doc.roundedRect(190, starty, 95, 33, 3, 3, 'F');
     // doc.setTextColor(color_labels)
     // doc.text(200, starty+13, 'No. MENORES ');
     // doc.text(200, starty+28, 'CON CARGO ');
     
     // doc.setTextColor(color_valores) 
     // doc.roundedRect(300, starty, 40, 33, 3, 3, 'D');
     // doc.text(310, starty+20, menores_cargo);
     
     // //menores sin cargo
     // doc.setFillColor(232,68, 86) //red
     // doc.roundedRect(355, starty, 95, 33, 3, 3, 'F');
     // doc.setTextColor(color_labels)
     // doc.text(365, starty+13, 'No. MENORES ');
     // doc.text(365, starty+28, 'SIN CARGO ');
     
     // doc.setTextColor(color_valores) 
     // doc.roundedRect(465, starty, 40, 33, 3, 3, 'D');
     // doc.text(475, starty+20, menores_sin_cargo);
     

     // //Nombre agencia
     // starty += increment+13; 
     // doc.setFillColor(232,68, 86) //red
     // doc.roundedRect(15, starty, 185, 17, 3, 3, 'F');
     // doc.setTextColor(color_labels)
     // doc.text(30, starty+13, 'NOMBRE DE AGENCIA');

     // doc.setFillColor(232,68, 86) //red
     // doc.roundedRect(310, starty, 250, 17, 3, 3, 'F');
     // doc.setTextColor(color_labels)
     // doc.text(325, starty+13, 'TELEFONO AGENCIA');
     
     // starty += increment; 
     // doc.setTextColor(color_valores) 
     // doc.text(40, starty+13, TRAVELAGENCY_NOMBRE);
     // doc.roundedRect(15, starty, 250, 17, 3, 3, 'D');

     // //TELEFONO AGENCIA
     // doc.setTextColor(color_valores) 
     // doc.roundedRect(310, starty, 250, 17, 3, 3, 'D');
     // doc.text(325, starty+13, TRAVELAGENCY_TELEFONO);

     

     // //CIUDAD
     
     // starty += increment; 
     // doc.setFillColor(232,68, 86) //red
     // doc.roundedRect(15, starty, 250, 17, 3, 3, 'F');
     // doc.setTextColor(color_labels)
     // doc.text(30, starty+13, 'CIUDAD');

     // //AGENTE
     // doc.setFillColor(232,68, 86) //red
     // doc.roundedRect(310, starty, 250, 17, 3, 3, 'F');
     // doc.setTextColor(color_labels)
     // doc.text(325, starty+13, 'AGENTE');
     
     // starty += increment; 
     // doc.setTextColor(color_valores) 
     // doc.text(40, starty+13, TRAVELAGENCY_CIUDAD);
     // doc.roundedRect(15, starty, 250, 17, 3, 3, 'D');

     // doc.setTextColor(color_valores) 
     // doc.roundedRect(310, starty, 250, 17, 3, 3, 'D');
     // doc.text(325, starty+13, AGENTE);

     
     // // if(LOGOAGENCIA){ //REMOVE ! to production
     //   //CLAVE RESERVACION
     //   starty += increment; 
     //   doc.setFillColor(232,68, 86) //red
     //   doc.roundedRect(15, starty, 185, 17, 3, 3, 'F');
     //   doc.setTextColor(color_labels)
     //   doc.text(30, starty+13, 'CLAVE DE RESERVACION');

     //   try {
     //     // starty += increment; 
     //     doc.addImage(LOGOAGENCIA, 'JPEG', 385, starty-3, 80, 80,undefined,'FAST');
         
     //     doc.setTextColor(color_valores)  
     //     //doc.roundedRect(310, starty, 250, 70, 3, 3, 'D');
         
     //   } catch (error) {
     //     console.log(error)
     //     // console.log(LOGOAGENCIA)
     //   }
        
     //   starty += increment; 
     //   doc.setTextColor(color_valores) 
     //   doc.text(40, starty+13, CLAVE);
     //   doc.roundedRect(15, starty, 250, 17, 3, 3, 'D');
     //   starty += (increment/4); 
      

     // //INCLUYE
     // starty += increment; 
     // doc.setFillColor(232,68, 86) //red
     // doc.roundedRect(15, starty, 185, 17, 3, 3, 'F');
     // doc.setTextColor(color_labels)
     // doc.text(30, starty+13, 'OBSERVACIONES');
     
     // starty += increment; 
     // doc.setTextColor(color_valores) 
     // let splitObservacion = doc.splitTextToSize(INCLUYE, 400);
     // doc.text(40, starty+18, splitObservacion);
     // doc.roundedRect(15, starty+5, 550, 17, 3, 3, 'D');

     //   //OBSERVACIONES
     // starty += increment; 
     // doc.setFillColor(232,68, 86) //red
     // doc.roundedRect(15, starty, 185, 17, 3, 3, 'F');
     // doc.setTextColor(color_labels)
     // doc.text(30, starty+13, 'INCLUYE');
     
     // starty += increment; 
     // doc.setTextColor(color_valores) 
     // splitObservacion = doc.splitTextToSize(redondo + " -- "+ OBSERVACIONES + " -- " + ABORDA, 400);
     // doc.text(40, starty+13, splitObservacion);

     // doc.roundedRect(15, starty, 550, 72, 3, 3, 'D');


}

function Contrato(doc, PAPELETA, cantidad) {
        try {
        //doc.addImage(charter, 'PNG', 30, 30, 200, 80);
        } catch (error) {
        
        }
        doc.setFontSize(10);
        let starty = 10;
        let margin = 12;
        let margin_left= 30;
        
        doc.text(margin_left, starty+=margin, 'CONTRATO DE PRESTACION DE SERVICIOS DE TRANSPORTE');
        doc.text(margin_left, starty+=margin, 'RECORRIENDO KILOMETROS S.A. DE C.V. RFC: RKI180820PJA');
        doc.text(margin_left, starty+=margin, 'contacto@recorriendokilometros.com.mx');
        doc.text(margin_left, starty+=margin, 'Telefonos: 3316954455 - 3322553662');
          
        //   doc.setFontSize(11);
        //   doc.setDrawColor(0);
        //   //   doc.setFillColor(7, 109, 150); //blue
        //   doc.setFillColor(232,68, 86) //red
        //   doc.roundedRect(470, 30, 100, 44, 3, 3, 'FD'); //Fill D/border
          
        //   doc.setTextColor(255,255,255);
        //   doc.text(500, 43, 'FOLIO');
        //   doc.setTextColor(0,0,0);

        //   doc.setDrawColor(0);
        //   doc.setFillColor(255, 255, 255);
        //   doc.rect(470, 52, 100, 25,'F'); 
          
        //   doc.setTextColor(220, 43, 27);
        //   doc.text(490, 64, PAPELETA);
        

        //   doc.setDrawColor(0);
        //   doc.setFillColor(255, 255, 255);
        //   doc.roundedRect(470, 30, 100, 44, 3, 3); 

        Detalles(doc, starty+=margin, margin_left)
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