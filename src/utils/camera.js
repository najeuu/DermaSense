// src/utils/camera.js
/**
 * Fungsi untuk mengambil gambar dari kamera
 * Mengembalikan data gambar dalam bentuk Base64
 */
export async function captureFromCamera() {
  return new Promise(async (resolve, reject) => {
    let stream = null;
    let currentFacingMode = 'environment'; // Default ke kamera belakang

    try {
      // Fungsi untuk mendapatkan stream kamera
      const getStream = async (facingMode) => {
        return await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: facingMode,
          },
        });
      };

      // Coba akses kamera belakang dulu, jika gagal pakai depan
      try {
        stream = await getStream('environment');
      } catch (err) {
        console.log('Kamera belakang tidak tersedia, menggunakan kamera depan');
        stream = await getStream('user');
        currentFacingMode = 'user';
      }

      // Buat video element
      const video = document.createElement('video');
      video.srcObject = stream;
      video.autoplay = true;
      video.playsInline = true;

      // Buat canvas untuk capture
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      // Tunggu video ready
      video.onloadedmetadata = () => {
        // Set canvas size sama dengan video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        // Buat modal untuk preview kamera
        createCameraModal(
          video,
          canvas,
          context,
          stream,
          currentFacingMode,
          getStream,
          resolve,
          reject,
        );
      };

      video.onerror = (err) => {
        console.error('Video error:', err);
        stopStream(stream);
        reject(new Error('Gagal memuat video dari kamera'));
      };
    } catch (err) {
      console.error('Camera access error:', err);
      stopStream(stream);
      if (err.name === 'NotAllowedError') {
        reject(new Error('Akses kamera ditolak. Silakan izinkan akses kamera.'));
      } else if (err.name === 'NotFoundError') {
        reject(new Error('Kamera tidak ditemukan pada perangkat ini.'));
      } else {
        reject(new Error('Tidak dapat mengakses kamera: ' + err.message));
      }
    }
  });
}

/**
 * Membuat modal untuk preview kamera
 */
