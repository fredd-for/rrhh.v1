<?php
/*
*   Oasis - Sistema de Gestión para Recursos Humanos
*   Empresa Estatal de Transporte por Cable "Mi Teleférico"
*   Versión:  1.0.0
*   Usuario Creador: Lic. Javier Loza
*   Fecha Creación:  10-11-2015
*/


class MicuentaController extends ControllerBase
{
    public function initialize()
    {
        parent::initialize();
    }
    /**
     * Función para la carga de la página de gestión de la cuenta personal en el sistema
     */
    public function indexAction()
    {
        $this->assets->addJs('/js/pschecker/pschecker.js');
        $this->assets->addCss('/assets/css/pschecker.css');
        $this->assets->addJs('/js/micuenta/oasis.micuenta.index.js');

    }
} 