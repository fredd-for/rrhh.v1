/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  29-07-2015
 */
/**
 * Función para abrir el formulario para el registro de Formulario 110 de Impuestos por Refrigerio.
 * @param idRelaboral
 * @param gestion
 * @param mes
 * @param idUsuario
 */
function abrirVentanaModalForm110ImpRef(rowline){
    $("#txtImporte").val("");
    $("#txtImpuesto").val("");
    $("#txtFechaForm").val("");
    $("#txtObservacion").val("");
    $("#hdnRowLine").val(rowline);
    $("#hdnIdForm110ImpRef").val(0);
    $("#hdnIdRelaboralForm110ImpRef").val(0);
    $("#hdnTotalGanadoForm110ImpRef").val(0);
    $("#hdnGestionForm110ImpRef").val(0);
    $("#hdnMesForm110ImpRef").val(0);
    var redondeo = 0;
    limpiarVentanaModalForm110ImpRef();
    if(rowline>=0){
        var dataRecord = $("#divGridPlanillasRefGen").jqxGrid('getrowdata', rowline);
        var rcIvaDebido = dataRecord.total_ganado*0.13;
        rcIvaDebido = rcIvaDebido.toFixed(redondeo);
        var form110Object = getOneForm110ImpRef(dataRecord.id_form110impref,dataRecord.id_relaboral,dataRecord.gestion,dataRecord.mes);
        if(dataRecord.id_form110impref>0){
            $("#hdnIdForm110ImpRef").val(parseInt(dataRecord.id_form110impref));
        }
        if(dataRecord.id_relaboral>0){
            $("#hdnIdRelaboralForm110ImpRef").val(dataRecord.id_relaboral);
        }
        if(dataRecord.total_ganado>0){
            $("#hdnTotalGanadoForm110ImpRef").val(parseInt(dataRecord.total_ganado));
        }
        if(dataRecord.gestion>0){
            $("#hdnGestionForm110ImpRef").val(dataRecord.gestion);
        }
        if(dataRecord.mes>0){
            $("#hdnMesForm110ImpRef").val(dataRecord.mes);
        }
        if(form110Object.id>0){
            $("#txtImporte").val(form110Object.importe);
            $("#txtImpuesto").val(form110Object.impuesto);
            $("#txtRetencion").val(form110Object.retencion);
            $("#txtFechaForm").val(form110Object.fecha_form);
            $("#txtObservacion").val(form110Object.observacion);
        }else{
            $("#txtRetencion").val(rcIvaDebido);
        }
        $("#popupFormulario110ImpRef").modal("show");
        $('#popupFormulario110ImpRef').on('shown.bs.modal', function () {
            $("#txtImporte").focus();
        });
        $("#lblTotalGanado").text(dataRecord.total_ganado);
        $("#txtImporte").off();
        $("#txtImporte").on("change",function(){
            var importe = $("#txtImporte").val();
            var impuesto = importe*0.13;
            impuesto = impuesto.toFixed(redondeo)
            $("#txtImpuesto").val(impuesto);
            var retencion = rcIvaDebido - impuesto;
            retencion = retencion.toFixed(redondeo);
            if(retencion<0){
                retencion = 0;
            }
            $("#txtRetencion").val(retencion);
        });
        var regexDateValidator = function (fecha) {
            return (fecha).match(/([0-9]{2})\-([0-9]{2})\-([0-9]{4})/);
        }
        $("#txtFechaForm").on("blur",function(){
            accept = regexDateValidator($(this).val());
            if (!accept) $(this).val('');
        });
    }
}
/**
 * Función para limpiar el formulario Modal para el Registro de Formularios 110 de Refrigerios.
 */
function limpiarVentanaModalForm110ImpRef(){

    $("#divImporte").removeClass("has-error");
    $("#helpErrorImporte").html("");

    $("#divImpuesto").removeClass("has-error");
    $("#helpErrorImpuesto").html("");

    $("#divFechaForm").removeClass("has-error");
    $("#helpErrorFechaForm").html("");

    $("#divObservacion").removeClass("has-error");
    $("#helpErrorObservacion").html("");
}
/**
 * Función para la obtención de los datos correspondientes al registro de pago de formulario 110 por impuesto de refrigerio.
 * @param id
 * @param idRelaboral
 * @param gestion
 * @param mes
 */
