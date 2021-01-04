import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { Segment, Card, Button, Divider, Header, Label, Item, Input, Popup, Icon, Dropdown, Message, Placeholder } from 'semantic-ui-react';

import { getComs } from '../actions/comActions';
import { AppContainer, CreateCommunityModal } from "../components";

const CommunitiesPage = () => {
    const dispatch = useDispatch()

    const { loading, coms: communities, error } = useSelector(state => state.comList)

    const [createModal, setCreateModal] = useState(false)

    useEffect(() => {
        dispatch(getComs())
    }, [dispatch])

    return (
        <AppContainer right active='communities'>
            <CreateCommunityModal
                open={createModal}
                onClose={() => setCreateModal(false)}
            />

            <Segment fluid>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong>Your Communities</strong>

                    <Button primary size='small' onClick={() => setCreateModal(true)}>Create community</Button>
                </div>

                <Divider />

                <Input fluid action={{ icon: 'search' }} placeholder='Search communities' />

                {loading ? (
                    <Item.Group>
                        <Placeholder>
                            <Placeholder.Header image>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Header>
                        </Placeholder>
                    </Item.Group>
                ) : error ? <Message negative content={error} /> : communities.length === 0 ? (
                    <Message info style={{ textAlign: 'center', padding: 20 }} content='You have not joined any communities yet.' />
                ) : (
                        <Item.Group divided unstackable >
                            {communities.map(c => (
                                <Item key={c.id} as={Link} to={`/communities/${c.id}`}>
                                    <Item.Image
                                        size='tiny'
                                        src={c.image}
                                    />

                                    <Item.Content verticalAlign='middle'>
                                        <Item.Header>{c.name}</Item.Header>
                                        <Item.Meta>{c.description}</Item.Meta>
                                        <Item.Meta>{c.members.length === 1 ? `1 member` : `${c.members.length} members`}</Item.Meta>
                                    </Item.Content>
                                </Item>
                            ))}
                        </Item.Group>
                    )}
            </Segment>
        </AppContainer>
    );
}

export default CommunitiesPage;