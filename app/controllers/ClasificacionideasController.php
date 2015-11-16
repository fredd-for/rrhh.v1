<?php
/*
*   Oasis - Sistema de Gestión para Recursos Humanos
*   Empresa Estatal de Transporte por Cable "Mi Teleférico"
*   Versión:  1.0.0
*   Usuario Creador: Lic. Javier Loza
*   Fecha Creación:  06-11-2015
*/
class ClasificacionideasController extends ControllerBase{
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

        $this->assets->addCss('/assets/css/star-rating.css');
        $this->assets->addJs('/js/star-rating/star-rating.js');


        $this->assets->addJs('/js/clasificacionideas/oasis.clasificacionideas.tab.js');
        $this->assets->addJs('/js/clasificacionideas/oasis.clasificacionideas.index.js');
        $this->assets->addJs('/js/clasificacionideas/oasis.clasificacionideas.list.js');
        $this->assets->addJs('/js/clasificacionideas/oasis.clasificacionideas.all.js');
        $this->assets->addJs('/js/clasificacionideas/oasis.clasificacionideas.approve.js');
        $this->assets->addJs('/js/clasificacionideas/oasis.clasificacionideas.new.edit.js');
        $this->assets->addJs('/js/clasificacionideas/oasis.clasificacionideas.turns.excepts.js');
        $this->assets->addJs('/js/clasificacionideas/oasis.clasificacionideas.down.js');
        $this->assets->addJs('/js/clasificacionideas/oasis.clasificacionideas.move.js');
        $this->assets->addJs('/js/clasificacionideas/oasis.clasificacionideas.export.js');
        $this->assets->addJs('/js/clasificacionideas/oasis.clasificacionideas.export.form.js');
        $this->assets->addJs('/js/clasificacionideas/oasis.clasificacionideas.view.js');
        $this->assets->addJs('/js/clasificacionideas/oasis.clasificacionideas.view.splitter.js');
    }
    /**
     * Función para la modificación de la clasificación de una Idea de Negocio.
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
             * Clasificación del registro de la Idea de Negocio.
             */
            $idIdea = $_POST['id'];
            $puntuacion_a = $_POST['puntuacion_a'];
            if($idIdea>0&&$puntuacion_a>=0&&$puntuacion_a<=5){
                $objIdea = Ideas::findFirstById($_POST["id"]);
                if(is_object($objIdea)){
                    $objIdea->puntuacion_a=$puntuacion_a;
                    $objIdea->user_punt_a_id=$user_mod_id;
                    $objIdea->fecha_punt_a=$hoy;
                    try{
                        if ($objIdea->save())  {
                            $msj = array('result' => 1, 'msj' => '&Eacute;xito: Se clasific&oacute; el registro de la Idea de Negocio de modo satisfactorio.');
                        } else {
                            $msj = array('result' => 0, 'msj' => 'Error: No se clasific&oacute; el registro de la Idea de Negocio.');
                        }
                    }catch (\Exception $e) {
                        echo get_class($e), ": ", $e->getMessage(), "\n";
                        echo " File=", $e->getFile(), "\n";
                        echo " Line=", $e->getLine(), "\n";
                        echo $e->getTraceAsString();
                        $msj = array('result' => -1, 'msj' => 'Error cr&iacute;tico: No se guard&oacute; la clasificaci&oacute;n de la Idea de Negocio.');
                    }
                }else $msj = array('result' => 0, 'msj' => 'Error: No se hall&oacute; registro para realizar la clasificaci&oacute;n.');

            }else{
                $msj = array('result' => 0, 'msj' => 'Error: Los datos enviados no cumplen los criterios necesarios para su registro.');
            }
        }else{
            $msj = array('result' => 0, 'msj' => 'Error: Los datos enviados no cumplen los criterios necesarios para su registro.');
        }
        echo json_encode($msj);
    }
} 