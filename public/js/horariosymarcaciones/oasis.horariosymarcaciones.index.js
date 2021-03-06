/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  21-10-2014
 */
$().ready(function () {
    $("#divProgressBar").hide();
    var objParametro = {idOrganigrama : 0,idArea:0,idUbicacion:0,idMaquina:0,idRelaboral:0,fechaIni:'',fechaFin:''}
    /**
     * Inicialmente se habilita solo la pestaña del listado
     */
    $('#divTabControlMarcaciones').jqxTabs('theme', 'oasis');
    $('#divTabControlMarcaciones').jqxTabs('enableAt', 1);
    $('#divTabControlMarcaciones').jqxTabs('disableAt', 1);
    $('#divTabControlMarcaciones').jqxTabs('disableAt', 2);
    $('#divTabControlMarcaciones').jqxTabs('disableAt', 3);

    definirGrillaParaListaRelaborales();
    /**
     * Control del evento de solicitud de guardar el registro de la excepción de control.
     */
    $("#btnGuardarControlExcepcionNew").on("click",function () {
        var ok = validaFormularioControlExcepciones(1)
        if (ok) {
            var okk = guardaControlExcepciones(1);
            if (okk) {
                $('#divTabControlMarcaciones').jqxTabs('enableAt', 0);
                $('#divTabControlMarcaciones').jqxTabs('enableAt', 1);
                $('#divTabControlMarcaciones').jqxTabs('disableAt', 2);

                $('#divTabControlMarcaciones').jqxTabs({selectedItem: 1});

                $("#msjs-alert").hide();
            }
        }
    });
    $("#btnGuardarControlExcepcionEdit").on("click",function () {
        var ok = validaFormularioControlExcepciones(2);
        if (ok) {
            var okk = guardaControlExcepciones(2);
            if (okk) {
                $('#divTabControlMarcaciones').jqxTabs('enableAt', 0);
                $('#divTabControlMarcaciones').jqxTabs('enableAt', 1);
                $('#divTabControlMarcaciones').jqxTabs('disableAt', 2);
                
                
                $('#divTabControlMarcaciones').jqxTabs({selectedItem: 1});
                $("#msjs-alert").hide();
            }
        }
    });
    /**
     * Función para ejecutar la generación de marcaciones previstas y efectivas de manera grupal para un conjunto de registro de relación laboral.
     */
    $("#btnAplicarGestionGeneracionMarcaciones").on("click",function(){
            var gestion = $("#lstGestionGeneracionMarcaciones").val();
            var mes = $("#lstMesGeneracionMarcaciones").val();
            var tipo = $("#lstTipoGeneracionMarcaciones").val();
            $('.progress-bar', '.bars-container').each(function() {
                var random = 0 + '%';
                $(this).css('width', random).html(random);
            });
            var fechaIni = "01-"+mes+"-"+gestion;
            var fechaFin = "01-"+mes+"-"+gestion;
            if(tipo==1||tipo==3){
                fechaIni = $("#txtCalculoFechaIni").val();
                fechaFin = $("#txtCalculoFechaFin").val();
            }
            if(gestion>0&&mes>0&&tipo>0&&fechaIni!=""&&fechaFin!=""){
                $("#popupGestionMesGeneracionMarcaciones").modal("hide");
                var rows = $("#divGridRelaborales").jqxGrid('selectedrowindexes');
                var contador = 0;
                var contador_aux = 0;
                var cantidad = rows.length;
                for (var m = 0; m < rows.length; m++) {
                    if(m==0){
                        $("#divProgressBar").show();
                    }
                    var row = $("#divGridRelaborales").jqxGrid('getrowdata', rows[m]);
                    var fechaBaja = "";
                    var fechaIncor = "";
                    if (row.fecha_baja!=null&&row.fecha_baja!=""){
                        fechaBaja = fechaConvertirAFormato(row.fecha_baja,"-")
                        var sep='-';
                        if(procesaTextoAFecha(fechaFin,sep)>procesaTextoAFecha(fechaBaja,sep)){
                            fechaFin = fechaBaja;
                        }
                    }
                    if (row.fecha_incor!=null&&row.fecha_incor!=""){
                        fechaIncor = fechaConvertirAFormato(row.fecha_incor,"-")
                    }
                    var ok1 = true;
                    var ok2 = true;
                    switch (tipo){
                        case "1":
                            ok1 = generarMarcacion(1,row.id_relaboral,gestion,mes,fechaIni,fechaFin,"H",row.estado,fechaIncor,fechaBaja);
                            ok2 = generarMarcacion(1,row.id_relaboral,gestion,mes,fechaIni,fechaFin,"M",row.estado,fechaIncor,fechaBaja);
                            break;
                        case "2":
                            ok1 = generarMarcacion(1,row.id_relaboral,gestion,mes,fechaIni,fechaFin,"H",row.estado,fechaIncor,fechaBaja);
                            break;
                        case "3":
                            ok2 = generarMarcacion(1,row.id_relaboral,gestion,mes,fechaIni,fechaFin,"M",row.estado,fechaIncor,fechaBaja);
                            break;
                    }
                    contador_aux++;
                    if(ok1&&ok2){
                        contador++;
                    }
                    var porcentaje = parseFloat((100*contador_aux)/cantidad);
                    porcentaje = porcentaje.toFixed(0);
                    $('.progress-bar', '.bars-container').each(function() {
                        var random = porcentaje + '%';
                        $(this).css('width', random).html(random+" ["+contador_aux+":"+cantidad+"]");
                    });
                }
                setTimeout(function() {
                    $("#divProgressBar").hide();
                },3000);
                if(contador>0&&contador==cantidad){
                    var msje = "Se generaron los registros de marcaci&oacute;n prevista y efectiva para "+contador+" registros de relaci&oacute;n laboral.";
                    $("#divMsjePorSuccess").html("");
                    $("#divMsjePorSuccess").append(msje);
                    $("#divMsjeNotificacionSuccess").jqxNotification("open");
                }else{
                    var msje = "Se generaron "+contador+" registros de marcaci&oacute;n prevista y efectiva para "+cantidad+" registros de relaci&oacute;n laboral seleccionadas.";
                    $("#divMsjePorWarning").html("");
                    $("#divMsjePorWarning").append(msje);
                    $("#divMsjeNotificacionWarning").jqxNotification("open");
                }
            }else{

            }
    });
    $("#btnGuardarBaja").click(function () {
        var ok = validaFormularioPorBajaRegistro();
        if (ok) {
            guardarRegistroBaja();
        }
    });
    $("#btnVolverDesdeMarcaciones").click(function (){
        $('#divTabControlMarcaciones').jqxTabs('enableAt', 0);
        $('#divTabControlMarcaciones').jqxTabs('disableAt', 1);
        $('#divTabControlMarcaciones').jqxTabs('disableAt', 2);
        $('#divTabControlMarcaciones').jqxTabs('disableAt', 3);

        $("#msjs-alert").hide();
    });

    $("#btnExportarMarcacionesExcel").click(function () {
        var items = $("#divListBoxMarcaciones").jqxListBox('getCheckedItems');
        var numColumnas = 0;
        $.each(items, function (index, value) {
            numColumnas++;
        });
        var idRelaboral = $("#hdnIdRelaboralVista").val();
        if (idRelaboral>0&&numColumnas > 0) exportarReporteHorariosYMarcaciones(1,idRelaboral);
        else {
            alert("Debe seleccionar al menos una columna para la obtención del reporte solicitado.");
            $("#divListBoxMarcaciones").focus();
        }
    });
    $("#btnExportarCalculosExcel").click(function () {
        var items = $("#divListBoxCalculos").jqxListBox('getCheckedItems');
        var numColumnas = 0;
        $.each(items, function (index, value) {
            numColumnas++;
        });
        var ci = $("#txtCiCalculo").val();
        var fechaIni=$("#txtFechaIniCalculo").val();
        var fechaFin = $("#txtFechaFinCalculo").val();
        var listadoCis = $("#txtCiCalculo").val()+"";
        var cantidadSeleccionada = 0;
        if(listadoCis!=''){
            var arr = listadoCis.split(',');
            cantidadSeleccionada=arr.length;
        }
        if(cantidadSeleccionada>0){
            if (fechaIni!=''&&fechaIni!=undefined&&fechaFin!=''&&fechaFin!=undefined&&numColumnas > 0)
                exportarReporteCalculosHorariosYMarcaciones(1,ci,fechaIni,fechaFin);
            else {
                alert("Debe seleccionar al menos una columna para la obtención del reporte solicitado.");
                $("#divListBoxCalculos").focus();
            }
        }else alert("Debe seleccionar al menos un persona de la cual se obtendrá el reporte solicitado.");
    });
    $("#btnExportarMarcacionesPDF").click(function () {
        var items = $("#divListBoxMarcaciones").jqxListBox('getCheckedItems');
        var numColumnas = 0;
        $.each(items, function (index, value) {
            numColumnas++;
        });
        var idRelaboral = $("#hdnIdRelaboralVista").val();
        if (idRelaboral>0&&numColumnas > 0) exportarReporteHorariosYMarcaciones(2,idRelaboral);
        else {
            alert("Debe seleccionar al menos una columna para la obtención del reporte solicitado.");
            $("#divListBoxMarcaciones").focus();
        }
    });
    $("#btnExportarCalculosPDF").click(function () {
        var items = $("#divListBoxCalculos").jqxListBox('getCheckedItems');
        var numColumnas = 0;
        $.each(items, function (index, value) {
            numColumnas++;
        });
        var ci = $("#txtCiCalculo").val();
        var fechaIni=$("#txtFechaIniCalculo").val();
        var fechaFin = $("#txtFechaFinCalculo").val();
        if (fechaIni!=''&&fechaFin!=''&&numColumnas > 0) exportarReporteCalculosHorariosYMarcaciones(2,ci,fechaIni,fechaFin);
        else {
            alert("Debe seleccionar al menos una columna para la obtención del reporte solicitado.");
            $("#divListBoxCalculos").focus();
        }
    });
    $("#chkAllCols").click(function () {
        if (this.checked == true) {
            $("#jqxlistbox").jqxListBox('checkAll');
        } else {
            $("#jqxlistbox").jqxListBox('uncheckAll');
        }
    });
    $("#btnImprimirCalendarioLaboralAndExcept").on("click",function(){
        var opciones = {mode:"popup",popClose: false};
        $("#page-content").printArea(opciones);
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
                }
            }
        }
    });
    $("#btnCalcular").on("click",function(){
        var objParametro = getParametroVacio();
        var items = $("#divListBoxCalculos").jqxListBox('getCheckedItems');
        var numColumnas = 0;
        $.each(items, function (index, value) {
            numColumnas++;
        });
        var fechaIni = $("#txtFechaIniCalculo").val();
        var fechaFin = $("#txtFechaFinCalculo").val();
        var listadoCis = $("#txtCiCalculo").val()+"";
        var cantidadSeleccionada = 0;
        if(listadoCis!=''){
            var arr = listadoCis.split(',');
            cantidadSeleccionada=arr.length;
        }
        if(cantidadSeleccionada>0){
            if (fechaIni!=''&&fechaIni!=undefined&&fechaFin!=''&&fechaFin!=undefined&&numColumnas > 0){
                var objParametro = {ci:listadoCis,idOrganigrama : 0,idArea:0,idUbicacion:0,idMaquina:0,idRelaboral:0,fechaIni:fechaIni,fechaFin:fechaFin};
                definirGrillaMarcacionesYCalculos(objParametro); }
        else {
                var msje = "Debe seleccionar las fechas para el rango en el cual se obtendr&aacute; el c&aacute;lculo.";
                $("#divMsjePorError").html("");
                $("#divMsjePorError").append(msje);
                $("#divMsjeNotificacionError").jqxNotification("open");
                if(fechaIni!='')$("#txtFechaFinCalculo").focus();
                else $("#txtFechaIniCalculo").focus();
            }
        }else alert("Debe seleccionar al menos un persona de la cual se obtendrá el reporte solicitado.");
    });
    $('#popupGeneradorMarcacionDebida').on('hidden.bs.modal', function () {
        $("#divGridControlMarcaciones").jqxGrid("updatebounddata");
    })
    /**
     * Evento activado cuando se adicionan carnet's al campo de selección
     */
    $("#txtCiCalculo").on('itemAdded', function(event) {
        var listado = $("#txtCiCalculo").val()+"";
        if(listado!=''){
            var arr = listado.split(',');
            $("#strongCantidadCis").text(arr.length);
        }else $("#strongCantidadCis").text(0);
    });
    /**
     * Evento activado cuando se descartan carnet's al campo de selección
     */
    $("#txtCiCalculo").on('itemRemoved', function(event) {
        var listado = $("#txtCiCalculo").val()+"";
        if(listado!=''){
            var arr = listado.split(',');
            $("#strongCantidadCis").text(arr.length);
        }else $("#strongCantidadCis").text(0);
    });

    $("#liList,#btnCancelarTurnAndExcept,#btnVolverDesdeCalculos").click(function () {
        $('#divTabControlMarcaciones').jqxTabs('enableAt', 0);
        $('#divTabControlMarcaciones').jqxTabs({selectedItem: 0});
        $('#divTabControlMarcaciones').jqxTabs('disableAt', 1);
        $('#divTabControlMarcaciones').jqxTabs('disableAt', 2);
        $('#divTabControlMarcaciones').jqxTabs('disableAt', 3);

        
        
        $("#msjs-alert").hide();
    });
    $("#liExcept").click(function () {
        $('#divTabControlMarcaciones').jqxTabs('enableAt', 0);
        $('#divTabControlMarcaciones').jqxTabs('enableAt', 1);
        $('#divTabControlMarcaciones').jqxTabs({selectedItem: 1});
        $('#divTabControlMarcaciones').jqxTabs('disableAt', 2);
        $("#msjs-alert").hide();
    });

    $('#btnDesfiltrartodo').click(function () {
        $("#divGridRelaborales").jqxGrid('clearfilters');
    });
    $('#btnDesfiltrartodomarcaciones').click(function () {
        $("#divGridControlMarcaciones").jqxGrid('clearfilters');
    });
    $('#btnDesagrupartodo').click(function () {
        $('#divGridRelaborales').jqxGrid('cleargroups');
    });
    $('#btnDesagrupartodomarcaciones').click(function () {
        $('#divGridControlMarcaciones').jqxGrid('cleargroups');
    });
    /**
     * Definición de la ventana donde se ve el historial de registros de relación laboral
     */
    /*$('#HistorialSplitter').jqxSplitter({
        theme: 'oasis',
        width: '100%',
        height: 480,
        panels: [{size: '8%'}, {size: '92%'}]
    });*/

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
 * Función para instanciar un objeto de tipo parámetro.
 */
