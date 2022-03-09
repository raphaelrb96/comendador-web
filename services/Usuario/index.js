import firebase, { firestore } from 'firebase/app';

const db = firebase.firestore();

export function getUser() {
    const user = firebase.auth().currentUser;
    return user;
}

export function cadastrarUsuario(email, password, nome, listener) {

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        let user = userCredential.user;

        user.updateProfile({displayName: nome}).then(() => {

            let usuarioNovo = {
                nome: nome,
                email: email,
                celular: '',
                controleDeVersao: 1,
                pathFoto: '',
                uid: user.uid,
                tipoDeUsuario: 1,
                provedor: 'Email',
                ultimoLogin: Date.now(),
                primeiroLogin: Date.now(),
            };

            const userRef = db.collection("Usuario").doc(user.uid);

            userRef.set(usuarioNovo).then(() => {
                let entrar = {
                    sucess: true,
                    user,
                    errorCode: 0,
                    errorMessage: ''
                };
                return listener(entrar);

            }).catch(er => {
                let entrar = {
                    sucess: false,
                    user: null,
                    errorCode: 5,
                    errorMessage: ''
                };
                return listener(entrar);
            });


        }).catch(e => {
            let errorCode = e.code;
            let errorMessage = e.message;
            // ..
            let entrar = {
                sucess: false,
                user: null,
                errorCode: 5,
                errorMessage: ''
            };
            return listener(entrar);
        });
        // ...
        
    })
    .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        // ..
        let entrar = {
            sucess: false,
            user: null,
            errorCode: errorCode,
            errorMessage: errorMessage
        };
        return listener(entrar);
    });
}

export async function logarUsuario(email, password, listener) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        let entrar = {
            sucess: true,
            user,
            errorCode: 0,
            errorMessage: ''
        };

        const userRef = db.collection("Usuario").doc(user.uid);

        
        userRef.get().then((userData) => {


            let objUser = null;
            console.log(userData);

            if(userData.exists) {

                objUser = {
                    ultimoLogin: Date.now()
                };

            } else {
                objUser = {
                    nome: user.displayName,
                    email: email,
                    celular: '',
                    controleDeVersao: 1,
                    pathFoto: '',
                    uid: user.uid,
                    tipoDeUsuario: 1,
                    provedor: 'Email',
                    ultimoLogin: Date.now(),
                    primeiroLogin: Date.now(),
                };

            }

            userRef.set(objUser).then(() => {
                let entrar = {
                    sucess: true,
                    user,
                    errorCode: 0,
                    errorMessage: ''
                };
                return listener(entrar);

            }).catch(er => {
                let entrar = {
                    sucess: false,
                    user: null,
                    errorCode: 5,
                    errorMessage: ''
                };
                return listener(entrar);
            });
        }).catch(err => {
            
            let entrar = {
                sucess: false,
                user: null,
                errorCode: 5,
                errorMessage: err.message
            };
            return listener(entrar);
        });

        

    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        let entrar = {
            sucess: false,
            user: null,
            errorCode: errorCode,
            errorMessage: errorMessage
        };
        return listener(entrar);
    });
}

export function authListener(listener) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
          return listener(user);
          // ...
        } else {
          // User is signed out
          return listener(user);
        }
    });
}

export function logout() {
    firebase.auth().signOut();
}