const tgAPI = require("node-telegram-bot-api");
const token = "7052666916:AAEP9YvzMIY12ourGCsBKYbd3OaRvvqZXmY";
const bot = new tgAPI(token, { polling: true });

bot.on("message", (msg) => {
  const text = msg.text;
  const chatID = msg.chat.id;

  if (text === "/start") {
    bot.sendMessage(
      chatID,
      "Добро пожаловать в мой бот. Введите название своего города, что бы узнать погоду актуальную на данный момент."
    );
  } else {
    getWeather(text)
      .then((res) => {
        bot.sendMessage(chatID, res);
      })
      .catch((err) => {
        bot.sendMessage(
          chatID,
          `Похоже на сервере произошла ошибка, либо вы допустили ошибку при написании названия города. Код ошибки: ${err}`
        );
      });
  }
});

function getWeather(city) {
  return fetch(`https://wttr.in/${city}?lang=ru&format=3`).then((res) => {
    if (res.ok) {
      return res.text();
    }

    return `Похоже возникла ошибка на сервере либо вы допустили ошибку в названии города. Код ошибки: ${res.status}`;
  });
}
