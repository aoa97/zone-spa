import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Segment, Image, Header, Grid, Button, Icon, Divider, Message, Placeholder, Form, Input } from 'semantic-ui-react';
import moment from 'moment'

import { getUserPosts } from '../actions/postActions';
import { updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import { AppContainer, NewPost, NoPostMessage, Post, PostPlaceholder, IconButton, EditProfileModal } from '../components';

const ProfilePage = () => {
    const dispatch = useDispatch()

    // Selectors
    const { user } = useSelector(state => state.userState)
    const { loading: loadingStatus, success: successStatus } = useSelector(state => state.userUpdate)
    const { loading, posts: postsSnap, error } = useSelector(state => state.postList)

    const [status, setStatus] = useState(user && user.status)
    const [updateStatus, setUpdateStatus] = useState(false)
    const [editProfile, setEditProfile] = useState(false)

    const handleUpdateStatus = async () => {
        await dispatch(updateUser({ status }))
        dispatch({ type: USER_UPDATE_RESET })
    }

    useEffect(() => {
        dispatch(getUserPosts(user.id))

        if (successStatus) {
            setUpdateStatus(false)
        }
    }, [dispatch, successStatus])

    return (
        <AppContainer active='profile'>
            <EditProfileModal open={editProfile} onClose={() => setEditProfile(false)} />

            <Grid>
                <Grid.Column computer={4} mobile={16}>
                    <Segment>
                        <Image
                            fluid
                            src={user.avatar}
                        />

                        <Button
                            fluid
                            style={{ marginTop: 10 }}
                        >
                            Edit
                        </Button>
                    </Segment>
                </Grid.Column>

                <Grid.Column computer={12} mobile={16}>
                    <Segment>
                        <Grid>
                            <Grid.Column computer={12} tablet={9} mobile={9}>
                                <Header style={{ marginBottom: 4 }} >{user.displayName}</Header>

                                {updateStatus ? (
                                    <Form>
                                        <Form.Group style={{ alignItems: 'center' }} >
                                            <Form.Input
                                                value={status}
                                                onChange={e => setStatus(e.target.value)}
                                            />

                                            <Form.Button
                                                primary
                                                loading={loadingStatus}
                                                onClick={handleUpdateStatus}
                                            >
                                                Save
                                             </Form.Button>
                                        </Form.Group>
                                    </Form>
                                ) : (

                                        <IconButton text onClick={() => setUpdateStatus(true)}>
                                            <p className='text-meta'>{status}</p>
                                        </IconButton>
                                    )}
                            </Grid.Column>

                            <Grid.Column computer={4} tablet={7} mobile={7} >
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button onClick={() => setEditProfile(true)}>
                                        <Icon name='edit' /> Edit
                                    </Button>
                                </div>
                            </Grid.Column>
                        </Grid>

                        <Divider />

                        <Grid>
                            <Grid.Column width={4}>
                                <p className='text-meta'>E-mail:</p>
                            </Grid.Column>

                            <Grid.Column width={12}>
                                <a href={`mailto:${user.email}`}>{user.email}</a>
                            </Grid.Column>
                        </Grid>

                        <Grid>
                            <Grid.Column width={4}>
                                <p className='text-meta'>Phone:</p>
                            </Grid.Column>

                            <Grid.Column width={12}>{user.phone}</Grid.Column>
                        </Grid>

                        <Grid>
                            <Grid.Column width={4}>
                                <p className='text-meta'>Birthdate:</p>
                            </Grid.Column>

                            <Grid.Column width={12}>{user.birthdate && moment(user.birthdate.toDate()).format('LL')}</Grid.Column>
                        </Grid>
                    </Segment>

                    <NewPost />

                    {loading ? null
                        : error ? <Message negative content={error} />
                            : postsSnap.length === 0 ? <NoPostMessage /> : <>{postsSnap.map(post => <Post post={post.data()} user={user} />)}</>
                    }
                </Grid.Column>
            </Grid>
        </AppContainer>
    );
}
export default ProfilePage;