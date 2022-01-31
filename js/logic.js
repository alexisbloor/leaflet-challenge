var myMap = L.map("map", {
    center: [37, -95], 
    zoom: 5
});

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// d3.json(queryUrl).then(function(data) {
//     console.log("json data", data.features);
// });
function getColor(d) {
    switch(true) {
        case d > 90: 
        return "purple";
        case d > 70: 
        return "red";
        case d > 50: 
        return "orange";
        case d > 30: 
        return "gold";
        case d > 10: 
        return "yellow";
        default: 
        return "green";
    }
}

function getRadius(mag) {
    return mag * 4;
}

    // d3.json(queryUrl).then(function(data) {
    //     console.log(data.features);
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng,
                {
                    radius: markerSize(feature.properties.mag),
                    fillColor: getColor(feature.geometry.coordinates[2]),
                    fillOpacity: 0.75,
                    color: "gray"
                }
            );
        },

        onEachFeature: function(feature, layer) {
            layer.bindPopup(`<h3>Magnitude: ${feature.properties.mag}</h3><hr><p>Earthquake Depth: ${(feature.geometry.coordinates[2])}</p>`);
        }
    }).addTo(myMap);
});

