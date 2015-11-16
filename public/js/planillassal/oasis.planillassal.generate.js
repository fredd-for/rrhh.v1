/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  29-04-2015
 */
/**
 * Función para la carga del combo de gestiones en función de si es para la generación de nuevas planillas o para la vista de planillas generadas.
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
 * Función para obtener el listado de meses disponibles para la generación de planillas salariales en consideración a una gestion en particular.
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
            url: '/planillassal/getmesesgeneracion/',
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
 * Función para la obtención del listado de financiamientos por partida disponibles para la generación de planillas salariales en consideración a una gestion en particular.
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
            url: '/planillassal/getfinpartidasgeneracion/',
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
    $("#lstTipoPlanillaSal"+sufijo).html("");
    $("#lstTipoPlanillaSal"+sufijo).append("<option value=''>Seleccionar</option>");
    $("#lstTipoPlanillaSal"+sufijo).prop("disabled",false);
    var selected = "";
    if(g>0&&m>0&&idFinPartida>0){
        //$("#lstTipoPlanillaSal"+sufijo).html("");
        $.ajax({
            url: '/planillassal/gettiposplanillassal/',
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
    if(lista!='')$("#lstTipoPlanillaSal"+sufijo).append(lista);
    else $("#lstTipoPlanillaSal"+sufijo).prop("disabled",true);
}
/**
 * Función para la limpieza de los formularios de generación y vista de planillas salariales.
 * @param option
 */
function limpiarFormularioPlanillaSal(option){
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

    $("#divTipoPlanillaSal"+sufijo).removeClass("has-error");
    $("#helpErrorTipoPlanillaSal"+sufijo).html("");
}
/**
 * Función para validar los formularios para la generación y vista de Planillas Salariales.
 * @param option
 * @returns {boolean}
 */
function validaFormularioPlanillaSal(option){
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

    var divTipoPlanilla = $("#divTipoPlanillaSal"+sufijo);
    var idTipoPlanilla = $("#lstTipoPlanillaSal"+sufijo).val();
    var numeroPlanilla = $("#lstTipoPlanillaSal"+sufijo).data("numero");
    var helpErrorTipoPlanilla = $("#helpErrorTipoPlanillaSal"+sufijo);

    if(gestion==''||gestion==0){
        ok = false;
        var msje = "Debe seleccionar la gesti&oacute;n para la "+accion+" de la planilla.";
        divGestion.addClass("has-error");
        helpErrorGestion.html(msje);
    }
    if(mes==''||mes==0){
        ok = false;
        var msje = "Debe seleccionar el mes para la "+accion+" de la planilla.";
        divMes.addClass("has-error");
        helpErrorMes.html(msje);
    }
    if(idFinPartida==''||idFinPartida==0){
        ok = false;
        var msje = "Debe seleccionar la Fuente para la "+accion+" de la planilla.";
        divFinPartida.addClass("has-error");
        helpErrorFinPartida.html(msje);
    }
    if(idTipoPlanilla==''||idTipoPlanilla==0){
        ok = false;
        var msje = "Debe seleccionar la Fuente para la "+accion+" de la planilla.";
        divTipoPlanilla.addClass("has-error");
        helpErrorTipoPlanilla.html(msje);
    }
    return ok;
}
/**
 * Función para la generación de la planilla salarial.
 */
