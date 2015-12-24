<?php
/*
*   Oasis - Sistema de Gestión para Recursos Humanos
*   Empresa Estatal de Transporte por Cable "Mi Teleférico"
*   Versión:  1.0.0
*   Usuario Creador: Lic. Javier Loza
*   Fecha Creación:  09-03-2015
*/
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Horariosymarcaciones extends \Phalcon\Mvc\Model {

    private $_db;
    public function initialize() {
        $this->_db = new Horariosymarcaciones();
    }
    /**
     * Función para el establecimiento del estado PLANILLADO para los registros de horarios y marcaciones de acuerdo a un gestión y mes determinados.
     * Es necesario mencionar que se considera un rango de fechas establecido en la tabla de parámetros para la realización de esta tarea.
     * @param $idRelaboral
     * @param $gestion
     * @param $mes
     * @return bool
     */
    public function planillarHorariosYMarcacionesPorSalarios($idRelaboral,$gestion,$mes){
        if($idRelaboral>0&&$gestion>0&&$mes>0) {
            $db = $this->getDI()->get('db');
            $res = $db->execute("SELECT f_horariosymarcaciones_planillar AS resultado FROM f_horariosymarcaciones_planillar($idRelaboral,$gestion,$mes)");
            return $res;
        }return false;
    }

    /**
     * Función para el establecimiento del estado PLANILLADO para los registros de horarios y marcaciones de acuerdo a un gestión y mes determinados.
     * Es necesario mencionar que se considera un rango de fechas establecido en la tabla de parámetros para la realización de esta tarea.
     * @param $idRelaboral
     * @param $gestion
     * @param $mes
     * @return bool
     */
    public function planillarHorariosYMarcacionesPorRefrigerios($idRelaboral,$gestion,$mes){
        if($idRelaboral>0&&$gestion>0&&$mes>0) {
            $db = $this->getDI()->get('db');
            $res = $db->execute("SELECT f_horariosymarcaciones_planillar_por_refrigerios AS resultado FROM f_horariosymarcaciones_planillar_por_refrigerios($idRelaboral,$gestion,$mes)");
            return $res;
        }return false;
    }
    /**
     * Funcion para la obtencion de la marcacion valida en base al calculo de marcaciones registradas y los datos implicados debido al identificador del horario laboral correspondiente.
     * @param $idRelaboral
     * @param $idMaquina
     * @param $fecha
     * @param $idHorarioLaboral
     * @param int $entradaSalida
     * @return Resultset
     */
    public function obtenerHorarioValido($idRelaboral,$fecha,$entradaSalida=0){
        if($idRelaboral>0&&$fecha!=null&&$fecha!=''){
            $sql = "SELECT * FROM f_obtener_marcacion_valida_por_id_horariolaboral($idRelaboral,$idMaquina,'$fecha',$idHorarioLaboral,$entradaSalida) ";
            $this->_db = new Marcaciones();
            return new Resultset(null, $this->_db, $this->_db->getReadConnection()->query($sql));
        }
    }
} 