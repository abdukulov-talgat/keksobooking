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
      }
    })
    .catch((er) => {
      if (error) {
        error(er);
      }
    });
}

function getData(success, error) {
  fetch(`${ACTION_URL}/data`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((json) => success(json))
    .catch((er) => {
      if (error) {
        error(er);
      }
    });
}


export { sendData, getData };
