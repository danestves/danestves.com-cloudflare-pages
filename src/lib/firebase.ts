// Dependencies
import admin from 'firebase-admin'

// Credentials
import { getDecryptedSecret } from './google/decret-secret'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(getDecryptedSecret()),
    databaseURL: 'https://danestves.firebaseio.com',
  })
}

export default admin.firestore()
