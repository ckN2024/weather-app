import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [data, setData] = useState(null);
  const access_token = sessionStorage.getItem("accessToken");


  useEffect(() => {
    async function getUserDetails() {
      const userDetails = await axios.get("http://localhost:5000/api/users/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

    //   console.log(userDetails.data.data)

      setData(userDetails.data.data);
    }

    getUserDetails();
    // console.log("User details: \n", data);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-3 h-screen">
      <div className="h-[7em] w-[7em] bg-red-200 rounded-full"></div>
      <div className="w-1/3 bg-blue-100 p-3">
        <h1 className="text-xl font-semibold underline">Profile details</h1>
        <div className="">
          <table className="w-full">
            <tbody>
              <tr>
                <td>Username:</td>
                <td>{data === null ? "Loading": (data?.userName)}</td>
              </tr>
              <tr>
                <td>First Name:</td>
                <td>{data === null ? "Loading": (data?.firstName)}</td>
              </tr>
              <tr>
                <td>Last Name:</td>
                <td>{data === null ? "Loading...":(data?.lastName)}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{data === null ? "Loading..." : (data?.email)}</td>
              </tr>
              <tr>
                <td>Mobile:</td>
                <td>{data === null? "Loading...": (data?.mobileNumber)}</td>
              </tr>
              <tr>
                <td>Verified:</td>
                <td>{data=== null ? "Loading..." : (data?.isVerified ? "Yes":"No")}</td>
              </tr>
              <tr>
                <td>Notification:</td>
                <td>{data === null ? "Loading..." : (data?.isNotificationOn ? "On": "Off")}</td>
              </tr>
              <tr>
                <td>Favourites:</td>
                <td>
                    {
                        data === null ? "Loading" :
                        data?.favouritePlaces?.length === 0 ? "No favourites added" :

                        data?.favouritePlaces?.map((place, idx) => (
                            <div key={idx}>
                                {place}
                            </div>
                        ))
                    }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
