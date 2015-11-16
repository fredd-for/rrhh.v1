<?php
/*
*   Oasis - Sistema de Gestión para Recursos Humanos
*   Empresa Estatal de Transporte por Cable "Mi Teleférico"
*   Versión:  1.0.0
*   Usuario Creador: Lic. Javier Loza
*   Fecha Creación:  09-09-2015
*/

class MisrelaboralesController  extends ControllerBase
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
        $this->assets->addJs('/js/jquery.PrintArea.js');
        $this->assets->addCss('/assets/css/PrintArea.css');
        $this->assets->addCss('/assets/css/oasis.principal.css');
        $this->assets->addCss('/css/oasis.grillas.css');

        $this->assets->addJs('/js/misrelaborales/oasis.misrelaborales.index.js');
        $this->assets->addJs('/js/misrelaborales/oasis.misrelaborales.view.js');
        $this->assets->addJs('/js/misrelaborales/oasis.misrelaborales.view.splitter.js');

        $auth = $this->session->get('auth');
        $objUsr = new Usuarios();
        $relaboral = $objUsr->getOneRelaboralActivo($auth['id']);
        if(is_object($relaboral)){
                $this->view->setVar('idRelaboral', $relaboral[0]->id_relaboral);
                $this->view->setVar('idPersona', $relaboral[0]->id_persona);
                $this->view->setVar('ci', $relaboral[0]->ci);
                $this->view->setVar('nombres', $relaboral[0]->nombres);
        }
    }
}