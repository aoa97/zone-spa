import { useState } from 'react';
import { Icon, Button, Label, Segment, Header, Image, Divider, Popup } from 'semantic-ui-react';
import moment from 'moment'

import PostComments from './PostComments';
import ViewImage from '../ViewImage';

const Post = ({ post, user, community }) => {
    const [like, setLike] = useState(false)
    const [comments, setComments] = useState(false)
    const [viewImage, setViewImage] = useState(false)

    const handleLike = () => {
        setLike(!like)
    }

    return (
        <>
            <ViewImage
                open={viewImage}
                onClose={() => setViewImage(false)}
            />

            <Segment color='blue' key={post.id}>
                {community && <Label ribbon as='a' color='blue'>{community}</Label>}

                <section style={{ margin: '1rem 0', display: 'flex', justifyContent: 'space-between' }}>
                    {/* User */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Image
                            avatar
                            style={{ width: 50, height: 50 }}
                            src={community ? 'http://placehold.it/50' : user.avatar}
                        />

                        <div style={{ marginLeft: 4 }}>
                            <Header size='tiny' style={{ margin: 0 }}>{community ? 'just placed' : user.displayName}</Header>
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
                            <Button>Edit</Button>
                            <Button>Delete</Button>
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

export default Post;