<?php
/**
 * Created by PhpStorm.
 * User: Administrador
 * Date: 26/10/2015
 * Time: 02:57 PM
 */

class MisideasController extends ControllerBase{
    public function initialize()
    {
        parent::initialize();
    }
    /**
     * Función para la carga de la página de gestión de ideas de negocios.
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

        $this->assets->addJs('/js/misideas/oasis.misideas.tab.js');
        $this->assets->addJs('/js/misideas/oasis.misideas.index.js');
        $this->assets->addJs('/js/misideas/oasis.misideas.list.js');
        $this->assets->addJs('/js/misideas/oasis.misideas.finish.js');
        $this->assets->addJs('/js/misideas/oasis.misideas.new.edit.js');
        $this->assets->addJs('/js/misideas/oasis.misideas.down.js');
        $this->assets->addJs('/js/misideas/oasis.misideas.move.js');
        $this->assets->addJs('/js/misideas/oasis.misideas.export.js');
        $this->assets->addJs('/js/misideas/oasis.misideas.export.form.js');
        $this->assets->addJs('/js/misideas/oasis.misideas.view.js');
        $this->assets->addJs('/js/misideas/oasis.misideas.view.splitter.js');
        $this->assets->addJs('/js/misideas/oasis.misideas.send.js');
        $this->assets->addJs('/js/ckeditor/ckeditor.js');
        $auth = $this->session->get('auth');
        $objUsr = new Usuarios();
        $relaboral = $objUsr->getOneRelaboralActivo($auth['id']);
        if(is_object($relaboral)){
            $this->view->setVar('idRelaboral', $relaboral[0]->id_relaboral);
            $this->view->setVar('idPersona', $relaboral[0]->id_persona);
            $this->view->setVar('ci', $relaboral[0]->ci);
            $this->view->setVar('nombres', $relaboral[0]->nombres);
        }
    }

    /**
     * Función para la obtención del listado de ideas pertenecientes a una persona.
     */
    public function listAction()
    {
        $this->view->disable();
        $obj = new Fideas();
        $ideas = Array();
        $idRelaboral=0;
        if(isset($_GET["id"])){
            $idRelaboral = $_GET["id"];
            $gestion = $_GET["gestion"];
            $where = "";
            $relaborales = relaborales::findFirstById($idRelaboral);
            if($idRelaboral>0&&is_object($relaborales)&&$relaborales->persona_id>0){
                $resul = $obj->getAllFromOnePersonByGestion($relaborales->persona_id,$gestion,0,100,$where,"");
                //comprobamos si hay filas
                if (count($resul) > 0) {
                    foreach ($resul as $v) {
                        $ideas[] = array(
                            'nro_row' => 0,
                            'id'=>$v->id_idea,
                            'padre_id'=>$v->padre_id,
                            'relaboral_id'=>$v->relaboral_id,
                            'rubro_id'=>$v->rubro_id,
                            'tipo_negocio'=>$v->tipo_negocio,
                            'tipo_negocio_descripcion'=>$v->tipo_negocio_descripcion,
                            'gestion'=>$v->gestion,
                            'mes'=>$v->mes,
                            'mes_nombre'=>$v->mes_nombre,
                            'numero'=>$v->numero,
                            'titulo'=>$v->titulo,
                            'resumen'=>$v->resumen,
                            'descripcion'=>$v->descripcion,
                            'inversion'=>$v->inversion,
                            'beneficios'=>$v->beneficios,
                            'puntuacion_a'=>$v->puntuacion_a,
                            'puntuacion_a_descripcion'=>$v->puntuacion_a_descripcion,
                            'puntuacion_b'=>$v->puntuacion_b,
                            'puntuacion_b_descripcion'=>$v->puntuacion_b_descripcion,
                            'puntuacion_c'=>$v->puntuacion_c,
                            'puntuacion_c_descripcion'=>$v->puntuacion_c_descripcion,
                            'puntuacion_d'=>$v->puntuacion_d,
                            'puntuacion_d_descripcion'=>$v->puntuacion_d_descripcion,
                            'puntuacion_e'=>$v->puntuacion_e,
                            'puntuacion_e_descripcion'=>$v->puntuacion_e_descripcion,
                            'observacion'=>$v->observacion,
                            'estado'=>$v->estado,
                            'estado_descripcion'=>$v->estado_descripcion,
                            'baja_logica'=>$v->baja_logica,
                            'agrupador'=>$v->agrupador,
                            'user_reg_id'=>$v->user_reg_id,
                            'user_reg'=>$v->user_reg,
                            'pseudonimo'=>$v->pseudonimo,
                            'fecha_reg'=>$v->fecha_reg != "" ? date("d-m-Y H:i:s", strtotime($v->fecha_reg)) : "",
                            'user_mod_id'=>$v->user_mod_id,
                            'user_mod'=>$v->user_mod,
                            'fecha_mod'=>$v->fecha_mod != "" ? date("d-m-Y H:i:s", strtotime($v->fecha_mod)) : "",
                            'user_punt_a_id'=>$v->user_punt_a_id,
                            'user_punt_a'=>$v->user_punt_a,
                            'fecha_punt_a'=>$v->fecha_punt_a != "" ? date("d-m-Y H:i:s", strtotime($v->fecha_punt_a)) : "",
                            'user_punt_b_id'=>$v->user_punt_b_id,
                            'user_punt_b'=>$v->user_punt_b,
                            'fecha_punt_b'=>$v->fecha_punt_b != "" ? date("d-m-Y H:i:s", strtotime($v->fecha_punt_b)) : "",
                            'user_punt_c_id'=>$v->user_punt_c_id,
                            'user_punt_c'=>$v->user_punt_c,
                            'fecha_punt_c'=>$v->fecha_punt_c != "" ? date("d-m-Y H:i:s", strtotime($v->fecha_punt_c)) : "",
                            'user_punt_d_id'=>$v->user_punt_d_id,
                            'user_punt_d'=>$v->user_punt_d,
                            'fecha_punt_d'=>$v->fecha_punt_d != "" ? date("d-m-Y H:i:s", strtotime($v->fecha_punt_d)) : "",
                            'user_punt_e_id'=>$v->user_punt_e_id,
                            'user_punt_e'=>$v->user_punt_e,
                            'fecha_punt_e'=>$v->fecha_punt_e != "" ? date("d-m-Y H:i:s", strtotime($v->fecha_punt_e)) : ""
                        );
                    }
                }
            }
        }
        echo json_encode($ideas);
    }

