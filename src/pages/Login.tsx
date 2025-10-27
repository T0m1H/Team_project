import React, { useRef, useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard,
  IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel,
  IonInput, IonButton, IonGrid, IonRow, IonCol, IonLoading,
  IonToast, IonRouterLink
} from '@ionic/react';
// Import the Firebase auth service
import { auth } from '../firebase';
// Import useHistory for programmatic navigation (redirecting)
import { useHistory } from 'react-router-dom';

// Define the Login component
export default function Login() {
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  // This function runs when the user submits the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Get the values from the input fields using the refs
    const email = emailRef.current?.value as string;
    const password = passwordRef.current?.value as string;

    try {
      setLoading(true);
      
      // Call Firebase auth to sign in the user
      await auth.signInWithEmailAndPassword(email, password);

      // If login is successful, redirect to the main app page
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
                      <IonLabel position='stacked'>Email</IonLabel>
                      <IonInput type='email' ref={emailRef} required />
                    </IonItem>

                    <IonItem>
                      <IonLabel position='stacked'>Password</IonLabel>
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