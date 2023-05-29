import React from 'react';

export default class UserInfo extends React.Component {
    render() {
        return (
            <div className={['user', (this.props.color + 'User'),
                (this.props.currentPlayer ? 'currentPlayer' : 'waitingPlayer')].join(' ')}>
                {
                    this.getUserName()
                }
            </div>
        )
    }
    
    getUserName() {
        return this.props.userName;
    }
}