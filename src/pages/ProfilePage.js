import { Segment, Image, Header, Grid, Button, Icon, Divider } from 'semantic-ui-react';

import { AppContainer, NewPost, NoPostMessage, Post } from '../components';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
    const { user } = useSelector(state => state.userState)

    return (
        <AppContainer>
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
                                <p className='text-meta'>This is a status placeholder</p>
                            </Grid.Column>

                            <Grid.Column computer={4} tablet={7} mobile={7} >
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button>
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

                            <Grid.Column width={12}>+20123456789</Grid.Column>
                        </Grid>

                        <Grid>
                            <Grid.Column width={4}>
                                <p className='text-meta'>Birthdate:</p>
                            </Grid.Column>

                            <Grid.Column width={12}>September 20, 1997</Grid.Column>
                        </Grid>
                    </Segment>

                    <NewPost />

                    {/* <NoPostMessage /> */}

                    <Post />
                </Grid.Column>
            </Grid>
        </AppContainer>
    );
}
export default ProfilePage;