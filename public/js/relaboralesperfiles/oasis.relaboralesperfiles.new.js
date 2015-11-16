/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  02-02-2015
 */
/**
 * Función para definir el contenido de la lista dual en función de la ubicación seleccionada.
 * @param accion
 * @param idPerfilRelaboral
 * @param idUbicacion
 * @param fechaIni
 * @param fechaFin
 */
function definirListaDualNueva(accion,idPerfilRelaboral,idUbicacion,fechaIni,fechaFin){
    if(idUbicacion>0){
        var arrPersonal = [];
        var source = [];
        var data = [];
        var dataAdapter = [];
        var sufijo = "New";
        var sourceB = [];
        if(accion==2){
            sufijo = "Edit";
            url = '/relaborales/listagrupadas/';
        }else{
            url = '/relaborales/listactivos/';
        }
        $("#lstBox"+sufijo+"A").html("");
        $("#lstBox"+sufijo+"B").html("");
        $("#lstBox"+sufijo+"A").jqxListBox('render');
        $("#lstBox"+sufijo+"B").jqxListBox('render');
        $("#formNew")[0].reset();
        $.ajax({
            url: url,
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data:{id_perfillaboral:idPerfilRelaboral,id_ubicacion:idUbicacion,fecha_ini:fechaIni,fecha_fin:fechaFin },
            success: function (data) {
                arrPersonal = jQuery.parseJSON(data);
            }
        });
        source = {
            localdata: arrPersonal,
            datatype: "array"
        };
        dataAdapter = new $.jqx.dataAdapter(source);
        if(accion==2){
            var arrPersonalDisponibles= [];
            var arrPersonalSeleccionados= [];
            $.each(arrPersonal,function(key,val){
               if(val.agrupador==0){arrPersonalDisponibles.push(val);}
                else arrPersonalSeleccionados.push(val);
            });
            source = {
                localdata: arrPersonalDisponibles,
                datatype: "array"
            };
            dataAdapter = new $.jqx.dataAdapter(source);
            sourceB = {
                localdata: arrPersonalSeleccionados,
                datatype: "array"
            };
            data = new $.jqx.dataAdapter(sourceB);
        }
        // Create a jqxListBox

        $("#lstBox"+sufijo+"A").jqxListBox({multiple: true, filterable: true,allowDrop: true, allowDrag: true, source: dataAdapter, width: "100%", height: 250,
            displayMember: 'nombres',
            valueMember: 'id_relaboral',
            renderer: function (index, label, value) {
                    var datarecord = arrPersonal[index];
                    if(datarecord!=undefined&&accion==1){
                        var ci = datarecord.ci;
                        var expd = datarecord.expd;
                        var imgurl = '/images/personal/'+ci+'.jpg';
                        if(!ImageExist(imgurl))imgurl = '/images/perfil-profesional.jpg';
                        var cargo = datarecord.cargo;
                        var fechas = datarecord.fecha_ini;
                        if(datarecord.fecha_fin!=null){
                            fechas = "Fechas: "+fechas + " AL "+datarecord.fecha_fin;
                        }else fechas = "Fecha Inicio: "+fechas;
                        var img = '<img height="70" width="70" src="' + imgurl + '"/>';
                        //var table = '<table id="tbl_'+datarecord.id_relaboral+'" data-agrupador="'+datarecord.agrupador+'" data-nombres="'+datarecord.nombres+'" style="min-width: 130px;"><tr><td style="width: 80px;" rowspan="4">' + img + '</td><td>Nombres: ' + datarecord.nombres + '-"'+datarecord.agrupador+'"</td></tr><tr><td>CI: '+ci+' '+expd+'</td></tr><tr><td>Cargo: '+cargo+'</td></tr><tr><td>'+fechas+'<input type="hidden" id="hdn_'+datarecord.id_relaboral+'" value="'+datarecord.agrupador+'"></td></tr></table>';
                        $("#tbl_"+datarecord.id_relaboral).remove();
                        var fechaIni = datarecord.fecha_incor;
                        var fechaFin = datarecord.fecha_fin;
                        if(datarecord.fecha_baja!="")fechaFin = datarecord.fecha_baja;
                        var table = '<table id="tbl_'+datarecord.id_relaboral+'" data-agrupador="'+datarecord.agrupador+'" data-nombres="'+datarecord.nombres+'" data-date-min="'+fechaIni+'" data-date-max="'+fechaFin+'" style="min-width: 130px;"><tr><td style="width: 80px;" rowspan="4">' + img + '</td><td>Nombres: ' + datarecord.nombres + '</td></tr><tr><td>CI: '+ci+' '+expd+'</td></tr><tr><td>Cargo: '+cargo+'</td></tr><tr><td>'+fechas+'<input type="hidden" id="hdn_'+datarecord.id_relaboral+'" value="'+datarecord.agrupador+'"></td></tr></table>';
                        return table;
                    }else{
                        if(jQuery.type( value )==="number"){
                            var datarecord = getOneByIdRelaboralInArray(arrPersonal,value);
                            var ci = datarecord.ci;
                            var expd = datarecord.expd;
                            var imgurl = '/images/personal/'+ci+'.jpg';
                            if(!ImageExist(imgurl))imgurl = '/images/perfil-profesional.jpg';
                            var cargo = datarecord.cargo;
                            var fechas = datarecord.fecha_ini;
                            if(datarecord.fecha_fin!=null){
                                fechas = "Fechas: "+fechas + " AL "+datarecord.fecha_fin;
                            }else fechas = "Fecha Inicio: "+fechas;
                            var img = '<img height="70" width="70" src="' + imgurl + '"/>';
                            $("#tbl_"+datarecord.id_relaboral).remove();
                            var fechaIni = datarecord.fecha_incor;
                            var fechaFin = datarecord.fecha_fin;
                            if(datarecord.fecha_baja!="")fechaFin = datarecord.fecha_baja;
                            var table = '<table id="tbl_'+datarecord.id_relaboral+'" data-agrupador="'+datarecord.agrupador+'" data-nombres="'+datarecord.nombres+'" data-date-min="'+fechaIni+'" data-date-max="'+fechaFin+'" style="min-width: 130px;"><tr><td style="width: 80px;" rowspan="4">' + img + '</td><td>Nombres: ' + datarecord.nombres + '</td></tr><tr><td>CI: '+ci+' '+expd+'</td></tr><tr><td>Cargo: '+cargo+'</td></tr><tr><td>'+fechas+'<input type="hidden" id="hdn_'+datarecord.id_relaboral+'" value="'+datarecord.agrupador+'"></td></tr></table>';
                            return table;
                        }else{
                            if(jQuery.type( value )==="object"){
                                var datarecord = value;
                                var ci = datarecord.ci;
                                var expd = datarecord.expd;
                                var imgurl = '/images/personal/'+ci+'.jpg';
                                if(!ImageExist(imgurl))imgurl = '/images/perfil-profesional.jpg';
                                var cargo = datarecord.cargo;
                                var fechas = datarecord.fecha_ini;
                                if(datarecord.fecha_fin!=null){
                                    fechas = "Fechas: "+fechas + " AL "+datarecord.fecha_fin;
                                }else fechas = "Fecha Inicio: "+fechas;
                                var img = '<img height="70" width="70" src="' + imgurl + '"/>';
                                $("#tbl_"+datarecord.id_relaboral).remove();
                                var fechaIni = datarecord.fecha_incor;
                                var fechaFin = datarecord.fecha_fin;
                                if(datarecord.fecha_baja!="")fechaFin = datarecord.fecha_baja;
                                var table = '<table id="tbl_'+datarecord.id_relaboral+'" data-agrupador="'+datarecord.agrupador+'" data-nombres="'+datarecord.nombres+'" data-date-min="'+fechaIni+'" data-date-max="'+fechaFin+'" style="min-width: 130px;"><tr><td style="width: 80px;" rowspan="4">' + img + '</td><td>Nombres: ' + datarecord.nombres + '</td></tr><tr><td>CI: '+ci+' '+expd+'</td></tr><tr><td>Cargo: '+cargo+'</td></tr><tr><td>'+fechas+'<input type="hidden" id="hdn_'+datarecord.id_relaboral+'" value="'+datarecord.agrupador+'"></td></tr></table>';
                                return table;
                            }
                        }

                    }
            },
            ready:function(){
                var itemsA = $("#lstBox"+sufijo+"A").jqxListBox('getItems');
                $("#spanContadorLstBox"+sufijo+"A").text(itemsA.length);
            }
        });
        $("#lstBox"+sufijo+"B").jqxListBox({ multiple: true,filterable: true,allowDrop: true, allowDrag: true, source: data, width:  "100%", height: 250,
            renderer: function (index, label, value) {
                    var datarecord = arrPersonal[index];
                    if(datarecord!=undefined&&accion==1){
                        var ci = datarecord.ci;
                        var expd = datarecord.expd;
                        var imgurl = '/images/personal/'+ci+'.jpg';
                        if(!ImageExist(imgurl))imgurl = '/images/perfil-profesional.jpg';
                        var cargo = datarecord.cargo;
                        var fechas = datarecord.fecha_ini;
                        if(datarecord.fecha_fin!=null){
                            fechas = "Fechas: "+fechas + " AL "+datarecord.fecha_fin;
                        }else fechas = "Fecha Inicio: "+fechas;
                        var img = '<img height="70" width="70" src="' + imgurl + '"/>';
                        $("#tbl_"+datarecord.id_relaboral).remove();
                        var fechaIni = datarecord.fecha_incor;
                        var fechaFin = datarecord.fecha_fin;
                        if(datarecord.fecha_baja!="")fechaFin = datarecord.fecha_baja;
                        var table = '<table id="tbl_'+datarecord.id_relaboral+'" data-agrupador="'+datarecord.agrupador+'" data-nombres="'+datarecord.nombres+'" data-date-min="'+fechaIni+'" data-date-max="'+fechaFin+'" style="min-width: 130px;"><tr><td style="width: 80px;" rowspan="4">' + img + '</td><td>Nombres: ' + datarecord.nombres + '</td></tr><tr><td>CI: '+ci+' '+expd+'</td></tr><tr><td>Cargo: '+cargo+'</td></tr><tr><td>'+fechas+'<input type="hidden" id="hdn_'+datarecord.id_relaboral+'" value="'+datarecord.agrupador+'"></td></tr></table>';
                        return table;
                    }else {
                        if(jQuery.type( value )==="number"){
                            var datarecord = getOneByIdRelaboralInArray(arrPersonal,value);
                            var ci = datarecord.ci;
                            var expd = datarecord.expd;
                            var imgurl = '/images/personal/'+ci+'.jpg';
                            if(!ImageExist(imgurl))imgurl = '/images/perfil-profesional.jpg';
                            var cargo = datarecord.cargo;
                            var fechas = datarecord.fecha_ini;
                            if(datarecord.fecha_fin!=null){
                                fechas = "Fechas: "+fechas + " AL "+datarecord.fecha_fin;
                            }else fechas = "Fecha Inicio: "+fechas;
                            var img = '<img height="70" width="70" src="' + imgurl + '"/>';
                            $("#tbl_"+datarecord.id_relaboral).remove();
                            var fechaIni = datarecord.fecha_incor;
                            var fechaFin = datarecord.fecha_fin;
                            if(datarecord.fecha_baja!="")fechaFin = datarecord.fecha_baja;
                            var table = '<table id="tbl_'+datarecord.id_relaboral+'" data-agrupador="'+datarecord.agrupador+'" data-nombres="'+datarecord.nombres+'" data-date-min="'+fechaIni+'" data-date-max="'+fechaFin+'" style="min-width: 130px;"><tr><td style="width: 80px;" rowspan="4">' + img + '</td><td>Nombres: ' + datarecord.nombres + '</td></tr><tr><td>CI: '+ci+' '+expd+'</td></tr><tr><td>Cargo: '+cargo+'</td></tr><tr><td>'+fechas+'<input type="hidden" id="hdn_'+datarecord.id_relaboral+'" value="'+datarecord.agrupador+'"></td></tr></table>';
                            return table;
                        }else{
                            if(jQuery.type( value )==="object"){
                                var datarecord = value;
                                var ci = datarecord.ci;
                                var expd = datarecord.expd;
                                var imgurl = '/images/personal/'+ci+'.jpg';
                                if(!ImageExist(imgurl))imgurl = '/images/perfil-profesional.jpg';
                                var cargo = datarecord.cargo;
                                var fechas = datarecord.fecha_ini;
                                if(datarecord.fecha_fin!=null){
                                    fechas = "Fechas: "+fechas + " AL "+datarecord.fecha_fin;
                                }else fechas = "Fecha Inicio: "+fechas;
                                var img = '<img height="70" width="70" src="' + imgurl + '"/>';
                                $("#tbl_"+datarecord.id_relaboral).remove();
                                var fechaIni = datarecord.fecha_incor;
                                var fechaFin = datarecord.fecha_fin;
                                if(datarecord.fecha_baja!="")fechaFin = datarecord.fecha_baja;
                                var table = '<table id="tbl_'+datarecord.id_relaboral+'" data-agrupador="'+datarecord.agrupador+'" data-nombres="'+datarecord.nombres+'" data-date-min="'+fechaIni+'" data-date-max="'+fechaFin+'" style="min-width: 130px;"><tr><td style="width: 80px;" rowspan="4">' + img + '</td><td>Nombres: ' + datarecord.nombres + '</td></tr><tr><td>CI: '+ci+' '+expd+'</td></tr><tr><td>Cargo: '+cargo+'</td></tr><tr><td>'+fechas+'<input type="hidden" id="hdn_'+datarecord.id_relaboral+'" value="'+datarecord.agrupador+'"></td></tr></table>';
                                return table;
                            }
                        }
                    }
            },
            ready:function(){
                var itemsB = $("#lstBox"+sufijo+"B").jqxListBox('getItems');
                $("#spanContadorLstBox"+sufijo+"B").text(itemsB.length);
            }
        });
        $("#lstBox"+sufijo+"A,#lstBox"+sufijo+"B").off();
        $("#lstBox"+sufijo+"A,#lstBox"+sufijo+"B").on("dragEnd",function(){
            var itemsA = $("#lstBox"+sufijo+"A").jqxListBox('getItems');
            var itemsB = $("#lstBox"+sufijo+"B").jqxListBox('getItems');
            $("#spanContadorLstBox"+sufijo+"A").text(itemsA.length);
            $("#spanContadorLstBox"+sufijo+"B").text(itemsB.length);
        });
        $("#clearFilter"+sufijo+"A").jqxButton();
        $("#clearFilter"+sufijo+"A").click(function () {
            $("#lstBox"+sufijo+"A").jqxListBox('clearFilter');
        });
        $("#clearFilter"+sufijo+"B").jqxButton();
        $("#clearFilter"+sufijo+"B").click(function () {
            $("#lstBox"+sufijo+"B").jqxListBox('clearFilter');
        });
    }
}
/**
 * Función para verificar la existencia de una imagen
 * @param url
 * @returns {boolean}
 * @constructor
 */
