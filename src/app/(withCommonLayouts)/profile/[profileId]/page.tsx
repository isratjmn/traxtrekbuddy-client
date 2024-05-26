"use client";
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useUpdateMyProfileMutation } from '@/redux/api/profileApi';

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import TTForms from '@/component/Forms/TTForms';
import TTInput from '@/component/Forms/TTInput';

const EditProfileForm = ({ userData }: { userData: any; }) => {
    const router = useRouter();

    const defaultValues = {
        email: userData?.user?.email || "",
        age: userData?.age || "",
        bio: userData?.bio || "",
        name: userData?.user?.name || "",
    };
    const [updateMyProfile, { isLoading: updating }] =
        useUpdateMyProfileMutation({});
    ;
    const onSubmit = async (values: FieldValues) => {
        try
        {
            const res = await updateMyProfile(values).unwrap();
            console.log(res);
            if (res?.id)
            {
                toast.success("Profile updated successfully");

                if (userData?.user?.email !== values.email)
                {
                    // logoutUser(router)
                }
            }
            console.log('Profile updated successfully');
        } catch (error)
        {
            console.error('Error updating profile:', error);
        }
    };
    return (
        <div>
            <TTForms
                onSubmit={onSubmit}
                // resolver={zodResolver(passwordValidateSchema)}
                defaultValues={defaultValues}
            >

                <div className="grid grid-cols-1 pt-4 gap-4 md:grid-cols-2 mt-2 mb-4">
                    <div>
                        <TTInput
                            name="bio"
                            label="bio"
                            type="text"
                            fullWidth={true}
                        />
                    </div>
                    <div>
                        <TTInput
                            name="age"
                            label="age"
                            type="text"
                            fullWidth={true}
                        />
                    </div>
                </div>
                <div>
                    <TTInput
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth={true}
                    />
                </div>
                <div>
                    <TTInput
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth={true}
                    />
                </div>
                <button
                    className="w-full text-lg py-2 bg-green-500 text-white rounded mt-2"
                    type="submit"
                    disabled={updating}
                >
                    {updating ? "Updating ..." : "Updated"}
                </button>
            </TTForms>
        </div>
    );
};

export default EditProfileForm;
