/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  06-01-2015
 */
/**
 * Función para la validación del registro de un turno laboral dentro de un calendario.
 * @param opcion
 * @param idPerfilLaboral
 * @param tipoHorario
 * @param fechaIniRango
 * @param fechaFinRango
 * @returns {boolean}
 */
function validaFormularioRegistroCalendario(opcion,idPerfilLaboral,tipoHorario,fechaIniRango,fechaFinRango) {
    var ok = true;
    var msje = "";
    $(".msjs-alert").hide();
    var idTolerancia = $("#lstTolerancias").val();
    /*var lstIdJornadaLaboral = $("#lstJornadasLaborales").val();
    var arrIdJornadaLaboral =lstIdJornadaLaboral.split("::");
    var idJornadaLaboral = arrIdJornadaLaboral[0];*/
    var idJornadaLaboral = 1;
    var arr = $("#calendar").fullCalendar( 'clientEvents');
    var contadorEventos = 0;
    var mesIni = 0;
    var mesFin = 0;
    var arrMeses = [];
    var cruce = true;
    var dentroRango = 1;
    var excesoHorasSemana = true;
    var excesoPromedioTresSemanas = true;
    if(tipoHorario==3){
        cruce = verificaCruceDeHorariosEnMes();
    }
    else cruce = prevenirCruceDeHorariosEnVariosMeses(idPerfilLaboral,fechaIniRango,fechaFinRango);
    //excesoHorasSemana = verificaExcesoHorasSemanales();
    excesoPromedioTresSemanas = calculaExcesoPromedioTresSemanas();
    if(cruce&&excesoPromedioTresSemanas){
        $.each(arr,function(key,evento){
            var valClass = evento.className+"";
            var arrClass = valClass.split("_");
            var clase = arrClass[0];
            cruce = true;
            switch (clase){
                case "r":
                case "n":
                    contadorEventos++;
                    var fechaIni = fechaConvertirAFormato(evento.start,'-');
                    var fechaFin = "";
                    if(evento.start!=null&&evento.end==null){
                        fechaFin = fechaConvertirAFormato(evento.start,'-');
                    }
                    else fechaFin = fechaConvertirAFormato(evento.end,'-');
                    var arrfechaIni = fechaIni.split("-");
                    mesIni = arrfechaIni[1];
                    var arrfechaFin = fechaFin.split("-");
                    mesFin = arrfechaFin[1];
                    arrMeses.push(mesIni);
                    arrMeses.push(mesFin);
                    if(tipoHorario==3){
                        if(fechaIniRango!=""&&fechaFinRango!=""){
                            /**
                             * Si aún no se ha encontrado una fecha fuera del rango se sigue haciendo la consulta, caso contrario basta un horario
                             */
                            if(dentroRango==1){
                                /**
                                 * En caso de que el tipo de horario sea multiple, es necesario que existan los rangos caso contrario existe un error.
                                 * Además, las fechas de cada turno o evento deben estar dentro del rango.
                                 */
                                dentroRango = verificaSiFechaEstaEnRango(fechaIni,fechaIniRango,fechaFinRango);
                            }
                            if(dentroRango==1){
                                /**
                                 * En caso de que el tipo de horario sea multiple, es necesario que existan los rangos caso contrario existe un error.
                                 * Además, las fechas de cada turno o evento deben estar dentro del rango.
                                 */
                                dentroRango = verificaSiFechaEstaEnRango(fechaFin,fechaIniRango,fechaFinRango);
                            }
                        }else dentroRango=0;
                    }
                    break;
                case "d":break;
            }
        });
        if(contadorEventos==0){
            ok = false;
            var msje = "Debe registrar al menos un evento en el calendario necesariamente.";
            $("#divMsjePorError").html("");
            $("#divMsjePorError").append(msje);
            $("#divMsjeNotificacionError").jqxNotification("open");
        }else{
            /**
             * Si el tipo de horario corresponde a un múltiple y el mes de la fecha de inicio y el mes de la fecha de finalización son distintos
             */
            if(tipoHorario==3){
                if(dentroRango==0){
                    ok = false;
                    var msje = "Existen horarios fuera del rango admitido de registro. Verifique que todos los horarios esten entre el "+fechaIniRango+" al "+fechaFinRango+".";
                    $("#divMsjePorError").html("");
                    $("#divMsjePorError").append(msje);
                    $("#divMsjeNotificacionError").jqxNotification("open");
                }else {
                    var mesesInvolucrados = obtieneMesesInvolucrados(arrMeses);
                    if(mesesInvolucrados.length>1){
                        ok = false;
                        var msje = "Registro "+mesesInvolucrados.length+" meses en el calendario. El registro de horarios s&oacute;lo debe contemplar la asignaci&oacute;n dentro de un mes.";
                        $("#divMsjePorError").html("");
                        $("#divMsjePorError").append(msje);
                        $("#divMsjeNotificacionError").jqxNotification("open");
                    }else{
                        if(mesesInvolucrados.length==0){
                            ok = false;
                            var msje = "Debe seleccionar al menos un horario para su registro.";
                            $("#divMsjePorError").html("");
                            $("#divMsjePorError").append(msje);
                            $("#divMsjeNotificacionError").jqxNotification("open");
                        }
                    }
                }
            }
        }
    }else{
        ok = false;
        if(!excesoHorasSemana){
            var msje = "No se puede registrar el calendario debido a que existe carga horaria semanal que excede las 48 horas admitidas.";
            $("#divMsjePorError").html("");
            $("#divMsjePorError").append(msje);
            $("#divMsjeNotificacionError").jqxNotification("open");
        }
        if(!excesoPromedioTresSemanas){
            var msje = "No se puede registrar el calendario debido a que existe carga horaria semanal que excede las 48 horas admitidas en promedio de tres semanas (Segunda, tercera y cuarta semana del mes en el calendario).";
            $("#divMsjePorError").html("");
            $("#divMsjePorError").append(msje);
            $("#divMsjeNotificacionError").jqxNotification("open");
        }
    }
    if(idJornadaLaboral==0||idJornadaLaboral==undefined){
        ok = false;
        var msje = "Debe seleccionar un tipo de jornada laboral necesariamente.";
        $("#divMsjePorError").html("");
        $("#divMsjePorError").append(msje);
        $("#divMsjeNotificacionError").jqxNotification("open");
    }
    if(opcion>=3&&(idTolerancia==0||idTolerancia==undefined)){
        ok = false;
        var msje = "Debe seleccionar un tipo de tolerancia necesariamente.";
        $("#divMsjePorError").html("");
        $("#divMsjePorError").append(msje);
        $("#divMsjeNotificacionError").jqxNotification("open");
    }
    return ok;
}
/**
 * Función para el almacenamiento de los turnos registrados en el calendario.
 * @param opcion
 * @param idPerfilLaboral
 * @param tipoHorario
 * @param fechaIniMin
 * @param fechaFinMax
 * @returns {boolean}
 */
