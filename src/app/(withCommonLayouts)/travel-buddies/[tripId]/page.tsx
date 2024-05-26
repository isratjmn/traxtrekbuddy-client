
import { useGetBuddyRequestQuery } from '@/redux/api/travelBuddyApi';
import { ApiError } from 'next/dist/server/api-utils';
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";

type TParams = {
    params: { tripId: string; };
};

const TravelRequestHistory = (
    { params }: TParams
) => {
    const id = params?.tripId;

    console.log('Received tripId:', id);

    const { data: getBuddyRequest, isLoading, error } = useGetBuddyRequestQuery(id);
    console.log(getBuddyRequest);

    if (isLoading) return <p>Loading...</p>;

    if (error) return <p> Error loading travel requests: {(error as ApiError)?.message}</p>;


    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">Travel Request History</h2>
            <ul className="list-disc pl-6">
                {getBuddyRequest?.map((request: any) => (
                    <li key={request?.id} className="mb-4">
                        <p className="font-semibold">Destination: {request?.destination}</p>
                        <p>Status: {request?.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TravelRequestHistory;

