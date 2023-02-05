import * as dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GOOGLE_SEARCH_KEY;
const cx = process.env.GOOGLE_SEARCH_CX;
const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}`;

const getSearchResult = async (query) => {
  try {
    const response = await fetch(`${url}&q=${query}`);
    const searchData = await response.json();
    const data = searchData.items.slice(0, 5);
    console.log(data);

    const results = data.map((item) => item.link);

    return results.join("\n");
  } catch (err) {
    console.log(err);
  }
};

export default getSearchResult;
