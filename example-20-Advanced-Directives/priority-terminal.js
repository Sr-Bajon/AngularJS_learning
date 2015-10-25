/*
  Las ultimas dos opciones al crear directivas son priority y terminal.

  * priority se usa para decidir el orden en que las directivas son evaluadas
    cuando hay multiples directivas usadas en el mismo elemento.
    Por defecto cualquier directiva creada tiene una prioridad de 0, a mayor sea
    el numero, mayor la prioridad. Las de mayor prioridad son linkdas y
    compiladas antes que las de menor prioridad.

  * terminal es una directiva usada para asegurar que ninguna otra directiva es
    compilada o linkada en el elmento despues de la actual directiva finalice.

    Tambien, las directivas hijas no se tocaran o compilaran cuando terminal
    se establezca a true. Por defecto es false.

    Cualquier directiva en un elemento con la misma prioridad se ejecutarán,
    porque el orden de ejecucion de las directivas con la misma prioridad no
    esta definido.
*/
