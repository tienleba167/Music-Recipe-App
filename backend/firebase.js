const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cs411-project-87e5a-default-rtdb.firebaseio.com"
});

const database = admin.database();

module.exports = { database, admin };
