import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from 'semantic-ui-react';

import { getAllComsPosts } from '../actions/postActions'
import { AppContainer, VerifyMessage, NewPost, NoPostMessage, PostPlaceholder, Post } from '../components'

const HomePage = () => {
    const dispatch = useDispatch()

    // Selectores
    const { loading, posts, error } = useSelector(state => state.postList)
    const { success: successDelete } = useSelector(state => state.postDelete)

    useEffect(() => {
        dispatch(getAllComsPosts())
    }, [dispatch, successDelete])

    return (
        <AppContainer right active='home'>
            <NewPost />

            <VerifyMessage />

            {loading ? <PostPlaceholder />
                : error ? <Message negative content={error} />
                    : posts.length === 0 ? <NoPostMessage /> : <>{posts.map(post => <Post post={post} />)}</>
            }
        </AppContainer>
    );
}

export default HomePage;