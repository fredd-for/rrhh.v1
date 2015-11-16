/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  05-03-2014
 */
/**
 * Función para inicializar el formulario para el registro y edición de controles de excepción.
 * @param opcion
 * @param idRelaboral
 * @param idExcepcion
 * @param fechaIni
 * @param horaIni
 * @param fechaFin
 * @param horaFin
 * @param justificacion
 * @param entrada
 * @param entrada_salida
 * @param genero_id
 * @param observacion
 */
function inicializarFormularioControlExcepcionesNuevoEditar(opcion,idRelaboral,idExcepcion,fechaIni,horaIni,fechaFin,horaFin,justificacion,turno,entrada_salida,tipoGenero,observacion){
    var sufijo="New";
    if(opcion==2) sufijo="Edit";

    $("#txtFechaIni"+sufijo).datepicker("update","");
    $("#txtFechaIni"+sufijo).val("").datepicker('update');

    $("#txtFechaFin"+sufijo).datepicker("update","");
    $("#txtFechaFin"+sufijo).val("").datepicker('update');

    $("#txtHoraIni"+sufijo).val("");
    $("#txtHoraFin"+sufijo).val("");

    $("#txtJustificacion"+sufijo).val("");
    $("#txtObservacion"+sufijo).val("");
    if(opcion==2){
        $("#txtFechaIni"+sufijo).datepicker("update",fechaIni);
        $("#txtHoraIni"+sufijo).val(horaIni);
        $("#txtFechaFin"+sufijo).datepicker("update",fechaFin);
        $("#txtHoraFin"+sufijo).val(horaFin);
    }
    $("#txtFechaIni"+sufijo).datepicker("hiden");
    $("#txtFechaFin"+sufijo).datepicker("hiden");

    $("#txtJustificacion"+sufijo).val(justificacion);

    $("#lblObservacion"+sufijo).text("Observaciones:");
    $("#txtObservacion"+sufijo).prop("placeholder","Observaciones...");

    $("#txtObservacion"+sufijo).val(observacion);

    var inputIni = $("#txtHoraIni"+sufijo).clockpicker({
        placement: "bottom",
        align: "left",
        autoclose: true,
        'default': "now"
    }).on('changeDate', function (ev) {
        $(this).hide();
    });
    $("#aHoraIni"+sufijo).off();
    $("#aHoraIni"+sufijo).on("click",function(e){
        e.stopPropagation();
        inputIni.clockpicker('show');
    });
    var inputFin = $("#txtHoraFin"+sufijo).clockpicker({
        placement: "bottom",
        align: "left",
        autoclose: true,
        'default': "now"
    }).on('changeDate', function (ev) {
        $(this).hide();
    });
    $("#aHoraFin"+sufijo).off();
    $("#aHoraFin"+sufijo).on("click",function(e){
        e.stopPropagation();
        inputFin.clockpicker('show');
    });
    cargaListaDeExcepciones(opcion,idExcepcion,tipoGenero,1);
    $("#tbodyGrillaExcepciones"+sufijo).html("");
    if(opcion==1){
        $("#divCompensacionNew").hide();
        $("#divHorariosNew").hide();
        cargarCompensacionTurnos(0,0);
        cargarCompensacionEntradaSalida(0,-1);
    }else{
        var tipo_excepcion = "";
        if($("#lstExcepcion"+sufijo+" option:selected").data("tipo_excepcion")!=''&&$("#lstExcepcion"+sufijo+" option:selected").data("tipo_excepcion")!=null)
            tipo_excepcion = $("#lstExcepcion"+sufijo+" option:selected").data("tipo_excepcion");
        if(tipo_excepcion=="COMISION"||tipo_excepcion=="COMISIÓN"){
            $("#lblObservacion"+sufijo).text("Lugar *:");
            $("#txtObservacion"+sufijo).prop("placeholder","Lugar...");
        }
        var codigo = $("#lstExcepcion"+sufijo+" option:selected").data("codigo");
        var color = $("#lstExcepcion"+sufijo+" option:selected").data("color");
        var descuento = $("#lstExcepcion"+sufijo+" option:selected").data("descuento");
        var descuento_descripcion = $("#lstExcepcion"+sufijo+" option:selected").data("descuento_descripcion");
        var compensatoria = $("#lstExcepcion"+sufijo+" option:selected").data("compensatoria");
        var compensatoria_descripcion = $("#lstExcepcion"+sufijo+" option:selected").data("compensatoria_descripcion");
        var genero = $("#lstExcepcion"+sufijo+" option:selected").data("genero");
        var cantidad = $("#lstExcepcion"+sufijo+" option:selected").data("cantidad");
        var unidad = $("#lstExcepcion"+sufijo+" option:selected").data("unidad");
        var fraccionamiento = $("#lstExcepcion"+sufijo+" option:selected").data("fraccionamiento");
        var horario = $("#lstExcepcion"+sufijo+" option:selected").data("horario");
        var horario_descripcion = $("#lstExcepcion"+sufijo+" option:selected").data("horario_descripcion");
        var refrigerio = $("#lstExcepcion"+sufijo+" option:selected").data("refrigerio");
        var refrigerio_descripcion = $("#lstExcepcion"+sufijo+" option:selected").data("refrigerio_descripcion");
        var frecuencia_descripcion = "&nbsp;";
        if($("#lstExcepcion"+sufijo+" option:selected").data("frecuencia_descripcion")!=''&&$("#lstExcepcion"+sufijo+" option:selected").data("frecuencia_descripcion")!=null)
            frecuencia_descripcion = $("#lstExcepcion"+sufijo+" option:selected").data("frecuencia_descripcion");
        var grilla = "<tr>";
        grilla += "<td style='text-align: center'>"+tipo_excepcion+"</td>";
        grilla += "<td style='text-align: center'>"+codigo+"</td>";
        grilla += "<td style='background: "+color+"'>&nbsp;</td>";
        grilla += "<td style='text-align: center'>"+descuento_descripcion+"</td>";
        grilla += "<td style='text-align: center'>"+compensatoria_descripcion+"</td>";
        grilla += "<td style='text-align: center'>"+genero+"</td>";
        grilla += "<td style='text-align: center'>"+horario_descripcion+"</td>";
        grilla += "<td style='text-align: center'>"+refrigerio_descripcion+"</td>";
        grilla += "<td style='text-align: center'>"+frecuencia_descripcion+"</td>";
        grilla += "</tr>";
        $("#tbodyGrillaExcepciones"+sufijo).append(grilla);
        if(compensatoria==1){
            $("#divCompensacion"+sufijo).show();
            cargarCompensacionTurnos(opcion,turno);
            cargarCompensacionEntradaSalida(opcion,entrada_salida);
        }else{
            $("#divCompensacion"+sufijo).hide();
        }
        if(horario==1){
            $("#divHorarios"+sufijo).show();
        }else{
            $("#divHorarios"+sufijo).hide();
        }
    }
    $("#lstExcepcion"+sufijo).off();
    $("#lstExcepcion"+sufijo).on("change",function(){
        $("#tbodyGrillaExcepciones"+sufijo).html("");
        if(this.value!=''){
            var tipo_excepcion = "";
            if($("#lstExcepcion"+sufijo+" option:selected").data("tipo_excepcion")!=''&&$("#lstExcepcion"+sufijo+" option:selected").data("tipo_excepcion")!=null)
                tipo_excepcion = $("#lstExcepcion"+sufijo+" option:selected").data("tipo_excepcion");
            if(tipo_excepcion=="COMISIÓN"||tipo_excepcion=="COMISION"){
                $("#lblObservacion"+sufijo).text("Lugar *:");
                $("#txtObservacion"+sufijo).prop("placeholder","Lugar...");
            }else {
                $("#lblObservacion"+sufijo).text("Observaciones:");
                $("#txtObservacion"+sufijo).prop("placeholder","Observaciones...");
            }
            var codigo = $("#lstExcepcion"+sufijo+" option:selected").data("codigo");
            var color = $("#lstExcepcion"+sufijo+" option:selected").data("color");
            var descuento = $("#lstExcepcion"+sufijo+" option:selected").data("descuento");
            var descuento_descripcion = $("#lstExcepcion"+sufijo+" option:selected").data("descuento_descripcion");
            var compensatoria = $("#lstExcepcion"+sufijo+" option:selected").data("compensatoria");
            var compensatoria_descripcion = $("#lstExcepcion"+sufijo+" option:selected").data("compensatoria_descripcion");
            var genero = $("#lstExcepcion"+sufijo+" option:selected").data("genero");
            var cantidad = $("#lstExcepcion"+sufijo+" option:selected").data("cantidad");
            var unidad = $("#lstExcepcion"+sufijo+" option:selected").data("unidad");
            var fraccionamiento = $("#lstExcepcion"+sufijo+" option:selected").data("fraccionamiento");
            var horario = $("#lstExcepcion"+sufijo+" option:selected").data("horario");
            var horario_descripcion = $("#lstExcepcion"+sufijo+" option:selected").data("horario_descripcion");
            var refrigerio = $("#lstExcepcion"+sufijo+" option:selected").data("refrigerio");
            var refrigerio_descripcion = $("#lstExcepcion"+sufijo+" option:selected").data("refrigerio_descripcion");
            var frecuencia_descripcion = "&nbsp;";
            if($("#lstExcepcion"+sufijo+" option:selected").data("frecuencia_descripcion")!=''&&$("#lstExcepcion"+sufijo+" option:selected").data("frecuencia_descripcion")!=null)
                frecuencia_descripcion = $("#lstExcepcion"+sufijo+" option:selected").data("frecuencia_descripcion");
            var grilla = "<tr>";
            grilla += "<td style='text-align: center'>"+tipo_excepcion+"</td>";
            grilla += "<td style='text-align: center'>"+codigo+"</td>";
            grilla += "<td style='background: "+color+"'>&nbsp;</td>";
            grilla += "<td style='text-align: center'>"+descuento_descripcion+"</td>";
            grilla += "<td style='text-align: center'>"+compensatoria_descripcion+"</td>";
            grilla += "<td style='text-align: center'>"+genero+"</td>";
            grilla += "<td style='text-align: center'>"+horario_descripcion+"</td>";
            grilla += "<td style='text-align: center'>"+refrigerio_descripcion+"</td>";
            grilla += "<td style='text-align: center'>"+frecuencia_descripcion+"</td>";
            grilla += "</tr>";
            $("#tbodyGrillaExcepciones"+sufijo).append(grilla);
            /**
             * En caso de que el valor implique la determinación de compensación de horas es necesario establecer en que turno se realizará y si será a la entrada o a la salida.
             */
            if(compensatoria==1){
                $("#divCompensacion"+sufijo).show();
                cargarCompensacionTurnos(opcion,0);
                cargarCompensacionEntradaSalida(opcion,-1);
            }else{
                $("#divCompensacion"+sufijo).hide();
            }
            if(horario==1){
                $("#divHorarios"+sufijo).show();
            }else{
                $("#divHorarios"+sufijo).hide();
            }
            $("#txtFechaIni"+sufijo).focus();
        }
    });
}
/**
 * Función para la obtención del listado de excepciones definidas en el sistema.
 * @param opcion      -- Valor que permite determinar el formulario en el que se ejecuta.
 * @param idExcepcion -- Identificador de la excepción que debería estar seleccionada por defecto en caso de que su valor sea mayor a cero.
 * @param tipoGenero -- Variable para dar a conocer si se requiere sólo excepciones para el genero.
 * @param boleta -- Función que implica el despliegue de sólo los registros que admiten boleta.
 */
