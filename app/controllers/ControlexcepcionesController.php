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
        $this->assets->addJs('/js/controlexcepciones/oasis.controlexcepciones.list.count.js');
        $this->assets->addJs('/js/controlexcepciones/oasis.controlexcepciones.approve.js');
        $this->assets->addJs('/js/controlexcepciones/oasis.controlexcepciones.new.edit.js');
        $this->assets->addJs('/js/controlexcepciones/oasis.controlexcepciones.turns.excepts.js');
        $this->assets->addJs('/js/controlexcepciones/oasis.controlexcepciones.down.js');
        $this->assets->addJs('/js/controlexcepciones/oasis.controlexcepciones.move.js');
        $this->assets->addJs('/js/controlexcepciones/oasis.controlexcepciones.export.js');
        $this->assets->addJs('/js/controlexcepciones/oasis.controlexcepciones.export.form.js');
        $this->assets->addJs('/js/controlexcepciones/oasis.controlexcepciones.export.count.js');
        $this->assets->addJs('/js/controlexcepciones/oasis.controlexcepciones.view.js');
        $this->assets->addJs('/js/controlexcepciones/oasis.controlexcepciones.view.splitter.js');
    }

    /**
     * Función para la obtención de los regigstros de excepción de un determinado registro de relación laboral.
     */
    public function listAction()
    {
        $this->view->disable();
        $obj = new Fcontrolexcepciones();
        $controlexcepciones = Array();
        $data = array();
        $where = "";
        $pagenum = $_GET['pagenum'];
        $pagesize = $_GET['pagesize'];
        $total_rows = 0;
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
            $resul = $obj->getAllByOneRelaboral(0, $where, "", $start, $pagesize);
            //comprobamos si hay filas
            if (count($resul) > 0) {
                $cex = Controlexcepciones::find(array("baja_logica=1"));
                $total_rows = $cex->count();
                foreach ($resul as $v) {
                    $controlexcepciones[] = array(
                        'nro_row' => 0,
                        'id' => $v->id_controlexcepcion,
                        'id_relaboral' => $v->id_relaboral,
                        'fecha_ini' => $v->fecha_ini != "" ? date("d-m-Y", strtotime($v->fecha_ini)) : "",
                        'hora_ini' => $v->hora_ini,
                        'fecha_fin' => $v->fecha_fin != "" ? date("d-m-Y", strtotime($v->fecha_fin)) : "",
                        'hora_fin' => $v->hora_fin,
                        'justificacion' => $v->justificacion,
                        'turno' => $v->turno,
                        'turno_descripcion' => $v->compensatoria == 1 ? $v->turno != null ? $v->turno . "°" : null : null,
                        'entrada_salida' => $v->entrada_salida,
                        'entrada_salida_descripcion' => $v->compensatoria == 1 ? $v->entrada_salida == 0 ? "ENTRADA" : "SALIDA" : null,
                        'controlexcepcion_observacion' => $v->controlexcepcion_observacion,
                        'controlexcepcion_estado' => $v->controlexcepcion_estado,
                        'controlexcepcion_estado_descripcion' => $v->controlexcepcion_estado_descripcion,
                        'controlexcepcion_user_reg_id' => $v->controlexcepcion_user_reg_id,
                        'controlexcepcion_user_registrador' => $v->controlexcepcion_user_registrador,
                        'controlexcepcion_fecha_reg' => $v->controlexcepcion_fecha_reg != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_reg)) : "",
                        'controlexcepcion_user_ver_id' => $v->controlexcepcion_user_ver_id,
                        'controlexcepcion_user_verificador' => $v->controlexcepcion_user_verificador,
                        'controlexcepcion_fecha_ver' => $v->controlexcepcion_fecha_ver != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_ver)) : "",
                        'controlexcepcion_user_apr_id' => $v->controlexcepcion_user_apr_id,
                        'controlexcepcion_user_aprobador' => $v->controlexcepcion_user_aprobador,
                        'controlexcepcion_fecha_apr' => $v->controlexcepcion_fecha_apr != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_apr)) : "",
                        'controlexcepcion_user_mod_id' => $v->controlexcepcion_user_mod_id,
                        'controlexcepcion_user_modificador' => $v->controlexcepcion_user_modificador,
                        'controlexcepcion_fecha_mod' => $v->controlexcepcion_fecha_mod != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_mod)) : "",
                        /*'excepcion_id'=>$v->id_excepcion,*/
                        'excepcion_id' => $v->excepcion_id,
                        'excepcion' => $v->excepcion,
                        'tipoexcepcion_id' => $v->tipoexcepcion_id,
                        'tipo_excepcion' => $v->tipo_excepcion,
                        'codigo' => $v->codigo,
                        'color' => $v->color,
                        'compensatoria' => $v->compensatoria,
                        'compensatoria_descripcion' => $v->compensatoria_descripcion,
                        'genero_id' => $v->genero_id,
                        'genero' => $v->genero,
                        'cantidad' => $v->cantidad,
                        'unidad' => $v->unidad,
                        'fraccionamiento' => $v->fraccionamiento,
                        'frecuencia_descripcion' => $v->frecuencia_descripcion,
                        'redondeo' => $v->redondeo,
                        'redondeo_descripcion' => $v->redondeo_descripcion,
                        'horario' => $v->horario,
                        'horario_descripcion' => $v->horario_descripcion,
                        'refrigerio' => $v->refrigerio,
                        'refrigerio_descripcion' => $v->refrigerio_descripcion,
                        'observacion' => $v->observacion,
                        'estado' => $v->estado,
                        'estado_descripcion' => $v->estado_descripcion,
                        'baja_logica' => $v->baja_logica,
                        'agrupador' => $v->agrupador,
                        'boleta' => $v->agrupador,
                        'boleta_descripcion' => $v->agrupador == 1 ? "SI" : "NO",
                        'user_reg_id' => $v->user_reg_id,
                        'fecha_reg' => $v->fecha_reg,
                        'user_mod_id' => $v->user_mod_id,
                        'fecha_mod' => $v->fecha_mod
                    );
                }
            }
        $data[] = array(
            'TotalRows' => $total_rows,
            'Rows' => $controlexcepciones
        );
        echo json_encode($data);
    }

    /**
     * Función para la obtención del listado de excepciones para una gestión y mes determinados.
     */
    public function listbyyearandmonthAction()
    {
        $this->view->disable();
        $obj = new Fcontrolexcepciones();
        $controlexcepciones = Array();
        $registros = array();
        $where = "";
        $group = "";
        $gestion = $_GET['gestion'];
        $mes = $_GET['mes'];
        $total_rows = 0;
        $resul = $obj->getAllByYearAndMonth(0,$gestion,$mes,$where,$group);
        if (count($resul) > 0) {
            foreach ($resul as $v) {
                $controlexcepciones[] = array(
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
                    'relaboral_previo_id' => $v->relaboral_previo_id,
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
                    'id' => $v->id_controlexcepcion,
                    'id_relaboral' => $v->id_relaboral,
                    'controlexcepcion_fecha_ini' => $v->controlexcepcion_fecha_ini != "" ? date("d-m-Y", strtotime($v->controlexcepcion_fecha_ini)) : "",
                    'controlexcepcion_hora_ini' => $v->controlexcepcion_hora_ini,
                    'controlexcepcion_fecha_fin' => $v->controlexcepcion_fecha_fin != "" ? date("d-m-Y", strtotime($v->controlexcepcion_fecha_fin)) : "",
                    'controlexcepcion_hora_fin' => $v->controlexcepcion_hora_fin,
                    'justificacion' => $v->justificacion,
                    'turno' => $v->turno,
                    'turno_descripcion' => $v->compensatoria == 1 ? $v->turno != null ? $v->turno . "°" : null : null,
                    'entrada_salida' => $v->entrada_salida,
                    'entrada_salida_descripcion' => $v->compensatoria == 1 ? $v->entrada_salida == 0 ? "ENTRADA" : "SALIDA" : null,
                    'controlexcepcion_observacion' => $v->controlexcepcion_observacion,
                    'controlexcepcion_estado' => $v->controlexcepcion_estado,
                    'controlexcepcion_estado_descripcion' => $v->controlexcepcion_estado_descripcion,
                    'controlexcepcion_user_reg_id' => $v->controlexcepcion_user_reg_id,
                    'controlexcepcion_user_registrador' => $v->controlexcepcion_user_registrador,
                    'controlexcepcion_fecha_reg' => $v->controlexcepcion_fecha_reg != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_reg)) : "",
                    'controlexcepcion_user_ver_id' => $v->controlexcepcion_user_ver_id,
                    'controlexcepcion_user_verificador' => $v->controlexcepcion_user_verificador,
                    'controlexcepcion_fecha_ver' => $v->controlexcepcion_fecha_ver != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_ver)) : "",
                    'controlexcepcion_user_apr_id' => $v->controlexcepcion_user_apr_id,
                    'controlexcepcion_user_aprobador' => $v->controlexcepcion_user_aprobador,
                    'controlexcepcion_fecha_apr' => $v->controlexcepcion_fecha_apr != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_apr)) : "",
                    'controlexcepcion_user_mod_id' => $v->controlexcepcion_user_mod_id,
                    'controlexcepcion_user_modificador' => $v->controlexcepcion_user_modificador,
                    'controlexcepcion_fecha_mod' => $v->controlexcepcion_fecha_mod != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_mod)) : "",
                    /*'excepcion_id'=>$v->id_excepcion,*/
                    'excepcion_id' => $v->excepcion_id,
                    'excepcion' => $v->excepcion,
                    'tipoexcepcion_id' => $v->tipoexcepcion_id,
                    'tipo_excepcion' => $v->tipo_excepcion,
                    'codigo' => $v->codigo,
                    'color' => $v->color,
                    'compensatoria' => $v->compensatoria,
                    'compensatoria_descripcion' => $v->compensatoria_descripcion,
                    'excepcion_genero_id' => $v->excepcion_genero_id,
                    'excepcion_genero' => $v->excepcion_genero,
                    'cantidad' => $v->cantidad,
                    'unidad' => $v->unidad,
                    'fraccionamiento' => $v->fraccionamiento,
                    'frecuencia_descripcion' => $v->frecuencia_descripcion,
                    'redondeo' => $v->redondeo,
                    'redondeo_descripcion' => $v->redondeo_descripcion,
                    'horario' => $v->horario,
                    'horario_descripcion' => $v->horario_descripcion,
                    'refrigerio' => $v->refrigerio,
                    'refrigerio_descripcion' => $v->refrigerio_descripcion,
                    'observacion' => $v->observacion,
                    'estado' => $v->estado,
                    'estado_descripcion' => $v->estado_descripcion
                );
            }
        }
        echo json_encode($controlexcepciones);
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
        $idRelaboral = 0;
        $data = array();
        if (isset($_GET["id"])) {
            $idRelaboral = $_GET["id"];
            $where = "";
            $pagenum = $_GET['pagenum'];
            $pagesize = $_GET['pagesize'];
            $total_rows = 0;
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
            if ($idRelaboral > 0) {
                $resul = $obj->getAllByOneRelaboral($idRelaboral, $where, "", $start, $pagesize);
                //comprobamos si hay filas
                if (count($resul) > 0) {
                    $cex = Controlexcepciones::find(array("relaboral_id = " . $idRelaboral . " AND baja_logica=1"));
                    $total_rows = $cex->count();
                    foreach ($resul as $v) {
                        $controlexcepciones[] = array(
                            'nro_row' => 0,
                            'id' => $v->id_controlexcepcion,
                            'id_relaboral' => $v->id_relaboral,
                            'fecha_ini' => $v->fecha_ini != "" ? date("d-m-Y", strtotime($v->fecha_ini)) : "",
                            'hora_ini' => $v->hora_ini,
                            'fecha_fin' => $v->fecha_fin != "" ? date("d-m-Y", strtotime($v->fecha_fin)) : "",
                            'hora_fin' => $v->hora_fin,
                            'justificacion' => $v->justificacion,
                            'turno' => $v->turno,
                            'turno_descripcion' => $v->compensatoria == 1 ? $v->turno != null ? $v->turno . "°" : null : null,
                            'entrada_salida' => $v->entrada_salida,
                            'entrada_salida_descripcion' => $v->compensatoria == 1 ? $v->entrada_salida == 0 ? "ENTRADA" : "SALIDA" : null,
                            'controlexcepcion_observacion' => $v->controlexcepcion_observacion,
                            'controlexcepcion_estado' => $v->controlexcepcion_estado,
                            'controlexcepcion_estado_descripcion' => $v->controlexcepcion_estado_descripcion,
                            'controlexcepcion_user_reg_id' => $v->controlexcepcion_user_reg_id,
                            'controlexcepcion_user_registrador' => $v->controlexcepcion_user_registrador,
                            'controlexcepcion_fecha_reg' => $v->controlexcepcion_fecha_reg != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_reg)) : "",
                            'controlexcepcion_user_ver_id' => $v->controlexcepcion_user_ver_id,
                            'controlexcepcion_user_verificador' => $v->controlexcepcion_user_verificador,
                            'controlexcepcion_fecha_ver' => $v->controlexcepcion_fecha_ver != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_ver)) : "",
                            'controlexcepcion_user_apr_id' => $v->controlexcepcion_user_apr_id,
                            'controlexcepcion_user_aprobador' => $v->controlexcepcion_user_aprobador,
                            'controlexcepcion_fecha_apr' => $v->controlexcepcion_fecha_apr != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_apr)) : "",
                            'controlexcepcion_user_mod_id' => $v->controlexcepcion_user_mod_id,
                            'controlexcepcion_user_modificador' => $v->controlexcepcion_user_modificador,
                            'controlexcepcion_fecha_mod' => $v->controlexcepcion_fecha_mod != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_mod)) : "",
                            /*'excepcion_id'=>$v->id_excepcion,*/
                            'excepcion_id' => $v->excepcion_id,
                            'excepcion' => $v->excepcion,
                            'tipoexcepcion_id' => $v->tipoexcepcion_id,
                            'tipo_excepcion' => $v->tipo_excepcion,
                            'codigo' => $v->codigo,
                            'color' => $v->color,
                            'compensatoria' => $v->compensatoria,
                            'compensatoria_descripcion' => $v->compensatoria_descripcion,
                            'genero_id' => $v->genero_id,
                            'genero' => $v->genero,
                            'cantidad' => $v->cantidad,
                            'unidad' => $v->unidad,
                            'fraccionamiento' => $v->fraccionamiento,
                            'frecuencia_descripcion' => $v->frecuencia_descripcion,
                            'redondeo' => $v->redondeo,
                            'redondeo_descripcion' => $v->redondeo_descripcion,
                            'horario' => $v->horario,
                            'horario_descripcion' => $v->horario_descripcion,
                            'refrigerio' => $v->refrigerio,
                            'refrigerio_descripcion' => $v->refrigerio_descripcion,
                            'observacion' => $v->observacion,
                            'estado' => $v->estado,
                            'estado_descripcion' => $v->estado_descripcion,
                            'baja_logica' => $v->baja_logica,
                            'agrupador' => $v->agrupador,
                            'boleta' => $v->agrupador,
                            'boleta_descripcion' => $v->agrupador == 1 ? "SI" : "NO",
                            'user_reg_id' => $v->user_reg_id,
                            'fecha_reg' => $v->fecha_reg,
                            'user_mod_id' => $v->user_mod_id,
                            'fecha_mod' => $v->fecha_mod
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
     * Función para la obtención del listado de controles de excepción para un registro de relación laboral considerando un rango de fechas.
     * El resultado repite registro de acuerdo a cada fecha dentro del rango de fechas.
     */
    public function listporrelaboralyrangoAction()
    {
        $this->view->disable();
        $controlexcepciones = Array();
        if (isset($_POST["id_relaboral"]) && $_POST["id_relaboral"] > 0 && isset($_POST["fecha_ini"]) && isset($_POST["fecha_fin"])) {
            $obj = new Fcontrolexcepciones();
            $idRelaboral = $_POST["id_relaboral"];
            $fechaIni = $_POST["fecha_ini"];
            $fechaFin = $_POST["fecha_fin"];
            $resul = $obj->getAllByRelaboralAndRange($idRelaboral, $fechaIni, $fechaFin);
            //comprobamos si hay filas
            if ($resul->count() > 0) {
                foreach ($resul as $v) {
                    $controlexcepciones[] = array(
                        'nro_row' => 0,
                        'id' => $v->id_controlexcepcion,
                        'id_relaboral' => $v->id_relaboral,
                        'fecha_ini' => $v->fecha_ini,
                        'hora_ini' => $v->hora_ini,
                        'fecha_fin' => $v->fecha_fin,
                        'hora_fin' => $v->hora_fin,
                        'justificacion' => $v->justificacion,
                        'controlexcepcion_observacion' => $v->controlexcepcion_observacion,
                        'controlexcepcion_estado' => $v->controlexcepcion_estado,
                        'controlexcepcion_estado_descripcion' => $v->controlexcepcion_estado_descripcion,
                        'controlexcepcion_user_reg_id' => $v->controlexcepcion_user_reg_id,
                        'controlexcepcion_user_registrador' => $v->controlexcepcion_user_registrador,
                        'controlexcepcion_fecha_reg' => $v->controlexcepcion_fecha_reg != "" ? date("Y-m-d H:i:s", strtotime($v->controlexcepcion_fecha_reg)) : "",
                        'controlexcepcion_user_ver_id' => $v->controlexcepcion_user_ver_id,
                        'controlexcepcion_user_verificador' => $v->controlexcepcion_user_verificador,
                        'controlexcepcion_fecha_ver' => $v->controlexcepcion_fecha_ver != "" ? date("Y-m-d H:i:s", strtotime($v->controlexcepcion_fecha_ver)) : "",
                        'controlexcepcion_user_apr_id' => $v->controlexcepcion_user_apr_id,
                        'controlexcepcion_user_aprobador' => $v->controlexcepcion_user_aprobador,
                        'controlexcepcion_fecha_apr' => $v->controlexcepcion_fecha_apr != "" ? date("Y-m-d H:i:s", strtotime($v->controlexcepcion_fecha_apr)) : "",
                        'controlexcepcion_user_mod_id' => $v->controlexcepcion_user_mod_id,
                        'controlexcepcion_user_modificador' => $v->controlexcepcion_user_modificador,
                        'controlexcepcion_fecha_mod' => $v->controlexcepcion_fecha_mod != "" ? date("Y-m-d H:i:s", strtotime($v->controlexcepcion_fecha_mod)) : "",
                        'excepcion_id' => $v->excepcion_id,
                        'excepcion' => $v->excepcion,
                        'tipoexcepcion_id' => $v->tipoexcepcion_id,
                        'tipo_excepcion' => $v->tipo_excepcion,
                        'codigo' => $v->codigo,
                        'color' => $v->color,
                        'compensatoria' => $v->compensatoria,
                        'compensatoria_descripcion' => $v->compensatoria_descripcion,
                        'genero_id' => $v->genero_id,
                        'genero' => $v->genero,
                        'cantidad' => $v->cantidad,
                        'unidad' => $v->unidad,
                        'fraccionamiento' => $v->fraccionamiento,
                        'frecuencia_descripcion' => $v->frecuencia_descripcion,
                        'redondeo' => $v->redondeo,
                        'redondeo_descripcion' => $v->redondeo_descripcion,
                        'horario' => $v->horario,
                        'horario_descripcion' => $v->horario_descripcion,
                        'refrigerio' => $v->refrigerio,
                        'refrigerio_descripcion' => $v->refrigerio_descripcion,
                        'observacion' => $v->observacion,
                        'estado' => $v->estado,
                        'estado_descripcion' => $v->estado_descripcion,
                        'baja_logica' => $v->baja_logica,
                        'agrupador' => $v->agrupador,
                        'user_reg_id' => $v->user_reg_id,
                        'fecha_reg' => $v->fecha_reg != "" ? date("Y-m-d", strtotime($v->fecha_reg)) : "",
                        'user_mod_id' => $v->user_mod_id,
                        'fecha_mod' => $v->fecha_mod,
                        'fecha' => $v->fecha != "" ? date("Y-m-d", strtotime($v->fecha)) : "",
                        'dia' => $v->dia,
                        'dia_nombre' => $v->dia_nombre,
                        'dia_nombre_abr_ing' => $v->dia_nombre_abr_ing
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
            $arrFechaIni = explode("-", $fechaIni);
            $gestionFechaIni = intval($arrFechaIni[2]);
            $horaIni = $_POST['hora_ini'];
            $fechaFin = $_POST['fecha_fin'];
            $horaFin = $_POST['hora_fin'];
            $justificacion = $_POST['justificacion'];
            $turno = $_POST['turno'];
            $entradaSalida = $_POST['entrada_salida'];
            $horario = $_POST['horario'];
            $observacion = $_POST['observacion'];
            if ($idRelaboral > 0 && $idExcepcion > 0 && $fechaIni != '' && $fechaFin != '' && $justificacion != '') {
                $objControlExcepciones = Controlexcepciones::findFirst(array("id=" . $_POST["id"]));
                if (count($objControlExcepciones) > 0) {
                    if ($horario == 1)
                        $cantMismosDatos = Controlexcepciones::count(array("id!=" . $_POST["id"] . " AND relaboral_id=" . $idRelaboral . " AND excepcion_id = " . $idExcepcion . " AND fecha_ini='" . $fechaIni . "' AND hora_ini='" . $horaIni . "' AND fecha_fin = '" . $fechaFin . "' AND hora_fin='" . $horaFin . "' AND baja_logica=1 AND estado>=0"));
                    else
                        $cantMismosDatos = Controlexcepciones::count(array("id!=" . $_POST["id"] . " AND relaboral_id=" . $idRelaboral . " AND excepcion_id = " . $idExcepcion . " AND fecha_ini='" . $fechaIni . "' AND fecha_fin = '" . $fechaFin . "' AND baja_logica=1 AND estado>=0"));
                    if ($cantMismosDatos == 0) {
                        if ($horario == 0) {
                            $datetimeIni = new DateTime();
                            $datetimeIni->setTime(0, 0, 0);
                            $datetimeIni->format('H:i:s');
                            $horaIni = $datetimeIni->format('H:i:s');
                            $datetimeFin = new DateTime();
                            $datetimeFin->setTime(23, 59, 59);
                            $datetimeFin->format('H:i:s');
                            $horaFin = $datetimeFin->format('H:i:s');
                        }
                        $objControlExcepciones->relaboral_id = $idRelaboral;
                        $objControlExcepciones->excepcion_id = $idExcepcion;
                        $objControlExcepciones->fecha_ini = $fechaIni;
                        $objControlExcepciones->fecha_fin = $fechaFin;
                        $objControlExcepciones->hora_ini = $horaIni;
                        $objControlExcepciones->hora_fin = $horaFin;
                        $objControlExcepciones->justificacion = $justificacion;
                        if ($turno > 0) {
                            $objControlExcepciones->turno = $turno;
                        } else $objControlExcepciones->turno = null;
                        if ($entradaSalida >= 0) {
                            $objControlExcepciones->entrada_salida = $entradaSalida;
                        } else $objControlExcepciones->entrada_salida = null;
                        $objControlExcepciones->observacion = $observacion;
                        $objControlExcepciones->user_mod_id = $user_mod_id;
                        $objControlExcepciones->fecha_mod = $hoy;
                        try {
                            $ok = $objControlExcepciones->save();
                            if ($ok) {
                                $correlativo = Controlexcepcionescorrelativo::findFirst(array("excepcion_id=" . $objControlExcepciones->id . " AND baja_logica=1"));
                                if (!is_object($correlativo)) {
                                    /**
                                     * Es necesario crear el correlativo del formulario de excepcíon.
                                     */
                                    $correlativo = new Controlexcepcionescorrelativo();
                                    $correlativo->controlexcepcion_id = $objControlExcepciones->id;
                                    $correlativo->gestion = $gestionFechaIni;

                                    $maximo = Controlexcepcionescorrelativo::maximum(
                                        array(
                                            "column" => "numero",
                                            "conditions" => "gestion=" . $gestionFechaIni . " AND baja_logica=1"
                                        )
                                    );
                                    /**
                                     * Ver como hacerlo rápido
                                     */
                                    $correlativo->numero = $maximo + 1;
                                    $correlativo->estado = 1;
                                    $correlativo->baja_logica = 1;
                                    $correlativo->estado = 1;
                                    $correlativo->agrupador = 0;
                                    $okc = $correlativo->save();
                                    if ($okc) {
                                        $msj = array('result' => 1, 'msj' => '&Eacute;xito: Se modific&oacute; correctamente el registro del control de excepci&oacute;n. ');
                                    } else {
                                        $msj = array('result' => 1, 'msj' => '&Eacute;xito: Se modific&oacute; correctamente el registro del control de excepci&oacute;n. Sin embargo, el correlativo no.');
                                    }
                                } else $msj = array('result' => 1, 'msj' => '&Eacute;xito: Se modific&oacute; correctamente el registro del control de excepci&oacute;n. ');
                            } else {
                                $msj = array('result' => 0, 'msj' => 'Error: No se modific&oacute; el registro del control de excepci&oacute;n.');
                            }
                        } catch (\Exception $e) {
                            echo get_class($e), ": ", $e->getMessage(), "\n";
                            echo " File=", $e->getFile(), "\n";
                            echo " Line=", $e->getLine(), "\n";
                            echo $e->getTraceAsString();
                            $msj = array('result' => -1, 'msj' => 'Error cr&iacute;tico: No se guard&oacute; el registro del control de excepci&oacute;n.');
                        }
                    } else $msj = array('result' => 0, 'msj' => 'Error: Los datos enviados son similares a otro registro existente, debe modificar los valores necesariamente.');
                }
            } else {
                $msj = array('result' => 0, 'msj' => 'Error: Los datos enviados no cumplen los criterios necesarios para su registro.');
            }
        } else {
            /**
             * Registro de Control de Excepción
             */
            $idRelaboral = $_POST['relaboral_id'];
            $idExcepcion = $_POST['excepcion_id'];
            $fechaIni = $_POST['fecha_ini'];
            $arrFechaIni = explode("-", $fechaIni);
            $gestionFechaIni = intval($arrFechaIni[2]);
            $horaIni = $_POST['hora_ini'];
            $fechaFin = $_POST['fecha_fin'];
            $horaFin = $_POST['hora_fin'];
            $justificacion = $_POST['justificacion'];
            $turno = $_POST['turno'];
            $entradaSalida = $_POST['entrada_salida'];
            $horario = $_POST['horario'];
            $observacion = $_POST['observacion'];
            if ($idRelaboral > 0 && $idExcepcion > 0 && $fechaIni != '' && $fechaFin != '' && $justificacion != '') {
                if ($horario == 1)
                    $cantMismosDatos = Controlexcepciones::count(array("relaboral_id=" . $idRelaboral . " AND excepcion_id = " . $idExcepcion . " AND fecha_ini='" . $fechaIni . "' AND hora_ini='" . $horaIni . "' AND fecha_fin = '" . $fechaFin . "' AND hora_fin='" . $horaFin . "' AND baja_logica=1 AND estado>=0"));
                else
                    $cantMismosDatos = Controlexcepciones::count(array("relaboral_id=" . $idRelaboral . " AND excepcion_id = " . $idExcepcion . " AND fecha_ini='" . $fechaIni . "' AND fecha_fin = '" . $fechaFin . "' AND baja_logica=1 AND estado>=0"));
                if ($cantMismosDatos == 0) {
                    if ($horario == 0) {
                        $datetimeIni = new DateTime();
                        $datetimeIni->setTime(0, 0, 0);
                        $datetimeIni->format('H:i:s');
                        $horaIni = $datetimeIni->format('H:i:s');
                        $datetimeFin = new DateTime();
                        $datetimeFin->setTime(23, 59, 59);
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
                    $objControlExcepciones->justificacion = $justificacion;
                    if ($turno > 0) {
                        $objControlExcepciones->turno = $turno;
                    } else $objControlExcepciones->turno = null;
                    if ($entradaSalida >= 0) {
                        $objControlExcepciones->entrada_salida = $entradaSalida;
                    } else $objControlExcepciones->entrada_salida = null;
                    $objControlExcepciones->observacion = $observacion;
                    $objControlExcepciones->estado = 2;
                    $objControlExcepciones->baja_logica = 1;
                    $objControlExcepciones->agrupador = 0;
                    $objControlExcepciones->user_reg_id = $user_reg_id;
                    $objControlExcepciones->fecha_reg = $hoy;
                    try {
                        $ok = $objControlExcepciones->save();
                        if ($ok) {

                            /**
                             * Es necesario crear el correlativo del formulario de excepcíon.
                             */
                            $correlativo = new Controlexcepcionescorrelativo();
                            $correlativo->controlexcepcion_id = $objControlExcepciones->id;
                            $correlativo->gestion = $gestionFechaIni;

                            $maximo = Controlexcepcionescorrelativo::maximum(
                                array(
                                    "column" => "numero",
                                    "conditions" => "gestion=" . $gestionFechaIni . " AND baja_logica=1"
                                )
                            );
                            if ($maximo == null) $maximo = 0;
                            /**
                             * Ver como hacerlo rápido
                             */
                            $correlativo->numero = ($maximo + 1);
                            $correlativo->estado = 1;
                            $correlativo->baja_logica = 1;
                            $correlativo->agrupador = 1;
                            $okc = $correlativo->save();
                            if ($okc) {
                                $msj = array('result' => 1, 'msj' => '&Eacute;xito: Se guard&oacute; correctamente.');
                            } else {
                                $msj = array('result' => 0, 'msj' => '&Eacute;xito: Se guard&oacute; correctamente. Sin embargo, el correlativo no.');
                            }
                        } else {
                            $msj = array('result' => 0, 'msj' => 'Error: No se registr&oacute;.');
                        }
                    } catch (\Exception $e) {
                        echo get_class($e), ": ", $e->getMessage(), "\n";
                        echo " File=", $e->getFile(), "\n";
                        echo " Line=", $e->getLine(), "\n";
                        echo $e->getTraceAsString();
                        $msj = array('result' => -1, 'msj' => 'Error cr&iacute;tico: No se guard&oacute; el registro del control de excepci&oacute;n.');
                    }
                } else {
                    $msj = array('result' => 0, 'msj' => 'Error: Existe registro de control de excepci&oacute;n con datos similares.');
                }
            } else {
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
                    $objControlExcepciones->estado = 6;
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
    {
        $this->view->disable();
        $id_controlexcepcion = base64_decode(str_pad(strtr($id_controlexcepcion, '-_', '+/'), strlen($id_controlexcepcion) % 4, '=', STR_PAD_RIGHT));
        $id_controlexcepcion = json_decode($id_controlexcepcion, true);
        $pdf = new pdfoasis('P', 'mm', 'Letter');
        $pdf->alignTitleSelecteds = array("C", "C", "C");
        $pdf->pageWidth = 215.9;
        $pdf->debug = 0;
        if ($pdf->debug == 1) {
            echo "<p>id_controlexcepcion: " . $id_controlexcepcion;
        }
        $pdf->title_rpt = utf8_decode('FORMULARIO DE PERMISOS');
        $pdf->title_total_rpt = utf8_decode('Cuadro Resumen de Datos Marcaciones');
        $pdf->header_title_empresa_rpt = utf8_decode('Empresa Estatal de Transporte por Cable "Mi Teleférico"');
        $pdf->AddPage();
        $objA = new Fcontrolexcepciones();
        $objCE = $objA->getOne($id_controlexcepcion);
        $objCorr = Controlexcepcionescorrelativo::findFirst(array("controlexcepcion_id=" . $id_controlexcepcion));
        $tempDir = "files/";
        if ($pdf->debug == 0) {
            if (is_object($objCE)) {
                $objB = new Frelaborales();
                $objR = $objB->getOneRelaboralConsiderandoUltimaMovilidad($objCE->id_relaboral);
                if (is_object($objR)) {
                    //$pdf->crearCodigoConDatosQR($tempDir,$objR,$objCE,$objCorr);*/
                    $pdf->crearCodigoConUrlQR($tempDir, $objR, $objCE, $objCorr);
                    $pdf->Body($tempDir, $objR, $objCE, $objCorr);
                }
            }
        }
        $pdf->FechaHoraReporte = date("d-m-Y H:i:s");
        $pdf->ShowLeftFooter = true;
        if ($pdf->debug == 0) $pdf->Output('form_controlexcepcion.pdf', 'I');
    }

    public function exportpdfcountAction($n_rows, $gestion,$mes,$columns, $filtros,$groups,$sorteds)
    {   $columns = base64_decode(str_pad(strtr($columns, '-_', '+/'), strlen($columns) % 4, '=', STR_PAD_RIGHT));
        $filtros = base64_decode(str_pad(strtr($filtros, '-_', '+/'), strlen($columns) % 4, '=', STR_PAD_RIGHT));
        $groups = base64_decode(str_pad(strtr($groups, '-_', '+/'), strlen($groups) % 4, '=', STR_PAD_RIGHT));
        if($groups=='null'||$groups==null)$groups="";
        $sorteds = base64_decode(str_pad(strtr($sorteds, '-_', '+/'), strlen($sorteds) % 4, '=', STR_PAD_RIGHT));
        $columns = json_decode($columns, true);
        $filtros = json_decode($filtros, true);
        $sub_keys = array_keys($columns);//echo $sub_keys[0];
        $n_col = count($columns);//echo$keys[1];
        $sorteds = json_decode($sorteds, true);
        /**
         * Especificando la configuración de las columnas
         */
        $generalConfigForAllColumns = array(
            'nro_row' => array('title' => 'Nro.', 'width' => 8, 'title-align'=>'C','align' => 'C', 'type' => 'int4'),
            'ubicacion' => array('title' => 'Ubicacion', 'width' => 20, 'align' => 'C', 'type' => 'varchar'),
            'condicion' => array('title' => 'Condicion', 'width' => 20, 'align' => 'C', 'type' => 'varchar'),
            'estado_descripcion' => array('title' => 'Estado', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'nombres' => array('title' => 'Nombres', 'width' => 30, 'align' => 'L', 'type' => 'varchar'),
            'ci' => array('title' => 'CI', 'width' => 12, 'align' => 'C', 'type' => 'varchar'),
            'expd' => array('title' => 'Exp.', 'width' => 8, 'align' => 'C', 'type' => 'bpchar'),
            'gerencia_administrativa' => array('title' => 'Gerencia', 'width' => 30, 'align' => 'L', 'type' => 'varchar'),
            'departamento_administrativo' => array('title' => 'Departamento', 'width' => 30, 'align' => 'L', 'type' => 'varchar'),
            'area' => array('title' => 'Area', 'width' => 20, 'align' => 'L', 'type' => 'varchar'),
            'proceso_codigo' => array('title' => 'Proceso', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'fin_partida' => array('title' => 'Fuente', 'width' => 30, 'align' => 'L', 'type' => 'varchar'),
            'nivelsalarial' => array('title' => 'Nivel', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'cargo' => array('title' => 'Cargo', 'width' => 30, 'align' => 'L', 'type' => 'varchar'),
            'sueldo' => array('title' => 'Haber', 'width' => 10, 'align' => 'R', 'type' => 'numeric'),
            'fecha_ing' => array('title' => 'Fecha Ing', 'width' => 18, 'align' => 'C', 'type' => 'date'),
            'fecha_ini' => array('title' => 'Fecha Ini', 'width' => 18, 'align' => 'C', 'type' => 'date'),
            'fecha_incor' => array('title' => 'Fecha Inc', 'width' => 18, 'align' => 'C', 'type' => 'date'),
            'fecha_fin' => array('title' => 'Fecha Fin', 'width' => 18, 'align' => 'C', 'type' => 'date'),
            'fecha_baja' => array('title' => 'Fecha Baja', 'width' => 18, 'align' => 'C', 'type' => 'date'),
            'motivo_baja' => array('title' => 'Motivo Baja', 'width' => 20, 'align' => 'L', 'type' => 'varchar'),
            'observacion' => array('title' => 'Obs.', 'width' => 15, 'align' => 'L', 'type' => 'varchar'),
            'controlexcepcion_estado_descripcion' => array('title' => 'Estado', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'tipo_excepcion' => array('title' => 'Tipo Excep.', 'width' => 25, 'align' => 'J', 'type' => 'varchar'),
            'excepcion' => array('title' => 'Excepcion', 'width' => 20, 'align' => 'J', 'type' => 'varchar'),
            'codigo' => array('title' => 'Codigo', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'color' => array('title' => 'Color', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'controlexcepcion_fecha_ini' => array('title' => 'Controlexcepcion Fecha Ini', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'controlexcepcion_hora_ini' => array('title' => 'Controlexcepcion Hora Ini', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'controlexcepcion_fecha_fin' => array('title' => 'Controlexcepcion Fecha Fin', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'controlexcepcion_hora_fin' => array('title' => 'Controlexcepcion Hora Fin', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'excepcion_genero' => array('title' => 'Excepcion Genero', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'frecuencia_descripcion' => array('title' => 'Frecuencia Descripcion', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'compensatoria_descripcion' => array('title' => 'Compensatoria Descripcion', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'horario_descripcion' => array('title' => 'Horario Descripcion', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'refrigerio_descripcion' => array('title' => 'Pagar Refrigerio', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'turno_descripcion' => array('title' => 'Turno', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'entrada_salida_descripcion' => array('title' => 'Entrada/Salida', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'controlexcepcion_user_registrador' => array('title' => 'Registrador', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'controlexcepcion_fecha_reg' => array('title' => 'Estado', 'width' => 15,'align' => 'C', 'type' => 'varchar'),
            'controlexcepcion_user_verificador' => array('title' => 'Verificador', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'controlexcepcion_fecha_ver' => array('title' => 'Fecha Ver.', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'controlexcepcion_user_aprobador' => array('title' => 'Aprobador', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'controlexcepcion_fecha_apr' => array('title' => 'Fecha Apr.', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'controlexcepcion_observacion' => array('title' => 'Controlexcepcion Observacion', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
        );
        $agruparPor = ($groups!="")?explode(",",$groups):array();
        $widthsSelecteds = $this->DefineWidths($generalConfigForAllColumns, $columns,$agruparPor);
        $ancho = 0;
        if(count($widthsSelecteds)>0) {
            foreach ($widthsSelecteds as $w) {
                $ancho = $ancho + $w;
            }
            if ($ancho > 215.9) {
                if ($ancho > 270) {
                    $pdf = new pdfoasis('L', 'mm', 'Legal');
                    $pdf->pageWidth = 355;
                } else {
                    $pdf = new pdfoasis('L', 'mm', 'Letter');
                    $pdf->pageWidth = 280;
                }
            } else {
                $pdf = new pdfoasis('P', 'mm', 'Letter');
                $pdf->pageWidth = 215.9;
            }
            $pdf->tableWidth = $ancho;
            #region Proceso de generación del documento PDF
            $pdf->debug = 0;
            $pdf->title_rpt = utf8_decode('Reporte Relación Laboral');
            $pdf->header_title_empresa_rpt = utf8_decode('Empresa Estatal de Transporte por Cable "Mi Teleférico"');
            $alignSelecteds = $pdf->DefineAligns($generalConfigForAllColumns, $columns, $agruparPor);
            $colSelecteds = $pdf->DefineCols($generalConfigForAllColumns, $columns, $agruparPor);
            $colTitleSelecteds = $pdf->DefineTitleCols($generalConfigForAllColumns, $columns, $agruparPor);
            $alignTitleSelecteds = $pdf->DefineTitleAligns(count($colTitleSelecteds));
            $gruposSeleccionadosActuales = $pdf->DefineDefaultValuesForGroups($groups);
            $pdf->generalConfigForAllColumns = $generalConfigForAllColumns;
            $pdf->colTitleSelecteds = $colTitleSelecteds;
            $pdf->widthsSelecteds = $widthsSelecteds;
            $pdf->alignSelecteds = $alignSelecteds;
            $pdf->alignTitleSelecteds = $alignTitleSelecteds;
            if ($pdf->debug == 1) {
                echo "<p>::::::::::::::::::::::::::::::::::::::::::::GESTION-MES::::::::::::::::::::::::::::::::::::::::::<p>";
                echo "<p>".$gestion."-".$mes."<p>";
                echo "<p>::::::::::::::::::::::::::::::::::::::::::::COLUMNAS::::::::::::::::::::::::::::::::::::::::::<p>";
                print_r($columns);
                echo "<p>::::::::::::::::::::::::::::::::::::::::::::FILTROS::::::::::::::::::::::::::::::::::::::::::<p>";
                print_r($filtros);
                echo "<p>::::::::::::::::::::::::::::::::::::::::::::GRUPOS::::::::::::::::::::::::::::::::::::::::::::<p>";
                echo "<p>" . $groups;
                echo "<p>::::::::::::::::::::::::::::::::::::::::::::ORDEN::::::::::::::::::::::::::::::::::::::::::::<p>";
                print_r($sorteds);
                echo "<p>:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::<p>";
            }
            $where = '';
            $yaConsiderados = array();
            for ($k = 0; $k < count($filtros); $k++) {
                $cant = $this->obtieneCantidadVecesConsideracionPorColumnaEnFiltros($filtros[$k]['columna'], $filtros);
                $arr_val = $this->obtieneValoresConsideradosPorColumnaEnFiltros($filtros[$k]['columna'], $filtros);

                for ($j = 0; $j < $n_col; $j++) {
                    if ($sub_keys[$j] == $filtros[$k]['columna']) {
                        $col_fil = $columns[$sub_keys[$j]]['text'];
                    }
                }
                if ($filtros[$k]['tipo'] == 'datefilter') {
                    $filtros[$k]['valor'] = date("Y-m-d", strtotime($filtros[$k]['valor']));
                }
                $cond_fil = ' ' . $col_fil;
                if (!in_array($filtros[$k]['columna'], $yaConsiderados)) {

                    if (strlen($where) > 0) {
                        switch ($filtros[$k]['condicion']) {
                            case 'EMPTY':
                                $where .= ' AND ';
                                break;
                            case 'NOT_EMPTY':
                                $where .= ' AND ';
                                break;
                            case 'CONTAINS':
                                $where .= ' AND ';
                                break;
                            case 'EQUAL':
                                $where .= ' AND ';
                                break;
                            case 'GREATER_THAN_OR_EQUAL':
                                $where .= ' AND ';
                                break;
                            case 'LESS_THAN_OR_EQUAL':
                                $where .= ' AND ';
                                break;
                        }
                    }
                }
                if ($cant > 1) {
                    if ($pdf->debug == 1) {
                        echo "<p>::::::::::::::::::::::::::::::::::::YA CONSIDERADOS:::::::::::::::::::::::::::::::::::::::::::::::<p>";
                        print_r($yaConsiderados);
                        echo "<p>::::::::::::::::::::::::::::::::::::YA CONSIDERADOS:::::::::::::::::::::::::::::::::::::::::::::::<p>";
                    }
                    if (!in_array($filtros[$k]['columna'], $yaConsiderados)) {
                        switch ($filtros[$k]['condicion']) {
                            case 'EMPTY':
                                $cond_fil .= utf8_encode(" que sea vacía ");
                                $where .= "(" . $filtros[$k]['columna'] . " IS NULL OR " . $filtros[$k]['columna'] . " ILIKE '')";
                                break;
                            case 'NOT_EMPTY':
                                $cond_fil .= utf8_encode(" que no sea vacía ");
                                $where .= "(" . $filtros[$k]['columna'] . " IS NOT NULL OR " . $filtros[$k]['columna'] . " NOT ILIKE '')";
                                break;
                            case 'CONTAINS':
                                $cond_fil .= utf8_encode(" que contenga el valor:  " . $filtros[$k]['valor']);
                                if ($filtros[$k]['columna'] == "nombres") {
                                    $where .= "(p_nombre ILIKE '%" . $filtros[$k]['valor'] . "%' OR s_nombre ILIKE '%" . $filtros[$k]['valor'] . "%' OR t_nombre ILIKE '%" . $filtros[$k]['valor'] . "%' OR p_apellido ILIKE '%" . $filtros[$k]['valor'] . "%' OR s_apellido ILIKE '%" . $filtros[$k]['valor'] . "%' OR c_apellido ILIKE '%" . $filtros[$k]['valor'] . "%')";
                                } else {
                                    $where .= $filtros[$k]['columna'] . " ILIKE '%" . $filtros[$k]['valor'] . "%'";
                                }
                                break;
                            case 'EQUAL':
                                $cond_fil .= utf8_encode(" que contenga el valor:  " . $filtros[$k]['valor']);
                                $ini = 0;
                                foreach ($arr_val as $col) {
                                    if ($pdf->debug == 1) {

                                        echo "<p>.........................recorriendo las columnas multiseleccionadas: .............................................";
                                        echo $filtros[$k]['columna'] . "-->" . $col;
                                        echo "<p>.........................recorriendo las columnas multiseleccionadas: .............................................";
                                    }
                                    if (isset($generalConfigForAllColumns[$filtros[$k]['columna']]['type'])) {
                                        //$where .= $filtros[$k]['columna']." ILIKE '".$filtros[$k]['valor']."'";
                                        if ($ini == 0) {
                                            $where .= " (";
                                        }
                                        switch (@$generalConfigForAllColumns[$filtros[$k]['columna']]['type']) {
                                            case 'int4':
                                            case 'numeric':
                                            case 'date':
                                                //$whereEqueals .= $filtros[$k]['columna']." = '".$filtros[$k]['valor']."'";
                                                $where .= $filtros[$k]['columna'] . " = '" . $col . "'";
                                                break;
                                            case 'varchar':
                                            case 'bpchar':
                                                //$whereEqueals .= $filtros[$k]['columna']." ILIKE '".$filtros[$k]['valor']."'";
                                                $where .= $filtros[$k]['columna'] . " ILIKE '" . $col . "'";
                                                break;
                                        }
                                        $ini++;
                                        if ($ini == count($arr_val)) {
                                            $where .= ") ";
                                        } else $where .= " OR ";
                                    }
                                }
                                break;
                            case 'GREATER_THAN_OR_EQUAL':
                                $cond_fil .= utf8_encode(" que sea mayor o igual que:  " . $filtros[$k]['valor']);
                                $ini = 0;
                                foreach ($arr_val as $col) {
                                    //$fecha = date("Y-m-d", $col);
                                    $fecha = $col;
                                    if (isset($generalConfigForAllColumns[$filtros[$k]['columna']]['type'])) {
                                        //$where .= $filtros[$k]['columna']." ILIKE '".$filtros[$k]['valor']."'";
                                        if ($ini == 0) {
                                            $where .= " (";
                                        }
                                        switch (@$generalConfigForAllColumns[$filtros[$k]['columna']]['type']) {
                                            case 'int4':
                                            case 'numeric':
                                                $where .= $filtros[$k]['columna'] . " = '" . $fecha . "'";
                                                break;
                                            case 'date':
                                                //$whereEqueals .= $filtros[$k]['columna']." = '".$filtros[$k]['valor']."'";
                                                if ($ini == 0) {
                                                    $where .= $filtros[$k]['columna'] . " BETWEEN ";
                                                } else {
                                                    $where .= " AND ";
                                                }
                                                $where .= "'" . $fecha . "'";

                                                break;
                                            case 'varchar':
                                            case 'bpchar':
                                                //$whereEqueals .= $filtros[$k]['columna']." ILIKE '".$filtros[$k]['valor']."'";
                                                $where .= $filtros[$k]['columna'] . " ILIKE '" . $col . "'";
                                                break;
                                        }
                                        $ini++;
                                        if ($ini == count($arr_val)) {
                                            $where .= ") ";
                                        }
                                    }
                                }
                                break;
                            case 'LESS_THAN_OR_EQUAL':
                                $cond_fil .= utf8_encode(" que sea menor o igual que:  " . $filtros[$k]['valor']);
                                $where .= $filtros[$k]['columna'] . ' <= "' . $filtros[$k]['valor'] . '"';
                                break;
                        }
                        $yaConsiderados[] = $filtros[$k]['columna'];
                    }
                } else {
                    switch ($filtros[$k]['condicion']) {
                        case 'EMPTY':
                            $cond_fil .= utf8_encode(" que sea vacía ");
                            $where .= "(" . $filtros[$k]['columna'] . " IS NULL OR " . $filtros[$k]['columna'] . " ILIKE '')";
                            break;
                        case 'NOT_EMPTY':
                            $cond_fil .= utf8_encode(" que no sea vacía ");
                            $where .= "(" . $filtros[$k]['columna'] . " IS NOT NULL OR " . $filtros[$k]['columna'] . " NOT ILIKE '')";
                            break;
                        case 'CONTAINS':
                            $cond_fil .= utf8_encode(" que contenga el valor:  " . $filtros[$k]['valor']);
                            if ($filtros[$k]['columna'] == "nombres") {
                                $where .= "(p_nombre ILIKE '%" . $filtros[$k]['valor'] . "%' OR s_nombre ILIKE '%" . $filtros[$k]['valor'] . "%' OR t_nombre ILIKE '%" . $filtros[$k]['valor'] . "%' OR p_apellido ILIKE '%" . $filtros[$k]['valor'] . "%' OR s_apellido ILIKE '%" . $filtros[$k]['valor'] . "%' OR c_apellido ILIKE '%" . $filtros[$k]['valor'] . "%')";
                            } else {
                                $where .= $filtros[$k]['columna'] . " ILIKE '%" . $filtros[$k]['valor'] . "%'";
                            }
                            break;
                        case 'EQUAL':
                            $cond_fil .= utf8_encode(" que contenga el valor:  " . $filtros[$k]['valor']);
                            if (isset($generalConfigForAllColumns[$filtros[$k]['columna']]['type'])) {
                                //$where .= $filtros[$k]['columna']." ILIKE '".$filtros[$k]['valor']."'";
                                switch (@$generalConfigForAllColumns[$filtros[$k]['columna']]['type']) {
                                    case 'int4':
                                    case 'numeric':
                                    case 'date':
                                        //$whereEqueals .= $filtros[$k]['columna']." = '".$filtros[$k]['valor']."'";
                                        $where .= $filtros[$k]['columna'] . " = '" . $filtros[$k]['valor'] . "'";
                                        break;
                                    case 'varchar':
                                    case 'bpchar':
                                        //$whereEqueals .= $filtros[$k]['columna']." ILIKE '".$filtros[$k]['valor']."'";
                                        $where .= $filtros[$k]['columna'] . " ILIKE '" . $filtros[$k]['valor'] . "'";
                                        break;
                                }
                            }
                            break;
                        case 'GREATER_THAN_OR_EQUAL':
                            $cond_fil .= utf8_encode(" que sea mayor o igual que:  " . $filtros[$k]['valor']);
                            $where .= $filtros[$k]['columna'] . ' >= "' . $filtros[$k]['valor'] . '"';
                            break;
                        case 'LESS_THAN_OR_EQUAL':
                            $cond_fil .= utf8_encode(" que sea menor o igual que:  " . $filtros[$k]['valor']);
                            $where .= $filtros[$k]['columna'] . ' <= "' . $filtros[$k]['valor'] . '"';
                            break;
                    }
                }

            }
            $obj = new Fcontrolexcepciones();
            if ($where != "") $where = " WHERE " . $where;
            $groups_aux = "";
            if ($groups != "") {
                /**
                 * Se verifica que no se considere la columna nombres debido a que contenido ya esta ordenado por las
                 * columnas p_apellido, s_apellido, c_apellido, p_anombre, s_nombre, t_nombre
                 */
                if (strrpos($groups, "nombres")) {
                    if (strrpos($groups, ",")) {
                        $arr = explode(",", $groups);
                        foreach ($arr as $val) {
                            if ($val != "nombres")
                                $groups_aux[] = $val;
                        }
                        $groups = implode(",", $groups_aux);
                    } else $groups = "";
                }
                if (is_array($sorteds) && count($sorteds) > 0) {
                    if ($groups != "") $groups .= ",";
                    $coma = "";
                    if ($pdf->debug == 1) {
                        echo "<p>===========================================Orden======================================</p>";
                        print_r($sorteds);
                        echo "<p>===========================================Orden======================================</p>";
                    }
                    foreach ($sorteds as $ord => $orden) {
                        $groups .= $coma . $ord;
                        if ($orden['asc'] == '') $groups .= " ASC"; else$groups .= " DESC";
                        $coma = ",";
                    }
                }
                if ($groups != "")
                    $groups = " ORDER BY " . $groups . ",p_apellido,s_apellido,c_apellido,p_nombre,s_nombre,t_nombre,id_da,fecha_ini";
                if ($pdf->debug == 1) echo "<p>La consulta es: " . $groups . "<p>";
            } else {
                if (is_array($sorteds) && count($sorteds) > 0) {
                    $coma = "";
                    if ($pdf->debug == 1) {
                        echo "<p>===========================================Orden======================================</p>";
                        print_r($sorteds);
                        echo "<p>===========================================Orden======================================</p>";
                    }
                    foreach ($sorteds as $ord => $orden) {
                        $groups .= $coma . $ord;
                        if ($orden['asc'] == '') $groups .= " ASC"; else$groups .= " DESC";
                        $coma = ",";
                    }
                    $groups = " ORDER BY " . $groups;
                }

            }
            if ($pdf->debug == 1) echo "<p>WHERE------------------------->" . $where . "<p>";
            if ($pdf->debug == 1) echo "<p>GROUP BY------------------------->" . $groups . "<p>";
            $resul = $obj->getAllByYearAndMonth(0,$gestion,$mes,$where,$groups);

            $relaboral = array();
            foreach ($resul as $v) {
                $relaboral[] = array(
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
                    'relaboral_previo_id' => $v->relaboral_previo_id,
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
                    'id' => $v->id_controlexcepcion,
                    'id_relaboral' => $v->id_relaboral,
                    'controlexcepcion_fecha_ini' => $v->controlexcepcion_fecha_ini != "" ? date("d-m-Y", strtotime($v->controlexcepcion_fecha_ini)) : "",
                    'controlexcepcion_hora_ini' => $v->controlexcepcion_hora_ini,
                    'controlexcepcion_fecha_fin' => $v->controlexcepcion_fecha_fin != "" ? date("d-m-Y", strtotime($v->controlexcepcion_fecha_fin)) : "",
                    'controlexcepcion_hora_fin' => $v->controlexcepcion_hora_fin,
                    'justificacion' => $v->justificacion,
                    'turno' => $v->turno,
                    'turno_descripcion' => $v->compensatoria == 1 ? $v->turno != null ? $v->turno . "°" : null : null,
                    'entrada_salida' => $v->entrada_salida,
                    'entrada_salida_descripcion' => $v->compensatoria == 1 ? $v->entrada_salida == 0 ? "ENTRADA" : "SALIDA" : null,
                    'controlexcepcion_observacion' => $v->controlexcepcion_observacion,
                    'controlexcepcion_estado' => $v->controlexcepcion_estado,
                    'controlexcepcion_estado_descripcion' => $v->controlexcepcion_estado_descripcion,
                    'controlexcepcion_user_reg_id' => $v->controlexcepcion_user_reg_id,
                    'controlexcepcion_user_registrador' => $v->controlexcepcion_user_registrador,
                    'controlexcepcion_fecha_reg' => $v->controlexcepcion_fecha_reg != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_reg)) : "",
                    'controlexcepcion_user_ver_id' => $v->controlexcepcion_user_ver_id,
                    'controlexcepcion_user_verificador' => $v->controlexcepcion_user_verificador,
                    'controlexcepcion_fecha_ver' => $v->controlexcepcion_fecha_ver != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_ver)) : "",
                    'controlexcepcion_user_apr_id' => $v->controlexcepcion_user_apr_id,
                    'controlexcepcion_user_aprobador' => $v->controlexcepcion_user_aprobador,
                    'controlexcepcion_fecha_apr' => $v->controlexcepcion_fecha_apr != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_apr)) : "",
                    'controlexcepcion_user_mod_id' => $v->controlexcepcion_user_mod_id,
                    'controlexcepcion_user_modificador' => $v->controlexcepcion_user_modificador,
                    'controlexcepcion_fecha_mod' => $v->controlexcepcion_fecha_mod != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_mod)) : "",
                    'excepcion_id' => $v->excepcion_id,
                    'excepcion' => $v->excepcion,
                    'tipoexcepcion_id' => $v->tipoexcepcion_id,
                    'tipo_excepcion' => $v->tipo_excepcion,
                    'codigo' => $v->codigo,
                    'color' => $v->color,
                    'compensatoria' => $v->compensatoria,
                    'compensatoria_descripcion' => $v->compensatoria_descripcion,
                    'excepcion_genero_id' => $v->excepcion_genero_id,
                    'excepcion_genero' => $v->excepcion_genero,
                    'cantidad' => $v->cantidad,
                    'unidad' => $v->unidad,
                    'fraccionamiento' => $v->fraccionamiento,
                    'frecuencia_descripcion' => $v->frecuencia_descripcion,
                    'redondeo' => $v->redondeo,
                    'redondeo_descripcion' => $v->redondeo_descripcion,
                    'horario' => $v->horario,
                    'horario_descripcion' => $v->horario_descripcion,
                    'refrigerio' => $v->refrigerio,
                    'refrigerio_descripcion' => $v->refrigerio_descripcion,
                    'observacion' => $v->observacion,
                    'estado' => $v->estado,
                    'estado_descripcion' => $v->estado_descripcion
                );
            }
            //$pdf->Open("L");
            /**
             * Si el ancho supera el establecido para una hoja tamaño carta, se la pone en posición horizontal
             */

            $pdf->AddPage();
            if ($pdf->debug == 1) {
                echo "<p>El ancho es:: " . $ancho;
            }
            #region Espacio para la definición de valores para la cabecera de la tabla
            $pdf->FechaHoraReporte = date("d-m-Y H:i:s");
            $j = 0;
            $agrupadores = array();
            //echo "<p>++++++++++>".$groups;
            if ($groups != "")
                $agrupadores = explode(",", $groups);

            $dondeCambio = array();
            $queCambio = array();

            if (count($relaboral) > 0){
                foreach ($relaboral as $i => $val) {
                    if (($pdf->pageWidth - $pdf->tableWidth) > 0) $pdf->SetX(($pdf->pageWidth - $pdf->tableWidth) / 2);
                    if (count($agrupadores) > 0) {
                        if ($pdf->debug == 1) {
                            echo "<p>|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||<p></p>";
                            print_r($gruposSeleccionadosActuales);
                            echo "<p>|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||<p></p>";
                        }
                        $agregarAgrupador = 0;
                        $aux = array();
                        $dondeCambio = array();
                        foreach ($gruposSeleccionadosActuales as $key => $valor) {
                            if ($valor != $val[$key]) {
                                $agregarAgrupador = 1;
                                $aux[$key] = $val[$key];
                                $dondeCambio[] = $key;
                                $queCambio[$key] = $val[$key];
                            } else {
                                $aux[$key] = $val[$key];
                            }
                        }
                        $gruposSeleccionadosActuales = $aux;
                        if ($agregarAgrupador == 1) {
                            $pdf->Ln();
                            $pdf->DefineColorHeaderTable();
                            $pdf->SetAligns($alignTitleSelecteds);
                            //if(($pdf->pageWidth-$pdf->tableWidth)>0)$pdf->SetX(($pdf->pageWidth-$pdf->tableWidth)/2);
                            $agr = $pdf->DefineTitleColsByGroups($generalConfigForAllColumns, $dondeCambio, $queCambio);
                            $pdf->Agrupador($agr);
                            $pdf->RowTitle($colTitleSelecteds);
                        }
                        $pdf->DefineColorBodyTable();
                        $pdf->SetAligns($alignSelecteds);
                        if (($pdf->pageWidth - $pdf->tableWidth) > 0) $pdf->SetX(($pdf->pageWidth - $pdf->tableWidth) / 2);
                        $rowData = $pdf->DefineRows($j + 1, $relaboral[$j], $colSelecteds);
                        $pdf->Row($rowData);

                    } else {
                        //if(($pdf->pageWidth-$pdf->tableWidth)>0)$pdf->SetX(($pdf->pageWidth-$pdf->tableWidth)/2);
                        $pdf->DefineColorBodyTable();
                        $pdf->SetAligns($alignSelecteds);
                        $rowData = $pdf->DefineRows($j + 1, $val, $colSelecteds);
                        $pdf->Row($rowData);
                    }
                    //if(($pdf->pageWidth-$pdf->tableWidth)>0)$pdf->SetX(($pdf->pageWidth-$pdf->tableWidth)/2);
                    $j++;
                }
            }
            $pdf->ShowLeftFooter = true;
            if($pdf->debug==0)$pdf->Output('reporte_relaboral.pdf','I');
            #endregion Proceso de generación del documento PDF
        }
    }

    /**
     * Función para la exportación del reporte en formato Excel.
     * @param $n_rows Cantidad de lineas
     * @param $columns Array con las columnas mostradas en el reporte
     * @param $filtros Array con los filtros aplicados sobre las columnas.
     * @param $groups String con la cadena representativa de las columnas agrupadas. La separación es por comas.
     * @param $sorteds  Columnas ordenadas .
     */
    public function exportexcelcountAction($n_rows, $gestion,$mes,$columns, $filtros,$groups,$sorteds)
    {   $columns = base64_decode(str_pad(strtr($columns, '-_', '+/'), strlen($columns) % 4, '=', STR_PAD_RIGHT));
        $filtros = base64_decode(str_pad(strtr($filtros, '-_', '+/'), strlen($columns) % 4, '=', STR_PAD_RIGHT));
        $groups = base64_decode(str_pad(strtr($groups, '-_', '+/'), strlen($groups) % 4, '=', STR_PAD_RIGHT));
        if($groups=='null'||$groups==null)$groups="";
        $sorteds = base64_decode(str_pad(strtr($sorteds, '-_', '+/'), strlen($sorteds) % 4, '=', STR_PAD_RIGHT));
        $columns = json_decode($columns, true);
        $filtros = json_decode($filtros, true);
        $sub_keys = array_keys($columns);//echo $sub_keys[0];
        $n_col = count($columns);//echo$keys[1];
        $sorteds = json_decode($sorteds, true);
        /**
         * Especificando la configuración de las columnas
         */
        $generalConfigForAllColumns = array(
            'nro_row' => array('title' => 'Nro.', 'width' => 8, 'title-align'=>'C','align' => 'C', 'type' => 'int4'),
            'ubicacion' => array('title' => 'Ubicacion', 'width' => 20, 'align' => 'C', 'type' => 'varchar'),
            'condicion' => array('title' => 'Condicion', 'width' => 20, 'align' => 'C', 'type' => 'varchar'),
            'estado_descripcion' => array('title' => 'Estado', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'nombres' => array('title' => 'Nombres', 'width' => 30, 'align' => 'L', 'type' => 'varchar'),
            'ci' => array('title' => 'CI', 'width' => 12, 'align' => 'C', 'type' => 'varchar'),
            'expd' => array('title' => 'Exp.', 'width' => 8, 'align' => 'C', 'type' => 'bpchar'),
            'gerencia_administrativa' => array('title' => 'Gerencia', 'width' => 30, 'align' => 'L', 'type' => 'varchar'),
            'departamento_administrativo' => array('title' => 'Departamento', 'width' => 30, 'align' => 'L', 'type' => 'varchar'),
            'area' => array('title' => 'Area', 'width' => 20, 'align' => 'L', 'type' => 'varchar'),
            'proceso_codigo' => array('title' => 'Proceso', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'fin_partida' => array('title' => 'Fuente', 'width' => 30, 'align' => 'L', 'type' => 'varchar'),
            'nivelsalarial' => array('title' => 'Nivel', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'cargo' => array('title' => 'Cargo', 'width' => 30, 'align' => 'L', 'type' => 'varchar'),
            'sueldo' => array('title' => 'Haber', 'width' => 10, 'align' => 'R', 'type' => 'numeric'),
            'fecha_ing' => array('title' => 'Fecha Ing', 'width' => 18, 'align' => 'C', 'type' => 'date'),
            'fecha_ini' => array('title' => 'Fecha Ini', 'width' => 18, 'align' => 'C', 'type' => 'date'),
            'fecha_incor' => array('title' => 'Fecha Inc', 'width' => 18, 'align' => 'C', 'type' => 'date'),
            'fecha_fin' => array('title' => 'Fecha Fin', 'width' => 18, 'align' => 'C', 'type' => 'date'),
            'fecha_baja' => array('title' => 'Fecha Baja', 'width' => 18, 'align' => 'C', 'type' => 'date'),
            'motivo_baja' => array('title' => 'Motivo Baja', 'width' => 20, 'align' => 'L', 'type' => 'varchar'),
            'observacion' => array('title' => 'Observacion', 'width' => 15, 'align' => 'L', 'type' => 'varchar'),
            'controlexcepcion_estado_descripcion' => array('title' => 'Estado', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'tipo_excepcion' => array('title' => 'Tipo Excepcion', 'width' => 15, 'align' => 'J', 'type' => 'varchar'),
            'excepcion' => array('title' => 'Excepcion', 'width' => 15, 'align' => 'J', 'type' => 'varchar'),
            'codigo' => array('title' => 'Codigo', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'color' => array('title' => 'Color', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'controlexcepcion_fecha_ini' => array('title' => 'Controlexcepcion Fecha Ini', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'controlexcepcion_hora_ini' => array('title' => 'Controlexcepcion Hora Ini', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'controlexcepcion_fecha_fin' => array('title' => 'Controlexcepcion Fecha Fin', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'controlexcepcion_hora_fin' => array('title' => 'Controlexcepcion Hora Fin', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'excepcion_genero' => array('title' => 'Excepcion Genero', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'frecuencia_descripcion' => array('title' => 'Frecuencia Descripcion', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'compensatoria_descripcion' => array('title' => 'Compensatoria Descripcion', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'horario_descripcion' => array('title' => 'Horario Descripcion', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'refrigerio_descripcion' => array('title' => 'Pagar Refrigerio', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'turno_descripcion' => array('title' => 'Turno', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'entrada_salida_descripcion' => array('title' => 'Entrada/Salida', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'controlexcepcion_user_registrador' => array('title' => 'Registrador', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'controlexcepcion_fecha_reg' => array('title' => 'Estado', 'width' => 15,'align' => 'C', 'type' => 'varchar'),
            'controlexcepcion_user_verificador' => array('title' => 'Verificador', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'controlexcepcion_fecha_ver' => array('title' => 'Fecha Ver.', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'controlexcepcion_user_aprobador' => array('title' => 'Aprobador', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'controlexcepcion_fecha_apr' => array('title' => 'Fecha Apr.', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),
            'controlexcepcion_observacion' => array('title' => 'Controlexcepcion Observacion', 'width' => 15, 'align' => 'C', 'type' => 'varchar'),

        );
        $agruparPor = ($groups!="")?explode(",",$groups):array();
        $widthsSelecteds = $this->DefineWidths($generalConfigForAllColumns, $columns,$agruparPor);
        $ancho = 0;
        if(count($widthsSelecteds)>0) {
            foreach ($widthsSelecteds as $w) {
                $ancho = $ancho + $w;
            }
            $excel = new exceloasis();
            $excel->tableWidth = $ancho;
            #region Proceso de generación del documento Excel
            $excel->debug = 0;
            $excel->title_rpt = utf8_decode('Reporte Relacion Laboral');
            $excel->header_title_empresa_rpt = utf8_decode('Empresa Estatal de Transporte por Cable "Mi Teleférico"');
            $alignSelecteds = $excel->DefineAligns($generalConfigForAllColumns, $columns, $agruparPor);
            $colSelecteds = $excel->DefineCols($generalConfigForAllColumns, $columns, $agruparPor);
            $colTitleSelecteds = $excel->DefineTitleCols($generalConfigForAllColumns, $columns, $agruparPor);
            $alignTitleSelecteds = $excel->DefineTitleAligns(count($colTitleSelecteds));
            $formatTypes = $excel->DefineTypeCols($generalConfigForAllColumns, $columns, $agruparPor);
            $gruposSeleccionadosActuales = $excel->DefineDefaultValuesForGroups($groups);
            $excel->generalConfigForAllColumns = $generalConfigForAllColumns;
            $excel->colTitleSelecteds = $colTitleSelecteds;
            $excel->widthsSelecteds = $widthsSelecteds;
            $excel->alignSelecteds = $alignSelecteds;
            $excel->alignTitleSelecteds = $alignTitleSelecteds;

            $cantCol = count($colTitleSelecteds);
            $excel->ultimaLetraCabeceraTabla = $excel->columnasExcel[$cantCol-1];
            $excel->penultimaLetraCabeceraTabla = $excel->columnasExcel[$cantCol-2];
            $excel->numFilaCabeceraTabla = 4;
            $excel->primeraLetraCabeceraTabla = "A";
            $excel->segundaLetraCabeceraTabla = "B";
            $excel->celdaInicial = $excel->primeraLetraCabeceraTabla.$excel->numFilaCabeceraTabla;
            $excel->celdaFinal = $excel->ultimaLetraCabeceraTabla.$excel->numFilaCabeceraTabla;
            if($cantCol<=9){
                $excel->defineOrientation("V");
                $excel->defineSize("C");
            }elseif($cantCol<=13){
                $excel->defineOrientation("H");
                $excel->defineSize("C");
            }else{
                $excel->defineOrientation("H");
                $excel->defineSize("O");
            }
            if ($excel->debug == 1) {

                echo "<p>::::::::::::::::::::::::::::::::::::::::::::GESTION-MES::::::::::::::::::::::::::::::::::::::::::<p>";
                echo "<p>".$gestion."-".$mes."<p>";
                echo "<p>::::::::::::::::::::::::::::::::::::::::::::FILTROS::::::::::::::::::::::::::::::::::::::::::<p>";
                echo "<p>::::::::::::::::::::::::::::::::::::::::::::COLUMNAS::::::::::::::::::::::::::::::::::::::::::<p>";
                print_r($columns);
                echo "<p>::::::::::::::::::::::::::::::::::::::::::::FILTROS::::::::::::::::::::::::::::::::::::::::::<p>";
                print_r($filtros);
                echo "<p>::::::::::::::::::::::::::::::::::::::::::::GRUPOS::::::::::::::::::::::::::::::::::::::::::::<p>";
                echo "<p>" . $groups;
                echo "<p>::::::::::::::::::::::::::::::::::::::::::::ORDEN::::::::::::::::::::::::::::::::::::::::::::<p>";
                print_r($sorteds);
                echo "<p>:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::<p>";
            }
            $where = '';
            $yaConsiderados = array();
            for ($k = 0; $k < count($filtros); $k++) {
                $cant = $this->obtieneCantidadVecesConsideracionPorColumnaEnFiltros($filtros[$k]['columna'], $filtros);
                $arr_val = $this->obtieneValoresConsideradosPorColumnaEnFiltros($filtros[$k]['columna'], $filtros);

                for ($j = 0; $j < $n_col; $j++) {
                    if ($sub_keys[$j] == $filtros[$k]['columna']) {
                        $col_fil = $columns[$sub_keys[$j]]['text'];
                    }
                }
                if ($filtros[$k]['tipo'] == 'datefilter') {
                    $filtros[$k]['valor'] = date("Y-m-d", strtotime($filtros[$k]['valor']));
                }
                $cond_fil = ' ' . $col_fil;
                if (!in_array($filtros[$k]['columna'], $yaConsiderados)) {

                    if (strlen($where) > 0) {
                        switch ($filtros[$k]['condicion']) {
                            case 'EMPTY':
                                $where .= ' AND ';
                                break;
                            case 'NOT_EMPTY':
                                $where .= ' AND ';
                                break;
                            case 'CONTAINS':
                                $where .= ' AND ';
                                break;
                            case 'EQUAL':
                                $where .= ' AND ';
                                break;
                            case 'GREATER_THAN_OR_EQUAL':
                                $where .= ' AND ';
                                break;
                            case 'LESS_THAN_OR_EQUAL':
                                $where .= ' AND ';
                                break;
                        }
                    }
                }
                if ($cant > 1) {
                    if ($excel->debug == 1) {
                        echo "<p>::::::::::::::::::::::::::::::::::::YA CONSIDERADOS:::::::::::::::::::::::::::::::::::::::::::::::<p>";
                        print_r($yaConsiderados);
                        echo "<p>::::::::::::::::::::::::::::::::::::YA CONSIDERADOS:::::::::::::::::::::::::::::::::::::::::::::::<p>";
                    }
                    if (!in_array($filtros[$k]['columna'], $yaConsiderados)) {
                        switch ($filtros[$k]['condicion']) {
                            case 'EMPTY':
                                $cond_fil .= utf8_encode(" que sea vacía ");
                                $where .= "(" . $filtros[$k]['columna'] . " IS NULL OR " . $filtros[$k]['columna'] . " ILIKE '')";
                                break;
                            case 'NOT_EMPTY':
                                $cond_fil .= utf8_encode(" que no sea vacía ");
                                $where .= "(" . $filtros[$k]['columna'] . " IS NOT NULL OR " . $filtros[$k]['columna'] . " NOT ILIKE '')";
                                break;
                            case 'CONTAINS':
                                $cond_fil .= utf8_encode(" que contenga el valor:  " . $filtros[$k]['valor']);
                                if ($filtros[$k]['columna'] == "nombres") {
                                    $where .= "(p_nombre ILIKE '%" . $filtros[$k]['valor'] . "%' OR s_nombre ILIKE '%" . $filtros[$k]['valor'] . "%' OR t_nombre ILIKE '%" . $filtros[$k]['valor'] . "%' OR p_apellido ILIKE '%" . $filtros[$k]['valor'] . "%' OR s_apellido ILIKE '%" . $filtros[$k]['valor'] . "%' OR c_apellido ILIKE '%" . $filtros[$k]['valor'] . "%')";
                                } else {
                                    $where .= $filtros[$k]['columna'] . " ILIKE '%" . $filtros[$k]['valor'] . "%'";
                                }
                                break;
                            case 'EQUAL':
                                $cond_fil .= utf8_encode(" que contenga el valor:  " . $filtros[$k]['valor']);
                                $ini = 0;
                                foreach ($arr_val as $col) {
                                    if ($excel->debug == 1) {

                                        echo "<p>.........................recorriendo las columnas multiseleccionadas: .............................................";
                                        echo $filtros[$k]['columna'] . "-->" . $col;
                                        echo "<p>.........................recorriendo las columnas multiseleccionadas: .............................................";
                                    }
                                    if (isset($generalConfigForAllColumns[$filtros[$k]['columna']]['type'])) {
                                        //$where .= $filtros[$k]['columna']." ILIKE '".$filtros[$k]['valor']."'";
                                        if ($ini == 0) {
                                            $where .= " (";
                                        }
                                        switch (@$generalConfigForAllColumns[$filtros[$k]['columna']]['type']) {
                                            case 'int4':
                                            case 'numeric':
                                            case 'date':
                                                //$whereEqueals .= $filtros[$k]['columna']." = '".$filtros[$k]['valor']."'";
                                                $where .= $filtros[$k]['columna'] . " = '" . $col . "'";
                                                break;
                                            case 'varchar':
                                            case 'bpchar':
                                                //$whereEqueals .= $filtros[$k]['columna']." ILIKE '".$filtros[$k]['valor']."'";
                                                $where .= $filtros[$k]['columna'] . " ILIKE '" . $col . "'";
                                                break;
                                        }
                                        $ini++;
                                        if ($ini == count($arr_val)) {
                                            $where .= ") ";
                                        } else $where .= " OR ";
                                    }
                                }
                                break;
                            case 'GREATER_THAN_OR_EQUAL':
                                $cond_fil .= utf8_encode(" que sea mayor o igual que:  " . $filtros[$k]['valor']);
                                $ini = 0;
                                foreach ($arr_val as $col) {
                                    //$fecha = date("Y-m-d", $col);
                                    $fecha = $col;
                                    if (isset($generalConfigForAllColumns[$filtros[$k]['columna']]['type'])) {
                                        //$where .= $filtros[$k]['columna']." ILIKE '".$filtros[$k]['valor']."'";
                                        if ($ini == 0) {
                                            $where .= " (";
                                        }
                                        switch (@$generalConfigForAllColumns[$filtros[$k]['columna']]['type']) {
                                            case 'int4':
                                            case 'numeric':
                                                $where .= $filtros[$k]['columna'] . " = '" . $fecha . "'";
                                                break;
                                            case 'date':
                                                //$whereEqueals .= $filtros[$k]['columna']." = '".$filtros[$k]['valor']."'";
                                                if ($ini == 0) {
                                                    $where .= $filtros[$k]['columna'] . " BETWEEN ";
                                                } else {
                                                    $where .= " AND ";
                                                }
                                                $where .= "'" . $fecha . "'";

                                                break;
                                            case 'varchar':
                                            case 'bpchar':
                                                //$whereEqueals .= $filtros[$k]['columna']." ILIKE '".$filtros[$k]['valor']."'";
                                                $where .= $filtros[$k]['columna'] . " ILIKE '" . $col . "'";
                                                break;
                                        }
                                        $ini++;
                                        if ($ini == count($arr_val)) {
                                            $where .= ") ";
                                        }
                                    }
                                }
                                break;
                            case 'LESS_THAN_OR_EQUAL':
                                $cond_fil .= utf8_encode(" que sea menor o igual que:  " . $filtros[$k]['valor']);
                                $where .= $filtros[$k]['columna'] . ' <= "' . $filtros[$k]['valor'] . '"';
                                break;
                        }
                        $yaConsiderados[] = $filtros[$k]['columna'];
                    }
                } else {
                    switch ($filtros[$k]['condicion']) {
                        case 'EMPTY':
                            $cond_fil .= utf8_encode(" que sea vacía ");
                            $where .= "(" . $filtros[$k]['columna'] . " IS NULL OR " . $filtros[$k]['columna'] . " ILIKE '')";
                            break;
                        case 'NOT_EMPTY':
                            $cond_fil .= utf8_encode(" que no sea vacía ");
                            $where .= "(" . $filtros[$k]['columna'] . " IS NOT NULL OR " . $filtros[$k]['columna'] . " NOT ILIKE '')";
                            break;
                        case 'CONTAINS':
                            $cond_fil .= utf8_encode(" que contenga el valor:  " . $filtros[$k]['valor']);
                            if ($filtros[$k]['columna'] == "nombres") {
                                $where .= "(p_nombre ILIKE '%" . $filtros[$k]['valor'] . "%' OR s_nombre ILIKE '%" . $filtros[$k]['valor'] . "%' OR t_nombre ILIKE '%" . $filtros[$k]['valor'] . "%' OR p_apellido ILIKE '%" . $filtros[$k]['valor'] . "%' OR s_apellido ILIKE '%" . $filtros[$k]['valor'] . "%' OR c_apellido ILIKE '%" . $filtros[$k]['valor'] . "%')";
                            } else {
                                $where .= $filtros[$k]['columna'] . " ILIKE '%" . $filtros[$k]['valor'] . "%'";
                            }
                            break;
                        case 'EQUAL':
                            $cond_fil .= utf8_encode(" que contenga el valor:  " . $filtros[$k]['valor']);
                            if (isset($generalConfigForAllColumns[$filtros[$k]['columna']]['type'])) {
                                //$where .= $filtros[$k]['columna']." ILIKE '".$filtros[$k]['valor']."'";
                                switch (@$generalConfigForAllColumns[$filtros[$k]['columna']]['type']) {
                                    case 'int4':
                                    case 'numeric':
                                    case 'date':
                                        //$whereEqueals .= $filtros[$k]['columna']." = '".$filtros[$k]['valor']."'";
                                        $where .= $filtros[$k]['columna'] . " = '" . $filtros[$k]['valor'] . "'";
                                        break;
                                    case 'varchar':
                                    case 'bpchar':
                                        //$whereEqueals .= $filtros[$k]['columna']." ILIKE '".$filtros[$k]['valor']."'";
                                        $where .= $filtros[$k]['columna'] . " ILIKE '" . $filtros[$k]['valor'] . "'";
                                        break;
                                }
                            }
                            break;
                        case 'GREATER_THAN_OR_EQUAL':
                            $cond_fil .= utf8_encode(" que sea mayor o igual que:  " . $filtros[$k]['valor']);
                            $where .= $filtros[$k]['columna'] . ' >= "' . $filtros[$k]['valor'] . '"';
                            break;
                        case 'LESS_THAN_OR_EQUAL':
                            $cond_fil .= utf8_encode(" que sea menor o igual que:  " . $filtros[$k]['valor']);
                            $where .= $filtros[$k]['columna'] . ' <= "' . $filtros[$k]['valor'] . '"';
                            break;
                    }
                }

            }
            $obj = new Fcontrolexcepciones();
            if ($where != "") $where = " WHERE " . $where;
            $groups_aux = "";
            if ($groups != "") {
                /**
                 * Se verifica que no se considere la columna nombres debido a que contenido ya esta ordenado por las
                 * columnas p_apellido, s_apellido, c_apellido, p_anombre, s_nombre, t_nombre
                 */
                if (strrpos($groups, "nombres")) {
                    if (strrpos($groups, ",")) {
                        $arr = explode(",", $groups);
                        foreach ($arr as $val) {
                            if ($val != "nombres")
                                $groups_aux[] = $val;
                        }
                        $groups = implode(",", $groups_aux);
                    } else $groups = "";
                }
                if (is_array($sorteds) && count($sorteds) > 0) {
                    if ($groups != "") $groups .= ",";
                    $coma = "";
                    if ($excel->debug == 1) {
                        echo "<p>===========================================Orden======================================</p>";
                        print_r($sorteds);
                        echo "<p>===========================================Orden======================================</p>";
                    }
                    foreach ($sorteds as $ord => $orden) {
                        $groups .= $coma . $ord;
                        if ($orden['asc'] == '') $groups .= " ASC"; else$groups .= " DESC";
                        $coma = ",";
                    }
                }
                if ($groups != "")
                    $groups = " ORDER BY " . $groups . ",p_apellido,s_apellido,c_apellido,p_nombre,s_nombre,t_nombre,id_da,fecha_ini";
                if ($excel->debug == 1) echo "<p>La consulta es: " . $groups . "<p>";
            } else {
                if (is_array($sorteds) && count($sorteds) > 0) {
                    $coma = "";
                    if ($excel->debug == 1) {
                        echo "<p>===========================================Orden======================================</p>";
                        print_r($sorteds);
                        echo "<p>===========================================Orden======================================</p>";
                    }
                    foreach ($sorteds as $ord => $orden) {
                        $groups .= $coma . $ord;
                        if ($orden['asc'] == '') $groups .= " ASC"; else$groups .= " DESC";
                        $coma = ",";
                    }
                    $groups = " ORDER BY " . $groups;
                }

            }
            if ($excel->debug == 1) echo "<p>WHERE------------------------->" . $where . "<p>";
            if ($excel->debug == 1) echo "<p>GROUP BY------------------------->" . $groups . "<p>";
            $resul = $obj->getAllByYearAndMonth(0,$gestion,$mes,$where,$groups);

            $relaboral = array();
            foreach ($resul as $v) {
                $relaboral[] = array(
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
                    'relaboral_previo_id' => $v->relaboral_previo_id,
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
                    'id' => $v->id_controlexcepcion,
                    'id_relaboral' => $v->id_relaboral,
                    'controlexcepcion_fecha_ini' => $v->controlexcepcion_fecha_ini != "" ? date("d-m-Y", strtotime($v->controlexcepcion_fecha_ini)) : "",
                    'controlexcepcion_hora_ini' => $v->controlexcepcion_hora_ini,
                    'controlexcepcion_fecha_fin' => $v->controlexcepcion_fecha_fin != "" ? date("d-m-Y", strtotime($v->controlexcepcion_fecha_fin)) : "",
                    'controlexcepcion_hora_fin' => $v->controlexcepcion_hora_fin,
                    'justificacion' => $v->justificacion,
                    'turno' => $v->turno,
                    'turno_descripcion' => $v->compensatoria == 1 ? $v->turno != null ? $v->turno . "°" : null : null,
                    'entrada_salida' => $v->entrada_salida,
                    'entrada_salida_descripcion' => $v->compensatoria == 1 ? $v->entrada_salida == 0 ? "ENTRADA" : "SALIDA" : null,
                    'controlexcepcion_observacion' => $v->controlexcepcion_observacion,
                    'controlexcepcion_estado' => $v->controlexcepcion_estado,
                    'controlexcepcion_estado_descripcion' => $v->controlexcepcion_estado_descripcion,
                    'controlexcepcion_user_reg_id' => $v->controlexcepcion_user_reg_id,
                    'controlexcepcion_user_registrador' => $v->controlexcepcion_user_registrador,
                    'controlexcepcion_fecha_reg' => $v->controlexcepcion_fecha_reg != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_reg)) : "",
                    'controlexcepcion_user_ver_id' => $v->controlexcepcion_user_ver_id,
                    'controlexcepcion_user_verificador' => $v->controlexcepcion_user_verificador,
                    'controlexcepcion_fecha_ver' => $v->controlexcepcion_fecha_ver != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_ver)) : "",
                    'controlexcepcion_user_apr_id' => $v->controlexcepcion_user_apr_id,
                    'controlexcepcion_user_aprobador' => $v->controlexcepcion_user_aprobador,
                    'controlexcepcion_fecha_apr' => $v->controlexcepcion_fecha_apr != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_apr)) : "",
                    'controlexcepcion_user_mod_id' => $v->controlexcepcion_user_mod_id,
                    'controlexcepcion_user_modificador' => $v->controlexcepcion_user_modificador,
                    'controlexcepcion_fecha_mod' => $v->controlexcepcion_fecha_mod != "" ? date("d-m-Y H:i:s", strtotime($v->controlexcepcion_fecha_mod)) : "",
                    'excepcion_id' => $v->excepcion_id,
                    'excepcion' => $v->excepcion,
                    'tipoexcepcion_id' => $v->tipoexcepcion_id,
                    'tipo_excepcion' => $v->tipo_excepcion,
                    'codigo' => $v->codigo,
                    'color' => $v->color,
                    'compensatoria' => $v->compensatoria,
                    'compensatoria_descripcion' => $v->compensatoria_descripcion,
                    'excepcion_genero_id' => $v->excepcion_genero_id,
                    'excepcion_genero' => $v->excepcion_genero,
                    'cantidad' => $v->cantidad,
                    'unidad' => $v->unidad,
                    'fraccionamiento' => $v->fraccionamiento,
                    'frecuencia_descripcion' => $v->frecuencia_descripcion,
                    'redondeo' => $v->redondeo,
                    'redondeo_descripcion' => $v->redondeo_descripcion,
                    'horario' => $v->horario,
                    'horario_descripcion' => $v->horario_descripcion,
                    'refrigerio' => $v->refrigerio,
                    'refrigerio_descripcion' => $v->refrigerio_descripcion,
                    'observacion' => $v->observacion,
                    'estado' => $v->estado,
                    'estado_descripcion' => $v->estado_descripcion
                );
            }
            #region Espacio para la definición de valores para la cabecera de la tabla
            $excel->FechaHoraReporte = date("d-m-Y H:i:s");
            $j = 0;
            $agrupadores = array();
            if ($groups != "")
                $agrupadores = explode(",", $groups);

            $dondeCambio = array();
            $queCambio = array();
            $excel->header();
            $fila=$excel->numFilaCabeceraTabla;
            if (count($relaboral) > 0){
                $excel->RowTitle($colTitleSelecteds,$fila);
                $celdaInicial=$excel->primeraLetraCabeceraTabla.$fila;
                $celdaFinalDiagonalTabla=$excel->ultimaLetraCabeceraTabla.$fila;
                if ($excel->debug == 1) {
                    echo "<p>|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||<p></p>";
                    print_r($relaboral);
                    echo "<p>|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||<p></p>";
                }
                foreach ($relaboral as $i => $val) {
                    if (count($agrupadores) > 0) {
                        if ($excel->debug == 1) {
                            echo "<p>|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||<p></p>";
                            print_r($gruposSeleccionadosActuales);
                            echo "<p>|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||<p></p>";
                        }
                        $agregarAgrupador = 0;
                        $aux = array();
                        $dondeCambio = array();
                        foreach ($gruposSeleccionadosActuales as $key => $valor) {
                            if ($valor != $val[$key]) {
                                $agregarAgrupador = 1;
                                $aux[$key] = $val[$key];
                                $dondeCambio[] = $key;
                                $queCambio[$key] = $val[$key];
                            } else {
                                $aux[$key] = $val[$key];
                            }
                        }
                        $gruposSeleccionadosActuales = $aux;
                        if ($agregarAgrupador == 1) {
                            $agr = $excel->DefineTitleColsByGroups($generalConfigForAllColumns, $dondeCambio, $queCambio);
                            if($excel->debug==1){
                                echo "<p>+++++++++++++++++++++++++++AGRUPADO POR++++++++++++++++++++++++++++++++++++++++<p></p>";
                                print_r($agr);
                                echo "<p>+++++++++++++++++++++++++++AGRUPADO POR++++++++++++++++++++++++++++++++++++++++<p></p>";
                            }
                            $excel->borderGroup($celdaInicial,$celdaFinalDiagonalTabla);
                            $fila++;
                            /*
                             * Si es que hay agrupadores, se inicia el conteo desde donde empieza el agrupador
                             */
                            $celdaInicial=$excel->primeraLetraCabeceraTabla.$fila;
                            $excel->Agrupador($agr,$fila);
                            $excel->RowTitle($colTitleSelecteds,$fila);
                        }
                        $celdaFinalDiagonalTabla=$excel->ultimaLetraCabeceraTabla.$fila;
                        $rowData = $excel->DefineRows($j + 1, $relaboral[$j], $colSelecteds);
                        if ($excel->debug == 1) {
                            echo "<p>···································FILA·················································<p></p>";
                            print_r($rowData);
                            echo "<p>···································FILA·················································<p></p>";
                        }
                        $excel->Row($rowData,$alignSelecteds,$formatTypes,$fila);
                        $fila++;

                    } else {
                        $celdaFinalDiagonalTabla=$excel->ultimaLetraCabeceraTabla.$fila;
                        $rowData = $excel->DefineRows($j + 1, $val, $colSelecteds);
                        if ($excel->debug == 1) {
                            echo "<p>···································FILA·················································<p></p>";
                            print_r($rowData);
                            echo "<p>···································FILA·················································<p></p>";
                        }
                        $excel->Row($rowData,$alignSelecteds,$formatTypes,$fila);
                        $fila++;
                    }
                    $j++;
                }
                $fila--;
                $celdaFinalDiagonalTabla=$excel->ultimaLetraCabeceraTabla.$fila;
                $excel->borderGroup($celdaInicial,$celdaFinalDiagonalTabla);
            }
            $excel->ShowLeftFooter = true;
            //$excel->secondPage();
            if ($excel->debug == 0) {
                $excel->display("AppData/reporte_controlexcepciones.xls","I");
            }
            #endregion Proceso de generación del documento PDF
        }
    }

    /**
     * Función para la generación del array con los anchos de columna definido, en consideración a las columnas mostradas.
     * @param $generalWiths Array de los anchos y alineaciones de columnas disponibles.
     * @param $columns Array de las columnas con las propiedades de oculto (hidden:1) y visible (hidden:null).
     * @return array Array con el listado de anchos por columna a desplegarse.
     */
    function DefineWidths($widthAlignAll,$columns,$exclude=array()){
        $arrRes = Array();
        $arrRes[]=8;
        foreach($columns as $key => $val){
            if(isset($widthAlignAll[$key])){
                if(!isset($val['hidden'])||$val['hidden']!=true){
                    if(!in_array($key,$exclude)||count($exclude)==0)
                        if(isset($widthAlignAll[$key]['width'])){
                            $arrRes[]=$widthAlignAll[$key]['width'];
                        }
                }
            }
        }
        return $arrRes;
    }
    /*
     * Función para obtener la cantidad de veces que se considera una misma columna en el filtrado.
     * @param $columna
     * @param $array
     * @return int
     */
    function obtieneCantidadVecesConsideracionPorColumnaEnFiltros($columna, $array)
    {
        $cont = 0;
        if (count($array) >= 1) {
            foreach ($array as $key => $val) {
                if (in_array($columna, $val)) {
                    $cont++;
                }
            }
        }
        return $cont;
    }

    /**
     * Función para la obtención de los valores considerados en el filtro enviado.
     * @param $columna Nombre de la columna
     * @param $array Array con los registro de busquedas.
     * @return array Array con los valores considerados en el filtrado enviado.
     */
    function obtieneValoresConsideradosPorColumnaEnFiltros($columna, $array)
    {
        $arr_col = array();
        $cont = 0;
        if (count($array) >= 1) {
            foreach ($array as $key => $val) {
                if (in_array($columna, $val)) {
                    $arr_col[] = $val["valor"];
                }
            }
        }
        return $arr_col;
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
    public function verificacruceexcesousoAction()
    {
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
        if ($idRelaboral > 0 && $idExcepcion > 0 && $fechaIni != '' && $fechaFin != '' && $justificacion != '') {
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
        if (isset($_POST["id"]) && $_POST["id"] > 0) {
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
            if ($idPerfilLaboral > 0 && $idExcepcion > 0 && $fechaIni != '' && $horaIni != '' && $fechaFin != '' && $horaFin != '' && $justificacion != '') {
                try {
                    $obj = new Controlexcepciones();
                    $ok = $obj->registroMasivoPorPerfil($idPerfilLaboral, $fechaIni, $horaIni, $fechaFin, $horaFin, $justificacion, $observacion, $estado, $user_reg_id);
                    if ($ok) {
                        $msj = array('result' => 1, 'msj' => '&Eacute;xito: Se realiz&oacute; correctamente el registro masivo.');
                    } else {
                        $msj = array('result' => 0, 'msj' => 'Error: No se registr&oacute;.');
                    }
                } catch (\Exception $e) {
                    echo get_class($e), ": ", $e->getMessage(), "\n";
                    echo " File=", $e->getFile(), "\n";
                    echo " Line=", $e->getLine(), "\n";
                    echo $e->getTraceAsString();
                    $msj = array('result' => -1, 'msj' => 'Error cr&iacute;tico: No se guard&oacute; el registro del control de excepci&oacute;n masivo.');
                }

            } else {
                $msj = array('result' => 0, 'msj' => 'Error: Los datos enviados no cumplen los criterios necesarios para su registro.');
            }
        }
        echo json_encode($msj);
    }

    /**
     * Función para verificar si aún no se ha sobrepasado la frecuencia admitida de registros en el sistema.
     */
    public function verificafrecuenciaAction()
    {
        $msj = array();
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
        $cantidadSolicitada = 0;
        $cantidadAdmitida = 0;
        $cantidadUnidades = 0;
        $fechaInicioOperacionesMiTeleferico = "23-04-2014";
        $gestionA = 0;
        $mesA = 0;
        $gestionB = 0;
        $mesB = 0;
        $semestre = 0;
        $cantidadRegistrada = 0;
        $fechaIniRango = "";
        $fechaFinRango = "";
        $rangoFechas = "";
        $objFe = new Fexcepciones();
        if ($idExcepcion > 0) {
            $objE = $objFe->getOne($idExcepcion);
            if (is_object($objE)) {
                /**
                 * Si el registro de excepción implica el control de frecuencia.
                 */
                if ($objE->cantidad > 0) {

                    $arrA = explode("-", $fechaIni);
                    if (count($arrA) > 0) {
                        $gestionA = $arrA[2];
                        $mesA = $arrA[1];
                    }
                    $arrB = explode("-", $fechaFin);
                    if (count($arrA) > 0) {
                        $gestionB = $arrB[2];
                        $mesB = $arrB[1];
                    }
                    $cantidadAdmitida = $objE->cantidad;
                    switch ($objE->unidad) {
                        case "VEZ":
                            $cantidadSolicitada = 1;
                            switch ($objE->fraccionamiento) {
                                case "HORA":
                                    /**
                                     * Cuantas veces se registro en la hora.
                                     * Control no efectuado debido a que no existe ni se prevé la existencia de este tipo de frecuencia para las boletas.
                                     * Por ello se inhabilita su registro.
                                     */
                                    $cantidadTotal = -1;
                                    break;
                                case "DIA":
                                    /**
                                     * Cuantas veces se registro en el día
                                     */
                                    if ($fechaIni == $fechaFin) {
                                        $fechaIniRango = $fechaIni;
                                        $fechaFinRango = $fechaFin;
                                        $rangoFechas = $fechaIniRango . " AL " . $fechaIniRango;
                                        $cantidadRegistrada = $objFe->calculaCantidadVecesEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaIniRango);
                                        $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                    } else {
                                        /**
                                         * En caso de que se quiera registrar más de un día con el mismo permiso, hay que revisar fecha por fecha
                                         */
                                        $arrFechas = $objFe->listadoFechasPorRango($fechaIni, $fechaFin);
                                        if (count($arrFechas) > 0) {
                                            foreach ($arrFechas as $fecha) {
                                                $fechaIniRango = date("d-m-Y", strtotime($fecha->fecha));
                                                $fechaFinRango = date("d-m-Y", strtotime($fecha->fecha));
                                                $cantidadRegistrada = $objFe->calculaCantidadVecesEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaIniRango);
                                                $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                                $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                                if ($cantidadTotal > $cantidadAdmitida) {
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
                                    $rangoFechas = $objFe->obtieneRangoFechasDeLaSemana(1, $fechaIni);
                                    if (is_object($rangoFechas)) {
                                        $fechaIniRango = date("d-m-Y", strtotime($rangoFechas->fecha_ini));
                                        $fechaFinRango = date("d-m-Y", strtotime($rangoFechas->fecha_fin));
                                        $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                    }
                                    $cantidadRegistrada = $objFe->calculaCantidadVecesEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                    $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                    break;
                                case "MES":
                                    /**
                                     * Cuantas veces se registró en el mes
                                     */
                                    $fechaIniRango = "01-" . $mesA . "-" . $gestionA;
                                    $fechaFin = $objFe->obtieneUltimoDiaMes($gestionA, $mesA);
                                    if ($fechaFin != null) {
                                        $fechaFinRango = date("d-m-Y", strtotime($fechaFin));
                                        $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                    }
                                    $cantidadRegistradaPM = $objFe->calculaCantidadVecesEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                    $cantidadRegistradaSM = 0;
                                    /**
                                     * Considerando que las fechas de la solicitud consideren dos meses contiguos
                                     */
                                    if ($mesA != $mesB) {
                                        $fechaIniRango = "01-" . $mesB . "-" . $gestionB;
                                        $fechaFin = $objFe->obtieneUltimoDiaMes($gestionB, $mesB);
                                        if ($fechaFin != null) {
                                            $fechaFinRango = date("d-m-Y", strtotime($fechaFin));
                                            $rangoFechas .= " y del " . $fechaIniRango . " AL " . $fechaFinRango;
                                        }
                                        $cantidadRegistradaPM = $objFe->calculaCantidadVecesEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                        $cantidadAdmitida = $cantidadAdmitida * 2;
                                    }
                                    $cantidadRegistrada = $cantidadRegistradaPM + $cantidadRegistradaSM;
                                    $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                    break;
                                case "SEMESTRE":
                                    /**
                                     * Cuantas veces se registró en el semestre
                                     */
                                    $semestreA = $objFe->semestrePerteneciente($fechaIni);
                                    $semestreB = $objFe->semestrePerteneciente($fechaFin);
                                    if ($semestreA == $semestreB) {
                                        /**
                                         * Si la fecha de inicio y la de finalización están en un sólo semestre
                                         */
                                        if ($semestreA == 1) {
                                            $fechaIniRango = "01-01-" . $gestionA;
                                            $fechaFinRango = "30-06-" . $gestionA;
                                        } else {
                                            $fechaIniRango = "01-07-" . $gestionA;
                                            $fechaFinRango = "31-12-" . $gestionA;
                                        }
                                        $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                        $cantidadRegistrada = $objFe->calculaCantidadVecesEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                    } else {
                                        /**
                                         * La fecha de inicio y de finalización están en los dos semestres
                                         */
                                        $fechaIniRango = "01-01-" . $gestionA;
                                        $fechaFinRango = "30-06-" . $gestionA;
                                        $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                        $cantidadRegistradaPS = $objFe->calculaCantidadVecesEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                        $fechaIniRango = "01-07-" . $gestionA;
                                        $fechaFinRango = "31-12-" . $gestionA;
                                        $rangoFechas .= " y del " . $fechaIniRango . " AL " . $fechaFinRango;
                                        $cantidadRegistradaSS = $objFe->calculaCantidadVecesEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                        $cantidadRegistrada = $cantidadRegistradaPS + $cantidadRegistradaSS;
                                        $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                        $cantidadAdmitida = $cantidadAdmitida * 2;
                                    }
                                    $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                    break;
                                case "AÑO":
                                    /**
                                     * Cuantas veces se registró en el año
                                     */
                                    $fechaIniRango = "01-01-" . $gestionA;
                                    $fechaFinRango = "31-12-" . $gestionA;
                                    $cantidadRegistrada = $objFe->calculaCantidadVecesEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                    $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                    $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                    break;
                                default:
                                    /**
                                     * Cuantas veces se registró en el año
                                     */
                                    $fechaIniRango = $fechaInicioOperacionesMiTeleferico;
                                    $fechaFinRango = date("d-m-Y");
                                    $cantidadRegistrada = $objFe->calculaCantidadVecesEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                    $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                    $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                    break;

                            }
                            break;
                        case "MINUTO":
                            $fechaIniRango = $fechaIni;
                            $fechaFinRango = $fechaFin;
                            $arrDias = $objFe->listadoFechasPorRango($fechaIni, $fechaFin);
                            if (count($arrDias) > 0) {
                                $cantidadMinutosSolicitadosPorDia = $objFe->cantidadHorasEntreDosHoras($horaIni, $horaFin) * 60;
                                $cantidadMinutosSolicitadosPorDia = round($cantidadMinutosSolicitadosPorDia, 0);
                                $cantidadSolicitada = $cantidadMinutosSolicitadosPorDia * count($arrDias);
                            }
                            switch ($objE->fraccionamiento) {
                                case "HORA":
                                    $cantidadTotal = -2;
                                    break;
                                case "DIA":
                                    /**
                                     * Cantidad de minutos al día
                                     */
                                    $arrDias = $objFe->listadoFechasPorRango($fechaIni, $fechaFin);
                                    if (count($arrDias) > 0) {
                                        foreach ($arrDias as $fecha) {
                                            $cantidadRegistradaPorDia = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, date("d-m-Y", strtotime($fecha->fecha)), date("d-m-Y", strtotime($fecha->fecha))) * 60;
                                            $cantidadRegistradaPorDia = round($cantidadRegistradaPorDia, 0);
                                            $cantidadTotalPorDia = $cantidadMinutosSolicitadosPorDia + $cantidadRegistradaPorDia;
                                            $cantidadTotal = 0;
                                            if ($cantidadTotalPorDia > $cantidadAdmitida) {
                                                $rangoFechas = date("d-m-Y", strtotime($fecha->fecha));
                                                $cantidadTotal = $cantidadTotalPorDia;
                                                $cantidadRegistrada = $cantidadRegistradaPorDia;
                                                break;
                                            }
                                        }
                                    }
                                    break;
                                case "SEMANA":
                                    /**
                                     * Cuantas minutos se registró en la semana
                                     */
                                    $rangoFechas = $objFe->obtieneRangoSemanasPorRangoFechas(1, $fechaIni, $fechaFin);
                                    if (is_object($rangoFechas)) {
                                        foreach ($rangoFechas as $fecha) {
                                            $fechaIniRango = date("d-m-Y", strtotime($fecha->fecha_ini));
                                            $fechaFinRango = date("d-m-Y", strtotime($fecha->fecha_fin));
                                            $cantidadRegistradaPorSemana = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango) * 60;
                                            $cantidadRegistradaPorSemana = round($cantidadRegistradaPorSemana, 0);

                                            $arrDias = $objFe->listadoFechasPorRango($fechaIniRango, $fechaFinRango);
                                            if (count($arrDias) > 0) {
                                                $cantidadMinutosPorDia = $objFe->cantidadHorasEntreDosHoras($horaIni, $horaFin) * 60;
                                                $cantidadSolicitadaPorSemana = round($cantidadMinutosPorDia, 0) * count($arrDias);
                                                $cantidadTotalPorSemana = $cantidadSolicitadaPorSemana + $cantidadRegistradaPorSemana;
                                                if ($cantidadTotalPorSemana > $cantidadAdmitida) {
                                                    $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                                    $cantidadTotal = $cantidadTotalPorSemana;
                                                    $cantidadRegistrada = $cantidadRegistradaPorSemana;
                                                    break;
                                                }
                                            }
                                        }

                                    }

                                    $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                    break;
                                /**
                                 * Falta Controlar desde acá -->
                                 */
                                case "MES":
                                    $cantidadTotal = 0;
                                    $fechaIniRango = date("d-m-Y", strtotime($fechaIni));
                                    $fechaFinRango = date("d-m-Y", strtotime($fechaFin));
                                    $arrFechasMeses = $objFe->listadoMesesCompletosInvolucradosEnRango($fechaIni, $fechaFin);
                                    if (count($arrFechasMeses) > 0) {
                                        foreach ($arrFechasMeses as $fecha) {
                                            $fechaIniRangoMes = date("d-m-Y", strtotime($fecha->fecha_ini));
                                            $fechaFinRangoMes = date("d-m-Y", strtotime($fecha->fecha_fin));
                                            $cantidadRegistradaPorMes = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRangoMes, $fechaFinRangoMes) * 60;
                                            $cantidadRegistradaPorMes = round($cantidadRegistradaPorMes, 0);
                                            $fechaIniRangoCalculo = $fechaIniRangoMes;
                                            if ($fechaIniRangoMes < date("d-m-Y", strtotime($fechaIniRango))) {
                                                $fechaIniRangoCalculo = $fechaIniRango;
                                            }
                                            $fechaFinRangoCalculo = $fechaFinRangoMes;
                                            if ($fechaFinRangoMes > date("d-m-Y", strtotime($fechaFinRango))) {
                                                $fechaFinRangoCalculo = $fechaFinRango;
                                            }
                                            $arrDiasCalculo = $objFe->listadoFechasPorRango($fechaIniRangoCalculo, $fechaFinRangoCalculo);
                                            $cantidadSolicitadaPorMes = round($cantidadMinutosSolicitadosPorDia, 0) * count($arrDiasCalculo);
                                            $cantidadTotalPorMes = $cantidadSolicitadaPorMes + $cantidadRegistradaPorMes;
                                            if ($cantidadTotalPorMes > $cantidadAdmitida) {
                                                $rangoFechas = $fechaIniRangoCalculo . " AL " . $fechaFinRangoCalculo;
                                                $cantidadTotal = $cantidadTotalPorMes;
                                                $cantidadRegistrada = $cantidadRegistradaPorMes;
                                                break;
                                            }
                                        }
                                    } else {
                                        $cantidadTotal = -4;
                                    }
                                    break;
                                case "SEMESTRE":
                                    if ($gestionA == $gestionB) {
                                        /**
                                         * Cuantas veces se registró en el semestre
                                         */
                                        $semestreA = $objFe->semestrePerteneciente($fechaIniRango);
                                        $semestreB = $objFe->semestrePerteneciente($fechaFinRango);
                                        if ($semestreA == $semestreB) {
                                            /**
                                             * Si la fecha de inicio y la de finalización están en un sólo semestre y en la misma gestión
                                             */
                                            if ($semestreA == 1) {
                                                $fechaIniRangoSemestre = "01-01-" . $gestionA;
                                                $fechaFinRangoSemestre = "30-06-" . $gestionA;
                                            } else {
                                                $fechaIniRangoSemestre = "01-07-" . $gestionA;
                                                $fechaFinRangoSemestre = "31-12-" . $gestionA;
                                            }
                                            $rangoFechas = $fechaIniRangoSemestre . " AL " . $fechaFinRangoSemestre;
                                            $cantidadRegistrada = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRangoSemestre, $fechaFinRangoSemestre) * 60;
                                            $cantidadRegistrada = round($cantidadRegistrada, 0);


                                            $fechaIniRangoCalculo = $fechaIniRangoSemestre;
                                            if ($fechaIniRangoSemestre < date("d-m-Y", strtotime($fechaIniRango))) {
                                                $fechaIniRangoCalculo = $fechaIniRango;
                                            }
                                            $fechaFinRangoCalculo = $fechaFinRangoSemestre;
                                            if ($fechaFinRangoSemestre > date("d-m-Y", strtotime($fechaFinRango))) {
                                                $fechaFinRangoCalculo = $fechaFinRango;
                                            }
                                            $arrDiasCalculo = $objFe->listadoFechasPorRango($fechaIniRangoCalculo, $fechaFinRangoCalculo);
                                            $cantidadSolicitada = round($cantidadMinutosSolicitadosPorDia, 0) * count($arrDiasCalculo);
                                            $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;

                                        } else {
                                            /**
                                             * La fecha de inicio y de finalización están en los dos semestres pero en la misma gestión
                                             */
                                            $cantidadSolicitada = $objFe->cantidadHorasEntreDosHoras($horaIni, $horaFin) * 60;
                                            $cantidadSolicitada = round($cantidadSolicitada, 0);
                                            $fechaIniRangoPS = "01-01-" . $gestionA;
                                            $fechaFinRangoPS = "30-06-" . $gestionA;
                                            $rangoFechasPS = $fechaIniRangoPS . " AL " . $fechaFinRangoPS;
                                            $arrDiasPS = $objFe->listadoFechasPorRango($fechaIniRangoPS, $fechaFinRangoPS);
                                            if (count($arrDiasPS) > 0) {
                                                $arrDiasSolicitadosPS = $objFe->listadoFechasPorRango($fechaIni, $fechaFinRangoPS);
                                                $cantidadSolicitadaPS = round($cantidadMinutosSolicitadosPorDia, 0) * count($arrDiasSolicitadosPS);
                                                $cantidadRegistradaPS = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRangoPS, $fechaFinRangoPS) * 60;
                                                $cantidadRegistradaPS = round($cantidadRegistradaPS, 0);
                                            }
                                            $fechaIniRangoSS = "01-07-" . $gestionA;
                                            $fechaFinRangoSS = $fechaFinRango;
                                            $rangoFechasSS = $fechaIniRangoSS . " AL " . $fechaFinRangoSS;
                                            $arrDiasSS = $objFe->listadoFechasPorRango($fechaIniRangoSS, $fechaFinRangoSS);
                                            if (count($arrDiasSS) > 0) {
                                                $cantidadSolicitadaSS = $cantidadSolicitada * count($arrDiasSS);
                                                $cantidadRegistradaSS = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRangoSS, $fechaFinRangoSS) * 60;
                                                $cantidadRegistradaSS = round($cantidadRegistradaSS, 0);
                                            }
                                            $cantidadRegistrada = $cantidadRegistradaPS + $cantidadRegistradaSS;
                                            $cantidadTotalPS = $cantidadSolicitadaPS + $cantidadRegistradaPS;
                                            $cantidadTotalSS = $cantidadSolicitadaSS + $cantidadRegistradaSS;
                                            $cantidadTotal = 0;
                                            if ($cantidadTotalPS > $objE->cantidad) {
                                                $cantidadTotal = $cantidadTotalPS;
                                                $cantidadSolicitada = $cantidadSolicitadaPS;
                                                $rangoFechas = $rangoFechasPS;
                                            }
                                            if ($cantidadTotalSS > $objE->cantidad) {
                                                $cantidadTotal = $cantidadTotalSS;
                                                $cantidadSolicitada = $cantidadSolicitadaSS;
                                                $rangoFechas = $rangoFechasSS;
                                            }
                                        }
                                    } else {
                                        $cantidadTotal = -4;
                                    }
                                    break;
                                case "AÑO":
                                    /**
                                     * Cuantas horas se registró en el año
                                     */
                                    if ($gestionA == $gestionB) {
                                        $fechaIniRango = "01-01-" . $gestionA;
                                        $fechaFinRango = "31-12-" . $gestionA;
                                        $cantidadRegistrada = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango) * 60;
                                        $cantidadRegistrada = round($cantidadRegistrada, 0);
                                        $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;

                                        $arrDiasCalculo = $objFe->listadoFechasPorRango($fechaIni, $fechaFin);
                                        $cantidadSolicitada = round($cantidadMinutosSolicitadosPorDia, 0) * count($arrDiasCalculo);
                                        $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                    } else $cantidadTotal = -4;
                                    break;
                                default:
                                    /**
                                     * Cuantas horas se registró en el año
                                     */
                                    $fechaIniRango = $fechaInicioOperacionesMiTeleferico;
                                    $fechaFinRango = date("d-m-Y");
                                    $cantidadRegistrada = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango) * 60;
                                    $cantidadRegistrada = round($cantidadRegistrada, 0);
                                    $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;

                                    $arrDiasCalculo = $objFe->listadoFechasPorRango($fechaIni, $fechaFin);
                                    $cantidadSolicitada = round($cantidadMinutosSolicitadosPorDia, 0) * count($arrDiasCalculo);
                                    $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                    break;
                            }
                            break;
                        case "HORA":
                            $fechaIniRango = $fechaIni;
                            $fechaFinRango = $fechaFin;
                            $arrDias = $objFe->listadoFechasPorRango($fechaIni, $fechaFin);
                            if (count($arrDias) > 0) {
                                $cantidadSolicitada = $objFe->cantidadHorasEntreDosHoras($horaIni, $horaFin);
                                $cantidadSolicitada = $cantidadSolicitada * count($arrDias);
                            }
                            switch ($objE->fraccionamiento) {
                                case "DIA":
                                    $arrDias = $objFe->listadoFechasPorRango($fechaIni, $fechaFin);
                                    if (count($arrDias) > 0) {
                                        foreach ($arrDias as $fecha) {
                                            $cantidadRegistrada += $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fecha->fecha, $fecha->fecha);
                                        }
                                    }
                                    $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                    $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                    break;
                                case "SEMANA":
                                    /**
                                     * Cuantas veces se registró en la semana
                                     */
                                    $rangoFechas = $objFe->obtieneRangoFechasDeLaSemana(1, $fechaIni);
                                    if (is_object($rangoFechas)) {
                                        $fechaIniRango = date("d-m-Y", strtotime($rangoFechas->fecha_ini));
                                        $fechaFinRango = date("d-m-Y", strtotime($rangoFechas->fecha_fin));
                                        foreach ($rangoFechas as $fecha) {
                                            $cantidadRegistrada += $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fecha->fecha_ini, $fecha->fecha_fin);
                                        }
                                    }
                                    $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                    $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;

                                    break;
                                case "MES":
                                    $fechaIniRango = "01-" . $mesA . "-" . $gestionA;
                                    $fechaFin = $objFe->obtieneUltimoDiaMes($gestionB, $mesB);
                                    $fechaFinRango = date("d-m-Y", strtotime($fechaFin));
                                    $arrFechasMeses = $objFe->listadoMesesCompletosInvolucradosEnRango($fechaIni, $fechaFinRango);
                                    if (count($arrFechasMeses) > 0) {
                                        foreach ($arrFechasMeses as $fecha) {
                                            $cantidadRegistrada += $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fecha->fecha_ini, $fecha->fecha_fin);
                                        }
                                    }
                                    $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                    $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                    break;
                                case "SEMESTRE":
                                    if ($gestionA == $gestionB) {
                                        /**
                                         * Cuantas veces se registró en el semestre
                                         */
                                        $semestreA = $objFe->semestrePerteneciente($fechaIniRango);
                                        $semestreB = $objFe->semestrePerteneciente($fechaFinRango);
                                        if ($semestreA == $semestreB) {
                                            /**
                                             * Si la fecha de inicio y la de finalización están en un sólo semestre y en la misma gestión
                                             */
                                            if ($semestreA == 1) {
                                                $fechaIniRango = "01-01-" . $gestionA;
                                                $fechaFinRango = "30-06-" . $gestionA;
                                            } else {
                                                $fechaIniRango = "01-07-" . $gestionA;
                                                $fechaFinRango = "31-12-" . $gestionA;
                                            }
                                            $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                            $cantidadRegistrada = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                            $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                        } else {
                                            /**
                                             * La fecha de inicio y de finalización están en los dos semestres pero en la misma gestión
                                             */

                                            $fechaIniRangoPS = $fechaIniRango;
                                            $fechaFinRangoPS = "30-06-" . $gestionA;
                                            $rangoFechas = $fechaIniRangoPS . " AL " . $fechaFinRangoPS;
                                            $arrDiasPS = $objFe->listadoFechasPorRango($fechaIniRangoPS, $fechaFinRangoPS);
                                            if (count($arrDiasPS) > 0) {
                                                $cantidadSolicitada = $objFe->cantidadHorasEntreDosHoras($horaIni, $horaFin);
                                                $cantidadSolicitadaPS = $cantidadSolicitada * count($arrDiasPS);
                                                $cantidadRegistradaPS = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRangoPS, $fechaFinRangoPS);
                                            }

                                            $fechaIniRangoSS = "01-07-" . $gestionA;
                                            $fechaFinRangoSS = $fechaFinRango;
                                            $rangoFechas .= " y del " . $fechaIniRangoSS . " AL " . $fechaFinRangoSS;
                                            $arrDiasSS = $objFe->listadoFechasPorRango($fechaIniRangoSS, $fechaFinRangoSS);
                                            if (count($arrDiasSS) > 0) {
                                                $cantidadSolicitada = $objFe->cantidadHorasEntreDosHoras($horaIni, $horaFin);
                                                $cantidadSolicitadaSS = $cantidadSolicitada * count($arrDiasSS);
                                                $cantidadRegistradaSS = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRangoSS, $fechaFinRangoSS);
                                            }
                                            $cantidadRegistrada = $cantidadRegistradaPS + $cantidadRegistradaSS;

                                            $cantidadTotalPS = $cantidadSolicitadaPS + $cantidadRegistradaPS;
                                            $cantidadTotalSS = $cantidadSolicitadaSS + $cantidadRegistradaSS;
                                            $cantidadTotal = 0;
                                            if ($cantidadTotalPS > $objE->cantidad) {
                                                $cantidadTotal = $cantidadTotalPS;
                                            }
                                            if ($cantidadTotalSS > $objE->cantidad) {
                                                $cantidadTotal = $cantidadTotalSS;
                                            }
                                        }
                                    } else {
                                        $cantidadTotal = -4;
                                    }
                                    break;
                                case "AÑO":
                                    /**
                                     * Cuantas horas se registró en el año
                                     */
                                    if ($gestionA == $gestionB) {
                                        $fechaIniRango = "01-01-" . $gestionA;
                                        $fechaFinRango = "31-12-" . $gestionA;
                                        $cantidadRegistrada = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                        $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                        $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                    } else $cantidadTotal = -4;
                                    break;
                                default:
                                    /**
                                     * Cuantas horas se registró en todos los años de Mi Teleférico hasta la fecha
                                     */
                                    $fechaIniRango = $fechaInicioOperacionesMiTeleferico;
                                    $fechaFinRango = date("d-m-Y");
                                    $cantidadRegistrada = $objFe->calculaCantidadHorasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                    $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                    $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                    break;

                            }
                            break;
                        case "DIA":
                            $arrDias = $objFe->listadoFechasPorRango($fechaIni, $fechaFin);
                            if (count($arrDias) > 0) {
                                $cantidadSolicitada = count($arrDias);
                                switch ($objE->fraccionamiento) {
                                    case "SEMANA":
                                        /**
                                         * Cuantas veces se registró en la semana
                                         */
                                        $rangoFechas = $objFe->obtieneRangoFechasDeLaSemana(1, $fechaIni);
                                        if (is_object($rangoFechas)) {
                                            $fechaIniRango = date("d-m-Y", strtotime($rangoFechas->fecha_ini));
                                            $fechaFinRango = date("d-m-Y", strtotime($rangoFechas->fecha_fin));
                                            $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                        }
                                        $cantidadRegistrada = $objFe->calculaCantidadDiasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                        $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                        break;
                                    case "MES":
                                        $fechaIniRango = "01-" . $mesA . "-" . $gestionA;
                                        $fechaFin = $objFe->obtieneUltimoDiaMes($gestionB, $mesB);
                                        $fechaFinRango = date("d-m-Y", strtotime($fechaFin));
                                        $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                        $arrFechasMeses = $objFe->listadoMesesCompletosInvolucradosEnRango($fechaIni, $fechaFinRango);
                                        if (count($arrFechasMeses) > 0) {
                                            foreach ($arrFechasMeses as $fecha) {
                                                $cantidadRegistrada += $objFe->calculaCantidadDiasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fecha->fecha_ini, $fecha->fecha_fin);
                                            }
                                        }
                                        $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                        break;
                                    case "SEMESTRE":
                                        /**
                                         * Cuantas veces se registró en el semestre
                                         */
                                        $semestreA = $objFe->semestrePerteneciente($fechaIni);
                                        $semestreB = $objFe->semestrePerteneciente($fechaFin);
                                        if ($semestreA == $semestreB) {
                                            /**
                                             * Si la fecha de inicio y la de finalización están en un sólo semestre
                                             */
                                            if ($semestreA == 1) {
                                                $fechaIniRango = "01-01-" . $gestionA;
                                                $fechaFinRango = "30-06-" . $gestionA;
                                            } else {
                                                $fechaIniRango = "01-07-" . $gestionA;
                                                $fechaFinRango = "31-12-" . $gestionA;
                                            }
                                            $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                            $cantidadRegistrada = $objFe->calculaCantidadDiasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                        } else {
                                            /**
                                             * La fecha de inicio y de finalización están en los dos semestres
                                             */
                                            $fechaIniRango = "01-01-" . $gestionA;
                                            $fechaFinRango = "30-06-" . $gestionA;
                                            $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                            $cantidadRegistradaPS = $objFe->calculaCantidadDiasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                            $fechaIniRango = "01-07-" . $gestionA;
                                            $fechaFinRango = "31-12-" . $gestionA;
                                            $rangoFechas .= " y del " . $fechaIniRango . " AL " . $fechaFinRango;
                                            $cantidadRegistradaSS = $objFe->calculaCantidadDiasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                            $cantidadRegistrada = $cantidadRegistradaPS + $cantidadRegistradaSS;
                                            $cantidadAdmitida = $cantidadAdmitida * 2;
                                        }
                                        $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                        break;
                                    case "AÑO":
                                        /**
                                         * Cuantos días se registró en el año
                                         */
                                        $fechaIniRango = "01-01-" . $gestionA;
                                        $fechaFinRango = "31-12-" . $gestionA;
                                        $cantidadRegistrada = $objFe->calculaCantidadDiasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                        $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                        $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                        break;
                                    default:
                                        /**
                                         * Cuantos días se registró en el año
                                         */
                                        $fechaIniRango = $fechaInicioOperacionesMiTeleferico;
                                        $fechaFinRango = date("d-m-Y");
                                        $cantidadRegistrada = $objFe->calculaCantidadDiasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                        $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                        $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                        break;
                                }
                            } else {
                                $cantidadTotal = -3;
                            }

                            break;
                        case "SEMANA":
                            $arrRango = $objFe->obtieneRangoSemanasPorRangoFechas(1, $fechaIni, $fechaFin);
                            if (count($arrRango) > 0) {
                                $cantidadSolicitada = count($arrRango);
                                switch ($objE->fraccionamiento) {
                                    case "MES":
                                        /**
                                         * Cuantas semanas se registraron en el mes
                                         */
                                        $fechaIniRango = "01-" . $mesA . "-" . $gestionA;
                                        $fechaFin = $objFe->obtieneUltimoDiaMes($gestionA, $mesA);
                                        if ($fechaFin != null) {
                                            $fechaFinRango = date("d-m-Y", strtotime($fechaFin));
                                            $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                        }
                                        $cantidadRegistradaPM = $objFe->calculaCantidadSemanasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                        $cantidadRegistradaSM = 0;
                                        /**
                                         * Considerando que las fechas de la solicitud consideren dos meses contiguos
                                         */
                                        if ($mesA != $mesB) {
                                            $fechaIniRango = "01-" . $mesB . "-" . $gestionB;
                                            $fechaFin = $objFe->obtieneUltimoDiaMes($gestionB, $mesB);
                                            if ($fechaFin != null) {
                                                $fechaFinRango = date("d-m-Y", strtotime($fechaFin));
                                                $rangoFechas .= " y del " . $fechaIniRango . " AL " . $fechaFinRango;
                                            }
                                            $cantidadRegistradaPM = $objFe->calculaCantidadSemanasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                            $cantidadAdmitida = $cantidadAdmitida * 2;
                                        }
                                        $cantidadRegistrada = $cantidadRegistradaPM + $cantidadRegistradaSM;
                                        $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                        break;
                                    case "SEMESTRE":
                                        /**
                                         * Cuantas semanas se registraron en el semestre
                                         */
                                        $semestreA = $objFe->semestrePerteneciente($fechaIni);
                                        $semestreB = $objFe->semestrePerteneciente($fechaFin);
                                        if ($semestreA == $semestreB) {
                                            /**
                                             * Si la fecha de inicio y la de finalización están en un sólo semestre
                                             */
                                            if ($semestreA == 1) {
                                                $fechaIniRango = "01-01-" . $gestionA;
                                                $fechaFinRango = "30-06-" . $gestionA;
                                            } else {
                                                $fechaIniRango = "01-07-" . $gestionA;
                                                $fechaFinRango = "31-12-" . $gestionA;
                                            }
                                            $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                            $cantidadRegistrada = $objFe->calculaCantidadSemanasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                        } else {
                                            /**
                                             * La fecha de inicio y de finalización están en los dos semestres
                                             */
                                            $fechaIniRango = "01-01-" . $gestionA;
                                            $fechaFinRango = "30-06-" . $gestionA;
                                            $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                            $cantidadRegistradaPS = $objFe->calculaCantidadSemanasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                            $fechaIniRango = "01-07-" . $gestionA;
                                            $fechaFinRango = "31-12-" . $gestionA;
                                            $rangoFechas .= " y del " . $fechaIniRango . " AL " . $fechaFinRango;
                                            $cantidadRegistradaSS = $objFe->calculaCantidadSemanasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                            $cantidadRegistrada = $cantidadRegistradaPS + $cantidadRegistradaSS;
                                            $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                            $cantidadAdmitida = $cantidadAdmitida * 2;
                                        }
                                        $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                        break;
                                    case "AÑO":
                                        /**
                                         * Cuantas semanas se registraron en el año
                                         */
                                        $fechaIniRango = "01-01-" . $gestionA;
                                        $fechaFinRango = "31-12-" . $gestionA;
                                        $cantidadRegistrada = $objFe->calculaCantidadSemanasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                        $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                        $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                        break;
                                    default:
                                        /**
                                         * Cuantas semanas se registraron en el año
                                         */
                                        $fechaIniRango = $fechaInicioOperacionesMiTeleferico;
                                        $fechaFinRango = date("d-m-Y");
                                        $cantidadRegistrada = $objFe->calculaCantidadSemanasEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                        $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                        $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                        break;
                                }
                            } else $cantidadTotal = -4;
                            break;
                        case "MES":
                            $arrMeses = $objFe->cantidadMesesInvolucradosEnRango($fechaIni, $fechaFin);
                            if (count($arrMeses) > 0) {
                                $cantidadSolicitada = count($arrMeses);
                                switch ($objE->fraccionamiento) {
                                    case "SEMESTRE":
                                        /**
                                         * Cuantas semanas se registraron en el semestre
                                         */
                                        $semestreA = $objFe->semestrePerteneciente($fechaIni);
                                        $semestreB = $objFe->semestrePerteneciente($fechaFin);
                                        if ($semestreA == $semestreB) {
                                            /**
                                             * Si la fecha de inicio y la de finalización están en un sólo semestre
                                             */
                                            if ($semestreA == 1) {
                                                $fechaIniRango = "01-01-" . $gestionA;
                                                $fechaFinRango = "30-06-" . $gestionA;
                                            } else {
                                                $fechaIniRango = "01-07-" . $gestionA;
                                                $fechaFinRango = "31-12-" . $gestionA;
                                            }
                                            $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                            $cantidadRegistrada = $objFe->calculaCantidadMesesEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                        } else {
                                            /**
                                             * La fecha de inicio y de finalización están en los dos semestres
                                             */
                                            $fechaIniRango = "01-01-" . $gestionA;
                                            $fechaFinRango = "30-06-" . $gestionA;
                                            $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                            $cantidadRegistradaPS = $objFe->calculaCantidadMesesEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                            $fechaIniRango = "01-07-" . $gestionA;
                                            $fechaFinRango = "31-12-" . $gestionA;
                                            $rangoFechas .= " y del " . $fechaIniRango . " AL " . $fechaFinRango;
                                            $cantidadRegistradaSS = $objFe->calculaCantidadMesesEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                            $cantidadRegistrada = $cantidadRegistradaPS + $cantidadRegistradaSS;
                                            $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                            $cantidadAdmitida = $cantidadAdmitida * 2;
                                        }
                                        $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                        break;
                                    case "AÑO":
                                        /**
                                         * Cuantas semanas se registraron en el año
                                         */
                                        $fechaIniRango = "01-01-" . $gestionA;
                                        $fechaFinRango = "31-12-" . $gestionA;
                                        $cantidadRegistrada = $objFe->calculaCantidadMesesEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                        $rangoFechas = $fechaIniRango . " AL " . $fechaFinRango;
                                        $cantidadTotal = $cantidadSolicitada + $cantidadRegistrada;
                                        break;
                                }
                            } else {
                                $cantidadTotal = -4;
                            }
                            break;
                        case "SEMESTRE":
                            $arrMeses = $objFe->cantidadMesesInvolucradosEnRango($fechaIni, $fechaFin);
                            if (count($arrMeses) == 6) {
                                $cantidadSolicitada = count($arrMeses);
                                if ($objE->fraccionamiento == "AÑO") {
                                    $cantidadTotal = 0;
                                    $fechaIniRango = "01-01-" . $gestionA;
                                    $fechaFinRango = "30-06-" . $gestionA;
                                    $cantidadRegistradaPS = $objFe->calculaCantidadMesesEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                    $fechaIniRango = "01-07-" . $gestionA;
                                    $fechaFinRango = "31-12-" . $gestionA;
                                    $cantidadRegistradaSS = $objFe->calculaCantidadMesesEnRangoFechas($idRelaboral, $idExcepcion, $idControlExcepcion, $fechaIniRango, $fechaFinRango);
                                    /**
                                     * Si se han usado en cada semestre al menos un mes, ya se considera dentro del semestre.
                                     */
                                    if ($cantidadRegistradaPS > 0) $cantidadRegistradaPS = 1;
                                    if ($cantidadRegistradaSS > 0) $cantidadRegistradaSS = 1;
                                    $cantidadRegistrada = $cantidadRegistradaPS + $cantidadRegistradaSS;

                                } else {
                                    $cantidadTotal = -6;
                                }
                            } else {
                                $cantidadTotal = -4;
                            }
                            break;
                            /**
                             * Considerando para los años y demás casos por defecto admisible
                             */
                            dafault:
                            /**
                             * No se aplica ningun control
                             */
                            $cantidadTotal = 0;
                            break;
                    }
                    if ($cantidadTotal >= 0) {
                        if ($cantidadTotal > $cantidadAdmitida) {
                            $unidadSolicitada = $objE->unidad;
                            $unidadRegistrada = $objE->unidad;
                            if ($cantidadSolicitada > 1) {
                                if ($objE->unidad == 'MES' || $objE->unidad == 'VEZ') {
                                    $unidadSolicitada = $objE->unidad . 'ES';
                                    if ($objE->unidad == 'VEZ') {
                                        $unidadSolicitada = 'VECES';
                                    }
                                } else {
                                    $unidadSolicitada = $objE->unidad . 'S';
                                }
                            }
                            if ($cantidadRegistrada > 1) {
                                if ($objE->unidad == 'MES' || $objE->unidad == 'VEZ') {
                                    $unidadRegistrada = $objE->unidad . 'ES';
                                    if ($objE->unidad == 'VEZ') {
                                        $unidadRegistrada = 'VECES';
                                    }
                                } else {
                                    $unidadRegistrada = $objE->unidad . 'S';
                                }
                            }
                            $msj = array('result' => 0, 'cantidad' => $cantidadTotal, 'msj' =>
                                'Periodo: ' . $rangoFechas . ', ' .
                                'Frecuencia Admitida: ' . $objE->frecuencia_descripcion . ', ' .
                                'Cantidad Registrada En Otras Solicitudes (Mismo periodo): ' . round($cantidadRegistrada, 2) . ' ' . $unidadRegistrada . ', ' .
                                'Cantidad Actual Solicitud (Mismo periodo): ' . $cantidadSolicitada . ' ' . $unidadSolicitada);
                        } else {
                            $msj = array('result' => 1, 'cantidad' => $cantidadTotal, 'msj' => 'Registro de excepci&oacute;n sin problemas de frecuencia. (' . $objE->frecuencia_descripcion . ')');
                        }
                    } else {
                        switch ($cantidadTotal) {
                            case -1:
                                $msj = array('result' => -1, 'cantidad' => $cantidadRegistrada, 'msj' => 'El rango de fechas de la solicitud supera el l&iacute;mite de tiempo admitido para el tipo de excepci&oacute;n seleccionado. (' . $objE->frecuencia_descripcion . ')');
                                break;
                            case -2:
                                $msj = array('result' => -2, 'cantidad' => $cantidadRegistrada, 'msj' => 'Frecuencia de uso de la boleta no controlable. Consulte con el Administrador. (' . $objE->frecuencia_descripcion . ')');
                                break;
                            case -3:
                                $msj = array('result' => -3, 'cantidad' => $cantidadRegistrada, 'msj' => 'El rango solicitado tiene conflictos con la FRECUENCIA (' . $objE->frecuencia_descripcion . '). Recomendaci&oacute;n: Puede registrar por separado en caso de vincular a m&aacute;s de un mes en el rango.');
                                break;
                            case -4:
                                $msj = array('result' => -4, 'cantidad' => $cantidadRegistrada, 'msj' => 'Se han introducido datos erroneos en el rango de fechas para la excepci&oacute;n.');
                                break;
                        }
                    }
                } else $msj = array('result' => 2, 'cantidad' => $cantidadRegistrada, 'msj' => 'El registro de excepci&oacute;n no requiere control de frecuencia. (' . $objE->frecuencia_descripcion . ')');
            } else $msj = array('result' => -1, 'cantidad' => $cantidadRegistrada, 'msj' => 'No se hall&oacute; el registro de excepci&oacute;n. (' . $objE->frecuencia_descripcion . ')');
        }
        echo json_encode($msj);
    }
} 