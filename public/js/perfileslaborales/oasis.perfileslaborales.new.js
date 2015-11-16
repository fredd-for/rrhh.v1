/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  22-10-2014
 */
/**
 * Función para definir el contenido de la grilla de cargos acéfalos de acuerdo a los datos enviados como parámetros.
 */
function definirGrillaParaSeleccionarCargoAcefalo(numCertificacion,codCargo){
    var theme = prepareSimulator("grid");
    var sourceCargo =
    {
        datatype: "json",
        datafields: [
            { name: 'seleccionable', type: 'string' },
            { name: 'codigo', type: 'string' },
            /*{ name: 'finpartida', type: 'string' },*/
            { name: 'id_condicion', type: 'string' },
            { name: 'condicion', type: 'string' },
            { name: 'id_organigrama', type: 'integer' },
            { name: 'id_cargo', type: 'string' },
            { name: 'gerencia_administrativa', type: 'string' },
            { name: 'departamento_administrativo', type: 'string' },
            { name: 'nivelsalarial', type: 'string' },
            { name: 'cargo', type: 'string' },
            { name: 'sueldo', type: 'numeric' },
        ],
        url: '/relaborales/listcargos',
        cache: false
    };
    var dataAdapterCargo = new $.jqx.dataAdapter(sourceCargo);
    cargarRegistrosDeCargos();
    function cargarRegistrosDeCargos(){
        $("#divGrillaParaSeleccionarCargo").jqxGrid(
            {
                //theme:'oasis',
                width: '100%',
                height:250,
                source: dataAdapterCargo,
                sortable: true,
                altRows: true,
                groupable: true,
                columnsresize: true,
                pageable: false,
                pagerMode: 'advanced',
                showfilterrow: true,
                filterable: true,
                columns: [
                    {
                        text: '#', sortable: false, filterable: false, editable: false,
                        groupable: false, draggable: false, resizable: false,
                        datafield: '', columntype: 'number', width: 50
                    },
                    { text: 'Opción', datafield: 'seleccionable', width: 100,sortable:false, showfilterrow:false, filterable:false, columntype: 'button', cellsrenderer: function () {
                        return "Seleccionar";
                    }, buttonclick: function (row) {
                        editrow = row;
                        var offset = $("#divGrillaParaSeleccionarCargo").offset();
                        var dataRecord = $("#divGrillaParaSeleccionarCargo").jqxGrid('getrowdata', editrow);
                        agregarCargoSeleccionadoEnGrilla(dataRecord.id_cargo,dataRecord.codigo,dataRecord.id_finpartida,dataRecord.finpartida,dataRecord.id_condicion,dataRecord.condicion,dataRecord.id_organigrama,dataRecord.gerencia_administrativa,dataRecord.departamento_administrativo,dataRecord.nivelsalarial,dataRecord.cargo,dataRecord.sueldo);
                        }
                    },
                    { text: '&Iacute;tem/C&oacute;digo', filtertype: 'input', datafield: 'codigo', width: 100},
                    /*{ text: 'Fuente', filtertype: 'checkedlist', datafield: 'finpartida', width: 200},*/
                    { text: 'Condici&oacute;n', filtertype: 'checkedlist', datafield: 'condicion', width: 100},
                    { text: 'Gerencia', filtertype: 'checkedlist', datafield: 'gerencia_administrativa', width: 150},
                    { text: 'Departamento', filtertype: 'checkedlist', datafield: 'departamento_administrativo', width: 150},
                    { text: 'Nivel Salarial', filtertype: 'checkedlist', datafield: 'nivelsalarial', width: 150},
                    { text: 'Cargo', columntype: 'textbox', filtertype: 'input', datafield: 'cargo', width: 150 },
                    { text: 'Haber', filtertype: 'checkedlist', datafield: 'sueldo', width: 150},
                ]
            });
    }
}
/*
 * Función para cargar los departamentos en el combo especificado.
 * @param idDepartamentoPrefijado Identificador del departamento prefijado por defecto.
 */
function listarTiposHorarios(tipoHorario,nuevo){
    var id='';
    if(nuevo==1)
        id = $('#lstTipoHorarioPerfilLaboralNuevo');
    else
        id = $('#lstTipoHorarioPerfilLaboralEditar');
    id.html("");
    $.ajax({
        url:'/perfileslaborales/listtiposhorarios',
        type:'POST',
        datatype: 'json',
        async:false,
        data:{id:tipoHorario
        },
        success: function(data) {
            var res = jQuery.parseJSON(data);
            if(res.length>0){
                id.append("<option value='0'>Seleccionar..</option>");
                $.each( res, function( key, val ) {
                    ok=true;
                    if(tipoHorario==val.tipo_horario)selected="selected";else selected="";
                    id.append("<option value="+val.tipo_horario+" "+selected+">"+val.tipo_horario_descripcion+"</option>");
                });
            }
        }
    });
}
/**
 * Función para cargar el combo de áreas en caso de existir para el organigrama correspondiente al cargo.
 * @param idPadre Identificador del organigrama padre del cual se desea conocer las áreas disponibles.
 */
