import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase-utilities";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	currentUser
} from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState()
	const [loading, setLoading] = useState(true)

	function register(email, password) {
		// auth.createUserWithEmailAndPassword()
		return createUserWithEmailAndPassword(auth, email, password)

	}

	function authenticate(email, password) {
		return signInWithEmailAndPassword(auth, email, password)
	}

	function exit() {
		return signOut(auth)
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email)
	}

	function updateEmail(email) {
		return currentUser.updateEmail(email)
	}

	function updatePassword(password) {
		return currentUser.updatePassword(password)
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user)
			setLoading(false)
		})

		return unsubscribe
	}, [])

	const value = {
		currentUser,
		authenticate,
		register,
		exit,
		resetPassword,
		updateEmail,
		updatePassword
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	)
}