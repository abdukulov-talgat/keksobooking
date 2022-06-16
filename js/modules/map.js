function initMap(cb) {
  const point = {
    lat: 35.68605009794157,
    lng: 139.75308597955956
  };

  const map = L.map(document.querySelector('#map-canvas'));
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
  }).addTo(map);
  map.on('load', cb);
  map.setView(point, 13);
}


export { initMap };
