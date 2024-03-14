/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext, useEffect } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../shared/utils/api.constants';
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
        const response = await axios.get(
          `${API_BASE_URL}${API_ENDPOINTS.GET_NOTES}`
        );
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
        `${API_BASE_URL}${API_ENDPOINTS.ADD_NOTE}`,
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
        `${API_BASE_URL}${API_ENDPOINTS.UPDATE_NOTE}/${noteData.id}`,
        noteData
      );
      dispatch({ type: 'UPDATE_NOTE', payload: response.data });
    } catch (error) {
      console.error('Error updating note', error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await axios.delete(
        `${API_BASE_URL}${API_ENDPOINTS.DELETE_NOTE}${noteId}`
      );
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

export { NoteProvider, useNote };
