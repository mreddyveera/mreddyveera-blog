import { Button, Navbar, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { FaMoon } from "react-icons/fa";
function Header() {
  return (
    <Navbar className="border-b-2 border-gray-200 bg-white dark:bg-gray-900 px-4">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-3 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
          Manikanta
        </span>{" "}
        Blog
      </Link>

      {/*Search bar*/}
      <div className="flex justify-center">
      <form className="hidden lg:block">
        <TextInput type="text" placeholder="Serach..." icon={HiSearch} />
      </form>
      <Button className="w-15 h-8 lg:hidden" color="gray" pill>
        <HiSearch />
      </Button>
      </div>

      {/*Navigations*/}
      <div>
        <Link to="/Projects"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">Projects
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {/* Moon Icon Button */}
        <Button color="gray" pill>
          <FaMoon />
        </Button>

        {/* Sign In Button */}
        <Link to="/sign-in">
          <Button className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800">
            Sign In
          </Button>
        </Link>
      </div>
    </Navbar>
  );
}

export default Header;
