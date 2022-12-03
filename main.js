const { Telegraf } = require("telegraf");
const fetch = require("node-fetch");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);
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
  getCurrentlyAyats(ayatIndex);
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
  getCurrentlyAyats(ayatIndex);
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

// bot.on("text", async (ctx) => {
//   try {
//     const user = ctx?.update?.message?.from;
//     const message = ctx?.update?.message?.text;
//     if (message?.toLowerCase()?.includes("сура") && suraIndex != 114) {
//       suraIndex = parseInt(message?.split(" ")[1]);
//       ayatIndex = 1;
//     }
//     if (message?.toLowerCase()?.includes("аять") && ayansCopy?.length != ayatIndex) {
//       ayatIndex = parseInt(message?.split(" ")[1]);
//     }

//     const response = await fetch(`https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/ru/${suraIndex}.json`);
//     const data = await response.json();
//     ayansCopy = data?.verses;
//     const answer = data?.verses[ayatIndex - 1];
//     if (answer?.translation) {
//       ctx.reply(
//         `${data?.translation}
//         ${answer?.translation}`,
//         {
//           reply_markup: {
//             keyboard: [
//               [
//                 { text: `Сура ${suraIndex != 1 ? suraIndex - 1 : suraIndex}` },
//                 { text: `Сура ${suraIndex}` },
//                 { text: `Сура ${suraIndex + 1}` },
//               ],
//               [
//                 { text: `Аять ${ayatIndex != 1 ? ayatIndex - 1 : ayatIndex}` },
//                 { text: `Аять ${ayatIndex}` },
//                 { text: `Аять ${ayatIndex + 1}` },
//               ],
//             ],
//           },
//         }
//       );
//     }
//   } catch (e) {
//     console.log(e);
//   }
// });

// ctx.reply("Hello", {
//   reply_markup: {
//     inline_keyboard: [[{ text: "go", web_app: { url: "https://www.youtube.com/" } }]],
//   },
// });

//https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/ru/1.json
// const response = await fetch("https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_ru.json");
// const data = await response.json();
// data?.map(async (item) => {
//   ctx.reply(item?.translation);
//   // await ctx.replyWithPhoto(item?.image )
// });

// ctx.reply("Hi there!", {
//     reply_markup: {
//         inline_keyboard: [
//             /* Inline buttons. 2 side-by-side */
//             [ { text: "Button 1", callback_data: "btn-1" }, { text: "Button 2", callback_data: "btn-2" } ],

//             /* One button */
//             [ { text: "Next", callback_data: "next" } ],

//             /* Also, we can have URL buttons. */
//             [ { text: "Open in browser", url: "telegraf.js.org" } ]
//         ]
//     }
// });

// ctx.reply('Hello', {
//     reply_markup: {
//         inline_keyboard: [
//             [{ text: "go", web_app: { url: 'https://www.google.com/' } }],
//         ]
//     }
// })
