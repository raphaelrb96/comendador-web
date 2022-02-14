import firebase, { firestore } from 'firebase/app';


const db = firebase.firestore();

export default (req, res) => {
    db.collection('produtos')
      .doc(req.query.produto)
      .get()
      .then((doc) => {
        res.json(doc.data());
      })
      .catch((error) => {
        res.json({ error });
      });
  };