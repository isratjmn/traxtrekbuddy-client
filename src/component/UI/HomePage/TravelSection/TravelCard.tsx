import Image from 'next/image';
import Link from 'next/link';

const TravelCard = ({ trip }: { trip: any; }) => {
    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 p-4 flex">
            <div className="bg-white rounded overflow-hidden shadow-lg flex flex-col justify-between w-full">
                {trip.photos && (
                    <Image className="w-full" src={trip.photos} alt={trip?.destination} width={400} height={300} />
                )}

                <div className="px-4 font-bold text-xl mt-4">{trip?.destination}</div>

                <div className="px-4 pt-4 pb-2 flex justify-start items-center space-x-2">
                    <strong className="text-gray-600 text-lg">Travel dates:</strong>
                    <span className="text-gray-600 text-lg">{trip.startDate}</span>
                    <span className="text-gray-600 text-lg"> - </span>
                    <span className="text-gray-600 text-lg">{trip.endDate}</span>
                </div>

                <span className="text-gray-600 text-lg px-4">
                    <strong>Travel Type: </strong>

                    {trip?.travelType}</span>

                <div className="px-4 py-6">
                    <Link href={`/trips/${trip.id}`}>
                        <button className="bg-green-400 text-white font-bold py-2 px-4 rounded border border-transparent hover:border-green-400 focus:outline-none">
                            View Details
                        </button>
                    </Link>


                </div>
            </div>
        </div>
    );
};

export default TravelCard;
