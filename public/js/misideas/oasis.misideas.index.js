/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  03-11-2015
 */
$().ready(function () {

    $('#divTabIdeas').jqxTabs('theme', 'oasis');
    $('#divTabIdeas').jqxTabs('enableAt', 0);
    $('#divTabIdeas').jqxTabs('disableAt', 1);
    $('#divTabIdeas').jqxTabs('disableAt', 2);
    $('#divTabIdeas').jqxTabs('disableAt', 3);

    $('#tabFichaPersonalIdeas').jqxTabs({
        theme: 'oasis',
        width: '100%',
        position: 'top'
    });
    $('#tabFichaPersonalIdeas').jqxTabs({selectedItem: 0});
    var dataRecordMain = getOneRelaboralById($("#hdnIdRelaboralUsuario").val());
    cargarDatosIdeas(dataRecordMain);

    $("#liIdeas").on("click",function () {
        $('#divTabIdeas').jqxTabs('enableAt', 0);
        $('#divTabIdeas').jqxTabs('disableAt', 1);
        $('#divTabIdeas').jqxTabs('disableAt', 2);
        $('#divTabIdeas').jqxTabs('disableAt', 3);

        $('#divTabIdeas').jqxTabs({selectedItem: 0});
    });
    /**
     * Control del evento de solicitud de guardar el registro de la Idea de Negocio.
     */
    $("#btnGuardarIdeaNew").on("click",function () {
        var ok = validaFormularioMisIdeas(1)
        if (ok) {
            var okk = guardaMisIdeas(1);
            if (okk) {
                $('#divTabIdeas').jqxTabs('enableAt', 0);
                $('#divTabIdeas').jqxTabs('disableAt', 1);
                $('#divTabIdeas').jqxTabs('disableAt', 2);
                $('#divTabIdeas').jqxTabs('disableAt', 3);
                $('#divTabIdeas').jqxTabs({selectedItem: 0});
            }
        }
    });
    /**
     * Control del evento de solicitud de guardar la modificación del registro de Idea de Negocio.
     */
    $("#btnGuardarIdeaEdit").on("click",function () {
        var ok = validaFormularioMisIdeas(2);
        if (ok) {
            var okk = guardaMisIdeas(2);
            if (okk) {
                $('#divTabIdeas').jqxTabs('enableAt', 0);
                $('#divTabIdeas').jqxTabs('disableAt', 1);
                $('#divTabIdeas').jqxTabs('disableAt', 2);
                $('#divTabIdeas').jqxTabs('disableAt', 3);
                $('#divTabIdeas').jqxTabs({selectedItem: 0});
            }
        }
    });
    $("#btnCancelarIdeaNew,#btnCancelarIdeaEdit,#btnCancelarIdeaView,#btnVolverAlListadoPrincipalDesdeEdit,#btnVolverAlListadoPrincipalDesdeNew,#btnVolverAlListadoPrincipalDesdeView").click(function () {
        $('#divTabIdeas').jqxTabs('enableAt', 0);
        $('#divTabIdeas').jqxTabs('disableAt', 1);
        $('#divTabIdeas').jqxTabs('disableAt', 2);
        $('#divTabIdeas').jqxTabs('disableAt', 3);
        $('#divTabIdeas').jqxTabs({selectedItem: 0});
    });

    $("#btnExportarExcel").click(function () {
        var items = $("#jqxlistbox").jqxListBox('getCheckedItems');
        var numColumnas = 0;
        $.each(items, function (index, value) {
            numColumnas++;
        });
        if (numColumnas > 0) exportarReporte(1);
        else {
            alert("Debe seleccionar al menos una columna para la obtención del reporte solicitado.");
            $("#jqxlistbox").focus();
        }
    });
    $("#btnExportarPDF").click(function () {
        var items = $("#jqxlistbox").jqxListBox('getCheckedItems');
        var numColumnas = 0;
        $.each(items, function (index, value) {
            numColumnas++;
        });
        if (numColumnas > 0) exportarReporte(2);
        else {
            alert("Debe seleccionar al menos una columna para la obtención del reporte solicitado.");
            $("#jqxlistbox").focus();
        }
    });
    $("#chkAllCols").click(function () {
        if (this.checked == true) {
            $("#jqxlistbox").jqxListBox('checkAll');
        } else {
            $("#jqxlistbox").jqxListBox('uncheckAll');
        }
    });
    $("#btnImprimirCalendarioLaboralAndExcept").on("click",function(){
        var opciones = {mode:"popup",popClose: false};
        $("#page-content").printArea(opciones);
    });
    /**
     * Control sobre el uso o no de a.i. en el cargo para movilidad de personal.
     */
    $("#chkAi").on("click", function () {
        var cargo = $("#txtCargoMovilidad").val();
        var sw = 0;
        if (jQuery.type(cargo) == "object") {
            cargo = String(cargo.label);
        }
        cargo = cargo + '';
        if (cargo != null && cargo != '') {
            if (this.checked == true) {
                var n = cargo.indexOf("a.i.");
                if (n < 0) {
                    cargo = cargo + " a.i.";
                    $('#txtCargoMovilidad').val(cargo);
                    //$('#txtCargoMovilidad').jqxInput('val', {label: cargo, value: cargo});
                }
            } else {
                var n = cargo.indexOf("a.i.");
                if (n > 0) {
                    cargo = cargo.replace("a.i.", "").trim();
                    $('#txtCargoMovilidad').val(cargo);
                    //$('#txtCargoMovilidad').jqxInput('val', {label: cargo, value: cargo});
                }
            }
        }
    });
    $(".iGestion").on("click",function(){
        var titulo = "Gesti&oacute;n";
        var cuerpo = "La gesti&oacute;n o a&ntilde;o al cual corresponde la publicaci&oacute;n de la idea de negocio.";
        var alerta = "Dato requerido obligatoriamente.";
        despliegaModalInfografia(titulo,cuerpo,alerta);
    });
    $(".iMes").on("click",function(){
        var titulo = "Mes";
        var cuerpo = "El mes al cual corresponde la publicaci&oacute;n de la idea de negocio.";
        var alerta = "Dato requerido obligatoriamente.";
        despliegaModalInfografia(titulo,cuerpo,alerta);
    });
    $(".iTiposDeNegocio").on("click",function(){
        var titulo = "Tipo de Negocio";
        var cuerpo = "El tipo de negocio al cual corresponde la idea de negocio.";
        var alerta = "Dato requerido obligatoriamente.";
        despliegaModalInfografia(titulo,cuerpo,alerta);
    });

    $(".iTitulo").on("click",function(){
        var titulo = "T&iacute;tulo";
        var cuerpo = "Denominaci&oacute;n global de la idea de negocio.";
        var alerta = "Dato requerido obligatoriamente.";
        despliegaModalInfografia(titulo,cuerpo,alerta);
    });
    $(".iResumen").on("click",function(){
        var titulo = "Resumen";
        var cuerpo = "Resumen del Planteamiento de la idea de negocio.";
        var alerta = "Dato requerido obligatoriamente.";
        despliegaModalInfografia(titulo,cuerpo,alerta);
    });
    $(".iPlanteamiento").on("click",function(){
        var titulo = "Planteamiento";
        var cuerpo = "Detalle explicativo de la idea de negocio.";
        var alerta = "Dato requerido obligatoriamente.";
        despliegaModalInfografia(titulo,cuerpo,alerta);
    });
    $(".iObservacion").on("click",function(){
        var titulo = "Observaci&oacute;n";
        var cuerpo = "Observaci&oacute;n sobre la idea de negocio.";
        var alerta = "";
        despliegaModalInfografia(titulo,cuerpo,alerta);
    });
    $('#btnDesfiltrartodo').click(function () {
        $("#divGridRelaborales").jqxGrid('clearfilters');
    });
    $('#btnDesfiltrarTodoMovilidad').click(function () {
        $("#divGridRelaboralesmovilidad").jqxGrid('clearfilters');
    });
    $('#btnDesagrupartodo').click(function () {
        $('#divGridRelaborales').jqxGrid('cleargroups');
    });
    $('#btnDesagruparTodoMovilidad').click(function () {
        $('#divGridRelaboralesmovilidad').jqxGrid('cleargroups');
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
    $("#divMsjeNotificacionError").jqxNotification({
        width: '100%', position: "bottom-right", opacity: 0.9,
        autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 14000, template: "error"
    });

    $("#divMsjeNotificacionWarning").jqxNotification({
        width: '100%', position: "bottom-right", opacity: 0.9,
        autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 14000, template: "warning"
    });
    $("#divMsjeNotificacionSuccess").jqxNotification({
        width: '100%', position: "bottom-right", opacity: 0.9,
        autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 14000, template: "success"
    });

    $(document).keypress(OperaEvento);
    $(document).keyup(OperaEvento);
});
/*
 * Función para controlar la ejecución del evento esc con el teclado.
 */
function OperaEvento(evento) {
    if ((evento.type == "keyup" || evento.type == "keydown") && evento.which == "27") {
        $('#tabIdeas').jqxTabs('enableAt', 0);
        $('#tabIdeas').jqxTabs('disableAt', 1);
        $('#tabIdeas').jqxTabs('disableAt', 2);
        $('#tabIdeas').jqxTabs({selectedItem: 0});

        $("#popupWindowCargo").jqxWindow('close');
        $("#popupWindowNuevaMovilidad").jqxWindow('close');
        $("#lstTipoMemorandum").off();
        $('#divGridRelaborales').jqxGrid('focus');
    }
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
/**
 *
 * Función para la obtención de la ruta en la cual reside la fotografía correspondiente de la persona.
 * @param numDocumento Número de documento, comunmente el número de CI.
 * @param numComplemento Número de complemento.
 * @returns {string} Ruta de ubicación de la fotografía a mostrarse.
 */
function obtenerRutaFoto(numDocumento, numComplemento) {
    var resultado = "/images/perfil-profesional.jpg";
    if (numDocumento != "") {
        $.ajax({
            url: '/relaborales/obtenerrutafoto/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {ci: numDocumento, num_complemento: numComplemento},
            success: function (data) {
                var res = jQuery.parseJSON(data);
                if (res.result == 1) {
                    resultado = res.ruta;
                }
            }, //mostramos el error
            error: function () {
                alert('Se ha producido un error Inesperado');
            }
        });
    }
    return resultado;
}
/**
 * Función para obtener la fecha de este día
 * @param separador
 * @returns {*}
 * @author JLM
 */
function fechaHoy(separador, format) {
    if (separador == '')separador = "-";
    var fullDate = new Date()
    var dia = fullDate.getDate().toString();
    var mes = (fullDate.getMonth() + 1).toString();
    var twoDigitDay = (dia.length === 1 ) ? '0' + dia : dia;
    var twoDigitMonth = (mes.length === 1 ) ? '0' + mes : mes;
    if (format == "dd-mm-yyyy")
        var currentDate = twoDigitDay + separador + twoDigitMonth + separador + fullDate.getFullYear();
    else if (format == "mm-dd-yyyy") {
        var currentDate = twoDigitMonth + separador + twoDigitDay + separador + fullDate.getFullYear();
    } else {
        var currentDate = fullDate;
    }
    return currentDate;
}
/**
 * Función anónima para la aplicación de clases a celdas en particular dentro de las grillas.
 * @param row
 * @param columnfield
 * @param value
 * @returns {string}
 * @author JLM
 */
var cellclass = function (row, columnfield, value) {
    if (value == 'CONCLUIDO') {
        return 'verde';
    }
    else if (value == 'EN ELABORACION'||value == 'EN ELABORACI&Oacute;N') {
        return 'amarillo';
    }
    else if (value == 'PASIVO') {
        return 'rojo';
    }
    else return ''
}
/**
 * Función para la obtención del listado de horarios laborales registrados en el calendario laboral para un determinado registro de relación laboral.
 * @param idRelaboral
 * @param tipoHorario
 * @param editable
 * @param fechaIni
 * @param fechaFin
 * @param contadorPerfiles
 * @returns {Array}
 */
function obtenerTodosHorariosRegistradosEnCalendarioRelaboralParaVerAsignaciones(idRelaboral,idPerfilLaboral,tipoHorario,editable,fechaIni,fechaFin,contadorPerfiles){

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
        url: '/calendariolaboral/listallregisteredbyrelaboralmixto',
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
 * Función para verificar la existencia de una imagen
 * @param url
 * @returns {boolean}
 * @constructor
 */
function ImageExist(url)
{
    var img = new Image();
    img.src = url;
    return img.height != 0;
}
/**
 * Función para la obtención de la fecha enviada como parámetro en formato dd-mm-yyyy
 * @param fecha
 * @returns {string}
 */
function fechaConvertirAFormato(fecha,separador){
    if(separador==''||separador==undefined)separador='-';
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
 * Función para iniciar el calendario laboral de acuerdo al registro de relación laboral, turnos, excepciones y rango de fechas seleccionado.
 * Se despliega la totalidad de horarios para el registro de relación laboral por lo que se muestran los botones de navegación del calendario.
 * @param idRelaboral
 * @param accion
 * @param tipoHorario
 * @param arrHorariosRegistrados
 * @param defaultGestion
 * @param defaultMes
 * @param defaultDia
 * @returns {Array}
 */
function iniciarCalendarioLaboralPorRelaboralTurnosAndExcepcionesParaVerAsignacionesPersonales(dataRecord,idRelaboral,accion,idPerfilLaboral,tipoHorario,arrHorariosRegistrados,defaultGestion,defaultMes,defaultDia) {
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

        }
        ,
        /*dayRender: function (date, cell) {},*/
        viewRender: function(view) {

            switch (view.name){
                case "month":
                    {   removerColumnaSumaTotales();
                        agregarColumnaSumaTotales(diasSemana);
                        var primeraFechaCalendario = "";
                        var segundaFechaCalendario = "";
                        arrFechasPorSemana= [];
                        var gestionInicial= 0;
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
                                    gestionInicial = arrFecha[0];
                                    switch (contP){
                                        case 1:{
                                            if(primeraFechaCalendario=="")primeraFechaCalendario = fecha;
                                            arrFechasPorSemana.push( {semana:1,fecha:fecha});}
                                            break;
                                        case 2:arrFechasPorSemana.push( {semana:2,fecha:fecha});break;
                                        case 3:arrFechasPorSemana.push( {semana:3,fecha:fecha});break;
                                        case 4:arrFechasPorSemana.push( {semana:4,fecha:fecha});break;
                                        case 5:arrFechasPorSemana.push( {semana:5,fecha:fecha});break;
                                        case 6:{
                                            segundaFechaCalendario = fecha;
                                            arrFechasPorSemana.push( {semana:6,fecha:fecha});
                                        }break;
                                    }
                                    var check = fechaAux;
                                    var today = $.fullCalendar.formatDate(new Date(),'yyyy-MM-dd');
                                    if (check < today) {
                                        $(this).css("background-color", "silver");
                                    }
                                }
                            });
                        });

                        var fechaInicialCalendario = "";
                        var fechaFinalCalendario = "";
                        var moment = $('#calendar').fullCalendar('getDate');
                        fechaInicialCalendario = fechaConvertirAFormato(moment,'-');
                        var arrFechaInicial = fechaInicialCalendario.split("-");
                        fechaInicialCalendario = "01-"+arrFechaInicial[1]+"-"+arrFechaInicial[2];
                        fechaFinalCalendario =  obtenerUltimoDiaMes(fechaInicialCalendario);
                        $("#hdnFechaInicialCalendario").val(fechaInicialCalendario);
                        $("#hdnFechaFinalCalendario").val(fechaFinalCalendario);
                        cargarGrillaAsignacionIndividualFechasUbicacionEstacion(idPerfilLaboral,idRelaboral,primeraFechaCalendario,segundaFechaCalendario);
                        cargarExcepcionesEnCalendario(dataRecord,view.name,diasSemana,primeraFechaCalendario,segundaFechaCalendario);
                        /**
                         * Asignación de horarios por mes, inicialmente se borra todos los eventos registrados
                         * a objeto de no repetir su renderización
                         */
                        $("#calendar").fullCalendar( 'removeEvents');
                        var arrHorariosRegistradosEnMes = obtenerTodosHorariosRegistradosEnCalendarioRelaboralParaVerAsignaciones(idRelaboral,0,tipoHorario,false,primeraFechaCalendario,segundaFechaCalendario,0);
                        $("#calendar").fullCalendar('addEventSource', arrHorariosRegistradosEnMes);

                        var arrFeriados = obtenerFeriadosRangoFechas(0,0,gestionInicial,primeraFechaCalendario,segundaFechaCalendario);
                        $.each(arrDias,function(k,dia){
                            contP=0;
                            $("td.fc-"+dia).map(function (index, elem) {
                                contP++;
                                var fechaCalAux = $(this).data("date");
                                var fechaCal = $(this).data("date");
                                var fechaIni = "";
                                var fechaFin = "";
                                var celda = $(this);
                                $.each(arrFeriados,function(key,val){

                                    fechaIni  = val.fecha_ini;
                                    fechaFin  = val.fecha_fin;
                                    var sep="-";
                                    if (procesaTextoAFecha(fechaCal,"-")<=procesaTextoAFecha(fechaFin,"-") && procesaTextoAFecha(fechaCal,"-") >= procesaTextoAFecha(fechaIni,"-")) {
                                        celda.css("background-color", "orange");
                                        var elem = $(".fc-day-content");
                                        celda.append("</br>");
                                        celda.append("(f)"+val.feriado);
                                        celda.append("</br>");
                                        celda.append(val.descripcion);
                                    }
                                });
                            });
                        });
                        sumarTotalHorasPorSemana(arrFechasPorSemana);
                    }
                    break;
                case "agendaWeek":
                    fechaInicialCalendario = $('#calendar').fullCalendar('getView').start;
                    fechaInicialCalendario = fechaConvertirAFormato(fechaInicialCalendario,"-");
                    fechaFinalCalendario = obtenerFechaMasDias(fechaInicialCalendario,diasSemana-1);
                    $("#hdnFechaInicialCalendario").val(fechaInicialCalendario);
                    $("#hdnFechaFinalCalendario").val(fechaFinalCalendario);
                    cargarGrillaAsignacionIndividualFechasUbicacionEstacion(idPerfilLaboral,idRelaboral,fechaInicialCalendario,fechaFinalCalendario);
                    break;
                case "agendaDay":
                    var moment = $('#calendar').fullCalendar('getDate');
                    var fechaInicialCalendario = fechaConvertirAFormato(moment,'-');
                    fechaFinalCalendario = fechaInicialCalendario;
                    $("#hdnFechaInicialCalendario").val(fechaInicialCalendario);
                    $("#hdnFechaFinalCalendario").val(fechaFinalCalendario);
                    cargarGrillaAsignacionIndividualFechasUbicacionEstacion(idPerfilLaboral,idRelaboral,fechaInicialCalendario,fechaFinalCalendario);
                    break;
            }
        }
    });
    return arrFechasPorSemana;
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
 * Función para la carga de la grilla de asignación individual para un registro de relación laboral, un perfil y una rango de fechas.
 * @param idPerfilLaboral
 * @param dataRecord
 */
