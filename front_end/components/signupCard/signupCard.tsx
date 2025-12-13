"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: { username: string; password: string }) => {
    try {
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center h-50 w-80 border border-black rounded-sm">
        <h1 className="text-white  text-4xl customize_text">Create Account</h1>
        <h6 className="text-white text">Join Tradin hub today</h6>

        {/* Using react-hook-form for validation */}
        <form
          className=" space-y-5 my-4 justify-between w-100 h-90 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            placeholder="Username"
            {...register("username")}
            className="p-5 text-4xl bg-white"
          />
          {errors.username && (
            <span className="text-red-500 text-[10px] ">
              {errors.username.message}
            </span>
          )}
          <Input
            type="text"
            placeholder="Password"
            {...register("password")}
            className="p-5  bg-white"
          />
          {errors.password && (
            <span className="text-red-500 text-[10px] ">
              {errors.password.message}
            </span>
          )}

          <Button
            className="w-full bg-white text-black hover:text-white hover:bg-slate-900"
            type="submit"
          >
            Signup
          </Button>
        </form>
        <span className="text-slate-500 font-light tracking-widest ">
          Already have an account?{" "}
          <a className="text-white" href="/login">
            Login
          </a>
        </span>
      </div>
    </div>
  );
};

export default SignupCard;
