/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  15-09-2014
 */
/**
 * Función para la carga del formulario de envío de solicitud de aprobación de Excepción.
 * @param dataRecordMain
 * @param dataRecord
 * @param verificado
 */
function cargarDatosDestinatarios(dataRecordMain,dataRecord,verificado) {
    /**
     * No se usa el identificador de Gerencia Administrativa debido a que puede presentarse la situación en que
     * haya movilidad de personal.
     */
    var intermediacion = -1;
    if(verificado==0){
        intermediacion = verificaAplicabilidadDeIntermediario(dataRecordMain.departamento_administrativo,dataRecordMain.cargo)
    }else {
        /**
         * Este dato se modifica a objeto de que al momento de solicitar la aprobación se muestre
         * los datos de la VERIFICACIÓN de la Excepción.
         * @type {number}
         */
        intermediacion=2;
    }
    $("#chkDestinatarioSecundario").prop("checked",false);
    $("#hdnIdRelSolicitante").val(dataRecordMain.id_relaboral);
    $("#hdnIdControlExcepcionEnvio").val(dataRecord.id);
    $("#hdnIntermediacion").val(intermediacion);
    /**
     * Sólo se puede dar curso cuando se tiene por resultado 0 o 1
     */
    if (intermediacion >= 0) {
        if (intermediacion == 0||intermediacion == 2) {
            /**
             * No se requiere la intermediación
             */
            var divDestinatarioPrincipal="divDestinatarioPrincipal";
            var divDestinatarioSecundario="divDestinatarioSecundario";
            var idRelaboralPrincipal = despliegaWidgetDestinatarioFijo(dataRecordMain.id_relaboral,divDestinatarioPrincipal);
            var idRelaboralSecundario = 0;
            if(idRelaboralPrincipal>0){
                idRelaboralSecundario = despliegaWidgetDestinatarioFijo(idRelaboralPrincipal,divDestinatarioSecundario)
                var asunto = "<div class='block'><p>Solicitud de Excepci&oacute;n por <b>"+dataRecord.excepcion+"</b>.</p></div>";
                $("#divAsunto").html(asunto);
                var justificacion = "<div class='block'><p>"+dataRecord.justificacion+"</p></div>";
                $("#divJustificacion").html(justificacion);
            }
            $("#hdnIdRelDestPrincipal").val(idRelaboralPrincipal);
            $("#hdnIdRelDestSecundario").val(idRelaboralSecundario);
            $("#txtMensajeAdicional").val("");
            $("#txtMensajeAdicional").focus();
        }
        else {
            /**
             * Si se requiere la intermediación
             */
            var sufijo = "";
            var source = [];
            var data = [];
            var dataAdapter = [];
            var divDestinatarioPrincipal="divDestinatarioPrincipal";
            var divDestinatarioSecundario="divDestinatarioSecundario";
            var idRelaboralDestinatarioPrefijado=0;
            var arrPersonal = despliegaSelectDestinatariosSeleccionables(dataRecordMain.id_departamento_administrativo,dataRecordMain.cargo,idRelaboralDestinatarioPrefijado,divDestinatarioPrincipal);
            source = {
                localdata: arrPersonal,
                datatype: "array"
            };
            dataAdapter = new $.jqx.dataAdapter(source);

            $("#lstBoxDestinatariosPrincipales").jqxListBox({multiple: true, checkboxes: true,filterable: true,allowDrop: true, allowDrag: true, source: dataAdapter, width: "100%", height: 250,
                displayMember: 'nombres',
                valueMember: 'id_relaboral',
                renderer: function (index, label, value) {
                    var datarecord = arrPersonal[index];
                    if(datarecord!=undefined){
                        var widget = "<div class='widget'>";
                        widget += "<div class='widget-simple themed-background-dark'>";
                        widget += "<a href='page_ready_user_profile.html'>";
                        widget += "<img src='"+datarecord.ruta_foto+"' class='widget-image img-circle pull-left'>";
                        widget += "</a>";
                        widget += "<h4 class='widget-content widget-content-light'>";
                        widget += "<a href='#'>";
                        widget += "<strong>"+datarecord.nombres+"</strong>";
                        widget += "</a>";
                        widget += "<small>"+datarecord.cargo+"</small>";
                        widget += "</h4>";
                        widget += "</div></div>";
                        return widget;
                    }
                }
            });

            var idRelaboralSecundario = 0;
            idRelaboralSecundario = despliegaWidgetDestinatarioFijo(dataRecordMain.id_relaboral,divDestinatarioSecundario)
            var asunto = "<div class='block'><p>Solicitud de Excepci&oacute;n por <b>"+dataRecord.excepcion+"</b>.</p></div>";
            $("#divAsunto").html(asunto);
            var justificacion = "<div class='block'><p>"+dataRecord.justificacion+"</p></div>";
            $("#divJustificacion").html(justificacion);
            $("#hdnIdRelSolicitante").val(dataRecordMain.id_relaboral);
            $("#hdnIdControlExcepcionEnvio").val(dataRecord.id);
            $("#hdnIdRelDestPrincipal").val(idRelaboralSecundario);
            $("#hdnIdRelDestSecundario").val(idRelaboralSecundario);
            $("#txtMensajeAdicional").val("");
            $("#txtMensajeAdicional").focus();
        }
    }
    else{
        $("#divMsjePorSuccess").append("No se encontr&oacute; el registro de Gerencia Administrativa, verifique nuevemante.");
        $("#divMsjeNotificacionSuccess").jqxNotification("open");
        $("#divGridControlExcepciones").jqxGrid("updatebounddata");
    }
}
/**
 * Función para la verificación de aplicabilidad de uso de intermediarios en la aceptación o rechazo de solicitudes de excepción.
 * Que sólo es aplicable a personal dependiente de las
 * @param departamentoAdministrativo
 * @param cargo
 */
