<?php

class IndexController extends ControllerBase
{

    public function initialize()
    {
        parent::initialize();
    }

    public function indexAction()
    {
        $this->assets->addJs('/js/highcharts/highcharts.js');
        $this->assets->addJs('/js/highcharts/modules/exporting.js');
        $this->assets->addJs('/js/dashboard/oasis.dashboard.js');
        $gestionActual = date("Y");
        $this->view->setVar('usuario', $this->_user);
        $this->view->setVar('gestion', $gestionActual);
        $auth = $this->session->get('auth');
        $idUsuario = $this->_user->id;
        $usuario = Usuarios::findFirstById($idUsuario);
        $persona = personas::findFirstById($usuario->persona_id);
        $nombres = $persona->p_apellido.($persona->s_apellido!=''?' '.$persona->s_apellido:'').($persona->c_apellido!=''?' '.$persona->c_apellido:'').($persona->p_nombre!=''?' '.$persona->p_nombre:'').($persona->s_nombre!=''?' '.$persona->s_nombre:'');
        $this->view->setVar('nombres', $nombres);
        $modalidad = $auth['modalidad'];
        $this->view->setVar('modalidad', $modalidad);
        if($modalidad==1){
            /**
             * Cantidad de Personal
             */
            $relaborales = Relaborales::find("estado>=1 AND finpartida_id IN (1,4,7)");
            $this->view->setVar('permanentes', $relaborales->count());

            $relaborales = Relaborales::find("estado>=1 AND finpartida_id IN (2,5,8)");
            $this->view->setVar('eventuales', $relaborales->count());

            $relaborales = Relaborales::find("estado>=1 AND finpartida_id IN (3,6,9)");
            $this->view->setVar('consultores', $relaborales->count());

            $this->assets->addJs('/js/index/oasis.index.js');
            /**
             * Procesos Pendientes de Conclusión
             */
            $hoy = date("d-m-Y");
            $procesos_pendientes = Procesoscontrataciones::find("fecha_concl>='".$hoy."' AND normativamod_id IN (1,2,5,6) AND tipoconvocatoria_id=1");
            $this->view->setVar('procesos_pendientes', $procesos_pendientes->count());
        }else {
            $objFR = new Frelaborales();
            $this->view->setVar('id_persona', $persona->id);
            $lstAntiguedad = $objFR->getListAntiguedadPorPeriodos($persona->id);
            $this->view->setVar('antiguedad', $lstAntiguedad);
            $this->view->setVar('descuentos', array());
            $this->view->setVar('boletasSinEnvio', "11");
            $this->view->setVar('boletasPendientesDeRespuesta', "10");
        }
        $ci_usuario = $persona->ci;
        $ruta = "";
        $rutaImagenesCredenciales = "/images/personal/";
        $extencionImagenesCredenciales = ".jpg";
        $num_complemento = "";
        /*if (isset($_POST["num_complemento"])) {
            $num_complemento = $_POST["num_complemento"];
        }*/
        if (isset($ci_usuario)) {
            $ruta = "";
            $nombreImagenArchivo = $rutaImagenesCredenciales . trim($ci_usuario);
            if ($num_complemento != "") $nombreImagenArchivo = $nombreImagenArchivo . trim($num_complemento);
            $ruta = $nombreImagenArchivo . $extencionImagenesCredenciales;
            if (!file_exists(getcwd() . $ruta))$ruta = '/images/perfil-profesional.jpg';
            $this->view->setVar('ruta', $ruta);
        }
    }

    /**
     * Función para la obtención del listado de descuentos mensuales de una determinada persona
     */
    public function getdescuentospersonalesAction(){
        $this->view->disable();
        $descuentos = array();
        $gestion = 0;
        if(isset($_POST["gestion"])){
            $gestion = $_POST["gestion"];
        }
        $idUsuario = $this->_user->id;
        $usuario = Usuarios::findFirstById($idUsuario);
        $objD = new Fdescuentos();
        $result = $objD->getAllByPerson($usuario->persona_id,$gestion);
        if($result->count()>0){
            foreach ($result as $v) {
                $descuentos[] = array(
                        'id_descuento'=>$v->id_descuento,
                        'relaboral_id'=>$v->relaboral_id,
                        'gestion'=>$v->gestion,
                        'mes'=>$v->mes,
                        'mes_descripcion'=>$v->mes_descripcion,
                        'faltas'=>$v->faltas,
                        'atrasos'=>$v->atrasos,
                        'faltas_atrasos'=>$v->faltas_atrasos,
                        'lsgh'=>$v->lsgh,
                        'abandono'=>$v->abandono,
                        'omision'=>$v->omision,
                        'retencion'=>$v->retencion,
                        'otros'=>$v->otros,
                        'total_descuentos'=>$v->total_descuentos,
                        'observacion'=>$v->observacion,
                        'motivo_anu'=>$v->motivo_anu,
                        'estado'=>$v->estado,
                        'baja_logica'=>$v->baja_logica,
                        'agrupador'=>$v->agrupador,
                        'user_reg_id'=>$v->user_reg_id,
                        'fecha_reg'=>$v->fecha_reg,
                        'user_mod_id'=>$v->user_mod_id,
                        'fecha_mod'=>$v->fecha_mod,
                        'user_anu_id'=>$v->user_anu_id,
                        'fecha_anu'=>$v->fecha_anu
                );
            }

        }
        echo json_encode($descuentos);
    }
}