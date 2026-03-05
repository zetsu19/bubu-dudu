"use client";

import { Heart, Lock, Mail, Sparkles } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

export default function BubuLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const fakeEmail = "bubu";
  const fakePassword = "123456";

  const handleLogin = () => {
    if (!email || !password) {
      toast.custom((t) => (
        <div className="bg-white/90 backdrop-blur-xl border border-amber-200 p-4 rounded-3xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4">
          <Sparkles className="text-amber-400 w-5 h-5" />
          <p className="font-serif italic text-amber-900 text-sm">
            Don't forget the magic words, Bubu! ✨
          </p>
        </div>
      ));
      return;
    }

    if (email === fakeEmail && password === fakePassword) {
      toast.custom((t) => (
        <div className="bg-rose-400/90 backdrop-blur-xl p-5 rounded-[2.5rem] shadow-2xl flex items-center gap-4 border border-white/20 animate-in zoom-in duration-300">
          <div className="bg-white p-2 rounded-full shadow-inner">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
          </div>
          <div>
            <p className="text-white font-serif italic text-lg leading-tight">
              Welcome home, Bubu!
            </p>
            <p className="text-rose-100 text-[10px] uppercase tracking-widest font-bold">
              Accessing our world...
            </p>
          </div>
        </div>
      ));
      router.push("/pictures");
    } else {
      toast.custom((t) => (
        <div className="bg-white/90 backdrop-blur-xl border border-rose-200 p-4 rounded-3xl shadow-2xl flex items-center gap-3">
          <div className="bg-rose-100 p-2 rounded-full">
            <Heart className="text-rose-400 w-4 h-4 rotate-180" />
          </div>
          <p className="font-serif italic text-rose-900 text-sm">
            Oh no! That's not right, love.
          </p>
        </div>
      ));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffafa] relative overflow-hidden p-6">
      <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-rose-100 rounded-full blur-[100px] opacity-60" />
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-sky-100 rounded-full blur-[100px] opacity-60" />

      <Toaster position="top-center" />

      <div className="w-full max-w-md bg-white/40 backdrop-blur-2xl rounded-[3.5rem] p-10 shadow-[0_30px_100px_rgba(255,182,193,0.2)] border border-white/60 relative z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 bg-rose-50 rounded-[2.5rem] border-4 border-white shadow-inner relative overflow-hidden mb-4 group transition-all hover:scale-105">
            <Image
              src="/bubu.jpg"
              alt="Bubu Avatar"
              fill
              className="object-cover p-2"
            />
          </div>
          <div className="relative">
            <h1 className="text-3xl font-serif italic text-gray-800">
              Hello Bubu
            </h1>
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400 absolute -top-1 -right-4 animate-bounce" />
          </div>
          <p className="text-[10px] text-rose-300 uppercase tracking-[0.4em] font-black mt-2">
            Personal Access
          </p>
        </div>
        <div className="space-y-6">
          <div className="relative group">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300 group-focus-within:text-rose-500 transition-colors" />
            <input
              placeholder="Who are you?"
              className="w-full bg-white/60 pl-12 pr-6 py-5 rounded-[2rem] border border-rose-100 focus:ring-4 focus:ring-rose-100 focus:bg-white outline-none transition-all placeholder:text-rose-200 text-gray-700 font-medium shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative group">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300 group-focus-within:text-rose-500 transition-colors" />
            <input
              type="password"
              placeholder="Secret Word"
              className="w-full bg-white/60 pl-12 pr-6 py-5 rounded-[2rem] border border-rose-100 focus:ring-4 focus:ring-rose-100 focus:bg-white outline-none transition-all placeholder:text-rose-200 text-gray-700 font-medium shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full relative overflow-hidden group bg-gradient-to-r from-rose-400 to-pink-400 text-white py-5 rounded-[2rem] font-bold shadow-lg shadow-rose-200/50 hover:shadow-rose-300/60 transition-all active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative flex items-center justify-center gap-2">
              Login to our World <Heart className="w-4 h-4 fill-white" />
            </span>
          </button>
        </div>
        <div className="mt-10 text-center">
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">
            Only for the cutest panda
          </p>
        </div>
      </div>
    </div>
  );
}
