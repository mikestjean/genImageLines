async function genImageLines() {
    const response = await fetch('no_text_DTLW-Goteborg1280v2-1.png');
    const blob = await response.blob();
    const img = await createImageBitmap(blob);
  
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
    const numLines = 1280;
    const lineHeight = canvas.height / numLines;
  
    let time = 0;
    function animate() {
      time += 0.1;
      for (let i = 0; i < numLines; i++) {
        const y = i * lineHeight;
        const offset = Math.sin(time + y * 0.01) * 20;
        const imageData = ctx.getImageData(0, y, canvas.width, lineHeight);
        ctx.putImageData(imageData, 0, y + offset);
      }
      requestAnimationFrame(animate);
    }
    animate();
  
    document.body.appendChild(canvas);
  }
  
  genImageLines();
  