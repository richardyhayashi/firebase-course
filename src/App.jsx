import React, { useEffect, useState } from 'react';
import './App.css'
import { Auth } from './components/Auth';
import { db, auth, storage } from './config/firebase';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

function App() {
  const [movieList, setMovieList] = useState([]);
  // New movie states
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [newIsMovieOscar, setNewIsMovieOscar] = useState(false);

  const [updatedTitle, setUpdatedTitle] = useState("");

  const [fileUpload, setFileUpload] = useState(null);

  const movieCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    // Read the data from DB
    // Set the movie list with data.
    try {
      const data = await getDocs(movieCollectionRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))

      setMovieList(filteredData)
    } catch (err) {
      console.error(err)
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, 'movies', id);
    await deleteDoc(movieDoc);
    getMovieList();
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
    getMovieList();
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        recievedAnOscar: newIsMovieOscar,
        userId: auth?.currentUser?.uid
      });

      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) return;

    const filesfolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesfolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <Auth />

      <div>
        <input
          type="text"
          placeholder="Movie Title"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release Date"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={newIsMovieOscar}
          onChange={(e) => setNewIsMovieOscar(e.target.checked)}
        />
        <label>Recieved an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <React.Fragment key={movie.id}>
            <h1 style={{ color: movie.recievedAnOscar ? 'green' : 'red' }}>
              {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>

            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

            <input
              type="text"
              placeholder='New Title'
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
          </React.Fragment>
        ))}
      </div>
      <div>
        <input
          type="file"
          onChange={(e) => setFileUpload(e.target.files[0])}
        />
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  )
}

export default App
