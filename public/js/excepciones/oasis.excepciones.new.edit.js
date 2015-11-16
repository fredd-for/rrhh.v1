/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  26-02-2015
 */
/**
 * Función para la inicialización del formulario para el registro y edición de excepciones.
 * @param opcion
 * @param excepcion
 * @param idTipoExcepcion
 * @param codigo
 * @param color
 * @param descuento
 * @param compensatoria
 * @param horario
 * @param refrigerio
 * @param idGenero
 * @param boleta
 */
function inicializaFormularioExcepcionesNuevoEditar(opcion,excepcion,idTipoExcepcion,codigo,color,descuento, compensatoria,horario,refrigerio,idGenero,boleta){
    var sufijo = "New";
    if(opcion==2)sufijo = "Edit";
    $("#txtColor"+sufijo).colorpicker()
        .on('change.color', function(evt, color){
            $(this).css("background",color);
            $(this).css("color",color);
            $(".evo-pointer").hide();
        });
    $(".evo-pointer").hide();

    $("#chkDescuento"+sufijo).bootstrapSwitch();
    $("#chkCompensatoria"+sufijo).bootstrapSwitch();
    $("#chkHorario"+sufijo).bootstrapSwitch();
    $("#chkRefrigerio"+sufijo).bootstrapSwitch();
    $("#chkBoleta"+sufijo).bootstrapSwitch();
    $("#txtCantidad"+sufijo).numeric();

    $("#txtExcepcion"+sufijo).val(excepcion);
    cargarTiposExcepciones(opcion,idTipoExcepcion);

    $("#txtCodigo"+sufijo).val(codigo);
    $("#txtColor"+sufijo).css({'background-color': color,'color':color});

    if(descuento==1){
        $("#chkDescuento"+sufijo).bootstrapSwitch("state",true);
    }else $("#chkDescuento"+sufijo).bootstrapSwitch("state",false);

    if(compensatoria==1){
        $("#chkCompensatoria"+sufijo).bootstrapSwitch("state",true);
    }else $("#chkCompensatoria"+sufijo).bootstrapSwitch("state",false);

    if(horario==1){
        $("#chkHorario"+sufijo).bootstrapSwitch("state",true);
    }else $("#chkHorario"+sufijo).bootstrapSwitch("state",false);

    if(refrigerio==1){
        $("#chkRefrigerio"+sufijo).bootstrapSwitch("state",true);
    }else $("#chkRefrigerio"+sufijo).bootstrapSwitch("state",false);

    if(boleta==1){
        $("#chkBoleta"+sufijo).bootstrapSwitch("state",true);
    }else $("#chkBoleta"+sufijo).bootstrapSwitch("state",false);
    cargarTiposGeneros(opcion,idGenero);
}
/**
 * Función para la obtención del listado de tipos de excepción.
 * @param opcion
 * @param idTipoExcepcion
 */
function cargarTiposExcepciones(opcion,idTipoExcepcion){
    var sufijo = "New";
    if(opcion==2)sufijo = "Edit";
    var selected="";
    $("#lstTipoExcepcion"+sufijo).html("");
    $("#lstTipoExcepcion"+sufijo).append("<option value='0'>Seleccionar..</option>");
    $.ajax({
        url:'/excepciones/listtiposexcepciones/',
        type:'POST',
        datatype: 'json',
        async:false,
        success: function(data) {  //alert(data);
            var res = jQuery.parseJSON(data);
            if(res.length>0){
                $.each( res, function( key, val ) {
                    if(idTipoExcepcion==val.id_tipo_excepcion){
                        selected="selected";
                    }else selected="";
                    $("#lstTipoExcepcion"+sufijo).append("<option value='"+val.id_tipo_excepcion+"' "+selected+">"+val.tipo_excepcion+"</option>");
                });
            }
        }, //mostramos el error
        error: function() { alert('Se ha producido un error Inesperado'); }
    });
}
/**
 * Función para la obtención del listado de géneros disponibles en el sistema.
 * @param opcion
 * @param idGenero
 */
