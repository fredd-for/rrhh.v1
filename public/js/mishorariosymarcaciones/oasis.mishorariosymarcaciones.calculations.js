/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  27-03-2015
 */
/**
 * Función para la búsqueda de registros de personal que cumplen el criterio de búsqueda establecido a través del parámetro.
 * @param objParametros
 */
function definirGrillaMarcacionesYCalculosPorPersona(objParametros) {
    var ci = objParametros.ci;
    var idOrganigrama = objParametros.idOrganigrama;
    var idArea=objParametros.idArea;
    var idUbicacion=objParametros.idUbicacion;
    var idRelaboral=objParametros.idRelaboral;
    var fechaIni = objParametros.fechaIni;
    var diaMostrable = 0;
    if(fechaIni!=undefined&&fechaIni!=''){
        var arr = fechaIni.split("-");
        diaMostrable = parseInt(arr[0]);
    }
    var fechaFin = objParametros.fechaFin;
    var source =
    {
        datatype: "json",
        datafields: [
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
            {name: 'relaboral_estado', type: 'integer'},
            {name: 'relaboral_estado_descripcion', type: 'string'},
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
            /*{name: 'fecha_ini', type: 'date'},
            {name: 'fecha_incor', type: 'date'},
            {name: 'fecha_fin', type: 'date'},
            {name: 'fecha_baja', type: 'date'},
            {name: 'motivo_baja', type: 'string'},
            {name: 'relaboral_previo_id', type: 'integer'},
            {name: 'observacion', type: 'string'},
            {name: 'fecha_ing', type: 'date'}*/


            {name: 'nro_row', type: 'integer'},
            {name: 'id', type: 'integer'},
            {name: 'relaboral_id', type: 'integer'},
            {name: 'gestion', type: 'integer'},
            {name: 'mes', type: 'integer'},
            {name: 'mes_nombre', type: 'string'},
            {name: 'turno', type: 'integer'},
            {name: 'grupo', type: 'integer'},
            {name: 'clasemarcacion', type: 'string'},
            {name: 'clasemarcacion_descripcion', type: 'string'},
            {name: 'modalidadmarcacion_id', type: 'integer'},
            {name: 'modalidad_marcacion', type: 'string'},
            {name: 'd1', type: 'time'},
            {name: 'calendariolaboral1_id', type: 'integer'},
            {name: 'estado1', type: 'integer'},
            {name: 'estado1_descripcion', type: 'string'},
            {name: 'd2', type: 'time'},
            {name: 'calendariolaboral2_id', type: 'integer'},
            {name: 'estado2', type: 'integer'},
            {name: 'estado2_descripcion', type: 'string'},
            {name: 'd3', type: 'time'},
            {name: 'calendariolaboral3_id', type: 'integer'},
            {name: 'estado3', type: 'integer'},
            {name: 'estado3_descripcion', type: 'string'},
            {name: 'd4', type: 'time'},
            {name: 'calendariolaboral4_id', type: 'integer'},
            {name: 'estado4', type: 'integer'},
            {name: 'estado4_descripcion', type: 'string'},
            {name: 'd5', type: 'time'},
            {name: 'calendariolaboral5_id', type: 'integer'},
            {name: 'estado5', type: 'integer'},
            {name: 'estado5_descripcion', type: 'string'},
            {name: 'd6', type: 'time'},
            {name: 'calendariolaboral6_id', type: 'integer'},
            {name: 'estado6', type: 'integer'},
            {name: 'estado6_descripcion', type: 'string'},
            {name: 'd7', type: 'time'},
            {name: 'calendariolaboral7_id', type: 'integer'},
            {name: 'estado7', type: 'integer'},
            {name: 'estado7_descripcion', type: 'string'},
            {name: 'd8', type: 'time'},
            {name: 'calendariolaboral8_id', type: 'integer'},
            {name: 'estado8', type: 'integer'},
            {name: 'estado8_descripcion', type: 'string'},
            {name: 'd9', type: 'time'},
            {name: 'calendariolaboral9_id', type: 'integer'},
            {name: 'estado9', type: 'integer'},
            {name: 'estado9_descripcion', type: 'string'},
            {name: 'd10', type: 'time'},
            {name: 'calendariolaboral10_id', type: 'integer'},
            {name: 'estado10', type: 'integer'},
            {name: 'estado10_descripcion', type: 'string'},
            {name: 'd11', type: 'time'},
            {name: 'calendariolaboral11_id', type: 'integer'},
            {name: 'estado11', type: 'integer'},
            {name: 'estado11_descripcion', type: 'string'},
            {name: 'd12', type: 'time'},
            {name: 'calendariolaboral12_id', type: 'integer'},
            {name: 'estado12', type: 'integer'},
            {name: 'estado12_descripcion', type: 'string'},
            {name: 'd13', type: 'time'},
            {name: 'calendariolaboral13_id', type: 'integer'},
            {name: 'estado13', type: 'integer'},
            {name: 'estado13_descripcion', type: 'string'},
            {name: 'd14', type: 'time'},
            {name: 'calendariolaboral14_id', type: 'integer'},
            {name: 'estado14', type: 'integer'},
            {name: 'estado14_descripcion', type: 'string'},
            {name: 'd15', type: 'time'},
            {name: 'calendariolaboral15_id', type: 'integer'},
            {name: 'estado15', type: 'integer'},
            {name: 'estado15_descripcion', type: 'string'},
            {name: 'd16', type: 'time'},
            {name: 'calendariolaboral16_id', type: 'integer'},
            {name: 'estado16', type: 'integer'},
            {name: 'estado16_descripcion', type: 'string'},
            {name: 'd17', type: 'time'},
            {name: 'calendariolaboral17_id', type: 'integer'},
            {name: 'estado17', type: 'integer'},
            {name: 'estado17_descripcion', type: 'string'},
            {name: 'd18', type: 'time'},
            {name: 'calendariolaboral18_id', type: 'integer'},
            {name: 'estado18', type: 'integer'},
            {name: 'estado18_descripcion', type: 'string'},
            {name: 'd19', type: 'time'},
            {name: 'calendariolaboral19_id', type: 'integer'},
            {name: 'estado19', type: 'integer'},
            {name: 'estado19_descripcion', type: 'string'},
            {name: 'd20', type: 'time'},
            {name: 'calendariolaboral20_id', type: 'integer'},
            {name: 'estado20', type: 'integer'},
            {name: 'estado20_descripcion', type: 'string'},
            {name: 'd21', type: 'time'},
            {name: 'calendariolaboral21_id', type: 'integer'},
            {name: 'estado21', type: 'integer'},
            {name: 'estado21_descripcion', type: 'string'},
            {name: 'd22', type: 'time'},
            {name: 'calendariolaboral22_id', type: 'integer'},
            {name: 'estado22', type: 'integer'},
            {name: 'estado22_descripcion', type: 'string'},
            {name: 'd23', type: 'time'},
            {name: 'calendariolaboral23_id', type: 'integer'},
            {name: 'estado23', type: 'integer'},
            {name: 'estado23_descripcion', type: 'string'},
            {name: 'd24', type: 'time'},
            {name: 'calendariolaboral24_id', type: 'integer'},
            {name: 'estado24', type: 'integer'},
            {name: 'estado25_descripcion', type: 'string'},
            {name: 'd25', type: 'time'},
            {name: 'calendariolaboral25_id', type: 'integer'},
            {name: 'estado25', type: 'integer'},
            {name: 'estado25_descripcion', type: 'string'},
            {name: 'd26', type: 'time'},
            {name: 'calendariolaboral26_id', type: 'integer'},
            {name: 'estado26', type: 'integer'},
            {name: 'estado26_descripcion', type: 'string'},
            {name: 'd27', type: 'time'},
            {name: 'calendariolaboral1_id', type: 'integer'},
            {name: 'estado27', type: 'integer'},
            {name: 'estado27_descripcion', type: 'string'},
            {name: 'd28', type: 'time'},
            {name: 'calendariolaboral28_id', type: 'integer'},
            {name: 'estado28', type: 'integer'},
            {name: 'estado28_descripcion', type: 'string'},
            {name: 'd29', type: 'time'},
            {name: 'calendariolaboral29_id', type: 'integer'},
            {name: 'estado29', type: 'integer'},
            {name: 'estado29_descripcion', type: 'string'},
            {name: 'd30', type: 'time'},
            {name: 'calendariolaboral30_id', type: 'integer'},
            {name: 'estado30', type: 'integer'},
            {name: 'estado30_descripcion', type: 'string'},
            {name: 'd31', type: 'time'},
            {name: 'calendariolaboral31_id', type: 'integer'},
            {name: 'estado31', type: 'integer'},
            {name: 'estado31_descripcion', type: 'string'},
            {name: 'ultimo_dia', type: 'integer'},
            {name: 'atrasos', type: 'numeric'},
            {name: 'atrasados', type: 'numeric'},
            {name: 'faltas', type: 'numeric'},
            {name: 'abandono', type: 'numeric'},
            {name: 'omision', type: 'numeric'},
            {name: 'lsgh', type: 'numeric'},
            {name: 'compensacion', type: 'numeric'},
            {name: 'descanso', type: 'numeric'},
            {name: 'agrupador', type: 'integer'},
            {name: 'observacion', type: 'string'},
            {name: 'estado', type: 'string'},
            {name: 'estado_descripcion', type: 'string'}
        ],
        url: '/horariosymarcaciones/listallbyrange?ci='+ci+'&id_organigrama='+idOrganigrama+'&id_area='+idArea+'&id_ubicacion='+idUbicacion+'&id_relaboral='+idRelaboral+'&fecha_ini='+fechaIni+'&fecha_fin='+fechaFin,
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    cargarRegistrosDeTolerancias();
    function cargarRegistrosDeTolerancias() {
        var theme = prepareSimulator("grid");
        $("#divGridControlCalculos").jqxGrid(
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

                autorowheight: true,
                columns: [
                    {
                        text: 'Nro.',
                        filterable: false,
                        columntype: 'number',
                        width: 40,
                        cellsalign: 'center',
                        align: 'center',
                        cellsrenderer: rownumberrenderer
                    },
                    /*********************************************************************************************************/
                    {
                        text: 'Estado',
                        filtertype: 'checkedlist',
                        datafield: 'estado_descripcion',
                        width: 100,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: true,
                        cellclassname: cellclass
                    },
                    {
                        text: 'Ubicaci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'ubicacion',
                        width: 150,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Condici&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'condicion',
                        width: 150,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Nombres y Apellidos',
                        columntype: 'textbox',
                        filtertype: 'input',
                        datafield: 'nombres',
                        width: 215,
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'CI',
                        columntype: 'textbox',
                        filtertype: 'input',
                        datafield: 'ci',
                        width: 90,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Exp',
                        filtertype: 'checkedlist',
                        datafield: 'expd',
                        width: 40,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Gerencia',
                        filtertype: 'checkedlist',
                        datafield: 'gerencia_administrativa',
                        width: 220,
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Departamento',
                        filtertype: 'checkedlist',
                        datafield: 'departamento_administrativo',
                        width: 220,
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: '&Aacute;rea',
                        filtertype: 'checkedlist',
                        datafield: 'area',
                        width: 220,
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Cargo',
                        columntype: 'textbox',
                        filtertype: 'input',
                        datafield: 'cargo',
                        width: 215,
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Haber',
                        filtertype: 'checkedlist',
                        datafield: 'sueldo',
                        width: 100,
                        cellsalign: 'right',
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Gesti&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'gestion',
                        width: 60,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Mes',
                        filtertype: 'checkedlist',
                        datafield: 'mes_nombre',
                        width: 100,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Turno',
                        filtertype: 'checkedlist',
                        datafield: 'turno',
                        width: 50,
                        align: 'center',
                        cellsalign: 'center',
                        hidden: false
                    },
                    {
                        text: 'Modalidad',
                        filtertype: 'checkedlist',
                        datafield: 'modalidad_marcacion',
                        width: 100,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false,
                        cellsrenderer: cellsrenderer

                    },
                    {
                        text: 'D&iacute;a 1',
                        datafield: 'd1',
                        width: 100,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,1)
                    },
                    {
                        text: 'D&iacute;a 2',
                        datafield: 'd2',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,2)
                    },
                    {
                        text: 'D&iacute;a 3',
                        datafield: 'd3',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,3)
                    },
                    {
                        text: 'D&iacute;a 4',
                        datafield: 'd4',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,4)
                    },
                    {
                        text: 'D&iacute;a 5',
                        datafield: 'd5',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,5)
                    },
                    {
                        text: 'D&iacute;a 6',
                        datafield: 'd6',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,6)
                    },
                    {
                        text: 'D&iacute;a 7',
                        datafield: 'd7',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,7)
                    },
                    {
                        text: 'D&iacute;a 8',
                        datafield: 'd8',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,8)
                    },
                    {
                        text: 'D&iacute;a 9',
                        datafield: 'd9',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,9)
                    },
                    {
                        text: 'D&iacute;a 10',
                        datafield: 'd10',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,10)
                    },
                    {
                        text: 'D&iacute;a 11',
                        datafield: 'd11',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,11)
                    },
                    {
                        text: 'D&iacute;a 12',
                        datafield: 'd12',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,12)
                    },
                    {
                        text: 'D&iacute;a 13',
                        datafield: 'd13',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,13)
                    },
                    {
                        text: 'D&iacute;a 14',
                        datafield: 'd14',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,14)
                    },
                    {
                        text: 'D&iacute;a 15',
                        datafield: 'd15',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,15)
                    },
                    {
                        text: 'D&iacute;a 16',
                        datafield: 'd16',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,16)
                    },
                    {
                        text: 'D&iacute;a 17',
                        datafield: 'd17',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,17)
                    },
                    {
                        text: 'D&iacute;a 18',
                        datafield: 'd18',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,18)
                    },
                    {
                        text: 'D&iacute;a 19',
                        datafield: 'd19',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,19)
                    },
                    {
                        text: 'D&iacute;a 20',
                        datafield: 'd20',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,20)
                    },
                    {
                        text: 'D&iacute;a 21',
                        datafield: 'd21',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,21)
                    },
                    {
                        text: 'D&iacute;a 22',
                        datafield: 'd22',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,22)
                    },
                    {
                        text: 'D&iacute;a 23',
                        datafield: 'd23',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,23)
                    },
                    {
                        text: 'D&iacute;a 24',
                        datafield: 'd24',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,24)
                    },
                    {
                        text: 'D&iacute;a 25',
                        datafield: 'd25',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,25)
                    },
                    {
                        text: 'D&iacute;a 26',
                        datafield: 'd26',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,26)
                    },
                    {
                        text: 'D&iacute;a 27',
                        datafield: 'd27',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,27)
                    },
                    {
                        text: 'D&iacute;a 28',
                        datafield: 'd28',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,28)
                    },
                    {
                        text: 'D&iacute;a 29',
                        datafield: 'd29',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,29)
                    },
                    {
                        text: 'D&iacute;a 30',
                        datafield: 'd30',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,30)
                    },
                    {
                        text: 'D&iacute;a 31',
                        datafield: 'd31',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: mostrarColumnaDia(diaMostrable,31)
                    },
                    {
                        text: '&Uacute;ltimo D&iacute;a',
                        datafield: 'ultimo_dia',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Atrasos',
                        filtertype: 'checkedlist',
                        datafield: 'atrasos',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Atrasados',
                        filtertype: 'checkedlist',
                        datafield: 'atrasados',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Faltas',
                        filtertype: 'checkedlist',
                        datafield: 'faltas',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Abandono',
                        filtertype: 'checkedlist',
                        datafield: 'abandono',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Sin Marcaci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'omision',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'LSGH',
                        filtertype: 'checkedlist',
                        datafield: 'lsgh',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: false
                    },
                    {
                        text: 'Marc. Previstas',
                        filtertype: 'checkedlist',
                        datafield: 'agrupador',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Descanso',
                        filtertype: 'checkedlist',
                        datafield: 'descanso',
                        width: 70,
                        cellsalign: 'center',
                        align: 'center',
                        hidden: true
                    },
                    {
                        text: 'Observaci&oacute;n',
                        filtertype: 'checkedlist',
                        datafield: 'observacion',
                        width: 100,
                        align: 'center',
                        hidden: false
                    }
                ]
            });
        var listSource = [
            {label: 'Estado Marcaciones', value: 'estado_descripcion', checked: false},
            {label: 'Ubicaci&oacute;n', value: 'ubicacion', checked: false},
            {label: 'Condici&oacute;n', value: 'condicion', checked: false},
            {label: 'Nombres', value: 'nombres', checked: false},
            {label: 'CI', value: 'ci', checked: false},
            {label: 'Expd', value: 'expd', checked: false},
            {label: 'Gerencia', value: 'gerencia_administrativa', checked: false},
            {label: 'Departamento', value: 'departamento_administrativo', checked: false},
            {label: '&Aacute;rea', value: 'area', checked: false},
            {label: 'Cargo', value: 'cargo', checked: false},
            {label: 'Haber', value: 'sueldo', checked: false},
            {label: 'Gesti&oacute;n', value: 'gestion', checked: true},
            {label: 'Mes', value: 'mes_nombre', checked: true},
            {label: 'Turno', value: 'turno', checked: true},
            {label: 'Modalidad', value: 'modalidad_marcacion', checked: true},
            {label: 'D&iacute;a 1', value: 'd1', checked: !mostrarColumnaDia(diaMostrable,1)},
            {label: 'D&iacute;a 2', value: 'd2', checked: !mostrarColumnaDia(diaMostrable,2)},
            {label: 'D&iacute;a 3', value: 'd3', checked: !mostrarColumnaDia(diaMostrable,3)},
            {label: 'D&iacute;a 4', value: 'd4', checked: !mostrarColumnaDia(diaMostrable,4)},
            {label: 'D&iacute;a 5', value: 'd5', checked: !mostrarColumnaDia(diaMostrable,5)},
            {label: 'D&iacute;a 6', value: 'd6', checked: !mostrarColumnaDia(diaMostrable,6)},
            {label: 'D&iacute;a 7', value: 'd7', checked: !mostrarColumnaDia(diaMostrable,7)},
            {label: 'D&iacute;a 8', value: 'd8', checked: !mostrarColumnaDia(diaMostrable,8)},
            {label: 'D&iacute;a 9', value: 'd9', checked: !mostrarColumnaDia(diaMostrable,9)},
            {label: 'D&iacute;a 10', value: 'd10', checked: !mostrarColumnaDia(diaMostrable,10)},
            {label: 'D&iacute;a 11', value: 'd11', checked: !mostrarColumnaDia(diaMostrable,11)},
            {label: 'D&iacute;a 12', value: 'd12', checked: !mostrarColumnaDia(diaMostrable,12)},
            {label: 'D&iacute;a 13', value: 'd13', checked: !mostrarColumnaDia(diaMostrable,13)},
            {label: 'D&iacute;a 14', value: 'd14', checked: !mostrarColumnaDia(diaMostrable,14)},
            {label: 'D&iacute;a 15', value: 'd15', checked: !mostrarColumnaDia(diaMostrable,15)},
            {label: 'D&iacute;a 16', value: 'd16', checked: !mostrarColumnaDia(diaMostrable,16)},
            {label: 'D&iacute;a 17', value: 'd17', checked: !mostrarColumnaDia(diaMostrable,17)},
            {label: 'D&iacute;a 18', value: 'd18', checked: !mostrarColumnaDia(diaMostrable,18)},
            {label: 'D&iacute;a 19', value: 'd19', checked: !mostrarColumnaDia(diaMostrable,19)},
            {label: 'D&iacute;a 20', value: 'd20', checked: !mostrarColumnaDia(diaMostrable,20)},
            {label: 'D&iacute;a 21', value: 'd21', checked: !mostrarColumnaDia(diaMostrable,21)},
            {label: 'D&iacute;a 22', value: 'd22', checked: !mostrarColumnaDia(diaMostrable,22)},
            {label: 'D&iacute;a 23', value: 'd23', checked: !mostrarColumnaDia(diaMostrable,23)},
            {label: 'D&iacute;a 24', value: 'd24', checked: !mostrarColumnaDia(diaMostrable,24)},
            {label: 'D&iacute;a 25', value: 'd25', checked: !mostrarColumnaDia(diaMostrable,25)},
            {label: 'D&iacute;a 26', value: 'd26', checked: !mostrarColumnaDia(diaMostrable,26)},
            {label: 'D&iacute;a 27', value: 'd27', checked: !mostrarColumnaDia(diaMostrable,27)},
            {label: 'D&iacute;a 28', value: 'd28', checked: !mostrarColumnaDia(diaMostrable,28)},
            {label: 'D&iacute;a 29', value: 'd29', checked: !mostrarColumnaDia(diaMostrable,29)},
            {label: 'D&iacute;a 30', value: 'd30', checked: !mostrarColumnaDia(diaMostrable,30)},
            {label: 'D&iacute;a 31', value: 'd31', checked: !mostrarColumnaDia(diaMostrable,31)},
            {label: '&Uacute;ltimo D&iacute;a', value: 'ultimo_dia', checked: false},
            {label: 'Atrasos', value: 'atrasos', checked: true},
            {label: 'Atrasados', value: 'atrasados', checked: false},
            {label: 'Faltas', value: 'faltas', checked: true},
            {label: 'Abandono', value: 'abandono', checked: true},
            {label: 'Omisi&oacute;n', value: 'omision', checked: true},
            {label: 'LSGH', value: 'lsgh', checked: true},
            {label: 'Marc. Previstas', value: 'agrupador', checked: false},
            {label: 'Descanso', value: 'descanso', checked: false},
            {label: 'Observaci&oacute;n', value: 'observacion', checked: true}
        ];
        $("#divListBoxCalculos").jqxListBox({source: listSource, width: "100%", height: 430, checkboxes: true});
        $("#divListBoxCalculos").on('checkChange', function (event) {
            $("#divGridControlCalculos").jqxGrid('beginupdate');
            if (event.args.checked) {
                $("#divGridControlCalculos").jqxGrid('showcolumn', event.args.value);
            }
            else {
                $("#divGridControlCalculos").jqxGrid('hidecolumn', event.args.value);
            }
            $("#divGridControlCalculos").jqxGrid('endupdate');
        });
    }

    /**
     * Función para saber si esa columna referente a dia se debe mostrar o no
     * @param diaReporte
     * @param dia
     * @returns {boolean}
     */
    function mostrarColumnaDia(diaReporte,dia){
        if(diaReporte===dia)return false;
        else return true;
    }
}
/**
 * Función anónima para enumerar los registros
 * @param row
 * @param columnfield
 * @param value
 * @param defaulthtml
 * @param columnproperties
 * @param rowdata
 * @returns {string}
 */
var rownumberrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
    var nro = row + 1;
    return "<div align='center'>" + nro + "</div>";
}
/**
 * Función para la definición de la columna en función del valor almacenado en la columna.
 * @param row
 * @param column
 * @param value
 * @param defaultHtml
 * @returns {*}
 */
var cellsrenderer = function(row, column, value, defaultHtml) {
    var element = $(defaultHtml);
    element.css({'background-color': value});
    return element[0].outerHTML;
    return defaultHtml;
}