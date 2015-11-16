<?php
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;
class Nivelsalariales extends \Phalcon\Mvc\Model
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
    public $resolucion_id;

    /**
     *
     * @var integer
     */
    public $gestion;

    /**
     *
     * @var string
     */
    public $categoria;

    /**
     *
     * @var integer
     */
    public $clase;

    /**
     *
     * @var integer
     */
    public $nivel;

    /**
     *
     * @var integer
     */
    public $sub_nivel_salarial;

    /**
     *
     * @var string
     */
    public $denominacion;

    /**
     *
     * @var double
     */
    public $sueldo;

    /**
     *
     * @var string
     */
    public $fecha_ini;

    /**
     *
     * @var string
     */
    public $fecha_fin;

    /**
     *
     * @var integer
     */
    public $estado;

    /**
     *
     * @var integer
     */
    public $baja_logica;

    /**
     *
     * @var integer
     */
    public $agrupador;

    /**
     *
     * @var integer
     */
    public $activo;

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
            'resolucion_id' => 'resolucion_id', 
            'gestion' => 'gestion', 
            'categoria' => 'categoria', 
            'clase' => 'clase', 
            'nivel' => 'nivel', 
            'sub_nivel_salarial' => 'sub_nivel_salarial', 
            'denominacion' => 'denominacion', 
            'sueldo' => 'sueldo', 
            'fecha_ini' => 'fecha_ini', 
            'fecha_fin' => 'fecha_fin', 
            'estado' => 'estado', 
            'baja_logica' => 'baja_logica',
            'agrupador' => 'agrupador',
            'activo' => 'activo'
        );
    }

    private $_db;

    public function lista(){
        $sql = "SELECT n.id,n.resolucion_id,n.categoria,n.clase,n.nivel,n.denominacion,n.sueldo,n.activo,r.tipo_resolucion,r.numero_res, 
CASE n.activo WHEN '1' THEN 'ACTIVO' ELSE 'INACTIVO' END as activo1, n.fecha_ini,n.fecha_fin,
(SELECT id FROM nivelsalariales WHERE nivel=n.nivel AND baja_logica=1 AND activo=1) as nivelsalarial_id_existente
FROM nivelsalariales n, resoluciones r 
WHERE n.baja_logica=1 AND n.resolucion_id=r.id order by n.activo desc ,n.nivel asc";
        $this->_db = new Nivelsalariales();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    public function updateFecha($nivel,$nivelsalarial_id,$fecha_fin)
    {
        $sql = "UPDATE nivelsalariales SET fecha_fin='$fecha_fin' WHERE id='$nivelsalarial_id'";
        $this->_db = new Nivelsalariales();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));   
    }

    public function updateActivos($nivel)
    {
        $sql = "UPDATE nivelsalariales SET activo=0 WHERE nivel ='$nivel'";
        $this->_db = new Nivelsalariales();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));   
    }

    /**
     * Función para la obtención del registro de nivel salarial correspondiente al parámetro enviado codigo_nivel.
     * @param $codigo_nivel
     */
    public function getNivelSalarialActivoByCodigoNivel($codigo_nivel){
        if($codigo_nivel>0){
            $sql = "SELECT * FROM nivelsalariales WHERE nivel=".$codigo_nivel." AND estado=1 LIMIT 1";
            $this->_db = new Nivelsalariales();
            return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
        } else return new Resultset();
    }
    
}
