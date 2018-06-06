<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class UsuarioSistema {

    function verificarUsuario($param) {
        extract($param);
        if (isset($_SESSION['usuario'])) {
            echo json_encode(['ok' => true]);
        } else {
            echo json_encode(['ok' => false]);
        }
    }

    function inicioSesion($param) {
        extract($param);
        if (isset($_SESSION['usuario'])) {
            $usuario = $_SESSION['usuario'];
            $respuesta = "<ul class=\"nav nav-pills nav-stacked\">";

            $sql = "SELECT tipo_permiso AS permiso,icon, nombre  FROM permisos INNER JOIN permisos_usuario ON id_permiso=fk_permiso INNER JOIN usuarios ON id_usuario=fk_usuario "
                    . "WHERE id_usuario= ?;";
            $rs = $conexion->getPDO()->prepare($sql);
            if ($rs->execute(array($usuario))) {
                if ($filas = $rs->fetchAll(PDO::FETCH_ASSOC)) {
                    $usuario = $filas[0]['nombre'];
                    foreach ($filas as $fila) {
                        $respuesta .= "<li id='" . strtolower($fila['permiso']) . "'><a><span class=\"" . $fila['icon'] . "\" aria-hidden=\"true\"></span>  " . $fila['permiso'] . "</a></li>";
                    }
                }
            }
            echo json_encode(['ok' => true, $respuesta . "</ul>", 'usuario' => $usuario]);
        } else {
            $sql = "SELECT id_usuario,nombre FROM usuarios WHERE nombre=? AND \"contraseña\"=?;";
            $rs = $conexion->getPDO()->prepare($sql);
            if ($rs->execute(array($usuario, $contrasena))) {
                $datosUsuario = $rs->fetch(PDO::FETCH_ASSOC);
                if ($datosUsuario['nombre'] == $usuario) {
                    $_SESSION['usuario'] = $datosUsuario['nombre'];
                    $_SESSION['usuario'] = $datosUsuario['id_usuario'];
                    $respuesta = "<ul class=\"nav nav-pills nav-stacked\">";
                    $sql = "SELECT tipo_permiso AS permiso, icon FROM permisos INNER JOIN permisos_usuario ON id_permiso=fk_permiso INNER JOIN usuarios ON id_usuario=fk_usuario "
                            . "WHERE nombre=? and \"contraseña\" = ? ;";
                    $rs = $conexion->getPDO()->prepare($sql);
                    if ($rs->execute(array($usuario, $contrasena))) {
                        if ($filas = $rs->fetchAll(PDO::FETCH_ASSOC)) {
                            foreach ($filas as $fila) {

                                $respuesta .= "<li id='" . strtolower($fila['permiso']) . "'><a><span class=\"" . $fila['icon'] . "\" aria-hidden=\"true\"></span>  " . $fila['permiso'] . "</a></li>";
                            }
                        }
                    }

                    echo json_encode(['ok' => true, $respuesta . "</ul>", 'usuario' => $usuario]);
                } else {
                    echo json_encode(['ok' => false, "Error de usuario o contraseña"]);
                }
            } else {
                echo json_encode(['ok' => false, "Error al conectar a la BD"]);
            }
        }
    }

   

}
