/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  21-10-2014
 */
$().ready(function () {
    listarTiposHorarios(0);
    var date = new Date();
    var defaultDia = date.getDate();
    var defaultMes = date.getMonth();
    var defaultGestion = date.getFullYear();
    var fechaIni = "";
    var fechaFin = "";
    var arrHorariosRegistrados = [];
    $("#calendar").html("");
    iniciarCalendarioLaboralPorTipoHorario(5,$("#lstTiposDeHorario").val(),arrHorariosRegistrados,defaultGestion,defaultMes,defaultDia)

    $("#lstTiposDeHorario").off();
    $("#lstTiposDeHorario").on("change",function(){
        arrHorariosRegistrados = [];
        $("#calendar").html("");
        if($("#lstTiposDeHorario").val()>0){
            arrHorariosRegistrados = obtenerTodosHorariosRegistradosEnCalendarioPorTipoHorario($("#lstTiposDeHorario").val(),false,fechaIni,fechaFin);

        }else  $("#lstPerfilesLaboralesDisponibles").jqxListBox('render');
        iniciarCalendarioLaboralPorTipoHorario(5,$("#lstTiposDeHorario").val(),arrHorariosRegistrados,defaultGestion,defaultMes,defaultDia)
        cargarPerfilesLaboralesDisponiblesPorTipoHorario($("#lstTiposDeHorario").val(),fechaIni,fechaFin,defaultGestion,defaultMes,defaultDia);
    });


    $("#divMsjeNotificacionError").jqxNotification({
        width: '100%', position: "bottom-right", opacity: 0.9,
        autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 7000, template: "error"
    });

    $("#divMsjeNotificacionWarning").jqxNotification({
        width: '100%', position: "bottom-right", opacity: 0.9,
        autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 7000, template: "warning"
    });
    $("#divMsjeNotificacionSuccess").jqxNotification({
        width: '100%', position: "bottom-right", opacity: 0.9,
        autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 7000, template: "success"
    });
    $("#btnImprimirCalendario").on("click",function(){
        var opciones = {mode:"popup",popClose: false};
        $("#page-content").printArea(opciones);
    });

    /*
     *   Función para la inserción obligatoria de datos numéricos en los campos de clase.
     */
    $('.numeral').keyup(function (event) {
        if ($(this).val() != '') {
            $(this).val($(this).val().replace(/[^0-9]/g, ""));
        }
    });

    /*
     *   Función para la inserción obligatoria de letras distintas a números en los campos de clase.
     */
    $('.literal').keyup(function (event) {
        if ($(this).val() != '') {
            $(this).val($(this).val().replace(/[^A-Z,a-z,ñ,Ñ, ]/g, ""));
        }
    });
    $(document).keypress(OperaEvento);
    $(document).keyup(OperaEvento);
});
/*
 * Función para controlar la ejecución del evento esc con el teclado.
 */
function OperaEvento(evento) {
    if ((evento.type == "keyup" || evento.type == "keydown") && evento.which == "27") {

    }
}

/* Function for initializing drag and drop event functionality */
var initEvents = function() {
    var calendarEvents  = $('.calendar-events');
    calendarEvents.find('li').each(function() {
        // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
        var eventObject = { title: $.trim($(this).text()), color: $(this).css('background-color') };

        // store the Event Object in the DOM element so we can get to it later
        $(this).data('eventObject', eventObject);

        // make the event draggable using jQuery UI
        $(this).draggable({ zIndex: 999, revert: true, revertDuration: 0 });
    });
};
/**
 * Función para el registro de horarios en espera (El primer estado de un horario) para su disponibilidad de asignación en las fechas dentro del calendario.
 * @returns {Array}
 */
