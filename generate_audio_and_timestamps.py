import asyncio
import json
import edge_tts

# Expanded script text designed to fit ~50-55 seconds of natural documentary pacing
SENTENCES = [
    ("Could a modern Great White Shark survive in the savage oceans of prehistory?", 0),
    ("Three hundred and seventy million years ago, the Devonian seas were ruled by Dunkleosteus.", 1),
    ("A ten-meter placoderm armored in solid bone plates, packing over five thousand pounds of bite force.", 2),
    ("Comparing the two apex predators side by side, our modern champion is dwarfed in sheer mass and armor.", 3),
    ("Yet, with superior speed, endothermic stamina, and deep-sea diving capabilities, our king outmaneuvers the ancient titan.", 4),
    ("The Devonian verdict: The Great White narrowly survives.", 5)
]

FULL_TEXT = " ".join([s[0] for s in SENTENCES])
VOICE = "en-US-ChristopherNeural"
OUTPUT_AUDIO = r"D:\video-engine\public\audio\voiceover.mp3"
OUTPUT_TIMESTAMPS = r"D:\video-engine\public\audio\word_timestamps.json"

async def generate():
    communicate = edge_tts.Communicate(FULL_TEXT, VOICE, rate="-4%")
    
    sentences_data = []
    with open(OUTPUT_AUDIO, "wb") as f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "SentenceBoundary":
                sentences_data.append(chunk)
                
    print(f"Captured {len(sentences_data)} sentence boundaries.")
    
    # Calculate word timestamps from sentence boundaries
    words_result = []
    for s_chunk in sentences_data:
        text = s_chunk["text"].strip()
        words = text.split()
        if not words:
            continue
        start_sec = s_chunk["offset"] / 10000000.0
        duration_sec = s_chunk["duration"] / 10000000.0
        
        # Distribute duration proportionally by word character length
        total_chars = sum(len(w) for w in words)
        current_time = start_sec
        for w in words:
            w_dur = (len(w) / max(1, total_chars)) * duration_sec
            words_result.append({
                "word": w,
                "start": round(current_time, 3),
                "end": round(current_time + w_dur, 3),
                "startFrame": int(round(current_time * 30)),
                "endFrame": int(round((current_time + w_dur) * 30))
            })
            current_time += w_dur

    with open(OUTPUT_TIMESTAMPS, "w", encoding="utf-8") as f:
        json.dump(words_result, f, indent=2)
    print(f"Generated {len(words_result)} words with start/end frames.")

if __name__ == "__main__":
    asyncio.run(generate())
