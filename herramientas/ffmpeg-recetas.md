# Recetas de FFmpeg (para copiar o para pedirle al agente)

> FFmpeg es la "navaja suiza" del video: corta, une, recorta, comprime y convierte.
> No hace falta memorizar nada: puedes pedirle al agente *"usa la receta 3 con mi archivo X"*.
> En Windows, si un comando largo da error, pídele al agente que lo adapte a PowerShell.

## 1. Ver información de un video (resolución, fps, duración)
```
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate -show_entries format=duration -of default=nw=1 material-crudo/clip.mp4
```

## 2. Cortar un tramo (del segundo 12 al 27) sin perder calidad
```
ffmpeg -ss 00:00:12 -to 00:00:27 -i material-crudo/clip.mp4 -c:v libx264 -crf 18 -c:a aac public/tramo.mp4
```

## 3. Pasar de horizontal (16:9) a vertical (9:16) recortando el centro
```
ffmpeg -i public/tramo.mp4 -vf "crop=ih*9/16:ih,scale=1080:1920" -c:v libx264 -crf 20 -c:a aac public/tramo-vertical.mp4
```
Si la persona no está en el centro, cambia la posición: `crop=ih*9/16:ih:X:0` (X = píxeles desde la izquierda).

## 4. Detectar silencios (para cortar pausas largas)
```
ffmpeg -i material-crudo/clip.mp4 -af silencedetect=noise=-35dB:d=0.6 -f null -
```
El agente lee los tiempos de silencio y arma la lista de cortes.

## 5. Unir varios clips (mismo tamaño y fps)
Crea `lista.txt` con una línea por clip: `file 'public/parte1.mp4'` y luego:
```
ffmpeg -f concat -safe 0 -i lista.txt -c:v libx264 -crf 20 -c:a aac salida/unido.mp4
```

## 6. Emparejar el volumen (normalizar a -14 LUFS, el nivel de YouTube y redes)
```
ffmpeg -i salida/unido.mp4 -af loudnorm=I=-14:TP=-1.5:LRA=11 -c:v copy -c:a aac salida/unido-normalizado.mp4
```

## 7. Agregar música de fondo bajita debajo de la voz
```
ffmpeg -i salida/video.mp4 -i public/musica.mp3 -filter_complex "[1:a]volume=0.12[m];[0:a][m]amix=inputs=2:duration=first[a]" -map 0:v -map "[a]" -c:v copy -c:a aac salida/video-con-musica.mp4
```

## 8. Extraer el audio (para transcribir con Whisper)
```
ffmpeg -i material-crudo/clip.mp4 -vn -ac 1 -ar 16000 material-crudo/audio.wav
```

## 9. "Quemar" subtítulos SRT en el video (quedan siempre visibles)
```
ffmpeg -i salida/video.mp4 -vf "subtitles=material-crudo/clip.srt:force_style='FontName=Poppins,FontSize=14,Outline=2,MarginV=60'" -c:a copy salida/video-subtitulado.mp4
```

## 10. Comprimir para enviar por WhatsApp o mail
```
ffmpeg -i salida/video.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k salida/video-liviano.mp4
```

## 11. Sacar una imagen (para miniatura) en el segundo 5
```
ffmpeg -ss 5 -i salida/video.mp4 -frames:v 1 salida/miniatura-base.png
```

## 12. Exportar listo para subir (redes y YouTube)
```
ffmpeg -i salida/video.mp4 -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 20 -r 30 -c:a aac -b:a 192k -movflags +faststart salida/final.mp4
```
