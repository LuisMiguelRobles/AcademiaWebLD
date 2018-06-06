<?php 

/**
* 
*/
class Clase
{
	 function select($param) {
        extract($param);
        $where = $conexion->getWhere($param);
        $sql = "SELECT id, fecha, hora, estudiante, profesor, vehiculo, producto
				FROM clase;";
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
        $sql = "SELECT id, fecha, hora, estudiante, profesor, vehiculo, producto
	FROM clase where id=?;";
       $rs = $conexion->getPDO()->prepare($sql);
        if ($rs->execute(array($id))) {
            if ($filas = $rs->fetchAll(PDO::FETCH_ASSOC)) {
                foreach ($filas as $fila) {

                    $array[] = $fila;
                }
            }
        }

        echo json_encode(($array));
    }

    function add($param) {
        extract($param);
        
        $sql = "INSERT INTO clase(fecha, hora, estudiante, profesor, vehiculo, producto)
			VALUES (?, ?, ?, ?, ?, ?);";
        $rs = $conexion->getPDO()->prepare($sql);
        $rs->execute(array($fecha, $hora, $estudiante, $profesor, $vehiculo, $producto));
        echo $conexion->getEstado();
    }

  
    
      function edit($param) {
        extract($param);
        $sql = "UPDATE public.clase
				SET  fecha=?, hora=?, estudiante=?, profesor=?, vehiculo=?, producto=?
				WHERE id=?;";   
        $rs = $conexion->getPDO()->prepare($sql);
        $rs->execute(array( $fecha, $hora, $estudiante, $profesor, $vehiculo, $producto,$id));
        echo $conexion->getEstado();
    }


       function delete($param) {
        extract($param);
        $sql = " DELETE FROM producto
                     WHERE idproducto= ?;";   
        $rs = $conexion->getPDO()->prepare($sql);
        $rs->execute(array($idproducto));
        echo $conexion->getEstado();
    }
}