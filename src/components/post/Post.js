import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { Icon, Button, Label, Segment, Header, Image, Divider, Popup, Confirm } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'

import { deleteProfilePost, deleteComPost } from '../../actions/postActions';
import PostComments from './PostComments';
import ViewImage from '../ViewImage';

const Post = ({ post, history }) => {
    const dispatch = useDispatch()

    const { loading: loadingDelete, success: successDelete, error: errorDelete } = useSelector(state => state.postDelete)

    const [like, setLike] = useState(false)
    const [comments, setComments] = useState(false)
    const [viewImage, setViewImage] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState(false)

    const handleLike = () => {
        setLike(!like)
    }

    useEffect(() => {
        if (successDelete) {
            setDeleteConfirm(false)
        }
    }, [successDelete])

    return (
        <>
            <ViewImage
                open={viewImage}
                onClose={() => setViewImage(false)}
            />

            <Confirm
                open={deleteConfirm}
                cancelButton='Cancel'
                confirmButton="Delete"
                onCancel={() => setDeleteConfirm(false)}
                onConfirm={() => dispatch(post.com && deleteComPost(post.id) || deleteProfilePost(post.id))}
            />

            <Segment color='blue' key={post.id}>
                {post.com && (
                    <Label
                        ribbon
                        as='a'
                        color='blue'
                        onClick={() => history.push(`/communities/${post.com.id}`)}
                    >
                        {post.com.name}
                    </Label>
                )}

                <section style={{ margin: '1rem 0', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Image
                            avatar
                            style={{ width: 50, height: 50 }}
                            src={post.userAvatar}
                        />

                        <div style={{ marginLeft: 4 }}>
                            <Header size='tiny' style={{ margin: 0 }}>{post.userName}</Header>
                            <span className='text-meta'>{post.createdAt && moment(post.createdAt.toDate()).startOf('seconds').fromNow()}</span>
                        </div>
                    </div>

                    <Popup
                        hoverable
                        position='bottom right'
                        trigger={<Icon name='angle down' circular />}
                        style={{ padding: 0 }}
                    >
                        <Button.Group vertical basic>
                            <Button onClick={() => alert("Edit")}>Edit</Button>

                            <Button onClick={() => setDeleteConfirm(true)}>Delete</Button>
                        </Button.Group>
                    </Popup>
                </section>

                <section>
                    <p style={{ fontSize: 14.5 }}>{post.text}</p>
                </section>

                <Divider />

                <section style={{ display: 'flex' }}>
                    <div>
                        <Button
                            circular
                            icon='heart'
                            color={like && 'blue'}
                            onClick={handleLike}
                        />
                        <Label>{post.likeCount}</Label>
                    </div>

                    <div style={{ marginLeft: 20 }}>
                        <Button
                            circular
                            icon='comments'
                            onClick={() => setComments(!comments)}
                        />
                        <Label>{post.commentCount}</Label>
                    </div>
                </section>

                {comments && <PostComments />}
            </Segment>
        </>
    );
}

export default withRouter(Post);