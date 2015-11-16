/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  23-02-2015
 */
/**
 * Formulario para la validación de lo datos enviados para el registro de feriados.
 * @param opcion Valor que referencia el tipo de formulario a validar (Nuevo o de Edición)
 * @author JLM
 * @returns {boolean}
 */
function validaFormularioFeriado(opcion) {
    var ok = true;
    var msje = "";
    $(".msjs-alert").hide();
    var sufijo="New";
    if(opcion==2){
        sufijo="Editar";
    }
    limpiarMensajesErrorPorValidacionFeriado(sufijo);
    var enfoque = null;

    var feriado = $("#txtFeriado"+sufijo).val();
    var divFeriado=$("#divFeriado"+sufijo);
    var helpErrorFeriado=$("#helpErrorFeriado"+sufijo);
    var txtFeriado = $("#txtFeriado"+sufijo);

    var divTiposHorarios = $("#divTiposHorarios"+sufijo);
    var helpErrorTiposHorarios = $("#helpErrorTiposHorarios"+sufijo);
    var horariosDiscontinuos = $("#chkHorariosDiscontinuos"+sufijo).bootstrapSwitch("state");
    var chkHorariosDiscontinuos = $("#chkHorariosDiscontinuos"+sufijo);
    var horariosContinuos = $("#chkHorariosContinuos"+sufijo).bootstrapSwitch("state");
    var horariosMultiples = $("#chkHorariosMultiples"+sufijo).bootstrapSwitch("state");

    var cantidadDias = $("#lstCantidadDias"+sufijo).val();
    var divCantidadDias = $("#divCantidadDias"+sufijo);
    var helpErrorCantidadDias=$("#helpErrorCantidadDias"+sufijo);
    var lstCantidadDias = $("#lstCantidadDias"+sufijo);

    var chkRepetitivo = $("#chkRepetitivo"+sufijo).bootstrapSwitch("state");

    var fechaEspecifica = $("#txtFechaEspecifica"+sufijo).val();
    var divFechaEspecifica = $("#divFechaEspecifica"+sufijo);
    var helpErrorFechaEspecifica=$("#helpErrorFechaEspecifica"+sufijo);
    var txtFechaEspecifica = $("#txtFechaEspecifica"+sufijo);

    var mes = $("#lstMes"+sufijo).val();
    var divMes = $("#divMes"+sufijo);
    var helpErrorMes=$("#helpErrorMes"+sufijo);
    var lstMes = $("#lstMes"+sufijo);

    var dia = $("#lstDia"+sufijo).val();
    var divDia = $("#divDia"+sufijo);
    var helpErrorDia=$("#helpErrorDia"+sufijo);
    var lstDia = $("#lstDia"+sufijo);

    if (feriado == '') {
        ok = false;
        var msje = "Debe introducir el nombre del feriado necesariamente.";
        divFeriado.addClass("has-error");
        helpErrorFeriado.html(msje);
        if (enfoque == null)enfoque = txtFeriado;
    }
    if(!horariosDiscontinuos&&!horariosContinuos&&!horariosMultiples){
        ok = false;
        var msje = "Debe seleccionar al menos un Tipo de Horario necesariamente.";
        divTiposHorarios.addClass("has-error");
        helpErrorTiposHorarios.html(msje);
        if (enfoque == null)enfoque = chkHorariosDiscontinuos;
    }
    if(cantidadDias==0){
        ok = false;
        var msje = "Debe seleccionar al menos un d&iacute;a para la ejecuci&oacute;n del feriado.";
        divCantidadDias.addClass("has-error");
        helpErrorCantidadDias.html(msje);
        if (enfoque == null)enfoque = lstCantidadDias;
    }
    if(chkRepetitivo){
        /**
         * En caso de que el feriado se aplique a la misma fecha (Día y mes) en cada año.
         */
        if(mes==0){
            ok = false;
            var msje = "Debe seleccionar el mes correspondiente en el que se aplica el feriado cada a&ntilde;o.";
            divMes.addClass("has-error");
            helpErrorMes.html(msje);
            if (enfoque == null)enfoque = lstMes;
        }
        if(dia==0){
            ok = false;
            var msje = "Debe seleccionar el d&iacute; del mes en el que se aplica el feriado cada a&ntilde;o.";
            divDia.addClass("has-error");
            helpErrorDia.html(msje);
            if (enfoque == null)enfoque = lstDia;
        }
    }else
    {   /**
         * En caso de que el feriado se aplique sólo a una fecha específica.
         */
        if(fechaEspecifica==""){
            ok = false;
            $("#divFechaEspecifica"+sufijo).show();
            $("#txtFechaEspecifica"+sufijo).show();
            var msje = "Debe seleccionar una fecha espec&iacute;fica para la aplicaci&oacute;n del feriado necesariamente.";
            divFechaEspecifica.addClass("has-error");
            helpErrorFechaEspecifica.html(msje);
            if (enfoque == null)enfoque = txtFechaEspecifica;
        }
    }
    if (enfoque != null) {
        enfoque.focus();
    }
    return ok;
}
/**
 * Función para la limpieza de los mensajes de error debido a la validación del formulario para registro de feriado.
 * @sufijo Variable que define la limpieza de variables para el caso de nuevo y edición.
 */
