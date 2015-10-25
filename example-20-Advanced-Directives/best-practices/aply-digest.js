/*
  El error mas comun que ocurre cuando integramos un componente third-party
   es que atamos todo correctamente y luego vemos en nuestra pantalla que la
   UI no se actualiza.
   Y la causa principal es que hayamos olvidado llamar a $apply(), o lanzar
   manualmente el ciclo digest con $digest().

   Al trabajar con third-party components, recuerda que hay dos ciclos distintos
   en juego. El primero es el ciclo de vida de AngularJS que es responsable de
   mantener la UI actualizada y el segundo es el ciclo de vida del componente.

   Cuando los dos se encuentran, los desarolladores son responsables de avisar
   a AngularJS que algo fuera de su ciclo de vida ha cambiado y que necesita
   actualizar la UI, lo que se hace llamando a $scope.apply(), que comienza
   un digest cycle en $rootScope.

   A veces, otro evento en AngularJS se lanza automaticamente y se encarga de
   esto, pero en caso de que actualices alguna variable del scope en respuesta
   a eventos externos, asegurate de lanzar manualmente $scope.apply() y
   $scope.$digest()
*/
