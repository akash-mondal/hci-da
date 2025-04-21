import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

export const useVoiceNavigation = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = useCallback(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false; // Make recognition stop after each utterance
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
        toast.success('Voice navigation activated - Speak a command', { duration: 1000 }); // 1s toast
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setTranscript(transcript);
        
        // Provide feedback when command is recognized
        if (event.results[0].isFinal) {
          toast.success('Command recognized: ' + transcript, { duration: 1000 }); // 1s toast
          recognition.stop(); // Stop immediately after final result
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        switch (event.error) {
          case 'network':
            toast.error('Network error. Please check your internet connection.', { duration: 1000 });
            break;
          case 'not-allowed':
            toast.error('Microphone access denied. Please allow microphone access.', { duration: 1000 });
            break;
          case 'no-speech':
            toast.error('No speech detected. Please try speaking again.', { duration: 1000 });
            break;
          case 'aborted':
            toast.error('Speech recognition was aborted.', { duration: 1000 });
            break;
          case 'audio-capture':
            toast.error('No microphone detected. Please check your audio settings.', { duration: 1000 });
            break;
          case 'service-not-allowed':
            toast.error('Speech recognition service is not allowed.', { duration: 1000 });
            break;
          default:
            toast.error('Voice recognition error. Please try again.', { duration: 1000 });
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      try {
        recognition.start();
      } catch (error) {
        console.error('Speech recognition start error:', error);
        toast.error('Failed to start voice recognition. Please try again.', { duration: 1000 });
      }
    } else {
      toast.error('Speech recognition is not supported in this browser', { duration: 1000 });
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    setIsListening(false);
    window.speechSynthesis?.cancel();
  }, []);

  return { isListening, transcript, startListening, stopListening };
};