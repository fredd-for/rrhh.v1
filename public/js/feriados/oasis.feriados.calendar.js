/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  24-02-2015
 */
/**
 * Función para iniciar el calendario con los feriados registrados.
 * @param defaultGestion
 * @param defaultMes
 * @param defaultDia
 * @returns {Array}
 */
function iniciarCalendarioLaboralConFeriados(arrFeriados,defaultGestion,defaultMes,defaultDia) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    var idPerfilLaboral = 1;
    var arrHorariosRegistrados = [];
    var tipoHorario=3;
    tipoHorario = parseInt(tipoHorario);
    var accion = 5;
    var arrFechasPorSemana = [];
    var contadorPorSemana = 0;
    var diasSemana=7;
    var calendarEvents  = $('.calendar-events');
    /* Inicializa la funcionalidad de eventos: arrastrar y soltar */
    //initEvents();

    /* Initialize FullCalendar */
    var optLeft = 'prev,next';
    //var optRight = 'year,month,agendaWeek,agendaDay';
    var optRight = 'year';
    var optEditable = true;
    var optDroppable = true;
    var optSelectable = true;
    var optVerFinesDeSemana= true;
    var optVerTotalizadorHorasPorSemana=true;
    //weekends
    switch (accion){
        case 1:/*Nuevo*/
            switch (tipoHorario){
                case 1:
                case 2:break;
                case 3:optLeft='';optRight='year';break;
            }
            break;
        case 2:/*Edición*/
            switch (tipoHorario){
                case 1:
                case 2:break;
                case 3:optLeft='';optRight='year';break;
            }
            break;
        case 3:/*Aprobación*/
            switch (tipoHorario){
                case 1:
                case 2:break;
                case 3:optLeft='';optRight='year';break;
            }
            break;
        case 4:/*Eliminación*/break;
        case 5:/*Vista*/
            optEditable=false;
            optDroppable=false;
            optSelectable=false;
            switch (tipoHorario){
                case 1:
                case 2:break;
                case 3:break;
            }
            break;
    }
    switch (tipoHorario){
        case 1:
        case 2:optVerFinesDeSemana=false;diasSemana=5;optVerTotalizadorHorasPorSemana=false;break;
        case 3:break;
    }
    $('#calendar').fullCalendar({
        header: {
            left: optLeft,
            center: 'title',
            right: optRight
        },
        year:defaultGestion,
        month:defaultMes,
        date:defaultDia,
        firstDay: 1,
        weekends:optVerFinesDeSemana,
        editable: optEditable,
        droppable: optDroppable,
        selectable: optSelectable,
        weekNumbers:true,
        weekNumberTitle:"#Semana",
        timeFormat: 'H(:mm)', // Mayusculas H de 24-horas
        events: arrHorariosRegistrados,
        viewRender: function(view) {
            renderAnnotations(view,"sdnfdsjanfkjsan");
            switch (view.name){
                case "month":
                {
                    arrFechasPorSemana= [];
                    var contP=0;
                    var arrDias = ["mon","tue","wed","thu","fri","sat","sun"];
                    var fechaIniCal = "";
                    var fechaFinCal = "";
                    var gestionInicial = 0;
                    $.each(arrDias,function(k,dia){
                    contP=0;
                    $("td.fc-"+dia).map(function (index, elem) {
                        contP++;
                        var fecha = $(this).data("date");
                        var fechaAux = $(this).data("date");
                        if(fecha!=undefined){
                            var arrFecha = fecha.split("-");
                            fecha = arrFecha[2]+"-"+arrFecha[1]+"-"+arrFecha[0];
                            gestionInicial = arrFecha[0];
                            switch (contP){
                                case 1:
                                    if(fechaIniCal=="")fechaIniCal = fecha;
                                    arrFechasPorSemana.push( {semana:1,fecha:fecha});
                                    break;
                                case 2:arrFechasPorSemana.push( {semana:2,fecha:fecha});break;
                                case 3:arrFechasPorSemana.push( {semana:3,fecha:fecha});break;
                                case 4:arrFechasPorSemana.push( {semana:4,fecha:fecha});break;
                                case 5:arrFechasPorSemana.push( {semana:5,fecha:fecha});break;
                                case 6:
                                    fechaFinCal = fecha;
                                    arrFechasPorSemana.push( {semana:6,fecha:fecha});
                                    break;
                            }
                            var check = fechaAux;
                            var today = $.fullCalendar.formatDate(new Date(),'yyyy-MM-dd');
                            if (check < today) {
                                $(this).css("background-color", "silver");
                            }
                        }
                    });
                });
                    var arrFeriados = obtenerFeriadosRangoFechas(0,0,gestionInicial,fechaIniCal,fechaFinCal);
                    $.each(arrDias,function(k,dia){
                        contP=0;
                        $("td.fc-"+dia).map(function (index, elem) {
                            contP++;
                            var fechaCal = $(this).data("date");
                            var fechaIni = "";
                            var fechaFin = "";
                            var celda = $(this);
                            $.each(arrFeriados,function(key,val){

                                fechaIni  = val.fecha_ini;
                                fechaFin  = val.fecha_fin;

                                var sep="-";
                                if (procesaTextoAFecha(fechaCal,sep)<=procesaTextoAFecha(fechaFin,sep) && procesaTextoAFecha(fechaCal,sep) >= procesaTextoAFecha(fechaIni,sep)) {
                                    celda.css("background-color", "orange");
                                    var elem = $(".fc-day-content");
                                    celda.append(val.feriado);
                                    celda.append("</br>");
                                    celda.append(val.descripcion);
                                }
                            });
                        });
                    });
                }
                    break;
                case "agendaWeek":
                    break;
                case "agendaDay":
                    break;
            }
        }
    });
    return arrFechasPorSemana;
}
/**
 * Función para la obtención de la fecha enviada como parámetro en formato dd-mm-yyyy
 * @param fecha
 * @returns {string}
 */