function ImageExist(url)
{
    var img = new Image();
    img.src = url;
    return img.height != 0;
}
/**
 * Función para validar los datos del formulario de nuevo registro de asignación de perfil laboral.
 * @returns {boolean} True: La validación fue correcta; False: La validación anuncia que hay errores en el formulario.
 */
function validaFormularioPorNuevoRegistroAsignacionPerfilLaboral(accion){
    var ok = true;
    var msje = "";
    var enfoque = null;
    var sufijo = "New";
    if(accion==2)sufijo = "Edit";
    $(".msjs-alert").hide();
    var idPerfilLaboral = $("#hdnIdPerfilLaboral"+sufijo).val();
    limpiarMensajesErrorPorValidacionNuevoRegistroAsignacionPerfilLaboral(accion);
    var idUbicacion = $("#lstUbicaciones"+sufijo).val();
    var idEstacion = 0;
    var ctrlEstacion = $("#lstUbicaciones"+sufijo+" option:selected").data("cant-nodos-hijos");
    var fechaIni = $("#txtFechaIni"+sufijo).val();
    var fechaFin = $("#txtFechaFin"+sufijo).val();
    if(idUbicacion==null||idUbicacion==''||idUbicacion==0){
        ok = false;
        var msje = "Debe seleccionar la ubicaci&oacute;n necesariamente.";
        $("#divUbicaciones"+sufijo).addClass("has-error");
        $("#helpErrorUbicaciones"+sufijo).html(msje);
        if (enfoque == null)enfoque = $("#lstUbicaciones"+sufijo);
    }else{
        if(ctrlEstacion>0){
            idEstacion = $("#lstEstaciones"+sufijo).val();
            idUbicacion = idEstacion;
            if(idEstacion==null||idEstacion==''||idEstacion==0){
                ok = false;
                var msje = "Debe seleccionar la estaci&oacute;n necesariamente.";
                $("#divEstaciones"+sufijo).addClass("has-error");
                $("#helpErrorEstaciones"+sufijo).html(msje);
                if (enfoque == null)enfoque = $("#lstEstaciones"+sufijo);
            }
        }
    }
    if(fechaIni==null||fechaIni==""){
        ok=false;
        msje = "Debe introducir la fecha de inicio.";
        $("#divFechaIni"+sufijo).addClass("has-error");
        $("#helpErrorFechaIni"+sufijo).html(msje);
        if(enfoque==null)enfoque =$("#txtFechaIni"+sufijo);
    }
    if(fechaFin==""||fechaFin==null){
        ok=false;
        msje = "Debe introducir la fecha de finalizaci&oacute;n.";
        $("#divFechaFin"+sufijo).addClass("has-error");
        $("#helpErrorFechaFin"+sufijo).html(msje);
        if(enfoque==null)enfoque =$("#txtFechaFin"+sufijo);
    }
    if(ok){
        var sep='-';
        if(procesaTextoAFecha(fechaFin,sep)<procesaTextoAFecha(fechaIni,sep)){
            ok=false;
            msje = "La fecha de inicio no puede ser superior a la fecha de finalizaci&oacute;n.";
            $("#divFechaIni"+sufijo).addClass("has-error");
            $("#helpErrorFechaIni"+sufijo).html(msje);
            $("#divFechaFin"+sufijo).show();
            $("#divFechaFin"+sufijo).addClass("has-error");
            $("#helpErrorFechaFin"+sufijo).html(msje);
            if(enfoque==null)enfoque =$("#txtFechaFin"+sufijo);
        }
    }
    /**
     * Se controla que se tenga al menos un registro en lista de seleccionados
     * @type {*|jQuery}
     */
    var itemsB = $("#lstBox"+sufijo+"B").jqxListBox('getItems');
    if (itemsB.length > 0) {
        $.each(itemsB,function(key,val){
            var idRelaboral = val.value;;
            var idRelaboralPerfil = 0;
            if(jQuery.type( val.value )==="object"){
                idRelaboral = idRelaboral.id_relaboral;
            }
            if($("#tbl_"+idRelaboral).data("agrupador")>0){
                idRelaboralPerfil=$("#tbl_"+idRelaboral).data("agrupador");
            }
            var nombres = $("#tbl_"+idRelaboral).data("nombres");
            if(nombres==undefined){
                nombres = " una persona."
            }
            var ok2 = verificaSobrePosicionDePerfiles(idRelaboralPerfil,idRelaboral,idPerfilLaboral,idUbicacion,fechaIni,fechaFin);
            if(ok2){
                ok=false;
                var msje = "Existe ya un registro de perfil con sobreposici&oacute;n con el perfil que intenta registrar para "+nombres+".";
                $("#divMsjePorError").html("");
                $("#divMsjePorError").append(msje);
                $("#divMsjeNotificacionError").jqxNotification("open");
            }
            var fechaMin = $("#tbl_"+idRelaboral).data("date-min");
            var fechaMax = $("#tbl_"+idRelaboral).data("date-max");
            var sep='-';
            if(procesaTextoAFecha(fechaMin,sep)>procesaTextoAFecha(fechaIni,sep)){
                ok=false;
                var msje = "La fechas establecidas para la asignaci&oacute;n: ("+fechaIni+" al "+fechaFin+"), tienen conflicto con las fechas de relaci&oacute;n laboral para "+nombres+" cuyas fechas v&aacute;lidas deben estar entre: ("+fechaMin+" al "+fechaMax+").";
                $("#divMsjePorError").html("");
                $("#divMsjePorError").append(msje);
                $("#divMsjeNotificacionError").jqxNotification("open");
            }
            if(procesaTextoAFecha(fechaMax,sep)<procesaTextoAFecha(fechaFin,sep)){
                ok=false;
                var msje = "La fechas establecidas para la asignaci&oacute;n: ("+fechaIni+" al "+fechaFin+"), tienen conflicto con las fechas de relaci&oacute;n laboral para "+nombres+" cuyas fechas v&aacute;lidas deben estar entre: ("+fechaMin+" al "+fechaMax+").";
                $("#divMsjePorError").html("");
                $("#divMsjePorError").append(msje);
                $("#divMsjeNotificacionError").jqxNotification("open");
            }
        });
    }
    if(enfoque!=null){
        enfoque.focus();
    }
    return ok;
}
/**
 * Función para la limpieza de los mensajes de error debido a la validación del formulario para nuevo registro de asignación de perfil laboral.
 */
