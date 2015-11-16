<?php
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Cargos extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $id;

    /**
     *
     * @var integer
     */
    public $organigrama_id;

    /**
     *
     * @var integer
     */
    public $ejecutora_id;

    /**
     *
     * @var string
     */
    public $codigo;

    /**
     *
     * @var string
     */
    public $cargo;

    /**
     *
     * @var integer
     */
    public $codigo_nivel;

    /**
     *
     * @var integer
     */
    public $cargo_estado_id;

    /**
     *
     * @var integer
     */
    public $baja_logica;

    /**
     *
     * @var integer
     */
    public $user_reg_id;

    /**
     *
     * @var string
     */
    public $fecha_reg;

    /**
     *
     * @var integer
     */
    public $user_mod_id;

    /**
     *
     * @var string
     */
    public $fecha_mod;

    /**
     *
     * @var integer
     */
    public $estado;

    /**
     *
     * @var integer
     */
    public $fin_partida_id;

    /**
     *
     * @var integer
     */
    public $depende_id;

    /**
     *
     * @var string
     */
    public $formacion_requerida;

    /**
     *
     * @var integer
     */
    public $asistente;

    /**
     *
     * @var integer
     */
    public $jefe;

    /**
     *
     * @var integer
     */
    public $resolucion_ministerial_id;
    /**
     *
     * @var integer
     */
    public $ordenador;
    /**
     *
     * @var integer
     */
    public $nivelsalarial_id;

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
            'id' => 'id',
            'organigrama_id' => 'organigrama_id',
            'ejecutora_id' => 'ejecutora_id',
            'codigo' => 'codigo',
            'cargo' => 'cargo',
            'codigo_nivel' => 'codigo_nivel',
            'cargo_estado_id' => 'cargo_estado_id',
            'baja_logica' => 'baja_logica',
            'user_reg_id' => 'user_reg_id',
            'fecha_reg' => 'fecha_reg',
            'user_mod_id' => 'user_mod_id',
            'fecha_mod' => 'fecha_mod',
            'estado' => 'estado',
            'fin_partida_id' => 'fin_partida_id',
            'depende_id' => 'depende_id',
            'formacion_requerida' => 'formacion_requerida',
            'asistente' => 'asistente',
            'jefe' => 'jefe',
            'resolucion_ministerial_id' => 'resolucion_ministerial_id',
            'ordenador' => 'ordenador',
            'nivelsalarial_id' => 'nivelsalarial_id',
        );
    }

    private $_db;

    //public function lista($organigrama_id = '', $estado2 = '', $condicion = '')
    public function lista($where='',$group='')
    {
        // $where = '';
        // if ($organigrama_id > 0) {
        //     $where .= ' AND c.organigrama_id=' . $organigrama_id;
        // }
        // if ($condicion > 0) {
        //     $where .= ' AND f.condicion_id=' . $condicion;
        // }
        // if ($estado2 > 0) {
        //     if ($estado2 == 1) {
        //         $where .= ' AND r.estado is NOT NULL';
        //     } else {
        //         $where .= ' AND r.estado is NULL';
        //     }
        // }

// $sql = "SELECT * FROM cargos";
//         if($where!='')$sql .= $where;
//         if($group!='')$sql .= $group;

        $sql="SELECT * FROM f_listado_cargos() ".$where." ". $group;

        $this->_db = new Cargos();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }


    //public function listapac($estado = '', $organigrama_id = '',$fecha_ini='',$fecha_fin='')
    public function listapac($estado = '', $where='')
    {
        //$where = '';
        if ($estado == 1) {
            $where.= " and estado is NULL ";
        }
        // if ($organigrama_id>0) {
        //     $where.= " AND c.organigrama_id =".$organigrama_id;   
        // }
        // if ($fecha_ini!='' && $fecha_fin!='') {
        //     $where.= " AND p.fecha_ini BETWEEN '$fecha_ini' AND '$fecha_fin'";   
        // }

        $sql = "select * from f_listado_pacs() where baja_logica=1 ".$where."  order by fecha_ini asc";
        $this->_db = new Cargos();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    public function listaeditpac($proceso_contratacion_id)
    {
        $sql="SELECT  p.*, c.cargo,c.codigo,n.sueldo,o.unidad_administrativa, se.estado as estado1, s.proceso_contratacion_id,re.tipo_resolucion
        FROM pacs p
        INNER JOIN cargos c ON p.cargo_id=c.id
        INNER JOIN resoluciones re ON c.resolucion_ministerial_id=re.id
        INNER JOIN organigramas o ON c.organigrama_id=o.id
        INNER JOIN nivelsalariales n ON c.codigo_nivel=n.nivel AND n.activo=1
        LEFT JOIN seguimientos s ON s.pac_id=p.id AND s.baja_logica=1
        LEFT JOIN seguimientosestados se ON s.seguimiento_estado_id=se.id
        WHERE p.baja_logica=1  AND (se.estado is NULL OR proceso_contratacion_id='$proceso_contratacion_id') order by p.fecha_ini asc";
        $this->_db = new Cargos();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));

    }

    public function getEstadoSeguimiento($cargo_id)
    {
        $sql = "SELECT p.*,s.seguimiento_estado_id ,CASE WHEN s.seguimiento_estado_id is NULL  THEN '0' ELSE s.seguimiento_estado_id  END as estado1
        FROM pacs p 
        LEFT JOIN seguimientos s ON p.id=s.pac_id AND s.baja_logica=1
        WHERE p.baja_logica = 1 AND p.cargo_id = '$cargo_id'";
        $this->_db = new Cargos();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    public function getCI($cargo_id = '')
    {
        $sql = "select p.ci,p.p_nombre,p.p_apellido,p.s_apellido from relaborales r,personas p 
        where r.cargo_id='$cargo_id' and r.estado > 0 and r.baja_logica=1 and r.persona_id = p.id";
        $this->_db = new Cargos();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    public function getPersonalOrganigrama($organigrama_id = '')
    {
        $sql = "SELECT r.id,CONCAT(p.p_apellido,' ',p.s_apellido,' ',p.p_nombre,' ',p.s_nombre) as nombre,c.cargo
        FROM relaborales r, personas p, cargos c 
        WHERE r.estado = 1 AND r.baja_logica=1 AND r.organigrama_id = '$organigrama_id' AND r.persona_id=p.id AND r.cargo_id=c.id
        ORDER BY p.p_apellido ASC";
        $this->_db = new Cargos();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    public function listPersonal($organigrama_id = '', $depende_id = 0)
    {
        $where = "";
        if ($organigrama_id > 0) {
            $where = " AND c.organigrama_id='$organigrama_id'";
        }

        $sql = "SELECT c.*, r.estado as estado1
                FROM cargos c
                LEFT JOIN relaborales r ON c.id = r.cargo_id AND r.baja_logica = 1
                WHERE c.baja_logica = 1 AND c.depende_id = '$depende_id' " . $where;
        $this->_db = new Cargos();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    public function listGerencias()
    {
        $sql = "SELECT o.id, o.padre_id, o.unidad_administrativa
        FROM nivelestructurales n
        INNER JOIN organigramas o ON n.id=o.nivel_estructural_id
        WHERE o.baja_logica =1 AND n.estado=1";
        $this->_db = new Cargos();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));   
    }

    public function dependientes($organigrama_id='')
    {
        $sql="SELECT id,cargo FROM cargos WHERE organigrama_id=(SELECT padre_id FROM organigramas WHERE id=".$organigrama_id.") AND jefe=1 AND baja_logica = 1
        UNION ALL
        SELECT id,cargo FROM cargos WHERE organigrama_id=".$organigrama_id." AND baja_logica = 1 ORDER BY cargo ASC";
        $this->_db = new Cargos();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));   
    }

    /**
     * Función para listar los nombres de cargos registrados en la tabla de cargos.
     * @author JLM
     * @return Resultset
     */
    public function listNombresCargos()
    {
        $sql = "SELECT DISTINCT cargo FROM cargos ORDER BY cargo";
        $this->_db = new Cargos();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    /**
     * Función para desplegar el registro del cargo del inmediato superior de un cargo identificado mediante el parámetro enviado.
     * @author JLM
     * @return Resultset
     */
    public function getCargoSuperior($id_cargo)
    {
        $sql = "SELECT * FROM f_cargo_inmediato_superior(" . $id_cargo . ")";
        $this->_db = new Cargos();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    /**
     * Función para desplegar el registro del cargo del inmediato superior de acuerdo al identificador del registro de relación laboral enviado como parámetro.
     * @author JLM
     * @return Resultset
     */
    public function getCargoSuperiorPorRelaboral($id_relaboral)
    {
        $sql = "SELECT * FROM f_cargo_inmediato_superior_relaboral(" . $id_relaboral . ")";
        $this->_db = new Cargos();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    //  public function getAll($where='',$group='')
    // {
    //     $sql = "SELECT * FROM cargos";
    //     if($where!='')$sql .= $where;
    //     if($group!='')$sql .= $group;
    //     $this->_db = new Cargos();
    //     return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    // }
    // 
    // 
    // 
    

    public function serverlista($sql)
    {
        $this->_db = new Cargos();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    public function update_escala($sql)
    {
        $this->_db = new Cargos();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }
}
