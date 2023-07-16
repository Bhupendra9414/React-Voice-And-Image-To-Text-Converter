import React from 'react';
import ImageToText from './components/Image';
import SpeechToText from './components/Voice'

const App = () => {
  return (
    <div className='App'>
      <h1>Speech to Text</h1>
      <SpeechToText />

      <h1>Image to Text</h1>
      <ImageToText />
    </div>
  );
};

export default App;
