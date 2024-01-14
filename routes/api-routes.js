const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// API route for getting notes
router.get('/api/notes', (req, res) => {
  try {
    // Read notes from the db.json file
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8')) || [];
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// API route for adding a note
router.post('/api/notes', (req, res) => {
  try {
    // Read notes from the db.json file
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8')) || [];

    // Generate a unique ID for the new note using uuidv4()
    const newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text
    };

    // Add the new note to the notes array
    notes.push(newNote);

    // Write the updated notes array to the JSON file
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));

    res.json(newNote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add note' });
  }
});

// API route for deleting a note
router.delete('/api/notes/:id', (req, res) => {
  try {
    const noteId = req.params.id;

    // Read notes from the db.json file
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8')) || [];

    // Filter out the note with the specified ID
    const updatedNotes = notes.filter(note => note.id !== noteId);

    // Write the updated notes array to the JSON file
    fs.writeFileSync('./db/db.json', JSON.stringify(updatedNotes));

    res.json(updatedNotes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

// function saveToDatabase(notes) {
//   // Save the notes array back to the db.json file
//   fs.writeFileSync('./db/db.json', JSON.stringify(notes));
// }

// function fetchFromDatabase() {
//   // Read notes from the db.json file
//   const existingNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8')) || [];

//   return existingNotes;
// }

// function displayNotes(existingNotes) {
//   const notesList = document.getElementById('list-group');

//   // Clear the existing list of notes
//   notesList.innerHTML = '';

//   // Iterate over each note and create a list item for it
//   existingNotes.forEach(function(note) {
//     const listItem = document.createElement('li');
//     listItem.textContent = note.title;
//     notesList.appendChild(listItem);
//   });
// }

// API route for getting notes
// router.get('/api/notes', (req, res) => {
//   // Read the notes from the JSON file
//   const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
//   res.json(notes);
// });

// // API route for adding a note
// router.post('/api/notes', (req, res) => {
//   // Read the notes from the JSON file
//   const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

//   // Generate a unique ID for the new note using uuidv4()
//   const newNote = {
//     id: uuidv4(),
//     title: req.body.title,
//     text: req.body.text
//   };

//   // Add the new note to the notes array
//   notes.push(newNote);

//   // Write the updated notes array to the JSON file
//   fs.writeFileSync('./db/db.json', JSON.stringify(notes));

//   res.json(newNote);
// });

// // API route for deleting a note
// router.delete('/api/notes/:id', (req, res) => {
//   const noteId = req.params.id;

//   fs.readFile('./db/db.json', 'utf8', (err, data) => {
//     if (err) throw err;

//     const notes = JSON.parse(data);

//     const updatedNotes = notes.filter(note => note.id !== parseInt(noteId));

//     fs.writeFile('./db/db.json', JSON.stringify(updatedNotes), (err) => {
//       if (err) throw err;

//       res.json(updatedNotes);
//     });
//   });
// });

module.exports = router;
// module.exports.saveToDatabase = saveToDatabase;
// module.exports.fetchFromDatabase = fetchFromDatabase;
// module.exports.displayNotes = displayNotes;