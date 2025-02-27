import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Image, Input, Segment } from 'semantic-ui-react'

import CreatePostModal from './CreatePostModal'

const NewPost = ({ com }) => {
    const { user } = useSelector(state => state.userState)
    const fname = user.displayName ? user.displayName.split(' ')[0] : ""

    const [modal, setModal] = useState(false)

    return (
        <>
            <CreatePostModal
                open={modal}
                onClose={() => setModal(false)}
                user={user}
                com={com}
            />

            <Segment style={{ display: 'flex' }}>
                <Image
                    avatar
                    bordered
                    style={{ marginRight: 10 }}
                    src={user.avatar}
                />

                <Input
                    transparent
                    size='large'
                    placeholder={`What's new ${fname}?`}
                    onClick={() => setModal(true)}
                />
            </Segment>
        </>
    );
}

export default NewPost;