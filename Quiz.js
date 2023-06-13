let knopf1 = document.getElementById("knopf1");
let knopf2 = document.getElementById("knopf2");
let knopf3 = document.getElementById("knopf3");
let knopf4 = document.getElementById("knopf4");
let pauseKnopf = document.getElementById("pauseKnopf");
let beendenKnopf = document.getElementById("beendenKnopf");
let frageElement = document.getElementById("frage");


let antwortAusgewaehlt = false;
let punkteAnzeige = document.getElementById("punkteAnzeige");
let ausgewaehlterKnopf;
let timer;
let frageLaenge;
let indexArray = Array.from({length: 32}, (_, i) => i + 2);

let kategorie = "teil-noten";

let punkte = 0;

let frageIndex;
let ausgewaehlteAntwort;

let frageAnzahl = 0;
let maxFragen = 3;




// Eventlistener

for(let i = 1; i <= 4; i++) {
    knopfListener(i);
}


beendenKnopf.addEventListener("click", function () {
    window.location.href = "index.html";
    alert("Du hast " + punkte + " Punkte erreicht");

});

//Fetch API

function frageHolen() {
    
    fetch('https://irene.informatik.htw-dresden.de:8888/api/quizzes/1' + zufaelligerIndex(), {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('test@gmail.com:secret')
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
            frage = data;
            console.log(frage);
            frageAnzeigen(frage);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};


// Funktionen

function zufaelligerIndex() {
    frageIndex = choice(indexArray);
    indexArray.splice(indexArray.indexOf(frageIndex), 1);
    return frageIndex;
}

function choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function knopfListener(nummer) {
    document.getElementById(`knopf${nummer}`).addEventListener("click", function () {
        if(antwortAusgewaehlt == false) {
            ausgewaehlteAntwort = nummer;
            ausgewaehlterKnopf = nummer;
            ueberpruefen();
            antwortAusgewaehlt = true;
        }
    });
}

function frageAnzeigen(frage) {
    frageElement.innerText = frage.text;
    knopf1.innerText = frage.options[0];
    knopf2.innerText = frage.options[1];
    knopf3.innerText = frage.options[2];
    knopf4.innerText = frage.options[3];
}


 /*   clearInterval(timer);
    let sekunden = 10;
    timer = setInterval(function () {
        sekunden--;
        if (sekunden < 10) {
            sekunden = "0" + sekunden;
        }
        document.getElementById("sekunden").innerText = sekunden;
        if (sekunden == 0) {
            clearInterval(timer);
            frageIndex++;
            naechsteFrage();
        }
    },1000); */


    function farbeAendern() {
        let knopf = document.getElementById(`knopf${ausgewaehlterKnopf}`);
        let knopfRichtig = document.getElementById(`knopf1`);
        
        if (ausgewaehlteAntwort == frage.id) {
            knopf.style.backgroundColor = "green";
        } else {
            knopf.style.backgroundColor = "red";
            knopfRichtig.style.backgroundColor = "green";
        }
        
        setTimeout(function() {
            knopf.style.backgroundColor = "#3F51B5";
            knopfRichtig.style.backgroundColor = "#3F51B5";
    
            // Die nächste Frage erst anzeigen, nachdem die Farben zurückgesetzt wurden
            frageAnzahl++;
            naechsteFrage();
        }, 2000);
    }
    
    
    function ueberpruefen() {
        if (ausgewaehlteAntwort == frage.id) {
            farbeAendern()
            punkte++;
            punkteAnzeige.innerText = "Punkte: " + punkte;
        }
        else {
            console.log("Falsch");
        }
        farbeAendern()
    };
    

function naechsteFrage() {
    if (frageAnzahl < maxFragen) {
        frageHolen();
        let fortschritt = document.getElementById("fortschritt");
        let fortschrittProzent = parseFloat((frageAnzahl / maxFragen) * 100).toFixed(2);
        fortschritt.style.width = fortschrittProzent + "%";
        fortschritt.innerText = fortschrittProzent + "%";
        antwortAusgewaehlt = false;
    }
    else {
        weiterleiten();
    }
}

//Fortschrittsbalken
/*document.querySelector('fortschritt').addEventListener('mdl-componentupgraded', function() {
    this.MaterialProgress.setProgress(0+(i*25));
    this.MaterialProgress.setBuffer(87);
  });
*/

function weiterleiten() {
    setTimeout(function () {
        window.location.href = "Ende.html";
    }, 1000);
}

frageHolen();