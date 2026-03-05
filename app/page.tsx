"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-white to-rose-100 relative overflow-hidden p-6">
      <Heart className="absolute top-12 left-10 text-rose-100 w-28 h-28 rotate-12 -z-10 opacity-60" />
      <Heart className="absolute bottom-12 right-10 text-rose-100 w-36 h-36 -rotate-12 -z-10 opacity-60" />

      <div className="text-center mb-14 animate-in fade-in slide-in-from-bottom-5 duration-700">
        <div className="relative inline-block mb-3">
          <Heart className="w-12 h-12 text-rose-400 mx-auto fill-rose-400 animate-pulse" />
        </div>

        <h1 className="text-4xl md:text-5xl font-serif italic text-gray-800 tracking-tight">
          Who are you?
        </h1>

        <p className="text-rose-400 font-bold tracking-[0.35em] uppercase text-[10px] mt-3">
          Choose your character
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
        <div
          onClick={() => router.push("/bubu")}
          className="flex-1 group cursor-pointer relative bg-white rounded-[2.5rem] p-6 shadow-xl shadow-black/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-pink-200/40 active:scale-[0.97] border border-pink-50 hover:border-pink-200"
        >
          <div className="aspect-square w-full relative rounded-[2.5rem] overflow-hidden bg-orange-50 group-hover:bg-pink-100 transition-all border border-white/60 shadow-inner">
            <Image
              src="/dududu.jpg"
              alt="Dudu"
              fill
              sizes="(max-width:768px) 100vw, 400px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority
            />
          </div>

          <h2 className="mt-6 text-2xl font-black text-center text-gray-700 group-hover:text-pink-500  transition-colors">
            I am Bubu
          </h2>
        </div>
        <div
          onClick={() => router.push("/dudu")}
          className="flex-1 group cursor-pointer relative bg-white rounded-[2.5rem] p-6 shadow-xl shadow-black/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-sky-200/40 active:scale-[0.97] border border-sky-50 hover:border-sky-200"
        >
          <div className="aspect-square w-full relative rounded-[2.5rem] overflow-hidden bg-sky-50 group-hover:bg-sky-100 transition-all border border-white/60 shadow-inner">
            <Image
              src="/bububu.jpg"
              alt="Bubu"
              fill
              sizes="(max-width:768px) 100vw, 400px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority
            />
          </div>

          <h2 className="mt-6 text-2xl font-black text-center text-gray-700 group-hover:text-sky-500 transition-colors">
            I am Dudu
          </h2>
        </div>
      </div>

      <p className="mt-14 text-rose-300 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
        Better Together Forever
      </p>
    </div>
  );
}