function getOneForm110ImpRef(id,idRelaboral,gestion,mes){
    var objForm110ImpRef = {id:0,relaboral_id:0,gestion:0,mes:0,cantidad:0,monto_diario:0,importe:0,impuesto:0,retencion:0,fecha_form:null,
        codigo:null,observacion:null,estado:0};
    $.ajax({
        url:'/form110impref/getoneforrelaboral/',
        type:"POST",
        datatype: 'json',
        async:false,
        cache:false,
        data:{id:id,
            id_relaboral:idRelaboral,
            gestion:gestion,
            mes:mes
        },
        success: function(data) {  //alert(data);

            var res = jQuery.parseJSON(data);
            if(res.length>0){
                $.each(res, function (key, val) {
                    objForm110ImpRef = {id:val.id,relaboral_id:val.relaboral_id,gestion:val.gestion,mes:val.mes,cantidad:val.cantidad,monto_diario:val.monto_diario,importe:val.importe,impuesto:val.impuesto,retencion:val.retencion,fecha_form:val.fecha_form,
                        codigo:val.codigo,observacion:val.observacion,estado:val.estado};
                });
            }
            return objForm110ImpRef;
        }, //mostramos el error
        error: function() { alert('Se ha producido un error Inesperado'); }
    });
    return objForm110ImpRef;
}
/**
 * Función para la validación del formulario de registro de Formulario 110 de impuestos por refrigerio.
 * @returns {boolean}
 */
function validaFormulario110ImpRef(){
    var ok = true;
    limpiarVentanaModalForm110ImpRef();
    var divImporte = $("#divImporte");
    var importe = $("#txtImporte").val();
    var txtImporte = $("#txtImporte");
    var helpErrorImporte = $("#helpErrorImporte");

    var divFecha = $("#divFechaForm");
    var fecha = $("#txtFechaForm").val();
    var txtFechaForm = $("#txtFechaForm");
    var helpErrorFecha = $("#helpErrorFechaForm");
    var enfoque=null;
    if(importe==''||importe<0){
        ok = false;
        var msje = "Debe seleccionar un monto mayor igual a cero para ser registrado en el sistema.";
        divImporte.addClass("has-error");
        helpErrorImporte.html(msje);
        if(enfoque==null)enfoque = txtImporte;
    }else{
        if(isNaN(importe)){
            ok = false;
            var msje = "Debe seleccionar un monto mayor igual a cero para ser registrado en el sistema, no carácteres alfanum&eacute;ricos.";
            divImporte.addClass("has-error");
            helpErrorImporte.html(msje);
            if(enfoque==null)enfoque = txtImporte;
        }
    }
    if(fecha==''){
        ok = false;
        var msje = "Debe seleccionar la fecha correspondiente del formulario 110.";
        divFecha.addClass("has-error");
        helpErrorFecha.html(msje);
        if(enfoque==null)enfoque = txtFechaForm;
    }
    return ok;
}
/**
 * Función para el almacenamiento del registro de Formulario 110 por Impuesto de Refrigerios.
 * @returns {boolean}
 */
