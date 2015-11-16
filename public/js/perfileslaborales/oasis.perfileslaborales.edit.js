/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  16-12-2014
 */
/**
 * Función para validar los datos del formulario de nuevo registro de perfil laboral.
 * @returns {boolean} True: La validación fue correcta; False: La validación anuncia que hay errores en el formulario.
 */
function validaFormularioPorEditarRegistroPerfilLaboral(){
    var ok = true;
    var msje = "";
    $(".msjs-alert").hide();

    limpiarMensajesErrorPorValidacionEditarRegistro();

    var perfilLaboral = $("#txtPerfilLaboralEditar").val();
    var idPerfilLaboral = $("#hdnIdPerfilLaboralEditar").val();
    var msjeError="";
    if(idPerfilLaboral==0||idPerfilLaboral==null){
        ok=false;
        $("#divMsjeError").show();
        $("#divMsjeError").addClass('alert alert-danger alert-dismissable');
        msjeError += "Se requiere seleccionar un registro de perfil laboral inicialmente.";
    }
    if(msjeError!="")$("#aMsjeError").html(msjeError);

    var enfoque=null;
    if(perfilLaboral==null||perfilLaboral==""){
        ok=false;
        msje = "Debe introducir el nombre del perfil necesariamente.";
        $("#divPerfilLaboralEditar").addClass("has-error");
        $("#helpErrorPerfilLaboralEditar").html(msje);
        if(enfoque==null)enfoque =$("#txtPerfilLaboralEditar");
    }
    if(enfoque!=null){
        enfoque.focus();
    }
   return ok;
}
/**
 * Función para la limpieza de los mensajes de error debido a la validación del formulario para edición de registro.
 */
function limpiarMensajesErrorPorValidacionEditarRegistro() {

    $("#divPerfilLaboralEditar").removeClass("has-error");
    $("#divObservacionPerfilLaboralEditar").removeClass("has-error");
    $("#helpErrorPerfilLaboralEditar").html("");
    $("#helpErrorObservacionPerfilLaboralEditar").html("");

}
/**
 * Función para el almacenamiento de un nuevo registro en la Base de Datos.
 */
function guardarRegistroEditadoPerfilLaboral(){
    var ok=true;
    var id_perfillaboral = $("#hdnIdPerfilLaboralEditar").val();
    var perfiLaboral = $('#txtPerfilLaboralEditar').val();
    var grupoLaboral = $("#txtGrupoPerfilLaboralEditar").val();
    var tipoHorario = $("#lstTipoHorarioPerfilLaboralEditar").val();
    var chkControlFaltasOmisionesPerfilLaboralEditar = 0;
    if($("#chkControlFaltasOmisionesPerfilLaboralEditar").bootstrapSwitch("state"))
        chkControlFaltasOmisionesPerfilLaboralEditar = 1;
    var observacion = $("#txtObservacionPerfilLaboralEditar").val();
    if(id_perfillaboral>0){
        var ok=$.ajax({
            url:'/perfileslaborales/save/',
            type:'POST',
            datatype: 'json',
            async:false,
            data:{id:id_perfillaboral,
                perfil_laboral:perfiLaboral,
                grupo:grupoLaboral,
                tipo_horario:tipoHorario,
                control_f_o:chkControlFaltasOmisionesPerfilLaboralEditar,
                observacion:observacion
            },
            success: function(data) {  //alert(data);

                var res = jQuery.parseJSON(data);
                /**
                 * Si se ha realizado correctamente el registro del perfil laboral
                 */
                $(".msjes").hide();
                if(res.result==1){
                    $("#divMsjePorSuccess").html("");
                    $("#divMsjePorSuccess").append(res.msj);
                    $("#divMsjeNotificacionSuccess").jqxNotification("open");
                    /**
                     * Se habilita nuevamente el listado actualizado con el registro realizado y
                     * se inhabilita el formulario para nuevo registro.
                     */
                    $('#jqxTabsPerfilesLaborales').jqxTabs('enableAt', 0);
                    $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 1);
                    $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 2);
                    $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 3);
                    $("#divGridPerfilesLaborales").jqxGrid("updatebounddata");
                } else if(res.result==0){
                    /**
                     * En caso de haberse presentado un error al momento de especificar la ubicación del trabajo
                     */
                    $("#divMsjePorWarning").html("");
                    $("#divMsjePorWarning").append(res.msj);
                    $("#divMsjeNotificacionWarning").jqxNotification("open");
                }else{
                    /**
                     * En caso de haberse presentado un error crítico al momento de registrarse la relación laboral
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