function fechaConvertirAFormato(fecha,separador){
    if(separador=='')separador='-';
    var formattedDate = fecha;
    var d = formattedDate.getDate();
    var m =  formattedDate.getMonth();
    m += 1;  // Los meses en JavaScript son 0-11
    var y = formattedDate.getFullYear();
    var ceroDia="";
    var ceroMes="";
    if(d<10)ceroDia="0";
    if(m<10)ceroMes="0";
    var fechaResultado = ceroDia+d+separador+ceroMes+m+separador+y;
    return fechaResultado;
}
/**
 * Función para la obtención de los feriados de acuerdo a un rango de fechas.
 * @param dia
 * @param mes
 * @param gestion
 * @param fechaIni
 * @param fechaFin
 * @returns {Array}
 */
function obtenerFeriadosRangoFechas(dia,mes,gestion,fechaIni,fechaFin){
    var arrFeriados = [];
    var prefijo = "r_";
    if(gestion>0&&fechaIni!=""&&fechaFin!=""){
        $.ajax({
            url: '/feriados/listrange',
            type: 'POST',
            datatype: 'json',
            async: false,
            cache: false,
            data: {dia:dia,mes:mes,gestion:gestion,fecha_ini:fechaIni,fecha_fin:fechaFin},
            success: function (data) {
                var res = jQuery.parseJSON(data);
                if (res.length > 0) {
                    $.each(res, function (key, val) {
                        arrFeriados.push( {
                            id:val.id,
                            feriado:val.feriado,
                            descripcion:val.descripcion,
                            cantidad_dias:val.cantidad_dias,
                            repetitivo:val.repetitivo,
                            dia:val.dia,
                            mes:val.mes,
                            gestion:val.gestion,
                            fecha_ini:val.fecha_ini,
                            fecha_fin:val.fecha_fin,
                            observacion:val.observacion
                        });
                    });
                }
            }
        });

    }
    return arrFeriados;
}




