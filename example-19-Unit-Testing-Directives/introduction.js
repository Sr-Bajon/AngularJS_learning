/*
  Hasta ahora hemos visto como testear controladores y servicios, pero las
  directivas están ligadas al DOM.

  1) El servicio $compile debe ser inyectado en el test unitario.
  2) Crear el elemento HTML que lanzará la directiva para ser testeada.
  3) Crear el scope sobre lo que quieras que la directiva sea testeada.
  4) Recuerda que no hay servidores durante los test unitarios, si la directiva
     carga un template usando templateUrl hay que añadir $httpBackend para cargar
     el templateUrl y designar el HTML que será usado en vez del template en los
     test.
  5) Compilar el elemento HTML usando el servicio $compile con el scope que
     hayamos creado.
  6) Escribir los expectations sobre como la directiva debe ser renderizada y
     las funciones definidas en la link function.

  Hay 5 test que son estandar para todas las directivas, los otros son testear
  el renderizado y la logica encapsulada en la directiva.
 */
