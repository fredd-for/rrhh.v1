/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  03-03-2015
 */
/**
 * Función para la definición de la grilla que contiene la lista de registros tanto de marcaciones debidas como marcaciones realizadas.
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
function definirGrillaParaListaControlMarcacionesDebidasYRealizadasPorIdRelaboralGestionMes(idRelaboral,idPersona,nombres,ci) {
    var numComplemento="";
    /*var fechaIng=dataRecordRelaboral.fecha_ing;
    var fechaIncor=dataRecordRelaboral.fecha_incor;
    var fechaIni=dataRecordRelaboral.fecha_ini;
    var fechaFin=dataRecordRelaboral.fecha_fin;
    var fechaBaja=dataRecordRelaboral.fecha_baja;*/
    var source =
    {
        datatype: "json",
        datafields: [
            {name: 'nro_row', type: 'integer'},
            {name: 'id', type: 'integer'},
            {name: 'relaboral_id', type: 'integer'},
            {name: 'gestion', type: 'integer'},
            {name: 'mes', type: 'integer'},
            {name: 'mes_nombre', type: 'string'},
            {name: 'turno', type: 'integer'},
            {name: 'grupo', type: 'integer'},
            {name: 'clasemarcacion', type: 'string'},
            {name: 'clasemarcacion_descripcion', type: 'string'},
            {name: 'modalidadmarcacion_id', type: 'integer'},
            {name: 'modalidad_marcacion', type: 'string'},
            {name: 'd1', type: 'time'},
            {name: 'calendariolaboral1_id', type: 'integer'},
            {name: 'estado1', type: 'integer'},
            {name: 'estado1_descripcion', type: 'string'},
            {name: 'd2', type: 'string'},
            {name: 'calendariolaboral2_id', type: 'integer'},
            {name: 'estado2', type: 'integer'},
            {name: 'estado2_descripcion', type: 'string'},
            {name: 'd3', type: 'time'},
            {name: 'calendariolaboral3_id', type: 'integer'},
            {name: 'estado3', type: 'integer'},
            {name: 'estado3_descripcion', type: 'string'},
            {name: 'd4', type: 'time'},
            {name: 'calendariolaboral4_id', type: 'integer'},
            {name: 'estado4', type: 'integer'},
            {name: 'estado4_descripcion', type: 'string'},
            {name: 'd5', type: 'time'},
            {name: 'calendariolaboral5_id', type: 'integer'},
            {name: 'estado5', type: 'integer'},
            {name: 'estado5_descripcion', type: 'string'},
            {name: 'd6', type: 'time'},
            {name: 'calendariolaboral6_id', type: 'integer'},
            {name: 'estado6', type: 'integer'},
            {name: 'estado6_descripcion', type: 'string'},
            {name: 'd7', type: 'time'},
            {name: 'calendariolaboral7_id', type: 'integer'},
            {name: 'estado7', type: 'integer'},
            {name: 'estado7_descripcion', type: 'string'},
            {name: 'd8', type: 'time'},
            {name: 'calendariolaboral8_id', type: 'integer'},
            {name: 'estado8', type: 'integer'},
            {name: 'estado8_descripcion', type: 'string'},
            {name: 'd9', type: 'time'},
            {name: 'calendariolaboral9_id', type: 'integer'},
            {name: 'estado9', type: 'integer'},
            {name: 'estado9_descripcion', type: 'string'},
            {name: 'd10', type: 'time'},
            {name: 'calendariolaboral10_id', type: 'integer'},
            {name: 'estado10', type: 'integer'},
            {name: 'estado10_descripcion', type: 'string'},
            {name: 'd11', type: 'time'},
            {name: 'calendariolaboral11_id', type: 'integer'},
            {name: 'estado11', type: 'integer'},
            {name: 'estado11_descripcion', type: 'string'},
            {name: 'd12', type: 'time'},
            {name: 'calendariolaboral12_id', type: 'integer'},
            {name: 'estado12', type: 'integer'},
            {name: 'estado12_descripcion', type: 'string'},
            {name: 'd13', type: 'time'},
            {name: 'calendariolaboral13_id', type: 'integer'},
            {name: 'estado13', type: 'integer'},
            {name: 'estado13_descripcion', type: 'string'},
            {name: 'd14', type: 'time'},
            {name: 'calendariolaboral14_id', type: 'integer'},
            {name: 'estado14', type: 'integer'},
            {name: 'estado14_descripcion', type: 'string'},
            {name: 'd15', type: 'time'},
            {name: 'calendariolaboral15_id', type: 'integer'},
            {name: 'estado15', type: 'integer'},
            {name: 'estado15_descripcion', type: 'string'},
            {name: 'd16', type: 'time'},
            {name: 'calendariolaboral16_id', type: 'integer'},
            {name: 'estado16', type: 'integer'},
            {name: 'estado16_descripcion', type: 'string'},
            {name: 'd17', type: 'time'},
            {name: 'calendariolaboral17_id', type: 'integer'},
            {name: 'estado17', type: 'integer'},
            {name: 'estado17_descripcion', type: 'string'},
            {name: 'd18', type: 'time'},
            {name: 'calendariolaboral18_id', type: 'integer'},
            {name: 'estado18', type: 'integer'},
            {name: 'estado18_descripcion', type: 'string'},
            {name: 'd19', type: 'time'},
            {name: 'calendariolaboral19_id', type: 'integer'},
            {name: 'estado19', type: 'integer'},
            {name: 'estado19_descripcion', type: 'string'},
            {name: 'd20', type: 'time'},
            {name: 'calendariolaboral20_id', type: 'integer'},
            {name: 'estado20', type: 'integer'},
            {name: 'estado20_descripcion', type: 'string'},
            {name: 'd21', type: 'time'},
            {name: 'calendariolaboral21_id', type: 'integer'},
            {name: 'estado21', type: 'integer'},
            {name: 'estado21_descripcion', type: 'string'},
            {name: 'd22', type: 'time'},
            {name: 'calendariolaboral22_id', type: 'integer'},
            {name: 'estado22', type: 'integer'},
            {name: 'estado22_descripcion', type: 'string'},
            {name: 'd23', type: 'time'},
            {name: 'calendariolaboral23_id', type: 'integer'},
            {name: 'estado23', type: 'integer'},
            {name: 'estado23_descripcion', type: 'string'},
            {name: 'd24', type: 'time'},
            {name: 'calendariolaboral24_id', type: 'integer'},
            {name: 'estado24', type: 'integer'},
            {name: 'estado25_descripcion', type: 'string'},
            {name: 'd25', type: 'time'},
            {name: 'calendariolaboral25_id', type: 'integer'},
            {name: 'estado25', type: 'integer'},
            {name: 'estado25_descripcion', type: 'string'},
            {name: 'd26', type: 'time'},
            {name: 'calendariolaboral26_id', type: 'integer'},
            {name: 'estado26', type: 'integer'},
            {name: 'estado26_descripcion', type: 'string'},
            {name: 'd27', type: 'time'},
            {name: 'calendariolaboral1_id', type: 'integer'},
            {name: 'estado27', type: 'integer'},
            {name: 'estado27_descripcion', type: 'string'},
            {name: 'd28', type: 'time'},
            {name: 'calendariolaboral28_id', type: 'integer'},
            {name: 'estado28', type: 'integer'},
            {name: 'estado28_descripcion', type: 'string'},
            {name: 'd29', type: 'time'},
            {name: 'calendariolaboral29_id', type: 'integer'},
            {name: 'estado29', type: 'integer'},
            {name: 'estado29_descripcion', type: 'string'},
            {name: 'd30', type: 'time'},
            {name: 'calendariolaboral30_id', type: 'integer'},
            {name: 'estado30', type: 'integer'},
            {name: 'estado30_descripcion', type: 'string'},
            {name: 'd31', type: 'time'},
            {name: 'calendariolaboral31_id', type: 'integer'},
            {name: 'estado31', type: 'integer'},
            {name: 'estado31_descripcion', type: 'string'},
            {name: 'ultimo_dia', type: 'integer'},
            {name: 'atrasos', type: 'numeric'},
            {name: 'faltas', type: 'numeric'},
            {name: 'abandono', type: 'numeric'},
            {name: 'omision', type: 'numeric'},
            {name: 'lsgh', type: 'numeric'},
            {name: 'compensacion', type: 'numeric'},
            {name: 'observacion', type: 'string'},
            {name: 'estado', type: 'numeric'},
            {name: 'estado_descripcion', type: 'string'},
            {name: 'agrupador', type: 'numeric'}
        ],
        url: '/horariosymarcaciones/listporrelaboralgestionmes?id='+idRelaboral,
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    cargarRegistrosDeTolerancias();
    function cargarRegistrosDeTolerancias() {
        var theme = prepareSimulator("grid");
        $("#divGridControlMarcaciones").jqxGrid(
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
                    container.append("<button title='Generar matriz de marcaciones debidas en un mes para la persona.' id='marcaciondebidarowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-flag-o fa-2x text-info' title='Generar matriz de marcaciones debidas en el mes para la persona.'/></i></button>");
                    container.append("<button title='Generar matriz de marcaciones realizadas en un mes para la persona.' id='marcacionrealizadarowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-flag fa-2x text-info' title='Generar matriz de marcaciones realizadas en el mes para la persona.'/></i></button>");
                    container.append("<button title='Ver calendario de turnos y permisos de manera global para la persona.' id='turnexceptrowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-calendar fa-2x text-info' title='Vista Turnos Laborales por Perfil.'/></i></button>");

                    $("#marcaciondebidarowbutton").jqxButton();
                    $("#marcacionrealizadarowbutton").jqxButton();
                    $("#turnexceptrowbutton").jqxButton();

                    $("#hdnIdControlExcepcionEdit").val(0);
                    $("#hdnIdRelaboralNew").val(0);
                    $("#hdnIdRelaboralEdit").val(0);
                    $("#marcaciondebidarowbutton").off();
                    $("#marcaciondebidarowbutton").on("click",function(){
                        $('#popupGeneradorMarcacionDebida').modal('show');
                        $("#tituloModalGeneradorMarcacion").html("Marcaci&oacute;n Prevista");
                        $("#divPanelHeadingModal").html("LISTADO DE MARCACIONES PREVISTAS POR MES");
                        cargarHorariosMarcacionesGenerados(idRelaboral,'H');
                    });
                    $("#marcacionrealizadarowbutton").off();
                    $("#marcacionrealizadarowbutton").on("click",function(){
                        $('#popupGeneradorMarcacionDebida').modal('show');
                        $("#tituloModalGeneradorMarcacion").html("Marcaci&oacute;n Efectivas");
                        $("#divPanelHeadingModal").html("LISTADO DE MARCACIONES EFECTIVAS POR MES");
                        cargarHorariosMarcacionesGeneradosCruzada(idRelaboral,'M','H');
                    });
                    $("#turnexceptrowbutton").off();
                    $("#turnexceptrowbutton").on("click",function(){
                            var selectedrowindex = $("#divGridControlMarcaciones").jqxGrid('getselectedrowindex');
                            if (selectedrowindex >= 0) {
                                var dataRecord = $('#divGridControlMarcaciones').jqxGrid('getrowdata', selectedrowindex);
                                if(dataRecord!=undefined){
                                    if(dataRecord.gestion!=null&&dataRecord.gestion!=undefined){
                                        $('#divTabControlMarcaciones').jqxTabs('enableAt', 0);
                                        $('#divTabControlMarcaciones').jqxTabs('enableAt', 3);
                                        $('#divTabControlMarcaciones').jqxTabs({selectedItem: 3});

                                        var idPerfilLaboral=0;
                                        var tipoHorario=2;

                                        $("#spanPrefijoCalendarioLaboral").html("");
                                        $("#spanSufijoCalendarioLaboral").html(" Vrs. Calendario de Excepciones (Individual)");

                                        var defaultDia = 1;
                                        var defaultMes = dataRecord.mes-1;
                                        var defaultGestion = dataRecord.gestion;
                                        var fechaIni = "";
                                        var fechaFin = "";
                                        var contadorPerfiles = 0;
                                        var arrHorariosRegistrados = obtenerTodosHorariosRegistradosEnCalendarioRelaboralParaVerAsignaciones(idRelaboral,idPerfilLaboral,tipoHorario,false,fechaIni,fechaFin,contadorPerfiles);
                                        $("#calendar").html("");
                                        var arrFechasPorSemana = iniciarCalendarioLaboralPorRelaboralTurnosYExcepcionesParaVerAsignacionesPorPersona(dataRecordRelaboral,idRelaboral,5,idPerfilLaboral,tipoHorario,arrHorariosRegistrados,defaultGestion,defaultMes,defaultDia);
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


                                    }else{
                                        var msje = "Para acceder a la vista del calendario con las marcaciones y excepciones debidas debe seleccionar un registro necesariamente.";
                                        $("#divMsjePorError").html("");
                                        $("#divMsjePorError").append(msje);
                                        $("#divMsjeNotificacionError").jqxNotification("open");
                                    }
                                }
                            }else{
                                var msje = "Para acceder a la vista del calendario con las marcaciones y excepciones debidas debe seleccionar un registro necesariamente.";
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
                     filtertype: 'checkedlist',
                     datafield: 'estado_descripcion',
                     width: 100,
                     cellsalign: 'center',
                     align: 'center',
                     hidden: false,
                     cellclassname: cellclass
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
                        text: 'Turno',
                        filtertype: 'checkedlist',
                        datafield: 'turno',
                        width: 50,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Modalidad',
                        filtertype: 'checkedlist',
                        datafield: 'modalidad_marcacion',
                        width: 100,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false,
                        cellsrenderer: cellsrenderer

                    },
                    {
                        text: 'D&iacute;a 1',
                        datafield: 'd1',
                        width: 100,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 2',
                        datafield: 'd2',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 3',
                        datafield: 'd3',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 4',
                        datafield: 'd4',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 5',
                        datafield: 'd5',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 6',
                        datafield: 'd6',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 7',
                        datafield: 'd7',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 8',
                        datafield: 'd8',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 9',
                        datafield: 'd9',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 10',
                        datafield: 'd10',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 11',
                        datafield: 'd11',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 12',
                        datafield: 'd12',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 13',
                        datafield: 'd13',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 14',
                        datafield: 'd14',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 15',
                        datafield: 'd15',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 16',
                        datafield: 'd16',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 17',
                        datafield: 'd17',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 18',
                        datafield: 'd18',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 19',
                        datafield: 'd19',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 20',
                        datafield: 'd20',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 21',
                        datafield: 'd21',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 22',
                        datafield: 'd22',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 23',
                        datafield: 'd23',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 24',
                        datafield: 'd24',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 25',
                        datafield: 'd25',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 26',
                        datafield: 'd26',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 27',
                        datafield: 'd27',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 28',
                        datafield: 'd28',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 29',
                        datafield: 'd29',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 30',
                        datafield: 'd30',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'D&iacute;a 31',
                        datafield: 'd31',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: '&Uacute;ltimo D&iacute;a Procesado',
                        datafield: 'ultimo_dia',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Atrasos',
                        filtertype: 'checkedlist',
                        datafield: 'atrasos',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Faltas',
                        filtertype: 'checkedlist',
                        datafield: 'faltas',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Abandono',
                        filtertype: 'checkedlist',
                        datafield: 'abandono',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Sin Marcar',
                        filtertype: 'checkedlist',
                        datafield: 'omision',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'LSGH',
                        filtertype: 'checkedlist',
                        datafield: 'lsgh',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Marc. Previstas',
                        filtertype: 'checkedlist',
                        datafield: 'agrupador',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Observaci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'observacion',
                        width: 100,
                        align: 'center',
                        hidden: false
                    }
                ]
            });
        var listSource = [
            {label: 'Estado', value: 'estado_descripcion', checked: true},
            {label: 'Gesti&oacute;n', value: 'gestion', checked: true},
            {label: 'Mes', value: 'mes_nombre', checked: true},
            {label: 'Turno', value: 'turno', checked: true},
            {label: 'Modalidad', value: 'modalidad_marcacion', checked: true},
            {label: 'D&iacute;a 1', value: 'd1', checked: true},
            {label: 'D&iacute;a 2', value: 'd2', checked: true},
            {label: 'D&iacute;a 3', value: 'd3', checked: true},
            {label: 'D&iacute;a 4', value: 'd4', checked: true},
            {label: 'D&iacute;a 5', value: 'd5', checked: true},
            {label: 'D&iacute;a 6', value: 'd6', checked: true},
            {label: 'D&iacute;a 7', value: 'd7', checked: true},
            {label: 'D&iacute;a 8', value: 'd8', checked: true},
            {label: 'D&iacute;a 9', value: 'd9', checked: true},
            {label: 'D&iacute;a 10', value: 'd10', checked: true},
            {label: 'D&iacute;a 11', value: 'd11', checked: true},
            {label: 'D&iacute;a 12', value: 'd12', checked: true},
            {label: 'D&iacute;a 13', value: 'd13', checked: true},
            {label: 'D&iacute;a 14', value: 'd14', checked: true},
            {label: 'D&iacute;a 15', value: 'd15', checked: true},
            {label: 'D&iacute;a 16', value: 'd16', checked: true},
            {label: 'D&iacute;a 17', value: 'd17', checked: true},
            {label: 'D&iacute;a 18', value: 'd18', checked: true},
            {label: 'D&iacute;a 19', value: 'd19', checked: true},
            {label: 'D&iacute;a 20', value: 'd20', checked: true},
            {label: 'D&iacute;a 21', value: 'd21', checked: true},
            {label: 'D&iacute;a 22', value: 'd22', checked: true},
            {label: 'D&iacute;a 23', value: 'd23', checked: true},
            {label: 'D&iacute;a 24', value: 'd24', checked: true},
            {label: 'D&iacute;a 25', value: 'd25', checked: true},
            {label: 'D&iacute;a 26', value: 'd26', checked: true},
            {label: 'D&iacute;a 27', value: 'd27', checked: true},
            {label: 'D&iacute;a 28', value: 'd28', checked: true},
            {label: 'D&iacute;a 29', value: 'd29', checked: true},
            {label: 'D&iacute;a 30', value: 'd30', checked: true},
            {label: 'D&iacute;a 31', value: 'd31', checked: true},
            {label: '&Uacute;ltimo D&iacute;a', value: 'ultimo_dia', checked: true},
            {label: 'Atrasos', value: 'atrasos', checked: true},
            {label: 'Faltas', value: 'faltas', checked: true},
            {label: 'Abandono', value: 'abandono', checked: true},
            {label: 'Omisi&oacute;n', value: 'omision', checked: true},
            {label: 'LSGH', value: 'lsgh', checked: true},
            {label: 'Marc. Previstas', value: 'agrupador', checked: true},
            {label: 'Observaci&oacute;n', value: 'observacion', checked: true}
        ];
        $("#divListBoxMarcaciones").jqxListBox({source: listSource, width: "100%", height: 430, checkboxes: true});
        $("#divListBoxMarcaciones").on('checkChange', function (event) {
            $("#divGridControlMarcaciones").jqxGrid('beginupdate');
            if (event.args.checked) {
                $("#divGridControlMarcaciones").jqxGrid('showcolumn', event.args.value);
            }
            else {
                $("#divGridControlMarcaciones").jqxGrid('hidecolumn', event.args.value);
            }
            $("#divGridControlMarcaciones").jqxGrid('endupdate');
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
/**
 * Función para la carga del listado descriptivo de horarios y marcaciones generados.
 * @param idRelaboral
 * @param clasemarcacion
 */
function cargarHorariosMarcacionesGenerados(idRelaboral,clasemarcacion){
    var sufijo = clasemarcacion;
    $("#tbodyHorariosYMarcacionesGenerados").html("");
    var grilla = "";
    var ok=$.ajax({
        url:'/horariosymarcaciones/listdescriptivomarcaciones/',
        type:'POST',
        datatype: 'json',
        async:false,
        data:{id:idRelaboral,gestion:0,mes:0,clasemarcacion:clasemarcacion},
        success: function(data) {  //alert(data);
            var res = jQuery.parseJSON(data);
            var cont = 1;
            var grupo="";
            if(res.length>0){
                $.each( res, function( key, val ) {

                    grupo="";
                    if(val.grupo!=null&&val.grupo!='')grupo=val.grupo;
                    grilla += "<tr>";
                    grilla += "<td style='text-align: center'>"+cont+"</td>";
                    grilla += "<td style='text-align: center'>"+val.perfil_laboral+"</td>";
                    grilla += "<td style='text-align: center'>"+grupo+"</td>";
                    grilla += "<td style='text-align: center'>"+val.gestion+"</td>";
                    grilla += "<td style='text-align: center'>"+val.mes_nombre+"</td>";
                    grilla += "<td style='text-align: center'>"+val.rango_fecha_ini+" al "+val.rango_fecha_fin+"</td>";
                    /**
                     * Sólo si el estado es en elaboración
                     */
                    switch (val.estado)
                    {
                        case -2:
                            grilla += "<td style='text-align: center'><a title='Esto significa que no se ha asignado ning&uacute;n equipo biom&eacute;trico a la persona en este perfil. Actualice la asignaci&oacute;n del perfil.' href='javascript:void(0)' class='label label-warning'>"+val.estado_descripcion+"</a></td>";
                            grilla += "<td style='text-align: center'>";
                            grilla += "&nbsp;";
                            grilla += "</td>";
                            break;
                        case -1:
                            grilla += "<td style='text-align: center'><a title='Esto significa que no se ha asignado ning&uacute;n calendario al perfil en este mes' href='javascript:void(0)' class='label label-warning'>"+val.estado_descripcion+"</a></td>";
                            grilla += "<td style='text-align: center'>";
                            grilla += "&nbsp;";
                            grilla += "</td>";
                            break;
                        case 1:
                            grilla += "<td style='text-align: center'><a title='Esto significa que todas o parte de las fechas en este mes contin&uacute;an pendientes de ser considerados en las planillas finales.' href='javascript:void(0)' class='label label-success'>"+val.estado_descripcion+"</a></td>";
                            grilla += "<td style='text-align: center'>";
                            grilla +="<a id='btnVolverAGenerar."+sufijo+"."+val.rango_fecha_ini+"."+val.rango_fecha_fin+"' title='Volver a generar.' data-original-title='Volver a Generar' href='javascript:void(0)' data-toggle='tooltip' title='' class='btn btn-default btnVolverAGenerar'><i class='fa fa-gears'></i></a>";
                            if(val.estado_global==0){
                                grilla +="<a id='btnEliminarRegistro."+sufijo+"."+val.rango_fecha_ini+"."+val.rango_fecha_fin+"' title='Eliminar Registro' data-original-title='Eliminar registro' href='javascript:void(0)' data-toggle='tooltip' title='' class='btn btn-danger btnEliminarRegistro'><i class='fa fa-times'></i></a>";
                            }
                            grilla += "</td>";
                            break;
                        case 2:
                        case 3:
                        case 4:
                            grilla += "<td style='text-align: center'><a title='Esto significa que todos las fechas para este mes ya han sido consideradas dentro de una planilla. Por lo tanto, no se pueden modificar.' href='javascript:void(0)' class='label label-info'>"+val.estado_descripcion+"</a></td>";
                            grilla += "<td style='text-align: center'>";
                            grilla += "&nbsp;";
                            grilla += "</td>";
                            break;
                        default:
                            grilla += "<td style='text-align: center'><a title='Esto significa que a&uacute;n no se ha generado el registro de marcaciones para este mes.' href='javascript:void(0)' class='label label-primary'>"+val.estado_descripcion+"</a></td>";
                            grilla += "<td style='text-align: center'>";
                            grilla += "<a id='btnGenerarNuevo."+sufijo+"."+val.rango_fecha_ini+"."+val.rango_fecha_fin+"' title='Generar Nuevo Registro.' data-original-title='Generar Nuevo Registro' href='javascript:void(0)' data-toggle='tooltip' title='' class='btn btn-default btnGenerarNuevo'><i class='fa fa-cog'></i> Generar</a>";
                            grilla += "</td>";
                            break;
                    }
                    grilla += "</tr>";
                    cont++;
                });
                var tipoMarcacion = "";
                switch (clasemarcacion){
                    case 'H':tipoMarcacion = "PREVISTA";break;
                    case 'M':tipoMarcacion = "EFECTIVA";break;
                    case 'R':tipoMarcacion = "RETRASO";break;
                    case 'A':tipoMarcacion = "ABANDONO";break;
                }
                $("#tbodyHorariosYMarcacionesGenerados").append(grilla);
                $(".btnGenerarNuevo").off();
                $(".btnGenerarNuevo").on("click",function(){
                    var arrValores = (this.id).split(".");
                    var fechaIni = "";
                    var fechaFin = "";
                    var gestion = 0;
                    var mes = 0;
                    if(arrValores.length>0){
                        fechaIni = arrValores[2];
                        fechaFin = arrValores[3];
                        var arrFecha = fechaIni.split("-");
                        gestion = parseInt(arrFecha[2]);
                        mes = parseInt(arrFecha[1]);

                        if(gestion>0&&mes>0){
                            if(confirm("¿Desea realmente generar la marcación '"+tipoMarcacion+"' para la gestión y mes seleccionados?"))
                                var ok = generarMarcacion(0,idRelaboral,gestion,mes,fechaIni,fechaFin,clasemarcacion);
                                if(ok){
                                    cargarHorariosMarcacionesGenerados(idRelaboral,clasemarcacion);
                                }
                        }else{
                            alert("Existe un error en el listado de marcaci&oacute;n '"+tipoMarcacion+"', consulte con el administrador.")
                        }
                    }
                });
                $(".btnVolverAGenerar").off();
                $(".btnVolverAGenerar").on("click",function(){
                    var arrValores = (this.id).split(".");
                    var fechaIni = "";
                    var fechaFin = "";
                    var gestion = 0;
                    var mes = 0;
                    if(arrValores.length>0){
                        fechaIni = arrValores[2];
                        fechaFin = arrValores[3];
                        var arrFecha = fechaIni.split("-");
                        gestion = parseInt(arrFecha[2]);
                        mes = parseInt(arrFecha[1]);
                        if(gestion>0&&mes>0){
                            if(confirm("¿Desea realmente volver a generar la marcación '"+tipoMarcacion+"' para la gestión y mes seleccionados?"))
                                var ok = generarMarcacion(1,idRelaboral,gestion,mes,fechaIni,fechaFin,clasemarcacion);
                            if(ok){
                                cargarHorariosMarcacionesGenerados(idRelaboral,clasemarcacion);
                            }
                        }else{
                            var msje="Existe un error en el listado de marcaci&oacute;n '"+tipoMarcacion+"', consulte con el administrador.";
                            $("#divMsjeError").show();
                            $("#divMsjeError").addClass('alert alert-danger alert-dismissable');
                            $("#aMsjeError").html(msje);
                            setTimeout(function(){$("#divMsjeError").hide()},5000);
                        }
                    }
                });
                $(".btnEliminarRegistro").off();
                $(".btnEliminarRegistro").on("click",function(){
                    var arrValores = (this.id).split(".");
                    var fechaIni = "";
                    var fechaFin = "";
                    var gestion = 0;
                    var mes = 0;
                    if(arrValores.length>0){
                        fechaIni = arrValores[2];
                        fechaFin = arrValores[3];
                        var arrFecha = fechaIni.split("-");
                        gestion = parseInt(arrFecha[2]);
                        mes = parseInt(arrFecha[1]);
                        if(gestion>0&&mes>0){
                            if(confirm("¿Desea realmente dar de baja la marcación '"+tipoMarcacion+"' para la gestión y mes seleccionados? Esto implica que se darán de baja tambi&eacute;n los registros de marcación EFECTIVA y de SANCIÓN."))
                                var ok = eliminarMarcacion(idRelaboral,gestion,mes,fechaIni,fechaFin,clasemarcacion);
                            if(ok){
                                cargarHorariosMarcacionesGenerados(idRelaboral,clasemarcacion);
                            }
                        }else{
                            var msje="Existe un error en el listado de marcaci&oacute;n '"+tipoMarcacion+"', consulte con el administrador.";
                            $("#divMsjeError").show();
                            $("#divMsjeError").addClass('alert alert-danger alert-dismissable');
                            $("#aMsjeError").html(msje);
                            setTimeout(function(){$("#divMsjeError").hide()},5000);
                        }
                    }
                });

            }
        }, //mostramos el error
        error: function() { alert('Se ha producido un error Inesperado'); }
    });
}
/**
 * Función para la obtención del listado descriptivo de marcaciones consderando el cruce entre dos clases de marcación.
 * El uso común de esta función será cuando se requiera comparar los estados entre lo previsto (H) y lo efectivo (M).
 * @param idRelaboral
 * @param clasemarcacionA
 * @param clasemarcacionB
 */
function cargarHorariosMarcacionesGeneradosCruzada(idRelaboral,clasemarcacionA,clasemarcacionB){
    var sufijo = clasemarcacionA;
    $("#tbodyHorariosYMarcacionesGenerados").html("");
    var grilla = "";
    var ok=$.ajax({
        url:'/horariosymarcaciones/listdescriptivomarcacionescruzada/',
        type:'POST',
        datatype: 'json',
        async:false,
        data:{id:idRelaboral,gestion:0,mes:0,clasemarcacionA:clasemarcacionA,clasemarcacionB:clasemarcacionB},
        success: function(data) {  //alert(data);
            var res = jQuery.parseJSON(data);
            var cont = 1;
            var grupo="";
            if(res.length>0){
                $.each( res, function( key, val ) {
                    grupo="";
                    if(val.grupo!=null&&val.grupo!='')grupo=val.grupo;
                    grilla += "<tr>";
                    grilla += "<td style='text-align: center'>"+cont+"</td>";
                    grilla += "<td style='text-align: center'>"+val.perfil_laboral+"</td>";
                    grilla += "<td style='text-align: center'>"+grupo+"</td>";
                    grilla += "<td style='text-align: center'>"+val.gestion+"</td>";
                    grilla += "<td style='text-align: center'>"+val.mes_nombre+"</td>";
                    grilla += "<td style='text-align: center'>"+val.rango_fecha_ini+" al "+val.rango_fecha_fin+"</td>";
                    /**
                     * Sólo si el estado es en elaboración
                     */
                    switch (val.cruzada_estado){
                        case -2:/*NO EXISTE REGISTRO DE MARCACIÓN PREVISTA*/
                            grilla += "<td style='text-align: center'><a title='Esto significa que no existe registro de marcaci&oacute;n previa, por lo que no se puede efectuar la generaci&oacute;n del registro de marcaci&oacute;n efectiva.' href='javascript:void(0)' class='label label-warning'>"+val.cruzada_estado_descripcion+"</a></td>";
                            grilla += "<td style='text-align: center'>";
                            grilla += "&nbsp;";
                            grilla += "</td>";
                            break;
                        case -1:/*NO EXISTE DESCARGAS DE MARCACIÓN*/
                            grilla += "<td style='text-align: center'><a title='Esto significa que no existe descargas de marcaciones para este mes para esta persona.' href='javascript:void(0)' class='label label-info'>"+val.cruzada_estado_descripcion+"</a></td>";
                            grilla += "<td style='text-align: center'>";
                            grilla += "&nbsp;";
                            grilla += "</td>";
                            break;
                        case 1:
                            grilla += "<td style='text-align: center'><a title='Esto significa que todas o parte de las fechas en este mes contin&uacute;an pendientes de ser considerados en las planillas finales.' href='javascript:void(0)' class='label label-success'>"+val.cruzada_estado_descripcion+"</a></td>";
                            grilla += "<td style='text-align: center'>";
                            grilla +="<a id='btnVolverAGenerar."+sufijo+"."+val.rango_fecha_ini+"."+val.rango_fecha_fin+"' title='Volver a generar.' data-original-title='Volver a Generar' href='javascript:void(0)' data-toggle='tooltip' title='' class='btn btn-default btnVolverAGenerar'><i class='fa fa-gears'></i></a>";
                            if(val.cruzada_estado > 0){
                                grilla +="<a id='btnEliminarRegistro."+sufijo+"."+val.rango_fecha_ini+"."+val.rango_fecha_fin+"' title='Eliminar Registro' data-original-title='Eliminar registro' href='javascript:void(0)' data-toggle='tooltip' title='' class='btn btn-danger btnEliminarRegistro'><i class='fa fa-times'></i></a>";
                            }
                            grilla += "</td>";
                            break;
                        case 10:/*Al menos un día del mes ya fue considerado dentro de las planillas, por lo cual no se puede eliminar el registro, sólo volver a generar para los días en estado sin elaborar.*/
                            grilla += "<td style='text-align: center'><a title='Esto significa que "+val.cruzada_estado_global+" d&iacute;a(s) de este mes tienen planillas Elaboradas o Aprobadas o Planilladas.' href='javascript:void(0)' class='label label-info'>"+val.cruzada_estado_descripcion+"</a></td>";
                            grilla += "<td style='text-align: center'>";
                            grilla +="<a id='btnVolverAGenerar."+sufijo+"."+val.rango_fecha_ini+"."+val.rango_fecha_fin+"' title='Volver a generar.' data-original-title='Volver a Generar' href='javascript:void(0)' data-toggle='tooltip' title='' class='btn btn-default btnVolverAGenerar'><i class='fa fa-gears'></i> Volver a Generar</a>";
                            grilla += "</td>";
                            break;
                        default:
                            grilla += "<td style='text-align: center'><a title='Esto significa que a&uacute;n no se ha generado el registro de marcaciones para este mes.' href='javascript:void(0)' class='label label-primary'>"+val.cruzada_estado_descripcion+"</a></td>";
                            grilla += "<td style='text-align: center'>";
                            grilla += "<a id='btnGenerarNuevo."+sufijo+"."+val.rango_fecha_ini+"."+val.rango_fecha_fin+"' title='Generar Nuevo Registro.' data-original-title='Generar Nuevo Registro' href='javascript:void(0)' data-toggle='tooltip' title='' class='btn btn-default btnGenerarNuevo'><i class='fa fa-cog'></i> Generar</a>";
                            grilla += "</td>";
                            break;

                    }
                    grilla += "</tr>";
                    cont++;
                });
                var tipoMarcacion = "";
                switch (clasemarcacionA){
                    case 'H':tipoMarcacion = "PREVISTA";break;
                    case 'M':tipoMarcacion = "EFECTIVA";break;
                    case 'R':tipoMarcacion = "RETRASO";break;
                    case 'A':tipoMarcacion = "ABANDONO";break;
                }
                $("#tbodyHorariosYMarcacionesGenerados").append(grilla);
                $(".btnGenerarNuevo").off();
                $(".btnGenerarNuevo").on("click",function(){
                    var arrValores = (this.id).split(".");
                    var fechaIni = "";
                    var fechaFin = "";
                    var gestion = 0;
                    var mes = 0;
                    if(arrValores.length>0){
                        fechaIni = arrValores[2];
                        fechaFin = arrValores[3];
                        var arrFecha = fechaIni.split("-");
                        gestion = parseInt(arrFecha[2]);
                        mes = parseInt(arrFecha[1]);

                        if(gestion>0&&mes>0){
                            if(confirm("¿Desea realmente generar la marcación '"+tipoMarcacion+"' para la gestión y mes seleccionados?"))
                                var ok = generarMarcacion(0,idRelaboral,gestion,mes,fechaIni,fechaFin,clasemarcacionA);
                            if(ok){
                                cargarHorariosMarcacionesGeneradosCruzada(idRelaboral,clasemarcacionA,clasemarcacionB);
                            }
                        }else{
                            alert("Existe un error en el listado de marcaci&oacute;n '"+tipoMarcacion+"', consulte con el administrador.")
                        }
                    }
                });
                $(".btnVolverAGenerar").off();
                $(".btnVolverAGenerar").on("click",function(){
                    var arrValores = (this.id).split(".");
                    var fechaIni = "";
                    var fechaFin = "";
                    var gestion = 0;
                    var mes = 0;
                    if(arrValores.length>0){
                        fechaIni = arrValores[2];
                        fechaFin = arrValores[3];
                        var arrFecha = fechaIni.split("-");
                        gestion = parseInt(arrFecha[2]);
                        mes = parseInt(arrFecha[1]);
                        if(gestion>0&&mes>0){
                            if(confirm("¿Desea realmente volver a generar la marcación '"+tipoMarcacion+"' para la gestión y mes seleccionados?"))
                                var ok = generarMarcacion(1,idRelaboral,gestion,mes,fechaIni,fechaFin,clasemarcacionA);
                            if(ok){
                                cargarHorariosMarcacionesGeneradosCruzada(idRelaboral,clasemarcacionA,clasemarcacionB);
                            }
                        }else{
                            var msje="Existe un error en el listado de marcaci&oacute;n '"+tipoMarcacion+"', consulte con el administrador.";
                            $("#divMsjeError").show();
                            $("#divMsjeError").addClass('alert alert-danger alert-dismissable');
                            $("#aMsjeError").html(msje);
                            setTimeout(function(){$("#divMsjeError").hide()},5000);
                        }
                    }
                });
                $(".btnEliminarRegistro").off();
                $(".btnEliminarRegistro").on("click",function(){
                    var arrValores = (this.id).split(".");
                    var fechaIni = "";
                    var fechaFin = "";
                    var gestion = 0;
                    var mes = 0;
                    if(arrValores.length>0){
                        fechaIni = arrValores[2];
                        fechaFin = arrValores[3];
                        var arrFecha = fechaIni.split("-");
                        gestion = parseInt(arrFecha[2]);
                        mes = parseInt(arrFecha[1]);
                        if(gestion>0&&mes>0){
                            if(confirm("¿Desea realmente dar de baja la marcación '"+tipoMarcacion+"' para la gestión y mes seleccionados? Esto implica que se darán de baja todos los registros de marcación PREVISTA, EFECTIVA y de SANCIÓN."))
                                var ok = eliminarMarcacion(idRelaboral,gestion,mes,fechaIni,fechaFin,clasemarcacionA);
                            if(ok){
                                cargarHorariosMarcacionesGeneradosCruzada(idRelaboral,clasemarcacionA,clasemarcacionB);
                            }
                        }else{
                            var msje="Existe un error en el listado de marcaci&oacute;n '"+tipoMarcacion+"', consulte con el administrador.";
                            $("#divMsjeError").show();
                            $("#divMsjeError").addClass('alert alert-danger alert-dismissable');
                            $("#aMsjeError").html(msje);
                            setTimeout(function(){$("#divMsjeError").hide()},5000);
                        }
                    }
                });

            }
        }, //mostramos el error
        error: function() { alert('Se ha producido un error Inesperado'); }
    });
}
/**
 * Función para la generación de las marcaciones debidas en una gestión y mes particula para una persona en particular.
 * @param opcion
 * @param idRelaboral
 * @param gestion
 * @param mes
 * @param fechaIni
 * @param fechaFin
 * @param clasemarcacion
 */
function generarMarcacion(opcion,idRelaboral,gestion,mes,fechaIni,fechaFin,clasemarcacion){
    var action = "";
    switch (clasemarcacion){
        case 'H':action="generarmarcacionprevista";break;
        case 'M':action="generarmarcacionefectiva";break;
        case 'R':break;
        case 'A':break;
        default:break;
    }
    if(action!=''){
        var ok = $.ajax({
            url: '/horariosymarcaciones/'+action+'/',
            type: "POST",
            datatype: 'html',
            async: false,
            cache: false,
            data: {
                opcion: opcion,
                id_relaboral: idRelaboral,
                gestion:gestion,
                mes:mes,
                fecha_ini:fechaIni,
                fecha_fin:fechaFin,
                clasemarcacion:clasemarcacion
            },
            success: function (data) {
                var res = jQuery.parseJSON(data);
                $(".msjs-alert").hide();
                var ok1 = false;
                if (res.result == 1) {
                    ok1 =  true;
                    $("#divMsjeExito").show();
                    $("#divMsjeExito").addClass('alert alert-success alert-dismissable');
                    $("#aMsjeExito").html(res.msj);
                    setTimeout(function(){$("#divMsjeExito").hide()},3000);

                } else if (res.result == 0) {
                    ok1 = false;
                    $("#divMsjePeligro").show();
                    $("#divMsjePeligro").addClass('alert alert-warning alert-dismissable');
                    $("#aMsjePeligro").html(res.msj);
                    setTimeout(function(){$("#divMsjePeligro").hide()},3000);
                } else {
                    ok1 =  false;
                    $("#divMsjeError").show();
                    $("#divMsjeError").addClass('alert alert-danger alert-dismissable');
                    $("#aMsjeError").html(res.msj);
                    setTimeout(function(){$("#divMsjeError").hide()},3000);
                }
                return ok1;
            },
            error: function () {
                return false;
                $("#divMsjeError").show();
                $("#divMsjeError").addClass('alert alert-danger alert-dismissable');
                $("#aMsjeError").html("Se ha producido un error inesperado");
                setTimeout(function(){$("#divMsjeError").hide()},3000);
            }
        });
        return ok;
    }else return false;
}
/**
 * Función para la eliminación del registro de marcaciones para un determinado registro de relación laboral, gestión y mes.
 * @param idRelaboral
 * @param gestion
 * @param mes
 * @param fechaIni
 * @param fechaFin
 * @param clasemarcacion
 * @returns {*}
 */
function eliminarMarcacion(idRelaboral,gestion,mes,fechaIni,fechaFin,clasemarcacion){
        var ok = $.ajax({
            url: '/horariosymarcaciones/eliminar/',
            type: "POST",
            datatype: 'html',
            async: false,
            cache: false,
            data: {
                id_relaboral: idRelaboral,
                gestion:gestion,
                mes:mes,
                fecha_ini:fechaIni,
                fecha_fin:fechaFin,
                clasemarcacion:clasemarcacion
            },
            success: function (data) {
                var res = jQuery.parseJSON(data);
                $(".msjs-alert").hide();
                var ok1 = false;
                if (res.result == 1) {
                    ok1 =  true;
                    $("#divMsjeExito").show();
                    $("#divMsjeExito").addClass('alert alert-success alert-dismissable');
                    $("#aMsjeExito").html(res.msj);
                    setTimeout(function(){$("#divMsjeExito").hide()},3000);

                } else if (res.result == 0) {
                    ok1 = false;
                    $("#divMsjePeligro").show();
                    $("#divMsjePeligro").addClass('alert alert-warning alert-dismissable');
                    $("#aMsjePeligro").html(res.msj);
                    setTimeout(function(){$("#divMsjePeligro").hide()},3000);
                } else {
                    ok1 =  false;
                    $("#divMsjeError").show();
                    $("#divMsjeError").addClass('alert alert-danger alert-dismissable');
                    $("#aMsjeError").html(res.msj);
                    setTimeout(function(){$("#divMsjeError").hide()},3000);
                }
                return ok1;
            },
            error: function () {
                return false;
                $("#divMsjeError").show();
                $("#divMsjeError").addClass('alert alert-danger alert-dismissable');
                $("#aMsjeError").html("Se ha producido un error inesperado");
                setTimeout(function(){$("#divMsjeError").hide()},3000);
            }
        });
        return ok;
}