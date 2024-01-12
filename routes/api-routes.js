const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// API route for getting notes
router.get('/api/notes', (req, res) => {
  // Read the notes from the JSON file
  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  res.json(notes);
});

// API route for adding a note
router.post('/api/notes', (req, res) => {
  // Read the notes from the JSON file
  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

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
});

// API route for deleting a note
router.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;

    const notes = JSON.parse(data);

    const updatedNotes = notes.filter(note => note.id !== parseInt(noteId));

    fs.writeFile('./db/db.json', JSON.stringify(updatedNotes), (err) => {
      if (err) throw err;

      res.json(updatedNotes);
    });
  });
});

module.exports = router;