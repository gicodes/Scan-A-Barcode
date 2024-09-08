import { useState } from 'react';
import VideoCapture from './video/video-capture';
import ImageCapture from './image/image-capture';

import './App.css';

function App() {
  const [ video, setVideo ] = useState(true);
  const [ image, setImage ] = useState(false);
  const bgStyle = "rgb(255, 174, 55)";

  const handleVideoChange = () => {
    if (image) {
      setVideo(true); setImage(false);
    }
  };

  const handleImageChange = () => {
    if (video) {
      setImage(true); setVideo (false);
    } 
  }

  return (
    <div className="App">
      <header className="App-header h-50">
        <h1>Scan a barcode</h1>
        <br/>

        <div className='top-btns'>
          <button 
            className='scan-btn'
            onClick={handleVideoChange} 
            style={{backgroundColor: video ? bgStyle : "#fff"}}
          >
            Video Capture
          </button>
          <button 
            className='scan-btn'
            onClick={handleImageChange} 
            style={{backgroundColor: image ? bgStyle : "#fff"}}
          >
            Image Capture
          </button>
        </div>
      </header>
      {video ? <VideoCapture /> : <ImageCapture />}
    </div>
  );
}

export default App;