function guardaFormularioRegistroCalendario(opcion,idPerfilLaboral,tipoHorario,fechaIniMin,fechaFinMax){
    var arr = $("#calendar").fullCalendar( 'clientEvents');
    var contadorEventos = 0;
    var mesIni = 0;
    var mesFin = 0;
    var arrMeses = [];
    var cruce = true;
    var seRegistraEnMesDeterminado = true;
    var idTolerancia = 0;
    if(opcion>=3&&$("#lstTolerancias").val()!=undefined&&$("#lstTolerancias").val()>0)
        idTolerancia = $("#lstTolerancias").val();
    /*var lstIdJornadaLaboral = $("#lstJornadasLaborales").val();
    var arrIdJornadaLaboral =lstIdJornadaLaboral.split("::");
    var idJornadaLaboral = arrIdJornadaLaboral[0];*/
    var idJornadaLaboral = 1;
    var ok = true;
    var okk= true;
    $.each(arr,function(key,turno){
        var valClass = turno.className+"";
        var arrClass = valClass.split("_");
        var clase = arrClass[0];
        var idTipoHorario = arrClass[1];
        var idCalendarioLaboral = 0;
        if(turno.id!=undefined){
            idCalendarioLaboral=turno.id;
        }
        cruce = true;
        var fechaIni = fechaConvertirAFormato(turno.start,'-');
        var fechaFin = "";
        if(turno.start!=null&&turno.end==null){
            fechaFin = fechaConvertirAFormato(turno.start,'-');
        }
        else fechaFin = fechaConvertirAFormato(turno.end,'-');
        var arrfechaIni = fechaIni.split("-");
        mesIni = arrfechaIni[1];
        var arrfechaFin = fechaFin.split("-");
        mesFin = arrfechaFin[1];
        switch (clase){
            case "r":
                contadorEventos++;
                ok = guardarTurnoEnCalendario(opcion,idCalendarioLaboral,idPerfilLaboral,idTipoHorario,idTolerancia,idJornadaLaboral,fechaIni,fechaFin,'');
                if(!ok)okk=false;
                break;
            case "n":
                contadorEventos++;
                ok = guardarTurnoEnCalendario(opcion,0,idPerfilLaboral,idTipoHorario,idTolerancia,idJornadaLaboral,fechaIni,fechaFin,'');
                if(!ok)okk=false;
                break;
            case "d":break;
        }
       });
    return okk;
}
/**
 * Función para la verificación de la existencia cruce de horarios en un calendario que considera varios meses. Para la primera versión del sistema no se solicita esta función,
 * dejando la verificación al usuario aprobador del calendario. Sin embargo se la deja por si es necesaria para una etapa posterior.
 * @param idPerfilLaboral
 * @param fechaIni
 * @param fechaFin
 */
