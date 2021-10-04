import './Userinfo.css';

const user = {
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
};

function Userinfo() {
  return (
    <div className="userinfo border">
        <div className="user-line">name : <span className="line-data">{user.name}</span></div>
        <div className="user-line">user name : <span className="line-data">{user.username}</span></div>
        <div className="user-line">email : <span className="line-data">{user.email}</span></div>
        <div className="user-line">address : <span className="line-data">
          {user.address.street}, {user.address.suite}<br/>{user.address.city}, {user.address.zipcode}</span></div>
        <div className="user-line">phone : <span className="line-data">{user.phone}</span></div>
        <div className="user-line">company name : <span className="line-data">{user.company.name}</span></div>
    </div>
  );
}

export default Userinfo;