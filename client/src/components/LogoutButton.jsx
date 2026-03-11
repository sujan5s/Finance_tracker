import { useNavigate } from "react-router-dom";

function LogoutButton() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";

  };

  return (

    <button
      onClick={handleLogout}
      className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 mt-4"
    >
      Logout
    </button>

  );

}

export default LogoutButton;