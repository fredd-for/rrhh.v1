/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  23-12-2014
 */
/**
 * Función para cargar el listado de tipos de acumulación para los horarios.
 * @param tipoAcumulacionPrefijada
 */
function cargarTiposDeAcumulacion(tipoAcumulacionPrefijada,sufijoEditar){
    var selected="";
    $("#lstTipoAcumulacion"+sufijoEditar).html("");
    $.ajax({
        url:'/tolerancias/listtiposacumulaciones/',
        type:'POST',
        datatype: 'json',
        async:false,
        success: function(data) {  //alert(data);
            var res = jQuery.parseJSON(data);
            if(res.length>0){
                $("#lstTipoAcumulacion"+sufijoEditar).append("<option value='0'>Seleccionar..</option>");
                $.each( res, function( key, val ) {
                    if(tipoAcumulacionPrefijada==val.tipo_acumulacion){
                        selected="selected";
                    }else selected="";
                    $("#lstTipoAcumulacion"+sufijoEditar).append("<option value='"+val.tipo_acumulacion+"' "+selected+">"+val.tipo_acumulacion_descripcion+"</option>");
                });
            }
        }, //mostramos el error
        error: function() { alert('Se ha producido un error Inesperado'); }
    });
}
/**
 * Función para cargar el listado de opciones para la consideración de la tolerancia al retraso.
 * @param consideracionEnRetrasoPrefijada
 */
function cargarOpcionesDeConsideracionEnRetraso(consideracionEnRetrasoPrefijada,sufijoEditar){
    var selected="";
    $("#lstConsideracionRetraso"+sufijoEditar).html("");
    $.ajax({
        url:'/tolerancias/listconsideracionretraso/',
        type:'POST',
        datatype: 'json',
        async:false,
        success: function(data) {  //alert(data);
            var res = jQuery.parseJSON(data);
            if(res.length>0){
                $("#lstConsideracionRetraso"+sufijoEditar).append("<option value='0'>Seleccionar..</option>");
                $.each( res, function( key, val ) {
                    if(consideracionEnRetrasoPrefijada==val.consideracion_retraso){
                        selected="selected";
                    }else selected="";
                    $("#lstConsideracionRetraso"+sufijoEditar).append("<option value='"+val.consideracion_retraso+"' "+selected+">"+val.consideracion_retraso_descripcion+"</option>");
                });
            }
        }, //mostramos el error
        error: function() { alert('Se ha producido un error Inesperado'); }
    });
}
/**
 * Formulario para la validación de lo datos enviados para el registro de tolerancias en horarios laborales.
 * @author JLM
 * @returns {boolean}
 */
function validaFormularioTolerancia() {
    var ok = true;
    var msje = "";
    $(".msjs-alert").hide();
    var idTolerancia = $("#hdnIdToleranciaEditar").val();
    var sufijoEditar="";
    if(idTolerancia>0){
        sufijoEditar="Editar";
    }
    limpiarMensajesErrorPorValidacionTolerancia(sufijoEditar);
    var enfoque = null;

    var tolerancia = $("#txtTolerancia"+sufijoEditar).val();
    var tipoAcumulacion = $("#lstTipoAcumulacion"+sufijoEditar).val();
    var consideracionRetraso = $("#lstConsideracionRetraso"+sufijoEditar).val();
    var fechaIni = $("#txtFechaIni"+sufijoEditar).val();
    var fechaFin = $("#txtFechaFin"+sufijoEditar).val();

    var divTolerancia = $("#divTolerancia"+sufijoEditar);
    var helpErrorTolerancia = $("#helpErrorTolerancia"+sufijoEditar);
    var txtTolerancia = $("#txtTolerancia"+sufijoEditar);

    var divTipoAcumulacion=$("#divTipoAcumulacion"+sufijoEditar);
    var helpErrorTipoAcumulacion=$("#helpErrorTipoAcumulacion"+sufijoEditar);
    var lstTipoAcumulacion = $("#lstTipoAcumulacion"+sufijoEditar);

    var divConsideracionRetraso=$("#divConsideracionRetraso"+sufijoEditar);
    var helpErrorConsideracionRetraso=$("#helpErrorConsideracionRetraso"+sufijoEditar);
    var lstConsideracionRetraso = $("#lstConsideracionRetraso"+sufijoEditar);

    var divFechaIni=$("#divFechaIni"+sufijoEditar);
    var helpErrorFechaIni=$("#helpErrorFechaIni"+sufijoEditar);
    var txtFechaIni = $("#txtFechaIni"+sufijoEditar);

    var divFechaFin=$("#divFechaFin"+sufijoEditar);
    var helpErrorFechaFin=$("#helpErrorFechaFin"+sufijoEditar);
    var txtFechaFin = $("#txtFechaFin"+sufijoEditar);

    if (tolerancia == '') {
        ok = false;
        var msje = "Debe introducir los minutos de tolerancia necesariamente.";
        divTolerancia.addClass("has-error");
        helpErrorTolerancia.html(msje);
        if (enfoque == null)enfoque = txtTolerancia;
    }
    if(tipoAcumulacion==''){
        ok = false;
        var msje = "Debe seleccionar el tipo de acumulaci&oacute;n necesariamente.";
        divTipoAcumulacion.addClass("has-error");
        helpErrorTipoAcumulacion.html(msje);
        if (enfoque == null)enfoque = lstTipoAcumulacion;
    }
    if(consideracionRetraso==''){
        ok = false;
        var msje = "Debe seleccionar la consideraci&oacute;n de la tolerancia dentro del retraso.";
        divConsideracionRetraso.addClass("has-error");
        helpErrorConsideracionRetraso.html(msje);
        if (enfoque == null)enfoque = lstConsideracionRetraso;
    }
    if(fechaIni==''){
        ok = false;
        var msje = "Debe introducir la fecha de inicio de aplicaci&oacute;n de la tolerancia.";
        divFechaIni.addClass("has-error");
        helpErrorFechaIni.html(msje);
        if (enfoque == null)enfoque = txtFechaIni;
    }
    if (enfoque != null) {
        enfoque.focus();
    }
    return ok;
}
/**
 * Función para la limpieza de los mensajes de error debido a la validación del formulario para registro de tolerancia en el horario.
 * @sufijoEditar Variable que define la limpieza de variables para el caso de nuevo y edición.
 */
