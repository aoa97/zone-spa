import React from 'react';

import { AppContainer, VerifyMessage, NewPost, NoPostMessage } from '../components'

const HomePage = () => {
    return (
        <AppContainer right active='home'>
            <NewPost />

            <VerifyMessage />

            <NoPostMessage />
        </AppContainer>
    );
}

export default HomePage;