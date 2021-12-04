const {guardarDB, leerDB} = require('./helpers/guardarArchivo');
const { inquireMenu,
	pausa,
	leerInput,
	listadoTareasBorrar,
	confirmar,
	listadoTareasCompletar
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
 //const {mostrarMenu, pausa} = require('./helpers/mensajes');

require('colors');

console.clear();
const main = async() => {
    // console.log('Hola mundo');

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if(tareasDB){
	//Establecer las tareas
	tareas.cargarTareasFromArray(tareasDB);	
    }
    await pausa();
    do {
	// Imprime el menú
	opt = await inquireMenu();
    
	switch(opt){
	    case '1':
		//Crear opción
		const desc = await leerInput('Descripción: ');
		tareas.crearTarea(desc);
		console.log('La tarea fue creada correctamente!');
	    break;

	    case '2':
		tareas.listadoCompleto();	
	    break;

	    case '3':
		tareas.listadoCompletadasPendientes();
	    break;

	    case '4':
		tareas.listadoCompletadasPendientes(false);
	    break;
	    
	    case '5':
		const ids = await listadoTareasCompletar(tareas.listadoArr);
		tareas.toggleCompletadas( ids );
	    break;

	    case '6':
		const id = await listadoTareasBorrar(tareas.listadoArr);
		if(id !== '0'){
		    
		    const ok = await confirmar('Estás seguro');
		    if(ok){
			tareas.borrarTarea(id);
			console.log('Tarea borrada correctamwente!');
		    }
		}
	    break;
	};

	 guardarDB(tareas.listadoArr);

	await pausa();
    }while(opt !== '0');
   // pausa();
}

main();
