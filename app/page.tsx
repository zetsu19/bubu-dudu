"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [previewList, setPreviewList] = useState<string[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files || []);

    setFiles(list);

    setPreviewList(list.map((file) => URL.createObjectURL(file)));
  };
  const uploadImages = async () => {
    try {
      if (!files.length) {
        alert("Select images first");
        return;
      }

      setLoading(true);

      const urls: string[] = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (data.url) {
          urls.push(data.url);
        }
      }

      setUploadedUrls(urls);

      alert("Upload success ✅");
    } catch (error) {
      console.error(error);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    try {
      if (!uploadedUrls.length) {
        alert("Upload images first");
        return;
      }

      setLoading(true);

      const res = await fetch("/api/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          images: uploadedUrls,
        }),
      });

      if (!res.ok) {
        throw new Error("Create post failed");
      }

      alert("Post created ✅");

      setFiles([]);
      setPreviewList([]);
      setUploadedUrls([]);
    } catch (err) {
      console.error(err);
      alert("Post creation error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1014] text-white p-8 gap-6">
      <h1 className="text-4xl font-bold text-purple-400">Create Post</h1>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="bg-white/10 p-3 rounded-xl cursor-pointer"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {previewList.map((img, i) => (
          <div
            key={i}
            className="relative w-40 h-40 rounded-xl overflow-hidden border border-white/20"
          >
            <Image src={img} alt="preview" fill className="object-cover" />
          </div>
        ))}
      </div>
      <button
        onClick={uploadImages}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition"
      >
        {loading ? "Processing..." : "Upload Images"}
      </button>
      <button
        onClick={createPost}
        className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold transition"
      >
        Create Post
      </button>
    </div>
  );
}
