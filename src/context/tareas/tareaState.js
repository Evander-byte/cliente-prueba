import React, { useReducer } from "react";
import TareaContext from "../tareas/tareaContext";
import TareaReducer from "../tareas/tareaReducer";
import clienteAxios from "../../config/axios";
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  // eslint-disable-next-line
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA
} from "../../types/index";

const TareaState = (props) => {
  const initialState = {
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null,
  };

  // Crerar el dispatch y el state
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //   Crear las funciones
  // Obtener la tareas de un proyectos
  const obtenerTareas = async (proyecto) => {
    try {
      const resultado = await clienteAxios.get("/api/tareas", { params: {proyecto}});
      dispatch({
      type: TAREAS_PROYECTO,
      payload: resultado.data
    });
    } catch (error) {
      console.log(error);
    }
  };
  //   Agregar una tarea al proyecto seleccionado
  const agregarTarea = async(tarea) => {
    try {
      const resultado = await clienteAxios.post("/api/tareas", tarea);
      console.log(resultado)
      dispatch({
      type: AGREGAR_TAREA,
      payload: resultado,
    });
    } catch (error) {
      console.log(error);
    }
  };
  //   Valida y muestra un error
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  //   Eliminar tarea por ID
  const eliminarTarea = async(id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, {params : {proyecto}});
      dispatch({
      type: ELIMINAR_TAREA,
      payload: id,
    });
    } catch (error) {
      console.log(error);
    }
  };
  // Extrae una tarea para edicion
  const guardarTareActual = tarea => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea
    })
  }
  // Editar la tarea seleccionada
  const actualizarTarea = async tarea => {
    try {
      const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
      dispatch({
      type: ACTUALIZAR_TAREA,
      payload: resultado.data
    })
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <TareaContext.Provider
      value={{
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareActual,
        actualizarTarea
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
