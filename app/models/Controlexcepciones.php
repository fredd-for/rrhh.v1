<?php
/*
*   Oasis - Sistema de Gestión para Recursos Humanos
*   Empresa Estatal de Transporte por Cable "Mi Teleférico"
*   Versión:  1.0.0
*   Usuario Creador: Lic. Javier Loza
*   Fecha Creación:  03-03-2015
*/
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;
class Controlexcepciones extends \Phalcon\Mvc\Model {
    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->_db = new Controlexcepciones();
    }
    private $_db;

    /**
     * Función para el registro masivo de un determinado permiso en base a su perfil laboral.
     * @param $idPerfilLaboral
     * @param $fechaIni
     * @param $horaIni
     * @param $fechaFin
     * @param $horaFin
     * @param $justificacion
     * @param $observacion
     * @param $estado
     * @param $idUsuario
     */
    public function registroMasivoPorPerfil($idPerfilLaboral,$fechaIni,$horaIni,$fechaFin,$horaFin,$justificacion,$observacion,$estado,$idUsuario){
        if($idPerfilLaboral>0&&$fechaIni!=''&&$horaIni!=''&&$fechaFin!=''&&$horaFin!=''&&$estado>0&&$idUsuario>0){
            $db = $this->getDI()->get('db');
            $sql = "SELECT * FROM f_controlexcepciones_registro_masivo_por_perfil";
            $sql .= "($idPerfilLaboral,'$fechaIni','$horaIni','$fechaFin','$horaFin','$justificacion','$observacion',$estado,$idUsuario)";
            $res = $db->execute($sql);
            return $res;
        }return false;
    }
} 