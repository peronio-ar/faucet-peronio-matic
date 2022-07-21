const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");

const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Initialize Firebase
initializeApp({
  credential: cert(serviceAccount),
});
const db = getFirestore();

// **** FUNCTIONS **** //

/**
 * Checks if word already claimed
 * @param {String} word Word
 * @returns
 */
exports.isClaimable = async (word) => {
  const wordRef = db.collection("words").doc(word);
  const doc = await wordRef.get();
  if (!doc.exists) {
    return false;
  }
  return await !doc.data().claimed;
};

/**
 * Set word as claimed
 * @param {String} word
 * @param {String} address
 * @param {String} tx
 * @returns
 */
exports.setWordClaimed = async (word, address, tx) => {
  const doc = await db.collection("words").doc(word);
  return doc.update({
    claimed: true,
    address,
    tx,
  });
};

/**
 * Adds new word to dictionary
 * @param {String} word
 * @returns
 */
exports.addWord = async (word) => {
  return await db
    .collection("words")
    .doc(word)
    .set({
      claimed: false,
    });
};