function cargarTiposGeneros(opcion,idGenero){
    var sufijo = "New";
    if(opcion==2)sufijo = "Edit";
    var selected="";
    $("#lstGenero"+sufijo).html("");
    $("#lstGenero"+sufijo).append("<option value='-1'>Seleccionar..</option>");
    $.ajax({
        url:'/excepciones/listgeneros/',
        type:'POST',
        datatype: 'json',
        async:false,
        success: function(data) {  //alert(data);
            var res = jQuery.parseJSON(data);
            if(res.length>0){
                $.each( res, function( key, val ) {
                    if(idGenero==val.id_genero){
                        selected="selected";
                    }else selected="";
                    $("#lstGenero"+sufijo).append("<option value='"+val.id_genero+"' "+selected+">"+val.genero+"</option>");
                });
            }
        }, //mostramos el error
        error: function() { alert('Se ha producido un error Inesperado'); }
    });
}
/**
 * Función para el registro de tipos de unidades de medida para el registro de excepciones.
 * @param opcion
 * @param unidad
 */
function cargarTiposUnidades(opcion,unidad){
    var sufijo = "New";
    if(opcion==2)sufijo = "Edit";
    var selected="";
    $("#lstUnidad"+sufijo).html("");
    $("#lstUnidad"+sufijo).append("<option value='' data-id-unidad='0'>Seleccionar..</option>");
    $("#lstUnidad"+sufijo).prop("disabled",true);
    $.ajax({
        url:'/excepciones/listunidades/',
        type:'POST',
        datatype: 'json',
        async:false,
        success: function(data) {  //alert(data);
            var res = jQuery.parseJSON(data);
            if(res.length>0){
                $("#lstUnidad"+sufijo).prop("disabled",false);
                $.each( res, function( key, val ) {
                    if(unidad==val.unidad&&unidad!=""){
                        selected="selected";
                    }else selected="";
                    $("#lstUnidad"+sufijo).append("<option value='"+val.unidad+"' data-id-unidad='"+val.id_unidad+"' "+selected+">"+val.unidad+"</option>");
                });
            }
        }, //mostramos el error
        error: function() { alert('Se ha producido un error Inesperado'); }
    });
}
/**
 * Función para la obtención del listado de tipos de fraccionamientos disponibles en el sistema.
 * @param opcion
 * @param fraccionamiento
 */
function cargarTiposFraccionamientos(opcion,idMinima,fraccionamiento){
    var sufijo = "New";
    if(opcion==2)sufijo = "Edit";
    var selected="";
    $("#lstFraccionamiento"+sufijo).html("");
    $("#lstFraccionamiento"+sufijo).append("<option value=''>Seleccionar..</option>");
    if(idMinima>0){
        $("#lstFraccionamiento"+sufijo).prop("disabled",true);
        $.ajax({
            url:'/excepciones/listfraccionamientos/',
            type:'POST',
            datatype: 'json',
            async:false,
            data:{id_minima:idMinima},
            success: function(data) {
                $("#lstFraccionamiento"+sufijo).prop("disabled",false);
                var res = jQuery.parseJSON(data);
                if(res.length>0){
                    $.each( res, function( key, val ) {

                        if(fraccionamiento==val.fraccionamiento&&fraccionamiento!=""){
                            selected="selected";
                        }else selected="";
                        $("#lstFraccionamiento"+sufijo).append("<option value='"+val.fraccionamiento+"' "+selected+">"+val.fraccionamiento+"</option>");
                    });
                }
            }, //mostramos el error
            error: function() { alert('Se ha producido un error Inesperado'); }
        });
    }else{
        $("#lstFraccionamiento"+sufijo).prop("disabled",true);
    }
}
/**
 * Función para la obtención de la duración de la excepción en formato de texto. El texto es formado a través de la combinación de la cantidad, unidad y fraccionamiento.
 * @param opcion
 */