function limpiarMensajesErrorPorValidacionNuevoRegistroAsignacionPerfilLaboral(accion){
    var sufijo = "New";
    if(accion==2)sufijo="Edit";
    $("#divUbicaciones"+sufijo).removeClass("has-error");
    $("#helpErrorUbicaciones"+sufijo).html("");

    $("#divEstaciones"+sufijo).removeClass("has-error");
    $("#helpErrorEstaciones"+sufijo).html("");

    $("#divFechaIni"+sufijo).removeClass("has-error");
    $("#helpErrorFechaIni"+sufijo).html("");

    $("#divFechaFin"+sufijo).removeClass("has-error");
    $("#helpErrorFechaFin"+sufijo).html("");
}
/**
 * Función para la obtención de los datos correspondientes al registro de una relación laboral.
 * @param idRelaboral
 */
function getOneByIdRelaboral(idRelaboral){
    var arrPersonal = [];
    if(idRelaboral>0){
     var source = [];
     $.ajax({
         url: '/relaborales/getone/',
         type: "POST",
         datatype: 'json',
         async: false,
         cache: false,
         data:{id:idRelaboral},
         success: function (data) {
             var res = jQuery.parseJSON(data);
             if(res.length>0){
                 arrPersonal = res[0];
             }
         }
     });
     return arrPersonal;
 }
}
/**
 * Función para obtener el registro correspondiente a una relación laboral identificada por idRelaboral.
 * Esta función se usa a objeto de no hacer consultar repetitivas a la Base de Datos.
 * @param arrPersonal
 * @param idRelaboral
 */
