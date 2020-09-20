import React, { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getDataFromFirestore,
  dataFromSnapshot,
} from "./firestore/firestoreService";
import { fetchData } from "./store/action";

function App() {
  const data = useSelector((state) => state.data.data);
  const dispatch = useDispatch();
  //console.log(data);

  useEffect(() => {
    const unsubscribe = getDataFromFirestore({
      next: (snapshot) =>
        dispatch(
          fetchData(
            snapshot.docs.map((docSnapshot) => dataFromSnapshot(docSnapshot))
          )
        ),
      error: (error) => console.log(error),
    });

    return unsubscribe;
  });

  const items = data.map((item, i) => (
    <div className="App" key={i}>
      <h3>{item.title}</h3>
      <p>{item.desc}</p>
      <strong>{item.price}</strong>
    </div>
  ));

  return <div className="AppParent">{items}</div>;
}

export default App;
