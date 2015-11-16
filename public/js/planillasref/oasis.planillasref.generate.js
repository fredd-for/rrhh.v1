/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  06-07-2015
 */
/**
 * Función para la carga del combo de gestiones en función de si es para la generación de nuevas planillas o para la vista de planillas generadas.
 * Dada que la función es indistinta para planillas salariales y de refrigerio son usadas para este propósito.
 * @param option
 */
function cargarGestiones(option,g){
    var sufijo = "Gen";
    if(option==2)sufijo = "View";
    var lista = "";
    $("#lstGestion"+sufijo).html("");
    $("#lstGestion"+sufijo).append("<option value=''>Seleccionar</option>");
    $("#lstGestion"+sufijo).prop("disabled",false);
    var selected = "";
    $.ajax({
        url: '/planillassal/getgestionesgeneracion/',
        type: "POST",
        datatype: 'json',
        async: false,
        cache: false,
        success: function (data) {
            var res = jQuery.parseJSON(data);
            if (res.length > 0) {
                $.each(res, function (key, gestion) {
                    if(g==gestion)selected="selected";
                    else selected = "";
                    lista += "<option value='"+gestion+"' "+selected+">"+gestion+"</option>";
                });
            }
            return res;
        }
    });
    if(lista!='')$("#lstGestion"+sufijo).append(lista);
    else $("#lstGestion"+sufijo).prop("disabled",true);
}
/**
 * Función para obtener el listado de meses disponibles para la generación de planillas de refrigerio
 * en consideración a una gestion en particular.
 * @param option
 * @param g
 * @param m
 */
