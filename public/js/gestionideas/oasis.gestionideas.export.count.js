/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  12-11-2015
 */
function exportarReporteCount(option,gest,mes){
    columna = new Object();
    filtros = new Object();
    agrupados = new Object();
    ordenados = new Object();
    ubicacion = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','ubicacion');
    condicion = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','condicion');
    estado_descripcion = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','estado_descripcion');
    nombres = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','nombres');
    ci = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','ci');
    expd = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','expd');
    /*num_complemento = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','num_complemento');*/
    gerencia_administrativa = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','gerencia_administrativa');
    cargo = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','cargo');
    sueldo = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','sueldo');
    departamento_administrativo = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','departamento_administrativo');
    area = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','area');
    fin_partida = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','fin_partida');
    proceso_codigo = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','proceso_codigo');
    nivelsalarial = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','nivelsalarial');
    fecha_ing = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','fecha_ing');
    fecha_ini = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','fecha_ini');
    fecha_incor = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','fecha_incor');
    fecha_fin = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','fecha_fin'),
    fecha_baja = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','fecha_baja');
    motivo_baja = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','motivo_baja');
    observacion = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','observacion');
    gestion = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','gestion');
    mes_nombre = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','mes_nombre');
    publicaciones_descripcion = $('#divGridRelaboralesConteo').jqxGrid('getcolumn','publicaciones_descripcion');

    columna[ubicacion.datafield] = {text: ubicacion.text, hidden: ubicacion.hidden};
    columna[condicion.datafield] = {text: condicion.text, hidden: condicion.hidden};
    columna[estado_descripcion.datafield] = {text: estado_descripcion.text, hidden: estado_descripcion.hidden};
    columna[nombres.datafield] = {text: nombres.text, hidden: nombres.hidden};
    columna[ci.datafield] = {text: ci.text, hidden: ci.hidden};
    columna[expd.datafield] = {text: expd.text, hidden: expd.hidden};
    /*columna[num_complemento.datafield] = {text: num_complemento.text, hidden: num_complemento.hidden};*/
    columna[gerencia_administrativa.datafield] = {text: gerencia_administrativa.text, hidden: gerencia_administrativa.hidden};
    columna[departamento_administrativo.datafield] = {text: departamento_administrativo.text, hidden: departamento_administrativo.hidden};
    columna[area.datafield] = {text: area.text, hidden: area.hidden};
    columna[proceso_codigo.datafield] = {text: proceso_codigo.text, hidden: proceso_codigo.hidden};
    columna[fin_partida.datafield] = {text: fin_partida.text, hidden: fin_partida.hidden};
    columna[cargo.datafield] = {text: cargo.text, hidden: cargo.hidden};
    columna[sueldo.datafield] = {text: sueldo.text, hidden: sueldo.hidden};
    columna[fecha_ing.datafield] = {text: fecha_ing.text, hidden: fecha_ing.hidden};
    columna[fecha_ini.datafield] = {text: fecha_ini.text, hidden: fecha_ini.hidden};
    columna[fecha_incor.datafield] = {text: fecha_incor.text, hidden: fecha_incor.hidden};
    columna[nivelsalarial.datafield] = {text: nivelsalarial.text, hidden: nivelsalarial.hidden};
    columna[fecha_fin.datafield] = {text: fecha_fin.text, hidden: fecha_fin.hidden};
    columna[fecha_baja.datafield] = {text: fecha_baja.text, hidden: fecha_baja.hidden};
    columna[motivo_baja.datafield] = {text: motivo_baja.text, hidden: motivo_baja.hidden};
    columna[observacion.datafield] = {text: observacion.text, hidden: observacion.hidden};
    columna[gestion.datafield] = {text: gestion.text, hidden: gestion.hidden};
    columna[mes_nombre.datafield] = {text: mes_nombre.text, hidden: mes_nombre.hidden};
    columna[publicaciones_descripcion.datafield] = {text: publicaciones_descripcion.text, hidden: publicaciones_descripcion.hidden};

    var groups = $('#divGridRelaboralesConteo').jqxGrid('groups');
    if(groups==null||groups=='')groups='null';
    //var sorteds = $('#divGridRelaboralesConteo').jqxGrid('getsortcolumn');

    var sortinformation = $('#divGridRelaboralesConteo').jqxGrid('getsortinformation');
    if(sortinformation.sortcolumn!=undefined){
        // The sortcolumn rep   resents the sort column's datafield. If there's no sort column, the sortcolumn is null.
        var sortcolumn = sortinformation.sortcolumn;
        // The sortdirection is an object with two fields: 'ascending' and 'descending'. Ex: { 'ascending': true, 'descending': false }
        var sortdirection = sortinformation.sortdirection;
        ordenados[sortcolumn] = {asc: sortdirection.ascending, desc: sortdirection.descending};
    }else ordenados='';


    var rows = $('#divGridRelaboralesConteo').jqxGrid('getrows');
    var filterGroups = $('#divGridRelaboralesConteo').jqxGrid('getfilterinformation');
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
        case 1: ruta="/gestionideas/exportexcel/";break;
        case 2: ruta="/gestionideas/exportpdf/";break;
    }
    if(ruta!='')
        window.open(ruta+n_rows+"/"+gest+"/"+mes+"/"+json_columns+"/"+json_filter+"/"+json_groups+"/"+json_sorteds ,"_blank");
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