import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
 } from 'react';
 import { auth, db, database} from '../config/fire-config';
 import fire from '../config/fire-config';
 import Cookies from 'js-cookie'


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
  const [dbteam, setDbTeam] = useState(null);

  const addTeamToUser = (teamName, currentTeamStarred, teamId) => {
    return db.collection('users').doc(user.uid).update( {
      'teams': fire.firestore.FieldValue.arrayUnion( {name: teamName, team: [currentTeamStarred], teamDbId: teamId} )
   })
     .then(() => {
      setUser(user);
      return user;
     })
     .catch((error) => {
      return { error };
     });
   };

   const addTeamToDB = (teamName, currentTeamStarred) => {
    return db.collection('teams').add({
      TeamName : teamName, user : user.uid, team : currentTeamStarred
    })    
    .then((response) => {
      addTeamToUser(teamName, currentTeamStarred, response.id);
      addTeamToRTDB(teamName, currentTeamStarred, response.id, user.uid);
     })
    .catch((error) => {
      return { error };
     });
   }; 

   function addTeamToRTDB(teamName, currentTeamStarred, id, userid){
     let date = new Date()
    fire.database().ref('teams/' + id).set({
        teamName: teamName,
        team : currentTeamStarred,
        user : userid,
        userName: user.userName,
        dateCreated : date, 
        score : 0
      });
    }

  const addTeamToRTDBLeague= (leagueID, teamID, userTeam) => {
    let addedTeam = {};
    addedTeam[teamID] = userTeam;

    var updates = {};
    updates[teamID] = userTeam;

    fire.database().ref('leagues/').child(leagueID).child('teams').update(updates);
    fire.database().ref('leagues/').child(leagueID).child('leagueDetails').child('teamcount').set(1);
    fire.database().ref('teams/').child(teamID).child('subscribedLeague').set(leagueID);
    return;
  }

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

   const getUserAdditionalData = (user) => {
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
    return auth.signOut().then(() => {
      setUser(null)
    }).catch((error) => {
      console.log(error)
    });
  };

   const handleAuthStateChanged = (user) => {
    setUser(user);
    if (user) {
      const token = user.getIdToken();
      Cookies.set('userId', user.uid);
      let uID = Cookies.get('userId')
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

   return { addTeamToUser, addTeamToDB, user, signUp, signIn, signOut, sendPasswordResetEmail, addTeamToRTDBLeague };
 };

 