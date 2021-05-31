import { Link } from "react-router-dom";
import { authenticationContext } from "../App";
import { useContext } from "react";
import { IoExitSharp } from "react-icons/io5";
export default function LogoutButton() {
  const context: any = useContext(authenticationContext);
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
      {window.innerWidth > 576 && "Logout"}
    </Link>
  );
}
