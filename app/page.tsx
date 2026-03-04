"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { upload } from "@vercel/blob/client";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Select file + preview
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  // Upload image to Vercel Blob
  const uploadImage = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const uploaded = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/image",
      });

      setImageUrl(uploaded.url);
      alert("Image uploaded!");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // Send image URL to backend
  const createCompany = async () => {
    if (!imageUrl) {
      alert("Upload image first");
      return;
    }

    const res = await fetch("/api/company", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: imageUrl }),
    });

    if (res.ok) {
      alert("Company created!");
    } else {
      alert("Failed to create");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1014] text-white gap-6 p-6">
      <h1 className="text-3xl font-bold">Upload Company Image</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="bg-white/10 p-2 rounded-lg"
      />

      {preview && (
        <div className="relative w-64 h-64 rounded-xl overflow-hidden border border-white/20">
          <Image src={preview} alt="Preview" fill className="object-cover" />
        </div>
      )}

      <button
        onClick={uploadImage}
        disabled={loading}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold disabled:opacity-40"
      >
        {loading ? "Uploading..." : "Upload Image"}
      </button>

      <button
        onClick={createCompany}
        className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold"
      >
        Create Company
      </button>

      {imageUrl && (
        <p className="text-sm text-green-400 break-all">
          Uploaded URL: {imageUrl}
        </p>
      )}
    </div>
  );
}
