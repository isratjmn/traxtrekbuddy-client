import FilterForm from '@/component/Forms/FilterForm';
import Travel from '@/component/HomePage/Travel';
import AboutUs from '@/component/UI/HomePage/AboutUs/page';
import HeroSection from '@/component/UI/HomePage/HeroSection/HeroSection';

import React from 'react';

const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <FilterForm />
            <AboutUs />
            <Travel />

        </div>
    );
};

export default HomePage;