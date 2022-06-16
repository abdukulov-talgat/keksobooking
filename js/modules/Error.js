const frag = document.querySelector('#error');
const onWindowEscKeyDown = Symbol('onWindowEscKeyDown');

function Error() {
  const message = frag.content.querySelector('.error').cloneNode(true);
  this.destroy = function () {
    message.remove();
    window.removeEventListener('keydown', this[onWindowEscKeyDown]);
  };
  this[onWindowEscKeyDown] = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };

  window.addEventListener('keydown', this[onWindowEscKeyDown]);
  message.addEventListener('click', (evt) => {
    if (evt.target === message) {
      this.destroy();
    }
  });
  message.querySelector('.error__button').addEventListener('click', () => this.destroy());

  document.body.append(message);
}


export { Error };