/**
 * Función para la carga de los datos correspondientes al horario en el modal respectivo.
 * @param idHorario
 */
function cargarModalHorario(idHorario){
    if(idHorario>0){
        $.ajax({
            url: '/horarioslaborales/getone',
            type: 'POST',
            datatype: 'json',
            async: false,
            cache: false,
            data: {id: idHorario},
            success: function (data) {
                var res = jQuery.parseJSON(data);
                if (res.length > 0) {
                    $.each(res, function (key, val) {
                        $("#txtNombreHorario").val(val.nombre);
                        $("#txtNombreAlternativoHorario").val(val.nombre_alternativo);
                        $("#txtColorHorario").val(val.color);
                        $("#txtColorHorario").css({'background-color':val.color,'color':val.color});
                        $("#txtHoraEntHorario").val(val.hora_entrada);
                        $("#txtHoraSalHorario").val(val.hora_salida);
                        $("#txtHoraInicioRangoEnt").val(val.hora_inicio_rango_ent);
                        $("#txtHoraFinalizacionRangoEnt").val(val.hora_final_rango_ent);
                        $("#txtHoraInicioRangoSal").val(val.hora_inicio_rango_sal);
                        $("#txtHoraFinalizacionRangoSal").val(val.hora_final_rango_sal);
                        $("#txtObservacion").val(val.observacion);
                        var hEnt = val.hora_entrada;
                        var hSal = val.hora_salida;
                        if(hEnt=="")hEnt = "00:00:00";
                        if(hSal=="")hSal = "00:00:00";
                        $("#txtHorasLaborales").val(val.horas_laborales);
                    });
                }
            }
        });
        return true;
    }else return false;
}
/**
 * Función para la obtención del registro correspondiente a un horario en específico.
 * @param idHorario
 * @returns {Array}
 */
function obtenerDatosHorario(idHorario){
    var arrHorario = [];
    var prefijo = "r_";
    if(idHorario>0){
        $.ajax({
            url: '/horarioslaborales/getone',
            type: 'POST',
            datatype: 'json',
            async: false,
            cache: false,
            data: {id: idHorario},
            success: function (data) {
                var res = jQuery.parseJSON(data);
                if (res.length > 0) {
                    $.each(res, function (key, val) {
                        arrHorario.push( {
                            nombre:val.nombre,
                            nombre_alternativo:val.nombre_alternativo,
                            color:val.color,
                            hora_entrada:val.hora_entrada,
                            hora_salida:val.hora_salida,
                            hora_inicio_rango_ent:val.hora_inicio_rango_ent,
                            hora_final_rango_ent:val.hora_final_rango_ent,
                            hora_inicio_rango_sal:val.hora_inicio_rango_sal,
                            observacion:val.observacion,
                            horas_laborales:val.horas_laborales,
                            dias_laborales:val.dias_laborales
                        });
                    });
                }
            }
        });

    }
    return arrHorario;
}
/**
 *  Función para agregar la columna de totales al calendario.
 * @param diasSemana
 */
function agregarColumnaSumaTotales(diasSemana){
    $(".fc-border-separate tr:first").append("<th style='width: 87px;' id='thColumnaTotales' class='thColumnaTotales'> Hrs Semana </th>");
    var sufijo = 0;
    $(".fc-border-separate tr.fc-week").each(function(key,val){
        sufijo++;
        $(this).append("<td id='tdSumaSemana"+sufijo+"' class='tdSumaSemana fc-last'><div style='min-height: 67px;align-content: center;'><div id='divSumaSemana"+sufijo+"' class='fc-day-suma-horas-semana'><span id='spSumaSemana"+sufijo+"' class='spSumaSemana'>100</span></div></div></td>");
    });
    var diasSemanaMasContadorSemanas = diasSemana+1;
    $(".fc-border-separate tr:last").after("<tr id=''><td style='text-align: right;' colspan='"+diasSemanaMasContadorSemanas+"' class=''><b>Promedio semanal de horas (3 Semanas marcadas):</b></td><td id='tdSumaPromedioTresSemanas' class='tdSumaPromedioTresSemanas fc-first fc-day fc-last'><div style='min-height: 67px;align-content: center;'><div id='divSumaPromedioTresSemanas' class='fc-suma-promedio-horas-3-semanas'><span id='spSumaPromedioTresSemanas'>0</span></div></div></td></tr>");
}
/**
 * Funcion para remover la columna de suma de totales al calendario.
 */
