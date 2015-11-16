/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  27-02-2015
 */
/**
 * Función para aprobar un registro de excepción.
 */
function aprobarRegistroExcepcion(idExcepcion){
    var ok = false;
    $.ajax({
        url:'/excepciones/approve/',
        type:'POST',
        datatype: 'json',
        async:false,
        data:{id:idExcepcion},
        success: function(data) {

            var res = jQuery.parseJSON(data);
            /**
             * Si se ha realizado correctamentela aprobación del registro de la excepción.
             */
            $(".msjes").hide();
            if(res.result==1){

                $("#divMsjePorSuccess").html("");
                $("#divMsjePorSuccess").append(res.msj);
                $("#divMsjeNotificacionSuccess").jqxNotification("open");
                $("#divGridExcepciones").jqxGrid("updatebounddata");
                ok=true;
            } else if(res.result==0){
                $("#divMsjePorWarning").html("");
                $("#divMsjePorWarning").append(res.msj);
                $("#divMsjeNotificacionWarning").jqxNotification("open");
            }else{
                /**
                 * En caso de haberse presentado un error crítico al momento de modificar el estado el registro de la excepción.
                 */
                $("#divMsjePorError").html("");
                $("#divMsjePorError").append(res.msj);
                $("#divMsjeNotificacionError").jqxNotification("open");
            }

        }, //mostramos el error
        error: function() { alert('Se ha producido un error Inesperado'); }
    });
    return ok;
}