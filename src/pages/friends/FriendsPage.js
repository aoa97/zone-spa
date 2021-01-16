import { Tab } from 'semantic-ui-react'

import { AppContainer } from '../../components'
import { FriendList, FriendRequests, FindFriend } from './components'

const panes = [
    {
        menuItem: { key: 'friends', icon: 'users', content: 'Friends' },
        render: () => <FriendList />
    },
    {
        menuItem: { key: 'requests', icon: 'add user', content: 'Requests' },
        render: () => <FriendRequests />
    },
    {
        menuItem: { key: 'find', icon: 'find', content: 'Find' },
        render: () => <FindFriend />
    }
]

const FriendsPage = () => {
    return (
        <AppContainer right active='friends'>
            <Tab
                menu={{ color: 'blue', attached: 'top' }}
                menuPosition='right'
                panes={panes}
            />
        </AppContainer>
    );
}

export default FriendsPage;