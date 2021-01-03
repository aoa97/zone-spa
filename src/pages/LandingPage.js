import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Form, Icon, Divider, Header, Message } from 'semantic-ui-react';

import { loginUser, loginWithGoogle } from '../actions/userActions';
import RegisterModal from '../components/RegisterModal';

const LandingPage = () => {
    const dispatch = useDispatch()
    const { loading, error } = useSelector(state => state.userLogin)

    // States
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [registerModal, setRegisterModal] = useState(false)

    return (
        <>
            {/* Register Modal */}
            <RegisterModal
                open={registerModal}
                onClose={() => setRegisterModal(false)}
            />

            <div style={styles.img}>
                <div style={styles.over} className="center-v" >
                    <Card centered raised>
                        <Card.Content>
                            <Header className='text-center'>Welcome Back</Header>

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

                                {error && (
                                    <Message
                                        negative
                                        content={error}
                                    />
                                )}

                                <Button.Group fluid>
                                    <Button
                                        primary
                                        onClick={() => dispatch(loginUser(email, password))}
                                    >Sign In</Button>

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

                            <Divider />

                            <div className="center-h">
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
                </div>
            </div>
        </>
    );
}

const styles = {
    img: {
        backgroundImage: "url(/images/background.jpg)",
        height: '100vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    over: {
        backgroundColor: 'rgba(0, 0, 0, .3)'
    }
}

export default LandingPage;