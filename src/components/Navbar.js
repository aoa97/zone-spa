import { useState } from 'react';
import { Menu, Container, Dropdown, Image, Segment, Input, Button } from 'semantic-ui-react';

import Logo from './svg/Logo';
import Bell from './svg/icons/Bell';
import IconButton from './IconButton';

const Navbar = () => {
    const [notification, setNotification] = useState(false)

    return (
        <Menu borderless fixed='top' widths='3' style={{ boxShadow: 'none', alignItems: 'center' }}>
            <Container>
                <Menu.Item style={{ justifyContent: 'flex-start', padding: '10px 0' }}>
                    <Logo />
                </Menu.Item>

                <Menu.Item>
                    <Input
                        icon='search'
                        iconPosition='left'
                        placeholder='Search Zone'
                    />
                </Menu.Item>

                <Menu.Item style={{ justifyContent: 'flex-end', padding: '10px 0' }}>
                    <IconButton onClick={() => setNotification(!notification)}>
                        <Bell outline={!notification} />
                    </IconButton>
                </Menu.Item>
            </Container>
        </Menu>
    );
}

export default Navbar;