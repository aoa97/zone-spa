import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Icon, Message } from 'semantic-ui-react';

import { loginUser, loginWithGoogle } from '../../../actions/userActions';

const LoginForm = () => {
    const dispatch = useDispatch()

    // Selectors
    const { loading, error } = useSelector(state => state.userLogin)

    // States
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <Form loading={loading}>
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

            {error && <Message negative content={error} />}

            <Button.Group fluid>
                <Button
                    primary
                    onClick={() => dispatch(loginUser(email, password))}
                >
                    Sign In
                </Button>

                <Button.Or />

                <Button
                    basic
                    primary
                    onClick={() => dispatch(loginWithGoogle())}
                >
                    <Icon name='google' />With Google
                </Button>
            </Button.Group>
        </Form>
    );
}

export default LoginForm;