function desplegarPlanillaPreviaSal(idRelaborales){
    var sufijo = "Gen";
    var gestion = $("#lstGestion"+sufijo).val();
    var mes = $("#lstMes"+sufijo).val();
    var idFinPartida = $("#lstFinPartida"+sufijo).val();
    var idTipoPlanilla = $("#lstTipoPlanillaSal"+sufijo).val();
    var numeroPlanilla = $("#lstTipoPlanillaSal"+sufijo+" option:selected").data("numero");
    var source =
    {
        datatype: "json",
        datafields: [
            {name: 'nro_row', type: 'integer'},
            {name: 'chk', type: 'bool'},
            {name: 'id_relaboral', type: 'integer'},
            {name: 'gerencia_administrativa', type: 'string'},
            {name: 'departamento_administrativo', type: 'string'},
            {name: 'area', type: 'string'},
            {name: 'ubicacion', type: 'string'},
            {name: 'fin_partida', type: 'string'},
            {name: 'procesocontratacion_codigo', type: 'string'},
            {name: 'cargo', type: 'string'},
            {name: 'nombres', type: 'string'},
            {name: 'ci', type: 'string'},
            {name: 'expd', type: 'string'},
            {name: 'cargo', type: 'string'},
            {name: 'sueldo', type: 'numeric'},
            {name: 'dias_efectivos', type: 'numeric'},
            {name: 'bonos', type: 'numeric'},
            {name: 'faltas', type: 'numeric'},
            {name: 'faltas_rip', type: 'numeric'},
            {name: 'atrasos', type: 'numeric'},
            {name: 'atrasos_rip', type: 'numeric'},
            {name: 'faltas_atrasos', type: 'numeric'},
            {name: 'lsgh', type: 'numeric'},
            {name: 'omision', type: 'numeric'},
            {name: 'omision_rip', type: 'numeric'},
            {name: 'abandono', type: 'numeric'},
            {name: 'abandono_rip', type: 'numeric'},
            {name: 'otros', type: 'numeric'},
            {name: 'aporte_laboral_afp', type: 'numeric'},
            {name: 'total_descuentos', type: 'numeric'},
            {name: 'total_ganado', type: 'numeric'},
            {name: 'total_liquido', type: 'numeric'},
            {name: 'estado', type: 'string'},
            {name: 'estado_descripcion', type: 'string'}
        ],
        url: '/planillassal/displayplanprevia?gestion='+gestion+'&mes='+mes+'&id_finpartida='+idFinPartida+'&id_tipoplanilla='+idTipoPlanilla+'&numero='+numeroPlanilla+'&id_relaborales='+idRelaborales,
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    var columnCheckBox = null;
    var updatingCheckState = false;
    cargarRegistrosLaborales();
    function cargarRegistrosLaborales() {
        var theme = prepareSimulator("grid");
        $("#divGridPlanillasSalGen").jqxGrid(
            {
                theme: theme,
                width: '100%',
                height: '100%',
                source: dataAdapter,
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
                pagesize: 20,
                columns: [
                    {
                        text: 'Nro.',
                        filterable: false,
                        columntype: 'number',
                        width: 40,
                        cellsalign: 'center',
                        align: 'center',
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
                        width: 150,
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Departamento',
                        filtertype: 'checkedlist',
                        datafield: 'departamento_administrativo',
                        width: 150,
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: '&Aacute;rea',
                        filtertype: 'checkedlist',
                        datafield: 'area',
                        width: 100,
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Ubicaci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'ubicacion',
                        width: 150,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Fuente',
                        filtertype: 'checkedlist',
                        datafield: 'fin_partida',
                        width: 150,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Proceso',
                        filtertype: 'checkedlist',
                        datafield: 'procesocontratacion_codigo',
                        width: 220,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Cargo',
                        filtertype: 'checkedlist',
                        datafield: 'cargo',
                        width: 100,
                        cellsalign: 'justify',
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Estado',
                        filtertype: 'checkedlist',
                        datafield: 'estado_descripcion',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        cellclassname: cellclass,
                        hidden: true
                    },
                    {
                        text: 'Nombres y Apellidos',
                        datafield: 'nombres',
                        width: 100,
                        cellsalign: 'justify',
                        align: 'center'
                    },
                    {
                        text: 'CI',
                        datafield: 'ci',
                        width: 70,
                        align: 'center',
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
                        align: 'center'
                    },
                    {
                        text: 'Proceso',
                        filtertype: 'checkedlist',
                        datafield: 'proceso_codigo',
                        width: 220,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Nivel Salarial',
                        filtertype: 'checkedlist',
                        datafield: 'nivelsalarial',
                        width: 220,
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Haber',
                        filtertype: 'checkedlist',
                        datafield: 'sueldo',
                        width: 60,
                        align: 'center',
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
                        width: 60,
                        align: 'center',
                        cellsalign: 'right',
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotalDiasEfectivos" style="float: right; margin: 4px; overflow: hidden;">0.00</div>';
                            return renderstring;
                        }
                    },
                    {
                        text: 'Bono Ant.',
                        filtertype: 'checkedlist',
                        datafield: 'bonos',
                        width: 60,
                        align: 'center',
                        cellsalign: 'right',
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotalBonoAntiguedad" style="float: right; margin: 4px; overflow: hidden;">0.00</div>';
                            return renderstring;
                        },
                        hidden: true
                    },
                    {
                        text: 'Faltas',
                        filtertype: 'checkedlist',
                        datafield: 'faltas_rip',
                        width: 60,
                        align: 'center',
                        cellsalign: 'right',
                        columngroup: 'DescuentoDias',
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotalFaltas" style="float: right; margin: 4px; overflow: hidden;">0.00</div>';
                            return renderstring;
                        }
                    },
                    {
                        text: 'Atrasos',
                        filtertype: 'checkedlist',
                        datafield: 'atrasos_rip',
                        width: 60,
                        align: 'center',
                        cellsalign: 'right',
                        columngroup: 'DescuentoDias',
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotalAtrasos" style="float: right; margin: 4px; overflow: hidden;">0.00</div>';
                            return renderstring;
                        }
                    },
                    {
                        text: 'LSGHs',
                        filtertype: 'checkedlist',
                        datafield: 'lsgh',
                        width: 60,
                        align: 'center',
                        cellsalign: 'right',
                        columngroup: 'DescuentoDias',
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotalLsgh" style="float: right; margin: 4px; overflow: hidden;">0.00</div>';
                            return renderstring;
                        }
                    },
                    {
                        text: 'Omisi&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'omision_rip',
                        width: 60,
                        align: 'center',
                        cellsalign: 'right',
                        columngroup: 'DescuentoDias',
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotalOmision" style="float: right; margin: 4px; overflow: hidden;">0.00</div>';
                            return renderstring;
                        }
                    },
                    {
                        text: 'Abandono',
                        filtertype: 'checkedlist',
                        datafield: 'abandono_rip',
                        width: 65,
                        align: 'center',
                        cellsalign: 'right',
                        columngroup: 'DescuentoDias',
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotalAbandono" style="float: right; margin: 4px; overflow: hidden;">0.00</div>';
                            return renderstring;
                        }
                    },
                    {
                        text: 'Otros',
                        filtertype: 'checkedlist',
                        datafield: 'otros',
                        width: 60,
                        align: 'center',
                        cellsalign: 'right',
                        columngroup: 'DescuentoMonetario',
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotalOtros" style="float: right; margin: 4px; overflow: hidden;">0.00</div>';
                            return renderstring;
                        }
                    },
                    {
                     text: 'Total',
                     filtertype: 'checkedlist',
                     datafield: 'total_descuentos',
                     width: 60,
                     align: 'center',
                     cellsalign: 'right',
                     columngroup: 'DescuentoMonetario',
                     aggregatesrenderer: function (aggregates) {
                     var renderstring ='<div id="divTotalTotalDescuentos" style="float: right; margin: 4px; overflow: hidden;">0.00</div>';
                     return renderstring;
                     }
                     },
                    {
                        text: 'Desc. AFP',
                        filtertype: 'checkedlist',
                        datafield: 'aporte_laboral_afp',
                        width: 90,
                        align: 'center',
                        cellsalign: 'right',
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotalAporteLaboralAFP" style="float: right; margin: 4px; overflow: hidden;">0.00</div>';
                            return renderstring;
                        }
                    },
                    {
                        text: 'Total Ganado',
                        filtertype: 'checkedlist',
                        datafield: 'total_ganado',
                        width: 90,
                        align: 'center',
                        cellsalign: 'right',
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotalTotalGanado" style="float: right; margin: 4px; overflow: hidden;">0.00</div>';
                            return renderstring;
                        }
                    },
                    {
                        text: 'Total L&iacute;quido',
                        filtertype: 'checkedlist',
                        datafield: 'total_liquido',
                        width: 90,
                        align: 'center',
                        cellsalign: 'right',
                        aggregatesrenderer: function (aggregates) {
                            var renderstring ='<div id="divTotalTotalLiquido" style="float: right; margin: 4px; overflow: hidden;">0.00</div>';
                            return renderstring;
                        }
                    }
                ],
                columngroups:
                    [
                        { text: 'Descuentos en D&iacute;as', align: 'center', name: 'DescuentoDias' },
                        { text: 'Descuentos en Bs.', align: 'center', name: 'DescuentoMonetario' }
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
            {label: 'Bono Ant.', value: 'bonos', checked: false},
            {label: 'LSGHs', value: 'lsgh', checked: true},
            {label: 'Omisi&oacute;n', value: 'omision', checked: true},
            {label: 'Abandono', value: 'abandono', checked: true},
            {label: 'Faltas', value: 'faltas', checked: true},
            {label: 'Atrasos', value: 'atrasos', checked: true},
            {label: 'Otros', value: 'otros', checked: true},
            {label: 'Total Desc.', value: 'total_descuentos', checked: true},
            {label: 'Desc. AFP', value: 'aporte_laboral_afp', checked: true},
            {label: 'Total Ganado', value: 'total_ganado', checked: true},
            {label: 'Total L&iacute;quido', value: 'total_liquido', checked: true},
            {label: 'Observacion', value: 'observacion', checked: false},
        ];

        $("#divPlanilllaSalGenListBox").jqxListBox({source: listSource, width: "100%", height: 430, checkboxes: true});
        $("#divPlanilllaSalGenListBox").on('checkChange', function (event) {
            $("#divGridPlanillasSalGen").jqxGrid('beginupdate');
            if (event.args.checked) {
                $("#divGridPlanillasSalGen").jqxGrid('showcolumn', event.args.value);
            }
            else {
                $("#divGridPlanillasSalGen").jqxGrid('hidecolumn', event.args.value);
            }
            $("#divGridPlanillasSalGen").jqxGrid('endupdate');
        });


        $('#divGridPlanillasSalGen').off();
        /**
         * Control cuando se completa la construcción de la grilla correspondiente a la planilla previa.
         */
        $("#divGridPlanillasSalGen").on("bindingcomplete",function(){
            var rows = $('#divGridPlanillasSalGen').jqxGrid('getrows');
            if(rows.length>0){
                $("#btnCalcularPlanillaPreviaSal").show();

            }else{
                $("#btnCalcularPlanillaPreviaSal").hide();
            }
            $("#divGridPlanillasSalGen").jqxGrid('clearselection');
        });

        $('#divGridPlanillasSalGen').on('rowselect', function (event) {
            calcularTotales();
        });
        $('#divGridPlanillasSalGen').on('rowunselect', function (event) {
            calcularTotales()
        });
        function calcularTotales(){
            var rows = $("#divGridPlanillasSalGen").jqxGrid('selectedrowindexes');
            var totalConsiderados = 0;
            var totalHaberes = 0;
            var totalDiasEfectivos = 0;
            var totalBonoAntiguedad = 0;
            var totalFaltas = 0;
            var totalAtrasos = 0;
            var totalFaltasAtrasos = 0;
            var totalOmisiones = 0;
            var totalAbandonos = 0;
            var totalLsgh = 0;
            var totalOtros = 0;
            var totalTotalDescuentos = 0;
            var totalAporteLaboralAFP = 0;
            var totalTotalGanado = 0;
            var totalTotalLiquido = 0;
            $.each(rows,function(key,val){
                var rowindex = val;
                var dataRecord = $("#divGridPlanillasSalGen").jqxGrid('getrowdata', rowindex);
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
                    if(!isNaN(dataRecord.bonos)&&dataRecord.bonos!=null){
                        totalBonoAntiguedad += Number(parseFloat(dataRecord.bonos));
                    }
                    if(!isNaN(dataRecord.faltas)&&dataRecord.faltas!=null){
                        totalFaltas += Number(parseFloat(dataRecord.faltas));
                    }

                    if(!isNaN(dataRecord.atrasos)&&dataRecord.atrasos!=null){
                        totalAtrasos += Number(parseFloat(dataRecord.atrasos));
                    }
                    if(!isNaN(dataRecord.total_descuentos)&&dataRecord.total_descuentos!=null){
                        totalTotalDescuentos += Number(parseFloat(dataRecord.total_descuentos));
                    }
                    if(!isNaN(dataRecord.aporte_laboral_afp)&&dataRecord.aporte_laboral_afp!=null){
                        totalAporteLaboralAFP += Number(parseFloat(dataRecord.aporte_laboral_afp));
                    }
                    if(!isNaN(dataRecord.lsgh)&&dataRecord.lsgh!=null){
                        totalLsgh += Number(parseFloat(dataRecord.lsgh));
                    }
                    if(!isNaN(dataRecord.omision)&&dataRecord.omision!=null){
                        totalOmisiones += Number(parseFloat(dataRecord.omision));
                    }
                    if(!isNaN(dataRecord.abandono)&&dataRecord.abandono!=null){
                        totalAbandonos += Number(parseFloat(dataRecord.abandono));
                    }
                    if(!isNaN(dataRecord.otros)&&dataRecord.otros!=null){
                        totalOtros += Number(parseFloat(dataRecord.otros));
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

            $("#divTotalDiasEfectivos").text("");
            $("#divTotalDiasEfectivos").text(totalDiasEfectivos.toFixed(2));

            $("#divTotalBonoAntiguedad").text("");
            $("#divTotalBonoAntiguedad").text(totalBonoAntiguedad.toFixed(2));

            $("#divTotalFaltas").text("");
            $("#divTotalFaltas").text(totalFaltas.toFixed(2));

            $("#divTotalAtrasos").text("");
            $("#divTotalAtrasos").text(totalAtrasos.toFixed(2));

            $("#divTotalTotalDescuentos").text("");
            $("#divTotalTotalDescuentos").text(totalTotalDescuentos.toFixed(2));

            $("#divTotalAporteLaboralAFP").text("");
            $("#divTotalAporteLaboralAFP").text(totalAporteLaboralAFP.toFixed(2));

            $("#divTotalLsgh").text("");
            $("#divTotalLsgh").text(totalLsgh.toFixed(2));

            $("#divTotalOmision").text("");
            $("#divTotalOmision").text(totalOmisiones.toFixed(2));

            $("#divTotalAbandono").text("");
            $("#divTotalAbandono").text(totalAbandonos.toFixed(2));

            $("#divTotalOtros").text("");
            $("#divTotalOtros").text(totalOtros.toFixed(2));

            $("#divTotalTotalGanado").text("");
            $("#divTotalTotalGanado").text(totalTotalGanado.toFixed(2));

            $("#divTotalTotalLiquido").text("");
            $("#divTotalTotalLiquido").text(totalTotalLiquido.toFixed(2));
        }
        return true;
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
function generarPlanillaSalarial(gestion,mes,idFinPartida,idTipoPlanilla,numeroPlanilla,idRelaborales,observacion){
    var ok=false;
    if(gestion>0&&mes>0&&idFinPartida>0&&numeroPlanilla>=0){
        $.ajax({
            url: '/planillassal/genplanilla/',
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