function cargarHorariosRegistradosEnCalendario(){
    var arrHorarios = [];
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    $.ajax({
        url: '/calendariolaboral/gethorariosregistrados',
        type: 'POST',
        datatype: 'json',
        async: false,
        cache: false,
        success: function (data) {
            var res = jQuery.parseJSON(data);
            if (res.length > 0) {
                $.each(res, function (key, val) {
                    var fechaIni =  val.fecha_ini.split("-");
                    var yi = fechaIni[0];
                    var mi = fechaIni[1];
                    var di = fechaIni[2];
                    var horaEnt = val.hora_entrada.split(":");
                    var he = horaEnt[0];
                    var me = horaEnt[1];
                    var se = horaEnt[2];
                    var fechaFin =  val.fecha_fin.split("-");
                    var yf = fechaFin[0];
                    var mf = fechaFin[1];
                    var df = fechaFin[2];
                    var horaSal = val.hora_entrada.split(":");
                    var hs = horaSal[0];
                    var ms = horaSal[1];
                    var ss = horaSal[2];
                   arrHorarios.push( {
                       id:val.id_horariolaboral,
                       title: val.nombre,
                        start: new Date(yi, mi, di, he, me),
                        end: new Date(yf, mf, df, hs, ms),
                        allDay: true,
                        color: val.color
                    });
                });
            }
        }
    });
    return arrHorarios;
}
/**
 * Función para el despliegue en el lado izquierdo de todos los horarios registrados, dando la posibilidad de su modificación.
 * @author JLM
 * @param arrHorarios
 */
function cargarHorariosRegistradosParaModificar(arrHorarios){
    $("#ulHorariosEnEspera").html("");
    if(arrHorarios.length>0){
        $.each(arrHorarios, function (key, val) {
            /*$("#ulHorariosEnEspera").append("<li class='ui-draggable' style='background-color: rgb(155, 89, 182);position: relative; '>"+val.title+"</li>");*/

            var eventInput      = $('#txtNombreHorario');
            var eventInputVal   = '';
            //var valColor = $("#txtColorHorario").val();
            var valColor = val.color;
            //eventInputVal = eventInput.prop('value');
            eventInputVal = val.title;
            var calendarEvents  = $('.calendar-events');
            calendarEvents.append('<li style="background-color: '+valColor+'" class="ui-draggable">' + $('<div />').text(eventInputVal).html() + '</li>');

            // Init Events
            initEvents();
        });

    }
}
/**
 * Formulario para la validación de lo datos enviados para el registro de horarios laborales.
 * @author JLM
 * @returns {boolean}
 */
