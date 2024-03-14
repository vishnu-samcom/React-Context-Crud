/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';

const NoteContext = createContext();

const noteReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_NOTES':
      return { notes: action.payload };
    case 'ADD_NOTE':
      return { notes: [...state.notes, action.payload] };
    case 'UPDATE_NOTE':
      return {
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      };
    case 'DELETE_NOTE':
      return {
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    default:
      return state;
  }
};

const NoteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(noteReducer, { notes: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/notes');
        dispatch({ type: 'FETCH_NOTES', payload: response.data });
      } catch (error) {
        console.error('Error fetching notes', error);
      }
    };

    fetchData();
  }, []);

  const addNote = async (noteData) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/notes',
        noteData
      );
      dispatch({ type: 'ADD_NOTE', payload: response.data });
    } catch (error) {
      console.error('Error adding note', error);
    }
  };

  const updateNote = async (noteData) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/notes/${noteData.id}`,
        noteData
      );
      dispatch({ type: 'UPDATE_NOTE', payload: response.data });
    } catch (error) {
      console.error('Error updating note', error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await axios.delete(`http://localhost:8000/notes/${noteId}`);
      dispatch({ type: 'DELETE_NOTE', payload: noteId });
    } catch (error) {
      console.error('Error deleting note', error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ state, dispatch, addNote, updateNote, deleteNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};

const useNote = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNote must be used within a NoteProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { NoteProvider, useNote };
