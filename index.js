'use strict';

//Serveronline Variable
var online;

// Überprüfe die Serverantwort und setze den Haken und den Label-Namen entsprechend
function checkServerStatus() {
  // Definiere den URL-Pfad zum Server
  var serverURL = 'https://irene.informatik.htw-dresden.de:8888/api/quizzes/';

  // Führe eine AJAX-Anfrage an den Server durch
  var xhr = new XMLHttpRequest();
  xhr.open('GET', serverURL, true);
  // Setze den Basic Authentication-Header
  var username = 'test@gmail.com';
  var password = 'secret';
  var authHeader = 'Basic ' + btoa(username + ':' + password);
  xhr.setRequestHeader('Authorization', authHeader);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Der Server ist erreichbar, setze den Haken und den Label-Namen
        online = true;
        document.getElementById('chkbox1').checked = true;
        document.getElementById('labelText').textContent = 'Online';
      } else {
        // Der Server ist nicht erreichbar, entferne den Haken und ändere den Label-Namen
        online = false;
        document.getElementById('chkbox1').checked = false;
        document.getElementById('labelText').textContent = 'Offline';
      }
      // Aktualisiere das Material Design Lite (MDL) für das Checkbox-Element
      componentHandler.upgradeElement(document.getElementById('chkbox1'));
    }
  };
  xhr.send();
}

// Rufe die Funktion zur Überprüfung des Serverstatus auf
checkServerStatus();
