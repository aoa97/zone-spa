import React from 'react';
import { useSelector } from 'react-redux';
import { Image, Input, Segment } from 'semantic-ui-react'

const NewPost = () => {
    const { user } = useSelector(state => state.userState)
    const fname = user.displayName ? user.displayName.split(' ')[0] : ""

    return (
        <Segment style={{ display: 'flex' }}>
            <Image
                avatar
                style={{ marginRight: 10 }}
                src={user.avatar}
            />

            <Input
                transparent
                size='large'
                placeholder={`What's new ${fname}?`}
            />
        </Segment>
    );
}

export default NewPost;