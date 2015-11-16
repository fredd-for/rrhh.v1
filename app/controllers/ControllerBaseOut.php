<?php

use Phalcon\Mvc\Controller;
use Phalcon\Events\Event;

class ControllerBaseOut extends Controller {

    public function beforeExecuteRoute() {
        return true;
    }

    protected function initialize() {
        $this->tag->setTitle('Sistema de RRHH');
    }
}