function prevenirCruceDeHorariosEnVariosMeses(idPerfilLaboral,fechaIni,fechaFin){
   var ok=true;

   return ok;
}
/**
 * Función para verificar que no haya cruce de horarios en un determinado mes.
 * @returns {boolean}
 */
function verificaCruceDeHorariosEnMes(){
    var ok=true;
    var arrHorasPorDia= [];
    var contP=0;
    var arrDias = ["mon","tue","wed","thu","fri","sat","sun"];
    var arr = $("#calendar").fullCalendar( 'clientEvents');
    if(arr.length>1){
        $.each(arrDias,function(k,dia){
            contP=0;
            $("td.fc-"+dia).map(function (index, elem) {
                contP++;
                var fecha = $(this).data("date");
                if(fecha!=undefined){
                    var arrFecha = fecha.split("-");
                    fecha = arrFecha[2]+"-"+arrFecha[1]+"-"+arrFecha[0];
                    $.each(arr,function(key,turno){
                        var clase = turno.className+"";
                        var arrClass = clase.split("_");
                        var idTipoHorario = arrClass[1];
                        var idTurno = 0;
                        if(turno.id!=undefined){
                            idTurno = turno.id;
                        }
                        var fechaIni = $.fullCalendar.formatDate(turno.start,'dd-MM-yyyy');
                        var fechaFin = $.fullCalendar.formatDate(turno.end,'dd-MM-yyyy');
                        if(fechaFin=="")fechaFin=fechaIni;
                        var sep='-';
                        //alert("Hora entrada: "+turno.hora_entrada+"\n Hora salida: "+turno.hora_salida);
                        if(procesaTextoAFecha(fechaIni,sep)<=procesaTextoAFecha(fecha,sep)
                            &&procesaTextoAFecha(fecha,sep)<=procesaTextoAFecha(fechaFin,sep)){
                            arrHorasPorDia.push({fecha:fecha,id_horario:idTipoHorario,horas_laborales:turno.horas_laborales,hora_entrada:turno.hora_entrada,hora_salida:turno.hora_salida})
                        }
                    });
                }
            });
        });
        var c=0;
        var arrFechas = [];
        /**
         * Se crea un array con las fechas consdiradas.
         */
        $.each(arrHorasPorDia,function(k,v){
            arrFechas.push(v.fecha);
        });
        var fechasUnicas=$.unique(arrFechas);
        var fechasUnicasPorCantidades = {};
        /**
         * Se crea un array con las fechas consideradas eliminando las fechas que tienen más de un horario.
         */
        $.each(fechasUnicas,function(cl,val){
            var cant = 1;
            $.each(arrHorasPorDia,function(k,v){
                if(val==v.fecha){
                    fechasUnicasPorCantidades[v.fecha] = cant;
                    cant++;
                }
            });
        });
        /*var valJornadaLaboral = $("#lstJornadasLaborales").val();
        var arrJornadaLaboral = valJornadaLaboral.split("::");*/
        var idJornadaLaboral = 1;
        var horasSemana = 48;
        var horasDia = 8;
        var horasNoche = 7;
        $.each(fechasUnicasPorCantidades,function(fecha,cantidad){
            /**
             * Sólo se consideran aquellas fechas que tienen más de un horario.
             */
            if(cantidad>1){
                /**
                 * El procedimiento sólo se aplica para fechas en las cuales haya más de un horario registrado.
                 */
                var contadorHoras = 0;
                var id = 0;
                var arrFechaEnConflicto = [];
                $.each(arrHorasPorDia,function(clave,turno){
                    if(fecha==turno.fecha){
                        contadorHoras += parseFloat(turno.horas_laborales);
                        id++;
                        arrFechaEnConflicto.push({
                            id:id,fecha:turno.fecha,id_horario:turno.id_horario,horas_laborales:turno.horas_laborales,hora_entrada:turno.hora_entrada,hora_salida:turno.hora_salida
                        });
                    }
                });
                var arrFecha = fecha.split("-");
                var date = arrFecha[2]+"-"+arrFecha[1]+"-"+arrFecha[0];
                if(contadorHoras>horasDia){
                    //$('.fc-day[data-date="'+ date +'"]').css("background-color", "red");
                }
                ok = verificaCrucePorListaDeHorarios(arrFechaEnConflicto,fecha);
                /*A objeto de impedir que la iteración continúe*/
                if(!ok){
                    /**
                     * Se muestra acá el error a objeto de dar a conocer la fecha exacta donde se presenta el cruce de horarios
                     * @type {string}
                     */
                    var msje = "No se puede registrar el calendario debido a que existe cruce de horarios en el calendario para la fecha: '"+fecha+"'.";
                    $("#divMsjePorError").html("");
                    $("#divMsjePorError").append(msje);
                    $("#divMsjeNotificacionError").jqxNotification("open");
                    return false;
                }
            }
        });
    }
    return ok;
}
/**
 * Función para evaluar el cruce de horarios de un conjunto de turnos para una fecha determinada
 * @param arrFechaEnConflicto
 * @param fecha
 * @returns {boolean}
 */
