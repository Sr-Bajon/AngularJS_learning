/*
  SCOPES

  Lo recomendado es crear siempre isolated scopes para las directivas, si
  nuestra directiva, necesita funciones o variables del parent scope, tenemos
  dos opciones:

  * Crear un child scope, y añadir las variables y funciones al child scope.
    Esto se puede hacer con
        scope: true
    en el objeto de definicion de la directiva. Así tendriamos las variables
    y funciones definidas en el padre accesibles desde la directiva.

  * Crear un isolated scope, y pasarle pasarle las variables y funciones usando
    data- y function-binding.
    Este es el patron ideal, porque elimina la posibilidad de que la directiva
    pueda necesitar determinada variable o funcion en el scope padre para que
    la directiva funcione correctamente.
    Las directivas con isolated scope con las mas reutilizables.
*/
