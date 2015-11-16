/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  02-02-2015
 */
function iniciaGrillaAsignacionPerfil(){
    var cart = (function ($) {
        theme = $.jqx.theme;
        var productsOffset = 5,
            products = {
                'Retro Rock T-shirt': {
                    pic: 'black-retro-rock-band-guitar-controller.png',
                    price: 15
                },
                'Lucky T-shirt': {
                    pic: 'bright-green-gettin-lucky-in-kentucky.png',
                    price: 18
                },
                'Loading T-shirt': {
                    pic: 'brown-loading-bar-computer-geek.png',
                    price: 25
                },
                'Cool Story T-shirt': {
                    pic: 'cool-story-bro.png',
                    price: 20
                },
                'The beard T-shirt': {
                    pic: 'fear-the-beard.png',
                    price: 17
                },
                'Don\'t care T-shirt': {
                    pic: 'honey-badger-don-t-care.png',
                    price: 19
                },
                'Guitar T-shirt': {
                    pic: 'scott-pilgrim-red-rock-band.png',
                    price: 24
                },
                'Dodgers T-shirt': {
                    pic: '2-sided-dodgers-bankrupt-t-shirt-ash.png',
                    price: 21
                },
                'Misfits T-shirt': {
                    pic: 'misfits-sf-giants-white.png',
                    price: 21
                },
                'sGuitar T-shirt': {
                    pic: 'scott-pilgrim-red-rock-band.png',
                    price: 24
                },
                'eDodgers T-shirt': {
                    pic: '2-sided-dodgers-bankrupt-t-shirt-ash.png',
                    price: 21
                },
                'eMisfits T-shirt': {
                    pic: 'misfits-sf-giants-white.png',
                    price: 21
                }
            },
            theme, onCart = false, cartItems = [], totalPrice = 0;
        function render() {
            productsRendering();
            gridRendering();
        };
        function addClasses() {
            $('.draggable-demo-catalog').addClass('jqx-scrollbar-state-normal-' + theme);
            $('.draggable-demo-title').addClass('jqx-expander-header-' + theme);
            $('.draggable-demo-title').addClass('jqx-expander-header-expanded-' + theme);
            $('.draggable-demo-total').addClass('jqx-expander-header-' + theme).addClass('jqx-expander-header-expanded-' + theme);
            if (theme === 'shinyblack') {
                $('.draggable-demo-shop').css('background-color', '#555');
                $('.draggable-demo-product').css('background-color', '#999');
            }
        };
        function productsRendering() {
            var catalog = $('#catalog'),
                imageContainer = $('</div>'),
                image, product, left = 0, top = 0, counter = 0;
            for (var name in products) {
                product = products[name];
                image = createProduct(name, product);
                image.appendTo(catalog);
                if (counter !== 0 && counter % 3 === 0) {
                    top += 147; // image.outerHeight() + productsOffset;
                    left = 0;
                }
                image.css({
                    left: left,
                    top: top
                });
                left += 127; // image.outerWidth() + productsOffset;
                counter += 1;
            }
            $('.draggable-demo-product').jqxDragDrop({ dropTarget: $('#cart'), revert: false });
            //$(this).//
        };
        function createProduct(name, product) {
            return $('<div class="draggable-demo-product jqx-rc-all">' +
            '<div class="jqx-rc-t draggable-demo-product-header jqx-widget-header-' + theme + ' jqx-fill-state-normal-' + theme + '">' +
            '<div class="draggable-demo-product-header-label"> ' + name + '</div></div>' +
            '<div class="jqx-fill-state-normal-' + theme + ' draggable-demo-product-price">Price: <strong>$' + product.price + '</strong></div>' +
            '<img src="../../images/t-shirts/' + product.pic + '" alt='
            + name + '" class="jqx-rc-b" />' +
            '</div>');
        };
        function gridRendering() {
            $("#jqxgridseleccionados").jqxGrid(
                {
                    height: 335,
                    width: 230,

                    keyboardnavigation: false,
                    selectionmode: 'none',
                    columns: [
                        { text: 'Item', dataField: 'name', width: 120 },
                        { text: 'Count', dataField: 'count', width: 50 },
                        { text: 'Remove', dataField: 'remove', width: 60 }
                    ]
                });
            $("#jqxgridseleccionados").bind('cellclick', function (event) {
                var index = event.args.rowindex;
                if (event.args.datafield == 'remove') {
                    var item = cartItems[index];
                    if (item.count > 1) {
                        item.count -= 1;
                        updateGridRow(index, item);
                    }
                    else {
                        cartItems.splice(index, 1);
                        removeGridRow(index);
                    }
                    updatePrice(-item.price);
                }
            });
        };
        function init() {
            //var theme = prepareSimulator("grid");
            //theme = getDemoTheme();
            theme = prepareSimulator("grid");
            render();
            addClasses();
            addEventListeners();
        };
        function addItem(item) {
            var index = getItemIndex(item.name);
            if (index >= 0) {
                cartItems[index].count += 1;
                updateGridRow(index, cartItems[index]);
            } else {
                var id = cartItems.length,
                    item = {
                        name: item.name,
                        count: 1,
                        price: item.price,
                        index: id,
                        remove: '<div style="text-align: center; cursor: pointer; width: 53px;"' +
                        'id="draggable-demo-row-' + id + '">X</div>'
                    };
                cartItems.push(item);
                addGridRow(item);
            }
            updatePrice(item.price);
        };
        function updatePrice(price) {
            totalPrice += price;
            $('#total').html('$ ' + totalPrice);
        };
        function addGridRow(row) {
            $("#jqxgridseleccionados").jqxGrid('addrow', null, row);
        };
        function updateGridRow(id, row) {
            var rowID = $("#jqxgridseleccionados").jqxGrid('getrowid', id);
            $("#jqxgridseleccionados").jqxGrid('updaterow', rowID, row);
        };
        function removeGridRow(id) {
            var rowID = $("#jqxgridseleccionados").jqxGrid('getrowid', id);
            $("#jqxgridseleccionados").jqxGrid('deleterow', rowID);
        };
        function getItemIndex(name) {
            for (var i = 0; i < cartItems.length; i += 1) {
                if (cartItems[i].name === name) {
                    return i;
                }
            }
            return -1;
        };
        function toArray(obj) {
            var item, array = [], counter = 1;
            for (var key in obj) {
                item = {};
                item = {
                    name: key,
                    price: obj[key].count,
                    count: obj[key].price,
                    number: counter
                }
                array.push(item);
                counter += 1;
            }
            return array;
        };
        function addEventListeners() {
            $('.draggable-demo-product').mouseenter(function () {
                $(this).children('.draggable-demo-product-price').fadeTo(100, 0.9);
            });
            $('.draggable-demo-product').mouseleave(function () {
                $(this).children('.draggable-demo-product-price').fadeTo(100, 0);
            });
            $('.draggable-demo-product').bind('dropTargetEnter', function (event) {
                //$(event.args.target).css('border', '2px solid #000');
                onCart = true;
                $(this).jqxDragDrop('dropAction', 'none');
            });
            $('.draggable-demo-product').bind('dropTargetLeave', function (event) {
                //$(event.args.target).css('border', '2px solid #aaa');
                onCart = false;
                $(this).jqxDragDrop('dropAction', 'default');
            });
            $('.draggable-demo-product').bind('dragEnd', function (event) {
                //$('#cart').css('border', '2px dashed #aaa');
                if (onCart) {
                    addItem({ price: event.args.price, name: event.args.name });
                    onCart = false;
                }
                /*añadido para eliminar de la lista de disponibles a las personas*/
                $(this).remove();
            });
            $('.draggable-demo-product').bind('dragStart', function (event) {
                var tshirt = $(this).find('.draggable-demo-product-header').text(),
                    price = $(this).find('.draggable-demo-product-price').text().replace('Price: $', '');
                //$('#cart').css('border', '2px solid #aaa');
                price = parseInt(price, 10);
                $(this).jqxDragDrop('data', {
                    price: price,
                    name: tshirt
                });
                //$(this).remove();
            });
        };
        return {
            init: init
        }
    } ($));
    $(document).ready(function () {
        cart.init();
    });
}
/**
 * Función para el listado de las personas seleccionadas
 */
