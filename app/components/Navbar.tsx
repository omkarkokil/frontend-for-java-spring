import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex items-center shadow-md justify-between gap-4 px-4 h-[9vh] w-full">
      <Link href={"/"} className="text-sm">
        <h1 className="text-xl tracking-tight font-bold">HERE LOGO</h1>
      </Link>
    </div>
  );
};

export default Navbar;
