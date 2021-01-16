import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loader, Message, List, Image, Button, Tab } from 'semantic-ui-react';

import { confirmFriendRequest, deleteFriendRequest, getFriendRequests } from '../../../actions/userActions';

const FriendRequests = () => {
    const dispatch = useDispatch()

    // Selectors
    const { loading, requests, error } = useSelector(state => state.userRequestList)
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = useSelector(state => state.userRequestDelete)
    const { loading: loadingConfirm, success: successConfirm, error: errorConfirm } = useSelector(state => state.userRequestConfirm)

    useEffect(() => {
        dispatch(getFriendRequests())
    }, [dispatch, successDelete, successConfirm])

    return (
        <Tab.Pane>
            <List>
                {error && <Message negative content={error} />}

                {loading ? <Loader active inline='centered' /> : (
                    <>
                        {requests.length === 0 && (
                            <Message info style={{ textAlign: 'center', padding: 20 }} content='No requests received.' />
                        )}

                        {requests.length > 0 &&
                            requests.map(user => (
                                <List.Item className='friends__list__item' key={user.id} style={{ marginBottom: 5 }}>
                                    <Image
                                        avatar
                                        bordered
                                        size='mini'
                                        src={user.avatar}
                                    />

                                    <List.Content as={Link} to={`users/${user.id}`}>
                                        {user.displayName}
                                        <p className='text-meta'>{user.status}</p>
                                    </List.Content>

                                    <List.Content floated='right'>
                                        <>
                                            <Button
                                                primary
                                                size='tiny'
                                                loading={loadingConfirm}
                                                onClick={() => dispatch(confirmFriendRequest(user.id, user.uid))}
                                            >
                                                Confirm
                                            </Button>

                                            <Button
                                                size='tiny'
                                                loading={loadingDelete}
                                                onClick={() => dispatch(deleteFriendRequest(user.id))}
                                            >
                                                Delete
                                            </Button>
                                        </>
                                    </List.Content>
                                </List.Item>
                            ))
                        }
                    </>
                )}
            </List>
        </Tab.Pane>
    )
}

export default FriendRequests;