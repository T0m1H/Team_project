// src/components/Menu.tsx
import React from 'react';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { listOutline, gridOutline, cubeOutline, logOutOutline } from 'ionicons/icons';

const Menu: React.FC = () => {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      history.push('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const menuItems = [
    { title: 'Page 1', path: '/app/page1', icon: listOutline },
    { title: 'Page 2', path: '/app/page2', icon: gridOutline },
    { title: 'Page 3', path: '/app/page3', icon: cubeOutline },
  ];

  return (
    <IonMenu contentId="main" type="overlay">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {menuItems.map((item, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem routerLink={item.path} routerDirection="none" lines="none">
                <IonIcon slot="start" icon={item.icon} />
                <IonLabel>{item.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
      </IonContent>
      
      <IonToolbar>
        <IonItem onClick={handleLogout} lines="none" button>
          <IonIcon slot="start" icon={logOutOutline} />
          <IonLabel>Log Out</IonLabel>
        </IonItem>
      </IonToolbar>
    </IonMenu>
  );
};

export default Menu;