/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  03-03-2015
 */
/**
 * Función para la definición de la grilla que contiene la lista de registros de control de excepciones.
 * @param dataRecord
 */
function definirGrillaParaListaControlExcepcionesPorIdRelaboralPersona(dataRecordMain) {
    var idRelaboral = dataRecordMain.id_relaboral;
    var genero = dataRecordMain.genero;
    var source =
    {
        datatype: "json",
        datafields: [
            {name: 'nro_row', type: 'integer'},
            {name: 'id', type: 'integer'},
            {name: 'fecha_ini', type: 'date'},
            {name: 'hora_ini', type: 'time'},
            {name: 'fecha_fin', type: 'date'},
            {name: 'hora_fin', type: 'time'},
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
            {name: 'controlexcepcion_fecha_reg', type: 'date'},
            {name: 'controlexcepcion_user_ver_id', type: 'numeric'},
            {name: 'controlexcepcion_user_verificador', type: 'string'},
            {name: 'controlexcepcion_fecha_ver', type: 'date'},
            {name: 'controlexcepcion_user_apr_id', type: 'numeric'},
            {name: 'controlexcepcion_user_aprobador', type: 'string'},
            {name: 'controlexcepcion_fecha_apr', type: 'date'},
            {name: 'controlexcepcion_user_mod_id', type: 'numeric'},
            {name: 'controlexcepcion_user_modificador', type: 'string'},
            {name: 'controlexcepcion_fecha_mod', type: 'date'},
            {name: 'excepcion_id', type: 'integer'},
            {name: 'excepcion', type: 'string'},
            {name: 'tipoexcepcion_id', type: 'integer'},
            {name: 'tipo_excepcion', type: 'string'},
            {name: 'genero_id', type: 'integer'},
            {name: 'genero', type: 'string'},
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
            {name: 'estado_descripcion', type: 'string'},
            {name: 'agrupador', type: 'integer'},
            {name: 'boleta', type: 'integer'},
            {name: 'boleta_descripcion', type: 'string'}
        ],
        url: '/misboletasexcepciones/listboletasporrelaboral?id='+idRelaboral,
        cache: false,
        root: 'Rows',
        beforeprocessing: function (data) {
            source.totalrecords = data[0].TotalRows;
        },
        filter: function()
        {
            // Actualiza la grilla y reenvia los datos actuales al servidor
            $("#divGridControlExcepciones").jqxGrid('updatebounddata', 'filter');
        },
        sort: function()
        {
            // Actualiza la grilla y reenvia los datos actuales al servidor
            $("#divGridControlExcepciones").jqxGrid('updatebounddata', 'sort');
        }
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    cargarRegistrosDeTolerancias();
    function cargarRegistrosDeTolerancias() {
        var theme = prepareSimulator("grid");
        $("#divGridControlExcepciones").jqxGrid(
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
                    container.append("<button title='Actualizar Grilla' id='refreshcontrolexceptrowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-refresh fa-2x text-info' title='Refrescar Grilla.'/></i> Actualizar</button>");
                    container.append("<button title='Registrar nuevo control de excepci&oacute;n.' id='addcontrolexceptrowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-plus-square fa-2x text-info' title='Nuevo Registro.'/></i> Nuevo</button>");
                    container.append("<button title='Modificar registro de control de excepci&oacute;n.' id='updateexceptrowbutton'  class='btn btn-sm btn-primary' type='button' ><i class='fa fa-pencil-square fa-2x text-info' title='Modificar registro.'/> Modificar</button>");
                    container.append("<button title='Enviar registro de control de excepci&oacute;n.' id='sendexceptrowbutton'  class='btn btn-sm btn-primary' type='button' ><i class='fa fa-share fa-2x text-info' title='Enviar Solicitud'></i> Enviar</button>");
                    container.append("<button title='Imprimir formulario de control de excepci&oacute;n.' id='printexceptrowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-print fa-2x text-info' title='Imprimir Control de Excepci&oacute;n.'/></i> Imprimir</button>");
                    container.append("<button title='Dar de baja registro de control de excepci&oacute;n.' id='deleteexceptrowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-times-circle-o fa-2x text-info' title='Dar de baja al registro.'/></i> Eliminar</button>");
                    container.append("<button title='Ver calendario de turnos y permisos de manera global para la persona.' id='turnexceptrowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-calendar fa-2x text-info' title='Vista Turnos Laborales por Perfil.'/></i> Ver</button>");

                    $("#refreshcontrolexceptrowbutton").jqxButton();
                    $("#addcontrolexceptrowbutton").jqxButton();
                    $("#sendexceptrowbutton").jqxButton();
                    $("#updateexceptrowbutton").jqxButton();
                    $("#printexceptrowbutton").jqxButton();
                    $("#deleteexceptrowbutton").jqxButton();
                    $("#turnexceptrowbutton").jqxButton();
                    var genero_id = 0;
                    $("#hdnIntermediacion").val(-1);
                    $("#hdnIdRelDestPrincipal").val(0);
                    $("#hdnIdRelDestSecundario").val(0);
                    $("#hdnIdControlExcepcionEnvio").val(0);
                    $("#hdnIdControlExcepcionEdit").val(0);
                    $("#hdnIdRelaboralNew").val(0);
                    $("#hdnIdRelaboralEdit").val(0);
                    $("#lblObservacionNew").text("Observaciones:");
                    $("#lblObservacionEdit").text("Observaciones:");
                    $("#txtObservacionNew").prop("placeholder","Observaciones...");
                    $("#txtObservacionEdit").prop("placeholder","Observaciones...");

                    $("#refreshcontrolexceptrowbutton").off();
                    $("#refreshcontrolexceptrowbutton").on('click', function () {
                        $("#divGridControlExcepciones").jqxGrid("updatebounddata");
                    });
                    /* Registrar nueva excepción */
                    $("#addcontrolexceptrowbutton").off();
                    $("#addcontrolexceptrowbutton").on('click', function () {
                        $('#divTabControlExcepciones').jqxTabs('enableAt', 1);
                        $('#divTabControlExcepciones').jqxTabs('disableAt', 2);
                        $('#divTabControlExcepciones').jqxTabs('disableAt', 3);
                        $('#divTabControlExcepciones').jqxTabs('enableAt', 4);
                        $('#divTabControlExcepciones').jqxTabs({selectedItem: 1});
                        inicializarFormularioControlExcepcionesNuevoEditar(1,idRelaboral,0,"","","","","",0,-1,genero,"");
                        $("#hdnIdRelaboralNew").val(idRelaboral);
                        $("#lstExcepcionesNew").focus();
                    });
                    /* Modificar registro.*/
                    $("#updateexceptrowbutton").off();
                    $("#updateexceptrowbutton").on('click', function () {
                        var selectedrowindex = $("#divGridControlExcepciones").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridControlExcepciones').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                $("#hdnIdControlExcepcionEdit").val(dataRecord.id);
                                /**
                                 * La modificación sólo es admisible si el registro de horario laboral tiene estado EN PROCESO
                                 */
                                if (dataRecord.controlexcepcion_estado == 1||dataRecord.controlexcepcion_estado == 2) {

                                    if(dataRecord.boleta==1){
                                        $('#divTabControlExcepciones').jqxTabs('enableAt', 0);
                                        $('#divTabControlExcepciones').jqxTabs('disableAt', 1);
                                        $('#divTabControlExcepciones').jqxTabs('disableAt', 2);
                                        $('#divTabControlExcepciones').jqxTabs('disableAt', 3);
                                        $('#divTabControlExcepciones').jqxTabs('enableAt', 2);

                                        $('#divTabControlExcepciones').jqxTabs({selectedItem: 2});
                                        $("#hdnIdRelaboralEdit").val(idRelaboral);
                                        $("#hdnIdControlExcepcionEdit").val(dataRecord.id);
                                        limpiarMensajesErrorPorValidacionControlExcepcion(2);
                                        inicializarFormularioControlExcepcionesNuevoEditar(2,idRelaboral,dataRecord.excepcion_id,dataRecord.fecha_ini,dataRecord.hora_ini,dataRecord.fecha_fin,dataRecord.hora_fin,dataRecord.justificacion,dataRecord.turno,dataRecord.entrada_salida,genero,dataRecord.controlexcepcion_observacion);
                                    }else {
                                        var msje = "Usted no tiene los permisos suficientes para modificar este tipo de excepciones. Consulte con Personal de Control de Personal o el Administrador.";
                                        $("#divMsjePorError").html("");
                                        $("#divMsjePorError").append(msje);
                                        $("#divMsjeNotificacionError").jqxNotification("open");
                                    }

                                } else {
                                    var msje = "Debe seleccionar un registro en estado EN ELABORACI&Oacute;N necesariamente.";
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
                    /*Concluir Elaboración.*/
                    $("#sendexceptrowbutton").off();
                    $("#sendexceptrowbutton").on('click', function () {
                        var selectedrowindex = $("#divGridControlExcepciones").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridControlExcepciones').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                if (dataRecord.controlexcepcion_estado == 1||dataRecord.controlexcepcion_estado == 2
                                    //||dataRecord.controlexcepcion_estado == 3||dataRecord.controlexcepcion_estado == 4||dataRecord.controlexcepcion_estado == 5
                                    ||dataRecord.controlexcepcion_estado == -3||dataRecord.controlexcepcion_estado == -4
                                ) {

                                    if(dataRecord.boleta==1){
                                        /**
                                         * Se controla si el plazo de envío sigue vigente, en caso contrario se despliega un mensaje de error desde la misma función.
                                         */
                                        var okPlazo = controlaPlazoDeSolicitud(dataRecord.id);
                                        if(okPlazo){
                                            var fechaIniAux = fechaConvertirAFormato(dataRecord.fecha_ini,"-");
                                            var fechaFinAux = fechaConvertirAFormato(dataRecord.fecha_fin,"-");
                                            var okFrecuencia = verificaFrecuencia(dataRecord.id,idRelaboral,dataRecord.excepcion_id,fechaIniAux,dataRecord.hora_ini,fechaFinAux,dataRecord.hora_fin,dataRecord.horario);
                                            if(okFrecuencia){
                                                $('#divTabControlExcepciones').jqxTabs('enableAt', 0);
                                                $('#divTabControlExcepciones').jqxTabs('disableAt', 1);
                                                $('#divTabControlExcepciones').jqxTabs('disableAt', 2);
                                                $('#divTabControlExcepciones').jqxTabs('enableAt', 3);
                                                $('#divTabControlExcepciones').jqxTabs('enableAt', 4);

                                                $('#divTabControlExcepciones').jqxTabs({selectedItem: 3});
                                                var verificado = 0;
                                                /**
                                                 * Si el registro esta ya verificado sólo requiere ser aprobado, que es un proceso como cualquiera
                                                 */
                                                if(dataRecord.controlexcepcion_estado == 5){
                                                    verificado = 1;
                                                }
                                                cargarDatosDestinatarios(dataRecordMain,dataRecord,verificado);
                                            }
                                        }
                                    }else {
                                        var msje = "Usted no tiene los permisos suficientes para modificar este tipo de excepciones. Consulte con Personal de Control de Personal o el Administrador.";
                                        $("#divMsjePorError").html("");
                                        $("#divMsjePorError").append(msje);
                                        $("#divMsjeNotificacionError").jqxNotification("open");
                                    }
                                } else {
                                    var msje = "Debe seleccionar un registro con estado EN ELABORACI&Oacute;N, ELABORADO o estar en espera de reenvio debido ERROR EN LA SOLICITUD para posibilitar la aprobaci&oacute;n del registro";
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
                    /* Dar de baja un registro.*/
                    $("#printexceptrowbutton").off();
                    $("#printexceptrowbutton").on('click', function () {
                        var selectedrowindex = $("#divGridControlExcepciones").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridControlExcepciones').jqxGrid('getrowdata', selectedrowindex);
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

                    /* Dar de baja un registro.*/
                    $("#deleteexceptrowbutton").off();
                    $("#deleteexceptrowbutton").on('click', function () {
                        var selectedrowindex = $("#divGridControlExcepciones").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridControlExcepciones').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                /*
                                 *  Para dar de baja un registro, este debe estar inicialmente en estado EN PROCESO, de otro modo no es posible
                                 */
                                if (dataRecord.controlexcepcion_estado == 1||dataRecord.controlexcepcion_estado == 2) {
                                    if (confirm("¿Esta seguro de dar de baja registro de control de excepción?"))
                                        if(dataRecord.boleta==1){
                                            darDeBajaIdeaDeNegocio(dataRecord.id);
                                        }else{
                                            var msje = "Usted no tiene los permisos suficientes para modificar este tipo de excepciones. Consulte con Personal de Control de Personal o el Administrador.";
                                            $("#divMsjePorError").html("");
                                            $("#divMsjePorError").append(msje);
                                            $("#divMsjeNotificacionError").jqxNotification("open");
                                        }
                                } else {
                                    var msje = "Para dar de baja un registro, este debe estar en estado ELABORADO o en ELABORACI&Oacute;N necesariamente.";
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
                    $("#turnexceptrowbutton").off();
                    $("#turnexceptrowbutton").on("click",function(){
                            $('#divTabControlExcepciones').jqxTabs('enableAt', 0);
                            $('#divTabControlExcepciones').jqxTabs('disableAt', 1);
                            $('#divTabControlExcepciones').jqxTabs('disableAt', 2);
                            $('#divTabControlExcepciones').jqxTabs('disableAt', 3);
                            $('#divTabControlExcepciones').jqxTabs('enableAt', 4);

                            $('#divTabControlExcepciones').jqxTabs({selectedItem: 4});
                            var idPerfilLaboral=0;
                            var tipoHorario=3;

                            $("#spanPrefijoCalendarioLaboral").html("");
                            $("#spanSufijoCalendarioLaboral").html(" Vrs. Calendario de Excepciones (Individual)");
                            var date = new Date();
                            var defaultDia = date.getDate();
                            var defaultMes = date.getMonth();
                            var defaultGestion = date.getFullYear();
                            var selectedrowindex = $("#divGridControlExcepciones").jqxGrid('getselectedrowindex');
                            if (selectedrowindex >= 0) {
                                var dataRecordAux = $('#divGridControlExcepciones').jqxGrid('getrowdata', selectedrowindex);
                                if (dataRecordAux != undefined) {
                                    var fechaAux = fechaConvertirAFormato(dataRecordAux.fecha_ini,"-");
                                    var arrFechaAux = fechaAux.split("-");
                                    defaultDia =arrFechaAux[0];
                                    defaultMes =arrFechaAux[1]-1;
                                    defaultGestion =arrFechaAux[2];
                                }
                            }
                            var arrHorariosRegistrados = [];
                            $("#calendar").html("");
                            var arrFechasPorSemana = iniciarCalendarioLaboralPorRelaboralTurnosAndExcepcionesParaVerAsignacionesPersonales(dataRecordMain,idRelaboral,5,idPerfilLaboral,tipoHorario,arrHorariosRegistrados,defaultGestion,defaultMes,defaultDia);
                            sumarTotalHorasPorSemana(arrFechasPorSemana);
                    })
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
                     filtertype: 'checkedlist',
                     datafield: 'controlexcepcion_estado_descripcion',
                     width: 90,
                     cellsalign: 'center',
                     align: 'center',
                     hidden: false,
                     cellclassname: cellclass
                     },
                    {
                        text: 'Tipo Excepci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'tipo_excepcion',
                        width: 100,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Excepci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'excepcion',
                        width: 200,
                        cellsalign: 'justify',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'C&oacute;digo',
                        filtertype: 'checkedlist',
                        datafield: 'codigo',
                        width: 120,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Color',
                        datafield: 'color',
                        width: 80,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false,
                        cellsrenderer: cellsrenderer

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
                        text: 'Hora Inicio',
                        filtertype: 'checkedlist',
                        datafield: 'hora_ini',
                        width: 100,
                        cellsalign: 'center',
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
                        text: 'Hora Fin',
                        filtertype: 'checkedlist',
                        datafield: 'hora_fin',
                        width: 100,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Justificaci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'justificacion',
                        width: 100,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'G&eacute;nero',
                        filtertype: 'checkedlist',
                        datafield: 'genero',
                        width: 100,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Frecuencia',
                        filtertype: 'checkedlist',
                        datafield: 'frecuencia_descripcion',
                        width: 80,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Compensar Horas',
                        filtertype: 'checkedlist',
                        datafield: 'compensatoria_descripcion',
                        width: 100,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Contr. Horario',
                        filtertype: 'checkedlist',
                        datafield: 'horario_descripcion',
                        width: 100,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Refrigerio',
                        filtertype: 'checkedlist',
                        datafield: 'refrigerio_descripcion',
                        width: 100,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Turno',
                        filtertype: 'checkedlist',
                        datafield: 'turno_descripcion',
                        width: 100,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'E/S',
                        filtertype: 'checkedlist',
                        datafield: 'entrada_salida_descripcion',
                        width: 100,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Solicitante',
                        filtertype: 'checkedlist',
                        datafield: 'controlexcepcion_user_registrador',
                        width: 100,
                        align: 'center',
                        cellsalign: 'justify',
                        hidden: false
                    },
                    {
                        text: 'Fecha Sol.',
                        filtertype: 'checkedlist',
                        datafield: 'controlexcepcion_fecha_reg',
                        width: 100,
                        align: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Verificador',
                        filtertype: 'checkedlist',
                        datafield: 'controlexcepcion_user_verificador',
                        width: 100,
                        align: 'center',
                        cellsalign: 'justify',
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
                        hidden: false
                    },
                    {
                        text: 'Aprobador',
                        filtertype: 'checkedlist',
                        datafield: 'controlexcepcion_user_aprobador',
                        width: 100,
                        align: 'center',
                        cellsalign: 'justify',
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
                        hidden: false
                    },
                    {
                        text: 'Observaci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'controlexcepcion_observacion',
                        width: 100,
                        align: 'center',
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
