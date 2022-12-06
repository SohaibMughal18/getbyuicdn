const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('./cred.json')

  initializeApp({
    credential: cert(serviceAccount)
  });
  const db = getFirestore()
 const Product = db.collection("products");


module.exports = { Product }
module.exports = { db }
