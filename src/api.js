module.exports = {
    getWeather: function(city) {
        return fetch(`https://wttr.in/${city}?lang=ru&format=3`).then((res) => {
        if (res.ok) {
            return res.text();
        }
    
        return `Похоже возникла ошибка на сервере либо вы допустили ошибку в названии города. Код ошибки: ${res.status}`;
        });
    }
}