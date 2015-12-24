/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  21-10-2014
 */
$().ready(function () {
    /**
     * Inicialmente se habilita solo la pestaña del listado
     */
    $('#jqxTabs').jqxTabs('theme', 'oasis');
    $('#jqxTabs').jqxTabs('enableAt', 1);
    $('#jqxTabs').jqxTabs('disableAt', 1);
    $('#jqxTabs').jqxTabs('disableAt', 2);
    $('#jqxTabs').jqxTabs('disableAt', 3);
    $('#jqxTabs').jqxTabs('disableAt', 4);
    $('#jqxTabs').jqxTabs('disableAt', 5);

    definirGrillaParaListaRelaborales();
    habilitarCamposParaNuevoRegistroDeRelacionLaboral();
    $("#btnGuardarNuevo").click(function () {
        var ok = validaFormularioPorNuevoRegistro();
        if (ok) {
            guardarNuevoRegistro();
        }
    });
    $("#btnGuardarEditar").click(function () {
        var ok = validaFormularioPorEditarRegistro();
        if (ok) {
            guardarRegistroEditado();
        }
    });
    $("#btnGuardarBaja").click(function () {
        var ok = validaFormularioPorBajaRegistro();
        if (ok) {
            guardarRegistroBaja();
        }
    });
    /**
     * Control sobre la solicitud de guardar registro de movilidad de personal por nuevo, edición y baja.
     */
    $("#btnGuardarMovilidad").click(function () {
        var idRelaboralMovilidadBaja = $("#hdnIdRelaboralMovilidadBaja").val();
        if (idRelaboralMovilidadBaja == 0) {
            /**
             * Si se solicita nuevo registro o modificación.
             * @type {boolean}
             */
            var ok = validaFormularioPorRegistroMovilidad();
            if (ok) {
                var okk = guardarRegistroMovilidad();
                if (okk) {
                    $("#popupWindowNuevaMovilidad").jqxWindow('close');
                }
            }
        } else {
            /**
             * Si se ha solicitado realizar una baja.
             */
            var ok = validaFormularioPorBajaRegistroMovilidad();
            if (ok) {
                var okk = bajaRegistroMovilidad();
                if (okk) {
                    $("#popupWindowNuevaMovilidad").jqxWindow('close');
                }
            }
        }
    });
    $("#btnCancelarNuevo").click(function () {
        $('#jqxTabs').jqxTabs('enableAt', 0);
        $('#jqxTabs').jqxTabs('disableAt', 1);
        $('#jqxTabs').jqxTabs('disableAt', 2);
        $('#jqxTabs').jqxTabs('disableAt', 3);
        $('#jqxTabs').jqxTabs('disableAt', 4);
        $('#jqxTabs').jqxTabs('disableAt', 5);
        $("#msjs-alert").hide();
        deshabilitarCamposParaNuevoRegistroDeRelacionLaboral();
    });
    $("#btnCancelarEditar").click(function () {
        $('#jqxTabs').jqxTabs('enableAt', 0);
        $('#jqxTabs').jqxTabs('disableAt', 1);
        $('#jqxTabs').jqxTabs('disableAt', 2);
        $('#jqxTabs').jqxTabs('disableAt', 3);
        $('#jqxTabs').jqxTabs('disableAt', 4);
        $('#jqxTabs').jqxTabs('disableAt', 5);
        $("#msjs-alert").hide();
        deshabilitarCamposParaEditarRegistroDeRelacionLaboral();
    });
    $("#btnCancelarBaja").click(function () {
        $('#jqxTabs').jqxTabs('enableAt', 0);
        $('#jqxTabs').jqxTabs('disableAt', 1);
        $('#jqxTabs').jqxTabs('disableAt', 2);
        $('#jqxTabs').jqxTabs('disableAt', 3);
        $('#jqxTabs').jqxTabs('disableAt', 4);
        $('#jqxTabs').jqxTabs('disableAt', 5);
        $("#msjs-alert").hide();
        deshabilitarCamposParaBajaRegistroDeRelacionLaboral();
    });
    $("#btnCancelarVista").click(function () {
        $('#jqxTabs').jqxTabs('enableAt', 0);
        $('#jqxTabs').jqxTabs('disableAt', 1);
        $('#jqxTabs').jqxTabs('disableAt', 2);
        $('#jqxTabs').jqxTabs('disableAt', 3);
        $('#jqxTabs').jqxTabs('disableAt', 4);
        $('#jqxTabs').jqxTabs('disableAt', 5);
        $("#msjs-alert").hide();
    });
    $("#btnVolverDesdeMovilidad").click(function (){
        $('#jqxTabs').jqxTabs('enableAt', 0);
        $('#jqxTabs').jqxTabs('disableAt', 1);
        $('#jqxTabs').jqxTabs('disableAt', 2);
        $('#jqxTabs').jqxTabs('disableAt', 3);
        $('#jqxTabs').jqxTabs('disableAt', 4);
        $('#jqxTabs').jqxTabs('disableAt', 5);
        $("#msjs-alert").hide();
    });
    $("#btnVolverDesdeBaja").click(function (){
        $('#jqxTabs').jqxTabs('enableAt', 0);
        $('#jqxTabs').jqxTabs('disableAt', 1);
        $('#jqxTabs').jqxTabs('disableAt', 2);
        $('#jqxTabs').jqxTabs('disableAt', 3);
        $('#jqxTabs').jqxTabs('disableAt', 4);
        $('#jqxTabs').jqxTabs('disableAt', 5);
        $("#msjs-alert").hide();
    });
    $("#btnCancelarMovilidad").click(function () {
        /**
         * Inicialmente es necesario eliminar los eventos sobre este elemento para que no se repitan
         */
        $("#lstTipoMemorandum").off();
    });
    $("#btnBuscarCargo").off();
    $("#btnBuscarCargo").on("click",function () {
        $("#divGrillaParaSeleccionarCargo").jqxGrid("clear");
        $('#popupGrillaCargo').modal('show');
        definirGrillaParaSeleccionarCargoAcefalo(0, '');
    });
    $("#btnBuscarCargoEditar").off();
    $("#btnBuscarCargoEditar").on("click",function () {
        $("#divGrillaParaSeleccionarCargo").jqxGrid("clear");
        $('#popupGrillaCargo').modal('show');
        definirGrillaParaSeleccionarCargoAcefaloParaEditar(0, '');
    });
    $('#popupGrillaCargo').on('show', function () {
        $(this).find('.modal-body').css({
            width:'auto', //probably not needed
            height:'auto', //probably not needed
            'max-height':'100%'
        });
    });
    $("#btnExportarExcel").click(function () {
        var items = $("#jqxlistbox").jqxListBox('getCheckedItems');
        var numColumnas = 0;
        $.each(items, function (index, value) {
            numColumnas++;
        });
        if (numColumnas > 0) exportarReporte(1);
        else {
            alert("Debe seleccionar al menos una columna para la obtención del reporte solicitado.");
            $("#jqxlistbox").focus();
        }
    });
    $("#btnExportarPDF").click(function () {
        var items = $("#jqxlistbox").jqxListBox('getCheckedItems');
        var numColumnas = 0;
        $.each(items, function (index, value) {
            numColumnas++;
        });
        if (numColumnas > 0) exportarReporte(2);
        else {
            alert("Debe seleccionar al menos una columna para la obtención del reporte solicitado.");
            $("#jqxlistbox").focus();
        }
    });
    $("#chkAllCols").click(function () {
        if (this.checked == true) {
            $("#jqxlistbox").jqxListBox('checkAll');
        } else {
            $("#jqxlistbox").jqxListBox('uncheckAll');
        }
    });
    $("#btnImprimirHistorial").on("click",function(){
        var opciones = {mode:"popup",popClose: false};
        $("#HistorialSplitter").printArea(opciones);
    });
    /**
     * Control sobre el cambio en el listado de motivos de baja
     */
    $("#lstMotivosBajas").change(function () {
        var res = this.value.split("_");
        $("#hdnFechaRenBaja").val(res[0]);
        $("#hdnFechaAceptaRenBaja").val(res[1]);
        $("#hdnFechaAgraServBaja").val(res[2]);
        if (res[0] > 0)defineFechasBajas(res[1], res[2], res[3]);
        else $("#divFechasBaja").hide();
    });
    /**
     * Control sobre el uso o no de a.i. en el cargo para movilidad de personal.
     */
    $("#chkAi").on("click", function () {
        var cargo = $("#txtCargoMovilidad").val();
        var sw = 0;
        if (jQuery.type(cargo) == "object") {
            cargo = String(cargo.label);
        }
        cargo = cargo + '';
        if (cargo != null && cargo != '') {
            if (this.checked == true) {
                var n = cargo.indexOf("a.i.");
                if (n < 0) {
                    cargo = cargo + " a.i.";
                    $('#txtCargoMovilidad').val(cargo);
                    //$('#txtCargoMovilidad').jqxInput('val', {label: cargo, value: cargo});
                }
            } else {
                var n = cargo.indexOf("a.i.");
                if (n > 0) {
                    cargo = cargo.replace("a.i.", "").trim();
                    $('#txtCargoMovilidad').val(cargo);
                    //$('#txtCargoMovilidad').jqxInput('val', {label: cargo, value: cargo});
                }
            }
        }
    });

    $("#liList").click(function () {
        $("#btnCancelarNuevo").click();
        $("#btnCancelarEditar").click();
        $("#btnCancelarBaja").click();
    });
    $("#popupWindowNuevaMovilidad").jqxWindow({
        position: {x: 300, y: 200},
        height: 700,
        width: '100%',
        resizable: true,
        isModal: true,
        autoOpen: false,
        cancelButton: $("#btnCancelarMovilidad"),
        modalOpacity: 0.01
    });
    $('#btnDesfiltrartodo').click(function () {
        $("#jqxgrid").jqxGrid('clearfilters');
    });
    $('#btnDesfiltrarTodoMovilidad').click(function () {
        $("#jqxgridmovilidad").jqxGrid('clearfilters');
    });
    $('#btnDesagrupartodo').click(function () {
        $('#jqxgrid').jqxGrid('cleargroups');
    });
    $('#btnDesagruparTodoMovilidad').click(function () {
        $('#jqxgridmovilidad').jqxGrid('cleargroups');
    });
    /**
     * Definición de la ventana donde se ve el historial de registros de relación laboral
     */
    $('#HistorialSplitter').jqxSplitter({
        theme: 'oasis',
        width: '100%',
        height: 480,
        panels: [{size: '8%'}, {size: '92%'}]
    });

    /*
     *   Función para la inserción obligatoria de datos numéricos en los campos de clase.
     */
    $('.numeral').keyup(function (event) {
        if ($(this).val() != '') {
            $(this).val($(this).val().replace(/[^0-9]/g, ""));
        }
    });

    /*
     *   Función para la inserción obligatoria de letras distintas a números en los campos de clase.
     */
    $('.literal').keyup(function (event) {
        if ($(this).val() != '') {
            $(this).val($(this).val().replace(/[^A-Z,a-z,ñ,Ñ, ]/g, ""));
        }
    });
    $("#divMsjeNotificacionError").jqxNotification({
        width: '100%', position: "bottom-right", opacity: 0.9,
        autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 7000, template: "error"
    });

    $("#divMsjeNotificacionWarning").jqxNotification({
        width: '100%', position: "bottom-right", opacity: 0.9,
        autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 7000, template: "warning"
    });
    $("#divMsjeNotificacionSuccess").jqxNotification({
        width: '100%', position: "bottom-right", opacity: 0.9,
        autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 7000, template: "success"
    });
    $("#txtMotivoMovilidad").jqxInput({
        width: 300,
        height: 35,
        placeHolder: "Introduzca el motivo de la comisión."
    });
    $("#txtLugarMovilidad").jqxInput({
        width: 300,
        height: 35,
        placeHolder: "Introduzca el lugar donde se realizará el evento."
    });
    $(document).keypress(OperaEvento);
    $(document).keyup(OperaEvento);
});
/**
 * Función para definir la grilla principal (listado) para la gestión de relaciones laborales.
 */
