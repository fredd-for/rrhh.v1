$(document).ready(function () {

    $('#codigo_nivel').change('select', function (event) {
        var v=$.ajax({
            url:'/cargos/getSueldo/',
            type:'POST',
            datatype: 'json',
            data:{id:$('#codigo_nivel').val()},
            success: function(data) { 
                var obj = jQuery.parseJSON(data);
                $("#sueldotxt").text(obj.sueldo);
                $("#nivel").val(obj.nivel);
            }, 
            error: function() { alert('Se ha producido un error Inesperado'); }
        });
    });

/*
Cargar grilla Cargos
 */
    var source =
    {
        datatype: "json",
        datafields: [
        { name: 'id',type: 'number'},
        { name: 'resolucion_ministerial_id',type: 'number'},
        { name: 'tipo_resolucion',type: 'string'},
        { name: 'unidad_administrativa',type: 'string'},
        { name: 'organigrama_id',type: 'string'},
        { name: 'depende_id',type: 'number'},
        { name: 'codigo_nivel',type: 'string'},
        { name: 'nivelsalarial_id',type: 'string'},
        { name: 'denominacion',type: 'string'},
        { name: 'codigo',type: 'string'},
        { name: 'ordenador',type: 'number'},
        { name: 'cargo',type: 'string'},
        { name: 'sueldo'},
        { name: 'fin_partida_id'},
        { name: 'estado', type: 'string'},
        { name: 'condicion', type: 'string'},

        { name: 'partida', type: 'number'},
        { name: 'fuente_codigo', type: 'number'},
        { name: 'fuente', type: 'string'},
        { name: 'organismo_codigo', type: 'number'},
        { name: 'organismo', type: 'string'},
        { name: 'asistente', type: 'number'},
        { name: 'jefe', type: 'number'},
        { name: 'gestion', type: 'string'}
        ],
        url: '/cargos/list',
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    
    
    $("#jqxgrid").jqxGrid({
        width: '100%',
        // height: '100%',
        source: dataAdapter,
        sortable: true,
        altRows: true,
        columnsresize: true,
        pageable: true,
        pagerMode: 'advanced',
        showfilterrow: true,
        filterable: true,
        autorowheight: true,
        columns: [
        {
            text: '#', sortable: false, filterable: false, editable: false,
            groupable: false, draggable: false, resizable: false,
            datafield: '', columntype: 'number', width: '2%',
            cellsrenderer: function (row, column, value) {
                return "<div style='margin:3px;'>" + (value + 1) + "</div>";
            }
        },
        { text: 'Resolución', datafield: 'tipo_resolucion', filtertype: 'checkedlist',width: '15%' },
        { text: 'Organigrama', datafield: 'unidad_administrativa', filtertype: 'checkedlist',width: '20%' },
        { text: 'Denominacion', datafield: 'denominacion', filtertype: 'input',width: '15%' },
        { text: 'Ordenador', datafield: 'ordenador', filtertype: 'number',width: '5%' },
        { text: 'Cargo', datafield: 'cargo', filtertype: 'input',width: '30%' },
        { text: 'Salario Mensual', datafield: 'sueldo', filtertype: 'input',width: '8%', cellsformat: 'c2',cellsalign: 'right',align:'center'},
        { text: 'Item', datafield: 'codigo', filtertype: 'input',width: '5%' },
        { text: 'Estado', datafield: 'estado', filtertype: 'checkedlist',width: '7%' },
        { text: 'Tipo Cargo', datafield: 'condicion', filtertype: 'checkedlist',width: '10%' },
        { text: 'Partida', datafield: 'partida', filtertype: 'number',width: '5%' },
        { text: 'Fuente Codigo', datafield: 'fuente_codigo', filtertype: 'number',width: '10%' },
        { text: 'Fuente', datafield: 'fuente', filtertype: 'input',width: '10%', hidden: true},
        { text: 'Organismo Codigo', datafield: 'organismo_codigo', filtertype: 'number',width: '10%' },
        { text: 'Organismo', datafield: 'organismo', filtertype: 'input',width: '10%', hidden: true},
        { text: 'Gestión', datafield: 'gestion', filtertype: 'checkedlist',width: '10%', hidden: false},
        ]
    });

/*
Check Campos para mostrar
 */
var listSource = [{ label: 'Resolución', value: 'tipo_resolucion', checked: true },{ label: 'Organigrama', value: 'unidad_administrativa', checked: true }, { label: 'Denominacion', value: 'denominacion', checked: true }, { label: 'Ordenador', value: 'ordenador', checked: true }, { label: 'Cargo', value: 'cargo', checked: true }, { label: 'Salario Mensual', value: 'sueldo', checked: true},{ label: 'Item', value: 'codigo', checked: true }, { label: 'Tipo Cargo', value: 'condicion', checked: true}, { label: 'Estado', value: 'estado', checked: true},{label:'Partida', value: 'partida', checked: true},{label:'Fuente Codigo', value: 'fuente_codigo', checked: true},{label:'Fuente', value: 'fuente', checked: false},{label:'Organismo Codigo', value: 'organismo_codigo', checked: true},{label:'Organismo', value: 'organismo', checked: false}];

$("#jqxlistbox").jqxListBox({ source: listSource,   checkboxes: true });
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

$("#add").click(function(){
    $("#titulo").text("Adicionar");
    $("#id").val("");
    $("#codigo").val("");
    $("#ordenador").val("");
    $("#organigrama_id").val("");
    $("#depende_id").val("");
    $("#fin_partida_id").val("");
    $("#codigo_nivel").val("");
    $("#cargo").val("");
    $("#formacion_requerida").val("");
    $("#sueldotxt").text("");
    //$('input[name=cargo_estado_id][value="1"]').prop('checked', true);
    // $("#popupWindow").jqxWindow('open');
    $('#myModal').modal('show');
});



$("#edit").click(function(){

    var rowindex = $('#jqxgrid').jqxGrid('getselectedrowindex');
    if (rowindex > -1)
    {
        var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', rowindex);
        $("#titulo").text("Editar");

        $("#cargo_id_pac").val(dataRecord.id);
        $("#estado_cargo").val(dataRecord.estado);
        // $("#organigrama_pac").text(dataRecord.unidad_administrativa);
        // $("#item_pac").text(dataRecord.codigo);
        // $("#cargo_pac").text(dataRecord.cargo);
        // $("#sueldo_pac").text(dataRecord.sueldo);
        $("#formacion_requerida").text(dataRecord.formacion_requerida);

        $("#asistente0").prop("checked", true); 
        if (dataRecord.asistente==1) {
            $("#asistente1").prop("checked", true); 
        }

        $("#jefe0").prop("checked", true);  
        if (dataRecord.jefe==1) {
            $("#jefe1").prop("checked", true);  
        } 

        $("#id").val(dataRecord.id);
        $("#resolucion_ministerial_id").val(dataRecord.resolucion_ministerial_id);
        select_organigrama(dataRecord.organigrama_id);
        select_fuentefinanciamiento(dataRecord.fin_partida_id);
        select_dependencia(dataRecord.organigrama_id,dataRecord.depende_id);
        $("#depende_id").val(dataRecord.depende_id);
        $("#codigo_nivel").val(dataRecord.nivelsalarial_id);
        $("#nivel").val(dataRecord.codigo_nivel);
        $("#codigo").val(dataRecord.codigo);
        $("#ordenador").val(dataRecord.ordenador);
        $("#cargo").val(dataRecord.cargo);
        $("#formacion_requerida").val(dataRecord.formacion_requerida);
        $("#sueldotxt").text(dataRecord.sueldo);
        $('#myModal').modal('show');
    }
    else
    {
        bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para editar.");
    }
});

$("#copy").click(function(){
    var rowindex = $('#jqxgrid').jqxGrid('getselectedrowindex');
    if (rowindex > -1)
    {
        var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', rowindex);
        $("#titulo").text("Copiar Cargo");

        $("#cargo_id_pac").val(dataRecord.id);
        $("#estado_cargo").val(dataRecord.estado);
        // $("#organigrama_pac").text(dataRecord.unidad_administrativa);
        // $("#item_pac").text(dataRecord.codigo);
        // $("#cargo_pac").text(dataRecord.cargo);
        // $("#sueldo_pac").text(dataRecord.sueldo);
        $("#formacion_requerida").text(dataRecord.formacion_requerida);

        $("#asistente0").prop("checked", true); 
        if (dataRecord.asistente==1) {
            $("#asistente1").prop("checked", true); 
        }

        $("#jefe0").prop("checked", true);  
        if (dataRecord.jefe==1) {
            $("#jefe1").prop("checked", true);  
        } 

        $("#id").val("");
        $("#resolucion_ministerial_id").val(dataRecord.resolucion_ministerial_id);
        select_organigrama(dataRecord.organigrama_id);
        select_fuentefinanciamiento(dataRecord.fin_partida_id);
        select_dependencia(dataRecord.organigrama_id,dataRecord.depende_id);
        $("#depende_id").val(dataRecord.depende_id);
        $("#codigo_nivel").val(dataRecord.nivelsalarial_id);
        $("#nivel").val(dataRecord.codigo_nivel);
        $("#codigo").val(dataRecord.codigo);
        $("#ordenador").val(dataRecord.ordenador);
        $("#cargo").val(dataRecord.cargo);
        $("#formacion_requerida").val(dataRecord.formacion_requerida);
        $("#sueldotxt").text(dataRecord.sueldo);
        $('#myModal').modal('show');
    }
    else
    {
        bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para editar.");
    }

});

$("#delete").click(function(){

    var rowindex = $('#jqxgrid').jqxGrid('getselectedrowindex');
    if (rowindex > -1)
    {
        var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', rowindex);
        bootbox.confirm("<strong>¡Mensaje!</strong> Esta seguro de eliminar el registro.", function(result) {
                if (result == true) {
                    var v = $.ajax({
                        url: '/cargos/delete/',
                        type: 'POST',
                        datatype: 'json',
                        data: {id: dataRecord.id},
                        success: function(data) {
                            $("#jqxgrid").jqxGrid('updatebounddata', 'cells');
                            $("#divMsjeExito").show();
                            $("#divMsjeExito").addClass('alert alert-warning alert-dismissable');
                            $("#aMsjeExito").html(data); 
                        }, //mostramos el error
                        error: function() {
                            alert('Se ha producido un error Inesperado');
                        }
                    });
                }
            });
    }
    else
    {
        bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para eliminar.");
    }

 });



$("#add_pac").click(function(){

var rowindex = $('#jqxgrid').jqxGrid('getselectedrowindex');
    if (rowindex > -1)
    {
        var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', rowindex);
        $("#cargo_id_pac").val(dataRecord.id);
        $("#estado_cargo").val(dataRecord.estado);
         $("#organigrama_pac").text(dataRecord.unidad_administrativa);
        $("#item_pac").text(dataRecord.codigo);
        $("#cargo_pac").text(dataRecord.cargo);
        $("#sueldo_pac").text(dataRecord.sueldo+" Bs.");

        if (dataRecord.estado=='ADJUDICADO') {
            bootbox.alert("<strong>¡Mensaje!</strong> El cargo ya esta ADJUDICADO.");
        }else{
            var v=$.ajax({
                url:'/cargos/getEstadoSeguimiento/',
                type:'POST',
                datatype: 'json',
                data:{cargo_id:dataRecord.id},
                success: function(data) { 
                    if(data==1 || data==0){
                        bootbox.alert("<strong>¡Mensaje!</strong> El cargo ya esta en proceso o esta en el PACP.");
                    }else{
                        $('#myModal_pac').modal('show');                    
                    }

                }, 
                error: function() { alert('Se ha producido un error Inesperado'); }
            });


        }
    
        
    }
    else
    {
        bootbox.alert("<strong>¡Mensaje!</strong> Para asignar PACP debe seleccionar un registro.");
    }
});

 /*
 Segunda Grilla PACP
  */


    var source2 =
    {
        datatype: "json",
        datafields: [
        { name: 'nro',type: 'number'},
        { name: 'id',type: 'number'},
        { name: 'tipo_resolucion',type: 'string'},
        { name: 'unidad_administrativa',type: 'string'},
        { name: 'codigo',type: 'string'},
        { name: 'cargo',type: 'string'},
        { name: 'estado',type: 'string'},
        { name: 'gestion',type: 'string'},
        { name: 'fecha_ini',type:'date'},
        { name: 'fecha_fin',type:'date'}
        ],
        url: '/cargos/listpac',
        cache: false
    };

    var dataAdapter2 = new $.jqx.dataAdapter(source2);

    
    $("#jqxgrid2").jqxGrid({
        width: '100%',
        // height: '100%',
        source: dataAdapter2,
        sortable: true,
        altRows: true,
        columnsresize: true,
        pageable: true,
        pagerMode: 'advanced',
        showfilterrow: true,
        filterable: true,
        autorowheight: true,
        columns: [
        {
            text: '#', sortable: false, filterable: false, editable: false,
            groupable: false, draggable: false, resizable: false,
            datafield: '', columntype: 'number', width: '2%',
            cellsrenderer: function (row, column, value) {
                return "<div style='margin:4px;'>" + (value + 1) + "</div>";
            }
        },
        { text: 'Resolución', datafield: 'tipo_resolucion', filtertype: 'checkedlist',width: '20%' },
        { text: 'Organigrama', datafield: 'unidad_administrativa', filtertype: 'checkedlist',width: '20%' },
        { text: 'Item', datafield: 'codigo', filtertype: 'input',width: '5%' },
        { text: 'Cargo', datafield: 'cargo', filtertype: 'input',width: '27%' },
        { text: 'Gestion', datafield: 'gestion', filtertype: 'number',width: '5%' },
        { text: 'Fecha Inicio', datafield: 'fecha_ini', filtertype: 'range', width: '8%', cellsalign: 'center', cellsformat: 'dd-MM-yyyy', align:'center'},
        { text: 'Fecha Finalización', datafield: 'fecha_fin', filtertype: 'range', width: '8%', cellsalign: 'center', cellsformat: 'dd-MM-yyyy', align:'center'},
        { text: 'Estado', datafield: 'estado', filtertype: 'input',width: '5%' }
    ]
});



$("#delete_pac").click(function(){
    var rowindex = $('#jqxgrid2').jqxGrid('getselectedrowindex');
    if (rowindex > -1)
    {
        var dataRecord = $("#jqxgrid2").jqxGrid('getrowdata', rowindex);
        bootbox.confirm("<strong>¡Mensaje!</strong> Esta seguro de eliminar el registro.", function(result) {
            if (result == true) {
                var v = $.ajax({
                    url: '/cargos/delete_pac/',
                    type: 'POST',
                    datatype: 'json',
                    data: {id: dataRecord.id},
                    success: function(data) {
                        $("#jqxgrid2").jqxGrid('updatebounddata', 'cells');
                        $("#divMsjeExito").show();
                        $("#divMsjeExito").addClass('alert alert-warning alert-dismissable');
                        $("#aMsjeExito").html(data); 
                        }, //mostramos el error
                        error: function() {
                            alert('Se ha producido un error Inesperado');
                        }
                    });
            }
        });
    }
    else
    {
        bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para eliminar.");
    }

});

 /*******end segungo grid*********/


/*************Select Dependiente*****************/
$("#resolucion_ministerial_id").change(function () {
    select_organigrama();
    $("#depende_id").html("");
    select_fuentefinanciamiento();
});

$("#organigrama_id").change(function () {
    select_dependencia($("#organigrama_id").val(),0,$("#gestion_fp").val());
});

$("#fin_partida_id").change(function () {
    var v=$.ajax({
        url:'/cargos/getGestion/',
        type:'POST',
        datatype: 'json',
        data:{fin_partida_id:$(this).val()},
        success: function(data) { 
            var obj = jQuery.parseJSON(data);
            $("#gestion_fp").val(obj.gestion);
            select_dependencia($("#organigrama_id").val(),0,obj.gestion);
        },
        error: function() { alert('Se ha producido un error Inesperado'); }
    });
});

select_organigrama();
select_fuentefinanciamiento();

function select_fuentefinanciamiento(fin_partida_id){
    $("#resolucion_ministerial_id option:selected").each(function () {
        elegido=$(this).val();
        $.post("/cargos/select_fuentefinanciamiento/", { elegido: elegido }, function(data){
            $("#fin_partida_id").html(data);
            $("#fin_partida_id").val(fin_partida_id);
        });
    });
}
function select_organigrama(organigrama_id){
    $("#resolucion_ministerial_id option:selected").each(function () {
        elegido=$(this).val();
        $.post("/cargos/select_organigrama/", { elegido: elegido }, function(data){
            $("#organigrama_id").html(data);
            $("#organigrama_id").val(organigrama_id);
        });
    });
}

function select_dependencia(organigrama_id,depende_id,gestion_fp){
    
        //elegido=organigrama_id;
        $.post("/cargos/select_dependencia/", { elegido: organigrama_id, gestion:gestion_fp }, function(data){
            $("#depende_id").html(data);
            $("#depende_id").val(depende_id);
        });            
    
}
/***********************************************/


$('#testForm').validate({
    rules: {
        organigrama_id: {
            required: true,
        },
        codigo_nivel: {
            required: true,
        },
        // codigo: {
        //  required: true,
        // },
        cargo: {
            required: true
        },
        fin_partida_id: {
            required: true,
        },

    },
    highlight: function (element) {
        $(element).closest('.control-group').removeClass('success').addClass('error');
    },
    success: function (element) {
        element.addClass('valid').closest('.control-group').removeClass('error').addClass('success');
    },
    submitHandler: function (form) {
        var asistente=$('input:radio[name=asistente]:checked').val();
        var jefe=$('input:radio[name=jefe]:checked').val();
        var v=$.ajax({
            url:'/cargos/save/',
            type:'POST',
            datatype: 'json',
            data:{id:$("#id").val(),resolucion_ministerial_id:$('#resolucion_ministerial_id').val(),organigrama_id:$('#organigrama_id').val(),fin_partida_id:$('#fin_partida_id').val(),depende_id:$('#depende_id').val(),cargo:$("#cargo").val(),nivel:$("#nivel").val(),codigo_nivel:$("#codigo_nivel").val(),codigo:$('#codigo').val(),ordenador:$('#ordenador').val(),formacion_requerida:$("#formacion_requerida").val(),asistente:asistente,jefe:jefe,gestion_fp:$("#gestion_fp").val()},
            success: function(data) { 
             $("#jqxgrid").jqxGrid('updatebounddata', 'cells');
             $("#divMsjeExito").show();
             $("#divMsjeExito").addClass('alert alert-sucess alert-dismissable');
             $("#aMsjeExito").html(data); 
         },
         error: function() { alert('Se ha producido un error Inesperado'); }
     });
        $('#myModal').modal('hide');
            return false; // ajax used, block the normal submit
        }
    });
 //$("[name='organigrama_id']").css("position", "absolute").css("z-index","-9999").chosen().show();


 $('#testForm_pac').validate({
    rules: {
        gestion_pac: {
            required: true
        }
    },
    highlight: function (element) {
        $(element).closest('.control-group').removeClass('success').addClass('error');
    },
    success: function (element) {
        //element.text('OK!').addClass('valid').closest('.control-group').removeClass('error').addClass('success');
        element.addClass('valid').closest('.control-group').removeClass('error').addClass('success');
    },
    submitHandler: function (form) {
        var fecha_ini = $('#fecha_ini_pac').val();
        var fecha_fin = $('#fecha_fin_pac').val();
        var v=$.ajax({
            url:'/cargos/save_pac/',
            type:'POST',
            datatype: 'json',
            data:{cargo_id_pac:$("#cargo_id_pac").val(),gestion:$('#gestion_pac').val(),fecha_ini:fecha_ini,fecha_fin:fecha_fin},
            success: function(data) { 
                $("#jqxgrid").jqxGrid('updatebounddata', 'cells');
                $("#jqxgrid2").jqxGrid('updatebounddata', 'cells');
                $("#divMsjeExito").show();
                $("#divMsjeExito").addClass('alert alert-sucess alert-dismissable');
                $("#aMsjeExito").html(data); 

            }, 
            error: function() { alert('Se ha producido un error Inesperado'); }
        });
        $('#myModal_pac').modal('hide');
            return false; // ajax used, block the normal submit
        }
    });


$("#update_escala").click(function(){
        $('#myModal_update').modal('show');             
});


$('#testForm_update').validate({
    rules: {
        resolucion_escala_id: {
            required: true
        },
        fin_partida_id: {
            required: true
        }
    },
    highlight: function (element) {
        $(element).closest('.control-group').removeClass('success').addClass('error');
    },
    success: function (element) {
        //element.text('OK!').addClass('valid').closest('.control-group').removeClass('error').addClass('success');
        element.addClass('valid').closest('.control-group').removeClass('error').addClass('success');
    },
    submitHandler: function (form) {
        var v=$.ajax({
            url:'/cargos/updateescala/',
            type:'POST',
            datatype: 'json',
            data:{res_min_id:$("#rm_id").val(),fin_partida_id:$('#fin_partida_id').val(),resolucion_escala_id:$("#resolucion_escala_id")},
                        success: function(data) { //cargar2(); //alert(data); 
                                                }, //mostramos el error
                                                error: function() { alert('Se ha producido un error Inesperado'); }
                                            });
        
        $('#myModal_update').modal('hide');
        return false; // ajax used, block the normal submit
        }
    });

/***********Reporte PDF**************/
// $("#rep_pdf").click(function(){
//  $('#myModal_rep').modal('show');    
    
// });

$("#rep_excel").click(function () {
        var items = $("#jqxlistbox").jqxListBox('getCheckedItems');
        var numColumnas = 0;
        $.each(items, function (index, value) {
            numColumnas++;
        });
        if (numColumnas > 0) exportarReporte(1);
        else {
            alert("Debe seleccionar al menos una columna para la obtención del reporte solicitado.");
            $("#jqxlistbox").focus();
        }
});

$("#rep_pdf").click(function () {
        var items = $("#jqxlistbox").jqxListBox('getCheckedItems');
        var numColumnas = 0;
        $.each(items, function (index, value) {
            numColumnas++;
        });
        if (numColumnas > 0) exportarReporte(2);
        else {
            alert("Debe seleccionar al menos una columna para la obtención del reporte solicitado.");
            $("#jqxlistbox").focus();
        }
});


function exportarReporte(option){
    columna = new Object();
    filtros = new Object();
    agrupados = new Object();
    ordenados = new Object();
    tipo_resolucion = $('#jqxgrid').jqxGrid('getcolumn','tipo_resolucion');
    unidad_administrativa = $('#jqxgrid').jqxGrid('getcolumn','unidad_administrativa');
    denominacion = $('#jqxgrid').jqxGrid('getcolumn','denominacion');
    ordenador = $('#jqxgrid').jqxGrid('getcolumn','ordenador');
    cargo = $('#jqxgrid').jqxGrid('getcolumn','cargo');
    sueldo = $('#jqxgrid').jqxGrid('getcolumn','sueldo');
    codigo = $('#jqxgrid').jqxGrid('getcolumn','codigo');
    estado = $('#jqxgrid').jqxGrid('getcolumn','estado');
    condicion = $('#jqxgrid').jqxGrid('getcolumn','condicion');
    partida = $('#jqxgrid').jqxGrid('getcolumn','partida');
    fuente_codigo = $('#jqxgrid').jqxGrid('getcolumn','fuente_codigo');
    fuente = $('#jqxgrid').jqxGrid('getcolumn','fuente');
    organismo_codigo = $('#jqxgrid').jqxGrid('getcolumn','organismo_codigo');
    organismo = $('#jqxgrid').jqxGrid('getcolumn','organismo');

    columna[tipo_resolucion.datafield] = {text: tipo_resolucion.text, hidden: tipo_resolucion.hidden};
    columna[unidad_administrativa.datafield] = {text: unidad_administrativa.text, hidden: unidad_administrativa.hidden};
    columna[denominacion.datafield] = {text: denominacion.text, hidden: denominacion.hidden};
    columna[ordenador.datafield] = {text: ordenador.text, hidden: ordenador.hidden};
    columna[cargo.datafield] = {text: cargo.text, hidden: cargo.hidden};
    columna[sueldo.datafield] = {text: sueldo.text, hidden: sueldo.hidden};
    columna[codigo.datafield] = {text: codigo.text, hidden: codigo.hidden};
    columna[estado.datafield] = {text: estado.text, hidden: estado.hidden};
    columna[condicion.datafield] = {text: condicion.text, hidden: condicion.hidden};
    columna[partida.datafield] = {text: partida.text, hidden: partida.hidden};
    columna[fuente_codigo.datafield] = {text: fuente_codigo.text, hidden: fuente_codigo.hidden};
    columna[fuente.datafield] = {text: fuente.text, hidden: fuente.hidden};
    columna[organismo_codigo.datafield] = {text: organismo_codigo.text, hidden: organismo_codigo.hidden};
    columna[organismo.datafield] = {text: organismo.text, hidden: organismo.hidden};

    var groups = $('#jqxgrid').jqxGrid('groups');
    if(groups==null||groups=='')groups='null';
    //var sorteds = $('#jqxgrid').jqxGrid('getsortcolumn');

    var sortinformation = $('#jqxgrid').jqxGrid('getsortinformation');
    if(sortinformation.sortcolumn!=undefined){
        // The sortcolumn rep   resents the sort column's datafield. If there's no sort column, the sortcolumn is null.
        var sortcolumn = sortinformation.sortcolumn;
        // The sortdirection is an object with two fields: 'ascending' and 'descending'. Ex: { 'ascending': true, 'descending': false }
        var sortdirection = sortinformation.sortdirection;
        ordenados[sortcolumn] = {desc: sortdirection.ascending, asc: sortdirection.descending};
    }else ordenados='';


    var rows = $('#jqxgrid').jqxGrid('getrows');
    var filterGroups = $('#jqxgrid').jqxGrid('getfilterinformation');
    var counter = 0;
    for (var i = 0; i < filterGroups.length; i++) {
        var filterGroup = filterGroups[i];
        var filters = filterGroup.filter.getfilters();
        for (var j = 0; j < filters.length; j++) {
            if (j>0){
                counter++;
            }
            var indice = i+counter;
            filtros[indice] = {columna: filterGroup.filtercolumn, valor: filters[j].value,
                condicion: filters[j].condition, tipo: filters[j].type};
        }
    }
    var n_rows = rows.length;
    var json_filter = JSON.stringify(filtros);
    var json_columns = JSON.stringify(columna);
    var json_sorteds = JSON.stringify(ordenados);
    json_columns = btoa(utf8_encode(json_columns));
    json_filter = btoa(utf8_encode(json_filter));
    json_sorteds = btoa(utf8_encode(json_sorteds));
    var json_groups =  btoa(utf8_encode(groups));

    json_columns= json_columns.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    json_filter= json_filter.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    json_groups= json_groups.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    json_sorteds= json_sorteds.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    var ruta='';
    switch (option){
        case 1: ruta="/cargos/exportarExcel/";break;
        case 2: ruta="/cargos/exportarPdf/";break;
    }
    /*if(option==1)ruta="/relaborales/print/";
    elseif(option==2)ruta="/relaborales/print/";*/
    if(ruta!='')
        window.open(ruta+n_rows+"/"+json_columns+"/"+json_filter+"/"+json_groups+"/"+json_sorteds ,"_blank");
}
function utf8_encode(argString) {
    if (argString === null || typeof argString === 'undefined') {
        return '';
    }

    var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    var utftext = '',
        start, end, stringl = 0;

    start = end = 0;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;

        if (c1 < 128) {
            end++;
        } else if (c1 > 127 && c1 < 2048) {
            enc = String.fromCharCode(
                (c1 >> 6) | 192, (c1 & 63) | 128
            );
        } else if ((c1 & 0xF800) != 0xD800) {
            enc = String.fromCharCode(
                (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
            );
        } else { // surrogate pairs
            if ((c1 & 0xFC00) != 0xD800) {
                throw new RangeError('Unmatched trail surrogate at ' + n);
            }
            var c2 = string.charCodeAt(++n);
            if ((c2 & 0xFC00) != 0xDC00) {
                throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
            }
            c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
            enc = String.fromCharCode(
                (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
            );
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.slice(start, end);
            }
            utftext += enc;
            start = end = n + 1;
        }
    }

    if (end > start) {
        utftext += string.slice(start, stringl);
    }

    return utftext;
};


// $('#exportar_excel').click(function(){
//  $('#testForm_rep').attr('action', '/cargos/exportarExcel/');
// });
// $('#exportar_pdf').click(function(){
//  $('#testForm_rep').attr('action', '/cargos/exportarPdf/');
// });
/**************************/

/***********Reporte PDF PACP**************/
// $("#rep_pdf_pac").click(function(){
//  $('#myModal_rep_pac').modal('show');    
    
// });

$("#rep_pdf_pac").click(function () {
        // var items = $("#jqxlistbox").jqxListBox('getCheckedItems');
        // var numColumnas = 0;
        // $.each(items, function (index, value) {
        //     numColumnas++;
        // });
        // if (numColumnas > 0) exportarReporte(2);
        // else {
        //     alert("Debe seleccionar al menos una columna para la obtención del reporte solicitado.");
        //     $("#jqxlistbox").focus();
        // }
        exportarPacReporte(2);
});


function exportarPacReporte(option){
    columna = new Object();
    filtros = new Object();
    agrupados = new Object();
    ordenados = new Object();

    tipo_resolucion = $('#jqxgrid2').jqxGrid('getcolumn','tipo_resolucion');
    unidad_administrativa = $('#jqxgrid2').jqxGrid('getcolumn','unidad_administrativa');
    codigo = $('#jqxgrid2').jqxGrid('getcolumn','codigo');
    cargo = $('#jqxgrid2').jqxGrid('getcolumn','cargo');
    gestion = $('#jqxgrid2').jqxGrid('getcolumn','gestion');
    fecha_ini = $('#jqxgrid2').jqxGrid('getcolumn','fecha_ini');
    fecha_fin = $('#jqxgrid2').jqxGrid('getcolumn','fecha_fin');
    estado  = $('#jqxgrid2').jqxGrid('getcolumn','estado');

    columna[tipo_resolucion.datafield] = {text: tipo_resolucion.text, hidden: tipo_resolucion.hidden};
    columna[unidad_administrativa.datafield] = {text: unidad_administrativa.text, hidden: unidad_administrativa.hidden};
    columna[codigo.datafield] = {text: codigo.text, hidden: codigo.hidden};
    columna[cargo.datafield] = {text: cargo.text, hidden: cargo.hidden};
    columna[gestion.datafield] = {text: gestion.text, hidden: gestion.hidden};
    columna[fecha_ini.datafield] = {text: fecha_ini.text, hidden: fecha_ini.hidden};
    columna[fecha_fin.datafield] = {text: fecha_fin.text, hidden: fecha_fin.hidden};
    columna[estado.datafield] = {text: estado.text, hidden: estado.hidden};
    
    var groups = $('#jqxgrid2').jqxGrid('groups');
    if(groups==null||groups=='')groups='null';
    //var sorteds = $('#jqxgrid').jqxGrid('getsortcolumn');

    var sortinformation = $('#jqxgrid2').jqxGrid('getsortinformation');
    if(sortinformation.sortcolumn!=undefined){
        // The sortcolumn rep   resents the sort column's datafield. If there's no sort column, the sortcolumn is null.
        var sortcolumn = sortinformation.sortcolumn;
        // The sortdirection is an object with two fields: 'ascending' and 'descending'. Ex: { 'ascending': true, 'descending': false }
        var sortdirection = sortinformation.sortdirection;
        ordenados[sortcolumn] = {asc: sortdirection.ascending, desc: sortdirection.descending};
    }else ordenados='';


    var rows = $('#jqxgrid2').jqxGrid('getrows');
    var filterGroups = $('#jqxgrid2').jqxGrid('getfilterinformation');
    var counter = 0;
    for (var i = 0; i < filterGroups.length; i++) {
        var filterGroup = filterGroups[i];
        var filters = filterGroup.filter.getfilters();
        for (var j = 0; j < filters.length; j++) {
            if (j>0){
                counter++;
            }
            var indice = i+counter;
            filtros[indice] = {columna: filterGroup.filtercolumn, valor: filters[j].value,
                condicion: filters[j].condition, tipo: filters[j].type};
        }
    }
    var n_rows = rows.length;
    var json_filter = JSON.stringify(filtros);
    var json_columns = JSON.stringify(columna);
    var json_sorteds = JSON.stringify(ordenados);
    json_columns = btoa(utf8_encode(json_columns));
    json_filter = btoa(utf8_encode(json_filter));
    json_sorteds = btoa(utf8_encode(json_sorteds));
    var json_groups =  btoa(utf8_encode(groups));

    json_columns= json_columns.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    json_filter= json_filter.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    json_groups= json_groups.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    json_sorteds= json_sorteds.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    var ruta='';
    switch (option){
        case 1: ruta="/cargos/exportarPacExcel/";break;
        case 2: ruta="/cargos/exportarPacPdf/";break;
    }
    /*if(option==1)ruta="/relaborales/print/";
    elseif(option==2)ruta="/relaborales/print/";*/
    if(ruta!='')
        window.open(ruta+n_rows+"/"+json_columns+"/"+json_filter+"/"+json_groups+"/"+json_sorteds ,"_blank");
}

// $('#exportar_pac_excel').click(function(){
//  $('#testForm_rep_pac').attr('action', '/cargos/exportarPacExcel/');
// });
// $('#exportar_pac_pdf').click(function(){
//  $('#testForm_rep_pac').attr('action', '/cargos/exportarPacPdf/');
// });
/**************************/




});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


