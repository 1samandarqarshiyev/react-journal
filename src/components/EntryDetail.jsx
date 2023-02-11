import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db, updateEntry, deleteEntry } from "../firebase-utilities";
import { motion } from "framer-motion";

// const EntryText = () => {

// }


const EntryDetail = () => {

	const { id } = useParams();
	const navigate = useNavigate();

	const [journalData, setJournalData] = useState([]);
	const [notEditing, setNotEditing] = useState(true);
	const [journalText, setJournalText] = useState("");
	const [textBuffer, setTextBuffer] = useState("");

	useEffect(() => {
		// console.log('triggered');
		const getEntry = async (entryID) => {
			// console.log(entryID);
			const journalDocRef = doc(db, "journals", entryID);
			let journalDoc = await getDoc(journalDocRef);
			journalDoc = journalDoc.data();
			// journalDoc = {...journalDoc.data(), date: journalDoc.date.toDate()};
			// console.log(journalDoc)
			setJournalData(journalDoc);
			// setJournalText(journalData.content);
			setTextBuffer(journalData.content);
		};
		getEntry(id);
		// eslint-disable-next-line
	}, [textBuffer]);

	const handleEdit = () => {
		setNotEditing(false);
		// await updateEntry(id, {
		// 	content: ""
		// })
		console.log("Edited");
	}

	const handleDelete = async () => {
		// let confirmation = confirm("Are you sure?");
		if (!window.confirm("Are you sure?")) return;
		console.log("Deleted");
		await deleteEntry(id)
		navigate("/")
	}

	const handleInput = (e) => {
		const val = e.target.value;
		setJournalText(val);
	}

	const handleSave = async (e) => {
		setNotEditing(true);
		if (journalText === "") {
			setJournalText(textBuffer);
		}
		await updateEntry(id, {
			content: journalText
		})
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
				staggerChildren: 5,
				// delay: 0.3,
			},

		}
	}

	const item = {
		hidden: { scale: 0, opacity: 0 },
		show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 130, delay: 0.5 } }
	}

	return (
		<motion.div
			// initial={{ opacity: 0 }}
			// animate={{ opacity: 1 }}
			// transition={{ duration: 0.8 }}
			className="container mx-auto p-5 max-w-3xl" key={journalData.id}>
			{/* <pre>{new String(journalData.date)}</pre> */}
			{journalData.date ?
				<>
					<p className="text-2xl font-semibold uppercase m-2 font-mono">{journalData.date.toDate().toGMTString()}</p>
					<motion.textarea
						onChange={handleInput}
						initial={{ x: -400, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 1, type: "spring", stiffness: 120 }}
						className="bg-neutral-50 font-mono rounded border-2 border-violet-500/30 mt-3 p-3 w-full text-2xl focus:outline-none"
						defaultValue={textBuffer}
						// value={journalText}
						rows={10}
						disabled={notEditing}>
					</motion.textarea>

					<motion.div
						initial="hidden" animate="show"
						variants={container}
						className="flex justify-end space-x-4 mt-2 font-semibold">
						{notEditing ?
							<motion.button exit={{ opacity: 0, scale: 0 }}
								key={0} variants={item} onClick={handleEdit} className="bg-transparent border-slate-500 border-2 p-1 text-sm rounded text-slate-500 hover:bg-slate-500 hover:text-white transition-colors cursor-pointer">Edit</motion.button>
							:
							<motion.button exit={{ opacity: 0, scale: 0 }}
								key={1} variants={item} onClick={handleSave} className="bg-transparent border-green-500 border-2 p-1 text-sm rounded text-green-500 hover:bg-green-500 hover:text-white transition-colors cursor-pointer">Save</motion.button>

						}
						<motion.button key={3} variants={item} onClick={handleDelete} className="bg-transparent border-red-800 border-2 p-1 text-sm rounded text-red-700 hover:bg-red-800 hover:text-white transition-colors cursor-pointer">Delete</motion.button>
					</motion.div>
				</>
				: <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
			}
		</motion.div>
	);
};

export default EntryDetail;
