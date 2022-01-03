const { guardarDB, leerDB } = require("./helpers/guardarfile");
const {
  inquirerMenu,
  pause,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListCheck
} = require("./helpers/inquirer");
const Task = require("./models/task");
const Tasks = require("./models/tasks");
require("colors");
//const { mostrarMenu, pausa } = require("./helper/mensajes");

const main = async () => {
  let opt = "";
  const tasks = new Tasks(); // crando instanscia de la clase tareas

  const tareasDB = leerDB();
  if (tareasDB) {
    //establecer tareas
    tasks.cargarTareasFromArray(tareasDB);
  }

  do {
    //Imprimir Menú
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripcion:");
        tasks.createTask(desc);

        break;

      case "2":
        tasks.listadoCompleto();
        //console.log(tasks.listdoarr)
        break;
      case "3":
        tasks.TareasPendientesCompletadas(true);
        break;
      case "4":
        tasks.TareasPendientesCompletadas(false);
        break;
      case "5":
       const ids = await mostrarListCheck( tasks.listdoarr )
       //console.log(ids)
       tasks.toggleCompletadas(ids);
        break;
      case "6":
        const id = await listadoTareasBorrar(tasks.listdoarr);
        if (id !== '0') {
          const ok = await confirmar("Seguro que desea Borrar?");
          //TODO: confirmación
          if (ok) { 
            tasks.borrarTarea(id);
            console.log("Tarea Borrada.");
          }
        }

        break;
    }

    guardarDB(tasks.listdoarr);

    /*  const tasks = new Tasks();
    const tarea = new Task('Comer');
    tasks._listado[tarea.id] = tarea;
    console.log(tasks); */

    await pause();
  } while (opt !== "0");
};

main();
