import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Segment, Message, Grid, Button, Image, Divider, Header, Icon } from "semantic-ui-react";
import { AppContainer, PostPlaceholder, Post, NewPost, NoPostMessage, IconButton } from "../components";
import moment from 'moment'

import { getComPosts } from "../actions/postActions";
import { getComDetails } from '../actions/comActions';

const CommunityPage = ({ match }) => {
    const comId = match.params.id

    const dispatch = useDispatch()

    const { loading, error, com } = useSelector(state => state.comDetails)
    const { loading: loadingPosts, error: errorPosts, posts } = useSelector(state => state.postList)

    useEffect(() => {
        dispatch(getComDetails(comId))
        dispatch(getComPosts(comId))
    }, [dispatch, comId])

    return (
        <AppContainer active='communities'>
            <Grid>
                <Grid.Column computer={4} mobile={16}>
                    <Segment>
                        <Image
                            fluid
                            src={com.image}
                            alt="Community image"
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
                                <Header style={{ marginBottom: 4 }} >{com.name}</Header>

                                <IconButton text onClick={() => alert("Update description")}>
                                    <p className='text-meta'>{com.description}</p>
                                </IconButton>
                            </Grid.Column>

                            <Grid.Column computer={4} tablet={7} mobile={7} >
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button onClick={() => alert("Edit community")}>
                                        <Icon name='edit' /> Edit
                                    </Button>
                                </div>
                            </Grid.Column>
                        </Grid>

                        <Divider />

                        <Grid>
                            <Grid.Column width={4}>
                                <p className='text-meta'>Created At:</p>
                            </Grid.Column>

                            <Grid.Column width={12}>{com.createdAt && moment(com.createdAt.toDate()).format('LL')}</Grid.Column>
                        </Grid>
                    </Segment>

                    <NewPost com={comId} />

                    {loadingPosts ? <PostPlaceholder />
                        : errorPosts ? <Message negative content={errorPosts} />
                            : posts.length === 0 ? <NoPostMessage /> : <>{posts.map(post => <Post post={post} />)}</>
                    }
                </Grid.Column>
            </Grid>
        </AppContainer>
    );
}

export default CommunityPage;