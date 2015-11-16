/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  19-10-2015
 */
$().ready(function(){
    var gestiones = obtenerGestionesPorPersona($("#hdnIdPersona").val());
    if (gestiones.length > 0) {
        $("#lstGestion").html("");
        $.each(gestiones, function (key, gestion) {
            $("#lstGestion").append("<option value='"+gestion+"'>"+gestion+"</option>");
        });
    }
    cargarDescuentosPorPersonaEnGestion($("#lstGestion").val());
    $("#lstGestion").off();
    $("#lstGestion").on("change",function(){
        cargarDescuentosPorPersonaEnGestion($("#lstGestion").val());
    });
});
/**
 * Función para la obtención del listado de gestiones donde la persona, referenciada mediante su identificador enviado como parámetro, haya tenido relación laboral con la empresa.
 * @param idPersona Identificador de la persona de la cual se desea obtener la información.
 * @returns {Array} Array conteniendo el listado de gestiones.
 */
function obtenerGestionesPorPersona(idPersona) {
    var gestiones = [];
    $.ajax({
        url: '/relaborales/listgestionesporpersona',
        type: 'POST',
        datatype: 'json',
        async: false,
        cache: false,
        data: {id: idPersona},
        success: function (data) {
            var res = jQuery.parseJSON(data);
            if (res.length > 0) {
                $.each(res, function (key, val) {
                    gestiones.push(val.gestion);
                });
            }
        }
    });
    return gestiones;
}
/**
 * Función para la obtención del listado de descuentos por persona por gestión.
 * @param gestion
 * @returns {*}
 */
function getDescuentosPorPersona(gestion){
    var result = null;
    $.ajax({
        url: '/index/getdescuentospersonales/',
        type: "POST",
        datatype: 'json',
        data:{gestion:gestion},
        async: false,
        cache: false,
        success: function (data) {  //alert(data);
            var res = jQuery.parseJSON(data);
            result = res;
        },
        error: function () {

        }
    });
    return result;
}

/**
 * Función para cargar los descuentos mensuales en función de la gestión seleccionada.
 * @param gestion
 */
function cargarDescuentosPorPersonaEnGestion(gestion){

    var arrAtrasos = [];
    var arrFaltas = [];
    var arrLsgh = [];
    var arrAbandono = [];
    var arrOmision = [];
    var arrOtros = [];
    for(i=0;i<12;i++){
        arrAtrasos[i]=0;
        arrFaltas[i]=0;
        arrLsgh[i]=0;
        arrAbandono[i]=0;
        arrOmision[i]=0;
        arrOtros[i]=0;
    }
    var data = getDescuentosPorPersona(gestion);
    if(data.length>0){
        $.each( data, function( key, val ) {
            arrAtrasos[val.mes-1]=parseFloat(val.atrasos);
            arrFaltas[val.mes-1]=parseFloat(val.faltas);
            arrLsgh[val.mes-1]=parseFloat(val.lsgh);
            arrAbandono[val.mes-1]=parseFloat(val.abandono);
            arrOmision[val.mes-1]=parseFloat(val.omision);
            arrOtros[val.mes-1]=parseFloat(val.otros);
        });
    }
    $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Descuentos Mensuales'
        },
        subtitle: {
            text: 'Fuente: Planillas Salariales'
        },
        xAxis: {
            categories: [
                'Enero',
                'Febrero',
                'Marzo',
                'Abril',
                'Mayo',
                'Junio',
                'Julio',
                'Agosto',
                'Septiembre',
                'Octubre',
                'Noviembre',
                'Diciembre'
            ]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Descuento (días)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} días</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Atrasos',
            data: arrAtrasos

        }, {
            name: 'Faltas',
            data: arrFaltas

        }, {
            name: 'Lsgh',
            data: arrLsgh

        }, {
            name: 'Abandono',
            data: arrAbandono

        }, {
            name: 'Omisión',
            data: arrOmision

        }]
    });
}