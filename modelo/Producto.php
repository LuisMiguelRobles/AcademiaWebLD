<?php 

/**
* 
*/
class Producto{
  
    function select($param) {
        extract($param);
        $where = $conexion->getWhere($param);
        $sql = "SELECT idproducto, nombreproducto, duracionproducto, categoriaproducto, precioproducto, numeroclasesproducto
	FROM producto;";
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
        $sql = "SELECT idproducto, nombreproducto, duracionproducto, categoriaproducto, precioproducto, numeroclasesproducto
	FROM producto where idproducto=?;";
       $rs = $conexion->getPDO()->prepare($sql);
        if ($rs->execute(array($idproducto))) {
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
        
        $sql = "INSERT INTO producto(
				nombreproducto, duracionproducto, categoriaproducto, precioproducto, numeroclasesproducto)
				VALUES ( ?, ?, ?, ?, ?);";
        $rs = $conexion->getPDO()->prepare($sql);
        $rs->execute(array($nombreproducto, $duracionproducto, $categoriaproducto,
            $precioproducto, $numeroclasesproducto));
        echo $conexion->getEstado();
    }

  
    
      function edit($param) {
        extract($param);
        $sql = "UPDATE producto
				SET  nombreproducto=?, duracionproducto=?, categoriaproducto=?, precioproducto=?, numeroclasesproducto=?
				WHERE idproducto=? ;";   
        $rs = $conexion->getPDO()->prepare($sql);
        $rs->execute(array( $nombreproducto, $duracionproducto, $categoriaproducto,
            $precioproducto, $numeroclasesproducto, $idproducto));
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




 ?>