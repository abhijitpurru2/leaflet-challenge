// Gets data from USGS
var geoURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Creates map
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});

function createMap(){
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
    }).addTo(myMap);
}

// Picks the color of the circle based on magnitude
function circleColor(magnitude){
    if (magnitude < 1) {
      return "#bdff20"
    }
    else if (magnitude < 2) {
      return "#fff941"
    }
    else if (magnitude < 3) {
      return "#ffc039"
    }
    else if (magnitude < 4) {
      return "#ff863c"
    }
    else if (magnitude < 5) {
      return "#ff6835"
    }
    else {
      return "#ff1e20"
    }
}

// Empty Array to fill data
var info = [];

// Create the circle layer
d3.json(geoURL, function (geoData) {
    for (var i = 0; i < geoData.features.length; i++){
        info.push(geoData.features[i]);
    }

    for (var j = 0; j < info.length; j++){
        console.log(info[j]);
        var coordinates = [info[j].geometry.coordinates[1], info[j].geometry.coordinates[0]];
        L.circle(coordinates, {
                fillOpacity: 0.9,
                color: "black",
                fillColor: circleColor(info[j].properties.mag),
                radius: (info[j].properties.mag) * 10000
            }).bindPopup("<h3>" + info[j].properties.place + "</h3> <h6>" + coordinates[1] + ", " + coordinates[0] +
        "</h6> <hr> <h4>Magnitude: " + info[j].properties.mag + "</h4>").addTo(myMap);
        }
});

//Creates location for the legend
var legend = L.control({position: 'bottomright'});

// Creates legend
legend.onAdd = function(map){
    var div = L.DomUtil.create("div", "info legend"),
        magScale = [0,1,2,3,4,5],
        labels = ['0-1','1-2','2-3','3-4','4-5','5+'];

    for (var k = 0; k < magScale.length; k++) {
            div.innerHTML += '<i style="background:' + circleColor(magScale[k]) + '"></i> ' + (labels[k] ? labels[k] + '<br>' : '+');
        }
    return div;
};

// Adds legend to map
legend.addTo(myMap);

// Creates map object
createMap();