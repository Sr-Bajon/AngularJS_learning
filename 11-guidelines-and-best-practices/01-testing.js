/*
  Variedad de test

  Unit test
    Un test unitario es conciso y se centra en una sola pieza (controlador,
    servicio, filtro, etc)
    Testeamos usando Karma, dandole a los test el correcto input o estado
    obtenemos la respuesta correcta.
    Para que no tenga efectos adyacentes mockeamos las dependencias para
    asegurarnos de aislar la pieza.

  Integration test
    Ya no se trata de testear una unidad aislada, sino de ver como se comporta
    con las demas, por ejemplo que un controlador llame a un servicio y este
    responda de manera adecuada.
    De todas formas en estos test seguimos mockeando las llamadas al servidor,
    incluso si este sirve una pagina HTML, asi que esta logica queda sin
    testear.


  Scenario test
    Tambien llamados end-to-end y se hacen sobre el navegador, navegando e
    interactuando sobre la aplicación y comprobando que todo va segun lo
    esperado.



  Una buena cobertura de test sería un 70% de test unitarios, un 20% de test de
  integracion y un 10% de test end-to-end.


  ¿Cuando ejecutar los test?
    Al guardar
      Por lo menos los unitarios y los de integracion. Webstorm tiene karma
      integrado y puede pasar los test al guardar.

    Antes de hacer push
      Git-Hooks puede ayudar con esto, pero antes de hacer push se deberian
      pasar todos los test.

    Continuous integration
      karma y protractor se integran bien con sistemas como Jenkins y Travis.
 */
