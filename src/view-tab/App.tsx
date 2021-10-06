import * as React from 'react';
import Content from './components/Content';
import Header from './components/Header';
import './App.css';

const App: React.FC = () => (
    // <Provider AppStore={AppStore}>
      <div className="Container">
        <Header />
        <Content />
      </div>
    // </Provider>
  );
  
  export default App;