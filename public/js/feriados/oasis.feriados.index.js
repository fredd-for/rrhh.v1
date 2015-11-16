/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  18-02-2015
 */
$().ready(function () {

    /**
     * Inicialmente se habilita solo la pestaña del listado
     */
    $('#divTabFeriados').jqxTabs('theme', 'oasis');
    $('#divTabFeriados').jqxTabs('enableAt', 0);
    $('#divTabFeriados').jqxTabs('disableAt', 1);
    $('#divTabFeriados').jqxTabs('disableAt', 2);
    $('#divTabFeriados').jqxTabs('disableAt', 3);

    definirGrillaParaListaFeriados();
    /**
     * Control del evento de solicitud de guardar el registro del feriado.
     */
    $("#btnGuardarFeriadoNew").off();
    $("#btnGuardarFeriadoNew").on("click",function () {
        var ok = validaFormularioFeriado(1)
        if (ok) {
            var okk = guardaFeriado(1);
            if (okk) {
                $('#divTabFeriados').jqxTabs('enableAt', 0);
                $('#divTabFeriados').jqxTabs('disableAt', 1);
                $('#divTabFeriados').jqxTabs('disableAt', 2);
                $('#divTabFeriados').jqxTabs('disableAt', 3);
                $("#msjs-alert").hide();
            }
        }
    });
    $("#btnGuardarFeriadoEditar").off();
    $("#btnGuardarFeriadoEditar").on("click",function () {
        var ok = validaFormularioFeriado(2);
        if (ok) {
            var okk = guardaFeriado(2);
            if (okk) {
                $('#divTabFeriados').jqxTabs('enableAt', 0);
                $('#divTabFeriados').jqxTabs('disableAt', 1);
                $('#divTabFeriados').jqxTabs('disableAt', 2);
                $('#divTabFeriados').jqxTabs('disableAt', 3);
                $("#msjs-alert").hide();
            }
        }
    });
    $("#btnCancelarFeriadoEditar,#btnCancelarFeriadoNew").click(function () {
        $('#divTabFeriados').jqxTabs('enableAt', 0);
        $('#divTabFeriados').jqxTabs('disableAt', 1);
        $('#divTabFeriados').jqxTabs('disableAt', 2);
        $('#divTabFeriados').jqxTabs('disableAt', 3);
        $("#msjs-alert").hide();
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
    $("#liList").click(function () {
        $("#btnCancelarFeriadoNuevo").click();
        $("#btnCancelarFeriadoEditar").click();
    });
    $('#btnDesfiltrartodo').click(function () {
        $("#divGridFeriados").jqxGrid('clearfilters');
    });
    $('#btnDesagrupartodo').click(function () {
        $('#divGridFeriados').jqxGrid('cleargroups');
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
 * Función para definir la grilla principal (listado) para la gestión de feriados.
 */
function definirGrillaParaListaFeriados() {
    var source =
    {
        datatype: "json",
        datafields: [
            {name: 'nro_row', type: 'integer'},
            {name: 'id', type: 'integer'},
            {name: 'feriado', type: 'string'},
            {name: 'descripcion', type: 'string'},
            {name: 'regional_id', type: 'integer'},
            {name: 'regional', type: 'string'},
            {name: 'horario_discontinuo', type: 'integer'},
            {name: 'horario_discontinuo_descripcion', type: 'string'},
            {name: 'horario_continuo', type: 'integer'},
            {name: 'horario_continuo_descripcion', type: 'string'},
            {name: 'horario_multiple', type: 'integer'},
            {name: 'horario_multiple_descripcion', type: 'string'},
            {name: 'cantidad_dias', type: 'integer'},
            {name: 'repetitivo', type: 'integer'},
            {name: 'repetitivo_descripcion', type: 'string'},
            {name: 'dia', type: 'integer'},
            {name: 'mes', type: 'integer'},
            {name: 'mes_nombre', type: 'string'},
            {name: 'gestion', type: 'integer'},
            {name: 'observacion', type: 'string'},
            {name: 'estado', type: 'integer'},
            {name: 'estado_descripcion', type: 'string'}
        ],
        url: '/feriados/list',
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    cargarRegistrosDeTolerancias();
    function cargarRegistrosDeTolerancias() {
        var theme = prepareSimulator("grid");
        $("#divGridFeriados").jqxGrid(
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
                    container.append("<button id='calendarrowbutton' class='btn btn-sm btn-primary' type='button'><i class='gi gi-calendar fa-2x text-info' title='Vista Historial.'/></i></button>");

                    $("#addrowbutton").jqxButton();
                    $("#approverowbutton").jqxButton();
                    $("#updaterowbutton").jqxButton();
                    $("#deleterowbutton").jqxButton();
                    $("#calendarrowbutton").jqxButton();

                    /* Registrar nuevo feriado.*/
                    $("#addrowbutton").off();
                    $("#addrowbutton").on('click', function () {
                        $('#divTabFeriados').jqxTabs('enableAt', 1);
                        $('#divTabFeriados').jqxTabs('disableAt', 2);
                        $('#divTabFeriados').jqxTabs('disableAt', 3);
                        $('#divTabFeriados').jqxTabs({selectedItem: 1});
                        inicializaFormularioNuevoEditar(1,0);
                        listarCantidadDias(1,0);
                        listaMesesEnCadaGestion(1,0);

                        $("#lstMesNew").off();
                        $("#lstMesNew").on("change",function(){
                            listaDiasEnCadaMes(1,$(this).val(),0);
                        });
                        inicializarCamposParaNuevoRegistroFeriado(1);
                        limpiarMensajesErrorPorValidacionFeriado("New");
                        $("#txtFechaEspecificaNew").datepicker("hide");
                        $("#txtFeriadoNew").focus();
                    });
                    /*Aprobar registro.*/
                    $("#approverowbutton").off();
                    $("#approverowbutton").on('click', function () {
                        var selectedrowindex = $("#divGridFeriados").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridFeriados').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                /*
                                 * La aprobación de un registro es admisible si el estado del registro es EN PROCESO.
                                 */
                                if (dataRecord.estado == 2) {
                                    if (confirm("¿Esta seguro de aprobar este registro de feriado?")) {
                                        aprobarRegistroFeriado(dataRecord.id);
                                    }
                                } else {
                                    var msje = "Debe seleccionar un registro con estado EN PROCESO para posibilitar la aprobaci&oacute;n del registro";
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
                    /* Modificar registro.*/
                    $("#updaterowbutton").off();
                    $("#updaterowbutton").on('click', function () {
                        var selectedrowindex = $("#divGridFeriados").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridFeriados').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                $("#hdnIdFeriadoEditar").val(dataRecord.id);
                                /**
                                 * La modificación sólo es admisible si el registro de horario laboral tiene estado EN PROCESO
                                 */
                                if (dataRecord.estado >= 1) {
                                    $('#divTabFeriados').jqxTabs('enableAt', 0);
                                    $('#divTabFeriados').jqxTabs('disableAt', 1);
                                    $('#divTabFeriados').jqxTabs('enableAt', 2);
                                    $('#divTabFeriados').jqxTabs('disableAt', 3);
                                    $('#divTabFeriados').jqxTabs({selectedItem: 2});

                                    limpiarMensajesErrorPorValidacionFeriado("Editar");
                                    inicializarCamposParaNuevoRegistroFeriado(2);
                                    inicializaFormularioNuevoEditar(2,dataRecord.repetitivo);
                                    $("#txtFeriadoEditar").val(dataRecord.feriado);
                                    $("#txtDescripcionEditar").val(dataRecord.descripcion);
                                    $("#hdnIdFeriadoEditar").val(dataRecord.id);
                                    if(dataRecord.horario_discontinuo==1)$("#chkHorariosDiscontinuosEditar").bootstrapSwitch("state",true);
                                    else $("#chkHorariosDiscontinuosEditar").bootstrapSwitch("state",false);

                                    if(dataRecord.horario_continuo==1)$("#chkHorariosContinuosEditar").bootstrapSwitch("state",true);
                                    else $("#chkHorariosContinuosEditar").bootstrapSwitch("state",false);

                                    if(dataRecord.horario_multiple==1)$("#chkHorariosMultiplesEditar").bootstrapSwitch("state",true);
                                    else $("#chkHorariosMultiplesEditar").bootstrapSwitch("state",false);

                                    listarCantidadDias(2,dataRecord.cantidad_dias);
                                    $("#txtFechaEspecificaEditar").datepicker("hide");
                                    if(dataRecord.repetitivo==1){
                                        listaMesesEnCadaGestion(2,dataRecord.mes);
                                        listaDiasEnCadaMes(2,dataRecord.mes,dataRecord.dia);
                                    }else{
                                        listaMesesEnCadaGestion(2,0);
                                        listaDiasEnCadaMes(2,0,0);
                                        var dia = dataRecord.dia+"";
                                        var mes = dataRecord.mes+"";
                                        var gestion = dataRecord.gestion+"";
                                        if(dia.length==1)dia="0"+dia;
                                        if(mes.length==1)mes="0"+mes;
                                        var fecha = dia+"-"+mes+"-"+gestion;
                                        $("#txtFechaEspecificaEditar").datepicker("update", fecha);
                                    }
                                    $("#lstMesEditar").off();
                                    $("#lstMesEditar").on("change",function(){
                                        listaDiasEnCadaMes(2,$(this).val(),dataRecord.dia);
                                    });

                                    $("#txtFeriadoEditar").focus();

                                } else {
                                    var msje = "Debe seleccionar un registro en estado EN PROCESO o ACTIVO necesariamente.";
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
                    $("#deleterowbutton").off();
                    $("#deleterowbutton").on('click', function () {
                        var selectedrowindex = $("#divGridFeriados").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridFeriados').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                /*
                                 *  Para dar de baja un registro, este debe estar inicialmente en estado ACTIVO
                                 */
                                if (dataRecord.estado >= 1) {
                                    if (confirm("Esta seguro de dar de baja registro de feriado?"))
                                        darDeBajaFeriado(dataRecord.id);
                                } else {
                                    var msje = "Para dar de baja un registro, este debe estar en estado ACTIVO o EN PROCESO inicialmente.";
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
                    $("#calendarrowbutton").off();
                    $("#calendarrowbutton").on('click', function () {
                        var date = new Date();
                        var defaultDia = date.getDate();
                        var defaultMes = date.getMonth();
                        var defaultGestion = date.getFullYear();
                        $("#calendar").html("");
                        var arrFeriados = [];
                        $('#divTabFeriados').jqxTabs('enableAt', 0);
                        $('#divTabFeriados').jqxTabs('disableAt', 1);
                        $('#divTabFeriados').jqxTabs('disableAt', 2);
                        $('#divTabFeriados').jqxTabs('enableAt', 3);
                        $('#divTabFeriados').jqxTabs({selectedItem: 3});
                        iniciarCalendarioLaboralConFeriados(arrFeriados,defaultGestion, defaultMes, defaultDia);
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
                        text: 'Feriado',
                        filtertype: 'checkedlist',
                        datafield: 'feriado',
                        width: 150,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Discontinuos',
                        filtertype: 'checkedlist',
                        datafield: 'horario_discontinuo_descripcion',
                        width: 90,
                        columngroup: 'TiposHorarios',
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Continuos',
                        filtertype: 'checkedlist',
                        datafield: 'horario_continuo_descripcion',
                        width: 80,
                        columngroup: 'TiposHorarios',
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Multiples',
                        filtertype: 'checkedlist',
                        datafield: 'horario_multiple_descripcion',
                        width: 80,
                        columngroup: 'TiposHorarios',
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: '# D&iacute;as',
                        filtertype: 'checkedlist',
                        datafield: 'cantidad_dias',
                        width: 50,
                        align: 'center',
                        cellsalign:'center',
                        hidden: false
                    },
                    {
                        text: 'Repetitivo',
                        filtertype: 'checkedlist',
                        datafield: 'repetitivo_descripcion',
                        width: 150,
                        align: 'center',
                        cellsalign:'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a',
                        filtertype: 'checkedlist',
                        datafield: 'dia',
                        width: 50,
                        columngroup: 'Temporalidad',
                        cellsalign:'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Mes',
                        filtertype: 'checkedlist',
                        datafield: 'mes_nombre',
                        width: 100,
                        columngroup: 'Temporalidad',
                        cellsalign:'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'A&ntilde;o',
                        filtertype: 'checkedlist',
                        datafield: 'gestion',
                        width: 50,
                        columngroup: 'Temporalidad',
                        cellsalign:'center',
                        align: 'center',
                        hidden: false
                    },
                   {
                        text: 'Observaci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'observacion',
                        width: 150,
                        align: 'center',
                        hidden: false
                    },
                ],
            columngroups:
            [
                { text: 'Tipos de Horario', align: 'center', name: 'TiposHorarios' },
                { text: 'Temporalidad', align: 'center', name: 'Temporalidad' }
            ]
            });
        var listSource = [
            {label: 'Estado', value: 'estado_descripcion', checked: true},
            {label: 'Feriado', value: 'feriado', checked: true},
            {label: 'H. Discontinuos', value: 'horario_discontinuo_descripcion', checked: true},
            {label: 'H. Continuos', value: 'horario_continuo_descripcion', checked: true},
            {label: 'H. Multiples', value: 'horario_multiple_descripcion', checked: true},
            {label: 'Cantidad D&iacute;as', value: 'cantidad_dias', checked: true},
            {label: 'Repetitivo', value: 'repetitivo_descripcion', checked: true},

            {label: 'Observaci&oacute;n', value: 'observacion', checked: true}
        ];
        $("#jqxlistbox").jqxListBox({source: listSource, width: "100%", height: 430, checkboxes: true});
        $("#jqxlistbox").on('checkChange', function (event) {
            $("#divGridFeriados").jqxGrid('beginupdate');
            if (event.args.checked) {
                $("#divGridFeriados").jqxGrid('showcolumn', event.args.value);
            }
            else {
                $("#divGridFeriados").jqxGrid('hidecolumn', event.args.value);
            }
            $("#divGridFeriados").jqxGrid('endupdate');
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
        $('#divTabFeriados').jqxTabs('enableAt', 0);
        $('#divTabFeriados').jqxTabs('disableAt', 1);
        $('#divTabFeriados').jqxTabs('disableAt', 2);
        $('#divTabFeriados').jqxTabs('disableAt', 3);
        /**
         * Saltamos a la pantalla principal en caso de presionarse ESC
         */
        $('#divTabFeriados').jqxTabs({selectedItem: 0});
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
 * Función para la inicialización de los valores correspondientes dentro del formulario de nuevo registro y edición de registro.
 * @param opcion
 * @param repetitivo
 */
function inicializaFormularioNuevoEditar(opcion,repetitivo){
    var sufijo = "New";
    if(opcion==2)sufijo = "Editar";
    $("#chkHorariosDiscontinuos"+sufijo).bootstrapSwitch();
    $("#chkHorariosContinuos"+sufijo).bootstrapSwitch();
    $("#chkHorariosMultiples"+sufijo).bootstrapSwitch();

    $("#chkRepetitivo"+sufijo).bootstrapSwitch("destroy");
    $("#chkRepetitivo"+sufijo).off();
    $("#chkRepetitivo"+sufijo).bootstrapSwitch();

    $("#txtDia"+sufijo).val("");
    $("#txtMes"+sufijo).val("");
    $("#txtFechaEspecifica"+sufijo).val("").datepicker("update");

    if(repetitivo==0){
        $("#chkRepetitivo"+sufijo).bootstrapSwitch("state",false);
        $("#divDia"+sufijo).hide();
        $("#divMes"+sufijo).hide();
        $("#divFecha"+sufijo).show();
        $("#divFechaEspecifica"+sufijo).show();
        $("#txtFechaEspecifica"+sufijo).focus();
    }else {
        $("#chkRepetitivo"+sufijo).bootstrapSwitch("state",true);
        $("#divDia"+sufijo).show();
        $("#divMes"+sufijo).show();
        $("#divFecha"+sufijo).hide();
        $("#divFechaEspecifica"+sufijo).hide();
        $("#txtDia"+sufijo).focus();
    }
    $("#chkRepetitivo"+sufijo).on('switchChange.bootstrapSwitch', function(event, state) {
        /**
         * Si el feriado se repite cada año en la misma fecha sólo se requiere registrar el mes y el día.
         * En caso contrario se requiere el día, mes y año.
         */
        if(state){
            $("#divDia"+sufijo).show();
            $("#divMes"+sufijo).show();
            $("#divFechaEspecifica"+sufijo).hide();
            $("#txtFechaEspecifica"+sufijo).focusout();
            $("#txtDia"+sufijo).focus();
        }else{
            $("#divDia"+sufijo).hide();
            $("#divMes"+sufijo).hide();
            $("#divFechaEspecifica"+sufijo).show();
            $("#txtDia"+sufijo).focusout();
            $("#txtFechaEspecifica"+sufijo).focus();
        }
    });
}
/**
 * Función anónima para la obtención del listado de posibilidades de cantidades de días por feriado.
 * @param opcion
 * @param cantidad
 */
function listarCantidadDias(opcion,cantidad){
    var sufijo = "New";
    if(opcion==2){
        sufijo = "Editar";
    }
    var selected="";
    $("#lstCantidadDias"+sufijo).html("");
    $("#lstCantidadDias"+sufijo).append("<option value='0'>Cantidad de D&iacute;as...</option>");
    if(cantidad>=0){
        for (i=1;i<=10;i++){
            if(i==cantidad)selected="selected";
            else selected="";
            $("#lstCantidadDias"+sufijo).append("<option value='"+i+"' "+selected+">"+i+" D&iacute;a (s)</option>");
        }
    }
}
/**
 * Función para listar los meses dispuestos en la gestión.
 * @param opcion Variable que indica en que formulario se hace el despliegue (Nuevo o Edición)
 * @param mes Valor prefijado para el mes
 */
function listaMesesEnCadaGestion(opcion,mes){
    var sufijo = "New";
    if(opcion==2){
        sufijo = "Editar";
    }
    var selected="";
    var arrMeses = ["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"];
    $("#lstMes"+sufijo).html("");
    $("#lstMes"+sufijo).append("<option value='0'>Mes en cada a&ntilde;o</option>");
    if(mes>=0){
        $.each(arrMeses, function( index, value ) {
            var numMes = index+1;
            if(numMes==mes)selected="selected";
            else selected="";
            $("#lstMes"+sufijo).append("<option value='"+numMes+"' "+selected+">"+value+"</option>");
        });
    }
}
/**
 * Función para listar los días dispuestos en cada mes.
 * @param opcion Variable que indica en que formulario se hace el despliegue (Nuevo o Edición)
 * @param mes Mes seleccionado
 * @param dia dia prefijado
 */
function listaDiasEnCadaMes(opcion,mes,dia){
    var sufijo = "New";
    if(opcion==2){
        sufijo = "Editar";
    }
    var selected="";
    var arrMeses = ["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"];
    var arrDiasPorMeses = [31,28,31,30,31,30,31,31,30,31,30,31];
    var nombreMes = "";
    if(mes>0){
        nombreMes = "de "+arrMeses[mes-1];
    }
    $("#lstDia"+sufijo).html("");
    $("#lstDia"+sufijo).append("<option value='0'>D&iacute;as en el mes "+nombreMes+"</option>");
    $("#lstDia"+sufijo).prop("disabled",true);
    if(mes>0&&dia>=0){
        $("#lstDia"+sufijo).prop("disabled",false);
        var cantidadDias = arrDiasPorMeses[mes-1];
        for (i=1;i<=cantidadDias;i++){
            if(i==dia)selected="selected";
            else selected="";
            $("#lstDia"+sufijo).append("<option value='"+i+"' "+selected+">"+i+"</option>");
        }
    }
}