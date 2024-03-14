import { useState } from 'react';
import { useNote } from '../contexts/NoteContext';
import './NoteForm.css';

const NoteForm = () => {
  const { addNote } = useNote();
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const handleAddNote = () => {
    if (newNoteTitle.trim() !== '' && newNoteContent.trim() !== '') {
      addNote({
        title: newNoteTitle,
        content: newNoteContent,
      });
      setNewNoteTitle('');
      setNewNoteContent('');
    }
  };

  return (
    <div className="note-form">
      <input
        type="text"
        placeholder="Note Title"
        value={newNoteTitle}
        onChange={(e) => setNewNoteTitle(e.target.value)}
      />
      <textarea
        placeholder="Note Content"
        value={newNoteContent}
        onChange={(e) => setNewNoteContent(e.target.value)}
      />
      <button onClick={handleAddNote}>Add Note</button>
    </div>
  );
};

export default NoteForm;
