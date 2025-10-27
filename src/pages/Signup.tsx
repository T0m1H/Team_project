import React, { useRef, useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard,
  IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel,
  IonInput, IonButton, IonGrid, IonRow, IonCol, IonLoading,
  IonToast, IonRouterLink
} from '@ionic/react';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';

// Define the Signup component
export default function Signup() {
  // Create refs to get values from input fields directly
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const passwordConfirmRef = useRef<HTMLIonInputElement>(null);

  // Setup state for loading spinner, error messages, and navigation
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const email = emailRef.current?.value as string;
    const password = passwordRef.current?.value as string;
    const passwordConfirm = passwordConfirmRef.current?.value as string;

    
    if (password !== passwordConfirm) {
      return setError('Passwords do not match.');
    }

    try {
      setLoading(true);
      
      await auth.createUserWithEmailAndPassword(email, password);
      
      history.push('/'); 
    } catch (error: unknown) {
      
      console.error('Sign up failed:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Sign up failed. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <IonLoading isOpen={loading} message={'Creating new user...'} />
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
                  <IonCardTitle className="ion-text-center">Create new account</IonCardTitle>
                </IonCardHeader>
                
                <IonCardContent>
                  <form onSubmit={handleSubmit}>
                    <IonItem className='ion-margin-bottom'>
                      <IonLabel position='stacked'>Email</IonLabel>
                      <IonInput type="email" ref={emailRef} required />
                    </IonItem>

                    <IonItem className='ion-margin-bottom'>
                      <IonLabel position='stacked'>Password</IonLabel>
                      <IonInput type='password' ref={passwordRef} required />
                    </IonItem>

                    <IonItem className='ion-margin-bottom'>
                      <IonLabel position='stacked'>Password Confirmation</IonLabel>
                      <IonInput type='password' ref={passwordConfirmRef} required />
                    </IonItem>

                    <IonButton expand="block" type="submit" className="ion-margin-top" disabled={loading}>
                      Submit
                    </IonButton>
                  </form>
                  
                  <div className="ion-text-center ion-margin-top">
                    Already have an account?{' '}
                    <IonRouterLink routerLink="/login">Log In</IonRouterLink>
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