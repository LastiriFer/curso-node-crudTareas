const Tarea = require("./tarea");
require('colors');


class Tareas {

    _listado = {};

    constructor(){
        this._listado = {};
    }

    get listadoArr(){
        const listado = [];

        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
           // console.log(key);
        });

        return listado;
    }

    cargarTareasFromArray( tareasbd = []){
        
       
        tareasbd.forEach( (tarea) => {

            this._listado[tarea.id] = tarea;
        })
        
    }

    crearTarea( desc = ''){

        const tarea = new Tarea(desc);

        this._listado[tarea.id]= tarea;
    }

    listadoCompleto() {
      
        this.listadoArr.forEach( (tarea,i) => {
            let idx = `${ i+1}`.green;
            const { desc, completadoEn } = tarea;

            const estado = (completadoEn ) ? 'Completado'.green : 'Pendiente'.red;

            console.log( `${idx}${'.-'.green} ${desc}  :: ${estado}`);

        });   
    }

    listarPendientesCompletas( completas = true){
        let contador = 1;
        this.listadoArr.forEach( (tarea) => {
           
            const { desc, completadoEn } = tarea;
            if(completas){
                if(completadoEn){
                    console.log(`${contador.toString().green}${'.'.green} ${desc} :: ${completadoEn.green}`);
                    contador++;
                }
                
            }else{
                if(!completadoEn){
                    console.log( `${contador.toString().green}${'.'.green} ${desc} `);
                contador++;
                }
                
            }
        });
    }

    borrarTarea(id = ''){
        
        
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    completaTarea(ids = []){
        ids.forEach(  id => {
           // console.log(id)
            const tarea = this._listado[id];
            if( !tarea.completadoEn){ //verificamos si la tarea no estba completada previamente, esto para no modificar la fecha en que se completo
                tarea.completadoEn = new Date().toISOString()

            }
        });
        //Marcamos como incompletas las tareas que no vengan con check ya que en el menú podemos quitar el check de tareas que ya esten completas
        this.listadoArr.forEach( tarea => {
            if(!ids.includes(tarea.id)){

               this._listado[tarea.id].completadoEn= null;

            }
        })

    }



}



module.exports = Tareas;