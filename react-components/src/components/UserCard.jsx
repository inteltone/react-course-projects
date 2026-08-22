import React from 'react';

class UserCard extends React.Component {
  render() {
    const { name, age, city } = this.props;

    return (
      <div className="card">
        <p className="h2">Привет, {name}!</p>
        <p>Возраст: {age}</p>
        <p>Город: {city}</p>
      </div>
    );
  }
}

export default UserCard;
