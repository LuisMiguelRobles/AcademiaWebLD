<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Polizas
 *
 * @author diegofranco
 */
class Profesor{
 /*
        PARA ESTE METODO SE DEBE ENVIAR UN DATA CON LOS SIGUIENTES NOMBRES
        cedulaprofesor
        

    */
    function select($param) {
        extract($param);
        $where = $conexion->getWhere($param);
        $sql = "SELECT cedulaprofesor, nombreprofesor, apellidoprofesor, fechanacimiento, direccionprofesor, telefonoprofesor, correoprofesor, profesionprofesor
             FROM public.profesor;";
       $rs = $conexion->getPDO()->prepare($sql);
        if ($rs->execute(array())) {
            if ($filas = $rs->fetchAll(PDO::FETCH_ASSOC)) {
                foreach ($filas as $fila) {

                    $array[] = $fila;
                }
            }
        }

        echo json_encode(($array));
    }

    function select1($param) {
        extract($param);
        $where = $conexion->getWhere($param);
        $sql = "SELECT cedulaprofesor, nombreprofesor, apellidoprofesor, fechanacimiento, direccionprofesor, telefonoprofesor, correoprofesor, profesionprofesor
             FROM public.profesor where = cedulaprofesor = ?;";
       $rs = $conexion->getPDO()->prepare($sql);
        if ($rs->execute(array($cedulaprofesor))) {
            if ($filas = $rs->fetchAll(PDO::FETCH_ASSOC)) {
                foreach ($filas as $fila) {

                    $array[] = $fila;
                }
            }
        }

        echo json_encode(($array));
    }

    /*
        PARA ESTE METODO SE DEBE ENVIAR UN DATA CON LOS SIGUIENTES NOMBRE 
        cedulaprofesor
        nombreprofesor
        apellidoprofesor
        fechanacimiento,
        direccionprofesor
        telefonoprofesor
        correoprofesor
        profesionprofesor
        

    */

    function add($param) {
        extract($param);
        
        $sql = "INSERT INTO profesor(
                 cedulaprofesor, nombreprofesor, apellidoprofesor, fechanacimiento, direccionprofesor, telefonoprofesor, correoprofesor, profesionprofesor)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
        $rs = $conexion->getPDO()->prepare($sql);
        $rs->execute(array($cedulaprofesor, $nombreprofesor, $apellidoprofesor, $fechanacimiento,
            $direccionprofesor, $telefonoprofesor, $correoprofesor, $profesionprofesor));
        echo $conexion->getEstado();
    }

    /*
        PARA ESTE METODO SE DEBE ENVIAR UN DATA CON LOS SIGUIENTES NOMBRE 
        cedulaprofesor
        nombreprofesor
        apellidoprofesor
        fechanacimiento,
        direccionprofesor
        telefonoprofesor
        correoprofesor
        profesionprofesor

    */
    
      function edit($param) {
        extract($param);
        $sql = "UPDATE profesor
                SET nombreprofesor=?, apellidoprofesor=?, fechanacimiento=?, direccionprofesor=?, telefonoprofesor=?, correoprofesor=?, profesionprofesor=?
                WHERE cedulaprofesor = ?;";   
        $rs = $conexion->getPDO()->prepare($sql);
        $rs->execute(array( $nombreprofesor, $apellidoprofesor, $fechanacimiento,
            $direccionprofesor, $telefonoprofesor, $correoprofesor, $profesionprofesor, $cedulaprofesor,));
        echo $conexion->getEstado();
    }


     /*
        PARA ESTE METODO SE DEBE ENVIAR UN DATA CON LOS SIGUIENTES NOMBRE 
        cedulaprofesor
 
    */
       function delete($param) {
        extract($param);
        $sql = " DELETE FROM profesor
                     WHERE cedulaprofesor= ?;";   
        $rs = $conexion->getPDO()->prepare($sql);
        $rs->execute(array($cedulaprofesor));
        echo $conexion->getEstado();
    }

}