function cargarMeses(option,g,m){
    var sufijo = "Gen";
    if(option==2)sufijo = "View";
    var lista = "";
    $("#lstMes"+sufijo).html("");
    $("#lstMes"+sufijo).append("<option value=''>Seleccionar</option>");
    $("#lstMes"+sufijo).prop("disabled",false);
    var selected = "";
    if(g>0){
        $.ajax({
            url: '/planillasref/getmesesgeneracion/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data:{gestion:g},
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
    }
    if(lista!='')$("#lstMes"+sufijo).append(lista);
    else $("#lstMes"+sufijo).prop("disabled",true);
}
/**
 * Función para la obtención del listado de financiamientos por partida disponibles para la generación de planillas de refrigerio en consideración a una gestion en particular.
 * @param option
 * @param g
 * @param m
 * @param idFinPartida
 */
function cargarFinPartidas(option,g,m,idFinPartida){
    var sufijo = "Gen";
    if(option==2)sufijo = "View";
    var lista = "";
    $("#lstFinPartida"+sufijo).html("");
    $("#lstFinPartida"+sufijo).append("<option value=''>Seleccionar</option>");
    $("#lstFinPartida"+sufijo).prop("disabled",false);
    var selected = "";
    if(g>0&&m>0){
        $.ajax({
            url: '/planillasref/getfinpartidasgeneracion/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data:{gestion:g,mes:m},
            success: function (data) {
                var res = jQuery.parseJSON(data);
                if (res.length > 0) {
                    $.each(res, function (key, val) {
                        if(idFinPartida==val.id_finpartida)selected="selected";
                        else selected = "";
                        lista += "<option value='"+val.id_finpartida+"' "+selected+">"+val.fin_partida+"</option>";
                    });
                }
            }
        });
    }
    if(lista!='')$("#lstFinPartida"+sufijo).append(lista);
    else $("#lstFinPartida"+sufijo).prop("disabled",true);
}
/**
 * Función para la obtención los tipos de planillas disponibles para la generación.
 * @param option
 * @param g
 * @param m
 * @param idFinPartida
 * @param idTipoPlanilla
 */
function cargarTiposDePlanilla(option,g,m,idFinPartida,idTipoPlanilla){
    var sufijo = "Gen";
    if(option==2)sufijo = "View";
    var lista = "";
    $("#lstTipoPlanillaRef"+sufijo).html("");
    $("#lstTipoPlanillaRef"+sufijo).append("<option value=''>Seleccionar</option>");
    $("#lstTipoPlanillaRef"+sufijo).prop("disabled",false);
    var selected = "";
    if(g>0&&m>0&&idFinPartida>0){
        $.ajax({
            url: '/planillasref/gettiposplanillasref/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data:{gestion:g,mes:m,id_finpartida:idFinPartida},
            success: function (data) {
                var res = jQuery.parseJSON(data);
                if (res.length > 0) {
                    $.each(res, function (key, val) {
                        if(idTipoPlanilla==val.id_tipoplanilla)selected="selected";
                        else selected = "";
                        lista += "<option value='"+val.id_tipoplanilla+"' "+selected+" data-numero='"+val.numero+"'>"+val.tipo_planilla_disponible+"</option>";
                    });
                }
            }
        });
    }
    if(lista!='')$("#lstTipoPlanillaRef"+sufijo).append(lista);
    else $("#lstTipoPlanillaRef"+sufijo).prop("disabled",true);
}
/**
 * Función para la limpieza de los formularios de generación y vista de Planillas de Refrigerio.
 * @param option
 */
function limpiarFormularioPlanillaRef(option){
    var ok = true;
    var sufijo = "Gen";
    var accion = "generaci&oacute;n";
    if(option==2)sufijo = "View";

    $("#divGestion"+sufijo).removeClass("has-error");
    $("#helpErrorGestion"+sufijo).html("");

    $("#divMes"+sufijo).removeClass("has-error");
    $("#helpErrorMes"+sufijo).html("");

    $("#divFinPartida"+sufijo).removeClass("has-error");
    $("#helpErrorFinPartida"+sufijo).html("");

    $("#divTipoPlanillaRef"+sufijo).removeClass("has-error");
    $("#helpErrorTipoPlanillaRef"+sufijo).html("");
}
/**
 * Función para validar los formularios para la generación y vista de Planillas de Refrigerio.
 * @param option
 * @returns {boolean}
 */
function validaFormularioPlanillaRef(option){
    var ok = true;
    var sufijo = "Gen";
    var accion = "generaci&oacute;n";
    if(option==2) {
        sufijo = "View";
        accion = "vista";
    }
    var divGestion = $("#divGestion"+sufijo);
    var gestion = $("#lstGestion"+sufijo).val();
    var helpErrorGestion = $("#helpErrorGestion"+sufijo);

    var divMes = $("#divMes"+sufijo);
    var mes = $("#lstMes"+sufijo).val();
    var helpErrorMes = $("#helpErrorMes"+sufijo);

    var divFinPartida = $("#divFinPartida"+sufijo);
    var idFinPartida = $("#lstFinPartida"+sufijo).val();
    var helpErrorFinPartida = $("#helpErrorFinPartida"+sufijo);

    var divTipoPlanilla = $("#divTipoPlanillaRef"+sufijo);
    var idTipoPlanilla = $("#lstTipoPlanillaRef"+sufijo).val();
    var numeroPlanilla = $("#lstTipoPlanillaRef"+sufijo).data("numero");
    var helpErrorTipoPlanilla = $("#helpErrorTipoPlanillaRef"+sufijo);

    if(gestion==''||gestion==0){
        ok = false;
        var msje = "Debe seleccionar la gesti&oacute;n para la "+accion+" de la Planilla de Refrigerio.";
        divGestion.addClass("has-error");
        helpErrorGestion.html(msje);
    }
    if(mes==''||mes==0){
        ok = false;
        var msje = "Debe seleccionar el mes para la "+accion+" de la Planilla de Refrigerio.";
        divMes.addClass("has-error");
        helpErrorMes.html(msje);
    }
    if(idFinPartida==''||idFinPartida==0){
        ok = false;
        var msje = "Debe seleccionar la Fuente para la "+accion+" de la Planilla de Refrigerio.";
        divFinPartida.addClass("has-error");
        helpErrorFinPartida.html(msje);
    }
    if(idTipoPlanilla==''||idTipoPlanilla==0){
        ok = false;
        var msje = "Debe seleccionar la Fuente para la "+accion+" de la Planilla de Refrigerio.";
        divTipoPlanilla.addClass("has-error");
        helpErrorTipoPlanilla.html(msje);
    }
    return ok;
}
/**
 * Función para la generación de la Planilla de Refrigerio.
 * @param idRelaborales
 */
function desplegarPlanillaPreviaRef(idRelaborales){
    var sufijo = "Gen";
    var gestion = $("#lstGestion"+sufijo).val();
    var mes = $("#lstMes"+sufijo).val();
    var idFinPartida = $("#lstFinPartida"+sufijo).val();
    var idTipoPlanilla = $("#lstTipoPlanillaRef"+sufijo).val();
    var numeroPlanilla = $("#lstTipoPlanillaRef"+sufijo+" option:selected").data("numero");
    var source =
    {
        datatype: "json",
        /**
         * Editable
         * @param rowid
         * @param rowdata
         * @param commit
         */
        updaterow: function (rowid, rowdata, commit) {
            // synchronize with the server - send update command
            // call commit with parameter true if the synchronization with the server is successful
            // and with parameter false if the synchronization failder.
            commit(true);
        },
        datafields: [
            {name: 'nro_row', type: 'integer'},
            {name: 'chk', type: 'bool'},
            {name: 'opcion', type: 'string'},
            {name: 'id_relaboral', type: 'integer'},
            {name: 'gestion', type: 'integer'},
            {name: 'mes', type: 'integer'},
            {name: 'gerencia_administrativa', type: 'string'},
            {name: 'departamento_administrativo', type: 'string'},
            {name: 'area', type: 'string'},
            {name: 'ubicacion', type: 'string'},
            {name: 'fin_partida', type: 'string'},
            {name: 'proceso_codigo', type: 'string'},
            {name: 'cargo', type: 'string'},
            {name: 'nombres', type: 'string'},
            {name: 'ci', type: 'string'},
            {name: 'expd', type: 'string'},
            {name: 'cargo', type: 'string'},
            {name: 'sueldo', type: 'numeric'},
            {name: 'dias_efectivos', type: 'numeric'},
            {name: 'monto_diario', type: 'numeric'},
            {name: 'faltas', type: 'numeric'},
            {name: 'atrasos', type: 'numeric'},
            {name: 'lsgh', type: 'numeric'},
            {name: 'vacacion', type: 'numeric'},
            {name: 'otros', type: 'numeric'},
            {name: 'id_form110impref', type: 'numeric'},
            {name: 'importe', type: 'numeric'},
            {name: 'rc_iva', type: 'numeric'},
            {name: 'retencion', type: 'numeric'},
            {name: 'form110impref_observacion', type: 'string'},
            {name: 'fecha_form', type: 'date'},
            {name: 'total_ganado', type: 'numeric'},
            {name: 'total_liquido', type: 'numeric'},
            {name: 'estado', type: 'string'},
            {name: 'estado_descripcion', type: 'string'},
            {name: 'cargar_formulario_110', type: 'numeric'}
        ],
        url: '/planillasref/displayplanprevia?gestion='+gestion+'&mes='+mes+'&id_finpartida='+idFinPartida+'&id_tipoplanilla='+idTipoPlanilla+'&numero='+numeroPlanilla+'&id_relaborales='+idRelaborales,
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    var columnCheckBox = null;
    var updatingCheckState = false;
    cargarRegistrosLaborales();
    function cargarRegistrosLaborales() {
        var theme = prepareSimulator("grid");
        $("#divGridPlanillasRefGen").jqxGrid(
            {
                theme: theme,
                width: '100%',
                height: '100%',
                source: dataAdapter,
                /**
                 * Editable
                 */
                editable: true,
                sortable: true,
                altRows: true,
                //groupable: true,
                columnsresize: true,
                pageable: true,
                pagerMode: 'advanced',
                showfilterrow: true,
                filterable: true,
                //showtoolbar: true,
                showstatusbar: true,
                statusbarheight: 50,
                showaggregates: true,
                autorowheight: true,
                selectionmode:'checkbox',
                pagesize: 10,
                columns: [
                    {
                        text: 'Nro.',
                        filterable: false,
                        columntype: 'number',
                        width: 40,
                        cellsalign: 'center',
                        align: 'center',
                        editable:false,
                        cellsrenderer: rownumberrenderer,
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotalConsiderados" style="float: center; margin: 4px; overflow: hidden;">0</div>';
                            return renderstring;
                        }
                    },
                    {
                        text: 'Gerencia',
                        filtertype: 'checkedlist',
                        datafield: 'gerencia_administrativa',
                        width: 220,
                        align: 'center',
                        editable:false,
                        hidden: true
                    },
                    {
                        text: 'Departamento',
                        filtertype: 'checkedlist',
                        datafield: 'departamento_administrativo',
                        width: 220,
                        align: 'center',
                        editable:false,
                        hidden: true
                    },
                    {
                        text: '&Aacute;rea',
                        filtertype: 'checkedlist',
                        datafield: 'area',
                        width: 220,
                        align: 'center',
                        editable:false,
                        hidden: true
                    },
                    {
                        text: 'Proceso',
                        filtertype: 'checkedlist',
                        datafield: 'proceso_codigo',
                        width: 220,
                        cellsalign: 'center',
                        align: 'center',
                        editable:false,
                        hidden: true
                    },
                    {
                        text: 'Fuente',
                        filtertype: 'checkedlist',
                        datafield: 'fin_partida',
                        width: 220,
                        cellsalign: 'center',
                        align: 'center',
                        editable:false,
                        hidden: true
                    },
                    {
                        text: 'Cargo',
                        filtertype: 'checkedlist',
                        datafield: 'cargo',
                        width: 100,
                        cellsalign: 'justify',
                        align: 'center',
                        editable:false,
                        hidden:true
                    },
                    {
                        text: 'Estado',
                        filtertype: 'checkedlist',
                        datafield: 'estado_descripcion',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        editable:false,
                        cellclassname: cellclass,
                        hidden:true
                    },
                    {
                        text: 'Nombres',
                        datafield: 'nombres',
                        width: 100,
                        cellsalign: 'justify',
                        align: 'center',
                        editable:false,
                        editable:false
                    },
                    {
                        text: 'CI',
                        datafield: 'ci',
                        width: 60,
                        align: 'center',
                        editable:false,
                        cellsalign: 'center',
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotal" style="float: right; margin: 4px; overflow: hidden;">Totales:</div>';
                            return renderstring;
                        }
                    },
                    {
                        text: 'Expd',
                        filtertype: 'checkedlist',
                        datafield: 'expd',
                        width: 30,
                        cellsalign: 'center',
                        align: 'center',
                        editable:false
                    },
                    {
                        text: 'Haber',
                        filtertype: 'checkedlist',
                        datafield: 'sueldo',
                        width: 60,
                        align: 'center',
                        editable:false,
                        cellsalign: 'right',
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotalHaberes" style="float: right; margin: 4px; overflow: hidden;">0.00</div>';
                            return renderstring;
                        },
                        hidden:true
                    },
                    {
                        text: 'D&iacute;as Efectivos',
                        filtertype: 'checkedlist',
                        datafield: 'dias_efectivos',
                        width: 40,
                        align: 'center',
                        editable:false,
                        cellsalign: 'right',
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotalDiasEfectivos" style="float: right; margin: 4px; overflow: hidden;">0.00</div>';
                            return renderstring;
                        }
                    },
                    {
                        text: 'Monto Diario',
                        editable:false,
                        filtertype: 'checkedlist',
                        datafield: 'monto_diario',
                        width: 40,
                        align: 'center',
                        cellsalign: 'right',
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotalMontosDiarios" style="float: right; margin: 4px; overflow: hidden;">0.00</div>';
                            return renderstring;
                        }
                    },
                    {
                        text: 'LSGHs',
                        filtertype: 'checkedlist',
                        datafield: 'lsgh',
                        width: 50,
                        align: 'center',
                        editable:false,
                        cellsalign: 'right',
                        columngroup: 'DescuentoDias',
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotalLsgh" style="float: right; margin: 4px; overflow: hidden;">0.00</div>';
                            return renderstring;
                        }
                    },
                    {
                        text: 'Faltas',
                        filtertype: 'checkedlist',
                        datafield: 'faltas',
                        width: 50,
                        align: 'center',
                        editable:false,
                        cellsalign: 'right',
                        columngroup: 'DescuentoDias',
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotalFaltas" style="float: right; margin: 4px; overflow: hidden;">0.00</div>';
                            return renderstring;
                        }
                    },
                    {
                        text: 'Vac.',
                        filtertype: 'checkedlist',
                        datafield: 'vacacion',
                        width: 50,
                        align: 'center',
                        editable:false,
                        cellsalign: 'right',
                        columngroup: 'DescuentoDias',
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotalVacacion" style="float: right; margin: 4px; overflow: hidden;">0.00</div>';
                            return renderstring;
                        }
                    },
                    {
                        text: 'Otros',
                        filtertype: 'checkedlist',
                        datafield: 'otros',
                        width: 50,
                        align: 'center',
                        editable:false,
                        cellsalign: 'right',
                        columngroup: 'DescuentoDias',
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotalOtros" style="float: right; margin: 4px; overflow: hidden;">0.00</div>';
                            return renderstring;
                        }
                    },
                    {
                        text: '',
                        datafield: 'opcion',
                        width: 10,
                        sortable: false,
                        editable:false,
                        showfilterrow: false,
                        filterable: false,
                        columntype: 'string',
                        columngroup: 'ImpuestoRefrigerio',
                        cellsrenderer: function (rowline) {
                            var dataRecord = $("#divGridPlanillasRefGen").jqxGrid('getrowdata', rowline);
                            if (dataRecord.total_ganado > 0 && dataRecord.cargar_formulario_110==1) {
                                $("#btnGenerarPlanillaRef").show();
                                return "<div style='width: 100%' align='center'><a href='#' class='btnForm110' id='"+rowline+"' onclick='abrirVentanaModalForm110ImpRef("+rowline+");'><i class='fa fa-file-text-o fa-2x text-info' title='Registrar Formulario 110'></i></a></div>";
                            }
                            else return "";
                        }
                    },
                    {
                        text: 'Importe',
                        filtertype: 'checkedlist',
                        datafield: 'importe',
                        width: 60,
                        align: 'center',
                        cellsalign: 'right',
                        cellsformat: 'f2',
                        columngroup: 'ImpuestoRefrigerio',
                        columntype: 'numberinput',
                        hidden:true,
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotalForm110" style="float: right; margin: 4px; overflow: hidden;">0.00</div>';
                            return renderstring;
                        }
                    },
                    {
                        text: 'RC-IVA',
                        filtertype: 'checkedlist',
                        datafield: 'rc_iva',
                        width: 60,
                        align: 'center',
                        editable:false,
                        cellsalign: 'right',
                        columngroup: 'ImpuestoRefrigerio',
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotalRcIva" style="float: right; margin: 4px; overflow: hidden;">0.00</div>';
                            return renderstring;
                        }
                    },
                    {
                        text: 'Retenci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'retencion',
                        width: 60,
                        align: 'center',
                        editable:false,
                        cellsalign: 'right',
                        columngroup: 'ImpuestoRefrigerio',
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotalRetencion" style="float: right; margin: 4px; overflow: hidden;">0.00</div>';
                            return renderstring;
                        }
                    },
                    {
                        text: 'Fecha F. 110',
                        datafield: 'fecha_form',
                        filtertype: 'range',
                        width: 100,
                        cellsalign: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        align: 'center',
                        editable:false,
                        columntype: 'datetimeinput',
                        hidden: true
                    },
                    {
                        text: 'F. 110 Obs.',
                        datafield: 'form110impref_observacion',
                        width: 90,
                        align: 'center',
                        editable:false,
                        cellsalign: 'right',
                        hidden:true
                    },
                    {
                        text: 'Ganado',
                        filtertype: 'checkedlist',
                        datafield: 'total_ganado',
                        width: 60,
                        align: 'center',
                        editable:false,
                        cellsalign: 'right',
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotalTotalGanado" style="float: right; margin: 4px; overflow: hidden;">0.00</div>';
                            return renderstring;
                        }
                    },
                    {
                        text: 'L&iacute;quido',
                        filtertype: 'checkedlist',
                        datafield: 'total_liquido',
                        width: 60,
                        align: 'center',
                        editable:false,
                        cellsalign: 'right',
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotalTotalLiquido" style="float: right; margin: 4px; overflow: hidden;">0.00</div>';
                            return renderstring;
                        }
                    }
                ],
                columngroups:
                    [
                        { text: 'Desc. D&iacute;as', align: 'center', name: 'DescuentoDias' },
                        { text: 'Impuestos', align: 'center', name: 'ImpuestoRefrigerio' }
                    ]
            });
        var listSource = [
            {label: 'Gerencia', value: 'gerencia_administrativa', checked: false},
            {label: 'Departamento', value: 'departamento_administrativo', checked: false},
            {label: '&Aacute;rea', value: 'area', checked: false},
            {label: 'Ubicaci&oacute;n', value: 'ubicacion', checked: false},
            {label: 'Fuente', value: 'fin_partida', checked: false},
            {label: 'Proceso', value: 'procesocontratacion_codigo', checked: false},
            {label: 'Cargo', value: 'cargo', checked: false},
            {label: 'Estado', value: 'estado_descripcion', checked: false},
            {label: 'Nombres y Apellidos', value: 'nombres', checked: true},
            {label: 'CI', value: 'ci', checked: true},
            {label: 'Exp', value: 'expd', checked: true},
            {label: 'Nivel Salarial', value: 'nivelsalarial', checked: false},
            {label: 'Haber', value: 'sueldo', checked: false},
            {label: 'Di&aacute;s Efec.', value: 'dias_efectivos', checked: true},
            {label: 'Monto Diario', value: 'monto_diario', checked: true},
            {label: 'LSGHs', value: 'lsgh', checked: true},
            {label: 'Faltas', value: 'faltas', checked: true},
            {label: 'Vacaci&oacute;n', value: 'vacacion', checked: true},
            {label: 'Otros', value: 'otros', checked: true},
            {label: 'Importe', value: 'importe', checked: false},
            {label: 'RC-IVA', value: 'rc_iva', checked: true},
            {label: 'Retenci&oacute;n', value: 'retencion', checked: true},
            {label: 'Fecha F. 110', value: 'fecha_form', checked: false},
            {label: 'F. 110 Obs.', value: 'form110impref_observacion', checked: false},
            {label: 'Total Ganado', value: 'total_ganado', checked: true},
            {label: 'Total L&iacute;quido', value: 'total_liquido', checked: true},
            {label: 'Observacion', value: 'observacion', checked: false},
        ];

        $("#divPlanilllaRefGenListBox").jqxListBox({source: listSource, width: "100%", height: 430, checkboxes: true});
        $("#divPlanilllaRefGenListBox").on('checkChange', function (event) {
            $("#divGridPlanillasRefGen").jqxGrid('beginupdate');
            if (event.args.checked) {
                $("#divGridPlanillasRefGen").jqxGrid('showcolumn', event.args.value);
            }
            else {
                $("#divGridPlanillasRefGen").jqxGrid('hidecolumn', event.args.value);
            }
            $("#divGridPlanillasRefGen").jqxGrid('endupdate');
        });
        $('#divGridPlanillasRefGen').off();
        /**
         * Control cuando se completa la construcción de la grilla correspondiente a la planilla previa.
         */
        $("#divGridPlanillasRefGen").on("bindingcomplete",function(){
            var rows = $('#divGridPlanillasRefGen').jqxGrid('getrows');
            if(rows.length>0){
                $("#btnCalcularPlanillaPreviaRef").show();
            }else{
                $("#btnGenerarPlanillaRef").hide();
                $("#btnCalcularPlanillaPreviaRef").hide();
            }
            $("#divGridPlanillasRefGen").jqxGrid('clearselection');
        });

        $('#divGridPlanillasRefGen').on('rowselect', function (event) {
            calcularTotales();
        });
        $('#divGridPlanillasRefGen').on('rowunselect', function (event) {
            calcularTotales()
        });
        function calcularTotales(){
            var rows = $("#divGridPlanillasRefGen").jqxGrid('selectedrowindexes');
            var totalConsiderados = 0;
            var totalHaberes = 0;
            var totalDiasEfectivos = 0;
            var totalMontosDiarios = 0;
            var totalFaltas = 0;
            var totalAtrasos = 0;
            var totalLsgh = 0;
            var totalVacacion = 0;
            var totalOtros = 0;
            var totalRcIva = 0;
            var totalImporte = 0;
            var totalRetenciones = 0;
            var totalTotalGanado = 0;
            var totalTotalLiquido = 0;
            $.each(rows,function(key,val){
                var rowindex = val;
                var dataRecord = $("#divGridPlanillasRefGen").jqxGrid('getrowdata', rowindex);
                /**
                 * Control de la correcta aplicación.
                 * En caso de que no se haya calculado los días efectivos, se entiende que aún no se tiene
                 * calculado el registro previo y/o el registro efectivo de marcaciones. Por lo tanto, no
                 * se debe considerar al registro.
                 */
                if(dataRecord.dias_efectivos>0){
                    if(dataRecord.id_relaboral>0){
                        totalConsiderados++;
                    }
                    if(!isNaN(dataRecord.sueldo)&&dataRecord.sueldo!=null){
                        totalHaberes += Number(parseFloat(dataRecord.sueldo));
                    }
                    if(!isNaN(dataRecord.dias_efectivos)&&dataRecord.dias_efectivos!=null){
                        totalDiasEfectivos += Number(parseFloat(dataRecord.dias_efectivos));
                    }
                    if(!isNaN(dataRecord.monto_diario)&&dataRecord.monto_diario!=null){
                        totalMontosDiarios += Number(parseFloat(dataRecord.monto_diario));
                    }
                    if(!isNaN(dataRecord.faltas)&&dataRecord.faltas!=null){
                        totalFaltas += Number(parseFloat(dataRecord.faltas));
                    }
                    if(!isNaN(dataRecord.atrasos)&&dataRecord.atrasos!=null){
                        totalAtrasos += Number(parseFloat(dataRecord.atrasos));
                    }
                    if(!isNaN(dataRecord.lsgh)&&dataRecord.lsgh!=null){
                        totalLsgh += Number(parseFloat(dataRecord.lsgh));
                    }
                    if(!isNaN(dataRecord.vacacion)&&dataRecord.vacacion!=null){
                        totalVacacion += Number(parseFloat(dataRecord.vacacion));
                    }
                    if(!isNaN(dataRecord.otros)&&dataRecord.otros!=null){
                        totalOtros += Number(parseFloat(dataRecord.otros));
                    }
                    if(!isNaN(dataRecord.importe)&&dataRecord.importe!=null){
                        totalImporte += Number(parseFloat(dataRecord.importe));
                    }
                    if(!isNaN(dataRecord.rc_iva)&&dataRecord.rc_iva!=null){
                        totalRcIva += Number(parseFloat(dataRecord.rc_iva));
                    }
                    if(!isNaN(dataRecord.retencion)&&dataRecord.retencion!=null){
                        totalRetenciones += Number(parseFloat(dataRecord.retencion));
                    }

                    if(!isNaN(dataRecord.total_ganado)&&dataRecord.total_ganado!=null){
                        totalTotalGanado += Number(parseFloat(dataRecord.total_ganado));
                    }
                    if(!isNaN(dataRecord.total_liquido)&&dataRecord.total_liquido!=null){
                        totalTotalLiquido += Number(parseFloat(dataRecord.total_liquido));
                    }
                }
            });

            $("#divTotalConsiderados").text("");
            $("#divTotalConsiderados").text(totalConsiderados);

            $("#divTotalHaberes").text("");
            $("#divTotalHaberes").text(totalHaberes.toFixed(2));

            $("#divTotalMontosDiarios").text("");
            $("#divTotalMontosDiarios").text(totalMontosDiarios.toFixed(2));

            $("#divTotalDiasEfectivos").text("");
            $("#divTotalDiasEfectivos").text(totalDiasEfectivos.toFixed(2));

            $("#divTotalFaltas").text("");
            $("#divTotalFaltas").text(totalFaltas.toFixed(2));

            $("#divTotalAtrasos").text("");
            $("#divTotalAtrasos").text(totalAtrasos.toFixed(2));

            $("#divTotalImporte").text("");
            $("#divTotalImporte").text(totalImporte.toFixed(2));

            $("#divTotalRcIva").text("");
            $("#divTotalRcIva").text(totalRcIva.toFixed(2));

            $("#divTotalRetencion").text("");
            $("#divTotalRetencion").text(totalRetenciones.toFixed(2));

            $("#divTotalLsgh").text("");
            $("#divTotalLsgh").text(totalLsgh.toFixed(2));

            $("#divTotalVacacion").text("");
            $("#divTotalVacacion").text(totalVacacion.toFixed(2));

            $("#divTotalOtros").text("");
            $("#divTotalOtros").text(totalOtros.toFixed(2));

            $("#divTotalTotalGanado").text("");
            $("#divTotalTotalGanado").text(totalTotalGanado.toFixed(2));

            $("#divTotalTotalLiquido").text("");
            $("#divTotalTotalLiquido").text(totalTotalLiquido.toFixed(2));
        }
    }
}
/**
 * Función para la generación de la planilla salarial coorespondiente.
 * @param gestion
 * @param mes
 * @param idFinPartida
 * @param idTipoPlanilla
 * @param numeroPlanilla
 * @param idRelaborales
 * @param observacion
 * @returns {boolean}
 */
