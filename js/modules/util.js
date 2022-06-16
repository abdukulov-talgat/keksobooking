const ACCEPT_TYPES = [
  'jpg',
  'jpeg',
  'png',
];

function isImg(file) {
  if (file) {
    return ACCEPT_TYPES.some((it) => file.name.endsWith(it));
  }
  return false;
}


export { isImg };