function cargarGrillaAsignacionIndividualFechasUbicacionEstacion(idPerfilLaboral,idRelaboral,fechaIni,fechaFin){
    if(idRelaboral>0&&fechaIni!=""&&fechaFin!=""){
        $("#tbody_asignacion_single").html("");
        $.ajax({
            url: '/calendariolaboral/listallregisteredbyrelaboral',
            type: 'POST',
            datatype: 'json',
            async: false,
            cache: false,
            data: {id:idRelaboral,id_perfillaboral:idPerfilLaboral,fecha_ini:fechaIni,fecha_fin:fechaFin},
            success: function (data) {
                var res = jQuery.parseJSON(data);
                var contador = 1;
                if (res.length > 0) {
                    $.each(res, function (key, val) {
                        var arrFechaIni = val.calendario_fecha_ini.split("-");
                        var fechaIni = arrFechaIni[2]+"-"+arrFechaIni[1]+"-"+arrFechaIni[0];
                        var arrFechaFin = val.calendario_fecha_fin.split("-");
                        var fechaFin = arrFechaFin[2]+"-"+arrFechaFin[1]+"-"+arrFechaFin[0];
                        var estacion = "";
                        if(val.relaboralperfil_estacion!=null)estacion=val.relaboralperfil_estacion;
                        var observacion = "";
                        if(val.relaboralperfil_observacion!=null){
                            observacion = val.relaboralperfil_observacion;
                        }
                        $("#tbody_asignacion_single").append("<tr><td style='text-align: center'>"+contador+"</td><td style='text-align: center'>"+fechaIni+"</td><td style='text-align: center'>"+fechaFin+"</td><td style='text-align: center'>"+val.relaboralperfil_ubicacion+"</td><td style='text-align: center'>"+estacion+"</td><td style='text-align: center'>"+val.hora_entrada+"</td><td style='text-align: center'>"+val.hora_salida+"</td><td>"+observacion+"</td></tr>");
                        contador++;
                    });
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
    /*$("#lstBoxRegistrados").html("");
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
    }*/
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
 * Función para la carga de datos referentes a ideas de una persona en particular, considerando su contrato.
 * @param id_relaboral
 * @param id_persona
 * @param nombres
 * @param ci
 */
function cargarDatosIdeas(dataRecordMain){

    $('#tabFichaPersonalIdeas').jqxTabs({selectedItem: 0});
    $(".ddNombresTurnAndExcept").html(dataRecordMain.nombres+"&nbsp;");
    $(".ddCIAndNumComplementoExpdTurnAndExcept").html(dataRecordMain.ci+" "+dataRecordMain.expd+"&nbsp;");
    $("#ddCargoTurnAndExcept").html(dataRecordMain.cargo+"&nbsp;");
    $("#ddProcesoTurnAndExcept").html(dataRecordMain.proceso_codigo+"&nbsp;");
    $("#ddFinanciamientoTurnAndExcept").html(dataRecordMain.condicion+" (Partida "+dataRecordMain.partida+")");
    $("#ddGerenciaTurnAndExcept").html(dataRecordMain.gerencia_administrativa+"&nbsp;");
    if(dataRecordMain.departamento_administrativo!=""&&dataRecordMain.departamento_administrativo!=null){
        $("#ddDepartamentoTurnAndExcept").show();
        $("#dtDepartamentoTurnAndExcept").show();
        $("#ddDepartamentoTurnAndExcept").html(dataRecordMain.departamento_administrativo+"&nbsp;");
    }
    else {
        $("#dtDepartamentoTurnAndExcept").hide();
        $("#ddDepartamentoTurnAndExcept").hide();
    }
    $("#ddUbicacionTurnAndExcept").html(dataRecordMain.ubicacion+"&nbsp;");

    switch (dataRecordMain.tiene_item) {
        case 1:
            $("#dtItemTurnAndExcept").show();
            $("#ddItemTurnAndExcept").show();
            $("#ddItemTurnAndExcept").html(dataRecordMain.item+"&nbsp;");
            break;
        case 0:
            $("#dtItemTurnAndExcept").hide();
            $("#ddItemTurnAndExcept").hide();
            break;
    }
    $("#ddNivelSalarialTurnAndExcept").html(dataRecordMain.nivelsalarial+"&nbsp;");
    $("#ddHaberTurnAndExcept").html(dataRecordMain.sueldo+"&nbsp;");
    $("#ddFechaIngTurnAndExcept").html(dataRecordMain.fecha_ing+"&nbsp;");
    if(dataRecordMain.fecha_incor!=null){
        $("#dtFechaIncorTurnAndExcept").show();
        $("#ddFechaIncorTurnAndExcept").show();
        $("#ddFechaIncorTurnAndExcept").html(dataRecordMain.fecha_incor+"&nbsp;");
    }else{
        $("#dtFechaIncorTurnAndExcept").hide();
        $("#ddFechaIncorTurnAndExcept").hide();
    }
    $("#ddFechaIniTurnAndExcept").html(dataRecordMain.fecha_ini+"&nbsp;");
    switch (dataRecordMain.tiene_item) {
        case 1:
            $("#dtFechaFinTurnAndExcept").hide();
            $("#ddFechaFinTurnAndExcept").hide();
            break;
        case 0:
            $("#dtFechaFinTurnAndExcept").show();
            $("#ddFechaFinTurnAndExcept").show();
            $("#ddFechaFinTurnAndExcept").html(dataRecordMain.fecha_fin+"&nbsp;");
            break;
    }
    $("#ddEstadoDescripcionTurnAndExcept").html(dataRecordMain.estado_descripcion+"&nbsp;");
    if(dataRecordMain.estado==0){
        $("#dtFechaBajaTurnAndExcept").show();
        $("#ddFechaBajaTurnAndExcept").show();
        $("#ddFechaBajaTurnAndExcept").html(dataRecordMain.fecha_baja+"&nbsp;");
        $("#dtMotivoBajaTurnAndExcept").show();
        $("#ddMotivoBajaTurnAndExcept").show();
        $("#ddMotivoBajaTurnAndExcept").html(dataRecordMain.motivo_baja+"&nbsp;");
    }else{
        $("#dtFechaBajaTurnAndExcept").hide();
        $("#ddFechaBajaTurnAndExcept").hide();
        $("#dtMotivoBajaTurnAndExcept").hide();
        $("#ddMotivoBajaTurnAndExcept").hide();
    }
    /*******************************************************************************************************/

    $('#tabFichaPersonalIdeas').jqxTabs({selectedItem: 0});
    $("#ddNombresTurnAndExcept").html(dataRecordMain.nombres);
    var rutaImagen = obtenerRutaFoto(dataRecordMain.ci, "");
    $("#imgFotoPerfilTurnAndExceptRelaboral").attr("src", rutaImagen);
    $("#imgFotoPerfilContactoPerTurnAndExcept").attr("src", rutaImagen);
    $("#imgFotoPerfilContactoInstTurnAndExcept").attr("src", rutaImagen);
    $("#imgFotoPerfilTurnAndExcept").attr("src", rutaImagen);
    cargarPersonasContactosIdeas(2,dataRecordMain.id_persona);
    $("#hdnIdRelaboralVistaTurnAndExcept").val(dataRecordMain.id_relaboral);
    $("#hdnSwPrimeraVistaHistorialTurnAndExcept").val(0);
    definirGrillaParaListaMisIdeasPorPersona(dataRecordMain);
}
/**
 * Función para mostrar el calendario con las excepciones aprobadas por persona.
 * @param dataRecord
 */
function cargarCalendarioConControlExcepciones(dataRecord,dataRecordAux){
    var idRelaboral = dataRecord.id_relaboral;

    var idPerfilLaboral=0;
    var tipoHorario=3;

    $("#spanPrefijoCalendarioLaboral").html("");
    $("#spanSufijoCalendarioLaboral").html(" Vrs. Calendario de Excepciones (Individual)");
    var date = new Date();
    var defaultDia = date.getDate();
    var defaultMes = date.getMonth();
    var defaultGestion = date.getFullYear();
    var fechaIni = "";
    var fechaFin = "";
    var contadorPerfiles = 0;
    //var arrHorariosRegistrados = obtenerTodosHorariosRegistradosEnCalendarioRelaboralParaVerAsignaciones(dataRecord.id_relaboral,idPerfilLaboral,tipoHorario,false,fechaIni,fechaFin,contadorPerfiles);
    var arrHorariosRegistrados = [];
    $("#calendar").html("");
    var arrFechasPorSemana = iniciarCalendarioLaboralPorRelaboralTurnosAndExcepcionesParaVerAsignacionesPersonales(dataRecord,dataRecord.id_relaboral,5,idPerfilLaboral,tipoHorario,arrHorariosRegistrados,defaultGestion,defaultMes,defaultDia);
    sumarTotalHorasPorSemana(arrFechasPorSemana);
    $('#tabfichapersonalIdeas').jqxTabs({selectedItem: 0});
    $(".ddNombresTurnAndExcept").html(dataRecord.nombres+"&nbsp;");
    $(".ddCIAndNumComplementoExpdTurnAndExcept").html(dataRecord.ci+dataRecord.num_complemento+" "+dataRecord.expd+"&nbsp;");
    $("#ddCargoTurnAndExcept").html(dataRecord.cargo+"&nbsp;");
    $("#ddProcesoTurnAndExcept").html(dataRecord.proceso_codigo+"&nbsp;");
    $("#ddFinanciamientoTurnAndExcept").html(dataRecord.condicion+" (Partida "+dataRecord.partida+")");
    $("#ddGerenciaTurnAndExcept").html(dataRecord.gerencia_administrativa+"&nbsp;");
    if(dataRecord.departamento_administrativo!=""&&dataRecord.departamento_administrativo!=null){
    $("#ddDepartamentoTurnAndExcept").show();
    $("#dtDepartamentoTurnAndExcept").show();
    $("#ddDepartamentoTurnAndExcept").html(dataRecord.departamento_administrativo+"&nbsp;");
    }
    else {
    $("#dtDepartamentoTurnAndExcept").hide();
    $("#ddDepartamentoTurnAndExcept").hide();
    }
    $("#ddUbicacionTurnAndExcept").html(dataRecord.ubicacion+"&nbsp;");

    switch (dataRecord.tiene_item) {
    case 1:
    $("#dtItemTurnAndExcept").show();
    $("#ddItemTurnAndExcept").show();
    $("#ddItemTurnAndExcept").html(dataRecord.item+"&nbsp;");
    break;
    case 0:
    $("#dtItemTurnAndExcept").hide();
    $("#ddItemTurnAndExcept").hide();
    break;
    }
    $("#ddNivelSalarialTurnAndExcept").html(dataRecord.nivelsalarial+"&nbsp;");
    $("#ddHaberTurnAndExcept").html(dataRecord.sueldo+"&nbsp;");
    $("#ddFechaIngTurnAndExcept").html(fechaConvertirAFormato(dataRecord.fecha_ing,"-")+"&nbsp;");
    if(dataRecord.fecha_incor!=null){
    var fechaIncor = fechaConvertirAFormato(dataRecord.fecha_incor,"-");
    $("#dtFechaIncorTurnAndExcept").show();
    $("#ddFechaIncorTurnAndExcept").show();
    $("#ddFechaIncorTurnAndExcept").html(fechaIncor+"&nbsp;");
    }else{
    $("#dtFechaIncorTurnAndExcept").hide();
    $("#ddFechaIncorTurnAndExcept").hide();
    }
    $("#ddFechaIniTurnAndExcept").html(fechaConvertirAFormato(dataRecord.fecha_ini,"-")+"&nbsp;");
    switch (dataRecord.tiene_item) {
    case 1:
    $("#dtFechaFinTurnAndExcept").hide();
    $("#ddFechaFinTurnAndExcept").hide();
    break;
    case 0:
    $("#dtFechaFinTurnAndExcept").show();
    $("#ddFechaFinTurnAndExcept").show();
    $("#ddFechaFinTurnAndExcept").html(fechaConvertirAFormato(dataRecord.fecha_fin,"-")+"&nbsp;");
    break;
    }
    $("#ddEstadoDescripcionTurnAndExcept").html(dataRecord.estado_descripcion+"&nbsp;");
    if(dataRecord.estado==0){
    $("#dtFechaBajaTurnAndExcept").show();
    $("#ddFechaBajaTurnAndExcept").show();
    $("#ddFechaBajaTurnAndExcept").html(fechaConvertirAFormato(dataRecord.fecha_baja,"-")+"&nbsp;");
    $("#dtMotivoBajaTurnAndExcept").show();
    $("#ddMotivoBajaTurnAndExcept").show();
    $("#ddMotivoBajaTurnAndExcept").html(fechaConvertirAFormato(dataRecord.motivo_baja,"-")+"&nbsp;");
    }else{
    $("#dtFechaBajaTurnAndExcept").hide();
    $("#ddFechaBajaTurnAndExcept").hide();
    $("#dtMotivoBajaTurnAndExcept").hide();
    $("#ddMotivoBajaTurnAndExcept").hide();
    }

    $("#ddNombresTurnAndExcept").html(dataRecord.nombres);
    var rutaImagen = obtenerRutaFoto(dataRecord.ci, dataRecord.num_complemento);
    $("#imgFotoPerfilTurnAndExceptRelaboral").attr("src", rutaImagen);
    $("#imgFotoPerfilContactoPerTurnAndExcept").attr("src", rutaImagen);
    $("#imgFotoPerfilContactoInstTurnAndExcept").attr("src", rutaImagen);
    $("#imgFotoPerfilTurnAndExcept").attr("src", rutaImagen);
    cargarPersonasContactosIdeas(2,dataRecord.id_persona);
}

/**
 * Función para la obtención de los datos correspondientes al registro de una relación laboral.
 * @param idRelaboral
 */
function getOneRelaboralById(idRelaboral){
    var arrPersonal = [];
    if(idRelaboral>0){
        var source = [];
        $.ajax({
            url: '/relaborales/getonerelaboral/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data:{id:idRelaboral},
            success: function (data) {
                var res = jQuery.parseJSON(data);
                if(res.length>0){
                    arrPersonal = res[0];
                }
            }
        });
        return arrPersonal;
    }
}
/**
 * Función para la definición y despliegue de mensaje infográfico.
 * @param titulo
 * @param cuerpo
 * @param alerta
 */
function despliegaModalInfografia(titulo,cuerpo,alerta){
    $("#h4Title").html(titulo);
    var body = "<p>"+cuerpo+"</p>";
    if(alerta!=''){
        body += "<p class='text-warning'><small>Dato requerido obligatoriamente.</small></p>";
    }
    $("#divModalBody").html(body);
    $("#divModalInfografia").modal('show');
}