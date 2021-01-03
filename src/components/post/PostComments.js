import React from 'react'
import { Button, Comment, Form, Grid, Header, Input } from 'semantic-ui-react'


const arr = [...Array(3).keys()]

const PostComments = () => (
    <>
        <Comment.Group collapsed={false}>
            {arr.map(x => (
                <Comment key={x}>
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />

                    <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>

                        <Comment.Metadata>
                            <span>Today at 5:42PM</span>
                        </Comment.Metadata>

                        <Comment.Text>How artistic!</Comment.Text>
                    </Comment.Content>
                </Comment>
            ))}
        </Comment.Group>

        <Grid>
            <Grid.Column computer={14} tablet={14} mobile={12}>
                <Input fluid placeholder="Leave a comment..." />
            </Grid.Column>

            <Grid.Column computer={2} tablet={2} mobile={4}>
                <Button icon='send' />
            </Grid.Column>
        </Grid>
    </>
)

export default PostComments