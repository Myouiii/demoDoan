import configStore from './configs/configureStore';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './containers/App/App'
import './index.css';
import GlobalStyles from './components/GlobalStyles';
//===== Redux =====//
import { Provider } from 'react-redux';
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
const store = configStore();

if(process.env.NODE_ENV === 'production') { disableReactDevTools() }
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <Provider store={store}>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </Provider>
);