function validaFormularioHorario() {
    var ok = true;
    var msje = "";
    $(".msjs-alert").hide();

    limpiarMensajesErrorPorValidacionHorario();

    var enfoque = null;
    var nombre = $("#txtNombreHorario").val();
    var nombreAlternativo = $("#txtNombreAlternativoHorario").val();
    var color = $("#txtColorHorario").val();
    var horaEntHorario = $("#txtHoraEntHorario").val();
    var horaSalHorario = $("#txtHoraSalHorario").val();
    var minutosToleranciaAcumulable = $("#txtMinutosToleranciaAcu").val();
    var minutosToleranciaEntrada = $("#txtMinutosToleranciaEnt").val();
    var minutosToleranciaSalida = $("#txtMinutosToleranciaSal").val();
    var horaInicioRangoEntrada = $("#txtHoraInicioRangoEnt").val();
    var horaFinalizacionRangoEntrada = $("#txtHoraFinalizacionRangoEnt").val();
    var horaInicioRangoSalida = $("#txtHoraInicioRangoSal").val();
    var horaFinalizacionRangoSalida = $("#txtHoraFinalizacionRangoSal").val();



    if (nombre == '') {
        ok = false;
        var msje = "Debe introducir un nombre para el horario necesariamente.";
        $("#divNombreHorario").addClass("has-error");
        $("#helpErrorNombreHorario").html(msje);
        if (enfoque == null)enfoque = $("#txtNombreHorario");
    }
    if(color==''){
        ok = false;
        var msje = "Debe seleccionar un color para el horario necesariamente.";
        $("#divColorHorario").addClass("has-error");
        $("#helpErrorColorHorario").html(msje);
        if (enfoque == null)enfoque = $("#txtColorHorario");
    }
    if(color=='#FFFFFF'){
        ok = false;
        var msje = "Seleccion&oacute; el color blanco para el horario, debe seleccionar un color diferente necesariamente.";
        $("#divColorHorario").addClass("has-error");
        $("#helpErrorColorHorario").html(msje);
        if (enfoque == null)enfoque = $("#txtColorHorario");
    }
    if(horaEntHorario==''){
        ok = false;
        var msje = "Debe seleccionar una hora de entrada necesariamente.";
        $("#divHoraEntHorario").addClass("has-error");
        $("#helpErrorHoraEntHorario").html(msje);
        if (enfoque == null)enfoque = $("#txtHoraEntHorario");
    }
    if(horaSalHorario==''){
        ok = false;
        var msje = "Debe seleccionar una hora de salida necesariamente.";
        $("#divHoraSalHorario").addClass("has-error");
        $("#helpErrorHoraSalHorario").html(msje);
        if (enfoque == null)enfoque = $("#txtHoraSalHorario");
    }
    if(minutosToleranciaAcumulable==''){
        ok = false;
        var msje = "Debe introducir los minutos de tolerancia acumulable necesariamente.";
        $("#divMinutosToleranciaAcu").addClass("has-error");
        $("#helpErrorMinutosToleranciaAcu").html(msje);
        if (enfoque == null)enfoque = $("#txtMinutosToleranciaAcu");
    }
    if(minutosToleranciaEntrada==''){
        ok = false;
        var msje = "Debe introducir los minutos de tolerancia en la entrada del horario necesariamente.";
        $("#divMinutosToleranciaEnt").addClass("has-error");
        $("#helpErrorMinutosToleranciaEnt").html(msje);
        if (enfoque == null)enfoque = $("#txtMinutosToleranciaEnt");
    }
    if(minutosToleranciaSalida==''){
        ok = false;
        var msje = "Debe introducir los minutos de tolerancia en la salida del horario necesariamente.";
        $("#divMinutosToleranciaSal").addClass("has-error");
        $("#helpErrorMinutosToleranciaSal").html(msje);
        if (enfoque == null)enfoque = $("#txtMinutosToleranciaSal");
    }
    if(horaInicioRangoEntrada==''){
        ok = false;
        var msje = "Debe introducir la hora de inicio del rango de marcaci&oacute;n para la entrada.";
        $("#divHoraInicioRangoEnt").addClass("has-error");
        $("#helpErrorHoraInicioRangoEnt").html(msje);
        if (enfoque == null)enfoque = $("#txtHoraInicioRangoEnt");
    }
    if(horaFinalizacionRangoEntrada==''){
        ok = false;
        var msje = "Debe introducir la hora de finalizaci&oacute;n del rango de marcaci&oacute;n para la entrada.";
        $("#divHoraFinalizacionRangoEnt").addClass("has-error");
        $("#helpErrorHoraFinalizacionRangoEnt").html(msje);
        if (enfoque == null)enfoque = $("#txtHoraFinalizacionRangoEnt");
    }
    if(horaInicioRangoSalida==''){
        ok = false;
        var msje = "Debe introducir la hora de inicio del rango de marcaci&oacute;n para la salida.";
        $("#divHoraInicioRangoSal").addClass("has-error");
        $("#helpErrorHoraInicioRangoSal").html(msje);
        if (enfoque == null)enfoque = $("#txtHoraInicioRangoSal");
    }
    if(horaFinalizacionRangoSalida==''){
        ok = false;
        var msje = "Debe introducir la hora de finalizaci&oacute;n del rango de marcaci&oacute;n para la salida.";
        $("#divHoraFinalizacionRangoSal").addClass("has-error");
        $("#helpErrorHoraFinalizacionRangoSal").html(msje);
        if (enfoque == null)enfoque = $("#txtHoraFinalizacionRangoSal");
    }

    /*var sep = '-';
    if (procesaTextoAFecha(fechaIni, sep) < procesaTextoAFecha(fechaMem, sep)) {
        ok = false;
        msje = "La fecha de inicio debe ser igual o superior a la fecha del memor&aacute;ndum.";
        $("#divFechasIniMovilidad").addClass("has-error");
        $("#divFechasMemorandums").addClass("has-error");
        $("#helpErrorFechasIniMovilidad").html(msje);
        $("#helpErrorFechasMemorandums").html(msje);
        if (enfoque == null)enfoque = $("#txtFechaIniMovilidad");
    }
    if (swFechaFin == 1) {
        if (procesaTextoAFecha(fechaFin, sep) < procesaTextoAFecha(fechaIni, sep)) {
            ok = false;
            msje = "La fecha de finalizaci&oacute;n debe ser igual o superior a la fecha de inicio.";
            $("#divFechasIniMovilidad").addClass("has-error");
            $("#divFechasFinMovilidad").addClass("has-error");
            $("#helpErrorFechasIniMovilidad").html(msje);
            $("#helpErrorFechasFinMovilidad").html(msje);
            if (enfoque == null)enfoque = $("#txtFechaIniMovilidad");
        }
    }*/
    if (enfoque != null) {
        enfoque.focus();
    }
    return ok;
}
/**
 * Función para la limpieza de los mensajes de error debido a la validación del formulario para registro de horario laboral.
 */
