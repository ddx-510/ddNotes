const { response } = require("express");
const currentDB = require("../models/database");

const save = async (req, res = response) => {
    const { user_id, title, body } = req.body;

    const allNotes =  await currentDB.query("SELECT * FROM notes");
    let nextId = allNotes.rows.length;
    const get_note = await currentDB.query("SELECT * FROM notes WHERE user_id = $1 AND title = $2", [parseInt(user_id), title]);

    let results;
    if (get_note.rows.length === 0){
      results = await currentDB.query("INSERT INTO notes VALUES($1, $2, $3, $4)", [nextId, parseInt(user_id), title, body]);
    } 
    res.json({
      successful: results
    })

    // todo: insert into database the current notes
    // const results = await currentDB.query("SELECT * FROM users where email = $1 AND password = $2", [email, password]);
}

const saveOrReplace = async (req, res = response) => {
  const { user_id, title, body } = req.body;

  const allNotes =  await currentDB.query("SELECT * FROM notes");
  let nextId = allNotes.rows.length;
  const get_note = await currentDB.query("SELECT * FROM notes WHERE user_id = $1 AND title = $2", [parseInt(user_id), title]);

  let results;
  if (get_note.rows.length === 0){
    results = await currentDB.query("INSERT INTO notes VALUES($1, $2, $3, $4)", [nextId, parseInt(user_id), title, body]);
  } else {
    results = await currentDB.query("UPDATE notes SET title = $1, body = $2 WHERE notes_id = $3", [title, body, parseInt(get_note.rows[0].notes_id)]);
  }
  
  
  res.json({
    successful: results
  })

  // todo: insert into database the current notes
  // const results = await currentDB.query("SELECT * FROM users where email = $1 AND password = $2", [email, password]);
}

const show = async (req, res = response) => {
  const { user_id } = req.params;

  const allNotes =  await currentDB.query("SELECT * FROM notes WHERE user_id = $1", [parseInt(user_id)]);
  
  res.json({
    allNotes: allNotes.rows
  })
}

const getContent = async (req, res = response) => {
  const { notes_id } = req.params;

  const allNotes =  await currentDB.query("SELECT * FROM notes WHERE notes_id = $1", [parseInt(notes_id)]);
  
  res.json({
    allNotes: allNotes.rows
  })
}

const deleteNote = async(req, res = response) => {
  const { notes_id } = req.params;
  const result = await currentDB.query("DELETE FROM notes WHERE notes_id = $1", [parseInt(notes_id)]);

  res.json({
      result: result
  });
}

module.exports = {
  show, save, getContent, deleteNote, saveOrReplace
};
