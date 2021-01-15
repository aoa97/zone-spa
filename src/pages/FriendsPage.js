import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Input, Divider, Item, Icon, Button, List, Image, Message, Loader, Label } from 'semantic-ui-react'

import { getUsers, sendFriendRequest, getFriendRequests, deleteFriendRequest, confirmFriendRequest } from '../actions/userActions';
import { AppContainer } from '../components'

const panes = [
    {
        menuItem: { key: 'friends', icon: 'users', content: 'Friends List' },
        render: () => <FriendsList />
    },
    {
        menuItem: { key: 'requests', icon: 'add user', content: 'Friend requests' },
        render: () => <FriendRequests />
    },
    {
        menuItem: { key: 'find', icon: 'find', content: 'Find a friend' },
        render: () => <FindFriend />
    }
]

const FriendsList = () => (
    <Tab.Pane>Friends</Tab.Pane>
)

const FriendRequests = () => {
    const dispatch = useDispatch()

    const { loading, requests, error } = useSelector(state => state.userRequestList)
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = useSelector(state => state.userRequestDelete)
    const { loading: loadingConfirm, success: successConfirm, error: errorConfirm } = useSelector(state => state.userRequestConfirm)

    useEffect(() => {
        dispatch(getFriendRequests())
    }, [dispatch, successDelete, successConfirm])

    return (
        <Tab.Pane>
            <List>
                {loading ? <Loader active inline='centered' /> : error ? <Message negative content={error} /> : (
                    <>
                        {requests.length === 0 ? (
                            <Message info style={{ textAlign: 'center', padding: 20 }} content='No requests received.' />
                        ) : (
                                <>
                                    {
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
                    </>
                )}
            </List>
        </Tab.Pane>
    )
}

const FindFriend = () => {
    const dispatch = useDispatch()

    const { loading, users, error } = useSelector(state => state.userList)
    const { loading: loadingRequest, success: successRequest, error: errorRequest } = useSelector(state => state.userAddFriend)

    const [query, setQuery] = useState(null)

    useEffect(() => {
        dispatch(getUsers(query))
    }, [dispatch])

    return (
        <Tab.Pane>
            <Input
                fluid
                transparent
                icon='search'
                iconPosition='left'
                placeholder='Search'
                value={query}
                onChange={e => setQuery(e.target.value)}
            />

            <Divider />

            <List>
                {loading ? <Loader active inline='centered' /> : error ? <Message negative content={error} /> : (
                    <>
                        {users.map(user => (
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
                                    {successRequest ? <Label>Friend request sent</Label> : (
                                        <Button primary size='tiny' loading={loadingRequest} onClick={() => dispatch(sendFriendRequest(user.id))}>
                                            <Icon name='plus' /> Add a friend
                                        </Button>
                                    )}
                                </List.Content>
                            </List.Item>
                        ))}
                    </>
                )}
            </List>
        </Tab.Pane>
    )
}

const FriendsPage = () => {
    return (
        <AppContainer right active='friends'>
            <Tab
                menu={{ color: 'blue' }}
                menuPosition='right'
                panes={panes}
            />
        </AppContainer>
    );
}

export default FriendsPage;