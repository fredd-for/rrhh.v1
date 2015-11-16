/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  07-08-2015
 */
/**
 * Función para la exportación de la Planilla de Refrigerios en formato Excel.
 * @param option
 * @param idPlanillaRef
 */
function exportarReportePlanillasRef(option,idPlanillaRef){
    columna = new Object();
    filtros = new Object();
    agrupados = new Object();
    ordenados = new Object();

    gerencia_administrativa = $('#divGridPlanillasRefView').jqxGrid('getcolumn','gerencia_administrativa');
    departamento_administrativo = $('#divGridPlanillasRefView').jqxGrid('getcolumn','departamento_administrativo');
    area = $('#divGridPlanillasRefView').jqxGrid('getcolumn','area');
    ubicacion = $('#divGridPlanillasRefView').jqxGrid('getcolumn','ubicacion');
    fin_partida = $('#divGridPlanillasRefView').jqxGrid('getcolumn','fin_partida');
    proceso_codigo = $('#divGridPlanillasRefView').jqxGrid('getcolumn','proceso_codigo');
    cargo = $('#divGridPlanillasRefView').jqxGrid('getcolumn','cargo');
    estado_descripcion = $('#divGridPlanillasRefView').jqxGrid('getcolumn','estado_descripcion');
    nombres = $('#divGridPlanillasRefView').jqxGrid('getcolumn','nombres');
    ci = $('#divGridPlanillasRefView').jqxGrid('getcolumn','ci');
    expd = $('#divGridPlanillasRefView').jqxGrid('getcolumn','expd');
    nivelsalarial = $('#divGridPlanillasRefView').jqxGrid('getcolumn','nivelsalarial');
    sueldo = $('#divGridPlanillasRefView').jqxGrid('getcolumn','sueldo');
    dias_efectivos = $('#divGridPlanillasRefView').jqxGrid('getcolumn','dias_efectivos');
    monto_diario = $('#divGridPlanillasRefView').jqxGrid('getcolumn','monto_diario');
    lsgh = $('#divGridPlanillasRefView').jqxGrid('getcolumn','lsgh');
    faltas = $('#divGridPlanillasRefView').jqxGrid('getcolumn','faltas');
    vacacion = $('#divGridPlanillasRefView').jqxGrid('getcolumn','vacacion');
    otros = $('#divGridPlanillasRefView').jqxGrid('getcolumn','otros');
    importe = $('#divGridPlanillasRefView').jqxGrid('getcolumn','importe');
    rc_iva = $('#divGridPlanillasRefView').jqxGrid('getcolumn','rc_iva');
    retencion = $('#divGridPlanillasRefView').jqxGrid('getcolumn','retencion');
    fecha_form = $('#divGridPlanillasRefView').jqxGrid('getcolumn','fecha_form');
    form110impref_observacion = $('#divGridPlanillasRefView').jqxGrid('getcolumn','form110impref_observacion');
    total_ganado = $('#divGridPlanillasRefView').jqxGrid('getcolumn','total_ganado');
    total_liquido = $('#divGridPlanillasRefView').jqxGrid('getcolumn','total_liquido');

    columna[gerencia_administrativa.datafield] = {text: gerencia_administrativa.text, hidden: gerencia_administrativa.hidden};
    columna[departamento_administrativo.datafield] = {text: departamento_administrativo.text, hidden: departamento_administrativo.hidden};
    columna[area.datafield] = {text: area.text, hidden: area.hidden};
    columna[ubicacion.datafield] = {text: ubicacion.text, hidden: ubicacion.hidden};
    columna[fin_partida.datafield] = {text: fin_partida.text, hidden: fin_partida.hidden};
    columna[proceso_codigo.datafield] = {text: proceso_codigo.text, hidden: proceso_codigo.hidden};
    columna[cargo.datafield] = {text: cargo.text, hidden: cargo.hidden};
    columna[estado_descripcion.datafield] = {text: estado_descripcion.text, hidden: estado_descripcion.hidden};
    columna[nombres.datafield] = {text: nombres.text, hidden: nombres.hidden};
    columna[ci.datafield] = {text: ci.text, hidden: ci.hidden};
    columna[expd.datafield] = {text: expd.text, hidden: expd.hidden};
    columna[nivelsalarial.datafield] = {text: nivelsalarial.text, hidden: nivelsalarial.hidden};
    columna[sueldo.datafield] = {text: sueldo.text, hidden: sueldo.hidden};
    columna[dias_efectivos.datafield] = {text: dias_efectivos.text, hidden: dias_efectivos.hidden};
    columna[monto_diario.datafield] = {text: monto_diario.text, hidden: monto_diario.hidden};
    columna[lsgh.datafield] = {text: lsgh.text, hidden: lsgh.hidden};
    columna[faltas.datafield] = {text: faltas.text, hidden: faltas.hidden};
    columna[vacacion.datafield] = {text: vacacion.text, hidden: vacacion.hidden};
    columna[otros.datafield] = {text: otros.text, hidden: otros.hidden};
    columna[importe.datafield] = {text: importe.text, hidden: importe.hidden};
    columna[rc_iva.datafield] = {text: rc_iva.text, hidden: rc_iva.hidden};
    columna[retencion.datafield] = {text: retencion.text, hidden: retencion.hidden};
    columna[fecha_form.datafield] = {text: fecha_form.text, hidden: fecha_form.hidden};
    columna[form110impref_observacion.datafield] = {text: form110impref_observacion.text, hidden: form110impref_observacion.hidden};
    columna[total_ganado.datafield] = {text: total_ganado.text, hidden: total_ganado.hidden};
    columna[total_liquido.datafield] = {text: total_liquido.text, hidden: total_liquido.hidden};

    var groups = $('#divGridPlanillasRefView').jqxGrid('groups');
    if(groups==null||groups=='')groups='null';
    //var sorteds = $('#divGridPlanillasRefView').jqxGrid('getsortcolumn');

    var sortinformation = $('#divGridPlanillasRefView').jqxGrid('getsortinformation');
    if(sortinformation.sortcolumn!=undefined){
        // The sortcolumn rep   resents the sort column's datafield. If there's no sort column, the sortcolumn is null.
        var sortcolumn = sortinformation.sortcolumn;
        // The sortdirection is an object with two fields: 'ascending' and 'descending'. Ex: { 'ascending': true, 'descending': false }
        var sortdirection = sortinformation.sortdirection;
        ordenados[sortcolumn] = {asc: sortdirection.ascending, desc: sortdirection.descending};
    }else ordenados='';


    var rows = $('#divGridPlanillasRefView').jqxGrid('getrows');
    var filterGroups = $('#divGridPlanillasRefView').jqxGrid('getfilterinformation');
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

    json_columns= json_columns.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    json_filter= json_filter.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    json_groups= json_groups.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    json_sorteds= json_sorteds.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    var ruta='';
    switch (option){
        case 1: ruta="/planillasref/exportviewexcel";break;
        case 2: ruta="/planillasref/exportviewpdf";break;
    }
    if(ruta!='')
        window.open(ruta+"/"+idPlanillaRef+"/"+n_rows+"/"+json_columns+"/"+json_filter+"/"+json_groups+"/"+json_sorteds ,"_blank");
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