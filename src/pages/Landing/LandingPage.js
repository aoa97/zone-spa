import React, { useState } from 'react';
import { Button, Card, Form, Grid, Icon, Divider, Header, Message } from 'semantic-ui-react';

import { auth, signInWithGoogle } from '../../utils/firebase.utils';
import RegisterModal from '../../components/RegisterModal';
import './LandingPage.scss'

const LandingPage = () => {
    // Login States
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState(null)
    const [registerModal, setRegisterModal] = useState(false)

    const loginHandler = async () => {
        try {
            await auth.signInWithEmailAndPassword(email, password)
            setEmail('')
            setPassword('')
            setError(null)
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <>
            {/* Register Modal */}
            <RegisterModal open={registerModal} onClose={() => setRegisterModal(false)} />

            <Grid container>
                <Grid.Column computer={10} only='computer'>Left</Grid.Column>

                <Grid.Column computer={6} tablet={16} mobile={16} className='landing__right'>
                    <Card fluid raised>
                        <Card.Content>
                            <Header className='text-center'>Welcome Back</Header>

                            <Form loading={false}>
                                <Form.Input
                                    label="E-mail address"
                                    placeholder="E-mail address"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
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
                                        header='Login Error'
                                        content={error}
                                    />
                                )}

                                <Button.Group fluid>
                                    <Button primary onClick={loginHandler}>Sign In</Button>

                                    <Button.Or />

                                    <Button
                                        basic
                                        primary
                                        onClick={() => signInWithGoogle()}
                                    >
                                        <Icon name='google' />With Google
                                    </Button>
                                </Button.Group>
                            </Form>

                            <Divider />

                            <div className="center-block-h">
                                <Button
                                    color='green'
                                    className="center"
                                    onClick={() => setRegisterModal(true)}
                                >
                                    New Account
                                </Button>
                            </div>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid>
        </>
    );
}

export default LandingPage;