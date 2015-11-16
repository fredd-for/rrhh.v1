/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  03-11-2015
 */
/**
 * Función para el despliegue del registro de la Idea de Negocio.
 * @param opcion
 * @param idRelaboral
 * @param idIdea
 * @param titulo
 * @param resumen
 * @param descripcion
 * @param inversion
 * @param beneficios
 * @param puntuacion_a
 * @param puntuacion_b
 * @param puntuacion_c
 * @param puntuacion_c
 * @param puntuacion_d
 * @param puntuacion_e
 * @param observacion
 */
function inicializarFormularioGestionIdeasView(opcion,idRelaboral,idIdea,gestion,mes,tipoNegocio,titulo,resumen,descripcion,inversion,beneficios,puntuacion_a,puntuacion_b,puntuacion_c,puntuacion_c,puntuacion_d,puntuacion_e,observacion){
    var sufijo="New";
    if(opcion==2) sufijo="Edit";
    $("#txtTitulo"+sufijo).val("");
    $("#txtResumen"+sufijo).val("");
    $("#txtDescripcion"+sufijo).val("");
    $("#txtObservacion"+sufijo).val("");
    if(opcion==2){
        $("#txtTitulo"+sufijo).val(titulo);
        $("#txtResumen"+sufijo).val(resumen);
        $("#txtDescripcion"+sufijo).val(descripcion);
        $("#txtObservacion"+sufijo).val(observacion);
    }
    var d = new Date();
    var dia = d.getDate();
    if (gestion == 0){
        var gestion = d.getFullYear();
    }
    if(mes == 0){
        var mes = d.getMonth()+1;
    }
    limpiarMensajesErrorPorValidacionIdeas(opcion);
    cargarGestionesDisponiblesParaRegistroDeIdeas(opcion,gestion);
    cargarMesesDisponiblesParaRegistroDeIdeas(opcion,gestion,mes);
    cargaListaDeTiposDeNegocios(opcion,tipoNegocio);
}
/**
 * Función para la carga de gestiones disponibles para la generación de marcaciones previstas y efectivas.
 * @param option
 * @param g
 */
function cargarGestionesDisponiblesParaRegistroDeIdeas(option,g){
    var lista = "";
    var sufijo = "New";
    if(option==2)sufijo = "Edit";
    $("#lstGestion"+sufijo).html("");
    $("#lstGestion"+sufijo).append("<option value=''>Seleccionar</option>");
    $("#lstGestion"+sufijo).prop("disabled",false);
    var selected = "";
    $.ajax({
        url: '/perfileslaborales/getgestiones/',
        type: "POST",
        datatype: 'json',
        async: false,
        cache: false,
        data: {id_perfillaboral:0},
        success: function (data) {
            var res = jQuery.parseJSON(data);
            if (res.length > 0) {
                $.each(res, function (key, gestion) {
                    if(g==gestion)selected="selected";
                    else selected = "";
                    lista += "<option value='"+gestion+"' "+selected+">"+gestion+"</option>";
                });
            }
        }
    });
    if(lista!='')$("#lstGestion"+sufijo).append(lista);
    else $("#lstGestion"+sufijo).prop("disabled",true);
}
/**
 * Función para la obtención del listado de meses disponibles para la generación de marcaciones previstas y efectivas.
 * @param option
 * @param gestion
 * @param m
 */
