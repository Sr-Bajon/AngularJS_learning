var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function () {
  if (xmlhttp.readystate == 4 && xmlhttp.status == 200) {
    var response = xmlhttp.responseText;
  } else if (xmlhttp.status == 400) {
    // or really anything in the 4 series
    // Handle error gracefully
  }
};

// Set up connection
xmlhttp.open("GET", "http://myserver/api", true);
// Make the request
xmlhttp.send();

// esta sería la forma de hacer peticiones Ajax con el objeto
// XMLHttpRequest


