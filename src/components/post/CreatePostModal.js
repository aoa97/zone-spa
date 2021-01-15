import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Image, Button, Message, Label } from 'semantic-ui-react';

import { createCommunityPost, createProfilePost } from '../../actions/postActions';
import UploadButton from '../UploadButton'

const CreatePostModal = ({ open, onClose, com }) => {
    const dispatch = useDispatch()

    // Selectors
    const { user } = useSelector(state => state.userState)
    const { loading, success, error } = useSelector(state => state.postCreate)

    // States
    const [text, setText] = useState('')
    const [image, setImage] = useState(null)

    const handleCreatePost = () => {
        if (com) {
            dispatch(createCommunityPost(com, { text, image }))
        } else {
            dispatch(createProfilePost({ text, image }))
        }
    }

    const handleUploadImage = (e) => {
        const types = ['image/png', 'image/jpeg']
        const selected = e.target.files[0]
        if (selected && types.includes(selected.type)) {
            setImage(selected)
        } else {
            alert("Please upload an image")
        }
    }

    useEffect(() => {
        if (success) {
            onClose()
            setText('')
        }
    }, [success])

    const fname = user.displayName ? user.displayName.split(' ')[0] : ""
    return (
        <Modal closeIcon centered={false} size='tiny' open={open} onClose={onClose}>
            <Modal.Header className='text-center'>Create Post</Modal.Header>

            <Modal.Content>
                {/* <Image
                    centered
                    avatar
                    size='mini'
                    src={user.avatar}
                    style={{ border: '1px solid #2185d0' }}
                /> */}

                <Form>
                    <Form.TextArea
                        placeholder={`What's on your mind, ${fname}?`}
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />

                    <Button
                        primary
                        loading={loading}
                        disabled={text.length === 0}
                        onClick={handleCreatePost}
                    >
                        Post
                    </Button>


                    <div style={{ float: 'right' }} >
                        {image && <Label style={{ marginRight: 10 }}>{image.name}</Label>}

                        <Button.Group basic size='small'>
                            <UploadButton onChange={handleUploadImage} icon='image' />
                            <UploadButton icon='video' />
                            <UploadButton icon='attach' />
                        </Button.Group>
                    </div>

                    {error && <Message negative content={error} />}
                </Form>
            </Modal.Content>
        </Modal>
    );
}

export default CreatePostModal;