function limpiarMensajesErrorPorValidacionHorario() {
    $("#divNombreHorario").removeClass("has-error");
    $("#helpErrorNombreHorario").html("");
    $("#divColorHorario").removeClass("has-error");
    $("#helpErrorColorHorario").html("");
    $("#divHoraEntHorario").removeClass("has-error");
    $("#helpErrorHoraEntHorario").html("");
    $("#divHoraSalHorario").removeClass("has-error");
    $("#helpErrorHoraSalHorario").html("");
    $("#divMinutosToleranciaAcu").removeClass("has-error");
    $("#helpErrorMinutosToleranciaAcu").html("");
    $("#divMinutosToleranciaEnt").removeClass("has-error");
    $("#helpErrorMinutosToleranciaEnt").html("");
    $("#divMinutosToleranciaSal").removeClass("has-error");
    $("#helpErrorMinutosToleranciaSal").html("");
    $("#divHoraInicioRangoEnt").removeClass("has-error");
    $("#helpErrorHoraInicioRangoEnt").html("");
    $("#divHoraFinalizacionRangoEnt").removeClass("has-error");
    $("#helpErrorHoraFinalizacionRangoEnt").html("");
    $("#divHoraInicioRangoSal").removeClass("has-error");
    $("#helpErrorHoraInicioRangoSal").html("");
    $("#divHoraFinalizacionRangoSal").removeClass("has-error");
    $("#helpErrorHoraFinalizacionRangoSal").html("");
}
/**
 * Función para cargar los departamentos en el combo especificado.
 * @param idDepartamentoPrefijado Identificador del departamento prefijado por defecto.
 */
function listarTiposHorarios(idTipoHorario){
    $.ajax({
        url:'/perfileslaborales/listtiposhorarios',
        type:'POST',
        datatype: 'json',
        async:false,
        success: function(data) {
            var res = jQuery.parseJSON(data);
            if(res.length>0){
                $("#lstTiposDeHorario").html("");
                $("#lstTiposDeHorario").prop("disabled",false);
                $("#lstTiposDeHorario").append("<option value='0'>Seleccionar...</option>");
                if(res.length>0){
                    $.each( res, function( key, val ) {
                        if(idTipoHorario==val.tipo_horario)selected="selected";else selected="";
                        $("#lstTiposDeHorario").append("<option value="+val.tipo_horario+" "+selected+">"+val.tipo_horario_descripcion+"</option>");
                    });
                }else $("#lstTiposDeHorario").prop("disabled","disabled");
            }
        }
    });
}
/**
 * Función para inicializar el calendario de acuerdo al tipo de horario seleccionado.
 * @param accion
 * @param tipoHorario
 * @param arrHorariosRegistrados
 * @param defaultGestion
 * @param defaultMes
 * @param defaultDia
 * @returns {Array}
 */
function iniciarCalendarioLaboralPorTipoHorario(accion,tipoHorario,arrHorariosRegistrados,defaultGestion,defaultMes,defaultDia) {
    tipoHorario = parseInt(tipoHorario);
    var arrFechasPorSemana = [];
        var contadorPorSemana = 0;
        var diasSemana=7;
        var calendarEvents  = $('.calendar-events');
        /* Inicializa la funcionalidad de eventos: arrastrar y soltar */

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
                /*switch (tipoHorario){
                 case 1:
                 case 2:break;
                 case 3:optLeft='';optRight='year';break;
                 }*/
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
                //sumarTotalHorasPorSemana(arrFechasPorSemana);

            }
            ,
            eventDrop: function (event, dayDelta, minuteDelta, allDay, revertFunc) {
                /**
                 * Si un horario se ha movido, es necesario calcular los totales de horas por semana
                 */
                //sumarTotalHorasPorSemana(arrFechasPorSemana);
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
                            //sumarTotalHorasPorSemana(arrFechasPorSemana);
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
                                        var arrFechaFinalicacion = fechaFinalizacion.split("-");
                                        fechaInicio = arrFechaInicio[2]+"-"+arrFechaInicio[1]+"-"+arrFechaInicio[0];
                                        fechaFinalizacion = arrFechaFinalicacion[2]+"-"+arrFechaFinalicacion[1]+"-"+arrFechaFinalicacion[0];
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
                            //sumarTotalHorasPorSemana(arrFechasPorSemana);
                        });
                    }else alert("Error al determinar los datos del horario.");
                }else {
                    alert("El registro corresponde a un periodo de descanso");
                }
            },
            eventResize: function(event, delta, revertFunc) {
                /**
                 * Cuando un horario es modificado en cuanto a su duración, se debe calcular nuevamente los totales de horas por semana
                 */
                sumarTotalHorasPorSemana(arrFechasPorSemana);

            },
            /*dayRender: function (date, cell) {},*/
            viewRender: function(view) {
                if(view.name=="month")
                {   $("#divSumatorias").show();
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
                    //sumarTotalHorasPorSemana(arrFechasPorSemana);
                }else{
                    $("#divSumatorias").hide();
                }
            }
        });
    return arrFechasPorSemana;
}
/**
 * Función para inicializar las funcionalidad para el evento de arrastre y eliminación
 */
