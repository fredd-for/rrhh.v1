/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  03-03-2015
 */
/**
 * Función para aprobar un registro de control de excepción.
 */
function aprobarRegistroControlExcepcion(idExcepcion){
    var ok = false;
    $.ajax({
        url:'/controlexcepciones/approve/',
        type:'POST',
        datatype: 'json',
        async:false,
        data:{id:idExcepcion},
        success: function(data) {

            var res = jQuery.parseJSON(data);
            /**
             * Si se ha realizado correctamentela aprobación del registro del control de excepciones.
             */
            $(".msjes").hide();
            if(res.result==1){

                $("#divMsjePorSuccess").html("");
                $("#divMsjePorSuccess").append(res.msj);
                $("#divMsjeNotificacionSuccess").jqxNotification("open");
                $("#divGridControlExcepciones").jqxGrid("updatebounddata");
                ok=true;
            } else if(res.result==0){
                $("#divMsjePorWarning").html("");
                $("#divMsjePorWarning").append(res.msj);
                $("#divMsjeNotificacionWarning").jqxNotification("open");
            }else{
                /**
                 * En caso de haberse presentado un error crítico al momento de modificar el estado el registro del control de excepción.
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