"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { useToast } from "@/components/ui/Toast";

export default function ProjectList({ onEdit }) {
  const [projects, setProjects] = useState([]);
  const { success, error } = useToast();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "projects"), (snap) => {
      setProjects(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteDoc(doc(db, "projects", id));
      success("Project Deleted", "The selected project has been successfully removed from the database.");
    } catch (err) {
      error("Deletion Failed", "There was an error trying to delete the project.");
    }
  };

  return (
    <div className="space-y-4 grid grid-cols-2 gap-4">
      {projects.map(p => (
        <div key={p.id} className="border p-4 rounded-lg justify-between items-center shadow-sm">
          <div>
            <h3 className="font-bold text-lg">{p.title}</h3>
            <p>{p.description}</p>
            <p className="text-sm mt-1">Stack: {p.stack}</p>
            <div className="flex gap-3 mt-1">
              <a href={p.live} target="_blank" className="text-blue-600 underline">Live</a>
              <a href={p.github} target="_blank" className="text-blue-600 underline">GitHub</a>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <button onClick={() => onEdit(p)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
            <button onClick={() => handleDelete(p.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
