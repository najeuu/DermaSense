// src/utils/camera.js

/**
 * Fungsi untuk mengambil gambar dari kamera
 * Mengembalikan data gambar dalam bentuk Base64
 */
export async function captureFromCamera() {
  return new Promise(async (resolve, reject) => {
    let stream = null;
    
    try {
      // Minta akses kamera
      stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 }, 
          height: { ideal: 720 },
          facingMode: 'user' // gunakan front camera jika ada
        } 
      });
      
      // Buat video element
      const video = document.createElement("video");
      video.srcObject = stream;
      video.autoplay = true;
      video.playsInline = true;
      
      // Buat canvas untuk capture
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      
      // Tunggu video ready
      video.onloadedmetadata = () => {
        // Set canvas size sama dengan video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Buat modal untuk preview kamera
        createCameraModal(video, canvas, context, stream, resolve, reject);
      };
      
      video.onerror = (err) => {
        console.error("Video error:", err);
        stopStream(stream);
        reject(new Error("Gagal memuat video dari kamera"));
      };
      
    } catch (err) {
      console.error("Camera access error:", err);
      stopStream(stream);
      
      if (err.name === 'NotAllowedError') {
        reject(new Error("Akses kamera ditolak. Silakan izinkan akses kamera."));
      } else if (err.name === 'NotFoundError') {
        reject(new Error("Kamera tidak ditemukan pada perangkat ini."));
      } else {
        reject(new Error("Tidak dapat mengakses kamera: " + err.message));
      }
    }
  });
}

/**
 * Membuat modal untuk preview kamera
 */
function createCameraModal(video, canvas, context, stream, resolve, reject) {
  // Buat modal container
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  `;
  
  // Style video
  video.style.cssText = `
    max-width: 90%;
    max-height: 70%;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  `;
  
  // Buat container untuk tombol
  const buttonContainer = document.createElement('div');
  buttonContainer.style.cssText = `
    margin-top: 20px;
    display: flex;
    gap: 15px;
  `;
  
  // Tombol capture
  const captureBtn = document.createElement('button');
  captureBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg> Ambil Foto';
  captureBtn.style.cssText = `
    background: #14B8A6;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
  `;
  
  // Tombol cancel
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = '❌ Batal';
  cancelBtn.style.cssText = `
    background: #EF4444;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
  `;
  
  // Event handlers
  captureBtn.onclick = () => {
    try {
      // Gambar video ke canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert ke base64
      const imageData = canvas.toDataURL("image/jpeg", 0.8);
      
      // Cleanup
      document.body.removeChild(modal);
      stopStream(stream);
      
      resolve(imageData);
    } catch (err) {
      console.error("Capture error:", err);
      document.body.removeChild(modal);
      stopStream(stream);
      reject(new Error("Gagal mengambil foto"));
    }
  };
  
  cancelBtn.onclick = () => {
    document.body.removeChild(modal);
    stopStream(stream);
    reject(new Error("Dibatalkan oleh user"));
  };
  
  // Assemble modal
  buttonContainer.appendChild(captureBtn);
  buttonContainer.appendChild(cancelBtn);
  modal.appendChild(video);
  modal.appendChild(buttonContainer);
  
  // Add to DOM
  document.body.appendChild(modal);
}

/**
 * Stop semua tracks dari stream
 */
function stopStream(stream) {
  if (stream) {
    stream.getTracks().forEach(track => {
      track.stop();
    });
  }
}