function cargaListaDeExcepciones(opcion,idExcepcion,tipoGenero,boleta){
    var sufijo = "New";
    if(opcion==2)sufijo = "Edit";
    var selected = "";
    $("#lstExcepcion"+sufijo).html("");
    $("#lstExcepcion"+sufijo).append("<option value=''>Seleccionar..</option>");
    $("#lstExcepcion"+sufijo).prop("disabled",true);
    var frecuencia = "";
    $.ajax({
        url: '/excepciones/list/',
        type: "POST",
        datatype: 'json',
        data:{genero:tipoGenero,boleta:boleta},
        async: false,
        cache: false,
        success: function (data) {  //alert(data);
            var res = jQuery.parseJSON(data);
            if(res.length>0){
                $("#lstExcepcion"+sufijo).prop("disabled",false);
                $.each( res, function( key, val ) {
                    if(idExcepcion==val.id){selected="selected";
                    }else selected="";
                    if(val.frecuencia_descripcion!=''&&val.frecuencia_descripcion!=null)frecuencia = "(M&Aacute;XIMO "+val.frecuencia_descripcion+")";
                    else frecuencia = "";
                    $("#lstExcepcion"+sufijo).append("<option value='"+val.id+"' "+selected+" data-tipo_excepcion='"+val.tipo_excepcion+"' data-codigo='"+val.codigo+"' data-color='"+val.color+"' data-descuento='"+val.descuento+"' data-descuento_descripcion='"+val.descuento_descripcion+"' data-compensatoria='"+val.compensatoria+"' data-compensatoria_descripcion='"+val.compensatoria_descripcion+"' data-genero='"+val.genero+"' data-cantidad='"+val.cantidad+"' data-unidad='"+val.unidad+"' data-fraccionamiento='"+val.fraccionamiento+"' data-frecuencia_descripcion='"+val.frecuencia_descripcion+"' data-horario='"+val.horario+"' data-horario_descripcion='"+val.horario_descripcion+"' data-refrigerio='"+val.refrigerio+"' data-refrigerio_descripcion='"+val.refrigerio_descripcion+"'>"+val.excepcion+" "+frecuencia+"</option>");
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
 * Función para validar los datos del formulario de registro y edición de  control de excepciones.
 * @returns {boolean}
 */
function validaFormularioControlExcepciones(opcion){
    var ok = true;
    var sufijo = "New";
    var idControlExcepcion = 0;
    var idRelaboral = 0;
    if(opcion==2){
        sufijo="Edit";
        idControlExcepcion = $("#hdnIdControlExcepcionEdit").val()
        idRelaboral = $("#hdnIdRelaboralEdit").val()
    }else{
        idRelaboral = $("#hdnIdRelaboralNew").val()
    }
    var msje = "";
    $(".msjs-alert").hide();
    limpiarMensajesErrorPorValidacionControlExcepcion(opcion);
    var enfoque = null;

    var tipo_excepcion = "";
    if($("#lstExcepcion"+sufijo+" option:selected").data("tipo_excepcion")!=''&&$("#lstExcepcion"+sufijo+" option:selected").data("tipo_excepcion")!=null)
        tipo_excepcion = $("#lstExcepcion"+sufijo+" option:selected").data("tipo_excepcion");

    var lstExcepcion =$("#lstExcepcion"+sufijo);
    var divExcepcion = $("#divExcepcion"+sufijo);
    var helpErrorExcepcion = $("#helpErrorExcepcion"+sufijo);
    var idExcepcion = $("#lstExcepcion"+sufijo).val();

    var descuento = $("#lstExcepcion"+sufijo+" option:selected").data("descuento");
    var compensatoria = $("#lstExcepcion"+sufijo+" option:selected").data("compensatoria");
    var genero_id = $("#lstExcepcion"+sufijo+" option:selected").data("genero_id");
    var cantidad = $("#lstExcepcion"+sufijo+" option:selected").data("cantidad");
    var unidad = $("#lstExcepcion"+sufijo+" option:selected").data("unidad");
    var fraccionamiento = $("#lstExcepcion"+sufijo+" option:selected").data("fraccionamiento");
    var horario = $("#lstExcepcion"+sufijo+" option:selected").data("horario");
    var refrigerio = $("#lstExcepcion"+sufijo+" option:selected").data("refrigerio");

    var txtFechaIni = $("#txtFechaIni"+sufijo);
    var divFechaIni = $("#divFechaIni"+sufijo);
    var helpErrorFechaIni = $("#helpErrorFechaIni"+sufijo);
    var fechaIni = $("#txtFechaIni"+sufijo).val();

    var txtHoraIni = $("#txtHoraIni"+sufijo);
    var divHoraIni = $("#divHoraIni"+sufijo);
    var helpErrorHoraIni = $("#helpErrorHoraIni"+sufijo);
    var horaIni = $("#txtHoraIni"+sufijo).val();

    var txtFechaFin = $("#txtFechaFin"+sufijo);
    var divFechaFin = $("#divFechaFin"+sufijo);
    var helpErrorFechaFin = $("#helpErrorFechaFin"+sufijo);
    var fechaFin = $("#txtFechaFin"+sufijo).val();

    var txtHoraFin = $("#txtHoraFin"+sufijo);
    var divHoraFin = $("#divHoraFin"+sufijo);
    var helpErrorHoraFin = $("#helpErrorHoraFin"+sufijo);
    var horaFin = $("#txtHoraFin"+sufijo).val();

    var txtJustificacion = $("#txtJustificacion"+sufijo);
    var divJustificacion = $("#divJustificacion"+sufijo);
    var helpErrorJustificacion = $("#helpErrorJustificacion"+sufijo);
    var justificacion = $("#txtJustificacion"+sufijo).val();

    var txtObservacion = $("#txtJbservacion"+sufijo);
    var divObservacion = $("#divObservacion"+sufijo);
    var helpErrorObservacion = $("#helpErrorObservacion"+sufijo);
    var observacion= $("#txtObservacion"+sufijo).val();


    var lstTurno = $("#lstCompensacionTurno"+sufijo);
    var divTurno = $("#divCompensacionTurno"+sufijo);
    var helpErrorTurno = $("#helpErrorCompensacionTurno"+sufijo);
    var turno = $("#lstCompensacionTurno"+sufijo).val();

    var lstEntradaSalida = $("#lstCompensacionEntradaSalida"+sufijo);
    var divEntradaSalida = $("#divCompensacionEntradaSalida"+sufijo);
    var helpErrorEntradaSalida = $("#helpErrorCompensacionEntradaSalida"+sufijo);
    var entradaSalida = $("#lstCompensacionEntradaSalida"+sufijo).val();

    if (idExcepcion == ''||idExcepcion==0) {
        ok = false;
        var msje = "Debe seleccionar la excepci&oacute;n necesariamente.";
        divExcepcion.addClass("has-error");
        helpErrorExcepcion.html(msje);
        if (enfoque == null)enfoque = lstExcepcion;
    }
    if(fechaIni==''){
        ok = false;
        var msje = "Debe seleccionar la fecha de inicio de la excepci&oacute;n.";
        divFechaIni.addClass("has-error");
        helpErrorFechaIni.html(msje);
        if (enfoque == null)enfoque = txtFechaIni;
    }
    if(fechaFin==''){
        ok = false;
        var msje = "Debe seleccionar la fecha de finalizaci&oacute;n de la excepci&oacute;n.";
        divFechaFin.addClass("has-error");
        helpErrorFechaFin.html(msje);
        if (enfoque == null)enfoque = txtFechaFin;
    }
    var sep="-";
    if(procesaTextoAFecha(fechaFin,sep)<procesaTextoAFecha(fechaIni,sep)){
        ok=false;
        msje = "La fecha de inicio no puede ser superior a la fecha de finalizaci&oacute;n.";
        $("#divFechaIni"+sufijo).show();
        $("#divFechaIni"+sufijo).addClass("has-error");
        $("#helpErrorFechaIni"+sufijo).html(msje);
        $("#divFechaFin"+sufijo).show();
        $("#divFechaFin"+sufijo).addClass("has-error");
        $("#helpErrorFechaFin"+sufijo).html(msje);
        if(enfoque==null)enfoque =$("#txtFechaFin"+sufijo);
    }
    if(justificacion==''){
        ok = false;
        var msje = "Debe introducir la justificaci&oacute;n para solicitar la excepci&oacute;n.";
        divJustificacion.addClass("has-error");
        helpErrorJustificacion.html(msje);
        if (enfoque == null)enfoque = txtJustificacion;
    }
    if(compensatoria==1){
        if(turno==0||turno==undefined){
            ok = false;
            var msje = "Debe seleccionar el turno en el cual se compensar&aacute; el permiso.";
            divTurno.addClass("has-error");
            helpErrorTurno.html(msje);
            if (enfoque == null)enfoque = lstTurno;
        }
        if(entradaSalida<0||entradaSalida==''||entradaSalida==undefined){
            ok = false;
            var msje = "Debe seleccionar si lo compensaci&oacute;n se efecturar&aacute; en la Entrada o en la Salida del turno.";
            divEntradaSalida.addClass("has-error");
            helpErrorEntradaSalida.html(msje);
            if (enfoque == null)enfoque = lstEntradaSalida;
        }
    }
    if(horario==1){
        if(horaIni==''){
            ok = false;
            var msje = "Debe seleccionar la hora de inicio de la excepci&oacute;n.";
            divHoraIni.addClass("has-error");
            helpErrorHoraIni.html(msje);
            if (enfoque == null)enfoque = txtHoraIni;
        }
        if(horaFin==''){
            ok = false;
            var msje = "Debe seleccionar la hora de finalizaci&oacute;n de la excepci&oacute;n.";
            divHoraFin.addClass("has-error");
            helpErrorHoraFin.html(msje);
            if (enfoque == null)enfoque = txtHoraFin;
        }
    }

    if(tipo_excepcion=="COMISION"||tipo_excepcion=="COMISIÓN"){
        if($("#txtObservacion"+sufijo).val()==""){
            ok = false;
            var msje = "Debe especificar el lugar de asignaci&oacute;n de la excepci&oacute;n.";
            divObservacion.addClass("has-error");
            helpErrorObservacion.html(msje);
            if (enfoque == null)enfoque = txtObservacion;
        }
    }
    if (enfoque != null) {
        enfoque.focus();
    }
    var okk = verificaCruceDeHorariosYExcesoEnUso(idControlExcepcion,idRelaboral,idExcepcion,fechaIni,horaIni,fechaFin,horaFin,horario,justificacion);
    if(!okk)ok=false;
    var okkk = verificaFrecuencia(idControlExcepcion,idRelaboral,idExcepcion,fechaIni,horaIni,fechaFin,horaFin,horario);
    if(!okkk)ok=false;
    return ok;
}
/**
 * Función para la limpieza de los mensajes de error debido a la validación del formulario.
 * @opción Variable que identifica a que tipo de formulario se aplica la función.
 */
function limpiarMensajesErrorPorValidacionControlExcepcion(opcion) {
    var sufijo = "New";
    if(opcion==2)sufijo = "Edit";
    $("#divExcepcion"+sufijo).removeClass("has-error");
    $("#helpErrorExcepcion"+sufijo).html("");
    $("#divFechaIni"+sufijo).removeClass("has-error");
    $("#helpErrorFechaIni"+sufijo).html("");
    $("#divHoraIni"+sufijo).removeClass("has-error");
    $("#helpErrorHoraIni"+sufijo).html("");
    $("#divFechaFin"+sufijo).removeClass("has-error");
    $("#helpErrorFechaFin"+sufijo).html("");
    $("#divHoraFin"+sufijo).removeClass("has-error");
    $("#helpErrorHoraFin"+sufijo).html("");
    $("#divJustificacion"+sufijo).removeClass("has-error");
    $("#helpErrorJustificacion"+sufijo).html("");
    $("#divObservacion"+sufijo).removeClass("has-error");
    $("#helpErrorObservacion"+sufijo).html("");
    $("#divCompensacionTurno"+sufijo).removeClass("has-error");
    $("#divCompensacionEntradaSalida"+sufijo).removeClass("has-error");
    $("#helpErrorJustificacion"+sufijo).html("");
}

/**
 * Función para el almacenamiento de los datos registrados en el formulario de control de excepciones.
 */
function guardaMisControlExcepciones(opcion) {
    var ok = false;
    var idControlExcepcion = 0;
    var sufijo = "New";
    if (opcion == 2) {
        idControlExcepcion = $("#hdnIdControlExcepcionEdit").val();
        sufijo = "Edit";
    }
    var idRelaboral = $("#hdnIdRelaboral"+sufijo).val();
    var idExcepcion = $("#lstExcepcion"+sufijo).val();
    var fechaIni = $("#txtFechaIni"+sufijo).val();
    var horaIni = $("#txtHoraIni"+sufijo).val();
    var fechaFin = $("#txtFechaFin"+sufijo).val();
    var horaFin = $("#txtHoraFin"+sufijo).val();
    var justificacion = $("#txtJustificacion"+sufijo).val();

    var turno = 0;
    var entradaSalida=0;
    var compensatoria = $("#lstExcepcion"+sufijo+" option:selected").data("compensatoria");
    if(compensatoria==1){
        turno = $("#lstCompensacionTurno"+sufijo).val();
        entradaSalida = $("#lstCompensacionEntradaSalida"+sufijo).val();
    }

    var horario = $("#lstExcepcion"+sufijo+" option:selected").data("horario");

    var observacion = $("#txtObservacion"+sufijo).val();
    if (idExcepcion != ''&&idExcepcion>0) {
        $.ajax({
            url: '/controlexcepciones/save/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {
                id: idControlExcepcion,
                relaboral_id:idRelaboral,
                excepcion_id:idExcepcion,
                fecha_ini:fechaIni,
                hora_ini:horaIni,
                fecha_fin:fechaFin,
                hora_fin:horaFin,
                justificacion:justificacion,
                turno:turno,
                entrada_salida:entradaSalida,
                horario:horario,
                observacion: observacion
            },
            success: function (data) {  //alert(data);
                var res = jQuery.parseJSON(data);
                $(".msjes").hide();
                if (res.result == 1) {
                    ok = true;
                    $("#divMsjePorSuccess").html("");
                    $("#divMsjePorSuccess").append(res.msj);
                    $("#divMsjeNotificacionSuccess").jqxNotification("open");
                    $("#divGridControlExcepciones").jqxGrid("updatebounddata");
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
    }
    return ok;
}
/**
 * Función para la verificación de la no existencia de cruce de horarios en cuanto a la aplicación de las excepciones para una determinada persona.
 * Considerando adicionalmente que sea aplicable el permiso controlando que no se haya excedido la cantidad permitida en un lapso de tiempo.
 * @param idControlExcepcion
 * @param idRelaboral
 * @param idExcepcion
 * @param fechaIni
 * @param horaIni
 * @param fechaFin
 * @param horaFin
 * @param horario
 * @param justificacion
 */
function verificaCruceDeHorariosYExcesoEnUso(idControlExcepcion,idRelaboral,idExcepcion,fechaIni,horaIni,fechaFin,horaFin,horario,justificacion){
    var ok = false;
    $.ajax({
        url: '/controlexcepciones/verificacruceexcesouso/',
        type: "POST",
        datatype: 'json',
        async: false,
        cache: false,
        data: {
            id:idControlExcepcion,
            relaboral_id:idRelaboral,
            excepcion_id:idExcepcion,
            excepcion_id:idExcepcion,
            fecha_ini:fechaIni,
            hora_ini:horaIni,
            fecha_fin:fechaFin,
            hora_fin:horaFin,
            horario:horario,
            justificacion:justificacion
        },
        success: function (data) {  //alert(data);
            var res = jQuery.parseJSON(data);
            $(".msjes").hide();
            if (res.result == 0) {
                ok = true;
            } else if (res.result == 1) {
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
 * Función para el establecimiento del listado disponible de turnos para compensar en caso de que deba hacerse.
 * @param opcion
 * @param turno
 */
function cargarCompensacionTurnos(opcion,turno){
    var sufijo = "New";
    if(opcion==2){
        sufijo = "Edit";
    }
    var lista = "";
    var selected = "";
    $("#lstCompensacionTurno"+sufijo).html("");
    $("#lstCompensacionTurno"+sufijo).append("<option value=''>Seleccionar..</option>");
    if(opcion>0){
        $("#lstCompensacionTurno"+sufijo).prop("disabled",false);
        for(var c=1;c<=2;c++){
            if(turno==c)selected="selected";
            else selected="";
            lista += "<option value='"+c+"' "+selected+">"+c+"°</option>";
        }
        $("#lstCompensacionTurno"+sufijo).append(lista);
    }else{
        $("#lstCompensacionTurno"+sufijo).prop("disabled",true);
    }
}
/**
 * Función para el despliegue de los dos tipos de Marcación posible en un turno: Entrada (0) o Salida (1)
 * @param opcion
 * @param entradaSalida
 */
function cargarCompensacionEntradaSalida(opcion,entradaSalida){
    var sufijo = "New";
    if(opcion==2){
        sufijo = "Edit";
    }
    var lista = "";
    var selected = "";
    $("#lstCompensacionEntradaSalida"+sufijo).html("");
    $("#lstCompensacionEntradaSalida"+sufijo).append("<option value=''>Seleccionar..</option>");
    if(opcion>0){
        $("#lstCompensacionEntradaSalida"+sufijo).prop("disabled",false);
        if(entradaSalida==0){
            selected = "selected";
        }
        lista += "<option value='0' "+selected+">ENTRADA</option>";
        selected = "";
        if(entradaSalida==1){
            selected = "selected";
        }
        lista += "<option value='1' "+selected+">SALIDA</option>";
        $("#lstCompensacionEntradaSalida"+sufijo).append(lista);
    }else{
        $("#lstCompensacionEntradaSalida"+sufijo).prop("disabled",true);
    }
}
/**
 * Función para la verificación del cumplimiento de la frecuencia de un determinado registro de control de excepción.
 * @param idControlExcepcion
 * @param idRelaboral
 * @param idExcepcion
 * @param fechaIni
 * @param horaIni
 * @param fechaFin
 * @param horaFin
 * @param horario
 * @param justificacion
 * @returns {boolean}
 */
function verificaFrecuencia(idControlExcepcion,idRelaboral,idExcepcion,fechaIni,horaIni,fechaFin,horaFin,horario){
    var ok = false;
    $.ajax({
        url: '/controlexcepciones/verificafrecuencia/',
        type: "POST",
        datatype: 'json',
        async: false,
        cache: false,
        data: {
            id_controlexcepcion:idControlExcepcion,
            id_relaboral:idRelaboral,
            id_excepcion:idExcepcion,
            fecha_ini:fechaIni,
            hora_ini:horaIni,
            fecha_fin:fechaFin,
            hora_fin:horaFin,
            horario:horario
        },
        success: function (data) {  //alert(data);
            var res = jQuery.parseJSON(data);
            $(".msjes").hide();
            if (res.result == 1||res.result == 2) {
                ok = true;
            } else if (res.result == 1) {
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