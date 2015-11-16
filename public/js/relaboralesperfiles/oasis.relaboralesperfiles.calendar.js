/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  06-02-2015
 */
/**
 * Función para iniciar el calendario laboral de acuerdo al perfil laboral seleccionado.
 * Se despliega la totalidad de horarios para el perfil por lo que se muestran los botones de navegación del calendario.
 * @param accion
 * @param tipoHorario
 * @param arrHorariosRegistrados
 * @param defaultGestion
 * @param defaultMes
 * @param defaultDia
 * @returns {Array}
 */
function iniciarCalendarioLaboralPorPerfilLaboralParaVerAsignaciones(accion,idPerfilLaboral,tipoHorario,arrHorariosRegistrados,defaultGestion,defaultMes,defaultDia) {
    tipoHorario = parseInt(tipoHorario);
    var arrFechasPorSemana = [];
    var contadorPorSemana = 0;
    var diasSemana=7;
    var calendarEvents  = $('.calendar-events');
    /* Inicializa la funcionalidad de eventos: arrastrar y soltar */
    //initEvents();

    /* Initialize FullCalendar */
    var optLeft = 'prev,next';
    var optRight = 'year,month,agendaWeek,agendaDay';
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
        weekNumberTitle:"#S",
        timeFormat: 'H(:mm)', // Mayusculas H de 24-horas
        drop: function(date, allDay) {

            /**
             * Controlando cuando se introduce un nuevo evento u horario en el calendario
             * @type {*|jQuery}
             */

            // Recuperar almacenado de objeto del evento del elemento caído
            var originalEventObject = $(this).data('eventObject');

            // Tenemos que copiarlo, de modo que múltiples eventos no tienen una referencia al mismo objeto
            var copiedEventObject = $.extend({}, originalEventObject);

            // Asignarle la fecha que fue reportado
            copiedEventObject.start = date;


            // Hacer que el evento en el calendario
            // El último argumento `true` determina si el evento "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

            /**
             * Si se introduce un nuevo horario en el calendario se recalcula los totales por semana.
             */
            sumarTotalHorasPorSemana(arrFechasPorSemana);

        }
        ,
        eventDrop: function (event, dayDelta, minuteDelta, allDay, revertFunc) {
            /**
             * Si un horario se ha movido, es necesario calcular los totales de horas por semana
             */
            sumarTotalHorasPorSemana(arrFechasPorSemana);
        },
        events: arrHorariosRegistrados,
        /**
         * Controlando el evento de clik sobre el horario.
         * @param calEvent
         * @param jsEvent
         * @param view
         */
        eventClick: function(calEvent, jsEvent, view) {

            var clase = calEvent.className+"";
            var arrClass = clase.split("_");
            var idTipoHorario = arrClass[1];
            clase = arrClass[0];
            var idTurno = 0;
            if(calEvent.id!=undefined){
                idTurno = calEvent.id;
            }
            var fechaIni = fechaConvertirAFormato(calEvent.start,'-');
            var fechaFin =  fechaIni;
            var calEventEnd = calEvent.start;
            if(calEvent.end!=null&&calEvent.end!=""){
                fechaFin = fechaConvertirAFormato(calEvent.end,'-');
                calEventEnd = calEvent.end;
            }
            var startDate = calEvent.start;
            var FromEndDate = calEventEnd;
            var ToEndDate = calEventEnd;
            //ToEndDate.setDate(ToEndDate.getDate()+900);

            $("#txtHorarioFechaIni").datepicker('setDate', calEvent.start);
            //$('#txtHorarioFechaIni').datepicker('setStartDate', calEvent.start);
            $("#txtHorarioFechaFin").datepicker('setDate', calEventEnd);
            //$('#txtHorarioFechaFin').datepicker('setEndDate', calEventEnd);
            $('#txtHorarioFechaIni').datepicker({
                format:'dd-mm-yyyy',
                default:calEvent.start,
                weekStart: 1,
                startDate: startDate,
                endDate: FromEndDate,
                autoclose: true
            })
                .on('changeDate', function(selected){
                    startDate = new Date(selected.date.valueOf());
                    startDate.setDate(startDate.getDate(new Date(selected.date.valueOf())));
                    $('#txtHorarioFechaFin').datepicker('setStartDate', startDate);
                });
            $('#txtHorarioFechaFin').datepicker({
                default:calEventEnd,
                weekStart: 1,
                startDate: startDate,
                endDate: ToEndDate,
                autoclose: true
            })
                .on('changeDate', function(selected){
                    FromEndDate = new Date(selected.date.valueOf());
                    FromEndDate.setDate(FromEndDate.getDate(new Date(selected.date.valueOf())));
                    $('#txtHorarioFechaIni').datepicker('setEndDate', FromEndDate);
                });
            if(idTipoHorario>0){
                var ok = cargarModalHorario(idTipoHorario);
                if(ok) {
                    /**
                     * Si la clase del horario esta bloqueada no se la puede eliminar
                     */
                    if(clase=="b"){
                        $("#btnDescartarHorario").hide();
                        $("#btnGuardarModificacionHorario").hide();
                        $("#txtHorarioFechaIni").prop("disabled","disabled");
                        $("#txtHorarioFechaFin").prop("disabled","disabled");
                    } else {
                        $("#btnDescartarHorario").show();
                        $("#txtHorarioFechaIni").prop("disabled",false);
                        $("#txtHorarioFechaFin").prop("disabled",false);
                    }
                    $('#popupDescripcionHorario').modal('show');
                    $("#btnDescartarHorario").off();
                    $("#btnDescartarHorario").on("click", function () {
                        switch (clase){
                            case "r":
                            case "d":
                                var okBaja = bajaTurnoEnCalendario(idTurno);
                                if(okBaja){
                                    $('#calendar').fullCalendar('removeEvents', calEvent._id);
                                    $('#popupDescripcionHorario').modal('hide');
                                }
                                break;
                            case "n":
                                $('#calendar').fullCalendar('removeEvents', calEvent._id);
                                $('#popupDescripcionHorario').modal('hide');
                                break;
                        }
                        /**
                         * Si se ha eliminado un horario, es necesario recalcular las horas por semana
                         */
                        sumarTotalHorasPorSemana(arrFechasPorSemana);
                    });
                    /**
                     * Acción efectuada cuando se hace click sobre el botón para Guardar Modifificación de Fechas.
                     */
                    $("#btnGuardarModificacionHorario").off();
                    $("#btnGuardarModificacionHorario").on("click", function () {
                        switch (clase){
                            case "r":
                            case "n":
                                if(fechaIni!=$("#txtHorarioFechaIni").val()||fechaFin!=$("#txtHorarioFechaFin").val()){
                                    /*Inicialmente borramos el evento y lo reingresamos*/
                                    $('#calendar').fullCalendar('removeEvents', calEvent._id);
                                    $('#popupDescripcionHorario').modal('hide');
                                    var fechaInicio = $("#txtHorarioFechaIni").val();
                                    var fechaFinalizacion = $("#txtHorarioFechaFin").val();
                                    var arrFechaInicio =fechaInicio.split("-");
                                    var arrFechaFinalizacion= fechaFinalizacion.split("-");
                                    fechaInicio = arrFechaInicio[2]+"-"+arrFechaInicio[1]+"-"+arrFechaInicio[0];
                                    fechaFinalizacion = arrFechaFinalizacion[2]+"-"+arrFechaFinalizacion[1]+"-"+arrFechaFinalizacion[0];
                                    addEvent = {
                                        id:calEvent.id,
                                        title:calEvent.title,
                                        className:calEvent.className,
                                        start:fechaInicio,
                                        end:fechaFinalizacion,
                                        color:calEvent.color,
                                        editable: true,
                                        hora_entrada:calEvent.hora_entrada,
                                        hora_salida:calEvent.hora_salida

                                    }
                                    $('#calendar').fullCalendar( 'renderEvent', addEvent, true );
                                }
                                $('#popupDescripcionHorario').modal('hide');
                                break;
                            case "d":break;
                        }
                        /**
                         * Si se ha eliminado un horario, es necesario recalcular las horas por semana
                         */
                        sumarTotalHorasPorSemana(arrFechasPorSemana);
                    });
                }else alert("Error al determinar los datos del horario.");
            }else {
                alert("El registro corresponde a un periodo de descanso");
            }
        }
        ,
        eventResize: function(event, delta, revertFunc) {
        /**
         * Cuando un horario es modificado en cuanto a su duración, se debe calcular nuevamente los totales de horas por semana
         */
        sumarTotalHorasPorSemana(arrFechasPorSemana);

    },
    /*dayRender: function (date, cell) {},*/
    viewRender: function(view) {

        switch (view.name){
            case "month":
            {   //$("#divSumatorias").show();
                removerColumnaSumaTotales();
                agregarColumnaSumaTotales(diasSemana);
                arrFechasPorSemana= [];
                var contP=0;
                var arrDias = ["mon","tue","wed","thu","fri","sat","sun"];
                $.each(arrDias,function(k,dia){
                    contP=0;
                    $("td.fc-"+dia).map(function (index, elem) {
                        contP++;
                        var fecha = $(this).data("date");
                        var fechaAux = $(this).data("date");
                        if(fecha!=undefined){
                            var arrFecha = fecha.split("-");
                            fecha = arrFecha[2]+"-"+arrFecha[1]+"-"+arrFecha[0];
                            switch (contP){
                                case 1:arrFechasPorSemana.push( {semana:1,fecha:fecha});break;
                                case 2:arrFechasPorSemana.push( {semana:2,fecha:fecha});break;
                                case 3:arrFechasPorSemana.push( {semana:3,fecha:fecha});break;
                                case 4:arrFechasPorSemana.push( {semana:4,fecha:fecha});break;
                                case 5:arrFechasPorSemana.push( {semana:5,fecha:fecha});break;
                                case 6:arrFechasPorSemana.push( {semana:6,fecha:fecha});break;
                            }
                            var check = fechaAux;
                            var today = $.fullCalendar.formatDate(new Date(),'yyyy-MM-dd');
                            if (check < today) {
                                $(this).css("background-color", "silver");
                            }
                        }
                    });
                });
                sumarTotalHorasPorSemana(arrFechasPorSemana);
                var fechaInicialCalendario = "";
                var fechaFinalCalendario = "";
                /*if(tipoHorario==3){
                    $("td.fc-mon").map(function (index, elem) {
                        if(fechaInicialCalendario=="")
                            fechaInicialCalendario = $(this).data("date");
                    });
                    $("td.fc-sun").map(function (index, elem) {
                        fechaFinalCalendario = $(this).data("date");
                    });
                }else{
                    $("td.fc-mon").map(function (index, elem) {
                        if(fechaInicialCalendario=="")
                            fechaInicialCalendario = $(this).data("date");
                    });
                    $("td.fc-fri").map(function (index, elem) {
                        fechaFinalCalendario = $(this).data("date");
                    });
                }*/
                var moment = $('#calendar').fullCalendar('getDate');
                fechaInicialCalendario = fechaConvertirAFormato(moment,'-');
                var arrFechaInicial = fechaInicialCalendario.split("-");
                fechaInicialCalendario = "01-"+arrFechaInicial[1]+"-"+arrFechaInicial[2];
                fechaFinalCalendario =  obtenerUltimoDiaMes(fechaInicialCalendario);
                $("#hdnFechaInicialCalendario").val(fechaInicialCalendario);
                $("#hdnFechaFinalCalendario").val(fechaFinalCalendario);
            }
                break;
            case "agendaWeek":
                fechaInicialCalendario = $('#calendar').fullCalendar('getView').start;
                fechaInicialCalendario = fechaConvertirAFormato(fechaInicialCalendario,"-");
                fechaFinalCalendario = obtenerFechaMasDias(fechaInicialCalendario,diasSemana-1);
                $("#hdnFechaInicialCalendario").val(fechaInicialCalendario);
                $("#hdnFechaFinalCalendario").val(fechaFinalCalendario);
                break;
            case "agendaDay":
                var moment = $('#calendar').fullCalendar('getDate');
                var fechaInicialCalendario = fechaConvertirAFormato(moment,'-');
                fechaFinalCalendario = fechaInicialCalendario;
                $("#hdnFechaInicialCalendario").val(fechaInicialCalendario);
                $("#hdnFechaFinalCalendario").val(fechaFinalCalendario);
                break;
        }
        definirListaAsignados(idPerfilLaboral,$("#lstUbicacionesPrincipales").val(),$("#lstEstacionesAsignadas").val(),fechaInicialCalendario,fechaFinalCalendario);
    }
    });
    return arrFechasPorSemana;
}
/**
 * Función para la obtención del listado de todos los horarios registrados en el calendario de acuerdo a un perfil determinado, una rango de fechas y un tipo de horario.
 * Considerando que la función es usada sólo para ver las asignaciones de persona vs. calendarios generados.
 * @param idPerfil
 * @param gestion
 * @param mes
 * @param tipoHorario
 * @param contadorPerfiles
 * @returns {Array}
 */
