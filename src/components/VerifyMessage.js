import React from 'react';
import { Button, Message, Icon } from 'semantic-ui-react';

import { auth } from '../utils/firebase.utils';

const VerifyMessage = () => (auth.currentUser && !auth.currentUser.emailVerified) && (
    <Message info style={{ alignItems: 'flex-start' }}>
        <Message.Content>
            <Message.Header>Verify your account</Message.Header>

            <p>All beautiful Zone users verify their email address. Check your inbox for the message we just sent {':)'}</p>

            <div style={{
                display: 'flex',
                justifyContent: 'flex-start',
            }}>
                <Button.Group>
                    <Button>Update E-mail</Button>
                    <Button.Or />
                    <Button primary>Resend</Button>
                </Button.Group>
            </div>
        </Message.Content>
    </Message>
)

export default VerifyMessage;