function createCameraModal(
  video,
  canvas,
  context,
  stream,
  currentFacingMode,
  getStream,
  resolve,
  reject,
) {
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
    padding: 20px;
    box-sizing: border-box;
  `;

  // Container untuk video dan kontrol
  const videoContainer = document.createElement('div');
  videoContainer.style.cssText = `
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 800px;
    height: auto;
  `;

  // Style video - responsive
  video.style.cssText = `
    width: 100%;
    max-width: 600px;
    height: auto;
    max-height: 60vh;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    object-fit: cover;
    
    @media (max-width: 768px) {
      max-width: 90%;
      max-height: 50vh;
    }
  `;

  // Tombol switch kamera
  const switchBtn = document.createElement('button');
  switchBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 2L22 7L17 12M22 7H4M7 22L2 17L7 12M2 17H20"/>
    </svg>
  `;
  switchBtn.title =
    currentFacingMode === 'environment' ? 'Switch ke Kamera Depan' : 'Switch ke Kamera Belakang';
  switchBtn.style.cssText = `
    position: absolute;
    top: 15px;
    right: 15px;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    border: none;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
    transition: all 0.2s ease;
    z-index: 1;
  `;

  // Hover effect untuk switch button
  switchBtn.onmouseenter = () => {
    switchBtn.style.background = 'rgba(0, 0, 0, 0.8)';
    switchBtn.style.transform = 'scale(1.05)';
  };

  switchBtn.onmouseleave = () => {
    switchBtn.style.background = 'rgba(0, 0, 0, 0.6)';
    switchBtn.style.transform = 'scale(1)';
  };

  // Buat container untuk tombol
  const buttonContainer = document.createElement('div');
  buttonContainer.style.cssText = `
    margin-top: 20px;
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    justify-content: center;
    
    @media (max-width: 480px) {
      flex-direction: column;
      width: 100%;
      gap: 10px;
    }
  `;

  // Tombol capture
  const captureBtn = document.createElement('button');
  captureBtn.innerHTML =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg> Ambil Foto';
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
    transition: all 0.2s ease;
    min-width: 140px;
    justify-content: center;
  `;

  // Tombol cancel
  const cancelBtn = document.createElement('button');
  cancelBtn.innerHTML = '❌ Batal';
  cancelBtn.style.cssText = `
    background: #EF4444;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    transition: all 0.2s ease;
    min-width: 100px;
  `;

  // Hover effects untuk tombol
  captureBtn.onmouseenter = () => {
    captureBtn.style.background = '#0F766E';
    captureBtn.style.transform = 'translateY(-2px)';
  };

  captureBtn.onmouseleave = () => {
    captureBtn.style.background = '#14B8A6';
    captureBtn.style.transform = 'translateY(0)';
  };

  cancelBtn.onmouseenter = () => {
    cancelBtn.style.background = '#DC2626';
    cancelBtn.style.transform = 'translateY(-2px)';
  };

  cancelBtn.onmouseleave = () => {
    cancelBtn.style.background = '#EF4444';
    cancelBtn.style.transform = 'translateY(0)';
  };

  // Event handlers

  // Switch kamera function
  switchBtn.onclick = async () => {
    try {
      switchBtn.disabled = true;
      switchBtn.style.opacity = '0.5';

      // Stop current stream
      stopStream(stream);

      // Toggle facing mode
      const newFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';

      // Get new stream
      const newStream = await getStream(newFacingMode);

      // Update video source
      video.srcObject = newStream;

      // Update variables
      stream = newStream;
      currentFacingMode = newFacingMode;

      // Update tooltip
      switchBtn.title =
        currentFacingMode === 'environment'
          ? 'Switch ke Kamera Depan'
          : 'Switch ke Kamera Belakang';

      // Update canvas size when video loads
      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      };
    } catch (err) {
      console.error('Switch camera error:', err);
      alert('Gagal mengganti kamera: ' + err.message);
    } finally {
      switchBtn.disabled = false;
      switchBtn.style.opacity = '1';
    }
  };

  captureBtn.onclick = () => {
    try {
      // Gambar video ke canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      // Convert ke base64
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      // Cleanup
      document.body.removeChild(modal);
      stopStream(stream);
      resolve(imageData);
    } catch (err) {
      console.error('Capture error:', err);
      document.body.removeChild(modal);
      stopStream(stream);
      reject(new Error('Gagal mengambil foto'));
    }
  };

  cancelBtn.onclick = () => {
    document.body.removeChild(modal);
    stopStream(stream);
    reject(new Error('Dibatalkan oleh user'));
  };

  // Handle ESC key untuk close modal
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      document.body.removeChild(modal);
      stopStream(stream);
      reject(new Error('Dibatalkan oleh user'));
      document.removeEventListener('keydown', handleKeyDown);
    }
  };

  document.addEventListener('keydown', handleKeyDown);

  // Assemble modal
  videoContainer.appendChild(video);
  videoContainer.appendChild(switchBtn);
  videoContainer.appendChild(buttonContainer);

  buttonContainer.appendChild(cancelBtn);
  buttonContainer.appendChild(captureBtn);

  modal.appendChild(videoContainer);

  // Add to DOM
  document.body.appendChild(modal);

  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden';

  // Cleanup function untuk restore body scroll
  const originalCleanup = () => {
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', handleKeyDown);
  };

  // Override existing cleanup calls
  const originalCaptureClick = captureBtn.onclick;
  const originalCancelClick = cancelBtn.onclick;

  captureBtn.onclick = () => {
    originalCleanup();
    originalCaptureClick();
  };

  cancelBtn.onclick = () => {
    originalCleanup();
    originalCancelClick();
  };
}

/**
 * Stop semua tracks dari stream
 */
function stopStream(stream) {
  if (stream) {
    stream.getTracks().forEach((track) => {
      track.stop();
    });
  }
}
