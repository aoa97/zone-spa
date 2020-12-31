import React from 'react';
import { Image, Segment } from 'semantic-ui-react'

const NoPostMessage = () => {
    return (
        <Segment style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Image src='/images/post.png' />
            <p style={{ marginTop: 8 }}> There are no posts yet.</p>
        </Segment>
    );
}

export default NoPostMessage;