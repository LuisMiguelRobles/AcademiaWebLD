<?php

/**
* 
*/
class administrativos {              
	
	 function select($param) {
        extract($param);
        $where = $conexion->getWhere($param);
<<<<<<< HEAD
        $sql = "SELECT cedulaadministrativo, emailadministrativo, date, password
						FROM administrativos ;";
=======
        $sql = 'SELECT cedulaadministrativo, emailadministrativo, date, password
						FROM "Administrativos" ;';
>>>>>>> 0dc98d5aa0a20bac5a13f5c77f7e3820fdb6cde9
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
        $sql = "SELECT cedulaadministrativo, emailadministrativo, date, password
<<<<<<< HEAD
						FROM administrativos where cedulaadministrativo =? ;";
=======
						FROM Administrativos where cedulaadministrativo =? ;";
>>>>>>> 0dc98d5aa0a20bac5a13f5c77f7e3820fdb6cde9
       $rs = $conexion->getPDO()->prepare($sql);
        if ($rs->execute(array($cedulaadministrativo))) {
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
        
        $sql = "INSERT INTO administrativos(
    cedulaadministrativo, emailadministrativo, date, password)
    VALUES (?, ?, ?, ?);";
        $rs = $conexion->getPDO()->prepare($sql);
        $rs->execute(array($cedulaadministrativo, $emailadministrativo, $date, $password));
        echo $conexion->getEstado();
    }

      function edit($param) {
        extract($param);
        $sql = "UPDATE administrativos
				SET  emailadministrativo=?, password=?
				WHERE cedulaadministrativo=?;";   
        $rs = $conexion->getPDO()->prepare($sql);
        $rs->execute(array($emailadministrativo, $password,
            $cedulaadministrativo));
        echo $conexion->getEstado();
    }

       function delete($param) {
        extract($param);
        $sql = " DELETE FROM administrativos
                     WHERE cedulaadministrativo= ?;";   
        $rs = $conexion->getPDO()->prepare($sql);
        $rs->execute(array($cedulaadministrativo));
        echo $conexion->getEstado();
    }

}