function obtenerTodosHorariosRegistradosEnCalendarioPorPerfilParaVerAsignaciones(idPerfil,tipoHorario,editable,fechaIni,fechaFin,contadorPerfiles){

    var arrHorariosRegistrados = [];
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var ctrlAllDay=true;
    switch (tipoHorario){
        case 1:
        case 2:ctrlAllDay=true;break;
    }
    $.ajax({
        url: '/calendariolaboral/listregistered',
        type: 'POST',
        datatype: 'json',
        async: false,
        cache: false,
        data: {id:idPerfil,fecha_ini:fechaIni,fecha_fin:fechaFin},
        success: function (data) {
            var res = jQuery.parseJSON(data);
            if (res.length > 0) {
                $.each(res, function (key, val) {
                    var idHorarioLaboral = 0;
                    var horaEnt = '00:00:00';
                    var horaSal = '24:00:00';
                    var color = '#000000';
                    var horario_nombre = 'DESCANSO';
                    var perfil_laboral = val.perfil_laboral;
                    var grupo = val.perfil_laboral_grupo;
                    if(grupo!='') perfil_laboral += " - "+grupo;
                    if(val.id_horariolaboral!=null){
                        idHorarioLaboral = val.id_horariolaboral;
                        /*if(val.grupo!="")
                            horario_nombre = val.horario_nombre +" ("+perfil_laboral+")";*/
                        horario_nombre = val.horario_nombre
                        horaEnt = val.hora_entrada.split(":");
                        horaSal = val.hora_salida.split(":");
                        color = val.color;
                    }else {
                        horaEnt = horaEnt.split(":");
                        horaSal = horaSal.split(":");
                    }
                    //color  = colors[contadorPerfiles];
                    var fechaIni =  val.calendario_fecha_ini.split("-");
                    var yi = fechaIni[0];
                    var mi = fechaIni[1]-1;
                    var di = fechaIni[2];

                    var he = horaEnt[0];
                    var me = horaEnt[1];
                    var se = horaEnt[2];

                    var fechaFin =  val.calendario_fecha_fin.split("-");
                    var yf = fechaFin[0];
                    var mf = fechaFin[1]-1;
                    var df = fechaFin[2];

                    var hs = horaSal[0];
                    var ms = horaSal[1];
                    var ss = horaSal[2];
                    var prefijo = "r_";
                    if(idHorarioLaboral==0){ prefijo="d_";}
                    var borde = color;
                    if(!editable){
                        borde = "#000000";
                        prefijo="b_";//Se modifica para que d: represente a los horarios bloqueados
                    }
                    arrHorariosRegistrados.push( {
                        id:val.id_calendariolaboral,
                        className:prefijo+idHorarioLaboral,
                        title: horario_nombre,
                        start: new Date(yi, mi, di, he, me),
                        end: new Date(yf, mf, df, hs, ms),
                        allDay: ctrlAllDay,
                        color: color,
                        editable:editable,
                        borderColor:borde,
                        horas_laborales:val.horas_laborales,
                        dias_laborales:val.dias_laborales,
                        hora_entrada:val.hora_entrada,
                        hora_salida:val.hora_salida
                    });
                });
            }
        }
    });
    return arrHorariosRegistrados;
}
/**
 * Función para la obtención del listado de horarios laborales registrados en el calendario laboral para un determinado registro de relación laboral y perfil laboral.
 * @param idRelaboral
 * @param idPerfilLaboral
 * @param tipoHorario
 * @param editable
 * @param fechaIni
 * @param fechaFin
 * @param contadorPerfiles
 * @returns {Array}
 */
