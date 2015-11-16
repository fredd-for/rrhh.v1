/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  27-03-2015
 */
/**
 * Función para la búsqueda de registros de personal que cumplen el criterio de búsqueda establecido a través del parámetro.
 * @param objParametros
 */
function definirGrillaDescargaMarcacionesRango(objParametros) {
    var opcion = objParametros.opcion;
    var carnet = objParametros.ci;
    var idOrganigrama = objParametros.idOrganigrama;
    var idArea=objParametros.idArea;
    var idUbicacion=objParametros.idUbicacion;
    var idRelaboral=objParametros.idRelaboral;
    var fechaIni = objParametros.fechaIni;
    var fechaFin = objParametros.fechaFin;
    var source =
    {
        datatype: "json",
        datafields: [
            {name: 'nro_row', type: 'integer'},
            {name: 'nombres', type: 'string'},
            {name: 'ci', type: 'string'},
            {name: 'expd', type: 'string'},
            {name: 'gestion', type: 'integer'},
            {name: 'mes', type: 'integer'},
            {name: 'mes_nombre', type: 'string'},
            {name: 'fecha', type: 'date'},
            {name: 'hora', type: 'time'},
            {name: 'id_maquina', type: 'integer'},
            {name: 'maquina', type: 'string'},
            {name: 'observacion', type: 'string'},
            {name: 'estado', type: 'string'},
            {name: 'estado_descripcion', type: 'string'},
            {name: 'user_reg_id', type: 'integer'},
            {name: 'usuario', type: 'string'},
            {name: 'fecha_reg', type: 'date'},
            {name: 'fecha_ini_rango', type: 'date'},
            {name: 'fecha_fin_rango', type: 'date'}
        ],
        url: '/marcaciones/list?opcion='+opcion+'&ci='+carnet+'&id_organigrama='+idOrganigrama+'&id_area='+idArea+'&id_ubicacion='+idUbicacion+'&id_relaboral='+idRelaboral+'&fecha_ini='+fechaIni+'&fecha_fin='+fechaFin,
        cache: false,
        root: 'Rows',
        beforeprocessing: function (data) {
            source.totalrecords = data[0].TotalRows;
        },
        filter: function()
        {
            // Actualiza la grilla y reenvia los datos actuales al servidor
            $("#divGridDescargaMarcacionesRango").jqxGrid('updatebounddata', 'filter');
        },
        sort: function()
        {
            // Actualiza la grilla y reenvia los datos actuales al servidor
            $("#divGridDescargaMarcacionesRango").jqxGrid('updatebounddata', 'sort');
        }
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    cargarRegistrosDeDescargaMarcaciones();
    function cargarRegistrosDeDescargaMarcaciones() {
        var theme = prepareSimulator("grid");
        $("#divGridDescargaMarcacionesRango").jqxGrid(
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
                pagesize:10,
                virtualmode: true,
                rendergridrows: function (params) {
                    return params.data;
                },
                showfilterrow: true,
                filterable: true,
                showtoolbar: true,
                autorowheight: true,
                rendered: function (type) {
                    if (type == "full") {
                        var data = $('#divGridDescargaMarcacionesRango').jqxGrid('getrowdata', 0);
                        if(data!=null){
                            $("#txtFechaIniDescarga").val(fechaIni);
                            $("#txtFechaFinDescarga").val(fechaFin);
                        }

                    }
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
                        width: 80,
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
                        text: 'Fecha',
                        datafield: 'fecha',
                        filtertype: 'range',
                        width:90,
                        cellsalign: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Hora',
                        filtertype: 'checkedlist',
                        datafield: 'hora',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'M&aacute;quina',
                        filtertype: 'checkedlist',
                        datafield: 'maquina',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Usuario Descarga',
                        filtertype: 'checkedlist',
                        datafield: 'usuario',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Fecha Descarga',
                        datafield: 'fecha_reg',
                        filtertype: 'range',
                        width:90,
                        cellsalign: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Fecha Ini Rango',
                        datafield: 'fecha_ini_rango',
                        filtertype: 'range',
                        width:90,
                        cellsalign: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Fecha Fin Rango',
                        datafield: 'fecha_fin_rango',
                        filtertype: 'range',
                        width:90,
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
                        hidden: true
                    }
                ]
            });
        var listSource = [
            {label: 'Nombres', value: 'nombres', checked: true},
            {label: 'CI', value: 'ci', checked: true},
            {label: 'Expd', value: 'expd', checked: true},
            {label: 'Gesti&oacute;n', value: 'gestion', checked: true},
            {label: 'Mes', value: 'mes_nombre', checked: true},
            {label: 'Fecha', value: 'fecha', checked: true},
            {label: 'Hora', value: 'hora', checked: true},
            {label: 'M&aacute;quina', value: 'maquina', checked: true},
            {label: 'Usuario Descarga', value: 'usuario', checked: false},
            {label: 'Fecha Descarga', value: 'fecha_reg', checked: false},
            {label: 'Fecha Ini Rango', value: 'fecha_ini_rango', checked: false},
            {label: 'Fecha Fin Rango', value: 'fecha_fin_rango', checked: false},
            {label: 'Observaci&oacute;n', value: 'observacion', checked: false}
        ];
        $("#divListBoxDescargasRango").jqxListBox({source: listSource, width: "100%", height: 430, checkboxes: true});
        $("#divListBoxDescargasRango").on('checkChange', function (event) {
            $("#divGridDescargaMarcacionesRango").jqxGrid('beginupdate');
            if (event.args.checked) {
                $("#divGridDescargaMarcacionesRango").jqxGrid('showcolumn', event.args.value);
            }
            else {
                $("#divGridDescargaMarcacionesRango").jqxGrid('hidecolumn', event.args.value);
            }
            $("#divGridDescargaMarcacionesRango").jqxGrid('endupdate');
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