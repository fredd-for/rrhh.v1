/**
 * Función para el despliegue de la lista de registros de relación laboral relacionados al conteo de publicación de ideas de negocio.
 * @param idRelaboral
 * @param idPersona
 * @param gestion
 * @param mes
 */
function definirGrillaParaListaRelaboralesConteoIdeas(idRelaboral,idPersona,gestion,mes) {
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
            {name: 'fecha_ing', type: 'date'},
            {name: 'gestion', type: 'integer'},
            {name: 'mes', type: 'integer'},
            {name: 'mes_nombre', type: 'string'},
            {name: 'publicaciones', type: 'integer'}
        ],
        url: '/gestionideas/listcount',
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    cargarRegistrosDeRelacionesLaborales();
    function cargarRegistrosDeRelacionesLaborales() {
        var theme = prepareSimulator("grid");
        $("#divGridRelaboralesConteo").jqxGrid(
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
                    /*container.append("<button id='listrowbutton' class='btn btn-sm btn-primary' type='button'  title='Listado de Ideas por Relaci&oacute;n Laboral.'><i class='fa fa-comment-o fa-2x text-info' title='Listado de Ideas por Relaci&oacute;n Laboral.'/></i> Ideas por Persona</button>");
                    container.append("<button id='countrowbutton' class='btn btn-sm btn-primary' type='button'  title='Control de las cantidades de Ideas publicadas por Relaci&oacute;n Laboral por gesti&oacute;n y mes.'><i class='fa fa-bar-chart-o fa-2x text-info' title='Listado de Ideas por Relaci&oacute;n Laboral, gesti&oacute;n y mes.'/></i> Control de Publicaciones</button>");
                    $("#listrowbutton").jqxButton();
                    $("#countrowbutton").jqxButton();*/

                    /* Listado de registros de relación laboral.*/
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
                                    $('#divTabGestionIdeas').jqxTabs('enableAt', 0);

                                    $('#divTabGestionIdeas').jqxTabs('disableAt', 2);
                                    $('#divTabGestionIdeas').jqxTabs('disableAt', 3);
                                    $('#divTabGestionIdeas').jqxTabs('disableAt', 4);

                                    $('#divTabGestionIdeas').jqxTabs('enableAt', 1);
                                    /**
                                     * Trasladamos el item seleccionado al que corresponde, el de vistas.
                                     */
                                    $('#divTabGestionIdeas').jqxTabs({selectedItem: 1});
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
                                    cargarPersonasContactosGestionIdeas(1,dataRecord.id_persona);
                                    $("#hdnIdRelaboralVista").val(idRelaboral);
                                    $("#hdnSwPrimeraVistaHistorial").val(0);
                                    $("#divContent_" + dataRecord.id_relaboral).focus().select();
                                    definirGrillaParaListaGestionIdeasPorPersona(dataRecord);
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

                    /* Cuantificador de publicaciones mensuales de ideas*/
                    $("#countrowbutton").off();
                    $("#countrowbutton").on('click', function () {
                        $('#divTabGestionIdeas').jqxTabs('enableAt', 0);
                        $('#divTabGestionIdeas').jqxTabs('disableAt', 1);
                        $('#divTabGestionIdeas').jqxTabs('disableAt', 2);
                        $('#divTabGestionIdeas').jqxTabs('disableAt', 3);
                        $('#divTabGestionIdeas').jqxTabs('enableAt', 4);
                        $('#divTabGestionIdeas').jqxTabs({selectedItem: 4});
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
                    {
                        text: 'Gesti&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'gestion',
                        width: 70,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Mes',
                        filtertype: 'checkedlist',
                        datafield: 'mes_nombre',
                        width: 70,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Publicaciones',
                        filtertype: 'checkedlist',
                        datafield: 'publicaciones',
                        width: 70,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
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
            {label: 'Observacion', value: 'observacion', checked: true}
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