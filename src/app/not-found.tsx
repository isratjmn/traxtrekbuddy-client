import React from 'react';
import Image from 'next/image';

const NotFound = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
            <h1 style={{ fontSize: '40px', fontWeight: 800 }}>404!! Not Found!!</h1>
            <Image
                src="https://img.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg?t=st=1714353543~exp=1714357143~hmac=d327c37bb40be04e02ecb7199ba4bf81f0d3c37592d2df345bf4e3790d6c628a&w=826"
                alt="404 Error"
                width={826}
                height={551}
                style={{ marginTop: '20px', maxWidth: '100%', height: 'auto' }}
            />
        </div>
    );
};

export default NotFound;