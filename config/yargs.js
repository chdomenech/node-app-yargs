const descripcion = {
    demand: true,
    alias: 'd',
    descripcion: 'Descripcion de la tarea por hacer'
};

const completado = {
    alias: 'c',
    default: false,
    descripcion: 'Marca como completado'
}

const argv = require('yargs').
command('actualizar', 'Actualiza el estado completado de una tarea', { descripcion })
    .command('listar', 'Lista las tareas', { completado })
    .command('borrar', 'Borra alguna tareea del listado', { descripcion })
    .command('crear', 'Crea un elemento por hacer', { descripcion, completado })
    .help()
    .argv;

module.exports = {
    argv
}