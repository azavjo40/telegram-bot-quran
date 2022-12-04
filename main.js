const { Telegraf } = require("telegraf");
const fetch = require("node-fetch");

const bot = new Telegraf("5899895577:AAFo8qlFSIS2rqp46H8T9YKw5Em8xOV5WCg");

let suraIndex = 1;
let ayatIndex = 0;
let ayansCopy = [];
let currentlyAyat = {};
let copyData = {};
let language = "ru";

const getButtonsQuran = () => [
  [suraIndex != 1 ? { text: `Предыдущий Сура` } : "", suraIndex != 114 ? { text: `Следующий Сура` } : ""],
  [
    ayatIndex != 0 ? { text: `Предыдущий Аять` } : "",
    ayatIndex != ayansCopy?.length - 1 ? { text: `Следующий Аять` } : "",
  ],
  [{ text: "Открыть Меню" }],
];

const getButtonsLanguage = () => [
  [{ text: "Русский" }, { text: "English" }, { text: "Turkish" }],
  [{ text: "Spanish" }, { text: "French" }, { text: "Swedish" }],
  [{ text: "Закрыть Меню" }],
];

const getButtonsWeb = () => [[{ text: "Посмотреть Веб-сайт", web_app: { url: `https://quran.com/${suraIndex}` } }]];

const getSuras = async (index) => {
  const response = await fetch(`https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/${language}/${index}.json`);
  const data = await response.json();
  copyData = data;
  ayansCopy = [...data?.verses];
  suraIndex = index;
  return response;
};

const getCurrentlyAyats = (index) => {
  currentlyAyat = ayansCopy[index];
  ayatIndex = index;
};

const init = async (lan) => {
  language = lan;
  await getSuras(1);
  getCurrentlyAyats(0);
  ayatIndex = 0;
};

bot.start(async (ctx) => {
  await init("ru");
  if (currentlyAyat?.translation) {
    ctx.reply(`Сура ${copyData?.translation} ${suraIndex}`);
    setTimeout(() => {
      ctx.reply(currentlyAyat?.translation, {
        reply_markup: {
            keyboard: getButtonsQuran(),
        }
      });
    }, 500);
  }
});

bot.hears("Предыдущий Сура", async (ctx) => {
  await getSuras(suraIndex - 1);
  getCurrentlyAyats(0);
  if (currentlyAyat?.translation) {
    ctx.reply(`Сура ${copyData?.translation} ${suraIndex}`);
    setTimeout(() => {
      ctx.reply(currentlyAyat?.translation, {
        reply_markup: {
          keyboard: getButtonsQuran(),
          inline_keyboard: getButtonsWeb,
        },
      });
    }, 500);
  }
});

bot.hears("Следующий Сура", async (ctx) => {
  await getSuras(suraIndex + 1);
  getCurrentlyAyats(0);
  if (currentlyAyat?.translation) {
    ctx.reply(`Сура ${copyData?.translation} ${suraIndex}`);
    setTimeout(() => {
      ctx.reply(currentlyAyat?.translation, {
        reply_markup: {
          keyboard: getButtonsQuran(),
        },
      });
    }, 500);
  }
});

bot.hears("Предыдущий Аять", (ctx) => {
  getCurrentlyAyats(ayatIndex - 1);
  if (currentlyAyat?.translation) {
    setTimeout(() => {
      ctx.reply(currentlyAyat?.translation, {
        reply_markup: {
          keyboard: getButtonsQuran(),
        },
      });
    }, 500);
  }
});

bot.hears("Следующий Аять", (ctx) => {
  getCurrentlyAyats(ayatIndex + 1);
  if (currentlyAyat?.translation) {
    setTimeout(() => {
      ctx.reply(currentlyAyat?.translation, {
        reply_markup: {
          keyboard: getButtonsQuran(),
        },
      });
    }, 500);
  }
});

bot.hears("Открыть Меню", (ctx) => {
  ctx.reply("Открыть Меню", {
    reply_markup: {
      keyboard: getButtonsLanguage(),
    },
  });
});

bot.hears("Закрыть Меню", (ctx) => {
  ctx.reply("Закрыть Меню", {
    reply_markup: {
      keyboard: getButtonsQuran(),
    },
  });
});

bot.hears("Русский", async (ctx) => {
  await init("ru");
  if (currentlyAyat?.translation) {
    ctx.reply(`Сура ${copyData?.translation} ${suraIndex}`);
    setTimeout(() => {
      ctx.reply(currentlyAyat?.translation, {
        reply_markup: {
          keyboard: getButtonsQuran(),
        },
      });
    }, 500);
  }
});

bot.hears("English", async (ctx) => {
  await init("en");
  if (currentlyAyat?.translation) {
    ctx.reply(`Сура ${copyData?.translation} ${suraIndex}`);
    setTimeout(() => {
      ctx.reply(currentlyAyat?.translation, {
        reply_markup: {
          keyboard: getButtonsQuran(),
        },
      });
    }, 500);
  }
});

bot.hears("Turkish", async (ctx) => {
  await init("tr");
  if (currentlyAyat?.translation) {
    ctx.reply(`Сура ${copyData?.translation} ${suraIndex}`);
    setTimeout(() => {
      ctx.reply(currentlyAyat?.translation, {
        reply_markup: {
          keyboard: getButtonsQuran(),
        },
      });
    }, 500);
  }
});

bot.hears("Spanish", async (ctx) => {
  await init("es");
  if (currentlyAyat?.translation) {
    ctx.reply(`Сура ${copyData?.translation} ${suraIndex}`);
    setTimeout(() => {
      ctx.reply(currentlyAyat?.translation, {
        reply_markup: {
          keyboard: getButtonsQuran(),
        },
      });
    }, 500);
  }
});

bot.hears("French", async (ctx) => {
  await init("fr");
  if (currentlyAyat?.translation) {
    ctx.reply(`Сура ${copyData?.translation} ${suraIndex}`);
    setTimeout(() => {
      ctx.reply(currentlyAyat?.translation, {
        reply_markup: {
          keyboard: getButtonsQuran(),
        },
      });
    }, 500);
  }
});

bot.hears("Swedish", async (ctx) => {
  await init("sv");
  if (currentlyAyat?.translation) {
    ctx.reply(`Сура ${copyData?.translation} ${suraIndex}`);
    setTimeout(() => {
      ctx.reply(currentlyAyat?.translation, {
        reply_markup: {
          keyboard: getButtonsQuran(),
        },
      });
    }, 500);
  }
});

bot.launch();

// inline bitton
//     reply_markup: {
//         inline_keyboard: [
//             [{ text: "go", web_app: { url: 'https://www.google.com/' } }],
//         ]
//     }