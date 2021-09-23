

//Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=451c2935e55ba56f647fae44feab5500&units=metric';

//Global Variables 
//Generate Temperature Button
const submit = document.getElementById('generate');

//Function called by event listener
submit.addEventListener('click', function () {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const errorZip = document.getElementById('errorZip');
    const d = new Date();
    const newDate = d.getDate() + '.' + (d.getMonth()+1) + '.' + d.getFullYear();
    getApi(baseURL + zipCode + apiKey)
        .then(function (data) {
            try {
                postData('/postData', {
                    cityZipCode: zipCode,
                    feelings: feelings,
                    date: newDate,
                    cityName: data.name,
                    cityTemp: data.main.temp
                })
                    .then(
                        updateUI()
                    );
                errorZip.innerHTML = '';
            } catch (error) {
                errorZip.innerHTML = 'Zip code undefined, please enter defined Zip code';
                console.log('error', error);
            }
        });
});

// Function to GET Web API Data
const getApi = async (url) => {
    const response = await fetch(url);
    try {
        const data = await response.json();
        return data
    } catch (error) {
        console.log('error', error);
    }
};

//Function to POST data 
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    };
};

//Function to GET Project Data
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('city').innerHTML = `City: ${allData.city}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temp}°C`;
        document.getElementById('feeling').innerHTML = `Feeling: ${allData.content}`;
    } catch (error) {
        console.log("error", error);
    }
}