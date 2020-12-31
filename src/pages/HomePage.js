import React from 'react';

import { AppContainer, VerifyMessage, NewPost, NoPostMessage } from '../components'

const HomePage = () => {
    return (
        <AppContainer right>
            <NewPost />

            <VerifyMessage />

            <NoPostMessage />
        </AppContainer>
    );
}

export default HomePage;