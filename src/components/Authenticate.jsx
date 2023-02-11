import Form from "./Form";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { FirebaseSignInProvider } from "@firebase/util";

const Authenticate = () => {
	const { authenticate } = useAuth();
	const navigate = useNavigate();

	const [error, setError] = useState({});

	const onSubmit = async (data) => {
		console.log(data);
		authenticate(data.email, data.password)
			.then((data) => {
				console.log(data);
				navigate("/");
			})
			.catch((error) => {
				console.log(error.code);
				console.log(error.message);
				if (error.code == "auth/wrong-password") {
					setError({ name: "password", message: error.code })
				}
				else {
					setError({ name: "email", message: error.code })
				}
			})
	}

	return (
		<Form onSubmit={onSubmit} title="Authenticate" errorMessage={error} />
	);
}

export default Authenticate;