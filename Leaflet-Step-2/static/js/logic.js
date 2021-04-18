var myMap=L.map("mapid",{
    center: [31.51073, -96.4247],
    zoom: 5
    });
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
    }).addTo(myMap);

    var baseMaps = {
      "Satellite": satellitemap,
    }
    
    
    var url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    
    d3.json(url, function(response){
      console.log(response);
      function styleInfo(feature){
        return {
          opacity: 1,
          fillOpacity: 1,
          fillColor: colorIntensity(feature.geometry.coordinates[2]),
          color: "#000000",
          radius: feature.properties.mag*5,
          stroke: true,
          weight: 0.5
        }
      }
      function colorIntensity(coordinates) {
    
        if (coordinates >= 90){
          return "#ff0000"; 
        }
        else if (90> coordinates & coordinates>=70){
          return "#ff7f50"; 
        }
        else if (70> coordinates & coordinates>=50){
          return "#ff8000"; 
        }
        else if (50> coordinates & coordinates>=30){
          return "#ffbf00"; 
        }
        else if (30> coordinates & coordinates>=10){
          return "#ffff00"; 
        }
        else if (10> coordinates){
          return "#bfff00"; 
        }
        
        }
      
      
      
          L.geoJson(response, {
            
            pointToLayer: function(feature, latlng) {
              return L.circleMarker(latlng);
            },
           
            style: styleInfo,
            onEachFeature: function(feature, layer) {
              layer.bindPopup("Magnitude: " + feature.properties.mag +"<br>Depth:"+ feature.geometry.coordinates[2]+"<br>Location: " + feature.properties.place);
            }
          }).addTo(myMap);
    
          function getColor(d){
            return d >90 ? "#ff0000":
                   d >70 ?  "#ff7f50":
                   d >50 ? "#ff8000":
                   d >30 ? "#ffbf00":
                   d >10 ? "#ffff00":
                            "#bfff00";
                  
          }
    
    
          var legend= L.control({position: "bottomright"});
          legend.onAdd=function(myMap){
            var div = L.DomUtil.create("div", "info legend"),
            grades =[-10,10,30,50,70,90];
            for (var i = 0; i < grades.length; i++) {
              div.innerHTML +=
                  '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                  grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
          }
      
          return div;
      };
      legend.addTo(myMap);
    };
    

  var tectonicplates = new L.LayerGroup();
  var earthquakes = new L.LayerGroup();
}
  var baseMaps = {
   "Satellite": satellitemap,
  
  };
  
  var overlays = {
    "Tectonic Plates": tectonicplates,
    Earthquakes: earthquakes
  };

  L
    .control
    .layers(baseMaps, overlays)
    .addTo(map);
  

    var url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
   
    d3.json(url, function(response){
      console.log(response);
    function styleInfo(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
      };
    }

  function getRadius(magnitude) {
      if (magnitude === 0) {
        return 1;
      }
  
      return magnitude * 4;
    }
  

    L.geoJson(response, {

      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
      },
     
      style: styleInfo,
    
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
      }
    
    }).addTo(earthquakes);
  
    earthquakes.addTo(map);
  

    var legend = L.control({
      position: "bottomright"
    });
  
  
    legend.onAdd = function() {
      var div = L
        .DomUtil
        .create("div", "info legend");
  
      var grades = [0, 1, 2, 3, 4, 5];
      var colors = [
        "#98ee00",
        "#d4ee00",
        "#eecc00",
        "#ee9c00",
        "#ea822c",
        "#ea2c2c"
      ];
  
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML += "<i style='background: " + colors[i] + "'></i> " +
          grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
      }
      return div;
    };

    legend.addTo(map);
    
    var url="https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"
     
    d3.json(url, function(response){
      console.log(response);
  
    function (platedata);
    {
           L.geoJson(platedata, {
            color: "orange",
            weight: 2
          });
        }
  
          .addTo(tectonicplates);
    
      };
          tectonicplates.addTo(map);
        });