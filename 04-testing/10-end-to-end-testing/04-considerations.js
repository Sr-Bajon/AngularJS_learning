/*
  CONSIDERATIONS

  Location of ng-app

    Cuando se escribe un test simple de AngularJS, y apuntas a una URL que
    host la aplicacion, Protractor por defecto mira en el body del HTML para
    encontrar el ng-app.

    Pero en caso de que ng-app no este en el body, sino en un subelemento,
    necesitamos decirle a Protractor donde encontrarlo.
    Esto se hace a traves de la opcion rootElement de la configuración de
    Protractor, que toma un selector CSS para encontrar el elemento que tiene
    el ng-app.

    Por ejemplo, supongamos que el elemento está en:

      <div class="angular-app" ng-app="myApp"></div>

    Entonces en nuestro archivo de configuracion de Protractor.

      rootElement: ".angular-app"

  Polling

    Si tienes algun tipo de polling logic en tu codigo, donde tienes que
    mantener la recogida de informacion o hacer algun calculo cada pocos
    segundos, asegurate de NO usar el servicio $timeout de Angular para ello.

    Protractor tiene problemas figurandose cuando AngularJS ha acabado su
    trabajo, si necesitas polling, y tienes que testearlo end-to-end, asegurate
    de usar el servicio $interval, en este caso Protractor si es capaz de lidiar
    con ello perfectamente.

  Manual bootstrapping

    Actualmente Protractor no puede trabajar con aplicaciones que inician
    (bootstrap) AngularJS manualmente. Si este es el caso, hay que trabajar
    con WebDriver, que esta por debajo de Protractor, usando,
      browser.driver.get
    en vez de
      browser.get
    y demas.

    Y ademas añadir condiciones de espera para asegurarse de que todo ha cargado
    antes de testearlo. No seras capaz de beneficiarte de ninguno de los
    beneficios que ofrece protractor.

  Future execution

    Los comandos de WebDriver que escribimos en nuestros test no devuelven los
    valores actuales, sino que devuelven promesas que serán ejecutadas mas tarde
    en el navegador, asi que console.log()  no pinta los valores porque no los
    tiene en el momento que se ejecuta el codigo.

  Debugging

    Para debuggear cualquier test, debemos añadir la siguiente linea cuando
    queremos que empiece a debuggear.

      browser.debugger();

    Y para ejecutar el test.

      protractor debug path/to/conf.js

    Esto abre el debugger de Node, para continuar ejecuando escribir "c" y Enter

  API

    Cuando hagamos test complejos, podemos querer tener una especie de API que
    haga mas mantenibles y faciles de entender los test. Para hacer esto podemos
    usar el concepto de PageObjects.

    Veamos un ejemplo de como sería el test de la aplicacion de ejemplo
    empleando PageObjects
 */

// The PageObjects are ideally in separate files
// to allow for reuse across all the tests,
// but are listed here together for ease of understanding
function TeamsListPage() {
  this.open                = function () {
    browser.get('/');
  };
  this.getTeamsListRows    = function () {
    return element.all(by.repeater('team in teamListCtrl.teams'));
  };
  this.getRankForRow       = function (row) {
    return element(
      by.repeater('team in teamListCtrl.teams')
        .row(row).column('team.rank'));
  };
  this.getNameForRow       = function (row) {
    return element(
      by.repeater('team in teamListCtrl.teams')
        .row(row).column('team.name'));
  };
  this.isLoginLinkVisible  = function () {
    return element(by.css('.login-link')).isDisplayed();
  };
  this.isLogoutLinkVisible = function () {
    return element(by.css('.logout-link')).isDisplayed();
  };
}

describe('Routing Test With PageObjects', function () {
  it('should show teams on the first page', function () {
    var teamsListPage = new TeamsListPage();
    teamsListPage.open();
    expect(teamsListPage.getTeamsListRows().count()).toEqual(5);
    expect(teamsListPage.getRankForRow(0).getText())
      .toEqual('1');
    expect(teamsListPage.getNameForRow(0).getText())
      .toEqual('Spain');
    expect(teamsListPage.getRankForRow(4).getText())
      .toEqual('5');
    expect(teamsListPage.getNameForRow(4).getText())
      .toEqual('Uruguay');
    // Check that login link is shown and
    // logout link is hidden
    expect(teamsListPage.isLoginLinkVisible()).toBe(true);
    expect(teamsListPage.isLogoutLinkVisible()).toBe(false);
  });
});