function obtenerTodosHorariosRegistradosEnCalendarioPorPerfilYRelaboralParaVerAsignaciones(idRelaboral,idPerfilLaboral,tipoHorario,editable,fechaIni,fechaFin,contadorPerfiles){

    var arrHorariosRegistrados = [];
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var ctrlAllDay=true;
    switch (tipoHorario){
        case 1:
        case 2:ctrlAllDay=true;break;
    }
    $.ajax({
        url: '/calendariolaboral/listregisteredbyperfilyrelaboral',
        type: 'POST',
        datatype: 'json',
        async: false,
        cache: false,
        data: {id:idRelaboral,id_perfillaboral:idPerfilLaboral,fecha_ini:fechaIni,fecha_fin:fechaFin},
        success: function (data) {
            var res = jQuery.parseJSON(data);
            if (res.length > 0) {
                $.each(res, function (key, val) {
                    var idHorarioLaboral = 0;
                    var horaEnt = '00:00:00';
                    var horaSal = '24:00:00';
                    var color = '#000000';
                    var horario_nombre = 'DESCANSO';
                    var perfil_laboral = val.perfil_laboral;
                    var grupo = val.perfil_laboral_grupo;
                    if(grupo!='') perfil_laboral += " - "+grupo;
                    if(val.id_horariolaboral!=null){
                        idHorarioLaboral = val.id_horariolaboral;
                        /*if(val.grupo!="")
                         horario_nombre = val.horario_nombre +" ("+perfil_laboral+")";*/
                        horario_nombre = val.horario_nombre
                        horaEnt = val.hora_entrada.split(":");
                        horaSal = val.hora_salida.split(":");
                        color = val.color;
                    }else {
                        horaEnt = horaEnt.split(":");
                        horaSal = horaSal.split(":");
                    }
                    //color  = colors[contadorPerfiles];
                    var fechaIni =  val.calendario_fecha_ini.split("-");
                    var yi = fechaIni[0];
                    var mi = fechaIni[1]-1;
                    var di = fechaIni[2];

                    var he = horaEnt[0];
                    var me = horaEnt[1];
                    var se = horaEnt[2];

                    var fechaFin =  val.calendario_fecha_fin.split("-");
                    var yf = fechaFin[0];
                    var mf = fechaFin[1]-1;
                    var df = fechaFin[2];

                    var hs = horaSal[0];
                    var ms = horaSal[1];
                    var ss = horaSal[2];
                    var prefijo = "r_";
                    if(idHorarioLaboral==0){ prefijo="d_";}
                    var borde = color;
                    if(!editable){
                        borde = "#000000";
                        prefijo="b_";//Se modifica para que d: represente a los horarios bloqueados
                    }
                    arrHorariosRegistrados.push( {
                        id:val.id_calendariolaboral,
                        className:prefijo+idHorarioLaboral,
                        title: horario_nombre,
                        start: new Date(yi, mi, di, he, me),
                        end: new Date(yf, mf, df, hs, ms),
                        allDay: ctrlAllDay,
                        color: color,
                        editable:editable,
                        borderColor:borde,
                        horas_laborales:val.horas_laborales,
                        dias_laborales:val.dias_laborales,
                        hora_entrada:val.hora_entrada,
                        hora_salida:val.hora_salida
                    });
                });
            }
        }
    });
    return arrHorariosRegistrados;
}
/**
 * Función para calcular el total de horas por semana.
 */
