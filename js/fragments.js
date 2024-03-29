// NAVBAR
fetch('./fragments/header.html')
    .then(response => response.text())
    .then(headerHtml => {
        document.body.insertAdjacentHTML('afterbegin', headerHtml);
    });

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// FOOTER
fetch('./fragments/footer.html')
    .then(response => response.text())
    .then(footerHtml => {
        document.body.insertAdjacentHTML('beforeend', footerHtml);
    });