function getOneByIdRelaboralInArray(arrPersonal,idRelaboral){
    var persona = [];
    if(arrPersonal.length>0&&idRelaboral>0){
        $.each(arrPersonal,function(clave,valor){
            if(idRelaboral==valor.id_relaboral){
                persona.push(valor);
                return false;
            }
        });
    }
    if(persona.length>0)return persona[0];
    else return persona;
}
/**
 * Función para el registro de una nueva asignación de perfil laboral de acuerdo a los elementos dentro del formulario de manera grupal.
 * @returns {boolean}
 */
function guardaFormularioRegistroAsignacionGroupPerfilLaboral(accion,idPerfilLaboral){
    var ok = true;
    var okk = true;
    var msje = "";
    var sufijo="New";
    if(accion==2)sufijo = "Edit";
    var idUbicacion = $("#lstUbicaciones"+sufijo).val();
    var idEstacion = 0;
    var ctrlEstacion = $("#lstUbicaciones"+sufijo+" option:selected").data("cant-nodos-hijos");
    if(ctrlEstacion>0){
        idEstacion = $("#lstEstaciones"+sufijo).val();
    }
    var fechaIni = $("#txtFechaIni"+sufijo).val();
    var fechaFin = $("#txtFechaFin"+sufijo).val();
    var observacion = '';
    if(idPerfilLaboral>0){
        var items = $("#lstBox"+sufijo+"B").jqxListBox('getItems');
        if (items.length > 0) {
            $.each(items,function(key,val){
                var idRelaboral = val.value;
                var idRelaboralperfil = 0;
                if(jQuery.type( val.value )==="number"){

                }else{
                    idRelaboral = idRelaboral.id_relaboral;
                }
                if($("#tbl_"+idRelaboral).data("agrupador")>0){

                    idRelaboralperfil=$("#tbl_"+idRelaboral).data("agrupador");
                }
                okk = guardaRegistroAsignacionPerfilLaboral(2,idRelaboralperfil,idRelaboral,idPerfilLaboral,idUbicacion,idEstacion,fechaIni,fechaFin,observacion);
                if(!okk)ok=false;
            });
        }
        /**
         * Si el almacenamiento se produce tras una edición es necesario conocer que personas fueron descartadas del perfil.
         */
        if(accion==2){
            var ok3 = true;
            var itemsB = $("#lstBox"+sufijo+"A").jqxListBox('getItems');
            if (itemsB.length > 0) {
                $.each(itemsB,function(key,val){
                    var idRelaboral = val.value;
                    var idRelaboralperfil = 0;
                    var nombres = "";
                    if(jQuery.type( val.value )==="object"){
                        idRelaboral = idRelaboral.id_relaboral;
                        //nombres = ">"+idRelaboral.nombres;
                    }else{
                        //nombres = ">"+val.label;
                    }
                    //alert(idRelaboral+" (diferencias):"+$("#hdn_"+idRelaboral).val()+" vrs. "+$("#tbl_"+idRelaboral).data("agrupador")+" para "+nombres);
                    if($("#hdn_"+idRelaboral).val()>0){
                        idRelaboralperfil=$("#tbl_"+idRelaboral).data("agrupador");
                    }

                    if(idRelaboralperfil>0){
                        ok3 = bajaRegistroAsignacionPerfilLaboral(idRelaboralperfil);
                    }
                    if(!ok3)ok=false;
                });
            }
        }
    }else ok=false;
    return ok;
}
/**
 * Función para el registro individual de la asignación de perfil laboral para un registro de relación laboral.
 * @param opcion
 * @param idRelaboralPerfil
 * @param idRelaboral
 * @param idPerfilLaboral
 * @param idUbicacionEntrada
 * @param idUbicacionSalida
 * @param fechaIni
 * @param fechaFin
 * @param tipoMarcacionEntrada
 * @param tipoMarcacionSalida
 * @param observacion
 */
