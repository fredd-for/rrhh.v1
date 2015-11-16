/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  23-12-2014
 */
/**
 * Función para aprobar un registro de tolerancias en horarios laborales.
 */
function aprobarRegistroTolerancia(idTolerancia){
    var ok = false;
    $.ajax({
        url:'/tolerancias/approve/',
        type:'POST',
        datatype: 'json',
        async:false,
        data:{id:idTolerancia},
        success: function(data) {

            var res = jQuery.parseJSON(data);
            /**
             * Si se ha realizado correctamentela aprobación del registro de la relación laboral
             */
            $(".msjes").hide();
            if(res.result==1){

                $("#divMsjePorSuccess").html("");
                $("#divMsjePorSuccess").append(res.msj);
                $("#divMsjeNotificacionSuccess").jqxNotification("open");
                $("#jqxgridtolerancias").jqxGrid("updatebounddata");
                ok=true;
            } else if(res.result==0){
                /**
                 * En caso de haberse presentado un error al momento de modificar el estado del registro de relación laboral, siendo que su estado no haya estado EN PROCESO.
                 */
                $("#divMsjePorWarning").html("");
                $("#divMsjePorWarning").append(res.msj);
                $("#divMsjeNotificacionWarning").jqxNotification("open");
            }else{
                /**
                 * En caso de haberse presentado un error crítico al momento de modificar el estado el registro de la relación laboral
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