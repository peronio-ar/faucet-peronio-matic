import { Handler } from "@netlify/functions";
import { isClaimable, setWordClaimed } from "./lib/firestore";

const handler: Handler = async (event, context) => {
  let status = 200;
  let message;

  const address = "0xdirearecibir";
  const word = "achilles";

  if (!(await isClaimable(word))) {
    status = 423;
    message = { message: "No claimable" };
  } else {
    const tx = "0x234324234234";
    // tx = await faucetClaim(address);

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
