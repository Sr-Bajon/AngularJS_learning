/*
  Mejores practicas:
    - Tener un controlador, un servicio, una directiva o un filtro por archivo.
    - No tener un modulo gigante, separa la aplicacion en modulos pequeños
      por funcionalidad.
    - Crea modulos y directorios por funcionalidad (autorizacion, administracion
      de servicios, busqueda, etc)
    - Usa la sintaxis recomendada para las funciones del modulo
      (angular.module('someModule').controller... , etc.) sobre cualquier otra
      que veas online o donde sea.
    - Usa Namespaces. mycompany-chart para las directivas, myProjectAuthService,
      etc. Asi se puede distinguir rapidamente tus ficheros de otros third-party
    - Se consistente.

  Estructura de directorios
    Angular será tipicamente servido estaticamente por el servidor.
      app
        todo el codigo javascript que escribas, que a su vez se divide en,

         components: componentes reutilizables que no estan atados a
                     determinado pagina o seccion de la UI, como una directiva
                     datepicker o un servicio de autorizacion.
          sections:  pueden ser rutas, paginas, o pequeñas subsecciones de la
                     pagina, como un dashboard. Normalmente el directorio
                     sections:
                      - Refleja vistas que son mostradas al usuario
                      - Contiene solo los templates HTML y CSS, y los
                        controladores que las hacen funcionar.

          Un componente o seccion puede tener su propio modulo. La decision
          depende de si el modulo es reutilizable o selectivamente incluido
          en diferentes aplicaciones.
      test
        los test unitarios y posiblemente los end-to-end tambien
        Deberia copiar la estructura de app
        Contienen los test end-to-end
        Los test unitarios, por otra parte, son colocados junto a los de codigo
        de tu aplicacion, en cada subfolder del directorio app. Asi cada archivo
        tiene su archivo de test unitarios junto a el para un facil
        mantenimiento.
      data
        datos comunes a tu aplicacion pero que no son dinamicos
      scripts
        scripts y otros scripts de utilidad pueden almacenarse aqui
      Other files
        package.json, bower.json, etc pueden ir en el directorio principal.


app
  — app.css
  — app.js
  — index.html
    — components // Reusable common components
      — datepicker
        — datepicker-directive.js
        — datepicker-directive_test.js
      — authorization
        — authorization.js
        — authorization-service.js
        — authorization-service_test.js
      — ui-widgets
        — ui-widgets.js
      — grid
        — grid.html
        — grid-directive.js
        — grid-directive_test.js
      — dialog
        — dialog-service.js
        — dialog-service_test.js
  — list
    — list.html
    — list.css
    — list-controller.js
    — list-controller_test.js
  — login
    — login.html
    — login-controller.js
  — search
    — search.html
    — search.css
    — search-controller.js
    — search-controller_test.js
  — detail
    — detail.html
    — detail-controller.js
    — detail-controller_test.js
  — admin
    — create
      — create.html
      — create-controller.js
      — create-controller_test.js
    — update
      — update.html
      — update-controller.js
      — update-controller_test.js
  • vendors // third-party dependencies go here
    — underscore
    — jquery
    — bootstrap
  • e2e // end-to-end scenario tests
    — runner.html
    — login_scenario.js
    — list_scenario.js
    — search_scenario.js
    — detail_scenario.js
    — admin
      — admin_create_scenario.js
      — admin_update_scenario.js

 */
