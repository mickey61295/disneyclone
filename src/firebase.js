import firebase from 'firebase'

const firebaseConfig = {
	apiKey: process.env.REACT_APP_APIKEY,
	authDomain: process.env.REACT_APP_AUTHDOMAIN,
	projectId: process.env.REACT_APP_PROJECTID,
	storageBucket: process.env.REACT_APP_STORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_MSID,
	appId: process.env.REACT_APP_APPID,
	measurementId: process.env.REACT_APP_MESID,
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const storage = firebase.storage()

export const createUserProfileDoc = async (userAuth, additionalData) => {
	if (!userAuth) return
	const user = await db.doc(`users/${userAuth.uid}`)
	const snapShot = await user.get()
	if (!snapShot.exists) {
		const { displayName, email } = userAuth
		const createdAt = new Date()
		try {
			await user.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			})
		} catch (e) {
			console.log('Error Message: ', e.message)
		}
	}
	return user
}

export const addLocDataToDb = async (collectionKey, { movies }) => {
	const collectionRef = db.collection(collectionKey)
	const batch = db.batch()

	Object.keys(movies).forEach((el) => {
		const newDoc = collectionRef.doc()
		batch.set(newDoc, movies[el])
	})

	console.log(batch, collectionRef)
	return await batch.commit()
}

export { auth, provider, storage }

export default db