function verificaCrucePorListaDeHorarios(arrFechaEnConflicto,fecha){
    var ok1 = true;
    var ok2 = true;
    if(arrFechaEnConflicto.length>0&&fecha!=''){
        $.each(arrFechaEnConflicto,function(clave,turno){
            var auxArr = arrFechaEnConflicto;
            $.each(auxArr,function(key,val){
                if(turno.id!=val.id){
                    /**
                     * Inicialmente descartamos la comparación los horarios con sigo mismos
                    */
                    if(ok1&&ok2){
                        var arrHoraEntrada = turno.hora_entrada.split(":");
                        var hora_entrada = turno.hora_entrada;
                        /**
                         * A objeto de evitar considerar aquellos horarios que pudieran presentarse de modo continuo (Uno tras otro).
                         */
                        if(arrHoraEntrada[2]=="00"){
                            hora_entrada = arrHoraEntrada[0]+":"+arrHoraEntrada[1]+":01";
                        }
                        ok1 = verificaHoraEnRango(hora_entrada,val.hora_entrada,val.hora_salida);
                        if(ok1){
                            var arrHoraEntradaRango = val.hora_entrada.split(":");
                            var hora_entrada_rango = val.hora_entrada;
                            /**
                             * A objeto de evitar considerar aquellos horarios que pudieran presentarse de modo continuo (Uno tras otro).
                             */
                            if(arrHoraEntrada[2]=="00"){
                                hora_entrada_rango = arrHoraEntradaRango[0]+":"+arrHoraEntradaRango[1]+":01";
                            }
                            ok2 = verificaHoraEnRango(turno.hora_salida,hora_entrada_rango,val.hora_salida);
                        }
                        if(!ok1||!ok2){
                            return false;
                        }
                    }else return false;
                }
            });
        });
    }
    if(!ok1||!ok2){
        return false;
    }else return true;
}
/**
 * Función para la verificación de si una hora se encuentra dentro de un rango de horas.
 * @param hora
 * @param hora_ini
 * @param hora_fin
 */
