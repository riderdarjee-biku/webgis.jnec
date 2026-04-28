// TASK 1: Paste map creation code here
const map = L.map("map").setView([27.5, 90.4], 8);


// TASK 2: Paste basemap code here
const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

// TASK 3: Paste layer group code here
const dzongkhagLayer = L.layerGroup().addTo(map);
const educationLayer = L.layerGroup().addTo(map);
const healthLayer = L.layerGroup().addTo(map);

// TASK 4: Paste zoom function here
function zoomToBhutan() {
  map.setView([27.5, 90.4], 8);
}

// TASK 5: Paste GeoJSON layer loading code here
fetch("../Data/bhutan_dzong_web.geojson")
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: "black",
        weight: 1,
        fillColor: "orange",
        fillOpacity: 0.3
      },
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Dzongkhag Boundary");
      }
    }).addTo(dzongkhagLayer);
  });

  fetch("../Data/bhutan_education_center.geojson")
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 5,
          color: "blue",
          fillColor: "blue",
          fillOpacity: 0.8
        });
      },
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Education Center");
      }
    }).addTo(educationLayer);
  });

fetch("../Data/bhutan_health_center.geojson")
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 5,
          color: "red",
          fillColor: "red",
          fillOpacity: 0.8
        });
      },
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Health Center");
      }
    }).addTo(healthLayer);
  });

// TASK 6: Paste layer control code here
const overlayMaps = {
  "Dzongkhag Boundary": dzongkhagLayer,
  "Education Centers": educationLayer,
  "Health Centers": healthLayer
};

L.control.layers(null, overlayMaps).addTo(map);

const myModal = document.getElementById('staticBackdrop')

myModal.addEventListener('shown.bs.modal', () => {
  myModal.querySelector(".btn-close").focus()
})

L.control.measure({
  position: 'topleft',   // 👈 change here
  primaryLengthUnit: 'kilometers',
  secondaryLengthUnit: 'meters',
  primaryAreaUnit: 'hectares'
}).addTo(map);

const drawControl = new L.Control.Draw({
  position: 'topleft',   // 👈 change here
  draw: {
    polygon: true,
    polyline: true,
    rectangle: true,
    circle: false,
    marker: false
  }
});

map.addControl(drawControl);
