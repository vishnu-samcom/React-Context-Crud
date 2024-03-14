/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNote } from '../contexts/NoteContext';
import './Note.css';

const Note = ({ note }) => {
  const { updateNote, deleteNote } = useNote();
  const [isEditing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    updateNote({
      id: note.id,
      title: editedTitle,
      content: editedContent,
    });
    setEditing(false);
  };

  const handleDelete = () => {
    deleteNote(note.id);
  };

  return (
    <div className={`note ${isEditing ? 'editing' : ''}`}>
      <h3>
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          note.title
        )}
      </h3>
      <p>
        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          note.content
        )}
      </p>
      <div className="actions">
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Note;
