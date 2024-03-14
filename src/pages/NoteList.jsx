import { useNote } from '../contexts/NoteContext';
import Note from '../components/Note';

const NoteList = () => {
  const { state } = useNote();

  return (
    <div>
      {state.notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NoteList;