function definirGrillaParaListaRelaborales() {
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
            {name: 'finpartida', type: 'string'},
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
        ],
        url: '/relaborales/list',
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    cargarRegistrosDeRelacionesLaborales();
    function cargarRegistrosDeRelacionesLaborales() {
        var theme = prepareSimulator("grid");
        $("#jqxgridseleccionados").jqxGrid(
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
                    container.append("<button id='moverowbutton' class='btn btn-sm btn-primary' type='button'><i class='fa fa-tag fa-2x text-info' title='Movilidad de Personal.'/></i></button>");
                    container.append("<button id='viewrowbutton' class='btn btn-sm btn-primary' type='button'><i class='gi gi-nameplate_alt fa-2x text-info' title='Vista Historial.'/></i></button>");

                    $("#addrowbutton").jqxButton();
                    /*$("#approverowbutton").jqxButton();*/
                    $("#updaterowbutton").jqxButton();
                    $("#deleterowbutton").jqxButton();
                    $("#moverowbutton").jqxButton();
                    $("#viewrowbutton").jqxButton();


                    /* Registrar nueva relación laboral.*/
                    $("#addrowbutton").on('click', function () {
                        var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                /**
                                 * Para el caso cuando la persona no tenga ninguna relación laboral vigente con la entidad se da la opción de registro de nueva relación laboral.
                                 */
                                if (dataRecord.tiene_contrato_vigente == 0 || dataRecord.tiene_contrato_vigente == -1) {
                                    $('#btnBuscarCargo').click();
                                    $('#jqxTabs').jqxTabs('enableAt', 1);
                                    $('#jqxTabs').jqxTabs('disableAt', 2);
                                    $('#jqxTabs').jqxTabs('disableAt', 3);
                                    $('#jqxTabs').jqxTabs('disableAt', 4);
                                    $('#jqxTabs').jqxTabs('disableAt', 5);
                                    /**
                                     * Trasladamos el item seleccionado al que corresponde, el de nuevo registro.
                                     */
                                    $('#jqxTabs').jqxTabs({selectedItem: 1});

                                    $("#hdnIdRelaboralEditar").val(dataRecord.id_relaboral);
                                    $("#hdnIdPersonaSeleccionada").val(dataRecord.id_persona);
                                    $("#NombreParaNuevoRegistro").html(dataRecord.nombres);
                                    $("#CorreoPersonal").html("");
                                    $("#hdnIdCondicionNuevaSeleccionada").val(0)
                                    $("#divAreas").hide();
                                    $("#divItems").hide();
                                    $("#divFechasFin").hide();
                                    $("#divNumContratos").hide();
                                    $(".msjs-alert").hide();
                                    $("#divProcesos").hide();
                                    limpiarMensajesErrorPorValidacionNuevoRegistro();
                                    var rutaImagen = obtenerRutaFoto(dataRecord.ci, dataRecord.num_complemento);
                                    $("#imgFotoPerfilNuevo").attr("src", rutaImagen);
                                } else {
                                    var msje = "La persona seleccionada tiene actualmente un registro en estado " + dataRecord.estado_descripcion + " de relaci&oacute;n laboral por lo que no se le puede asignar otro.";
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
                    /*Aprobar registro.*/
                    /*$("#approverowbutton").on('click', function () {
                     var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                     if (selectedrowindex >= 0) {
                     var dataRecord = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex);
                     if (dataRecord != undefined) {
                     */
                    /*
                     * Para el caso cuando la persona tenga un registro de relación laboral en estado EN PROCESO.
                     */
                    /*
                     if (dataRecord.estado == 2) {
                     if(confirm("¿Esta seguro de aprobar este registro?")){
                     aprobarRegistroRelabolar(dataRecord.id_relaboral);
                     }
                     }else {
                     var msje = "Debe seleccionar un registro con estado EN PROCESO para posibilitar la aprobaci&oacute;n del registro";
                     $("#divMsjePorError").html("");
                     $("#divMsjePorError").append(msje);
                     $("#divMsjeNotificacionError").jqxNotification("open");
                     }
                     }
                     }else{
                     var msje = "Debe seleccionar un registro necesariamente.";
                     $("#divMsjePorError").html("");
                     $("#divMsjePorError").append(msje);
                     $("#divMsjeNotificacionError").jqxNotification("open");
                     }
                     });*/
                    /* Modificar registro.*/
                    $("#updaterowbutton").on('click', function () {
                        var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                var id_relaboral = dataRecord.id_relaboral;
                                /**
                                 * Para el caso cuando la persona tenga un registro de relación laboral en estado EN PROCESO o ACTIVO.
                                 */
                                if (dataRecord.estado!=null&&dataRecord.estado >= 0) {//Modificado eventualmente
                                    $('#jqxTabs').jqxTabs('enableAt', 0);
                                    $('#jqxTabs').jqxTabs('disableAt', 1);
                                    $('#jqxTabs').jqxTabs('enableAt', 2);
                                    $('#jqxTabs').jqxTabs('disableAt', 3);
                                    $('#jqxTabs').jqxTabs('disableAt', 4);
                                    $('#jqxTabs').jqxTabs('disableAt', 5);
                                    /**
                                     * Trasladamos el item seleccionado al que corresponde, el de modificación
                                     */
                                    $('#jqxTabs').jqxTabs({selectedItem: 2});

                                    $("#hdnIdRelaboralEditar").val(id_relaboral);
                                    $("#hdnIdPersonaSeleccionadaEditar").val(dataRecord.id_persona);
                                    $("#NombreParaEditarRegistro").html(dataRecord.nombres);
                                    $("#hdnIdCondicionEditableSeleccionada").val(dataRecord.id_condicion);
                                    $("#hdnIdUbicacionEditar").val(dataRecord.id_ubicacion);
                                    $("#hdnIdProcesoEditar").val(dataRecord.id_procesocontratacion);
                                    $("#FechaIniEditar").jqxDateTimeInput({
                                        value: dataRecord.fecha_ini,
                                        enableBrowserBoundsDetection: false,
                                        height: 24,
                                        formatString: 'dd-MM-yyyy'
                                    });
                                    $("#FechaIncorEditar").jqxDateTimeInput({
                                        value: dataRecord.fecha_incor,
                                        enableBrowserBoundsDetection: false,
                                        height: 24,
                                        formatString: 'dd-MM-yyyy'
                                    });
                                    switch (dataRecord.tiene_item) {
                                        case 1:
                                            $("#divFechasFinEditar").hide();
                                            break;
                                        case 0:
                                            $("#FechaFinEditar").jqxDateTimeInput({
                                                value: dataRecord.fecha_fin,
                                                enableBrowserBoundsDetection: false,
                                                height: 24,
                                                formatString: 'dd-MM-yyyy'
                                            });
                                            break;
                                    }
                                    $("#hdnFechaFinEditar").val(dataRecord.fecha_fin);
                                    $("#txtNumContratoEditar").val(dataRecord.num_contrato);
                                    $("#divItemsEditar").hide();
                                    $("#divNumContratosEditar").hide();
                                    $(".msjs-alert").hide();
                                    $("#helpErrorUbicacionesEditar").html("");
                                    $("#helpErrorProcesosEditar").html("");
                                    $("#helpErrorCategoriasEditar").html("");
                                    $("#helpErrorFechasIniEditar").html("");
                                    $("#helpErrorFechasIncorEditar").html("");
                                    $("#helpErrorFechasFinEditar").html("");
                                    $("#divUbicacionesEditar").removeClass("has-error");
                                    $("#divProcesosEditar").removeClass("has-error");
                                    $("#divCategoriasEditar").removeClass("has-error");
                                    $("#divAreas").hide();
                                    $("#divFechasIniEditar").removeClass("has-error");
                                    $("#divFechasIncorEditar").removeClass("has-error");
                                    $("#divFechasFinEditar").removeClass("has-error");
                                    $("#tr_cargo_seleccionado_editar").html("");
                                    if (dataRecord.observacion != null)$("#txtObservacionEditar").text(dataRecord.observacion);
                                    else $("#txtObservacionEditar").text('');
                                    var rutaImagen = obtenerRutaFoto(dataRecord.ci, dataRecord.num_complemento);
                                    $("#imgFotoPerfilEditar").attr("src", rutaImagen);
                                    cargarProcesosParaEditar(dataRecord.id_condicion, dataRecord.id_procesocontratacion);
                                    var idUbicacionPrederminada = 0;
                                    if (dataRecord.id_ubicacion != null)idUbicacionPrederminada = dataRecord.id_ubicacion;
                                    cargarUbicacionesParaEditar(idUbicacionPrederminada);
                                    agregarCargoSeleccionadoEnGrillaParaEditar(dataRecord.id_cargo, dataRecord.cargo_codigo, dataRecord.id_finpartida, dataRecord.finpartida, dataRecord.cargo_resolucion_ministerial_id,dataRecord.cargo_resolucion_ministerial,dataRecord.id_condicion, dataRecord.condicion, dataRecord.id_organigrama, dataRecord.gerencia_administrativa, dataRecord.departamento_administrativo, dataRecord.id_area, dataRecord.nivelsalarial, dataRecord.cargo, dataRecord.sueldo,dataRecord.nivelsalarial_resolucion_id,dataRecord.nivelsalarial_resolucion);
                                } else {
                                    var msje = "Debe seleccionar un registro con estado EN PROCESO o ACTIVO para posibilitar la modificaci&oacute;n del registro";
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
                    $("#deleterowbutton").on('click', function () {
                        var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                var id_relaboral = dataRecord.id_relaboral;
                                /*
                                 *  Para dar de baja un registro, este debe estar inicialmente en estado ACTIVO
                                 */
                                if (dataRecord.estado == 1) {
                                    $('#jqxTabs').jqxTabs('enableAt', 0);
                                    $('#jqxTabs').jqxTabs('disableAt', 1);
                                    $('#jqxTabs').jqxTabs('disableAt', 2);
                                    $('#jqxTabs').jqxTabs('enableAt', 3);
                                    $('#jqxTabs').jqxTabs('disableAt', 4);
                                    $('#jqxTabs').jqxTabs('disableAt', 5);
                                    /**
                                     * Trasladamos el item seleccionado al que corresponde, el de bajas.
                                     */
                                    $('#jqxTabs').jqxTabs({selectedItem: 3});

                                    //alert(dataRecord.fecha_incor.toString());
                                    $("#hdnIdRelaboralBaja").val(id_relaboral);
                                    $("#NombreParaBajaRegistro").html(dataRecord.nombres);
                                    $("#hdnIdCondicionSeleccionadaBaja").val(dataRecord.id_condicion);
                                    $("#txtFechaIniBaja").jqxDateTimeInput({
                                        disabled: true,
                                        value: dataRecord.fecha_ini,
                                        enableBrowserBoundsDetection: true,
                                        height: 24,
                                        formatString: 'dd-MM-yyyy'
                                    });
                                    $("#txtFechaIncorBaja").jqxDateTimeInput({
                                        disabled: true,
                                        value: dataRecord.fecha_incor,
                                        enableBrowserBoundsDetection: true,
                                        height: 24,
                                        formatString: 'dd-MM-yyyy'
                                    });
                                    $("#txtFechaFinBaja").jqxDateTimeInput({
                                        disabled: true,
                                        value: dataRecord.fecha_fin,
                                        enableBrowserBoundsDetection: true,
                                        height: 24,
                                        formatString: 'dd-MM-yyyy'
                                    });
                                    $("#txtFechaRenBaja").jqxDateTimeInput({
                                        value: dataRecord.fecha_fin,
                                        enableBrowserBoundsDetection: true,
                                        height: 24,
                                        formatString: 'dd-MM-yyyy'
                                    });
                                    $("#txtFechaAceptaRenBaja").jqxDateTimeInput({
                                        value: dataRecord.fecha_fin,
                                        enableBrowserBoundsDetection: true,
                                        height: 24,
                                        formatString: 'dd-MM-yyyy'
                                    });
                                    $("#txtFechaAgraServBaja").jqxDateTimeInput({
                                        value: dataRecord.fecha_fin,
                                        enableBrowserBoundsDetection: true,
                                        height: 24,
                                        formatString: 'dd-MM-yyyy'
                                    });
                                    $("#txtFechaBaja").jqxDateTimeInput({
                                        value: dataRecord.fecha_fin,
                                        enableBrowserBoundsDetection: true,
                                        height: 24,
                                        formatString: 'dd-MM-yyyy'
                                    });
                                    $(".msjs-alert").hide();
                                    $("#divFechasRenBaja").hide();
                                    $("#divFechasAceptaRenBaja").hide();
                                    $("#divFechasAgraServBaja").hide();
                                    $("#txtObservacionBaja").val(dataRecord.observacion);
                                    $("#divMsjeError").hide();
                                    $("#tr_cargo_seleccionado_baja").html("");
                                    $("#lstMotivosBajas").focus();
                                    $("#hdnFechaRenBaja").val(0);
                                    $("#hdnFechaAceptaRenBaja").val(0);
                                    $("#hdnFechaAgraServBaja").val(0);
                                    agregarCargoSeleccionadoEnGrillaParaBaja(dataRecord.id_cargo, dataRecord.cargo_codigo, dataRecord.cargo_resolucion_ministerial_id, dataRecord.cargo_resolucion_ministerial,dataRecord.id_finpartida, dataRecord.finpartida, dataRecord.id_condicion, dataRecord.condicion, dataRecord.id_organigrama, dataRecord.gerencia_administrativa, dataRecord.departamento_administrativo, dataRecord.nivelsalarial, dataRecord.cargo, dataRecord.sueldo,dataRecord.nivelsalarial_resolucion_id,dataRecord.nivelsalarial_resolucion);
                                    cargarMotivosBajas(0, dataRecord.id_condicion);
                                    //habilitarCamposParaBajaRegistroDeRelacionLaboral(dataRecord.id_organigrama,dataRecord.id_fin_partida,dataRecord.id_condicion);
                                    var rutaImagen = obtenerRutaFoto(dataRecord.ci, dataRecord.num_complemento);
                                    $("#imgFotoPerfilBaja").attr("src", rutaImagen);
                                } else {
                                    var msje = "Para dar de baja un registro, este debe estar en estado ACTIVO inicialmente.";
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
                    /* Movilidad de Personal.*/
                    $("#moverowbutton").on('click', function () {
                        var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                var id_relaboral = dataRecord.id_relaboral;
                                /*
                                 *  La vista del historial se habilita para personas que tengan al menos un registro de relación sin importar su estado, ACTIVO, EN PROCESO o PASIVO.
                                 *  De esta vista se excluyen a personas que no tengan ningún registro de relación laboral.
                                 */
                                $(".msjs-alert").hide();
                                $("#hdnIdPersonaHistorialMovimiento").val(dataRecord.id_persona);
                                $("#NombreParaMoverRegistro").html(dataRecord.nombres);
                                if (dataRecord.tiene_contrato_vigente >= 1) {
                                    $('#jqxTabs').jqxTabs('enableAt', 0);
                                    $('#jqxTabs').jqxTabs('disableAt', 1);
                                    $('#jqxTabs').jqxTabs('disableAt', 2);
                                    $('#jqxTabs').jqxTabs('disableAt', 3);
                                    $('#jqxTabs').jqxTabs('enableAt', 4);
                                    $('#jqxTabs').jqxTabs('disableAt', 5);
                                    /**
                                     * Trasladamos el item seleccionado al que corresponde, el de vistas.
                                     */
                                    $('#jqxTabs').jqxTabs({selectedItem: 4});

                                    cargarGrillaMovilidad(dataRecord.id_relaboral);
                                    var rutaImagen = obtenerRutaFoto(dataRecord.ci, dataRecord.num_complemento);
                                    $("#imgFotoPerfilMover").attr("src", rutaImagen);

                                } else {
                                    var msje = "Para acceder a la asignación de Movilidad Funcionaria, el estado de registro de Relación Laboral debe tener un estado ACTIVO.";
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
                    $("#viewrowbutton").on('click', function () {

                        var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                        if (selectedrowindex >= 0) {
                            var dataRecord = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex);
                            if (dataRecord != undefined) {
                                var id_relaboral = dataRecord.id_relaboral;
                                /*
                                 *  La vista del historial se habilita para personas que tengan al menos un registro de relación sin importar su estado, ACTIVO, EN PROCESO o PASIVO.
                                 *  De esta vista se excluyen a personas que no tengan ningún registro de relación laboral.
                                 */
                                $(".msjs-alert").hide();
                                $("#hdnIdPersonaHistorial").val(dataRecord.id_persona);
                                if (dataRecord.tiene_contrato_vigente >= 0) {
                                    $('#jqxTabs').jqxTabs('enableAt', 0);
                                    $('#jqxTabs').jqxTabs('disableAt', 1);
                                    $('#jqxTabs').jqxTabs('disableAt', 2);
                                    $('#jqxTabs').jqxTabs('disableAt', 3);
                                    $('#jqxTabs').jqxTabs('disableAt', 4);
                                    $('#jqxTabs').jqxTabs('enableAt', 5);
                                    /**
                                     * Trasladamos el item seleccionado al que corresponde, el de vistas.
                                     */
                                    $('#jqxTabs').jqxTabs({selectedItem: 5});
                                    // Create jqxTabs.
                                    $('#tabFichaPersonal').jqxTabs({
                                        theme: 'oasis',
                                        width: '100%',
                                        height: '100%',
                                        position: 'top'
                                    });
                                    $('#tabFichaPersonal').jqxTabs({selectedItem: 0});
                                    $("#ddNombres").html(dataRecord.nombres);
                                    var rutaImagen = obtenerRutaFoto(dataRecord.ci, dataRecord.num_complemento);
                                    $("#imgFotoPerfilContactoPer").attr("src", rutaImagen);
                                    $("#imgFotoPerfilContactoInst").attr("src", rutaImagen);
                                    $("#imgFotoPerfil").attr("src", rutaImagen);
                                    cargarPersonasContactos(dataRecord.id_persona);
                                    $("#hdnIdRelaboralVista").val(id_relaboral);
                                    $("#hdnSwPrimeraVistaHistorial").val(0);
                                    cargarGestionesHistorialRelaboral(dataRecord.id_persona);
                                    /**
                                     * Para la primera cargada el valor para el parámetro gestión es 0 debido a que mostrará el historial completo.
                                     * Para el valor del parámetro sw el valor es 1 porque se desea que se limpie lo que haya y se cargue algo nuevo
                                     */
                                    cargarHistorialRelacionLaboral(dataRecord.id_persona, 0, 1);
                                    $("#divContent_" + dataRecord.id_relaboral).focus().select();
                                } else {
                                    var msje = "Para acceder a la vista del registro, la persona debe haber tenido al menos un registro de relaci&oacute,n laboral que implica un estado ACTIVO o PASIVO.";
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
                        width: 50,
                        cellsalign: 'center',
                        align: 'center',
                        cellsrenderer: rownumberrenderer
                    },
                    {
                        text: '',
                        datafield: 'nuevo',
                        width: 10,
                        sortable: false,
                        showfilterrow: false,
                        filterable: false,
                        columntype: 'number',
                        cellsrenderer: function (rowline) {
                            ctrlrow = rowline
                            var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', ctrlrow);
                            var sw = dataRecord.tiene_contrato_vigente;
                            if (sw == 0 || sw == -1) {
                                return "<div style='width: 100%' align='center'><a href='#'><i class='fa fa-plus-square fa-2x text-info' title='Nuevo Registro.'/></i></div>";
                            }
                            else return "";
                        },
                        hidden: true //Se oculta esta columna con el boton nuevo dejándolo disponible en caso de requerirse
                    },
                    {
                        text: '',
                        datafield: 'aprobar',
                        width: 10,
                        sortable: false,
                        showfilterrow: false,
                        filterable: false,
                        columntype: 'number',
                        cellsrenderer: function (rowline) {
                            ctrlrow = rowline
                            var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', ctrlrow);
                            var estado = dataRecord.estado;
                            if (dataRecord.estado == 2) {
                                return "<div style='width: 100%' align='center'><a href='#'><i class='fa fa-check-square fa-2x text-info' title='Aprobar registro'></i></a></div>";
                            }
                            else return "";
                        },
                        hidden: true //Se oculta esta columna con el boton aprobar dejándolo disponible en caso de requerirse
                    },
                    {
                        text: '',
                        datafield: 'editar',
                        width: 10,
                        sortable: false,
                        showfilterrow: false,
                        filterable: false,
                        columntype: 'number',
                        cellsrenderer: function (rowline) {
                            ctrlrow = rowline
                            var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', ctrlrow);
                            var estado = dataRecord.estado;
                            if (estado == 2) {
                                return "<div style='width: 100%' align='center'><a href='#'><i class='fa fa-pencil-square fa-2x text-info' title='Modificar registro.'/></a></div>";
                            }
                            else return "";
                        },
                        hidden: true //Se oculta esta columna con el boton editar dejándolo disponible en caso de requerirse
                    },
                    {
                        text: '',
                        datafield: 'eliminar',
                        width: 10,
                        sortable: false,
                        showfilterrow: false,
                        filterable: false,
                        columntype: 'number',
                        cellsrenderer: function (rowline) {
                            ctrlrow = rowline
                            var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', ctrlrow);
                            var estado = dataRecord.estado;
                            if (estado == 1) {
                                //return "<div style='width: 100%'><a href='#'><img src='/images/del.png' style='margin-left: 25%' title='Dar de baja al registro.'/></a></div>";
                                return "<div style='width: 100%' align='center'><a href='#'><i class='fa fa-minus-square fa-2x text-info' title='Dar de baja al registro.'/></i></div>";
                            }
                            else return "";
                        },
                        hidden: true //Se oculta esta columna con el boton baja dejándolo disponible en caso de requerirse
                    },
                    {
                        text: '',
                        datafield: 'mover',
                        width: 10,
                        sortable: false,
                        showfilterrow: false,
                        filterable: false,
                        columntype: 'number',
                        cellsrenderer: function (rowline) {
                            ctrlrow = rowline
                            var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', ctrlrow);
                            var sw = dataRecord.tiene_contrato_vigente;
                            if (sw >= 0) {
                                return "<div style='width: 100%' align='center'><a href='#'><i class='fa fa-tag fa-2x text-info' title='Movilidad de Personal.'/></i></div>";
                            }
                            else return "";
                        },
                        hidden: true //Se oculta esta columna con el boton vista dejándolo disponible en caso de requerirse
                    },
                    {
                        text: '',
                        datafield: 'ver',
                        width: 10,
                        sortable: false,
                        showfilterrow: false,
                        filterable: false,
                        columntype: 'number',
                        cellsrenderer: function (rowline) {
                            ctrlrow = rowline
                            var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', ctrlrow);
                            var sw = dataRecord.tiene_contrato_vigente;
                            if (sw >= 0) {
                                return "<div style='width: 100%' align='center'><a href='#'><i class='fa fa-search fa-2x text-info' title='Vista Historial.'/></i></div>";
                            }
                            else return "";
                        },
                        hidden: true //Se oculta esta columna con el boton vista dejándolo disponible en caso de requerirse
                    },
                    {
                        text: 'Ubicaci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'ubicacion',
                        width: 150,
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
            {label: 'Ubicaci&oacute;n', value: 'ubicacion', checked: true},
            {label: 'Condici&oacute;n', value: 'condicion', checked: true},
            {label: 'Estado', value: 'estado_descripcion', checked: true},
            {label: 'Nombres y Apellidos', value: 'nombres', checked: true},
            {label: 'CI', value: 'ci', checked: true},
            {label: 'Exp', value: 'expd', checked: true},
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
        $("#jqxlistbox").jqxListBox({source: listSource, width: "100%", height: 430, checkboxes: true});
        $("#jqxlistbox").on('checkChange', function (event) {
            $("#jqxgrid").jqxGrid('beginupdate');
            if (event.args.checked) {
                $("#jqxgrid").jqxGrid('showcolumn', event.args.value);
            }
            else {
                $("#jqxgrid").jqxGrid('hidecolumn', event.args.value);
            }
            $("#jqxgrid").jqxGrid('endupdate');
        });
    }
}
