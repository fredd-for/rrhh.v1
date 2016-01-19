/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  27-10-2014
 */
/**
 * Función para la carga del combo de ubicaciones de trabajo (Oficinas o Paradas de Línea).
 * @param idUbicacionPredeterminada Identificador de la ubicación de la oficina o Parada de Línea en la cual trabajará el empleado.
 */
function cargarMotivosBajas(idMotivoBajaPredeterminada,idCondicion){
    $.ajax({
        url:'/relaborales/listmotivosbajas',
        type:'POST',
        datatype: 'json',
        cache:false,
        success: function(data) {
            var res = jQuery.parseJSON(data);
            if(res.length>0){
                $('#lstMotivosBajas').html("");
                /**
                 * Los cuatro valores incluidos en cada opción son binarios: 1: Se aplica, 0: No se aplica
                 */
                $('#lstMotivosBajas').append("<option value='0_0_0_0'>Seleccionar..</option>");
                $.each( res, function( key, val ) {
                    switch (idCondicion){
                        case 1:
                        case 4:
                        case 5:
                        case 6:
                            if(val.permanente==1){
                                if(idMotivoBajaPredeterminada==val.id){$selected='selected';}else{ $selected='';}
                                $('#lstMotivosBajas').append("<option value='"+val.id+"_"+val.fecha_ren+"_"+val.fecha_acepta_ren+"_"+val.fecha_agra_serv+"' "+$selected+">"+val.motivo_baja+"</option>");
                            }
                            break;
                        case 2:
                        case 7:
                            if(val.eventual==1){
                                if(idMotivoBajaPredeterminada==val.id){$selected='selected';}else{ $selected='';}
                                $('#lstMotivosBajas').append("<option value='"+val.id+"_"+val.fecha_ren+"_"+val.fecha_acepta_ren+"_"+val.fecha_agra_serv+"'  optFechaRen='"+val.fecha_ren+"' optFechaAceptaRen='"+val.fecha_acepta_ren+"' optFechaAgraServ='"+val.fecha_ren+"' "+$selected+">"+val.motivo_baja+"</option>");
                            }
                            break;
                        case 3:
                            if(val.consultor==1){
                                if(idMotivoBajaPredeterminada==val.id){$selected='selected';}else{ $selected='';}
                                $('#lstMotivosBajas').append("<option value='"+val.id+"_"+val.fecha_ren+"_"+val.fecha_acepta_ren+"_"+val.fecha_agra_serv+"' optFechaRen='"+val.fecha_ren+"' optFechaAceptaRen='"+val.fecha_acepta_ren+"' optFechaAgraServ='"+val.fecha_ren+"' "+$selected+">"+val.motivo_baja+"</option>");
                            }
                            break;
                    }
                });
            }
        }
    });
    //$("#ubicacionBaja").jqxComboBox({ selectedIndex:0,autoComplete:true,enableBrowserBoundsDetection: true, autoDropDownHeight: true, promptText: "Seleccione una ubicacion", source: ubicacion, height: 22, width: '100%' });
}
/**
 * Función para la definición de las fechas correspondientes en función de la selección del tipo de motivo de baja.
 * @param fecha_ren Valor indicativo para saber si se debe considerar la fecha de renuncia en este tipo de baja (0:No considerar;1: Si considerar;2:Considerar pero no obligatoriamente )
 * @param fecha_acepta_ren Valor indicativo para saber si se debe considerar la fecha de aceptación de renuncia en este tipo de baja (0:No considerar;1: Si considerar;2:Considerar pero no obligatoriamente )
 * @param fecha_agra_Serv Valor indicativo para saber si se debe considerar la fecha de agradecimiento de servicios en este tipo de baja (0:No considerar;1: Si considerar;2:Considerar pero no obligatoriamente )
 */
function defineFechasBajas(fecha_ren,fecha_acepta_ren,fecha_agra_Serv){
    $("#divFechasBaja").show();
    $("#txtFechaBaja").jqxDateTimeInput({ enableBrowserBoundsDetection: true, height: 24, formatString:'dd-MM-yyyy' });
    objFocus = $("#txtFechaBaja");
    /**
     * Segmento para la especificación donde se enfocará el mouse.
     * El orden es importante.
     */
    if(fecha_agra_Serv==1){
        $("#divFechasAgraServBaja").show();
        $("#txtFechaAgraServBaja").jqxDateTimeInput({ enableBrowserBoundsDetection: true, height: 24, formatString:'dd-MM-yyyy' });
        objFocus = $("#txtFechaAgraServBaja");
    }else $("#divFechasAgraServBaja").hide();

    if(fecha_acepta_ren==1){
        $("#divFechasAceptaRenBaja").show();
        $("#txtFechaAceptaRenBaja").jqxDateTimeInput({ enableBrowserBoundsDetection: true, height: 24, formatString:'dd-MM-yyyy' });
        objFocus = $("#txtFechaAceptaRenBaja");
    }else $("#divFechasAceptaRenBaja").hide();

    if(fecha_ren==1){
        $("#divFechasRenBaja").show();
        $("#txtFechaRenBaja").jqxDateTimeInput({ enableBrowserBoundsDetection: true, height: 24, formatString:'dd-MM-yyyy' });
        objFocus = $("#txtFechaRenBaja");
    }else $("#divFechasRenBaja").hide();

    objFocus.focus();
}