function defineDuracionEnTexto(opcion){
    var sufijo = "New";
    if(opcion==2)sufijo = "Edit";
    $("#spanFrecuencia"+sufijo).html("");
    var cantidad = parseFloat($("#txtCantidad"+sufijo).val());
    var unidad = $("#lstUnidad"+sufijo).val();
    var fraccionamiento = $("#lstFraccionamiento"+sufijo).val();
    var duracion = "";
    if(cantidad!=''&&cantidad>0&&unidad!=''){
        duracion = cantidad+" "+unidad;
        if(cantidad>1){
            if(unidad=='MES')duracion+="ES";
            else duracion+="S";
        }
        if(fraccionamiento!=''){
           if(fraccionamiento!='SEMANA') duracion += ' AL '+fraccionamiento;
            else  duracion += ' A LA '+fraccionamiento;
        }
    }
    $("#spanFrecuencia"+sufijo).html(duracion);
}

/**
 * Formulario para la validación de lo datos enviados para el registro de excepciones en el sistema.
 * @author JLM
 * @returns {boolean}
 */
function validaFormularioExcepcion(opcion) {
    var ok = true;
    var msje = "";
    $(".msjs-alert").hide();
    var sufijo="New";
    if(opcion==2){
        sufijo="Edit";
    }
    limpiarMensajesErrorPorValidacionExcepcion(opcion);
    var enfoque = null;

    var txtExcepcion =$("#txtExcepcion"+sufijo);
    var divExcepcion = $("#divExcepcion"+sufijo);
    var helpErrorExcepcion = $("#helpErrorExcepcion"+sufijo);
    var excepcion = $("#txtExcepcion"+sufijo).val();

    var lstTipoExcepcion = $("#lstTipoExcepcion"+sufijo);
    var divTipoExcepcion = $("#divTipoExcepcion"+sufijo);
    var helpErrorTipoExcepcion = $("#helpErrorTipoExcepcion"+sufijo);
    var tipoExcepcion = $("#lstTipoExcepcion"+sufijo).val();

    var txtCodigo = $("#txtCodigo"+sufijo);
    var divCodigo = $("#divCodigo"+sufijo);
    var helpErrorCodigo = $("#helpErrorCodigo"+sufijo);
    var codigo = $("#txtCodigo"+sufijo).val();

    var txtColor = $("#txtColor"+sufijo);
    var divColor = $("#divColor"+sufijo);
    var helpErrorColor = $("#helpErrorColor"+sufijo);
    var color = $("#txtColor"+sufijo).val();

    var chkDescuento = $("#chkDescuento"+sufijo);
    var divDescuento = $("#divDescuento"+sufijo);
    var helpErrorDescuento = $("#helpErrorDescuento"+sufijo);
    var descuento = "0";
    if($("#chkDescuento"+sufijo).bootstrapSwitch("state")){
        descuento = "1";
    }

    var chkCompensatoria = $("#chkCompensatoria"+sufijo);
    var divCompensatoria = $("#divCompensatoria"+sufijo);
    var helpErrorCompensatoria = $("#helpErrorCompensatoria"+sufijo);
    var compensatoria = "0";
    if($("#chkCompensatoria"+sufijo).bootstrapSwitch("state")){
        compensatoria = "1";
    }

    var chkHorario = $("#chkHorario"+sufijo);
    var divHorario = $("#divHorario"+sufijo);
    var helpErrorHorario = $("#helpErrorHorario"+sufijo);
    var horario = "0";
    if($("#chkHorario"+sufijo).bootstrapSwitch("state")){
        horario = "1";
    }

    var chkRefrigerio = $("#chkRefrigerio"+sufijo);
    var divRefrigerio = $("#divRefrigerio"+sufijo);
    var helpErrorRefrigerio = $("#helpErrorRefrigerio"+sufijo);
    var refrigerio = "0";
    if($("#chkRefrigerio"+sufijo).bootstrapSwitch("state")){
        refrigerio = "1";
    }

    var chkBoleta = $("#chkBoleta"+sufijo);
    var divBoleta = $("#divBoleta"+sufijo);
    var helpErrorBoleta = $("#helpErrorBoleta"+sufijo);
    var boleta = "0";
    if($("#chkBoleta"+sufijo).bootstrapSwitch("state")){
        boleta = "1";
    }

    var lstGenero = $("#lstGenero"+sufijo);
    var divGenero = $("#divGenero"+sufijo);
    var helpErrorGenero = $("#helpErrorGenero"+sufijo);
    var genero = $("#lstGenero"+sufijo).val();

    var txtCantidad = $("#txtCantidad"+sufijo);
    var divCantidad = $("#divCantidad"+sufijo);
    var helpErrorCantidad = $("#helpErrorCantidad"+sufijo);
    var cantidad = $("#txtCantidad"+sufijo).val();

    var lstUnidad = $("#lstUnidad"+sufijo);
    var divUnidad = $("#divUnidad"+sufijo);
    var helpErrorUnidad = $("#helpErrorUnidad"+sufijo);
    var unidad = $("#lstUnidad"+sufijo).val();

    var lstFraccionamiento = $("#lstFraccionamiento"+sufijo);
    var divFraccionamiento = $("#divFraccionamiento"+sufijo);
    var helpErrorFraccionamiento = $("#helpErrorFraccionamiento"+sufijo);
    var fraccionamiento = $("#lstFraccionamiento"+sufijo).val();

    var txtObservacion = $("#txtObservacion"+sufijo);
    var divObservacion = $("#divObservacion"+sufijo);
    var helpErrorObservacion = $("#helpErrorObservacion"+sufijo);
    var observacion = $("#txtObservacion"+sufijo).val();

    if (excepcion == '') {
        ok = false;
        var msje = "Debe introducir el nombre de la excepci&oacute;n.";
        divExcepcion.addClass("has-error");
        helpErrorExcepcion.html(msje);
        if (enfoque == null)enfoque = txtExcepcion;
    }
    if(tipoExcepcion==''||tipoExcepcion==0){
        ok = false;
        var msje = "Debe seleccionar el tipo de excepci&oacute;n necesariamente.";
        divTipoExcepcion.addClass("has-error");
        helpErrorTipoExcepcion.html(msje);
        if (enfoque == null)enfoque = lstTipoExcepcion;
    }
    if(codigo==''){
        ok = false;
        var msje = "Debe registrar el c&oacute;digo a usarse para la excepci&oacute;n necesariamente.";
        divCodigo.addClass("has-error");
        helpErrorCodigo.html(msje);
        if (enfoque == null)enfoque = txtCodigo;
    }
    if(color==''||color.toUpperCase=='#FFFFFF'){
        ok = false;
        var msje = "Debe seleccionar el color para representar a la excepci&oacute;n necesariamente.";
        divColor.addClass("has-error");
        helpErrorColor.html(msje);
        if (enfoque == null)enfoque = txtColor;
    }
    if(descuento==''||descuento==undefined){
        ok = false;
        var msje = "Debe seleccionar si en la excepci&oacute;n se aplica descuento o no.";
        divDescuento.addClass("has-error");
        helpErrorDescuento.html(msje);
        if (enfoque == null)enfoque = chkDescuento;
    }

    if(compensatoria==''||compensatoria==undefined){
        ok = false;
        var msje = "Debe seleccionar si en la excepci&oacute;n se aplica compensatoria o no.";
        divCompensatoria.addClass("has-error");
        helpErrorCompensatoria.html(msje);
        if (enfoque == null)enfoque = chkCompensatoria;
    }
    if(genero<0||genero==''){
        ok = false;
        var msje = "Debe seleccionar un g&eacute;nero o si es indistinto necesariamente.";
        divGenero.addClass("has-error");
        helpErrorGenero.html(msje);
        if (enfoque == null)enfoque = lstGenero;
    }
    if(unidad!=''||fraccionamiento!=''){
        if(cantidad==''){
            ok = false;
            var msje = "Debido a que seleccion&oacute; un valor para la Unidad y/o Fraccionamiento debe introducir la cantidad necesariamente.";
            divCantidad.addClass("has-error");
            helpErrorCantidad.html(msje);
            if (enfoque == null)enfoque = txtCantidad;
        }
    }else{
        if(cantidad!=''){
            ok = false;
            var msje = "Debido a que registr&oacute; un valor para la cantidad debe seleccionar la Unidad y/o Fraccionamiento necesariamente.";
            divUnidad.addClass("has-error");
            helpErrorUnidad.html(msje);
            divFraccionamiento.addClass("has-error");
            helpErrorFraccionamiento.html(msje);
            if (enfoque == null)enfoque = lstUnidad;
        }
    }

    if (enfoque != null) {
        enfoque.focus();
    }
    return ok;
}
/**
 * Función para la limpieza de los mensajes de error debido a la validación del formulario.
 * @opción Variable que identifica a que tipo de formulario se aplica la función.
 */