var initEvents = function() {
    var calendarEvents  = $('.calendar-events');
    calendarEvents.find('li').each(function() {

        /*Creando un nuevo objeto con los datos necesarios (Se usa HTML5 para almacenar otro datos*/
        var horasLaborales = $(this).data("horas_laborales");
        var diasLaborales = $(this).data("dias_laborales");
        var horaEntrada = $(this).data("hora_entrada");
        var horaSalida = $(this).data("hora_salida");
        var eventObject = { className:'n_'+this.id,title: $.trim($(this).text()), color: $(this).css('background-color'),horas_laborales: horasLaborales,dias_laborales:diasLaborales,hora_entrada:horaEntrada,hora_salida:horaSalida};

        /* Almacenar el objeto de evento en el elemento DOM para que podamos llegar a ella más tarde */
        $(this).data('eventObject', eventObject);

        /* Hacer que el evento se pueda arrastrar usando jQuery UI*/
        $(this).draggable({ zIndex: 999, revert: true, revertDuration: 0 });
    });
};
/**
 * Función para la obtención del listado de todos los horarios registrados en el calendario de acuerdo a un perfil determinado, una rango de fechas y un tipo de horario.
 * @param idPerfil
 * @param gestion
 * @param mes
 * @param tipoHorario
 * @param contadorPerfiles
 * @returns {Array}
 */
function obtenerTodosHorariosRegistradosEnCalendarioPorPerfil(idPerfil,tipoHorario,editable,fechaIni,fechaFin,contadorPerfiles){

    var arrHorariosRegistrados = [];
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var ctrlAllDay=true;
    var colors = ['#9b59b6','#1abc9c','#f39c12','#d35400','#3498db','#e74c3c','#9b59b6','#cc80b3','#b3408c','#b34040','#bfd9d9','#2020a6','#a6a620','#e74c3c','#e74c3c','#cc80b3'];

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
                        if(val.grupo!="")
                            horario_nombre = val.horario_nombre +" ("+perfil_laboral+")";
                        horaEnt = val.hora_entrada.split(":");
                        horaSal = val.hora_salida.split(":");
                        color = val.color;
                    }else {
                        horaEnt = horaEnt.split(":");
                        horaSal = horaSal.split(":");
                    }
                    color  = colors[contadorPerfiles];
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
 * Función para la obtención de los horarios laborales registrados de acuerdo al tipo de horario seleccionado.
 * @param tipoHorario
 * @param editable
 * @param fechaIni
 * @param fechaFin
 * @returns {Array}
 */
