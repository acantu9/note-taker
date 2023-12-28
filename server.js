const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
});

// app.get('/api/notes', (req, res) => {
//     fs.readFile(__dirname + '/db/db.json', 'utf8', (err, data) => {
//         if (err) throw err;
//         res.json(JSON.parse(data));
//     });
// });

app.get('/api/notes', (req, res) => {
    // Read the notes from the JSON file
    const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    res.json(notes);
  });

// app.post('/api/notes', (req, res) => {
//     const newNote = req.body;
//     fs.readFile(__dirname + '/db/db.json', 'utf8', (err, data) => {
//         if (err) throw err;
//         const notes = JSON.parse(data);
//         newNote.id = notes.length + 1;
//         notes.push(newNote);
//         fs.writeFile(__dirname + '/db/db.json', JSON.stringify(notes), (err) => {
//             if (err) throw err;
//             res.json(newNote);
//         });
//     });
// });

app.post('/api/notes', (req, res) => {
    // Read the notes from the JSON file
    const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    // Generate a unique ID for the new note
    const newNote = {
      id: Date.now(),
      title: req.body.title,
      text: req.body.text
    };
    // Add the new note to the notes array
    notes.push(newNote);
    // Write the updated notes array to the JSON file
    fs.writeFileSync('db.json', JSON.stringify(notes));
    res.json(newNote);
  });

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        const updatedNotes = notes.filter(note => note.id !== parseInt(noteId));
        fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(updatedNotes), (err) => {
            if (err) throw err;
            res.json(updatedNotes);
        });
    });
});