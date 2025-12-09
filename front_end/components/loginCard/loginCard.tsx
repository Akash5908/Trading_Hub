"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/validator";
import axios from "axios";
import toast from "react-hot-toast";

const LoginCard = () => {
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

      if (res.status === 200) {
        toast.success("Successfully signed it.");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center h-50 w-80 border border-black rounded-sm">
        <form
          className=" space-y-2 justify-between w-70"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input type="text" placeholder="Username" {...register("username")} />
          <Input type="text" placeholder="Password" {...register("password")} />
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
