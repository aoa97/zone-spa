import React, { useState } from 'react';
import { Button, Message, Popup } from 'semantic-ui-react';

import { auth } from '../utils/firebase.utils';
import UpdateEmailModal from './UpdateEmailModal';

const VerifyMessage = () => {
    // Resend states
    const [loadingResend, setLoadingResend] = useState(false)
    const [popResend, setPopResend] = useState(false)

    // Update states
    const [updateEmailModal, setUpdateEmailModal] = useState(false)


    const handleResend = async () => {
        // On req
        setLoadingResend(true)

        await auth.currentUser.sendEmailVerification()

        // On res
        setPopResend(true)
        setLoadingResend(false)
    }

    return (
        <>
            <UpdateEmailModal open={updateEmailModal} onClose={() => setUpdateEmailModal(false)} />

            {(auth.currentUser && !auth.currentUser.emailVerified) && (
                <Message info>
                    <Message.Content>
                        <Message.Header>Verify your account</Message.Header>

                        <p>All beautiful Zone users verify their email address. Check your inbox for the message we just sent {':)'}</p>

                        <Button.Group>
                            <Button onClick={() => setUpdateEmailModal(true)}>Update E-mail</Button>

                            <Button.Or />

                            <Popup
                                open={popResend}
                                onOpen={() => setTimeout(() => setPopResend(false), 5000)}
                                on='click'
                                header="Sent"
                                content='Another verification message has been sent, please check your account.'
                                trigger={<Button primary loading={loadingResend} onClick={handleResend}> Resend</Button>}
                            />
                        </Button.Group>
                    </Message.Content>
                </Message>
            )}
        </>
    )
}

export default VerifyMessage;