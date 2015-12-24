/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  04-12-2015
 */
/**
 * Función para obtener las preguntas y respuestas por encuesta.
 * @param opcion
 * @param idRelaboral
 * @param idEncuesta
 * @param tituloEncuesta
 * @param observacionEncuesta
 */
function cargaCuerpoEncuesta(opcion,idRelaboral,idEncuesta,tituloEncuesta,observacionEncuesta){
    var sufijo = "New";
    if (opcion==2){
        sufijo = "View";
    }
    $("#divCuerpoEncuesta"+sufijo).html("");
    var numerador = 0;
    var cuerpo_pregunta = "";
    var idPregunta = 0;
    $("#h3TituloEncuesta"+sufijo).html(tituloEncuesta)
    if(idRelaboral>0&&idEncuesta>0){
        $.ajax({
            url: '/misencuestas/getquestions/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {id_relaboral:idRelaboral,id_encuesta: idEncuesta},
            success: function (data) {
                var res = jQuery.parseJSON(data);
                if (res.length > 0) {
                    $.each(res, function (key, val) {
                        if(val.respuesta_observacion!=null){
                            $("#txtComentarioEncuesta"+sufijo).val(val.respuesta_observacion);
                        }
                        if(idPregunta!=val.id_pregunta){
                            numerador++;
                            if(idPregunta>0){
                                cuerpo_pregunta += "</div></fieldset>";
                            }
                            idPregunta = val.id_pregunta;
                            cuerpo_pregunta += "<fieldset><legend id='preg_"+val.tipopregunta_id+"_"+val.id_pregunta+"' class='preg'><i class='fa fa-angle-right'></i> Pregunta "+numerador+": "+val.pregunta+"</legend>";
                            var divGrupo = "divGrupo"+val.tipopregunta_id;
                            cuerpo_pregunta += "<div class='form-group' id='"+divGrupo+"'>";
                            cuerpo_pregunta += "<label class='col-md-3 control-label'>&nbsp;</label>";
                            cuerpo_pregunta += "<div class='col-md-9'>";

                        }
                        cuerpo_pregunta += "<div class='radio'>";
                        var idPregOpcion = "";
                        var clase = "";
                        var nombre = "";
                        if(opcion!=2){
                            idPregOpcion = "p"+val.id_pregunta+"_or"+val.id_opcionrespuesta;
                            /**
                             * Si la opción solicita ingresar algun dato de agregación
                             */
                            if(val.opcionrespuesta_agregacion!=''&&val.opcionrespuesta_agregacion!=null){
                                idPregOpcion += "_1";
                            }else idPregOpcion += "_0";
                            clase = "rp resp_"+idPregunta;
                            nombre = "preguntaopcion["+idPregunta+"]" ;
                        }else {
                            idPregOpcion = "pv"+val.id_pregunta+"_orv"+val.id_opcionrespuesta;
                            /**
                             * Si la opción solicita ingresar algun dato de agregación
                             */
                            if(val.opcionrespuesta_agregacion!=''&&val.opcionrespuesta_agregacion!=null){
                                idPregOpcion += "_1";
                            }else idPregOpcion += "_0";
                            clase = "rpv respv_"+idPregunta;
                            nombre = "preguntaopcionview["+idPregunta+"]" ;
                        }
                        cuerpo_pregunta += "<label for="+idPregOpcion+">";
                        cuerpo_pregunta += "<input id="+idPregOpcion+" class='"+clase+"' name="+nombre+" value="+val.opcionrespuesta_puntaje+" type='radio'";
                        if(opcion==2){
                            cuerpo_pregunta += " disabled ";
                        }
                        if(val.id_respuesta>0){
                            cuerpo_pregunta += "checked";
                        }
                        cuerpo_pregunta += ">  "+val.opcionrespuesta_respuesta;
                        if(val.opcionrespuesta_agregacion!=''&&val.opcionrespuesta_agregacion!=null){
                            cuerpo_pregunta += " ("+val.opcionrespuesta_agregacion+")";

                        }
                        if(val.opcionrespuesta_agregacion!=''&&val.opcionrespuesta_agregacion!=null){
                            var opcionrespuesta_agregacion = val.opcionrespuesta_agregacion;
                            cuerpo_pregunta += "<div>";
                            cuerpo_pregunta += "<div class='form-group div-mis-encuestas' id='divAgregacion"+sufijo+"'>";
                            cuerpo_pregunta += "<div class='col-md-6'>";
                            var idAgregacion = "";
                            var claseAgregacion = "";
                            var helpErr = "";
                            if(opcion!=2){
                                idAgregacion = "agr_p"+idPregunta+"_or"+val.id_opcionrespuesta;
                                claseAgregacion = "agr_"+idPregunta;
                                helpErr = "helpErrorAgr"+idPregunta+"_"+idPregOpcion;
                            }
                            cuerpo_pregunta += "<textarea id='"+idAgregacion+"' name='txtObservacionNew' class='form-control "+claseAgregacion+"'";
                            cuerpo_pregunta += "placeholder='"+opcionrespuesta_agregacion+"'>";

                            if(val.respuesta_agregacion!=null){
                                cuerpo_pregunta += val.respuesta_agregacion;
                            }
                            cuerpo_pregunta += "</textarea>";
                            cuerpo_pregunta += "</div>";
                            cuerpo_pregunta += "<span class='help-block' id='"+helpErr+"'></span>";
                            cuerpo_pregunta += "</div>";
                            cuerpo_pregunta += "</div>";
                        }
                        cuerpo_pregunta += "</label>";
                        cuerpo_pregunta += "</div>";
                    });
                }
                $("#divCuerpoEncuesta"+sufijo).html(cuerpo_pregunta);

            },
            error: function () {
                alert('Se ha producido un error Inesperado');
            }
        });
    }
}
/**
 * Función para el despliegue del cuerpo de la encuesta.
 * @param idEncuesta
 * @param opcion
 */
