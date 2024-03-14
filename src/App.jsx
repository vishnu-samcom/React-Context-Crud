import { NoteProvider } from './contexts/NoteContext';
import { NoteList, NoteForm } from './pages/index';
import './App.css';

function App() {
  return (
    <NoteProvider>
      <div className="app-container">
        <NoteList />
        <NoteForm />
      </div>
    </NoteProvider>
  );
}

export default App;
