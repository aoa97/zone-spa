import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Menu, Icon, Dropdown, Image, Sidebar } from 'semantic-ui-react'

import { auth } from '../utils/firebase.utils';
import { USER_STATE_RESET } from '../constants/userConstants';
import Navbar from './Navbar';

const AppContainer = ({ history, children, right, active }) => {
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.userState)

    const handleLogout = () => {
        auth.signOut()
        dispatch({ type: USER_STATE_RESET })
    }

    const handleItemClick = (e, { name }) => {
        history.push(`/${name}`)
    }

    const fname = user.displayName && user.displayName.split(" ")[0]
    return (
        <>
            <Navbar />

            <main>
                <Grid container>
                    <Grid.Column computer={3} tablet={4} only='computer tablet'>
                        <Menu vertical borderless text secondary fluid color='blue' activeIndex={'home'}>
                            <Menu.Header>
                                <Dropdown
                                    item
                                    trigger={<span><Image avatar size='mini' src={user.avatar} /> Hello, {fname}</span>}
                                    style={{ fontWeight: 'bold', marginTop: 0 }}
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
                                active={active === 'home'}
                                onClick={handleItemClick}
                            >
                                <Icon name='home' /> Home
                        </Menu.Item>

                            <Menu.Item
                                name='communities'
                                active={active === 'communities'}
                                onClick={handleItemClick}
                            >
                                <Icon name='users' /> Communities
                        </Menu.Item>

                            <Menu.Item
                                name='friends'
                                active={active === 'friends'}
                                onClick={handleItemClick}
                            >
                                <Icon name='list' /> Friends
                        </Menu.Item>

                            <Menu.Item
                                name='profile'
                                active={active === 'profile'}
                                onClick={handleItemClick}
                            >
                                <Icon name='user' /> Profile
                        </Menu.Item>
                        </Menu>
                    </Grid.Column>
                    <Grid.Column computer={right ? 9 : 13} tablet={right ? 7 : 12} mobile={16}>{children}</Grid.Column>

                    {right && <Grid.Column computer={4} tablet={5} only='computer tablet'>Right</Grid.Column>}
                </Grid>

                {/* Mobile menu */}
                <Grid container>
                    <Grid.Column width={16} only='mobile'>
                        <Menu borderless icon='labeled' size='small' fixed='bottom' color='blue' style={{ justifyContent: 'center' }}>
                            <Menu.Item
                                name='home'
                                icon='home'
                                active={active === 'home'}
                                onClick={handleItemClick}
                            />

                            <Menu.Item
                                name='communities'
                                icon='users'
                                active={active === 'communities'}
                                onClick={handleItemClick}
                            />


                            <Menu.Item
                                name='friends'
                                icon='list'
                                active={active === 'friends'}
                                onClick={handleItemClick}
                            />

                            <Menu.Item
                                name='profile'
                                icon='user'
                                active={active === 'profile'}
                                onClick={handleItemClick}
                            />
                        </Menu>
                    </Grid.Column>
                </Grid>
            </main>
        </>
    );
}

export default withRouter(AppContainer);