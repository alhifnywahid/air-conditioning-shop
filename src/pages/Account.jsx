import { useEffect, useState } from "react"; 
import { getUser } from "../service/getUser.service";

function Account() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getUser(localStorage.getItem("token")).then((res) => {
      setProfile(res);
    });
  }, []);
  return (
    <div>
      <p>Hello {profile.name}</p>
      <img src={profile.profile_pic} className="rounded-full w-20"/>
    </div>
  );
}

export default Account;
