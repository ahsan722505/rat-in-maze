import './App.css';
import Maze from './components/Maze';
import Dialog from '@mui/material/Dialog';
import Tutorial from './components/Tutorial';
import { useState } from 'react';
function App() {
  const [modal,setModal]=useState({show : true,content : <Tutorial handleClose={closeModal}/>});
  function closeModal(){setModal({content : "", show : false})};
  const showModal=(content)=> setModal({content,show : true});
  return (
    <div className="App">
      <Maze showModal={showModal}/>
      <Dialog open={modal.show} onClose={closeModal}>
        {modal.content}
      </Dialog>

    </div>
  );
}

export default App;
