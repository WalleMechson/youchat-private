"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import Seperator from "./Seperator";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type VARIANT = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status]);

  const [variant, setVariant] = useState<VARIANT>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => {
          signIn("credentials", data);
        })
        .catch(() => {
          toast.error("Something went wrong :(");
        })
        .finally(() => {
          setIsLoading(false);
        });

      // .then(() => {
      //   toast.success("User created successfully!");
      // })
    } else if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Logged in!");
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const onSocialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged in!");
          router.push("/users");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      className="
        mt-8
        sm:mx-auto
        sm:w-full
        sm:max-w-md
  "
    >
      <div
        className="
        bg-white 
        px-4
        py-8
        shadow
        sm:rounded-lg
        sm:px-10
    "
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              errors={errors}
              label="Name"
              disabled={isLoading}
              type="text"
              id="name"
              register={register}
              placeholder="Joe Doe"
            />
          )}
          <Input
            errors={errors}
            label="Email address"
            type="email"
            id="email"
            disabled={isLoading}
            register={register}
            placeholder="example@gmail.com"
          />
          <Input
            errors={errors}
            label="Password"
            type="password"
            disabled={isLoading}
            id="password"
            register={register}
            placeholder="**********"
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <Seperator title="Or continue with">
          <AuthSocialButton
            icon={BsGithub}
            onClick={() => onSocialAction("github")}
          />
          <AuthSocialButton
            icon={BsGoogle}
            onClick={() => onSocialAction("google")}
          />
        </Seperator>
        <div
          className="
            flex
            gap-2
            justify-center
            text-sm
            mt-6
            px-2
            text-gray-500
        "
        >
          <div>
            {variant === "LOGIN"
              ? "New to YouChat?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Login here"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
