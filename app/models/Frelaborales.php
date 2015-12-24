<?php
/*
*   Oasis - Sistema de Gestión para Recursos Humanos
*   Empresa Estatal de Transporte por Cable "Mi Teleférico"
*   Versión:  1.0.0
*   Usuario Creador: Lic. Javier Loza
*   Fecha Creación:  20-10-2014
*/


use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Frelaborales extends \Phalcon\Mvc\Model {
    public $id_relaboral;
    public $id_persona;
    public $nombres;
    public $p_nombre;
    public $s_nombre;
    public $t_nombre;
    public $p_apellido;
    public $s_apellido;
    public $c_apellido;
    public $ci;
    public $expd;
    public $num_complemento;
    public $fecha_nac;
    public $edad;
    public $lugar_nac;
    public $genero;
    public $e_civil;
    public $item;
    public $carrera_adm;
    public $num_contrato;
    public $contrato_numerador_estado;
    public $id_solelabcontrato;
    public $solelabcontrato_regional_sigla;
    public $solelabcontrato_numero;
    public $solelabcontrato_gestion;
    public $solelabcontrato_codigo;
    public $solelabcontrato_user_reg_id;
    public $solelabcontrato_fecha_sol;
    public $fecha_ini;
    public $fecha_incor;
    public $fecha_fin;
    public $fecha_baja;
    public $fecha_ren;
    public $fecha_acepta_ren;
    public $fecha_agra_serv;
    public $motivo_baja;
    public $motivosbajas_abreviacion;
    public $descripcion_baja;
    public $descripcion_anu;
    public $id_cargo;
    public $cargo_codigo;
    public $cargo;
    public $cargo_resolucion_ministerial_id;
    public $cargo_resolucion_ministerial;
    public $id_nivelessalarial;
    public $nivelsalarial;
    public $nivelsalarial_resolucion_id;
    public $nivelsalarial_resolucion;
    public $numero_escala;
    public $gestion_escala;
    public $sueldo;
    public $id_procesocontratacion;
    public $proceso_codigo;
    public $id_convocatoria;
    public $convocatoria_codigo;
    public $convocatoria_tipo;
    public $id_fin_partida;
    public $fin_partida;
    public $id_condicion;
    public $condicion;
    public $tiene_item;
    public $categoria_relaboral;
    public $id_da;
    public $direccion_administrativa;
    public $organigrama_regional_id;
    public $organigrama_regional;
    public $id_regional;
    public $regional;
    public $regional_codigo;
    public $id_departamento;
    public $departamento;
    public $id_provincia;
    public $provincia;
    public $id_localidad;
    public $localidad;
    public $residencia;
    public $unidad_ejecutora;
    public $cod_ue;
    public $id_gerencia_administrativa;
    public $gerencia_administrativa;
    public $id_departamento_administrativo;
    public $departamento_administrativo;
    public $id_organigrama;
    public $unidad_administrativa;
    public $organigrama_sigla;
    public $organigrama_orden;
    public $id_area;
    public $area;
    public $id_ubicacion;
    public $ubicacion;
    public $unidades_superiores;
    public $unidades_dependientes;
    public $partida;
    public $fuente_codigo;
    public $fuente;
    public $organismo_codigo;
    public $organismo;
    public $relaborales_observacion;
    public $estado;
    public $estado_descripcion;
    public $estado_abreviacion;
    public $tiene_contrato_vigente;
    public $id_eventual;
    public $id_consultor;
    public $user_reg_id;
    public $fecha_reg;
    public $user_mod_id;
    public $fecha_mod;
    public $persona_user_reg_id;
    public $persona_fecha_reg;
    public $persona_user_mod_id;
    public $persona_fecha_mod;
    public $agrupador;//Dato adicionado para efectos de conocer si pertenece a un perfil laboral o no
    public $fecha_ing;//Fecha del primer ingreso dentro del grupo de registros laborales.
    public $relaboral_previo_id;//Identificador del registro de relación laboral previo

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->setSchema("");
    }

    /**
     * Independent Column Mapping.
     */
    public function columnMap()
    {
        return array(
            'id_relaboral'=>'id_relaboral',
            'id_persona'=>'id_persona',
            'nombres'=>'nombres',
            'p_nombre'=>'p_nombre',
            's_nombre'=>'s_nombre',
            't_nombre'=>'t_nombre',
            'p_apellido'=>'p_apellido',
            's_apellido'=>'s_apellido',
            'c_apellido'=>'c_apellido',
            'ci'=>'ci',
            'expd'=>'expd',
            'num_complemento'=>'num_complemento',
            'fecha_nac'=>'fecha_nac',
            'edad'=>'edad',
            'lugar_nac'=>'lugar_nac',
            'genero'=>'genero',
            'e_civil'=>'e_civil',
            'item'=>'item',
            'carrera_amd'=>'carrera_amd',
            'num_contrato'=>'num_contrato',
            'contrato_numerador_estado'=>'contrato_numerador_estado',
            'id_solelabcontrato'=>'id_solelabcontrato',
            'solelabcontrato_regional_sigla'=>'solelabcontrato_regional_sigla',
            'solelabcontrato_numero'=>'solelabcontrato_numero',
            'solelabcontrato_gestion'=>'solelabcontrato_gestion',
            'solelabcontrato_codigo'=>'solelabcontrato_codigo',
            'solelabcontrato_user_reg_id'=>'solelabcontrato_user_reg_id',
            'solelabcontrato_fecha_sol'=>'solelabcontrato_fecha_sol',
            'fecha_ini'=>'fecha_ini',
            'fecha_incor'=>'fecha_incor',
            'fecha_fin'=>'fecha_fin',
            'fecha_baja'=>'fecha_baja',
            'fecha_ren'=>'fecha_ren',
            'fecha_acepta_ren'=>'fecha_acepta_ren',
            'fecha_agra_serv'=>'fecha_agra_serv',
            'motivo_baja'=>'motivo_baja',
            'motivosbajas_abreviacion'=>'motivosbajas_abreviacion',
            'descripcion_baja'=>'descripcion_baja',
            'descripcion_anu'=>'descripcion_anu',
            'id_cargo'=>'id_cargo',
            'cargo_codigo'=>'cargo_codigo',
            'cargo'=>'cargo',
            'cargo_resolucion_ministerial_id'=>'cargo_resolucion_ministerial_id',
            'cargo_resolucion_ministerial'=>'cargo_resolucion_ministerial',
            'id_nivelessalarial'=>'id_nivelessalarial',
            'nivelsalarial'=>'nivelsalarial',
            'nivelsalarial_resolucion_id'=>'nivelsalarial_resolucion_id',
            'nivelsalarial_resolucion'=>'nivelsalarial_resolucion',
            'numero_escala'=>'numero_escala',
            'gestion_escala'=>'gestion_escala',
            'sueldo'=>'sueldo',
            'id_procesocontratacion'=>'id_procesocontratacion',
            'proceso_codigo'=>'proceso_codigo',
            'id_convocatoria'=>'id_convocatoria',
            'convocatoria_codigo'=>'convocatoria_codigo',
            'convocatoria_tipo'=>'convocatoria_tipo',
            'id_fin_partida'=>'id_fin_partida',
            'fin_partida'=>'fin_partida',
            'id_condicion'=>'id_condicion',
            'condicion'=>'condicion',
            'tiene_item'=>'tiene_item',
            'categoria_relaboral'=>'categoria_relaboral',
            'id_da'=>'id_da',
            'direccion_administrativa'=>'direccion_administrativa',
            'organigrama_regional_id'=>'organigrama_regional_id',
            'organigrama_regional'=>'organigrama_regional',
            'id_regional'=>'id_regional',
            'regional'=>'regional',
            'regional_codigo'=>'regional_codigo',
            'id_departamento'=>'id_departamento',
            'departamento'=>'departamento',
            'id_provincia'=>'id_provincia',
            'provincia'=>'provincia',
            'id_localidad'=>'id_localidad',
            'localidad'=>'localidad',
            'residencia'=>'residencia',
            'unidad_ejecutora'=>'unidad_ejecutora',
            'cod_ue'=>'cod_ue',
            'id_gerencia_administrativa'=>'id_gerencia_administrativa',
            'gerencia_administrativa'=>'gerencia_administrativa',
            'id_departamento_administrativo'=>'id_departamento_administrativo',
            'departamento_administrativo'=>'departamento_administrativo',
            'id_organigrama'=>'id_organigrama',
            'unidad_administrativa'=>'unidad_administrativa',
            'organigrama_sigla'=>'organigrama_sigla',
            'organigrama_orden'=>'organigrama_orden',
            'id_area'=>'id_area',
            'area'=>'area',
            'id_ubicacion'=>'id_ubicacion',
            'ubicacion'=>'ubicacion',
            'unidades_superiores'=>'unidades_superiores',
            'unidades_dependientes'=>'unidades_dependientes',
            'partida'=>'partida',
            'fuente_codigo'=>'fuente_codigo',
            'fuente'=>'fuente',
            'organismo_codigo'=>'organismo_codigo',
            'organismo'=>'organismo',
            'observacion'=>'observacion',
            'estado'=>'estado',
            'estado_descripcion'=>'estado_descripcion',
            'estado_abreviacion'=>'estado_abreviacion',
            'tiene_contrato_vigente'=>'tiene_contrato_vigente',
            'id_eventual'=>'id_eventual',
            'id_consultor'=>'id_consultor',
            'user_reg_id'=>'user_reg_id',
            'fecha_reg'=>'fecha_reg',
            'user_mod_id'=>'user_mod_id',
            'fecha_mod'=>'fecha_mod',
            'persona_user_reg_id'=>'persona_user_reg_id',
            'persona_fecha_reg'=>'persona_fecha_reg',
            'persona_user_mod_id'=>'persona_user_mod_id',
            'persona_fecha_mod'=>'persona_fecha_mod',
            'agrupador'=>'agrupador',
            'fecha_ing'=>'fecha_ing',
            'relaboral_previo_id'=>'relaboral_previo_id'
        );
    }
    private $_db;
    /**
     * Función para la obtención de la totalidad de los registros de relaciones laborales.
     * @return Resultset
     */
    public function getAll($where='',$group='')
    {
        $sql = "SELECT * FROM f_relaborales()";
        if($where!='')$sql .= $where;
        if($group!='')$sql .= $group;
        $this->_db = new Frelaborales();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    /**
     * Función para obtener el registro correspondiente a una relación laboral.
     * @param $id_relaboral
     * @return Resultset
     */
    public function getOne($id_relaboral)
    {
        if($id_relaboral>0){
            $sql = "SELECT * FROM f_relaborales_por_id($id_relaboral)";
            $this->_db = new Frelaborales();
            return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
        } else {
            return new Frelaborales();
        }
    }
    /**
     * Función para la obtención de la totalidad de los registros de relaciones laborales para un persona en particular.
     * @return Resultset
     */
    public function getAllByPerson($idPersona,$gestion=0)
    {
        if($idPersona>0){
            $sql = "SELECT * FROM f_relaborales_por_persona_gestion($idPersona,$gestion)";
            $sql.=" ORDER BY fecha_ini DESC";
            $this->_db = new Frelaborales();
            return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
        }else return new Frelaborales();
    }

    /**
     * Función para la obtención de la totalidad de los registros de relaciones laborales,
     * adicionando el registro de personas que nunca tuvieron una relación laboral con la empresa.
     * @return Resultset Lista de registros laborales con la adición de persona sin un sólo registro laboral.
     */
    public function getAllWithPersons($where='',$group='')
    {
        /*
        Modificación innecesaria debido a que la columna tiene_item ya se ha considerado dentro del procedimiento almacenado
        $sql = "SELECT f.*,c.agrupador as tiene_item FROM f_relaborales_y_personas_nuevas() f ";
        $sql .= "LEFT JOIN condiciones c ON c.id = f.id_condicion";*/
        $sql = "SELECT * FROM f_relaborales_y_personas_nuevas()";
        if($where!='')$sql .= $where;
        if($group!='')$sql .= $group;
        $this->_db = new Frelaborales();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    /*
     * Función para la obtención de los registro de relaciones laborales conjuncionadas a las personas que no tienen registro de relación laboral,
     * considerando que si una persona tiene más de un registro de relación laboral, sólo se muestra un registro, el último.
     * @return Resultset Lista de registros laborales con la adición de personas sin ún sólo registro laboral.
     */
    public function getAllWithPersonsOneRecord($where='',$group='')
    {
        $sql = "SELECT * FROM f_relaborales_y_personas_nuevas_un_registro()";
        if($where!='')$sql .= $where;
        if($group!='')$sql .= $group;
        $this->_db = new Frelaborales();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    /**
     * Función para listar los registros laborales considerando quienes cumplen los criterios enviados como parámetros.
     * Se adiciona una columna agrupador para este propósito. Es decir, si un registro cumple el criterio su agrupador
     * será 1 y si no 0.
     * @param $idPerfilLaboral
     * @param $idUbicacion
     * @param $fechaIni
     * @param $fechaFin
     * @return Resultset
     */
    public function getListGroupedByPerfil($idPerfilLaboral,$idUbicacion,$fechaIni,$fechaFin)
    {
        if($idPerfilLaboral>0&&$idUbicacion>0&&$fechaIni!=''&&$fechaFin!=''){
            $sql = "SELECT * FROM f_relaborales_agrupados_por_asignacion(".$idPerfilLaboral.",".$idUbicacion.",'".$fechaIni."','".$fechaFin."')";
            $this->_db = new Frelaborales();
            return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
        } else return new Resultset();
    }

    /**
     * Función para la obtención de los registros de relación laboral
     * @param $idPerfilLaboral
     * @param $idUbicacion
     * @param $fechaIni
     * @param $fechaFin
     * @return Resultset
     */
    public function getListAssignedByPerfil($idPerfilLaboral,$idUbicacion,$fechaIni,$fechaFin)
    {
        if($idPerfilLaboral>0&&$idUbicacion>0&&$fechaIni!=''&&$fechaFin!=''){
            $sql = "SELECT * FROM f_relaborales_asignados_a_perfil(".$idPerfilLaboral.",".$idUbicacion.",'".$fechaIni."','".$fechaFin."')";
            $this->_db = new Frelaborales();
            return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
        } else return new Resultset();
    }

    /**
     * Función para obtener los datos laborales del inmediato superior en base al registro laboral de la persona.
     * @param $idRelaboral
     * @return Resultset
     */
    public function getInmediatoSuperiorRelaboral($idRelaboral)
    {
        if($idRelaboral>0){
            $sql = "SELECT * FROM f_relaborales_inmediato_superior(".$idRelaboral.")";
            $this->_db = new Frelaborales();
            return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
        } else return new Resultset();
    }

    /**
     * Función para obtener el registro de relación laboral considerando la última asignación de movilidad de personal válida.
     * @param $idRelaboral
     * @return Resultset
     */
    public function getOneRelaboralConsiderandoUltimaMovilidad($idRelaboral)
    {
        if($idRelaboral>0){
            $sql = "SELECT * FROM f_relaborales_ultima_movilidad_por_id(".$idRelaboral.")";
            $this->_db = new Frelaborales();
            $arr = new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
            return $arr[0];
        } else return new Resultset();
    }

    /**
     * Función para obtener el último registro de relación laboral considerano movilidad de personal, de una determinada persona.
     * @param $idPersona
     * @return Resultset
     */
    public function getOneRelaboralConsiderandoUltimaMovilidadPorPersona($idPersona)
    {
        if($idPersona>0){
            $sql = "SELECT * FROM f_relaborales_ultima_movilidad_por_id_persona(".$idPersona.")";
            $this->_db = new Frelaborales();
            $arr = new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
            return $arr[0];
        } else return new Resultset();
    }
    /**
     * Función para la obtención de los registros de relación laboral de una determinada unidad organizacional dentro de la empresa, considerando la ejecucion de un filtro adicional
     * de acuerdo al parámetro $where.
     * @param $IdOrganigrama
     * @param $where
     * @return Resultset
     */
    public function getAllRelaboralesByIdOrganigramaConsiderandoUltimaMovilidad($IdOrganigrama,$where)
    {
        if($IdOrganigrama>0){
            $sql = "SELECT * FROM f_relaborales_ultima_movilidad_por_organigrama(".$IdOrganigrama.",'$where')";
            $this->_db = new Frelaborales();
            return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
        } else return new Resultset();
    }

    /**
     * Función para obtener el listado de periodos continuos de contratos considerando que se suman las condiciones de Contrato a Plazo Fijo y las de Contrato Indefinido.
     * Teniendo por otro lado a los Consultores.
     * @param $idPersona
     * @return Resultset
     */
    public function getListAntiguedadPorPeriodos($idPersona)
    {
        if($idPersona>0){
            $sql = "select * from f_relaborales_antiguedad_por_periodos(".$idPersona.")";
            $this->_db = new Frelaborales();
            return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
        } else return new Resultset();
    }

    /**
     * Función para el despliegue de registros de relación laboral considerando la entrega de ideas de negocio.
     * @param $idRelaboral
     * @param $idPersona
     * @param $gestion
     * @param $mes
     * @param string $where
     * @param string $group
     * @return Resultset
     */
    public function getAllCountIdeas($idRelaboral,$idPersona,$gestion,$mes,$where='',$group='')
    {
        $sql = "SELECT * FROM f_relaborales_ultima_movilidad_control_ideas_mes($idRelaboral,$idPersona,$gestion,$mes)";
        if($where!='')$sql .= $where;
        if($group!='')$sql .= $group;
        $this->_db = new Frelaborales();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }
} 