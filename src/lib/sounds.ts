class SoundManager {
  private sounds: { [key: string]: HTMLAudioElement } = {};
  private isMuted: boolean = false;

  constructor() {
    this.sounds = {
      correct: new Audio("/sounds/correct.mp3"),
      wrong: new Audio("/sounds/wrong.mp3"),
      click: new Audio("/sounds/click.mp3"),
      complete: new Audio("/sounds/complete.mp3"),
    };
  }

  play(soundName: "correct" | "wrong" | "click" | "complete") {
    if (!this.isMuted && this.sounds[soundName]) {
      this.sounds[soundName].currentTime = 0;
      this.sounds[soundName].play().catch(() => {});
    }
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  getMuted() {
    return this.isMuted;
  }
}

export const soundManager = new SoundManager();
