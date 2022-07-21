const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
// const {
//   getFirestore,
//   collection,
//   query,
//   where,
//   getDocs,
//   getDoc,
//   addDoc,
// } = require("@firebase/firestore");

const { getFirestore } = require("firebase-admin/firestore");

// Set Environments variables as Config
const serviceAccount = {
  type: "service_account",
  project_id: "lacrypta-faucet",
  private_key_id: "19baa9641f7a7077b1c2525d232e5739ef507aa0",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9mm7r5cGbob+2\nydIAa0ujqQTEAm0GjDW3pCZDZQ+YifQIr8GmDzdHoDzvCu/4fJ6fr5LOcUbd8FA3\nzfHY4Or84QKv0rqBzEErxF5NwUDrX7e5h1Ay8Cn+cBmyjVz41GxN6mmvBzJpeimO\nis/YksX1OLzEko2cOcpzwutrDhysvS5c7hM672i2yyvqLsZptpRNrwZbgilBJbV9\nvopnqY8iIeoNYjlnSZgABXEqEzu+EfyNv0jh3I+kRfmOouYT5Ni0ZEz1K4Fy2pBJ\nXL2IbU+KGKbbMfK99L09buEcbF01y9pIJX+IhLJ4Uhk+XVYBgGTpYC4RxsYo0//g\nzM9cIGH1AgMBAAECggEAGRY38Ep5cCgvVPYl18cFPmWnVcVPEPti7Xtwp0uAjBmk\ntQmG69E+P+HkbhSFD9xyoy+jPbbLPk5aWX03BLqDHRaAjoGpX8cw0E5ZKUdABGSp\nIIkrhAc25zgvOOrEub+8MiBT/26frZ5rpTVErvkslsz9B7KvE1P/hOBDhJSyF+tt\nfWV0OqZXdB2+ASPfmEZp7pbdXSLUqFR61L474UN9z/FiigmjAZ4YkSV379RhmERN\nEju6jdHrUIoy0gmUN7L/qBNumAOH1ZhZQwjCshNQujJvVYYp0ml29r7ZbNzQw+78\n6SL3D5sLl0gpJSV3iXwHGA/iM2aAn8GdJgRjPMtZuQKBgQD0F0J+O2TGWLrvfB05\nys6yQhgsiAmCnglbm+rt26k8uXVc/raxUA85TRG85K8MaqIjRTHzvbNn5HXl1VRt\n+zFkUCW3aTMtYQsPpTac+un2R4Ymed2hTJcnFLdndDsR28LRTmOgy+A06UxIe6Qv\nnADl1M9KJERJdBk8FmDXAT1yTwKBgQDG2pz9P8kUzZWEXDiJaIFa13ffjayY2Goj\naAtK19+FJTWKiRC+VfrpH4jwM/GngMRXmsI2ugXkOjpMZnRURwP4zE8TzTYTDB38\nz8haDshAFPSCtC88x5y5Zxz9CnnVGf+QG0dnli5shjt5kknFTFaFjY9Y797VPxC1\nMqFjfK6qewKBgC3rRkYLFF1ACgLNnY3mulXMm1GdUfSxmF8UiPCwVzkmRo71GBdp\nUUPdXM3lU40JbnEmLkyFTn/n+coABP8ft14Auee0Mb2CuRr7YLfNeEAtmm4YlPoo\nN3NRsWMT+ZzVc+P+VD3GvOoXTZOBNxUByyVxkIGJKxOKdMjaCOPJxu5/AoGBAJi7\n1vLJKEg7M4krUB1yUFCWyLLDXXs0VimFw46jykG496vFZT/cSFEAcKyWKRkP1T64\nVk20icvnUVnXI6iLtyhEvMQnzU3J88p3SZqqWfKmZbtybAnSA7V/1osgnb0pL9re\nqPSOLHAcldflnZXV8Wq49Q5JhyzhOJMEJWOFo567AoGBALytkItmCP93JG0VCJ+d\nkzfSLPPtd3XYSVxkkfkVaegdnVVLBrCR5imXUPklY9p2A2TWBHqjaND8oQNjOvtc\ndRkVMBRzjfQ+GdwivrOFDpDl/bKwZ8ItBppG/tNGJMpuaT6yll1OEvd0zWKOOZOa\nzqxy4G6ZjJ3tEfAvTQXv6C9Q\n-----END PRIVATE KEY-----\n",
  client_email: "lacrypta-faucet@appspot.gserviceaccount.com",
  client_id: "103598870540874945242",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/lacrypta-faucet%40appspot.gserviceaccount.com",
};

// const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

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
