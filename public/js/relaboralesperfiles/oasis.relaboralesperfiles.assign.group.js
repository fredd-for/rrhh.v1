/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  02-02-2015
 */
/**
 * Función para la carga la grilla de asignaciones.
 * @param idPerfilLaboral
 * @param perfilLaboral
 * @param grupo
 * @param tipoHorario
 * @param tipoHorarioDescripcion
 */
function cargarGrillaAsignacionesGrupales(idPerfilLaboral,perfilLaboral,grupo,tipoHorario,tipoHorarioDescripcion) {
    var source =
    {
        datatype: "json",
        datafields: [
            {name: 'nro_row', type: 'integer'},
            {name: 'id', type: 'integer'},
            {name: 'padre_id', type: 'integer'},
            {name: 'id_ubicacion', type: 'integer'},
            {name: 'ubicacion', type: 'string'},
            {name: 'id_estacion', type: 'integer'},
            {name: 'estacion', type: 'string'},
            {name: 'color', type: 'string'},
            {name: 'id_perfillaboral', type: 'integer'},
            {name: 'perfil_laboral', type: 'string'},
            {name: 'fecha_ini', type: 'date'},
            {name: 'fecha_fin', type: 'date'},
            {name: 'estado', type: 'integer'},
            {name: 'estado_descripcion', type: 'string'},
            {name: 'tipo_horario', type: 'integer'},
            {name: 'tipo_horario_descripcion', type: 'string'},
            {name: 'cantidad', type: 'integer'}

        ],
        url: '/relaboralesperfiles/listgroup?id='+idPerfilLaboral,
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    cargarRegistrosDeTurnosLaborales();
    function cargarRegistrosDeTurnosLaborales() {
        var theme = prepareSimulator("grid");
        $("#divGridAsignaciones").jqxGrid(
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
                showfilterrow: true,
                filterable: true,
                showtoolbar: true,
                autorowheight: true,
                rendertoolbar: function (toolbar) {
                    var me = this;
                    var container = $("<div></div>");
                    toolbar.append(container);
                    container.append("<button id='addgrouprowbutton' class='btn btn-sm btn-primary' type='button' title='Nueva Asignaci&oacute;n Grupal'><i class='fa fa-plus-square fa-2x text-info' title='Nueva Asignaci&oacute;n Grupal.'/></i></button>");
                    container.append("<button id='updategrouprowbutton' class='btn btn-sm btn-primary' type='button' title='Nueva Asignaci&oacute;n Individual'><i class='fa fa-pencil-square fa-2x text-info' title='Nueva Asignaci&oacute;n Individual.'/></button>");

                    $("#addgrouprowbutton").jqxButton();
                    $("#updategrouprowbutton").jqxButton();

                    $("#hdnIdPerfilLaboralNueva").val(0);
                    // Registrar nuevo turno laboral.
                    $("#addgrouprowbutton").off();
                    $("#addgrouprowbutton").on('click', function () {
                        /**
                         * Se habilita la vista del calendario laboral con la opcion de registrar nuevo
                         */
                        $('#jqxTabsAsignacionPerfiles').jqxTabs('disableAt', 1);
                        $('#jqxTabsAsignacionPerfiles').jqxTabs('enableAt', 2);
                        $('#jqxTabsAsignacionPerfiles').jqxTabs('enableAt', 3);
                        $('#jqxTabsAsignacionPerfiles').jqxTabs({selectedItem: 3});
                        $('#jqxTabsAsignacionPerfiles').jqxTabs('disableAt', 4);
                        $('#jqxTabsAsignacionPerfiles').jqxTabs('disableAt', 5);

                        $("#ddPerfilLaboralNew").text(perfilLaboral);
                        if(grupo!=''&&grupo!=null)$("#ddGrupoNew").text(grupo);
                        else $("#ddGrupoNew").html("&nbsp;");
                        $("#ddTipoHorarioNew").text(tipoHorarioDescripcion);

                        limpiarMensajesErrorPorValidacionNuevoRegistroAsignacionPerfilLaboral(1);
                        cargarUbicacionesPrincipales(1,0);

                        $("#txtFechaIniNew").jqxDateTimeInput({ enableBrowserBoundsDetection: true, height: 24, formatString:'dd-MM-yyyy' });
                        $("#txtFechaFinNew").jqxDateTimeInput({ enableBrowserBoundsDetection: true, height: 24, formatString:'dd-MM-yyyy' });

                        definirListaDualNueva(1,0,100,"","");
                        $("#hdnIdPerfilLaboralNew").val(idPerfilLaboral);
                        $("#lstUbicacionesNew").off();
                        $("#lstUbicacionesNew").on("change",function(){
                            cargarEstaciones(1,$(this).val(),0);
                            definirListaDualNueva(1,0,$(this).val(),"","");
                        });
                    });
                    /**
                     * Modificar registro de asignación de Perfil Laboral.
                     */
                    $("#updategrouprowbutton").off();
                    $("#updategrouprowbutton").on('click', function () {
                        var selectedrowindex = $("#divGridAsignaciones").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#divGridAsignaciones').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                /**
                                 * Para el caso cuando el estado de la asignación esté ACTIVO, de otro modo no es admisible.
                                 */
                                if (dataRecord.estado == 1) {
                                    /**
                                     * Se habilita la vista del formulario para la modificación de asignación grupal de perfil laboral.
                                     */
                                    $('#jqxTabsAsignacionPerfiles').jqxTabs('disableAt', 1);
                                    $('#jqxTabsAsignacionPerfiles').jqxTabs('enableAt', 2);
                                    $('#jqxTabsAsignacionPerfiles').jqxTabs('disableAt', 3);
                                    $('#jqxTabsAsignacionPerfiles').jqxTabs('enableAt', 4);
                                    $('#jqxTabsAsignacionPerfiles').jqxTabs({selectedItem: 4});
                                    $('#jqxTabsAsignacionPerfiles').jqxTabs('disableAt', 5);

                                    $("#ddPerfilLaboralEdit").text(perfilLaboral);
                                    if(grupo!=''&&grupo!=null)$("#ddGrupoEdit").text(grupo);
                                    else $("#ddGrupoEdit").html("&nbsp;");
                                    $("#ddTipoHorarioEdit").text(tipoHorarioDescripcion);

                                    limpiarMensajesErrorPorValidacionNuevoRegistroAsignacionPerfilLaboral(2);
                                    cargarUbicacionesPrincipales(2,dataRecord.id_ubicacion);
                                    var idEstacion = 0;
                                    if(dataRecord.id_estacion!=null) idEstacion = dataRecord.id_estacion;
                                    cargarEstaciones(2,dataRecord.id_ubicacion,idEstacion);

                                    $("#txtFechaIniEdit").jqxDateTimeInput({ value:dataRecord.fecha_ini,enableBrowserBoundsDetection: true, height: 24, formatString:'dd-MM-yyyy' });
                                    $("#txtFechaFinEdit").jqxDateTimeInput({ value:dataRecord.fecha_fin,enableBrowserBoundsDetection: true, height: 24, formatString:'dd-MM-yyyy' });
                                    var fechaIni = fechaConvertirAFormato(dataRecord.fecha_ini,'-');
                                    var fechaFin = fechaConvertirAFormato(dataRecord.fecha_fin,'-');
                                    definirListaDualNueva(2,dataRecord.id_perfillaboral,dataRecord.id,fechaIni,fechaFin);

                                    $("#hdnIdPerfilLaboralEdit").val(idPerfilLaboral);
                                    $("#lstUbicacionesEdit").off();
                                    $("#lstUbicacionesEdit").on("change",function(){
                                        cargarEstaciones(2,$(this).val(),idEstacion);
                                        definirListaDualNueva(2,dataRecord.id_perfillaboral,$(this).val(),fechaIni,fechaFin);
                                    });

                                } else {
                                    var msj = "Debe seleccionar un registro en estado ACTIVO para posibilitar la modificaci&oacute;n de los registros correspondientes.";
                                    $("#divMsjePorError").html("");
                                    $("#divMsjePorError").append(msj);
                                    $("#divMsjeNotificacionError").jqxNotification("open");
                                }
                            }
                        } else {
                            var msj = "Debe seleccionar un registro necesariamente.";
                            $("#divMsjePorError").html("");
                            $("#divMsjePorError").append(msj);
                            $("#divMsjeNotificacionError").jqxNotification("open");
                        }
                        $("#btnImprimirCalendario").hide();
                        $("#divArrastre").show();
                        $("#hdnIdPerfilLaboralParaCuposCalendario").val(0);
                        $("#hdnTipoHorarioParaCuposCalendario").val(0);
                        $("#hdnFechaIniParaCuposCalendario").val(0);
                        $("#hdnFechaFinParaCuposCalendario").val(0);
                    });

                },
                columns: [
                    {
                        text: 'Nro.', /*datafield: 'nro_row',*/
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
                    }
                    ,
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
                        text: 'Ubicaci&oacute;n',
                        columntype: 'dropdownlist',
                        datafield: 'ubicacion',
                        width: 200,
                        cellsalign: 'center',
                        align: 'center'
                    },
                    {
                        text: 'Estaci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'estacion',
                        width: 130,
                        cellsalign: 'center',
                        align: 'center'
                    },
                    {
                        text: 'Fecha Inicio',
                        datafield: 'fecha_ini',
                        filtertype: 'range',
                        width: 90,
                        cellsalign: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        align: 'center'
                    },
                    {
                        text: 'Fecha Fin',
                        datafield: 'fecha_fin',
                        filtertype: 'range',
                        width: 90,
                        cellsalign: 'center',
                        cellsformat: 'dd-MM-yyyy',
                        align: 'center'
                    },
                    {
                        text: 'Cantidad',
                        filtertype: 'checkedlist',
                        datafield: 'cantidad',
                        width: 200,
                        cellsalign: 'center',
                        align: 'center'
                    },
                ]
            });
    }

    /**
     * Eventos
     */
    /*$("#jqxgridmovilidad").on('cellendedit', function (event) {
        var args = event.args;
        $("#cellendeditevent").text("Event Type: cellendedit, Column: " + args.datafield + ", Row: " + (1 + args.rowindex) + ", Value: " + args.value);
    });*/
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
 * Función para cargar la lista de ubicaciones principales
 * @param accion
 * @param idUbicacion
 */
