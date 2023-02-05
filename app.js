import linebot from "linebot";
import * as dotenv from "dotenv";
import getSearchResult from "./helpers/customSearch.js";
import useAi from "./helpers/chatGPT.js";
dotenv.config();

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

bot.on("message", async (event) => {
  try {
    // const prompt = await getSearchResult(event.message.text);
    const answer = await useAi(event.message.text);

    await event.reply(answer);
  } catch (err) {
    console.log(err);
  }
});

bot.listen("/linebot", 8080, () => {
  console.log("line bot running on port 8080");
});
