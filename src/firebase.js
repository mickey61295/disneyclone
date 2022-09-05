import firebase from 'firebase'

const firebaseConfig = {
	apiKey: 'AIzaSyDnJnYJ94ItuNT7ja8XN9JXT0EUCUFqLAo',
	authDomain: 'disney-clone-7d133.firebaseapp.com',
	projectId: 'disney-clone-7d133',
	storageBucket: 'disney-clone-7d133.appspot.com',
	messagingSenderId: '876509325252',
	appId: '1:876509325252:web:0f77fab315d3d2a4fea691',
	measurementId: 'G-9CP0P1JMVY',
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
