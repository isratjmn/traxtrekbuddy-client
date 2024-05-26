
import React from 'react';
import Image from 'next/image';
import { useGetTripQuery } from '@/redux/api/tripApi';
type TravelPostsProps = {
    tripId: string;
};

const TravelPosts = ({ tripId }: TravelPostsProps) => {
    const { data: getTrip, isLoading, error } = useGetTripQuery(tripId);
    console.log(getTrip);

    if (isLoading) return <p>Loading...</p>;

    // if (error) return <p>Error loading travel posts: {error?.message}</p>;


    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">My Travel Posts</h2>
            <ul className="list-disc pl-6">
                {getTrip?.map((post: any) => (
                    <li key={post?.id} className="mb-4">
                        {/* <Image src={post.photo} alt={post.destination} width={200} height={150} /> */}
                        <p className="font-semibold">Destination: {post.destination}</p>
                        <p>Description: {post?.description}</p>
                        <p>Travel Dates: {post?.travelDates}</p>


                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TravelPosts;
