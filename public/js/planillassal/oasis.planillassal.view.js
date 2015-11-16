/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  27-05-2014
 */

/**
 * Función para desplegar la planilla generada en función del identificador de la planilla salarial enviada como parámetro.
 * @param idPlanillaSal
 */
function mostrarPlanilla(idPlanillaSal){
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
            {name: 'area', type: 'string'},
            {name: 'cargo', type: 'string'},
            {name: 'nombres', type: 'string'},
            {name: 'ci', type: 'string'},
            {name: 'expd', type: 'string'},
            {name: 'cargo', type: 'string'},
            {name: 'nivel_salarial', type: 'string'},
            {name: 'sueldo', type: 'numeric'},
            {name: 'dias_efectivos', type: 'numeric'},
            {name: 'bonos', type: 'numeric'},
            {name: 'faltas', type: 'numeric'},
            {name: 'atrasos', type: 'numeric'},
            {name: 'faltas_atrasos', type: 'numeric'},
            {name: 'lsgh', type: 'numeric'},
            {name: 'omision', type: 'numeric'},
            {name: 'abandono', type: 'numeric'},
            {name: 'otros', type: 'numeric'},
            {name: 'aporte_laboral_afp', type: 'numeric'},
            {name: 'total_descuentos', type: 'numeric'},
            {name: 'total_ganado', type: 'numeric'},
            {name: 'total_liquido', type: 'numeric'},
            {name: 'estado', type: 'string'},
            {name: 'estado_descripcion', type: 'string'}
        ],
        url: '/planillassal/displayplanefectiva?id='+idPlanillaSal,
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    var columnCheckBox = null;
    var updatingCheckState = false;
    cargarRegistrosLaborales();
    function cargarRegistrosLaborales() {
        var theme = prepareSimulator("grid");
        $("#divGridPlanillasSalView").jqxGrid(
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
                        cellsrenderer: rownumberrenderer,
                        aggregates: [{
                         '#':function (aggregatedValue, currentValue, column, record) {
                            return aggregatedValue + 1;
                            }
                         }]
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
                        width: 150,
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
                            var renderstring ='<div id="divTotalView" style="float: right; margin: 4px; overflow: hidden;">Totales:</div>';
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
                        text: 'Nivel Salarial',
                        filtertype: 'checkedlist',
                        datafield: 'nivel_salarial',
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
                        aggregates: [{
                            'Bs.':function (aggregatedValue, currentValue, column, record) {
                                var total = 0;
                                if(!isNaN(record['sueldo'])){
                                    total = Number(parseFloat(record['sueldo']));
                                }
                                return aggregatedValue + total;
                            }
                        }]
                    },
                    {
                        text: 'D&iacute;as Efectivos',
                        filtertype: 'checkedlist',
                        datafield: 'dias_efectivos',
                        width: 60,
                        align: 'center',
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
                        text: 'Bono Ant.',
                        filtertype: 'checkedlist',
                        datafield: 'bonos',
                        width: 60,
                        align: 'center',
                        cellsalign: 'right',
                        aggregates: [{
                            'Bs.':function (aggregatedValue, currentValue, column, record) {
                                var total = 0;
                                if(!isNaN(record['bonos'])){
                                    total = Number(parseFloat(record['bonos']));
                                }
                                return aggregatedValue + total;
                            }
                        }],
                        hidden:true
                    },
                    {
                        text: 'LSGHs',
                        filtertype: 'checkedlist',
                        datafield: 'lsgh',
                        width: 60,
                        align: 'center',
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
                        text: 'Omisi&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'omision',
                        width: 60,
                        align: 'center',
                        cellsalign: 'right',
                        columngroup: 'DescuentoDias',
                        aggregates: [{
                            'Dias':function (aggregatedValue, currentValue, column, record) {
                                var total = 0;
                                if(!isNaN(record['omision'])){
                                    total = Number(parseFloat(record['omision']));
                                }
                                return aggregatedValue + total;
                            }
                        }]
                    },
                    {
                        text: 'Abandono',
                        filtertype: 'checkedlist',
                        datafield: 'abandono',
                        width: 65,
                        align: 'center',
                        cellsalign: 'right',
                        columngroup: 'DescuentoDias',
                        aggregates: [{
                            'Dias':function (aggregatedValue, currentValue, column, record) {
                                var total = 0;
                                if(!isNaN(record['abandono'])){
                                    total = Number(parseFloat(record['abandono']));
                                }
                                return aggregatedValue + total;
                            }
                        }]
                    },
                    {
                        text: 'Faltas',
                        filtertype: 'checkedlist',
                        datafield: 'faltas',
                        width: 60,
                        align: 'center',
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
                        text: 'Atrasos',
                        filtertype: 'checkedlist',
                        datafield: 'atrasos',
                        width: 60,
                        align: 'center',
                        cellsalign: 'right',
                        columngroup: 'DescuentoDias',
                        aggregates: [{
                            'Dias':function (aggregatedValue, currentValue, column, record) {
                                var total = 0;
                                if(!isNaN(record['atrasos'])){
                                    total = Number(parseFloat(record['atrasos']));
                                }
                                return aggregatedValue + total;
                            }
                        }]
                    },
                    {
                        text: 'Otros',
                        filtertype: 'checkedlist',
                        datafield: 'otros',
                        width: 60,
                        align: 'center',
                        cellsalign: 'right',
                        columngroup: 'DescuentoMonetario',
                        aggregates: [{
                            'Bs.':function (aggregatedValue, currentValue, column, record) {
                                var total = 0;
                                if(!isNaN(record['otros'])){
                                    total = Number(parseFloat(record['otros']));
                                }
                                return aggregatedValue + total;
                            }
                        }]
                    },
                    {
                        text: 'Total',
                        filtertype: 'checkedlist',
                        datafield: 'total_descuentos',
                        width: 60,
                        align: 'center',
                        cellsalign: 'right',
                        columngroup: 'DescuentoMonetario',
                        aggregates: [{
                            'Bs.':function (aggregatedValue, currentValue, column, record) {
                                var total = 0;
                                if(!isNaN(record['total_descuentos'])){
                                    total = Number(parseFloat(record['total_descuentos']));
                                }
                                return aggregatedValue + total;
                            }
                        }]
                    },
                    {
                        text: 'Desc. AFP',
                        filtertype: 'checkedlist',
                        datafield: 'aporte_laboral_afp',
                        width: 90,
                        align: 'center',
                        cellsalign: 'right',
                        aggregates: [{
                            'Bs.':function (aggregatedValue, currentValue, column, record) {
                                var total = 0;
                                if(!isNaN(record['aporte_laboral_afp'])){
                                    total = Number(parseFloat(record['aporte_laboral_afp']));
                                }
                                return aggregatedValue + total;
                            }
                        }]
                    },
                    {
                        text: 'Total Ganado',
                        filtertype: 'checkedlist',
                        datafield: 'total_ganado',
                        width: 90,
                        align: 'center',
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
                        text: 'Total L&iacute;quido',
                        filtertype: 'checkedlist',
                        datafield: 'total_liquido',
                        width: 90,
                        align: 'center',
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
            {label: 'proceso', value: 'proceso_codigo', checked: false},
            {label: 'Cargo', value: 'cargo', checked: false},
            {label: 'Estado', value: 'estado_descripcion', checked: false},
            {label: 'Nombres y Apellidos', value: 'nombres', checked: true},
            {label: 'CI', value: 'ci', checked: true},
            {label: 'Exp', value: 'expd', checked: true},
            {label: 'Nivel Salarial', value: 'nivel_salarial', checked: false},
            {label: 'Haber', value: 'sueldo', checked: true},
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
            {label: 'Total L&iacute;quido', value: 'total_liquido', checked: true}
        ];

        $("#divPlanilllaSalViewListBox").jqxListBox({source: listSource, width: "100%", height: 430, checkboxes: true});
        $("#divPlanilllaSalViewListBox").on('checkChange', function (event) {
            $("#divGridPlanillasSalView").jqxGrid('beginupdate');
            if (event.args.checked) {
                $("#divGridPlanillasSalView").jqxGrid('showcolumn', event.args.value);
            }
            else {
                $("#divGridPlanillasSalView").jqxGrid('hidecolumn', event.args.value);
            }
            $("#divGridPlanillasSalView").jqxGrid('endupdate');
        });
        $('#divGridPlanillasSalView').off();
    }
}