function sumarTotalHorasPorSemana(arrFechasPorSemana){
    var arr = $("#calendar").fullCalendar( 'clientEvents');
    var horasSemana1=0;
    var horasSemana2=0;
    var horasSemana3=0;
    var horasSemana4=0;
    var horasSemana5=0;
    var horasSemana6=0;
    $("#spSumaSemana1").html(0);
    $("#spSumaSemana2").html(0);
    $("#spSumaSemana3").html(0);
    $("#spSumaSemana4").html(0);
    $("#spSumaSemana5").html(0);
    $("#spSumaSemana6").html(0);
    $("#tdSumaSemana1").css("background-color", "white");
    $("#tdSumaSemana2").css("background-color", "white");
    $("#tdSumaSemana3").css("background-color", "white");
    $("#tdSumaSemana4").css("background-color", "white");
    $("#tdSumaSemana5").css("background-color", "white");
    $("#tdSumaSemana6").css("background-color", "white");

    $.each(arr,function(key,turno){
        var fechaIni = $.fullCalendar.formatDate(turno.start,'dd-MM-yyyy');
        var fechaFin = $.fullCalendar.formatDate(turno.end,'dd-MM-yyyy');
        if(fechaFin=="")fechaFin=fechaIni;
        var sep='-';
        $.each(arrFechasPorSemana,function(clave,valor){

            //alert(fechaIni+"<= "+valor.semana+"::"+valor.fecha+"<="+fechaFin);
            /**
             * Esto porque en algunos casos el horario no tiene fecha de finalización debido a que
             * su existencia es producto de haber jalado de la lista de horarios disponibles sobre el calendario
             */
            if(valor.semana==1){
                if(procesaTextoAFecha(fechaIni,sep)<=procesaTextoAFecha(valor.fecha,sep)
                    &&procesaTextoAFecha(valor.fecha,sep)<=procesaTextoAFecha(fechaFin,sep)){
                    horasSemana1 += parseFloat(turno.horas_laborales);
                    //alert(turno.title+" entro en la semana 1 =>"+fechaIni+"<="+valor.fecha+"<="+fechaFin+" horas: "+turno.horas_laborales);

                }
            }
            if(valor.semana==2){
                if(procesaTextoAFecha(fechaIni,sep)<=procesaTextoAFecha(valor.fecha,sep)
                    &&procesaTextoAFecha(valor.fecha,sep)<=procesaTextoAFecha(fechaFin,sep)){
                    horasSemana2 += parseFloat(turno.horas_laborales);
                    //alert(turno.title+" entro en la semana 2 =>"+fechaIni+"<="+valor.fecha+"<="+fechaFin+" horas: "+turno.horas_laborales);
                }
            }
            if(valor.semana==3){
                if(procesaTextoAFecha(fechaIni,sep)<=procesaTextoAFecha(valor.fecha,sep)
                    &&procesaTextoAFecha(valor.fecha,sep)<=procesaTextoAFecha(fechaFin,sep)){
                    horasSemana3 += parseFloat(turno.horas_laborales);
                    //alert(turno.title+" entro en la semana 3 =>"+fechaIni+"<="+valor.fecha+"<="+fechaFin+" horas: "+turno.horas_laborales);
                }
            }
            if(valor.semana==4){
                if(procesaTextoAFecha(fechaIni,sep)<=procesaTextoAFecha(valor.fecha,sep)
                    &&procesaTextoAFecha(valor.fecha,sep)<=procesaTextoAFecha(fechaFin,sep)){
                    horasSemana4 += parseFloat(turno.horas_laborales);
                    //alert(turno.title+" entro en la semana 4 =>"+fechaIni+"<="+valor.fecha+"<="+fechaFin+" horas: "+turno.horas_laborales);
                }
            }
            if(valor.semana==5){
                if(procesaTextoAFecha(fechaIni,sep)<=procesaTextoAFecha(valor.fecha,sep)
                    &&procesaTextoAFecha(valor.fecha,sep)<=procesaTextoAFecha(fechaFin,sep)){
                    horasSemana5 += parseFloat(turno.horas_laborales);
                    //alert(turno.title+" entro en la semana 5 =>"+fechaIni+"<="+valor.fecha+"<="+fechaFin+" horas: "+turno.horas_laborales);
                }
            }
            if(valor.semana==6){
                if(procesaTextoAFecha(fechaIni,sep)<=procesaTextoAFecha(valor.fecha,sep)
                    &&procesaTextoAFecha(valor.fecha,sep)<=procesaTextoAFecha(fechaFin,sep)){
                    horasSemana6 += parseFloat(turno.horas_laborales);
                    //alert(turno.title+" entro en la semana 6 =>"+fechaIni+"<="+valor.fecha+"<="+fechaFin+" horas: "+turno.horas_laborales);
                }
            }
        });
    });

    $("#spSumaSemana1").html(horasSemana1.toFixed(2));
    $("#spSumaSemana2").html(horasSemana2.toFixed(2));
    $("#spSumaSemana3").html(horasSemana3.toFixed(2));
    $("#spSumaSemana4").html(horasSemana4.toFixed(2));
    $("#spSumaSemana5").html(horasSemana5.toFixed(2));
    $("#spSumaSemana6").html(horasSemana6.toFixed(2));
    var promedioSumaTresSemanas = (horasSemana2+horasSemana3+horasSemana4)/3;
    $("#spSumaPromedioTresSemanas").html(promedioSumaTresSemanas.toFixed(2));
    //var tipoJornadaLaboral = $("#lstJornadasLaborales").val();
    var horasSemanalesPermitidas = 48;
    var horasDiaPermitidas = 8;
    var horasNochePermitidas = 7;
    var idJornadaLaboral = 1;
    if(idJornadaLaboral!=0){
        /*var arrJornadaLaboral = tipoJornadaLaboral.split("::");
         idJornadaLaboral = arrJornadaLaboral[0];
         horasSemanalesPermitidas = arrJornadaLaboral[1];
         horasDiaPermitidas = arrJornadaLaboral[2];
         horasNochePermitidas = arrJornadaLaboral[3];*/
        /**
         * Control de exceso de horas en la semana
         */
        if(horasSemana1>horasSemanalesPermitidas){
            $("#tdSumaSemana1").css("background-color", "#FF4000");
        }else $("#tdSumaSemana1").css("background-color", "white");
        if(horasSemana2>horasSemanalesPermitidas){
            $("#tdSumaSemana2").css("background-color", "#FF4000");
        }else $("#tdSumaSemana2").css("background-color", "silver");
        if(horasSemana3>horasSemanalesPermitidas){
            $("#tdSumaSemana3").css("background-color", "#FF4000");
        }else $("#tdSumaSemana3").css("background-color", "silver");
        if(horasSemana4>horasSemanalesPermitidas){
            $("#tdSumaSemana4").css("background-color", "#FF4000");
        }else $("#tdSumaSemana4").css("background-color", "silver");
        if(horasSemana5>horasSemanalesPermitidas){
            $("#tdSumaSemana5").css("background-color", "#FF4000");
        }else $("#tdSumaSemana5").css("background-color", "white");
        if(horasSemana6>horasSemanalesPermitidas){
            $("#tdSumaSemana6").css("background-color", "#FF4000");
        }else $("#tdSumaSemana6").css("background-color", "white");
        /**
         * Control del promedio de horas en tres semanas del mes
         */
        if(promedioSumaTresSemanas>horasSemanalesPermitidas){
            $("#tdSumaPromedioTresSemanas").css("background-color", "red");
        }else $("#tdSumaPromedioTresSemanas").css("background-color", "white");

    }
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
 * Función para la obtención del listado de personal asignado por perfil.
 * @param idPerfilRelaboral
 * @param idUbicacion
 * @param idEstacion
 * @param fechaIni
 * @param fechaFin
 */
function definirListaAsignados(idPerfilRelaboral,idUbicacion,idEstacion,fechaIni,fechaFin){
    $("#lstBoxRegistrados").html("");
    $("#lstBoxRegistrados").jqxListBox('render');
    $("#lstBoxRegistrados").prop("disabled",true);
    if(idUbicacion>0&&idUbicacion>0&&fechaIni!=""&&fechaFin!=""){
        var arrPersonal = [];
        var source = [];
        var data = [];
        var dataAdapter = [];
        var sufijo = "New";
        var sourceB = [];
        var soloRegistrados = 1;
        $("#divPersonasAsignadas").show();
        if(idEstacion>0){
            idUbicacion = idEstacion;
        }
        $.ajax({
            url : '/relaborales/listasignadas/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data:{id_perfillaboral:idPerfilRelaboral,id_ubicacion:idUbicacion,fecha_ini:fechaIni,fecha_fin:fechaFin },
            success: function (data) {
                arrPersonal = jQuery.parseJSON(data);
            }
        });
        if(arrPersonal.length>0){
            source = {
                localdata: arrPersonal,
                datatype: "array"
            };
            dataAdapter = new $.jqx.dataAdapter(source);
            $("#lstBoxRegistrados").prop("disabled",false);
            $("#divPersonasAsignadas").show();
            $("#lstBoxRegistrados").jqxListBox({ filterable: true,allowDrop: false, allowDrag: false, source: dataAdapter, width:  "100%", height: 500,
                renderer: function (index, label, value) {
                    var datarecord = arrPersonal[index];
                    if(datarecord!=undefined){
                        var ci = datarecord.ci;
                        var expd = datarecord.expd;
                        var imgurl = '/images/personal/'+ci+'.jpg';
                        if(!ImageExist(imgurl))imgurl = '/images/perfil-profesional.jpg';
                        var cargo = datarecord.cargo;
                        var fechas = datarecord.fecha_ini;
                        if(datarecord.fecha_fin!=null){
                            fechas = fechas + " AL "+datarecord.fecha_fin;
                        }else fechas = "Fecha Inicio: "+fechas;
                        var img = '<img height="70" width="70" src="' + imgurl + '"/>';
                        $("#tbl_"+datarecord.id_relaboral).remove();
                        var fechaIni = datarecord.fecha_incor;
                        var fechaFin = datarecord.fecha_fin;
                        if(datarecord.fecha_baja!="")fechaFin = datarecord.fecha_baja;
                        var table = '<table id="tbl_'+datarecord.id_relaboral+'" data-agrupador="'+datarecord.agrupador+'" data-nombres="'+datarecord.nombres+'" data-date-min="'+fechaIni+'" data-date-max="'+fechaFin+'">';
                        table += '<tr><td>' + img + '</td></tr>';
                        table += '<tr><td>' + datarecord.nombres + '</td></tr>';
                        table += '<tr><td>'+cargo+'</td></tr>';
                        table += '<tr><td>'+fechas+'</td></tr>';
                        table += '</table>';
                        return table;
                    }else{
                        if(jQuery.type( value )==="number"){
                            var datarecord = getOneByIdRelaboralInArray(arrPersonal,value);
                            var ci = datarecord.ci;
                            var expd = datarecord.expd;
                            var imgurl = '/images/personal/'+ci+'.jpg';
                            if(!ImageExist(imgurl))imgurl = '/images/perfil-profesional.jpg';
                            var cargo = datarecord.cargo;
                            var fechas = datarecord.fecha_ini;
                            if(datarecord.fecha_fin!=null){
                                fechas = "Fechas: "+fechas + " AL "+datarecord.fecha_fin;
                            }else fechas = "Fecha Inicio: "+fechas;
                            var img = '<img height="70" width="70" src="' + imgurl + '"/>';
                            $("#tbl_"+datarecord.id_relaboral).remove();
                            var fechaIni = datarecord.fecha_incor;
                            var fechaFin = datarecord.fecha_fin;
                            if(datarecord.fecha_baja!="")fechaFin = datarecord.fecha_baja;
                            var table = '<table id="tbl_'+datarecord.id_relaboral+'" data-agrupador="'+datarecord.agrupador+'" data-nombres="'+datarecord.nombres+'" data-date-min="'+fechaIni+'" data-date-max="'+fechaFin+'">';
                            table += '<tr><td>' + img + '</td></tr>';
                            table += '<tr><td>' + datarecord.nombres + '</td></tr>';
                            table += '<tr><td>'+cargo+'</td></tr>';
                            table += '<tr><td>'+fechas+'</td></tr>';
                            table += '</table>';
                            return table;
                        }else{
                            if(jQuery.type( value )==="object"){
                                var datarecord = value;
                                var ci = datarecord.ci;
                                var expd = datarecord.expd;
                                var imgurl = '/images/personal/'+ci+'.jpg';
                                if(!ImageExist(imgurl))imgurl = '/images/perfil-profesional.jpg';
                                var cargo = datarecord.cargo;
                                var fechas = datarecord.fecha_ini;
                                if(datarecord.fecha_fin!=null){
                                    fechas = "Fechas: "+fechas + " AL "+datarecord.fecha_fin;
                                }else fechas = "Fecha Inicio: "+fechas;
                                var img = '<img height="70" width="70" src="' + imgurl + '"/>';
                                $("#tbl_"+datarecord.id_relaboral).remove();
                                var fechaIni = datarecord.fecha_incor;
                                var fechaFin = datarecord.fecha_fin;
                                if(datarecord.fecha_baja!="")fechaFin = datarecord.fecha_baja;
                                var table = '<table id="tbl_'+datarecord.id_relaboral+'" data-agrupador="'+datarecord.agrupador+'" data-nombres="'+datarecord.nombres+'" data-date-min="'+fechaIni+'" data-date-max="'+fechaFin+'">';
                                table += '<tr><td>' + img + '</td></tr>';
                                table += '<tr><td>' + datarecord.nombres + '</td></tr>';
                                table += '<tr><td>'+cargo+'</td></tr>';
                                table += '<tr><td>'+fechas+'</td></tr>';
                                table += '</table>';
                                return table;
                            }
                        }
                    }
                },
                ready:function(){
                    var itemsB = $("#lstBoxRegistrados").jqxListBox('getItems');
                    $("#spanContadorLstBoxRegistrados").text(itemsB.length);
                }
            });

            $("#clearFilterRegistrados").jqxButton();
            $("#clearFilterRegistrados").click(function () {
                $("#lstBoxRegistrados").jqxListBox('clearFilter');
            });
        }else{
            $("#divPersonasAsignadas").hide();
        }

    }else{
        $("#divPersonasAsignadas").hide();
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