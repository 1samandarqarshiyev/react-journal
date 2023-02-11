import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { createEntry } from "../firebase-utilities";
import { useAuth } from "../contexts/AuthContext";
import { Entries } from "./Entries";
import { motion } from "framer-motion";

const App = () => {
  const { currentUser } = useAuth();
  // const navigate = useNavigate();

  const [newJournalContent, setNewJournalContent] = useState();
  const [refresh, triggerRefresh] = useState(true);

  const handleCreateEntry = (e) => {
    e.preventDefault();

    let currTimestamp = new Date(Date.now());

    console.log("Create journal entry");
    createEntry({
      content: newJournalContent,
      date: currTimestamp,
      user: currentUser.email
    });
    setNewJournalContent("");
    triggerRefresh(!refresh);
  };

  return (
    <>
      <div className="container mx-auto m-5 max-w-3xl">
        <motion.p
          // initial={{ opacity: 0, y: -200 }}
          // animate={
          //   { opacity: 1, y: 0 }
          // }
          // transition={{ duration: 1 }}
          className="text-5xl uppercase text-center font-virgo">
          Journal Entries
        </motion.p>
        <form onSubmit={handleCreateEntry} className="m-5 p-2">
          <input
            type="text"
            value={newJournalContent}
            onChange={(event) => {
              setNewJournalContent(event.target.value);
            }}
            placeholder="New Entry..."
            className="min-w-full appearance-none border-b-2 border-dashed
          border-b-gray-500 bg-transparent focus:outline-none focus:border-b-gray-700 font-mono transition-colors
          "
          />
        </form>
        <Entries refresh={refresh} userEmail={currentUser.email} />
      </div>
    </>
  );
};

export default App;
