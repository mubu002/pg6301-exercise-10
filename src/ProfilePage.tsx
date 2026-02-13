import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/userinfo");

      if (res.status === 401) {
        navigate("/login");
        return;
      }

      const data = await res.json();
      console.log(data);
    }

    fetchUser();
  }, []);

  return <h2>Profile Page</h2>;
}
