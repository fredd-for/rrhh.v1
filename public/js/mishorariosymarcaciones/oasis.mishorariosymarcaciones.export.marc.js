/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  30-03-2015
 */
/**
 * Función para la obtención de los reportes correspondientes a horarios y marcaciones.
 * @param option
 * @param idRelaboral
 */
function exportarReporteHorariosYMarcaciones(option,idRelaboral){
    columna = new Object();
    filtros = new Object();
    agrupados = new Object();
    ordenados = new Object();

    gestion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','gestion');
    mes_nombre = $('#divGridControlMarcaciones').jqxGrid('getcolumn','mes_nombre');
    turno = $('#divGridControlMarcaciones').jqxGrid('getcolumn','turno');
    modalidad_marcacion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','modalidad_marcacion');

    d1 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d1');
    estado1 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado1');
    estado1_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado1_descripcion');

    d2 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d2');
    estado2 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado2');
    estado2_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado2_descripcion');

    d3 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d3');
    estado3 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado3');
    estado3_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado3_descripcion');

    d4 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d4');
    estado4 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado4');
    estado4_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado4_descripcion');

    d5 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d5');
    estado5 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado5');
    estado5_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado5_descripcion');

    d6 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d6');
    estado6 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado6');
    estado6_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado6_descripcion');

    d7 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d7');
    estado7 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado7');
    estado7_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado7_descripcion');

    d8 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d8');
    estado8 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado8');
    estado8_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado8_descripcion');

    d9 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d9');
    estado9 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado9');
    estado9_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado9_descripcion');

    d10 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d10');
    estado10 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado10');
    estado10_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado10_descripcion');

    d11 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d11');
    estado11 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado11');
    estado11_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado11_descripcion');

    d12 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d12');
    estado12 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado12');
    estado12_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado12_descripcion');

    d13 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d13');
    estado13 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado13');
    estado13_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado13_descripcion');

    d14 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d14');
    estado14 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado14');
    estado14_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado14_descripcion');

    d15 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d15');
    estado15 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado15');
    estado15_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado15_descripcion');

    d16 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d16');
    estado16 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado16');
    estado16_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado16_descripcion');

    d17 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d17');
    estado17 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado17');
    estado17_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado17_descripcion');

    d18 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d18');
    estado18 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado18');
    estado18_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado18_descripcion');

    d19 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d19');
    estado19 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado19');
    estado19_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado19_descripcion');

    d20 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d20');
    estado20 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado20');
    estado20_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado20_descripcion');

    d21 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d21');
    estado21 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado21');
    estado21_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado21_descripcion');

    d22 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d22');
    estado22 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado22');
    estado22_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado22_descripcion');

    d23 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d23');
    estado23 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado23');
    estado23_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado23_descripcion');

    d24 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d24');
    estado24 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado24');
    estado24_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado24_descripcion');

    d25 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d25');
    estado25 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado25');
    estado25_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado25_descripcion');

    d26 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d26');
    estado26 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado26');
    estado26_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado26_descripcion');

    d27 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d27');
    estado27 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado27');
    estado27_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado27_descripcion');

    d28 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d28');
    estado28 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado28');
    estado28_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado28_descripcion');

    d29 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d29');
    estado29 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado29');
    estado29_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado29_descripcion');

    d30 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d30');
    estado30 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado30');
    estado30_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado30_descripcion');

    d31 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','d31');
    estado31 = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado31');
    estado31_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado31_descripcion');

    ultimo_dia = $('#divGridControlMarcaciones').jqxGrid('getcolumn','ultimo_dia');
    atrasos = $('#divGridControlMarcaciones').jqxGrid('getcolumn','atrasos');
    faltas = $('#divGridControlMarcaciones').jqxGrid('getcolumn','faltas');
    abandono = $('#divGridControlMarcaciones').jqxGrid('getcolumn','abandono');
    omision = $('#divGridControlMarcaciones').jqxGrid('getcolumn','omision');
    lsgh = $('#divGridControlMarcaciones').jqxGrid('getcolumn','lsgh');
    agrupador = $('#divGridControlMarcaciones').jqxGrid('getcolumn','agrupador');
    compensacion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','compensacion');
    observacion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','observacion');
    estado = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado');
    estado_descripcion = $('#divGridControlMarcaciones').jqxGrid('getcolumn','estado_descripcion');


    columna[gestion.datafield] = {text: gestion.text, hidden: gestion.hidden};
    columna[mes_nombre.datafield] = {text: mes_nombre.text, hidden: mes_nombre.hidden};
    columna[turno.datafield] = {text: turno.text, hidden: turno.hidden};
    columna[modalidad_marcacion.datafield] = {text: modalidad_marcacion.text, hidden: modalidad_marcacion.hidden};
    columna[estado_descripcion.datafield] = {text: modalidad_marcacion.text, hidden: estado_descripcion.hidden};

    columna[d1.datafield] = {text: d1.text, hidden: d1.hidden};
    columna[d2.datafield] = {text: d2.text, hidden: d2.hidden};
    columna[d3.datafield] = {text: d3.text, hidden: d3.hidden};
    columna[d4.datafield] = {text: d4.text, hidden: d4.hidden};
    columna[d5.datafield] = {text: d5.text, hidden: d5.hidden};
    columna[d6.datafield] = {text: d6.text, hidden: d6.hidden};
    columna[d7.datafield] = {text: d7.text, hidden: d7.hidden};
    columna[d8.datafield] = {text: d8.text, hidden: d8.hidden};
    columna[d9.datafield] = {text: d9.text, hidden: d9.hidden};
    columna[d10.datafield] = {text: d10.text, hidden: d10.hidden};
    columna[d11.datafield] = {text: d11.text, hidden: d11.hidden};
    columna[d12.datafield] = {text: d12.text, hidden: d12.hidden};
    columna[d13.datafield] = {text: d13.text, hidden: d13.hidden};
    columna[d14.datafield] = {text: d14.text, hidden: d14.hidden};
    columna[d15.datafield] = {text: d15.text, hidden: d15.hidden};
    columna[d16.datafield] = {text: d16.text, hidden: d16.hidden};
    columna[d17.datafield] = {text: d17.text, hidden: d17.hidden};
    columna[d18.datafield] = {text: d18.text, hidden: d18.hidden};
    columna[d19.datafield] = {text: d19.text, hidden: d19.hidden};
    columna[d20.datafield] = {text: d20.text, hidden: d20.hidden};
    columna[d21.datafield] = {text: d21.text, hidden: d21.hidden};
    columna[d22.datafield] = {text: d22.text, hidden: d22.hidden};
    columna[d23.datafield] = {text: d23.text, hidden: d23.hidden};
    columna[d24.datafield] = {text: d24.text, hidden: d24.hidden};
    columna[d25.datafield] = {text: d25.text, hidden: d25.hidden};
    columna[d26.datafield] = {text: d26.text, hidden: d26.hidden};
    columna[d27.datafield] = {text: d27.text, hidden: d27.hidden};
    columna[d28.datafield] = {text: d28.text, hidden: d28.hidden};
    columna[d29.datafield] = {text: d29.text, hidden: d29.hidden};
    columna[d30.datafield] = {text: d30.text, hidden: d30.hidden};
    columna[d31.datafield] = {text: d31.text, hidden: d31.hidden};

    columna[ultimo_dia.datafield] = {text: ultimo_dia.text, hidden: ultimo_dia.hidden};
    columna[atrasos.datafield] = {text: atrasos.text, hidden: atrasos.hidden};
    columna[faltas.datafield] = {text: faltas.text, hidden: faltas.hidden};
    columna[abandono.datafield] = {text: abandono.text, hidden: abandono.hidden};
    columna[omision.datafield] = {text: omision.text, hidden: omision.hidden};
    columna[lsgh.datafield] = {text: lsgh.text, hidden: lsgh.hidden};
    columna[observacion.datafield] = {text: observacion.text, hidden: observacion.hidden};


    var groups = $('#divGridControlMarcaciones').jqxGrid('groups');
    if(groups==null||groups=='')groups='null';
    //var sorteds = $('#divGridControlMarcaciones').jqxGrid('getsortcolumn');

    var sortinformation = $('#divGridControlMarcaciones').jqxGrid('getsortinformation');
    if(sortinformation.sortcolumn!=undefined){
        // The sortcolumn rep   resents the sort column's datafield. If there's no sort column, the sortcolumn is null.
        var sortcolumn = sortinformation.sortcolumn;
        // The sortdirection is an object with two fields: 'ascending' and 'descending'. Ex: { 'ascending': true, 'descending': false }
        var sortdirection = sortinformation.sortdirection;
        ordenados[sortcolumn] = {asc: sortdirection.ascending, desc: sortdirection.descending};
    }else ordenados='';


    var rows = $('#divGridControlMarcaciones').jqxGrid('getrows');
    var filterGroups = $('#divGridControlMarcaciones').jqxGrid('getfilterinformation');
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
        case 1: ruta = "/horariosymarcaciones/exportmarcacionesexcel/";break;
        case 2: ruta = "/horariosymarcaciones/exportmarcacionespdf/";break;
    }

    if(ruta!='')
        window.open(ruta+idRelaboral+"/"+n_rows+"/"+json_columns+"/"+json_filter+"/"+json_groups+"/"+json_sorteds ,"_blank");
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