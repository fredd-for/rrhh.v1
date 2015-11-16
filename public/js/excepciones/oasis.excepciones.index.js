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
    $('#divTabExcepciones').jqxTabs('theme', 'oasis');
    $('#divTabExcepciones').jqxTabs('enableAt', 0);
    $('#divTabExcepciones').jqxTabs('disableAt', 1);
    $('#divTabExcepciones').jqxTabs('disableAt', 2);


    definirGrillaParaListaExcepciones();
    /**
     * Control del evento de solicitud de guardar el registro de la excepción.
     */
    $("#btnGuardarExcepcionNew").on("click",function () {
        var ok = validaFormularioExcepcion(1)
        if (ok) {
            var okk = guardaExcepcion(1);
            if (okk) {
                $('#divTabExcepciones').jqxTabs('enableAt', 0);
                $('#divTabExcepciones').jqxTabs('disableAt', 1);
                $('#divTabExcepciones').jqxTabs('disableAt', 2);
                $("#msjs-alert").hide();
            }
        }
    });
    $("#btnGuardarExcepcionEdit").on("click",function () {
        var ok = validaFormularioExcepcion(2);
        if (ok) {
            var okk = guardaExcepcion(2);
            if (okk) {
                $('#divTabExcepciones').jqxTabs('enableAt', 0);
                $('#divTabExcepciones').jqxTabs('disableAt', 1);
                $('#divTabExcepciones').jqxTabs('disableAt', 2);

                $("#msjs-alert").hide();
            }
        }
    });
    $("#btnCancelarExcepcionNew").click(function () {
        $('#divTabExcepciones').jqxTabs('enableAt', 0);
        $('#divTabExcepciones').jqxTabs('disableAt', 1);
        $('#divTabExcepciones').jqxTabs('disableAt', 2);

        $("#msjs-alert").hide();

    });
    $("#btnCancelarExcepcionEdit").click(function () {
        $('#divTabExcepciones').jqxTabs('enableAt', 0);
        $('#divTabExcepciones').jqxTabs('disableAt', 1);
        $('#divTabExcepciones').jqxTabs('disableAt', 2);

        $("#msjs-alert").hide();
    });
    $("#btnExportarExcel").click(function () {
        var items = $("#listBoxExcepciones").jqxListBox('getCheckedItems');
        var numColumnas = 0;
        $.each(items, function (index, value) {
            numColumnas++;
        });
        if (numColumnas > 0) exportarReporte(1);
        else {
            alert("Debe seleccionar al menos una columna para la obtención del reporte solicitado.");
            $("#listBoxExcepciones").focus();
        }
    });
    $("#btnExportarPDF").click(function () {
        var items = $("#listBoxExcepciones").jqxListBox('getCheckedItems');
        var numColumnas = 0;
        $.each(items, function (index, value) {
            numColumnas++;
        });
        if (numColumnas > 0) exportarReporte(2);
        else {
            alert("Debe seleccionar al menos una columna para la obtención del reporte solicitado.");
            $("#listBoxExcepciones").focus();
        }
    });
    $("#chkAllCols").click(function () {
        if (this.checked == true) {
            $("#listBoxExcepciones").jqxListBox('checkAll');
        } else {
            $("#listBoxExcepciones").jqxListBox('uncheckAll');
        }
    });
    $("#liList").click(function () {
        $("#btnCancelarExcepcionNew").click();
        $("#btnCancelarExcepcionEdit").click();
    });
    $('#btnDesfiltrartodo').click(function () {
        $("#divGridExcepciones").jqxGrid('clearfilters');
    });
    $('#btnDesagrupartodo').click(function () {
        $('#divGridExcepciones').jqxGrid('cleargroups');
    });
    $('#btnDesagruparTodoMovilidad').click(function () {
        $('#divGridExcepcionesmovilidad').jqxGrid('cleargroups');
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
 * Función para definir la grilla principal (listado) para la gestión de excepciones.
 */
function definirGrillaParaListaExcepciones() {
    var source =
    {
        datatype: "json",
        datafields: [
            {name: 'nro_row', type: 'integer'},
            {name: 'id', type: 'integer'},
            {name: 'excepcion', type: 'string'},
            {name: 'tipoexcepcion_id', type: 'integer'},
            {name: 'tipo_excepcion', type: 'string'},
            {name: 'genero_id', type: 'integer'},
            {name: 'genero', type: 'string'},
            {name: 'cantidad', type: 'numeric'},
            {name: 'unidad', type: 'string'},
            {name: 'fraccionamiento', type: 'string'},
            {name: 'frecuencia_descripcion', type: 'string'},
            {name: 'descuento', type: 'integer'},
            {name: 'descuento_descripcion', type: 'string'},
            {name: 'compensatoria', type: 'integer'},
            {name: 'compensatoria_descripcion', type: 'string'},
            {name: 'redondeo', type: 'integer'},
            {name: 'redondeo_descripcion', type: 'string'},
            {name: 'horario', type: 'integer'},
            {name: 'horario_descripcion', type: 'string'},
            {name: 'refrigerio', type: 'integer'},
            {name: 'refrigerio_descripcion', type: 'string'},
            {name: 'codigo', type: 'string'},
            {name: 'color', type: 'string'},
            {name: 'observacion', type: 'string'},
            {name: 'estado', type: 'string'},
            {name: 'estado_descripcion', type: 'string'},
            {name: 'boleta', type: 'integer'},
            {name: 'boleta_descripcion', type: 'string'}
        ],
        url: '/excepciones/list',
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    cargarRegistrosDeTolerancias();
    function cargarRegistrosDeTolerancias() {
        var theme = prepareSimulator("grid");
        $("#divGridExcepciones").jqxGrid(
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
                    container.append("<button id='addexceprowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-plus-square fa-2x text-info' title='Nuevo Registro.'/></i></button>");
                    /*container.append("<button id='approveexceprowbutton'  class='btn btn-sm btn-primary' type='button' ><i class='fa fa-check-square fa-2x text-info' title='Aprobar registro'></i></button>");*/
                    container.append("<button id='updateexceprowbutton'  class='btn btn-sm btn-primary' type='button' ><i class='fa fa-pencil-square fa-2x text-info' title='Modificar registro.'/></button>");
                    container.append("<button id='deleteexceprowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-minus-square fa-2x text-info' title='Dar de baja al registro.'/></i></button>");

                    $("#addexceprowbutton").jqxButton();
                    /*$("#approveexceprowbutton").jqxButton();*/
                    $("#updateexceprowbutton").jqxButton();
                    $("#deleteexceprowbutton").jqxButton();
                    $("#hdnIdExcepcionEdit").val(0);
                    /* Registrar nueva excepción */
                    $("#addexceprowbutton").off();
                    $("#addexceprowbutton").on('click', function () {
                        $('#divTabExcepciones').jqxTabs('enableAt', 1);
                        $('#divTabExcepciones').jqxTabs('disableAt', 2);

                        $('#divTabExcepciones').jqxTabs({selectedItem: 1});
                        limpiarMensajesErrorPorValidacionExcepcion(1);
                        inicializaFormularioExcepcionesNuevoEditar(1,"",0,"","#FFFFFF",0,0,0,0,-1,0);
                        inicializarDatosDuracion(1,"","","");
                        inicializarCamposParaNuevoRegistroExcepcion();
                        $("#txtExcepcionNew").focus();
                    });
                    /*Aprobar registro.*/
                    /*$("#approveexceprowbutton").on('click', function () {
                        var selectedrowindex = $("#divGridExcepciones").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridExcepciones').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                if (dataRecord.estado == 2) {
                                    if (confirm("¿Esta seguro de aprobar este registro de la Excepci&oacute;n?")) {
                                        aprobarRegistroExcepcion(dataRecord.id);
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
                    });*/
                    /* Modificar registro.*/
                    $("#updateexceprowbutton").off();
                    $("#updateexceprowbutton").on('click', function () {
                        var selectedrowindex = $("#divGridExcepciones").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridExcepciones').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                $("#hdnIdExcepcionEdit").val(dataRecord.id);
                                /**
                                 * La modificación sólo es admisible si el registro de horario laboral tiene estado EN PROCESO
                                 */
                                if (dataRecord.estado >= 1) {
                                    $('#divTabExcepciones').jqxTabs('enableAt', 0);
                                    $('#divTabExcepciones').jqxTabs('disableAt', 1);
                                    $('#divTabExcepciones').jqxTabs('enableAt', 2);

                                    $('#divTabExcepciones').jqxTabs({selectedItem: 2});

                                    $("#hdnIdExcepcionEdit").val(dataRecord.id);
                                    limpiarMensajesErrorPorValidacionExcepcion(2);
                                    inicializaFormularioExcepcionesNuevoEditar(2,dataRecord.excepcion,dataRecord.tipoexcepcion_id,dataRecord.codigo,dataRecord.color,dataRecord.descuento,dataRecord.compensatoria,dataRecord.horario,dataRecord.refrigerio,dataRecord.genero_id,dataRecord.boleta);
                                    inicializarDatosDuracion(2,dataRecord.cantidad,dataRecord.unidad,dataRecord.fraccionamiento);
                                    $("#txtExcepcionEdit").val(dataRecord.excepcion);
                                    $("#txtObservacionEdit").val(dataRecord.observacion);
                                    $("#txtExcepcionEdit").focus();

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
                    $("#deleteexceprowbutton").on('click', function () {
                        var selectedrowindex = $("#divGridExcepciones").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridExcepciones').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                /*
                                 *  Para dar de baja un registro, este debe estar inicialmente en estado ACTIVO
                                 */
                                if (dataRecord.estado >= 1) {
                                    if (confirm("Esta seguro de dar de baja registro de tolerancia?"))
                                        darDeBajaExcepcion(dataRecord.id);
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
                    /*{
                        text: 'Estado',
                        filtertype: 'checkedlist',
                        datafield: 'estado_descripcion',
                        width: 90,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false,
                        cellclassname: cellclass
                    },*/
                    {
                        text: 'Tipo Excepci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'tipo_excepcion',
                        width: 100,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Excepci&oacute;n',
                        datafield: 'excepcion',
                        width: 200,
                        cellsalign: 'justify',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'C&oacute;digo',
                        datafield: 'codigo',
                        width: 120,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Color',
                        datafield: 'color',
                        width: 80,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false,
                        cellsrenderer: cellsrenderer

                    },
                    {
                        text: 'G&eacute;nero',
                        filtertype: 'checkedlist',
                        datafield: 'genero',
                        width: 100,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Frecuencia',
                        filtertype: 'checkedlist',
                        datafield: 'frecuencia_descripcion',
                        width: 80,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Desc. Horas',
                        filtertype: 'checkedlist',
                        datafield: 'descuento_descripcion',
                        width: 100,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Comp. Horas',
                        filtertype: 'checkedlist',
                        datafield: 'compensatoria_descripcion',
                        width: 100,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Contr. Horario',
                        filtertype: 'checkedlist',
                        datafield: 'horario_descripcion',
                        width: 100,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Refrigerio',
                        filtertype: 'checkedlist',
                        datafield: 'refrigerio_descripcion',
                        width: 100,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Boleta',
                        filtertype: 'checkedlist',
                        datafield: 'boleta_descripcion',
                        width: 100,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
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
            /*{label: 'Estado', value: 'estado_descripcion', checked: true},*/
            {label: 'Tipo Excepci&oacute;n', value: 'tipo_excepcion', checked: true},
            {label: 'Excepci&oacute;n', value: 'excepcion', checked: true},
            {label: 'C&oacute;digo', value: 'codigo', checked: true},
            {label: 'Color', value: 'color', checked: true},
            {label: 'G&eacute;nero', value: 'genero', checked: true},
            {label: 'Frecuencia', value: 'frecuencia_descripcion', checked: true},
            {label: 'Descontar Horas', value: 'descuento_descripcion', checked: true},
            {label: 'Compensar Horas', value: 'compensatoria_descripcion', checked: true},
            {label: 'Cotrolar Horario', value: 'horario_descripcion', checked: true},
            {label: 'Refrigerio', value: 'refrigerio_descripcion', checked: true},
            {label: 'Boleta', value: 'boleta_descripcion', checked: true},
            {label: 'Observaci&oacute;n', value: 'observacion', checked: true}
        ];
        $("#listBoxExcepciones").jqxListBox({source: listSource, width: "100%", height: 430, checkboxes: true});
        $("#listBoxExcepciones").on('checkChange', function (event) {
            $("#divGridExcepciones").jqxGrid('beginupdate');
            if (event.args.checked) {
                $("#divGridExcepciones").jqxGrid('showcolumn', event.args.value);
            }
            else {
                $("#divGridExcepciones").jqxGrid('hidecolumn', event.args.value);
            }
            $("#divGridExcepciones").jqxGrid('endupdate');
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
        $('#divTabExcepciones').jqxTabs('enableAt', 0);
        $('#divTabExcepciones').jqxTabs('disableAt', 1);
        $('#divTabExcepciones').jqxTabs('disableAt', 2);

        /**
         * Saltamos a la pantalla principal en caso de presionarse ESC
         */
        $('#divTabExcepciones').jqxTabs({selectedItem: 0});
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