import React, { FC, ReactNode } from "react";
import AddForm from "../../components/AddForm";

interface Iparams {
  id: string;
}

export interface GetDataProps {
  id: string;
  name: string;
  email: string;
  username: string;
}

const getUserByID = async (id: string | null) => {
  const res = await fetch(`http://localhost:8080/user/${id}`, {
    cache: "no-store",
  });

  return res.json();
};

const page = async ({ params }: { params: Iparams }) => {
  const getData = await getUserByID(params.id);
  return (
    <>
      <div className="flex justify-center pt-10 w-full">
        <div className="rounded-lg  px-10 w-[90%]">
          <AddForm singleData={getData} />
        </div>
      </div>
    </>
  );
};

export default page;