function removerColumnaSumaTotales(){
    $("#thColumnaTotales").remove();
    $("#tdSumaSemana1").remove();
    $("#tdSumaSemana2").remove();
    $("#tdSumaSemana3").remove();
    $("#tdSumaSemana4").remove();
    $("#tdSumaSemana5").remove();
    $("#tdSumaSemana6").remove();
    $("#trSumaPromedioTresSemanas").remove();
}
/**
 * Función para calcular el número de horas que representa la hora.
 * @param hora
 * @returns {*}
 */
function numeroHoras(hora){
    if(hora!=""){
        var arrHora = hora.split(":");
        var hEnt = parseFloat(arrHora[0]);
        var mEnt = parseFloat(arrHora[1]);
        var sEnt = parseFloat(arrHora[2]);
        var sEnMin = 0;
        var mEnHor = 0;
        if(sEnt>0){
            sEnMin = sEnt/60;
        }
        mEnt = mEnt + sEnMin;
        if(mEnt>0){
            mEnHor = mEnt/60;
        }
        hEnt = hEnt +mEnHor;
        return hEnt;
    }
    else return 0;
}
/**
 * Función para la obtención del listado de ubicaciones principales que se hubieran asignado a un determinado perfil.
 * @param idPerfilLaboral
 */
function cargarUbicacionesPrincipalesRegistradasParaPerfil(idPerfilLaboral){
    $("#lstUbicacionesPrincipales").html("");
    $("#lstUbicacionesPrincipales").append("<option value='0' data-cant-nodos-hijos='-1'>Seleccionar...</option>");
    $("#lstUbicacionesPrincipales").prop("disabled","disabled");
    var selected = "";
    if(idPerfilLaboral>0){
        $.ajax({
            url: '/ubicaciones/listubicacionespricipalesporperfil/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {id_perfillaboral:idPerfilLaboral},
            success: function (data) {
                var res = jQuery.parseJSON(data);
                //if(res.length==1)selected="selected";
                if (res.length > 0) {
                    $("#lstUbicacionesPrincipales").prop("disabled",false);
                    $("#divUbicacionesPrincipales").show();
                    $.each(res, function (key, val) {
                        $("#lstUbicacionesPrincipales").append("<option value='"+val.id_ubicacion+"' "+selected+" data-cant-nodos-hijos='"+val.cant_nodos_hijos+"'>"+val.ubicacion+"</option>");
                    });
                }else {
                    $("#lstUbicacionesPrincipales").prop("disabled","disabled");
                    $("#divUbicacionesPrincipales").hide();
                    $("#divEstacionesAsignadas").hide();
                }
            }
        });
    }
}
/**
 * Función para la obtención del listado de estaciones registradas para un perfil y ubicación principal determinada.
 * @param idPerfilLaboral
 * @param idUbicacion
 */
