import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Message, Button } from 'semantic-ui-react';

import { updateUser } from '../../../actions/userActions';
import { USER_UPDATE_RESET } from '../../../constants/userConstants';

const EditProfileModal = ({ open, onClose }) => {
    const dispatch = useDispatch()

    // Selectors
    const { user } = useSelector(state => state.userState)
    const { loading, success, error } = useSelector(state => state.userUpdate)

    // States
    const [email, setEmail] = useState(user && user.email)
    const [phone, setPhone] = useState(user && user.phone)
    const [birthdate, setBirthdate] = useState(user.birthdate && user.birthdate.toDate().toISOString().substring(0, 10))

    const onCloseModal = () => {
        onClose()
        dispatch({ type: USER_UPDATE_RESET })
    }

    return (
        <Modal closeIcon centered={false} size='mini' open={open} onClose={onCloseModal}>
            <Modal.Header className='text-center'>Update Your E-mail</Modal.Header>

            <Modal.Content>
                {success
                    ? <Message positive icon='check circle outline' content="Your profile has been updated successfully." />
                    :
                    <Form loading={loading}>
                        <Form.Input
                            label="E-mail address"
                            placeholder="E-mail address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <Form.Input
                            label="Phone"
                            placeholder="Phone"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />

                        <Form.Input
                            type='date'
                            label="Birthdate"
                            placeholder="Birthdate"
                            value={birthdate}
                            onChange={e => setBirthdate(e.target.value)}
                        />

                        {error && <Message negative content={error} />}

                        <Button
                            primary
                            fluid
                            onClick={() => dispatch(updateUser({ email, phone, birthdate: new Date(birthdate) }))}
                        >
                            Save
                        </Button>
                    </Form>
                }
            </Modal.Content>
        </Modal>
    );
}

export default EditProfileModal;