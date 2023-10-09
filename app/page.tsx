"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface getDataProps {
  id: number;
  name: string;
  email: string;
  username: string;
}

// Get data from backend with srr
const getData = async () => {
  const res = await fetch("http://localhost:8080/getUser", {
    cache: "no-store",
  });

  return res.json();
};

const users = async () => {
  const router = useRouter();

  // Delete User
  const DeleteUser = async (id: number) => {
    await fetch(`http://localhost:8080/deleteUser/${id}`, {
      method: "delete",
    });

    router.refresh();
  };

  // Get user data from ssr
  const data: getDataProps[] = await getData();

  return (
    <div className="flex flex-col  items-center pt-10 ">
      <div className="flex flex-col w-[90%]">
        {data.length <= 0 ? (
          <h1>There is no entry</h1>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-left first-letter:text-5xl  first-letter:italic uppercase text-2xl mb-3 font-semibold">
                All users data
              </h1>
              <Link
                href={"/users"}
                className="py-1 px-4 rounded-md border-[.5px] border-sky-500 hover:bg-sky-500 hover:text-white transition-all
                 font-semibold  text-sky-500"
              >
                Add User
              </Link>
            </div>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr className="bg-black text-gray-200">
                        <th scope="col" className="px-6 py-4">
                          id
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          email
                        </th>
                        <th scope="col" className="px-6 py-4">
                          username
                        </th>
                        <th scope="col" className="px-6 py-4">
                          actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((ele, id) => (
                        <tr
                          key={id}
                          className="border-b dark:border-neutral-500"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {id + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {ele.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {ele.email}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {ele.username}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center gap-4">
                              <Link
                                href={`/users/${ele.id}`}
                                className="py-1 px-4 rounded-md bg-green-600 text-white"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => DeleteUser(ele.id)}
                                className="py-1 px-4 rounded-md bg-red-600 text-white"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default users;
