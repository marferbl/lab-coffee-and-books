function initMap() {
  const ironhackMAD = {
    lat: 40.39279917456607,
    lng: -3.698590505452073,
  };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: ironhackMAD,
  });

  getPlaces(map)
    .then(places => {
      // console.log(places.data.places)
       placePlaces(map, places.data.places)
    })
    .catch(err =>console.log(err))
  }





function getPlaces(){
   return axios.get("/api/show-map")
      

}



function placePlaces(map, places) {
  const markers = [];

  // 8. Instrucciones: Por cada restaurante creo un nuevo Marker
  places.forEach((places) => {
    const center = {
      lat: places.location.coordinates[0],
      lng: places.location.coordinates[1],
    };
    const newMarker = new google.maps.Marker({
      position: center,
      map: map,
      title: places.name,
    });
    markers.push(newMarker);
  });
  console.log(markers)
  // 9. Instrucciones: Finalmente retorno los markers por si los necesitase a futuro
  return markers;
}



//   getRestaurants(map)
//     .then((restaurants) => {
//       // 7. Instrucciones: Llamar a placeRestaurants pasandoles la info
//       const markers = placeRestaurants(map, restaurants);
//     })
//     .catch((error) => console.log(error));
// }
// function getRestaurants() {
//   return axios.get("/restaurants/api").then((response) => response.data.restaurants);
// }
// function placeRestaurants(map, restaurants) {
//   const markers = [];

//   // 8. Instrucciones: Por cada restaurante creo un nuevo Marker
//   restaurants.forEach((restaurant) => {
//     const center = {
//       lat: restaurant.location.coordinates[1],
//       lng: restaurant.location.coordinates[0],
//     };
//     const newMarker = new google.maps.Marker({
//       position: center,
//       map: map,
//       title: restaurant.name,
//     });
//     markers.push(newMarker);
//   });

//   // 9. Instrucciones: Finalmente retorno los markers por si los necesitase a futuro
//   return markers;
// }
