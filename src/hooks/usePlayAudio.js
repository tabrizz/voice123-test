import { useState } from "react"
import { Howl } from "howler"
import { useEffect } from "react"


export const usePlayAudio = (isFetching) => {
  const [playingIndex, setPlayingIndex] = useState(null)
  const [currentAudio, setCurrentAudio] = useState(null)


  const handlePlayPause = (index, audioUrl) => {

    if (currentAudio && playingIndex !== index) {
      currentAudio.stop()
    }
    if (playingIndex === index) {
      currentAudio.stop()
      setPlayingIndex(null);
    } else {
      const sound = new Howl({
        src: [audioUrl],
        html5: true,
        onloaderror: () => {
          console.error("Error loading audio")
          setPlayingIndex(null)
        },
        onend: () => setPlayingIndex(null),
      });
      sound.play();
      setCurrentAudio(sound)
      setPlayingIndex(index)
    }
  }
  
  useEffect(() => {
    if (isFetching) {
      if (currentAudio) {
        currentAudio.stop()
        setPlayingIndex(null)
      }
    }
  }, [isFetching, currentAudio])
 
  return { playingIndex, handlePlayPause }
}