import React from 'react';

import './Albums.css';

class Albums extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then(res => res.json())
      .then((result) => {
        this.setState({
          isLoaded: true,
          items: result
        });
        console.log(this.state);
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }
  
  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
        <ol>
          {items.map(items =>
            <li key={items.id}>
              <span className="user-id-span">USER ID {items.userId}</span> {items.title}
            </li>
          )}
        </ol>
      );
    }
  }
}

export default Albums;