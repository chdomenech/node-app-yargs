const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require(`../db/data.json`);
    } catch (error) {
        listadoPorHacer = [];
    }
}

const getListado = (completado = false) => {
    cargarDB();
    return listadoPorHacer.filter(tarea => tarea.completado === completado);
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    /* Si me retorna -1 es que no encontro*/
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {

    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion != descripcion);
    if (listadoPorHacer.length > nuevoListado.length) {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const crear = (descripcion, completado = false) => {

    cargarDB(); //Carga el arreglo del json 

    let porHacer = {
        descripcion,
        completado: completado
    }

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}