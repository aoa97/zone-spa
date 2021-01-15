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
                    <Grid.Column computer={4} tablet={3} only='computer tablet'>
                        <Menu vertical text secondary color='blue' activeIndex={'home'} style={{ position: 'fixed', zIndex: '1' }} >
                            <Menu.Header>
                                <Dropdown
                                    item
                                    labeled
                                    trigger={<span><Image avatar size='mini' src={user.avatar} /> Hello, {fname}</span>}
                                    style={{ fontWeight: 'bold', marginTop: 0, display: 'flex', alignItems: 'center' }}
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
                                style={{ color: "#373a40" }}
                            >
                                <Icon circular name='home' /> Home
                            </Menu.Item>

                            <Menu.Item
                                name='communities'
                                active={active === 'communities'}
                                onClick={handleItemClick}
                                style={{ color: "#373a40" }}
                            >
                                <Icon circular name='users' /> Communities
                            </Menu.Item>

                            <Menu.Item
                                name='friends'
                                active={active === 'friends'}
                                onClick={handleItemClick}
                                style={{ color: "#373a40" }}
                            >
                                <Icon circular name='list alternate' /> Friends
                            </Menu.Item>

                            <Menu.Item
                                name='profile'
                                active={active === 'profile'}
                                onClick={handleItemClick}
                                style={{ color: "#373a40" }}
                            >
                                <Icon circular name='user' /> Profile
                            </Menu.Item>
                        </Menu>
                    </Grid.Column>

                    <Grid.Column computer={right ? 8 : 12} tablet={right ? 9 : 12} mobile={16}>{children}</Grid.Column>

                    {right && <Grid.Column computer={4} tablet={4} only='computer tablet'>{right}</Grid.Column>}
                </Grid>

                {/* Mobile menu */}
                <Grid container style={{ paddingTop: 40 }}>
                    <Grid.Column width={16} only='mobile'>
                        <Menu borderless size='huge' fixed='bottom' color='blue' style={{ justifyContent: 'center' }}>
                            <Menu.Item
                                name='home'
                                active={active === 'home'}
                                onClick={handleItemClick}
                            >
                                <Icon circular name='home' />
                            </Menu.Item>

                            <Menu.Item
                                name='communities'
                                active={active === 'communities'}
                                onClick={handleItemClick}
                            >
                                <Icon circular name='users' />
                            </Menu.Item>

                            <Menu.Item
                                name='friends'
                                active={active === 'friends'}
                                onClick={handleItemClick}
                            >
                                <Icon circular name='list alternate' />
                            </Menu.Item>

                            <Menu.Item
                                name='profile'
                                active={active === 'profile'}
                                onClick={handleItemClick}
                            >
                                <Icon circular name='user' />
                            </Menu.Item>
                        </Menu>
                    </Grid.Column>
                </Grid>
            </main>
        </>
    );
}

export default withRouter(AppContainer);