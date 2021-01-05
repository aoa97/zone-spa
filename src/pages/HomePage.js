import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from 'semantic-ui-react';

import { getAllComsPosts } from '../actions/postActions'
import { AppContainer, VerifyMessage, NewPost, NoPostMessage, PostPlaceholder, Post } from '../components'

const HomePage = () => {
    const dispatch = useDispatch()

    const { loading, posts, error } = useSelector(state => state.postList)

    useEffect(() => {
        dispatch(getAllComsPosts())
    }, [dispatch])

    return (
        <AppContainer right active='home'>
            <NewPost />

            <VerifyMessage />

            {loading ? <PostPlaceholder />
                : error ? <Message negative content={error} />
                    : posts.length === 0 ? <NoPostMessage /> : <>{posts.map(post => <Post community={"Placeholder"} post={post} />)}</>
            }
        </AppContainer>
    );
}

export default HomePage;