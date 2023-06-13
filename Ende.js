document.getElementById("restartButton").addEventListener("click", function () {
    window.location.href = "Quiz.html";
});

document.getElementById("nameForm").addEventListener("submit", function (event) {
    event.preventDefault();  // verhindert, dass die Seite neu lädt
    let name = document.getElementById("nameInput").value;
});
