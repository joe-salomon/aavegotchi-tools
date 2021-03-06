import { Component } from 'react'
import { Link } from 'react-router-dom';

class Navigation extends Component {

  render() {
    return (
      <section className="section">
        <div className="container">
          <ul>
            <li><Link to="/">Aavegotchis</Link></li>
            <li><Link to="/interactions">Interactions</Link></li>
          </ul>
        </div>
      </section>
    )
  }
  
}

export default Navigation