/**
 * Función para agregar un cargo registrado a la grilla correspondiente para determinar donde trabajará la persona.
 * @param id_cargo Identificador del cargo.
 * @param codigo Código del cargo seleccionado.
 * @param cargo_resolucion_ministerial_id
 * @param cargo_resolucion_ministerial
 * @param finpartida Financiamiento por partida.
 * @param condicion Condición de contrato / relación laboral.
 * @param gerencia_administrativa Gerencia Administrativa a la cual corresponde el cargo.
 * @param departamento_administrativo Departamento administrativo al cual corresponde el cargo.
 * @param nivelsalarial Nivel salarial correspondiente para el cargo.
 * @param cargo Nombre del cargo.
 * @param haber Haber mensual para el cargo.
 * @param nivelsalarial_resolucion_id
 * @param nivelsalarial_resolucion
 */
function agregarCargoSeleccionadoEnGrillaParaBaja(dataRecord){
    //dataRecord.id_cargo, dataRecord.cargo_codigo, dataRecord.cargo_resolucion_ministerial_id, dataRecord.cargo_resolucion_ministerial,dataRecord.id_finpartida, dataRecord.finpartida,
    // dataRecord.id_condicion, dataRecord.condicion, dataRecord.id_organigrama, dataRecord.gerencia_administrativa, dataRecord.departamento_administrativo,
    // dataRecord.nivelsalarial, dataRecord.cargo, dataRecord.sueldo,dataRecord.nivelsalarial_resolucion_id,dataRecord.nivelsalarial_resolucion
    //
    var id_cargo=dataRecord.id_cargo;
    var gestion="";
    if(dataRecord.cargo_gestion!=null&&dataRecord.cargo_gestion!=""){
        gestion=dataRecord.cargo_gestion;
    }
    var codigo=dataRecord.cargo_codigo;
    var cargo_resolucion_ministerial_id=dataRecord.cargo_resolucion_ministerial_id;
    var cargo_resolucion_ministerial=dataRecord.cargo_resolucion_ministerial;
    var id_finpartida=dataRecord.id_finpartida;
    var finpartida=dataRecord.finpartida;
    var id_condicion=dataRecord.id_condicion;
    var condicion=dataRecord.condicion;
    var id_organigrama=dataRecord.id_organigrama;
    var gerencia_administrativa=dataRecord.gerencia_administrativa;
    var departamento_administrativo=dataRecord.departamento_administrativo;
    var nivelsalarial=dataRecord.nivelsalarial;
    var cargo=dataRecord.cargo;
    var haber=dataRecord.sueldo;
    var nivelsalarial_resolucion_id=dataRecord.nivelsalarial_resolucion_id;
    var nivelsalarial_resolucion=dataRecord.nivelsalarial_resolucion;
    $("#tr_cargo_seleccionado").html("");
    $("#tr_cargo_seleccionado_editar").html("");
    var grilla = "<td class='text-center'>"+codigo+"</td><td class='text-center'>"+gestion+"</td><td class='text-center'>"+cargo_resolucion_ministerial+"</td><td class='text-center'>"+nivelsalarial_resolucion+"</td><td class='text-center'>"+condicion+"</td><td>"+gerencia_administrativa+"</td><td>"+departamento_administrativo+"</td><td>"+nivelsalarial+"</td><td>"+cargo+"</td><td class='text-center'>"+haber+"</td>";
    $("#tr_cargo_seleccionado_baja").append(grilla);
    $("#hdnIdCargoSeleccionadoBaja").val(id_cargo);
    $("#hdnIdCondicionSeleccionadaBaja").val(id_condicion);
    $("#popupWindowCargo").jqxWindow('close');
}
/**
 * Función para la habilitación de los campos correspondientes en el formulario de registro de una nueva relación laboral.
 * @param idOrganigrama Identificador del organigrama.
 * @param idFinPartida Identificador del financiamiento por partida.
 */
function habilitarCamposParaBajaRegistroDeRelacionLaboral(idOrganigrama,idFinPartida,idCondicion){
    cargarMotivosBajas(idCondicion);
    defineFechasBajas();
}
/**
 * Función para deshabilitar los campos correspondientes en el formulario de registro de una nueva relación laboral.
 */