function cargarMesesDisponiblesParaRegistroDeIdeas(option,gestion,m){
    var sufijo = "New";
    if(option==2)sufijo = "Edit";
    $("#lstMes"+sufijo).html("");
    $("#lstMes"+sufijo).append("<option value=''>Seleccionar</option>");
    $("#lstMes"+sufijo).prop("disabled",false);
    var lista = "";
    var selected = "";
    if(gestion>0){
        $.ajax({
            url: '/horariosymarcaciones/getmeses/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {gestion:gestion},
            success: function (data) {
                var res = jQuery.parseJSON(data);
                if (res.length > 0) {
                    $.each(res, function (key, val) {
                        if(m==val.mes)selected="selected";
                        else selected = "";
                        lista += "<option value='"+val.mes+"' "+selected+">"+val.mes_nombre+"</option>";
                    });
                }
            }
        });
        if(lista!='')$("#lstMes"+sufijo).append(lista);
        else $("#lstMes"+sufijo).prop("disabled",true);
    }else{
        $("#lstMes"+sufijo).prop("disabled",true);
    }
}
/**
 * Función para la obtención del listado de tipos de negocio disponibles
 * @param opcion      -- Valor que permite determinar el formulario en el que se ejecuta.
 * @param tipoNegocio -- Identificador del tipo de negocio que debería estar seleccionada por defecto en caso de que su valor sea mayor a cero.
 */
function cargaListaDeTiposDeNegocios(opcion,tipoNegocio){
    var sufijo = "New";
    if(opcion==2)sufijo = "Edit";
    var selected = "";
    $("#lstTiposDeNegocio"+sufijo).html("");
    $("#lstTiposDeNegocio"+sufijo).append("<option value=''>Seleccionar..</option>");
    $("#lstTiposDeNegocio"+sufijo).prop("disabled",true);
    var frecuencia = "";
    $.ajax({
        url: '/misideas/listtiposdenegocio/',
        type: "POST",
        datatype: 'json',
        async: false,
        cache: false,
        success: function (data) {  //alert(data);
            var res = jQuery.parseJSON(data);
            if(res.length>0){
                $("#lstTiposDeNegocio"+sufijo).prop("disabled",false);
                $.each( res, function( key, val ) {
                    if(tipoNegocio==val.tipo){selected="selected";
                    }else selected="";
                    $("#lstTiposDeNegocio"+sufijo).append("<option value='"+val.tipo+"' "+selected+">"+val.tipo_descripcion+" "+frecuencia+"</option>");
                });
            }
        }, //mostramos el error
        error: function () {
            $("#divMsjePorError").html("");
            $("#divMsjePorError").append("Se ha producido un error Inesperado");
            $("#divMsjeNotificacionError").jqxNotification("open");
        }
    });
}
/**
 * Función para validar los datos del formulario de registro y edición de Ideas de Negocio.
 * @returns {boolean}
 */
function validaFormularioGestionIdeas(opcion){
    var ok = true;
    var sufijo = "New";
    var idIdea = 0;
    var idRelaboral = 0;
    if(opcion==2){
        sufijo="Edit";
        idIdea = $("#hdnIdIdeaEdit").val();
    }
    idRelaboral = $("#hdnIdRelaboral"+sufijo).val()
    var msje = "";
    $(".msjs-alert").hide();
    limpiarMensajesErrorPorValidacionIdeas(opcion);
    var enfoque = null;

    var gestion = $("#lstGestion"+sufijo).val();
    var mes = $("#lstMes"+sufijo).val();
    var lstTiposDeNegocio = $("#lstTiposDeNegocio"+sufijo);
    var divTiposDeNegocio = $("#divTiposDeNegocio"+sufijo);
    var helpErrorTiposDeNegocio = $("#helpErrorTiposDeNegocio"+sufijo);
    var tiposDeNegocio = $("#lstTiposDeNegocio"+sufijo).val();

    var txtTitulo = $("#txtTitulo"+sufijo);
    var divTitulo = $("#divTitulo"+sufijo);
    var helpErrorTitulo = $("#helpErrorTitulo"+sufijo);
    var titulo = $("#txtTitulo"+sufijo).val();

    var txtResumen = $("#txtResumen"+sufijo);
    var divResumen = $("#divResumen"+sufijo);
    var helpErrorResumen = $("#helpErrorResumen"+sufijo);
    var resumen = $("#txtResumen"+sufijo).val();

    var txtDescripcion = $("#txtDescripcion"+sufijo);
    var divDescripcion = $("#divDescripcion"+sufijo);
    var helpErrorDescripcion = $("#helpErrorDescripcion"+sufijo);
    var descripcion = $("#txtDescripcion"+sufijo).val();
    /*if(tiposDeNegocio==''||tiposDeNegocio==0){
        ok = false;
        var msje = "Debe seleccionar el Tipo de Negocio necesariamente.";
        divTiposDeNegocio.addClass("has-error");
        helpErrorTiposDeNegocio.html(msje);
        if (enfoque == null)enfoque = lstTiposDeNegocio;
    }
    if(titulo==''){
        ok = false;
        var msje = "Debe registrar el T&iacute;tulo para la Idea de Negocio.";
        divTitulo.addClass("has-error");
        helpErrorTitulo.html(msje);
        if (enfoque == null)enfoque = txtTitulo;
    }
    if(resumen==''){
        ok = false;
        var msje = "Debe registrar el resumen de la Idea de Negocio.";
        divResumen.addClass("has-error");
        helpErrorResumen.html(msje);
        if (enfoque == null)enfoque = txtResumen;
    }
    if(descripcion==''){
        ok = false;
        var msje = "Debe registrar el planteamiento o descripci&oacute;n de la Idea de Negocio.";
        divDescripcion.addClass("has-error");
        helpErrorDescripcion.html(msje);
        if (enfoque == null)enfoque = txtDescripcion;
    }*/
    if(enfoque!=null)enfoque.focus();
    return ok;
}
/**
 * Función para la limpieza de los mensajes de error debido a la validación del formulario.
 * @opción Variable que identifica a que tipo de formulario se aplica la función.
 */
