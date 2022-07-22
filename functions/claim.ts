import { Handler } from "@netlify/functions";
import { isClaimable, setWordClaimed } from "./lib/firestore";
import { sendFunds } from "./lib/blockchain";

const handler: Handler = async (event, context) => {
  let status = 200;
  let message;

  const { word, address } = event.queryStringParameters;

  if (!(await isClaimable(word))) {
    status = 423;
    message = { message: "No claimable" };
  } else {
    const tx = await sendFunds(address);

    await setWordClaimed(word, address, tx);
    message = {
      tx,
      address,
    };
  }

  return {
    statusCode: status,
    body: JSON.stringify(message),
  };
};

export { handler };
