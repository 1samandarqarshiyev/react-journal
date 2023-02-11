import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Nav = () => {
	const { currentUser, exit } = useAuth();
	const navigate = useNavigate();
	const handleBack = (e) => {
		navigate(-1);
	}

	const handleExit = () => exit();

	return (
		<div className="flex justify-between m-3 sticky text-violet-800
		underline underline-offset-4 decoration-slate-600/30 font-mono font-extrabold">
			<div className="flex justify-start gap-5">
				<h1 onClick={handleBack} className="cursor-pointer">back</h1>
			</div>
			<div className="flex justify-end gap-3 decoration-slate-600/30 ">
				<h1 className="text-slate-700/40">{currentUser && currentUser.email}</h1>
				{currentUser ?
					<Link to="/authenticate" onClick={handleExit} className="hover:decoration-black transition-colors">exit</Link>
					:
					<>
						<Link to="/authenticate" className="hover:decoration-black transition-colors">authenticate</Link>
						<Link to="/register" className="hover:decoration-black transition-colors">register</Link>
					</>
				}
			</div>
		</div>
	);
};

export default Nav;
