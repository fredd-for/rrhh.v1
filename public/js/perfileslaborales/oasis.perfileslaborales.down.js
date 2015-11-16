/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  16-12-2014
 */
/**
 * Función para el almacenamiento de un nuevo registro en la Base de Datos.
 */
function guardarRegistroBajaPerfilLaboral(idPerfilLaboral){
    if(idPerfilLaboral>0){
        var ok=$.ajax({
            url:'../../perfileslaborales/down/',
            type:'POST',
            datatype: 'json',
            async:false,
            data:{id:idPerfilLaboral
            },
            success: function(data) {
                var res = jQuery.parseJSON(data);
                /**
                 * Si se ha realizado correctamente el registro de baja de perfil laboral
                 */
                $(".msjes").hide();
                if(res.result==1){
                    $("#divMsjePorSuccess").html("");
                    $("#divMsjePorSuccess").append(res.msj);
                    $("#divMsjeNotificacionSuccess").jqxNotification("open");
                    $("#divGridPerfilesLaborales").jqxGrid("updatebounddata");
                } else if(res.result==0){
                    /**
                     * En caso de haberse presentado un error al momento de registrar la baja por inconsistencia de datos.
                     */
                    $("#divMsjePorWarning").html("");
                    $("#divMsjePorWarning").append(res.msj);
                    $("#divMsjeNotificacionWarning").jqxNotification("open");
                }else{
                    /**
                     * En caso de haberse presentado un error crítico al momento de registrarse la baja (Error de conexión)
                     */
                    $("#divMsjePorError").html("");
                    $("#divMsjePorError").append(res.msj);
                    $("#divMsjeNotificacionError").jqxNotification("open");
                }

            }, //mostramos el error
            error: function() { alert('Se ha producido un error Inesperado'); }
        });
    }else {
        ok = false;
    }
    return ok;
}