function getParametroVacio(){
    var objParametro = {idOrganigrama : 0,idArea:0,idUbicacion:0,idMaquina:0,idRelaboral:0,fechaIni:'',fechaFin:''}
    return objParametro;
}
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
            {name: 'item', type: 'integer'},
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
            {name: 'ubicacion', type: 'string'},
            {name: 'num_contrato', type: 'string'},
            {name: 'fin_partida', type: 'string'},
            {name: 'partida', type: 'integer'},
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
            {name: 'relaboral_previo_id', type: 'integer'},
            {name: 'observacion', type: 'string'},
            {name: 'fecha_ing', type: 'date'}
        ],
        url: '/relaborales/listactivos',
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    cargarRegistrosDeRelacionesLaborales();
    function cargarRegistrosDeRelacionesLaborales() {
        var theme = prepareSimulator("grid");
        $("#divGridRelaborales").jqxGrid(
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
                selectionmode:'checkbox',
                rendertoolbar: function (toolbar) {
                    var me = this;
                    var container = $("<div></div>");
                    toolbar.append(container);
                    container.append("<button id='listrowbutton' class='btn btn-sm btn-primary' type='button'  title='Listado de Horarios y Marcaciones por Relaci&oacute;n Laboral.'><i class='fa fa-list-alt fa-2x text-info' title='Listado de Horarios y Marcaciones por Relaci&oacute;n Laboral.'/></i></button>");
                    container.append("<button id='generatemarcrowbutton' class='btn btn-sm btn-primary' type='button'  title='Formulario para la generaci&oacute;n de la matriz de marcaciones previstas y efectivas para una gesti&oacute;n y mes determinados.'><i class='fa fa-flag-checkered fa-2x text-info' title='Formulario para la generaci&oacute;n de la matriz de marcaciones previstas y efectivas para una gesti&oacute;n y mes determinados.'/></i></button>");
                    container.append("<button id='calculaterowbutton' class='btn btn-sm btn-primary' type='button'  title='Formulario para el c&aacute;lculo de asistencia.'><i class='gi gi-calculator fa-2x text-info' title='Formulario para el c&aacute;lculo de asistencia.'/></i></button>");
                    container.append("<button title='Ver calendario de turnos y permisos de manera global para la persona.' id='turnrowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-calendar fa-2x text-info' title='Vista Turnos Laborales por relaci&oacute;n laboral.'/></i></button>");

                    $("#listrowbutton").jqxButton();
                    $("#generatemarcrowbutton").jqxButton();
                    $("#calculaterowbutton").jqxButton();
                    $("#turnrowbutton").jqxButton();
                    $("#hdnIdRelaboralVista").val(0);
                    $("#divCalculoFechas").hide();
                    /* Registrar nueva relación laboral.*/
                    $("#listrowbutton").off();
                    $("#listrowbutton").on('click', function () {
                        var selectedrowindex = $("#divGridRelaborales").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridRelaborales').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                var idRelaboral = dataRecord.id_relaboral;
                                /*
                                 *  La vista del historial se habilita para personas que tengan al menos un registro de relación sin importar su estado, ACTIVO, EN PROCESO o PASIVO.
                                 *  De esta vista se excluyen a personas que no tengan ningún registro de relación laboral.
                                 */
                                $(".msjs-alert").hide();
                                $("#hdnIdPersonaHistorial").val(dataRecord.id_persona);
                                if (dataRecord.tiene_contrato_vigente >= 0) {
                                    $('#divTabControlMarcaciones').jqxTabs('enableAt', 0);
                                    $('#divTabControlMarcaciones').jqxTabs('disableAt', 2);
                                    $('#divTabControlMarcaciones').jqxTabs('disableAt', 3);
                                    $('#divTabControlMarcaciones').jqxTabs('enableAt', 1);
                                    $('#divTabControlMarcaciones').jqxTabs({selectedItem: 1});

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
                                    cargarPersonasContactosHorariosYMarcaciones(1,dataRecord.id_persona);
                                    $("#hdnIdRelaboralVista").val(idRelaboral);
                                    $("#hdnSwPrimeraVistaHistorial").val(0);
                                    $("#divContent_" + dataRecord.id_relaboral).focus().select();
                                    definirGrillaParaListaControlMarcacionesDebidasYRealizadasPorIdRelaboral(dataRecord);
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
                    /**
                     * Generar las marcaciones previstas y efectivas de manera directa
                     */
                    $("#generatemarcrowbutton").off();
                    $("#generatemarcrowbutton").on("click",function(){

                            var rows = $("#divGridRelaborales").jqxGrid('selectedrowindexes');
                            if(rows.length>0) {
                                $("#popupGestionMesGeneracionMarcaciones").modal("show");
                                $("#divCalculoFechas").hide();
                                var d = new Date();
                                var dia = d.getDate();
                                var mes = d.getMonth()+1;
                                var gestion = d.getFullYear();
                                var fechaDefectoInicio = dia+'-'+mes+'-'+gestion;
                                var fechaDefectoFin = dia+'-'+mes+'-'+gestion;
                                var startDate = '01-'+mes+'-'+gestion;
                                var endDate =  obtenerUltimoDiaMes(startDate);
                                cargarGestionesDisponiblesParaGeneracionMarcaciones(gestion);
                                cargarMesesDisponiblesParaGeneracionMarcaciones(gestion,mes);
                                cargarTiposDisponiblesParaGeneracionMarcaciones(gestion,mes,0);
                                $("#lstGestionGeneracionMarcaciones").off();
                                $("#lstGestionGeneracionMarcaciones").on("change",function(){
                                    cargarMesesDisponiblesParaGeneracionMarcaciones($("#lstGestionGeneracionMarcaciones").val(),0);
                                    cargarTiposDisponiblesParaGeneracionMarcaciones($("#lstGestionGeneracionMarcaciones").val(),0,0);
                                    $("#divCalculoFechas").hide();
                                });
                                $("#lstMesGeneracionMarcaciones").off();
                                $("#lstMesGeneracionMarcaciones").on("change",function(){
                                    cargarTiposDisponiblesParaGeneracionMarcaciones($("#lstGestionGeneracionMarcaciones").val(),$("#lstMesGeneracionMarcaciones").val(),0);
                                    $("#divCalculoFechas").hide();
                                });
                                $("#lstTipoGeneracionMarcaciones").off();
                                $("#lstTipoGeneracionMarcaciones").on("change",function(){
                                    if(this.value==1||this.value==3){
                                        startDate = '01-'+$("#lstMesGeneracionMarcaciones").val()+'-'+$("#lstGestionGeneracionMarcaciones").val();
                                        endDate =  obtenerUltimoDiaMes(startDate);
                                        if($("#lstMesGeneracionMarcaciones").val()!=mes){
                                            fechaDefectoInicio = startDate;
                                            fechaDefectoFin = endDate;
                                        }else {
                                            fechaDefectoInicio = dia+'-'+mes+'-'+gestion;
                                            fechaDefectoFin = dia+'-'+mes+'-'+gestion;
                                        }
                                        $("#divCalculoFechas").show();
                                        $('#txtCalculoFechaIni').datepicker('remove');
                                        $('#txtCalculoFechaIni').datepicker({
                                            format:'dd-mm-yyyy',
                                            weekStart: 1,
                                            startDate: startDate,
                                            endDate: endDate,
                                            autoclose: true
                                        });
                                        $('#txtCalculoFechaIni').datepicker('update',fechaDefectoInicio);
                                        $('#txtCalculoFechaFin').datepicker('remove');
                                        $('#txtCalculoFechaFin').datepicker({
                                            format:'dd-mm-yyyy',
                                            weekStart: 1,
                                            startDate: startDate,
                                            endDate: endDate,
                                            autoclose: true
                                        });
                                        $('#txtCalculoFechaFin').datepicker('update',fechaDefectoFin);
                                        $("#txtCalculoFechaIni").focus();
                                    }else $("#divCalculoFechas").hide();
                                });
                                $("#lstGestionGeneracionMarcaciones").focus();
                            }else{
                                var msje = "Debe al menos seleccionar un registro para solicitar la generaci&oacute;n de las marcaciones previstas y efectivas.";
                                $("#divMsjePorError").html("");
                                $("#divMsjePorError").append(msje);
                                $("#divMsjeNotificacionError").jqxNotification("open");
                            }
                    });
                    $("#calculaterowbutton").off();
                    $("#calculaterowbutton").on('click', function () {
                        $('#divTabControlMarcaciones').jqxTabs('enableAt', 0);
                        $('#divTabControlMarcaciones').jqxTabs('disableAt', 1);
                        $('#divTabControlMarcaciones').jqxTabs('enableAt', 2);
                        $('#divTabControlMarcaciones').jqxTabs({selectedItem: 2});
                        $('#divTabControlMarcaciones').jqxTabs('disableAt', 3);

                        $("#txtFechaIniCalculo").datepicker("update","");
                        $("#txtFechaIniCalculo").val('').datepicker('update');
                        $("#txtFechaFinCalculo").datepicker("update","");
                        $("#txtFechaFinCalculo").val('').datepicker('update');
                        $("#txtCiCalculo").val("");
                        var ci = '';
                        $("#strongCantidadCis").text(0);
                        $("#txtCiCalculo").tagsinput('removeAll');
                        var rows = $("#divGridRelaborales").jqxGrid('selectedrowindexes');
                        for (var m = 0; m < rows.length; m++) {
                            var dataRecord = $("#divGridRelaborales").jqxGrid('getrowdata', rows[m]);
                            $("#txtCiCalculo").tagsinput('add', dataRecord.ci);
                        }
                        var objParametro = {ci:ci,idOrganigrama : 0,idArea:0,idUbicacion:0,idMaquina:0,idRelaboral:0,fechaIni:'',fechaFin:''}
                        definirGrillaMarcacionesYCalculos(objParametro);
                        $("#txtFechaIniCalculo").focus();
                    });
                    /* Ver registro.*/
                    $("#turnrowbutton").off();
                    $("#turnrowbutton").on('click', function () {

                        var selectedrowindex = $("#divGridRelaborales").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridRelaborales').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                var idRelaboral = dataRecord.id_relaboral;
                                $('#divTabControlMarcaciones').jqxTabs('enableAt', 0);
                                $('#divTabControlMarcaciones').jqxTabs('disableAt', 1);
                                $('#divTabControlMarcaciones').jqxTabs('disableAt', 2);
                                $('#divTabControlMarcaciones').jqxTabs('enableAt', 3);

                                $('#divTabControlMarcaciones').jqxTabs({selectedItem: 3});

                                $("#spanPrefijoCalendarioLaboral").html("");
                                $("#spanSufijoCalendarioLaboral").html(" Vrs. Calendario de Excepciones (Individual)");
                                var date = new Date();
                                var defaultDia = date.getDate();
                                var defaultMes = date.getMonth();
                                var defaultGestion = date.getFullYear();
                                if(dataRecord.estado==0){
                                    defaultDia = (dataRecord.fecha_baja).getDate();
                                    defaultMes = (dataRecord.fecha_baja).getMonth();
                                    defaultGestion = (dataRecord.fecha_baja).getFullYear();
                                }
                                var contadorPerfiles = 0;
                                var idPerfilLaboral=0;
                                var tipoHorario=3;
                                $("#calendar").html("");
                                /**
                                 * Los horarios son cargados al momento de desplegarse el calendario.
                                 * @type {Array}
                                 */
                                var arrHorariosRegistrados = [];
                                var arrFechasPorSemana = iniciarCalendarioLaboralPorRelaboralTurnosYExcepcionesParaVerAsignaciones(dataRecord,dataRecord.id_relaboral,5,idPerfilLaboral,tipoHorario,arrHorariosRegistrados,defaultGestion,defaultMes,defaultDia);
                                sumarTotalHorasPorSemana(arrFechasPorSemana);
                                } else {
                                    var msje = "Para acceder a la vista del registro, la persona debe haber tenido al menos un registro de relaci&oacute,n laboral que implica un estado ACTIVO o PASIVO.";
                                    $("#divMsjePorError").html("");
                                    $("#divMsjePorError").append(msje);
                                    $("#divMsjeNotificacionError").jqxNotification("open");
                                }
                                $('#tabFichaPersonalTurnAndExcept').jqxTabs({
                                    theme: 'oasis',
                                    width: '100%',
                                    height: '100%',
                                    position: 'top'
                                });
                                $('#tabFichaPersonalTurnAndExcept').jqxTabs({selectedItem: 0});
                                $(".ddNombresTurnAndExcept").html(dataRecord.nombres+"&nbsp;");
                                $(".ddCIAndNumComplementoExpdTurnAndExcept").html(dataRecord.ci+dataRecord.num_complemento+" "+dataRecord.expd+"&nbsp;");
                                $("#ddCargoTurnAndExcept").html(dataRecord.cargo+"&nbsp;");
                                $("#ddProcesoTurnAndExcept").html(dataRecord.proceso_codigo+"&nbsp;");
                                $("#ddFinanciamientoTurnAndExcept").html(dataRecord.condicion+" (Partida "+dataRecord.partida+")");
                                $("#ddGerenciaTurnAndExcept").html(dataRecord.gerencia_administrativa+"&nbsp;");
                                if(dataRecord.departamento_administrativo!=""&&dataRecord.departamento_administrativo!=null){
                                    $("#ddDepartamentoTurnAndExcept").show();
                                    $("#dtDepartamentoTurnAndExcept").show();
                                    $("#ddDepartamentoTurnAndExcept").html(dataRecord.departamento_administrativo+"&nbsp;");
                                }
                                else {
                                    $("#dtDepartamentoTurnAndExcept").hide();
                                    $("#ddDepartamentoTurnAndExcept").hide();
                                }
                                $("#ddUbicacionTurnAndExcept").html(dataRecord.ubicacion+"&nbsp;");

                                switch (dataRecord.tiene_item) {
                                    case 1:
                                        $("#dtItemTurnAndExcept").show();
                                        $("#ddItemTurnAndExcept").show();
                                        $("#ddItemTurnAndExcept").html(dataRecord.item+"&nbsp;");
                                        break;
                                    case 0:
                                        $("#dtItemTurnAndExcept").hide();
                                        $("#ddItemTurnAndExcept").hide();
                                        break;
                                }
                                $("#ddNivelSalarialTurnAndExcept").html(dataRecord.nivelsalarial+"&nbsp;");
                                $("#ddHaberTurnAndExcept").html(dataRecord.sueldo+"&nbsp;");
                                $("#ddFechaIngTurnAndExcept").html(fechaConvertirAFormato(dataRecord.fecha_ing,"-")+"&nbsp;");
                                if(dataRecord.fecha_incor!=null){
                                    var fechaIncor = fechaConvertirAFormato(dataRecord.fecha_incor,"-");
                                    $("#dtFechaIncorTurnAndExcept").show();
                                    $("#ddFechaIncorTurnAndExcept").show();
                                    $("#ddFechaIncorTurnAndExcept").html(fechaIncor+"&nbsp;");
                                }else{
                                    $("#dtFechaIncorTurnAndExcept").hide();
                                    $("#ddFechaIncorTurnAndExcept").hide();
                                }
                                $("#ddFechaIniTurnAndExcept").html(fechaConvertirAFormato(dataRecord.fecha_ini,"-")+"&nbsp;");
                                switch (dataRecord.tiene_item) {
                                    case 1:
                                        $("#dtFechaFinTurnAndExcept").hide();
                                        $("#ddFechaFinTurnAndExcept").hide();
                                        break;
                                    case 0:
                                        $("#dtFechaFinTurnAndExcept").show();
                                        $("#ddFechaFinTurnAndExcept").show();
                                        $("#ddFechaFinTurnAndExcept").html(fechaConvertirAFormato(dataRecord.fecha_fin,"-")+"&nbsp;");
                                        break;
                                }
                               $("#ddEstadoDescripcionTurnAndExcept").html(dataRecord.estado_descripcion+"&nbsp;");
                               if(dataRecord.estado==0){
                                   $("#dtFechaBajaTurnAndExcept").show();
                                   $("#ddFechaBajaTurnAndExcept").show();
                                   $("#ddFechaBajaTurnAndExcept").html(fechaConvertirAFormato(dataRecord.fecha_baja,"-")+"&nbsp;");
                                   $("#dtMotivoBajaTurnAndExcept").show();
                                   $("#ddMotivoBajaTurnAndExcept").show();
                                   $("#ddMotivoBajaTurnAndExcept").html(dataRecord.motivo_baja+"&nbsp;");
                               }else{
                                   $("#dtFechaBajaTurnAndExcept").hide();
                                   $("#ddFechaBajaTurnAndExcept").hide();
                                   $("#dtMotivoBajaTurnAndExcept").hide();
                                   $("#ddMotivoBajaTurnAndExcept").hide();
                               }

                                $("#ddNombresTurnAndExcept").html(dataRecord.nombres);
                                var rutaImagen = obtenerRutaFoto(dataRecord.ci, dataRecord.num_complemento);
                                $("#imgFotoPerfilTurnAndExceptRelaboral").attr("src", rutaImagen);
                                $("#imgFotoPerfilContactoPerTurnAndExcept").attr("src", rutaImagen);
                                $("#imgFotoPerfilContactoInstTurnAndExcept").attr("src", rutaImagen);
                                $("#imgFotoPerfilTurnAndExcept").attr("src", rutaImagen);
                                cargarPersonasContactosHorariosYMarcaciones(2,dataRecord.id_persona);

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
                            var dataRecord = $("#divGridRelaborales").jqxGrid('getrowdata', ctrlrow);
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
                            var dataRecord = $("#divGridRelaborales").jqxGrid('getrowdata', ctrlrow);
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
                            var dataRecord = $("#divGridRelaborales").jqxGrid('getrowdata', ctrlrow);
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
                            var dataRecord = $("#divGridRelaborales").jqxGrid('getrowdata', ctrlrow);
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
                            var dataRecord = $("#divGridRelaborales").jqxGrid('getrowdata', ctrlrow);
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
                            var dataRecord = $("#divGridRelaborales").jqxGrid('getrowdata', ctrlrow);
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
                        text: 'Fecha Ingreso',
                        datafield: 'fecha_ing',
                        filtertype: 'range',
                        width: 100,
                        cellsalign: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Fecha Inicio',
                        datafield: 'fecha_ini',
                        filtertype: 'range',
                        width: 100,
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
            {label: 'Fecha Ingreso', value: 'fecha_ing', checked: true},
            {label: 'Fecha Inicio', value: 'fecha_ini', checked: true},
            {label: 'Fecha Incor.', value: 'fecha_incor', checked: true},
            {label: 'Fecha Fin', value: 'fecha_fin', checked: true},
            {label: 'Fecha Baja', value: 'fecha_baja', checked: true},
            {label: 'Motivo Baja', value: 'motivo_baja', checked: true},
            {label: 'Observacion', value: 'observacion', checked: true},
        ];
        $("#jqxlistbox").jqxListBox({source: listSource, width: "100%", height: 430, checkboxes: true});
        $("#jqxlistbox").on('checkChange', function (event) {
            $("#divGridRelaborales").jqxGrid('beginupdate');
            if (event.args.checked) {
                $("#divGridRelaborales").jqxGrid('showcolumn', event.args.value);
            }
            else {
                $("#divGridRelaborales").jqxGrid('hidecolumn', event.args.value);
            }
            $("#divGridRelaborales").jqxGrid('endupdate');
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
        $('#divTabControlMarcaciones').jqxTabs('enableAt', 0);
        $('#divTabControlMarcaciones').jqxTabs('disableAt', 1);
        $('#divTabControlMarcaciones').jqxTabs('disableAt', 2);
        $('#divTabControlMarcaciones').jqxTabs('disableAt', 3);
        /**
         * Saltamos a la pantalla principal en caso de presionarse ESC
         */
        $('#divTabControlMarcaciones').jqxTabs({selectedItem: 0});
        $("#divGridRelaborales").jqxGrid("updatebounddata");
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
 * Función para la obtención del listado de horarios laborales registrados en el calendario laboral para un determinado registro de relación laboral.
 * @param idRelaboral
 * @param tipoHorario
 * @param editable
 * @param fechaIni
 * @param fechaFin
 * @param contadorPerfiles
 * @returns {Array}
 */
function obtenerTodosHorariosRegistradosEnCalendarioRelaboralParaVerAsignaciones(idRelaboral,idPerfilLaboral,tipoHorario,editable,fechaIni,fechaFin,contadorPerfiles){

    var arrHorariosRegistrados = [];
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var ctrlAllDay=true;
    switch (tipoHorario){
        case 1:
        case 2:ctrlAllDay=true;break;
    }
    $.ajax({
        url: '/calendariolaboral/listallregisteredbyrelaboralmixto',
        type: 'POST',
        datatype: 'json',
        async: false,
        cache: false,
        data: {id:idRelaboral,id_perfillaboral:idPerfilLaboral,fecha_ini:fechaIni,fecha_fin:fechaFin},
        success: function (data) {
            var res = jQuery.parseJSON(data);
            if (res.length > 0) {
                $.each(res, function (key, val) {
                    var idHorarioLaboral = 0;
                    var horaEnt = '00:00:00';
                    var horaSal = '24:00:00';
                    var color = '#000000';
                    var horario_nombre = 'DESCANSO';
                    var perfil_laboral = val.perfil_laboral;
                    var grupo = val.perfil_laboral_grupo;
                    if(grupo!='') perfil_laboral += " - "+grupo;
                    if(val.id_horariolaboral!=null){
                        idHorarioLaboral = val.id_horariolaboral;
                        /*if(val.grupo!="")
                         horario_nombre = val.horario_nombre +" ("+perfil_laboral+")";*/
                        horario_nombre = val.horario_nombre
                        horaEnt = val.hora_entrada.split(":");
                        horaSal = val.hora_salida.split(":");
                        color = val.color;
                    }else {
                        horaEnt = horaEnt.split(":");
                        horaSal = horaSal.split(":");
                    }
                    //color  = colors[contadorPerfiles];
                    var fechaIni =  val.calendario_fecha_ini.split("-");
                    var yi = fechaIni[0];
                    var mi = fechaIni[1]-1;
                    var di = fechaIni[2];

                    var he = horaEnt[0];
                    var me = horaEnt[1];
                    var se = horaEnt[2];

                    var fechaFin =  val.calendario_fecha_fin.split("-");
                    var yf = fechaFin[0];
                    var mf = fechaFin[1]-1;
                    var df = fechaFin[2];

                    var hs = horaSal[0];
                    var ms = horaSal[1];
                    var ss = horaSal[2];
                    var prefijo = "r_";
                    if(idHorarioLaboral==0){ prefijo="d_";}
                    var borde = color;
                    if(!editable){
                        borde = "#000000";
                        prefijo="b_";//Se modifica para que d: represente a los horarios bloqueados
                    }
                    arrHorariosRegistrados.push( {
                        id:val.id_calendariolaboral,
                        className:prefijo+idHorarioLaboral,
                        title: horario_nombre,
                        start: new Date(yi, mi, di, he, me),
                        end: new Date(yf, mf, df, hs, ms),
                        allDay: ctrlAllDay,
                        color: color,
                        editable:editable,
                        borderColor:borde,
                        horas_laborales:val.horas_laborales,
                        dias_laborales:val.dias_laborales,
                        hora_entrada:val.hora_entrada,
                        hora_salida:val.hora_salida
                    });
                });
            }
        }
    });
    return arrHorariosRegistrados;
}
/**
 * Función para verificar la existencia de una imagen
 * @param url
 * @returns {boolean}
 * @constructor
 */
function ImageExist(url)
{
    var img = new Image();
    img.src = url;
    return img.height != 0;
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
/**
 * Función para iniciar el calendario laboral de acuerdo al registro de relación laboral, turnos, excepciones y rango de fechas seleccionado.
 * Se despliega la totalidad de horarios para el registro de relación laboral por lo que se muestran los botones de navegación del calendario.
 * @param idRelaboral
 * @param accion
 * @param tipoHorario
 * @param arrHorariosRegistrados
 * @param defaultGestion
 * @param defaultMes
 * @param defaultDia
 * @returns {Array}
 */
function iniciarCalendarioLaboralPorRelaboralTurnosYExcepcionesParaVerAsignaciones(dataRecord,idRelaboral,accion,idPerfilLaboral,tipoHorario,arrHorariosRegistrados,defaultGestion,defaultMes,defaultDia) {
    tipoHorario = parseInt(tipoHorario);
    var arrFechasPorSemana = [];
    var contadorPorSemana = 0;
    var diasSemana=7;
    var calendarEvents  = $('.calendar-events');
    /* Inicializa la funcionalidad de eventos: arrastrar y soltar */
    //initEvents();

    /* Initialize FullCalendar */
    var optLeft = 'prev,next';
    /*var optRight = 'year,month,agendaWeek,agendaDay';*/
    var optRight = 'year';
    var optEditable = true;
    var optDroppable = true;
    var optSelectable = true;
    var optVerFinesDeSemana= true;
    var optVerTotalizadorHorasPorSemana=true;
    //weekends
    switch (accion){
        case 1:/*Nuevo*/
            switch (tipoHorario){
                case 1:
                case 2:break;
                case 3:optLeft='';optRight='year';break;
            }
            break;
        case 2:/*Edición*/
            switch (tipoHorario){
                case 1:
                case 2:break;
                case 3:optLeft='';optRight='year';break;
            }
            break;
        case 3:/*Aprobación*/
            switch (tipoHorario){
                case 1:
                case 2:break;
                case 3:optLeft='';optRight='year';break;
            }
            break;
        case 4:/*Eliminación*/break;
        case 5:/*Vista*/
            optEditable=false;
            optDroppable=false;
            optSelectable=false;
            switch (tipoHorario){
                case 1:
                case 2:break;
                case 3:break;
            }
            break;
    }
    switch (tipoHorario){
        case 1:
        case 2:optVerFinesDeSemana=false;diasSemana=5;optVerTotalizadorHorasPorSemana=false;break;
        case 3:break;
    }
    $('#calendar').fullCalendar({
        header: {
            left: optLeft,
            center: 'title',
            right: optRight
        },
        year:defaultGestion,
        month:defaultMes,
        date:defaultDia,
        firstDay: 1,
        weekends:optVerFinesDeSemana,
        editable: optEditable,
        droppable: optDroppable,
        selectable: optSelectable,
        weekNumbers:true,
        weekNumberTitle:"#S",
        timeFormat: 'H(:mm)', // Mayusculas H de 24-horas
        drop: function(date, allDay) {

            /**
             * Controlando cuando se introduce un nuevo evento u horario en el calendario
             * @type {*|jQuery}
             */

            // Recuperar almacenado de objeto del evento del elemento caído
            var originalEventObject = $(this).data('eventObject');

            // Tenemos que copiarlo, de modo que múltiples eventos no tienen una referencia al mismo objeto
            var copiedEventObject = $.extend({}, originalEventObject);

            // Asignarle la fecha que fue reportado
            copiedEventObject.start = date;


            // Hacer que el evento en el calendario
            // El último argumento `true` determina si el evento "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

            /**
             * Si se introduce un nuevo horario en el calendario se recalcula los totales por semana.
             */
            sumarTotalHorasPorSemana(arrFechasPorSemana);

        }
        ,
        eventDrop: function (event, dayDelta, minuteDelta, allDay, revertFunc) {
            /**
             * Si un horario se ha movido, es necesario calcular los totales de horas por semana
             */
            sumarTotalHorasPorSemana(arrFechasPorSemana);
        },
        events: arrHorariosRegistrados,
        /**
         * Controlando el evento de clik sobre el horario.
         * @param calEvent
         * @param jsEvent
         * @param view
         */
        eventClick: function(calEvent, jsEvent, view) {

            var clase = calEvent.className+"";
            var arrClass = clase.split("_");
            var idTipoHorario = arrClass[1];
            clase = arrClass[0];
            var idTurno = 0;
            if(calEvent.id!=undefined){
                idTurno = calEvent.id;
            }
            var fechaIni = fechaConvertirAFormato(calEvent.start,'-');
            var fechaFin =  fechaIni;
            var calEventEnd = calEvent.start;
            if(calEvent.end!=null&&calEvent.end!=""){
                fechaFin = fechaConvertirAFormato(calEvent.end,'-');
                calEventEnd = calEvent.end;
            }
            var startDate = calEvent.start;
            var FromEndDate = calEventEnd;
            var ToEndDate = calEventEnd;
            //ToEndDate.setDate(ToEndDate.getDate()+900);

            $("#txtHorarioFechaIni").datepicker('setDate', calEvent.start);
            //$('#txtHorarioFechaIni').datepicker('setStartDate', calEvent.start);
            $("#txtHorarioFechaFin").datepicker('setDate', calEventEnd);
            //$('#txtHorarioFechaFin').datepicker('setEndDate', calEventEnd);
            $('#txtHorarioFechaIni').datepicker({
                format:'dd-mm-yyyy',
                default:calEvent.start,
                weekStart: 1,
                startDate: startDate,
                endDate: FromEndDate,
                autoclose: true
            })
                .on('changeDate', function(selected){
                    startDate = new Date(selected.date.valueOf());
                    startDate.setDate(startDate.getDate(new Date(selected.date.valueOf())));
                    $('#txtHorarioFechaFin').datepicker('setStartDate', startDate);
                });
            $('#txtHorarioFechaFin').datepicker({
                default:calEventEnd,
                weekStart: 1,
                startDate: startDate,
                endDate: ToEndDate,
                autoclose: true
            })
                .on('changeDate', function(selected){
                    FromEndDate = new Date(selected.date.valueOf());
                    FromEndDate.setDate(FromEndDate.getDate(new Date(selected.date.valueOf())));
                    $('#txtHorarioFechaIni').datepicker('setEndDate', FromEndDate);
                });
            if(idTipoHorario>0){
                var ok = cargarModalHorario(idTipoHorario);
                if(ok) {
                    /**
                     * Si la clase del horario esta bloqueada no se la puede eliminar
                     */
                    if(clase=="b"){
                        $("#btnDescartarHorario").hide();
                        $("#btnGuardarModificacionHorario").hide();
                        $("#txtHorarioFechaIni").prop("disabled","disabled");
                        $("#txtHorarioFechaFin").prop("disabled","disabled");
                    } else {
                        $("#btnDescartarHorario").show();
                        $("#txtHorarioFechaIni").prop("disabled",false);
                        $("#txtHorarioFechaFin").prop("disabled",false);
                    }
                    $('#popupDescripcionHorario').modal('show');
                    $("#btnDescartarHorario").off();
                    $("#btnDescartarHorario").on("click", function () {
                        switch (clase){
                            case "r":
                            case "d":
                                var okBaja = bajaTurnoEnCalendario(idTurno);
                                if(okBaja){
                                    $('#calendar').fullCalendar('removeEvents', calEvent._id);
                                    $('#popupDescripcionHorario').modal('hide');
                                }
                                break;
                            case "n":
                                $('#calendar').fullCalendar('removeEvents', calEvent._id);
                                $('#popupDescripcionHorario').modal('hide');
                                break;
                        }
                        /**
                         * Si se ha eliminado un horario, es necesario recalcular las horas por semana
                         */
                        sumarTotalHorasPorSemana(arrFechasPorSemana);
                    });
                    /**
                     * Acción efectuada cuando se hace click sobre el botón para Guardar Modifificación de Fechas.
                     */
                    $("#btnGuardarModificacionHorario").off();
                    $("#btnGuardarModificacionHorario").on("click", function () {
                        switch (clase){
                            case "r":
                            case "n":
                                if(fechaIni!=$("#txtHorarioFechaIni").val()||fechaFin!=$("#txtHorarioFechaFin").val()){
                                    /*Inicialmente borramos el evento y lo reingresamos*/
                                    $('#calendar').fullCalendar('removeEvents', calEvent._id);
                                    $('#popupDescripcionHorario').modal('hide');
                                    var fechaInicio = $("#txtHorarioFechaIni").val();
                                    var fechaFinalizacion = $("#txtHorarioFechaFin").val();
                                    var arrFechaInicio =fechaInicio.split("-");
                                    var arrFechaFinalizacion= fechaFinalizacion.split("-");
                                    fechaInicio = arrFechaInicio[2]+"-"+arrFechaInicio[1]+"-"+arrFechaInicio[0];
                                    fechaFinalizacion = arrFechaFinalizacion[2]+"-"+arrFechaFinalizacion[1]+"-"+arrFechaFinalizacion[0];
                                    addEvent = {
                                        id:calEvent.id,
                                        title:calEvent.title,
                                        className:calEvent.className,
                                        start:fechaInicio,
                                        end:fechaFinalizacion,
                                        color:calEvent.color,
                                        editable: true,
                                        hora_entrada:calEvent.hora_entrada,
                                        hora_salida:calEvent.hora_salida

                                    }
                                    $('#calendar').fullCalendar( 'renderEvent', addEvent, true );
                                }
                                $('#popupDescripcionHorario').modal('hide');
                                break;
                            case "d":break;
                        }
                        /**
                         * Si se ha eliminado un horario, es necesario recalcular las horas por semana
                         */
                        sumarTotalHorasPorSemana(arrFechasPorSemana);
                    });
                }else alert("Error al determinar los datos del horario.");
            }else {
                alert("El registro corresponde a un periodo de descanso");
            }
        }
        ,
        eventResize: function(event, delta, revertFunc) {
            /**
             * Cuando un horario es modificado en cuanto a su duración, se debe calcular nuevamente los totales de horas por semana
             */
            sumarTotalHorasPorSemana(arrFechasPorSemana);

        }
        ,
        /*dayRender: function (date, cell) {},*/
        viewRender: function(view) {

            switch (view.name){
                case "month":
                    {   removerColumnaSumaTotales();
                        agregarColumnaSumaTotales(diasSemana);
                        var primeraFechaCalendario = "";
                        var segundaFechaCalendario = "";
                        arrFechasPorSemana= [];
                        var gestionInicial = 0;
                        var contP=0;
                        var arrDias = ["mon","tue","wed","thu","fri","sat","sun"];
                        $.each(arrDias,function(k,dia){
                            contP=0;
                            $("td.fc-"+dia).map(function (index, elem) {
                                contP++;
                                var fecha = $(this).data("date");
                                var fechaAux = $(this).data("date");
                                if(fecha!=undefined){
                                    var arrFecha = fecha.split("-");
                                    fecha = arrFecha[2]+"-"+arrFecha[1]+"-"+arrFecha[0];
                                    gestionInicial = arrFecha[0];
                                    switch (contP){
                                        case 1:{
                                            if(primeraFechaCalendario=="")primeraFechaCalendario = fecha;
                                            arrFechasPorSemana.push( {semana:1,fecha:fecha});}
                                            break;
                                        case 2:arrFechasPorSemana.push( {semana:2,fecha:fecha});break;
                                        case 3:arrFechasPorSemana.push( {semana:3,fecha:fecha});break;
                                        case 4:arrFechasPorSemana.push( {semana:4,fecha:fecha});break;
                                        case 5:arrFechasPorSemana.push( {semana:5,fecha:fecha});break;
                                        case 6:{
                                            segundaFechaCalendario = fecha;
                                            arrFechasPorSemana.push( {semana:6,fecha:fecha});
                                        }break;
                                    }
                                    var check = fechaAux;
                                    var today = $.fullCalendar.formatDate(new Date(),'yyyy-MM-dd');
                                    if (check < today) {
                                        $(this).css("background-color", "silver");
                                    }
                                }
                            });
                        });
                        var fechaInicialCalendario = "";
                        var fechaFinalCalendario = "";
                        var moment = $('#calendar').fullCalendar('getDate');
                        fechaInicialCalendario = fechaConvertirAFormato(moment,'-');
                        var arrFechaInicial = fechaInicialCalendario.split("-");
                        fechaInicialCalendario = "01-"+arrFechaInicial[1]+"-"+arrFechaInicial[2];
                        fechaFinalCalendario =  obtenerUltimoDiaMes(fechaInicialCalendario);
                        $("#hdnFechaInicialCalendario").val(fechaInicialCalendario);
                        $("#hdnFechaFinalCalendario").val(fechaFinalCalendario);
                        cargarGrillaAsignacionIndividualFechasUbicacionEstacion(idPerfilLaboral,idRelaboral,primeraFechaCalendario,segundaFechaCalendario);
                        cargarExcepcionesEnCalendario(dataRecord,view.name,diasSemana,primeraFechaCalendario,segundaFechaCalendario);
                        /**
                         * Asignación de horarios por mes, inicialmente se borra todos los eventos registrados
                         * a objeto de no repetir su renderización
                         */
                        $("#calendar").fullCalendar( 'removeEvents');
                        var arrHorariosRegistradosEnMes = obtenerTodosHorariosRegistradosEnCalendarioRelaboralParaVerAsignaciones(idRelaboral,0,tipoHorario,false,primeraFechaCalendario,segundaFechaCalendario,0);
                            $("#calendar").fullCalendar('addEventSource', arrHorariosRegistradosEnMes);

                        var arrFeriados = obtenerFeriadosRangoFechas(0,0,gestionInicial,primeraFechaCalendario,segundaFechaCalendario);
                        $.each(arrDias,function(k,dia){
                            contP=0;
                            $("td.fc-"+dia).map(function (index, elem) {
                                contP++;
                                var fechaCalAux = $(this).data("date");
                                var fechaCal = $(this).data("date");
                                var fechaIni = "";
                                var fechaFin = "";
                                var celda = $(this);
                                $.each(arrFeriados,function(key,val){

                                    fechaIni  = val.fecha_ini;
                                    fechaFin  = val.fecha_fin;

                                    /*var arrFechaCal = fechaCal.split("-");

                                    fechaCal = arrFechaCal[2]+"-"+arrFechaCal[1]+"-"+arrFechaCal[0];

                                    var arrFechaIni = fechaIni.split("-");
                                    fechaIni = arrFechaIni[2]+"-"+arrFechaIni[1]+"-"+arrFechaIni[0];

                                    var arrFechaFin = fechaFin.split("-");
                                    fechaFin = arrFechaFin[2]+"-"+arrFechaFin[1]+"-"+arrFechaFin[0];
                                    */
                                    var sep="-";
                                    if (procesaTextoAFecha(fechaCal,"-")<=procesaTextoAFecha(fechaFin,"-") && procesaTextoAFecha(fechaCal,"-") >= procesaTextoAFecha(fechaIni,"-")) {
                                        celda.css("background-color", "orange");
                                        var elem = $(".fc-day-content");
                                        celda.append("</br>");
                                        celda.append("(f) "+val.feriado);
                                        celda.append("</br>");
                                        celda.append(val.descripcion);
                                    }
                                });
                            });
                        });
                        sumarTotalHorasPorSemana(arrFechasPorSemana);
                        }
                    break;
                case "agendaWeek":
                    fechaInicialCalendario = $('#calendar').fullCalendar('getView').start;
                    fechaInicialCalendario = fechaConvertirAFormato(fechaInicialCalendario,"-");
                    fechaFinalCalendario = obtenerFechaMasDias(fechaInicialCalendario,diasSemana-1);
                    $("#hdnFechaInicialCalendario").val(fechaInicialCalendario);
                    $("#hdnFechaFinalCalendario").val(fechaFinalCalendario);
                    cargarGrillaAsignacionIndividualFechasUbicacionEstacion(idPerfilLaboral,idRelaboral,fechaInicialCalendario,fechaFinalCalendario);
                    break;
                case "agendaDay":
                    var moment = $('#calendar').fullCalendar('getDate');
                    var fechaInicialCalendario = fechaConvertirAFormato(moment,'-');
                    fechaFinalCalendario = fechaInicialCalendario;
                    $("#hdnFechaInicialCalendario").val(fechaInicialCalendario);
                    $("#hdnFechaFinalCalendario").val(fechaFinalCalendario);
                    cargarGrillaAsignacionIndividualFechasUbicacionEstacion(idPerfilLaboral,idRelaboral,fechaInicialCalendario,fechaFinalCalendario);
                    break;
            }
        }
    });
    return arrFechasPorSemana;
}
/**
 * Función para calcular el total de horas por semana.
 */
function sumarTotalHorasPorSemana(arrFechasPorSemana){
    var arr = $("#calendar").fullCalendar('clientEvents');
    var horasSemana1=0;
    var horasSemana2=0;
    var horasSemana3=0;
    var horasSemana4=0;
    var horasSemana5=0;
    var horasSemana6=0;
    $("#spSumaSemana1").html(0);
    $("#spSumaSemana2").html(0);
    $("#spSumaSemana3").html(0);
    $("#spSumaSemana4").html(0);
    $("#spSumaSemana5").html(0);
    $("#spSumaSemana6").html(0);
    $("#tdSumaSemana1").css("background-color", "white");
    $("#tdSumaSemana2").css("background-color", "white");
    $("#tdSumaSemana3").css("background-color", "white");
    $("#tdSumaSemana4").css("background-color", "white");
    $("#tdSumaSemana5").css("background-color", "white");
    $("#tdSumaSemana6").css("background-color", "white");
    $.each(arr,function(key,turno){
        var fechaIni = $.fullCalendar.formatDate(turno.start,'dd-MM-yyyy');
        var fechaFin = $.fullCalendar.formatDate(turno.end,'dd-MM-yyyy');
        if(fechaFin=="")fechaFin=fechaIni;
        var sep='-';
        $.each(arrFechasPorSemana,function(clave,valor){

            //alert(fechaIni+"<= "+valor.semana+"::"+valor.fecha+"<="+fechaFin);
            /**
             * Esto porque en algunos casos el horario no tiene fecha de finalización debido a que
             * su existencia es producto de haber jalado de la lista de horarios disponibles sobre el calendario
             */
            if(valor.semana==1){
                if(procesaTextoAFecha(fechaIni,sep)<=procesaTextoAFecha(valor.fecha,sep)
                    &&procesaTextoAFecha(valor.fecha,sep)<=procesaTextoAFecha(fechaFin,sep)){
                    horasSemana1 += parseFloat(turno.horas_laborales);
                    /*alert(turno.title+" entro en la semana 1 =>"+fechaIni+"<="+valor.fecha+"<="+fechaFin+" horas: "+turno.horas_laborales);*/

                }
            }
            if(valor.semana==2){
                if(procesaTextoAFecha(fechaIni,sep)<=procesaTextoAFecha(valor.fecha,sep)
                    &&procesaTextoAFecha(valor.fecha,sep)<=procesaTextoAFecha(fechaFin,sep)){
                    horasSemana2 += parseFloat(turno.horas_laborales);
                    /*alert(turno.title+" entro en la semana 2 =>"+fechaIni+"<="+valor.fecha+"<="+fechaFin+" horas: "+turno.horas_laborales);*/
                }
            }
            if(valor.semana==3){
                //alert(procesaTextoAFecha(fechaIni,sep)+"<="+procesaTextoAFecha(valor.fecha,sep)+"\n && "+procesaTextoAFecha(valor.fecha,sep)+"<="+procesaTextoAFecha(fechaFin,sep));
                if(procesaTextoAFecha(fechaIni,sep)<=procesaTextoAFecha(valor.fecha,sep)
                    &&procesaTextoAFecha(valor.fecha,sep)<=procesaTextoAFecha(fechaFin,sep)){
                    horasSemana3 += parseFloat(turno.horas_laborales);
                    /*alert(turno.title+" entro en la semana 3 =>"+fechaIni+"<="+valor.fecha+"<="+fechaFin+" horas: "+turno.horas_laborales);*/
                }
            }
            if(valor.semana==4){
                if(procesaTextoAFecha(fechaIni,sep)<=procesaTextoAFecha(valor.fecha,sep)
                    &&procesaTextoAFecha(valor.fecha,sep)<=procesaTextoAFecha(fechaFin,sep)){
                    horasSemana4 += parseFloat(turno.horas_laborales);
                    /*alert(turno.title+" entro en la semana 4 =>"+fechaIni+"<="+valor.fecha+"<="+fechaFin+" horas: "+turno.horas_laborales);*/
                }
            }
            if(valor.semana==5){
                if(procesaTextoAFecha(fechaIni,sep)<=procesaTextoAFecha(valor.fecha,sep)
                    &&procesaTextoAFecha(valor.fecha,sep)<=procesaTextoAFecha(fechaFin,sep)){
                    horasSemana5 += parseFloat(turno.horas_laborales);
                    /*alert(turno.title+" entro en la semana 5 =>"+fechaIni+"<="+valor.fecha+"<="+fechaFin+" horas: "+turno.horas_laborales);*/
                }
            }
            if(valor.semana==6){
                if(procesaTextoAFecha(fechaIni,sep)<=procesaTextoAFecha(valor.fecha,sep)
                    &&procesaTextoAFecha(valor.fecha,sep)<=procesaTextoAFecha(fechaFin,sep)){
                    horasSemana6 += parseFloat(turno.horas_laborales);
                    /*alert(turno.title+" entro en la semana 6 =>"+fechaIni+"<="+valor.fecha+"<="+fechaFin+" horas: "+turno.horas_laborales);*/
                }
            }
        });
    });

    $("#spSumaSemana1").html(horasSemana1.toFixed(2));
    $("#spSumaSemana2").html(horasSemana2.toFixed(2));
    $("#spSumaSemana3").html(horasSemana3.toFixed(2));
    $("#spSumaSemana4").html(horasSemana4.toFixed(2));
    $("#spSumaSemana5").html(horasSemana5.toFixed(2));
    $("#spSumaSemana6").html(horasSemana6.toFixed(2));
    var promedioSumaTresSemanas = (horasSemana2+horasSemana3+horasSemana4)/3;
    $("#spSumaPromedioTresSemanas").html(promedioSumaTresSemanas.toFixed(2));
    //var tipoJornadaLaboral = $("#lstJornadasLaborales").val();
    var horasSemanalesPermitidas = 48;
    var horasDiaPermitidas = 8;
    var horasNochePermitidas = 7;
    var idJornadaLaboral = 1;
    if(idJornadaLaboral!=0){
        /*var arrJornadaLaboral = tipoJornadaLaboral.split("::");
         idJornadaLaboral = arrJornadaLaboral[0];
         horasSemanalesPermitidas = arrJornadaLaboral[1];
         horasDiaPermitidas = arrJornadaLaboral[2];
         horasNochePermitidas = arrJornadaLaboral[3];*/
        /**
         * Control de exceso de horas en la semana
         */
        if(horasSemana1>horasSemanalesPermitidas){
            $("#tdSumaSemana1").css("background-color", "#FF4000");
        }else $("#tdSumaSemana1").css("background-color", "white");
        if(horasSemana2>horasSemanalesPermitidas){
            $("#tdSumaSemana2").css("background-color", "#FF4000");
        }else $("#tdSumaSemana2").css("background-color", "silver");
        if(horasSemana3>horasSemanalesPermitidas){
            $("#tdSumaSemana3").css("background-color", "#FF4000");
        }else $("#tdSumaSemana3").css("background-color", "silver");
        if(horasSemana4>horasSemanalesPermitidas){
            $("#tdSumaSemana4").css("background-color", "#FF4000");
        }else $("#tdSumaSemana4").css("background-color", "silver");
        if(horasSemana5>horasSemanalesPermitidas){
            $("#tdSumaSemana5").css("background-color", "#FF4000");
        }else $("#tdSumaSemana5").css("background-color", "white");
        if(horasSemana6>horasSemanalesPermitidas){
            $("#tdSumaSemana6").css("background-color", "#FF4000");
        }else $("#tdSumaSemana6").css("background-color", "white");
        /**
         * Control del promedio de horas en tres semanas del mes
         */
        if(promedioSumaTresSemanas>horasSemanalesPermitidas){
            $("#tdSumaPromedioTresSemanas").css("background-color", "red");
        }else $("#tdSumaPromedioTresSemanas").css("background-color", "white");

    }
}

/**
 *  Función para agregar la columna de totales al calendario.
 * @param diasSemana
 */
function agregarColumnaSumaTotales(diasSemana){
    $(".fc-border-separate tr:first").append("<th style='width: 87px;' id='thColumnaTotales' class='thColumnaTotales'> Hrs Semana </th>");
    var sufijo = 0;
    $(".fc-border-separate tr.fc-week").each(function(key,val){
        sufijo++;
        $(this).append("<td id='tdSumaSemana"+sufijo+"' class='tdSumaSemana fc-last'><div style='min-height: 67px;align-content: center;'><div id='divSumaSemana"+sufijo+"' class='fc-day-suma-horas-semana'><span id='spSumaSemana"+sufijo+"' class='spSumaSemana'>100</span></div></div></td>");
    });
    var diasSemanaMasContadorSemanas = diasSemana+1;
    $(".fc-border-separate tr:last").after("<tr id=''><td style='text-align: right;' colspan='"+diasSemanaMasContadorSemanas+"' class=''><b>Promedio semanal de horas (3 Semanas marcadas):</b></td><td id='tdSumaPromedioTresSemanas' class='tdSumaPromedioTresSemanas fc-first fc-day fc-last'><div style='min-height: 67px;align-content: center;'><div id='divSumaPromedioTresSemanas' class='fc-suma-promedio-horas-3-semanas'><span id='spSumaPromedioTresSemanas'>0</span></div></div></td></tr>");
}
/**
 * Funcion para remover la columna de suma de totales al calendario.
 */
function removerColumnaSumaTotales(){
    $("#thColumnaTotales").remove();
    $("#tdSumaSemana1").remove();
    $("#tdSumaSemana2").remove();
    $("#tdSumaSemana3").remove();
    $("#tdSumaSemana4").remove();
    $("#tdSumaSemana5").remove();
    $("#tdSumaSemana6").remove();
    $("#trSumaPromedioTresSemanas").remove();
}
/**
 * Función para calcular el número de horas que representa la hora.
 * @param hora
 * @returns {*}
 */
function numeroHoras(hora){
    if(hora!=""){
        var arrHora = hora.split(":");
        var hEnt = parseFloat(arrHora[0]);
        var mEnt = parseFloat(arrHora[1]);
        var sEnt = parseFloat(arrHora[2]);
        var sEnMin = 0;
        var mEnHor = 0;
        if(sEnt>0){
            sEnMin = sEnt/60;
        }
        mEnt = mEnt + sEnMin;
        if(mEnt>0){
            mEnHor = mEnt/60;
        }
        hEnt = hEnt +mEnHor;
        return hEnt;
    }
    else return 0;
}
/**
 * Función para la carga de la grilla de asignación individual para un registro de relación laboral, un perfil y una rango de fechas.
 * @param idPerfilLaboral
 * @param dataRecord
 */
function cargarGrillaAsignacionIndividualFechasUbicacionEstacion(idPerfilLaboral,idRelaboral,fechaIni,fechaFin){
    if(idRelaboral>0&&fechaIni!=""&&fechaFin!=""){
        $("#tbody_asignacion_single").html("");
        $.ajax({
            url: '/calendariolaboral/listallregisteredbyrelaboral',
            type: 'POST',
            datatype: 'json',
            async: false,
            cache: false,
            data: {id:idRelaboral,id_perfillaboral:idPerfilLaboral,fecha_ini:fechaIni,fecha_fin:fechaFin},
            success: function (data) {
                var res = jQuery.parseJSON(data);
                var contador = 1;
                if (res.length > 0) {
                    $.each(res, function (key, val) {
                        var arrFechaIni = val.calendario_fecha_ini.split("-");
                        var fechaIni = arrFechaIni[2]+"-"+arrFechaIni[1]+"-"+arrFechaIni[0];
                        var arrFechaFin = val.calendario_fecha_fin.split("-");
                        var fechaFin = arrFechaFin[2]+"-"+arrFechaFin[1]+"-"+arrFechaFin[0];
                        var estacion = "";
                        var perfilLaboral = val.perfil_laboral;
                        var observacion = '';
                        var grupo='';
                        if(val.perfil_laboral_grupo!=''&&val.perfil_laboral_grupo!=null)
                        grupo = val.perfil_laboral_grupo;
                        var estadoDescripcion = val.calendario_estado_descripcion;
                        if(val.relaboralperfil_estacion!=null)estacion=val.relaboralperfil_estacion;
                        if(val.relaboralperfil_observacion!=null)observacion = val.relaboralperfil_observacion;
                        $("#tbody_asignacion_single").append("<tr><td style='text-align: center'>"+contador+"</td><td style='text-align: center'>"+perfilLaboral+"</td><td style='text-align: center'>"+grupo+"</td><td style='text-align: center'>"+estadoDescripcion+"</td><td style='text-align: center'>"+fechaIni+" al "+fechaFin+"</td><td style='text-align: center'>"+val.relaboralperfil_ubicacion+"</td><td style='text-align: center'>"+estacion+"</td><td style='text-align: center'>"+val.hora_entrada+" a "+val.hora_salida+"</td><td class='hidden-xs'>"+observacion+"</td></tr>");
                        contador++;
                    });
                }
            }
        });
    }
}
/**
 * Función para la obtención del listado de personal asignado por perfil.
 * @param idPerfilRelaboral
 * @param idUbicacion
 * @param idEstacion
 * @param fechaIni
 * @param fechaFin
 */
function definirListaAsignados(idPerfilRelaboral,idUbicacion,idEstacion,fechaIni,fechaFin){
    /*$("#lstBoxRegistrados").html("");
    $("#lstBoxRegistrados").jqxListBox('render');
    $("#lstBoxRegistrados").prop("disabled",true);
    if(idUbicacion>0&&idUbicacion>0&&fechaIni!=""&&fechaFin!=""){
        var arrPersonal = [];
        var source = [];
        var data = [];
        var dataAdapter = [];
        var sufijo = "New";
        var sourceB = [];
        var soloRegistrados = 1;
        $("#divPersonasAsignadas").show();
        if(idEstacion>0){
            idUbicacion = idEstacion;
        }
        $.ajax({
            url : '/relaborales/listasignadas/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data:{id_perfillaboral:idPerfilRelaboral,id_ubicacion:idUbicacion,fecha_ini:fechaIni,fecha_fin:fechaFin },
            success: function (data) {
                arrPersonal = jQuery.parseJSON(data);
            }
        });
        if(arrPersonal.length>0){
            source = {
                localdata: arrPersonal,
                datatype: "array"
            };
            dataAdapter = new $.jqx.dataAdapter(source);
            $("#lstBoxRegistrados").prop("disabled",false);
            $("#divPersonasAsignadas").show();
            $("#lstBoxRegistrados").jqxListBox({ filterable: true,allowDrop: false, allowDrag: false, source: dataAdapter, width:  "100%", height: 500,
                renderer: function (index, label, value) {
                    var datarecord = arrPersonal[index];
                    if(datarecord!=undefined){
                        var ci = datarecord.ci;
                        var expd = datarecord.expd;
                        var imgurl = '/images/personal/'+ci+'.jpg';
                        if(!ImageExist(imgurl))imgurl = '/images/perfil-profesional.jpg';
                        var cargo = datarecord.cargo;
                        var fechas = datarecord.fecha_ini;
                        if(datarecord.fecha_fin!=null){
                            fechas = fechas + " AL "+datarecord.fecha_fin;
                        }else fechas = "Fecha Inicio: "+fechas;
                        var img = '<img height="70" width="70" src="' + imgurl + '"/>';
                        $("#tbl_"+datarecord.id_relaboral).remove();
                        var fechaIni = datarecord.fecha_incor;
                        var fechaFin = datarecord.fecha_fin;
                        if(datarecord.fecha_baja!="")fechaFin = datarecord.fecha_baja;
                        var table = '<table id="tbl_'+datarecord.id_relaboral+'" data-agrupador="'+datarecord.agrupador+'" data-nombres="'+datarecord.nombres+'" data-date-min="'+fechaIni+'" data-date-max="'+fechaFin+'">';
                        table += '<tr><td>' + img + '</td></tr>';
                        table += '<tr><td>' + datarecord.nombres + '</td></tr>';
                        table += '<tr><td>'+cargo+'</td></tr>';
                        table += '<tr><td>'+fechas+'</td></tr>';
                        table += '</table>';
                        return table;
                    }else{
                        if(jQuery.type( value )==="number"){
                            var datarecord = getOneByIdRelaboralInArray(arrPersonal,value);
                            var ci = datarecord.ci;
                            var expd = datarecord.expd;
                            var imgurl = '/images/personal/'+ci+'.jpg';
                            if(!ImageExist(imgurl))imgurl = '/images/perfil-profesional.jpg';
                            var cargo = datarecord.cargo;
                            var fechas = datarecord.fecha_ini;
                            if(datarecord.fecha_fin!=null){
                                fechas = "Fechas: "+fechas + " AL "+datarecord.fecha_fin;
                            }else fechas = "Fecha Inicio: "+fechas;
                            var img = '<img height="70" width="70" src="' + imgurl + '"/>';
                            $("#tbl_"+datarecord.id_relaboral).remove();
                            var fechaIni = datarecord.fecha_incor;
                            var fechaFin = datarecord.fecha_fin;
                            if(datarecord.fecha_baja!="")fechaFin = datarecord.fecha_baja;
                            var table = '<table id="tbl_'+datarecord.id_relaboral+'" data-agrupador="'+datarecord.agrupador+'" data-nombres="'+datarecord.nombres+'" data-date-min="'+fechaIni+'" data-date-max="'+fechaFin+'">';
                            table += '<tr><td>' + img + '</td></tr>';
                            table += '<tr><td>' + datarecord.nombres + '</td></tr>';
                            table += '<tr><td>'+cargo+'</td></tr>';
                            table += '<tr><td>'+fechas+'</td></tr>';
                            table += '</table>';
                            return table;
                        }else{
                            if(jQuery.type( value )==="object"){
                                var datarecord = value;
                                var ci = datarecord.ci;
                                var expd = datarecord.expd;
                                var imgurl = '/images/personal/'+ci+'.jpg';
                                if(!ImageExist(imgurl))imgurl = '/images/perfil-profesional.jpg';
                                var cargo = datarecord.cargo;
                                var fechas = datarecord.fecha_ini;
                                if(datarecord.fecha_fin!=null){
                                    fechas = "Fechas: "+fechas + " AL "+datarecord.fecha_fin;
                                }else fechas = "Fecha Inicio: "+fechas;
                                var img = '<img height="70" width="70" src="' + imgurl + '"/>';
                                $("#tbl_"+datarecord.id_relaboral).remove();
                                var fechaIni = datarecord.fecha_incor;
                                var fechaFin = datarecord.fecha_fin;
                                if(datarecord.fecha_baja!="")fechaFin = datarecord.fecha_baja;
                                var table = '<table id="tbl_'+datarecord.id_relaboral+'" data-agrupador="'+datarecord.agrupador+'" data-nombres="'+datarecord.nombres+'" data-date-min="'+fechaIni+'" data-date-max="'+fechaFin+'">';
                                table += '<tr><td>' + img + '</td></tr>';
                                table += '<tr><td>' + datarecord.nombres + '</td></tr>';
                                table += '<tr><td>'+cargo+'</td></tr>';
                                table += '<tr><td>'+fechas+'</td></tr>';
                                table += '</table>';
                                return table;
                            }
                        }
                    }
                },
                ready:function(){
                    var itemsB = $("#lstBoxRegistrados").jqxListBox('getItems');
                    $("#spanContadorLstBoxRegistrados").text(itemsB.length);
                }
            });

            $("#clearFilterRegistrados").jqxButton();
            $("#clearFilterRegistrados").click(function () {
                $("#lstBoxRegistrados").jqxListBox('clearFilter');
            });
        }else{
            $("#divPersonasAsignadas").hide();
        }

    }else{
        $("#divPersonasAsignadas").hide();
    }*/
}

/**
 * Función para obtener la fecha del último día de un determinado mes en una determinada gestión.
 * @param fecha
 * @returns {Array}
 */
function obtenerUltimoDiaMes(fecha){
    var fecha = $.ajax({
        url: '/perfileslaborales/getultimafechames/',
        type: "POST",
        datatype: 'json',
        async: false,
        cache: false,
        data: {fecha: fecha},
        success: function (data) {
        }
    }).responseText;
    return fecha;
}
/**
 * Función para obtener una fecha en consideración a la adición de una cantidad concreta de días a la fecha enviada como parámetro.
 * @param fecha
 * @returns {Array}
 */
function obtenerFechaMasDias(fecha,dias){
    var fecha = $.ajax({
        url: '/perfileslaborales/getfechamasdias/',
        type: "POST",
        datatype: 'json',
        async: false,
        cache: false,
        data: {fecha: fecha,dias:dias},
        success: function (data) {
        }
    }).responseText;
    return fecha;
}
/**
 * Función para cerrar un mensaje dispuesto en la parte superior del formulario.
 * @param tipo
 */
function cerrarMensaje(tipo){
    alert("llego: "+tipo);
}

/**
 * Función para la carga de gestiones disponibles para la generación de marcaciones previstas y efectivas.
 * @param g
 */
function cargarGestionesDisponiblesParaGeneracionMarcaciones(g){
    var lista = "";
    $("#lstGestionGeneracionMarcaciones").html("");
    $("#lstGestionGeneracionMarcaciones").append("<option value=''>Seleccionar</option>");
    $("#lstGestionGeneracionMarcaciones").prop("disabled",false);
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
    if(lista!='')$("#lstGestionGeneracionMarcaciones").append(lista);
    else $("#lstGestionGeneracionMarcaciones").prop("disabled",true);
}
/**
 * Función para la obtención del listado de meses disponibles para la generación de marcaciones previstas y efectivas.
 * @param gestion
 * @param m
 */
function cargarMesesDisponiblesParaGeneracionMarcaciones(gestion,m){
    $("#lstMesGeneracionMarcaciones").html("");
    $("#lstMesGeneracionMarcaciones").append("<option value=''>Seleccionar</option>");
    $("#lstMesGeneracionMarcaciones").prop("disabled",false);
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
        if(lista!='')$("#lstMesGeneracionMarcaciones").append(lista);
        else $("#lstMesGeneracionMarcaciones").prop("disabled",true);
    }else{
        $("#lstMesGeneracionMarcaciones").prop("disabled",true);
    }
}
/**
 * Función para la obtención del listado de tipos disponibles para la generación de marcaciones (Previstas y/o efectivas).
 * @param gestion
 * @param mes
 * @param t
 */
function cargarTiposDisponiblesParaGeneracionMarcaciones(gestion,mes,t){
    $("#lstTipoGeneracionMarcaciones").html("");
    $("#lstTipoGeneracionMarcaciones").append("<option value=''>Seleccionar</option>");
    $("#lstTipoGeneracionMarcaciones").prop("disabled",false);
    var lista = "";
    var selected = "";
    if(gestion>0&&mes>0){
        $.ajax({
            url: '/horariosymarcaciones/gettiposgeneracion/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {gestion:gestion,mes:mes},
            success: function (data) {
                var res = jQuery.parseJSON(data);
                if (res.length > 0) {
                    $.each(res, function (key, val) {
                        if(t==val.tipo)selected="selected";
                        else selected = "";
                        lista += "<option value='"+val.tipo+"' "+selected+">"+val.tipo_descripcion+"</option>";
                    });
                }
            }
        });
        if(lista!='')$("#lstTipoGeneracionMarcaciones").append(lista);
        else $("#lstTipoGeneracionMarcaciones").prop("disabled",true);
    }else{
        $("#lstTipoGeneracionMarcaciones").prop("disabled",true);
    }
}
/**
 * Función para la obtención de la fecha de inicio y finalización para un calendario laboral de acuerdo a una gestión y mes correspondientes.
 * @param gestion
 * @param mes
 * @returns {{fechaIni: string, fechaFin: string}}
 */
function obtenerFechaIniFinCalendario(gestion,mes){
    var fechaIni = '';
    var fechaFin = '';
    if(gestion>0&&mes>0){
        $.ajax({
            url: '/calendariolaboral/obtenerfechainifincalendario/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {gestion:gestion,mes:mes},
            success: function (data) {
                var res = jQuery.parseJSON(data);
                /**
                 * Si se ha realizado correctamente el registro de la relación laboral y la movilidad
                 */
                if (res.result == 1) {
                    fechaIni=res.fecha_ini;
                    fechaFin=res.fecha_fin;
                }
            }
        });
    }
    var objFechas = {fecha_ini:fechaIni,fecha_fin:fechaFin};
    return objFechas;
}