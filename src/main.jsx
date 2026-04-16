import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Root from './Root.jsx'
import { addCampaigns } from './store/campaignSlice.js'

window.AddCampaigns = (campaign) => {
  store.dispatch(addCampaigns(campaign));
};


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      {/* <Root /> */}
    </Provider>
  </StrictMode>,
)
