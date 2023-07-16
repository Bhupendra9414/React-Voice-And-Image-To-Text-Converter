import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const SpeechToText = () => {
  const [flag, setFlag] = useState(true);
  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleStart = () => {
    SpeechRecognition.startListening({ continuous: true });
    setFlag(false)
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
    setFlag(true)
  };

  return (
    <div>

      <button onClick={flag ? handleStart : handleStop}>{flag ? "Start" : "Stop"}</button>
      <button onClick={resetTranscript}>Clear Transcript</button>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechToText;