import React from 'react'

const Profile = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 h-screen">
        <div className="h-[7em] w-[7em] bg-red-200 rounded-full"></div>
        <div className="w-1/3 bg-blue-100 p-3">
            <h1 className="text-xl font-semibold underline">Profile details</h1>
            <div className="">
                <table className="w-full">
                    <tr>
                        <td>Username:</td>
                        <td>Dummy Name</td>
                    </tr>
                    <tr>
                        <td>First Name:</td>
                        <td>Dummy Name</td>
                    </tr>
                    <tr>
                        <td>Last Name:</td>
                        <td>Dummy Name</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>Dummy Name</td>
                    </tr>
                    <tr>
                        <td>Mobile:</td>
                        <td>Dummy Name</td>
                    </tr>
                    <tr>
                        <td>Verified:</td>
                        <td>Dummy Name</td>
                    </tr>
                    <tr>
                        <td>Notification:</td>
                        <td>Dummy Name</td>
                    </tr>
                    <tr>
                        <td>Favourites:</td>
                        <td>Dummy Name</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Profile