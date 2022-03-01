// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = '9b1e7e17aae10d0c45e22cd048582ac8&units=metric';

// Event listener to add function to existing HTML DOM element
document.querySelector('#generate').addEventListener('click', () => {
  /* Function called by event listener */
  const userResponse = document.querySelector('#feelings').value;
  getWeatherData().then((value) => {
    console.log(value);
    postData('/postData', {
      temperature: value.main.temp,
      date: newDate,
      userResponse: userResponse,
    }).then(() => {
      ui();
    });
  });
});

/* Function to GET Web API Data*/
const getWeatherData = async () => {
  const userZipCode = document.querySelector('#zip').value;
  // Fetch Weather from API
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?zip=${userZipCode},us&appid=${apiKey}`
  );
  try {
    const responseData = await response.json();
    return responseData;
    // logging errors if there're any
  } catch (err) {
    console.log(err);
  }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  console.log(data);
  const res = await fetch(url, {
    method: 'POST',
    credentials: `same-origin`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const serverData = await res.json();
    console.log(serverData);
    return serverData;
  } catch (err) {
    console.log(err);
  }
};
/* Function to GET Project Data */
const ui = async () => {
  const getData = await fetch('/getData');
  try {
    const uiData = await getData.json();
    document.querySelector('#date').innerHTML = `Date: ${uiData.date}`;
    document.querySelector('#temp').innerHTML = `Temp: ${uiData.temperature} F`;
    document.querySelector(
      '#content'
    ).innerHTML = `I am Feeling ${uiData.userResponse}.`;
  } catch (err) {
    console.log(err);
  }
};