function limpiarMensajesErrorPorValidacionExcepcion(opcion) {
    var sufijo = "New";
    if(opcion==2)sufijo = "Edit";
    $("#divExcepcion"+sufijo).removeClass("has-error");
    $("#helpErrorExcepcion"+sufijo).html("");
    $("#divTipoExcepcion"+sufijo).removeClass("has-error");
    $("#helpErrorTipoExcepcion"+sufijo).html("");
    $("#divCodigo"+sufijo).removeClass("has-error");
    $("#helpErrorCodigo"+sufijo).html("");
    $("#divColor"+sufijo).removeClass("has-error");
    $("#helpErrorColor"+sufijo).html("");
    $("#divDescuento"+sufijo).removeClass("has-error");
    $("#helpErrorDescuento"+sufijo).html("");
    $("#divCompensatoria"+sufijo).removeClass("has-error");
    $("#helpErrorCompensatoria"+sufijo).html("");
    $("#divGenero"+sufijo).removeClass("has-error");
    $("#helpErrorGenero"+sufijo).html("");
    $("#divCantidad"+sufijo).removeClass("has-error");
    $("#helpErrorCantidad"+sufijo).html("");
    $("#divUnidad"+sufijo).removeClass("has-error");
    $("#helpErrorUnidad"+sufijo).html("");
    $("#divFraccionamiento"+sufijo).removeClass("has-error");
    $("#helpErrorFraccionamiento"+sufijo).html("");
    $("#divHorario"+sufijo).removeClass("has-error");
    $("#helpErrorHorario"+sufijo).html("");
    $("#divRefrigerio"+sufijo).removeClass("has-error");
    $("#helpErrorRefrigerio"+sufijo).html("");
    $("#divBoleta"+sufijo).removeClass("has-error");
    $("#helpErrorBoleta"+sufijo).html("");
}
/**
 * Función para guardar el registro de la excepción.
 * @returns {boolean}
 */
