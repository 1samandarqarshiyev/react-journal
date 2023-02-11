import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDocs, query, where } from "firebase/firestore";
import { journalsCollection } from "../firebase-utilities";
import { motion } from "framer-motion";

export const Entries = (props) => {
	const { refresh, userEmail } = props;
	// console.log(userEmail);
	const [journalData, setJournalData] = useState();

	useEffect(() => {
		const getEntries = async () => {
			const q = query(journalsCollection, where("user", "==", userEmail));
			const data = await getDocs(q);
			// console.log(data);
			const sortedData = resultsSort(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			setJournalData(sortedData);
		};
		getEntries();
		// eslint-disable-next-line
	}, [refresh]);

	const resultsSort = (resultsArr) => {
		return resultsArr.sort(function (a, b) {
			return b.date.toDate() - a.date.toDate();
		});
	}

	const container = {
		hidden: {
			opacity: 0, transition: {
				when: 'afterChildren',
			},
		},
		show: {
			opacity: 1,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.1,
				// delay: 0.3,
			},

		}
	}

	const item = {
		hidden: { x: -50, opacity: 0 },
		show: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 70 } }
	}

	return (
		<div className="container mx-auto p-5 max-w-3xl">
			{
				journalData &&
				<motion.ul
					initial="hidden"
					animate="show"
					variants={container}
				>
					{journalData.map((elem, idx) => (
						<Link to={"entry/" + elem.id}>

							<motion.li
								key={idx}
								variants={item}
								whileHover={{
									translateX: 5, transition: { duration: 0.2 },
								}}
								className="bg-neutral-50 rounded border-2 border-violet-500/30 mb-2 p-3 
								hover:bg-neutral-100 transition-colors text-lg font-semibold font-code uppercase"
							>
								{elem.date.toDate().toGMTString()}
							</motion.li>
						</Link>
					))}
				</motion.ul>
			}
		</div >
	);
};
