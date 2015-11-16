<?php
/*
*   Oasis - Sistema de Gestión para Recursos Humanos
*   Empresa Estatal de Transporte por Cable "Mi Teleférico"
*   Versión:  1.0.0
*   Usuario Creador: Lic. Javier Loza
*   Fecha Creación:  03-03-2014
*/
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Fcontrolexcepciones extends \Phalcon\Mvc\Model {
    public $id_controlexcepcion;
    public $id_relaboral;
    public $fecha_ini;
    public $hora_ini;
    public $fecha_fin;
    public $hora_fin;
    public $justificacion;
    public $turno;
    public $entrada_salida;
    public $controlexcepcion_observacion;
    public $controlexcepcion_estado;
    public $controlexcepcion_estado_descripcion;
    public $controlexcepcion_user_reg_id;
    public $controlexcepcion_user_registrador;
    public $controlexcepcion_fecha_reg;
    public $controlexcepcion_user_ver_id;
    public $controlexcepcion_user_verificador;
    public $controlexcepcion_fecha_ver;
    public $controlexcepcion_user_apr_id;
    public $controlexcepcion_user_aprobador;
    public $controlexcepcion_fecha_apr;
    public $controlexcepcion_user_mod_id;
    public $controlexcepcion_user_modificador;
    public $controlexcepcion_fecha_mod;
    public $excepcion_id;
    public $excepcion;
    public $tipoexcepcion_id;
    public $tipo_excepcion;
    public $codigo;
    public $color;
    public $compensatoria;
    public $compensatoria_descripcion;
    public $genero_id;
    public $genero;
    public $cantidad;
    public $unidad;
    public $fraccionamiento;
    public $frecuencia_descripcion;
    public $redondeo;
    public $redondeo_descripcion;
    public $horario;
    public $horario_descripcion;
    public $refrigerio;
    public $refrigerio_descripcion;
    public $observacion;
    public $estado;
    public $estado_descripcion;
    public $baja_logica;
    public $agrupador;
    public $user_reg_id;
    public $fecha_reg;
    public $user_mod_id;
    public $fecha_mod;
    public $fecha;
    public $dia;
    public $dia_nombre;
    public $dia_nombre_abr_ing;

    /**
     * Initializar el method para el modelo.
     */
    public function initialize()
    {
        $this->setSchema("");
    }

    /**
     * Mapeo independiente de columnas
     */
    public function columnMap()
    {
        return array(
            'id_controlexcepcion'=>'id_controlexcepcion',
            'id_relaboral'=>'id_relaboral',
            'fecha_ini'=>'fecha_ini',
            'hora_ini'=>'hora_ini',
            'fecha_fin'=>'fecha_fin',
            'hora_fin'=>'hora_fin',
            'justificacion'=>'justificacion',
            'turno'=>'turno',
            'entrada_salida'=>'entrada_salida',
            'controlexcepcion_observacion'=>'controlexcepcion_observacion',
            'controlexcepcion_estado'=>'controlexcepcion_estado',
            'controlexcepcion_estado_descripcion'=>'controlexcepcion_estado_descripcion',
            'controlexcepcion_user_reg_id'=>'controlexcepcion_user_reg_id',
            'controlexcepcion_user_registrador'=>'controlexcepcion_user_registrador',
            'controlexcepcion_fecha_reg'=>'controlexcepcion_fecha_reg',
            'controlexcepcion_user_ver_id'=>'controlexcepcion_user_ver_id',
            'controlexcepcion_user_verificador'=>'controlexcepcion_ver_verificador',
            'controlexcepcion_fecha_ver'=>'controlexcepcion_fecha_ver',
            'controlexcepcion_user_apr_id'=>'controlexcepcion_user_apr_id',
            'controlexcepcion_user_aprobador'=>'controlexcepcion_user_aprobador',
            'controlexcepcion_fecha_apr'=>'controlexcepcion_fecha_apr',
            'controlexcepcion_user_mod_id'=>'controlexcepcion_user_mod_id',
            'controlexcepcion_user_modificador'=>'controlexcepcion_user_modificador',
            'controlexcepcion_fecha_mod'=>'controlexcepcion_fecha_mod',
            'excepcion'=>'excepcion_id',
            'excepcion'=>'excepcion',
            'tipoexcepcion_id'=>'tipoexcepcion_id',
            'tipo_excepcion'=>'tipo_excepcion',
            'codigo'=>'codigo',
            'color'=>'color',
            'compensatoria'=>'compensatoria',
            'compensatoria_descripcion'=>'compensatoria_descripcion',
            'genero_id'=>'genero_id',
            'genero'=>'genero',
            'cantidad'=>'cantidad',
            'unidad'=>'unidad',
            'fraccionamiento'=>'fraccionamiento',
            'frecuencia_descripcion'=>'frecuencia_descripcion',
            'redondeo'=>'redondeo',
            'redondeo_descripcion'=>'redondeo_descripcion',
            'horario'=>'horario',
            'horario_descripcion'=>'horario_descripcion',
            'refrigerio'=>'refrigerio',
            'refrigerio_descripcion'=>'refrigerio_descripcion',
            'observacion'=>'observacion',
            'estado'=>'estado',
            'estado_descripcion'=>'estado_descripcion',
            'baja_logica'=>'baja_logica',
            'agrupador'=>'agrupador',
            'user_reg_id'=>'user_reg_id',
            'fecha_reg'=>'fecha_reg',
            'user_mod_id'=>'user_mod_id',
            'fecha_mod'=>'fecha_mod'
        );
    }
    private $_db;

    /**
     * Función para la obtención del listado de registros de control de excepciones.
     * @param string $where
     * @param string $group
     * @return Resultset
     */
    public function getAll($where='',$group='')
    {
        $sql = "SELECT * FROM f_controlexcepciones()";
        if($where!='')$sql .= $where;
        if($group!='')$sql .= $group;
        $this->_db = new Fcontrolexcepciones();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    /**
     * Función para la obtención del registro correspondiente a un control de excepción específico de acuerdo al $idControlExcepcion enviado.
     * @param $idControlExcepcion
     * @param string $where
     * @param string $group
     * @return Resultset
     */
    public function getOne($idControlExcepcion,$where='',$group='')
    {
        $sql = "SELECT * FROM f_controlexcepciones_por_id($idControlExcepcion)";
        if($where!='')$sql .= $where;
        if($group!='')$sql .= $group;
        $this->_db = new Fcontrolexcepciones();
        $arr = new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
        if(count($arr)>0) return $arr[0];
        else return null;
    }
    /**
     * Función para la obtención de los registros de controles de excepción referentes a un registro de relación laboral.
     * @param $idRelaboral
     * @param string $where
     * @param string $group
     * @return Resultset
     */
    public function getAllByOneRelaboral($idRelaboral,$where='',$group='',$offset=null,$limit=null)
    {
        $sql = "SELECT * FROM f_controlexcepciones_relaboral_offset_limit($idRelaboral,$offset,$limit)";
        if($where!='')$sql .= $where;
        if($group!='')$sql .= $group;
        $this->_db = new Fcontrolexcepciones();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
        /*$sql = "SELECT ";
        $sql .= "ce.id as id_controlexcepcion,";
        $sql .= "ce.relaboral_id as id_relaboral,";
        $sql .= "ce.fecha_ini,";
        $sql .= "ce.hora_ini,";
        $sql .= "ce.fecha_fin,";
        $sql .= "ce.hora_fin,";
        $sql .= "ce.turno,";
        $sql .= "ce.entrada_salida,";
        $sql .= "ce.justificacion,";
        $sql .= "ce.observacion AS controlexcepcion_observacion,";
        $sql .= "ce.estado AS controlexcepcion_estado,";
        $sql .= "pa.valor_1 AS controlexcepcion_estado_descripcion,";
        $sql .= "ce.user_reg_id as controlexcepcion_user_reg_id,";
        $sql .= "REPLACE(p1.p_apellido||' '||";
        $sql .= "CASE WHEN p1.s_apellido IS NOT NULL AND p1.s_apellido !='' THEN p1.s_apellido ELSE '' END";
        $sql .= "||";
        $sql .= "CASE WHEN p1.c_apellido IS NOT NULL THEN ' '||p1.c_apellido ELSE NULL END";
        $sql .= "||";
        $sql .= "CASE WHEN p1.p_nombre IS NOT NULL THEN ' '||p1.p_nombre ELSE '' END";
        $sql .= "||";
        $sql .= "CASE WHEN p1.s_nombre IS NOT NULL THEN ' '||p1.s_nombre ELSE '' END";
        $sql .= "||";
        $sql .= "CASE WHEN p1.t_nombre IS NOT NULL THEN ' '||p1.t_nombre ELSE '' END,'  ',' ')";
        $sql .= "AS controlexcepcion_user_registrador,";
        $sql .= "ce.fecha_reg as controlexcepcion_fecha_reg,";
        $sql .= "ce.user_ver_id as controlexcepcion_user_ver_id,";
        $sql .= "REPLACE(p2.p_apellido||' '||";
        $sql .= "CASE WHEN p2.s_apellido IS NOT NULL THEN p2.s_apellido ELSE '' END";
        $sql .= "||";
        $sql .= "CASE WHEN p2.c_apellido IS NOT NULL THEN ' '||p2.c_apellido ELSE '' END";
        $sql .= "||";
        $sql .= "CASE WHEN p2.p_nombre IS NOT NULL THEN ' '||p2.p_nombre ELSE '' END";
        $sql .= "||";
        $sql .= "CASE WHEN p2.s_nombre IS NOT NULL THEN ' '||p2.s_nombre ELSE '' END";
        $sql .= "||";
        $sql .= "CASE WHEN p2.t_nombre IS NOT NULL THEN ' '||p2.t_nombre ELSE '' END,'  ',' ')";
        $sql .= "AS controlexcepcion_user_verificador,";
        $sql .= "ce.fecha_ver as controlexcepcion_fecha_ver,";
        $sql .= "ce.user_apr_id as controlexcepcion_user_apr_id,";
        $sql .= "REPLACE(p3.p_apellido||' '||";
        $sql .= "CASE WHEN p3.s_apellido IS NOT NULL THEN p3.s_apellido ELSE '' END";
        $sql .= "||";
        $sql .= "CASE WHEN p3.c_apellido IS NOT NULL THEN ' '||p3.c_apellido ELSE '' END";
        $sql .= "||";
        $sql .= "CASE WHEN p3.p_nombre IS NOT NULL THEN ' '||p3.p_nombre ELSE '' END";
        $sql .= "||";
        $sql .= "CASE WHEN p3.s_nombre IS NOT NULL THEN ' '||p3.s_nombre ELSE '' END";
        $sql .= "||";
        $sql .= "CASE WHEN p3.t_nombre IS NOT NULL THEN ' '||p3.t_nombre ELSE '' END,'  ',' ')";
        $sql .= "AS controlexcepcion_user_aprobador,";
        $sql .= "ce.fecha_apr as controlexcepcion_fecha_apr,";
        $sql .= "ce.user_mod_id as controlexcepcion_user_mod_id,";
        $sql .= "REPLACE(p4.p_apellido||' '||";
        $sql .= "CASE WHEN p4.s_apellido IS NOT NULL THEN p4.s_apellido ELSE '' END";
        $sql .= "||";
        $sql .= "CASE WHEN p4.c_apellido IS NOT NULL THEN ' '||p4.c_apellido ELSE '' END";
        $sql .= "||";
        $sql .= "CASE WHEN p4.p_nombre IS NOT NULL THEN ' '||p4.p_nombre ELSE '' END";
        $sql .= "||";
        $sql .= "CASE WHEN p4.s_nombre IS NOT NULL THEN ' '||p4.s_nombre ELSE '' END";
        $sql .= "||";
        $sql .= "CASE WHEN p4.t_nombre IS NOT NULL THEN ' '||p4.t_nombre ELSE '' END,'  ',' ')";
        $sql .= "AS controlexcepcion_user_modificador,";
        $sql .= "ce.fecha_mod as controlexcepcion_fecha_mod,";
        $sql .= "fe.* ";
        $sql .= "FROM controlexcepciones ce ";
        $sql .= "INNER JOIN f_excepciones_por_id(ce.excepcion_id) fe ON fe.id_excepcion>0 ";
        $sql .= "INNER JOIN parametros pa ON pa.parametro LIKE 'ESTADO_CONTROLEXCEPCIONES' AND ce.estado = CAST(pa.nivel AS integer) ";
        $sql .= "INNER JOIN usuarios u1 ON u1.id = ce.user_reg_id ";
        $sql .= "LEFT JOIN personas p1 ON p1.id = u1.persona_id ";
        $sql .= "LEFT JOIN usuarios u2 ON u2.id = ce.user_ver_id ";
        $sql .= "LEFT JOIN personas p2 ON p2.id = u2.persona_id ";
        $sql .= "LEFT JOIN usuarios u3 ON u3.id = ce.user_apr_id ";
        $sql .= "LEFT JOIN personas p3 ON p3.id = u3.persona_id ";
        $sql .= "LEFT JOIN usuarios u4 ON u4.id = ce.user_mod_id ";
        $sql .= "LEFT JOIN personas p4 ON p4.id = u4.persona_id ";
        $sql .= "WHERE ce.baja_logica=1 AND ce.relaboral_id = ".$idRelaboral." ";
        $sql .= "ORDER BY ce.fecha_ini DESC,ce.hora_ini DESC ";
        if($offset!=''&&$offset!=null)$sql .= " OFFSET ".$offset;
        if($limit!=''&&$limit!=null)$sql .= " LIMIT  ".$limit;
        if($group!='')$sql .= $group;
        $this->_db = new Fmarcaciones();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));*/
    }

    /**
     * Función para la obtención de los controles de excepción en un rango con la repetición de registros durante las fechas correspondientes.
     * @param $idRelaboral
     * @param $fechaIni
     * @param $fechaFin
     * @return Resultset
     */
    public function getAllByRelaboralAndRange($idRelaboral,$fechaIni,$fechaFin)
    {
        if($idRelaboral>0&&$fechaIni!=''&&$fechaFin!=''){
            $sql = "select * from f_controlexcepciones_relaboral_rango($idRelaboral,'$fechaIni','$fechaFin')";
            $this->_db = new Fexcepciones();
            return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
        }
    }
    /**
     * Función para contabilizar la cantidad de registros totales para la consulta ejecutada en la función previa de arriva.
     * @param $fechaIni
     * @param $fechaFin
     * @param string $where
     * @param string $group
     * @return Resultset
     */
    public function getCountAll($idRelaboral,$where,$group)
    {
        $sql = "SELECT COUNT (*) AS resultado FROM (";
        $sql .= "SELECT * FROM controlmarcaciones ";
        $sql .= ") AS m ";
        if($group!='')$sql .= $group;
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

} 