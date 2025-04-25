
const canvas = new fabric.Canvas('c', {
  backgroundColor: '#000',
  selection: true
});

function resizeCanvas() {
  canvas.setWidth(window.innerWidth);
  canvas.setHeight(window.innerHeight - 60);
  canvas.renderAll();
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const rankSVGs = {
  airman: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/US_Airman_insignia.svg',
  sergeant: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/USAF_E-5_SSGT.svg',
  chief: 'https://upload.wikimedia.org/wikipedia/commons/d/df/USAF_E-9_CMSAF.svg'
};

function loadRank(rank) {
  canvas.clear();
  const svgURL = rankSVGs[rank];
  fabric.loadSVGFromURL(svgURL, function(objects, options) {
    const obj = fabric.util.groupSVGElements(objects, options);
    obj.set({ left: 50, top: 50, scaleX: 1, scaleY: 1 });
    canvas.add(obj);
    canvas.setActiveObject(obj);
    canvas.renderAll();
  });
}

document.getElementById('rankSelect').addEventListener('change', (e) => {
  loadRank(e.target.value);
});

document.getElementById('colorPicker').addEventListener('change', (e) => {
  const obj = canvas.getActiveObject();
  if (obj && obj._objects) {
    obj._objects.forEach(part => {
      if (part.set) part.set('fill', e.target.value);
    });
    canvas.renderAll();
  }
});

document.getElementById('addIcon').addEventListener('click', () => {
  const url = 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Emoji_u1f525.svg';
  fabric.Image.fromURL(url, (img) => {
    img.set({ left: 150, top: 150, scaleX: 0.2, scaleY: 0.2 });
    canvas.add(img);
    canvas.setActiveObject(img);
  });
});

document.getElementById('save').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'rank-edited.png';
  link.href = canvas.toDataURL({ format: 'png' });
  link.click();
});

// Load default
loadRank('airman');
