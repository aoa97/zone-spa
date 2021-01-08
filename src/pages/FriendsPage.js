import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Input, Divider, Item, Icon, Button, List, Image, Message, Loader } from 'semantic-ui-react'

import { getUsers } from '../actions/userActions';
import { AppContainer } from '../components'

const panes = [
    {
        menuItem: { key: 'friends', icon: 'users', content: 'Friends List' },
        render: () => <FriendsList />
    },
    {
        menuItem: { key: 'find', icon: 'find', content: 'Find a friend' },
        render: () => <FindFriend />
    }
]

const FriendsList = () => (
    <Tab.Pane>Friends</Tab.Pane>
)

const FindFriend = () => {
    const dispatch = useDispatch()

    const { loading, users, error } = useSelector(state => state.userList)

    const [query, setQuery] = useState(null)

    useEffect(() => {
        dispatch(getUsers(query))
    }, [dispatch])

    const handleRequest = () => {
        alert("Send request")
    }

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
                                    size='tiny'
                                    src={user.avatar}
                                />

                                <List.Content as={Link} to={`users/${user.id}`}>
                                    {user.displayName}
                                    <p className='text-meta'>{user.status}</p>
                                </List.Content>

                                <List.Content floated='right'>
                                    <Button primary size='tiny' onClick={handleRequest}>
                                        <Icon name='plus' /> Add a friend
                                    </Button>
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