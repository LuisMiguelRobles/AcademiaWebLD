<?php
class Vehiculo{
	 /*
        PARA ESTE METODO SE DEBE ENVIAR UN DATA CON LOS SIGUIENTES NOMBRE 
        idvehiculo
        

    */
    function select($param) {
        extract($param);
        $where = $conexion->getWhere($param);

        $sql = "SELECT idvehiculo, placa, modelo
                FROM vehiculo;";
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

    /*
        PARA ESTE METODO SE DEBE ENVIAR UN DATA CON LOS SIGUIENTES NOMBRE 
        placa
        modelo
    
    */

    function add($param) {
        extract($param);
        
	    $sql = "INSERT INTO vehiculo(
	    placa, modelo)
	    VALUES (?, ?);";
        $rs = $conexion->getPDO()->prepare($sql);
        $rs->execute(array($placa, $modelo));
        echo $conexion->getEstado();
    }

    /*
        PARA ESTE METODO SE DEBE ENVIAR UN DATA CON LOS SIGUIENTES NOMBRE 
         placa
        modelo

    */
    
      function edit($param) {
        extract($param);
        $sql = "UPDATE vehiculo
                SET   modelo=?
                WHERE placa= ?;";   
        $rs = $conexion->getPDO()->prepare($sql);
        $rs->execute(array($modelo, $placa));
        echo $conexion->getEstado();
    }


     /*
        PARA ESTE METODO SE DEBE ENVIAR UN DATA CON LOS SIGUIENTES NOMBRE 
        placa
 
    */
       function delete($param) {
        extract($param);
        $sql = " DELETE FROM vehiculo
                     WHERE placa= ?;";   
        $rs = $conexion->getPDO()->prepare($sql);
        $rs->execute(array($placa));
        echo $conexion->getEstado();
    }
}