function limpiarMensajesErrorPorValidacionIdeas(opcion) {
    var sufijo = "New";
    if(opcion==2)sufijo = "Edit";
    $("#divTiposDeNegocio"+sufijo).removeClass("has-error");
    $("#helpErrorTiposDeNegocio"+sufijo).html("");
    $("#divTitulo"+sufijo).removeClass("has-error");
    $("#helpErrorTitulo"+sufijo).html("");
    $("#divResumen"+sufijo).removeClass("has-error");
    $("#helpErrorResumen"+sufijo).html("");
    $("#divDescripcion"+sufijo).removeClass("has-error");
    $("#helpErrorDescripcion"+sufijo).html("");
}

/**
 * Función para el almacenamiento de los datos registrados en el formulario de Ideas de Negocio. Considerar para este caso que sólo se modifica el campo observación.
 */
function modificarClasificacion() {
    var ok = false;
    var idIdea = $("#hdnIdIdeaClasificacion").val();
    var puntuacionA = 0;
    if($("#rtClasificacion").val()>=0){
        puntuacionA = $("#rtClasificacion").val();
    }

        $.ajax({
            url: '/clasificacionideas/save/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {
                id: idIdea,
                puntuacion_a:puntuacionA
            },
            success: function (data) {  //alert(data);
                var res = jQuery.parseJSON(data);
                $(".msjes").hide();
                if (res.result == 1) {
                    ok = true;
                    $("#divMsjePorSuccess").html("");
                    $("#divMsjePorSuccess").append(res.msj);
                    $("#divMsjeNotificacionSuccess").jqxNotification("open");
                    $("#divGridIdeasAll").jqxGrid("updatebounddata");
                } else if (res.result == 0) {
                    $("#divMsjePorWarning").html("");
                    $("#divMsjePorWarning").append(res.msj);
                    $("#divMsjeNotificacionWarning").jqxNotification("open");
                } else {
                    $("#divMsjePorError").html("");
                    $("#divMsjePorError").append(res.msj);
                    $("#divMsjeNotificacionError").jqxNotification("open");
                }

            },
            error: function () {
                $("#divMsjePorError").html("");
                $("#divMsjePorError").append("Se ha producido un error Inesperado");
                $("#divMsjeNotificacionError").jqxNotification("open");
            }
        });
    return ok;
}
/**
 * Función para guardar el registro de la calificación.
 */
function guardarFormularioCalificacion(){

}