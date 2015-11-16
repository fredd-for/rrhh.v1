<?php
/*
*   Oasis - Sistema de Gestión para Recursos Humanos
*   Empresa Estatal de Transporte por Cable "Mi Teleférico"
*   Versión:  1.0.0
*   Usuario Creador: Lic. Javier Loza
*   Fecha Creación:  02-03-2015
*/

class ControlexcepcionesController extends ControllerBase
{
    public function initialize()
    {
        parent::initialize();
    }
    /**
     * Función para la carga de la página de gestión de relaciones laborales.
     * Se cargan los combos necesarios.
     */
    public function indexAction()
    {
        $this->assets->addCss('/assets/css/bootstrap-switch.css');
        $this->assets->addJs('/js/switch/bootstrap-switch.js');
        $this->assets->addCss('/assets/css/oasis.principal.css');
        $this->assets->addCss('/assets/css/jquery-ui.css');
        $this->assets->addCss('/css/oasis.grillas.css');
        $this->assets->addJs('/js/numeric/jquery.numeric.js');
        $this->assets->addJs('/js/jquery.PrintArea.js');
        $this->assets->addCss('/assets/css/PrintArea.css');

        $this->assets->addCss('/assets/css/clockpicker.css');
        $this->assets->addJs('/js/clockpicker/clockpicker.js');

        $this->assets->addJs('/js/controlexcepciones/oasis.controlexcepciones.tab.js');
        $this->assets->addJs('/js/controlexcepciones/oasis.controlexcepciones.index.js');
        $this->assets->addJs('/js/controlexcepciones/oasis.controlexcepciones.list.js');
        $this->assets->addJs('/js/controlexcepciones/oasis.controlexcepciones.approve.js');
        $this->assets->addJs('/js/controlexcepciones/oasis.controlexcepciones.new.edit.js');
        $this->assets->addJs('/js/controlexcepciones/oasis.controlexcepciones.turns.excepts.js');
        $this->assets->addJs('/js/controlexcepciones/oasis.controlexcepciones.down.js');
        $this->assets->addJs('/js/controlexcepciones/oasis.controlexcepciones.move.js');
        $this->assets->addJs('/js/controlexcepciones/oasis.controlexcepciones.export.js');
        $this->assets->addJs('/js/controlexcepciones/oasis.controlexcepciones.export.form.js');
        $this->assets->addJs('/js/controlexcepciones/oasis.controlexcepciones.view.js');
        $this->assets->addJs('/js/controlexcepciones/oasis.controlexcepciones.view.splitter.js');
    }
    /**
     * Función para la obtención del listado de registros de control de excepciones.
     * La diferencia con el método del controlador ControlexcepcionesController es que en este listado no debiera mostrarse
     * a las excepciones que corresponde boleta.
     * Autor: JLM
     */
    public function listporrelaboralAction()
    {
        $this->view->disable();
        $obj = new Fcontrolexcepciones();
        $controlexcepciones = Array();
        $idRelaboral=0;
        $data=array();
        if(isset($_GET["id"])){
            $idRelaboral = $_GET["id"];
            $where = "";
            $pagenum = $_GET['pagenum'];
            $pagesize = $_GET['pagesize'];
            $total_rows=0;
            $start = $pagenum * $pagesize;

            // filter data.
            if (isset($_GET['filterscount'])) {
                $filterscount = $_GET['filterscount'];

                if ($filterscount > 0) {
                    $where = " WHERE (";
                    $tmpdatafield = "";
                    $tmpfilteroperator = "";
                    for ($i = 0; $i < $filterscount; $i++) {
                        // get the filter's value.
                        $filtervalue = $_GET["filtervalue" . $i];
                        // get the filter's condition.
                        $filtercondition = $_GET["filtercondition" . $i];
                        // get the filter's column.
                        $filterdatafield = $_GET["filterdatafield" . $i];
                        // get the filter's operator.
                        $filteroperator = $_GET["filteroperator" . $i];

                        if ($tmpdatafield == "") {
                            $tmpdatafield = $filterdatafield;
                        } else if ($tmpdatafield <> $filterdatafield) {
                            $where .= ")AND(";
                        } else if ($tmpdatafield == $filterdatafield) {
                            if ($tmpfilteroperator == 0) {
                                $where .= " AND ";
                            } else
                                $where .= " OR ";
                        }

                        // build the "WHERE" clause depending on the filter's condition, value and datafield.
                        switch ($filtercondition) {
                            case "NOT_EMPTY":
                            case "NOT_NULL":
                                $where .= " " . $filterdatafield . " NOT LIKE '" . "" . "'";
                                break;
                            case "EMPTY":
                            case "NULL":
                                $where .= " " . $filterdatafield . " LIKE '" . "" . "'";
                                break;
                            case "CONTAINS_CASE_SENSITIVE":
                                $where .= " BINARY  " . $filterdatafield . " LIKE '%" . $filtervalue . "%'";
                                break;
                            case "CONTAINS":
                                $where .= " " . $filterdatafield . " LIKE '%" . $filtervalue . "%'";
                                break;
                            case "DOES_NOT_CONTAIN_CASE_SENSITIVE":
                                $where .= " BINARY " . $filterdatafield . " NOT LIKE '%" . $filtervalue . "%'";
                                break;
                            case "DOES_NOT_CONTAIN":
                                $where .= " " . $filterdatafield . " NOT LIKE '%" . $filtervalue . "%'";
                                break;
                            case "EQUAL_CASE_SENSITIVE":
                                $where .= " BINARY " . $filterdatafield . " = '" . $filtervalue . "'";
                                break;
                            case "EQUAL":
                                $where .= " " . $filterdatafield . " = '" . $filtervalue . "'";
                                break;
                            case "NOT_EQUAL_CASE_SENSITIVE":
                                $where .= " BINARY " . $filterdatafield . " <> '" . $filtervalue . "'";
                                break;
                            case "NOT_EQUAL":
                                $where .= " " . $filterdatafield . " <> '" . $filtervalue . "'";
                                break;
                            case "GREATER_THAN":
                                $where .= " " . $filterdatafield . " > '" . $filtervalue . "'";
                                break;
                            case "LESS_THAN":
                                $where .= " " . $filterdatafield . " < '" . $filtervalue . "'";
                                break;
                            case "GREATER_THAN_OR_EQUAL":
                                $where .= " " . $filterdatafield . " >= '" . $filtervalue . "'";
                                break;
                            case "LESS_THAN_OR_EQUAL":
                                $where .= " " . $filterdatafield . " <= '" . $filtervalue . "'";
                                break;
                            case "STARTS_WITH_CASE_SENSITIVE":
                                $where .= " BINARY " . $filterdatafield . " LIKE '" . $filtervalue . "%'";
                                break;
                            case "STARTS_WITH":
                                $where .= " " . $filterdatafield . " LIKE '" . $filtervalue . "%'";
                                break;
                            case "ENDS_WITH_CASE_SENSITIVE":
                                $where .= " BINARY " . $filterdatafield . " LIKE '%" . $filtervalue . "'";
                                break;
                            case "ENDS_WITH":
                                $where .= " " . $filterdatafield . " LIKE '%" . $filtervalue . "'";
                                break;
                        }

                        if ($i == $filterscount - 1) {
                            $where .= ")";
                        }

                        $tmpfilteroperator = $filteroperator;
                        $tmpdatafield = $filterdatafield;
                    }
                }
            }
            if($idRelaboral>0){
                $resul = $obj->getAllByOneRelaboral($idRelaboral,$where,"",$start,$pagesize);
                //comprobamos si hay filas
                if (count($resul) > 0) {
                    $cex = Controlexcepciones::find(array("relaboral_id = ".$idRelaboral." AND baja_logica=1"));
                    $total_rows = $cex->count();
                    foreach ($resul as $v) {
                        $controlexcepciones[] = array(
                            'nro_row' => 0,
                            'id'=>$v->id_controlexcepcion,
                            'id_relaboral'=>$v->id_relaboral,
                            'fecha_ini' => $v->fecha_ini != "" ? date("d-m-Y", strtotime($v->fecha_ini)) : "",
                            'hora_ini'=>$v->hora_ini,
                            'fecha_fin' => $v->fecha_fin != "" ? date("d-m-Y", strtotime($v->fecha_fin)) : "",
                            'hora_fin'=>$v->hora_fin,
                            'justificacion'=>$v->justificacion,
                            'turno'=>$v->turno,
                            'turno_descripcion'=>$v->compensatoria==1?$v->turno!=null?$v->turno."°":null:null,
                            'entrada_salida'=>$v->entrada_salida,
                            'entrada_salida_descripcion'=>$v->compensatoria==1?$v->entrada_salida==0?"ENTRADA":"SALIDA":null,
                            'controlexcepcion_observacion'=>$v->controlexcepcion_observacion,
                            'controlexcepcion_estado'=>$v->controlexcepcion_estado,
                            'controlexcepcion_estado_descripcion'=>$v->controlexcepcion_estado_descripcion,
                            'controlexcepcion_user_reg_id'=>$v->controlexcepcion_user_reg_id,
                            'controlexcepcion_user_registrador'=>$v->controlexcepcion_user_registrador,
                            'controlexcepcion_fecha_reg'=>$v->controlexcepcion_fecha_reg != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_reg)) : "",
                            'controlexcepcion_user_ver_id'=>$v->controlexcepcion_user_ver_id,
                            'controlexcepcion_user_verificador'=>$v->controlexcepcion_user_verificador,
                            'controlexcepcion_fecha_ver'=>$v->controlexcepcion_fecha_ver != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_ver)) : "",
                            'controlexcepcion_user_apr_id'=>$v->controlexcepcion_user_apr_id,
                            'controlexcepcion_user_aprobador'=>$v->controlexcepcion_user_aprobador,
                            'controlexcepcion_fecha_apr'=>$v->controlexcepcion_fecha_apr != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_apr)) : "",
                            'controlexcepcion_user_mod_id'=>$v->controlexcepcion_user_mod_id,
                            'controlexcepcion_user_modificador'=>$v->controlexcepcion_user_modificador,
                            'controlexcepcion_fecha_mod'=>$v->controlexcepcion_fecha_mod != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_mod)) : "",
                            /*'excepcion_id'=>$v->id_excepcion,*/
                            'excepcion_id'=>$v->excepcion_id,
                            'excepcion'=>$v->excepcion,
                            'tipoexcepcion_id'=>$v->tipoexcepcion_id,
                            'tipo_excepcion'=>$v->tipo_excepcion,
                            'codigo'=>$v->codigo,
                            'color'=>$v->color,
                            'compensatoria'=>$v->compensatoria,
                            'compensatoria_descripcion'=>$v->compensatoria_descripcion,
                            'genero_id'=>$v->genero_id,
                            'genero'=>$v->genero,
                            'cantidad'=>$v->cantidad,
                            'unidad'=>$v->unidad,
                            'fraccionamiento'=>$v->fraccionamiento,
                            'frecuencia_descripcion'=>$v->frecuencia_descripcion,
                            'redondeo'=>$v->redondeo,
                            'redondeo_descripcion'=>$v->redondeo_descripcion,
                            'horario'=>$v->horario,
                            'horario_descripcion'=>$v->horario_descripcion,
                            'refrigerio'=>$v->refrigerio,
                            'refrigerio_descripcion'=>$v->refrigerio_descripcion,
                            'observacion'=>$v->observacion,
                            'estado'=>$v->estado,
                            'estado_descripcion'=>$v->estado_descripcion,
                            'baja_logica'=>$v->baja_logica,
                            'agrupador'=>$v->agrupador,
                            'boleta'=>$v->agrupador,
                            'boleta_descripcion'=>$v->agrupador==1?"SI":"NO",
                            'user_reg_id'=>$v->user_reg_id,
                            'fecha_reg'=>$v->fecha_reg,
                            'user_mod_id'=>$v->user_mod_id,
                            'fecha_mod'=>$v->fecha_mod
                        );
                    }
                }
            }
            $data[] = array(
                'TotalRows' => $total_rows,
                'Rows' => $controlexcepciones
            );
        }
        echo json_encode($data);
    }
    /**
     * Función para la obtención del listado de registros de control de excepciones.
     * Autor: JLM
     */
    public function listporrelaboraloldAction()
    {
        $this->view->disable();
        $controlexcepciones = Array();
        if(isset($_GET["id"])&&$_GET["id"]>0){
            $obj = new Fcontrolexcepciones();
            $idRelaboral = $_GET["id"];
            $resul = $obj->getAllByOneRelaboral($idRelaboral);
            //comprobamos si hay filas
            if ($resul->count() > 0) {
                foreach ($resul as $v) {
                    $controlexcepciones[] = array(
                        'nro_row' => 0,
                        'id'=>$v->id_controlexcepcion,
                        'id_relaboral'=>$v->id_relaboral,
                        'fecha_ini' => $v->fecha_ini != "" ? date("d-m-Y", strtotime($v->fecha_ini)) : "",
                        'hora_ini'=>$v->hora_ini,
                        'fecha_fin' => $v->fecha_fin != "" ? date("d-m-Y", strtotime($v->fecha_fin)) : "",
                        'hora_fin'=>$v->hora_fin,
                        'justificacion'=>$v->justificacion,
                        'turno'=>$v->turno,
                        'turno_descripcion'=>$v->compensatoria==1?$v->turno!=null?$v->turno."°":null:null,
                        'entrada_salida'=>$v->entrada_salida,
                        'entrada_salida_descripcion'=>$v->compensatoria==1?$v->entrada_salida==0?"ENTRADA":"SALIDA":null,
                        'controlexcepcion_observacion'=>$v->controlexcepcion_observacion,
                        'controlexcepcion_estado'=>$v->controlexcepcion_estado,
                        'controlexcepcion_estado_descripcion'=>$v->controlexcepcion_estado_descripcion,
                        'controlexcepcion_user_reg_id'=>$v->controlexcepcion_user_reg_id,
                        'controlexcepcion_user_registrador'=>$v->controlexcepcion_user_registrador,
                        'controlexcepcion_fecha_reg'=>$v->controlexcepcion_fecha_reg != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_reg)) : "",
                        'controlexcepcion_user_ver_id'=>$v->controlexcepcion_user_ver_id,
                        'controlexcepcion_user_verificador'=>$v->controlexcepcion_user_verificador,
                        'controlexcepcion_fecha_ver'=>$v->controlexcepcion_fecha_ver != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_ver)) : "",
                        'controlexcepcion_user_apr_id'=>$v->controlexcepcion_user_apr_id,
                        'controlexcepcion_user_aprobador'=>$v->controlexcepcion_user_aprobador,
                        'controlexcepcion_fecha_apr'=>$v->controlexcepcion_fecha_apr != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_apr)) : "",
                        'controlexcepcion_user_mod_id'=>$v->controlexcepcion_user_mod_id,
                        'controlexcepcion_user_modificador'=>$v->controlexcepcion_user_modificador,
                        'controlexcepcion_fecha_mod'=>$v->controlexcepcion_fecha_mod != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_mod)) : "",
                        'excepcion_id'=>$v->excepcion_id,
                        'excepcion'=>$v->excepcion,
                        'tipoexcepcion_id'=>$v->tipoexcepcion_id,
                        'tipo_excepcion'=>$v->tipo_excepcion,
                        'codigo'=>$v->codigo,
                        'color'=>$v->color,
                        'compensatoria'=>$v->compensatoria,
                        'compensatoria_descripcion'=>$v->compensatoria_descripcion,
                        'genero_id'=>$v->genero_id,
                        'genero'=>$v->genero,
                        'cantidad'=>$v->cantidad,
                        'unidad'=>$v->unidad,
                        'fraccionamiento'=>$v->fraccionamiento,
                        'frecuencia_descripcion'=>$v->frecuencia_descripcion,
                        'redondeo'=>$v->redondeo,
                        'redondeo_descripcion'=>$v->redondeo_descripcion,
                        'horario'=>$v->horario,
                        'horario_descripcion'=>$v->horario_descripcion,
                        'refrigerio'=>$v->refrigerio,
                        'refrigerio_descripcion'=>$v->refrigerio_descripcion,
                        'observacion'=>$v->observacion,
                        'estado'=>$v->estado,
                        'estado_descripcion'=>$v->estado_descripcion,
                        'baja_logica'=>$v->baja_logica,
                        'agrupador'=>$v->agrupador,
                        'user_reg_id'=>$v->user_reg_id,
                        'fecha_reg'=>$v->fecha_reg,
                        'user_mod_id'=>$v->user_mod_id,
                        'fecha_mod'=>$v->fecha_mod,
                    );
                }
            }
        }
        echo json_encode($controlexcepciones);
    }

    /**
     * Función para la obtención del listado de controles de excepción para un registro de relación laboral considerando un rango de fechas.
     * El resultado repite registro de acuerdo a cada fecha dentro del rango de fechas.
     */
    public function listporrelaboralyrangoAction()
    {
        $this->view->disable();
        $controlexcepciones = Array();
        if(isset($_POST["id_relaboral"])&&$_POST["id_relaboral"]>0&&isset($_POST["fecha_ini"])&&isset($_POST["fecha_fin"])){
            $obj = new Fcontrolexcepciones();
            $idRelaboral = $_POST["id_relaboral"];
            $fechaIni = $_POST["fecha_ini"];
            $fechaFin = $_POST["fecha_fin"];
            $resul = $obj->getAllByRelaboralAndRange($idRelaboral,$fechaIni,$fechaFin);
            //comprobamos si hay filas
            if ($resul->count() > 0) {
                foreach ($resul as $v) {
                    $controlexcepciones[] = array(
                        'nro_row' => 0,
                        'id'=>$v->id_controlexcepcion,
                        'id_relaboral'=>$v->id_relaboral,
                        'fecha_ini'=>$v->fecha_ini,
                        'hora_ini'=>$v->hora_ini,
                        'fecha_fin'=>$v->fecha_fin,
                        'hora_fin'=>$v->hora_fin,
                        'justificacion'=>$v->justificacion,
                        'controlexcepcion_observacion'=>$v->controlexcepcion_observacion,
                        'controlexcepcion_estado'=>$v->controlexcepcion_estado,
                        'controlexcepcion_estado_descripcion'=>$v->controlexcepcion_estado_descripcion,
                        'controlexcepcion_user_reg_id'=>$v->controlexcepcion_user_reg_id,
                        'controlexcepcion_user_registrador'=>$v->controlexcepcion_user_registrador,
                        'controlexcepcion_fecha_reg'=>$v->controlexcepcion_fecha_reg != "" ? date("Y-m-d H:i:s", strtotime($v->controlexcepcion_fecha_reg)) : "",
                        'controlexcepcion_user_ver_id'=>$v->controlexcepcion_user_ver_id,
                        'controlexcepcion_user_verificador'=>$v->controlexcepcion_user_verificador,
                        'controlexcepcion_fecha_ver'=>$v->controlexcepcion_fecha_ver != "" ? date("Y-m-d H:i:s", strtotime($v->controlexcepcion_fecha_ver)) : "",
                        'controlexcepcion_user_apr_id'=>$v->controlexcepcion_user_apr_id,
                        'controlexcepcion_user_aprobador'=>$v->controlexcepcion_user_aprobador,
                        'controlexcepcion_fecha_apr'=>$v->controlexcepcion_fecha_apr != "" ? date("Y-m-d H:i:s", strtotime($v->controlexcepcion_fecha_apr)) : "",
                        'controlexcepcion_user_mod_id'=>$v->controlexcepcion_user_mod_id,
                        'controlexcepcion_user_modificador'=>$v->controlexcepcion_user_modificador,
                        'controlexcepcion_fecha_mod'=>$v->controlexcepcion_fecha_mod != "" ? date("Y-m-d H:i:s", strtotime($v->controlexcepcion_fecha_mod)) : "",
                        'excepcion_id'=>$v->excepcion_id,
                        'excepcion'=>$v->excepcion,
                        'tipoexcepcion_id'=>$v->tipoexcepcion_id,
                        'tipo_excepcion'=>$v->tipo_excepcion,
                        'codigo'=>$v->codigo,
                        'color'=>$v->color,
                        'compensatoria'=>$v->compensatoria,
                        'compensatoria_descripcion'=>$v->compensatoria_descripcion,
                        'genero_id'=>$v->genero_id,
                        'genero'=>$v->genero,
                        'cantidad'=>$v->cantidad,
                        'unidad'=>$v->unidad,
                        'fraccionamiento'=>$v->fraccionamiento,
                        'frecuencia_descripcion'=>$v->frecuencia_descripcion,
                        'redondeo'=>$v->redondeo,
                        'redondeo_descripcion'=>$v->redondeo_descripcion,
                        'horario'=>$v->horario,
                        'horario_descripcion'=>$v->horario_descripcion,
                        'refrigerio'=>$v->refrigerio,
                        'refrigerio_descripcion'=>$v->refrigerio_descripcion,
                        'observacion'=>$v->observacion,
                        'estado'=>$v->estado,
                        'estado_descripcion'=>$v->estado_descripcion,
                        'baja_logica'=>$v->baja_logica,
                        'agrupador'=>$v->agrupador,
                        'user_reg_id'=>$v->user_reg_id,
                        'fecha_reg'=>$v->fecha_reg != "" ? date("Y-m-d", strtotime($v->fecha_reg)) : "",
                        'user_mod_id'=>$v->user_mod_id,
                        'fecha_mod'=>$v->fecha_mod,
                        'fecha' => $v->fecha != "" ? date("Y-m-d", strtotime($v->fecha)) : "",
                        'dia'=>$v->dia,
                        'dia_nombre'=>$v->dia_nombre,
                        'dia_nombre_abr_ing'=>$v->dia_nombre_abr_ing
                    );
                }
            }
        }
        echo json_encode($controlexcepciones);
    }
    /**
     * Función para el almacenamiento y actualización de un registro de Control de Excepción.
     * return array(EstadoResultado,Mensaje)
     * Los valores posibles para la variable EstadoResultado son:
     *  0: Error
     *   1: Procesado
     *  -1: Crítico Error
     *  -2: Error de Conexión
     *  -3: Usuario no Autorizado
     */
    public function saveAction()
    {
        $auth = $this->session->get('auth');
        $user_reg_id = $user_mod_id = $auth['id'];
        $msj = Array();
        $hoy = date("Y-m-d H:i:s");
        $this->view->disable();
        if (isset($_POST["id"]) && $_POST["id"] > 0) {
            /**
             * Modificación de registro de Feriado
             */
            $idRelaboral = $_POST['relaboral_id'];
            $idExcepcion = $_POST['excepcion_id'];
            $fechaIni = $_POST['fecha_ini'];
            $arrFechaIni = explode("-",$fechaIni);
            $gestionFechaIni = $arrFechaIni[2];
            $horaIni = $_POST['hora_ini'];
            $fechaFin = $_POST['fecha_fin'];
            $horaFin = $_POST['hora_fin'];
            $justificacion = $_POST['justificacion'];
            $turno = $_POST['turno'];
            $entradaSalida = $_POST['entrada_salida'];
            $horario = $_POST['horario'];
            $observacion = $_POST['observacion'];
            if($idRelaboral>0&&$idExcepcion>0&&$fechaIni!=''&&$fechaFin!=''&&$justificacion!=''){
                $objControlExcepciones = Controlexcepciones::findFirst(array("id=".$_POST["id"]));
                if(count($objControlExcepciones)>0){
                    if($horario==1)
                        $cantMismosDatos = Controlexcepciones::count(array("id!=".$_POST["id"]." AND relaboral_id=".$idRelaboral." AND excepcion_id = ".$idExcepcion." AND fecha_ini='".$fechaIni."' AND hora_ini='".$horaIni."' AND fecha_fin = '".$fechaFin."' AND hora_fin='".$horaFin."' AND baja_logica=1 AND estado>=0"));
                    else
                        $cantMismosDatos = Controlexcepciones::count(array("id!=".$_POST["id"]." AND relaboral_id=".$idRelaboral." AND excepcion_id = ".$idExcepcion." AND fecha_ini='".$fechaIni."' AND fecha_fin = '".$fechaFin."' AND baja_logica=1 AND estado>=0"));
                    if($cantMismosDatos==0){
                        if($horario==0){
                            $datetimeIni = new DateTime();
                            $datetimeIni->setTime(0,0, 0);
                            $datetimeIni->format('H:i:s');
                            $horaIni = $datetimeIni->format('H:i:s');
                            $datetimeFin = new DateTime();
                            $datetimeFin->setTime(23,59,59);
                            $datetimeFin->format('H:i:s');
                            $horaFin = $datetimeFin->format('H:i:s');
                        }
                        $objControlExcepciones->relaboral_id = $idRelaboral;
                        $objControlExcepciones->excepcion_id = $idExcepcion;
                        $objControlExcepciones->fecha_ini = $fechaIni;
                        $objControlExcepciones->fecha_fin = $fechaFin;
                        $objControlExcepciones->hora_ini = $horaIni;
                        $objControlExcepciones->hora_fin = $horaFin;
                        $objControlExcepciones->justificacion=$justificacion;
                        if($turno>0){
                            $objControlExcepciones->turno=$turno;
                        }else $objControlExcepciones->turno=null;
                        if($entradaSalida>=0){
                            $objControlExcepciones->entrada_salida=$entradaSalida;
                        }else $objControlExcepciones->entrada_salida=null;
                        $objControlExcepciones->observacion=$observacion;
                        $objControlExcepciones->user_mod_id=$user_mod_id;
                        $objControlExcepciones->fecha_mod=$hoy;
                        try{
                            $ok = $objControlExcepciones->save();
                            if ($ok)  {
                                $correlativo = Controlexcepcionescorrelativo::findFirst(array("excepcion_id=".$objControlExcepciones->id." AND baja_logica=1"));
                                if(!is_object($correlativo)){
                                    /**
                                     * Es necesario crear el correlativo del formulario de excepcíon.
                                     */
                                    $correlativo = new Controlexcepcionescorrelativo();
                                    $correlativo->controlexcepcion_id =$objControlExcepciones->id;
                                    $correlativo->gestion=$gestionFechaIni;

                                    $maximo = Controlexcepcionescorrelativo::maximum(
                                        array(
                                            "column"     => "numero",
                                            "conditions" => "gestion=".$gestionFechaIni." AND baja_logica=1"
                                        )
                                    );
                                    /**
                                     * Ver como hacerlo rápido
                                     */
                                    $correlativo->numero=$maximo+1;
                                    $correlativo->estado=1;
                                    $correlativo->baja_logica=1;
                                    $correlativo->estado=1;
                                    $okc = $correlativo->save();
                                    if($okc){
                                        $msj = array('result' => 1, 'msj' => '&Eacute;xito: Se modific&oacute; correctamente el registro del control de excepci&oacute;n. ');
                                    }else{
                                        $msj = array('result' => 1, 'msj' => '&Eacute;xito: Se modific&oacute; correctamente el registro del control de excepci&oacute;n. Sin embargo, el correlativo no.');
                                    }
                                }  else $msj = array('result' => 1, 'msj' => '&Eacute;xito: Se modific&oacute; correctamente el registro del control de excepci&oacute;n. ');
                            } else {
                                $msj = array('result' => 0, 'msj' => 'Error: No se modific&oacute; el registro del control de excepci&oacute;n.');
                            }
                        }catch (\Exception $e) {
                            echo get_class($e), ": ", $e->getMessage(), "\n";
                            echo " File=", $e->getFile(), "\n";
                            echo " Line=", $e->getLine(), "\n";
                            echo $e->getTraceAsString();
                            $msj = array('result' => -1, 'msj' => 'Error cr&iacute;tico: No se guard&oacute; el registro del control de excepci&oacute;n.');
                        }
                    }else $msj = array('result' => 0, 'msj' => 'Error: Los datos enviados son similares a otro registro existente, debe modificar los valores necesariamente.');
                }
            }else{
                $msj = array('result' => 0, 'msj' => 'Error: Los datos enviados no cumplen los criterios necesarios para su registro.');
            }
        }else{
            /**
             * Registro de Control de Excepción
             */
            $idRelaboral = $_POST['relaboral_id'];
            $idExcepcion = $_POST['excepcion_id'];
            $fechaIni = $_POST['fecha_ini'];
            $arrFechaIni = explode("-",$fechaIni);
            $gestionFechaIni = $arrFechaIni[2];
            $horaIni = $_POST['hora_ini'];
            $fechaFin = $_POST['fecha_fin'];
            $horaFin = $_POST['hora_fin'];
            $justificacion = $_POST['justificacion'];
            $turno = $_POST['turno'];
            $entradaSalida = $_POST['entrada_salida'];
            $horario = $_POST['horario'];
            $observacion = $_POST['observacion'];
            if($idRelaboral>0&&$idExcepcion>0&&$fechaIni!=''&&$fechaFin!=''&&$justificacion!=''){
                if($horario==1)
                    $cantMismosDatos = Controlexcepciones::count(array("relaboral_id=".$idRelaboral." AND excepcion_id = ".$idExcepcion." AND fecha_ini='".$fechaIni."' AND hora_ini='".$horaIni."' AND fecha_fin = '".$fechaFin."' AND hora_fin='".$horaFin."' AND baja_logica=1 AND estado>=0"));
                else
                    $cantMismosDatos = Controlexcepciones::count(array("relaboral_id=".$idRelaboral." AND excepcion_id = ".$idExcepcion." AND fecha_ini='".$fechaIni."' AND fecha_fin = '".$fechaFin."' AND baja_logica=1 AND estado>=0"));
                if($cantMismosDatos==0){
                    if($horario==0){
                        $datetimeIni = new DateTime();
                        $datetimeIni->setTime(0,0, 0);
                        $datetimeIni->format('H:i:s');
                        $horaIni = $datetimeIni->format('H:i:s');
                        $datetimeFin = new DateTime();
                        $datetimeFin->setTime(23,59,59);
                        $datetimeFin->format('H:i:s');
                        $horaFin = $datetimeFin->format('H:i:s');
                    }
                    $objControlExcepciones = new Controlexcepciones();
                    $objControlExcepciones->relaboral_id = $idRelaboral;
                    $objControlExcepciones->excepcion_id = $idExcepcion;
                    $objControlExcepciones->fecha_ini = $fechaIni;
                    $objControlExcepciones->fecha_fin = $fechaFin;
                    $objControlExcepciones->hora_ini = $horaIni;
                    $objControlExcepciones->hora_fin = $horaFin;
                    $objControlExcepciones->justificacion=$justificacion;
                    if($turno>0){
                        $objControlExcepciones->turno=$turno;
                    }else $objControlExcepciones->turno=null;
                    if($entradaSalida>=0){
                        $objControlExcepciones->entrada_salida=$entradaSalida;
                    }else $objControlExcepciones->entrada_salida=null;
                    $objControlExcepciones->observacion=$observacion;
                    $objControlExcepciones->estado=2;
                    $objControlExcepciones->baja_logica=1;
                    $objControlExcepciones->agrupador=0;
                    $objControlExcepciones->user_reg_id=$user_reg_id;
                    $objControlExcepciones->fecha_reg=$hoy;
                    try{
                        $ok = $objControlExcepciones->save();
                        if ($ok)  {

                            /**
                             * Es necesario crear el correlativo del formulario de excepcíon.
                             */
                            $correlativo = new Controlexcepcionescorrelativo();
                            $correlativo->controlexcepcion_id =$objControlExcepciones->id;
                            $correlativo->gestion=$gestionFechaIni;

                            $maximo = Controlexcepcionescorrelativo::maximum(
                                array(
                                    "column"     => "numero",
                                    "conditions" => "gestion=".$gestionFechaIni." AND baja_logica=1"
                                )
                            );
                            /**
                             * Ver como hacerlo rápido
                             */
                            $correlativo->numero=($maximo+1);
                            $correlativo->estado=1;
                            $correlativo->baja_logica=1;
                            $correlativo->agrupador=1;
                            $okc = $correlativo->save();
                            if($okc){
                                $msj = array('result' => 1, 'msj' => '&Eacute;xito: Se guard&oacute; correctamente.');
                            }else{
                                $msj = array('result' => 0, 'msj' => '&Eacute;xito: Se guard&oacute; correctamente. Sin embargo, el correlativo no.');
                            }
                        } else {
                            $msj = array('result' => 0, 'msj' => 'Error: No se registr&oacute;.');
                        }
                    }catch (\Exception $e) {
                        echo get_class($e), ": ", $e->getMessage(), "\n";
                        echo " File=", $e->getFile(), "\n";
                        echo " Line=", $e->getLine(), "\n";
                        echo $e->getTraceAsString();
                        $msj = array('result' => -1, 'msj' => 'Error cr&iacute;tico: No se guard&oacute; el registro del control de excepci&oacute;n.');
                    }
                }    else{
                    $msj = array('result' => 0, 'msj' => 'Error: Existe registro de control de excepci&oacute;n con datos similares.');
                }
            }else{
                $msj = array('result' => 0, 'msj' => 'Error: Los datos enviados no cumplen los criterios necesarios para su registro.');
            }
        }
        echo json_encode($msj);
    }
    /*
     * Función para la aprobación del registro de un control de excepción.
     */
    public function approveAction()
    {
        $auth = $this->session->get('auth');
        $user_mod_id = $auth['id'];
        $msj = Array();
        $hoy = date("Y-m-d H:i:s");
        $this->view->disable();
        if (isset($_POST["id"]) && $_POST["id"] > 0) {
            /**
             * Aprobación de registro
             */
            $objControlExcepciones = Controlexcepciones::findFirstById($_POST["id"]);
            if ($objControlExcepciones->id > 0 && $objControlExcepciones->estado == 2) {
                try {
                    $objControlExcepciones->estado = 4;
                    $objControlExcepciones->user_mod_id = $user_mod_id;
                    $objControlExcepciones->user_apr_id = $user_mod_id;
                    $objControlExcepciones->fecha_mod = $hoy;
                    $objControlExcepciones->fecha_apr = $hoy;
                    $ok = $objControlExcepciones->save();
                    if ($ok) {
                        $msj = array('result' => 1, 'msj' => '&Eacute;xito: Se aprob&oacute; correctamente el registro del control de  excepci&oacute;n.');
                    } else {
                        $msj = array('result' => 0, 'msj' => 'Error: No se aprob&oacute; el registro de control de excepci&oacute;n.');
                    }
                } catch (\Exception $e) {
                    echo get_class($e), ": ", $e->getMessage(), "\n";
                    echo " File=", $e->getFile(), "\n";
                    echo " Line=", $e->getLine(), "\n";
                    echo $e->getTraceAsString();
                    $msj = array('result' => -1, 'msj' => 'Error cr&iacute;tico: No se guard&oacute; el registro del control de excepci&oacute;n.');
                }
            } else {
                $msj = array('result' => 0, 'msj' => 'Error: El registro de control de excepci&oacute;n no cumple con el requisito establecido para su aprobaci&oacute;n, debe estar en estado EN PROCESO.');
            }
        } else {
            $msj = array('result' => -1, 'msj' => 'Error cr&iacute;tico: No se envi&oacute; el identificador del registro del control de excepci&oacute;n.');
        }
        echo json_encode($msj);
    }
    /**
     * Función para la exportación  del formulario de control de excepción.
     * @param $id_controlexcepcion
     */
    public function exportformpdfAction($id_controlexcepcion)
    {   $this->view->disable();
        $id_controlexcepcion = base64_decode(str_pad(strtr($id_controlexcepcion, '-_', '+/'), strlen($id_controlexcepcion) % 4, '=', STR_PAD_RIGHT));
        $id_controlexcepcion = json_decode($id_controlexcepcion, true);
        $pdf = new pdfoasis('P', 'mm', 'Letter');
        $pdf->alignTitleSelecteds=array("C","C","C");
        $pdf->pageWidth = 215.9;
        $pdf->debug = 0;
        if($pdf->debug==1){
            echo "<p>id_controlexcepcion: ".$id_controlexcepcion;
        }
        $pdf->title_rpt = utf8_decode('FORMULARIO DE PERMISOS');
        $pdf->title_total_rpt = utf8_decode('Cuadro Resumen de Datos Marcaciones');
        $pdf->header_title_empresa_rpt = utf8_decode('Empresa Estatal de Transporte por Cable "Mi Teleférico"');
        $pdf->AddPage();
        $objA = new Fcontrolexcepciones();
        $objCE = $objA->getOne($id_controlexcepcion);
        $objCorr = Controlexcepcionescorrelativo::findFirst(array("controlexcepcion_id=".$id_controlexcepcion));
        $tempDir = "files/";
        if($pdf->debug==0){
            if(is_object($objCE)){
                $objB = new Frelaborales();
                $objR = $objB->getOneRelaboralConsiderandoUltimaMovilidad($objCE->id_relaboral);
                if(is_object($objR)){
                    /*$pdf->crearCodigoConDatosQR($tempDir,$objR,$objCE,$objCorr);*/
                    $pdf->crearCodigoConUrlQR($tempDir,$objR,$objCE,$objCorr);
                    $pdf->Body($tempDir,$objR,$objCE,$objCorr);
                }
            }}
        $pdf->FechaHoraReporte = date("d-m-Y H:i:s");
        $pdf->ShowLeftFooter = true;
        if($pdf->debug==0)$pdf->Output('form_controlexcepcion.pdf','I');
    }
    /**
     * Función para el la baja del registro de un control de excepción.
     * return array(EstadoResultado,Mensaje)
     * Los valores posibles para la variable EstadoResultado son:
     *  0: Error
     *   1: Procesado
     *  -1: Crítico Error
     *  -2: Error de Conexión
     *  -3: Usuario no Autorizado
     */
    public function downAction()
    {
        $auth = $this->session->get('auth');
        $user_mod_id = $auth['id'];
        $msj = Array();
        $hoy = date("Y-m-d H:i:s");
        $this->view->disable();
        try {
            if (isset($_POST["id"]) && $_POST["id"] > 0) {
                /**
                 * Baja de registro
                 */
                $objControlExcepciones = Controlexcepciones::findFirstById($_POST["id"]);
                $objControlExcepciones->estado = 0;
                $objControlExcepciones->baja_logica = 0;
                $objControlExcepciones->user_mod_id = $user_mod_id;
                $objControlExcepciones->fecha_mod = $hoy;
                if ($objControlExcepciones->save()) {
                    $msj = array('result' => 1, 'msj' => '&Eacute;xito: Registro de Baja realizado de modo satisfactorio.');
                } else {
                    foreach ($objControlExcepciones->getMessages() as $message) {
                        echo $message, "\n";
                    }
                    $msj = array('result' => -1, 'msj' => 'Error cr&iacute;tico: No se pudo dar de baja al registro de la excepci&oacute;n.');
                }
            } else $msj = array('result' => -1, 'msj' => 'Error cr&iacute;tico: No se efectu&oacute; la baja debido a que no se especific&oacute; el registro de la excepci&oacute;n.');
        } catch (\Exception $e) {
            echo get_class($e), ": ", $e->getMessage(), "\n";
            echo " File=", $e->getFile(), "\n";
            echo " Line=", $e->getLine(), "\n";
            echo $e->getTraceAsString();
            $msj = array('result' => -1, 'msj' => 'Error cr&iacute;tico: No se guard&oacute; el registro del control de excepci&oacute;n.');
        }
        echo json_encode($msj);
    }
    /**
     * Función para la verificación del cruce entre las excepciones registradas para un persona y adicionalmente
     * el control de la aplicabilidad del otorgamiento del permiso controlando que la frecuencia de uso no exceda lo permitido.
     */
    public function verificacruceexcesousoAction(){
        $auth = $this->session->get('auth');
        $user_mod_id = $auth['id'];
        $msj = Array();
        $hoy = date("Y-m-d H:i:s");
        $this->view->disable();
        $id = $_POST['id'];
        $idRelaboral = $_POST['relaboral_id'];
        $idExcepcion = $_POST['excepcion_id'];
        $fechaIni = $_POST['fecha_ini'];
        $horaIni = $_POST['hora_ini'];
        $fechaFin = $_POST['fecha_fin'];
        $horaFin = $_POST['hora_fin'];
        $horario = $_POST['horario'];
        $justificacion = $_POST['justificacion'];
        if($idRelaboral>0&&$idExcepcion>0&&$fechaIni!=''&&$fechaFin!=''&&$justificacion!=''){
            /**
             * Se realiza la verificación sobre el cruce de horarios y fechas de los controles de excepción existentes y la que se intenta registrar o modificar.
             */
            /*$objControlExcepciones = Controlexcepciones::findFirstById($_POST["id"]);
            if ($objControlExcepciones->id > 0 && $objControlExcepciones->estado == 2) {
                try {
                    $objControlExcepciones->estado = 1;
                    $objControlExcepciones->user_mod_id = $user_mod_id;
                    $objControlExcepciones->fecha_mod = $hoy;
                    $ok = $objControlExcepciones->save();
                    if ($ok) {
                        $msj = array('result' => 1, 'msj' => '&Eacute;xito: Se aprob&oacute; correctamente el registro del control de  excepci&oacute;n.');
                    } else {
                        $msj = array('result' => 0, 'msj' => 'Error: No se aprob&oacute; el registro de control de excepci&oacute;n.');
                    }
                } catch (\Exception $e) {
                    echo get_class($e), ": ", $e->getMessage(), "\n";
                    echo " File=", $e->getFile(), "\n";
                    echo " Line=", $e->getLine(), "\n";
                    echo $e->getTraceAsString();
                    $msj = array('result' => -1, 'msj' => 'Error cr&iacute;tico: No se guard&oacute; el registro del control de excepci&oacute;n.');
                }
            } else {
                $msj = array('result' => 0, 'msj' => 'Error: El registro de control de excepci&oacute;n no cumple con el requisito establecido para su aprobaci&oacute;n, debe estar en estado EN PROCESO.');
            }*/
            $msj = array('result' => 0, 'msj' => 'No existe cruce de horarios ni fechas.');
        } else {
            $msj = array('result' => -1, 'msj' => 'Error cr&iacute;tico: No se envi&oacute; el identificador del registro del control de excepci&oacute;n.');
        }
        echo json_encode($msj);
    }

    /**
     * Función para el registro de un determinado tipo de permiso para un perfil laboral en particular.
     */
    public function savemassivebyperfilAction()
    {
        $auth = $this->session->get('auth');
        $user_reg_id = $auth['id'];
        $msj = Array();
        $this->view->disable();
        if (isset($_POST["id"]) && $_POST["id"] > 0){
            /**
             * Registro del Control de Excepción masivo
             */
            $idPerfilLaboral = $_POST['id'];
            $idExcepcion = $_POST['excepcion_id'];
            $fechaIni = $_POST['fecha_ini'];
            $horaIni = $_POST['hora_ini'];
            $fechaFin = $_POST['fecha_fin'];
            $horaFin = $_POST['hora_fin'];
            $estado = 4;
            $justificacion = $_POST['justificacion'];
            $observacion = $_POST['observacion'];
            if($idPerfilLaboral>0&&$idExcepcion>0&&$fechaIni!=''&&$horaIni!=''&&$fechaFin!=''&&$horaFin!=''&&$justificacion!=''){
                    try{
                        $obj = new Controlexcepciones();
                        $ok = $obj->registroMasivoPorPerfil($idPerfilLaboral,$fechaIni,$horaIni,$fechaFin,$horaFin,$justificacion,$observacion,$estado,$user_reg_id);
                        if ($ok)  {
                            $msj = array('result' => 1, 'msj' => '&Eacute;xito: Se realiz&oacute; correctamente el registro masivo.');
                        } else {
                            $msj = array('result' => 0, 'msj' => 'Error: No se registr&oacute;.');
                        }
                    }catch (\Exception $e) {
                        echo get_class($e), ": ", $e->getMessage(), "\n";
                        echo " File=", $e->getFile(), "\n";
                        echo " Line=", $e->getLine(), "\n";
                        echo $e->getTraceAsString();
                        $msj = array('result' => -1, 'msj' => 'Error cr&iacute;tico: No se guard&oacute; el registro del control de excepci&oacute;n masivo.');
                    }

            }else{
                $msj = array('result' => 0, 'msj' => 'Error: Los datos enviados no cumplen los criterios necesarios para su registro.');
            }
        }
        echo json_encode($msj);
    }

    /**
     * Función para verificar si aún no se ha sobrepasado la frecuencia admitida de registros en el sistema.
     */
    public function verificafrecuenciaAction(){
        $msj= array();
        $this->view->disable();
        //,$idExcepcion,$idControlExcepcion,$fechaIni,$fechaFin
        $idRelaboral = $_POST["id_relaboral"];
        $idExcepcion = $_POST["id_excepcion"];
        $idControlExcepcion = $_POST["id_controlexcepcion"];
        $fechaIni = $_POST["fecha_ini"];
        $horaIni = $_POST["hora_ini"];
        $fechaFin = $_POST["fecha_fin"];
        $horaFin = $_POST["hora_fin"];
        $horario = $_POST["horario"];
        $cantidadSolicitada=0;
        $cantidadAdmitida=0;
        $cantidadUnidades=0;
        $fechaInicioOperacionesMiTeleferico = "23-04-2014";
        $gestionA=0;
        $mesA=0;
        $gestionB=0;
        $mesB=0;
        $semestre=0;
        $cantidadRegistrada=0;
        $fechaIniRango="";
        $fechaFinRango="";
        $rangoFechas = "";
        $objFe = new Fexcepciones();
        if($idExcepcion>0){
            $objE = $objFe->getOne($idExcepcion);
            if(is_object($objE)){
                /**
                 * Si el registro de excepción implica el control de frecuencia.
                 */
                if($objE->cantidad>0){

                    $arrA = explode("-",$fechaIni);
                    if(count($arrA)>0){
                        $gestionA=$arrA[2];
                        $mesA = $arrA[1];
                    }
                    $arrB = explode("-",$fechaFin);
                    if(count($arrA)>0){
                        $gestionB=$arrB[2];
                        $mesB = $arrB[1];
                    }
                    $cantidadAdmitida=$objE->cantidad;
                    switch($objE->unidad){
                        case "VEZ":
                            $cantidadSolicitada=1;
                                switch($objE->fraccionamiento){
                                    case "HORA":
                                        /**
                                         * Cuantas veces se registro en la hora.
                                         * Control no efectuado debido a que no existe ni se prevé la existencia de este tipo de frecuencia para las boletas.
                                         * Por ello se inhabilita su registro.
                                         */
                                        $cantidadTotal=-1;
                                        break;
                                    case "DIA":
                                        /**
                                         * Cuantas veces se registro en el día
                                         */
                                        if($fechaIni==$fechaFin){
                                            $fechaIniRango = $fechaIni;
                                            $fechaFinRango = $fechaFin;
                                            $rangoFechas = $fechaIniRango." AL ".$fechaIniRango;
                                            $cantidadRegistrada = $objFe->calculaCantidadVecesEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaIniRango);
                                            $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                        }else{
                                            /**
                                             * En caso de que se quiera registrar más de un día con el mismo permiso, hay que revisar fecha por fecha
                                             */
                                            $arrFechas = $objFe->listadoFechasPorRango($fechaIni,$fechaFin);
                                            if(count($arrFechas)>0){
                                                foreach($arrFechas as $fecha){
                                                    $fechaIniRango=date("d-m-Y", strtotime($fecha->fecha));
                                                    $fechaFinRango=date("d-m-Y", strtotime($fecha->fecha));
                                                    $cantidadRegistrada = $objFe->calculaCantidadVecesEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaIniRango);
                                                    $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                                    $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                                    if($cantidadTotal>$cantidadAdmitida){
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    break;
                                    case "SEMANA":
                                        /**
                                         * Cuantas veces se registró en la semana
                                         */
                                        $rangoFechas = $objFe->obtieneRangoFechasDeLaSemana(1,$fechaIni);
                                        if(is_object($rangoFechas)){
                                            $fechaIniRango = date("d-m-Y", strtotime($rangoFechas->fecha_ini));
                                            $fechaFinRango = date("d-m-Y", strtotime($rangoFechas->fecha_fin));
                                            $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                        }
                                        $cantidadRegistrada = $objFe->calculaCantidadVecesEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                        $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                        break;
                                    case "MES":
                                        /**
                                         * Cuantas veces se registró en el mes
                                         */
                                        $fechaIniRango="01-".$mesA."-".$gestionA;
                                        $fechaFin = $objFe->obtieneUltimoDiaMes($gestionA,$mesA);
                                        if($fechaFin!=null){
                                            $fechaFinRango=date("d-m-Y", strtotime($fechaFin));
                                            $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                        }
                                        $cantidadRegistradaPM = $objFe->calculaCantidadVecesEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                        $cantidadRegistradaSM=0;
                                        /**
                                         * Considerando que las fechas de la solicitud consideren dos meses contiguos
                                         */
                                        if($mesA!=$mesB){
                                            $fechaIniRango="01-".$mesB."-".$gestionB;
                                            $fechaFin = $objFe->obtieneUltimoDiaMes($gestionB,$mesB);
                                            if($fechaFin!=null){
                                                $fechaFinRango=date("d-m-Y", strtotime($fechaFin));
                                                $rangoFechas .= " y del ".$fechaIniRango." AL ".$fechaFinRango;
                                            }
                                            $cantidadRegistradaPM = $objFe->calculaCantidadVecesEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                            $cantidadAdmitida = $cantidadAdmitida*2;
                                        }
                                        $cantidadRegistrada =$cantidadRegistradaPM+$cantidadRegistradaSM;
                                        $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                        break;
                                    case "SEMESTRE":
                                        /**
                                         * Cuantas veces se registró en el semestre
                                         */
                                        $semestreA = $objFe->semestrePerteneciente($fechaIni);
                                        $semestreB = $objFe->semestrePerteneciente($fechaFin);
                                        if($semestreA==$semestreB){
                                            /**
                                             * Si la fecha de inicio y la de finalización están en un sólo semestre
                                             */
                                            if($semestreA==1){
                                                $fechaIniRango="01-01-".$gestionA;
                                                $fechaFinRango="30-06-".$gestionA;
                                            }else{
                                                $fechaIniRango="01-07-".$gestionA;
                                                $fechaFinRango="31-12-".$gestionA;
                                            }
                                            $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                            $cantidadRegistrada = $objFe->calculaCantidadVecesEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                        }else{
                                            /**
                                             * La fecha de inicio y de finalización están en los dos semestres
                                             */
                                            $fechaIniRango="01-01-".$gestionA;
                                            $fechaFinRango="30-06-".$gestionA;
                                            $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                            $cantidadRegistradaPS = $objFe->calculaCantidadVecesEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                            $fechaIniRango="01-07-".$gestionA;
                                            $fechaFinRango="31-12-".$gestionA;
                                            $rangoFechas .= " y del ".$fechaIniRango." AL ".$fechaFinRango;
                                            $cantidadRegistradaSS = $objFe->calculaCantidadVecesEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                            $cantidadRegistrada = $cantidadRegistradaPS + $cantidadRegistradaSS;
                                            $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                            $cantidadAdmitida=$cantidadAdmitida*2;
                                        }
                                        $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                        break;
                                    case "AÑO":
                                        /**
                                         * Cuantas veces se registró en el año
                                         */
                                        $fechaIniRango="01-01-".$gestionA;
                                        $fechaFinRango="31-12-".$gestionA;
                                        $cantidadRegistrada = $objFe->calculaCantidadVecesEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                        $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                        $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                        break;
                                    default:
                                        /**
                                         * Cuantas veces se registró en el año
                                         */
                                        $fechaIniRango=$fechaInicioOperacionesMiTeleferico;
                                        $fechaFinRango = date("d-m-Y");
                                        $cantidadRegistrada = $objFe->calculaCantidadVecesEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                        $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                        $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                        break;

                                }
                            break;
                        case "MINUTO":
                            $fechaIniRango = $fechaIni;
                            $fechaFinRango = $fechaFin;
                            $arrDias = $objFe->listadoFechasPorRango($fechaIni,$fechaFin);
                            if(count($arrDias)>0) {
                                $cantidadMinutosSolicitadosPorDia = $objFe->cantidadHorasEntreDosHoras($horaIni,$horaFin)*60;
                                $cantidadMinutosSolicitadosPorDia = round($cantidadMinutosSolicitadosPorDia,0);
                                $cantidadSolicitada = $cantidadMinutosSolicitadosPorDia * count($arrDias);
                            }
                            switch($objE->fraccionamiento){
                                case "HORA":
                                    $cantidadTotal=-2;
                                    break;
                                case "DIA":
                                    /**
                                     * Cantidad de minutos al día
                                     */
                                    $arrDias = $objFe->listadoFechasPorRango($fechaIni,$fechaFin);
                                    if(count($arrDias)>0) {
                                        foreach($arrDias as $fecha){
                                            $cantidadRegistradaPorDia = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,date("d-m-Y", strtotime($fecha->fecha)),date("d-m-Y", strtotime($fecha->fecha)))*60;
                                            $cantidadRegistradaPorDia = round($cantidadRegistradaPorDia,0);
                                            $cantidadTotalPorDia = $cantidadMinutosSolicitadosPorDia+$cantidadRegistradaPorDia;
                                            $cantidadTotal=0;
                                            if($cantidadTotalPorDia>$cantidadAdmitida){
                                                $rangoFechas = date("d-m-Y", strtotime($fecha->fecha));
                                                $cantidadTotal = $cantidadTotalPorDia;
                                                $cantidadRegistrada=$cantidadRegistradaPorDia;
                                                break;
                                            }
                                        }
                                    }
                                    break;
                                case "SEMANA":
                                    /**
                                     * Cuantas minutos se registró en la semana
                                     */
                                    $rangoFechas = $objFe->obtieneRangoSemanasPorRangoFechas(1,$fechaIni,$fechaFin);
                                    if(is_object($rangoFechas)){
                                        foreach($rangoFechas as $fecha){
                                            $fechaIniRango=date("d-m-Y", strtotime($fecha->fecha_ini));
                                            $fechaFinRango=date("d-m-Y", strtotime($fecha->fecha_fin));
                                            $cantidadRegistradaPorSemana = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango)*60;
                                            $cantidadRegistradaPorSemana=round($cantidadRegistradaPorSemana,0);

                                            $arrDias = $objFe->listadoFechasPorRango($fechaIniRango,$fechaFinRango);
                                            if(count($arrDias)>0) {
                                                $cantidadMinutosPorDia = $objFe->cantidadHorasEntreDosHoras($horaIni,$horaFin)*60;
                                                $cantidadSolicitadaPorSemana =round($cantidadMinutosPorDia,0) * count($arrDias);
                                                $cantidadTotalPorSemana = $cantidadSolicitadaPorSemana+$cantidadRegistradaPorSemana;
                                                if($cantidadTotalPorSemana>$cantidadAdmitida){
                                                    $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                                    $cantidadTotal = $cantidadTotalPorSemana;
                                                    $cantidadRegistrada=$cantidadRegistradaPorSemana;
                                                    break;
                                                }
                                            }
                                        }

                                    }

                                    $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                    break;
                                /**
                                 * Falta Controlar desde acá -->
                                 */
                                case "MES":
                                    $cantidadTotal=0;
                                    $fechaIniRango=date("d-m-Y", strtotime($fechaIni));
                                    $fechaFinRango=date("d-m-Y", strtotime($fechaFin));
                                    $arrFechasMeses = $objFe->listadoMesesCompletosInvolucradosEnRango($fechaIni,$fechaFin);
                                    if(count($arrFechasMeses)>0){
                                        foreach($arrFechasMeses as $fecha){
                                            $fechaIniRangoMes=date("d-m-Y", strtotime($fecha->fecha_ini));
                                            $fechaFinRangoMes=date("d-m-Y", strtotime($fecha->fecha_fin));
                                            $cantidadRegistradaPorMes = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRangoMes,$fechaFinRangoMes)*60;
                                            $cantidadRegistradaPorMes = round($cantidadRegistradaPorMes,0);
                                            $fechaIniRangoCalculo=$fechaIniRangoMes;
                                            if($fechaIniRangoMes<date("d-m-Y", strtotime($fechaIniRango))){
                                               $fechaIniRangoCalculo = $fechaIniRango;
                                            }
                                            $fechaFinRangoCalculo=$fechaFinRangoMes;
                                            if($fechaFinRangoMes>date("d-m-Y", strtotime($fechaFinRango))){
                                                $fechaFinRangoCalculo = $fechaFinRango;
                                            }
                                            $arrDiasCalculo = $objFe->listadoFechasPorRango($fechaIniRangoCalculo,$fechaFinRangoCalculo);
                                            $cantidadSolicitadaPorMes =round($cantidadMinutosSolicitadosPorDia,0) * count($arrDiasCalculo);
                                            $cantidadTotalPorMes = $cantidadSolicitadaPorMes+$cantidadRegistradaPorMes;
                                            if($cantidadTotalPorMes>$cantidadAdmitida){
                                                $rangoFechas = $fechaIniRangoCalculo." AL ".$fechaFinRangoCalculo;
                                                $cantidadTotal = $cantidadTotalPorMes;
                                                $cantidadRegistrada=$cantidadRegistradaPorMes;
                                                break;
                                            }
                                        }
                                    }else{
                                        $cantidadTotal=-4;
                                    }
                                    break;
                                case "SEMESTRE":
                                    if($gestionA==$gestionB){
                                        /**
                                         * Cuantas veces se registró en el semestre
                                         */
                                        $semestreA = $objFe->semestrePerteneciente($fechaIniRango);
                                        $semestreB = $objFe->semestrePerteneciente($fechaFinRango);
                                        if($semestreA==$semestreB){
                                            /**
                                             * Si la fecha de inicio y la de finalización están en un sólo semestre y en la misma gestión
                                             */
                                            if($semestreA==1){
                                                $fechaIniRangoSemestre="01-01-".$gestionA;
                                                $fechaFinRangoSemestre="30-06-".$gestionA;
                                            }else{
                                                $fechaIniRangoSemestre="01-07-".$gestionA;
                                                $fechaFinRangoSemestre="31-12-".$gestionA;
                                            }
                                            $rangoFechas = $fechaIniRangoSemestre." AL ".$fechaFinRangoSemestre;
                                            $cantidadRegistrada = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRangoSemestre,$fechaFinRangoSemestre)*60;
                                            $cantidadRegistrada=round($cantidadRegistrada,0);


                                            $fechaIniRangoCalculo=$fechaIniRangoSemestre;
                                            if($fechaIniRangoSemestre<date("d-m-Y", strtotime($fechaIniRango))){
                                                $fechaIniRangoCalculo = $fechaIniRango;
                                            }
                                            $fechaFinRangoCalculo=$fechaFinRangoSemestre;
                                            if($fechaFinRangoSemestre>date("d-m-Y", strtotime($fechaFinRango))){
                                                $fechaFinRangoCalculo = $fechaFinRango;
                                            }
                                            $arrDiasCalculo = $objFe->listadoFechasPorRango($fechaIniRangoCalculo,$fechaFinRangoCalculo);
                                            $cantidadSolicitada =round($cantidadMinutosSolicitadosPorDia,0) * count($arrDiasCalculo);
                                            $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;

                                        }else{
                                            /**
                                             * La fecha de inicio y de finalización están en los dos semestres pero en la misma gestión
                                             */
                                            $cantidadSolicitada = $objFe->cantidadHorasEntreDosHoras($horaIni,$horaFin)*60;
                                            $cantidadSolicitada = round($cantidadSolicitada,0);
                                            $fechaIniRangoPS="01-01-".$gestionA;
                                            $fechaFinRangoPS="30-06-".$gestionA;
                                            $rangoFechasPS = $fechaIniRangoPS." AL ".$fechaFinRangoPS;
                                            $arrDiasPS = $objFe->listadoFechasPorRango($fechaIniRangoPS,$fechaFinRangoPS);
                                            if(count($arrDiasPS)>0) {
                                                $arrDiasSolicitadosPS = $objFe->listadoFechasPorRango($fechaIni,$fechaFinRangoPS);
                                                $cantidadSolicitadaPS = round($cantidadMinutosSolicitadosPorDia,0) * count($arrDiasSolicitadosPS);
                                                $cantidadRegistradaPS = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRangoPS,$fechaFinRangoPS)*60;
                                                $cantidadRegistradaPS=round($cantidadRegistradaPS,0);
                                            }
                                            $fechaIniRangoSS="01-07-".$gestionA;
                                            $fechaFinRangoSS=$fechaFinRango;
                                            $rangoFechasSS = $fechaIniRangoSS." AL ".$fechaFinRangoSS;
                                            $arrDiasSS = $objFe->listadoFechasPorRango($fechaIniRangoSS,$fechaFinRangoSS);
                                            if(count($arrDiasSS)>0) {
                                                $cantidadSolicitadaSS = $cantidadSolicitada * count($arrDiasSS);
                                                $cantidadRegistradaSS = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRangoSS,$fechaFinRangoSS)*60;
                                                $cantidadRegistradaSS=round($cantidadRegistradaSS,0);
                                            }
                                            $cantidadRegistrada = $cantidadRegistradaPS + $cantidadRegistradaSS;
                                            $cantidadTotalPS = $cantidadSolicitadaPS+$cantidadRegistradaPS;
                                            $cantidadTotalSS = $cantidadSolicitadaSS+$cantidadRegistradaSS;
                                            $cantidadTotal=0;
                                            if($cantidadTotalPS>$objE->cantidad){
                                                $cantidadTotal =$cantidadTotalPS;
                                                $cantidadSolicitada = $cantidadSolicitadaPS;
                                                $rangoFechas=$rangoFechasPS;
                                            }
                                            if($cantidadTotalSS>$objE->cantidad){
                                                $cantidadTotal =$cantidadTotalSS;
                                                $cantidadSolicitada = $cantidadSolicitadaSS;
                                                $rangoFechas=$rangoFechasSS;
                                            }
                                        }
                                    }else{
                                        $cantidadTotal=-4;
                                    }
                                    break;
                                case "AÑO":
                                    /**
                                     * Cuantas horas se registró en el año
                                     */
                                    if($gestionA==$gestionB){
                                        $fechaIniRango="01-01-".$gestionA;
                                        $fechaFinRango="31-12-".$gestionA;
                                        $cantidadRegistrada = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango)*60;
                                        $cantidadRegistrada=round($cantidadRegistrada,  0);
                                        $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;

                                        $arrDiasCalculo = $objFe->listadoFechasPorRango($fechaIni,$fechaFin);
                                        $cantidadSolicitada =round($cantidadMinutosSolicitadosPorDia,0) * count($arrDiasCalculo);
                                        $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                    }else $cantidadTotal=-4;
                                    break;
                                default:
                                    /**
                                     * Cuantas horas se registró en el año
                                     */
                                    $fechaIniRango=$fechaInicioOperacionesMiTeleferico;
                                    $fechaFinRango = date("d-m-Y");
                                    $cantidadRegistrada = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango)*60;
                                    $cantidadRegistrada=round($cantidadRegistrada,  0);
                                    $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;

                                    $arrDiasCalculo = $objFe->listadoFechasPorRango($fechaIni,$fechaFin);
                                    $cantidadSolicitada =round($cantidadMinutosSolicitadosPorDia,0) * count($arrDiasCalculo);
                                    $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                    break;
                            }
                            break;
                        case "HORA":
                            $fechaIniRango = $fechaIni;
                            $fechaFinRango = $fechaFin;
                            $arrDias = $objFe->listadoFechasPorRango($fechaIni,$fechaFin);
                                if(count($arrDias)>0) {
                                    $cantidadSolicitada = $objFe->cantidadHorasEntreDosHoras($horaIni,$horaFin);
                                    $cantidadSolicitada =$cantidadSolicitada * count($arrDias);
                                }
                                switch($objE->fraccionamiento){
                                    case "DIA":
                                        $arrDias = $objFe->listadoFechasPorRango($fechaIni,$fechaFin);
                                        if(count($arrDias)>0) {
                                            foreach($arrDias as $fecha){
                                                $cantidadRegistrada += $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fecha->fecha,$fecha->fecha);
                                            }
                                        }
                                        $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                        $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                        break;
                                    case "SEMANA":
                                        /**
                                         * Cuantas veces se registró en la semana
                                         */
                                        $rangoFechas = $objFe->obtieneRangoFechasDeLaSemana(1,$fechaIni);
                                        if(is_object($rangoFechas)){
                                            $fechaIniRango = date("d-m-Y", strtotime($rangoFechas->fecha_ini));
                                            $fechaFinRango = date("d-m-Y", strtotime($rangoFechas->fecha_fin));
                                            foreach($rangoFechas as $fecha){
                                                $cantidadRegistrada += $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fecha->fecha_ini,$fecha->fecha_fin);
                                            }
                                        }
                                        $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                        $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;

                                        break;
                                    case "MES":
                                        $fechaIniRango="01-".$mesA."-".$gestionA;
                                        $fechaFin = $objFe->obtieneUltimoDiaMes($gestionB,$mesB);
                                        $fechaFinRango=date("d-m-Y", strtotime($fechaFin));
                                        $arrFechasMeses = $objFe->listadoMesesCompletosInvolucradosEnRango($fechaIni,$fechaFinRango);
                                        if(count($arrFechasMeses)>0){
                                            foreach($arrFechasMeses as $fecha){
                                                $cantidadRegistrada += $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fecha->fecha_ini,$fecha->fecha_fin);
                                            }
                                        }
                                        $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                        $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                        break;
                                    case "SEMESTRE":
                                        if($gestionA==$gestionB){
                                            /**
                                             * Cuantas veces se registró en el semestre
                                             */
                                            $semestreA = $objFe->semestrePerteneciente($fechaIniRango);
                                            $semestreB = $objFe->semestrePerteneciente($fechaFinRango);
                                            if($semestreA==$semestreB){
                                                /**
                                                 * Si la fecha de inicio y la de finalización están en un sólo semestre y en la misma gestión
                                                 */
                                                if($semestreA==1){
                                                    $fechaIniRango="01-01-".$gestionA;
                                                    $fechaFinRango="30-06-".$gestionA;
                                                }else{
                                                    $fechaIniRango="01-07-".$gestionA;
                                                    $fechaFinRango="31-12-".$gestionA;
                                                }
                                                $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                                $cantidadRegistrada = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                                $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                            }else{
                                                /**
                                                 * La fecha de inicio y de finalización están en los dos semestres pero en la misma gestión
                                                 */

                                                    $fechaIniRangoPS=$fechaIniRango;
                                                    $fechaFinRangoPS="30-06-".$gestionA;
                                                    $rangoFechas = $fechaIniRangoPS." AL ".$fechaFinRangoPS;
                                                    $arrDiasPS = $objFe->listadoFechasPorRango($fechaIniRangoPS,$fechaFinRangoPS);
                                                    if(count($arrDiasPS)>0) {
                                                        $cantidadSolicitada = $objFe->cantidadHorasEntreDosHoras($horaIni,$horaFin);
                                                        $cantidadSolicitadaPS = $cantidadSolicitada * count($arrDiasPS);
                                                        $cantidadRegistradaPS = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRangoPS,$fechaFinRangoPS);
                                                    }

                                                    $fechaIniRangoSS="01-07-".$gestionA;
                                                    $fechaFinRangoSS=$fechaFinRango;
                                                    $rangoFechas .= " y del ".$fechaIniRangoSS." AL ".$fechaFinRangoSS;
                                                    $arrDiasSS = $objFe->listadoFechasPorRango($fechaIniRangoSS,$fechaFinRangoSS);
                                                    if(count($arrDiasSS)>0) {
                                                        $cantidadSolicitada = $objFe->cantidadHorasEntreDosHoras($horaIni,$horaFin);
                                                        $cantidadSolicitadaSS = $cantidadSolicitada * count($arrDiasSS);
                                                        $cantidadRegistradaSS = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRangoSS,$fechaFinRangoSS);
                                                    }
                                                    $cantidadRegistrada = $cantidadRegistradaPS + $cantidadRegistradaSS;

                                                    $cantidadTotalPS = $cantidadSolicitadaPS+$cantidadRegistradaPS;
                                                    $cantidadTotalSS = $cantidadSolicitadaSS+$cantidadRegistradaSS;
                                                    $cantidadTotal=0;
                                                    if($cantidadTotalPS>$objE->cantidad){
                                                        $cantidadTotal =$cantidadTotalPS;
                                                    }
                                                    if($cantidadTotalSS>$objE->cantidad){
                                                        $cantidadTotal =$cantidadTotalSS;
                                                    }
                                            }
                                        }else{
                                            $cantidadTotal=-4;
                                        }
                                        break;
                                    case "AÑO":
                                        /**
                                         * Cuantas horas se registró en el año
                                         */
                                        if($gestionA==$gestionB){
                                            $fechaIniRango="01-01-".$gestionA;
                                            $fechaFinRango="31-12-".$gestionA;
                                            $cantidadRegistrada = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                            $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                            $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                        }else $cantidadTotal=-4;
                                        break;
                                    default:
                                        /**
                                         * Cuantas horas se registró en todos los años de Mi Teleférico hasta la fecha
                                         */
                                            $fechaIniRango=$fechaInicioOperacionesMiTeleferico;
                                            $fechaFinRango = date("d-m-Y");
                                            $cantidadRegistrada = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                            $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                            $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                        break;

                                }
                            break;
                        case "DIA":
                            $arrDias = $objFe->listadoFechasPorRango($fechaIni,$fechaFin);
                            if(count($arrDias)>0){
                                $cantidadSolicitada=count($arrDias);
                                switch($objE->fraccionamiento){
                                    case "SEMANA":
                                        /**
                                         * Cuantas veces se registró en la semana
                                         */
                                        $rangoFechas = $objFe->obtieneRangoFechasDeLaSemana(1,$fechaIni);
                                        if(is_object($rangoFechas)){
                                            $fechaIniRango = date("d-m-Y", strtotime($rangoFechas->fecha_ini));
                                            $fechaFinRango = date("d-m-Y", strtotime($rangoFechas->fecha_fin));
                                            $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                        }
                                        $cantidadRegistrada = $objFe->calculaCantidadDiasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                        $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                        break;
                                    case "MES":
                                        $fechaIniRango="01-".$mesA."-".$gestionA;
                                        $fechaFin = $objFe->obtieneUltimoDiaMes($gestionB,$mesB);
                                        $fechaFinRango=date("d-m-Y", strtotime($fechaFin));
                                        $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                        $arrFechasMeses = $objFe->listadoMesesCompletosInvolucradosEnRango($fechaIni,$fechaFinRango);
                                        if(count($arrFechasMeses)>0){
                                            foreach($arrFechasMeses as $fecha){
                                                $cantidadRegistrada += $objFe->calculaCantidadDiasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fecha->fecha_ini,$fecha->fecha_fin);
                                            }
                                        }
                                        $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                        break;
                                    case "SEMESTRE":
                                        /**
                                         * Cuantas veces se registró en el semestre
                                         */
                                        $semestreA = $objFe->semestrePerteneciente($fechaIni);
                                        $semestreB = $objFe->semestrePerteneciente($fechaFin);
                                        if($semestreA==$semestreB){
                                            /**
                                             * Si la fecha de inicio y la de finalización están en un sólo semestre
                                             */
                                            if($semestreA==1){
                                                $fechaIniRango="01-01-".$gestionA;
                                                $fechaFinRango="30-06-".$gestionA;
                                            }else{
                                                $fechaIniRango="01-07-".$gestionA;
                                                $fechaFinRango="31-12-".$gestionA;
                                            }
                                            $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                            $cantidadRegistrada = $objFe->calculaCantidadDiasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                        }else{
                                            /**
                                             * La fecha de inicio y de finalización están en los dos semestres
                                             */
                                            $fechaIniRango="01-01-".$gestionA;
                                            $fechaFinRango="30-06-".$gestionA;
                                            $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                            $cantidadRegistradaPS = $objFe->calculaCantidadDiasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                            $fechaIniRango="01-07-".$gestionA;
                                            $fechaFinRango="31-12-".$gestionA;
                                            $rangoFechas .= " y del ".$fechaIniRango." AL ".$fechaFinRango;
                                            $cantidadRegistradaSS = $objFe->calculaCantidadDiasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                            $cantidadRegistrada = $cantidadRegistradaPS + $cantidadRegistradaSS;
                                            $cantidadAdmitida=$cantidadAdmitida*2;
                                        }
                                        $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                        break;
                                    case "AÑO":
                                        /**
                                         * Cuantos días se registró en el año
                                         */
                                        $fechaIniRango="01-01-".$gestionA;
                                        $fechaFinRango="31-12-".$gestionA;
                                        $cantidadRegistrada = $objFe->calculaCantidadDiasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                        $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                        $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                        break;
                                    default:
                                        /**
                                         * Cuantos días se registró en el año
                                         */
                                        $fechaIniRango=$fechaInicioOperacionesMiTeleferico;
                                        $fechaFinRango = date("d-m-Y");
                                        $cantidadRegistrada = $objFe->calculaCantidadDiasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                        $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                        $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                        break;
                                }
                            }else{
                                $cantidadTotal=-3;
                            }

                            break;
                        case "SEMANA":
                            $arrRango = $objFe->obtieneRangoSemanasPorRangoFechas(1,$fechaIni,$fechaFin);
                            if(count($arrRango)>0){
                                $cantidadSolicitada=count($arrRango);
                                switch($objE->fraccionamiento){
                                    case "MES":
                                        /**
                                         * Cuantas semanas se registraron en el mes
                                         */
                                        $fechaIniRango="01-".$mesA."-".$gestionA;
                                        $fechaFin = $objFe->obtieneUltimoDiaMes($gestionA,$mesA);
                                        if($fechaFin!=null){
                                            $fechaFinRango=date("d-m-Y", strtotime($fechaFin));
                                            $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                        }
                                        $cantidadRegistradaPM = $objFe->calculaCantidadSemanasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                        $cantidadRegistradaSM=0;
                                        /**
                                         * Considerando que las fechas de la solicitud consideren dos meses contiguos
                                         */
                                        if($mesA!=$mesB){
                                            $fechaIniRango="01-".$mesB."-".$gestionB;
                                            $fechaFin = $objFe->obtieneUltimoDiaMes($gestionB,$mesB);
                                            if($fechaFin!=null){
                                                $fechaFinRango=date("d-m-Y", strtotime($fechaFin));
                                                $rangoFechas .= " y del ".$fechaIniRango." AL ".$fechaFinRango;
                                            }
                                            $cantidadRegistradaPM = $objFe->calculaCantidadSemanasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                            $cantidadAdmitida = $cantidadAdmitida*2;
                                        }
                                        $cantidadRegistrada =$cantidadRegistradaPM+$cantidadRegistradaSM;
                                        $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                        break;
                                    case "SEMESTRE":
                                        /**
                                         * Cuantas semanas se registraron en el semestre
                                         */
                                        $semestreA = $objFe->semestrePerteneciente($fechaIni);
                                        $semestreB = $objFe->semestrePerteneciente($fechaFin);
                                        if($semestreA==$semestreB){
                                            /**
                                             * Si la fecha de inicio y la de finalización están en un sólo semestre
                                             */
                                            if($semestreA==1){
                                                $fechaIniRango="01-01-".$gestionA;
                                                $fechaFinRango="30-06-".$gestionA;
                                            }else{
                                                $fechaIniRango="01-07-".$gestionA;
                                                $fechaFinRango="31-12-".$gestionA;
                                            }
                                            $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                            $cantidadRegistrada = $objFe->calculaCantidadSemanasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                        }else{
                                            /**
                                             * La fecha de inicio y de finalización están en los dos semestres
                                             */
                                            $fechaIniRango="01-01-".$gestionA;
                                            $fechaFinRango="30-06-".$gestionA;
                                            $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                            $cantidadRegistradaPS = $objFe->calculaCantidadSemanasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                            $fechaIniRango="01-07-".$gestionA;
                                            $fechaFinRango="31-12-".$gestionA;
                                            $rangoFechas .= " y del ".$fechaIniRango." AL ".$fechaFinRango;
                                            $cantidadRegistradaSS = $objFe->calculaCantidadSemanasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                            $cantidadRegistrada = $cantidadRegistradaPS + $cantidadRegistradaSS;
                                            $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                            $cantidadAdmitida=$cantidadAdmitida*2;
                                        }
                                        $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                        break;
                                    case "AÑO":
                                        /**
                                         * Cuantas semanas se registraron en el año
                                         */
                                        $fechaIniRango="01-01-".$gestionA;
                                        $fechaFinRango="31-12-".$gestionA;
                                        $cantidadRegistrada = $objFe->calculaCantidadSemanasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                        $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                        $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                        break;
                                    default:
                                        /**
                                         * Cuantas semanas se registraron en el año
                                         */
                                        $fechaIniRango=$fechaInicioOperacionesMiTeleferico;
                                        $fechaFinRango=date("d-m-Y");
                                        $cantidadRegistrada = $objFe->calculaCantidadSemanasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                        $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                        $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                        break;
                                }
                            }else $cantidadTotal=-4;
                            break;
                        case "MES":
                            $arrMeses = $objFe->cantidadMesesInvolucradosEnRango($fechaIni,$fechaFin);
                            if(count($arrMeses)>0){
                                $cantidadSolicitada = count($arrMeses);
                                switch($objE->fraccionamiento){
                                    case "SEMESTRE":
                                        /**
                                         * Cuantas semanas se registraron en el semestre
                                         */
                                        $semestreA = $objFe->semestrePerteneciente($fechaIni);
                                        $semestreB = $objFe->semestrePerteneciente($fechaFin);
                                        if($semestreA==$semestreB){
                                            /**
                                             * Si la fecha de inicio y la de finalización están en un sólo semestre
                                             */
                                            if($semestreA==1){
                                                $fechaIniRango="01-01-".$gestionA;
                                                $fechaFinRango="30-06-".$gestionA;
                                            }else{
                                                $fechaIniRango="01-07-".$gestionA;
                                                $fechaFinRango="31-12-".$gestionA;
                                            }
                                            $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                            $cantidadRegistrada = $objFe->calculaCantidadMesesEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                        }else{
                                            /**
                                             * La fecha de inicio y de finalización están en los dos semestres
                                             */
                                            $fechaIniRango="01-01-".$gestionA;
                                            $fechaFinRango="30-06-".$gestionA;
                                            $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                            $cantidadRegistradaPS = $objFe->calculaCantidadMesesEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                            $fechaIniRango="01-07-".$gestionA;
                                            $fechaFinRango="31-12-".$gestionA;
                                            $rangoFechas .= " y del ".$fechaIniRango." AL ".$fechaFinRango;
                                            $cantidadRegistradaSS = $objFe->calculaCantidadMesesEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                            $cantidadRegistrada = $cantidadRegistradaPS + $cantidadRegistradaSS;
                                            $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                            $cantidadAdmitida=$cantidadAdmitida*2;
                                        }
                                        $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                        break;
                                    case "AÑO":
                                        /**
                                         * Cuantas semanas se registraron en el año
                                         */
                                        $fechaIniRango="01-01-".$gestionA;
                                        $fechaFinRango="31-12-".$gestionA;
                                        $cantidadRegistrada = $objFe->calculaCantidadMesesEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                        $rangoFechas = $fechaIniRango." AL ".$fechaFinRango;
                                        $cantidadTotal = $cantidadSolicitada+$cantidadRegistrada;
                                        break;
                                }
                            }else{
                                $cantidadTotal=-4;
                            }
                            break;
                        case "SEMESTRE":
                            $arrMeses = $objFe->cantidadMesesInvolucradosEnRango($fechaIni,$fechaFin);
                            if(count($arrMeses)==6) {
                                $cantidadSolicitada = count($arrMeses);
                                if($objE->fraccionamiento=="AÑO"){
                                    $cantidadTotal=0;
                                    $fechaIniRango="01-01-".$gestionA;
                                    $fechaFinRango="30-06-".$gestionA;
                                    $cantidadRegistradaPS = $objFe->calculaCantidadMesesEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                    $fechaIniRango="01-07-".$gestionA;
                                    $fechaFinRango="31-12-".$gestionA;
                                    $cantidadRegistradaSS = $objFe->calculaCantidadMesesEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion,$fechaIniRango,$fechaFinRango);
                                    /**
                                     * Si se han usado en cada semestre al menos un mes, ya se considera dentro del semestre.
                                     */
                                    if($cantidadRegistradaPS>0)$cantidadRegistradaPS=1;
                                    if($cantidadRegistradaSS>0)$cantidadRegistradaSS=1;
                                    $cantidadRegistrada = $cantidadRegistradaPS+$cantidadRegistradaSS;

                                }else {
                                    $cantidadTotal=-6;
                                }
                            }else{
                                $cantidadTotal=-4;
                            }
                            break;
                            /**
                             * Considerando para los años y demás casos por defecto admisible
                             */
                        dafault:
                            /**
                             * No se aplica ningun control
                             */
                            $cantidadTotal=0;
                            break;
                    }
                    if($cantidadTotal>=0){
                        if($cantidadTotal>$cantidadAdmitida){
                            $unidadSolicitada = $objE->unidad;
                            $unidadRegistrada = $objE->unidad;
                            if($cantidadSolicitada>1){
                                if($objE->unidad=='MES'||$objE->unidad=='VEZ'){
                                    $unidadSolicitada = $objE->unidad.'ES';
                                    if($objE->unidad=='VEZ'){
                                        $unidadSolicitada ='VECES';
                                    }
                                }else{
                                    $unidadSolicitada = $objE->unidad.'S';
                                }
                            }
                            if($cantidadRegistrada>1){
                                if($objE->unidad=='MES'||$objE->unidad=='VEZ'){
                                    $unidadRegistrada = $objE->unidad.'ES';
                                    if($objE->unidad=='VEZ'){
                                        $unidadRegistrada ='VECES';
                                    }
                                }else{
                                    $unidadRegistrada = $objE->unidad.'S';
                                }
                            }
                            $msj = array('result' => 0, 'cantidad'=>$cantidadTotal ,'msj' =>
                                'Periodo: '.$rangoFechas.', '.
                                'Frecuencia Admitida: '.$objE->frecuencia_descripcion.', '.
                                'Cantidad Registrada En Otras Solicitudes (Mismo periodo): '.round($cantidadRegistrada,2).' '.$unidadRegistrada.', '.
                                'Cantidad Actual Solicitud (Mismo periodo): '.$cantidadSolicitada.' '.$unidadSolicitada);
                        }else{
                            $msj = array('result' => 1, 'cantidad'=>$cantidadTotal ,'msj' => 'Registro de excepci&oacute;n sin problemas de frecuencia. ('.$objE->frecuencia_descripcion.')');
                        }
                    }else{
                        switch($cantidadTotal){
                            case -1:
                                $msj = array('result' => -1,'cantidad'=>$cantidadRegistrada , 'msj' => 'El rango de fechas de la solicitud supera el l&iacute;mite de tiempo admitido para el tipo de excepci&oacute;n seleccionado. ('.$objE->frecuencia_descripcion.')');
                                break;
                            case -2:
                                $msj = array('result' => -2,'cantidad'=>$cantidadRegistrada , 'msj' => 'Frecuencia de uso de la boleta no controlable. Consulte con el Administrador. ('.$objE->frecuencia_descripcion.')');
                                break;
                            case -3:
                                $msj = array('result' => -3,'cantidad'=>$cantidadRegistrada , 'msj' => 'El rango solicitado tiene conflictos con la FRECUENCIA ('.$objE->frecuencia_descripcion.'). Recomendaci&oacute;n: Puede registrar por separado en caso de vincular a m&aacute;s de un mes en el rango.');
                                break;
                            case -4:
                                $msj = array('result' => -4,'cantidad'=>$cantidadRegistrada , 'msj' => 'Se han introducido datos erroneos en el rango de fechas para la excepci&oacute;n.');
                                break;
                        }
                    }
                }else $msj = array('result' => 2,'cantidad'=>$cantidadRegistrada , 'msj' => 'El registro de excepci&oacute;n no requiere control de frecuencia. ('.$objE->frecuencia_descripcion.')');
            }
            else $msj = array('result' => -1,'cantidad'=>$cantidadRegistrada , 'msj' => 'No se hall&oacute; el registro de excepci&oacute;n. ('.$objE->frecuencia_descripcion.')');
        }
        echo json_encode($msj);
    }
} 