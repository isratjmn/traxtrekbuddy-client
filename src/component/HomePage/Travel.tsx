
import Link from 'next/link';
import TravelCard from '../UI/HomePage/TravelSection/TravelCard';


const formatDateString = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};


const Travel = async () => {
    const res = await fetch("http://localhost:5000/api/trips", {
        next: {
            revalidate: 30
        }
    });
    if (!res.ok)
    {
        console.error("Failed to fetch trips");
        return <div>Failed to load trips</div>;
    }

    const { data: trips } = await res.json();
    console.log(trips);

    return (
        <div className="container mx-auto px-4 py-32">
            <h1 className="text-4xl mx-auto font-bold mb-16">Recent Travel Posts</h1>
            <div className="flex flex-wrap -mx-4">
                {trips.slice(0, 6).map((trip: any, index: any) => (
                    <TravelCard key={index} trip={{ ...trip, startDate: formatDateString(trip.startDate), endDate: formatDateString(trip.endDate) }} />
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <Link href="/travels">
                    <button className="bg-green-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40 text-center">
                        See More
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Travel;