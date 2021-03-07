import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
 } from 'react';
 import { auth, db } from '../config/fire-config';
 import fire from '../config/fire-config';

 const authContext = createContext({ user: {} });
 const { Provider } = authContext;

 export function AuthProvider(props: { children: ReactNode }): JSX.Element {
  const auth = useAuthProvider();
  return <Provider value={auth}>{props.children}</Provider>;
 }

 export const useAuth: any = () => {
  return useContext(authContext);
 };

 // Provider hook that creates an auth object and handles it's state
 const useAuthProvider = () => {
  const [user, setUser] = useState(null);

  const addTeam= (teamName, currentTeamStarred) => {
    console.log('teamName =>>>', teamName)
    return db.collection('users').doc(user.uid).set(
      { teams: [{ name: teamName, team: currentTeamStarred }] },
      { merge: true }
    )
     .then(() => {
      setUser(user);
      return user;
     })
     .catch((error) => {
      return { error };
     });
   };

  const createUser = (user) => {
   return db
    .collection('users')
    .doc(user.uid)
    .set(user)
    .then(() => {
     setUser(user);
     return user;
    })
    .catch((error) => {
     return { error };
    });
  };


  const signUp = (userName, email, password, homeState, birthYear) => {
    let teams = [];
    return auth
     .createUserWithEmailAndPassword(email, password)
     .then((response) => {
      auth.currentUser.sendEmailVerification();
      return createUser({ uid: response.user.uid, email, userName, homeState, birthYear, teams });
     })
     .catch((error) => {
      return { error };
     });
   };

  const signIn = ( email, password ) => {
    console.log('in sign IN')
    return auth
     .signInWithEmailAndPassword(email, password)
     .then((response) => {
      setUser(response.user);
      getUserAdditionalData(user);
      return response.user;
     })
     .catch((error) => {
      return { error };
     });
   };

   const getUserAdditionalData = (user: firebase.User) => {
    return db
     .collection('users')
     .doc(user.uid)
     .get()
     .then((userData) => {
      if (userData.data()) {
       setUser(userData.data());
      }
     });
   };

   const signOut = () => {
    console.log('in Signout')
    return auth.signOut().then(() => {
      setUser(null)
      console.log('Success')
    }).catch((error) => {
      console.log(error)
    });
  };

   const handleAuthStateChanged = (user: firebase.User) => {
    setUser(user);
    if (user) {
     getUserAdditionalData(user);
    }
   };

   useEffect(() => {
    const unsub = auth.onAuthStateChanged(handleAuthStateChanged);
    
    return () => unsub();
    }, []);

    useEffect(() => {
  if (user?.uid) {
    // Subscribe to user document on mount
    const unsubscribe = db
      .collection('users')
      .doc(user.uid)
      .onSnapshot((doc) => setUser(doc.data()));
return () => unsubscribe();
  }
}, []);

  const sendPasswordResetEmail = (email) => {
    return auth.sendPasswordResetEmail(email).then((response) => {
     return response;
    });
   };
   return { addTeam, user, signUp, signIn, signOut, sendPasswordResetEmail };
 };

 