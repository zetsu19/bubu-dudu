"use client";

import { useState, ChangeEvent, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Heart,
  Camera,
  X,
  Loader2,
  Send,
  AlertCircle,
  ChevronLeft,
} from "lucide-react";
import { Toaster, toast } from "sonner";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleReset = () => {
    setFile(null);
    setPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUploadAndPost = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error();

      const { url } = await uploadRes.json();

      const postRes = await fetch("/api/createPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: url,
          date: new Date().toISOString(),
        }),
      });

      if (!postRes.ok) throw new Error();

      toast.custom(() => (
        <div className="bg-white/80 backdrop-blur-md border border-rose-100 p-4 rounded-2xl shadow-xl flex items-center gap-3 min-w-[300px]">
          <div className="bg-rose-100 p-2 rounded-full">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          </div>
          <div className="flex flex-col">
            <p className="text-gray-800 font-serif italic font-semibold">
              Memory Saved
            </p>
            <p className="text-rose-400 text-xs font-medium uppercase tracking-tighter">
              Added to our story forever
            </p>
          </div>
        </div>
      ));

      handleReset();

      setTimeout(() => {
        router.push("/pictures");
      }, 1000);
    } catch {
      toast.error("Oops! Something went wrong.", {
        icon: <AlertCircle className="w-5 h-5" />,
        className:
          "rounded-2xl font-serif italic bg-white border-rose-100 text-gray-800 shadow-xl",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff5f5] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-100 via-slate-50 to-rose-50 p-6 relative">
      <Toaster position="top-center" />

      {/* Back Button */}
      <button
        onClick={() => router.push("/pictures")}
        className="fixed top-8 left-8 z-50 group flex items-center gap-2 bg-white/80 backdrop-blur-md px-5 py-3 rounded-full border border-rose-100 text-rose-400 font-serif italic shadow-sm hover:shadow-md hover:bg-white transition-all active:scale-95"
      >
        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to Memories</span>
      </button>

      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-rose-200/50 rounded-[3rem] p-8 shadow-[0_20px_50px_rgba(255,182,193,0.3)]">
        <div className="text-center mb-8">
          <Heart className="w-8 h-8 text-rose-400 mx-auto mb-2 fill-rose-400/20 animate-pulse" />
          <h1 className="text-3xl font-serif italic text-gray-800">
            Our Scrapbook
          </h1>
          <p className="text-rose-400/80 text-xs mt-1 font-medium tracking-widest uppercase">
            Every Moment Matters
          </p>
        </div>

        <div className="space-y-6">
          {!preview ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="group cursor-pointer border-2 border-dashed border-rose-200 hover:border-rose-400 rounded-[2rem] p-12 flex flex-col items-center justify-center gap-3 bg-rose-50/30 hover:bg-rose-50"
            >
              <div className="p-4 bg-white rounded-full shadow-sm">
                <Camera className="w-6 h-6 text-rose-400" />
              </div>

              <p className="text-sm font-medium text-rose-500/60">
                Choose a beautiful photo
              </p>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-inner border-4 border-white">
                <Image
                  src={preview}
                  alt="Our Memory"
                  fill
                  className="object-cover"
                />

                <button
                  onClick={handleReset}
                  className="absolute top-4 right-4 p-2 bg-white/80 rounded-full text-rose-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleUploadAndPost}
            disabled={!file || loading}
            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${
              !file || loading
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg shadow-rose-200"
            }`}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" /> Save to Our Gallery
              </>
            )}
          </button>
        </div>

        <p className="text-center mt-6 text-[10px] text-rose-300 font-bold uppercase tracking-widest">
          Together Since 2025
        </p>
      </div>
    </div>
  );
}
