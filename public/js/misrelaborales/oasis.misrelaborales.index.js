/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  09-09-2015
 */
$().ready(function () {
    /**
     * Definición de la ventana donde se ve el historial de registros de relación laboral
     */
    $('#HistorialSplitter').jqxSplitter({
        theme: 'oasis',
        width: '100%',
        height: 480,
        panels: [{size: '8%'}, {size: '92%'}]
    });
    cargaDatosRelaboral($("#hdnIdRelaboralUsuario").val(),$("#hdnIdPersonaUsuario").val(),$("#hdnNombresUsuario").val(),$("#hdnCiUsuario").val());

    $("#btnImprimirHistorial").on("click",function(){
        var opciones = {mode:"popup",popClose: false};
        $("#HistorialSplitter").printArea(opciones);
    });
    $("#divMsjeNotificacionError").jqxNotification({
        width: '100%', position: "bottom-right", opacity: 0.9,
        autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 7000, template: "error"
    });

    $("#divMsjeNotificacionWarning").jqxNotification({
        width: '100%', position: "bottom-right", opacity: 0.9,
        autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 7000, template: "warning"
    });
    $("#divMsjeNotificacionSuccess").jqxNotification({
        width: '100%', position: "bottom-right", opacity: 0.9,
        autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 7000, template: "success"
    });
    $(document).keypress(OperaEvento);
    $(document).keyup(OperaEvento);
});

var rownumberrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
    var nro = row + 1;
    return "<div align='center'>" + nro + "</div>";
}
/*
 * Función para controlar la ejecución del evento esc con el teclado.
 */
function OperaEvento(evento) {

}
/**
 *
 * Función para la obtención de la ruta en la cual reside la fotografía correspondiente de la persona.
 * @param numDocumento Número de documento, comunmente el número de CI.
 * @param numComplemento Número de complemento.
 * @returns {string} Ruta de ubicación de la fotografía a mostrarse.
 */
function obtenerRutaFoto(numDocumento, numComplemento) {
    var resultado = "/images/perfil-profesional.jpg";
    if (numDocumento != "") {
        $.ajax({
            url: '/relaborales/obtenerrutafoto/',
            type: "POST",
            datatype: 'json',
            async: false,
            cache: false,
            data: {ci: numDocumento, num_complemento: numComplemento},
            success: function (data) {
                var res = jQuery.parseJSON(data);
                if (res.result == 1) {
                    resultado = res.ruta;
                }
            }, //mostramos el error
            error: function () {
                alert('Se ha producido un error Inesperado');
            }
        });
    }
    return resultado;
}
/**
 * Función para obtener la fecha de este día
 * @param separador
 * @returns {*}
 * @author JLM
 */
function fechaHoy(separador, format) {
    if (separador == '')separador = "-";
    var fullDate = new Date()
    var dia = fullDate.getDate().toString();
    var mes = (fullDate.getMonth() + 1).toString();
    var twoDigitDay = (dia.length === 1 ) ? '0' + dia : dia;
    var twoDigitMonth = (mes.length === 1 ) ? '0' + mes : mes;
    if (format == "dd-mm-yyyy")
        var currentDate = twoDigitDay + separador + twoDigitMonth + separador + fullDate.getFullYear();
    else if (format == "mm-dd-yyyy") {
        var currentDate = twoDigitMonth + separador + twoDigitDay + separador + fullDate.getFullYear();
    } else {
        var currentDate = fullDate;
    }
    return currentDate;
}
/**
 * Función anónima para la aplicación de clases a celdas en particular dentro de las grillas.
 * @param row
 * @param columnfield
 * @param value
 * @returns {string}
 * @author JLM
 */
var cellclass = function (row, columnfield, value) {
    if (value == 'ACTIVO') {
        return 'verde';
    }
    else if (value == 'EN PROCESO') {
        return 'amarillo';
    }
    else if (value == 'PASIVO') {
        return 'rojo';
    }
    else return ''
}
/**
 * Función para la carga de datos a objeto de ver el historial de relaciones laborales de la persona.
 * @param id_relaboral
 */
function cargaDatosRelaboral(id_relaboral,id_persona,nombres,ci){
    /*
     *  La vista del historial se habilita para personas que tengan al menos un registro de relación sin importar su estado, ACTIVO, EN PROCESO o PASIVO.
     *  De esta vista se excluyen a personas que no tengan ningún registro de relación laboral.
     */
    $(".msjs-alert").hide();
    $("#hdnIdPersonaHistorial").val(id_persona);

        /*$('#jqxTabs').jqxTabs('enableAt', 0);
        $('#jqxTabs').jqxTabs('disableAt', 1);
        $('#jqxTabs').jqxTabs('disableAt', 2);
        $('#jqxTabs').jqxTabs('disableAt', 3);
        $('#jqxTabs').jqxTabs('disableAt', 4);
        $('#jqxTabs').jqxTabs('enableAt', 5);*/
        /**
         * Trasladamos el item seleccionado al que corresponde, el de vistas.
         */
        /*$('#jqxTabs').jqxTabs({selectedItem: 5});*/
        // Create jqxTabs.
        $('#tabFichaPersonal').jqxTabs({
            theme: 'oasis',
            width: '100%',
            height: '100%',
            position: 'top'
        });
        $('#tabFichaPersonal').jqxTabs({selectedItem: 0});
        $("#ddNombres").html(nombres);
        var rutaImagen = obtenerRutaFoto(ci, "");
        $("#imgFotoPerfilContactoPer").attr("src", rutaImagen);
        $("#imgFotoPerfilContactoInst").attr("src", rutaImagen);
        $("#imgFotoPerfil").attr("src", rutaImagen);
        cargarPersonasContactos(id_persona);
        $("#hdnIdRelaboralVista").val(id_relaboral);
        $("#hdnSwPrimeraVistaHistorial").val(0);
        cargarGestionesHistorialRelaboral(id_persona);
        /**
         * Para la primera cargada el valor para el parámetro gestión es 0 debido a que mostrará el historial completo.
         * Para el valor del parámetro sw el valor es 1 porque se desea que se limpie lo que haya y se cargue algo nuevo
         */
        cargarHistorialRelacionLaboral(id_persona, 0, 1);
        $("#divContent_" + id_relaboral).focus().select();

}
