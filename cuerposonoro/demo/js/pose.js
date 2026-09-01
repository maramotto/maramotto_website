/**
 * Pose detection handler using MediaPipe Pose
 */

class PoseHandler {
    constructor(canvasElement) {
        this.config = CONFIG.pose;
        this.canvas = canvasElement;
        this.ctx = canvasElement.getContext('2d');
        this.pose = null;
        this.lastResults = null;
    }

    async init() {
        const cfg = this.config;

        this.pose = new Pose({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
            }
        });

        this.pose.setOptions({
            modelComplexity: cfg.modelComplexity,
            smoothLandmarks: cfg.smoothLandmarks,
            enableSegmentation: cfg.enableSegmentation,
            minDetectionConfidence: cfg.minDetectionConfidence,
            minTrackingConfidence: cfg.minTrackingConfidence
        });

        this.pose.onResults((results) => {
            this.lastResults = results;
        });

        console.log('Loading pose model...');
    }

    async detect(videoElement) {
        if (this.canvas.width !== videoElement.videoWidth) {
            this.canvas.width = videoElement.videoWidth;
            this.canvas.height = videoElement.videoHeight;
        }

        await this.pose.send({ image: videoElement });

        return this.lastResults;
    }

    draw(results) {
        const cfg = this.config;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (!results.poseLandmarks) return;

        drawConnectors(this.ctx, results.poseLandmarks, POSE_CONNECTIONS, {
            color: cfg.connectionColor,
            lineWidth: cfg.connectionLineWidth
        });

        drawLandmarks(this.ctx, results.poseLandmarks, {
            color: cfg.landmarkColor,
            lineWidth: 1,
            radius: cfg.landmarkRadius
        });
    }
}