function verificaAplicabilidadDeIntermediario(departamentoAdministrativo,cargo){
    var resultado = 0;
    $.ajax({
        url: '/misboletasexcepciones/verificaintemerdiacion/',
        type: "POST",
        datatype: 'json',
        data:{departamento_administrativo:departamentoAdministrativo,cargo:cargo},
        async: false,
        cache: false,
        success: function (data) {
            var res = jQuery.parseJSON(data);
            resultado= res.result;

        },
        error: function () {
            resultado= -2;
        }
    });
    return resultado;
}
/**
 * Función para el despliegue de la tarjeta del destinatario principal.
 * @param idRelaboral
 * @param divDestinatario
 * @returns {number}
 */
function despliegaWidgetDestinatarioFijo(idRelaboral,divDestinatario){
    var widget = "";
    var idRelaboralSuperior = 0;
    $.ajax({
        url: '/relaborales/getinmediatosuperior/',
        type: "POST",
        datatype: 'json',
        data:{id_relaboral:idRelaboral,cantidad:1},
        async: false,
        cache: false,
        success: function (data) {
            var res = jQuery.parseJSON(data);
            if(res.length==1){
                var obj = res[0];
                widget = "<div class='widget'>";
                widget += "<div class='widget-simple themed-background-dark'>";
                widget += "<a href='page_ready_user_profile.html'>";
                widget += "<img src='"+obj.ruta_foto+"' class='widget-image img-circle pull-left'>";
                widget += "</a>";
                widget += "<h4 class='widget-content widget-content-light'>";
                widget += "<a href='#'>";
                widget += "<strong>"+obj.nombres+"</strong>";
                widget += "</a>";
                widget += "<small>"+obj.cargo+"</small>";
                widget += "</h4>";
                widget += "</div></div>";
                $("#"+divDestinatario).html(widget);
                idRelaboralSuperior = obj.id_relaboral;
            }
        }
    });
    return idRelaboralSuperior;
}
/**
 * Función para mostrar los usuarios disponibles para envío de la solicitud.
 * @param idDepartamentoAdministrativo
 * @param cargo
 * @param divDestinatario
 * @returns {number}
 */
