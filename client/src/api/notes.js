export async function saveNotes({ user_id, title, body }) {
    return await fetch("/api/notes/saveOrReplace", {
      method: "PUT",
      body: JSON.stringify({ user_id, title, body }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        // If request is not successful, display error message
        if (!response.ok) {
          throw new Error("HTTP status " + response.status);
        }
  
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
}

export async function showNotes({ user_id }) {
  return await fetch("/api/notes/show/"+ user_id, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      // If request is not successful, display error message
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getNoteContent({ notes_id }) {
  return await fetch("/api/notes/getContent/"+ notes_id, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      // If request is not successful, display error message
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function deleteNoteContent({ notes_id }) {
  return await fetch("/api/notes/deleteNote/"+ notes_id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      // If request is not successful, display error message
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}