function deshabilitarCamposParaBajaRegistroDeRelacionLaboral(){
    $("#tr_cargo_seleccionado_baja").html("");
    $("#hdnIdPersonaSeleccionadaBaja").val(0);
    $("#NombreParaBajaRegistro").html("");
}
/**
 * Función para validar los datos del formulario de nuevo registro de relación laboral.
 * @returns {boolean} True: La validación fue correcta; False: La validación anuncia que hay errores en el formulario.
 */
function validaFormularioPorBajaRegistro() {
    var ok = true;
    var enfoque = null;
    var msje = "";
    $(".msjs-alert").hide();

    limpiarMensajesErrorPorValidacionBaja();
    var idRelaboral = $("#hdnIdRelaboralBaja").val();
    var fechaBaja = $("#txtFechaBaja").jqxDateTimeInput('getText');
    var valMotivoBaja = "";
    var idMotivoBaja = 0;
    var swFechaRen = 0;
    var swFechaAceptaRen = 0;
    var swFechaAgraServ = 0;
    var fechaRen = "";
    var fechaAceptaRen = "";
    var fechaAgraServ = "";
    if(idRelaboral==0||idRelaboral==null||idRelaboral==undefined){
            $("#divMsjeError").show();
            $("#divMsjeError").addClass('alert alert-danger alert-dismissable');
            $("#aMsjeError").html("Error en la selecci&oacute;n del registro de relación laboral correspondiente.");
            ok=false;
    }
    if ($("#lstMotivosBajas").val() != "") {
        valMotivoBaja = $("#lstMotivosBajas").val();
        var res = valMotivoBaja.split("_");
        idMotivoBaja = res[0];
        swFechaRen = res[1];
        swFechaAceptaRen = res[2];
        swFechaAgraServ = res[3];
    }
    if (idMotivoBaja == 0 || idMotivoBaja == null) {
        ok = false;
        msje = "Debe definir el motivo de baja.";
        $("#divMotivosBajas").addClass("has-error");
        $("#helpErrorMotivosBajas").html(msje);
        if (enfoque == null)enfoque = $("#lstMotivosBajas");
    }
    if (fechaBaja == null || fechaBaja == "" || fechaBaja == undefined) {
        ok = false;
        msje = "Debe definir la fecha de baja.";
        $("#divFechasBajas").addClass("has-error");
        $("#helpErrorFechasBajas").html(msje);
        if (enfoque == null)enfoque = $("#txtFechaBaja");
    }
    /**
     * Si la fecha de renuncia esta catalogada como de requerimiento obligatorio
     */
    if (swFechaRen == 1) {
        fechaRen = $("#txtFechaRenBaja").jqxDateTimeInput('getText');
        if (fechaRen == "" || fechaRen == "" || fechaRen == "undefined") {
            ok = false;
            msje = "Debe definir la fecha de renuncia necesariamente.";
            $("#divFechasRenBaja").addClass("has-error");
            $("#helpErrorFechasRenBajas").html(msje);
            if (enfoque == null)enfoque = $("#txtFechaRenBaja");
        }
    }
    /**
     * Si la fecha de aceptación de renuncia esta catalogada como de requerimiento obligatorio
     */
    if (swFechaAceptaRen == 1) {
        fechaAceptaRen = $("#txtFechaAceptaRenBaja").jqxDateTimeInput('getText');
        if (fechaAceptaRen == "" || fechaAceptaRen == "" || fechaAceptaRen == "undefined") {
            ok = false;
            msje = "Debe definir la fecha de aceptaci&oacute;n de renuncia necesariamente.";
            $("#divFechasAceptaRenBaja").addClass("has-error");
            $("#helpErrorFechasAceptaRenBajas").html(msje);
            if (enfoque == null)enfoque = $("#txtFechaAceptaRenBaja");
        }
    }
    /**
     * Si la fecha de agradecimiento de servicios esta catalogada como de requerimiento obligatorio
     */
    if(swFechaAgraServ==1){
        fechaAgraServ = $("#txtFechaAgraServBaja").jqxDateTimeInput('getText');
        if(fechaAgraServ==""||fechaAgraServ==""||fechaAgraServ=="undefined"){
            ok=false;
            msje = "Debe definir la fecha de agradecimiento de servicios necesariamente.";
            $("#divFechasAgraServBaja").addClass("has-error");
            $("#helpErrorFechasAgraServBajas").html(msje);
            if(enfoque==null)enfoque =$("#txtFechaAgraServBaja");
        }
    }
    if(enfoque!=null){
        enfoque.focus();
    }
    return ok;
}
/**
 * Función para la limpieza de los mensajes de error debido a la validación del formulario para baja de registro.
 */
