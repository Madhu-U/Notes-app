import React, { useEffect, useState } from "react";
import NoteCard from "../components/cards/NoteCard";
import AddEditCard from "../components/cards/AddEditCard";
import Modal from "react-modal";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api/auth";
import { deleteNote, pinNote } from "../api/notes";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const { setUserInfo, allNotes, fetchAllNotes } = useUser();
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await getUser();
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Delete Note
  const handleNoteDelete = async (data) => {
    const noteId = data._id;
    try {
      const response = await deleteNote(noteId);
      if (response.data && !response.data.error) {
        toast.success("Note Deleted Successfully");
        fetchAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("Unexpected Error, Please try again");
      }
    }
  };

  // Pin/Unpin note
  const handlePin = async (data) => {
    const noteId = data._id;
    try {
      const response = await pinNote(noteId, {
        isPinned: !data.isPinned,
      });
      if (response.data && response.data.note) {
        toast.success("Note updated");
        fetchAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <div>
        <div className='max-w-[90%] mx-auto py-5 grid md:grid-cols-3 gap-4 '>
          {allNotes.length === 0 && (
            <div className='h-25 flex flex-col items-center justify-center shadow-md text-primary-dark rounded-xl '>
              <h1 className='font-bold'>No Notes Available</h1>
              <h2 className='font'>Click on New Note to add a note</h2>
            </div>
          )}
          {allNotes.map((note) => {
            const id = note["_id"];
            return (
              <NoteCard
                key={id}
                note={note}
                handleDelete={handleNoteDelete}
                setOpenAddEditModal={setOpenAddEditModal}
                fetchAllNotes={fetchAllNotes}
                handlePin={handlePin}
              ></NoteCard>
            );
          })}
        </div>

        <Modal
          isOpen={openAddEditModal.isShown}
          onRequestClose={() => {}}
          style={{
            overlay: {
              background: "rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(2px)",
            },
          }}
          contentLabel=''
          className='w-[50%] min-w-[350px] bg-light p-5 mx-auto rounded-md mt-[5rem] shadow-xl'
        >
          <AddEditCard
            openAddEditModal={openAddEditModal}
            setOpenAddEditModal={setOpenAddEditModal}
            fetchAllNotes={fetchAllNotes}
          ></AddEditCard>
        </Modal>
        <button
          className='fixed right-[40%] sm:right-10 bottom-5 uppercase tracking-wider font-medium px-2 text-xs rounded-md py-2 bg-accent text-light shadow-lg hover:scale-105 transition-all cursor-pointer active:scale-95'
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "add", data: null });
          }}
        >
          New Note
        </button>
      </div>
    </>
  );
};

export default Dashboard;