function guardaRegistroAsignacionPerfilLaboral(opcion,idRelaboralPerfil,idRelaboral,idPerfilLaboral,idUbicacionEntrada,idEstacionEntrada,idUbicacionSalida,idEstacionSalida,fechaIni,fechaFin,tipoMarcacionEntrada,tipoMarcacionSalida,observacion){
    var ok = false;
    if(idEstacionEntrada>0){
        idUbicacionEntrada = idEstacionEntrada;
    }
    if(idEstacionSalida>0){
        idUbicacionSalida = idEstacionSalida;
    }
    if(idRelaboral>0&&idPerfilLaboral>0&&idUbicacionEntrada>0&&idUbicacionSalida>0&&fechaIni!=''&&fechaFin!=''){
        $.ajax({
            url: '/relaboralesperfiles/save/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {
                id: idRelaboralPerfil,
                id_relaboral:idRelaboral,
                id_perfillaboral:idPerfilLaboral,
                id_ubicacion_entrada:idUbicacionEntrada,
                id_ubicacion_salida:idUbicacionSalida,
                fecha_ini:fechaIni,
                fecha_fin:fechaFin,
                tipo_marcacion_entrada:tipoMarcacionEntrada,
                tipo_marcacion_salida:tipoMarcacionSalida,
                observacion:observacion,
                opcion:opcion
            },
            success: function (data) {  //alert(data);
                var res = jQuery.parseJSON(data);
                /**
                 * Si se ha realizado correctamente el registro de la asignación de un perfil laboral para una determinada relación laboral.
                 */
                if (res.result == 1) {
                    ok = true;
                }else{
                    $("#divMsjePorError").html("");
                    $("#divMsjePorError").append(res.msj);
                    $("#divMsjeNotificacionError").jqxNotification("open");
                }
            }
        });
    }
    return ok;
}
/**
 * Función para dar de baja a un registro asignado a un determinado perfil laboral.
 * @param idRelaboralperfil
 */