function limpiarMensajesErrorPorValidacionFeriado(sufijo) {
    $("#divFeriado"+sufijo).removeClass("has-error");
    $("#helpErrorFeriado"+sufijo).html("");
    $("#divTiposHorarios"+sufijo).removeClass("has-error");
    $("#helpErrorTiposHorarios"+sufijo).html("");
    $("#divCantidadDias"+sufijo).removeClass("has-error");
    $("#helpErrorCantidadDias"+sufijo).html("");
    $("#divMes"+sufijo).removeClass("has-error");
    $("#helpErrorMes"+sufijo).html("");
    $("#divDia"+sufijo).removeClass("has-error");
    $("#helpErrorDia"+sufijo).html("");
    $("#divFechaEspecifica"+sufijo).removeClass("has-error");
    $("#helpErrorFechaEspecifica"+sufijo).html("");

}
/**
 * Función para guardar el registro del feriado.
 * @param idFeriado Identificador del feriado.
 * @returns {boolean}
 */
function guardaFeriado(opcion){
    var ok = true;
    var idFeriado = $("#hdnIdFeriadoEditar").val();
    var sufijo = "New";
    if(opcion==2)
    {
        sufijo="Editar";
    }
    var feriado = $("#txtFeriado"+sufijo).val();
    var descripcion = $("#txtDescripcion"+sufijo).val();
    var idRegional = 1;
    var chkHorariosDiscontinuos = 0;
    var chkHorariosContinuos = 0;
    var chkHorariosMultiples = 0;

    if($("#chkHorariosDiscontinuos"+sufijo).bootstrapSwitch("state"))
    chkHorariosDiscontinuos = 1;

    if($("#chkHorariosContinuos"+sufijo).bootstrapSwitch("state"))
       chkHorariosContinuos = 1;

    if($("#chkHorariosMultiples"+sufijo).bootstrapSwitch("state"))
        chkHorariosMultiples = 1;

    var cantidadDias = $("#lstCantidadDias"+sufijo).val();

    var chkRepetitivo = 0;
    var mes = "";
    var dia = "";
    var gestion = "";


    if($("#chkRepetitivo"+sufijo).bootstrapSwitch("state"))
        chkRepetitivo = 1;

    if(chkRepetitivo==0){
        if($("#txtFechaEspecifica"+sufijo).val().split("-")!=''){
            var arrFechaEspecifica = $("#txtFechaEspecifica"+sufijo).val().split("-");
            dia = parseFloat(arrFechaEspecifica[0]);
            mes = parseFloat(arrFechaEspecifica[1]);
            gestion = parseFloat(arrFechaEspecifica[2]);
        }else ok=false
    }else{
        mes = $("#lstMes"+sufijo).val();
        dia = $("#lstDia"+sufijo).val();
        gestion = "";
    }
    var observacion = $("#txtObservacion"+sufijo).val();
    if (ok && feriado != '') {
        $.ajax({
            url: '/feriados/save/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {
                id: idFeriado,
                feriado:feriado,
                descripcion:descripcion,
                id_regional:idRegional,
                horario_discontinuo:chkHorariosDiscontinuos,
                horario_continuo:chkHorariosContinuos,
                horario_multiple:chkHorariosMultiples,
                cantidad_dias:cantidadDias,
                repetitivo:chkRepetitivo,
                dia:dia,
                mes:mes,
                gestion:gestion,
                observacion: observacion
            },
            success: function (data) {
                ok = false;
                var res = jQuery.parseJSON(data);
                /**
                 * Si se ha realizado correctamente el registro de la relación laboral y la movilidad
                 */
                $(".msjes").hide();
                if (res.result == 1) {
                    ok = true;
                    $("#divMsjePorSuccess").html("");
                    $("#divMsjePorSuccess").append(res.msj);
                    $("#divMsjeNotificacionSuccess").jqxNotification("open");
                    $("#divGridFeriados").jqxGrid("updatebounddata");
                } else if (res.result == 0) {
                    /**
                     * En caso de presentarse un error subsanable
                     */
                    ok = false;
                    $("#divMsjePorWarning").html("");
                    $("#divMsjePorWarning").append(res.msj);
                    $("#divMsjeNotificacionWarning").jqxNotification("open");
                } else {
                    /**
                     * En caso de haberse presentado un error crítico al momento de registrarse el feriado
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
 * Función para limpiar los campos correspondientes para el registro de un nuevo feriado.
 */
function inicializarCamposParaNuevoRegistroFeriado(opcion){
    var sufijo ="New";
    if(opcion==2)sufijo ="Editar";
    $("#hdnIdFeriadoEditar").val(0);
    $("#txtFeriado"+sufijo).val("");
    $("#txtDescripcion"+sufijo).val("");
    $("#txtObservacion"+sufijo).val("");
    $("#chkHorariosDiscontinuos"+sufijo).bootstrapSwitch("state",false);
    $("#chkHorariosContinuos"+sufijo).bootstrapSwitch("state",false);
    $("#chkHorariosMultiples"+sufijo).bootstrapSwitch("state",false);
    $("#chkRepetitivo"+sufijo).bootstrapSwitch("state",false);

}