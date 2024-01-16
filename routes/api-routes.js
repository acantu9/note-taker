const fs = require('fs');
const uuid = require('uuid');

module.exports = (app) => {
  let db = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));

  app.get('/api/notes', (req, res) => {
    res.json(db);
  });

  app.post('/api/notes', (req, res) => {
    let userNote = {
      id: uuid(),
      title: req.body.title,
      text: req.body.text,
    };
    db.push(userNote);
    fs.writeFileSync('db/db.json', JSON.stringify(db));
    res.json(db);
  });

  app.delete('/api/notes/:id', (req, res) => {
    let deleteNotes = db.filter(item => item.id !== req.params.id);
    fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
    res.json(deleteNotes);
  });
};