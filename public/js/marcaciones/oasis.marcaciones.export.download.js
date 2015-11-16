/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  30-03-2015
 */
/**
 /**
 * Función para la obtención del reporte correspondiente de descargas efectuadas.
 * @param option
 * @param carnet
 * @param fechaIni
 * @param fechaFin
 */
function exportarReporteDescargaMarcacionesRango(option,carnet,fechaIni,fechaFin){
    if (carnet=='')carnet=0;
    columna = new Object();
    filtros = new Object();
    agrupados = new Object();
    ordenados = new Object();

    nombres = $('#divGridDescargaMarcacionesRango').jqxGrid('getcolumn','nombres');
    ci = $('#divGridDescargaMarcacionesRango').jqxGrid('getcolumn','ci');
    expd = $('#divGridDescargaMarcacionesRango').jqxGrid('getcolumn','expd');

    gestion = $('#divGridDescargaMarcacionesRango').jqxGrid('getcolumn','gestion');
    mes_nombre = $('#divGridDescargaMarcacionesRango').jqxGrid('getcolumn','mes_nombre');

    fecha = $('#divGridDescargaMarcacionesRango').jqxGrid('getcolumn','fecha');
    hora = $('#divGridDescargaMarcacionesRango').jqxGrid('getcolumn','hora');
    maquina = $('#divGridDescargaMarcacionesRango').jqxGrid('getcolumn','maquina');
    usuario = $('#divGridDescargaMarcacionesRango').jqxGrid('getcolumn','usuario');
    fecha_ini_rango = $('#divGridDescargaMarcacionesRango').jqxGrid('getcolumn','fecha_ini_rango');
    fecha_fin_rango = $('#divGridDescargaMarcacionesRango').jqxGrid('getcolumn','fecha_fin_rango');
    observacion = $('#divGridDescargaMarcacionesRango').jqxGrid('getcolumn','observacion');

    columna[nombres.datafield] = {text: nombres.text, hidden: nombres.hidden};
    columna[ci.datafield] = {text: ci.text, hidden: ci.hidden};
    columna[expd.datafield] = {text: expd.text, hidden: expd.hidden};

    columna[gestion.datafield] = {text: gestion.text, hidden: gestion.hidden};
    columna[mes_nombre.datafield] = {text: mes_nombre.text, hidden: mes_nombre.hidden};
    columna[fecha.datafield] = {text: fecha.text, hidden: fecha.hidden};
    columna[hora.datafield] = {text: hora.text, hidden: hora.hidden};
    columna[maquina.datafield] = {text: maquina.text, hidden: maquina.hidden};
    columna[usuario.datafield] = {text: usuario.text, hidden: usuario.hidden};
    columna[fecha_ini_rango.datafield] = {text: fecha_ini_rango.text, hidden: fecha_ini_rango.hidden};
    columna[fecha_fin_rango.datafield] = {text: fecha_fin_rango.text, hidden: fecha_fin_rango.hidden};

    columna[observacion.datafield] = {text: observacion.text, hidden: observacion.hidden};


    var groups = $('#divGridDescargaMarcacionesRango').jqxGrid('groups');
    if(groups==null||groups=='')groups='null';
    //var sorteds = $('#divGridDescargaMarcacionesRango').jqxGrid('getsortcolumn');

    var sortinformation = $('#divGridDescargaMarcacionesRango').jqxGrid('getsortinformation');
    if(sortinformation.sortcolumn!=undefined){
        // The sortcolumn rep   resents the sort column's datafield. If there's no sort column, the sortcolumn is null.
        var sortcolumn = sortinformation.sortcolumn;
        // The sortdirection is an object with two fields: 'ascending' and 'descending'. Ex: { 'ascending': true, 'descending': false }
        var sortdirection = sortinformation.sortdirection;
        ordenados[sortcolumn] = {asc: sortdirection.ascending, desc: sortdirection.descending};
    }else ordenados='';


    var rows = $('#divGridDescargaMarcacionesRango').jqxGrid('getrows');
    var filterGroups = $('#divGridDescargaMarcacionesRango').jqxGrid('getfilterinformation');
    var counter = 0;
    for (var i = 0; i < filterGroups.length; i++) {
        var filterGroup = filterGroups[i];
        var filters = filterGroup.filter.getfilters();
        for (var j = 0; j < filters.length; j++) {
            if (j>0){
                counter++;
            }
            var indice = i+counter;
            filtros[indice] = {columna: filterGroup.filtercolumn, valor: filters[j].value,
                condicion: filters[j].condition, tipo: filters[j].type};
        }
    }
    var n_rows = rows.length;
    var json_filter = JSON.stringify(filtros);
    var json_columns = JSON.stringify(columna);
    var json_sorteds = JSON.stringify(ordenados);
    json_columns = btoa(utf8_encode(json_columns));
    json_filter = btoa(utf8_encode(json_filter));
    json_sorteds = btoa(utf8_encode(json_sorteds));
    var json_groups =  btoa(utf8_encode(groups));

    json_columns = json_columns.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    json_filter = json_filter.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    json_groups = json_groups.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    json_sorteds = json_sorteds.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    var ruta='';
    switch (option){
        case 1: ruta = "/marcaciones/exportdescargasexcel/";break;
        case 2: ruta = "/marcaciones/exportdescargaspdf/";break;
    }

    if(ruta!='')
        window.open(ruta+"/"+carnet+"/"+fechaIni+"/"+fechaFin+"/"+n_rows+"/"+json_columns+"/"+json_filter+"/"+json_groups+"/"+json_sorteds ,"_blank");
}
function utf8_encode(argString) {
    //  discuss at: http://phpjs.org/functions/utf8_encode/
    // original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: sowberry
    // improved by: Jack
    // improved by: Yves Sucaet
    // improved by: kirilloid
    // bugfixed by: Onno Marsman
    // bugfixed by: Onno Marsman
    // bugfixed by: Ulrich
    // bugfixed by: Rafal Kukawski
    // bugfixed by: kirilloid
    //   example 1: utf8_encode('Kevin van Zonneveld');
    //   returns 1: 'Kevin van Zonneveld'

    if (argString === null || typeof argString === 'undefined') {
        return '';
    }

    var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    var utftext = '',
        start, end, stringl = 0;

    start = end = 0;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;

        if (c1 < 128) {
            end++;
        } else if (c1 > 127 && c1 < 2048) {
            enc = String.fromCharCode(
                (c1 >> 6) | 192, (c1 & 63) | 128
            );
        } else if ((c1 & 0xF800) != 0xD800) {
            enc = String.fromCharCode(
                (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
            );
        } else { // surrogate pairs
            if ((c1 & 0xFC00) != 0xD800) {
                throw new RangeError('Unmatched trail surrogate at ' + n);
            }
            var c2 = string.charCodeAt(++n);
            if ((c2 & 0xFC00) != 0xDC00) {
                throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
            }
            c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
            enc = String.fromCharCode(
                (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
            );
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.slice(start, end);
            }
            utftext += enc;
            start = end = n + 1;
        }
    }

    if (end > start) {
        utftext += string.slice(start, stringl);
    }

    return utftext;
};