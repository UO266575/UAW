var mymap = L.map('map').setView([43.3623, -5.8448], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

fetch('data/markers.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(marker => {
            var popupContent = "<b>Nombre:</b> " + marker.name;
            var markerPopup = L.popup().setContent(popupContent);
            var mapMarker = L.marker([marker.lat, marker.lng]).addTo(mymap);
            mapMarker.bindPopup(markerPopup);

            mapMarker.on('click', function () {
                var popup = document.getElementById('popup1');
                popup.style.visibility = 'visible';
                popup.style.opacity = '1';

                var trapInfo = document.getElementById('trap-info');
                var popupContent = "<h2>Identificador:</h2><p>" + marker.name + "</p><h2>Fecha:</h2><p>" + marker.date + "</p><h2>Coordenadas:</h2><p>" + marker.lat + ", " + marker.lng + "</p><h2>Fotografía:</h2><img src='./img/velutinas_traps/" + marker.name + ".jpg'>";
                if (marker.reviews && marker.reviews.length > 0) {
                    popupContent += "<h2>Revisiones:</h2><table><tr><th>Fecha de Revisión</th><th>Reinas Atrapadas</th><th>Obreras Atrapadas</th></tr>";
                    marker.reviews.forEach(review => {
                        popupContent += "<tr><td>" + review.revision_date + "</td><td>" + review.caught_queens + "</td><td>" + review.worker_wasps + "</td></tr>";
                    });
                    popupContent += "</table>";
                } else {
                    popupContent += "<p>No hay revisiones disponibles.</p>";
                }
                trapInfo.innerHTML = popupContent;
            });
        });
        var trapsProgress = document.getElementById('traps-progress');
        var trapsInfo = document.getElementById('traps-info');
        var numMarkers = data.length;
        var finalWidth = (numMarkers / 100) * 100;
        var currentWidth = 0;

        function increaseProgress() {
            if (currentWidth >= finalWidth) {
                clearInterval(progressInterval);
            } else {
                currentWidth++;
                trapsProgress.style.width = currentWidth + '%';
                trapsProgress.textContent = currentWidth + '%';
                trapsInfo.textContent = numMarkers + ' de 100 trampas colocadas';
            }
        }

        var progressInterval = setInterval(increaseProgress, 30);
    });

document.querySelector('.close').addEventListener('click', function (event) {
    event.preventDefault();
    var popup = document.getElementById('popup1');
    popup.style.visibility = 'hidden';
    popup.style.opacity = '0';
});