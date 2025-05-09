const container = document.querySelector('.container');
const search = document.querySelector('.boxSearch button');
const boxClima = document.querySelector('.boxClima');
const climaDetails = document.querySelector('.climaDetails');

search.addEventListener('click', () => {

    const APIKey = '7f718c477054dd8e21a6b3b2c82a4d19';
    const city = document.querySelector('.boxSearch input').value;

    if(city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
        const image = document.querySelector('.boxClima img');
        const temperatura = document.querySelector('.boxClima .temperatura');
        const descricao = document.querySelector('.boxClima .descricao');
        const umidade = document.querySelector('.climaDetails .umidade span');
        const vento = document.querySelector('.climaDetails .vento span');

        switch(json.weather[0].main) {
            case 'Clear':
                image.src = 'assets/Sol.PNG';
                break;
            case 'Rain':
                image.src = 'assets/Chuva.PNG';
                break;
            case 'Snow':
                image.src = 'assets/nevando.PNG';
                break;
            case 'Clouds':
                image.src = 'assets/Nublado.PNG';
                break;
            case 'Mist':
                image.src = 'assets/mist.PNG';
                break;
            default:
                image.src = 'assets/Nublado.PNG';
        }

        temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        descricao.innerHTML = `${json.weather[0].description}`;
        umidade.innerHTML = `${json.main.humidity}%`;
        vento.innerHTML = `${parseInt(json.wind.speed)}km/h`;

    });

})