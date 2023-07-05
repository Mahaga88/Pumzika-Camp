mapboxgl.accessToken = mapToken;
let map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/outdoors-v12", // style URL
  center: campground.geometry.coordinates, // starting position [lng, lat]
  zoom: 10, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

let marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(campground.geometry.coordinates) // Update the marker's coordinates
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h3>${campground.title}</h3> <p>${campground.location}</p>`
    )
  )
  .addTo(map);

function updateMarkerPosition(newCoordinates) {
  marker.setLngLat(newCoordinates); // Update the marker's position
  map.flyTo({ center: newCoordinates }); // Fly to the new location on the map
}

const newCoordinates = [lng, lat]; // Update the coordinates with the new values
updateMarkerPosition(newCoordinates);
