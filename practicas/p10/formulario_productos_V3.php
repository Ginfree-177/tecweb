<?php
// Si vienen datos por POST (desde la tabla con botón Modificar)
$id = $_POST['id'] ?? '';
$nombre = $_POST['nombre'] ?? '';
$marca = $_POST['marca'] ?? '';
$modelo = $_POST['modelo'] ?? '';
$precio = $_POST['precio'] ?? '';
$unidades = $_POST['unidades'] ?? '';
$detalles = $_POST['detalles'] ?? '';
$imagen = $_POST['imagen'] ?? '';
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <title>Formulario Productos V2</title>
    <link rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous" />
    <style>
        body { background-color: #f8f9fa; }
        .container { margin-top: 40px; max-width: 700px; }
        .card { border-radius: 12px; }
        .card-header { font-size: 1.4em; font-weight: bold; }
        input[type="text"], input[type="number"], textarea {
            width: 100%; border-radius: 6px; border: 1px solid #ccc; padding: 8px;
        }
        img.preview { max-width: 100px; margin-top: 10px; }
    </style>

    <script>
        // Validación del formulario
        function validarFormulario() {
            const nombre = document.getElementById("nombre").value.trim();

            if (nombre === "") {
                alert("El campo 'Nombre' es obligatorio");
                return false;
            }
            if (nombre.length > 100) {
                alert("El nombre no puede tener más de 100 caracteres");
                return false;
            }
            return true;
        }

        // Cargar datos si vienen del POST
        window.onload = function() {
            const imagenInput = document.getElementById("imagen");
            const preview = document.getElementById("preview");

            if (imagenInput.value) {
                preview.src = imagenInput.value;
                preview.style.display = "block";
            }
        }
    </script>
</head>

<body>
<div class="container">
    <div class="card shadow">
        <div class="card-header bg-primary text-white text-center">
            Formulario de Productos V3
        </div>
        <div class="card-body">
            <form method="POST" action="update_producto.php" onsubmit="return validarFormulario();">
                <input type="hidden" name="id" value="<?= htmlspecialchars($id) ?>">

                <div class="form-group">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" maxlength="100"
                           value="<?= htmlspecialchars($nombre) ?>" required>
                </div>

                <div class="form-group">
                    <label for="marca">Marca:</label>
                    <input type="text" id="marca" name="marca"
                           value="<?= htmlspecialchars($marca) ?>">
                </div>

                <div class="form-group">
                    <label for="modelo">Modelo:</label>
                    <input type="text" id="modelo" name="modelo"
                           value="<?= htmlspecialchars($modelo) ?>">
                </div>

                <div class="form-group">
                    <label for="precio">Precio:</label>
                    <input type="number" id="precio" name="precio" step="0.01"
                           value="<?= htmlspecialchars($precio) ?>">
                </div>

                <div class="form-group">
                    <label for="unidades">Unidades:</label>
                    <input type="number" id="unidades" name="unidades"
                           value="<?= htmlspecialchars($unidades) ?>">
                </div>

                <div class="form-group">
                    <label for="detalles">Detalles:</label>
                    <textarea id="detalles" name="detalles" rows="3"><?= htmlspecialchars($detalles) ?></textarea>
                </div>

                <div class="form-group">
                    <label for="imagen">URL de la Imagen:</label>
                    <input type="text" id="imagen" name="imagen"
                           value="<?= htmlspecialchars($imagen) ?>" oninput="document.getElementById('preview').src=this.value;">
                    <img id="preview" class="preview" src="" style="display:none;">
                </div>

                <div class="text-center">
                    <input type="submit" value="Actualizar Producto" class="btn btn-success">
                    <a href="get_producto.php" class="btn btn-secondary">Volver a Productos</a>
                </div>
            </form>
        </div>
    </div>
</div>
</body>
</html>
