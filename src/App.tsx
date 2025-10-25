// src/App.tsx
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonContent,
  IonGrid,
  IonRouterOutlet,
  IonRow,
  setupIonicReact,
  IonSplitPane,
  IonSpinner,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Details from './pages/Details';
import MusicDetails from './pages/MusicDetails';


import Signup from './pages/Signup';
import Login from './pages/Login';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Menu from './components/Menu';
import { useAuth } from './AuthContext';

/* Core CSS...*/
import '@ionic/react/css/core.css';

/* Basic CSS...*/
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS...*/
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Dark Mode...*/
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';



setupIonicReact();

const App: React.FC = () => {
  const { currentUser, loading } = useAuth();

  
  if (loading) {
    return (
      <IonApp>
        <IonContent fullscreen>
          <IonGrid style={{ height: '100%' }}>
            <IonRow className="ion-justify-content-center ion-align-items-center" style={{ height: '100%' }}>
              <IonSpinner name="crescent" />
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonApp>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
        {currentUser ? <LoggedInRoutes /> : <LoggedOutRoutes />}
      </IonReactRouter>
    </IonApp>
  );
};


const LoggedInRoutes: React.FC = () => (
  <IonSplitPane contentId="main">
    <Menu /> 
    <IonRouterOutlet id="main">
      <Switch>
        <Route path="/app/page1" component={Page1} exact />
        <Route path="/app/page2" component={Page2} exact />
        <Route path="/app/page3" component={Page3} exact />
        
        <Route path="/movies/:id" component={Details} exact />
        <Route path="/artists/:id" component={MusicDetails} exact /> 

        <Redirect from="/" to="/app/page1" exact />
        
        <Redirect from="/login" to="/app/page1" exact />
        <Redirect from="/signup" to="/app/page1" exact />
      </Switch>
    </IonRouterOutlet>
  </IonSplitPane>
);


const LoggedOutRoutes: React.FC = () => (
  <IonRouterOutlet>
    <Switch>
      <Route path="/login" component={Login} exact />
      <Route path="/signup" component={Signup} exact />
      
      <Redirect from="*" to="/login" />
    </Switch>
  </IonRouterOutlet>
);

export default App;