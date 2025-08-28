import React, { useState, useEffect } from "react";
import { api } from "../api";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  async function loadNotes() {
    try {
      const data = await api.getNotes();
      setNotes(data);
    } catch (err) {
      console.error("Error loading notes:", err);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!title) return;
    await api.createNote({ title, content });
    setTitle("");
    setContent("");
    loadNotes();
  }

  async function handleDelete(id) {
    await api.deleteNote(id);
    loadNotes();
  }

  function startEdit(note) {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  }

  async function saveEdit(id) {
    await api.updateNote(id, { title: editTitle, content: editContent });
    cancelEdit();
    loadNotes();
  }

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div>
      <h2>Your Notes</h2>

      <form onSubmit={handleAdd} className="note-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Add Note</button>
      </form>

      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            {editingId === note._id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <div className="note-buttons">
                  <button onClick={() => saveEdit(note._id)} className="save">
                    Save
                  </button>
                  <button onClick={cancelEdit} className="cancel">
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="note-content">
                <strong>{note.title}</strong>
                <p>{note.content}</p>
                <div className="note-buttons">
                  <button onClick={() => startEdit(note)} className="edit">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="delete">
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
