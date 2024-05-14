"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/form/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import React, { useState, ChangeEvent, useRef, useEffect } from "react";

import { BlackButton } from "@/components/shared/buttons";
import { updateOrgRole } from "@/lib/actions/settings.action";
import { TeamMemberValidation } from "@/lib/validations/onboarding";

interface ModalForm {
  onClose: () => void;
}

const ModalForm: React.FC<ModalForm> = ({ onClose }) => {
  const [disable, setDisable] = useState(false);
  const [isForm, setIsForm] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof TeamMemberValidation>>({
    resolver: zodResolver(TeamMemberValidation),
  });

  const handleImage = async (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();
    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    fileReader.onload = async (e) => {
      const fileData = e.target?.result;
      if (typeof fileData === "string") {
        try {
          const newBlob = await upload(file.name, file, {
            access: "public",
            handleUploadUrl: "/api/avatar/upload",
          });

          // Update the form data with the new blob URL
          fieldChange(newBlob.url);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    };

    fileReader.readAsDataURL(file);
  };

  const onSubmit = async (data: z.infer<typeof TeamMemberValidation>) => {
    console.log(data);
    setDisable(true);
    const result = await updateOrgRole(data);
    if (result) {
      setIsForm(false);
      setIsSuccessful(true);
    } else {
      setIsForm(false);
      setIsError(true);
    }
    setDisable(false);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="p-5 bg-white rounded-lg shadow-lg normal-border w-full max-h-[55vh] h-[55vh] overflow-auto mx-5 md:mx-0 md:w-[70%] max-h-[70%] h-[70%]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-2xl font-bold mb-5">Add Team Member</p>
        {isForm ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7 justify-center">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-medium text-[20px]">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-medium text-[20px]">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
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
                <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-medium text-[20px]">
                        Designation
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="HR Manager" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-medium text-[20px]">
                        Role
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent position="popper">
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Member">Member</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className="account-form_image-label">
                        {field.value ? (
                          <Image
                            src={field.value}
                            alt="image"
                            width={96}
                            height={96}
                            priority
                            className="rounded-full object-contain"
                          />
                        ) : (
                          <Image
                            src="/assets/icons/avatar.png"
                            alt="image"
                            width={96}
                            height={96}
                            className="object-contain"
                          />
                        )}
                      </FormLabel>
                      <FormControl className="flex-1 text-base-semibold text-gray-200">
                        <Input
                          type="file"
                          accept="image/*"
                          ref={inputFileRef}
                          placeholder="Upload Profile Photo"
                          className="account-form_image-input"
                          onChange={(e) => handleImage(e, field.onChange)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <BlackButton
                  type="submit"
                  name="Add Team Member"
                  disabled={disable}
                />
              </div>
            </form>
          </Form>
        ) : isSuccessful ? (
          <p className="font-bold text-lg">
            Team Member has been added successfully! <br /> They have been sent
            an email instructing them about how to start working on your
            Organization on Veridaq.
          </p>
        ) : isError ? (
          <p className="font-bold text-lg">
            An Error occured. Review the email address and try again or contact
            support.
          </p>
        ) : (
          <p>No conditions are true</p>
        )}
      </div>
    </div>
  );
};

export default ModalForm;
