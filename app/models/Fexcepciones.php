<?php
/*
*   Oasis - Sistema de Gestión para Recursos Humanos
*   Empresa Estatal de Transporte por Cable "Mi Teleférico"
*   Versión:  1.0.0
*   Usuario Creador: Lic. Javier Loza
*   Fecha Creación:  26-02-2014
*/
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;
class Fexcepciones extends \Phalcon\Mvc\Model {
    public $id;
    public $excepcion;
    public $tipoexcepcion_id;
    public $tipo_excepcion;
    public $codigo;
    public $color;
    public $descuento;
    public $descuento_descripcion;
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
            'id'=>'id',
            'excepcion'=>'excepcion',
            'tipoexcepcion_id'=>'tipoexcepcion_id',
            'tipo_excepcion'=>'tipo_excepcion',
            'codigo'=>'codigo',
            'color'=>'color',
            'descuento'=>'descuento',
            'descuento_descripcion'=>'descuento_descripcion',
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
     * Función para la obtención del listado de registros de excepciones.
     * @param string $where
     * @param string $group
     * @return Resultset
     */
    public function getAll($where='',$group='')
    {
        $sql = "SELECT * FROM f_excepciones()";
        if($where!='')$sql .= $where;
        if($group!='')$sql .= $group;
        $this->_db = new Fexcepciones();
        return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
    }

