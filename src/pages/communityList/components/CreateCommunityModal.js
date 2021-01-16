import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form, Message } from 'semantic-ui-react';

import { createCom } from '../../../actions/comActions';

const CreateCommunityModal = ({ open, onClose }) => {
    const dispatch = useDispatch()

    // Selectors
    const { loading, success, error } = useSelector(state => state.comCreate)

    // States
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const onCloseModal = () => {
        onClose()
        setName('')
        setDescription('')
    }

    useEffect(() => {
        if (success) {
            onClose()
            setName('')
            setDescription('')
        }
    }, [success])


    return (
        <Modal closeIcon centered={false} size='tiny' open={open} onClose={onCloseModal}>
            <Modal.Header className='text-center'>Create Community</Modal.Header>

            <Modal.Content>
                <Form>
                    <Form.Input
                        required
                        placeholder='Name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <Form.Input
                        required
                        placeholder='Description'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <Button
                        fluid
                        primary
                        loading={loading}
                        disabled={name.length === 0 || description.length === 0}
                        onClick={() => dispatch(createCom({ name, description }))}
                    >
                        Create community
                    </Button>

                    {error && <Message negative content={error} />}
                </Form>
            </Modal.Content>
        </Modal>
    );
}

export default CreateCommunityModal;