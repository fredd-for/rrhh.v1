/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  22-12-2014
 */
$().ready(function () {
    /**
     * Inicialmente se habilita solo la pestaña del listado
     */
    $('#jqxTabsTolerancias').jqxTabs('theme', 'oasis');
    $('#jqxTabsTolerancias').jqxTabs('enableAt', 0);
    $('#jqxTabsTolerancias').jqxTabs('disableAt', 1);
    $('#jqxTabsTolerancias').jqxTabs('disableAt', 2);
    $('#jqxTabsTolerancias').jqxTabs('disableAt', 3);

    definirGrillaParaListaTolerancias();
    /**
     * Control del evento de solicitud de guardar el registro del horario.
     */
    $("#btnGuardarToleranciaNuevo").click(function () {
        var ok = validaFormularioTolerancia()
        if (ok) {
            var okk = guardaTolerancia();
            if (okk) {
                $('#jqxTabsTolerancias').jqxTabs('enableAt', 0);
                $('#jqxTabsTolerancias').jqxTabs('disableAt', 1);
                $('#jqxTabsTolerancias').jqxTabs('disableAt', 2);
                $('#jqxTabsTolerancias').jqxTabs('disableAt', 3);
                $("#msjs-alert").hide();
            }
        }
    });
    $("#btnGuardarToleranciaEditar").click(function () {
        var ok = validaFormularioTolerancia();
        if (ok) {
            var okk = guardaTolerancia();
            if (okk) {
                $('#jqxTabsTolerancias').jqxTabs('enableAt', 0);
                $('#jqxTabsTolerancias').jqxTabs('disableAt', 1);
                $('#jqxTabsTolerancias').jqxTabs('disableAt', 2);
                $('#jqxTabsTolerancias').jqxTabs('disableAt', 3);
                $("#msjs-alert").hide();
            }
        }
    });
    $("#btnCancelarToleranciaNuevo").click(function () {
        $('#jqxTabsTolerancias').jqxTabs('enableAt', 0);
        $('#jqxTabsTolerancias').jqxTabs('disableAt', 1);
        $('#jqxTabsTolerancias').jqxTabs('disableAt', 2);
        $('#jqxTabsTolerancias').jqxTabs('disableAt', 3);
        $("#msjs-alert").hide();

    });
    $("#btnCancelarToleranciaEditar").click(function () {
        $('#jqxTabsTolerancias').jqxTabs('enableAt', 0);
        $('#jqxTabsTolerancias').jqxTabs('disableAt', 1);
        $('#jqxTabsTolerancias').jqxTabs('disableAt', 2);
        $('#jqxTabsTolerancias').jqxTabs('disableAt', 3);
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
        $("#btnCancelarToleranciaNuevo").click();
        $("#btnCancelarToleranciaEditar").click();
    });
    $('#btnDesfiltrartodo').click(function () {
        $("#jqxgridtolerancias").jqxGrid('clearfilters');
    });
    $('#btnDesagrupartodo').click(function () {
        $('#jqxgridtolerancias').jqxGrid('cleargroups');
    });
    $('#btnDesagruparTodoMovilidad').click(function () {
        $('#jqxgridtoleranciasmovilidad').jqxGrid('cleargroups');
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
 * Función para definir la grilla principal (listado) para la gestión de tolerancias de ingreso.
 */
function definirGrillaParaListaTolerancias() {
    var source =
    {
        datatype: "json",
        datafields: [
            {name: 'nro_row', type: 'integer'},
            {name: 'id', type: 'integer'},
            {name: 'tolerancia', type: 'integer'},
            {name: 'tipo_acumulacion', type: 'integer'},
            {name: 'acumulacion_descripcion', type: 'time'},
            {name: 'consideracion_retraso', type: 'integer'},
            {name: 'consideracion_retraso_descripcion', type: 'numeric'},
            {name: 'fecha_ini', type: 'date',formatstring:'dd-mm-yyyy'},
            {name: 'fecha_fin', type: 'date'},
            {name: 'descripcion', type: 'string'},
            {name: 'observacion', type: 'string'},
            {name: 'estado', type: 'string'},
            {name: 'estado_descripcion', type: 'string'}
        ],
        url: '/tolerancias/list',
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    cargarRegistrosDeTolerancias();
    function cargarRegistrosDeTolerancias() {
        var theme = prepareSimulator("grid");
        $("#jqxgridtolerancias").jqxGrid(
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

                    $("#addrowbutton").jqxButton();
                    $("#approverowbutton").jqxButton();
                    $("#updaterowbutton").jqxButton();
                    $("#deleterowbutton").jqxButton();

                    /* Registrar nueva tolerancia.*/
                    $("#addrowbutton").off();
                    $("#addrowbutton").on('click', function () {
                        $('#jqxTabsTolerancias').jqxTabs('enableAt', 1);
                        $('#jqxTabsTolerancias').jqxTabs('disableAt', 2);
                        $('#jqxTabsTolerancias').jqxTabs('disableAt', 3);
                        $('#jqxTabsTolerancias').jqxTabs({selectedItem: 1});
                        inicializarCamposParaNuevoRegistroTolerancia();
                        limpiarMensajesErrorPorValidacionTolerancia("");
                        cargarTiposDeAcumulacion(-1,"");
                        cargarOpcionesDeConsideracionEnRetraso(-1,"");
                        $("#txtTolerancia").focus();
                    });
                    /*Aprobar registro.*/
                    $("#approverowbutton").on('click', function () {
                        var selectedrowindex = $("#jqxgridtolerancias").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#jqxgridtolerancias').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                /*
                                 * La aprobación de un registro es admisible si el estado del registro es EN PROCESO.
                                 */
                                if (dataRecord.estado == 2) {
                                    if (confirm("¿Esta seguro de aprobar este registro de tolerancia?")) {
                                        aprobarRegistroTolerancia(dataRecord.id);
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
                    $("#approverowbutton").off();
                    $("#updaterowbutton").on('click', function () {
                        var selectedrowindex = $("#jqxgridtolerancias").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#jqxgridtolerancias').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                $("#hdnIdToleranciaEditar").val(dataRecord.id);
                                /**
                                 * La modificación sólo es admisible si el registro de horario laboral tiene estado EN PROCESO
                                 */
                                if (dataRecord.estado >= 1) {
                                    $('#jqxTabsTolerancias').jqxTabs('enableAt', 0);
                                    $('#jqxTabsTolerancias').jqxTabs('disableAt', 1);
                                    $('#jqxTabsTolerancias').jqxTabs('enableAt', 2);
                                    $('#jqxTabsTolerancias').jqxTabs('disableAt', 3);
                                    $('#jqxTabsTolerancias').jqxTabs({selectedItem: 2});

                                    limpiarMensajesErrorPorValidacionTolerancia("Editar");
                                    $("#txtToleranciaEditar").val(dataRecord.tolerancia);
                                    cargarTiposDeAcumulacion(dataRecord.tipo_acumulacion,"Editar");
                                    cargarOpcionesDeConsideracionEnRetraso(dataRecord.consideracion_retraso,"Editar");
                                    $("#txtDescripcionEditar").val(dataRecord.descripcion);
                                    var fechaIni = "";
                                    if(dataRecord.fecha_ini!=null)
                                    fechaIni = $.jqx.dataFormat.formatdate(dataRecord.fecha_ini, 'dd-MM-yyyy');
                                    var fechaFin = "";
                                    if(dataRecord.fecha_fin!=null)
                                        fechaFin = $.jqx.dataFormat.formatdate(dataRecord.fecha_fin, 'dd-MM-yyyy');
                                    $("#txtFechaIniEditar").val(fechaIni);
                                    $("#txtFechaFinEditar").val(fechaFin);
                                    $("#txtObservacionEditar").val(dataRecord.observacion);
                                    $("#txtToleranciaEditar").focus();

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
                    $("#deleterowbutton").on('click', function () {
                        var selectedrowindex = $("#jqxgridtolerancias").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#jqxgridtolerancias').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                var id_tolerancia = dataRecord.id;
                                /*
                                 *  Para dar de baja un registro, este debe estar inicialmente en estado ACTIVO
                                 */
                                if (dataRecord.estado >= 1) {
                                    if (confirm("Esta seguro de dar de baja registro de tolerancia?"))
                                        darDeBajaTolerancia(id_tolerancia);
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
                        text: 'Tolerancia',
                        filtertype: 'checkedlist',
                        datafield: 'tolerancia',
                        width: 100,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Acumulaci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'acumulacion_descripcion',
                        width: 100,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Consideraci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'consideracion_retraso_descripcion',
                        width: 100,
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Descripci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'descripcion',
                        width: 400,
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
                        text: 'Fecha Fin',
                        datafield: 'fecha_fin',
                        filtertype: 'range',
                        width: 100,
                        cellsalign: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Observaci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'observacion',
                        width: 100,
                        align: 'center',
                        hidden: false
                    },
                ]
            });
        var listSource = [
            {label: 'Estado', value: 'estado_descripcion', checked: true},
            {label: 'Tolerancia', value: 'tolerancia', checked: true},
            {label: 'Acumulaci&oacute;n', value: 'acumulacion_descripcion', checked: true},
            {label: 'Consideraci&oacute;n', value: 'consideracion_retraso_descripcion', checked: true},
            {label: 'Descripci&oacute;n', value: 'descripcion', checked: true},
            {label: 'Fecha Ini', value: 'fecha_ini', checked: true},
            {label: 'Fecha Fin', value: 'fecha_fin', checked: false},
            {label: 'Observaci&oacute;n', value: 'observacion', checked: true}
        ];
        $("#jqxlistbox").jqxListBox({source: listSource, width: "100%", height: 430, checkboxes: true});
        $("#jqxlistbox").on('checkChange', function (event) {
            $("#jqxgridtolerancias").jqxGrid('beginupdate');
            if (event.args.checked) {
                $("#jqxgridtolerancias").jqxGrid('showcolumn', event.args.value);
            }
            else {
                $("#jqxgridtolerancias").jqxGrid('hidecolumn', event.args.value);
            }
            $("#jqxgridtolerancias").jqxGrid('endupdate');
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
        $('#jqxTabsTolerancias').jqxTabs('enableAt', 0);
        $('#jqxTabsTolerancias').jqxTabs('disableAt', 1);
        $('#jqxTabsTolerancias').jqxTabs('disableAt', 2);
        $('#jqxTabsTolerancias').jqxTabs('disableAt', 3);
        /**
         * Saltamos a la pantalla principal en caso de presionarse ESC
         */
        $('#jqxTabsTolerancias').jqxTabs({selectedItem: 0});
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