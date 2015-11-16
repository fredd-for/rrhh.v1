/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  06-11-2015
 */
/**
 * Función para la definición de la grilla que contiene la lista de registros de Ideas de Negocio de toda la empresa ordenados por el puntaje obtenido.
 * @param dataRecord
 */
function definirGrillaParaListaGestionIdeasAll(gestion,mes) {
    var source =
    {
        datatype: "json",
        datafields: [
            {name: 'nro_row', type: 'integer'},
            {name: 'id', type: 'integer'},
            {name: 'padre_id', type: 'integer'},
            {name: 'relaboral_id', type: 'integer'},
            {name: 'rubro_id', type: 'integer'},
            {name: 'tipo_negocio', type: 'integer'},
            {name: 'tipo_negocio_descripcion', type: 'string'},
            {name: 'gestion', type: 'intege'},
            {name: 'mes', type: 'integer'},
            {name: 'mes_nombre', type: 'string'},
            {name: 'numero', type: 'integer'},
            {name: 'titulo', type: 'string'},
            {name: 'resumen', type: 'string'},
            {name: 'descripcion', type: 'string'},
            {name: 'inversion', type: 'string'},
            {name: 'beneficios', type: 'string'},
            {name: 'puntuacion_a', type: 'numeric'},
            {name: 'puntuacion_a_descripcion', type: 'string'},
            {name: 'puntuacion_b', type: 'numeric'},
            {name: 'puntuacion_b_descripcion', type: 'string'},
            {name: 'puntuacion_c', type: 'numeric'},
            {name: 'puntuacion_c_descripcion', type: 'string'},
            {name: 'puntuacion_d', type: 'numeric'},
            {name: 'puntuacion_d_descripcion', type: 'string'},
            {name: 'puntuacion_e', type: 'numeric'},
            {name: 'puntuacion_e_descripcion', type: 'string'},
            {name: 'observacion', type: 'string'},
            {name: 'estado', type: 'string'},
            {name: 'estado_descripcion', type: 'string'},
            {name: 'agrupador', type: 'integer'},
            {name: 'user_reg_id', type: 'integer'},
            {name: 'user_reg', type: 'string'},
            {name: 'pseudonimo', type: 'string'},
            {name: 'fecha_reg', type: 'date'},
            {name: 'user_mod_id', type: 'integer'},
            {name: 'user_mod', type: 'string'},
            {name: 'fecha_mod', type: 'date'}
        ],
        url: '/gestionideas/listall?gestion='+gestion+'&mes='+mes,
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    cargarRegistrosDeTolerancias();
    function cargarRegistrosDeTolerancias() {
        var theme = prepareSimulator("grid");
        $("#divGridIdeasAll").jqxGrid(
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
                rendertoolbar: function (toolbar) {
                    var me = this;
                    var container = $("<div></div>");
                    toolbar.append(container);
                    container.append("<button title='Actualizar Grilla' id='refreshidearowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-refresh fa-2x text-info' title='Refrescar Grilla.'/></i> Actualizar</button>");
                    container.append("<button title='Ver registro de Idea de Negocio.' id='viewidearowbutton'  class='btn btn-sm btn-primary' type='button' ><i class='fa fa-search-plus fa-2x text-info' title='Modificar registro.'/> Ver</button>");
                    container.append("<button title='Clasificar Idea de Negocio.' id='qualifyidearowbutton'  class='btn btn-sm btn-primary' type='button' ><i class='fa fa-star fa-2x text-info' title='Clasificar registro.'/> Clasificar</button>");

                    $("#refreshidearowbutton").jqxButton();
                    $("#viewidearowbutton").jqxButton();
                    $("#qualifyidearowbutton").jqxButton();

                    $("#hdnIdRelaboralNew").val(0);
                    $("#hdnIdRelaboralEdit").val(0);
                    $("#hdnIdIdeaEdit").val(0);
                    $("#hdnIdIdeaClasificacion").val(0);

                    $("#refreshidearowbutton").off();
                    $("#refreshidearowbutton").on('click', function () {
                        $("#divGridIdeasAll").jqxGrid("updatebounddata");
                    });
                    /* Ver registro.*/
                    $("#viewidearowbutton").off();
                    $("#viewidearowbutton").on('click', function () {
                        var selectedrowindex = $("#divGridIdeasAll").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridIdeasAll').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                var idRelaboral = dataRecord.relaboral_id;
                                $("#hdnIdIdeaEdit").val(dataRecord.id);
                                /**
                                 * La modificación sólo es admisible si el registro de horario laboral tiene estado EN PROCESO
                                 */
                                if (dataRecord.estado >= 1) {

                                    $('#divTabAllIdeas').jqxTabs('enableAt', 0);
                                    $('#divTabAllIdeas').jqxTabs('enableAt', 1);

                                    $('#divTabAllIdeas').jqxTabs({selectedItem: 1});
                                    $("#hdnIdRelaboralEdit").val(idRelaboral);
                                    limpiarMensajesErrorPorValidacionIdeas(2);
                                    inicializarFormularioGestionIdeasView(2,idRelaboral,dataRecord.id,dataRecord.gestion,dataRecord.mes,dataRecord.tipo_negocio,dataRecord.titulo,dataRecord.resumen,dataRecord.descripcion,dataRecord.inversion,dataRecord.beneficios,dataRecord.puntuacion_a,dataRecord.puntuacion_b,dataRecord.puntuacion_c,dataRecord.puntuacion_d,dataRecord.puntuacion_e,dataRecord.observacion);
                                    $("#lstGestionEdit").prop("disabled","disabled");
                                    $("#lstMesEdit").prop("disabled","disabled");
                                    $("#lstTiposDeNegocioEdit").prop("disabled","disabled");
                                    $("#txtObservacionEdit").focus();
                                } else {
                                    var msje = "Debe seleccionar un registro en estado EN ELABORACION necesariamente.";
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
                    /* Imprimir de baja un registro.*/
                    $("#printidearowbutton").off();
                    $("#printidearowbutton").on('click', function () {
                        var selectedrowindex = $("#divGridIdeasAll").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridIdeasAll').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                /*
                                 *  Para dar de baja un registro, este debe estar inicialmente en estado EN PROCESO, de otro modo no es posible
                                 */
                                if (dataRecord.controlexcepcion_estado >= 1||dataRecord.controlexcepcion_estado < 0) {
                                    if(dataRecord.boleta==1){
                                        exportarFormulario(dataRecord.id);
                                    }else {
                                        var msje = "Usted no tiene los permisos suficientes para modificar este tipo de excepciones. Consulte con Personal de Control de Personal o el Administrador.";
                                        $("#divMsjePorError").html("");
                                        $("#divMsjePorError").append(msje);
                                        $("#divMsjeNotificacionError").jqxNotification("open");
                                    }
                                } else {
                                    var msje = "El formulario no puede ser visible en este estado "+dataRecord.controlexcepcion_estado_descripcion+".";
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
                    /* Clasificar una Idea de Negocio.*/
                    $("#qualifyidearowbutton").off();
                    $("#qualifyidearowbutton").on('click', function () {
                        var selectedrowindex = $("#divGridIdeasAll").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridIdeasAll').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                var idIdea = dataRecord.id;
                                if(idIdea>0){
                                    $("#hdnIdIdeaClasificacion").val(idIdea);
                                    /*
                                     *  Para dar de baja un registro, este debe estar inicialmente en estado CONCLUIDO, de otro modo no es posible
                                     */
                                    var puntuacion = 0;
                                    if(dataRecord.puntuacion_a!=null){
                                        puntuacion = dataRecord.puntuacion_a;
                                    }
                                    /*$('#rtClasificacion').rating('refresh', {disabled: false, showClear: true, showCaption: true});*/
                                    $('#rtClasificacion').rating('update', puntuacion);
                                    $('#popupClasificacion').modal('show');
                                }else{
                                    var msje = "Debe seleccionar un registro necesariamente.";
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
                        text: 'Pseud&oacute;nimo',
                        filtertype: 'checkedlist',
                        datafield: 'pseudonimo',
                        width: 130,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Tipo Negocio',
                        filtertype: 'checkedlist',
                        datafield: 'tipo_negocio_descripcion',
                        width: 100,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Gesti&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'gestion',
                        width: 50,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Mes',
                        filtertype: 'checkedlist',
                        datafield: 'mes_nombre',
                        width: 120,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: '#',
                        datafield: 'numero',
                        width: 30,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false,
                        cellsrenderer: cellsrenderer

                    },

                    {
                        text: 'T&iacute;tulo',
                        datafield: 'titulo',
                        width: 100,
                        cellsalign: 'justify',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Resumen',
                        datafield: 'resumen',
                        width: 100,
                        cellsalign: 'justify',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Planteamiento',
                        datafield: 'descripcion',
                        width: 300,
                        cellsalign: 'justify',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Fecha Reg.',
                        filtertype: 'checkedlist',
                        datafield: 'fecha_reg',
                        width: 100,
                        align: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Observaci&oacute;n',
                        datafield: 'observacion',
                        width: 100,
                        align: 'justify',
                        hidden: false
                    },
                    {
                        text: 'Puntuaci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'puntuacion_a',
                        width: 100,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                ]
            });
        /*var listSource = [
         *//*{label: 'Estado', value: 'estado_descripcion', checked: true},*//*
         {label: 'Tipo Excepci&oacute;n', value: 'tipo_excepcion', checked: true},
         {label: 'Excepci&oacute;n', value: 'excepcion', checked: true},
         {label: 'C&oacute;digo', value: 'codigo', checked: true},
         {label: 'Color', value: 'color', checked: true},
         {label: 'G&eacute;nero', value: 'genero', checked: true},
         {label: 'Frecuencia', value: 'frecuencia_descripcion', checked: true},
         {label: 'Compensar Horas', value: 'compensatoria_descripcion', checked: true},
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
         });*/
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