    /**
     * Función para el registro y modificación de las ideas de negocio.
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
             * Modificación de registro de Idea de Negocio.
             */
            $idRelaboral = $_POST['relaboral_id'];
            $tipoNegocio = $_POST["tipo_negocio"];
            $gestion = $_POST["gestion"];
            $mes = $_POST["mes"];
            $idIdea = $_POST['id'];
            $titulo = $_POST['titulo'];
            $resumen = $_POST['resumen'];
            $descripcion = $_POST['descripcion'];
            $observacion = $_POST['observacion'];
            if($idRelaboral>0&&$idIdea>0&&$tipoNegocio>0&&$gestion>0&&$mes>0&&$titulo!=''&&$resumen!=''&&$descripcion!=''){
                $objIdea = Ideas::findFirstById($_POST["id"]);
                if(is_object($objIdea)){
                        $objIdea->relaboral_id = $idRelaboral;
                        $objIdea->tipo_negocio = $tipoNegocio;
                        $objIdea->gestion = $gestion;
                        $objIdea->mes = $mes;
                        $objIdea->resumen = $resumen;
                        $objIdea->descripcion = $descripcion;
                        $objIdea->observacion=$observacion;
                        $objIdea->user_mod_id=$user_mod_id;
                        $objIdea->fecha_mod=$hoy;
                        try{
                            if ($objIdea->save())  {
                                $msj = array('result' => 1, 'msj' => '&Eacute;xito: Se modific&oacute; el registro de la Idea de Negocio de modo satisfactorio.');
                            } else {
                                $msj = array('result' => 0, 'msj' => 'Error: No se modific&oacute; el registro de la Idea de Negocio.');
                            }
                        }catch (\Exception $e) {
                            echo get_class($e), ": ", $e->getMessage(), "\n";
                            echo " File=", $e->getFile(), "\n";
                            echo " Line=", $e->getLine(), "\n";
                            echo $e->getTraceAsString();
                            $msj = array('result' => -1, 'msj' => 'Error cr&iacute;tico: No se guard&oacute; el registro de la Idea de Negocio.');
                        }
                    }else $msj = array('result' => 0, 'msj' => 'Error: Los datos enviados son similares a otro registro existente, debe modificar los valores necesariamente.');

            }else{
                $msj = array('result' => 0, 'msj' => 'Error: Los datos enviados no cumplen los criterios necesarios para su registro.');
            }
        }else{
            /**
             * Nuevo registro de Idea de Negocio.
             */
            $idRelaboral = $_POST['relaboral_id'];
            $tipoNegocio = $_POST["tipo_negocio"];
            $gestion = $_POST["gestion"];
            $mes = $_POST["mes"];
            $titulo = $_POST['titulo'];
            $resumen = $_POST['resumen'];
            $descripcion = $_POST['descripcion'];
            $observacion = $_POST['observacion'];
            if($idRelaboral>0&&$titulo!=''&&$resumen!=''&&$descripcion!=''){
                $maximo = Ideas::maximum(
                    array(
                        "column"     => "numero",
                        "conditions" => "relaboral_id = ".$idRelaboral." AND gestion=".$gestion." AND mes=".$mes." AND baja_logica=1"
                    )
                );
                $objIdea = new Ideas();
                $objIdea->relaboral_id = $idRelaboral;
                $objIdea->tipo_negocio = $tipoNegocio;
                $objIdea->gestion = $gestion;
                $objIdea->mes = $mes;
                $objIdea->numero = $maximo+1;
                $objIdea->titulo = $titulo;
                $objIdea->resumen = $resumen;
                $objIdea->descripcion = $descripcion;
                $objIdea->observacion=$observacion;
                $objIdea->estado=1;
                $objIdea->baja_logica=1;
                $objIdea->agrupador=0;
                $objIdea->user_reg_id=$user_mod_id;
                $objIdea->fecha_reg=$hoy;
                try{
                    if ($objIdea->save())  {
                        $msj = array('result' => 1, 'msj' => '&Eacute;xito: Se realiz&oacute; el registro de la Idea de Negocio de modo satisfactorio.');
                    } else {
                        $msj = array('result' => 0, 'msj' => 'Error: No se pudo realizar el registro de la Idea de Negocio.');
                    }
                }catch (\Exception $e) {
                    echo get_class($e), ": ", $e->getMessage(), "\n";
                    echo " File=", $e->getFile(), "\n";
                    echo " Line=", $e->getLine(), "\n";
                    echo $e->getTraceAsString();
                    $msj = array('result' => -1, 'msj' => 'Error cr&iacute;tico: No se guard&oacute; el registro de la Idea de Negocio.');
                }
            }else{
                $msj = array('result' => 0, 'msj' => 'Error: Los datos enviados no cumplen los criterios necesarios para su registro.');
            }
        }
        echo json_encode($msj);
    }
    public function finishAction()
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
            $objIdeas = Ideas::findFirstById($_POST["id"]);
            if ($objIdeas->id > 0 && $objIdeas->estado == 1) {
                try {
                    $objIdeas->estado = 2;
                    $objIdeas->user_mod_id = $user_mod_id;
                    $objIdeas->fecha_mod = $hoy;
                    $ok = $objIdeas->save();
                    if ($ok) {
                        $msj = array('result' => 1, 'msj' => '&Eacute;xito: Se concluy&oacute; correctamente el registro de la Idea de Negocio.');
                    } else {
                        $msj = array('result' => 0, 'msj' => 'Error: No se pudo concluir el registro de la Idea de Negocio.');
                    }
                } catch (\Exception $e) {
                    echo get_class($e), ": ", $e->getMessage(), "\n";
                    echo " File=", $e->getFile(), "\n";
                    echo " Line=", $e->getLine(), "\n";
                    echo $e->getTraceAsString();
                    $msj = array('result' => -1, 'msj' => 'Error cr&iacute;tico: No se guard&oacute; el registro de Idea de Negocio.');
                }
            } else {
                $msj = array('result' => 0, 'msj' => 'Error: El registro de Idea de Negocio no cumple con el requisito establecido para su conclusi&oacute;n, debe estar en estado EN ELABORACI&Oacute;N.');
            }
        } else {
            $msj = array('result' => -1, 'msj' => 'Error cr&iacute;tico: No se envi&oacute; el identificador del registro de la Idea de Negocio.');
        }
        echo json_encode($msj);
    }
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
                $objIdeas = Ideas::findFirstById($_POST["id"]);
                $objIdeas->estado = 0;
                $objIdeas->baja_logica = 0;
                $objIdeas->user_mod_id = $user_mod_id;
                $objIdeas->fecha_mod = $hoy;
                if ($objIdeas->save()) {
                    $msj = array('result' => 1, 'msj' => '&Eacute;xito: Registro de Baja realizado de modo satisfactorio.');
                } else {
                    foreach ($objIdeas->getMessages() as $message) {
                        echo $message, "\n";
                    }
                    $msj = array('result' => -1, 'msj' => 'Error cr&iacute;tico: No se pudo dar de baja al registro de la Idea de Negocio.');
                }
            } else $msj = array('result' => -1, 'msj' => 'Error cr&iacute;tico: No se efectu&oacute; la baja debido a que no se especific&oacute; el registro de la Idea de Negocio.');
        } catch (\Exception $e) {
            echo get_class($e), ": ", $e->getMessage(), "\n";
            echo " File=", $e->getFile(), "\n";
            echo " Line=", $e->getLine(), "\n";
            echo $e->getTraceAsString();
            $msj = array('result' => -1, 'msj' => 'Error cr&iacute;tico: No se guard&oacute; el registro de la Idea de Negocio.');
        }
        echo json_encode($msj);
    }
    /**
     * Función para el despliegue del listado de tipos de negocios conocidos.
     */
    public function listtiposdenegocioAction()
    {   $this->view->disable();
        $tiposDeNegocio = parametros::find(array("parametro LIKE 'TIPO_NEGOCIO' AND estado>0 AND baja_logica=1"));
        if(is_object($tiposDeNegocio)){
            foreach($tiposDeNegocio as $reg){
                $data[] = array(
                    'tipo' => $reg->nivel,
                    'tipo_descripcion' => $reg->valor_1
                );
            }
        }
        echo json_encode($data);
    }
} 