function cargaCuerpoNuevaEncuesta(idEncuesta) {
    $("#divCuerpoEncuesta").html("");
    var pregunta = "";
    if (idEncuesta > 0) {
        $("#divCuerpoEncuesta").html("");

        var pregunta = "<fieldset><legend id='preg_3_1' class='preg'><i class='fa fa-angle-right'></i> Pregunta 1: Considerando un monto aproximado de Bs 300 por persona, prefiere usted que el monto económico del Fondo Social sea destinado en esta navidad a:</legend>";
        pregunta += "<div class='form-group'>";
        pregunta += "<label class='col-md-3 control-label'>&nbsp;</label>";
        pregunta += "<div class='col-md-9'>";
        pregunta += "<div class='radio'>";
        pregunta += "<label for='p1_or1'>";
        pregunta += "<input id='p1_or1' class='rp resp_1' name='preguntaopcion[1]' value='1' type='radio'>  Vale de consumo - Supermercado Ketal.";
        pregunta += "</label>";
        pregunta += "</div>";
        pregunta += "<div class='radio'>";
        pregunta += "<label for='p1_or2'>";
        pregunta += "<input id='p1_or2' class='rp resp_1' name='preguntaopcion[1]' value='2' type='radio'>  Vale de consumo - Supermercado Hipermaxi.";
        pregunta += "</label>";
        pregunta += "</div>";
        pregunta += "<div class='radio'>";
        pregunta += "<label for='p1_or3'>";
        pregunta += "<input id='p1_or3' class='rp resp_1' name='preguntaopcion[1]' value='3' type='radio'> Canast&oacute;n";
        pregunta += "</label>";
        pregunta += "</div>";

        pregunta += "<div class='radio'>";
        pregunta += "<label for='p1_or4'>";
        pregunta += "<input id='p1_or4' class='rp resp_1' name='preguntaopcion[1]' value='4' type='radio'> Reuni&oacute;n de Confraternizaci&oacute;n";
        pregunta += "</label>";
        pregunta += "</div>";

        pregunta += "<div class='radio'>";
        pregunta += "<label for='p1_or5'>";
        pregunta += "<input id='p1_or5' class='rp resp_1' name='preguntaopcion[1]' value='5' type='radio'> Donaci&oacute;n (Sugerir la instituci&oacute;n a la cual desea realizar la donaci&oacute;n)";
        pregunta += "</label>";
        pregunta += "</div>";
        pregunta += "</div>";
        pregunta += "</div>";
        pregunta += "</fieldset>";
        pregunta += "<fieldset><legend id='preg_2_2' class='preg'><i class='fa fa-angle-right'></i> Pregunta 2: En reconocimiento a la labor desempeñada por los j&oacute;venes estudiantes participantes del programa " +
        "“Trabajo con altura” en las líneas en funcionamiento de nuestra Empresa, ¿considera usted la posibilidad de entregar un canast&oacute;n equivalente a un monto aproximado de Bs.80?</legend>";
        pregunta += "<div class='form-group'>";
        pregunta += "<label class='col-md-3 control-label'>&nbsp;</label>";
        pregunta += "<div class='col-md-9'>";
        pregunta += "<div class='radio'>";
        pregunta += "<label for='p2_or1'>";
        pregunta += "<input id='p2_or1' class='rp resp_2' name='preguntaopcion[2]' value='1' type='radio'> Si";
        pregunta += "</label>";
        pregunta += "</div>";
        pregunta += "<div class='radio'>";
        pregunta += "<label for='p2_or2'>";
        pregunta += "<input id='p2_or2' class='rp resp_2' name='preguntaopcion[2]' value='2' type='radio'> No";
        pregunta += "</label>";
        pregunta += "</div>";
        pregunta += "</div>";
        pregunta += "</div>";
    }
    $("#divCuerpoEncuesta").html(pregunta);
}
/**
 * Función para guardar una respuesta opcional a una pregunta de este tipo.
 * @param idRelaboral
 * @param idEncuesta
 * @param idPregunta
 * @param idOpcionRespuesta
 * @param agregacion
 * @param observacion
 */
