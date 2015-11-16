<?php
/*
*   Oasis - Sistema de Gestión para Recursos Humanos
*   Empresa Estatal de Transporte por Cable "Mi Teleférico"
*   Versión:  1.0.0
*   Usuario Creador: Lic. Javier Loza
*   Fecha Creación:  04-11-2015
*/

class GestionideasController extends ControllerBase{

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


        $this->assets->addJs('/js/gestionideas/oasis.gestionideas.tab.js');
        $this->assets->addJs('/js/gestionideas/oasis.gestionideas.index.js');
        $this->assets->addJs('/js/gestionideas/oasis.gestionideas.list.js');
        $this->assets->addJs('/js/gestionideas/oasis.gestionideas.count.js');
        $this->assets->addJs('/js/gestionideas/oasis.gestionideas.approve.js');
        $this->assets->addJs('/js/gestionideas/oasis.gestionideas.new.edit.js');
        $this->assets->addJs('/js/gestionideas/oasis.gestionideas.turns.excepts.js');
        $this->assets->addJs('/js/gestionideas/oasis.gestionideas.down.js');
        $this->assets->addJs('/js/gestionideas/oasis.gestionideas.move.js');
        $this->assets->addJs('/js/gestionideas/oasis.gestionideas.export.js');
        $this->assets->addJs('/js/gestionideas/oasis.gestionideas.export.form.js');
        $this->assets->addJs('/js/gestionideas/oasis.gestionideas.view.js');
        $this->assets->addJs('/js/gestionideas/oasis.gestionideas.view.splitter.js');
    }
    /**
     * Función para la obtención del listado de ideas pertenecientes a una persona.
     */
    public function listallAction()
    {
        $this->view->disable();
        $obj = new Fideas();
        $ideas = Array();
        $gestion = $_GET["gestion"];
        $where = "";
            $resul = $obj->getAllFromOnePersonByGestion(0,$gestion,0,2,$where,"");
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
        echo json_encode($ideas);
    }

    /**
     * Función para el despliegue del listado de registros de relación laboral con relación al conteo de publicaciones mensuales.
     */
    public function listcountAction()
    {
        $this->view->disable();
        $obj = new Frelaborales();
        $relaboral = Array();
        $idUbicacion = 0;
        if(isset($_POST["id_ubicacion"])&&$_POST["id_ubicacion"]>0){
            $idUbicacion=$_POST["id_ubicacion"];
        }
        $sql = " WHERE estado>=0 ";
        if($idUbicacion>0)
            $sql .= " AND id_ubicacion=".$idUbicacion;
        $resul = $obj->getAllCountIdeas(0,0,2015,10,$sql);
        //comprobamos si hay filas
        if ($resul->count() > 0) {
            foreach ($resul as $v) {
                $relaboral[] = array(
                    'nro_row' => 0,
                    'id_relaboral' => $v->id_relaboral,
                    'id_persona' => $v->id_persona,
                    'p_nombre' => $v->p_nombre,
                    's_nombre' => $v->s_nombre,
                    't_nombre' => $v->t_nombre,
                    'p_apellido' => $v->p_apellido,
                    's_apellido' => $v->s_apellido,
                    'c_apellido' => $v->c_apellido,
                    'nombres' => $v->nombres,
                    'ci' => $v->ci,
                    'expd' => $v->expd,
                    'fecha_caducidad' => $v->fecha_caducidad,
                    'num_complemento' => '',
                    'fecha_nac' => $v->fecha_nac,
                    'edad' => $v->edad,
                    'lugar_nac' => $v->lugar_nac,
                    'genero' => $v->genero,
                    'e_civil' => $v->e_civil,
                    'tiene_item' => $v->tiene_item,
                    'item' => $v->item,
                    'carrera_adm' => $v->carrera_adm,
                    'num_contrato' => $v->num_contrato,
                    'contrato_numerador_estado' => $v->contrato_numerador_estado,
                    'id_solelabcontrato' => $v->id_solelabcontrato,
                    'solelabcontrato_regional_sigla' => $v->solelabcontrato_regional_sigla,
                    'solelabcontrato_numero' => $v->solelabcontrato_numero,
                    'solelabcontrato_gestion' => $v->solelabcontrato_gestion,
                    'solelabcontrato_codigo' => $v->solelabcontrato_codigo,
                    'solelabcontrato_user_reg_id' => $v->solelabcontrato_user_reg_id,
                    'solelabcontrato_fecha_sol' => $v->solelabcontrato_fecha_sol,
                    'fecha_ing' => $v->fecha_ing != "" ? date("d-m-Y", strtotime($v->fecha_ing)) : "",
                    'fecha_ini' => $v->fecha_ini != "" ? date("d-m-Y", strtotime($v->fecha_ini)) : "",
                    'fecha_incor' => $v->fecha_incor != "" ? date("d-m-Y", strtotime($v->fecha_incor)) : "",
                    'fecha_fin' => $v->fecha_fin != "" ? date("d-m-Y", strtotime($v->fecha_fin)) : "",
                    'fecha_baja' => $v->fecha_baja != "" ? date("d-m-Y", strtotime($v->fecha_baja)) : "",
                    'fecha_ren' => $v->fecha_ren != "" ? date("d-m-Y", strtotime($v->fecha_ren)) : "",
                    'fecha_acepta_ren' => $v->fecha_acepta_ren != "" ? date("d-m-Y", strtotime($v->fecha_acepta_ren)) : "",
                    'fecha_agra_serv' => $v->fecha_agra_serv != "" ? date("d-m-Y", strtotime($v->fecha_agra_serv)) : "",
                    'motivo_baja' => $v->motivo_baja,
                    'motivosbajas_abreviacion' => $v->motivosbajas_abreviacion,
                    'descripcion_baja' => $v->descripcion_baja,
                    'descripcion_anu' => $v->descripcion_anu,
                    'id_cargo' => $v->id_cargo,
                    'cargo_codigo' => $v->cargo_codigo,
                    'cargo' => $v->cargo,
                    'cargo_resolucion_ministerial_id' => $v->cargo_resolucion_ministerial_id,
                    'cargo_resolucion_ministerial' => $v->cargo_resolucion_ministerial,
                    'id_nivelessalarial' => $v->id_nivelessalarial,
                    'nivelsalarial' => $v->nivelsalarial,
                    'nivelsalarial_resolucion_id' => $v->nivelsalarial_resolucion_id,
                    'nivelsalarial_resolucion' => $v->nivelsalarial_resolucion,
                    'numero_escala' => $v->numero_escala,
                    'gestion_escala' => $v->gestion_escala,
                    /*'sueldo' => $v->sueldo,*/
                    'sueldo' => str_replace(".00", "", $v->sueldo),
                    'id_procesocontratacion' => $v->id_procesocontratacion,
                    'proceso_codigo' => $v->proceso_codigo,
                    'id_convocatoria' => $v->id_convocatoria,
                    'convocatoria_codigo' => $v->convocatoria_codigo,
                    'convocatoria_tipo' => $v->convocatoria_tipo,
                    'id_fin_partida' => $v->id_fin_partida,
                    'fin_partida' => $v->fin_partida,
                    'id_condicion' => $v->id_condicion,
                    'condicion' => $v->condicion,
                    'categoria_relaboral' => $v->categoria_relaboral,
                    'id_da' => $v->id_da,
                    'direccion_administrativa' => $v->direccion_administrativa,
                    'organigrama_regional_id' => $v->organigrama_regional_id,
                    'organigrama_regional' => $v->organigrama_regional,
                    'id_regional' => $v->id_regional,
                    'regional' => $v->regional,
                    'regional_codigo' => $v->regional_codigo,
                    'id_departamento' => $v->id_departamento,
                    'departamento' => $v->departamento,
                    'id_provincia' => $v->id_provincia,
                    'provincia' => $v->provincia,
                    'id_localidad' => $v->id_localidad,
                    'localidad' => $v->localidad,
                    'residencia' => $v->residencia,
                    'unidad_ejecutora' => $v->unidad_ejecutora,
                    'cod_ue' => $v->cod_ue,
                    'id_gerencia_administrativa' => $v->id_gerencia_administrativa,
                    'gerencia_administrativa' => $v->gerencia_administrativa,
                    'id_departamento_administrativo' => $v->id_departamento_administrativo,
                    'departamento_administrativo' => $v->departamento_administrativo,
                    'id_organigrama' => $v->id_organigrama,
                    'unidad_administrativa' => $v->unidad_administrativa,
                    'organigrama_sigla' => $v->organigrama_sigla,
                    'organigrama_orden' => $v->organigrama_orden,
                    'id_area' => $v->id_area,
                    'area' => $v->area,
                    'id_ubicacion' => $v->id_ubicacion,
                    'ubicacion' => $v->ubicacion,
                    'unidades_superiores' => $v->unidades_superiores,
                    'unidades_dependientes' => $v->unidades_dependientes,
                    'partida' => $v->partida,
                    'fuente_codigo' => $v->fuente_codigo,
                    'fuente' => $v->fuente,
                    'organismo_codigo' => $v->organismo_codigo,
                    'organismo' => $v->organismo,
                    'observacion' => ($v->observacion != null) ? $v->observacion : "",
                    'estado' => $v->estado,
                    'estado_descripcion' => $v->estado_descripcion,
                    'estado_abreviacion' => $v->estado_abreviacion,
                    'tiene_contrato_vigente' => $v->tiene_contrato_vigente,
                    'id_eventual' => $v->id_eventual,
                    'id_consultor' => $v->id_consultor,
                    'user_reg_id' => $v->user_reg_id,
                    'fecha_reg' => $v->fecha_reg,
                    'user_mod_id' => $v->user_mod_id,
                    'fecha_mod' => $v->fecha_mod,
                    'persona_user_reg_id' => $v->persona_user_reg_id,
                    'persona_fecha_reg' => $v->persona_fecha_reg,
                    'persona_user_mod_id' => $v->persona_user_mod_id,
                    'persona_fecha_mod' => $v->persona_fecha_mod,
                    'agrupador' => 0,
                    'gestion' => $v->gestion,
                    'mes' => $v->mes,
                    'mes_nombre' => $v->mes_nombre,
                    'publicaciones' => $v->publicaciones,
                );
            }
        }
        echo json_encode($relaboral);
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
            $idIdea = $_POST['id'];
            $observacion = $_POST['observacion'];
            if($idIdea>0){
                $objIdea = Ideas::findFirstById($_POST["id"]);
                if(is_object($objIdea)){
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
            $msj = array('result' => 0, 'msj' => 'Error: Los datos enviados no cumplen los criterios necesarios para su registro.');
        }
        echo json_encode($msj);
    }
} 