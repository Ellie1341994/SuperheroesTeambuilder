import { Link } from "react-router-dom";
import { AuthenticationContext } from "../App";
import { useContext } from "react";
import { IoExitSharp } from "react-icons/io5";
export default function LogoutButton() {
  const context: any = useContext(AuthenticationContext);
  return (
    <Link
      style={{ color: "inherit" }}
      onClick={() => {
        localStorage.removeItem("token");
        context.setToken("");
      }}
      to="/logout"
      className="bg-primary text-white p-1 rounded"
    >
      <IoExitSharp color="#fff" />
      Logout
    </Link>
  );
}