function guardarRespuestaOpcionalPorRadio(idRelaboral,idEncuesta,idPregunta,idOpcionRespuesta,agregacion,observacion){
    var ok = false;
    if(idRelaboral>0&&idEncuesta>0&&idPregunta>0&&idOpcionRespuesta>0){
            $.ajax({
                url: '/misencuestas/saveomultiple/',
                type: "POST",
                datatype: 'json',
                async: false,
                cache: false,
                data: {id_relaboral:idRelaboral,id_encuesta: idEncuesta, id_pregunta: idPregunta,id_opcion_respuesta:idOpcionRespuesta,agregacion:agregacion,observacion:observacion},
                success: function (data) {
                    var res = jQuery.parseJSON(data);
                    if (res.result == 1) {
                        ok= true;
                    }
                },
                error: function () {
                    alert('Se ha producido un error Inesperado');
                }
            });
        }
    return ok;
}
/**
 * Función para la carga de gestiones disponibles para la generación de marcaciones previstas y efectivas.
 * @param option
 * @param g
 */
function cargarGestionesDisponiblesParaRegistroDeIdeas(option, g) {
    var lista = "";
    var sufijo = "New";
    if (option == 2)sufijo = "Edit";
    else {
        if (option == 3)sufijo = "View";
    }
    $("#lstGestion" + sufijo).html("");
    $("#lstGestion" + sufijo).append("<option value=''>Seleccionar</option>");
    $("#lstGestion" + sufijo).prop("disabled", false);
    var selected = "";
    $.ajax({
        url: '/perfileslaborales/getgestiones/',
        type: "POST",
        datatype: 'json',
        async: false,
        cache: false,
        data: {id_perfillaboral: 0},
        success: function (data) {
            var res = jQuery.parseJSON(data);
            if (res.length > 0) {
                $.each(res, function (key, gestion) {
                    if (g == gestion)selected = "selected";
                    else selected = "";
                    lista += "<option value='" + gestion + "' " + selected + ">" + gestion + "</option>";
                });
            }
        }
    });
    if (lista != '')$("#lstGestion" + sufijo).append(lista);
    else $("#lstGestion" + sufijo).prop("disabled", true);
}
/**
 * Función para la obtención del listado de meses disponibles para la generación de marcaciones previstas y efectivas.
 * @param option
 * @param gestion
 * @param m
 */