function despliegaSelectDestinatariosSeleccionables(idDepartamentoAdministrativo,cargo,idRelaboralDestinatarioEnviado,divDestinatario){
    var widget = "";
    var idRelaboralSuperior = 0;
    var listRelaborales = "<select id='lstRelaboralesDestinatariosPrincipales' class='form-control'>";
    var selected = "";
    var arrPersonal = [];
    var source = [];
    var data = [];
    $.ajax({
        url: '/relaborales/getintermediariospordepartamento/',
        type: "POST",
        datatype: 'json',
        data:{id_organigrama:idDepartamentoAdministrativo,cargo:cargo,cantidad:0},
        async: false,
        cache: false,
        success: function (data) {
            arrPersonal = jQuery.parseJSON(data);
        }
    });
    return arrPersonal;
    //listRelaborales += "</select>";
    //$("#"+divDestinatario).html(listRelaborales);
}


/**
 * Función para el envío del mensaje de solicitud de excepcion.
 * @param idRelaboralPrincipal
 * @param idRelaboralSecundario
 * @param idControlExcepcion
 * @param mensajeAdicional
 * @param operacion
 * @param copiaDestinatarioSecundario
 */
function enviarMensajeSolicitudExcepcion(idRelaboralSolicitante,idRelaboralPrincipal,idRelaboralSecundario,idControlExcepcion,mensajeAdicional,operacion,copiaDestinatarioSecundario){
    var ok= false;
    $.ajax({
        url: '/misboletasexcepciones/enviomensaje/',
        type: "POST",
        datatype: 'json',
        data:{id_rel_solicitante:idRelaboralSolicitante,
            id_rel_dest_principal:idRelaboralPrincipal,
            id_rel_dest_secundario:idRelaboralSecundario,
            id_controlexcepcion:idControlExcepcion,
            mensaje_adicional:mensajeAdicional,
            operacion:operacion,
            copia_destinatario_secundario:copiaDestinatarioSecundario
        },
        async: false,
        cache: false,
        beforeSend:function(){
            $("#divCarga").show();

        },
        complete:function(){
            $("#divCarga").hide();
        },
        success: function (data) {
        var res = jQuery.parseJSON(data);
            ok = res.result;
        if (res.result == 1) {
            ok = true;
            $("#divMsjePorSuccess").html("");
            $("#divMsjePorSuccess").append(res.msj);
            $("#divMsjeNotificacionSuccess").jqxNotification("open");
            $("#divGridControlExcepciones").jqxGrid("updatebounddata");
        } else if (res.result == 0) {
            ok = false;
            $("#divMsjePorWarning").html("");
            $("#divMsjePorWarning").append(res.msj);
            $("#divMsjeNotificacionWarning").jqxNotification("open");
            if(res.estado>=4||res.estado<0){
                /**
                 * El registro ya esta inhabilitado para modificación
                 */
                ok = true;
                $("#divGridControlExcepciones").jqxGrid("updatebounddata");
            }
        } else {
            ok = false;
            $("#divMsjePorError").html("");
            $("#divMsjePorError").append(res.msj);
            $("#divMsjeNotificacionError").jqxNotification("open");
        }
        }
    });
    return ok;
}
/**
 * Función para el control de la cantidad de días que quedan aún para realizar la solicitud.
 * @param idControlExcepcion
 */
function controlaPlazoDeSolicitud(idControlExcepcion){
    var ok= false;
    $.ajax({
        url: '/misboletasexcepciones/vervalideztemporalidadsolicitud/',
        type: "POST",
        datatype: 'json',
        data:{id_controlexcepcion:idControlExcepcion
        },
        async: false,
        cache: false,
        success: function (data) {
            var res = jQuery.parseJSON(data);
            if (res.result == 1) {
                ok = true;
            } else {
                ok = false;
                $("#divMsjePorError").html("");
                $("#divMsjePorError").append(res.msj);
                $("#divMsjeNotificacionError").jqxNotification("open");
            }
        }
    });
    return ok;
}