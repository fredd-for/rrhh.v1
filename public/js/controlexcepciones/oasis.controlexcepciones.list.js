/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  03-03-2015
 */
/**
 * Función para la definición de la grilla que contiene la lista de registros de control de excepciones.
 * @param idRelaboral
 * @param idPersona
 * @param nombres
 * @param ci
 * @param numComplemento
 * @param fechaIng
 * @param fechaIncor
 * @param fechaIni
 * @param fechaFin
 * @param fechaBaja
 */
function definirGrillaParaListaControlExcepcionesPorIdRelaboral(dataRecordRelaboral) {
    var idRelaboral = dataRecordRelaboral.id_relaboral;
    var idPersona=dataRecordRelaboral.id_persona;
    var nombres=dataRecordRelaboral.nombres;
    var ci=dataRecordRelaboral.ci;
    var genero=dataRecordRelaboral.genero;
    var numComplemento=dataRecordRelaboral.num_complemento;
    var fechaIng=dataRecordRelaboral.fecha_ing;
    var fechaIncor=dataRecordRelaboral.fecha_incor;
    var fechaIni=dataRecordRelaboral.fecha_ini;
    var fechaFin=dataRecordRelaboral.fecha_fin;
    var fechaBaja=dataRecordRelaboral.fecha_baja;
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
            {name: 'estado_descripcion', type: 'string'}
        ],
        url: '/controlexcepciones/listporrelaboral?id='+idRelaboral,
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
                    container.append("<button title='Actualizar Grilla' id='refreshcontrolexceptrowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-refresh fa-2x text-info' title='Refrescar Grilla.'/></i></button>");
                    container.append("<button title='Registrar nuevo control de excepci&oacute;n.' id='addcontrolexceptrowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-plus-square fa-2x text-info' title='Nuevo Registro.'/></i></button>");
                    container.append("<button title='Aprobar registro de control de excepci&oacute;n.' id='approveexceptrowbutton'  class='btn btn-sm btn-primary' type='button' ><i class='fa fa-check-square fa-2x text-info' title='Aprobar registro'></i></button>");
                    container.append("<button title='Modificar registro de control de excepci&oacute;n.' id='updateexceptrowbutton'  class='btn btn-sm btn-primary' type='button' ><i class='fa fa-pencil-square fa-2x text-info' title='Modificar registro.'/></button>");
                    container.append("<button title='Imprimir formulario de control de excepci&oacute;n.' id='printexceptrowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-print fa-2x text-info' title='Imprimir Control de Excepci&oacute;n.'/></i></button>");
                    container.append("<button title='Dar de baja registro de control de excepci&oacute;n.' id='deleteexceptrowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-times-circle-o fa-2x text-info' title='Dar de baja al registro.'/></i></button>");
                    container.append("<button title='Ver calendario de turnos y permisos de manera global para la persona.' id='turnexceptrowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-calendar fa-2x text-info' title='Vista Turnos Laborales por Perfil.'/></i></button>");

                    $("#refreshcontrolexceptrowbutton").jqxButton();
                    $("#addcontrolexceptrowbutton").jqxButton();
                    $("#approveexceptrowbutton").jqxButton();
                    $("#updateexceptrowbutton").jqxButton();
                    $("#printexceptrowbutton").jqxButton();
                    $("#deleteexceptrowbutton").jqxButton();
                    $("#turnexceptrowbutton").jqxButton();
                    var genero_id = 0;
                    $("#hdnIdControlExcepcionEdit").val(0);
                    $("#hdnIdRelaboralNew").val(0);
                    $("#hdnIdRelaboralEdit").val(0);
                    $("#lblObservacionNew").text("Observaciones:");
                    $("#lblObservacionEdit").text("Observaciones:");
                    $("#txtObservacionNew").prop("placeholder","Observaciones...");
                    $("#txtObservacionEdit").prop("placeholder","Observaciones...");
                    /* Actualizar grilla */
                    $("#refreshcontrolexceptrowbutton").off();
                    $("#refreshcontrolexceptrowbutton").on('click', function () {
                        $("#divGridControlExcepciones").jqxGrid("updatebounddata");
                    });
                    /* Registrar nueva excepción */
                    $("#addcontrolexceptrowbutton").off();
                    $("#addcontrolexceptrowbutton").on('click', function () {
                        $('#divTabControlExcepciones').jqxTabs('enableAt', 1);
                        $('#divTabControlExcepciones').jqxTabs('enableAt', 2);
                        $('#divTabControlExcepciones').jqxTabs('disableAt', 3);
                        $('#divTabControlExcepciones').jqxTabs('disableAt', 4);

                        $('#divTabControlExcepciones').jqxTabs({selectedItem: 2});
                        inicializarFormularioControlExcepcionesNuevoEditar(1,idRelaboral,0,"","","","","",0,-1,genero,"");
                        $("#hdnIdRelaboralNew").val(idRelaboral);

                        $("#lstExcepcionesNew").focus();
                    });
                    /*Aprobar registro.*/
                    $("#approveexceptrowbutton").off();
                    $("#approveexceptrowbutton").on('click', function () {
                     var selectedrowindex = $("#divGridControlExcepciones").jqxGrid('getselectedrowindex');
                     if (selectedrowindex >= 0) {
                     var dataRecord = $('#divGridControlExcepciones').jqxGrid('getrowdata', selectedrowindex);
                     if (dataRecord != undefined) {
                     if (dataRecord.controlexcepcion_estado == 2) {
                     if (confirm("¿Esta seguro de aprobar este registro?")) {
                         aprobarRegistroControlExcepcion(dataRecord.id);
                     }
                     } else {
                         var msje = "Debe seleccionar un registro con estado ELABORADO para posibilitar la aprobaci&oacute;n del registro";
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
                    /* Modificar registro.*/
                    $("#updateexceptrowbutton").off();
                    $("#updateexceptrowbutton").on('click', function () {
                        var selectedrowindex = $("#divGridControlExcepciones").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridControlExcepciones').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                $("#hdnIdControlExcepcionEdit").val(dataRecord.id);
                                /**
                                 * La modificación sólo es admisible si el registro de horario laboral tiene estado EN ELABORACIÓN O ELABORADO
                                 */
                                if (dataRecord.controlexcepcion_estado == 1 || dataRecord.controlexcepcion_estado == 2) {
                                    $('#divTabControlExcepciones').jqxTabs('enableAt', 0);
                                    $('#divTabControlExcepciones').jqxTabs('enableAt', 1);
                                    $('#divTabControlExcepciones').jqxTabs('disableAt', 2);
                                    $('#divTabControlExcepciones').jqxTabs('enableAt', 3);

                                    $('#divTabControlExcepciones').jqxTabs({selectedItem: 3});
                                    $("#hdnIdRelaboralEdit").val(idRelaboral);
                                    $("#hdnIdControlExcepcionEdit").val(dataRecord.id);
                                    limpiarMensajesErrorPorValidacionIdeas(2);
                                    inicializarFormularioControlExcepcionesNuevoEditar(2,idRelaboral,dataRecord.excepcion_id,dataRecord.fecha_ini,dataRecord.hora_ini,dataRecord.fecha_fin,dataRecord.hora_fin,dataRecord.justificacion,dataRecord.turno,dataRecord.entrada_salida,genero,dataRecord.controlexcepcion_observacion);
                                } else {
                                    var msje = "Debe seleccionar un registro en estado ELABORADO necesariamente.";
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
                                    exportarFormulario(dataRecord.id);
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
                                if (dataRecord.controlexcepcion_estado == 2) {
                                    if (confirm("¿Esta seguro de dar de baja registro de control de excepción?"))
                                        darDeBajaIdeaDeNegocio(dataRecord.id);
                                } else {
                                    var msje = "Para dar de baja un registro, este debe estar en estado ELABORADO necesariamente.";
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
                                var dataRecord = $('#divGridControlExcepciones').jqxGrid('getrowdata', selectedrowindex);
                                if (dataRecord != undefined) {
                                    var fechaAux = fechaConvertirAFormato(dataRecord.fecha_ini,"-");
                                    var arrFechaAux = fechaAux.split("-");
                                    defaultDia =arrFechaAux[0];
                                    defaultMes =arrFechaAux[1]-1;
                                    defaultGestion =arrFechaAux[2];
                                }
                            }
                            var fechaIni = "";
                            var fechaFin = "";
                            var contadorPerfiles = 0;
                            //var arrHorariosRegistrados = obtenerTodosHorariosRegistradosEnCalendarioRelaboralParaVerAsignaciones(idRelaboral,idPerfilLaboral,tipoHorario,false,fechaIni,fechaFin,contadorPerfiles);
                            var arrHorariosRegistrados = [];
                            $("#calendar").html("");
                            var arrFechasPorSemana = iniciarCalendarioLaboralPorRelaboralTurnosAndExcepcionesParaVerAsignaciones(dataRecordRelaboral,idRelaboral,5,idPerfilLaboral,tipoHorario,arrHorariosRegistrados,defaultGestion,defaultMes,defaultDia);
                            sumarTotalHorasPorSemana(arrFechasPorSemana);

                        $('#tabFichaPersonalTurnAndExcept').jqxTabs({
                            theme: 'oasis',
                            width: '100%',
                            height: '100%',
                            position: 'top'
                        });
                        /*******************************************************************************************************/
                            $('#tabFichaPersonalTurnAndExcept').jqxTabs({
                                theme: 'oasis',
                                width: '100%',
                                height: '100%',
                                position: 'top'
                            });
                            $('#tabFichaPersonalTurnAndExcept').jqxTabs({selectedItem: 0});
                            $(".ddNombresTurnAndExcept").html(dataRecordRelaboral.nombres+"&nbsp;");
                            $(".ddCIAndNumComplementoExpdTurnAndExcept").html(dataRecordRelaboral.ci+dataRecordRelaboral.num_complemento+" "+dataRecordRelaboral.expd+"&nbsp;");
                            $("#ddCargoTurnAndExcept").html(dataRecordRelaboral.cargo+"&nbsp;");
                            $("#ddProcesoTurnAndExcept").html(dataRecordRelaboral.proceso_codigo+"&nbsp;");
                            $("#ddFinanciamientoTurnAndExcept").html(dataRecordRelaboral.condicion+" (Partida "+dataRecordRelaboral.partida+")");
                            $("#ddGerenciaTurnAndExcept").html(dataRecordRelaboral.gerencia_administrativa+"&nbsp;");
                            if(dataRecordRelaboral.departamento_administrativo!=""&&dataRecordRelaboral.departamento_administrativo!=null){
                                $("#ddDepartamentoTurnAndExcept").show();
                                $("#dtDepartamentoTurnAndExcept").show();
                                $("#ddDepartamentoTurnAndExcept").html(dataRecordRelaboral.departamento_administrativo+"&nbsp;");
                            }
                            else {
                                $("#dtDepartamentoTurnAndExcept").hide();
                                $("#ddDepartamentoTurnAndExcept").hide();
                            }
                            $("#ddUbicacionTurnAndExcept").html(dataRecordRelaboral.ubicacion+"&nbsp;");

                            switch (dataRecordRelaboral.tiene_item) {
                                case 1:
                                    $("#dtItemTurnAndExcept").show();
                                    $("#ddItemTurnAndExcept").show();
                                    $("#ddItemTurnAndExcept").html(dataRecordRelaboral.item+"&nbsp;");
                                    break;
                                case 0:
                                    $("#dtItemTurnAndExcept").hide();
                                    $("#ddItemTurnAndExcept").hide();
                                    break;
                            }
                            $("#ddNivelSalarialTurnAndExcept").html(dataRecordRelaboral.nivelsalarial+"&nbsp;");
                            $("#ddHaberTurnAndExcept").html(dataRecordRelaboral.sueldo+"&nbsp;");
                            $("#ddFechaIngTurnAndExcept").html(fechaConvertirAFormato(dataRecordRelaboral.fecha_ing,"-")+"&nbsp;");
                            if(dataRecordRelaboral.fecha_incor!=null){
                                var fechaIncor = fechaConvertirAFormato(dataRecordRelaboral.fecha_incor,"-");
                                $("#dtFechaIncorTurnAndExcept").show();
                                $("#ddFechaIncorTurnAndExcept").show();
                                $("#ddFechaIncorTurnAndExcept").html(fechaIncor+"&nbsp;");
                            }else{
                                $("#dtFechaIncorTurnAndExcept").hide();
                                $("#ddFechaIncorTurnAndExcept").hide();
                            }
                            $("#ddFechaIniTurnAndExcept").html(fechaConvertirAFormato(dataRecordRelaboral.fecha_ini,"-")+"&nbsp;");
                            switch (dataRecordRelaboral.tiene_item) {
                                case 1:
                                    $("#dtFechaFinTurnAndExcept").hide();
                                    $("#ddFechaFinTurnAndExcept").hide();
                                    break;
                                case 0:
                                    $("#dtFechaFinTurnAndExcept").show();
                                    $("#ddFechaFinTurnAndExcept").show();
                                    $("#ddFechaFinTurnAndExcept").html(fechaConvertirAFormato(dataRecordRelaboral.fecha_fin,"-")+"&nbsp;");
                                    break;
                            }
                            $("#ddEstadoDescripcionTurnAndExcept").html(dataRecordRelaboral.estado_descripcion+"&nbsp;");
                            if(dataRecordRelaboral.estado==0){
                                $("#dtFechaBajaTurnAndExcept").show();
                                $("#ddFechaBajaTurnAndExcept").show();
                                $("#ddFechaBajaTurnAndExcept").html(fechaConvertirAFormato(dataRecordRelaboral.fecha_baja,"-")+"&nbsp;");
                                $("#dtMotivoBajaTurnAndExcept").show();
                                $("#ddMotivoBajaTurnAndExcept").show();
                                $("#ddMotivoBajaTurnAndExcept").html(fechaConvertirAFormato(dataRecordRelaboral.motivo_baja,"-")+"&nbsp;");
                            }else{
                                $("#dtFechaBajaTurnAndExcept").hide();
                                $("#ddFechaBajaTurnAndExcept").hide();
                                $("#dtMotivoBajaTurnAndExcept").hide();
                                $("#ddMotivoBajaTurnAndExcept").hide();
                            }
                        /*******************************************************************************************************/

                        $('#tabFichaPersonalTurnAndExcept').jqxTabs({selectedItem: 0});
                        $("#ddNombresTurnAndExcept").html(nombres);
                        var rutaImagen = obtenerRutaFoto(ci, numComplemento);
                        $("#imgFotoPerfilTurnAndExceptRelaboral").attr("src", rutaImagen);
                        $("#imgFotoPerfilContactoPerTurnAndExcept").attr("src", rutaImagen);
                        $("#imgFotoPerfilContactoInstTurnAndExcept").attr("src", rutaImagen);
                        $("#imgFotoPerfilTurnAndExcept").attr("src", rutaImagen);
                        cargarPersonasContactosGestionIdeas(2,idPersona);
                        $("#hdnIdRelaboralVistaTurnAndExcept").val(idRelaboral);
                        $("#hdnSwPrimeraVistaHistorialTurnAndExcept").val(0);
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
                        cellsformat: 'dd-MM-yyyy h:i:s',
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
