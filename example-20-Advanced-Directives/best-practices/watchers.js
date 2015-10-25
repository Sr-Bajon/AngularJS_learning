/*
  WATCHERS

  AngularJS permite añadir nuestros propios escuchadores de evento, o watchers,
  como los llama AngularJS.

  Los watchers se pueden añadir a variables del scope y a funciones. Angular
  los lanza cuando la variable sufre un cambio, y entonces tenemos acceso
  al antiguo y al nuevo valor.

  Hay unos cuantos tipos de watchers que podemos añadir, con sus implicaciones:

  $watch
    El mas estandar, toma:
      - Un string, con el nombre de la variable del scope.
      - Una funcion, que devuelve el valor evaluado.

    En cualquier caso, cuando el valor cambia, la funcion pasada como segundo
    argumento se ejecuta con el viejo y el nuevo valor.

  Deep $watch
    Igual que el $watch estandar, pero toma un valor Boolean true como tercer
    argumento. Esto fuerza a Angular a comprobar recursivamente cada objeto y
    clave dentro del objeto o variable y usa  angular.equals para comprobar
    la igualdad de todos los objetos.
    Captura todos los cambios, pero tambien consume mas ciclos de CPU.
    Es preferible tener un Boolean como clave para setear cuando hay algun
    cambio y aplicar un watch sobre el.

  $watchCollection
    Una version optimizada de $watch para arrays. Argumentos similares a $watch,
    pero espera que el valor sea un array. La funcion se lanza cada vez que un
    elemento se añade, elimina o mueve en el array.
    No observa cambios en las propiedades individuales de un elemento del array.

 */
