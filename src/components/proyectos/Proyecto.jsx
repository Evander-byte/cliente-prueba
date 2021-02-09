import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {
  // state y funcines de proyectos
  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual } = proyectosContext;
  // state y funciones de tareas
  const tareasContext = useContext(tareaContext);
  const { obtenerTareas } = tareasContext;

  // Funcion para agregar el proyecto actual
  const seleccionarProyectos = (id) => {
    proyectoActual(id); //Fijar un proyecto actual
    obtenerTareas(id); //Fijar las tareas cuando se da click
  };
  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyectos(proyecto._id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
