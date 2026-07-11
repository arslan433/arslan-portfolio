"use client";

import { useState, useEffect } from "react";
import { db, storage } from "@/lib/firebase";
import { addDoc, collection, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useToast } from "@/components/ui/Toast";

export default function ProjectForm({ selectedProject, clearSelection }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stack, setStack] = useState("");
  const [github, setGithub] = useState("");
  const [live, setLive] = useState("");
  const [image, setImage] = useState(null);
  const { success, error } = useToast();

  useEffect(() => {
    if (selectedProject) {
      setTitle(selectedProject.title);
      setDescription(selectedProject.description);
      setStack(selectedProject.stack);
      setGithub(selectedProject.github);
    } else {
      setTitle("");
      setDescription("");
      setStack("");
      setGithub("");
      setLive("");
    }
  }, [selectedProject]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = selectedProject?.image || "";

    if (image) {
      const storageRef = ref(storage, `projects/${image.name}`);
      await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(storageRef);
    }

    const data = {
      title,
      description,
      stack,
      github,
      live,
      image: imageUrl,
      createdAt: serverTimestamp(),
    };

    if (selectedProject) {
      const docRef = doc(db, "projects", selectedProject.id);
      await updateDoc(docRef, data);
      clearSelection();
    } else {
      await addDoc(collection(db, "projects"), data);
    }

    setTitle("");
    setDescription("");
    setStack("");
    setGithub("");
    setLive("");
    setImage(null);
    success("Project Saved!", `"${title}" has been successfully saved to your database.`);
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded-lg mb-6 space-y-3 shadow-md">
      <h2 className="text-xl font-bold">{selectedProject ? "Edit Project" : "Add New Project"}</h2>

      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border p-2 w-full" required/>
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="border p-2 w-full" required/>
      <input type="text" placeholder="Stack" value={stack} onChange={e => setStack(e.target.value)} className="border p-2 w-full" required/>
      <input type="text" placeholder="GitHub Link" value={github} onChange={e => setGithub(e.target.value)} className="border p-2 w-full" />
      <input type="text" placeholder="Live Link" value={live} onChange={e => setLive(e.target.value)} className="border p-2 w-full" />

      <button className="bg-blue-600 text-white px-4 py-2">{selectedProject ? "Update Project" : "Add Project"}</button>
      {selectedProject && <button type="button" className="ml-2 bg-gray-400 text-white px-4 py-2" onClick={clearSelection}>Cancel</button>}
    </form>
  );
}
