import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Image, Button, Message } from 'semantic-ui-react';

import { createPost } from '../../actions/postActions';

const CreatePostModal = ({ open, onClose }) => {
    const dispatch = useDispatch()

    // Selectors
    const { user } = useSelector(state => state.userState)
    const { loading, success, error } = useSelector(state => state.postCreate)

    const [text, setText] = useState('')

    const handleCreatePost = () => {
        dispatch(createPost({ text }))
    }

    useEffect(() => {
        if (success) {
            onClose()
        }
    }, [success])

    const fname = user.displayName ? user.displayName.split(' ')[0] : ""
    return (
        <Modal closeIcon centered={false} size='tiny' open={open} onClose={onClose}>
            <Modal.Header className='text-center'>Create Post</Modal.Header>

            <Modal.Content>
                <Image
                    centered
                    avatar
                    size='tiny'
                    src={user.avatar}
                    style={{ marginBottom: 6 }}
                />

                <Form>
                    <Form.TextArea
                        placeholder={`What's on your mind, ${fname}?`}
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />

                    <Button
                        fluid
                        primary
                        loading={loading}
                        disabled={text.length === 0}
                        onClick={handleCreatePost}
                    >
                        Post
                    </Button>

                    {error && <Message negative content={error} />}
                </Form>
            </Modal.Content>
        </Modal>
    );
}

export default CreatePostModal;