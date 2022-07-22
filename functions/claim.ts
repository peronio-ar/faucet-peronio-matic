import { Handler } from "@netlify/functions";
import { isClaimable, setWordClaimed } from "./lib/firestore";
import { sendFunds } from "./lib/blockchain";

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify("Must be POST"),
    };
  }

  console.dir(event);
  const { word, address } = JSON.parse(event.body ?? "");

  console.info("word", word);
  console.info("address", address);
  if (!(await isClaimable(word))) {
    console.info("Not claimable", address);
    return {
      statusCode: 403,
      body: JSON.stringify({ message: "No claimable" }),
    };
  } else {
    console.info("Setting as claimed...");
    await setWordClaimed(word, address, "sending");
    console.info("Sending funds...");
    const tx = await sendFunds(address);
    console.info("Tx:", tx);
    console.info("Link:", "https://polygonscan.com/tx/" + tx);
    setWordClaimed(word, address, tx);

    return {
      statusCode: 200,
      body: JSON.stringify({
        tx,
        address,
      }),
    };
  }
};

export { handler };
