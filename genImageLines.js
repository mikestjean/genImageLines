const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

const img1 = new Image();
img1.onload = function() {
  ctx.drawImage(img1, 0, 0, canvas.width, canvas.height);
  const img2 = new Image();
  img2.onload = function() {
    ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(img2, 0, 0, canvas.width, canvas.height);
  };
  img2.src = 'second_image.jpg';
};
img1.src = 'first_image.jpg';
