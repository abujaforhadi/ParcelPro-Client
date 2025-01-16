import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Auth/AuthProvider";

const MyProfile = () => {
  const { user, ProfileUpdate } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleUpdateProfile = async () => {
    if (!user) return;

    if (displayName === user.displayName && photoURL === user.photoURL) {
      toast.info("No changes to save.");
      return;
    }

    try {
      await ProfileUpdate(displayName, photoURL);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  return (
    <div className="flex justify-center py-10 px-5">
      
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

        {user?.photoURL && (
          <div className="flex justify-center mb-4">
            <img
              src={user.photoURL}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-2 border-gray-300"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="text"
            value={user?.email || ""}
            disabled
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter your name"
            className="input input-bordered w-full"
          />
        </div>

        {/* Update the photo URL */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Photo URL
          </label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="Enter photo URL"
            className="input input-bordered w-full"
          />
        </div>

        {/* Save changes button */}
        <button
          onClick={handleUpdateProfile}
          className="btn btn-primary w-full mt-4"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default MyProfile;