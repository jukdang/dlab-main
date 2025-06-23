
import { useEffect, useState } from "react";
import { Howl } from "howler";

export const useBackgroundMusic = (volume: number) => {
  const [sound, setSound] = useState<Howl | null>(null);

  useEffect(() => {
    const newSound = new Howl({
      src: "/sounds/background.mp3",
      loop: false,
      volume,
    });

    setSound(newSound);

    return () => {
      if (newSound) {
        newSound.stop();
        newSound.unload();
      }
    };
  }, []);

  // volume이 변경될 때마다 기존 Howl 인스턴스의 volume을 업데이트
  useEffect(() => {
    if (sound) {
      sound.volume(volume);
    }
  }, [volume, sound]);

  return sound;
}

export const useSoundEffect = (volume: number) => {
  const [sound, setSound] = useState<Howl | null>(null);

  useEffect(() => {
    const newSound = new Howl({
      src: "/sounds/Tiny Button Push Sound.mp3",
      loop: false,
      volume,
    });

    setSound(newSound);

    return () => {
      if (newSound) {
        newSound.stop();
        newSound.unload();
      }
    };
  }, []);

  // volume이 변경될 때마다 기존 Howl 인스턴스의 volume을 업데이트
  useEffect(() => {
    if (sound) {
      sound.volume(volume);
    }
  }, [volume, sound]);

  return sound;
}

