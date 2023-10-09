import React from "react";
import AddForm from "../components/AddForm";

const page = () => {
  return (
    <>
      <div className="flex justify-center pt-10 w-full">
        <div className="rounded-lg  px-10 w-[90%]">
          <AddForm singleData={null} />
        </div>
      </div>
    </>
  );
};

export default page;
