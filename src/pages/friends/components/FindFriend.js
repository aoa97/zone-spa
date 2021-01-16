import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tab, Input, Divider, List, Loader, Message, Image, Label, Button, Icon } from 'semantic-ui-react';

import { getUsers, sendFriendRequest } from '../../../actions/userActions';

const FindFriend = () => {
    const dispatch = useDispatch()

    // Selectors
    const { loading, users, error } = useSelector(state => state.userList)
    const { loading: loadingRequest, success: successRequest, error: errorRequest } = useSelector(state => state.userAddFriend)

    // States
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
                {error && <Message negative content={error} />}

                {loading ? <Loader active inline='centered' /> : (
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
                                        <Button
                                            primary
                                            size='tiny'
                                            loading={loadingRequest}
                                            onClick={() => dispatch(sendFriendRequest(user.id))}
                                        >
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

export default FindFriend;