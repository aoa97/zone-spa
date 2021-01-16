import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Message, Button } from 'semantic-ui-react';

import { updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UpdateEmailModal = ({ open, onClose }) => {
    const dispatch = useDispatch()

    const { loading, success, error } = useSelector(state => state.userUpdate)

    const [email, setEmail] = useState('')

    const onCloseModal = () => {
        onClose()
        setEmail('')
        dispatch({ type: USER_UPDATE_RESET })
    }

    return (
        <Modal closeIcon centered={false} size='mini' open={open} onClose={onCloseModal}>
            <Modal.Header className='text-center'>Update Your E-mail</Modal.Header>

            <Modal.Content>
                {!success ? (
                    <Form loading={loading}>
                        <Form.Input
                            required
                            label="E-mail address"
                            placeholder="E-mail address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        {error && (
                            <Message
                                negative
                                content={error}
                            />
                        )}

                        <Button
                            primary
                            fluid
                            disabled={email.length === 0}
                            onClick={() => dispatch(updateUser({ email }))}
                        >
                            Submit
                        </Button>
                    </Form>
                ) : <Message positive icon='check circle outline' content="Your email has been updated successfully." />}
            </Modal.Content>
        </Modal>
    );
}

export default UpdateEmailModal;