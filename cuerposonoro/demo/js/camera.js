/**
 * Camera handler for webcam access
 */

class CameraHandler {
    constructor(videoElement) {
        this.config = CONFIG.camera;
        this.video = videoElement;
        this.stream = null;
    }

    async init() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error('Tu navegador no soporta acceso a la cámara');
        }
    }

    async start() {
        const cfg = this.config;

        try {
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: cfg.width },
                    height: { ideal: cfg.height },
                    facingMode: cfg.facingMode,
                    frameRate: { ideal: cfg.frameRate }
                },
                audio: false
            });

            this.video.srcObject = this.stream;

            await new Promise((resolve) => {
                this.video.onloadedmetadata = () => {
                    this.video.play();
                    resolve();
                };
            });

        } catch (error) {
            if (error.name === 'NotAllowedError') {
                throw new Error('Permiso de cámara denegado');
            } else if (error.name === 'NotFoundError') {
                throw new Error('No se encontró ninguna cámara');
            }
            throw error;
        }
    }

    stop() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        this.video.srcObject = null;
    }

    getVideoElement() {
        return this.video;
    }
}
