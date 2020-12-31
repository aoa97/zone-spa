import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Menu, Icon, Dropdown, Image } from 'semantic-ui-react'

import { auth } from '../utils/firebase.utils';
import { USER_STATE_RESET } from '../constants/userConstants';

const AppContainer = ({ history, children, right }) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.userState)

    const [activeItem, setActiveItem] = useState('home')

    const handleLogout = () => {
        auth.signOut()
        dispatch({ type: USER_STATE_RESET })
    }

    const handleItemClick = (e, { name }) => {
        setActiveItem(name)
        history.push(`/${name}`)
    }

    return (
        <div style={{ paddingTop: 20 }}>
            <Grid container>
                <Grid.Column computer={3} tablet={4} only='computer tablet'>
                    <Menu text secondary vertical color='blue' activeIndex={activeItem}>
                        <Menu.Header>
                            <Dropdown
                                item
                                trigger={<span><Image avatar size='mini' src={user.avatar} /> Hello, {user.displayName}</span>}
                                style={{ fontWeight: 'bold' }}
                            >

                                <Dropdown.Menu>
                                    <Dropdown.Header>{user.displayName}</Dropdown.Header>

                                    <Dropdown.Item>View profile</Dropdown.Item>

                                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Header>

                        <Menu.Item
                            name='home'
                            active={activeItem === 'home'}
                            onClick={handleItemClick}
                        >
                            <Icon name='home' /> Home
                        </Menu.Item>

                        <Menu.Item
                            name='communities'
                            active={activeItem === 'communities'}
                            onClick={handleItemClick}
                        >
                            <Icon name='users' /> Communities
                        </Menu.Item>

                        <Menu.Item
                            name='friends'
                            active={activeItem === 'friends'}
                            onClick={handleItemClick}
                        >
                            <Icon name='list' /> Friends
                        </Menu.Item>

                        <Menu.Item
                            name='profile'
                            active={activeItem === 'profile'}
                            onClick={handleItemClick}
                        >
                            <Icon name='user' /> Profile
                        </Menu.Item>
                    </Menu>
                </Grid.Column>

                <Grid.Column computer={right ? 9 : 13} tablet={right ? 7 : 12} mobile={16}>{children}</Grid.Column>

                {right && <Grid.Column computer={4} tablet={5} only='computer tablet'>Right</Grid.Column>}
            </Grid>
        </div>
    );
}

export default withRouter(AppContainer);