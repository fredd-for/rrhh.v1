/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  10-11-2015
 */
$().ready(function () {
    $("#txtPassword").focus();

    $('.password-container').pschecker({ onPasswordValidate: validatePassword, onPasswordMatch: matchPassword });

    var submitbutton = $('.submit-button');
    var errorBox = $('.error');
    errorBox.css('visibility', 'hidden');
    submitbutton.attr("disabled", "disabled");
    //this function will handle onPasswordValidate callback, que comprueba la longitud mínima para la contraseña
    /**
     * Esta función manejará la llamada onPasswordValidate,,
     * @param isValid
     */
    function validatePassword(isValid) {
        if (!isValid)
            errorBox.css('visibility', 'visible');
        else
            errorBox.css('visibility', 'hidden');
    }
    /**
     * Esta función será llamada cuando ambos passwords sean completados
     * @param isMatched
     */
    function matchPassword(isMatched) {
        if (isMatched) {
            submitbutton.removeAttr("disabled", "disabled");
        }
        else {
            submitbutton.attr("disabled", "disabled");
        }
    }
    $("#btnModificarPassword").on("click",function(){
        var ok = validarFormulario();
        if(ok){
            var okk = guardarPassword();
            if(okk){
                    $("#txtPassword").val("");
                    $("#txtPasswordA").val("");
                    $("#txtPasswordB").val("");
                    $("#txtPassword").focus();
            }
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
});
/**
 * Función para la validación adicional del formulario.
 * @returns {boolean}
 */
function validarFormulario(){
    var ok=true;
    var focable = null;
    $("#helpErrorPassword").removeClass("error");
    $("#helpErrorPassword").html("");
    if($("#txtPassword").val()==""){
        $("#helpErrorPassword").addClass("error");
        $("#helpErrorPassword").html("Debe introducir la Contrase&ntilde;a Actual.");
        ok=false;
        if(focable==null){
            focable = $("#txtPassword");
        }
    }
    if(!ok){
        focable.focus();
    }
    return ok;
}
/**
 * Función para guardar los nuevos valores para el password.
 */
function guardarPassword(){
    var ok=false;
    var pass = $("#txtPassword").val();
    var passA = $("#txtPasswordA").val();
    var passB = $("#txtPasswordB").val();
    if(pass!=""&&passA!=""&&passB!=""){
        $.ajax({
            url:"/login/updpassword/",
            type:"POST",
            datatype: "json",
            async:false,
            data:{
                pass:pass,
                pass_a:passA,
                pass_b:passB
            },
            success: function(data) {
                var res = jQuery.parseJSON(data);
                if (res.result == 1) {
                    ok = true;
                    $("#divMsjePorSuccess").html("");
                    $("#divMsjePorSuccess").append(res.msj);
                    $("#divMsjeNotificacionSuccess").jqxNotification("open");
                } else if (res.result == 0) {
                    $("#divMsjePorWarning").html("");
                    $("#divMsjePorWarning").append(res.msj);
                    $("#divMsjeNotificacionWarning").jqxNotification("open");
                } else {
                    $("#divMsjePorError").html("");
                    $("#divMsjePorError").append(res.msj);
                    $("#divMsjeNotificacionError").jqxNotification("open");
                }
            }, //mostramos el error
            error: function() { alert("Se ha producido un error Inesperado"); }
        });


    }
    return ok;
}