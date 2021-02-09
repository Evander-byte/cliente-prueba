import React, { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Proyecto from "./Proyecto";
import AlertaContext from "../../context/alertas/alertaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";

const ListadoProyectos = () => {
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;
  // Extraer proyectos de stateInicial
  const proyectosContext = useContext(proyectoContext);
  const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

  useEffect(() => {
    // si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    obtenerProyectos();
    // eslint-disable-next-line
  }, [mensaje]);
  // Revisar si el state tiene contenido
  if (proyectos.length === 0)
    return <p>No hay Proyectos, comienza creando uno.</p>;
  return (
    <ul className="listado-proyectos">
      {alerta ? (
        <div className={`alerta ${mensaje.categoria}`}>{mensaje.msg}</div>
      ) : null}
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto._id} timeout={200} classNames="proyecto">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
