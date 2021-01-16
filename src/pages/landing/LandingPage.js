import { useState } from 'react';
import { Button, Card, Divider, Header } from 'semantic-ui-react';

import { RegisterModal, LoginForm } from './components';

const LandingPage = () => {
    // States
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

                            <LoginForm />

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