require('colors');

const mostrarMenu = () => {
    return new Promise ( (resolve, reject) => {
        console.clear();
        console.log ("=======================".rainbow);
        console.log (" Seleccione una opción ");
        console.log ("=======================\n".rainbow);

        console.log(`${'1.'.yellow} Crear una tarea`);
        console.log(`${'2.'.yellow} Listar tareas`);
        console.log(`${'3.'.yellow} Listas tareas completas`);
        console.log(`${'4.'.yellow} Listar tareas pendientes`);
        console.log(`${'5.'.yellow} Completar tarea(s)`);
        console.log(`${'6.'.yellow} Borrar una tarea`);
        console.log(`${'0.'.yellow} Salir \n`);

        const readline = require('readline').createInterface    ({
            input: process.stdin,
            output: process.stdout
        });


        readline.question('Seleccione una opción: ', (opt) => {
           
            readline.close();
            resolve(opt);
        });
    });
    
    
}

const pausa = () => {
    return new Promise((resolve, reject) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
    
        readline.question(`Presione ${'Enter'.green} para continuar`, (opt) => {
           
            readline.close();
            resolve();
        })
    });
    
        

}



module.exports = {
    mostrarMenu,
    pausa
    
}
