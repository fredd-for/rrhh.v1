/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  10-12-2014
 */
function exportarReporteExcepcionesCount(option,gestion,mes){
    columna = new Object();
    filtros = new Object();
    agrupados = new Object();
    ordenados = new Object();
    ubicacion = $('#divControlExcepcionCount').jqxGrid('getcolumn','ubicacion');
    condicion = $('#divControlExcepcionCount').jqxGrid('getcolumn','condicion');
    estado_descripcion = $('#divControlExcepcionCount').jqxGrid('getcolumn','estado_descripcion');
    nombres = $('#divControlExcepcionCount').jqxGrid('getcolumn','nombres');
    ci = $('#divControlExcepcionCount').jqxGrid('getcolumn','ci');
    expd = $('#divControlExcepcionCount').jqxGrid('getcolumn','expd');
    /*num_complemento = $('#divControlExcepcionCount').jqxGrid('getcolumn','num_complemento');*/
    gerencia_administrativa = $('#divControlExcepcionCount').jqxGrid('getcolumn','gerencia_administrativa');
    cargo = $('#divControlExcepcionCount').jqxGrid('getcolumn','cargo');
    sueldo = $('#divControlExcepcionCount').jqxGrid('getcolumn','sueldo');
    departamento_administrativo = $('#divControlExcepcionCount').jqxGrid('getcolumn','departamento_administrativo');
    area = $('#divControlExcepcionCount').jqxGrid('getcolumn','area');
    fin_partida = $('#divControlExcepcionCount').jqxGrid('getcolumn','fin_partida');
    proceso_codigo = $('#divControlExcepcionCount').jqxGrid('getcolumn','proceso_codigo');
    nivelsalarial = $('#divControlExcepcionCount').jqxGrid('getcolumn','nivelsalarial');
    fecha_ing = $('#divControlExcepcionCount').jqxGrid('getcolumn','fecha_ing');
    fecha_ini = $('#divControlExcepcionCount').jqxGrid('getcolumn','fecha_ini');
    fecha_incor = $('#divControlExcepcionCount').jqxGrid('getcolumn','fecha_incor');
    fecha_fin = $('#divControlExcepcionCount').jqxGrid('getcolumn','fecha_fin'),
    fecha_baja = $('#divControlExcepcionCount').jqxGrid('getcolumn','fecha_baja');
    motivo_baja = $('#divControlExcepcionCount').jqxGrid('getcolumn','motivo_baja');
    observacion = $('#divControlExcepcionCount').jqxGrid('getcolumn','observacion');
    controlexcepcion_estado_descripcion = $('#divControlExcepcionCount').jqxGrid('getcolumn','controlexcepcion_estado_descripcion');
    tipo_excepcion = $('#divControlExcepcionCount').jqxGrid('getcolumn','tipo_excepcion');
    excepcion = $('#divControlExcepcionCount').jqxGrid('getcolumn','excepcion');
    codigo = $('#divControlExcepcionCount').jqxGrid('getcolumn','codigo');
    color = $('#divControlExcepcionCount').jqxGrid('getcolumn','color');
    controlexcepcion_fecha_ini = $('#divControlExcepcionCount').jqxGrid('getcolumn','controlexcepcion_fecha_ini');
    controlexcepcion_hora_ini = $('#divControlExcepcionCount').jqxGrid('getcolumn','controlexcepcion_hora_ini');
    controlexcepcion_fecha_fin = $('#divControlExcepcionCount').jqxGrid('getcolumn','controlexcepcion_fecha_fin');
    controlexcepcion_hora_fin = $('#divControlExcepcionCount').jqxGrid('getcolumn','controlexcepcion_hora_fin');
    excepcion_genero = $('#divControlExcepcionCount').jqxGrid('getcolumn','excepcion_genero');
    frecuencia_descripcion = $('#divControlExcepcionCount').jqxGrid('getcolumn','frecuencia_descripcion');
    compensatoria_descripcion = $('#divControlExcepcionCount').jqxGrid('getcolumn','compensatoria_descripcion');
    horario_descripcion = $('#divControlExcepcionCount').jqxGrid('getcolumn','horario_descripcion');
    refrigerio_descripcion = $('#divControlExcepcionCount').jqxGrid('getcolumn','refrigerio_descripcion');
    turno_descripcion = $('#divControlExcepcionCount').jqxGrid('getcolumn','turno_descripcion');
    entrada_salida_descripcion = $('#divControlExcepcionCount').jqxGrid('getcolumn','entrada_salida_descripcion');
    controlexcepcion_user_registrador = $('#divControlExcepcionCount').jqxGrid('getcolumn','controlexcepcion_user_registrador');
    controlexcepcion_fecha_reg = $('#divControlExcepcionCount').jqxGrid('getcolumn','controlexcepcion_fecha_reg');
    controlexcepcion_user_verificador = $('#divControlExcepcionCount').jqxGrid('getcolumn','controlexcepcion_user_verificador');
    controlexcepcion_fecha_ver = $('#divControlExcepcionCount').jqxGrid('getcolumn','controlexcepcion_fecha_ver');
    controlexcepcion_user_aprobador = $('#divControlExcepcionCount').jqxGrid('getcolumn','controlexcepcion_user_aprobador');
    controlexcepcion_fecha_apr = $('#divControlExcepcionCount').jqxGrid('getcolumn','controlexcepcion_fecha_apr');
    controlexcepcion_observacion = $('#divControlExcepcionCount').jqxGrid('getcolumn','controlexcepcion_observacion');

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
    columna[controlexcepcion_estado_descripcion.datafield] = {text: controlexcepcion_estado_descripcion.text, hidden: controlexcepcion_estado_descripcion.hidden};
    columna[tipo_excepcion.datafield] = {text: tipo_excepcion.text, hidden: tipo_excepcion.hidden};
    columna[excepcion.datafield] = {text: excepcion.text, hidden: excepcion.hidden};
    columna[codigo.datafield] = {text: codigo.text, hidden: codigo.hidden};
    columna[color.datafield] = {text: color.text, hidden: color.hidden};
    columna[controlexcepcion_fecha_ini.datafield] = {text: controlexcepcion_fecha_ini.text, hidden: controlexcepcion_fecha_ini.hidden};
    columna[controlexcepcion_hora_ini.datafield] = {text: controlexcepcion_hora_ini.text, hidden: controlexcepcion_hora_ini.hidden};
    columna[controlexcepcion_fecha_fin.datafield] = {text: controlexcepcion_fecha_fin.text, hidden: controlexcepcion_fecha_fin.hidden};
    columna[controlexcepcion_hora_fin.datafield] = {text: controlexcepcion_hora_fin.text, hidden: controlexcepcion_hora_fin.hidden};
    columna[excepcion_genero.datafield] = {text: excepcion_genero.text, hidden: excepcion_genero.hidden};
    columna[frecuencia_descripcion.datafield] = {text: frecuencia_descripcion.text, hidden: frecuencia_descripcion.hidden};
    columna[compensatoria_descripcion.datafield] = {text: compensatoria_descripcion.text, hidden: compensatoria_descripcion.hidden};
    columna[horario_descripcion.datafield] = {text: horario_descripcion.text, hidden: horario_descripcion.hidden};
    columna[refrigerio_descripcion.datafield] = {text: refrigerio_descripcion.text, hidden: refrigerio_descripcion.hidden};
    columna[turno_descripcion.datafield] = {text: turno_descripcion.text, hidden: turno_descripcion.hidden};
    columna[entrada_salida_descripcion.datafield] = {text: entrada_salida_descripcion.text, hidden: entrada_salida_descripcion.hidden};
    columna[controlexcepcion_user_registrador.datafield] = {text: controlexcepcion_user_registrador.text, hidden: controlexcepcion_user_registrador.hidden};
    columna[controlexcepcion_fecha_reg.datafield] = {text: controlexcepcion_fecha_reg.text, hidden: controlexcepcion_fecha_reg.hidden};
    columna[controlexcepcion_user_verificador.datafield] = {text: controlexcepcion_user_verificador.text, hidden: controlexcepcion_user_verificador.hidden};
    columna[controlexcepcion_fecha_ver.datafield] = {text: controlexcepcion_fecha_ver.text, hidden: controlexcepcion_fecha_ver.hidden};
    columna[controlexcepcion_user_aprobador.datafield] = {text: controlexcepcion_user_aprobador.text, hidden: controlexcepcion_user_aprobador.hidden};
    columna[controlexcepcion_fecha_apr.datafield] = {text: controlexcepcion_fecha_apr.text, hidden: controlexcepcion_fecha_apr.hidden};
    columna[controlexcepcion_observacion.datafield] = {text: controlexcepcion_observacion.text, hidden: controlexcepcion_observacion.hidden};

    var groups = $('#divControlExcepcionCount').jqxGrid('groups');
    if(groups==null||groups=='')groups='null';
    //var sorteds = $('#divControlExcepcionCount').jqxGrid('getsortcolumn');

    var sortinformation = $('#divControlExcepcionCount').jqxGrid('getsortinformation');
    if(sortinformation.sortcolumn!=undefined){
        // The sortcolumn rep   resents the sort column's datafield. If there's no sort column, the sortcolumn is null.
        var sortcolumn = sortinformation.sortcolumn;
        // The sortdirection is an object with two fields: 'ascending' and 'descending'. Ex: { 'ascending': true, 'descending': false }
        var sortdirection = sortinformation.sortdirection;
        ordenados[sortcolumn] = {asc: sortdirection.ascending, desc: sortdirection.descending};
    }else ordenados='';


    var rows = $('#divControlExcepcionCount').jqxGrid('getrows');
    var filterGroups = $('#divControlExcepcionCount').jqxGrid('getfilterinformation');
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
        case 1: ruta="/controlexcepciones/exportexcelcount/";break;
        case 2: ruta="/controlexcepciones/exportpdfcount/";break;
    }
    if(ruta!='')
        window.open(ruta+n_rows+"/"+gestion+"/"+mes+"/"+json_columns+"/"+json_filter+"/"+json_groups+"/"+json_sorteds ,"_blank");
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