require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquireMenu , pausa, leerInput,listaTareasBorrar,
        confirmar,mostrarListadoChecklist} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
      


console.clear();
const main = async() => {
    //console.log("hola async")
    let opt = '' ;
    
    const tareas = new Tareas();
    const tarea = new Tarea();
    const tareasdb = leerDB();
    
    if(tareasdb){ //verificamos si ya existen tareas en nuestra bd
       // si hay, entonces cargamos las tareas de la base a nuestro array de tareas
        tareas.cargarTareasFromArray(tareasdb);

        
    }
   // await pausa();

    do{
        //esta función imprime el menu
        opt = await inquireMenu();

        switch(opt){
            case '1': //crear tarea
                const desc = await leerInput('Descripción');
                //console.log(desc);
                tareas.crearTarea(desc);


                break;

            case '2': //listar tareas
                    tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletas(true);
                break;
            case '4':
                tareas.listarPendientesCompletas(false);
                break;
            case '5': //completar tareas

                const ids= await mostrarListadoChecklist(tareas.listadoArr);
                //console.log(ids);
                tareas.completaTarea(ids);

            break;
            case '6':
                    const id = await listaTareasBorrar(tareas.listadoArr); //recibimos la tarea a borrar, desestructuramos el id de la tarea {id}
                    if(id !== '0'){
                        const ok = await confirmar('¿Estás seguro de borrar?'); //ok es true o false
                        //console.log({ok});
                        if(ok){
                            tareas.borrarTarea(id);
                            console.log("Tarea borrada");
                        }

                    }
                   
                    
                break;
        }
        guardarDB(tareas.listadoArr);

       // await pausa();

        if(opt !== '0') await pausa();
       
    }while(opt !== '0');
    
    //pausa();
}



main();