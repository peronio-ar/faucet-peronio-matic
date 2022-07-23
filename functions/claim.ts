import { Handler } from "@netlify/functions";
import { isClaimable, setWordClaimed, log } from "./lib/firestore";
import { sendFunds } from "./lib/blockchain";

const handler: Handler = async (event) => {
  log("request", event);
  if (event.httpMethod !== "POST") {
    log("error", { error: 405 });
    return {
      statusCode: 405,
      body: JSON.stringify("Must be POST"),
    };
  }

  let { word, address } = JSON.parse(event.body ?? "");

  word = word.toLowerCase().trim();
  console.info("word", word);
  console.info("address", address);
  log("data", { word, address });
  if (!(await isClaimable(word))) {
    log("not claimable", { word, address });
    log("error", { error: 403 });
    console.info("Not claimable", address);
    return {
      statusCode: 403,
      body: JSON.stringify({ message: "No claimable" }),
    };
  } else {
    log("set_claimed", { word, address });
    console.info("Setting as claimed...");
    await setWordClaimed(word, address, "sending");
    console.info("Sending funds...");
    log("send_funds", { word, address });
    const tx = await sendFunds(address);
    console.info("Tx:", tx);
    console.info("Link:", "https://polygonscan.com/tx/" + tx);
    log("update_claimed", { word, address });
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