function verificaHoraEnRango(hora,hora_ini,hora_fin){
    var ok=true;
    if(hora!=''&&hora_ini!=''&&hora_fin!=''){
        $.ajax({
            url: '/calendariolaboral/verificahoraenrango/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {
                hora: hora,
                hora_ini:hora_ini,
                hora_fin:hora_fin
            },
            success: function (data) {  //alert(data);
                var res = jQuery.parseJSON(data);
                /**
                 * Si se ha realizado correctamente el registro de la relación laboral y la movilidad
                 */
                if (res.result == 1) {
                    ok = false;
                }else{
                    ok = true;
                }
            }
        });
    }else ok=false;
    return ok;
}
/**
 * Función para el registro del turno en el calendario. Se comprende como turno a un horario con un rango de fechas para aplicarse en el calendario.
 * @param idCalendarioLaboral
 * @param idPerfilLaboral
 * @param idTipoHorario
 * @param idTolerancia
 * @param idJornadaLaboral
 * @param fechaIni
 * @param fechaFin
 * @param observacion
 * @param opcion
 * @param estado
 * @returns {boolean}
 */
function guardarTurnoEnCalendario(opcion,idCalendarioLaboral,idPerfilLaboral,idTipoHorario,idTolerancia,idJornadaLaboral,fechaIni,fechaFin,observacion){
    var ok = false;
    if(opcion>=1&&idPerfilLaboral>0&&idTipoHorario>0&&fechaIni!=''&&fechaFin!=''&&idJornadaLaboral>0){
        $.ajax({
            url: '/calendariolaboral/saveturno/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {
                id: idCalendarioLaboral,
                id_perfillaboral:idPerfilLaboral,
                id_horario:idTipoHorario,
                fecha_ini:fechaIni,
                fecha_fin:fechaFin,
                id_tolerancia:idTolerancia,
                id_jornada_laboral:idJornadaLaboral,
                observacion:observacion,
                opcion:opcion
            },
            success: function (data) {  //alert(data);
                var res = jQuery.parseJSON(data);
                /**
                 * Si se ha realizado correctamente el registro de la relación laboral y la movilidad
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
 * Función para devolver en un array los meses involucrados en el calendario.
 * @param arrMeses
 * @returns {Array}
 */
function obtieneMesesInvolucrados(arrMeses){
    var arr = [];
    var result = 0;
    if(arrMeses.length>0){
        $.each(arrMeses,function (clave,elemento){
            result = jQuery.inArray(elemento,arr);
            if(result<0){
                arr.push(elemento);
            }
        });
    }
    return arr;
}
/**
 * Función para evaluar si una fecha está dentro del rango.
 * @param fechaEval
 * @param fechaIniRango
 * @param fechaFinRango
 * @returns 1: Si Esta; 0: No esta
 */
function verificaSiFechaEstaEnRango(fechaEval,fechaIniRango,fechaFinRango){
    var ok= 0;
    ok = $.ajax({
        url: '/perfileslaborales/checkinrange/',
        type: "POST",
        datatype: 'json',
        async: false,
        cache: false,
        data: {
            fecha_eval: fechaEval,
            fecha_ini:fechaIniRango,
            fecha_fin:fechaFinRango
        },
        success: function (data) {
        }
    }).responseText;
    return ok;
}
/**
 * Función para retornar los registros correspondientes a un periodo de turnos para un determinado perfil al estado EN ELABORACIÓN.
 * @param idPerfilLaboral
 * @param tipoHorario
 * @param fechaIni
 * @param fechaFin
 */
function retornaEstadoElaboracion(idPerfilLaboral,tipoHorario,fechaIni,fechaFin){
    var ok= true;
    var arr = $("#calendar").fullCalendar( 'clientEvents');
    var arrHorarios = [];
    var cadenaHorarios = "";
    $.each(arr,function(key,turno){
        var valClass = turno.className+"";
        var arrClass = valClass.split("_");
        var clase = arrClass[0];
        var idTipoHorario = arrClass[1];
        var idCalendarioLaboral = 0;
        if(clase=="r"&&turno.id!=undefined){
            arrHorarios.push(turno.id);
        }
    });
    if(arrHorarios.length>0){
        var cadenaHorarios =arrHorarios.join(",");
    }
    $.ajax({
        url: '/calendariolaboral/retornaestadoelaboracion/',
        type: "POST",
        datatype: 'json',
        async: false,
        cache: false,
        data: {
            id_perfillaboral:idPerfilLaboral,
            tipo_horario: tipoHorario,
            id_horarios:cadenaHorarios,
            fecha_ini:fechaIni,
            fecha_fin:fechaFin
        },
        success: function (data) {
            var res = jQuery.parseJSON(data);
            if(res.result!=1)ok=false;
        }
    });
    return ok;
}
/**
 * Función para verificar que no se excedan las horas semanales permitidas.
 * @param tipoHorario
 */
function verificaExcesoHorasSemanales(){
    var ok=true;
    var horasSemanales = parseFloat($("#hdnJornadaLaboralSemanal").val());
    var sumaSemana1 = parseFloat($("#spSumaSemana1").text());
    var sumaSemana2 = parseFloat($("#spSumaSemana2").text());
    var sumaSemana3 = parseFloat($("#spSumaSemana3").text());
    var sumaSemana4 = parseFloat($("#spSumaSemana4").text());
    var sumaSemana5 = parseFloat($("#spSumaSemana5").text());
    var sumaSemana6 = parseFloat($("#spSumaSemana6").text());
    if(sumaSemana1>horasSemanales)ok=false;
    if(sumaSemana2>horasSemanales)ok=false;
    if(sumaSemana3>horasSemanales)ok=false;
    if(sumaSemana4>horasSemanales)ok=false;
    if(sumaSemana5>horasSemanales)ok=false;
    if(sumaSemana6>horasSemanales)ok=false;
    return ok;
}
/**
 * Función para verificar que no el promedio semanal de tres semanas no exceda las horas semanales válidas.
 * @returns {boolean}
 */
function calculaExcesoPromedioTresSemanas(){
    var ok=true;
    var horasSemanales = parseFloat($("#hdnJornadaLaboralSemanal").val());
    var sumaSemana1 = parseFloat($("#spSumaSemana1").text());
    var sumaSemana2 = parseFloat($("#spSumaSemana2").text());
    var sumaSemana3 = parseFloat($("#spSumaSemana3").text());
    var sumaSemana4 = parseFloat($("#spSumaSemana4").text());
    var sumaSemana5 = parseFloat($("#spSumaSemana5").text());
    var sumaSemana6 = parseFloat($("#spSumaSemana6").text());
    var sumaTresSemanas = parseFloat(sumaSemana2+sumaSemana3+sumaSemana4)/3;
    if(sumaTresSemanas>horasSemanales){
        ok=false;
    }
    return ok;
}