function guardarFormulario110ImpRef(){
    var ok=true;
    var idForm110ImpRef = $("#hdnIdForm110ImpRef").val();
    var idRelaboral = $("#hdnIdRelaboralForm110ImpRef").val();
    var totalGanado = $("#hdnTotalGanadoForm110ImpRef").val();
    var importe = $("#txtImporte").val();
    var gestion = $("#hdnGestionForm110ImpRef").val();
    var mes = $("#hdnMesForm110ImpRef").val();
    var fechaForm = $("#txtFechaForm").val();
    var cantidad = 1;
    var observacion = $("#txtObservacion").val();
    if(idRelaboral>0&&gestion>0&&mes>0&&fechaForm!=''){
        var ok=$.ajax({
            url:'/form110impref/save/',
            type:'POST',
            datatype: 'json',
            async:false,
            data:{id:idForm110ImpRef,
                id_relaboral:idRelaboral,
                total_ganado:totalGanado,
                cantidad:cantidad,
                importe:importe,
                gestion:gestion,
                mes:mes,
                fecha_form:fechaForm,
                observacion:observacion
            },
            success: function(data) {  //alert(data);

                var res = jQuery.parseJSON(data);
                /**
                 * Si se ha realizado correctamente el registro de la relación laboral
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
                    /*$("#divGridPlanillasRefGen").jqxGrid("updatebounddata");*/
                } else if(res.result==0){
                    var ok=false;
                    /**
                     * En caso de haberse presentado un error al momento de especificar la ubicación del trabajo
                     */
                    $("#divMsjePorWarning").html("");
                    $("#divMsjePorWarning").append(res.msj);
                    $("#divMsjeNotificacionWarning").jqxNotification("open");
                }else{
                    var ok=false;
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
/**
 * Función para la actualización de una fila de la grilla
 * @returns {boolean}
 */
function actualizaFila(){
    var ok=false;
    var redondeo = 0;
    var rowindex = $("#hdnRowLine").val();
    if(rowindex>=0){
        var dataRecord = $("#divGridPlanillasRefGen").jqxGrid('getrowdata', rowindex);
        var idRelaboral = dataRecord.id_relaboral;
        var idForm110ImpRef = 0;
        if(dataRecord.id_form110impref!=null&&dataRecord.id_form110impref>0)
        var totalGanado = dataRecord.total_ganado;
        var gestion = dataRecord.gestion;
        var mes = dataRecord.mes;
        var form110Object = getOneForm110ImpRef(idForm110ImpRef,idRelaboral,gestion,mes);
        var importe = Math.round($("#txtImporte").val(),2);
        var fechaForm = $("#txtFechaForm").val();
        fechaForm = procesaTextoAFecha(fechaForm,"-");
        var observacion = $("#txtObservacion").val();
        var rc_iva_debido = totalGanado * 0.13;
        var impuesto = importe * 0.13;
        impuesto = impuesto.toFixed(2);
        /*impuesto = Math.round(impuesto,redondeo);*/
        var retencion = rc_iva_debido - impuesto;
        retencion = retencion.toFixed(2);
        /*retencion = Math.round(retencion,redondeo);*/
        if(form110Object.id>0){
            importe = form110Object.importe;
            fechaForm = form110Object.fecha_form;
            observacion = form110Object.observacion
            impuesto = form110Object.impuesto;
            retencion = form110Object.retencion;
        }
        if(retencion<0){
            retencion = 0;
        }
        var totalLiquido = parseFloat(dataRecord.total_ganado) - parseFloat(retencion);
        totalLiquido = totalLiquido.toFixed(2);
        /*if(isNaN(totalLiquido)){
            alert("::"+dataRecord.total_ganado+"-->"+parseFloat(totalGanado)+" <-> "+parseFloat(retencion));
        }*/
        /*totalLiquido = Math.round(totalLiquido,redondeo);*/
        if(idRelaboral>0&&gestion>0&&mes>0&&fechaForm!=''){
            $("#divGridPlanillasRefGen").jqxGrid('setcellvalue', rowindex, 'importe', Math.round(importe,0));
            $("#divGridPlanillasRefGen").jqxGrid('setcellvalue', rowindex, 'rc_iva', Math.round(impuesto,0));
            $("#divGridPlanillasRefGen").jqxGrid('setcellvalue', rowindex, 'retencion', Math.round(retencion,0));
            $("#divGridPlanillasRefGen").jqxGrid('setcellvalue', rowindex, 'form110impref_observacion', observacion);
            $("#divGridPlanillasRefGen").jqxGrid('setcellvalue', rowindex, 'fecha_form', fechaForm);
            $("#divGridPlanillasRefGen").jqxGrid('setcellvalue', rowindex, 'total_liquido', Math.round(totalLiquido,0));
            ok=true;
        }
    }
    return ok;
}
/**
 * Función para convertir un texto con el formato dd-MM-yyyy al formato MM/dd/yyyy
 * @param date Cadena con la fecha
 * @param sep Separador
 * @returns {number}
 */
function procesaTextoAFecha(date, sep) {
    var parts = date.split(sep);
    var date = new Date(parts[1] + "/" + parts[0] + "/" + parts[2]);
    return date.getTime();
}