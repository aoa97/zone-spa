import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Segment, Message } from "semantic-ui-react";
import { AppContainer, PostPlaceholder, Post, NewPost, NoPostMessage } from "../components";

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
        <AppContainer right active='communities'>
            <Segment>Details</Segment>

            <NewPost com={comId} />

            {loadingPosts ? <PostPlaceholder />
                : errorPosts ? <Message negative content={errorPosts} />
                    : posts.length === 0 ? <NoPostMessage /> : <>{posts.map(post => <Post community={com.name} post={post} />)}</>
            }
        </AppContainer>
    );
}

export default CommunityPage;