/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  12-10-2015
 */
$().ready(function () {
    $(".alert").hide();
    $("#email").focus();
    $("#btnEnviarEmail").on("click",function(){
        var ok = enviarCorreo();
    });
    $(".close").on("click",function(){
        $(".alert").hide();
        $("#email").focus();
    })
});
/**
 * Función para el envío
 */
function enviarCorreo(){
    var ok = false;
    $("#divPasswordSuccess").hide();
    $("#divPasswordWarning").hide();
    $("#divPasswordDanger").hide();
    $(".span-alert").html("");
    var email = $("#email").val();
    if(email!=''){
        $.ajax({
            url:'/registerandrecover/recover/',
            type:'POST',
            datatype: 'json',
            async:false,
            data:{email:email},
            success: function(data) {
                ok = false;
                var res = jQuery.parseJSON(data);
                /**
                 * Si se ha realizado correctamente el registro de la relación laboral y la movilidad
                 */
                $(".msjes").hide();
                if (res.result == 1) {
                    ok = true;
                    $("#divPasswordSuccess").show();
                    $("#spanSuccess").html(res.msj);

                } else if (res.result == 0) {
                    /**
                     * En caso de presentarse un error subsanable
                     */
                    ok = false;
                    $("#divPasswordWarning").show();
                    $("#spanWarning").html(res.msj);

                } else {
                    /**
                     * En caso de haberse presentado un error crítico al momento de registrarse el feriado
                     */
                    $("#divPasswordDanger").show();
                    $("#spanDanger").html(res.msj);
                }

            }, //mostramos el error
            error: function() { alert('Se ha producido un error Inesperado'); }
        });
    }
    return ok;
}