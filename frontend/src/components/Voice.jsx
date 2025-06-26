// App.js
import React, { useState, useEffect } from 'react';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

function Voice() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [listening, setListening] = useState(false);

  // Start listening for voice input
  const startListening = () => {
    if (!recognition) {
      alert('Speech Recognition API not supported in your browser');
      return;
    }

    recognition.continuous = true;
    setListening(true);
    recognition.start();

    // Accumulate transcript as results come in
    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      // Append the new transcript to the previous note text
      setNote((prevNote) => prevNote + transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  // Stop listening for voice input
  const stopListening = () => {
    if (recognition && listening) {
      recognition.stop();
      setListening(false);
    }
  };

//   // Save the note to the backend
//   const saveNote = async () => {
//     if (note.trim() === '') return;
//     try {
//       const res = await fetch('http://localhost:5000/api/notes', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ content: note }),
//       });
//       const data = await res.json();
//       // Prepend the new note to the list
//       setNotes([data, ...notes]);
//       setNote('');
//     } catch (error) {
//       console.error('Error saving note:', error);
//     }
//   };

  // Fetch all notes from the backend
//   const fetchNotes = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/api/notes');
//       const data = await res.json();
//       setNotes(data);
//     } catch (error) {
//       console.error('Error fetching notes:', error);
//     }
//   };

//   // Fetch notes when the component mounts
//   useEffect(() => {
//     fetchNotes();
//   }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Voice Note Taker</h1>
      {listening ? (
        <button onClick={stopListening}>Stop Listening</button>
      ) : (
        <button onClick={startListening}>Start Voice Input</button>
      )}
      <div style={{ marginTop: '1rem' }}>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows="4"
          cols="50"
          placeholder="Your note will appear here..."
        />
      </div>
      <div>
        {/* <button onClick={saveNote} style={{ marginTop: '1rem' }}>
          Save Note
        </button> */}
      </div>
      <h2 style={{ marginTop: '2rem' }}>Saved Notes</h2>
      <ul>
        {notes.map((n) => (
          <li key={n._id}>{n.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default Voice;