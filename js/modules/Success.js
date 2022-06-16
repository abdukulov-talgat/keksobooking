const frag = document.querySelector('#success');
const onWindowEscKeyDown = Symbol('onWindowEscKeyDown');

function Success() {
  const message = frag.content.querySelector('.success').cloneNode(true);
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
  message.addEventListener('click', () => this.destroy());

  document.body.append(message);
}


export { Success };
