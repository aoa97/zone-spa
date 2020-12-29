import React, { useState } from 'react';
import { Modal, Form, Button, Message } from 'semantic-ui-react';

import { auth, createUserProfileDocument } from '../utils/firebase.utils';

const RegisterModal = ({ open, onClose }) => {
    const [displayName, setDisplayName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState(null)

    const registerHandler = async () => {
        try {
            await auth.createUserWithEmailAndPassword(email, password)
            await auth.currentUser.updateProfile({ displayName })

            setDisplayName('')
            setUsername('')
            setEmail('')
            setPassword('')
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <Modal closeIcon centered={false} size='mini' open={open} onClose={onClose}>
            <Modal.Header className='text-center'>Create Your Account</Modal.Header>

            <Modal.Content>
                <Form loading={false}>
                    <Form.Input
                        label="Full Name"
                        placeholder="Full Name"
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                    />

                    <Form.Input
                        label="E-mail address"
                        placeholder="E-mail address"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <Form.Input
                        label="Username"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />

                    <Form.Input
                        type="password"
                        label="Password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    {error && (
                        <Message
                            negative
                            header='Create User Error'
                            content={error}
                        />
                    )}

                    <Button primary fluid onClick={registerHandler}>Sign Up</Button>
                </Form>
            </Modal.Content>
        </Modal>

    );
}

export default RegisterModal;