import { Placeholder, Segment } from "semantic-ui-react";

const PostPlaceholder = () => (
    <Segment color='blue'>
        <Placeholder style={{ margin: '1rem 0' }}>
            <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
            </Placeholder.Header>

            <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
            </Placeholder.Paragraph>
        </Placeholder>
    </Segment>
)

export default PostPlaceholder;