/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  27-05-2014
 */

/**
 * Función para desplegar la planilla generada en función del identificador de la planilla de refrigerio enviada como parámetro.
 * @param idPlanillaRef
 */
function mostrarPlanillaDeRefrigerio(idPlanillaRef){
    var source =
    {
        datatype: "json",
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
            {name: 'nivelsalarial', type: 'numeric'},
            {name: 'sueldo', type: 'numeric'},
            {name: 'dias_efectivos', type: 'numeric'},
            {name: 'monto_diario', type: 'numeric'},
            {name: 'faltas', type: 'numeric'},
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
            {name: 'estado_descripcion', type: 'string'}
        ],
        url: '/planillasref/displayplanefectiva?id='+idPlanillaRef,
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    var columnCheckBox = null;
    var updatingCheckState = false;
    cargarRegistrosLaborales();
    function cargarRegistrosLaborales() {
        var theme = prepareSimulator("grid");
        $("#divGridPlanillasRefView").jqxGrid(
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
                //showtoolbar: true,
                showstatusbar: true,
                statusbarheight: 50,
                showaggregates: true,
                autorowheight: true,
                pagesize: 20,
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
                        text: 'Ubicaci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'ubicacion',
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
                        text: 'Nivel Salarial',
                        filtertype: 'checkedlist',
                        datafield: 'nivelsalarial',
                        width: 60,
                        align: 'center',
                        editable:false,
                        cellsalign: 'right',
                        hidden:true
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
                        aggregates: [{
                            'Dias':function (aggregatedValue, currentValue, column, record) {
                                var total = 0;
                                if(!isNaN(record['dias_efectivos'])){
                                    total = Number(parseFloat(record['dias_efectivos']));
                                }
                                return aggregatedValue + total;
                            }
                        }]
                    },
                    {
                        text: 'Monto Diario',
                        editable:false,
                        filtertype: 'checkedlist',
                        datafield: 'monto_diario',
                        width: 40,
                        align: 'center',
                        cellsalign: 'right',
                        aggregates: [{
                            'Bs.':function (aggregatedValue, currentValue, column, record) {
                                var total = 0;
                                if(!isNaN(record['monto_diario'])){
                                    total = Number(parseFloat(record['monto_diario']));
                                }
                                return aggregatedValue + total;
                            }
                        }]
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
                        aggregates: [{
                            'Dias':function (aggregatedValue, currentValue, column, record) {
                                var total = 0;
                                if(!isNaN(record['lsgh'])){
                                    total = Number(parseFloat(record['lsgh']));
                                }
                                return aggregatedValue + total;
                            }
                        }]
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
                        aggregates: [{
                            'Dias':function (aggregatedValue, currentValue, column, record) {
                                var total = 0;
                                if(!isNaN(record['faltas'])){
                                    total = Number(parseFloat(record['faltas']));
                                }
                                return aggregatedValue + total;
                            }
                        }]
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
                        aggregates: [{
                            'Dias':function (aggregatedValue, currentValue, column, record) {
                                var total = 0;
                                if(!isNaN(record['vacacion'])){
                                    total = Number(parseFloat(record['vacacion']));
                                }
                                return aggregatedValue + total;
                            }
                        }]
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
                        aggregates: [{
                            'Dias':function (aggregatedValue, currentValue, column, record) {
                                var total = 0;
                                if(!isNaN(record['otros'])){
                                    total = Number(parseFloat(record['otros']));
                                }
                                return aggregatedValue + total;
                            }
                        }]
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
                        aggregates: [{
                            'Bs.':function (aggregatedValue, currentValue, column, record) {
                                var total = 0;
                                if(!isNaN(record['importe'])){
                                    total = Number(parseFloat(record['importe']));
                                }
                                return aggregatedValue + total;
                            }
                        }]
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
                        aggregates: [{
                            'Bs.':function (aggregatedValue, currentValue, column, record) {
                                var total = 0;
                                if(!isNaN(record['rc_iva'])){
                                    total = Number(parseFloat(record['rc_iva']));
                                }
                                return aggregatedValue + total;
                            }
                        }]
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
                        aggregates: [{
                            'Bs.':function (aggregatedValue, currentValue, column, record) {
                                var total = 0;
                                if(!isNaN(record['retencion'])){
                                    total = Number(parseFloat(record['retencion']));
                                }
                                return aggregatedValue + total;
                            }
                        }]
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
                        aggregates: [{
                            'Bs.':function (aggregatedValue, currentValue, column, record) {
                                var total = 0;
                                if(!isNaN(record['total_ganado'])){
                                    total = Number(parseFloat(record['total_ganado']));
                                }
                                return aggregatedValue + total;
                            }
                        }]
                    },
                    {
                        text: 'L&iacute;quido',
                        filtertype: 'checkedlist',
                        datafield: 'total_liquido',
                        width: 60,
                        align: 'center',
                        editable:false,
                        cellsalign: 'right',
                        aggregates: [{
                            'Bs.':function (aggregatedValue, currentValue, column, record) {
                                var total = 0;
                                if(!isNaN(record['total_liquido'])){
                                    total = Number(parseFloat(record['total_liquido']));
                                }
                                return aggregatedValue + total;
                            }
                        }]
                    }
                ],
                columngroups:
                    [
                        { text: 'Descuento en D&iacute;as', align: 'center', name: 'DescuentoDias' },
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
        $("#divPlanilllaRefViewListBox").jqxListBox({source: listSource, width: "100%", height: 430, checkboxes: true});
        $("#divPlanilllaRefViewListBox").on('checkChange', function (event) {
            $("#divGridPlanillasRefView").jqxGrid('beginupdate');
            if (event.args.checked) {
                $("#divGridPlanillasRefView").jqxGrid('showcolumn', event.args.value);
            }
            else {
                $("#divGridPlanillasRefView").jqxGrid('hidecolumn', event.args.value);
            }
            $("#divGridPlanillasRefView").jqxGrid('endupdate');
        });
    }
}