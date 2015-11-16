/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  28-05-2015
 */
/**
 * Función para la modificación de la observación sobre el registro de una planilla y/o pagos salariales relacionados.
 * @param idPlanilla
 * @param observacion
 * @returns {boolean}
 */
function modificarObservacionEnPlanillaSal(idPlanilla,opcion,observacion){
    var ok=false;
    if(idPlanilla>0){
        var ok=$.ajax({
            url:'/planillassal/edit/',
            type:'POST',
            datatype: 'json',
            async:false,
            data:{id:idPlanilla,observacion:observacion,opcion:opcion},
            success: function(data) {  //alert(data);
                var res = jQuery.parseJSON(data);
                /**
                 * Si se ha realizado correctamente el registro de baja de la excepción.
                 */
                $(".msjes").hide();
                if(res.result==1){
                    $("#divMsjePorSuccess").html("");
                    $("#divMsjePorSuccess").append(res.msj);
                    $("#divMsjeNotificacionSuccess").jqxNotification("open");
                    $("#divGridPlanillasSal").jqxGrid("updatebounddata");
                    return true;
                } else if(res.result==0){
                    /**
                     * En caso de haberse presentado un error al momento de registrar la baja por inconsistencia de datos.
                     */
                    $("#divMsjePorWarning").html("");
                    $("#divMsjePorWarning").append(res.msj);
                    $("#divMsjeNotificacionWarning").jqxNotification("open");
                    return false;
                }else{
                    /**
                     * En caso de haberse presentado un error crítico al momento de registrarse la baja (Error de conexión)
                     */
                    $("#divMsjePorError").html("");
                    $("#divMsjePorError").append(res.msj);
                    $("#divMsjeNotificacionError").jqxNotification("open");
                    return false;
                }

            }, //mostramos el error
            error: function() { alert('Se ha producido un error Inesperado'); return false;}
        });
    }
    return ok;
}