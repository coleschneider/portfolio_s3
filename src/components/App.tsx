import { hot } from 'react-hot-loader';
import * as React from 'react';

import Header from './Header/Header';

class App extends React.Component {
  render() {
    return (
      <div className="app-wrapper">
        Testing
        <Header />
      </div>
    );
  }
}
export default hot(module)(App);