function cargarEstacionesRegistradasPorUbicacionParaPerfil(idPerfilLaboral,idUbicacion){
    $("#lstEstacionesAsignadas").html("");
    $("#lstEstacionesAsignadas").append("<option value='0'>Seleccionar...</option>");
    $("#lstEstacionesAsignadas").prop("disabled",true);
    var sw = 0;
    if(idPerfilLaboral>0&&idUbicacion>0){
        $.ajax({
            url: '/ubicaciones/listestacionesporubicacionparaperfil/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {id_perfillaboral:idPerfilLaboral,id_ubicacion:idUbicacion},
            success: function (data) {
                var res = jQuery.parseJSON(data);
                $("#divEstacionesAsignadas").show();
                if (res.length > 0) {
                    $("#lstEstacionesAsignadas").prop("disabled",false);
                    $.each(res, function (key, val) {
                        if(val.id_estacion>0){
                            sw = 1;
                            $("#lstEstacionesAsignadas").append("<option value='"+val.id_estacion+"'>"+val.estacion+"</option>");
                        }
                    });
                    if(sw==0){
                        $("#divEstacionesAsignadas").hide();
                    }
                }
            }
        });
    }
}
/**
 * Función para obtener la fecha del último día de un determinado mes en una determinada gestión.
 * @param fecha
 * @returns {Array}
 */
function obtenerUltimoDiaMes(fecha){
    var fecha = $.ajax({
        url: '/perfileslaborales/getultimafechames/',
        type: "POST",
        datatype: 'json',
        async: false,
        cache: false,
        data: {fecha: fecha},
        success: function (data) {
        }
    }).responseText;
    return fecha;
}
/**
 * Función para obtener una fecha en consideración a la adición de una cantidad concreta de días a la fecha enviada como parámetro.
 * @param fecha
 * @returns {Array}
 */
function obtenerFechaMasDias(fecha,dias){
    var fecha = $.ajax({
        url: '/perfileslaborales/getfechamasdias/',
        type: "POST",
        datatype: 'json',
        async: false,
        cache: false,
        data: {fecha: fecha,dias:dias},
        success: function (data) {
        }
    }).responseText;
    return fecha;
}
/**
 * Función para convertir un texto con el formato dd-MM-yyyy al formato MM/dd/yyyy
 * @param date Cadena con la fecha
 * @param sep Separador
 * @returns {number}
 */
function procesaTextoAFecha(date, sep) {
    var parts = date.split(sep);
    var date = new Date(parts[1] + "/" + parts[0] + "/" + parts[2]);
    return date.getTime();
}
function renderAnnotations(view,annotations) {
    var container = $(view.element).find('.fc-agenda-slots').parent();
    if ( container.find('#annotationSegmentContainer').length === 0 ) {
        annotationSegmentContainer = $("<div style='position:absolute;z-index:-1;top:0;left:0' id='annotationSegmentContainer'>").prependTo( container );
    }
    else {
        annotationSegmentContainer = container.find('#annotationSegmentContainer');
    }

    var html = '';
    for (var i=0; i < annotations.length; i++) {
        var ann = annotations[i];
        if (ann.start >= view.start && ann.end <= view.end) {
            var top = view.timePosition(ann.start, ann.start);
            var bottom = view.timePosition(ann.end, ann.end);
            var height = bottom - top;
            var dayIndex = $.fullCalendar.dayDiff(ann.start, view.visStart);

            var left = view.colContentLeft(dayIndex) - 2;
            var right = view.colContentRight(dayIndex) + 3;
            var width = right - left;

            var cls = '';
            if (ann.cls) {
                cls = ' ' + ann.cls;
            }

            var colors = '';
            if (ann.color) {
                colors = 'color:' + ann.color + ';';
            }
            if (ann.background) {
                colors += 'background:' + ann.background + ';';
            }

            var body = ann.title || '';

            html += '<div style="position: absolute; ' +
            'top: ' + top + 'px; ' +
            'left: ' + left + 'px; ' +
            'width: ' + width + 'px; ' +
            'height: ' + height + 'px;' + colors + '" ' +
            'class="fc-annotation fc-annotation-skin' + cls + '">' +
            body +
            '</div>';
        }
    }
    annotationSegmentContainer.html(html);
}