"use client";

import { useState } from "react";

import { GoogleButton, LinkedinButton } from "@/components/buttons/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form/form";
import { Input } from "@/components/form/input";

import { signIn } from "@/lib/actions/login.action";
import { StatusMessage } from "@/components/shared/shared";

import { NoOutlineButtonBig } from "@/components/shared/buttons";

const formSchema = z.object({
  email: z.string().min(8, {
    message: "Email must be at least 8 characters.",
  }),
});

export default function SignIn() {
  const [loading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isError, setIsError] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setIsEmailSent(false);
    setIsError(false);
    const result = await signIn(data.email);
    if (result) {
      // Handle successful sign-in
      setIsLoading(false);
      setIsEmailSent(true);
    } else {
      // Handle sign-in error
      setIsLoading(false);
      setIsEmailSent(false);
      console.error("Sign in error:", result);
    }
  };

  return (
    <main className="text-white flex items-center justify-center min-h-screen">
      <div className="mt-[30px] pb-5">
        <p className="text-center text-2xl font-bold mb-10">
          Sign in to Veridaq.com Admin
        </p>
        <div className="max-w-md mx-auto px-10 sm:px-6 lg:px-8 pt-8 h-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => onSubmit(data))}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-[20px]">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="example@mail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isEmailSent === true && (
                <StatusMessage type="success" message="Email sent!" />
              )}
              {isError === true && (
                <StatusMessage
                  type="error"
                  message="Error sending email. Try again!"
                />
              )}
              <div className="text-center">
                <NoOutlineButtonBig
                  type="submit"
                  name={"Send Magic Link"}
                  disabled={loading}
                  loading={loading}
                />
              </div>
            </form>
          </Form>
          <p className="text-center pt-10 text-sm">
            By signing in you agree with our{" "}
            <span className="text-[#4285F4]">terms and conditions. </span>{" "}
          </p>
        </div>
      </div>
    </main>
  );
}
