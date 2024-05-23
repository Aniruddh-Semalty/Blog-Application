import React, { useEffect, useState } from "react";

import { TextArea } from "./TextArea";
import { useProfile } from "../hooks/useProfile";
import { batch } from "react-redux";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { ConfirmedModal } from "./ConfirmedModal";

export const UpdateModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;
  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState();
  const [about, setAbout] = useState();

  const [openConfirmModal, setConfirmModal] = useState(false);
  const closeConfirmModal = () => {
    setConfirmModal(false);
    window.location.reload();
  };

  const getData = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/user/profile`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    setUsername(response.data.user.name);
    setAbout(response.data.user.about);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  const updateProfile = async () => {
    const response = await axios.put(
      `${BACKEND_URL}/api/v1/user/update`,
      {
        username,
        about,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    setConfirmModal(true);
  };
  return (
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        {loading ? (
          <div className="bg-white p-6 rounded-lg shadow-lg ">
            <Spinner />
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg ">
            <div>
              <h2 className=" text-center text-xl font-bold mb-4">
                Update Profile
              </h2>
              <div className="flex flex-col">
                <label className="text-md font-semibold">Username</label>

                <input
                  type="text"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="Enter username"
                  value={username}
                  className="h-8 rounded-md p-2 my-2"
                ></input>
              </div>
            </div>

            <div className="flex flex-col m-2">
              <label className="text-md font-semibold">About</label>

              <textarea
                rows="10"
                cols="70"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={updateProfile}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-green-500"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
      <ConfirmedModal
        isVisible={openConfirmModal}
        onClose={closeConfirmModal}
        text="Profile updated successfully"
      />
    </>
  );
};

const Spinner = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  );
};
