"use client";

import React, { useState, useEffect, ChangeEvent, useRef } from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Input } from "@/components/form/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  createOrUpdateWorkReferenceRequest,
  getWorkReferenceById,
} from "@/lib/actions/request.action";
import { WorkReferenceValidation2 } from "@/lib/validations/workreference";
import { SuccessMessage, ErrorMessage } from "@/components/shared/shared";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { BlackButton } from "@/components/shared/buttons";
import { Textarea } from "@/components/ui/textarea";

interface WorkReferenceProps {
  docId?: string | null;
}

const WorkReference: React.FC<WorkReferenceProps> = ({ docId }) => {
  const [step, setStep] = useState(1);
  const [requestResult, setRequestResult] = useState<boolean | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };
  console.log(docId);
  const form = useForm<z.infer<typeof WorkReferenceValidation2>>({
    resolver: zodResolver(WorkReferenceValidation2),
  });

  console.log(form.formState.errors);

  useEffect(() => {
    const fetchWorkReferenceDoc = async () => {
      if (!docId) return;
      try {
        const doc = await getWorkReferenceById(docId);
        console.log("Fetched document:", doc); // Log fetched document
        // Set default values for form fields if available
        if (doc) {
          const {
            firstName,
            lastName,
            middleName,
            employeeType,
            subType,
            staffId,
            designation,
            image,
            department,
            notableAchievement,
            jobFunction,
            personalitySummary,
            workStartDate,
            workEndDate,
            orgName,
            orgAddress,
            orgPostalCode,
            orgCountry,
            orgEmail,
            orgPhone,
            contactName,
            contactAddress,
            contactPostalCode,
            contactCountry,
            contactEmail,
            contactPhone,
          } = doc;
          form.reset({
            firstName,
            lastName,
            middleName,
            employeeType,
            subType,
            staffId,
            designation,
            image,
            department,
            notableAchievement,
            jobFunction,
            personalitySummary,
            workStartDate,
            workEndDate,
            orgName,
            orgAddress,
            orgPostalCode,
            orgCountry,
            orgEmail,
            orgPhone,
            contactName,
            contactAddress,
            contactPostalCode,
            contactCountry,
            contactEmail,
            contactPhone,
          });
        }
      } catch (error) {
        console.error("Error fetching organizations:", error);
        // Handle error state if needed
      }
    };

    fetchWorkReferenceDoc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docId]);

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

  const onSubmit = async (data: z.infer<typeof WorkReferenceValidation2>) => {
    console.log("I want to submit");
    setIsDisabled(true);
    try {
      const create = await createOrUpdateWorkReferenceRequest({
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        employeeType: data.employeeType,
        subType: data.subType,
        staffId: data.staffId,
        designation: data.designation,
        image: data.image,
        workStartDate: data.workStartDate,
        workEndDate: data.workEndDate,
        department: data.department,
        notableAchievement: data.notableAchievement,
        jobFunction: data.jobFunction,
        personalitySummary: data.personalitySummary,
        orgName: data.orgName,
        orgAddress: data.orgAddress,
        orgPostalCode: data.orgPostalCode,
        orgCountry: data.orgCountry,
        orgEmail: data.orgEmail,
        orgPhone: data.orgName,
        contactName: data.contactName,
        contactAddress: data.contactAddress,
        contactPostalCode: data.contactPostalCode,
        contactCountry: data.contactCountry,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        id: docId as string,
      });
      setRequestResult(create);
      if (create) {
        handleNextStep();
      }
      setIsDisabled(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setRequestResult(false);
      setIsDisabled(false);
    }
  };

  return (
    <main>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {step === 1 && (
            <div>
              <p className="text-xl px-8">Personal Details</p>
              <div className="mt-4 w-full px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="font-medium text-[16px]">
                          Firstname
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
                        <FormLabel className="font-medium text-[16px]">
                          Lastname
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
                    name="middleName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium text-[16px]">
                          Middle Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Fred" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="employeeType"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium text-[16px]">
                          Employee Type
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Employee Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Regular">Regular</SelectItem>
                            <SelectItem value="Non-Regular">
                              Non-Regular e.g. Adhoc
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subType"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium text-[16px]">
                          Sub Type
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Sub Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Current">Current</SelectItem>
                            <SelectItem value="Former">Former</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="staffId"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium text-[16px]">
                          Staff ID
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="D11256" {...field} />
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
                        <FormLabel className="font-medium text-[16px]">
                          Designation
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Snr." {...field} />
                        </FormControl>
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
                              className="rounded-full aspect-square object-cover"
                            />
                          ) : (
                            <Image
                              src="/assets/icons/avatar.png"
                              alt="image"
                              width={96}
                              height={96}
                              className="rounded-full aspect-square object-cover"
                            />
                          )}
                        </FormLabel>
                        <label
                          htmlFor="image"
                          className="text-[#3344A8] cursor-pointer text-[20px] font-medium"
                        >
                          Any Supporting Documents (Optional)
                        </label>
                        <FormControl className="flex-1 text-base-semibold text-gray-200">
                          <Input
                            type="file"
                            accept="image/*,application/pdf"
                            ref={inputFileRef}
                            placeholder="Upload Profile Photo or PDF"
                            className="hidden"
                            onChange={(e) => handleImage(e, field.onChange)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-5 flex items-center justify-center">
                  {/* <div className="text-left left">
                     <button type="button" className='mr-auto md:mr-0' onClick={handlePrevStep}>Previous</button>
                    </div> */}
                  <div className="text-right right">
                    <button
                      type="button"
                      className="bg-[#38313A] px-7 py-5 rounded-md text-white"
                      onClick={handleNextStep}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
              <p className="p-2">{`Step ${step}`}</p>
            </div>
          )}
          {step === 2 && (
            <div>
              <p className="text-xl px-8">Personal Details</p>
              <div className="mt-4 w-full px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
                  <FormField
                    control={form.control}
                    name="workStartDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-medium text-[16px]">
                          Work Start Date
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "flex h-12 w-full normal-border bg-[#C3B8D8] pt-10 rounded-lg px-1 py-3 placeholder:text-gray-500 text-left disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-950",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="workEndDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-medium text-[16px]">
                          Work End Date
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "flex h-12 w-full normal-border bg-[#C3B8D8] pt-10 rounded-lg px-1 py-3 placeholder:text-gray-500 text-left disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-950",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium text-[16px]">
                          Department
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Department" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notableAchievement"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Notable Achievement</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Notable Achievement"
                            id="notableAchievement"
                            className="flex h-12 w-full normal-border bg-[#C3B8D8] pt-10 rounded-lg px-1 py-3 placeholder:text-gray-500 text-left disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-950"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="jobFunction"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Job Functions</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Job Functions"
                            id="jobFunction"
                            className="flex h-12 w-full normal-border bg-[#C3B8D8] pt-10 rounded-lg px-1 py-3 placeholder:text-gray-500 text-left disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-950"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="personalitySummary"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Personality Summary</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Personality Summary"
                            id="personalitySummary"
                            className="flex h-12 w-full normal-border bg-[#C3B8D8] pt-10 rounded-lg px-1 py-3 placeholder:text-gray-500 text-left disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-950"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-5 grid grid-cols-2 items-center justify-center">
                  <div className="text-left left">
                    <button
                      type="button"
                      className="mr-auto md:mr-0"
                      onClick={handlePrevStep}
                    >
                      Previous
                    </button>
                  </div>
                  <div className="text-right right">
                    <button
                      type="button"
                      className="bg-[#38313A] px-7 py-5 rounded-md text-white"
                      onClick={handleNextStep}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
              <p className="p-2">{`Step ${step}`}</p>
            </div>
          )}
          {step === 3 && (
            <div>
              <p className="text-xl px-8">Organization Details</p>
              <div className="mt-4 w-full px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
                  <FormField
                    control={form.control}
                    name="orgName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium text-[16px]">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Organization Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="orgAddress"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium text-[16px]">
                          Address
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="orgPostalCode"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium text-[16px]">
                          Postal Code
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="123456" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="orgCountry"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium text-[16px]">
                          Country
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Nigeria" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="orgEmail"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium text-[16px]">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="example@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="orgPhone"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium text-[16px]">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="+23481900000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-5 grid grid-cols-2 items-center justify-center">
                  <div className="text-left left">
                    <button
                      type="button"
                      className="mr-auto md:mr-0"
                      onClick={handlePrevStep}
                    >
                      Previous
                    </button>
                  </div>
                  <div className="text-right right">
                    <button
                      type="button"
                      className="bg-[#38313A] px-7 py-5 rounded-md text-white"
                      onClick={handleNextStep}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
              <p className="p-2">{`Step ${step}`}</p>
            </div>
          )}
          {step === 4 && (
            <div>
              <p className="text-xl px-8">Contact Person Details</p>
              <div className="mt-4 w-full px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium text-[16px]">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactAddress"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium text-[16px]">
                          Address
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactPostalCode"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium text-[16px]">
                          Postal Code
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="123456" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactCountry"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium text-[16px]">
                          Country
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Nigeria" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium text-[16px]">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="example@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium text-[16px]">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="+23481900000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-5 grid grid-cols-2 items-center justify-center">
                  <div className="text-left left">
                    <button
                      type="button"
                      className="mr-auto md:mr-0"
                      onClick={handlePrevStep}
                    >
                      Previous
                    </button>
                  </div>
                  <div className="text-right right">
                    <BlackButton
                      name="Submit"
                      type="submit"
                      disabled={isDisabled}
                      loading={isDisabled}
                    />
                  </div>
                </div>
              </div>
              <p className="p-2">{`Step ${step}`}</p>
            </div>
          )}

          {step === 5 && (
            <div>
              {/* Render success or error component based on request result */}
              {requestResult === true && <SuccessMessage />}
              {requestResult === false && <ErrorMessage />}
            </div>
          )}
        </form>
      </Form>
    </main>
  );
};

export default WorkReference;
