<?php 
/**
* 
*/

class TiposdocumentosController extends ControllerBase
{
	public function initialize() {
		parent::initialize();
	}

	public function indexAction()
	{
		$this->assets
                    ->addCss('/js/datatables/dataTables.bootstrap.css')
                    ->addCss('/js/jqwidgets/styles/jqx.base.css')
                    ->addCss('/js/jqwidgets/styles/jqx.blackberry.css')
                    ->addCss('/js/jqwidgets/styles/jqx.windowsphone.css')
                    ->addCss('/js/jqwidgets/styles/jqx.blackberry.css')
                    ->addCss('/js/jqwidgets/styles/jqx.mobile.css')
                    ->addCss('/js/jqwidgets/styles/jqx.android.css');

        $this->assets
                    ->addJs('/js/jqwidgets/simulator.js')
                    ->addJs('/js/jqwidgets/jqxcore.js')
                    ->addJs('/js/jqwidgets/jqxdata.js')
                    ->addJs('/js/jqwidgets/jqxbuttons.js')
                    ->addJs('/js/jqwidgets/jqxscrollbar.js')
                    ->addJs('/js/jqwidgets/jqxdatatable.js')
                    ->addJs('/js/jqwidgets/jqxlistbox.js')
                    ->addJs('/js/jqwidgets/jqxdropdownlist.js')
                    ->addJs('/js/jqwidgets/jqxpanel.js')
                    ->addJs('/js/jqwidgets/jqxradiobutton.js')
                    ->addJs('/js/jqwidgets/jqxinput.js')
                    ->addJs('/js/datepicker/bootstrap-datepicker.js')
                    ->addJs('/js/datatables/dataTables.bootstrap.js')

                    ->addJs('/js/jqwidgets/jqxmenu.js')
                    ->addJs('/js/jqwidgets/jqxgrid.js')
                    ->addJs('/js/jqwidgets/jqxgrid.filter.js')
                    ->addJs('/js/jqwidgets/jqxgrid.sort.js')
                    ->addJs('/js/jqwidgets/jqxtabs.js')
                    ->addJs('/js/jqwidgets/jqxgrid.selection.js')
                    ->addJs('/js/jqwidgets/jqxcalendar.js')
                    ->addJs('/js/jqwidgets/jqxdatetimeinput.js')
                    ->addJs('/js/jqwidgets/jqxcheckbox.js')
                    ->addJs('/js/jqwidgets/jqxgrid.grouping.js')
                    ->addJs('/js/jqwidgets/jqxgrid.pager.js')
                    ->addJs('/js/jqwidgets/jqxnumberinput.js')
                    ->addJs('/js/jqwidgets/jqxwindow.js')
                    ->addJs('/js/jqwidgets/globalization/globalize.js')
                    ->addJs('/js/jqwidgets/jqxcombobox.js')
                    ->addJs('/js/jqwidgets/jqxexpander.js')
                    ->addJs('/js/jqwidgets/globalization/globalize.js')
                    ->addJs('/js/jqwidgets/jqxvalidator.js')
                    ->addJs('/js/jqwidgets/jqxmaskedinput.js')
                    ->addJs('/js/jqwidgets/jqxchart.js')
                    ->addJs('/js/jqwidgets/jqxgrid.columnsresize.js')
                    ->addJs('/js/jqwidgets/jqxsplitter.js')
                    ->addJs('/js/jqwidgets/jqxtree.js')
                    ->addJs('/js/jqwidgets/jqxdata.export.js')
                    ->addJs('/js/jqwidgets/jqxgrid.export.js')
                    ->addJs('/js/jqwidgets/jqxgrid.edit.js')
                    ->addJs('/js/jqwidgets/jqxnotification.js')
                    ->addJs('/js/jqwidgets/jqxbuttongroup.js')
                    ->addJs('/js/bootbox.js');

		$condicion = Condiciones::find(array('baja_logica=1','order' => 'id ASC'));
		$this->view->setVar('condicion',$condicion);

		$this->tag->setDefault("sexo", 'I');
		$sexo = $this->tag->selectStatic(
        array(
            "sexo",
            array(
                "M" => "Masculino",
                "F"   => "Femenino",
                "I"   => "Independiente al Sexo"
                ),
            'useEmpty' => false,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );
        $this->view->setVar('sexo',$sexo);

        $normativa = $this->tag->select(
			array(
				'tipo_proceso_contratacion',
				Normativasmod::find(array('baja_logica=1',"order"=>"id ASC","columns" => "id,CONCAT(modalidad, ' - ', denominacion) as fullname")),
				//Nivelsalariales::find(array('baja_logica=1','order' => 'id ASC')),
				'using' => array('id', "fullname"),
				'useEmpty' => tue,
				'emptyText' => '(Selecionar)',
				'emptyValue' => '',
				'class' => 'form-control'
				)
			);
        $this->view->setVar('normativa',$normativa);

        $tipo_presentacion = $this->tag->select(
			array(
				'tipopresdoc_id',
				Parametros::find(array('baja_logica=1 and parametro ="tipopresdoc" ','order' => 'nivel ASC')),
				'using' => array('id', "valor_1"),
				'useEmpty' => true,
				'emptyText' => '(Selecionar)',
				'emptyValue' => '',
				'class' => 'form-control',
				)
			);
		$this->view->setVar('tipo_presentacion',$tipo_presentacion);

		$periodo_presentacion = $this->tag->select(
			array(
				'periodopresdoc_id',
				Parametros::find(array('baja_logica=1 and parametro ="periodopresdoc" ','order' => 'nivel ASC')),
				'using' => array('id', "valor_1"),
				'useEmpty' => true,
				'emptyText' => '(Selecionar)',
				'emptyValue' => '',
				'class' => 'form-control',
				)
			);
		$this->view->setVar('periodo_presentacion',$periodo_presentacion);

		$persistencia_solicitud = $this->tag->select(
			array(
				'tipoperssoldoc_id',
				Parametros::find(array('baja_logica=1 and parametro ="tipoperssoldoc" ','order' => 'nivel ASC')),
				'using' => array('id', "valor_1"),
				'useEmpty' => true,
				'emptyText' => '(Selecionar)',
				'emptyValue' => '',
				'class' => 'form-control',
				)
			);
		$this->view->setVar('persistencia_solicitud',$persistencia_solicitud);

		$tipo_emisor = $this->tag->select(
			array(
				'tipoemisordoc_id',
				Parametros::find(array('baja_logica=1 and parametro ="tipoemisordoc" ','order' => 'nivel ASC')),
				'using' => array('id', "valor_1"),
				'useEmpty' => true,
				'emptyText' => '(Selecionar)',
				'emptyValue' => '',
				'class' => 'form-control',
				)
			);
		$this->view->setVar('tipo_emisor',$tipo_emisor);

		$tipo_fecha_emision = $this->tag->select(
			array(
				'tipofechaemidoc_id',
				Parametros::find(array('baja_logica=1 and parametro ="tipofechaemidoc" ','order' => 'nivel ASC')),
				'using' => array('id', "valor_1"),
				'useEmpty' => true,
				'emptyText' => '(Selecionar)',
				'emptyValue' => '',
				'class' => 'form-control',
				)
			);
		$this->view->setVar('tipo_fecha_emision',$tipo_fecha_emision);

		$grupo_archivo = $this->tag->select(
			array(
				'grupoarchivos_id',
				Parametros::find(array('baja_logica=1 and parametro ="grupoarchivos" ','order' => 'nivel ASC')),
				'using' => array('id', "valor_1"),
				'useEmpty' => true,
				'emptyText' => '(Selecionar)',
				'emptyValue' => '',
				'class' => 'form-control',
				)
			);
		$this->view->setVar('grupo_archivo',$grupo_archivo);

		$tipo_dato = array(
                "numeric" => "Numerico",
                "string"   => "Texto",
                "date" => "Fecha",
                "boolean" => "Logico"
        );

        $tipo_dato_campo_aux_a = $this->tag->selectStatic(
        array(
            "tipo_dato_campo_aux_a",
            $tipo_dato,
            'useEmpty' => true,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );
        $this->view->setVar('tipo_dato_campo_aux_a',$tipo_dato_campo_aux_a);

        $tipo_dato_campo_aux_b = $this->tag->selectStatic(
        array(
            "tipo_dato_campo_aux_b",
            $tipo_dato,
            'useEmpty' => true,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );
        $this->view->setVar('tipo_dato_campo_aux_b',$tipo_dato_campo_aux_b);

        $tipo_dato_campo_aux_c = $this->tag->selectStatic(
        array(
            "tipo_dato_campo_aux_c",
            $tipo_dato,
            'useEmpty' => true,
            'emptyText' => '(Selecionar)',
            'emptyValue' => '',
            'class' => 'form-control',
            )
        );
        $this->view->setVar('tipo_dato_campo_aux_c',$tipo_dato_campo_aux_c);

	}

	public function listAction()
	{
		$resul = Tiposdocumentos::find(array('baja_logica=1','order' => 'id ASC'));
		$this->view->disable();
		foreach ($resul as $v) {
			$customers[] = array(
			'id' =>$v->id, 
            'tipo_documento' => $v->tipo_documento, 
            'codigo' => $v->codigo, 
            'tipopresdoc_id' => $v->tipopresdoc_id, 
            'periodopresdoc_id' => $v->periodopresdoc_id, 
            'tipoemisordoc_id' => $v->tipoemisordoc_id, 
            'tipofechaemidoc_id' => $v->tipofechaemidoc_id, 
            'tipoperssoldoc_id' => $v->tipoperssoldoc_id, 
            'ruta_carpeta' => $v->ruta_carpeta, 
            'nombre_carpeta' => $v->nombre_carpeta, 
            'formato_archivo_digital' => $v->formato_archivo_digital, 
            'resolucion_archivo_digital' => $v->resolucion_archivo_digital, 
            'altura_archivo_digital' => $v->altura_archivo_digital, 
            'anchura_archivo_digital' => $v->anchura_archivo_digital, 
            'campo_aux_a' => $v->campo_aux_a, 
            'tipo_dato_campo_aux_a' => $v->tipo_dato_campo_aux_a, 
            'campo_aux_b' => $v->campo_aux_b, 
            'tipo_dato_campo_aux_b' => $v->tipo_dato_campo_aux_b, 
            'campo_aux_c' => $v->campo_aux_c, 
            'tipo_dato_campo_aux_c' => $v->tipo_dato_campo_aux_c, 
            'observacion' => $v->observacion, 
            'estado' => $v->estado, 
            'baja_logica' => $v->baja_logica, 
            'agrupador' => $v->agrupador,
            'user_reg_id' => $v->user_reg_id,
            'fecha_reg' => $v->fecha_reg,
            'user_mod_id' => $v->user_mod_id,
            'fecha_mod' => $v->fecha_mod,
            'grupoarchivos_id' => $v->grupoarchivos_id,
            'sexo' => $v->sexo,
            'tipo_proceso_contratacion' => $v->tipo_proceso_contratacion
				);
		}
		echo json_encode($customers);
	}

// 	public function saveAction()
// 	{
// 		if (isset($_POST['id'])) {
// 			if ($_POST['id']>0) {
// 				$resul = Nivelestructurales::findFirstById($_POST['id']);
// 				$resul->orden= $_POST['orden'];
// 				$resul->nivel_estructural = $_POST['nivel_estructural'];
// 				$resul->save();
// 			}
// 			else{
// 				$resul = new Nivelestructurales();
// 				$resul->orden= $_POST['orden'];
// 				$resul->nivel_estructural = $_POST['nivel_estructural'];
// 				$resul->estado = 1;
// 				$resul->visible = 1;
// 				$resul->baja_logica = 1;
// 				//$resul->save();
// 				if ($resul->save()) {
// 					$msm = array('msm' => 'Exito: Se guardo correctamente' );
// 				}else{
// 					$msm = array('msm' => 'Error: No se guardo el registro' );
// 				}
				
// 		}	
// 	}
// 	$this->view->disable();
// 	echo json_encode($msm);
// }

// public function deleteAction(){
// 	$resul = Nivelestructurales::findFirstById($_POST['id']);
// 	$resul->baja_logica = 0;
// 	$resul->save();
// 	$this->view->disable();
// 	echo json_encode();
// }

}
?>