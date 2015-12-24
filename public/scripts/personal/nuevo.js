$(document).ready(function () {
    //mostrar apellido de casada
    $('#estado_civil').change(function () {
        var e_civil = $(this).val();
        if (e_civil == 'CASADO(A)') {
            $('#div_a_casada').show();
        }
        else {
            $('#div_a_casada').hide();
        }
    });
    // verfiicar si el ci existe ya en la db
    $('input#ci').blur(function () {
        if($("#id").val()==''){
            if($("#ci").val()!=''){
                var ajax = $.ajax({
                    url: '/personas/ci',
                    type: 'POST',
                    datatype: 'json',
                    data: {ci: $("#ci").val()},
                    success: function (data) {
                        var data = jQuery.parseJSON(data);
                        if (data.existe > 0) {
                            bootbox.alert("<strong>¡Error!</strong> " + data.mensaje);
                            $('#ci').val('').focus();
                        }

            }, //mostramos el error
            error: function () {
                alert('Se ha producido un error Inesperado');
            }
        });
            }    
        }
        
        


    });

    //datepicker a fechas
    $('#f_caducidad,#fecha_nacimiento').datepicker();

    // $("#container_image").PictureCut({
    //     InputOfImageDirectory : "auto",
    //     PluginFolderOnServer : "/jquery.picture.cut/",
    //     FolderOnServer : "/personal/",
    //     EnableCrop : true,
    //     CropWindowStyle : "Bootstrap",
    //     ////
    //     ImageButtonCSS : {
    //       border:"1px #394263 solid",
    //       width :170,
    //       height:150
    //   },
    //   CropModes : {
    //       widescreen: true,
    //       letterbox: true,
    //       free   : true
    //   },
    //   ImageNameRandom : false,
    //   InputOfFile : "nombre",
    //   MaximumSize : 10120,
    //   EnableMaximumSize : true,
    //   EnableResize : true,
    //   //MinimumWidthToResize :true,
    //   //MinimumHeightToResize : 5320,
    //         //CropOrientation : false,
    //     }); 
    //     
    $("#boton_foto").load('/personas/subirfoto/'+$("#link_foto").val());


});


