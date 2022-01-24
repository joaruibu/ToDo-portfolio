window.onload = todoList()

function todoList() {
    var tareas = document.querySelector('.tareas');
    var formulario = document.querySelector('.formulario');
    var introducir = document.querySelector('.formulario__introducir');

    formulario.addEventListener('submit', anadirTarea);

    function anadirTarea(evento) {
        evento.preventDefault();
        var tarea = document.createElement('li');
        tarea.className = 'tarea';
        tarea.append(crearNombreTarea());
        tarea.append(crearBotonEliminarTarea())
        tareas.prepend(tarea);
        tarea.addEventListener('click', gestionarTareas);
        guardarTareas();
        introducir.value = null

    }

    function crearNombreTarea(nombre) {
        var nombreTarea = document.createElement('span');
        nombreTarea.className = 'tarea__nombre';
        nombreTarea.textContent = nombre ? nombre : introducir.value;
        return nombreTarea;

    }

    function crearBotonEliminarTarea() {
        var botonEliminar = document.createElement('span');
        botonEliminar.className = 'tarea__eliminar';
        botonEliminar.textContent = 'X';
        return botonEliminar;

    }

    function gestionarTareas(evento) {
        if (evento.target.className === 'tarea__eliminar') {
            eliminarTarea(evento.currentTarget);

        } else {
            actualizarEstadoTarea(evento.currentTarget);

        }
    }

    function eliminarTarea(tarea) {
        if (confirm(`¿Eliminar tarea: ${tarea.querySelector('.tarea__nombre').textContent} ?`)) {
            tareas.removeChild(tarea);
        }
        guardarTareas();

    }

    function actualizarEstadoTarea(tarea) {
        tarea.classList.toggle('tarea--completada');
        guardarTareas();
    }

    function guardarTareas() {
        var tareasGuardadas = [];
        var cantidadTareas = document.querySelectorAll('.tarea');
        cantidadTareas.forEach(function (tarea) {
            tareasGuardadas.unshift({
                nombre: tarea.querySelector('.tarea__nombre').textContent,
                completado: tarea.classList.contains('tarea--completada'),
            });
        });
        localStorage.setItem('tareas', JSON.stringify(tareasGuardadas));
    }

    function cargarTareas() {
        var tareasGuardadas = JSON.parse(localStorage.getItem('tareas'));
        tareasGuardadas.forEach(function (elemento) {

            var tarea = document.createElement('li');
            tarea.className = 'tarea';

            if (elemento.completado) {
                tarea.className += 'tarea--completada'
            }

            tarea.append(crearNombreTarea(elemento.nombre));
            tarea.append(crearBotonEliminarTarea())
            tareas.prepend(tarea);
            tarea.addEventListener('click', gestionarTareas);

        })
    }

    cargarTareas();
}