function generarPlanillaDeRefrigerio(gestion,mes,idFinPartida,idTipoPlanilla,numeroPlanilla,idRelaborales,observacion){
    var ok=false;
    if(gestion>0&&mes>0&&idFinPartida>0&&numeroPlanilla>=0&&idRelaborales!=''){
        $.ajax({
            url: '/planillasref/genplanilla/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data:{gestion:gestion,mes:mes,id_finpartida:idFinPartida,id_tipoplanilla:idTipoPlanilla,numero:numeroPlanilla,id_relaborales:idRelaborales,obs:observacion},
            beforeSend:function(){
                $("#divCarga").css({display:'block'});
            },
            success: function(data) {
                $("#divCarga").css({display:'none'});
                var res = jQuery.parseJSON(data);
                /**
                 * Si se ha realizado correctamente el registro de la planilla salarial
                 */
                $(".msjes").hide();
                if(res.result==1){
                    $("#divMsjePorSuccess").html("");
                    $("#divMsjePorSuccess").append(res.msj);
                    $("#divMsjeNotificacionSuccess").jqxNotification("open");
                    ok=true;
                } else if(res.result==0){
                    $("#divMsjePorError").html("");
                    $("#divMsjePorError").append(res.msj);
                    $("#divMsjeNotificacionError").jqxNotification("open");
                }else{
                    $("#divMsjePorError").html("");
                    $("#divMsjePorError").append(res.msj);
                    $("#divMsjeNotificacionError").jqxNotification("open");
                }

            }, //mostramos el error
            error: function() { alert('Se ha producido un error inesperado'); }
        });
    }
    return ok;
}
/**
 * Función para convertir un texto con el formato dd-MM-yyyy al formato MM/dd/yyyy
 * @param date
 * @param sep
 * @returns {number}
 */
function procesaTextoAFecha(date, sep) {
    var parts = date.split(sep);
    var date = new Date(parts[1] + "/" + parts[0] + "/" + parts[2]);
    return date.getTime();
}