function limpiarMensajesErrorPorValidacionTolerancia(sufijoEditar) {
    $("#divTolerancia"+sufijoEditar).removeClass("has-error");
    $("#helpErrorTolerancia"+sufijoEditar).html("");
    $("#divAcumulacion"+sufijoEditar).removeClass("has-error");
    $("#helpErrorAcumulacion"+sufijoEditar).html("");
    $("#divConsideracionRetraso"+sufijoEditar).removeClass("has-error");
    $("#helpErrorConsideracionRetraso"+sufijoEditar).html("");
    $("#divFechaIni"+sufijoEditar).removeClass("has-error");
    $("#helpErrorFechaIni"+sufijoEditar).html("");
}
/**
 * Función para guardar el registro de la tolerancia.
 * @param idHorario Identificador del horario.
 * @returns {boolean}
 */
function guardaTolerancia(){
    var ok = true;
    var idTolerancia = $("#hdnIdToleranciaEditar").val();
    var sufijoEditar = "";
    if(idTolerancia>0)
    {
        sufijoEditar="Editar";
    }
    var tolerancia = $("#txtTolerancia"+sufijoEditar).val();
    var tipoAcumulacion = $("#lstTipoAcumulacion"+sufijoEditar).val();
    var consideracionRetraso = $("#lstConsideracionRetraso"+sufijoEditar).val();
    var descripcion = $("#txtDescripcion"+sufijoEditar).val();
    var fechaIni = $("#txtFechaIni"+sufijoEditar).val();
    var fechaFin = $("#txtFechaFin"+sufijoEditar).val();
    var observacion = $("#txtObservacion"+sufijoEditar).val();
    if (tolerancia != '') {
        $.ajax({
            url: '/tolerancias/save/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {
                id: idTolerancia,
                tolerancia:tolerancia,
                tipo_acumulacion:tipoAcumulacion,
                consideracion_retraso:consideracionRetraso,
                descripcion:descripcion,
                fecha_ini: fechaIni,
                fecha_fin:fechaFin,
                observacion: observacion
            },
            success: function (data) {  //alert(data);
                var res = jQuery.parseJSON(data);
                /**
                 * Si se ha realizado correctamente el registro de la tolerancia
                 */
                $(".msjes").hide();
                if (res.result == 1) {
                    ok = true;
                    $("#divMsjePorSuccess").html("");
                    $("#divMsjePorSuccess").append(res.msj);
                    $("#divMsjeNotificacionSuccess").jqxNotification("open");
                    $("#jqxgridtolerancias").jqxGrid("updatebounddata");
                } else if (res.result == 0) {
                    /**
                     * En caso de presentarse un error subsanable
                     */
                    $("#divMsjePorWarning").html("");
                    $("#divMsjePorWarning").append(res.msj);
                    $("#divMsjeNotificacionWarning").jqxNotification("open");
                } else {
                    /**
                     * En caso de haberse presentado un error crítico al momento de registrarse la tolerancia
                     */
                    $("#divMsjePorError").html("");
                    $("#divMsjePorError").append(res.msj);
                    $("#divMsjeNotificacionError").jqxNotification("open");
                }

            }, //mostramos el error
            error: function () {
                $("#divMsjePorError").html("");
                $("#divMsjePorError").append("Se ha producido un error Inesperado");
                $("#divMsjeNotificacionError").jqxNotification("open");
            }
        });
    }
    return ok;
}
/**
 * Función para limpiar los campos correspondientes para el registro de una nueva toleracia para horarios.
 */
function inicializarCamposParaNuevoRegistroTolerancia(){
    $("#hdnIdToleranciaEditar").val(0);
    $("#txtTolerancia").val("");
    $("#txtDescripcion").val("");
    $("#txtObservacion").val("");
}