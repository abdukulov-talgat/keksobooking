function Point(lat, lng) {
  this.lat = lat;
  this.lng = lng;
  this.toPrimitive = () => `${this.lat.toFixed(5)}, ${this.lng.toFixed(5)}`;
}


export { Point };
