"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const uploadImage = async () => {
    if (!file) {
      alert("Select image first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();

      setUploadedUrl(data.url);

      alert("Image uploaded ✅");
    } catch (error) {
      console.error(error);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    if (!uploadedUrl) {
      alert("Upload image first");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: uploadedUrl,
        }),
      });

      if (!res.ok) throw new Error("Create post failed");

      alert("Post created ✅");

      setFile(null);
      setPreview("");
      setUploadedUrl("");
    } catch (error) {
      console.error(error);
      alert("Post failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1014] text-white gap-6 p-8">
      <h1 className="text-4xl font-bold text-purple-400">Create Post</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="bg-white/10 p-3 rounded-xl"
      />

      {preview && (
        <div className="relative w-64 h-64 rounded-xl overflow-hidden border border-white/20">
          <Image src={preview} alt="preview" fill className="object-cover" />
        </div>
      )}

      <button
        onClick={uploadImage}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold"
      >
        Upload Image
      </button>

      <button
        onClick={createPost}
        disabled={loading}
        className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold"
      >
        Create Post
      </button>

      {uploadedUrl && (
        <p className="text-green-400 break-all text-sm">
          Uploaded URL: {uploadedUrl}
        </p>
      )}
    </div>
  );
}
