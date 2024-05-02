import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [data, setData] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [imagePath, setImagePath] = useState(null);
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

      if (userDetails?.data?.data?.profilePicture) {
        setProfileImageUrl(
          import.meta.env.VITE_AWS_CLOUDFRONT_URL +
            userDetails.data.data.profilePicture
        );
      } else {
        setProfileImageUrl(null);
      }
    }

    getUserDetails();
    // console.log("User details: \n", data);
  }, []);

  const fileChangeHandler = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setProfileImageUrl(null)

    // Display the selected image
    const reader = new FileReader();
    reader.onload = () => {
      setImagePath(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/uploads",
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
  
      async function getUserDetails() {
        const userDetails = await axios.get("http://localhost:5000/api/users/", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
  
        //   console.log(userDetails.data.data)
  
        setData(userDetails.data.data);
  
        if (userDetails?.data?.data?.profilePicture) {
          setProfileImageUrl(
            import.meta.env.VITE_AWS_CLOUDFRONT_URL +
              userDetails.data.data.profilePicture
          );
        } else {
          setProfileImageUrl(null);
        }
      }
  
      getUserDetails();
      console.log(`File upload response: \n${response}`);
    } catch (error) {
      console.log("Image upload error : ", error)
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3 h-screen">
      <div className="w-[15em]">
        {profileImageUrl ? (
          <img src={profileImageUrl} alt="profile_pic" className="rounded-md" />
        ) : file ? (
          <img src={imagePath} alt="chosen_image" className="max-w-[10em] object-cover" />
        ) : (
          <div className="flex justify-center items-center w-[10em] h-[10em] bg-gray-300">
            <p className="text-slate-600">No photo available</p>
          </div>
        )}
        <form onSubmit={submitHandler} className="flex flex-col gap-2">
          <label htmlFor="profile_pic" className="block text-slate-600">
            Upload a photo
          </label>
          <input
            id="profile_pic"
            type="file"
            name="file"
            className="block text-slate-600"
            onChange={fileChangeHandler}
          />
          {
            profileImageUrl ? "" : (
              <button className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">Upload</button>
            )
          }
        </form>
      </div>
      <div className="w-1/3 bg-blue-100 p-3">
        <h1 className="text-xl font-semibold underline">Profile details</h1>
        <div className="">
          <table className="w-full">
            <tbody>
              <tr>
                <td>Username:</td>
                <td>{data === null ? "Loading" : data?.userName}</td>
              </tr>
              <tr>
                <td>First Name:</td>
                <td>{data === null ? "Loading" : data?.firstName}</td>
              </tr>
              <tr>
                <td>Last Name:</td>
                <td>{data === null ? "Loading..." : data?.lastName}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{data === null ? "Loading..." : data?.email}</td>
              </tr>
              <tr>
                <td>Mobile:</td>
                <td>{data === null ? "Loading..." : data?.mobileNumber}</td>
              </tr>
              <tr>
                <td>Verified:</td>
                <td>
                  {data === null
                    ? "Loading..."
                    : data?.isVerified
                    ? "Yes"
                    : "No"}
                </td>
              </tr>
              <tr>
                <td>Notification:</td>
                <td>
                  {data === null
                    ? "Loading..."
                    : data?.isNotificationOn
                    ? "On"
                    : "Off"}
                </td>
              </tr>
              <tr>
                <td>Favourites:</td>
                <td>
                  {data === null
                    ? "Loading"
                    : data?.favouritePlaces?.length === 0
                    ? "No favourites added"
                    : data?.favouritePlaces?.map((place, idx) => (
                        <div key={idx}>{place}</div>
                      ))}
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
