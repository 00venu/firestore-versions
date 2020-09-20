import React, { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getDataFromFirestore,
  dataFromSnapshot,
} from "./firestore/firestoreService";
import { fetchData, loadingPlaceHolder } from "./store/action";
import PlaceholderExampleGrid from "./components/Placeholder";
import Item from "./components/Item";

function App() {
  const data = useSelector((state) => state.data.data);
  let loading = useSelector((state) => state.data.loading);
  const dispatch = useDispatch();
  //console.log(data);

  useEffect(() => {
    dispatch(loadingPlaceHolder(true));
    const unsubscribe = getDataFromFirestore({
      next: (snapshot) => {
        dispatch(
          fetchData(
            snapshot.docs.map((docSnapshot) => dataFromSnapshot(docSnapshot))
          )
        );
        setTimeout(() => {
          dispatch(loadingPlaceHolder(false));
        }, 250);
      },
      error: (error) => console.log(error),
    });
    return unsubscribe;
  }, [dispatch]);

  let items = data.map((item, i) => <Item key={i} details={item} />);

  let test = [];
  for (let i = 0; i < data.length; i++) {
    test.push(<PlaceholderExampleGrid key={i} />);
  }

  return (
    <div className="AppParent">
      {loading ? test.map((item) => item) : items}
    </div>
  );
}

export default App;