function obtenerTodosHorariosRegistradosEnCalendarioPorTipoHorario(tipoHorario,editable,fechaIni,fechaFin){
    var arrHorariosRegistrados = [];
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var ctrlAllDay=true;
    $.ajax({
        url: '/calendariolaboral/listregisteredportipohorario',
        type: 'POST',
        datatype: 'json',
        async: false,
        cache: false,
        data: {tipo_horario:tipoHorario,fecha_ini:fechaIni,fecha_fin:fechaFin},
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
                        if(val.grupo!="")
                        horario_nombre = val.horario_nombre +" ("+perfil_laboral+")";
                        horaEnt = val.hora_entrada.split(":");
                        horaSal = val.hora_salida.split(":");
                        color = val.color;
                    }else {
                        horaEnt = horaEnt.split(":");
                        horaSal = horaSal.split(":");
                    }
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

    $("#spSumaSemana1").html(horasSemana1);
    $("#spSumaSemana2").html(horasSemana2);
    $("#spSumaSemana3").html(horasSemana3);
    $("#spSumaSemana4").html(horasSemana4);
    $("#spSumaSemana5").html(horasSemana5);
    $("#spSumaSemana6").html(horasSemana6);
    var tipoJornadaLaboral = $("#lstJornadasLaborales").val();
    var horasSemanalesPermitidas = 0;
    var horasDiaPermitidas = 0;
    var horasNochePermitidas = 0;
    var idJornadaLaboral = 0;
    if(tipoJornadaLaboral!=null&&tipoJornadaLaboral!=0){
        var arrJornadaLaboral = tipoJornadaLaboral.split("::");
        idJornadaLaboral = arrJornadaLaboral[0];
        horasSemanalesPermitidas = arrJornadaLaboral[1];
        horasDiaPermitidas = arrJornadaLaboral[2];
        horasNochePermitidas = arrJornadaLaboral[3];
        /**
         * Control de exceso de horas en la semana
         */
        if(horasSemana1>horasSemanalesPermitidas){
            $("#tdSumaSemana1").css("background-color", "red");
        }
        if(horasSemana2>horasSemanalesPermitidas){
            $("#tdSumaSemana2").css("background-color", "red");
        }
        if(horasSemana3>horasSemanalesPermitidas){
            $("#tdSumaSemana3").css("background-color", "red");
        }
        if(horasSemana4>horasSemanalesPermitidas){
            $("#tdSumaSemana4").css("background-color", "red");
        }
        if(horasSemana5>horasSemanalesPermitidas){
            $("#tdSumaSemana5").css("background-color", "red");
        }
        if(horasSemana6>horasSemanalesPermitidas){
            $("#tdSumaSemana6").css("background-color", "red");
        }

    }

}
/**
 * Función para llenar el combo de perfiles laborales disponibles de acuerdo a la selección del tipo de horario.
 * @param tipoHorario
 */
function cargarPerfilesLaboralesDisponiblesPorTipoHorario(tipoHorario,fechaIni,fechaFin,defaultGestion,defaultMes,defaultDia){
    var ok = false;
    if(tipoHorario>0){
        ok = true;
        var source =
        {
            datatype: "json",
            datafields: [
                {name: 'nro_row', type: 'integer'},
                {name: 'id_perfillaboral', type: 'integer'},
                {name: 'perfil_laboral', type: 'string'},
                {name: 'perfil_laboral_grupo', type: 'string'},
                {name: 'tipo_horario_descripcion', type: 'string'}
            ],
            url: '/calendariolaboral/listperfilesregisteredportipohorario',
            type:'POST',
            async:false,
            data:{tipo_horario:tipoHorario},
            cache: false
        };
        var dataAdapter = new $.jqx.dataAdapter(source);
        // Create a jqxListBox
        $("#lstPerfilesLaboralesDisponibles").jqxListBox({width: 500, source: dataAdapter, displayMember:'perfil_laboral',valueMember:'id_perfillaboral',checkboxes: true, height: 600});

        // Check several items.
        $("#lstPerfilesLaboralesDisponibles").off();
        $("#lstPerfilesLaboralesDisponibles").jqxListBox('checkAll');
        $("#lstPerfilesLaboralesDisponibles").off();

        $("#lstPerfilesLaboralesDisponibles").on('checkChange', function (event) {

            var items = $("#lstPerfilesLaboralesDisponibles").jqxListBox('getCheckedItems');
            $("#calendar").html("");
            var arrHorariosRegistradosAux = [];
            var arrHorariosRegistrados = [];
            var contadorPerfiles = 0;
            $.each(items, function (index) {
                contadorPerfiles++;
                arrHorariosRegistradosAux = obtenerTodosHorariosRegistradosEnCalendarioPorPerfil(this.value,$("#lstTiposDeHorario").val(),false,fechaIni,fechaFin,contadorPerfiles);
                arrHorariosRegistrados = $.merge(arrHorariosRegistrados, arrHorariosRegistradosAux);
            });
            iniciarCalendarioLaboralPorTipoHorario(5,$("#lstTiposDeHorario").val(),arrHorariosRegistrados,defaultGestion,defaultMes,defaultDia);
        });
    } else{
        $("#lstPerfilesLaboralesDisponibles").jqxListBox('render');
    }
    return ok;
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