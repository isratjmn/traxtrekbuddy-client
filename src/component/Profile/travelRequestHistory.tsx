
import React from 'react';

const TravelRequestHistory = ({ requests }: { requests: any[]; }) => {
    return (
        <div>
            <h2>Travel Request History</h2>
            <ul>
                {requests.map((request) => (
                    <li key={request.id}>
                        <div>Destination: {request.trip.destination}</div>
                        <div>Status: {request.status}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TravelRequestHistory;