function bajaRegistroAsignacionPerfilLaboral(idRelaboralperfil){
    var ok = false;
    if(idRelaboralperfil>0){
        $.ajax({
            url: '/relaboralesperfiles/down/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {
                id: idRelaboralperfil
            },
            success: function (data) {  //alert(data);
                var res = jQuery.parseJSON(data);
                /**
                 * Si se ha realizado correctamente el registro de la asignación de un perfil laboral para una determinada relación laboral.
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
 * Función para la verificación de la existencia de sobreposición de un perfil laboral con otro existente.
 * @param idRelaboralPerfil
 * @param idRelaboral
 * @param idPerfilLaboral
 * @param idUbicacion
 * @param fechaIni
 * @param fechaFin
 * @return boolean True: Existe sobreposición, False: No existe sobreposición
 */
function verificaSobrePosicionDePerfiles(idRelaboralPerfil,idRelaboral,idPerfilLaboral,idUbicacion,fechaIni,fechaFin){
    var ok = false;
    if(idRelaboral>0&&idPerfilLaboral>0&&idUbicacion>0&&fechaIni!=''&&fechaFin!=''){
        $.ajax({
            url: '/relaboralesperfiles/verifyoverlaydates/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {
                id: idRelaboralPerfil,
                id_relaboral:idRelaboral,
                id_perfillaboral:idPerfilLaboral,
                id_ubicacion:idUbicacion,
                fecha_ini:fechaIni,
                fecha_fin:fechaFin
            },
            success: function (data) {  //alert(data);
                var res = jQuery.parseJSON(data);
                if (res.result == 1) {
                    ok = true;
                }
            }
        });
    }
    return ok;
}