<?php 
/**
* 
*/
require_once('../app/libs/nusoap/nusoap.php');
class NivelestructuralesController extends ControllerBase
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
	}

	public function listAction()
	{
		$resul = Nivelestructurales::find(array('baja_logica=:activo1:','bind'=>array('activo1'=>'1'),'order' => 'id ASC'));
		$this->view->disable();
		foreach ($resul as $v) {
			$customers[] = array(
				'id' => $v->id,
				'orden' => $v->orden,
				'nivel_estructural' => $v->nivel_estructural,
				);
		}
		echo json_encode($customers);
	}

	public function saveAction()
	{
		if (isset($_POST['id'])) {
			if ($_POST['id']>0) {
				$resul = Nivelestructurales::findFirstById($_POST['id']);
				$resul->orden= $_POST['orden'];
				$resul->nivel_estructural = $_POST['nivel_estructural'];
				$resul->save();
			}
			else{
				$resul = new Nivelestructurales();
				$resul->orden= $_POST['orden'];
				$resul->nivel_estructural = $_POST['nivel_estructural'];
				$resul->estado = 1;
				$resul->visible = 1;
				$resul->baja_logica = 1;
				//$resul->save();
				if ($resul->save()) {
					$msm = array('msm' => 'Exito: Se guardo correctamente' );
				}else{
					$msm = array('msm' => 'Error: No se guardo el registro' );
				}
				
		}	
	}
	$this->view->disable();
	echo json_encode($msm);
}

public function deleteAction(){
	$resul = Nivelestructurales::findFirstById($_POST['id']);
	$resul->baja_logica = 0;
	$resul->save();
	$this->view->disable();
	echo json_encode();
}

public function wsclienteAction()
{
	$this->view->disable();
	$servicio="http://localhost/nusoap/suma.php?wsdl"; //url del servicio
	$parametros=array(); //parametros de la llamada
	$var1=1;
	$var2=3;
	$client = new SoapClient($servicio);
	$result = $client->add($var1,$var2);//llamamos al métdo que nos interesa con los parámetros
	echo var_dump($result);
}

public function wsclientearrayAction()
{
	$this->view->disable();
	$servicio="http://localhost/nusoap/datosarray.php?wsdl"; //url del servicio
	$var1='Luis Freddy';
	$client = new SoapClient($servicio);
	echo $result = $client->hello($var1);//llamamos al métdo que nos interesa con los parámetros
	echo "<br>";
	$usuario='fvelasco';
	$pass='sistemas';
	$client = new SoapClient($servicio);
	$result = $client->login($usario,$pass);//llamamos al métdo que nos interesa con los parámetros
	echo var_dump($result);

}

public function wsop1verificaAction()
{
	$this->view->disable();
	$servicio="http://192.168.100.116/wsservicios/wsoperacion1.php?wsdl"; //url del servicio
	$llave="1";
	$var1="psalinas";
	$var2="b6c56905f53fbea5b1acb6f28d4e8d61940b7c99c80b5e765e9762fc069f13f9";
	$client = new SoapClient($servicio);
	$result = $client->verificar($llave,$var1,$var2);//llamamos al métdo que nos interesa con los parámetros
	echo var_dump($result);
}


public function wsop1datosAction()
{
	$this->view->disable();
	$servicio="http://192.168.100.116/wsservicios/wsoperacion1.php?wsdl"; //url del servicio
	$usuario='wquispe';
	$pass='sistemas';
	$client = new SoapClient($servicio);
	$result = $client->getdatos($usuario);//llamamos al métdo que nos interesa con los parámetros
	echo var_dump($result);
	
	
	
}




}
?>