"use client";

import { useGetMyProfileQuery, useUpdateMyProfileMutation } from '@/redux/api/profileApi';
import React, { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Image3 from "../../../../public/assets/image-3.jpg";
import FileUploader from '@/component/Forms/FileUploader';
import { FaUpload } from 'react-icons/fa';
import Link from 'next/link';

import TravelPosts from '@/component/Profile/travelPosts';
import TravelRequestHistory from '../travel-buddies/[tripId]/page';


const MyProfile = () => {
  const router = useRouter();
  const { data, isLoading } = useGetMyProfileQuery({});
  const myProfile = data?.myProfile || [];

  const [updateMyProfile, { isLoading: uploading }] = useUpdateMyProfileMutation({});

  const id = data?.id;
  console.log(id);
  const [loading, setLoading] = useState(false);
  const fileUploadHandler = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({}));
    updateMyProfile(formData);
  };

  const handleClick = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push('http://localhost:3000/dashboard/change-password');
  };

  return (
    <div className="container mx-auto px-4 py-10 ">
      <h5 className="text-green-500 mb-4 text-3xl py-6 font-extrabold">Personal Information</h5>
      <div className="flex flex-wrap">

        <div className="w-full md:w-[40%] mb-4 md:pr-4 ">
          <Image src={Image3} width={500} height={500} alt="brand logo" />

          <div className="flex flex-wrap mt-10 w-full">
            <div className="w-[100%] lg:w-[92%] mb-3 text-lg">
              {uploading ? (
                <span>Uploading.....</span>
              ) : (
                <FileUploader
                  name="file"
                  label="Image Upload"
                  icon={<FaUpload />}
                  onFileUpload={fileUploadHandler}
                  variant="text"
                  className="text-center md:w-1/2 py-3 bg-green-500  rounded"
                />
              )}
            </div>


            <div className="w-full lg:w-[92%] flex justify-center">
              <button
                className="w-full text-lg py-2 bg-green-500 text-white rounded mt-2 flex items-center justify-center"
                type="button"
                onClick={handleClick}
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full"
                    viewBox="0 0 24 24"
                  ></svg>
                ) : (
                  'Change Password'
                )}
              </button>
            </div>
          </div>

        </div>
        <div className="w-full md:w-[55%]">
          <div className="grid grid-cols-1 gap-4">
            <InformationBox label="Name" value={data?.name} />
            <InformationBox label="Email" value={data?.email} />
            {/* <InformationBox label="Bio" value={data?.userProfile?.bio} />
            <InformationBox label="Age" value={data?.userProfile?.age} /> */}
          </div>
          <Link href={`/profile/${id}`}>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 rounded mt-4"
            >
              Edit Your Profile
            </button>
          </Link>
          <TravelRequestHistory params={{ tripId: id }} />
          <TravelPosts tripId={id} />

        </div>
      </div>
    </div>
  );
};
const InformationBox = ({ label, value }: { label: string; value: string | number | Date; }) => {
  const displayValue = value instanceof Date ? value.toLocaleDateString() : value;
  return (
    <div className="bg-gray-100 rounded p-4">
      <p className="text-secondary font-semibold">{label}</p>
      <p>{displayValue}</p>
    </div>
  );
};


export default MyProfile;
