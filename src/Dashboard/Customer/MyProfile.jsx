import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Auth/AuthProvider";

const MyProfile = () => {
  const { user, ProfileUpdate } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [selectedFile, setSelectedFile] = useState(null);

  const IMGBB_API_KEY =import.meta.env.VITE_FIREBASE_image; 

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Upload the selected image to IMGBB and get the URL
  const uploadProfilePicture = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setPhotoURL(data.data.url);
        toast.success("Profile picture uploaded successfully!");
      } else {
        toast.error("Failed to upload profile picture.");
      }
    } catch (error) {
      toast.error(`Upload failed: ${error.message}`);
    }
  };

  // Handle profile updates
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
    <div className="flex justify-center py-10 px-5 bg-gray-100 min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">My Profile</h2>

        {user?.photoURL && (
          <div className="flex justify-center mb-4">
            <img
              src={user.photoURL}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="text"
            value={user?.email || ""}
            disabled
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter your name"
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Photo URL</label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="Enter photo URL"
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Upload Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          <button
            onClick={uploadProfilePicture}
            className="btn btn-secondary w-full mt-2"
          >
            Upload Picture
          </button>
        </div>

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
