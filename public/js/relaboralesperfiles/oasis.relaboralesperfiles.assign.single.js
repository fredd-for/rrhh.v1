/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  09-02-2015
 */
/**
 * Función para la carga la grilla de asignaciones.
 * @param idPerfilLaboral
 * @param perfilLaboral
 * @param grupo
 * @param tipoHorario
 * @param tipoHorarioDescripcion
 */
function cargarGrillaAsignacionesIndividuales(idPerfilLaboral,perfilLaboral,grupo,tipoHorario,tipoHorarioDescripcion) {
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
            {name: 'finpartida', type: 'integer'},
            {name: 'id_ubicacion', type: 'string'},
            {name: 'ubicacion', type: 'string'},
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
            {name: 'observacion', type: 'string'},
            {name: 'relaboralperfil_id', type: 'integer'},
            {name: 'asignacion_estado', type: 'string'},
            {name: 'relaboralperfil_ubicacion_id', type: 'integer'},
            {name: 'relaboralperfil_ubicacion', type: 'string'},
            {name: 'relaboralperfil_estacion_id', type: 'integer'},
            {name: 'relaboralperfil_estacion', type: 'string'},
            {name: 'relaboralperfil_fecha_ini', type: 'date'},
            {name: 'relaboralperfil_fecha_fin', type: 'date'},
            {name: 'relaboralperfil_observacion', type: 'string'},
            {name: 'relaboralperfil_estado', type: 'integer'},
            {name: 'relaboralperfil_estado_descripcion', type: 'string'},
            {name: 'relaboralperfilmaquina_maquina_entrada_id', type: 'integer'},
            {name: 'relaboralperfilmaquina_tipo_marcacion_entrada', type: 'integer'},
            {name: 'relaboralperfilmaquina_ubicacion_entrada_id', type: 'integer'},
            {name: 'relaboralperfilmaquina_ubicacion_entrada', type: 'string'},
            {name: 'relaboralperfilmaquina_estacion_entrada_id', type: 'integer'},
            {name: 'relaboralperfilmaquina_estacion_entrada', type: 'string'},
            {name: 'relaboralperfilmaquina_maquina_salida_id', type: 'integer'},
            {name: 'relaboralperfilmaquina_tipo_marcacion_salida', type: 'integer'},
            {name: 'relaboralperfilmaquina_ubicacion_salida_id', type: 'integer'},
            {name: 'relaboralperfilmaquina_ubicacion_salida', type: 'string'},
            {name: 'relaboralperfilmaquina_estacion_salida_id', type: 'integer'},
            {name: 'relaboralperfilmaquina_estacion_salida', type: 'string'}
        ],
        url: '/relaboralesperfiles/listsingle?id='+idPerfilLaboral,
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    cargarRegistrosDeRelacionesLaborales();
    function cargarRegistrosDeRelacionesLaborales() {
        var theme = prepareSimulator("grid");
        $("#divGrillaAsignacionesIndividuales").jqxGrid(
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
                    container.append("<button id='addrowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-plus-square fa-2x text-info' title='Nuevo Registro.'/></i></button>");
                    /*container.append("<button id='approverowbutton'  class='btn btn-sm btn-primary' type='button' ><i class='fa fa-check-square fa-2x text-info' title='Aprobar registro'></i></button>");*/
                    container.append("<button id='updaterowbutton'  class='btn btn-sm btn-primary' type='button' ><i class='fa fa-pencil-square fa-2x text-info' title='Modificar registro.'/></button>");
                    container.append("<button id='deleterowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-minus-square fa-2x text-info' title='Dar de baja al registro.'/></i></button>");
                    container.append("<button id='viewrowbutton' class='btn btn-sm btn-primary' type='button'><i class='gi gi-calendar fa-2x text-info' title='Vista Historial.'/></i></button>");

                    $("#addrowbutton").jqxButton();
                    /*$("#approverowbutton").jqxButton();*/
                    $("#updaterowbutton").jqxButton();
                    $("#deleterowbutton").jqxButton();
                    $("#viewrowbutton").jqxButton();

                    $("#hdnAccionAsignacionSinglePerfil").val(0);
                    $("#hdnIdRelaboralAsignacionSinglePerfil").val(0);
                    $("#hdnIdPerfilLaboralAsignacionSinglePerfil").val(0);
                    $("#hdnIdRelaboralPerfilAsignacionSinglePerfil").val(0);
                    $("#spanSufijoCalendarioLaboral").html("");
                    /* Registrar nueva relación laboral.*/
                    $("#addrowbutton").off();
                    $("#addrowbutton").on('click', function () {
                        var selectedrowindex = $("#divGrillaAsignacionesIndividuales").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGrillaAsignacionesIndividuales').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                /**
                                 * El registro de una nueva asignación de Perfil Laboral es posible para toda relación laboral
                                 * vigente, siempre y cuando las fechas de asignación no tengan conflicto con otras fechas
                                 * registradas.
                                 */
                                if (dataRecord.estado>=0) {
                                    $("#hdnAccionAsignacionSinglePerfil").val(1);
                                    $("#spanPrefijoFormularioAsignacionSingle").html("Nueva ");
                                    var fechaMin = fechaConvertirAFormato(dataRecord.fecha_ini,"-");
                                    if(dataRecord.fecha_incor!=null)
                                        fechaMin = fechaConvertirAFormato(dataRecord.fecha_incor,"-");
                                    var fechaMax = fechaConvertirAFormato(dataRecord.fecha_fin,"-");
                                    if(dataRecord.fecha_baja!=null&&dataRecord.fecha_baja&&dataRecord.fecha_baja!=undefined){
                                        fechaMax = fechaConvertirAFormato(dataRecord.fecha_baja,"-");
                                    }
                                    /**
                                     * En caso de que el registro sea nuevo para la persona, se considera la ubicación donde se ha registrado su contrato.
                                     */
                                    generaModalAdicionAsignacionSinglePerfilLaboral(1,
                                        dataRecord.relaboralperfil_ubicacion_id,
                                        dataRecord.relaboralperfil_ubicacion_id,
                                        dataRecord.relaboralperfil_estacion_id,
                                        dataRecord.relaboralperfil_estacion_id,
                                        -1,-1,"","",fechaMin,fechaMax,"");
                                    $("#hdnIdRelaboralAsignacionSinglePerfil").val(dataRecord.id_relaboral);
                                    $("#hdnIdPerfilLaboralAsignacionSinglePerfil").val(idPerfilLaboral);
                                } else {
                                    var msje = "";
                                    if(dataRecord.relaboralperfil_id!=null)
                                    msje = "El registro seleccionado ya tiene una asignaci&oacute;n de Perfil. ";
                                    if(dataRecord.estado==0)
                                    msje += "Debe seleccionar un registro en estado ACTIVO o EN PROCESO para poder asignar un Perfil.";
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
                    $("#updaterowbutton").off();
                    $("#updaterowbutton").on('click', function () {
                        var selectedrowindex = $("#divGrillaAsignacionesIndividuales").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGrillaAsignacionesIndividuales').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                if(dataRecord.relaboralperfil_estado==1){
                                    $("#hdnAccionAsignacionSinglePerfil").val(2);
                                    $("#spanPrefijoFormularioAsignacionSingle").html("Modificaci&oacute;n ");
                                    var fechaIni = fechaConvertirAFormato(dataRecord.relaboralperfil_fecha_ini,'-');
                                    var fechaFin = fechaConvertirAFormato(dataRecord.relaboralperfil_fecha_fin,'-');
                                    var fechaMin = fechaConvertirAFormato(dataRecord.fecha_ini,"-");
                                    if(dataRecord.fecha_incor!=null)
                                        fechaMin = fechaConvertirAFormato(dataRecord.fecha_incor,"-");
                                    var fechaMax = fechaConvertirAFormato(dataRecord.fecha_fin,"-");
                                    var tipoMarcacionEntrada = dataRecord.relaboralperfilmaquina_tipo_marcacion_entrada;
                                    var tipoMarcacionSalida = dataRecord.relaboralperfilmaquina_tipo_marcacion_salida;
                                    var relaboralperfilmaquinaUbicacionEntradaId = dataRecord.relaboralperfil_ubicacion_id;
                                    var relaboralperfilmaquinaUbicacionSalidaId = dataRecord.relaboralperfil_ubicacion_id;
                                    var relaboralperfilmaquinaEstacionEntradaId = dataRecord.relaboralperfil_estacion_id;
                                    var relaboralperfilmaquinaEstacionSalidaId = dataRecord.relaboralperfil_estacion_id;
                                    if(dataRecord.relaboralperfilmaquina_ubicacion_entrada_id>0){
                                        relaboralperfilmaquinaUbicacionEntradaId = dataRecord.relaboralperfilmaquina_ubicacion_entrada_id;
                                    }
                                    if(dataRecord.relaboralperfilmaquina_ubicacion_salida_id>0){
                                        relaboralperfilmaquinaUbicacionSalidaId = dataRecord.relaboralperfilmaquina_ubicacion_salida_id;
                                    }
                                    if(dataRecord.relaboralperfilmaquina_estacion_entrada_id>0){
                                        relaboralperfilmaquinaEstacionEntradaId = dataRecord.relaboralperfilmaquina_estacion_entrada_id;
                                    }
                                    if(dataRecord.relaboralperfilmaquina_estacion_salida_id>0){
                                        relaboralperfilmaquinaEstacionSalidaId = dataRecord.relaboralperfilmaquina_estacion_salida_id;
                                    }
                                    generaModalAdicionAsignacionSinglePerfilLaboral(2,
                                        relaboralperfilmaquinaUbicacionEntradaId,
                                        relaboralperfilmaquinaUbicacionSalidaId,
                                        relaboralperfilmaquinaEstacionEntradaId,
                                        relaboralperfilmaquinaEstacionSalidaId,
                                        tipoMarcacionEntrada,tipoMarcacionSalida,
                                        fechaIni,fechaFin,fechaMin,fechaMax,dataRecord.relaboralperfil_observacion);
                                    $("#hdnIdRelaboralAsignacionSinglePerfil").val(dataRecord.id_relaboral);
                                    $("#hdnIdPerfilLaboralAsignacionSinglePerfil").val(idPerfilLaboral);
                                    $("#hdnIdRelaboralPerfilAsignacionSinglePerfil").val(dataRecord.relaboralperfil_id);
                                }else
                                {
                                    var msje = "Debe seleccionar un registro que se encuentre 'ASIGNADO' para realizar la modificaci&oacute;n.";
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
                    $("#deleterowbutton").off();
                    $("#deleterowbutton").on('click', function () {
                        var selectedrowindex = $("#divGrillaAsignacionesIndividuales").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGrillaAsignacionesIndividuales').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {

                                /*
                                 *  Para dar de baja un registro, este debe estar inicialmente en estado ASIGNADO
                                 */
                                if(dataRecord.relaboralperfil_estado==1){
                                    if(confirm("¿Esta seguro de que desea dar de baja el registro de asignación de Perfil?")){
                                        var ok = bajaRegistroAsignacionPerfilLaboral(dataRecord.relaboralperfil_id);
                                        if(ok){
                                            $("#divGrillaAsignacionesIndividuales").jqxGrid("updatebounddata");
                                            var msje = "Baja exitosa del registro.";
                                            $("#divMsjeNotificacionSuccess").html("");
                                            $("#divMsjeNotificacionSuccess").append(msje);
                                            $("#divMsjeNotificacionSuccess").jqxNotification("open");
                                        }
                                    }
                                } else {
                                    var msje = "Debe seleccionar un registro que se encuentre 'ASIGNADO' para realizar la modificaci&oacute;n.";
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
                    /* Ver registro.*/
                    $("#viewrowbutton").off();
                    $("#viewrowbutton").on('click', function () {

                        var selectedrowindex = $("#divGrillaAsignacionesIndividuales").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGrillaAsignacionesIndividuales').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                if (dataRecord.relaboralperfil_id >= 0 && dataRecord.relaboralperfil_id != null) {
                                    $('#jqxTabsAsignacionPerfiles').jqxTabs('enable', 1);
                                    $('#jqxTabsAsignacionPerfiles').jqxTabs('disableAt', 2);
                                    $('#jqxTabsAsignacionPerfiles').jqxTabs('disableAt', 3);
                                    $('#jqxTabsAsignacionPerfiles').jqxTabs('disableAt', 4);
                                    $('#jqxTabsAsignacionPerfiles').jqxTabs('enableAt', 5);
                                    /**
                                     * Trasladamos el item seleccionado al que corresponde, el de vistas.
                                     */
                                    $('#jqxTabsAsignacionPerfiles').jqxTabs({selectedItem: 5});
                                    $("#ddPerfilLaboralTurn").text(perfilLaboral);
                                    if(grupo!=''&&grupo!=null)$("#ddGrupoTurn").text(grupo);
                                    else $("#ddGrupoTurn").html("&nbsp;");
                                    $("#ddTipoHorarioTurn").text(tipoHorarioDescripcion);
                                    $("#spanPrefijoCalendarioLaboral").html("");
                                    $("#spanSufijoCalendarioLaboral").html(" Individual");
                                    var date = new Date();
                                    var defaultDia = date.getDate();
                                    var defaultMes = date.getMonth();
                                    var defaultGestion = date.getFullYear();
                                    var fechaIni = "";
                                    var fechaFin = "";
                                    var contadorPerfiles = 0;
                                    var arrHorariosRegistrados = obtenerTodosHorariosRegistradosEnCalendarioPorPerfilYRelaboralParaVerAsignaciones(dataRecord.id_relaboral,idPerfilLaboral,tipoHorario,false,fechaIni,fechaFin,contadorPerfiles);
                                    $("#calendar").html("");
                                    var ci = dataRecord.ci;
                                    var imgurl = '/images/personal/'+ci+'.jpg';
                                    if(!ImageExist(imgurl))imgurl = '/images/perfil-profesional.jpg';
                                    var img = '<img height="100" width="100" src="' + imgurl + '"/>';
                                    $("#spanFotoAsignacionSingle").html(img);
                                    $("#divAsignacionGroup").hide();
                                    $("#divAsignacionSingle").show();
                                    $("#divDatosAsignacionSingle").show();
                                    $("#spanNombreAsignacionSingle").text(dataRecord.nombres);
                                    $("#spanCargoAsignacionSingle").text(dataRecord.cargo);
                                    $("#spanGerenciaAsignacionSingle").text(dataRecord.gerencia_administrativa);
                                    if(dataRecord.departamento_administrativa!=""&&dataRecord.departamento_administrativa!=null){
                                        $("#hDepartamentoAsignacionSingle").show();
                                        $("#spanDepartamentoAsignacionSingle").text(dataRecord.departamento_administrativa);
                                    }
                                    else $("#hDepartamentoAsignacionSingle").hide();
                                    $("#spanCondicionAsignacionSingle").text(dataRecord.condicion);
                                    fechaIni = "";
                                    fechaFin = "";
                                    if(dataRecord.fecha_incor!=""){
                                        fechaIni = fechaConvertirAFormato(dataRecord.fecha_incor,"-");
                                    }else fechaIni = fechaConvertirAFormato(dataRecord.fecha_ini,"-");
                                    if(dataRecord.fecha_baja!=""){
                                        fechaFin = fechaConvertirAFormato(dataRecord.fecha_baja,"-");
                                    }else fechaFin = fechaConvertirAFormato(dataRecord.fecha_fin,"-");
                                    var fechas = fechaIni+" AL "+fechaFin;
                                    $("#spanFechasRelaboralAsignacionSingle").text(fechas);

                                    var arrFechasPorSemana = iniciarCalendarioLaboralPorRelaboralPerfilLaboralParaVerAsignaciones(dataRecord.id_relaboral,5,idPerfilLaboral,tipoHorario,arrHorariosRegistrados,defaultGestion,defaultMes,defaultDia);
                                    sumarTotalHorasPorSemana(arrFechasPorSemana);
                                } else {
                                    var msje = "Para acceder a la vista de la asignaci&oacute;n de turnos de forma individual el registro debe estar ASIGNADO al menos.";
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
                    /*{
                     text: 'Nro.', sortable: false, filterable: false, editable: false,
                     groupable: false, draggable: false, resizable: false,
                     columntype: 'number', width: 50,cellsalign:'center',align:'center'
                     },*/
                    {
                        text: 'Nro.', /*datafield: 'nro_row',*/
                        sortable: false,
                        filterable: false,
                        editable: false,
                        groupable: false,
                        draggable: false,
                        resizable: false,
                        columntype: 'number',
                        width: 30,
                        cellsalign: 'center',
                        align: 'center',
                        cellsrenderer: rownumberrenderer
                    },
                    {
                        text: 'Asignaci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'relaboralperfil_estado_descripcion',
                        width: 100,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Estado',
                        filtertype: 'checkedlist',
                        datafield: 'estado_descripcion',
                        width: 80,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false,
                        cellclassname: cellclass
                    },
                    {
                        text: 'Asig. Ubicaci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'relaboralperfil_ubicacion',
                        width: 100,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Asig. Estaci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'relaboralperfil_estacion',
                        width: 100,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Asig. Fecha Ini',
                        datafield: 'relaboralperfil_fecha_ini',
                        filtertype: 'range',
                        width: 90,
                        cellsalign: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Asig. Fecha Fin',
                        datafield: 'relaboralperfil_fecha_fin',
                        filtertype: 'range',
                        width: 90,
                        cellsalign: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        align: 'center',
                        hidden: false
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
                        text: 'Condici&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'condicion',
                        width: 150,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    /*{
                     text: 'N/C',
                     columntype: 'textbox',
                     filtertype: 'input',
                     datafield: 'num_complemento',
                     width: 40,
                     cellsalign: 'center',
                     align: 'center',
                     hidden: true
                     },*/
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
                        text: 'Fecha Inicio',
                        datafield: 'fecha_ini',
                        filtertype: 'range',
                        width: 200,
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
            {label: 'Ubicaci&oacute;n', value: 'relaboralperfil_ubicacion', checked: true},
            {label: 'Estaci&oacute;n', value: 'relaboralperfil_estacion', checked: true},
            {label: 'Fecha Ini Perfil', value: 'relaboralperfil_fecha_ini', checked: true},
            {label: 'Fecha Fin Perfil', value: 'relaboralperfil_fecha_fin', checked: true},
            {label: 'Nombres y Apellidos', value: 'nombres', checked: true},
            {label: 'CI', value: 'ci', checked: true},
            {label: 'Exp', value: 'expd', checked: true},
            {label: 'Condici&oacute;n', value: 'condicion', checked: true},
            {label: 'Estado', value: 'estado_descripcion', checked: true},
            /*{label: 'N/C', value: 'num_complemento', checked: false},*/
            {label: 'Gerencia', value: 'gerencia_administrativa', checked: true},
            {label: 'Departamento', value: 'departamento_administrativo', checked: true},
            {label: '&Aacute;rea', value: 'area', checked: true},
            {label: 'proceso', value: 'proceso_codigo', checked: true},
            {label: 'Fuente', value: 'fin_partida', checked: true},
            {label: 'Nivel Salarial', value: 'nivelsalarial', checked: true},
            {label: 'Cargo', value: 'cargo', checked: true},
            {label: 'Haber', value: 'sueldo', checked: true},
            {label: 'Fecha Inicio', value: 'fecha_ini', checked: true},
            {label: 'Fecha Incor.', value: 'fecha_incor', checked: true},
            {label: 'Fecha Fin', value: 'fecha_fin', checked: true},
            {label: 'Fecha Baja', value: 'fecha_baja', checked: true},
            {label: 'Motivo Baja', value: 'motivo_baja', checked: true},
            {label: 'Observacion', value: 'observacion', checked: true},
        ];
        $("#lstBoxColumnasDisponibles").jqxListBox({source: listSource, width: "100%", height: 430, checkboxes: true});
        $("#lstBoxColumnasDisponibles").on('checkChange', function (event) {
            $("#divGrillaAsignacionesIndividuales").jqxGrid('beginupdate');
            if (event.args.checked) {
                $("#divGrillaAsignacionesIndividuales").jqxGrid('showcolumn', event.args.value);
            }
            else {
                $("#divGrillaAsignacionesIndividuales").jqxGrid('hidecolumn', event.args.value);
            }
            $("#divGrillaAsignacionesIndividuales").jqxGrid('endupdate');
        });
    }
}
var rownumberrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
    var nro = row + 1;
    return "<div align='center'>" + nro + "</div>";
}

/**
 * Función para validar los datos del formulario de nuevo registro de calendario laboral.
 * @returns {boolean} True: La validación fue correcta; False: La validación anuncia que hay errores en el formulario.
 */
function validaFormularioPorRegistroCalendarioLaboral() {
    var ok = true;

    return ok;
}
/**
 * Función para obtener la fecha de inicio próximo sin registro para un determinado perfil.
 * @param idPerfil
 */
function obtenerFechaDeInicioProximo(idPerfil){
    var arrFecha = [];
    $.ajax({
        url: '/perfileslaborales/getfechainiproximo/',
        type: "POST",
        datatype: 'json',
        async: false,
        cache: false,
        data: {id: idPerfil},
        success: function (data) {
            var res = jQuery.parseJSON(data);
            if (res.length > 0) {
                $.each(res, function (key, val) {
                    arrFecha.push( {
                        dia:val.dia,
                        mes:val.mes,
                        gestion:val.gestion
                    });
                });
            }
        }
    });
    return arrFecha;
}
/**
 * Función para obtener la fecha del último día de un determinado mes en una determinada gestión.
 * @param fecha
 * @returns {Array}
 */
function obtenerUltimoDiaMes(fecha){
    var fecha = $.ajax({
        url: '/perfileslaborales/getultimafechames/',
        type: "POST",
        datatype: 'json',
        async: false,
        cache: false,
        data: {fecha: fecha},
        success: function (data) {
        }
    }).responseText;
    return fecha;
}
/**
 * Función para obtener la fecha a la cual se le restan una cantidad determinada de días.
 * @param fecha
 * @param dias
 * @returns {*}
 */
function obtenerFechaMenosDias(fecha,dias){
    var fechaRes = fecha;
    if(dias>0){
        var fechaRes = $.ajax({
            url: '/perfileslaborales/getfechamenosdias/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {fecha: fecha,dias:dias},
            success: function (data) {
            }
        }).responseText;
    }
    return fechaRes;
}
/**
 * Función para obtener la fecha a la cual se le suman una cantidad determinada de días.
 * @param fecha
 * @param dias
 * @returns {*}
 */
function obtenerFechaMasDias(fecha,dias){
    var fechaRes = fecha;
    if(dias>0){
        var fechaRes = $.ajax({
            url: '/perfileslaborales/getfechamasdias/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {fecha: fecha,dias:dias},
            success: function (data) {
            }
        }).responseText;
    }
    return fechaRes;
}
/**
 * Función para cargar la lista de ubicaciones principales.
 * La particularidad de esta función es que sólo muestra la ubicación preestablecida
 * @param accion
 * @param idUbicacion
 */
function cargarUbicacionesPrincipalesAsignacionIndividual(accion,idUbicacion){
    var selected = "";
    var selector = "Entrada";
    if(accion==2)selector="Salida";
    $("#lstUbicaciones"+selector+"AsignacionSingle").html("");
    $("#lstUbicaciones"+selector+"AsignacionSingle").append("<option value='0' data-cant-nodos-hijos='0'>Seleccionar...</option>");
    $("#lstUbicaciones"+selector+"AsignacionSingle").prop("disabled",true);
    if(idUbicacion>0){
        $.ajax({
            url: '/ubicaciones/listprincipales/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            success: function (data) {
                var res = jQuery.parseJSON(data);
                if (res.length > 0) {
                    $("#lstUbicaciones"+selector+"AsignacionSingle").prop("disabled",false);
                    $.each(res, function (key, val) {
                        if(idUbicacion==val.id){
                            selected = "selected";
                        }else selected="";
                        $("#lstUbicaciones"+selector+"AsignacionSingle").append("<option value='"+val.id+"' data-cant-nodos-hijos='"+val.cant_nodos_hijos+"' "+selected+">"+val.ubicacion+"</option>");
                    });
                }else $("#lstUbicaciones"+selector+"AsignacionSingle").prop("disabled",true);
            }
        });
    }
}
/**
 * Función para cargar la lista correspondiente a las estaciones por línea.
 * @param accion
 * @param idUbicacion
 * @param idLinea
 */
function cargarEstacionesAsignacionIndividual(accion,idUbicacion,idEstacion){
    var selector = "Entrada";
    if(accion==2) selector="Salida";
    $("#lstEstaciones"+selector+"AsignacionSingle").html("");
    $("#lstEstaciones"+selector+"AsignacionSingle").append("<option value='0'>Seleccionar...</option>");
    $("#lstEstaciones"+selector+"AsignacionSingle").prop("disabled","disabled");
    $("#spanAsteriscoEstaciones"+selector+"AsignacionSingle").html("");
    var selected = "";
    if(idUbicacion>0){
        $.ajax({
            url: '/ubicaciones/listestaciones/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {id:idUbicacion},
            success: function (data) {
                var res = jQuery.parseJSON(data);
                if (res.length > 0) {
                    $("#lstEstaciones"+selector+"AsignacionSingle").prop("disabled",false);
                    $("#spanAsteriscoEstaciones"+selector+"AsignacionSingle").text(" *");
                    $.each(res, function (key, val) {
                        if(idEstacion==val.id){
                            selected = "selected";
                        }else selected = "";
                        $("#lstEstaciones"+selector+"AsignacionSingle").append("<option value='"+val.id+"' "+selected+">"+val.ubicacion+"</option>");
                    });
                }else $("#lstEstaciones"+selector+"AsignacionSingle").prop("disabled","disabled");
            }
        });
    }
}
/**
 * Función para la generación de la ventana modal para el registro de una nueva asignación de perfil laboral de manera individual.
 * @param accion
 * @param idUbicacionEntrada
 * @param idEstacionEntrada
 * @param tipoMarcacionEntrada
 * @param fechaIni
 * @param fechaFin
 * @param observacion
 */
function generaModalAdicionAsignacionSinglePerfilLaboral(accion,idUbicacionEntrada,idUbicacionSalida,idEstacionEntrada,idEstacionSalida,tipoMarcacionEntrada,tipoMarcacionSalida,fechaIni,fechaFin,fechaMin,fechaMax,observacion){

    $('#txtFechaIniAsignacionSingle').datepicker('remove');
    $('#txtFechaIniAsignacionSingle').datepicker({
        startDate: fechaMin,
        endDate: fechaMax
    });
    $('#txtFechaFinAsignacionSingle').datepicker('remove');
    $('#txtFechaFinAsignacionSingle').datepicker({
        startDate: fechaMin,
        endDate: fechaMax
    });

    $('#txtFechaIniAsignacionSingle').data("date-min",fechaMin);
    $('#txtFechaIniAsignacionSingle').data("date-max",fechaMax);
    $('#txtFechaFinAsignacionSingle').data("date-min",fechaMin);
    $('#txtFechaFinAsignacionSingle').data("date-max",fechaMax);

    if(accion==1){
        $("#lstEstacionesEntradaAsignacionSingle").html("");
        $("#lstEstacionesEntradaAsignacionSingle").append("<option value='0'>Seleccionar...</option>");
        $("#lstEstacionesEntradaAsignacionSingle").prop("disabled",true);
        $("#lstEstacionesSalidaAsignacionSingle").html("");
        $("#lstEstacionesEntradaAsignacionSingle").append("<option value='0'>Seleccionar...</option>");
        $("#lstEstacionesEntradaAsignacionSingle").prop("disabled",true);
        limpiarMensajesErrorPorValidacionAsignacionSinglePerfil(1);
        cargarUbicacionesPrincipalesAsignacionIndividual(1,idUbicacionEntrada);
        cargarUbicacionesPrincipalesAsignacionIndividual(2,idUbicacionSalida);
        cargarEstacionesAsignacionIndividual(1,idUbicacionEntrada,idEstacionEntrada);
        cargarEstacionesAsignacionIndividual(2,idUbicacionSalida,idEstacionSalida);
        $("#lstUbicacionesEntradaAsignacionSingle").off();
        $("#lstUbicacionesEntradaAsignacionSingle").on("change",function(){
            cargarEstacionesAsignacionIndividual(1,$(this).val(),0);
        });
        $("#lstUbicacionesSalidaAsignacionSingle").off();
        $("#lstUbicacionesSalidaAsignacionSingle").on("change",function(){
            cargarEstacionesAsignacionIndividual(2,$(this).val(),0);
        });

        $("#txtFechaIniAsignacionSingle").val(fechaMin);
        $("#txtFechaFinAsignacionSingle").val(fechaMax);
        cargarTiposMarcaciones(1,tipoMarcacionEntrada);
        cargarTiposMarcaciones(2,tipoMarcacionSalida);
        $("#txtObservacionAsignacionSingle").val("");
    }else{
        limpiarMensajesErrorPorValidacionAsignacionSinglePerfil(2);
        cargarUbicacionesPrincipalesAsignacionIndividual(1,idUbicacionEntrada);
        cargarUbicacionesPrincipalesAsignacionIndividual(2,idUbicacionSalida);
        cargarEstacionesAsignacionIndividual(1,idUbicacionEntrada,idEstacionEntrada);
        cargarEstacionesAsignacionIndividual(2,idUbicacionSalida,idEstacionSalida);

        $("#lstUbicacionesEntradaAsignacionSingle").off();
        $("#lstUbicacionesEntradaAsignacionSingle").on("change",function(){
            cargarEstacionesAsignacionIndividual(1,$(this).val(),0);
        });
        $("#lstUbicacionesSalidaAsignacionSingle").off();
        $("#lstUbicacionesSalidaAsignacionSingle").on("change",function(){
            cargarEstacionesAsignacionIndividual(2,$(this).val(),0);
        });
        $("#txtFechaIniAsignacionSingle").datepicker("update",fechaIni);
        $("#txtFechaFinAsignacionSingle").datepicker("update",fechaFin);
        cargarTiposMarcaciones(1,tipoMarcacionEntrada);
        cargarTiposMarcaciones(2,tipoMarcacionSalida);
        $("#txtObservacionAsignacionSingle").val(observacion);
    }
    $('#popupAsignacionPerfilLaboral').modal('show');
    $("#lstUbicacionesEntradaAsignacionSingle").focus();
}
/**
 * Función para la validación del formulario de asignación de perfil laboral.
 * @param accion
 */
function validaFormularioAsignacionSinglePerfilLaboral(accion,idRelaboralPerfil,idRelaboral,idPerfilLaboral,fechaIni,fechaFin){
    var ok = true;
    var idUbicacionEntrada = $("#lstUbicacionesEntradaAsignacionSingle").val();
    var ctrlEstacionEntrada = $("#lstUbicacionesEntradaAsignacionSingle option:selected").data("cant-nodos-hijos");
    var idEstacionEntrada = $("#lstEstacionesEntradaAsignacionSingle").val();

    var idUbicacionSalida = $("#lstUbicacionesSalidaAsignacionSingle").val();
    var ctrlEstacionSalida = $("#lstUbicacionesSalidaAsignacionSingle option:selected").data("cant-nodos-hijos");
    var idEstacionSalida = $("#lstEstacionesSalidaAsignacionSingle").val();

    var fechaIni = $("#txtFechaIniAsignacionSingle").val();
    var fechaFin = $("#txtFechaFinAsignacionSingle").val();
    var tipoMarcacionEntrada = $("#lstTiposMarcacionesEntradaAsignacionSingle").val();
    var tipoMarcacionSalida = $("#lstTiposMarcacionesSalidaAsignacionSingle").val();
    limpiarMensajesErrorPorValidacionAsignacionSinglePerfil(accion);
    var enfoque = "";
    if(idUbicacionEntrada<=0){
        ok = false;
        var msje = "Debe seleccionar la Ubicaci&oacute;n de Entrada para la asignaci&oacute;n necesariamente.";
        $("#divUbicacionesEntradaAsignacionSingle").addClass("has-error");
        $("#helpErrorUbicacionesEntradaAsignacionSingle").html(msje);
        if(enfoque==null)enfoque =$("#LstUbicacionesEntradaAsignacionSingle");
    }else{
        if(ctrlEstacionEntrada>0){
            if(idEstacionEntrada<=0){
                ok = false;
                var msje = "Debe seleccionar la Estaci&oacute;n de Entrada para la asignaci&oacute;n necesariamente.";
                $("#divEstacionesEntradaAsignacionSingle").addClass("has-error");
                $("#helpErrorEstacionesEntradaAsignacionSingle").html(msje);
                if(enfoque==null)enfoque =$("#LstEstacionesEntradaAsignacionSingle");
            }
        }
    }
    if(idUbicacionSalida<=0){
        ok = false;
        var msje = "Debe seleccionar la Ubicaci&oacute;n de Salida para la asignaci&oacute;n necesariamente.";
        $("#divUbicacionesSalidaAsignacionSingle").addClass("has-error");
        $("#helpErrorUbicacionesSalidaAsignacionSingle").html(msje);
        if(enfoque==null)enfoque =$("#LstUbicacionesSalidaAsignacionSingle");
    }else{
        if(ctrlEstacionSalida>0){
            if(idEstacionSalida<=0){
                ok = false;
                var msje = "Debe seleccionar la Estaci&oacute;n de Salida para la asignaci&oacute;n necesariamente.";
                $("#divEstacionesSalidaAsignacionSingle").addClass("has-error");
                $("#helpErrorEstacionesSalidaAsignacionSingle").html(msje);
                if(enfoque==null)enfoque =$("#LstEstacionesSalidaAsignacionSingle");
            }
        }
    }
    if(fechaIni==""){
        ok = false;
        var msje = "Debe seleccionar la Fecha de Inicio para la asignaci&oacute;n necesariamente.";
        $("#divFechaIniAsignacionSingle").addClass("has-error");
        $("#helpErrorFechaIniAsignacionSingle").html(msje);
        if(enfoque==null)enfoque =$("#TxtFechaIniAsignacionSingle");
    }
    if(fechaFin==""){
        ok = false;
        var msje = "Debe seleccionar la Fecha de Finalizaci&oacute;n para la asignaci&oacute;n necesariamente.";
        $("#divFechaFinAsignacionSingle").addClass("has-error");
        $("#helpErrorFechaFinAsignacionSingle").html(msje);
        if(enfoque==null)enfoque =$("#TxtFechaFinAsignacionSingle");
    }
    if(fechaIni!=""&&fechaFin!=""){
        var sep='-';
        if(procesaTextoAFecha(fechaIni,sep)>procesaTextoAFecha(fechaFin,sep)){
            ok = false;
            var msje = "La Fecha de Finalizaci&oacute;n debe ser igual o mayor a la Fecha de Inicio.";
            $("#divFechaIniAsignacionSingle").addClass("has-error");
            $("#helpErrorFechaIniAsignacionSingle").html(msje);
            $("#divFechaFinAsignacionSingle").addClass("has-error");
            $("#helpErrorFechaFinAsignacionSingle").html(msje);
            if(enfoque==null)enfoque =$("#TxtFechaFinAsignacionSingle");
        }else{
            var fechaMin = $('#txtFechaIniAsignacionSingle').data("date-min");
            var fechaMax = $('#txtFechaIniAsignacionSingle').data("date-max");
            if(procesaTextoAFecha(fechaMin,sep)>procesaTextoAFecha(fechaIni,sep)){
                ok = false;
                var msje = "La Fecha de Inicio no puede ser superior a "+fechaMin+".";
                $("#divFechaIniAsignacionSingle").addClass("has-error");
                $("#helpErrorFechaIniAsignacionSingle").html(msje);
                if(enfoque==null)enfoque =$("#TxtFechaIniAsignacionSingle");
            }
            if(procesaTextoAFecha(fechaMax,sep)<procesaTextoAFecha(fechaFin,sep)){
                ok = false;
                var msje = "La Fecha de Finalizaci&oacute;n no puede ser superior a "+fechaMax+".";
                $("#divFechaFinAsignacionSingle").addClass("has-error");
                $("#helpErrorFechaFinAsignacionSingle").html(msje);
                if(enfoque==null)enfoque =$("#TxtFechaFinAsignacionSingle");
            }

        }
    }
    if(tipoMarcacionEntrada<0||tipoMarcacionEntrada==''){
        ok = false;
        var msje = "Debe seleccionar donde puede marcar su asistencia necesariamente.";
        $("#divTiposMarcacionesEntradaAsignacionSingle").addClass("has-error");
        $("#helpErrorTiposMarcacionesEntradaAsignacionSingle").html(msje);
        if(enfoque==null)enfoque =$("#sltTiposMarcacionesEntradaAsignacionSingle");
    }
    if(tipoMarcacionSalida<0||tipoMarcacionSalida==''){
        ok = false;
        var msje = "Debe seleccionar donde puede marcar su asistencia necesariamente.";
        $("#divTiposMarcacionesSalidaAsignacionSingle").addClass("has-error");
        $("#helpErrorTiposMarcacionesSalidaAsignacionSingle").html(msje);
        if(enfoque==null)enfoque =$("#sltTiposMarcacionesSalidaAsignacionSingle");
    }
    /**
     * Se usa cualquier idUbicacionEntrada pero se puede usar también idUbicacionSalida de igual manera.
     * @type {boolean}
     */
    var ok2 = verificaSobrePosicionDePerfiles(idRelaboralPerfil,idRelaboral,idPerfilLaboral,idUbicacionEntrada,fechaIni,fechaFin);
    if(ok2){
        ok=false;
        var msje = "Existe ya un registro de perfil con sobreposici&oacute;n de fechas con el perfil que intenta registrar para esta persona.";
        $("#divMsjePorError").html("");
        $("#divMsjePorError").append(msje);
        $("#divMsjeNotificacionError").jqxNotification("open");
    }
    return ok;
}
/**
 * Función para limpiar el formulario de mensajes de errores.
 * @param accion
 */
function limpiarMensajesErrorPorValidacionAsignacionSinglePerfil(accion){
    var sufijo = "";
    if(accion==2)sufijo="";
    
    $("#divUbicacionesEntradaAsignacionSingle"+sufijo).removeClass("has-error");
    $("#helpErrorUbicacionesEntradaAsignacionSingle"+sufijo).html("");

    $("#divUbicacionesSalidaAsignacionSingle"+sufijo).removeClass("has-error");
    $("#helpErrorUbicacionesSalidaAsignacionSingle"+sufijo).html("");

    $("#divEstacionesEntradaAsignacionSingle"+sufijo).removeClass("has-error");
    $("#helpErrorEstacionesEntradaAsignacionSingle"+sufijo).html("");

    $("#divEstacionesSalidaAsignacionSingle"+sufijo).removeClass("has-error");
    $("#helpErrorEstacionesSalidaAsignacionSingle"+sufijo).html("");

    $("#divFechaIniAsignacionSingle"+sufijo).removeClass("has-error");
    $("#helpErrorFechaIniAsignacionSingle"+sufijo).html("");

    $("#divFechaFinAsignacionSingle"+sufijo).removeClass("has-error");
    $("#helpErrorFechaFinAsignacionSingle"+sufijo).html("");

    $("#divTiposMarcacionesEntradaAsignacionSingle"+sufijo).removeClass("has-error");
    $("#helpErrorTiposMarcacionesEntradaAsignacionSingle"+sufijo).html("");

    $("#divTiposMarcacionesSalidaAsignacionSingle"+sufijo).removeClass("has-error");
    $("#helpErrorTiposMarcacionesSalidaAsignacionSingle"+sufijo).html("");
}

/**
 * Función para iniciar el calendario laboral de acuerdo al registro de relación laboral, perfil laboral y rango de fechas seleccionado.
 * Se despliega la totalidad de horarios para el registro de relación laboral por lo que se muestran los botones de navegación del calendario.
 * @param idRelaboral
 * @param accion
 * @param tipoHorario
 * @param arrHorariosRegistrados
 * @param defaultGestion
 * @param defaultMes
 * @param defaultDia
 * @returns {Array}
 */
function iniciarCalendarioLaboralPorRelaboralPerfilLaboralParaVerAsignaciones(idRelaboral,accion,idPerfilLaboral,tipoHorario,arrHorariosRegistrados,defaultGestion,defaultMes,defaultDia) {
    tipoHorario = parseInt(tipoHorario);
    var arrFechasPorSemana = [];
    var contadorPorSemana = 0;
    var diasSemana=7;
    var calendarEvents  = $('.calendar-events');
    /* Inicializa la funcionalidad de eventos: arrastrar y soltar */
    //initEvents();

    /* Initialize FullCalendar */
    var optLeft = 'prev,next';
    var optRight = 'year,month,agendaWeek,agendaDay';
    var optEditable = true;
    var optDroppable = true;
    var optSelectable = true;
    var optVerFinesDeSemana= true;
    var optVerTotalizadorHorasPorSemana=true;
    //weekends
    switch (accion){
        case 1:/*Nuevo*/
            switch (tipoHorario){
                case 1:
                case 2:break;
                case 3:optLeft='';optRight='year';break;
            }
            break;
        case 2:/*Edición*/
            switch (tipoHorario){
                case 1:
                case 2:break;
                case 3:optLeft='';optRight='year';break;
            }
            break;
        case 3:/*Aprobación*/
            switch (tipoHorario){
                case 1:
                case 2:break;
                case 3:optLeft='';optRight='year';break;
            }
            break;
        case 4:/*Eliminación*/break;
        case 5:/*Vista*/
            optEditable=false;
            optDroppable=false;
            optSelectable=false;
            switch (tipoHorario){
                case 1:
                case 2:break;
                case 3:break;
            }
            break;
    }
    switch (tipoHorario){
        case 1:
        case 2:optVerFinesDeSemana=false;diasSemana=5;optVerTotalizadorHorasPorSemana=false;break;
        case 3:break;
    }
    $('#calendar').fullCalendar({
        header: {
            left: optLeft,
            center: 'title',
            right: optRight
        },
        year:defaultGestion,
        month:defaultMes,
        date:defaultDia,
        firstDay: 1,
        weekends:optVerFinesDeSemana,
        editable: optEditable,
        droppable: optDroppable,
        selectable: optSelectable,
        weekNumbers:true,
        weekNumberTitle:"#S",
        timeFormat: 'H(:mm)', // Mayusculas H de 24-horas
        drop: function(date, allDay) {

            /**
             * Controlando cuando se introduce un nuevo evento u horario en el calendario
             * @type {*|jQuery}
             */

            // Recuperar almacenado de objeto del evento del elemento caído
            var originalEventObject = $(this).data('eventObject');

            // Tenemos que copiarlo, de modo que múltiples eventos no tienen una referencia al mismo objeto
            var copiedEventObject = $.extend({}, originalEventObject);

            // Asignarle la fecha que fue reportado
            copiedEventObject.start = date;


            // Hacer que el evento en el calendario
            // El último argumento `true` determina si el evento "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

            /**
             * Si se introduce un nuevo horario en el calendario se recalcula los totales por semana.
             */
            sumarTotalHorasPorSemana(arrFechasPorSemana);

        }
        ,
        eventDrop: function (event, dayDelta, minuteDelta, allDay, revertFunc) {
            /**
             * Si un horario se ha movido, es necesario calcular los totales de horas por semana
             */
            sumarTotalHorasPorSemana(arrFechasPorSemana);
        },
        events: arrHorariosRegistrados,
        /**
         * Controlando el evento de clik sobre el horario.
         * @param calEvent
         * @param jsEvent
         * @param view
         */
        eventClick: function(calEvent, jsEvent, view) {

            var clase = calEvent.className+"";
            var arrClass = clase.split("_");
            var idTipoHorario = arrClass[1];
            clase = arrClass[0];
            var idTurno = 0;
            if(calEvent.id!=undefined){
                idTurno = calEvent.id;
            }
            var fechaIni = fechaConvertirAFormato(calEvent.start,'-');
            var fechaFin =  fechaIni;
            var calEventEnd = calEvent.start;
            if(calEvent.end!=null&&calEvent.end!=""){
                fechaFin = fechaConvertirAFormato(calEvent.end,'-');
                calEventEnd = calEvent.end;
            }
            var startDate = calEvent.start;
            var FromEndDate = calEventEnd;
            var ToEndDate = calEventEnd;
            //ToEndDate.setDate(ToEndDate.getDate()+900);

            $("#txtHorarioFechaIni").datepicker('setDate', calEvent.start);
            //$('#txtHorarioFechaIni').datepicker('setStartDate', calEvent.start);
            $("#txtHorarioFechaFin").datepicker('setDate', calEventEnd);
            //$('#txtHorarioFechaFin').datepicker('setEndDate', calEventEnd);
            $('#txtHorarioFechaIni').datepicker({
                format:'dd-mm-yyyy',
                default:calEvent.start,
                weekStart: 1,
                startDate: startDate,
                endDate: FromEndDate,
                autoclose: true
            })
                .on('changeDate', function(selected){
                    startDate = new Date(selected.date.valueOf());
                    startDate.setDate(startDate.getDate(new Date(selected.date.valueOf())));
                    $('#txtHorarioFechaFin').datepicker('setStartDate', startDate);
                });
            $('#txtHorarioFechaFin').datepicker({
                default:calEventEnd,
                weekStart: 1,
                startDate: startDate,
                endDate: ToEndDate,
                autoclose: true
            })
                .on('changeDate', function(selected){
                    FromEndDate = new Date(selected.date.valueOf());
                    FromEndDate.setDate(FromEndDate.getDate(new Date(selected.date.valueOf())));
                    $('#txtHorarioFechaIni').datepicker('setEndDate', FromEndDate);
                });
            if(idTipoHorario>0){
                var ok = cargarModalHorario(idTipoHorario);
                if(ok) {
                    /**
                     * Si la clase del horario esta bloqueada no se la puede eliminar
                     */
                    if(clase=="b"){
                        $("#btnDescartarHorario").hide();
                        $("#btnGuardarModificacionHorario").hide();
                        $("#txtHorarioFechaIni").prop("disabled","disabled");
                        $("#txtHorarioFechaFin").prop("disabled","disabled");
                    } else {
                        $("#btnDescartarHorario").show();
                        $("#txtHorarioFechaIni").prop("disabled",false);
                        $("#txtHorarioFechaFin").prop("disabled",false);
                    }
                    $('#popupDescripcionHorario').modal('show');
                    $("#btnDescartarHorario").off();
                    $("#btnDescartarHorario").on("click", function () {
                        switch (clase){
                            case "r":
                            case "d":
                                var okBaja = bajaTurnoEnCalendario(idTurno);
                                if(okBaja){
                                    $('#calendar').fullCalendar('removeEvents', calEvent._id);
                                    $('#popupDescripcionHorario').modal('hide');
                                }
                                break;
                            case "n":
                                $('#calendar').fullCalendar('removeEvents', calEvent._id);
                                $('#popupDescripcionHorario').modal('hide');
                                break;
                        }
                        /**
                         * Si se ha eliminado un horario, es necesario recalcular las horas por semana
                         */
                        sumarTotalHorasPorSemana(arrFechasPorSemana);
                    });
                    /**
                     * Acción efectuada cuando se hace click sobre el botón para Guardar Modifificación de Fechas.
                     */
                    $("#btnGuardarModificacionHorario").off();
                    $("#btnGuardarModificacionHorario").on("click", function () {
                        switch (clase){
                            case "r":
                            case "n":
                                if(fechaIni!=$("#txtHorarioFechaIni").val()||fechaFin!=$("#txtHorarioFechaFin").val()){
                                    /*Inicialmente borramos el evento y lo reingresamos*/
                                    $('#calendar').fullCalendar('removeEvents', calEvent._id);
                                    $('#popupDescripcionHorario').modal('hide');
                                    var fechaInicio = $("#txtHorarioFechaIni").val();
                                    var fechaFinalizacion = $("#txtHorarioFechaFin").val();
                                    var arrFechaInicio =fechaInicio.split("-");
                                    var arrFechaFinalizacion= fechaFinalizacion.split("-");
                                    fechaInicio = arrFechaInicio[2]+"-"+arrFechaInicio[1]+"-"+arrFechaInicio[0];
                                    fechaFinalizacion = arrFechaFinalizacion[2]+"-"+arrFechaFinalizacion[1]+"-"+arrFechaFinalizacion[0];
                                    addEvent = {
                                        id:calEvent.id,
                                        title:calEvent.title,
                                        className:calEvent.className,
                                        start:fechaInicio,
                                        end:fechaFinalizacion,
                                        color:calEvent.color,
                                        editable: true,
                                        hora_entrada:calEvent.hora_entrada,
                                        hora_salida:calEvent.hora_salida

                                    }
                                    $('#calendar').fullCalendar( 'renderEvent', addEvent, true );
                                }
                                $('#popupDescripcionHorario').modal('hide');
                                break;
                            case "d":break;
                        }
                        /**
                         * Si se ha eliminado un horario, es necesario recalcular las horas por semana
                         */
                        sumarTotalHorasPorSemana(arrFechasPorSemana);
                    });
                }else alert("Error al determinar los datos del horario.");
            }else {
                alert("El registro corresponde a un periodo de descanso");
            }
        }
        ,
        eventResize: function(event, delta, revertFunc) {
            /**
             * Cuando un horario es modificado en cuanto a su duración, se debe calcular nuevamente los totales de horas por semana
             */
            sumarTotalHorasPorSemana(arrFechasPorSemana);

        },
        /*dayRender: function (date, cell) {},*/
        viewRender: function(view) {

            switch (view.name){
                case "month":
                {   //$("#divSumatorias").show();
                    removerColumnaSumaTotales();
                    agregarColumnaSumaTotales(diasSemana);
                    var primeraFechaCalendario = "";
                    var segundaFechaCalendario = "";
                    arrFechasPorSemana= [];
                    var contP=0;
                    var arrDias = ["mon","tue","wed","thu","fri","sat","sun"];
                    $.each(arrDias,function(k,dia){
                        contP=0;
                        $("td.fc-"+dia).map(function (index, elem) {
                            contP++;
                            var fecha = $(this).data("date");
                            var fechaAux = $(this).data("date");
                            if(fecha!=undefined){
                                var arrFecha = fecha.split("-");
                                fecha = arrFecha[2]+"-"+arrFecha[1]+"-"+arrFecha[0];
                                switch (contP){
                                    case 1:{
                                        if(primeraFechaCalendario=="")primeraFechaCalendario = fecha;
                                        arrFechasPorSemana.push( {semana:1,fecha:fecha});}
                                        break;
                                    case 2:arrFechasPorSemana.push( {semana:2,fecha:fecha});break;
                                    case 3:arrFechasPorSemana.push( {semana:3,fecha:fecha});break;
                                    case 4:arrFechasPorSemana.push( {semana:4,fecha:fecha});break;
                                    case 5:arrFechasPorSemana.push( {semana:5,fecha:fecha});break;
                                    case 6:{
                                        segundaFechaCalendario = fecha;
                                        arrFechasPorSemana.push( {semana:6,fecha:fecha});
                                    }break;
                                }
                                var check = fechaAux;
                                var today = $.fullCalendar.formatDate(new Date(),'yyyy-MM-dd');
                                if (check < today) {
                                    $(this).css("background-color", "silver");
                                }
                            }
                        });
                    });
                    sumarTotalHorasPorSemana(arrFechasPorSemana);
                    var fechaInicialCalendario = "";
                    var fechaFinalCalendario = "";
                    var moment = $('#calendar').fullCalendar('getDate');
                    fechaInicialCalendario = fechaConvertirAFormato(moment,'-');
                    var arrFechaInicial = fechaInicialCalendario.split("-");
                    fechaInicialCalendario = "01-"+arrFechaInicial[1]+"-"+arrFechaInicial[2];
                    fechaFinalCalendario =  obtenerUltimoDiaMes(fechaInicialCalendario);
                    $("#hdnFechaInicialCalendario").val(fechaInicialCalendario);
                    $("#hdnFechaFinalCalendario").val(fechaFinalCalendario);
                    cargarGrillaAsignacionIndividualFechasUbicacionEstacion(idPerfilLaboral,idRelaboral,primeraFechaCalendario,segundaFechaCalendario);
                }
                    break;
                case "agendaWeek":
                    fechaInicialCalendario = $('#calendar').fullCalendar('getView').start;
                    fechaInicialCalendario = fechaConvertirAFormato(fechaInicialCalendario,"-");
                    fechaFinalCalendario = obtenerFechaMasDias(fechaInicialCalendario,diasSemana-1);
                    $("#hdnFechaInicialCalendario").val(fechaInicialCalendario);
                    $("#hdnFechaFinalCalendario").val(fechaFinalCalendario);
                    cargarGrillaAsignacionIndividualFechasUbicacionEstacion(idPerfilLaboral,idRelaboral,fechaInicialCalendario,fechaFinalCalendario);
                    break;
                case "agendaDay":
                    var moment = $('#calendar').fullCalendar('getDate');
                    var fechaInicialCalendario = fechaConvertirAFormato(moment,'-');
                    fechaFinalCalendario = fechaInicialCalendario;
                    $("#hdnFechaInicialCalendario").val(fechaInicialCalendario);
                    $("#hdnFechaFinalCalendario").val(fechaFinalCalendario);
                    cargarGrillaAsignacionIndividualFechasUbicacionEstacion(idPerfilLaboral,idRelaboral,fechaInicialCalendario,fechaFinalCalendario);
                    break;
            }
            definirListaAsignados(idPerfilLaboral,$("#lstUbicacionesPrincipales").val(),$("#lstEstacionesAsignadas").val(),fechaInicialCalendario,fechaFinalCalendario);
        }
    });
    return arrFechasPorSemana;
}
/**
 * Función para la carga de la grilla de asignación individual para un registro de relación laboral, un perfil y una rango de fechas.
 * @param idPerfilLaboral
 * @param dataRecord
 */
function cargarGrillaAsignacionIndividualFechasUbicacionEstacion(idPerfilLaboral,idRelaboral,fechaIni,fechaFin){
    if(idPerfilLaboral>0&&idRelaboral>0&&fechaIni!=""&&fechaFin!=""){
        $("#tbody_asignacion_single").html("");
        $.ajax({
            url: '/calendariolaboral/listregisteredbyperfilyrelaboral',
            type: 'POST',
            datatype: 'json',
            async: false,
            cache: false,
            data: {id:idRelaboral,id_perfillaboral:idPerfilLaboral,fecha_ini:fechaIni,fecha_fin:fechaFin},
            success: function (data) {
                var res = jQuery.parseJSON(data);
                var contador = 1;
                if (res.length > 0) {
                    $.each(res, function (key, val) {
                        var arrFechaIni = val.calendario_fecha_ini.split("-");
                        var fechaIni = arrFechaIni[2]+"-"+arrFechaIni[1]+"-"+arrFechaIni[0];
                        var arrFechaFin = val.calendario_fecha_fin.split("-");
                        var fechaFin = arrFechaFin[2]+"-"+arrFechaFin[1]+"-"+arrFechaFin[0];
                        var estacion = "";
                        if(val.relaboralperfil_estacion!=null)estacion=val.relaboralperfil_estacion;
                        $("#tbody_asignacion_single").append("<tr><td style='text-align: center'>"+contador+"</td><td style='text-align: center'>"+fechaIni+"</td><td style='text-align: center'>"+fechaFin+"</td><td style='text-align: center'>"+val.relaboralperfil_ubicacion+"</td><td style='text-align: center'>"+estacion+"</td><td style='text-align: center'>"+val.hora_entrada+"</td><td style='text-align: center'>"+val.hora_salida+"</td><td>"+val.relaboralperfil_observacion+"</td></tr>");
                        contador++;
                    });
                }
            }
        });
    }
}
/**
 * Función para desplegar los tipos de marcación admitidas en el sistema.
 * @param accion
 * @param tipoMarcacion
 */
function cargarTiposMarcaciones(accion,tipoMarcacion){
    var selected = "";
    var selector = "Entrada";
    if(accion==2)selector="Salida";
    $("#lstTiposMarcaciones"+selector+"AsignacionSingle").html("");
    $("#lstTiposMarcaciones"+selector+"AsignacionSingle").append("<option value='-1' data-cant-nodos-hijos='0'>Seleccionar...</option>");
    $("#lstTiposMarcaciones"+selector+"AsignacionSingle").prop("disabled",true);
    $.ajax({
        url: '/relaboralesperfiles/listtiposmarcaciones/',
        type: "POST",
        datatype: 'json',
        async: false,
        cache: false,
        success: function (data) {
            var res = jQuery.parseJSON(data);
            if (res.length > 0) {
                $("#lstTiposMarcaciones"+selector+"AsignacionSingle").prop("disabled",false);
                $.each(res, function (key, val) {
                    if(tipoMarcacion==val.tipo_marcacion){
                        selected = "selected";
                    }else selected="";
                    $("#lstTiposMarcaciones"+selector+"AsignacionSingle").append("<option value='"+val.tipo_marcacion+"' "+selected+">"+val.tipo_marcacion_descripcion_html+"</option>");
                });
            }else $("#lstTiposMarcaciones"+selector+"AsignacionSingle").prop("disabled",true);
        }
    });
}