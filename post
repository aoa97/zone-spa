import { useState } from 'react';
import { Icon, Button, Label, Segment, Header, Image, Divider, Popup } from 'semantic-ui-react';

import PostComments from './PostComments';
import ViewImage from '../ViewImage';


const img = 'https://sun9-31.userapi.com/impg/SCXfY_ia-xw3-fEi2TaPVA9ixMPLfNKuR7ZR9w/gS1FqFF2jWU.jpg?size=1280x852&quality=96&sign=3b6410210b0611d659f7dae239d6bb5e&type=album'
const Post = () => {
    const [like, setLike] = useState(false)
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

            <Segment color='blue'>
                <Label as='a' color='blue' ribbon>Family</Label>

                <section style={{ margin: '1rem 0', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Image
                            avatar
                            style={{ width: 50, height: 50 }}
                            src='http://placehold.it/50'
                        />

                        <div style={{ marginLeft: 4 }}>
                            <Header size='tiny' style={{ margin: 0 }}>Ahmed Usama</Header>
                            <span className='text-meta'>30 minutes ago</span>
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
                    <p style={{ fontSize: 14.5 }}>This is my first post</p>

                    {/*
                <Image
                    fluid
                    src='https://sun9-31.userapi.com/impg/SCXfY_ia-xw3-fEi2TaPVA9ixMPLfNKuR7ZR9w/gS1FqFF2jWU.jpg?size=1280x852&quality=96&sign=3b6410210b0611d659f7dae239d6bb5e&type=album'
                /> */}

                    {/* <Image.Group size='small'>
                        <Image
                            src={img}
                            onClick={() => setViewImage(img)}
                        />
                        <Image
                            src={img}
                            onClick={() => setViewImage(img)}
                        />
                        <Image
                            src={img}
                            onClick={() => setViewImage(img)}
                        />
                        <Image
                            src={img}
                            onClick={() => setViewImage(img)}
                        />
                    </Image.Group> */}

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
                        <Label>123</Label>
                    </div>

                    <div style={{ marginLeft: 20 }}>
                        <Button
                            circular
                            icon='comments'
                        />
                        <Label>123</Label>
                    </div>
                </section>



                <PostComments />
            </Segment>
        </>
    );
}

export default Post;