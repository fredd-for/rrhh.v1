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
    $('#jqxTabsPerfilesLaborales').jqxTabs('theme', 'oasis');
    $('#jqxTabsPerfilesLaborales').jqxTabs('enableAt', 1);
    $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 1);
    $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 2);
    $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 3);
    $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 4);
    $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 5);

    definirGrillaParaListaPerfilesLaborales();
    $("#btnGuardarNuevo").on("click",function () {
        var ok = validaFormularioPorNuevoRegistroPerfilLaboral();
        if (ok) {
            guardarNuevoRegistroPerfilLaboral();
        }
    });
    $("#btnGuardarEditar").on("click",function () {
        var ok = validaFormularioPorEditarRegistroPerfilLaboral();
        if (ok) {
            guardarRegistroEditadoPerfilLaboral();
        }
    });
    $("#btnGuardarBaja").on("click",function () {
        var ok = validaFormularioPorBajaRegistro();
        if (ok) {
            guardarRegistroBajaPerfilLaboral();
        }
    });
    $("#btnGuardarElaboracionCalendario").on("click",function () {
        var idPerfilLaboral = $("#hdnIdPerfilLaboralParaCalendario").val();
        var tipoHorario = $("#hdnTipoHorarioParaCalendario").val();
        var fechaIni = $("#hdnFechaIniParaCalendario").val();
        var fechaFin = $("#hdnFechaFinParaCalendario").val();
        var ok = validaFormularioRegistroCalendario(1,idPerfilLaboral,tipoHorario,fechaIni,fechaFin);
            if (ok) {
                setTimeout(function() {
                    $("#divProgressBar").hide();
                var okk = guardaFormularioRegistroCalendario(1,idPerfilLaboral,tipoHorario,fechaIni,fechaFin);
                if(okk){
                    setTimeout(function() {
                        $("#divProgressBarRegistro").hide();
                        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 1);
                        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 2);
                        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 4);
                        $('#jqxTabsPerfilesLaborales').jqxTabs({selectedItem: 3});
                    },3000);
                    $("#jqxgridturnos").jqxGrid("updatebounddata");
                    var msje = "Registro exitoso del calendario laboral.";
                    $("#divMsjePorSuccess").html("");
                    $("#divMsjePorSuccess").append(msje);
                    $("#divMsjeNotificacionSuccess").jqxNotification("open");
                }
                },2000);
            }
    });
    $("#btnConcluirElaboracion").on("click",function(){
        var idPerfilLaboral = $("#hdnIdPerfilLaboralParaCalendario").val();
        var tipoHorario = $("#hdnTipoHorarioParaCalendario").val();
        var fechaIni = $("#hdnFechaIniParaCalendario").val();
        var fechaFin = $("#hdnFechaFinParaCalendario").val();
        var ok = validaFormularioRegistroCalendario(2,idPerfilLaboral,tipoHorario,fechaIni,fechaFin);
        if (ok) {
            setTimeout(function() {
            if(confirm("¿Esta seguro de concluir la elaboración del calendario laboral? Considere que ya no podrá realizar modificaciones.")){
                var okk = guardaFormularioRegistroCalendario(2,idPerfilLaboral,tipoHorario,fechaIni,fechaFin);
                if(okk){
                    setTimeout(function() {
                        $("#divProgressBarRegistro").hide();
                        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 1);
                        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 2);
                        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 4);
                        $('#jqxTabsPerfilesLaborales').jqxTabs({selectedItem: 3});
                    },3000);
                    $("#jqxgridturnos").jqxGrid("updatebounddata");
                    var msje = "Conclusi&oacute;n exitosa de la elaboraci&oacute;n de los turnos dentro del calendario laboral.";
                    $("#divMsjePorSuccess").html("");
                    $("#divMsjePorSuccess").append(msje);
                    $("#divMsjeNotificacionSuccess").jqxNotification("open");
                }
                }
            },1000);
        }
    });
    $("#btnGuardarAprobacionCalendario").on("click",function () {
        var idPerfilLaboral = $("#hdnIdPerfilLaboralParaCalendario").val();
        var tipoHorario = $("#hdnTipoHorarioParaCalendario").val();
        var fechaIni = $("#hdnFechaIniParaCalendario").val();
        var fechaFin = $("#hdnFechaFinParaCalendario").val();
        var ok = validaFormularioRegistroCalendario(3,idPerfilLaboral,tipoHorario,fechaIni,fechaFin);
        if (ok) {
            if(confirm("¿Esta segur@ de aprobar la elaboración del calendario laboral?")){
                var okk = guardaFormularioRegistroCalendario(3,idPerfilLaboral,tipoHorario,fechaIni,fechaFin);
                if(okk){
                    $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 1);
                    $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 2);
                    $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 4);
                    $('#jqxTabsPerfilesLaborales').jqxTabs({selectedItem: 3});
                    $("#jqxgridturnos").jqxGrid("updatebounddata");
                    var msje = "Aprobaci&oacute;n exitosa de la elaboraci&oacute;n de los turnos dentro del calendario laboral.";
                    $("#divMsjePorSuccess").html("");
                    $("#divMsjePorSuccess").append(msje);
                    $("#divMsjeNotificacionSuccess").jqxNotification("open");
                }
            }
        }
    });
    $("#btnGuardarCupoCalendario").on("click",function(){
        var ok = validaFormularioCupos();
        if(ok){
            var idPerfilLaboral = $("#hdnIdPerfilLaboralParaCuposCalendario").val();
            var tipoHorario = $("#hdnTipoHorarioParaCuposCalendario").val();
            var fechaIni = $("#hdnFechaIniParaCuposCalendario").val();
            var fechaFin = $("#hdnFechaFinParaCuposCalendario").val();
            var okk = guardaFormularioCupos(idPerfilLaboral,tipoHorario,fechaIni,fechaFin);
            if(okk){
                $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 1);
                $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 2);
                $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 4);
                $('#jqxTabsPerfilesLaborales').jqxTabs({selectedItem: 3});
                $("#jqxgridturnos").jqxGrid("updatebounddata");
                var msje = "Aprobaci&oacute;n exitosa de la elaboraci&oacute;n de los turnos dentro del calendario laboral.";
                $("#divMsjePorSuccess").html("");
                $("#divMsjePorSuccess").append(msje);
                $("#divMsjeNotificacionSuccess").jqxNotification("open");
            }
        }
    });
    $("#btnVolverAElaboracionCalendario").off();
    $("#btnVolverAElaboracionCalendario").on("click",function() {
        var idPerfilLaboral = $("#hdnIdPerfilLaboralParaCalendario").val();
        var tipoHorario = $("#hdnTipoHorarioParaCalendario").val();
        var fechaIni = $("#hdnFechaIniParaCalendario").val();
        var fechaFin = $("#hdnFechaFinParaCalendario").val();
        if(confirm("¿Esta segur@ de retornar el estado de este calendario a 'EN ELABORACIÓN'?")){
            var ok = retornaEstadoElaboracion(idPerfilLaboral,tipoHorario,fechaIni,fechaFin);
            if (ok) {
                $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 1);
                $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 2);
                $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 4);
                $('#jqxTabsPerfilesLaborales').jqxTabs({selectedItem: 3});
                $("#jqxgridturnos").jqxGrid("updatebounddata");
                var msje = "Se retorn&oacute; los registros del turno al estado EN ELABORACI&Oacute;N de manera exitosa.";
                $("#divMsjePorSuccess").html("");
                $("#divMsjePorSuccess").append(msje);
                $("#divMsjeNotificacionSuccess").jqxNotification("open");
            }
        }
    });
    $("#btnCancelarNuevo").on("click",function () {
        $('#jqxTabsPerfilesLaborales').jqxTabs('enableAt', 0);
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 1);
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 2);
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 3);
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 4);
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 5);

        $("#msjs-alert").hide();
    });
    $("#btnCancelarEditar").on("click",function () {
        $('#jqxTabsPerfilesLaborales').jqxTabs('enableAt', 0);
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 1);
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 2);
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 3);
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 4);
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 5);

        $("#msjs-alert").hide();
    });

    $("#btnCancelarCalendario,#btnCancelarAprobacionCalendario").on("click",function () {
        $('#jqxTabsPerfilesLaborales').jqxTabs('enableAt', 0);
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 1);
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 2);
        $('#jqxTabsPerfilesLaborales').jqxTabs('enableAt', 3);
        $('#jqxTabsPerfilesLaborales').jqxTabs({selectedItem: 3});
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 4);
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 5);
        $("#jqxgridturnos").jqxGrid("updatebounddata");
        $("#msjs-alert").hide();
    });

    $("#btnCancelarTurno").on("click",function () {
        $('#jqxTabsPerfilesLaborales').jqxTabs('enableAt', 0);
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 1);
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 2);
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 3);
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 4);
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 5);
        $('#jqxTabsPerfilesLaborales').jqxTabs({selectedItem: 0});
        $("#msjs-alert").hide();
        /*$("#lstTipoMemorandum").off();*/
    });
    $("#btnBuscarCargo").on("click",function () {
        $("#popupWindowCargo").jqxWindow('open');
        definirGrillaParaSeleccionarCargoAcefalo(0, '');
    });
    $("#btnBuscarCargoEditar").on("click",function () {
        $("#popupWindowCargo").jqxWindow('open');
        definirGrillaParaSeleccionarCargoAcefaloParaEditar(0, '');
    });
    $("#btnExportarExcel").on("click",function () {
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
    $("#btnExportarPDF").on("click",function () {
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
    $("#btnImprimirCalendario").on("click",function(){
        var opciones = {mode:"popup",popClose: false};
        $("#divCalendar").printArea(opciones);
    });
    $("#btnImprimirCuposCalendario").on("click",function(){
        var opciones = {mode:"popup",popClose: false};
        $("#divQuotas").printArea(opciones);
    });
    $("#chkAllCols").on("click",function () {
        if (this.checked == true) {
            $("#jqxlistbox").jqxListBox('checkAll');
        } else {
            $("#jqxlistbox").jqxListBox('uncheckAll');
        }
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

    $("#liList").on("click",function () {
        $("#btnCancelarNuevo").click();
        $("#btnCancelarEditar").click();
        $("#btnCancelarBaja").click();
        $("#hdnIdPerfilLaboralParaCalendario").val(0);
    });
    $("#liTurn").on("click",function () {
        $('#jqxTabsPerfilesLaborales').jqxTabs('enableAt', 3);
        $('#jqxTabsPerfilesLaborales').jqxTabs({selectedItem: 3});
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 4);
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 5);
        $("#jqxgridturnos").jqxGrid("updatebounddata");
        $("#msjs-alert").hide();
    });
    $('#btnDesfiltrartodo').on("click",function () {
        $("#divGridPerfilesLaborales").jqxGrid('clearfilters');
    });
    $('#btnDesfiltrarTodoMovilidad').on("click",function () {
        $("#divGridPerfilesLaboralesmovilidad").jqxGrid('clearfilters');
    });
    $('#btnDesagrupartodo').on("click",function () {
        $('#divGridPerfilesLaborales').jqxGrid('cleargroups');
    });
    $('#btnDesagruparTodoMovilidad').on("click",function () {
        $('#divGridPerfilesLaboralesmovilidad').jqxGrid('cleargroups');
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
    $(document).keypress(OperaEvento);
    $(document).keyup(OperaEvento);
});
/**
 * Función para definir la grilla principal (listado) para la gestión de relaciones laborales.
 */
function definirGrillaParaListaPerfilesLaborales() {
    var source =
    {
        datatype: "json",
        datafields: [
            {name: 'nro_row', type: 'integer'},
            {name: 'id', type: 'integer'},
            {name: 'perfil_laboral', type: 'string'},
            {name: 'grupo', type: 'string'},
            {name: 'tipo_horario', type: 'integer'},
            {name: 'tipo_horario_descripcion', type: 'string'},
            {name: 'estado', type: 'integer'},
            {name: 'estado_descripcion', type: 'string'},
            {name: 'agrupador', type: 'integer'},
            {name: 'observacion', type: 'string'},
        ],
        url: '/perfileslaborales/list',
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    cargarRegistrosDePerfilesLaborales();
    function cargarRegistrosDePerfilesLaborales() {
        var theme = prepareSimulator("grid");
        $("#divGridPerfilesLaborales").jqxGrid(
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
                    container.append("<button id='approverowbutton'  class='btn btn-sm btn-primary' type='button' ><i class='fa fa-check-square fa-2x text-info' title='Aprobar registro'></i></button>");
                    container.append("<button id='updaterowbutton'  class='btn btn-sm btn-primary' type='button' ><i class='fa fa-pencil-square fa-2x text-info' title='Modificar registro.'/></button>");
                    container.append("<button id='deleterowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-minus-square fa-2x text-info' title='Dar de baja al registro.'/></i></button>");
                    container.append("<button id='turnrowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-calendar-o fa-2x text-info' title='Vista Turnos Laborales por Perfil.'/></i></button>");

                    $("#addrowbutton").jqxButton();
                    $("#approverowbutton").jqxButton();
                    $("#updaterowbutton").jqxButton();
                    $("#deleterowbutton").jqxButton();
                    $("#turnrowbutton").jqxButton();

                    /* Registrar nueva relación laboral.*/
                    $("#addrowbutton").on('click', function () {
                        $('#txtPerfilLaboralNuevo').val("");
                        $('#txtObservacionPerfilLaboralNuevo').val("");
                        $('#txtPerfilLaboralNuevo').val("");
                        $('#txtGrupoPerfilLaboralNuevo').val("");
                        listarTiposHorarios(0,1);
                        $("#chkControlFaltasOmisionesPerfilLaboralNuevo").bootstrapSwitch("state",true);
                        $('#jqxTabsPerfilesLaborales').jqxTabs('enableAt', 1);
                        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 2);
                        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 3);
                        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 4);

                        $('#jqxTabsPerfilesLaborales').jqxTabs({selectedItem: 1});
                        $('#txtPerfilLaboralNuevo').focus();
                    });
                    /*Aprobar registro.*/
                    $("#approverowbutton").on('click', function () {
                         var selectedrowindex = $("#divGridPerfilesLaborales").jqxGrid('getselectedrowindex');
                         if (selectedrowindex >= 0) {
                         var dataRecord = $('#divGridPerfilesLaborales').jqxGrid('getrowdata', selectedrowindex);
                         if (dataRecord != undefined) {
                        /*
                         * Para el caso cuando la persona tenga un registro de relación laboral en estado EN PROCESO.
                         */
    
                         if (dataRecord.estado == 2) {
                         if(confirm("¿Esta seguro de aprobar este registro?")){
                            aprobarRegistroPerfilLaboral(dataRecord.id);
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
                     });
                    /* Modificar registro.*/
                    $("#updaterowbutton").on('click', function () {
                        var selectedrowindex = $("#divGridPerfilesLaborales").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridPerfilesLaborales').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {

                                var id_perfillaboral = dataRecord.id;
                                /**
                                 * Para el caso cuando la persona tenga un registro de relación laboral en estado EN PROCESO o ACTIVO.
                                 */
                                if (dataRecord.estado >= 1) {
                                    $("#hdnIdPerfilLaboralEditar").val(id_perfillaboral);

                                    $("#txtPerfilLaboralEditar").val(dataRecord.perfil_laboral);
                                    $("#txtGrupoPerfilLaboralEditar").val(dataRecord.grupo);

                                    if(dataRecord.agrupador==1){
                                        $("#chkControlFaltasOmisionesPerfilLaboralEditar").bootstrapSwitch("state",true);
                                    }else {$("#chkControlFaltasOmisionesPerfilLaboralEditar").bootstrapSwitch("state",false);}
                                    if (dataRecord.observacion != null)$("#txtObservacionPerfilLaboralEditar").text(dataRecord.observacion);
                                    else $("#txtObservacionPerfilLaboralEditar").text('');
                                    $('#jqxTabsPerfilesLaborales').jqxTabs('enableAt', 0);
                                    $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 1);
                                    $('#jqxTabsPerfilesLaborales').jqxTabs('enableAt', 2);
                                    $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 3);
                                    $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 4);
                                    /**
                                     * Trasladamos el item seleccionado al que corresponde, el de modificación
                                     */
                                    $('#jqxTabsPerfilesLaborales').jqxTabs({selectedItem: 2});
                                } else {
                                    var msje = "Debe seleccionar un registro con estado EN PROCESO o ACTIVO para posibilitar la modificaci&oacute;n del registro";
                                    $("#divMsjePorError").html("");
                                    $("#divMsjePorError").append(msje);
                                    $("#divMsjeNotificacionError").jqxNotification("open");
                                }
                                listarTiposHorarios(dataRecord.tipo_horario,2);
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
                        var selectedrowindex = $("#divGridPerfilesLaborales").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridPerfilesLaborales').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                var id_perfillaboral = dataRecord.id;
                                /*
                                 *  Para dar de baja un registro, este debe estar inicialmente en estado ACTIVO
                                 */
                                if (dataRecord.estado >= 1) {
                                    if(confirm("Esta seguro de dar de baja este perfil?")){
                                        guardarRegistroBajaPerfilLaboral(id_perfillaboral);
                                    }
                                } else {
                                    var msje = "Para dar de baja el registro, este debe estar en estado 'EN PROCESO' o 'ACTIVO' inicialmente.";
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
                    /* Ver registro de temporalidades por perfil.*/
                    $("#turnrowbutton").on('click', function () {

                        var selectedrowindex = $("#divGridPerfilesLaborales").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridPerfilesLaborales').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                var id_perfillaboral = dataRecord.id;
                                /*
                                 *  Vista de la temporalidad de los turnos asignadios
                                 */
                                $(".msjs-alert").hide();
                                if (dataRecord.estado != 2) {
                                    $('#jqxTabsPerfilesLaborales').jqxTabs('enableAt', 0);
                                    $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 1);
                                    $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 2);
                                    $('#jqxTabsPerfilesLaborales').jqxTabs('enableAt', 3);
                                    $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 4);

                                    /**
                                     * Trasladamos el item seleccionado al que corresponde, el de vistas.
                                     */
                                    $('#jqxTabsPerfilesLaborales').jqxTabs({selectedItem: 3});
                                    cargarGrillaTurnos(id_perfillaboral,dataRecord.perfil_laboral,dataRecord.grupo,dataRecord.tipo_horario,dataRecord.tipo_horario_descripcion);
                                    $("#ddPerfilLaboralTurnos").text(dataRecord.perfil_laboral);
                                    if(dataRecord.grupo!=''&&dataRecord.grupo!=null)$("#ddGrupoTurnos").text(dataRecord.grupo);
                                    else $("#ddGrupoTurnos").html("&nbsp;");
                                    $("#ddTipoHorarioTurnos").text(dataRecord.tipo_horario_descripcion);
                                } else {
                                    var msje = "Para acceder a la Gesti&oacute;n de Turnos, el perfil debe estar en estado ACTIVO o PASIVO.";
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
                        text: 'Perfil',
                        columntype: 'textbox',
                        filtertype: 'input',
                        datafield: 'perfil_laboral',
                        width: 250,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Grupo',
                        filtertype: 'checkedlist',
                        datafield: 'grupo',
                        width: 150,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Tipo Horario',
                        filtertype: 'checkedlist',
                        datafield: 'tipo_horario_descripcion',
                        width: 200,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {text: 'Observaci&oacute;n', datafield: 'observacion', width: 300, align:'center',hidden: false},
                ]
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
        $('#jqxTabsPerfilesLaborales').jqxTabs('enableAt', 0);
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 1);
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 2);
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 3);
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 4);
        $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 5);

        /**
         * Saltamos a la pantalla principal en caso de presionarse ESC
         */
        $('#jqxTabsPerfilesLaborales').jqxTabs({selectedItem: 0});
        /*$("#popupWindowHorario").jqxWindow('close');*/
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
/**
 * Función para la obtención de la fecha enviada como parámetro en formato dd-mm-yyyy
 * @param fecha
 * @returns {string}
 */
function fechaConvertirAFormato(fecha,separador){
    if(separador=='')separador='-';
    var formattedDate = fecha;
    var d = formattedDate.getDate();
    var m =  formattedDate.getMonth();
    m += 1;  // Los meses en JavaScript son 0-11
    var y = formattedDate.getFullYear();
    var ceroDia="";
    var ceroMes="";
    if(d<10)ceroDia="0";
    if(m<10)ceroMes="0";
    var fechaResultado = ceroDia+d+separador+ceroMes+m+separador+y;
    return fechaResultado;
}