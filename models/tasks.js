const Task = require('./task');
require("colors");

class Tasks {

    _listado = {};

    get listdoarr(){
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const task = this._listado[key];
            listado.push(task)
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = ''){
        
        if( this._listado[id] ){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ){
        tareas.forEach(task => {
            this._listado[task.id] = task;
        })

    }

    createTask(desc = ''){

        const task = new Task(desc);
        this._listado[task.id] = task;

    }

    listadoCompleto(){

        console.log();
        this.listdoarr.forEach( ( task , i) => {
            
            
            const idx = `${i + 1}.`.green;
            const { desc , completadoEn} = task;
            const estado = ( completadoEn ) 
                            ? 'Completado'.green
                            : 'Pendiente'.red;

            console.log(`${ idx } ${ desc } :: ${ estado }`);   
        });

    }


    TareasPendientesCompletadas( completadas = true){
        
        let idx = 0;

        this.listdoarr.forEach( task => {
            const { desc , completadoEn} = task;
            const estado = ( completadoEn ) 
                            ? 'Completado'.green
                            : 'Pendiente'.red;
            if(completadas){
                if(completadoEn){
                    idx += 1;
                    console.log(`${ idx.toString().green + '.' } ${ desc } :: ${ completadoEn.green }`);
                }
            }else{
                if(!completadoEn){
                    idx += 1;
                    console.log(`${ idx.toString().green + '.'} ${ desc } :: ${ estado }`);
                }
            }
        });
    }

    toggleCompletadas( ids = [] ){

        ids.forEach(id => {

            const tarea = this._listado[id];//Extraemos la Tarea
            if (!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }

        });

        this.listdoarr.forEach(tarea => {

            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }


        });



    }

}



module.exports = Tasks;