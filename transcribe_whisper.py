import pip_system_certs.wrapt_requests
import ssl
import httpx

# Patch default httpx verify to use Windows trust store
_orig_init = httpx.Client.__init__
def _new_init(self, *args, **kwargs):
    kwargs["verify"] = ssl.create_default_context()
    _orig_init(self, *args, **kwargs)
httpx.Client.__init__ = _new_init

from faster_whisper import WhisperModel
import json
import os

AUDIO_PATH = r"D:\video-engine\public\audio\vo.mp3"
OUTPUT_JSON = r"D:\video-engine\src\data\words.json"

def transcribe():
    print("Loading Faster-Whisper base model...")
    model = WhisperModel("base", device="cpu", compute_type="int8")
    
    print(f"Transcribing {AUDIO_PATH} with word timestamps...")
    segments, info = model.transcribe(AUDIO_PATH, word_timestamps=True)
    
    words_list = []
    sentence_index = 0
    
    for segment in segments:
        print(f"Segment: [{segment.start:.2f}s -> {segment.end:.2f}s] {segment.text}")
        if segment.words:
            for w in segment.words:
                cleaned_word = w.word.strip()
                if not cleaned_word:
                    continue
                words_list.append({
                    "word": cleaned_word,
                    "start": round(w.start, 3),
                    "end": round(w.end, 3),
                    "startFrame": int(round(w.start * 30)),
                    "endFrame": int(round(w.end * 30)),
                    "sentenceIndex": sentence_index,
                    "probability": round(w.probability, 3)
                })
            sentence_index += 1

    os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(words_list, f, indent=2)
        
    print(f"Successfully generated {len(words_list)} real acoustic word timestamps to {OUTPUT_JSON}")

if __name__ == "__main__":
    transcribe()
