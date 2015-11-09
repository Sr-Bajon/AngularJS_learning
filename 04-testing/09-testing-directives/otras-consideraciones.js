/*
  ¿Como testeamos el renderizado del HTML real?
    Si usamos templateUrl tenemos pocas opciones.
    - Podemos crear un dummy template como el del ejemplo.
    - La otra opcion es usar template en vez de templateUrl, con lo que nos
      aseguramos que el template se carga a la vez que la directiva.
    - Otra opción es usar algo como Grunt-HTML2JS, que toma los templates
      HTML y los convierte en servicios y factorias de AngularJS. De esta forma
      podemos inyectar los servicios y cargar nuestros templates.

  ¿Que pasa con los servicios de AngularJS dependientes?
    Si nuestra directiva depende de un servicio o factoria de AngularJS, podemos
    testearlo de la misma forma que antes. AngularJS se figurará las
    dependencias y las inyectará automaticamente.
    Tambien podemos inyectar los servicios en nuestro test unitario.

  El bindeo de AngularJS no funciona
    Porque hemos creado manualmente el HTML y compilado, el ciclo de vida de
    Angular que se encarga de actualizar el HTML con los datos no funciona, por
    eso tenemos que llamar a scope.$digest()


 */
