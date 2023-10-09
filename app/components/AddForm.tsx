"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React from "react";
import InputField from "./InputField";
import axios from "axios";
import { GetDataProps } from "../users/[id]/page";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftCircle } from "lucide-react";

// Interface for typescript
interface GetFormProps {
  singleData: GetDataProps | null;
}

//TODO  Using zod this will helps in the clientside validations
const formschema = z.object({
  name: z.string().min(1, {
    message: "name is required",
  }),
  username: z.string().min(1, {
    message: "username is required",
  }),
  email: z.string().email({ message: "Emaill is not valid" }),
});

const AddForm: FC<GetFormProps> = ({ singleData }) => {
  //! states and required thing
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  //TODO  Intializing useForm hook
  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      email: singleData?.email ? singleData.email : "",
      username: singleData?.username ? singleData.username : "",
      name: singleData?.name ? singleData.name : "",
    },
  });

  //TODO Function for submit data to backend
  const onSubmit = async (values: z.infer<typeof formschema>) => {
    setisLoading(true);
    //!making condition if id then update the user with id  otherwise it run the create a new user
    if (singleData?.id) {
      try {
        const data = await axios.put(
          `http://localhost:8080/updateUser/${singleData.id}`,
          {
            ...values,
          }
        );
        if (data) {
          console.log(data);
          router.refresh();
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setisLoading(false);
      }
    } else {
      try {
        const data = await axios.post("http://localhost:8080/user", {
          ...values,
        });

        if (data) {
          console.log(data);
          router.refresh();
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setisLoading(false);
      }
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <Link
          href={"/"}
          className="hover:translate-x-[-5px] w-max transition-all hover:text-sky-400"
        >
          <ArrowLeftCircle />
        </Link>
        <h1 className="first-letter:text-5xl  first-letter:italic uppercase text-2xl mb-3 font-semibold">
          {singleData?.id ? "Edit User " : "Add new user"}
        </h1>
      </div>
      <Form {...form}>
        <form
          autoComplete="off"
          autoCorrect="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 "
        >
          <InputField
            form={form}
            name="email"
            label="email"
            type="email"
            placeholder="Enter your email"
            desc=" This is your public display email."
          />
          <InputField
            form={form}
            name="name"
            label="name"
            type="text"
            placeholder="Enter your name"
            desc=" This is your public display name."
          />
          <InputField
            form={form}
            name="username"
            label="username"
            type="text"
            placeholder="Enter your username"
            desc=" This is your public display username."
          />

          <Button
            className="w-[200px] text-white"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "posting data" : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddForm;
