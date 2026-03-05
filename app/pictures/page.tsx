"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles, Loader2, X, Plus, Camera } from "lucide-react";

type Post = {
  id: string;
  images: string[];
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getPosts = async () => {
    try {
      const res = await fetch("/api/getPosts");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch memories", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#fffafa] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100/40 via-[#fffafa] to-white p-8 md:p-16">
      <div className="flex flex-col items-center mb-16 text-center">
        <Heart className="w-8 h-8 text-rose-400 fill-rose-400/20 mb-4 animate-pulse" />
        <h1 className="text-4xl md:text-5xl font-serif italic text-gray-800">
          Our Shared Journey
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-rose-300 to-transparent mt-4" />
      </div>
      {loading ? (
        <div className="flex flex-col items-center gap-4 mt-20 text-rose-300">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="font-medium italic">Unrolling our memories...</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post, index) =>
            post.images && post.images.length > 0 ? (
              <div
                key={post.id}
                onClick={() => setSelectedImage(post.images[0])}
                style={{
                  transform: `rotate(${index % 2 === 0 ? "-2deg" : "2deg"})`,
                }}
                className="group relative bg-white p-4 pb-12 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(225,150,150,0.2)] transition-all duration-500 hover:-translate-y-2 hover:rotate-0 cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <Image
                    src={post.images[0]}
                    alt="Our Memory"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-rose-200/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-rose-100/40 backdrop-blur-sm border border-white/50 opacity-50" />
                <div className="mt-6 px-2 flex justify-center">
                  <Sparkles className="w-3 h-3 text-rose-200" />
                </div>
              </div>
            ) : null,
          )}
        </div>
      )}
      <Link href="/photoUpload" className="fixed bottom-8 right-8 z-40 group">
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500 animate-pulse"></div>
          <button className="relative flex items-center gap-2 bg-white px-6 py-4 rounded-full shadow-xl border border-rose-100 text-rose-500 transition-all duration-300 group-hover:scale-110 group-active:scale-95">
            <Camera className="w-5 h-5 transition-transform group-hover:rotate-12" />
            <span className="font-serif italic font-semibold tracking-wide">
              New Memory
            </span>
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </Link>
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="relative w-full max-w-4xl aspect-[4/5] md:aspect-auto md:h-[80vh] bg-white p-2 rounded-lg shadow-2xl animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Selected Memory"
              fill
              className="object-contain rounded-sm"
              priority
            />
          </div>
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="text-center mt-20 text-gray-400 italic">
          No memories yet. Let's go make some!
        </div>
      )}
    </div>
  );
}
