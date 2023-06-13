var online;

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
          online = true;
        } else {
          online = false;
        }
        // Rufe die Funktion zur Überprüfung des Serverstatus auf
        checkOnlineStatus();
      }
    };
    xhr.send();
  }
  
  function checkOnlineStatus() {
    // Hole das Link-Element
    var quizLink = document.getElementById('quizLink');
  
    // Überprüfe den Wert der Variable "online"
    if (online) {
      // Setze die URL auf "Quiz.html", wenn "online" true ist
      quizLink.href = "Quiz.html";
    }
  }

document.addEventListener('DOMContentLoaded', function() {
    // Hole das Link-Element
    checkServerStatus();
  });