function definirGrillaParaListaRelaborales() {
    var source =
    {
        datatype: "json",
        datafields: [
            {name: 'nro_row', type: 'integer'},
            {name: 'fecha_nac', type: 'string'},
            {name: 'edad', type: 'integer'},
            {name: 'lugar_nac', type: 'integer'},
            {name: 'genero', type: 'integer'},
            {name: 'e_civil', type: 'integer'},
            {name: 'id_relaboral', type: 'integer'},
            {name: 'id_persona', type: 'integer'},
            {name: 'tiene_contrato_vigente', type: 'integer'},
            {name: 'id_fin_partida', type: 'integer'},
            {name: 'finpartida', type: 'string'},
            {name: 'ubicacion', type: 'string'},
            {name: 'id_condicion', type: 'integer'},
            {name: 'condicion', type: 'string'},
            {name: 'tiene_item', type: 'integer'},
            {name: 'id_cargo', type: 'integer'},
            {name: 'cargo_codigo', type: 'string'},
            {name: 'cargo_resolucion_ministerial_id', type: 'integer'},
            {name: 'cargo_resolucion_ministerial', type: 'string'},
            {name: 'estado', type: 'integer'},
            {name: 'estado_descripcion', type: 'string'},
            {name: 'nombres', type: 'string'},
            {name: 'ci', type: 'string'},
            {name: 'expd', type: 'string'},
            {name: 'num_complemento', type: 'string'},
            {name: 'id_organigrama', type: 'integer'},
            {name: 'gerencia_administrativa', type: 'string'},
            {name: 'departamento_administrativo', type: 'string'},
            {name: 'id_area', type: 'integer'},
            {name: 'area', type: 'string'},
            {name: 'id_ubicacion', type: 'integer'},
            {name: 'num_contrato', type: 'string'},
            {name: 'fin_partida', type: 'string'},
            {name: 'id_procesocontratacion', type: 'integer'},
            {name: 'proceso_codigo', type: 'string'},
            {name: 'nivelsalarial', type: 'string'},
            {name: 'nivelsalarial_resolucion', type: 'string'},
            {name: 'cargo', type: 'string'},
            {name: 'sueldo', type: 'numeric'},
            {name: 'fecha_ini', type: 'date'},
            {name: 'fecha_incor', type: 'date'},
            {name: 'fecha_fin', type: 'date'},
            {name: 'fecha_baja', type: 'date'},
            {name: 'motivo_baja', type: 'string'},
            {name: 'observacion', type: 'string'},
        ],
        url: '/relaborales/list',
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    cargarRegistrosDeRelacionesLaborales();
    function cargarRegistrosDeRelacionesLaborales() {
        var theme = prepareSimulator("grid");
        $("#jqxgrid").jqxGrid(
            {
                theme: theme,
                width: '100%',
                height: '100%',
                source: dataAdapter,
                sortable: true,
                altRows: true,
                groupable: true,
                columnsresize: true,
                pageable: true,
                pagerMode: 'advanced',
                showfilterrow: true,
                filterable: true,
                showtoolbar: true,
                autorowheight: true,
                rendertoolbar: function (toolbar) {
                    var me = this;
                    var container = $("<div></div>");
                    toolbar.append(container);
                    container.append("<button id='addrowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-plus-square fa-2x text-info' title='Nuevo Registro.'/></i></button>");
                    /*container.append("<button id='approverowbutton'  class='btn btn-sm btn-primary' type='button' ><i class='fa fa-check-square fa-2x text-info' title='Aprobar registro'></i></button>");*/
                    container.append("<button id='updaterowbutton'  class='btn btn-sm btn-primary' type='button' ><i class='fa fa-pencil-square fa-2x text-info' title='Modificar registro.'/></button>");
                    container.append("<button id='deleterowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-minus-square fa-2x text-info' title='Dar de baja al registro.'/></i></button>");
                    container.append("<button id='moverowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-tag fa-2x text-info' title='Movilidad de Personal.'/></i></button>");
                    container.append("<button id='viewrowbutton' class='btn btn-sm btn-primary' type='button'><i class='gi gi-nameplate_alt fa-2x text-info' title='Vista Historial.'/></i></button>");

                    $("#addrowbutton").jqxButton();
                    /*$("#approverowbutton").jqxButton();*/
                    $("#updaterowbutton").jqxButton();
                    $("#deleterowbutton").jqxButton();
                    $("#moverowbutton").jqxButton();
                    $("#viewrowbutton").jqxButton();


                    /* Registrar nueva relación laboral.*/
                    $("#addrowbutton").on('click', function () {
                        var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                /**
                                 * Para el caso cuando la persona no tenga ninguna relación laboral vigente con la entidad se da la opción de registro de nueva relación laboral.
                                 */
                                if (dataRecord.tiene_contrato_vigente == 0 || dataRecord.tiene_contrato_vigente == -1) {
                                    $('#jqxTabs').jqxTabs('enableAt', 1);
                                    $('#jqxTabs').jqxTabs('disableAt', 2);
                                    $('#jqxTabs').jqxTabs('disableAt', 3);
                                    $('#jqxTabs').jqxTabs('disableAt', 4);
                                    $('#jqxTabs').jqxTabs('disableAt', 5);
                                    /**
                                     * Trasladamos el item seleccionado al que corresponde, el de nuevo registro.
                                     */
                                    $('#jqxTabs').jqxTabs({selectedItem: 1});

                                    $('#btnBuscarCargo').click();

                                    $("#hdnIdRelaboralEditar").val(dataRecord.id_relaboral);
                                    $("#hdnIdPersonaSeleccionada").val(dataRecord.id_persona);
                                    $("#NombreParaNuevoRegistro").html(dataRecord.nombres);
                                    $("#CorreoPersonal").html("");
                                    $("#hdnIdCondicionNuevaSeleccionada").val(0)
                                    $("#divAreas").hide();
                                    $("#divItems").hide();
                                    $("#divFechasFin").hide();
                                    $("#divNumContratos").hide();
                                    $(".msjs-alert").hide();
                                    $("#divProcesos").hide();
                                    limpiarMensajesErrorPorValidacionNuevoRegistro();
                                    var rutaImagen = obtenerRutaFoto(dataRecord.ci, dataRecord.num_complemento);
                                    $("#imgFotoPerfilNuevo").attr("src", rutaImagen);
                                } else {
                                    var msje = "La persona seleccionada tiene actualmente un registro en estado " + dataRecord.estado_descripcion + " de relaci&oacute;n laboral por lo que no se le puede asignar otro.";
                                    $("#divMsjePorError").html("");
                                    $("#divMsjePorError").append(msje);
                                    $("#divMsjeNotificacionError").jqxNotification("open");
                                }
                            }
                        } else {
                            var msje = "Debe seleccionar un registro necesariamente.";
                            $("#divMsjePorError").html("");
                            $("#divMsjePorError").append(msje);
                            $("#divMsjeNotificacionError").jqxNotification("open");
                        }
                    });
                    /*Aprobar registro.*/
                    /*$("#approverowbutton").on('click', function () {
                     var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                     if (selectedrowindex >= 0) {
                     var dataRecord = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex);
                     if (dataRecord != undefined) {
                     */
                    /*
                     * Para el caso cuando la persona tenga un registro de relación laboral en estado EN PROCESO.
                     */
                    /*
                     if (dataRecord.estado == 2) {
                     if(confirm("¿Esta seguro de aprobar este registro?")){
                     aprobarRegistroRelabolar(dataRecord.id_relaboral);
                     }
                     }else {
                     var msje = "Debe seleccionar un registro con estado EN PROCESO para posibilitar la aprobaci&oacute;n del registro";
                     $("#divMsjePorError").html("");
                     $("#divMsjePorError").append(msje);
                     $("#divMsjeNotificacionError").jqxNotification("open");
                     }
                     }
                     }else{
                     var msje = "Debe seleccionar un registro necesariamente.";
                     $("#divMsjePorError").html("");
                     $("#divMsjePorError").append(msje);
                     $("#divMsjeNotificacionError").jqxNotification("open");
                     }
                     });*/
                    /* Modificar registro.*/
                    $("#updaterowbutton").on('click', function () {
                        var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                var id_relaboral = dataRecord.id_relaboral;
                                /**
                                 * Para el caso cuando la persona tenga un registro de relación laboral en estado EN PROCESO o ACTIVO.
                                 */
                                if (dataRecord.estado!=null&&dataRecord.estado >= 0) {//Modificado eventualmente
                                    $('#jqxTabs').jqxTabs('enableAt', 0);
                                    $('#jqxTabs').jqxTabs('disableAt', 1);
                                    $('#jqxTabs').jqxTabs('enableAt', 2);
                                    $('#jqxTabs').jqxTabs('disableAt', 3);
                                    $('#jqxTabs').jqxTabs('disableAt', 4);
                                    $('#jqxTabs').jqxTabs('disableAt', 5);
                                    /**
                                     * Trasladamos el item seleccionado al que corresponde, el de modificación
                                     */
                                    $('#jqxTabs').jqxTabs({selectedItem: 2});

                                    $("#hdnIdRelaboralEditar").val(id_relaboral);
                                    $("#hdnIdPersonaSeleccionadaEditar").val(dataRecord.id_persona);
                                    $("#NombreParaEditarRegistro").html(dataRecord.nombres);
                                    $("#hdnIdCondicionEditableSeleccionada").val(dataRecord.id_condicion);
                                    $("#hdnIdUbicacionEditar").val(dataRecord.id_ubicacion);
                                    $("#hdnIdProcesoEditar").val(dataRecord.id_procesocontratacion);
                                    $("#FechaIniEditar").jqxDateTimeInput({
                                        value: dataRecord.fecha_ini,
                                        enableBrowserBoundsDetection: false,
                                        height: 24,
                                        formatString: 'dd-MM-yyyy'
                                    });
                                    $("#FechaIncorEditar").jqxDateTimeInput({
                                        value: dataRecord.fecha_incor,
                                        enableBrowserBoundsDetection: false,
                                        height: 24,
                                        formatString: 'dd-MM-yyyy'
                                    });
                                    switch (dataRecord.tiene_item) {
                                        case 1:
                                            $("#divFechasFinEditar").hide();
                                            break;
                                        case 0:
                                            $("#FechaFinEditar").jqxDateTimeInput({
                                                value: dataRecord.fecha_fin,
                                                enableBrowserBoundsDetection: false,
                                                height: 24,
                                                formatString: 'dd-MM-yyyy'
                                            });
                                            break;
                                    }
                                    $("#hdnFechaFinEditar").val(dataRecord.fecha_fin);
                                    $("#txtNumContratoEditar").val(dataRecord.num_contrato);
                                    $("#divItemsEditar").hide();
                                    $("#divNumContratosEditar").hide();
                                    $(".msjs-alert").hide();
                                    $("#helpErrorUbicacionesEditar").html("");
                                    $("#helpErrorProcesosEditar").html("");
                                    $("#helpErrorCategoriasEditar").html("");
                                    $("#helpErrorFechasIniEditar").html("");
                                    $("#helpErrorFechasIncorEditar").html("");
                                    $("#helpErrorFechasFinEditar").html("");
                                    $("#divUbicacionesEditar").removeClass("has-error");
                                    $("#divProcesosEditar").removeClass("has-error");
                                    $("#divCategoriasEditar").removeClass("has-error");
                                    $("#divAreas").hide();
                                    $("#divFechasIniEditar").removeClass("has-error");
                                    $("#divFechasIncorEditar").removeClass("has-error");
                                    $("#divFechasFinEditar").removeClass("has-error");
                                    $("#tr_cargo_seleccionado_editar").html("");
                                    if (dataRecord.observacion != null)$("#txtObservacionEditar").text(dataRecord.observacion);
                                    else $("#txtObservacionEditar").text('');
                                    var rutaImagen = obtenerRutaFoto(dataRecord.ci, dataRecord.num_complemento);
                                    $("#imgFotoPerfilEditar").attr("src", rutaImagen);
                                    cargarProcesosParaEditar(dataRecord.id_condicion, dataRecord.id_procesocontratacion);
                                    var idUbicacionPrederminada = 0;
                                    if (dataRecord.id_ubicacion != null)idUbicacionPrederminada = dataRecord.id_ubicacion;
                                    cargarUbicacionesParaEditar(idUbicacionPrederminada);
                                    agregarCargoSeleccionadoEnGrillaParaEditar(dataRecord.id_cargo, dataRecord.cargo_codigo, dataRecord.id_finpartida, dataRecord.finpartida, dataRecord.cargo_resolucion_ministerial_id,dataRecord.cargo_resolucion_ministerial,dataRecord.id_condicion, dataRecord.condicion, dataRecord.id_organigrama, dataRecord.gerencia_administrativa, dataRecord.departamento_administrativo, dataRecord.id_area, dataRecord.nivelsalarial, dataRecord.cargo, dataRecord.sueldo,dataRecord.nivelsalarial_resolucion_id,dataRecord.nivelsalarial_resolucion);
                                } else {
                                    var msje = "Debe seleccionar un registro con estado EN PROCESO o ACTIVO para posibilitar la modificaci&oacute;n del registro";
                                    $("#divMsjePorError").html("");
                                    $("#divMsjePorError").append(msje);
                                    $("#divMsjeNotificacionError").jqxNotification("open");
                                }
                            }
                        } else {
                            var msje = "Debe seleccionar un registro necesariamente.";
                            $("#divMsjePorError").html("");
                            $("#divMsjePorError").append(msje);
                            $("#divMsjeNotificacionError").jqxNotification("open");
                        }
                    });
                    /* Dar de baja un registro.*/
                    $("#deleterowbutton").on('click', function () {
                        var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                var id_relaboral = dataRecord.id_relaboral;
                                /*
                                 *  Para dar de baja un registro, este debe estar inicialmente en estado ACTIVO
                                 */
                                if (dataRecord.estado == 1) {
                                    $('#jqxTabs').jqxTabs('enableAt', 0);
                                    $('#jqxTabs').jqxTabs('disableAt', 1);
                                    $('#jqxTabs').jqxTabs('disableAt', 2);
                                    $('#jqxTabs').jqxTabs('enableAt', 3);
                                    $('#jqxTabs').jqxTabs('disableAt', 4);
                                    $('#jqxTabs').jqxTabs('disableAt', 5);
                                    /**
                                     * Trasladamos el item seleccionado al que corresponde, el de bajas.
                                     */
                                    $('#jqxTabs').jqxTabs({selectedItem: 3});

                                    //alert(dataRecord.fecha_incor.toString());
                                    $("#hdnIdRelaboralBaja").val(id_relaboral);
                                    $("#NombreParaBajaRegistro").html(dataRecord.nombres);
                                    $("#hdnIdCondicionSeleccionadaBaja").val(dataRecord.id_condicion);
                                    $("#txtFechaIniBaja").jqxDateTimeInput({
                                        disabled: true,
                                        value: dataRecord.fecha_ini,
                                        enableBrowserBoundsDetection: true,
                                        height: 24,
                                        formatString: 'dd-MM-yyyy'
                                    });
                                    $("#txtFechaIncorBaja").jqxDateTimeInput({
                                        disabled: true,
                                        value: dataRecord.fecha_incor,
                                        enableBrowserBoundsDetection: true,
                                        height: 24,
                                        formatString: 'dd-MM-yyyy'
                                    });
                                    $("#txtFechaFinBaja").jqxDateTimeInput({
                                        disabled: true,
                                        value: dataRecord.fecha_fin,
                                        enableBrowserBoundsDetection: true,
                                        height: 24,
                                        formatString: 'dd-MM-yyyy'
                                    });
                                    $("#txtFechaRenBaja").jqxDateTimeInput({
                                        value: dataRecord.fecha_fin,
                                        enableBrowserBoundsDetection: true,
                                        height: 24,
                                        formatString: 'dd-MM-yyyy'
                                    });
                                    $("#txtFechaAceptaRenBaja").jqxDateTimeInput({
                                        value: dataRecord.fecha_fin,
                                        enableBrowserBoundsDetection: true,
                                        height: 24,
                                        formatString: 'dd-MM-yyyy'
                                    });
                                    $("#txtFechaAgraServBaja").jqxDateTimeInput({
                                        value: dataRecord.fecha_fin,
                                        enableBrowserBoundsDetection: true,
                                        height: 24,
                                        formatString: 'dd-MM-yyyy'
                                    });
                                    $("#txtFechaBaja").jqxDateTimeInput({
                                        value: dataRecord.fecha_fin,
                                        enableBrowserBoundsDetection: true,
                                        height: 24,
                                        formatString: 'dd-MM-yyyy'
                                    });
                                    $(".msjs-alert").hide();
                                    $("#divFechasRenBaja").hide();
                                    $("#divFechasAceptaRenBaja").hide();
                                    $("#divFechasAgraServBaja").hide();
                                    $("#txtObservacionBaja").val(dataRecord.observacion);
                                    $("#divMsjeError").hide();
                                    $("#tr_cargo_seleccionado_baja").html("");
                                    $("#lstMotivosBajas").focus();
                                    $("#hdnFechaRenBaja").val(0);
                                    $("#hdnFechaAceptaRenBaja").val(0);
                                    $("#hdnFechaAgraServBaja").val(0);
                                    agregarCargoSeleccionadoEnGrillaParaBaja(dataRecord.id_cargo, dataRecord.cargo_codigo, dataRecord.cargo_resolucion_ministerial_id, dataRecord.cargo_resolucion_ministerial,dataRecord.id_finpartida, dataRecord.finpartida, dataRecord.id_condicion, dataRecord.condicion, dataRecord.id_organigrama, dataRecord.gerencia_administrativa, dataRecord.departamento_administrativo, dataRecord.nivelsalarial, dataRecord.cargo, dataRecord.sueldo,dataRecord.nivelsalarial_resolucion_id,dataRecord.nivelsalarial_resolucion);
                                    cargarMotivosBajas(0, dataRecord.id_condicion);
                                    //habilitarCamposParaBajaRegistroDeRelacionLaboral(dataRecord.id_organigrama,dataRecord.id_fin_partida,dataRecord.id_condicion);
                                    var rutaImagen = obtenerRutaFoto(dataRecord.ci, dataRecord.num_complemento);
                                    $("#imgFotoPerfilBaja").attr("src", rutaImagen);
                                } else {
                                    var msje = "Para dar de baja un registro, este debe estar en estado ACTIVO inicialmente.";
                                    $("#divMsjePorError").html("");
                                    $("#divMsjePorError").append(msje);
                                    $("#divMsjeNotificacionError").jqxNotification("open");
                                }
                            }
                        } else {
                            var msje = "Debe seleccionar un registro necesariamente.";
                            $("#divMsjePorError").html("");
                            $("#divMsjePorError").append(msje);
                            $("#divMsjeNotificacionError").jqxNotification("open");
                        }
                    });
                    /* Movilidad de Personal.*/
                    $("#moverowbutton").on('click', function () {
                        var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                var id_relaboral = dataRecord.id_relaboral;
                                /*
                                 *  La vista del historial se habilita para personas que tengan al menos un registro de relación sin importar su estado, ACTIVO, EN PROCESO o PASIVO.
                                 *  De esta vista se excluyen a personas que no tengan ningún registro de relación laboral.
                                 */
                                $(".msjs-alert").hide();
                                $("#hdnIdPersonaHistorialMovimiento").val(dataRecord.id_persona);
                                $("#NombreParaMoverRegistro").html(dataRecord.nombres);
                                if (dataRecord.tiene_contrato_vigente >= 1) {
                                    $('#jqxTabs').jqxTabs('enableAt', 0);
                                    $('#jqxTabs').jqxTabs('disableAt', 1);
                                    $('#jqxTabs').jqxTabs('disableAt', 2);
                                    $('#jqxTabs').jqxTabs('disableAt', 3);
                                    $('#jqxTabs').jqxTabs('enableAt', 4);
                                    $('#jqxTabs').jqxTabs('disableAt', 5);
                                    /**
                                     * Trasladamos el item seleccionado al que corresponde, el de vistas.
                                     */
                                    $('#jqxTabs').jqxTabs({selectedItem: 4});

                                    cargarGrillaMovilidad(dataRecord.id_relaboral);
                                    var rutaImagen = obtenerRutaFoto(dataRecord.ci, dataRecord.num_complemento);
                                    $("#imgFotoPerfilMover").attr("src", rutaImagen);

                                } else {
                                    var msje = "Para acceder a la asignación de Movilidad Funcionaria, el estado de registro de Relación Laboral debe tener un estado ACTIVO.";
                                    $("#divMsjePorError").html("");
                                    $("#divMsjePorError").append(msje);
                                    $("#divMsjeNotificacionError").jqxNotification("open");
                                }
                            }
                        } else {
                            var msje = "Debe seleccionar un registro necesariamente.";
                            $("#divMsjePorError").html("");
                            $("#divMsjePorError").append(msje);
                            $("#divMsjeNotificacionError").jqxNotification("open");
                        }
                    });
                    /* Ver registro.*/
                    $("#viewrowbutton").on('click', function () {

                        var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                var id_relaboral = dataRecord.id_relaboral;
                                /*
                                 *  La vista del historial se habilita para personas que tengan al menos un registro de relación sin importar su estado, ACTIVO, EN PROCESO o PASIVO.
                                 *  De esta vista se excluyen a personas que no tengan ningún registro de relación laboral.
                                 */
                                $(".msjs-alert").hide();
                                $("#hdnIdPersonaHistorial").val(dataRecord.id_persona);
                                if (dataRecord.tiene_contrato_vigente >= 0) {
                                    $('#jqxTabs').jqxTabs('enableAt', 0);
                                    $('#jqxTabs').jqxTabs('disableAt', 1);
                                    $('#jqxTabs').jqxTabs('disableAt', 2);
                                    $('#jqxTabs').jqxTabs('disableAt', 3);
                                    $('#jqxTabs').jqxTabs('disableAt', 4);
                                    $('#jqxTabs').jqxTabs('enableAt', 5);
                                    /**
                                     * Trasladamos el item seleccionado al que corresponde, el de vistas.
                                     */
                                    $('#jqxTabs').jqxTabs({selectedItem: 5});
                                    // Create jqxTabs.
                                    $('#tabFichaPersonal').jqxTabs({
                                        theme: 'oasis',
                                        width: '100%',
                                        height: '100%',
                                        position: 'top'
                                    });
                                    $('#tabFichaPersonal').jqxTabs({selectedItem: 0});
                                    $("#ddNombres").html(dataRecord.nombres);
                                    var rutaImagen = obtenerRutaFoto(dataRecord.ci, dataRecord.num_complemento);
                                    $("#imgFotoPerfilContactoPer").attr("src", rutaImagen);
                                    $("#imgFotoPerfilContactoInst").attr("src", rutaImagen);
                                    $("#imgFotoPerfil").attr("src", rutaImagen);
                                    cargarPersonasContactos(dataRecord.id_persona);
                                    $("#hdnIdRelaboralVista").val(id_relaboral);
                                    $("#hdnSwPrimeraVistaHistorial").val(0);
                                    cargarGestionesHistorialRelaboral(dataRecord.id_persona);
                                    /**
                                     * Para la primera cargada el valor para el parámetro gestión es 0 debido a que mostrará el historial completo.
                                     * Para el valor del parámetro sw el valor es 1 porque se desea que se limpie lo que haya y se cargue algo nuevo
                                     */
                                    cargarHistorialRelacionLaboral(dataRecord.id_persona, 0, 1);
                                    $("#divContent_" + dataRecord.id_relaboral).focus().select();
                                } else {
                                    var msje = "Para acceder a la vista del registro, la persona debe haber tenido al menos un registro de relaci&oacute,n laboral que implica un estado ACTIVO o PASIVO.";
                                    $("#divMsjePorError").html("");
                                    $("#divMsjePorError").append(msje);
                                    $("#divMsjeNotificacionError").jqxNotification("open");
                                }
                            }
                        } else {
                            var msje = "Debe seleccionar un registro necesariamente.";
                            $("#divMsjePorError").html("");
                            $("#divMsjePorError").append(msje);
                            $("#divMsjeNotificacionError").jqxNotification("open");
                        }
                    });
                },
                columns: [
                    /*{
                     text: 'Nro.', sortable: false, filterable: false, editable: false,
                     groupable: false, draggable: false, resizable: false,
                     columntype: 'number', width: 50,cellsalign:'center',align:'center'
                     },*/
                    {
                        text: 'Nro.', /*datafield: 'nro_row',*/
                        sortable: false,
                        filterable: false,
                        editable: false,
                        groupable: false,
                        draggable: false,
                        resizable: false,
                        columntype: 'number',
                        width: 50,
                        cellsalign: 'center',
                        align: 'center',
                        cellsrenderer: rownumberrenderer
                    },
                    {
                        text: '',
                        datafield: 'nuevo',
                        width: 10,
                        sortable: false,
                        showfilterrow: false,
                        filterable: false,
                        columntype: 'number',
                        cellsrenderer: function (rowline) {
                            ctrlrow = rowline
                            var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', ctrlrow);
                            var sw = dataRecord.tiene_contrato_vigente;
                            if (sw == 0 || sw == -1) {
                                return "<div style='width: 100%' align='center'><a href='#'><i class='fa fa-plus-square fa-2x text-info' title='Nuevo Registro.'/></i></div>";
                            }
                            else return "";
                        },
                        hidden: true //Se oculta esta columna con el boton nuevo dejándolo disponible en caso de requerirse
                    },
                    {
                        text: '',
                        datafield: 'aprobar',
                        width: 10,
                        sortable: false,
                        showfilterrow: false,
                        filterable: false,
                        columntype: 'number',
                        cellsrenderer: function (rowline) {
                            ctrlrow = rowline
                            var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', ctrlrow);
                            var estado = dataRecord.estado;
                            if (dataRecord.estado == 2) {
                                return "<div style='width: 100%' align='center'><a href='#'><i class='fa fa-check-square fa-2x text-info' title='Aprobar registro'></i></a></div>";
                            }
                            else return "";
                        },
                        hidden: true //Se oculta esta columna con el boton aprobar dejándolo disponible en caso de requerirse
                    },
                    {
                        text: '',
                        datafield: 'editar',
                        width: 10,
                        sortable: false,
                        showfilterrow: false,
                        filterable: false,
                        columntype: 'number',
                        cellsrenderer: function (rowline) {
                            ctrlrow = rowline
                            var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', ctrlrow);
                            var estado = dataRecord.estado;
                            if (estado == 2) {
                                return "<div style='width: 100%' align='center'><a href='#'><i class='fa fa-pencil-square fa-2x text-info' title='Modificar registro.'/></a></div>";
                            }
                            else return "";
                        },
                        hidden: true //Se oculta esta columna con el boton editar dejándolo disponible en caso de requerirse
                    },
                    {
                        text: '',
                        datafield: 'eliminar',
                        width: 10,
                        sortable: false,
                        showfilterrow: false,
                        filterable: false,
                        columntype: 'number',
                        cellsrenderer: function (rowline) {
                            ctrlrow = rowline
                            var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', ctrlrow);
                            var estado = dataRecord.estado;
                            if (estado == 1) {
                                //return "<div style='width: 100%'><a href='#'><img src='/images/del.png' style='margin-left: 25%' title='Dar de baja al registro.'/></a></div>";
                                return "<div style='width: 100%' align='center'><a href='#'><i class='fa fa-minus-square fa-2x text-info' title='Dar de baja al registro.'/></i></div>";
                            }
                            else return "";
                        },
                        hidden: true //Se oculta esta columna con el boton baja dejándolo disponible en caso de requerirse
                    },
                    {
                        text: '',
                        datafield: 'mover',
                        width: 10,
                        sortable: false,
                        showfilterrow: false,
                        filterable: false,
                        columntype: 'number',
                        cellsrenderer: function (rowline) {
                            ctrlrow = rowline
                            var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', ctrlrow);
                            var sw = dataRecord.tiene_contrato_vigente;
                            if (sw >= 0) {
                                return "<div style='width: 100%' align='center'><a href='#'><i class='fa fa-tag fa-2x text-info' title='Movilidad de Personal.'/></i></div>";
                            }
                            else return "";
                        },
                        hidden: true //Se oculta esta columna con el boton vista dejándolo disponible en caso de requerirse
                    },
                    {
                        text: '',
                        datafield: 'ver',
                        width: 10,
                        sortable: false,
                        showfilterrow: false,
                        filterable: false,
                        columntype: 'number',
                        cellsrenderer: function (rowline) {
                            ctrlrow = rowline
                            var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', ctrlrow);
                            var sw = dataRecord.tiene_contrato_vigente;
                            if (sw >= 0) {
                                return "<div style='width: 100%' align='center'><a href='#'><i class='fa fa-search fa-2x text-info' title='Vista Historial.'/></i></div>";
                            }
                            else return "";
                        },
                        hidden: true //Se oculta esta columna con el boton vista dejándolo disponible en caso de requerirse
                    },
                    {
                        text: 'Ubicaci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'ubicacion',
                        width: 150,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Condici&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'condicion',
                        width: 150,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Estado',
                        filtertype: 'checkedlist',
                        datafield: 'estado_descripcion',
                        width: 100,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false,
                        cellclassname: cellclass
                    },
                    {
                        text: 'Nombres y Apellidos',
                        columntype: 'textbox',
                        filtertype: 'input',
                        datafield: 'nombres',
                        width: 215,
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'CI',
                        columntype: 'textbox',
                        filtertype: 'input',
                        datafield: 'ci',
                        width: 90,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Exp',
                        filtertype: 'checkedlist',
                        datafield: 'expd',
                        width: 40,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    /*{
                        text: 'N/C',
                        columntype: 'textbox',
                        filtertype: 'input',
                        datafield: 'num_complemento',
                        width: 40,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: true
                    },*/
                    {
                        text: 'Gerencia',
                        filtertype: 'checkedlist',
                        datafield: 'gerencia_administrativa',
                        width: 220,
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Departamento',
                        filtertype: 'checkedlist',
                        datafield: 'departamento_administrativo',
                        width: 220,
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: '&Aacute;rea',
                        filtertype: 'checkedlist',
                        datafield: 'area',
                        width: 220,
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Proceso',
                        filtertype: 'checkedlist',
                        datafield: 'proceso_codigo',
                        width: 220,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Fuente',
                        filtertype: 'checkedlist',
                        datafield: 'fin_partida',
                        width: 220,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Nivel Salarial',
                        filtertype: 'checkedlist',
                        datafield: 'nivelsalarial',
                        width: 220,
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Cargo',
                        columntype: 'textbox',
                        filtertype: 'input',
                        datafield: 'cargo',
                        width: 215,
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Haber',
                        filtertype: 'checkedlist',
                        datafield: 'sueldo',
                        width: 100,
                        cellsalign: 'right',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Fecha Inicio',
                        datafield: 'fecha_ini',
                        filtertype: 'range',
                        width: 200,
                        cellsalign: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Fecha Incor.',
                        datafield: 'fecha_incor',
                        filtertype: 'range',
                        width: 100,
                        cellsalign: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Fecha Fin',
                        datafield: 'fecha_fin',
                        filtertype: 'range',
                        width: 100,
                        cellsalign: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Fecha Baja',
                        datafield: 'fecha_baja',
                        filtertype: 'range',
                        width: 100,
                        cellsalign: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        align: 'center',
                        hidden: false
                    },
                    {text: 'Motivo Baja', datafield: 'motivo_baja', width: 100, hidden: false},
                    {text: 'Observacion', datafield: 'observacion', width: 100, hidden: false},
                ]
            });
        var listSource = [
            {label: 'Ubicaci&oacute;n', value: 'ubicacion', checked: true},
            {label: 'Condici&oacute;n', value: 'condicion', checked: true},
            {label: 'Estado', value: 'estado_descripcion', checked: true},
            {label: 'Nombres y Apellidos', value: 'nombres', checked: true},
            {label: 'CI', value: 'ci', checked: true},
            {label: 'Exp', value: 'expd', checked: true},
            /*{label: 'N/C', value: 'num_complemento', checked: false},*/
            {label: 'Gerencia', value: 'gerencia_administrativa', checked: true},
            {label: 'Departamento', value: 'departamento_administrativo', checked: true},
            {label: '&Aacute;rea', value: 'area', checked: true},
            {label: 'proceso', value: 'proceso_codigo', checked: true},
            {label: 'Fuente', value: 'fin_partida', checked: true},
            {label: 'Nivel Salarial', value: 'nivelsalarial', checked: true},
            {label: 'Cargo', value: 'cargo', checked: true},
            {label: 'Haber', value: 'sueldo', checked: true},
            {label: 'Fecha Inicio', value: 'fecha_ini', checked: true},
            {label: 'Fecha Incor.', value: 'fecha_incor', checked: true},
            {label: 'Fecha Fin', value: 'fecha_fin', checked: true},
            {label: 'Fecha Baja', value: 'fecha_baja', checked: true},
            {label: 'Motivo Baja', value: 'motivo_baja', checked: true},
            {label: 'Observacion', value: 'observacion', checked: true},
        ];
        $("#jqxlistbox").jqxListBox({source: listSource, width: "100%", height: 430, checkboxes: true});
        $("#jqxlistbox").on('checkChange', function (event) {
            $("#jqxgrid").jqxGrid('beginupdate');
            if (event.args.checked) {
                $("#jqxgrid").jqxGrid('showcolumn', event.args.value);
            }
            else {
                $("#jqxgrid").jqxGrid('hidecolumn', event.args.value);
            }
            $("#jqxgrid").jqxGrid('endupdate');
        });
    }
}
var rownumberrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
    var nro = row + 1;
    return "<div align='center'>" + nro + "</div>";
}
/*
 * Función para controlar la ejecución del evento esc con el teclado.
 */
