"use client";

import { Heart, Lock, User, Sparkles, ShieldCheck } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DuduLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const fakeEmail = "dudu";
  const fakePassword = "123456";

  const handleLogin = () => {
    if (!email || !password) {
      toast.custom((t) => (
        <div className="bg-white/90 backdrop-blur-xl border border-sky-200 p-4 rounded-3xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4">
          <Sparkles className="text-sky-400 w-5 h-5" />
          <p className="font-serif italic text-sky-900 text-sm">
            Fill in the blanks, Dudu! 📝
          </p>
        </div>
      ));
      return;
    }

    if (email === fakeEmail && password === fakePassword) {
      toast.custom((t) => (
        <div className="bg-sky-500/90 backdrop-blur-xl p-5 rounded-[2.5rem] shadow-2xl flex items-center gap-4 border border-white/20 animate-in zoom-in duration-300">
          <div className="bg-white p-2 rounded-full shadow-inner">
            <ShieldCheck className="w-6 h-6 text-sky-500 animate-bounce" />
          </div>
          <div>
            <p className="text-white font-serif italic text-lg leading-tight">
              Welcome back, Dudu!
            </p>
            <p className="text-sky-100 text-[10px] uppercase tracking-widest font-bold">
              Your world is waiting...
            </p>
          </div>
        </div>
      ));
      router.push("/pictures");
    } else {
      toast.custom((t) => (
        <div className="bg-white/90 backdrop-blur-xl border border-blue-200 p-4 rounded-3xl shadow-2xl flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Heart className="text-blue-400 w-4 h-4 fill-blue-400/20" />
          </div>
          <p className="font-serif italic text-blue-900 text-sm">
            That's not the secret code, bro.
          </p>
        </div>
      ));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f9ff] relative overflow-hidden p-6">
      <div className="absolute top-[-15%] right-[-10%] w-80 h-80 bg-blue-200 rounded-full blur-[120px] opacity-40" />
      <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-indigo-100 rounded-full blur-[100px] opacity-50" />

      <Toaster position="top-center" />

      <div className="w-full max-w-md bg-white/50 backdrop-blur-2xl rounded-[3.5rem] p-10 shadow-[0_30px_100px_rgba(186,230,253,0.4)] border border-white/80 relative z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 bg-sky-50 rounded-[2.5rem] border-4 border-white shadow-xl relative overflow-hidden mb-4 transition-transform hover:rotate-3">
            <Image
              src="/dudu.jpg"
              alt="Dudu Avatar"
              fill
              className="object-cover p-1"
            />
          </div>
          <div className="relative">
            <h1 className="text-3xl font-serif italic text-slate-800">
              Dudu's Space
            </h1>
            <div className="bg-sky-400 w-2 h-2 rounded-full absolute -top-1 -right-3 animate-ping" />
          </div>
          <p className="text-[10px] text-sky-400 font-black uppercase tracking-[0.4em] mt-2">
            Verified Resident
          </p>
        </div>
        <div className="space-y-6">
          <div className="relative group">
            <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-300 group-focus-within:text-sky-500 transition-colors" />
            <input
              placeholder="What's your name?"
              className="w-full bg-white/70 pl-12 pr-6 py-5 rounded-[2rem] border border-sky-100 focus:ring-4 focus:ring-sky-100 focus:bg-white outline-none transition-all placeholder:text-sky-200 text-slate-700 font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-300 group-focus-within:text-sky-500 transition-colors" />
            <input
              type="password"
              placeholder="The Secret Word"
              className="w-full bg-white/70 pl-12 pr-6 py-5 rounded-[2rem] border border-sky-100 focus:ring-4 focus:ring-sky-100 focus:bg-white outline-none transition-all placeholder:text-sky-200 text-slate-700 font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full relative overflow-hidden group bg-gradient-to-br from-sky-500 to-blue-600 text-white py-5 rounded-[2rem] font-bold shadow-lg shadow-sky-200 hover:shadow-sky-300 hover:-translate-y-1 transition-all active:scale-95"
          >
            <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-30deg] group-hover:left-[100%] transition-all duration-700" />

            <span className="relative flex items-center justify-center gap-2">
              Enter Dashboard <ShieldCheck className="w-4 h-4" />
            </span>
          </button>
        </div>
        <div className="mt-10 text-center">
          <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            Protected by Bubu{" "}
            <Heart className="w-3 h-3 text-rose-300 fill-rose-300" />
          </p>
        </div>
      </div>
    </div>
  );
}
