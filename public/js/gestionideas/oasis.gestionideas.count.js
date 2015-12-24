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
            {name: 'publicaciones', type: 'numeric'},
            {name: 'publicaciones_descripcion', type: 'string'}
        ],
        url: '/gestionideas/listcount?id_r='+idRelaboral+'&id_p='+idPersona+'&g='+gestion+'&m='+mes,
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
                        width: 150,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Publicaciones',
                        filtertype: 'checkedlist',
                        datafield: 'publicaciones_descripcion',
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
                        hidden: true
                    },
                    {
                        text: 'Departamento',
                        filtertype: 'checkedlist',
                        datafield: 'departamento_administrativo',
                        width: 220,
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: '&Aacute;rea',
                        filtertype: 'checkedlist',
                        datafield: 'area',
                        width: 220,
                        align: 'center',
                        hidden: true
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
                        text: 'Fuente',
                        filtertype: 'checkedlist',
                        datafield: 'fin_partida',
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
                        text: 'Cargo',
                        columntype: 'textbox',
                        filtertype: 'input',
                        datafield: 'cargo',
                        width: 215,
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Haber',
                        filtertype: 'checkedlist',
                        datafield: 'sueldo',
                        width: 100,
                        cellsalign: 'right',
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Fecha Ingreso',
                        datafield: 'fecha_ing',
                        filtertype: 'range',
                        width: 100,
                        cellsalign: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Fecha Inicio',
                        datafield: 'fecha_ini',
                        filtertype: 'range',
                        width: 100,
                        cellsalign: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Fecha Incor.',
                        datafield: 'fecha_incor',
                        filtertype: 'range',
                        width: 100,
                        cellsalign: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        align: 'center',
                        hidden: true
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
                        text: 'Fecha Baja',
                        datafield: 'fecha_baja',
                        filtertype: 'range',
                        width: 100,
                        cellsalign: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        align: 'center',
                        hidden: true
                    },
                    {text: 'Motivo Baja', datafield: 'motivo_baja', width: 100, hidden: true},
                    {text: 'Observacion', datafield: 'observacion', width: 100, hidden: true},
                ]
            });
        var listSource = [
            {label: 'Ubicaci&oacute;n', value: 'ubicacion', checked: true},
            {label: 'Condici&oacute;n', value: 'condicion', checked: true},
            {label: 'Estado', value: 'estado_descripcion', checked: true},
            {label: 'Nombres y Apellidos', value: 'nombres', checked: true},
            {label: 'CI', value: 'ci', checked: true},
            {label: 'Exp', value: 'expd', checked: true},
            {label: 'Gestion', value: 'gestion', checked: true},
            {label: 'Mes', value: 'mes_nombre', checked: true},
            {label: 'Publicaci&oacute;n', value: 'publicaciones_descripcion', checked: true},
            {label: 'Gerencia', value: 'gerencia_administrativa', checked: false},
            {label: 'Departamento', value: 'departamento_administrativo', checked: false},
            {label: '&Aacute;rea', value: 'area', checked: false},
            {label: 'proceso', value: 'proceso_codigo', checked: false},
            {label: 'Fuente', value: 'fin_partida', checked: false},
            {label: 'Nivel Salarial', value: 'nivelsalarial', checked: false},
            {label: 'Cargo', value: 'cargo', checked: false},
            {label: 'Haber', value: 'sueldo', checked: false},
            {label: 'Fecha Ingreso', value: 'fecha_ing', checked: false},
            {label: 'Fecha Inicio', value: 'fecha_ini', checked: false},
            {label: 'Fecha Incor.', value: 'fecha_incor', checked: false},
            {label: 'Fecha Fin', value: 'fecha_fin', checked: false},
            {label: 'Fecha Baja', value: 'fecha_baja', checked: false},
            {label: 'Motivo Baja', value: 'motivo_baja', checked: false},
            {label: 'Observacion', value: 'observacion', checked: false}
        ];
        $("#divListBoxConteo").jqxListBox({source: listSource, width: "100%", height: 430, checkboxes: true});
        $("#divListBoxConteo").on('checkChange', function (event) {
            $("#divGridRelaboralesConteo").jqxGrid('beginupdate');
            if (event.args.checked) {
                $("#divGridRelaboralesConteo").jqxGrid('showcolumn', event.args.value);
            }
            else {
                $("#divGridRelaboralesConteo").jqxGrid('hidecolumn', event.args.value);
            }
            $("#divGridRelaboralesConteo").jqxGrid('endupdate');
        });
    }
}
/**
 * Función para la carga del combo de gestiones en función de si es para la generación de nuevas planillas o para la vista de planillas generadas.
 * Dada que la función es indistinta para planillas salariales y de refrigerio son usadas para este propósito.
 * @param option
 */
function cargarGestionesParaCalculo(option,g){
    var sufijo = "Count";
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
function cargarMesesParaCalculo(option,g,m){
    var sufijo = "Count";
    var lista = "";
    $("#lstMes"+sufijo).html("");
    $("#lstMes"+sufijo).append("<option value=''>Seleccionar</option>");
    $("#lstMes"+sufijo).prop("disabled",true);
    var selected = "";
    if(g>0){
        $.ajax({
            url: '/gestionideas/getmesesgeneracion/',
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
    if(lista!=''){
        $("#lstMes"+sufijo).append(lista);
        $("#lstMes"+sufijo).prop("disabled",false);
    }
    else $("#lstMes"+sufijo).prop("disabled",true);
}
/**
 * Función para la validación del formulario de búsqueda de ideas por mes.
 */
function validarFormularioBusqueda(){
    var ok=true;
    $("#divGestionCount").removeClass("error");
    $("#helpErrorGestionCount").removeClass("error");
    $("#helpErrorGestionCount").html("");
    $("#divMesCount").removeClass("error");
    $("#helpErrorMesCount").removeClass("error");
    $("#helpErrorMesCount").html("");
    var gestion = 0;
    var mes = 0;
    var focable=null;
    if($("#lstGestionCount").val()>0){
        gestion = $("#lstGestionCount").val();
    }
    if($("#lstMesCount").val()>0){
        mes = $("#lstMesCount").val();
    }
    if(gestion<=0){
        ok=false;
        $("#divGestionCount").addClass("error");
        $("#helpErrorGestionCount").addClass("error");
        $("#helpErrorGestionCount").html("Debe seleccionar la gesti&oacute;n necesariamente.");
        focable = $("#divGestionCount");
    }
    if(mes<=0){
        ok=false;
        $("#divMesCount").addClass("error");
        $("#helpErrorMesCount").addClass("error");
        $("#helpErrorMesCount").html("Debe seleccionar el mes necesariamente.");
        if(focable==null){
            focable = $("#divMesCount");
        }
    }
    if(focable!=null)focable.focus();
    return ok;
}