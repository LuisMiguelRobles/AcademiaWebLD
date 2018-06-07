<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Estudiante {


    /*
        PARA ESTE METODO SE DEBE ENVIAR UN DATA CON LOS SIGUIENTES NOMBRE 
        documentoEstudiante
        

    */
    function select($param) {
        extract($param);
        $sql = "SELECT documentoestudiante, nombreestudiante, apellidoestudiante, fechanacimiento, direccion, telefono, correo
                FROM public.estudiante ;";
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
        $sql = "SELECT documentoestudiante, nombreestudiante, apellidoestudiante, fechanacimiento, direccion, telefono, correo
                FROM estudiante where documentoestudiante = ?;";
       $rs = $conexion->getPDO()->prepare($sql);
        if ($rs->execute(array($documentoEstudiante))) {
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
        documentoestudiante
        nombreEstudiante
        apellidoEstudiante
        fechaNacimiento (yyyy-mm-dd)
        direccion
        telefono
        correo
        

    */

    function add($param) {
        extract($param);    
        $sql = "INSERT INTO estudiante(documentoestudiante, nombreestudiante, apellidoestudiante, fechanacimiento, direccion, telefono, correo)
    VALUES (?, ?, ?, ?, ?, ?, ?);";
        $rs = $conexion->getPDO()->prepare($sql);
        $rs->execute(array($documentoestudiante, $nombreEstudiante, $apellidoEstudiante, $fechaNacimiento,
            $direccion, $telefono, $correo));
        echo $conexion->getEstado();
        echo(json_encode($sql));
    }

    /*
        PARA ESTE METODO SE DEBE ENVIAR UN DATA CON LOS SIGUIENTES NOMBRE 
        nombreEstudiante
        apellidoEstudiante
        fechaNacimiento (yyyy-mm-dd)
        direccion
        telefono
        correo
        documentoestudiante

    */
    
      function edit($param) {
        extract($param);
        $sql = "UPDATE estudiante
                SET  nombreestudiante=?, apellidoestudiante=?, fechanacimiento=?, direccion=?, telefono=?, correo=?
                WHERE documentoestudiante= ?;";   
        $rs = $conexion->getPDO()->prepare($sql);
        $rs->execute(array($nombreEstudiante, $apellidoEstudiante, $fechaNacimiento,
            $direccion, $telefono, $correo,$documentoestudiante));
        echo $conexion->getEstado();
    }


     /*
        PARA ESTE METODO SE DEBE ENVIAR UN DATA CON LOS SIGUIENTES NOMBRE 
        documentoEstudiante
 
    */
       function delete($param) {
        extract($param);
        $sql = " DELETE FROM estudiante
                     WHERE documentoEstudiante= ?;";   
        $rs = $conexion->getPDO()->prepare($sql);
        $rs->execute(array($documentoestudiante));
        echo $conexion->getEstado();
    }

   
 
    
}
