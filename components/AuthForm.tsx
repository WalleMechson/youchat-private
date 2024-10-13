"use client";

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";

type VARIANT = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<VARIANT>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleVariant = () =>
    useCallback(() => {
      if (variant === "LOGIN") {
        setVariant("REGISTER");
      } else {
        setVariant("LOGIN");
      }
    }, []);

  const {
    register,
    handleSubmit,
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

    setIsLoading(false);
  };

  const onSocialAction = (action: string) => {
    setIsLoading(true);

    setIsLoading(false);
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
            register={register}
            placeholder="example@gmail.com"
          />
          <Input
            errors={errors}
            label="Password"
            type="password"
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
      </div>
    </div>
  );
};

export default AuthForm;
