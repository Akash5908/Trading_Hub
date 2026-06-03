"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/validator";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppSelector, useAppDispatch } from "@/lib/hook";
import { setCredentials } from "@/slices/userSlice";
import { useRouter } from "next/navigation";

const SignupCard = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: { username: string; password: string }) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/sign-up`,
        {
          username: data.username,
          password: data.password,
        }
      );

      const userData = res.data.profile;

      if (res.status === 200) {
        toast.success("Successfully signed up!");
        dispatch(setCredentials(userData));
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex bg-white font-sans antialiased overflow-hidden">
      {/* Left panel - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-12 md:px-20 lg:px-32 py-10 min-h-screen">
        {/* Brand Logo */}
        <div
          className="flex items-center gap-2.5 mb-16 cursor-pointer group w-fit"
          onClick={() => router.push("/")}
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-md shadow-indigo-950/10">
            <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <span className="text-zinc-950 font-bold text-sm uppercase tracking-wider">
            Trading <span className="text-indigo-600 italic font-black">Hub</span>
          </span>
        </div>

        {/* Title Block */}
        <div className="mb-8">
          <h2 className="text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
            Create <br />Your Account
          </h2>
          <p className="text-zinc-400 text-xs font-semibold mt-2.5">
            Join Trading Hub today and start managing your assets
          </p>
        </div>

        {/* Form elements */}
        <form
          className="space-y-4 w-full max-w-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Input
              type="text"
              placeholder="Username"
              {...register("username")}
              className="w-full px-4 py-3 bg-white border border-zinc-200 text-zinc-800 placeholder-zinc-400 focus-visible:ring-indigo-500/35 focus-visible:border-indigo-500 rounded-xl h-11 text-sm font-medium"
            />
            {errors.username && (
              <span className="text-rose-500 text-[10px] font-bold mt-1 block">
                {errors.username.message}
              </span>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full px-4 py-3 bg-white border border-zinc-200 text-zinc-800 placeholder-zinc-400 focus-visible:ring-indigo-500/35 focus-visible:border-indigo-500 rounded-xl h-11 text-sm font-medium"
            />
            {errors.password && (
              <span className="text-rose-500 text-[10px] font-bold mt-1 block">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Action button */}
          <Button
            className="w-full py-5.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs tracking-wider rounded-xl border-none cursor-pointer shadow-lg shadow-indigo-950/15 active:scale-98 transition-all uppercase mt-6 h-11"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        {/* Footer Redirect */}
        <p className="text-zinc-400 text-xs font-semibold mt-16">
          Already have an account?{" "}
          <a
            className="text-indigo-600 hover:text-indigo-500 font-bold hover:underline transition-colors"
            href="/login"
          >
            Login
          </a>
        </p>
      </div>

      {/* Right panel - Illustration */}
      <div className="hidden md:flex w-1/2 min-h-screen p-8 bg-zinc-50 items-center justify-center">
        <div className="relative w-full h-full max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-violet-700">
          <Image
            src="/signup_illustration.png"
            alt="Signup Illustration"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default SignupCard;
