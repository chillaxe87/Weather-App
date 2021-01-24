console.log('Client side javascript is running')

const weatherForm = document.querySelector('form')
const searchEl = document.querySelector('input')

const forecastMessage = document.getElementById('forecast_message')
const errorMessage = document.getElementById('error_message')
const port = process.env.PORT || 3000

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = searchEl.value
    forecastMessage.innerHTML = ''
    errorMessage.innerHTML = 'Loading...'
    fetch(`/weather?address=${location}`).then((res)=>{
    res.json().then((data) =>{
        if(data.error){
            errorMessage.innerHTML = data.error 
        } else {
            forecastMessage.innerHTML = data.location
            errorMessage.innerHTML = data.forecast
        }
    })
})
}) 