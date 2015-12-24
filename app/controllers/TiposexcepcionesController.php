<?php
/*
*   Oasis - Sistema de Gestión para Recursos Humanos
*   Empresa Estatal de Transporte por Cable "Mi Teleférico"
*   Versión:  1.0.0
*   Usuario Creador: Lic. Javier Loza
*   Fecha Creación:  13-02-2015
*/

class TiposexcepcionesController extends ControllerBase
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
        $this->assets->addCss('/assets/css/oasis.principal.css');
        $this->assets->addCss('/assets/css/oasis.principal.css');
        $this->assets->addJs('/js/tiposexcepciones/oasis.tiposexcepciones.tab.js');
        $this->assets->addJs('/js/tiposexcepciones/oasis.tiposexcepciones.index.js');
        $this->assets->addJs('/js/tiposexcepciones/oasis.tiposexcepciones.new.edit.js');
        $this->assets->addJs('/js/tiposexcepciones/oasis.tiposexcepciones.approve.js');
        $this->assets->addJs('/js/tiposexcepciones/oasis.tiposexcepciones.export.js');
        $this->assets->addJs('/js/tiposexcepciones/oasis.tiposexcepciones.down.js');
    }


} 