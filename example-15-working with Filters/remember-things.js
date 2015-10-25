/*
  Los filtros de la vista se ejecutan en cada digest cycle
    Mas alla de eso, conforme aumentan nuestros datos debemos tener en cuenta
    la cantidad de computo necesario para actualizar los filtros si se usan
    muchos de ellos en la UI.

  Los filtros deben ser muy rapidos
    Al crear filtros propios debemos tener en cuenta de que deben ser
    tremendamente rapidos para que la vista se actualice sin demora.
    DOM manipulation, asynchronous calls y otras actividades lentas, deben
    evitarse en los filtros.

  Prefiere filtros en servicios y controladores para optimización.
    De esta forma podemos prevenir la ejecucion del filtro cuando no cambian
    los datos, y también mantiene mas limpio el html.
 */
