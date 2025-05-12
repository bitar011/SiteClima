const container = document.querySelector('.container');
const search = document.querySelector('.boxSearch button');
const boxClima = document.querySelector('.boxClima');
const climaDetails = document.querySelector('.climaDetails');
const erro = document.querySelector('.notFound');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {

    const APIKey = '7f718c477054dd8e21a6b3b2c82a4d19';
    const city = document.querySelector('.boxSearch input').value;

    if(city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
        
        if(json.cod == '404') {
            cityHide.textContent = city;
            container.style.height = '400px';
            boxClima.classList.remove('active');
            climaDetails.classList.remove('active');
            erro.classList.add('active');
            return;
        }
        
        
        
        const image = document.querySelector('.boxClima img');
        const temperatura = document.querySelector('.boxClima .temperatura');
        const descricao = document.querySelector('.boxClima .descricao');
        const umidade = document.querySelector('.climaDetails .umidade span');
        const vento = document.querySelector('.climaDetails .vento span');

        if(cityHide.textContent == city){
            return;
        }
        else{
            cityHide.textContent = city;

            container.style.height = '555px';
            container.classList.add('active');
            boxClima.classList.add('active');
            climaDetails.classList.add('active');
            erro.classList.remove('active');

            setTimeout(() => {
                container.classList.remove('active');
            }, 2500);

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

        const climaDetails = document.querySelector('.climaDetails');
        const infoUmidade = document.querySelector('.infoUmidade');
        const infoVento = document.querySelector('.infoVento');

        const elCloneClimaDetails = climaDetails.cloneNode(true);
        const elCloneInfoUmidade = infoUmidade.cloneNode(true);
        const elCloneInfoVento = infoVento.cloneNode(true);
        
        elCloneClimaDetails.id = 'cloneClimaDetails';
        elCloneClimaDetails.classList.add('active-clone');

        elCloneInfoUmidade.id = 'cloneInfoUmidade';
        elCloneInfoUmidade.classList.add('active-clone');

        elCloneInfoVento.id = 'cloneInfoVento';
        elCloneInfoVento.classList.add('active-clone');

        setTimeout(() => {
            climaDetails.insertAdjacentElement("afterend", elCloneClimaDetails);
            infoUmidade.insertAdjacentElement("afterend", elCloneInfoUmidade);
            infoVento.insertAdjacentElement("afterend", elCloneInfoVento);
        }, 2200);

        const cloneClimaDetails = document.querySelectorAll('.climaDetails.active-clone');
        const totalCloneClimaDetails = cloneClimaDetails.length;
        const cloneClimaDetailsFirst = cloneClimaDetails[0];

        const cloneInfoUmidade = document.querySelectorAll('.infoUmidade.active-clone');
        const cloneInfoUmidadeFirst = cloneInfoUmidade[0];

        const cloneInfoVento = document.querySelectorAll('.infoVento.active-clone');
        const cloneInfoVentoFirst = cloneInfoVento[0];

        if(totalCloneClimaDetails > 0){
            cloneClimaDetailsFirst.classList.remove('active-clone');
            cloneInfoUmidadeFirst.classList.remove('active-clone');
            cloneInfoVentoFirst.classList.remove('active-clone');

            setTimeout(() => {
                cloneClimaDetailsFirst.remove();
                cloneInfoUmidadeFirst.remove();
                cloneInfoVentoFirst.remove();
            }, 2200);
        }
    }

    });

})