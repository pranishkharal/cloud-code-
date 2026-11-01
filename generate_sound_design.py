import numpy as np
import scipy.io.wavfile as wav
import subprocess
import os

RATE = 44100
SFX_DIR = r"D:\video-engine\public\audio\sfx"
MUSIC_DIR = r"D:\video-engine\public\audio\music"
AMBIENCE_DIR = r"D:\video-engine\public\audio\ambience"

def wav_to_mp3(wav_path, mp3_path):
    subprocess.run([
        "ffmpeg", "-y", "-i", wav_path, "-codec:a", "libmp3lame", "-b:a", "192k", mp3_path
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    if os.path.exists(wav_path):
        os.remove(wav_path)

def gen_era_whoosh():
    # 0.8s filtered noise burst swoosh with pitch fall
    dur = 0.8
    t = np.linspace(0, dur, int(RATE * dur), endpoint=False)
    noise = np.random.uniform(-1, 1, len(t))
    envelope = np.sin(np.pi * t / dur) ** 2
    # Moving lowpass modulation
    carrier = np.sin(2 * np.pi * (400 - 250 * (t / dur)) * t)
    sig = (noise * 0.4 + carrier * 0.6) * envelope * 0.85
    wav_p = os.path.join(SFX_DIR, "era-whoosh.wav")
    wav.write(wav_p, RATE, (sig * 32767).astype(np.int16))
    wav_to_mp3(wav_p, os.path.join(SFX_DIR, "era-whoosh.mp3"))
    print("Generated era-whoosh.mp3")

def gen_stamp_hit():
    # 0.7s deep bass punch transient (60Hz -> 30Hz) + noise thud
    dur = 0.7
    t = np.linspace(0, dur, int(RATE * dur), endpoint=False)
    freq = 75 * np.exp(-t * 6) + 32
    phase = 2 * np.pi * np.cumsum(freq) / RATE
    sine = np.sin(phase)
    # Distortion saturation
    sine = np.tanh(sine * 2.2)
    noise_thud = np.random.uniform(-1, 1, len(t)) * np.exp(-t * 30)
    sig = (sine * 0.85 + noise_thud * 0.35) * np.exp(-t * 3.5)
    wav_p = os.path.join(SFX_DIR, "stamp-hit.wav")
    wav.write(wav_p, RATE, (sig * 32767).astype(np.int16))
    wav_to_mp3(wav_p, os.path.join(SFX_DIR, "stamp-hit.mp3"))
    print("Generated stamp-hit.mp3")

def gen_tick():
    # 0.03s wooden clock/dial tick
    dur = 0.03
    t = np.linspace(0, dur, int(RATE * dur), endpoint=False)
    sig = np.sin(2 * np.pi * 1400 * t) * np.exp(-t * 180)
    wav_p = os.path.join(SFX_DIR, "tick.wav")
    wav.write(wav_p, RATE, (sig * 32767).astype(np.int16))
    wav_to_mp3(wav_p, os.path.join(SFX_DIR, "tick.mp3"))
    print("Generated tick.mp3")

def gen_ping():
    # 0.45s 880Hz (A5) pure harmonic bell ping
    dur = 0.45
    t = np.linspace(0, dur, int(RATE * dur), endpoint=False)
    sig = (np.sin(2 * np.pi * 880 * t) + 0.3 * np.sin(2 * np.pi * 1760 * t)) * np.exp(-t * 7.5) * 0.8
    wav_p = os.path.join(SFX_DIR, "ping.wav")
    wav.write(wav_p, RATE, (sig * 32767).astype(np.int16))
    wav_to_mp3(wav_p, os.path.join(SFX_DIR, "ping.mp3"))
    print("Generated ping.mp3")

def gen_rise():
    # 1.5s tension riser (120Hz -> 650Hz)
    dur = 1.5
    t = np.linspace(0, dur, int(RATE * dur), endpoint=False)
    freq = np.linspace(120, 650, len(t))
    phase = 2 * np.pi * np.cumsum(freq) / RATE
    env = (t / dur) ** 2
    sig = np.sin(phase) * env * 0.75
    wav_p = os.path.join(SFX_DIR, "rise.wav")
    wav.write(wav_p, RATE, (sig * 32767).astype(np.int16))
    wav_to_mp3(wav_p, os.path.join(SFX_DIR, "rise.mp3"))
    print("Generated rise.mp3")

def gen_click():
    # 0.015s sharp UI click
    dur = 0.015
    t = np.linspace(0, dur, int(RATE * dur), endpoint=False)
    sig = np.sin(2 * np.pi * 2400 * t) * np.exp(-t * 350)
    wav_p = os.path.join(SFX_DIR, "click.wav")
    wav.write(wav_p, RATE, (sig * 32767).astype(np.int16))
    wav_to_mp3(wav_p, os.path.join(SFX_DIR, "click.mp3"))
    print("Generated click.mp3")

def gen_drone_pad():
    # 65-second cinematic drone pad (C minor triad: C2 65.4Hz, G2 98Hz, Eb3 155.56Hz)
    dur = 65.0
    t = np.linspace(0, dur, int(RATE * dur), endpoint=False)
    # Slow LFO modulation (0.1Hz)
    lfo1 = 0.5 + 0.5 * np.sin(2 * np.pi * 0.12 * t)
    lfo2 = 0.5 + 0.5 * np.cos(2 * np.pi * 0.08 * t)
    
    c2 = np.sin(2 * np.pi * 65.41 * t)
    g2 = np.sin(2 * np.pi * 97.99 * t) * lfo1
    eb3 = np.sin(2 * np.pi * 155.56 * t) * lfo2 * 0.5
    
    # Soft warm overtones
    c3 = np.sin(2 * np.pi * 130.81 * t) * 0.35
    
    pad = (c2 * 0.45 + g2 * 0.3 + eb3 * 0.2 + c3 * 0.15)
    # Fade in 3s, fade out 4s
    fade_in = np.minimum(1.0, t / 3.0)
    fade_out = np.minimum(1.0, (dur - t) / 4.0)
    pad = pad * fade_in * fade_out * 0.65
    
    wav_p = os.path.join(MUSIC_DIR, "drone-pad.wav")
    wav.write(wav_p, RATE, (pad * 32767).astype(np.int16))
    wav_to_mp3(wav_p, os.path.join(MUSIC_DIR, "drone-pad.mp3"))
    print("Generated 65s drone-pad.mp3")

def gen_ambience():
    # 65-second low-frequency deep ocean rumble
    dur = 65.0
    t = np.linspace(0, dur, int(RATE * dur), endpoint=False)
    noise = np.random.uniform(-1, 1, len(t))
    # Moving wave swell (0.05Hz)
    swell = 0.4 + 0.6 * (0.5 + 0.5 * np.sin(2 * np.pi * 0.06 * t))
    amb = noise * 0.18 * swell
    wav_p = os.path.join(AMBIENCE_DIR, "ocean-abyss.wav")
    wav.write(wav_p, RATE, (amb * 32767).astype(np.int16))
    # Run through lowpass filter via ffmpeg
    subprocess.run([
        "ffmpeg", "-y", "-i", wav_p, "-af", "lowpass=f=180,volume=0.4", "-codec:a", "libmp3lame", "-b:a", "192k",
        os.path.join(AMBIENCE_DIR, "ocean-abyss.mp3")
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    if os.path.exists(wav_p):
        os.remove(wav_p)
    print("Generated ocean-abyss.mp3")

if __name__ == "__main__":
    gen_era_whoosh()
    gen_stamp_hit()
    gen_tick()
    gen_ping()
    gen_rise()
    gen_click()
    gen_drone_pad()
    gen_ambience()