function cargarMesesDisponiblesParaRegistroDeIdeas(option, gestion, m) {
    var sufijo = "New";
    if (option == 2)sufijo = "Edit";
    else {
        if (option == 3)sufijo = "View";
    }
    $("#lstMes" + sufijo).html("");
    $("#lstMes" + sufijo).append("<option value=''>Seleccionar</option>");
    $("#lstMes" + sufijo).prop("disabled", false);
    var lista = "";
    var selected = "";
    if (gestion > 0) {
        $.ajax({
            url: '/horariosymarcaciones/getmeses/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {gestion: gestion},
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
        if (lista != '')$("#lstMes" + sufijo).append(lista);
        else $("#lstMes" + sufijo).prop("disabled", true);
    } else {
        $("#lstMes" + sufijo).prop("disabled", true);
    }
}
/**
 * Función para la obtención del listado de tipos de negocio disponibles
 * @param opcion      -- Valor que permite determinar el formulario en el que se ejecuta.
 * @param tipoNegocio -- Identificador del tipo de negocio que debería estar seleccionada por defecto en caso de que su valor sea mayor a cero.
 */
function cargaListaDeTiposDeNegocios(opcion, tipoNegocio) {
    var sufijo = "New";
    if (opcion == 2)sufijo = "Edit";
    else {
        if (opcion == 3)sufijo = "View";
    }
    var selected = "";
    $("#lstTiposDeNegocio" + sufijo).html("");
    $("#lstTiposDeNegocio" + sufijo).append("<option value=''>Seleccionar..</option>");
    $("#lstTiposDeNegocio" + sufijo).prop("disabled", true);
    var frecuencia = "";
    $.ajax({
        url: '/misideas/listtiposdenegocio/',
        type: "POST",
        datatype: 'json',
        async: false,
        cache: false,
        success: function (data) {  //alert(data);
            var res = jQuery.parseJSON(data);
            if (res.length > 0) {
                $("#lstTiposDeNegocio" + sufijo).prop("disabled", false);
                $.each(res, function (key, val) {
                    if (tipoNegocio == val.tipo) {
                        selected = "selected";
                    } else selected = "";
                    $("#lstTiposDeNegocio" + sufijo).append("<option value='" + val.tipo + "' " + selected + ">" + val.tipo_descripcion + " " + frecuencia + "</option>");
                });
            }
        }, //mostramos el error
        error: function () {
            $("#divMsjePorError").html("");
            $("#divMsjePorError").append("Se ha producido un error Inesperado");
            $("#divMsjeNotificacionError").jqxNotification("open");
        }
    });
}
/**
 * Función para validar los datos del formulario de registro y edición de  control de excepciones.
 * @returns {boolean}
 */
function validaFormularioMisRespuestasEncuesta(opcion) {
    var ok = true;
    var enfoque = null;

    if (enfoque != null)enfoque.focus();
    return ok;
}
/**
 * Función para la limpieza de los mensajes de error debido a la validación del formulario.
 * @opción Variable que identifica a que tipo de formulario se aplica la función.
 */
function limpiarMensajesErrorPorValidacionIdeas(opcion) {
    var sufijo = "New";
    if (opcion == 2)sufijo = "Edit";
    else {
        if (opcion == 3) sufijo = "View";
    }
    $("#divTiposDeNegocio" + sufijo).removeClass("has-error");
    $("#helpErrorTiposDeNegocio" + sufijo).html("");
    $("#divTitulo" + sufijo).removeClass("has-error");
    $("#helpErrorTitulo" + sufijo).html("");
    $("#divResumen" + sufijo).removeClass("has-error");
    $("#helpErrorResumen" + sufijo).html("");
    $("#divDescripcion" + sufijo).removeClass("has-error");
    $("#helpErrorDescripcion" + sufijo).html("");
}

/**
 * Función para el almacenamiento de los datos registrados en el formulario de control de excepciones.
 */
function guardaMisRespuestasEncuesta(opcion) {
    var ok = false;
    var idIdea = 0;
    var sufijo = "New";
    if (opcion == 2) {
        idIdea = $("#hdnIdIdeaEdit").val();
        sufijo = "Edit";
    }
    var idRelaboral = $("#hdnIdRelaboral" + sufijo).val();
    var tipoNegocio = $("#lstTiposDeNegocio" + sufijo).val();
    var gestion = $("#lstGestion" + sufijo).val();
    var mes = $("#lstMes" + sufijo).val();
    var titulo = $("#txtTitulo" + sufijo).val();
    var resumen = $("#txtResumen" + sufijo).val();
    var descripcion = $("#txtDescripcion" + sufijo).val();

    var observacion = $("#txtObservacion" + sufijo).val();
    $.ajax({
        url: '/misideas/save/',
        type: "POST",
        datatype: 'json',
        async: false,
        cache: false,
        data: {
            id: idIdea,
            relaboral_id: idRelaboral,
            gestion: gestion,
            mes: mes,
            tipo_negocio: tipoNegocio,
            titulo: titulo,
            resumen: resumen,
            descripcion: descripcion,
            observacion: observacion
        },
        success: function (data) {  //alert(data);
            var res = jQuery.parseJSON(data);
            $(".msjes").hide();
            if (res.result == 1) {
                ok = true;
                $("#divMsjePorSuccess").html("");
                $("#divMsjePorSuccess").append(res.msj);
                $("#divMsjeNotificacionSuccess").jqxNotification("open");
                $("#divGridIdeas").jqxGrid("updatebounddata");
            } else if (res.result == 0) {
                $("#divMsjePorWarning").html("");
                $("#divMsjePorWarning").append(res.msj);
                $("#divMsjeNotificacionWarning").jqxNotification("open");
            } else {
                $("#divMsjePorError").html("");
                $("#divMsjePorError").append(res.msj);
                $("#divMsjeNotificacionError").jqxNotification("open");
            }

        },
        error: function () {
            $("#divMsjePorError").html("");
            $("#divMsjePorError").append("Se ha producido un error Inesperado");
            $("#divMsjeNotificacionError").jqxNotification("open");
        }
    });
    return ok;
}