    /**
     * Función para la obtención del registro de excepción
     * @param $idExcepcion
     * @return Resultset
     */
    public function getOne($idExcepcion)
    {
        if($idExcepcion>0){
            $sql = "SELECT * FROM f_excepciones_por_id(".$idExcepcion.")";
            $this->_db = new Fexcepciones();
            $arr = new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
            return $arr[0];
        }
    }
    /**
     * Función para la obtención de la cantidad de días usados con un tipo específico de excepción en un rango definido de fechas.
     * @param $idRelaboral
     * @param $idExcepcion
     * @param $fechaIniRango
     * @param $fechaFinRango
     * @return int
     */
    public function calculaCantidadVecesEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion=0,$fechaIniRango,$fechaFinRango){
        $cantidad=0;
        if($idRelaboral>0&&$idExcepcion>0&&$fechaIniRango!=''&&$fechaFinRango!=''){
            $sql = "SELECT COUNT(DISTINCT id_controlexcepcion) AS cantidad_veces FROM f_controlexcepciones_personal_rango((SELECT persona_id FROM relaborales WHERE id = $idRelaboral LIMIT 1),'".$fechaIniRango."','".$fechaFinRango."') ";
            $sql .= "WHERE excepcion_id=".$idExcepcion." AND id_controlexcepcion!=".$idControlExcepcion;
            $this->_db = new Fexcepciones();
            $arr = new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
            $cantidad= $arr[0]->cantidad_veces;
        }
        return $cantidad;
    }
    /**
     * Función para la obtención de la cantidad de días usados con un tipo específico de excepción en un rango definido de fechas.
     * @param $idRelaboral
     * @param $idExcepcion
     * @param $fechaIniRango
     * @param $fechaFinRango
     * @return int
     */
    public function calculaCantidadDiasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion=0,$fechaIniRango,$fechaFinRango){
        $cantidad=0;
        if($idRelaboral>0&&$idExcepcion>0&&$fechaIniRango!=''&&$fechaFinRango!=''){
            $sql = "SELECT COUNT(id_relaboral) AS cantidad_dias FROM f_controlexcepciones_relaboral_rango($idRelaboral,'".$fechaIniRango."','".$fechaFinRango."') ";
            $sql .= "WHERE excepcion_id=".$idExcepcion." AND id_controlexcepcion!=".$idControlExcepcion;
            $this->_db = new Fexcepciones();
            $arr = new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
            $cantidad= $arr[0]->cantidad_dias;
        }
        return $cantidad;
    }

    /**
     * Función para conocer el listado de las semanas involucradas en los registros de excepción de un tipo determinado de excepción.
     * @param $idRelaboral
     * @param $idExcepcion
     * @param int $idControlExcepcion
     * @param $fechaIniRango
     * @param $fechaFinRango
     * @return int
     */
    public function calculaCantidadSemanasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion=0,$fechaIniRango,$fechaFinRango){
        $cantidad=0;
        if($idRelaboral>0&&$idExcepcion>0&&$fechaIniRango!=''&&$fechaFinRango!=''){
            $sql = "SELECT count(distinct fl.fecha_ini) AS cantidad_semanas FROM f_listado_fechas_dobles_rango_semana(1,'".$fechaIniRango."','".$fechaFinRango."') fl ";
            $sql .= "INNER JOIN f_controlexcepciones_relaboral_rango(".$idRelaboral.",fl.fecha_ini,fl.fecha_fin) fc ON fc.fecha_ini IS NOT NULL ";
            $sql .= "WHERE excepcion_id=".$idExcepcion." AND id_controlexcepcion!=".$idControlExcepcion;
            $this->_db = new Fexcepciones();
            $arr = new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
            $cantidad= $arr[0]->cantidad_semanas;
        }
        return $cantidad;
    }

    /**
     * Función para conocer el listado de meses involucrados en los registros de excepción de un tipo determinado de excepción.
     * @param $idRelaboral
     * @param $idExcepcion
     * @param int $idControlExcepcion
     * @param $fechaIniRango
     * @param $fechaFinRango
     * @return int
     */
    public function calculaCantidadMesesEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion=0,$fechaIniRango,$fechaFinRango){
        $cantidad=0;
        if($idRelaboral>0&&$idExcepcion>0&&$fechaIniRango!=''&&$fechaFinRango!=''){
            $sql = "SELECT count(distinct fl.fecha_ini) AS cantidad_semanas FROM f_listado_fechas_dobles_rango('".$fechaIniRango."','".$fechaFinRango."') fl ";
            $sql .= "INNER JOIN f_controlexcepciones_relaboral_rango(".$idRelaboral.",fl.fecha_ini,fl.fecha_fin) fc ON fc.fecha_ini IS NOT NULL ";
            $sql .= "WHERE excepcion_id=".$idExcepcion." AND id_controlexcepcion!=".$idControlExcepcion;
            $this->_db = new Fexcepciones();
            $arr = new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
            $cantidad= $arr[0]->cantidad_semanas;
        }
        return $cantidad;
    }

    /**
     * Función para la obtención de la cantidad de horas usadas en un rango de fechas de acuerdo a un tipo específico de control de excepción.
     * @param $idRelaboral
     * @param $idExcepcion
     * @param int $idControlExcepcion
     * @param $fechaIniRango
     * @param $fechaFinRango
     * @return int
     */
    public function calculaCantidadHorasEnRangoFechas($idRelaboral,$idExcepcion,$idControlExcepcion=0,$fechaIniRango,$fechaFinRango){
        $cantidad=0;
        if($idRelaboral>0&&$idExcepcion>0&&$fechaIniRango!=''&&$fechaFinRango!=''){
            $sql = "SELECT (CASE WHEN sum(f_cantidad_horas_entre_dos_horas(hora_ini,hora_fin))>0 THEN sum(f_cantidad_horas_entre_dos_horas(hora_ini,hora_fin)) ELSE 0 END) AS cantidad_horas ";
            $sql .= "FROM f_controlexcepciones_relaboral_rango(".$idRelaboral.",'".$fechaIniRango."','".$fechaFinRango."') ";
            $sql .= "WHERE excepcion_id=".$idExcepcion." AND id_controlexcepcion!=".$idControlExcepcion;
            $this->_db = new Fexcepciones();
            $arr = new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
            $cantidad= $arr[0]->cantidad_horas;
        }
        return $cantidad;
    }
    /**
     * Función para la obtención del rango de fechas en una semana, en las cuales se encuentra una fecha específica.
     * @param $opcion
     * @param $fecha
     */
    public function obtieneRangoFechasDeLaSemana($opcion,$fecha){
        if($fecha!=''){
            $arr = explode("-",$fecha);
            $gestion = $arr[2];
            $gestionAnterior = $gestion-1;
            /**
             * A objeto de considerar todas las semanas que implican la gestión
             */
            $fechaIni = "25-12-".$gestionAnterior;
            $fechaFin = "31-12-".$gestion;
            $sql = "SELECT * FROM f_listado_fechas_dobles_rango_semana(".$opcion.",'".$fechaIni."','".$fechaFin."')";
            $sql .= "WHERE '".$fecha."' BETWEEN fecha_ini AND fecha_fin";
            $this->_db = new Fexcepciones();
            $arr = new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
            return $arr[0];
        }return null;
    }

    /**
     * Función para obtener el listado de rangos de fechas semanales, de acuerdo al rango de fechas enviadas como parámetros.
     * Si el parámetro $opcion =0 : Considerar Lunes a Viernes, $opcion=1:Considerar de Lunes a Domingo.
     * @param $opcion
     * @param $fechaIni
     * @param $fechaFin
     * @return null
     */
    public function obtieneRangoSemanasPorRangoFechas($opcion,$fechaIni,$fechaFin){
        if($fechaIni!=''&&$fechaFin!=''){
            $sql = "SELECT * FROM f_listado_fechas_dobles_rango_semana(".$opcion.",'".$fechaIni."','".$fechaFin."')";
            $this->_db = new Fexcepciones();
            return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
        }return null;
    }
    /**
     * Función para la obtención de la fecha del último
     * @param $gestion
     * @param $mes
     * @return null
     */
    public function obtieneUltimoDiaMes($gestion,$mes){
        if($gestion>0&&$mes>0){
            $sql = "SELECT f_ultimo_dia_mes FROM f_ultimo_dia_mes(".$mes.",".$gestion.")";
            $this->_db = new Fexcepciones();
            $arr = new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
            return $arr[0]->f_ultimo_dia_mes;
        }return null;
    }

    /**
     * Función para conocer la cantidad de meses involucrados en un rango de fechas.
     * @param $fechaIni
     * @param $fechaFin
     * @return int
     */
    public function cantidadMesesInvolucradosEnRango($fechaIni,$fechaFin){
        if($fechaIni!=''&&$fechaFin!=''){
            $sql = "SELECT COUNT(*) AS cantidad FROM f_listado_fechas_dobles_rango('".$fechaIni."','".$fechaFin."')";
            $this->_db = new Fexcepciones();
            $arr = new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
            return $arr[0]->cantidad;
        }else return 0;
    }

    /**
     * Función para obtener el listado de fechas que referencian a cada mes involucrado en un rago de fechas.
     * @param $fechaIni
     * @param $fechaFin
     * @return null|Resultset
     */
    public function listadoMesesInvolucradosEnRango($fechaIni,$fechaFin){
        if($fechaIni!=''&&$fechaFin!=''){
            $sql = "SELECT * FROM f_listado_fechas_dobles_rango('".$fechaIni."','".$fechaFin."'))";
            $this->_db = new Fexcepciones();
            return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
        }else return null;
    }

    /**
     * Función para obtener el listado de fechas que referencian a cada mes completo involucrado en un rago de fechas.
     * @param $fechaIni
     * @param $fechaFin
     * @return null|Resultset
     */
    public function listadoMesesCompletosInvolucradosEnRango($fechaIni,$fechaFin){
        if($fechaIni!=''&&$fechaFin!=''){
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
            $sql = "SELECT * FROM f_listado_fechas_dobles_rango(CAST('01-".$mesA."-".$gestionA."' AS DATE),f_ultimo_dia_mes(".$mesB.",".$gestionB."))";
            $this->_db = new Fexcepciones();
            return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
        }else return null;
    }
    /**
     * Función para calcular en que semestre se encuentra una fecha determinada
     * @param $fechaIni
     * @return int
     */
    public function semestrePerteneciente($fechaIni){
        $resultado=0;
        if($fechaIni!=''){
                $arr = explode("-",$fechaIni);
                if(count($arr)>0){
                    $mes = $arr[1];
                    if($mes<7)$resultado=1;
                    else $resultado=2;
                }
        }
        return $resultado;
    }
    /**
     * Función para la obtención del listado de fechas día por día de una fecha inicial a una fecha final.
     * @param $fechaIni
     * @param $fechaFin
     */
    public function listadoFechasPorRango($fechaIni,$fechaFin){
        if($fechaIni!=''&&$fechaFin!=''){
            $sql = "SELECT * FROM f_listado_fechas_rango('".$fechaIni."','".$fechaFin."')";
            $this->_db = new Fexcepciones();
            return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
        }
    }

    /**
     * Función para obtener la cantidad de horas entre dos horas.
     * @param $horaIni
     * @param $horaFin
     * @return int
     */
    public function cantidadHorasEntreDosHoras($horaIni,$horaFin){
        if($horaIni!=''&&$horaFin!=''){
            $sql = "SELECT o_resultado FROM f_cantidad_horas_entre_dos_horas('".$horaIni."','".$horaFin."')";
            $this->_db = new Fexcepciones();
            $arr = new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
            return $arr[0]->o_resultado;
        } return 0;
    }
    /**
     * Función para obtener la cantidad de horas entre dos fechas.
     * @param $fechaHoraIni
     * @param null $fechaHoraFin
     * @return int
     */
    public function cantidadHorasEntreDosFechas($fechaHoraIni,$fechaHoraFin=null){
        if($fechaHoraIni!=''){
            $sql = "SELECT o_resultado FROM f_horas_transcurridas_entre_dos_fechas(cast('".$fechaHoraIni."' as timestamp),";
            if($fechaHoraFin==null||$fechaHoraFin=='')
            $sql .= "CAST(CURRENT_TIMESTAMP AS TIMESTAMP))";
            else $sql .= "CAST('".$fechaHoraFin."' AS TIMESTAMP))";
            $this->_db = new Fexcepciones();
            $arr = new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
            return $arr[0]->o_resultado;
        } return 0;
    }

    /**
     * Función para obtener la cantidad de minutos entre dos fechas.
     * @param $fechaHoraIni
     * @param null $fechaHoraFin
     * @return int
     */
    public function cantidadMinutosEntreDosFechas($fechaHoraIni,$fechaHoraFin=null){
        if($fechaHoraIni!=''){
            $sql = "SELECT o_resultado FROM f_minutos_transcurridos_entre_dos_fechas(cast('".$fechaHoraIni."' as timestamp),";
            if($fechaHoraFin==null||$fechaHoraFin=='')
                $sql .= "CAST(CURRENT_TIMESTAMP AS TIMESTAMP))";
            else $sql .= "CAST('".$fechaHoraFin."' AS TIMESTAMP))";
            $this->_db = new Fexcepciones();
            $arr = new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
            return $arr[0]->o_resultado;
        } return 0;
    }
} 