function cargarUbicacionesPrincipales(accion,idUbicacion){
    var selected = "";
    var sufijo = "New";
    if(accion==2)sufijo="Edit";
    $.ajax({
        url: '/ubicaciones/listprincipales/',
        type: "POST",
        datatype: 'json',
        async: false,
        cache: false,
        success: function (data) {
            $("#lstUbicaciones"+sufijo).html("");
            $("#lstUbicaciones"+sufijo).append("<option value='0' data-cant-nodos-hijos='0'>Seleccionar...</option>");
            var res = jQuery.parseJSON(data);
            if (res.length > 0) {
                $("#lstUbicaciones"+sufijo).prop("disabled",false);
                $.each(res, function (key, val) {
                    if(idUbicacion==val.id){
                        selected = "selected";
                    }else selected = "";
                    $("#lstUbicaciones"+sufijo).append("<option value='"+val.id+"' data-cant-nodos-hijos='"+val.cant_nodos_hijos+"' "+selected+">"+val.ubicacion+"</option>");
                });
            }else $("#lstUbicaciones"+sufijo).prop("disabled",true);
        }
    });
}
/**
 * Función para cargar la lista correspondiente a las estaciones por línea.
 * @param accion
 * @param idUbicacion
 * @param idLinea
 */
function cargarEstaciones(accion,idUbicacion,idEstacion){
    var sufijo = "New";
    if(accion==2) sufijo="Edit";
    $("#lstEstaciones"+sufijo).html("");
    $("#lstEstaciones"+sufijo).append("<option value='0'>Seleccionar...</option>");
    $("#lstEstaciones"+sufijo).prop("disabled","disabled");
    $("#spanAsteriscoEstaciones"+sufijo).html("");
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
                    $("#lstEstaciones"+sufijo).prop("disabled",false);
                    $("#spanAsteriscoEstaciones"+sufijo).text(" *");
                    $.each(res, function (key, val) {
                        if(idEstacion==val.id){
                            selected = "selected";
                        }else selected = "";
                        $("#lstEstaciones"+sufijo).append("<option value='"+val.id+"' "+selected+">"+val.ubicacion+"</option>");
                    });
                }else $("#lstEstaciones"+sufijo).prop("disabled","disabled");
            }
        });
    }
}