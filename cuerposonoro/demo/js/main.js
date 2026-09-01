/**
 * Main orchestrator for the CuerpoSonoro web demo — fully client-side.
 */

// Status-badge text is looked up on window.CS_STRINGS, which each page
// (index.html / en/index.html) defines inline before this script loads —
// this keeps the site's no-runtime-i18n, per-page-language design intact
// while letting one shared main.js serve both languages. The Spanish
// literals below are the fallback if a page ever forgets to define it.
const STRINGS = window.CS_STRINGS || {};

class App {
    constructor() {
        this.camera = null;
        this.pose = null;
        this.features = null;
        this.audio = null;
        this.isRunning = false;
        this.prevLandmarks = null;

        this.initElements();
        this.initEventListeners();
        this.init();
    }

    initElements() {
        this.videoEl = document.getElementById('video');
        this.canvasEl = document.getElementById('canvas');
        this.statusEl = document.getElementById('status');
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
    }

    initEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.stopBtn.addEventListener('click', () => this.stop());
    }

    /** Init sequence:
        1.- Create camera handler
        2.- Create pose handler
        3.- Create feature extractor
        4.- Create AudioEngine
        5.- Enable init button
    */
    async init() {
        this.updateStatus(STRINGS.init || 'Inicializando...');

        try {
            this.camera = new CameraHandler(this.videoEl);
            await this.camera.init();

            this.pose = new PoseHandler(this.canvasEl);
            await this.pose.init();

            this.features = new FeatureExtractor();

            this.audio = new AudioEngine();

            this.updateStatus(STRINGS.ready || 'Listo');
            this.startBtn.disabled = false;

        } catch (error) {
            this.updateStatus(`${STRINGS.error || 'Error'}: ${error.message}`);
            console.error('Initialization error:', error);
        }
    }

    async start() {
        if (this.isRunning) return;

        try {
            await this.audio.start();
            await this.camera.start();

            this.isRunning = true;
            this.processFrame();

            this.startBtn.disabled = true;
            this.stopBtn.disabled = false;
            this.updateStatus(STRINGS.active || 'Activo');

        } catch (error) {
            this.updateStatus(`${STRINGS.error || 'Error'}: ${error.message}`);
            console.error('Start error:', error);
        }
    }

    stop() {
        this.isRunning = false;
        this.camera.stop();
        this.audio.stop();
        this.prevLandmarks = null;

        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        this.updateStatus(STRINGS.stopped || 'Detenido');
    }

    /** The main process:
        1.- Detect pose (MediaPipe)
        2. Sketch skeleton in canvas
        3. Calculate features locally
        4. requestAnimationFrame → repeat
    */
    async processFrame() {
        if (!this.isRunning) return;

        const results = await this.pose.detect(this.videoEl);

        if (results && results.poseLandmarks) {
            this.pose.draw(results);

            const landmarks = results.poseLandmarks.map(lm => ({
                x: lm.x,
                y: lm.y,
                z: lm.z,
                visibility: lm.visibility
            }));

            const features = this.features.calculate(landmarks, this.prevLandmarks);
            this.prevLandmarks = landmarks;
            this.onFeatures(features);
        }

        requestAnimationFrame(() => this.processFrame());
    }

    onFeatures(features) {
        this.audio.update(features);
        this.updateFeaturesDisplay(features);
    }

    updateFeaturesDisplay(features) {
        for (const [key, value] of Object.entries(features)) {
            const bar = document.getElementById(`bar-${key}`);
            const val = document.getElementById(`val-${key}`);

            if (bar && val) {
                if (key === 'symmetry') {
                    const percent = Math.abs(value) * 50;
                    bar.style.width = `${percent}%`;
                    bar.style.transform = value >= 0
                        ? 'translateX(0)'
                        : `translateX(-100%)`;
                } else {
                    bar.style.width = `${value * 100}%`;
                }
                val.textContent = value.toFixed(2);
            }
        }
    }

    updateStatus(text) {
        this.statusEl.textContent = text;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
