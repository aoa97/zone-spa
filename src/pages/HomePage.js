import React from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const { user } = useSelector(state => state.userState)

    return (
        <>
            {user && <p>Hello {user.displayName} ^^</p>}
        </>
    );
}

export default HomePage;