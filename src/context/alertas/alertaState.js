import React, { useReducer } from "react";
import alertaReducer from "../alertas/alertaReducer";
import alertaContext from "../alertas/alertaContext";
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types/index";

const AlertaState = (props) => {
  const intialState = {
    alerta: null,
  };

  const [state, dispatch] = useReducer(alertaReducer, intialState);

  //   Funciones
  const mostrarAlerta = (msg, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
        msg,
        categoria,
      },
    });

    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 5000);
  };
  return (
    <alertaContext.Provider
      value={{
        alerta: state.alerta,
        mostrarAlerta,
      }}
    >
      {props.children}
    </alertaContext.Provider>
  );
};

export default AlertaState;