function cargarAreasAdministrativas(idPadre,idAreaPredeterminada){
    $('#divAreas').hide();
    $('#lstAreas').html("");
    var ok=false;
    var selected = "";
    if(idPadre>0){
        $.ajax({
            url:'/relaborales/listareas',
            type:'POST',
            datatype: 'json',
            async:false,
            data:{id_padre:idPadre
            },
            success: function(data) {
                var res = jQuery.parseJSON(data);
                if(res.length>0){
                    $('#divAreas').show();
                    $('#lstAreas').append("<option value='0'>Seleccionar..</option>");
                    $.each( res, function( key, val ) {
                        ok=true;
                        if(idAreaPredeterminada==val.id_area)selected="selected";else selected="";
                        $('#lstAreas').append("<option value="+val.id_area+" "+selected+">"+val.unidad_administrativa+"</option>");
                    });
                }
            }
        });
    }
    return ok;
}
/**
 * Función para validar los datos del formulario de nuevo registro de perfil laboral.
 * @returns {boolean} True: La validación fue correcta; False: La validación anuncia que hay errores en el formulario.
 */
function validaFormularioPorNuevoRegistroPerfilLaboral(){
    var ok = true;
    var msje = "";
    var enfoque = null;
    $(".msjs-alert").hide();
    limpiarMensajesErrorPorValidacionNuevoRegistroPerfilLaboral();
    var perfilLaboral = $("#txtPerfilLaboralNuevo").val();
    var idTipoHorario = $("#lstTipoHorarioPerfilLaboralNuevo").val();
    if(perfilLaboral==null||perfilLaboral==''){
        ok = false;
        var msje = "Debe introducir el perfil laboral necesariamente.";
        $("#divPerfilLaboralNuevo").addClass("has-error");
        $("#helpErrorPerfilLaboralNuevo").html(msje);
        if (enfoque == null)enfoque = $("#txtPerfilLaboralNuevo");
    }
    if(idTipoHorario==0){
        ok = false;
        var msje = "Debe seleccionar el tipo de horario necesariamente.";
        $("#divTipoHorarioPerfilLaboralNuevo").addClass("has-error");
        $("#helpErrorTipoHorarioPerfilLaboralNuevo").html(msje);
        if (enfoque == null)enfoque = $("#lstTipoHorarioPerfilLaboralNuevo");
    }
    if(enfoque!=null){
        enfoque.focus();
    }
    return ok;
}
/**
 * Función para la limpieza de los mensajes de error debido a la validación del formulario para nuevo registro de perfil laboral.
 */
function limpiarMensajesErrorPorValidacionNuevoRegistroPerfilLaboral(){
    $("#divPerfilLaboralNuevo").removeClass("has-error");
    $("#helpErrorPerfilLaboralNuevo").html("");
}
/**
 * Función para el almacenamiento de un nuevo registro en la Base de Datos.
 */
function guardarNuevoRegistroPerfilLaboral(){
    var ok=true;
    var perfilLaboral = $("#txtPerfilLaboralNuevo").val();
    var grupoLaboral = $("#txtGrupoPerfilLaboralNuevo").val();
    var tipoHorario = $("#lstTipoHorarioPerfilLaboralNuevo").val();
    var chkControlFaltasOmisionesPerfilLaboralNuevoNuevo = 0;
    if($("#chkControlFaltasOmisionesPerfilLaboralNuevoNuevo").bootstrapSwitch("state"))
        chkControlFaltasOmisionesPerfilLaboralNuevoNuevo = 1;
    var observacionPerfilLaboral = $("#txtObservacionPerfilLaboralNuevo").val();
    if(perfilLaboral!=''&&tipoHorario>0){
        var ok=$.ajax({
            url:'/perfileslaborales/save/',
            type:"POST",
            datatype: 'json',
            async:false,
            cache:false,
            data:{id:0,
                perfil_laboral:perfilLaboral,
                grupo:grupoLaboral,
                tipo_horario:tipoHorario,
                control_f_o:chkControlFaltasOmisionesPerfilLaboralNuevoNuevo,
                observacion:observacionPerfilLaboral
            },
            success: function(data) {  //alert(data);

                var res = jQuery.parseJSON(data);
                /**
                 * Si se ha realizado correctamente el registro del perfil laboral
                 */
                $(".msjes").hide();
                if(res.result==1){
                    $("#divMsjePorSuccess").html("");
                    $("#divMsjePorSuccess").append(res.msj);
                    $("#divMsjeNotificacionSuccess").jqxNotification("open");
                    /**
                     * Se habilita nuevamente el listado actualizado con el registro realizado y
                     * se inhabilita el formulario para nuevo registro.
                     */
                    $('#jqxTabsPerfilesLaborales').jqxTabs('enableAt', 0);
                    $('#jqxTabsPerfilesLaborales').jqxTabs('disableAt', 1);
                    $("#divGridPerfilesLaborales").jqxGrid("updatebounddata");
                } else if(res.result==0){
                    /**
                     * En caso de haberse presentado un error al momento de especificar la ubicación del trabajo
                     */
                    $("#divMsjePorWarning").html("");
                    $("#divMsjePorWarning").append(res.msj);
                    $("#divMsjeNotificacionWarning").jqxNotification("open");
                }else{
                    /**
                     * En caso de haberse presentado un error crítico al momento de registrarse la relación laboral
                     */
                    $("#divMsjePorError").html("");
                    $("#divMsjePorError").append(res.msj);
                    $("#divMsjeNotificacionError").jqxNotification("open");
                }

            }, //mostramos el error
            error: function() { alert('Se ha producido un error Inesperado'); }
        });
    }else {
        ok = false;
    }
    return ok;
}