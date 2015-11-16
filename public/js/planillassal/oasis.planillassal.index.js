/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  21-07-2015
 */
$().ready(function () {

    /**
     * Inicialmente se habilita solo la pestaña del listado
     */
    $('#divTabPlanillasSal').jqxTabs('theme', 'oasis');
    $('#divTabPlanillasSal').jqxTabs('enableAt', 0);
    $('#divTabPlanillasSal').jqxTabs('disableAt', 1);
    $('#divTabPlanillasSal').jqxTabs('disableAt', 2);

    definirGrillaParaListaPlanillas();
    /**
     * Control para la obtención de la Planilla Salarial previa.
     */
    $("#btnGenerarPlanillaPreviaSal").on("click",function(){
        $("#btnGenerarPlanillaSal").hide();
         limpiarFormularioPlanillaSal(1);
         var ok = validaFormularioPlanillaSal(1);
         if (ok){
             desplegarPlanillaPreviaSal('');
         }else{
             $("#divGridPlanillasSalGen").jqxGrid('clear');
         }
    });
    /**
     * Control para la obtención de la planilla calculada para el personal seleccionado.
     */
    $("#btnCalcularPlanillaPreviaSal").on("click",function(){
        var cantidadRegistrosValidos = 0;
        limpiarFormularioPlanillaSal(1);
        var ok = validaFormularioPlanillaSal(2);
        if (ok){
            var rows = $("#divGridPlanillasSalGen").jqxGrid('selectedrowindexes');
            if(rows.length>0){
                var listaIdRelaborales = '';
                var separador = '|';
                var selectedRecords = new Array();
                for (var m = 0; m < rows.length; m++) {
                    var dataRecord = $("#divGridPlanillasSalGen").jqxGrid('getrowdata', rows[m]);
                    if(dataRecord.dias_efectivos>0){
                        cantidadRegistrosValidos++;
                        listaIdRelaborales += dataRecord.id_relaboral + separador;
                    }
                }
                if(cantidadRegistrosValidos>0){
                    listaIdRelaborales += separador;
                    listaIdRelaborales = listaIdRelaborales.replace(separador + separador, "");
                    $("#btnGenerarPlanillaSal").show();
                    desplegarPlanillaPreviaSal(listaIdRelaborales);
                }else{
                    var msje = "Debe seleccionar al menos un registro v&aacute;lido (D&iacute;as efectivos mayor a cero) para de la Planilla Salarial.";
                    $("#divMsjePorError").html("");
                    $("#divMsjePorError").append(msje);
                    $("#divMsjeNotificacionError").jqxNotification("open");
                }

            }else{
                var msje = "Debe seleccionar al menos un registro para el c&aacute;lculo de la Planilla Salarial.";
                $("#divMsjePorError").html("");
                $("#divMsjePorError").append(msje);
                $("#divMsjeNotificacionError").jqxNotification("open");
            }
        }
    });
    /**
     * Control para el control de los registros seleccionados
     */
    $("#btnGenerarPlanillaSal").on("click",function(){
        var cantidadRegistrosValidos = 0;
        var cantidadRegistrosInvalidos = 0;
        limpiarFormularioPlanillaSal(1);
        var ok = validaFormularioPlanillaSal(1);
        if (ok){
            /**
             * Inicialmente se verifica que se haya ejecutado el calculo de la planilla.
             */
            //if($("#hdnSwPlanillaSalCalculada").val()==1){

                var rows = $("#divGridPlanillasSalGen").jqxGrid('selectedrowindexes');
                if(rows.length>0){
                    var listaIdRelaborales = '';
                    var separador = '|';
                    var selectedRecords = new Array();
                    for (var m = 0; m < rows.length; m++) {
                        var dataRecord = $("#divGridPlanillasSalGen").jqxGrid('getrowdata', rows[m]);
                        if(dataRecord.dias_efectivos>0){
                            cantidadRegistrosValidos++;
                            listaIdRelaborales += dataRecord.id_relaboral + separador;
                        }else{
                            cantidadRegistrosInvalidos++;
                        }
                    }
                    if(cantidadRegistrosValidos>0){

                        if(cantidadRegistrosInvalidos>0){
                            if(confirm("Se ha(n) seleccionado "+cantidadRegistrosInvalidos+" registro(s) con dias efectivos no calculables. ¿Aún desea generar la planilla omitiendo estos registros?"))
                            {
                                listaIdRelaborales += separador;
                                listaIdRelaborales = listaIdRelaborales.replace(separador + separador, "");
                                var sufijo = "Gen";
                                var gestion = $("#lstGestion"+sufijo).val();
                                var mes = $("#lstMes"+sufijo).val();
                                var idFinPartida = $("#lstFinPartida"+sufijo).val();
                                var idTipoPlanilla = $("#lstTipoPlanillaSal"+sufijo).val();
                                var numeroPlanilla = $("#lstTipoPlanillaSal"+sufijo+" option:selected").data("numero");
                                var observacion = "";
                                $("#popupObservacionPlanillaSal").modal("show");
                                $('#popupObservacionPlanillaSal').on('shown.bs.modal', function () {
                                    $("#txtObservacionPlanillaSal").focus();
                                });

                                $("#txtObservacionPlanillaSal").val("");
                                $("#txtObservacionPlanillaSal").focus();
                                $("#btnAplicarObservacionPlanillaSal").off();
                                $("#btnAplicarObservacionPlanillaSal").on("click",function(){
                                    $("#popupObservacionPlanillaSal").modal("hide");
                                    observacion = $("#txtObservacionPlanillaSal").val();
                                    ok = generarPlanillaSalarial(gestion,mes,idFinPartida,idTipoPlanilla,numeroPlanilla,listaIdRelaborales,observacion);
                                    if(ok){
                                        $('#divTabPlanillasSal').jqxTabs('enableAt', 0);
                                        $('#divTabPlanillasSal').jqxTabs('disableAt', 1);
                                        $('#divTabPlanillasSal').jqxTabs('disableAt', 2);
                                        $('#divTabPlanillasSal').jqxTabs({selectedItem: 0});
                                        $("#divGridPlanillasSal").jqxGrid("updatebounddata","cells");
                                    }

                                });
                            }
                        }else{
                            listaIdRelaborales += separador;
                            listaIdRelaborales = listaIdRelaborales.replace(separador + separador, "");
                            var sufijo = "Gen";
                            var gestion = $("#lstGestion"+sufijo).val();
                            var mes = $("#lstMes"+sufijo).val();
                            var idFinPartida = $("#lstFinPartida"+sufijo).val();
                            var idTipoPlanilla = $("#lstTipoPlanillaSal"+sufijo).val();
                            var numeroPlanilla = $("#lstTipoPlanillaSal"+sufijo+" option:selected").data("numero");
                            var observacion = "";
                            $("#popupObservacionPlanillaSal").modal("show");
                            $('#popupObservacionPlanillaSal').on('shown.bs.modal', function () {
                                $("#txtObservacionPlanillaSal").focus();
                            });
                            $("#txtObservacionPlanillaSal").val("");
                            $("#txtObservacionPlanillaSal").focus();
                            $("#btnAplicarObservacionPlanillaSal").off();
                            $("#btnAplicarObservacionPlanillaSal").on("click",function(){
                                $("#popupObservacionPlanillaSal").modal("hide");
                                observacion = $("#txtObservacionPlanillaSal").val();
                                ok = generarPlanillaSalarial(gestion,mes,idFinPartida,idTipoPlanilla,numeroPlanilla,listaIdRelaborales,observacion);
                                if(ok){
                                    $('#divTabPlanillasSal').jqxTabs('enableAt', 0);
                                    $('#divTabPlanillasSal').jqxTabs('disableAt', 1);
                                    $('#divTabPlanillasSal').jqxTabs('disableAt', 2);
                                    $('#divTabPlanillasSal').jqxTabs({selectedItem: 0});
                                    $("#divGridPlanillasSal").jqxGrid("updatebounddata","cells");
                                }

                            });
                        }
                    }else{
                        var msje = "Debe seleccionar al menos un registro v&aacute;lido (D&iacute;as efectivos mayor a cero) para la generaci&oacute;n de la Planilla Salarial.";
                        $("#divMsjePorError").html("");
                        $("#divMsjePorError").append(msje);
                        $("#divMsjeNotificacionError").jqxNotification("open");
                    }

                }else{
                    var msje = "Debe seleccionar al menos un registro para la generaci&oacute;n de la Planilla Salarial.";
                    $("#divMsjePorError").html("");
                    $("#divMsjePorError").append(msje);
                    $("#divMsjeNotificacionError").jqxNotification("open");
                }

            /*}else{
                var msje = "Debe solicitar inicialmente el c&aacute;lculo de la planilla inicialmente para poder generar la planilla respectiva..";
                $("#divMsjePorError").html("");
                $("#divMsjePorError").append(msje);
                $("#divMsjeNotificacionError").jqxNotification("open");
            }*/
        }
    });

    $("#liList").on("click",function () {
        $('#divTabPlanillasSal').jqxTabs('enableAt', 0);
        $('#divTabPlanillasSal').jqxTabs('disableAt', 1);
        $('#divTabPlanillasSal').jqxTabs('disableAt', 2);
        $("#msjs-alert").hide();
    });
    $("#btnGuardarExcepcionEdit").on("click",function () {
        var ok = validaFormularioExcepcion(2);
        if (ok) {
            var okk = guardaExcepcion(2);
            if (okk) {
                $('#divTabPlanillasSal').jqxTabs('enableAt', 0);
                $('#divTabPlanillasSal').jqxTabs('disableAt', 1);
                $('#divTabPlanillasSal').jqxTabs('disableAt', 2);

                $("#msjs-alert").hide();
            }
        }
    });
    $("#btnCancelarExcepcionNew").click(function () {
        $('#divTabPlanillasSal').jqxTabs('enableAt', 0);
        $('#divTabPlanillasSal').jqxTabs('disableAt', 1);
        $('#divTabPlanillasSal').jqxTabs('disableAt', 2);

        $("#msjs-alert").hide();

    });
    $("#btnCancelarExcepcionEdit").click(function () {
        $('#divTabPlanillasSal').jqxTabs('enableAt', 0);
        $('#divTabPlanillasSal').jqxTabs('disableAt', 1);
        $('#divTabPlanillasSal').jqxTabs('disableAt', 2);

        $("#msjs-alert").hide();
    });
    $("#btnExportarGenExcel").on("click",function () {
        /*$("#divGridPlanillasSalGen").jqxGrid('exportdata', 'xls', 'jqxGrid');*/
        $("#divGridPlanillasSalGen").jqxGrid('exportdata', 'xml', 'PlanillaSalPrevia');
    });
    $("#btnExportarViewExcel").on("click",function () {
        var items = $("#divPlanilllaSalViewListBox").jqxListBox('getCheckedItems');
        var numColumnas = 0;
        $.each(items, function (index, value) {
            numColumnas++;
        });
        var idPlanillaSal = $("#hdnIdPlanillaSal").val();
        if(idPlanillaSal>0&&numColumnas > 0){
            exportarReporte(1,idPlanillaSal);
        }else {
            alert("Debe seleccionar al menos una columna para la obtención del reporte solicitado.");
        }
    });
    $("#btnExportarViewPDF").on("click",function () {
        var idPlanillaSal = $("#hdnIdPlanillaSal").val();
        if(idPlanillaSal>0){
            exportarReporte(2,idPlanillaSal);
        }else {
            alert("Debe seleccionar una planilla.");
        }
    });
    $("#btnExportarPDF").click(function () {
        var items = $("#listBoxPlanillasSal").jqxListBox('getCheckedItems');
        var numColumnas = 0;
        $.each(items, function (index, value) {
            numColumnas++;
        });
        if (numColumnas > 0) exportarReporte(2);
        else {
            alert("Debe seleccionar al menos una columna para la obtención del reporte solicitado.");
            $("#listBoxPlanillasSal").focus();
        }
    });
    $("#chkAllCols").click(function () {
        if (this.checked == true) {
            $("#listBoxPlanillasSal").jqxListBox('checkAll');
        } else {
            $("#listBoxPlanillasSal").jqxListBox('uncheckAll');
        }
    });
    $("#liList").click(function () {
        $("#btnCancelarExcepcionNew").click();
        $("#btnCancelarExcepcionEdit").click();
    });
    $('#btnDesfiltrartodo').click(function () {
        $("#divGridPlanillasSal").jqxGrid('clearfilters');
    });
    $('#btnDesfiltrarTodoPlanillasSalView').click(function () {
        $("#divGridPlanillasSalView").jqxGrid('clearfilters');
    });
    $('#btnDesfiltrarTodoPlanillasSalGen').click(function () {
        $("#divGridPlanillasSalGen").jqxGrid('clearfilters');
    });
    $('#btnDesagrupartodo').click(function () {
        $('#divGridPlanillasSal').jqxGrid('cleargroups');
    });
    $('#btnDesagruparTodoPlanillasSalView').click(function () {
        $('#divGridPlanillasSalView').jqxGrid('cleargroups');
    });
    $('#btnDesagruparTodoMovilidad').click(function () {
        $('#divGridPlanillasSalmovilidad').jqxGrid('cleargroups');
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
 * Función para definir la grilla principal (listado) para la gestión de planillas.
 */
function definirGrillaParaListaPlanillas() {
    var source =
    {
        datatype: "json",
        datafields: [
            {name: 'nro_row', type: 'integer'},
            {name: 'id', type: 'integer'},
            {name: 'gestion', type: 'integer'},
            {name: 'mes', type: 'integer'},
            {name: 'mes_nombre', type: 'string'},
            {name: 'finpartida_id', type: 'integer'},
            {name: 'fin_partida', type: 'string'},
            {name: 'condicion_id', type: 'integer'},
            {name: 'condicion', type: 'string'},
            {name: 'tipoplanilla_id', type: 'integer'},
            {name: 'tipo_planilla', type: 'string'},
            {name: 'numero', type: 'integer'},
            {name: 'total_ganado', type: 'numeric'},
            {name: 'total_liquido', type: 'numeric'},
            {name: 'cantidad_relaborales', type: 'numeric'},
            {name: 'observacion', type: 'string'},
            {name: 'estado', type: 'string'},
            {name: 'estado_descripcion', type: 'string'}
        ],
        url: '/planillassal/list',
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    cargarRegistrosDeTolerancias();
    function cargarRegistrosDeTolerancias() {
        var theme = prepareSimulator("grid");
        $("#divGridPlanillasSal").jqxGrid(
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
                    container.append("<button id='addplanrowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-plus-square fa-2x text-info' title='Nuevo Registro.'/></i></button>");
                    container.append("<button id='editplanrowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-pencil-square fa-2x text-info' title='Editar Observaci&oacute;n de Registro.'/></i></button>");
                    container.append("<button id='viewplanrowbutton'  class='btn btn-sm btn-primary' type='button' ><i class='fa fa-search fa-2x text-info' title='Ver Registros de Planilla.'/></button>");
                    container.append("<button id='approveplanrowbutton'  class='btn btn-sm btn-primary' type='button' ><i class='fa fa-check-square fa-2x text-info' title='Aprobar registro'></i></button>");
                    container.append("<button id='deleteplanrowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-minus-square fa-2x text-info' title='Dar de baja al registro.'/></i></button>");


                    $("#addplanrowbutton").jqxButton();
                    $("#editplanrowbutton").jqxButton();
                    $("#approveplanrowbutton").jqxButton();
                    $("#deleteplanrowbutton").jqxButton();
                    $("#viewplanrowbutton").jqxButton();

                    $("#hdnIdPlanillaSal").val(0);
                    $("#btnGenerarPlanillaSal").hide();
                    /* Generar una nueva planilla salarial */
                    $("#addplanrowbutton").off();
                    $("#addplanrowbutton").on('click', function () {
                        $("#btnCalcularPlanillaPreviaSal").hide();
                        $('#divTabPlanillasSal').jqxTabs('enableAt', 1);
                        $('#divTabPlanillasSal').jqxTabs('disableAt', 2);
                        $('#divTabPlanillasSal').jqxTabs({selectedItem: 1});
                        $("#divGridPlanillasSalGen").jqxGrid('clear');
                        $('#divGridPlanillasSalGen').jqxGrid('selectallrows',false);
                        limpiarFormularioPlanillaSal(1);
                        cargarGestiones(1,0);
                        cargarMeses(1,0,0);
                        cargarFinPartidas(1,0,0,0);
                        cargarTiposDePlanilla(1,0,0,0,0);
                        desplegarPlanillaPreviaSal();
                        $("#lstGestionGen").focus();

                        $("#lstGestionGen").off();
                        $("#lstGestionGen").on("change",function(){
                            cargarMeses(1,$("#lstGestionGen").val(),0);
                            cargarFinPartidas(1,$("#lstGestionGen").val(),0,0);
                            cargarTiposDePlanilla(1,$("#lstGestionGen").val(),0,0,0);
                            $("#btnGenerarPlanillaSal").hide();
                            $("#btnCalcularPlanillaPreviaSal").hide();
                        });
                        $("#lstMesGen").off();
                        $("#lstMesGen").on("change",function(){
                            cargarFinPartidas(1,$("#lstGestionGen").val(),$("#lstMesGen").val(),0);
                            cargarTiposDePlanilla(1,$("#lstGestionGen").val(),$("#lstMesGen").val(),0,0);
                            $("#btnGenerarPlanillaSal").hide();
                            $("#btnCalcularPlanillaPreviaSal").hide();
                        });
                        $("#lstFinPartidaGen").off();
                        $("#lstFinPartidaGen").on("change",function(){
                            cargarTiposDePlanilla(1,$("#lstGestionGen").val(),$("#lstMesGen").val(),$("#lstFinPartidaGen").val(),0);
                            $("#btnGenerarPlanillaSal").hide();
                            $("#btnCalcularPlanillaPreviaSal").hide();
                        });
                        $("#lstTipoPlanillaSalGen").off();
                        $("#lstTipoPlanillaSalGen").on("change",function(){
                            $("#btnGenerarPlanillaSal").hide();
                            $("#btnCalcularPlanillaPreviaSal").hide();
                        });
                    });
                    /* Ver registro.*/
                    $("#editplanrowbutton").off();
                    $("#editplanrowbutton").on('click', function () {
                        var selectedrowindex = $("#divGridPlanillasSal").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridPlanillasSal').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                /**
                                 * Se admite la modificación del registro de la observación de la planilla si su estado es GENERADO O VERIFICADO
                                 */
                                if(dataRecord.estado==1||dataRecord.estado==2){
                                    var observacion = "";
                                    $("#popupObservacionPlanillaSalEdit").modal("show");
                                    $("#txtObservacionPlanillaSalEdit").val(dataRecord.observacion);
                                    $('#popupObservacionPlanillaSalEdit').on('shown.bs.modal', function () {
                                        $("#txtObservacionPlanillaSalEdit").focus();
                                    });

                                    $("#btnAplicarObservacionPlanillaSalEdit").off();
                                    $("#btnAplicarObservacionPlanillaSalEdit").on("click",function(){
                                        $("#popupObservacionPlanillaSalEdit").modal("hide");
                                        observacion = $("#txtObservacionPlanillaSalEdit").val();
                                        modificarObservacionEnPlanillaSal(dataRecord.id,0,observacion);
                                    });
                                }else{
                                    var msje = "Debe seleccionar un registro de Planilla Salarial en estado GENERADA O VERIFICADA para poder modificar la observaci&oacute;n de la observaci&oacute;n de la planilla.";
                                    $("#divMsjePorError").html("");
                                    $("#divMsjePorError").append(msje);
                                    $("#divMsjeNotificacionError").jqxNotification("open");
                                }
                            }else{
                                var msje = "Debe seleccionar un registro de Planilla Salarial necesariamente.";
                                $("#divMsjePorError").html("");
                                $("#divMsjePorError").append(msje);
                                $("#divMsjeNotificacionError").jqxNotification("open");
                            }
                        } else {
                            var msje = "Debe seleccionar un registro de Planilla Salarial necesariamente.";
                            $("#divMsjePorError").html("");
                            $("#divMsjePorError").append(msje);
                            $("#divMsjeNotificacionError").jqxNotification("open");
                        }
                    });
                    /* Ver registro.*/
                    $("#viewplanrowbutton").off();
                    $("#viewplanrowbutton").on('click', function () {
                        var selectedrowindex = $("#divGridPlanillasSal").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridPlanillasSal').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                $('#divTabPlanillasSal').jqxTabs('disableAt', 1);
                                $('#divTabPlanillasSal').jqxTabs('enableAt', 2);
                                $('#divTabPlanillasSal').jqxTabs({selectedItem: 2});
                                $("#tbodyDatosPlanillaSal").html("");
                                var obs = "";
                                $("#tbodyDatosPlanillaSal").append("<tr class='success'>");
                                $("#tbodyDatosPlanillaSal").append("<td style='text-align: center'>"+dataRecord.estado_descripcion+"</td>");
                                $("#tbodyDatosPlanillaSal").append("<td style='text-align: center'>"+dataRecord.gestion+"</td>");
                                $("#tbodyDatosPlanillaSal").append("<td style='text-align: center'>"+dataRecord.mes_nombre+"</td>");
                                $("#tbodyDatosPlanillaSal").append("<td>"+dataRecord.fin_partida+"</td>");
                                var tipoPlanilla = dataRecord.tipo_planilla;
                                if(dataRecord.numero>0){
                                    tipoPlanilla += " ("+dataRecord.numero+")";
                                }
                                $("#tbodyDatosPlanillaSal").append("<td style='text-align: center'>"+tipoPlanilla+"</td>");
                                if(dataRecord.observacion!=null)obs=dataRecord.observacion;
                                $("#tbodyDatosPlanillaSal").append("<td>"+obs+"</td>");
                                $("#tbodyDatosPlanillaSal").append("</tr>");
                                $("#hdnIdPlanillaSal").val(dataRecord.id);
                                $('#divPlanilllaSalViewListBox').jqxListBox('refresh');
                                mostrarPlanilla(dataRecord.id);
                            }else{
                                var msje = "Debe seleccionar un registro de Planilla Salarial necesariamente.";
                                $("#divMsjePorError").html("");
                                $("#divMsjePorError").append(msje);
                                $("#divMsjeNotificacionError").jqxNotification("open");
                            }
                        } else {
                            var msje = "Debe seleccionar un registro de Planilla Salarial necesariamente.";
                            $("#divMsjePorError").html("");
                            $("#divMsjePorError").append(msje);
                            $("#divMsjeNotificacionError").jqxNotification("open");
                        }
                    });
                    /*Aprobar registro.*/
                    $("#approveplanrowbutton").on('click', function () {
                     var selectedrowindex = $("#divGridPlanillasSal").jqxGrid('getselectedrowindex');
                     if (selectedrowindex >= 0) {
                     var dataRecord = $('#divGridPlanillasSal').jqxGrid('getrowdata', selectedrowindex);
                     if (dataRecord != undefined) {
                     if (dataRecord.estado == 1 || dataRecord.estado == 2) {
                     if (confirm("¿Esta segur@ de aprobar esta planilla?")) {
                         aprobarRegistroPlanillaSal(dataRecord.id);
                     }
                     } else {
                             var msje = "Debe seleccionar un registro con estado GENERADA o VERIFICADA para posibilitar la aprobaci&oacute;n del registro.";
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
                    $("#deleteplanrowbutton").on('click', function () {
                        var selectedrowindex = $("#divGridPlanillasSal").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridPlanillasSal').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                /*
                                 *  Para dar de baja un registro, este debe estar inicialmente en estado GENERADA o VERIFICADA
                                 */
                                if (dataRecord.estado == 1 || dataRecord.estado == 2) {
                                    if (confirm("Esta seguro de dar de baja registro de Planilla Salarial?"))
                                        darDeBajaPlanillaSal(dataRecord.id);
                                } else {
                                    var msje = "Para dar de baja un registro, este debe estar en estado GENERADA o VERIFICADA inicialmente.";
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
                    {
                        text: 'Nro.',
                        filterable: false,
                        columntype: 'number',
                        width: 40,
                        cellsalign: 'center',
                        align: 'center',
                        cellsrenderer: rownumberrenderer
                    },
                    {
                        text: 'Estado',
                        filtertype: 'checkedlist',
                        datafield: 'estado_descripcion',
                        width: 90,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false,
                        cellclassname: cellclass
                    },
                    {
                        text: 'Gesti&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'gestion',
                        width: 60,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Mes',
                        filtertype: 'checkedlist',
                        datafield: 'mes_nombre',
                        width: 100,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Condici&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'condicion',
                        width: 100,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Fuente',
                        filtertype: 'checkedlist',
                        datafield: 'fin_partida',
                        width: 130,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Tipo Planilla',
                        filtertype: 'checkedlist',
                        datafield: 'tipo_planilla',
                        width: 80,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'N&uacute;mero',
                        filtertype: 'checkedlist',
                        datafield: 'numero',
                        width: 60,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Total Ganado',
                        filtertype: 'checkedlist',
                        datafield: 'total_ganado',
                        width: 90,
                        align: 'center',
                        cellsalign: 'right',
                        hidden: false
                    },
                    {
                        text: 'Total L&iacute;quido',
                        filtertype: 'checkedlist',
                        datafield: 'total_liquido',
                        width: 90,
                        align: 'center',
                        cellsalign: 'right',
                        hidden: false
                    },
                    {
                        text: 'Cantidad',
                        filtertype: 'checkedlist',
                        datafield: 'cantidad_relaborales',
                        width: 60,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Observaci&oacute;n',
                        datafield: 'observacion',
                        width: 100,
                        align: 'center',
                        hidden: false
                    },
                ]
            });
        var listSource = [
            {label: 'Estado', value: 'estado_descripcion', checked: true},
            {label: 'Gesti&oacute;n', value: 'gestion', checked: true},
            {label: 'Mes', value: 'mes_nombre', checked: true},
            {label: 'Condici&oacute;n', value: 'condicion', checked: true},
            {label: 'Fuente', value: 'fin_partida', checked: true},
            {label: 'Tipo Planilla', value: 'tipo_planilla', checked: true},
            {label: 'N&uacute;mero', value: 'numero', checked: true},
            {label: 'Total Ganado', value: 'total_ganado', checked: true},
            {label: 'Total L&iacute;quido', value: 'total_liquido', checked: true},
            {label: 'Cantidad', value: 'cantidad_relaborales', checked: true},
            {label: 'Observaci&oacute;n', value: 'observacion', checked: true}
        ];
        $("#listBoxPlanillasSal").jqxListBox({source: listSource, width: "100%", height: 430, checkboxes: true});
        $("#listBoxPlanillasSal").on('checkChange', function (event) {
            $("#divGridPlanillasSal").jqxGrid('beginupdate');
            if (event.args.checked) {
                $("#divGridPlanillasSal").jqxGrid('showcolumn', event.args.value);
            }
            else {
                $("#divGridPlanillasSal").jqxGrid('hidecolumn', event.args.value);
            }
            $("#divGridPlanillasSal").jqxGrid('endupdate');
        });
    }
}
/**
 * Función anónima para enumerar los registros
 * @param row
 * @param columnfield
 * @param value
 * @param defaulthtml
 * @param columnproperties
 * @param rowdata
 * @returns {string}
 */
var rownumberrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
    var nro = row + 1;
    return "<div align='center'>" + nro + "</div>";
}
/*
 * Función para controlar la ejecución del evento esc con el teclado.
 */
function OperaEvento(evento) {
    if ((evento.type == "keyup" || evento.type == "keydown") && evento.which == "27") {
        $('#divTabPlanillasSal').jqxTabs('enableAt', 0);
        $('#divTabPlanillasSal').jqxTabs('disableAt', 1);
        $('#divTabPlanillasSal').jqxTabs('disableAt', 2);

        /**
         * Saltamos a la pantalla principal en caso de presionarse ESC
         */
        $('#divTabPlanillasSal').jqxTabs({selectedItem: 0});
    }
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
    if (value == 'ANULADA') {
        return 'rojo';
    }
    else if (value == 'REVERTIDA') {
        return 'negro';
    }
    else if (value == 'GENERADA') {
        return 'amarillo';
    }
    else if (value == 'VERIFICADA') {
        return 'azul';
    }
    else if (value == 'APROBADA') {
        return 'verde';
    }
    else return ''
}
/**
 * Función para la definición de la columna en función del valor almacenado en la columna.
 * @param row
 * @param column
 * @param value
 * @param defaultHtml
 * @returns {*}
 */
var cellsrenderer = function(row, column, value, defaultHtml) {
    var element = $(defaultHtml);
    element.css({'background-color': value});
    return element[0].outerHTML;
    return defaultHtml;
}