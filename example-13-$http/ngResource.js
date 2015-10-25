/*

Promise to use them in a predictable manner.
Reducing Code with ngResource

In case you have a RESTFUL API on your server, you can further reduce the amount of
code you write by using AngularJS’s optional module, ngResource . ngResource allows
us to take an API endpoint and create an AngularJS service around it. For example,
consider an API for projects on the server side that behaves like the following:

• GET request to /api/project/ returned an array of projects
• GET request to /api/project/17 returned the project with ID 17
• POST request to /api/project/ with a project object as JSON created a new project
• POST request to /api/project/19 with a project object as JSON updated the project with ID 19
• DELETE request to /api/project/ deleted all the projects
• DELETE request to /api/project/23 deleted the project with ID 23

If we have such an API, then instead of manually creating a project resource, and wrap‐
ping up $http requests individually, we could just create a service as follows:

  angular.module('resourceApp', ['ngResource'])
  .factory('ProjectService', ['$resource', function($resource) {
  return $resource('/api/project/:id');
  }]);

This would automatically give us methods on ProjectService like:
• ProjectService.query() to get a list of projects
• ProjectService.save({id: 15}, projectObj) to update a project with ID 15
• ProjectService.get({id: 19}) to get an individual project with ID 19

and so on. You can read more about the configuration and options you get with ngRe
source at the official AngularJS docs for ngResource .

https://docs.angularjs.org/api/ngResource/service/$resource



 */
