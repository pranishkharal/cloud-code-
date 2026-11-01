from PIL import Image, ImageDraw, ImageFilter
import math

def create_ocean_bg():
    w, h = 1920, 1080
    img = Image.new("RGBA", (w, h), (3, 14, 28, 255))
    draw = ImageDraw.Draw(img)
    
    # Radial glow at top
    for r in range(800, 0, -20):
        alpha = int(45 * (1 - r / 800))
        draw.ellipse([w//2 - r, -r//2, w//2 + r, r//2 + 300], fill=(12, 60, 105, alpha))
    
    img.save(r"D:\video-engine\public\images\ocean_bg.png")
    print("Created ocean_bg.png")

def create_great_white_art():
    w, h = 1200, 650
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Modern sleek Great White illustration
    # Body
    body_pts = [
        (80, 320), (220, 240), (450, 190), (700, 210), (950, 290), 
        (1080, 320), (1020, 340), (880, 370), (600, 420), (320, 420), 
        (160, 380), (80, 320)
    ]
    draw.polygon(body_pts, fill=(56, 189, 248, 240))
    
    # Belly highlight
    belly_pts = [
        (80, 320), (160, 380), (320, 420), (600, 420), (880, 370), 
        (700, 340), (400, 340), (200, 330), (80, 320)
    ]
    draw.polygon(belly_pts, fill=(224, 242, 254, 220))
    
    # Dorsal fin
    dorsal_pts = [(450, 200), (520, 60), (570, 200)]
    draw.polygon(dorsal_pts, fill=(3, 105, 161, 255))
    
    # Pectoral fin
    pect_pts = [(330, 380), (280, 560), (420, 410)]
    draw.polygon(pect_pts, fill=(2, 132, 199, 255))
    
    # Caudal / Tail fin
    tail_pts = [(1040, 320), (1160, 140), (1110, 330), (1170, 500), (1050, 340)]
    draw.polygon(tail_pts, fill=(3, 105, 161, 255))
    
    # Eye & Gills
    draw.ellipse([210, 295, 225, 310], fill=(15, 23, 42, 255))
    for gx in [340, 360, 380, 400]:
        draw.line([(gx, 310), (gx - 10, 360)], fill=(3, 105, 161, 220), width=3)
        
    img.save(r"D:\video-engine\public\images\great_white.png")
    
    # Silhouette for size comparison
    sil = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(sil)
    sdraw.polygon(body_pts, fill=(56, 189, 248, 255))
    sdraw.polygon(dorsal_pts, fill=(56, 189, 248, 255))
    sdraw.polygon(pect_pts, fill=(56, 189, 248, 255))
    sdraw.polygon(tail_pts, fill=(56, 189, 248, 255))
    sil.save(r"D:\video-engine\public\images\great_white_silhouette.png")
    print("Created great_white.png & silhouette")

def create_dunkleosteus_art():
    w, h = 1400, 750
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Giant Armored Dunkleosteus
    # Body
    body_pts = [
        (100, 360), (260, 210), (520, 170), (850, 230), (1150, 340), 
        (1320, 370), (1220, 420), (950, 510), (620, 540), (340, 530), 
        (180, 470), (100, 360)
    ]
    draw.polygon(body_pts, fill=(185, 28, 28, 230))
    
    # Armor head plating
    plate_pts = [
        (100, 360), (260, 210), (520, 170), (580, 360), (520, 520), 
        (340, 530), (180, 470), (100, 360)
    ]
    draw.polygon(plate_pts, fill=(127, 29, 29, 255))
    
    # Heavy bony jaw cutters
    jaw_upper = [(100, 360), (220, 330), (250, 390), (180, 400), (130, 380)]
    draw.polygon(jaw_upper, fill=(254, 243, 199, 255))
    jaw_lower = [(140, 420), (240, 400), (250, 460), (170, 470)]
    draw.polygon(jaw_lower, fill=(254, 243, 199, 255))
    
    # Heavy fins
    pec_pts = [(480, 480), (420, 680), (580, 540)]
    draw.polygon(pec_pts, fill=(153, 27, 27, 255))
    tail_pts = [(1250, 370), (1380, 200), (1310, 400), (1370, 580), (1260, 420)]
    draw.polygon(tail_pts, fill=(153, 27, 27, 255))
    
    # Armor plate seam lines
    draw.line([(320, 200), (340, 520)], fill=(69, 10, 10, 255), width=5)
    draw.line([(450, 180), (470, 510)], fill=(69, 10, 10, 255), width=5)
    draw.ellipse([240, 280, 265, 305], fill=(254, 243, 199, 255))
    draw.ellipse([248, 288, 258, 298], fill=(15, 23, 42, 255))
    
    img.save(r"D:\video-engine\public\images\dunkleosteus.png")
    
    # Silhouette
    sil = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(sil)
    sdraw.polygon(body_pts, fill=(239, 68, 68, 255))
    sdraw.polygon(pec_pts, fill=(239, 68, 68, 255))
    sdraw.polygon(tail_pts, fill=(239, 68, 68, 255))
    sil.save(r"D:\video-engine\public\images\dunkleosteus_silhouette.png")
    print("Created dunkleosteus.png & silhouette")

if __name__ == "__main__":
    create_ocean_bg()
    create_great_white_art()
    create_dunkleosteus_art()
