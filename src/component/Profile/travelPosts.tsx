
import React from 'react';

const TravelPosts = ({ posts }: { posts: any[]; }) => {
    return (
        <div>
            <h2>Travel Posts</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <div>Destination: {post.destination}</div>
                        {post.photos && <img src={post.photos} alt="post" />}
                        <div>{post.description}</div>
                        <div>From: {new Date(post.startDate).toLocaleDateString()}</div>
                        <div>To: {new Date(post.endDate).toLocaleDateString()}</div>
                        <button>Edit</button>
                        <button>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TravelPosts;
