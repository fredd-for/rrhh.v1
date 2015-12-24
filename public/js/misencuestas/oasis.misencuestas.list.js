/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  02-12-2015
 */
/**
 * Función para la definición de la grilla que contiene la lista de registros de control de excepciones.
 * @param dataRecord
 */
function definirGrillaParaListaMisEncuestasPorPersona(dataRecordMain) {
    var idRelaboral = dataRecordMain.id_relaboral;
    var genero = dataRecordMain.genero;
    var source =
    {
        datatype: "json",
        datafields: [
            {name: 'nro_row', type: 'integer'},
            {name: 'id_encuesta', type: 'integer'},
            {name: 'codigo', type: 'string'},
            {name: 'titulo', type: 'string'},
            {name: 'descripcion', type: 'string'},
            {name: 'fecha_ini', type: 'date'},
            {name: 'hora_ini', type: 'text'},
            {name: 'fecha_fin', type: 'date'},
            {name: 'hora_fin', type: 'text'},
            {name: 'estado', type: 'string'},
            {name: 'estado_descripcion', type: 'string'},
            {name: 'tiempo_restante_vencido', type: 'string'},
            {name: 'permanentes', type: 'integer'},
            {name: 'permanentes_descripcion', type: 'string'},
            {name: 'eventuales', type: 'integer'},
            {name: 'eventuales_descripcion', type: 'string'},
            {name: 'consultores', type: 'integer'},
            {name: 'consultores_descripcion', type: 'string'},
            {name: 'otros', type: 'integer'},
            {name: 'otros_descripcion', type: 'string'},
            {name: 'gerencia_administrativa_id', type: 'integer'},
            {name: 'gerencia_administrativa', type: 'string'},
            {name: 'departamento_administrativa_id', type: 'integer'},
            {name: 'departamento_administrativa', type: 'string'},
            {name: 'area_id', type: 'integer'},
            {name: 'area', type: 'string'},
            {name: 'ubicacion_id', type: 'integer'},
            {name: 'ubicacion', type: 'string'},
            {name: 'num_preguntas', type: 'numeric'},
            {name: 'num_respondidas', type: 'numeric'},
            {name: 'observacion', type: 'string'}
        ],
        url: '/misencuestas/listenableds?id='+idRelaboral,
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    cargarRegistrosDeTolerancias();
    function cargarRegistrosDeTolerancias() {
        var theme = prepareSimulator("grid");
        $("#divGridEncuestas").jqxGrid(
            {
                theme: theme,
                width: '100%',
                height: '100%',
                source: dataAdapter,
                sortable: true,
                altRows: true,
                groupable: false,
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
                    container.append("<button title='Llenar Encuesta.' id='addpollrowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-file-text fa-2x text-info' title='Llenado de Encuesta.'/></i> Llenar</button>");
                    container.append("<button title='Ver Encuesta.' id='viewpollrowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-file-text fa-2x text-info' title='Ver Encuesta.'/></i> Ver</button>");

                    $("#refreshidearowbutton").jqxButton();
                    $("#addpollrowbutton").jqxButton();
                    $("#viewpollrowbutton").jqxButton();

                    $("#hdnIdRelaboralNew").val(0);
                    $("#hdnIdEncuestaNew").val(0);

                    $("#refreshidearowbutton").off();
                    $("#refreshidearowbutton").on('click', function () {
                        $("#divGridEncuestas").jqxGrid("updatebounddata");
                    });
                    /* Llenar encuesta */
                    $("#addpollrowbutton").off();
                    $("#addpollrowbutton").on('click', function () {
                        var selectedrowindex = $("#divGridEncuestas").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridEncuestas').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                if(dataRecord.estado==1){
                                    if(dataRecord.num_preguntas!=dataRecord.num_respondidas){
                                        cargaCuerpoEncuesta(1,idRelaboral,dataRecord.id_encuesta,dataRecord.titulo,dataRecord.observacion)
                                        $("#hdnIdRelaboralNew").val(idRelaboral);
                                        $("#hdnIdEncuestaNew").val(dataRecord.id_encuesta);
                                        $('#divTabEncuestas').jqxTabs('enableAt', 1);
                                        $('#divTabEncuestas').jqxTabs('disableAt', 2);
                                        $('#divTabEncuestas').jqxTabs({selectedItem: 1});

                                        $("#txtTituloNew").focus();
                                    }else{
                                        var msje = "Usted ya registr&oacute; su opini&oacute;n en la encuesta.";
                                        $("#divMsjePorError").html("");
                                        $("#divMsjePorError").append(msje);
                                        $("#divMsjeNotificacionError").jqxNotification("open");
                                    }
                                }else {
                                    var msje = "El plazo de llenado de la encuesta concluy&oacute;.";
                                    $("#divMsjePorError").html("");
                                    $("#divMsjePorError").append(msje);
                                    $("#divMsjeNotificacionError").jqxNotification("open");
                                }
                            }else{
                                var msje = "Debe seleccionar un registro necesariamente.";
                                $("#divMsjePorError").html("");
                                $("#divMsjePorError").append(msje);
                                $("#divMsjeNotificacionError").jqxNotification("open");
                            }
                        }else{
                            var msje = "Debe seleccionar un registro necesariamente.";
                            $("#divMsjePorError").html("");
                            $("#divMsjePorError").append(msje);
                            $("#divMsjeNotificacionError").jqxNotification("open");
                        }
                    });
                    /* Ver encuesta */
                    $("#viewpollrowbutton").off();
                    $("#viewpollrowbutton").on('click', function () {
                        var selectedrowindex = $("#divGridEncuestas").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridEncuestas').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                if(dataRecord.estado==1){
                                    if(dataRecord.num_preguntas>=dataRecord.num_respondidas){
                                        cargaCuerpoEncuesta(2,idRelaboral,dataRecord.id_encuesta,dataRecord.titulo,dataRecord.observacion)
                                        $("#hdnIdRelaboralView").val(idRelaboral);
                                        $("#hdnIdEncuestaView").val(dataRecord.id_encuesta);
                                        $('#divTabEncuestas').jqxTabs('disableAt', 1);
                                        $('#divTabEncuestas').jqxTabs('enableAt', 2);
                                        $('#divTabEncuestas').jqxTabs({selectedItem: 2});
                                        $("#txtTituloView").focus();
                                    }else{
                                        var msje = "Usted ya registr&oacute; su opini&oacute;n en la encuesta.";
                                        $("#divMsjePorError").html("");
                                        $("#divMsjePorError").append(msje);
                                        $("#divMsjeNotificacionError").jqxNotification("open");
                                    }
                                }else {
                                    var msje = "El plazo de llenado de la encuesta concluy&oacute;.";
                                    $("#divMsjePorError").html("");
                                    $("#divMsjePorError").append(msje);
                                    $("#divMsjeNotificacionError").jqxNotification("open");
                                }
                            }else{
                                var msje = "Debe seleccionar un registro necesariamente.";
                                $("#divMsjePorError").html("");
                                $("#divMsjePorError").append(msje);
                                $("#divMsjeNotificacionError").jqxNotification("open");
                            }
                        }else{
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
                        text: 'Estado',
                        datafield: 'estado_descripcion',
                        width: 120,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Encuesta',
                        datafield: 'titulo',
                        width: 300,
                        cellsalign: 'justify',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Descripci&oacute;n',
                        datafield: 'descripcion',
                        width: 100,
                        cellsalign: 'justify',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Fecha Inicio',
                        datafield: 'fecha_ini',
                        filtertype: 'range',
                        width: 70,
                        cellsalign: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Hora Inicio',
                        filtertype: 'checkedlist',
                        datafield: 'hora_ini',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Fecha Fin',
                        datafield: 'fecha_fin',
                        filtertype: 'range',
                        width: 70,
                        cellsalign: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Hora Fin',
                        filtertype: 'checkedlist',
                        datafield: 'hora_fin',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Tiempo Restante',
                        datafield: 'tiempo_restante_vencido',
                        width: 300,
                        cellsalign: 'justify',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: '# Preguntas',
                        datafield: 'num_preguntas',
                        width: 100,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: '# Preg. Respondidas',
                        datafield: 'num_respondidas',
                        width: 150,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Observaci&oacute;n',
                        datafield: 'observacion',
                        width: 200,
                        cellsalign: 'justify',
                        align: 'center',
                        hidden: false
                    }
                ]
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
