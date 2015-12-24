/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  07-12-2015
 */
/**
 * Función para la definición de la grilla que contiene la lista de registros de control de excepciones de modo general para una gestión y mes determinados.
 * @param gestion
 * @param mes
 */
function definirGrillaParaListaControlExcepcionesGeneral(gestion, mes) {
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
            {name: 'id_condicion', type: 'integer'},
            {name: 'condicion', type: 'string'},
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

            {name: 'id', type: 'integer'},
            {name: 'controlexcepcion_fecha_ini', type: 'date'},
            {name: 'controlexcepcion_hora_ini', type: 'time'},
            {name: 'controlexcepcion_fecha_fin', type: 'date'},
            {name: 'controlexcepcion_hora_fin', type: 'time'},
            {name: 'justificacion', type: 'string'},
            {name: 'turno', type: 'integer'},
            {name: 'turno_descripcion', type: 'string'},
            {name: 'entrada_salida', type: 'integer'},
            {name: 'entrada_salida_descripcion', type: 'string'},
            {name: 'controlexcepcion_observacion', type: 'string'},
            {name: 'controlexcepcion_estado', type: 'string'},
            {name: 'controlexcepcion_estado_descripcion', type: 'string'},
            {name: 'controlexcepcion_user_reg_id', type: 'numeric'},
            {name: 'controlexcepcion_user_registrador', type: 'string'},
            {name: 'controlexcepcion_fecha_reg', type: 'timestamp'},
            {name: 'controlexcepcion_user_ver_id', type: 'numeric'},
            {name: 'controlexcepcion_user_verificador', type: 'string'},
            {name: 'controlexcepcion_fecha_ver', type: 'timestamp'},
            {name: 'controlexcepcion_user_apr_id', type: 'numeric'},
            {name: 'controlexcepcion_user_aprobador', type: 'string'},
            {name: 'controlexcepcion_fecha_apr', type: 'timestamp'},
            {name: 'controlexcepcion_user_mod_id', type: 'numeric'},
            {name: 'controlexcepcion_user_modificador', type: 'string'},
            {name: 'controlexcepcion_fecha_mod', type: 'timestamp'},
            {name: 'excepcion_id', type: 'integer'},
            {name: 'excepcion', type: 'string'},
            {name: 'tipoexcepcion_id', type: 'integer'},
            {name: 'tipo_excepcion', type: 'string'},
            {name: 'genero_id', type: 'integer'},
            {name: 'excepcion_genero', type: 'string'},
            {name: 'cantidad', type: 'numeric'},
            {name: 'unidad', type: 'string'},
            {name: 'fraccionamiento', type: 'string'},
            {name: 'frecuencia_descripcion', type: 'string'},
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
            {name: 'controlexcepcion_observacion', type: 'string'},
            {name: 'estado', type: 'string'},
            {name: 'estado_descripcion', type: 'string'}
        ],
        url: '/controlexcepciones/listbyyearandmonth?gestion=' + gestion + '&mes=' + mes,
        cache: false//,
        //root: 'Rows'//,
        /*beforeprocessing: function (data) {
         source.totalrecords = data[0].TotalRows;
         },*/
        /*filter: function()
         {
         // Actualiza la grilla y reenvia los datos actuales al servidor
         $("#divControlExcepcionCount").jqxGrid('updatebounddata', 'filter');
         },
         sort: function()
         {
         // Actualiza la grilla y reenvia los datos actuales al servidor
         $("#divControlExcepcionCount").jqxGrid('updatebounddata', 'sort');
         }*/
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    cargarRegistrosDeControlDeExcepciones();
    function cargarRegistrosDeControlDeExcepciones() {
        var theme = prepareSimulator("grid");
        $("#divControlExcepcionCount").jqxGrid(
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
                pagesize: 10,
                //virtualmode: true,
                /*rendergridrows: function (params) {
                 return params.data;
                 },*/
                showfilterrow: true,
                filterable: true,
                showtoolbar: true,
                autorowheight: true,
                rendertoolbar: function (toolbar) {
                    var me = this;
                    var container = $("<div></div>");
                    toolbar.append(container);
                    container.append("<button title='Actualizar Grilla' id='refreshcontrolexceptrowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-refresh fa-2x text-info' title='Refrescar Grilla.'/></i></button>");

                    $("#refreshcontrolexceptrowbutton").jqxButton();
                    var genero_id = 0;
                    $("#hdnIdControlExcepcionEdit").val(0);
                    $("#hdnIdRelaboralNew").val(0);
                    $("#hdnIdRelaboralEdit").val(0);
                    $("#lblObservacionNew").text("Observaciones:");
                    $("#lblObservacionEdit").text("Observaciones:");
                    $("#txtObservacionNew").prop("placeholder", "Observaciones...");
                    $("#txtObservacionEdit").prop("placeholder", "Observaciones...");
                    /* Actualizar grilla */
                    $("#refreshcontrolexceptrowbutton").off();
                    $("#refreshcontrolexceptrowbutton").on('click', function () {
                        $("#divControlExcepcionCount").jqxGrid("updatebounddata");
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
                        text: 'Ubicaci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'ubicacion',
                        width: 150,
                        cellsalign: 'center',
                        align: 'center',
                        columngroup: 'datosContrato',
                        hidden: false
                    },
                    {
                        text: 'Condici&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'condicion',
                        width: 150,
                        cellsalign: 'center',
                        align: 'center',
                        columngroup: 'datosContrato',
                        hidden: true
                    },
                    {
                        text: 'Estado Contrato',
                        filtertype: 'checkedlist',
                        datafield: 'estado_descripcion',
                        width: 100,
                        cellsalign: 'center',
                        align: 'center',
                        columngroup: 'datosContrato',
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
                        columngroup: 'datosContrato',
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
                        columngroup: 'datosContrato',
                        hidden: false
                    },
                    {
                        text: 'Exp',
                        filtertype: 'checkedlist',
                        datafield: 'expd',
                        width: 40,
                        cellsalign: 'center',
                        align: 'center',
                        columngroup: 'datosContrato',
                        hidden: false
                    },
                    {
                        text: 'Gerencia',
                        filtertype: 'checkedlist',
                        datafield: 'gerencia_administrativa',
                        width: 220,
                        align: 'center',
                        columngroup: 'datosContrato',
                        hidden: false
                    },
                    {
                        text: 'Departamento',
                        filtertype: 'checkedlist',
                        datafield: 'departamento_administrativo',
                        width: 220,
                        align: 'center',
                        columngroup: 'datosContrato',
                        hidden: false
                    },
                    {
                        text: '&Aacute;rea',
                        filtertype: 'checkedlist',
                        datafield: 'area',
                        width: 220,
                        align: 'center',
                        columngroup: 'datosContrato',
                        hidden: true
                    },
                    {
                        text: 'Proceso',
                        filtertype: 'checkedlist',
                        datafield: 'proceso_codigo',
                        width: 220,
                        cellsalign: 'center',
                        align: 'center',
                        columngroup: 'datosContrato',
                        hidden: true
                    },
                    {
                        text: 'Fuente',
                        filtertype: 'checkedlist',
                        datafield: 'fin_partida',
                        width: 220,
                        cellsalign: 'center',
                        align: 'center',
                        columngroup: 'datosContrato',
                        hidden: true
                    },
                    {
                        text: 'Nivel Salarial',
                        filtertype: 'checkedlist',
                        datafield: 'nivelsalarial',
                        width: 220,
                        align: 'center',
                        columngroup: 'datosContrato',
                        hidden: true
                    },
                    {
                        text: 'Cargo',
                        columntype: 'textbox',
                        filtertype: 'input',
                        datafield: 'cargo',
                        width: 215,
                        align: 'center',
                        columngroup: 'datosContrato',
                        hidden: false
                    },
                    {
                        text: 'Haber',
                        filtertype: 'checkedlist',
                        datafield: 'sueldo',
                        width: 100,
                        cellsalign: 'right',
                        align: 'center',
                        columngroup: 'datosContrato',
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
                        columngroup: 'datosContrato',
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
                        columngroup: 'datosContrato',
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
                        columngroup: 'datosContrato',
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
                        columngroup: 'datosContrato',
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
                        columngroup: 'datosContrato',
                        hidden: false
                    },
                    {
                        text: 'Motivo Baja',
                        datafield: 'motivo_baja',
                        width: 100,
                        columngroup: 'datosContrato',
                        hidden: false
                    },
                    {
                        text: 'Observaci&oacute;n Contrato',
                        datafield: 'observacion',
                        width: 100,
                        columngroup: 'datosContrato',
                        hidden: false
                    },
                    {
                        text: 'Estado Control Excepci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'controlexcepcion_estado_descripcion',
                        width: 90,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false,
                        columngroup: 'datosControlExcepcion',
                        cellclassname: cellclass
                    },
                    {
                        text: 'Tipo Excepci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'tipo_excepcion',
                        width: 100,
                        cellsalign: 'center',
                        align: 'center',
                        columngroup: 'datosControlExcepcion',
                        hidden: false
                    },
                    {
                        text: 'Excepci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'excepcion',
                        width: 200,
                        cellsalign: 'justify',
                        align: 'center',
                        columngroup: 'datosControlExcepcion',
                        hidden: false
                    },
                    {
                        text: 'C&oacute;digo',
                        filtertype: 'checkedlist',
                        datafield: 'codigo',
                        width: 120,
                        align: 'center',
                        cellsalign: 'center',
                        columngroup: 'datosControlExcepcion',
                        hidden: false
                    },
                    {
                        text: 'Color',
                        datafield: 'color',
                        width: 80,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false,
                        columngroup: 'datosControlExcepcion',
                        cellsrenderer: cellsrenderer

                    },

                    {
                        text: 'Fecha Inicio',
                        datafield: 'controlexcepcion_fecha_ini',
                        filtertype: 'range',
                        width: 100,
                        cellsalign: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        align: 'center',
                        columngroup: 'datosControlExcepcion',
                        hidden: false
                    },
                    {
                        text: 'Hora Inicio',
                        filtertype: 'checkedlist',
                        datafield: 'controlexcepcion_hora_ini',
                        width: 100,
                        cellsalign: 'center',
                        align: 'center',
                        columngroup: 'datosControlExcepcion',
                        hidden: false
                    },
                    {
                        text: 'Fecha Fin',
                        datafield: 'controlexcepcion_fecha_fin',
                        filtertype: 'range',
                        width: 100,
                        cellsalign: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        align: 'center',
                        columngroup: 'datosControlExcepcion',
                        hidden: false
                    },
                    {
                        text: 'Hora Fin',
                        filtertype: 'checkedlist',
                        datafield: 'controlexcepcion_hora_fin',
                        width: 100,
                        cellsalign: 'center',
                        align: 'center',
                        columngroup: 'datosControlExcepcion',
                        hidden: false
                    },
                    {
                        text: 'G&eacute;nero',
                        filtertype: 'checkedlist',
                        datafield: 'excepcion_genero',
                        width: 100,
                        align: 'center',
                        cellsalign: 'center',
                        columngroup: 'datosControlExcepcion',
                        hidden: false
                    },
                    {
                        text: 'Frecuencia',
                        filtertype: 'checkedlist',
                        datafield: 'frecuencia_descripcion',
                        width: 80,
                        align: 'center',
                        cellsalign: 'center',
                        columngroup: 'datosControlExcepcion',
                        hidden: false
                    },
                    {
                        text: 'Compensar Horas',
                        filtertype: 'checkedlist',
                        datafield: 'compensatoria_descripcion',
                        width: 100,
                        align: 'center',
                        cellsalign: 'center',
                        columngroup: 'datosControlExcepcion',
                        hidden: false
                    },
                    {
                        text: 'Contr. Horario',
                        filtertype: 'checkedlist',
                        datafield: 'horario_descripcion',
                        width: 100,
                        align: 'center',
                        cellsalign: 'center',
                        columngroup: 'datosControlExcepcion',
                        hidden: false
                    },
                    {
                        text: 'Refrigerio',
                        filtertype: 'checkedlist',
                        datafield: 'refrigerio_descripcion',
                        width: 100,
                        align: 'center',
                        cellsalign: 'center',
                        columngroup: 'datosControlExcepcion',
                        hidden: false
                    },
                    {
                        text: 'Turno',
                        filtertype: 'checkedlist',
                        datafield: 'turno_descripcion',
                        width: 100,
                        align: 'center',
                        cellsalign: 'center',
                        columngroup: 'datosControlExcepcion',
                        hidden: false
                    },
                    {
                        text: 'E/S',
                        filtertype: 'checkedlist',
                        datafield: 'entrada_salida_descripcion',
                        width: 100,
                        align: 'center',
                        cellsalign: 'center',
                        columngroup: 'datosControlExcepcion',
                        hidden: false
                    },
                    {
                        text: 'Solicitante',
                        filtertype: 'checkedlist',
                        datafield: 'controlexcepcion_user_registrador',
                        width: 100,
                        align: 'center',
                        cellsalign: 'justify',
                        columngroup: 'datosControlExcepcion',
                        hidden: false
                    },
                    {
                        text: 'Fecha Sol.',
                        filtertype: 'checkedlist',
                        datafield: 'controlexcepcion_fecha_reg',
                        width: 100,
                        align: 'center',
                        cellsformat: 'dd-MM-yyyy h:i:s',
                        cellsalign: 'center',
                        columngroup: 'datosControlExcepcion',
                        hidden: false
                    },
                    {
                        text: 'Verificador',
                        filtertype: 'checkedlist',
                        datafield: 'controlexcepcion_user_verificador',
                        width: 100,
                        align: 'center',
                        cellsalign: 'justify',
                        columngroup: 'datosControlExcepcion',
                        hidden: false
                    },
                    {
                        text: 'Fecha Ver.',
                        filtertype: 'checkedlist',
                        datafield: 'controlexcepcion_fecha_ver',
                        width: 100,
                        align: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        cellsalign: 'center',
                        columngroup: 'datosControlExcepcion',
                        hidden: false
                    },
                    {
                        text: 'Aprobador',
                        filtertype: 'checkedlist',
                        datafield: 'controlexcepcion_user_aprobador',
                        width: 100,
                        align: 'center',
                        cellsalign: 'justify',
                        columngroup: 'datosControlExcepcion',
                        hidden: false
                    },
                    {
                        text: 'Fecha Apr.',
                        filtertype: 'checkedlist',
                        datafield: 'controlexcepcion_fecha_apr',
                        width: 100,
                        align: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        cellsalign: 'center',
                        columngroup: 'datosControlExcepcion',
                        hidden: false
                    },
                    {
                        text: 'Observaci&oacute;n Control Excepci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'controlexcepcion_observacion',
                        width: 100,
                        align: 'center',
                        columngroup: 'datosControlExcepcion',
                        hidden: false
                    },
                ],
                columngroups: [
                    {text: 'Datos Contrato', align: 'center', name: 'datosContrato'},
                    {text: 'Datos Control Excepci&oacute;n', align: 'center', name: 'datosControlExcepcion'}
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
            {label: 'Observacion', value: 'observacion', checked: true},
            {label: 'Estado Control Excepci&oacute;n', value: 'controlexcepcion_estado_descripcion', checked: true},
            {label: 'Tipo Excepci&oacute;n', value: 'tipo_excepcion', checked: true},
            {label: 'Excepci&oacute;n', value: 'excepcion', checked: true},
            {label: 'C&oacute;digo', value: 'codigo', checked: true},
            {label: 'Color', value: 'color', checked: true},
            {label: 'Fecha Inicio', value: 'controlexcepcion_fecha_ini', checked: true},
            {label: 'Hora Inicio', value: 'controlexcepcion_hora_ini', checked: true},
            {label: 'Fecha Fin', value: 'controlexcepcion_fecha_fin', checked: true},
            {label: 'Hora Fin', value: 'controlexcepcion_hora_fin', checked: true},
            {label: 'G&eacute;nero', value: 'excepcion_genero', checked: true},
            {label: 'Frecuencia', value: 'frecuencia_descripcion', checked: true},
            {label: 'Compensar Horas', value: 'compensatoria_descripcion', checked: true},
            {label: 'Contr. Horario', value: 'horario_descripcion', checked: true},
            {label: 'Refrigerio', value: 'refrigerio_descripcion', checked: true},
            {label: 'Turno', value: 'turno_descripcion', checked: true},
            {label: 'E/S', value: 'entrada_salida_descripcion', checked: true},
            {label: 'Solicitante', value: 'controlexcepcion_user_registrador', checked: true},
            {label: 'Fecha Sol.', value: 'controlexcepcion_fecha_reg', checked: true},
            {label: 'Verificador', value: 'controlexcepcion_user_verificador', checked: true},
            {label: 'Fecha Ver.', value: 'controlexcepcion_fecha_ver', checked: true},
            {label: 'Aprobador', value: 'controlexcepcion_user_aprobador', checked: true},
            {label: 'Observaci&oacute;n Control Excepci&oacute;n', value: 'controlexcepcion_observacion', checked: true}
        ];
        $("#divControlExceptionListBox").jqxListBox({source: listSource, width: "100%", height: 430, checkboxes: true});
        $("#divControlExceptionListBox").on('checkChange', function (event) {
            $("#divControlExcepcionCount").jqxGrid('beginupdate');
            if (event.args.checked) {
                $("#divControlExcepcionCount").jqxGrid('showcolumn', event.args.value);
            }
            else {
                $("#divControlExcepcionCount").jqxGrid('hidecolumn', event.args.value);
            }
            $("#divControlExcepcionCount").jqxGrid('endupdate');
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
var cellsrenderer = function (row, column, value, defaultHtml) {
    var element = $(defaultHtml);
    element.css({'background-color': value});
    return element[0].outerHTML;
    return defaultHtml;
}

/**
 * Función para la carga del combo de gestiones en función de si es para la generación de nuevas planillas o para la vista de planillas generadas.
 * Dada que la función es indistinta para planillas salariales y de refrigerio son usadas para este propósito.
 * @param option
 */
function cargarGestionesParaCalculo(option, g) {
    var sufijo = "Count";
    var lista = "";
    $("#lstGestion" + sufijo).html("");
    $("#lstGestion" + sufijo).append("<option value=''>Seleccionar</option>");
    $("#lstGestion" + sufijo).prop("disabled", false);
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
                    if (g == gestion)selected = "selected";
                    else selected = "";
                    lista += "<option value='" + gestion + "' " + selected + ">" + gestion + "</option>";
                });
            }
            return res;
        }
    });
    if (lista != '')$("#lstGestion" + sufijo).append(lista);
    else $("#lstGestion" + sufijo).prop("disabled", true);
}
/**
 * Función para obtener el listado de meses disponibles para la generación de planillas de refrigerio
 * en consideración a una gestion en particular.
 * @param option
 * @param g
 * @param m
 */
