import * as dotenv from "dotenv";
dotenv.config();

const url = "https://api.openai.com/v1/engines/text-davinci-003/completions";
const apiKey = process.env.OPENAI_KEY;

const useAi = async (prompt = null) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      temperature: 0.9,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 2,
      presence_penalty: 0.6,
      prompt,
      stop: ["###"],
    }),
  });

  const responseJSON = await response.json();
  console.log(responseJSON);

  return responseJSON.choices[0].text.replace(/^\n\n/, "");
};

const getChatGPTAnswer = async (prompt) => {
  let isEnd = false;
  let sendMsg = prompt + "###\n";

  do {
    const recieveMsg = await useAi(sendMsg);
    sendMsg = sendMsg + recieveMsg;
    isEnd = recieveMsg.length === 0;
    console.log(sendMsg);
  } while (!isEnd);

  return sendMsg.replace("###", "");
};

export default getChatGPTAnswer;
