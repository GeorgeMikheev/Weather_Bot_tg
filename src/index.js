const tgAPI = require("node-telegram-bot-api");
const dotenv = require('dotenv');
const {getWeather} = require('./api.js');
dotenv.config();

const bot = new tgAPI(process.env.TOKEN, { polling: true });

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
