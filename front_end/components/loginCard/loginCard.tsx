"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/validator";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "@/slices/userSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hook";
import { useRouter } from "next/navigation";

const LoginCard = () => {
  const user = useAppSelector((state) => state.user);

  const router = useRouter();
  const dispatch = useAppDispatch();
  console.log(user);
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/sign-in`,
        {
          username: data.username,
          password: data.password,
        }
      );
      const userData = res.data.profile;
      console.log(res);
      if (res.data.status === 201) {
        toast.success("Successfully signed it.");
        dispatch(setCredentials(userData));
        router.push("/dashboard");
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };
  console.log(user);
  return (
    <div className="h-screen w-screen flex justify-center items-center body-bg">
      <div className="flex flex-col justify-center items-center h-50 w-screen border border-black rounded-sm">
        {/* header */}
        <div className="text-center">
          <h1 className="text-white  text-4xl customize_text ">Welcome back</h1>
          <h6 className="text-white text-2xl  font-light tracking-widest">
            Sign in to continue trading
          </h6>
        </div>
        {/* Using react-hook-form for validation */}
        <form
          className=" space-y-5 my-4 justify-between w-100 h-90 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            placeholder="Username"
            {...register("username")}
            className="p-5 text-4xl"
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
            className="p-5 "
          />
          {errors.password && (
            <span className="text-red-500 text-[10px] ">
              {errors.password.message}
            </span>
          )}

          <Button className="w-full bg-white text-black" type="submit">
            Signup
          </Button>
        </form>
        <span className="text-slate-500 font-light tracking-widest ">
          Don't have an account?{" "}
          <a className="text-white" href="/signup">
            Sign Up
          </a>
        </span>
      </div>
    </div>
  );
};

export default LoginCard;
