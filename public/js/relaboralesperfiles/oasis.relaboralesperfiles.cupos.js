/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  29-01-2015
 */
/**
 * Función para cargar el listado de cupos por de acuerdo a la ubicación solicitada y el perfil laboral seleccionado.
 * @param idUbicacion
 * @param idPerfilLaboral
 * @param fechaIni
 * @param fechaFin
 */
function cargarCupos(idUbicacion,idPerfilLaboral,fechaIni,fechaFin){
    var grilla = "";
    var nro = 1;
    var cupoMinimo = 0;
    var cupoMaximo = 200;
    var contadorInicial = 0;
    var contadorPorCambios = 0;
    var arrIds = [];
    var prefijoClase = "";
    var idCupoTurno = 0;
    $("#tbody_cupos").html("");
    $.ajax({
        url: '/ubicaciones/listgruposporcupos',
        type: 'POST',
        datatype: 'json',
        async: false,
        cache: false,
        data:{id_ubicacion:idUbicacion,id_perfillaboral:idPerfilLaboral,fecha_ini:fechaIni,fecha_fin:fechaFin},
        success: function (data) {
            var res = jQuery.parseJSON(data);
            if (res.length > 0) {
                $.each(res, function (key, val) {
                    grilla="";
                    var cupo = cupoMinimo;
                    prefijoClase="n";
                    idCupoTurno = 0;
                    if(val.id_cupoturno!=null){
                        cupo = val.cupo;
                        prefijoClase="r";
                        idCupoTurno = val.id_cupoturno;
                    }
                    grilla += "<tr id='"+prefijoClase+"_"+val.id+"_"+idCupoTurno+"' class='tr_ubicaciones'><td class='text-center'>"+nro+"</td><td class='text-left'>"+val.ubicacion+"</td><td class='text-left'>"+val.estacion+"</td>";
                    grilla += "<td style='background-color: "+val.color+";'><input id='sliderCupo"+val.id+"' class='sliderCupo' type='text' data-slider-min='"+cupoMinimo+"' data-slider-max='"+cupoMaximo+"' data-slider-step='1' data-slider-value='"+cupo+"'></td>";
                    grilla += "<td class='text-center'><span id='spanSlider"+val.id+"' class='spanSlider'>"+cupo+"</span></td>";
                    grilla += "</tr>";
                    nro++;
                    arrIds.push(val.id);
                    contadorInicial += cupo;
                    $("#tbody_cupos").append(grilla);
                    var slider = new Slider("#sliderCupo"+val.id);
                    slider.on("slide", function(slideEvt) {
                        $("#spanSlider"+val.id).html("");
                        $("#spanSlider"+val.id).text(slideEvt.value);
                        contadorPorCambios=0;
                        $.each(arrIds,function(clave,valor){
                            contadorPorCambios += parseFloat($("#spanSlider"+valor).text());
                            $("#spanTotalCupo").html("");
                            $("#spanTotalCupo").text(contadorPorCambios);
                        })
                    });
                });
                grilla = "<tr><td colspan='4' class='text-right'><b>Total:</b></td><td class='text-center'><span id='spanTotalCupo'>"+contadorInicial+"</span></td></tr>";
                $("#tbody_cupos").append(grilla);
            }
        }
    });
}
/**
 * Función para validar el listado de cupos por turno.
 * @returns {boolean}
 */
function validaFormularioCupos() {
    var ok = true;
    var msje = "";
    $(".msjs-alert").hide();
    var contador = 0;
    $(".sliderCupo").each(function() {
        contador++;
        if($(this).val()<0||$(this).val()==undefined){
            ok= false;
            return false;
        }
    });
    if(!ok){
        var msje = "Debe seleccionar un cupo para al menos una ubicaci&oacute;n y/o estaci&óacute;n.";
        $("#divMsjePorError").html("");
        $("#divMsjePorError").append(msje);
        $("#divMsjeNotificacionError").jqxNotification("open");
    }
    return ok;
}
/**
 * Función para guardar los cupos de acuerdo a los turnos de una perfil laboral en las estaciones y/o lineas que correspondan.
 * @param idPerfilLaboral
 * @param tipoHorario
 * @param fechaIni
 * @param fechaFin
 */
function guardaFormularioCupos(idPerfilLaboral,tipoHorario,fechaIni,fechaFin){
    var ok=true;
    if(idPerfilLaboral>0&&fechaIni!=''&&fechaFin!=''){
        var contador = 0;
        $(".tr_ubicaciones").each(function() {
            var idConjuncionado = this.id+"";
            var arrUbicacion = idConjuncionado.split("_");
            var tipo = arrUbicacion[0];
            var idUbicacion = arrUbicacion[1];
            var idCupoTurno = arrUbicacion[2];
            var accion = 1;
            var cupoPorUbicacion = parseFloat($("#spanSlider"+idUbicacion).text());
            if(cupoPorUbicacion>0){
                var ok1 = guardarCupoPorPerfilUbicacionRango(idCupoTurno,idPerfilLaboral,idUbicacion,fechaIni,fechaFin,cupoPorUbicacion,"");
                if(!ok1)ok=false;
            }else{
                if(idCupoTurno>0){
                    var ok2 = descartarCupoTurno(idCupoTurno);
                }
            }
        });
    }
    return ok;
}
/**
 * Función para el registro individual del cupo para una ubicación en particular, de acuerdo a un perfil y rango de fechas de aplicación.
 * @param idCupoTurno
 * @param idPerfilLaboral
 * @param idUbicacion
 * @param fechaIni
 * @param fechaFin
 * @param cupoPorUbicacion
 * @param observacion
 * @returns {boolean}
 */
function guardarCupoPorPerfilUbicacionRango(idCupoTurno,idPerfilLaboral,idUbicacion,fechaIni,fechaFin,cupoPorUbicacion,observacion){
    var ok = false;
    if(idPerfilLaboral>0&&idUbicacion>0&&fechaIni!=''&&fechaFin!=''){
        $.ajax({
            url: '/cuposturnos/save/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {
                id: idCupoTurno,
                id_perfillaboral:idPerfilLaboral,
                id_ubicacion:idUbicacion,
                fecha_ini:fechaIni,
                fecha_fin:fechaFin,
                cupo:cupoPorUbicacion,
                observacion:observacion
            },
            success: function (data) {  //alert(data);
                var res = jQuery.parseJSON(data);
                /**
                 * Si se ha realizado correctamente el registro de turno por cupo.
                 */
                if (res.result == 1) {
                    ok = true;
                }else{
                    ok = false;
                    var msje = res.msj;
                    $("#divMsjePorError").html("");
                    $("#divMsjePorError").append(msje);
                    $("#divMsjeNotificacionError").jqxNotification("open");
                }
            }
        });
    }
    return ok;
}
/**
 * Función para descartar el registro de turno por cupo.
 * @param idCupoTurno
 * @returns {boolean}
 */
function descartarCupoTurno(idCupoTurno){
    var ok = false;
    if(idCupoTurno>0){
        $.ajax({
            url: '/cuposturnos/down/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {
                id: idCupoTurno
            },
            success: function (data) {  //alert(data);
                var res = jQuery.parseJSON(data);
                /**
                 * Si se ha realizado correctamente la baja del registro de cupo por turno.
                 */
                if (res.result == 1) {
                    ok = true;
                }else{
                    ok = false;
                    var msje = res.msj;
                    $("#divMsjePorError").html("");
                    $("#divMsjePorError").append(msje);
                    $("#divMsjeNotificacionError").jqxNotification("open");
                }
            }
        });
    }
    return ok;
}