function OperaEvento(evento) {
    if ((evento.type == "keyup" || evento.type == "keydown") && evento.which == "27") {
        $('#jqxTabs').jqxTabs('enableAt', 0);
        $('#jqxTabs').jqxTabs('disableAt', 1);
        $('#jqxTabs').jqxTabs('disableAt', 2);
        $('#jqxTabs').jqxTabs('disableAt', 3);
        $('#jqxTabs').jqxTabs('disableAt', 4);
        $('#jqxTabs').jqxTabs('disableAt', 5);
        /**
         * Saltamos a la pantalla principal en caso de presionarse ESC
         */
        $('#jqxTabs').jqxTabs({selectedItem: 0});

        $("#popupWindowCargo").jqxWindow('close');
        $("#popupWindowNuevaMovilidad").jqxWindow('close');
        $("#lstTipoMemorandum").off();
        $('#jqxgrid').jqxGrid('focus');
    }
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
/**
 *
 * Función para la obtención de la ruta en la cual reside la fotografía correspondiente de la persona.
 * @param numDocumento Número de documento, comunmente el número de CI.
 * @param numComplemento Número de complemento.
 * @returns {string} Ruta de ubicación de la fotografía a mostrarse.
 */
function obtenerRutaFoto(numDocumento, numComplemento) {
    var resultado = "/images/perfil-profesional.jpg";
    if (numDocumento != "") {
        $.ajax({
            url: '/relaborales/obtenerrutafoto/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {ci: numDocumento, num_complemento: numComplemento},
            success: function (data) {
                var res = jQuery.parseJSON(data);
                if (res.result == 1) {
                    resultado = res.ruta;
                }
            }, //mostramos el error
            error: function () {
                alert('Se ha producido un error Inesperado');
            }
        });
    }
    return resultado;
}
/**
 * Función para obtener la fecha de este día
 * @param separador
 * @returns {*}
 * @author JLM
 */
function fechaHoy(separador, format) {
    if (separador == '')separador = "-";
    var fullDate = new Date()
    var dia = fullDate.getDate().toString();
    var mes = (fullDate.getMonth() + 1).toString();
    var twoDigitDay = (dia.length === 1 ) ? '0' + dia : dia;
    var twoDigitMonth = (mes.length === 1 ) ? '0' + mes : mes;
    if (format == "dd-mm-yyyy")
        var currentDate = twoDigitDay + separador + twoDigitMonth + separador + fullDate.getFullYear();
    else if (format == "mm-dd-yyyy") {
        var currentDate = twoDigitMonth + separador + twoDigitDay + separador + fullDate.getFullYear();
    } else {
        var currentDate = fullDate;
    }
    return currentDate;
}
/**
 * Función anónima para la aplicación de clases a celdas en particular dentro de las grillas.
 * @param row
 * @param columnfield
 * @param value
 * @returns {string}
 * @author JLM
 */
var cellclass = function (row, columnfield, value) {
    if (value == 'ACTIVO') {
        return 'verde';
    }
    else if (value == 'EN PROCESO') {
        return 'amarillo';
    }
    else if (value == 'PASIVO') {
        return 'rojo';
    }
    else return ''
}
