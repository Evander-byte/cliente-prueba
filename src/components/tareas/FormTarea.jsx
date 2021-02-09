import React, { useContext, useState, useEffect } from "react";

import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  // Extraer si un proyecto esta activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;
  // state y funciones de tareas
  const tareasContext = useContext(tareaContext);
  const {
    errortarea,
    agregarTarea,
    tareaseleccionada,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
  } = tareasContext;

  // Effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        nombre: "",
      });
    }
  }, [tareaseleccionada]);
  // state del formulario
  const [tarea, guardarTarea] = useState({
    nombre: "",
  });

  // extraer el nombre del proyectos
  const { nombre } = tarea;

  //   Si no hay proyectos seleccionados
  if (!proyecto) return null;
  //   Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  // Leer los valores del formulario
  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }
    // Reviar si es edicion o es nueva tarea
    if (tareaseleccionada === null) {
      // agregar la nueva tarea al state de tareas
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    } else {
      actualizarTarea(tarea);
    }

    // Obtener y filtrar las tareas del proyecto actual
    obtenerTareas(proyectoActual.id);
    // Reiniciar el form
    guardarTarea({ nombre: "" });
  };
  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
            onChange={handleChange}
            value={nombre}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>
      {errortarea ? (
        <p className="mensaje error">El nombre de la Tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
