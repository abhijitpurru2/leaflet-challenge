
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
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: "pk.eyJ1IjoicnVzc2lhbnZvZGthNjUiLCJhIjoiY2tpaXE0emh3MDF1bjJxbjZnajd3NDF0YSJ9.6Iuvmv7nXzsScE9YWkGgoQ"
    }).addTo(myMap);
}

function circleColor(magnitude){
    if (magnitude < 1) {
      return "#ccff33"
    }
    else if (magnitude < 2) {
      return "#ffff33"
    }
    else if (magnitude < 3) {
      return "#ffcc33"
    }
    else if (magnitude < 4) {
      return "#ff9933"
    }
    else if (magnitude < 5) {
      return "#ff6633"
    }
    else {
      return "#ff3333"
    }
}

var info = [];

d3.json(geoURL, function (geoData) {
    for (var i = 0; i < geoData.features.length; i++){
        info.push(geoData.features[i]);
    }

    for (var j = 0; j < info.length; j++){
        console.log(info[j]);
        var coordinates = [info[j].geometry.coordinates[0], info[j].geometry.coordinates[1]];
        L.circle(coordinates, {
                fillOpacity: 0.75,
                color: "black",
                fillColor: circleColor(info[j].properties.mag),
                radius: (info[j].properties.mag) * 10000
            }).addTo(myMap);
        }
});

createMap();


