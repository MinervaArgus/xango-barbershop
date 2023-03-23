import React from "react";


const Home = () => {
    const backgroundImage = 'url(../styles/Xango.png)';

    return (
        <div
            className="tw-bg-cover tw-bg-no-repeat tw-bg-center tw-min-h-screen"
            style={{backgroundImage}}        
        >
            <h1>Home</h1>
        </div>
    );
};

export default Home;