function limpiarMensajesErrorPorValidacionBaja(){
    $("#helpErrorMotivosBajas").html("");
    $("#divMotivosBajas").removeClass("has-error");

    $("#helpErrorFechasBaja").html("");
    $("#divFechasBaja").removeClass("has-error");

    $("#helpErrorFechasRenBaja").html("");
    $("#divFechasRenBaja").removeClass("has-error");

    $("#helpErrorFechasAceptaRenBaja").html("");
    $("#divFechasAceptaRenBaja").removeClass("has-error");

    $("#helpErrorFechasAceptaRenBaja").html("");
    $("#divFechasAceptaRenBaja").removeClass("has-error");

    $("#helpErrorFechasAgraServBaja").html("");
    $("#divFechasAgraServBaja").removeClass("has-error");
}

/**
 * Función para el almacenamiento de un nuevo registro en la Base de Datos.
 */
function guardarRegistroBaja(){
    var ok=true;
    var idRelaboral = $("#hdnIdRelaboralBaja").val();
    var fechaBaja = $("#txtFechaBaja").jqxDateTimeInput('getText');
    var idMotivoBaja = 0;
    var valMotivoBaja = "";
    var swFechaRen=0;
    var swFechaAceptaRen=0;
    var swFechaAgraServ=0;
    var fechaRen="";
    var fechaAceptaRen="";
    var fechaAgraServ="";
        if($("#lstMotivosBajas").val()!=""){
            valMotivoBaja = $("#lstMotivosBajas").val();
            var res = valMotivoBaja.split("_");
            idMotivoBaja = res[0];
            swFechaRen = res[1];
            swFechaAceptaRen = res[2];
            swFechaAgraServ = res[3];
        }
    /**
     * Si la fecha de renuncia esta catalogada como de requerimiento obligatorio
     */
    if (swFechaRen >= 1) {
        fechaRen = $("#txtFechaRenBaja").jqxDateTimeInput('getText');
    }
    /**
     * Si la fecha de aceptación de renuncia esta catalogada como de requerimiento obligatorio
     */
    if (swFechaAceptaRen >= 1) {
        fechaAceptaRen = $("#txtFechaAceptaRenBaja").jqxDateTimeInput('getText');
    }
    /**
     * Si la fecha de agradecimiento de servicios esta catalogada como de requerimiento obligatorio
     */
    if(swFechaAgraServ>=1){
        fechaAgraServ = $("#txtFechaAgraServBaja").jqxDateTimeInput('getText');
    }
    var observacion = $("#txtObservacionesBaja").val();
    if(idRelaboral>0&&idMotivoBaja>0&&fechaBaja!=""){
        var ok=$.ajax({
            url:'/relaborales/down/',
            type:'POST',
            datatype: 'json',
            async:false,
            data:{id:idRelaboral,
                id_motivobaja:idMotivoBaja,
                fecha_baja:fechaBaja,
                fecha_ren:fechaRen,
                fecha_acepta_ren:fechaAceptaRen,
                fecha_agra_serv:fechaAgraServ,
                observacion:observacion
            },
            success: function(data) {  //alert(data);
                var res = jQuery.parseJSON(data);
                //alert(data);
                /**
                 * Si se ha realizado correctamente el registro de baja de la relación laboral
                 */
                $(".msjes").hide();
                if(res.result==1){
                    $("#divMsjeExito").show();
                    $("#divMsjeExito").addClass('alert alert-success alert-dismissable');
                    $("#aMsjeExito").html(res.msj);
                    /**
                     * Se habilita nuevamente el listado actualizado con la baja realizada y
                     * se inhabilita el formulario para nuevo registro.
                     */
                    $('#jqxTabs').jqxTabs('enableAt', 0);
                    $('#jqxTabs').jqxTabs('disableAt', 1);
                    $('#jqxTabs').jqxTabs('disableAt', 2);
                    $('#jqxTabs').jqxTabs('disableAt', 3);
                    deshabilitarCamposParaBajaRegistroDeRelacionLaboral();
                    $("#jqxgrid").jqxGrid("updatebounddata");
                } else if(res.result==0){
                    /**
                     * En caso de haberse presentado un error al momento de registrar la baja por inconsistencia de datos.
                     */
                    $("#divMsjePeligro").show();
                    $("#divMsjePeligro").addClass('alert alert-warning alert-dismissable');
                    $("#aMsjePeligro").html(res.msj);
                }else{
                    /**
                     * En caso de haberse presentado un error crítico al momento de registrarse la baja (Error de conexión)
                     */
                    $("#divMsjeError").show();
                    $("#divMsjeError").addClass('alert alert-danger alert-dismissable');
                    $("#aMsjeError").html(res.msj);
                }

            }, //mostramos el error
            error: function() { alert('Se ha producido un error Inesperado'); }
        });
    }else {
        ok = false;
    }
    return ok;
}