function cargarMesesParaCalculo(option, g, m) {
    var sufijo = "Count";
    var lista = "";
    $("#lstMes" + sufijo).html("");
    $("#lstMes" + sufijo).append("<option value=''>Seleccionar</option>");
    $("#lstMes" + sufijo).prop("disabled", true);
    var selected = "";
    if (g > 0) {
        $.ajax({
            url: '/gestionideas/getmesesgeneracion/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {gestion: g},
            success: function (data) {
                var res = jQuery.parseJSON(data);
                if (res.length > 0) {
                    $.each(res, function (key, val) {
                        if (m == val.mes)selected = "selected";
                        else selected = "";
                        lista += "<option value='" + val.mes + "' " + selected + ">" + val.mes_nombre + "</option>";
                    });
                }
            }
        });
    }
    if (lista != '') {
        $("#lstMes" + sufijo).append(lista);
        $("#lstMes" + sufijo).prop("disabled", false);
    }
    else $("#lstMes" + sufijo).prop("disabled", true);
}
/**
 * Función para la validación del formulario de búsqueda de ideas por mes.
 */
function validarFormularioBusqueda() {
    var ok = true;
    $("#divGestionCount").removeClass("error");
    $("#helpErrorGestionCount").removeClass("error");
    $("#helpErrorGestionCount").html("");
    $("#divMesCount").removeClass("error");
    $("#helpErrorMesCount").removeClass("error");
    $("#helpErrorMesCount").html("");
    var gestion = 0;
    var mes = 0;
    var focable = null;
    if ($("#lstGestionCount").val() > 0) {
        gestion = $("#lstGestionCount").val();
    }
    if ($("#lstMesCount").val() > 0) {
        mes = $("#lstMesCount").val();
    }
    if (gestion <= 0) {
        ok = false;
        $("#divGestionCount").addClass("error");
        $("#helpErrorGestionCount").addClass("error");
        $("#helpErrorGestionCount").html("Debe seleccionar la gesti&oacute;n necesariamente.");
        focable = $("#divGestionCount");
    }
    if (mes <= 0) {
        ok = false;
        $("#divMesCount").addClass("error");
        $("#helpErrorMesCount").addClass("error");
        $("#helpErrorMesCount").html("Debe seleccionar el mes necesariamente.");
        if (focable == null) {
            focable = $("#divMesCount");
        }
    }
    if (focable != null)focable.focus();
    return ok;
}