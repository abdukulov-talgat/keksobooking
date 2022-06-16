const ACTION_URL = 'https://25.javascript.pages.academy/keksobooking';

/**
 * Sends Data to the server.
 * @param {FormData} body - Form data to the send
 * @param success - calls when success occuired
 * @param error - calls when error occuired
 */
function sendData(body, success, error) {
  fetch(ACTION_URL, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      if (success) {
        success();
        console.log('Sending data... success');
      }
    })
    .catch((er) => {
      if (error) {
        error(er);
        console.log(`Sending data... error: ${er}`);
      }
    });
}


export { sendData };