function guardaExcepcion(opcion){
    var ok = false;
    var idExcepcion = 0;
    var sufijo = "New";
    if(opcion==2)
    {   idExcepcion = $("#hdnIdExcepcionEdit").val();
        sufijo="Edit";
    }
    var excepcion = $("#txtExcepcion"+sufijo).val();
    var tipoExcepcion = $("#lstTipoExcepcion"+sufijo).val();
    var codigo = $("#txtCodigo"+sufijo).val();
    var color = $("#txtColor"+sufijo).val();

    var descuento = 0;
    if($("#chkDescuento"+sufijo).bootstrapSwitch("state")){
        descuento = 1;
    }

    var compensatoria = 0;
    if($("#chkCompensatoria"+sufijo).bootstrapSwitch("state")){
        compensatoria = 1;
    }

    var horario = 0;
    if($("#chkHorario"+sufijo).bootstrapSwitch("state")){
        horario = 1;
    }

    var refrigerio = 0;
    if($("#chkRefrigerio"+sufijo).bootstrapSwitch("state")){
        refrigerio = 1;
    }

    var boleta = 0;
    if($("#chkBoleta"+sufijo).bootstrapSwitch("state")){
        boleta = 1;
    }

    var genero = $("#lstGenero"+sufijo).val();
    var cantidad = $("#txtCantidad"+sufijo).val();
    var unidad = $("#lstUnidad"+sufijo).val();
    var fraccionamiento = $("#lstFraccionamiento"+sufijo).val();
    var redondeo = 1;
    var observacion = $("#txtObservacion"+sufijo).val();
    if (excepcion != '') {
        $.ajax({
            url: '/excepciones/save/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {
                id: idExcepcion,
                excepcion:excepcion,
                tipoexcepcion_id:tipoExcepcion,
                codigo:codigo,
                color:color,
                descuento:descuento,
                compensatoria:compensatoria,
                genero_id:genero,
                cantidad:cantidad,
                unidad:unidad,
                fraccionamiento:fraccionamiento,
                redondeo:redondeo,
                horario:horario,
                refrigerio:refrigerio,
                boleta:boleta,
                observacion: observacion
            },
            success: function (data) {  //alert(data);
                var res = jQuery.parseJSON(data);
                /**
                 * Si se ha realizado correctamente el registro de excepción
                 */
                $(".msjes").hide();
                if (res.result == 1) {
                    ok = true;
                    $("#divMsjePorSuccess").html("");
                    $("#divMsjePorSuccess").append(res.msj);
                    $("#divMsjeNotificacionSuccess").jqxNotification("open");
                    $("#divGridExcepciones").jqxGrid("updatebounddata");
                } else if (res.result == 0) {
                    /**
                     * En caso de presentarse un error subsanable
                     */
                    $("#divMsjePorWarning").html("");
                    $("#divMsjePorWarning").append(res.msj);
                    $("#divMsjeNotificacionWarning").jqxNotification("open");
                } else {
                    /**
                     * En caso de haberse presentado un error crítico al momento de registrarse la relación laboral
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
 * Función para limpiar los campos correspondientes para el registro de una nueva excepción.
 */
function inicializarCamposParaNuevoRegistroExcepcion(){
    $("#hdnIdExcepcionEdit").val(0);
    $("#txtExcepcionNew").val("");
    $("#txtCodigoNew").val("");
    $("#txtColorNew").val("");
    $("#txtCantidadNew").val("");
    $("#txtObservacionNew").val("");
}
/**
 * Función para inicializar los datos referentes a la duración.
 * @param opcion
 * @param cantidad
 * @param unidad
 * @param fraccionamiento
 */
function inicializarDatosDuracion(opcion,cantidad,unidad,fraccionamiento){
    var sufijo = "New";
    if(opcion==2)sufijo = "Edit";
    $("#txtCantidad"+sufijo).val(cantidad);
    cargarTiposUnidades(opcion,unidad);
    var idMinima=0;
    if(opcion==2&&cantidad>0&&cantidad!=null){
        var arrUnidades = ["VEZ","MINUTO","HORA","DIA","SEMANA","MES","SEMESTRE","AÑO"];
        if(unidad!=""){
            var idClave = $.inArray( unidad, arrUnidades );
            idMinima = idClave+1;
        }
        cargarTiposFraccionamientos(opcion,idMinima,fraccionamiento);
        defineDuracionEnTexto(opcion);
    }else{
        cargarTiposFraccionamientos(opcion,idMinima,fraccionamiento);
        defineDuracionEnTexto(opcion);
    }
    $("#lstUnidad"+sufijo).off();
    $("#lstUnidad"+sufijo).on("change",function(){
        /**
         * Se aplica el uso del idMinima a objeto de obtener para fraccionamiento sólo aquellos valores superiores
         * al seleccionado considerando la unidad. Siendo que contienen los mismos valores.
         * @type {*|jQuery}
         */
        idMinima = $("#lstUnidad"+sufijo+" option:selected").data("id-unidad");
        cargarTiposFraccionamientos(opcion,idMinima,fraccionamiento);
        defineDuracionEnTexto(opcion);
    });
    $("#txtCantidad"+sufijo+",#lstUnidad"+sufijo+",#lstFraccionamiento"+sufijo).on("change",function(){
        defineDuracionEnTexto(opcion);
    });
}