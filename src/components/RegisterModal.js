import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button, Message } from 'semantic-ui-react';

import { registerUser } from '../actions/userActions';

const RegisterModal = ({ open, onClose }) => {
    const dispatch = useDispatch()
    const { loading, error } = useSelector(state => state.userRegister)

    // States
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <Modal closeIcon centered={false} size='mini' open={open} onClose={onClose}>
            <Modal.Header className='text-center'>Create Your Account</Modal.Header>

            <Modal.Content>
                <Form loading={loading}>
                    <Form.Input
                        required
                        label="Full Name"
                        placeholder="Full Name"
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                    />

                    <Form.Input
                        required
                        label="E-mail address"
                        placeholder="E-mail address"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <Form.Input
                        required
                        type="password"
                        label="Password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
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
                        onClick={() => dispatch(registerUser(displayName, email, password))}
                    >Sign Up</Button>
                </Form>
            </Modal.Content>
        </Modal>

    );
}

export default RegisterModal;