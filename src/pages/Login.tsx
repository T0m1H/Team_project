// src/pages/Login.tsx
import React, { useRef, useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard,
  IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel,
  IonInput, IonButton, IonGrid, IonRow, IonCol, IonLoading,
  IonToast, IonRouterLink
} from '@ionic/react';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const email = emailRef.current?.value as string;
    const password = passwordRef.current?.value as string;

    try {
      setLoading(true);
      
      await auth.signInWithEmailAndPassword(email, password);
      
      history.push('/');
    } catch (error: unknown) {
      console.error('Login failed:', error);
      if (error instanceof Error) {
      setError(error.message);
      } else {
        setError('Log in failed. Try again.')
    }
  } finally {
    setLoading(false);
  }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Log In</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <IonLoading isOpen={loading} message={'Logging in...'} />
        <IonToast
          isOpen={!!error}
          message={error || ''}
          duration={3000}
          onDidDismiss={() => setError(null)}
          color="danger"
          position="top"
        />

        <IonGrid>
          <IonRow className="ion-justify-content-center ion-align-items-center" style={{ height: '100%' }}>
            <IonCol size="12" size-md="8" size-lg="6" size-xl="4">
              
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle class="ion-text-center">Log In</IonCardTitle>
                </IonCardHeader>
                
                <IonCardContent>
                  <form onSubmit={handleSubmit}>
                    <IonItem>
                      <IonLabel position='floating'>Email</IonLabel>
                      <IonInput type='email' ref={emailRef} required />
                    </IonItem>

                    <IonItem>
                      <IonLabel position='floating'>Password</IonLabel>
                      <IonInput type='password' ref={passwordRef} required />
                    </IonItem>

                    <IonButton expand="block" type="submit" className="ion-margin-top" disabled={loading}>
                      Log In
                    </IonButton>
                  </form>
                  
                  <div className="ion-text-center ion-margin-top">
                    Dont have an account?{' '}
                    <IonRouterLink routerLink="/signup">Create an account</IonRouterLink>
                  </div>

                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}