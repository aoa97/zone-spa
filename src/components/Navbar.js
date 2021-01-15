import { useState } from 'react';
import { Menu, Container, Dropdown, Image, Segment, Input, Button } from 'semantic-ui-react';

import './Navbar.scss'
import Logo from './svg/Logo';
import Bell from './svg/icons/Bell';
import IconButton from './IconButton';

const Navbar = () => {
    const [search, setSearch] = useState('')
    const [notification, setNotification] = useState(false)

    return (
        <nav>
            <Container className='nav__container'>
                <Logo className='nav__logo' />

                <Input
                    loading={false}
                    icon='search'
                    iconPosition='left'
                    placeholder='Search Zone'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                <IconButton onClick={() => setNotification(!notification)}>
                    <Bell outline={!notification} />
                </IconButton>
            </Container>
        </nav>
    );
}

export default Navbar;

