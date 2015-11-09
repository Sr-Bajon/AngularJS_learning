/*
  Los test de protractor usan la sintaxis de Jasmine.

  Protractor expone algunas variables necesarias para escribir test, end-to-end

  browser
    Es una envoltura de WebDriver que permite interactuar con el navegador
    directamente.

  element
    El objeto element es una funcion de ayuda para encontrar e interactuar
    con elementos HTML.

  by
    Se trata de un objeto con una coleccion de estrategias para encontrar
    elementos. Podemos encontrar elementos por ID o CSS, que son los normales
    de WebDriver, protractor añade algunos tambien como encontrar por model,
    binding y repeater, que son formas especificas de Angular para encontrar
    elementos en la pagina.

 */

describe('Routing Test', function () {

  it('should show teams on the first page', function () {
    // Open the list of teams page
    browser.get('/');

    // Check whether there are 5 rows in the repeater
    var rows = element.all(
      by.repeater('team in teamListCtrl.teams'));
    expect(rows.count()).toEqual(5);

    // Check the first row details
    var firstRowRank = element(
      by.repeater('team in teamListCtrl.teams')
        .row(0).column('team.rank'));
    var firstRowName = element(
      by.repeater('team in teamListCtrl.teams')
        .row(0).column('team.name'));
    expect(firstRowRank.getText()).toEqual('1');
    expect(firstRowName.getText()).toEqual('Spain');

    // Check the last row details
    var lastRowRank = element(
      by.repeater('team in teamListCtrl.teams')
        .row(4).column('team.rank'));
    var lastRowName = element(
      by.repeater('team in teamListCtrl.teams')
        .row(4).column('team.name'));
    expect(lastRowRank.getText()).toEqual('5');
    expect(lastRowName.getText()).toEqual('Uruguay');

    // Check that login link is shown and
    // logout link is hidden
    expect(element(by.css('.login-link')).isDisplayed())
      .toBe(true);
    expect(element(by.css('.logout-link')).isDisplayed())
      .toBe(false);
  });


  it('should allow logging in', function () {

    // Navigate to the login page
    browser.get('#/login');
    var username = element(
      by.model('loginCtrl.user.username'));
    var password = element(
      by.model('loginCtrl.user.password'));

    // Type in the username and password
    username.sendKeys('admin');
    password.sendKeys('admin');

    // Click on the login button
    element(by.css('.btn.btn-success')).click();

    // Ensure that the user was redirected
    expect(browser.getCurrentUrl())
      .toEqual('http://localhost:8000/#/');

    // Check that login link is hidden and
    // logout link is shown
    expect(element(by.css('.login-link')).isDisplayed())
      .toBe(false);
    expect(element(by.css('.logout-link')).isDisplayed())
      .toBe(true);
  });
});

/*
  Hay dos test, el primero:
    - Abre la primera pagina de la aplicacion
    - Obtiene todas las columnas usando el repetidor, y comprueba que hay
      5 filas presentes en la pagina principal.
    - Obtiene el nombre y rango de la primera fila y asserts que es lo esperado
    - Obtiene el nombre y rango de la ultima fila y asserts que es lo esperado
    - Comprueba que el link de login se muestra y el link de logout esta oculto.

  El segundo:
    - Abre la pagina de login
    - Introduce el username y password
    - Clikea en el boton de loggin usando un selector CSS
    - Se asegura que el login es correcto comprobando la URL de la pagina
      redireccionada.
    - Comprueba que el link de loggin esta oculto y el de logout se muestra

  Observa que no se han añadido condiciones de espera en los test. Angular y
  Protractor se ocupan de esto.


 */
