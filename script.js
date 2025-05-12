const container = document.querySelector('.container');
const search = document.querySelector('.boxSearch button');
const boxClima = document.querySelector('.boxClima');
const climaDetails = document.querySelector('.climaDetails');
const erro = document.querySelector('.notFound');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
    const APIKey = '7f718c477054dd8e21a6b3b2c82a4d19';
    const city = document.querySelector('.boxSearch input').value.trim();

    if (city === '') {
        alert('Por favor, insira o nome de uma cidade.');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                cityHide.textContent = city;
                container.style.height = '400px';
                boxClima.classList.remove('active');
                climaDetails.classList.remove('active');
                erro.classList.add('active');
                return;
            }

            // Atualizar elementos com os dados da API
            const image = document.querySelector('.boxClima img');
            const temperatura = document.querySelector('.boxClima .temperatura');
            const descricao = document.querySelector('.boxClima .descricao');
            const umidade = document.querySelector('.climaDetails .umidade span');
            const vento = document.querySelector('.climaDetails .vento span');

            // Atualizar apenas se a cidade for diferente
            if (cityHide.textContent !== city) {
                cityHide.textContent = city;

                container.style.height = '555px';
                boxClima.classList.add('active');
                climaDetails.classList.add('active');
                erro.classList.remove('active');

                // Atualizar imagem do clima
                switch (json.weather[0].main) {
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

                // Atualizar valores de temperatura, descrição, umidade e vento
                temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                descricao.innerHTML = `${json.weather[0].description}`;
                umidade.textContent = `${json.main.humidity}%`;
                vento.textContent = `${parseInt(json.wind.speed)}km/h`;

                // Adicionar classe .active para exibir os elementos
                climaDetails.classList.add('active');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar os dados da API:', error);
        });
});