const inquirer = require('inquirer');

//import * as inquirer from 'inquirer';
require('colors');

const preguntas = [
    {
        type : 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: '1. Crear tarea'
            },
            {
                value: '2',
                name: '2. Listar tareas'
            },
            {
                value: '3',
                name: '3. Listar tareas completas'
            },
            {
                value: '4',
                name: '4. Listar tareas pendientes'
            },
            {
                value: '5',
                name: '5. Completar tarea(s)'
            },
            {
                value: '6',
                name: '6. Borrar tarea'
            },
            {
                value: '0',
                name: '0. Salir'
            },
    ]
    }
    
    

]
const preguntaPausa = [
    {
        type: 'input',
        name: 'pausa',
        message: `Presiona ${'ENTER'.red} para continuar`,
        
    }
]

const inquireMenu = async() => {
    //console.clear();
    console.log ("=======================".rainbow);
    console.log (" Seleccione una opción ");
    console.log ("=======================\n".rainbow);
    
    const {opcion} = await inquirer.prompt(preguntas);

    return opcion; 
}

const pausa = async() => {
    console.log('\n');
    await inquirer.prompt(preguntaPausa)

    //return pau;
}


const leerInput = async(mensaje) => {
    const question = {
        type: 'input',
        name: 'desc',
        message: mensaje,
        validate (value){
            if(value.length === 0){
                return 'Ingrese un valor';
            }
            return true;

        }
    }

    const {desc} = await inquirer.prompt(question);
    return desc;

}

const listaTareasBorrar = async(tareas= [] ) => {
    //aquí vamos a listar las tareas disponibles para borrar
    const choices = tareas.map( (tarea, i) =>{
        const idx = `${i+1}`.green;
       
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}` 
        }
    });
    choices.unshift({ //metodo para agregar valores al inicio de un array
        value : '0',
        name: '0.'.green + 'Cancelar'

    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message : 'Borrar',
            choices
        }
    ]
    //aquí devolveremos la tarea de que se selecciona para borrar
    const { id } = await inquirer.prompt(preguntas);
   // console.log({id}); 
    return id;

   

};

const confirmar = async (message) => {
    //este tipo de pregunta en inquirer recibe un true si confirmas ok o false si confirma un NO
    const question = {
        type: 'confirm',
        name: 'ok',
        message
    }

    const {ok} = await inquirer.prompt(question);

    return ok; //regresamos true o false

}

const mostrarListadoChecklist = async(tareas= [] ) => {
    //aquí vamos a listar las tareas disponibles para borrar
    const choices = tareas.map( (tarea, i) =>{
        const idx = `${i+1}`.green;
       
        return{ //creamos nuestro arreglo de opciones 
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false //devuelve las tareas completadas checkeadas y las que no sin check
        }
    });
    
    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message : 'Seleccione',
            choices
        }
    ]
    //aquí devolveremos la tarea de que se selecciona para borrar
    const { ids } = await inquirer.prompt(preguntas);
   // console.log({id}); 
    return ids;

   

};



module.exports = {
    inquireMenu, pausa,
    leerInput,listaTareasBorrar,
    confirmar,mostrarListadoChecklist
}