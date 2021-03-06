import '../node_modules/nes.css/css/nes.min.css'
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import GotchiList from './app/GotchiList'
import Interactions from './app/Interactions'
import Navigation from './app/Navigation'

function App() {
  return (
    <BrowserRouter>
      <div className="columns">
        <div className="column">
            <Navigation/>
        </div>
        <div className="column is-four-fifths">
          <Route exact path="/" component={GotchiList}></Route>
          <Route exact path="/interactions" component={Interactions}></Route>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
