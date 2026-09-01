/**
 * Client-side port of cuerposonoro-webdemo/backend/features.py.
 * Runs entirely in the browser — no network round-trip.
 */

const FEATURES_CONFIG = {
    smoothingFactor: 0.3,
    energyMultiplier: 10.0,
    energyKeyPoints: [0, 15, 16, 27, 28], // nose, wrists, ankles
    symmetryMultiplier: 2.0,
    smoothnessMultiplier: 5.0,
    smoothnessKeyPoints: [15, 16], // wrists
    armAngleOffset: 0.5,
    verticalExtensionMultiplier: 1.5,
};

class FeatureExtractor {
    constructor() {
        this.prevFeatures = null;
    }

    calculate(landmarks, prevLandmarks) {
        if (!landmarks || landmarks.length < 33) {
            return this._emptyFeatures();
        }

        let features = {
            energy: this._calculateEnergy(landmarks, prevLandmarks),
            symmetry: this._calculateSymmetry(landmarks),
            smoothness: this._calculateSmoothness(landmarks, prevLandmarks),
            armAngle: this._calculateArmAngle(landmarks),
            verticalExtension: this._calculateVerticalExtension(landmarks),
        };

        features = this._smoothFeatures(features);
        return features;
    }

    _calculateEnergy(landmarks, prevLandmarks) {
        if (!prevLandmarks) return 0.0;

        let totalVelocity = 0.0;
        for (const idx of FEATURES_CONFIG.energyKeyPoints) {
            if (idx < landmarks.length && idx < prevLandmarks.length) {
                const dx = landmarks[idx].x - prevLandmarks[idx].x;
                const dy = landmarks[idx].y - prevLandmarks[idx].y;
                totalVelocity += Math.sqrt(dx * dx + dy * dy);
            }
        }

        return Math.min(totalVelocity * FEATURES_CONFIG.energyMultiplier, 1.0);
    }

    _calculateSymmetry(landmarks) {
        const leftWrist = landmarks[15];
        const rightWrist = landmarks[16];

        const center = 0.5;
        const leftDev = center - leftWrist.x;
        const rightDev = rightWrist.x - center;
        const symmetry = rightDev - leftDev;

        return Math.max(-1.0, Math.min(1.0, symmetry * FEATURES_CONFIG.symmetryMultiplier));
    }

    _calculateSmoothness(landmarks, prevLandmarks) {
        if (!prevLandmarks) return 0.5;

        let totalJerk = 0.0;
        for (const idx of FEATURES_CONFIG.smoothnessKeyPoints) {
            const dx = landmarks[idx].x - prevLandmarks[idx].x;
            const dy = landmarks[idx].y - prevLandmarks[idx].y;
            totalJerk += Math.sqrt(dx * dx + dy * dy);
        }

        const smoothness = 1.0 - Math.min(totalJerk * FEATURES_CONFIG.smoothnessMultiplier, 1.0);
        return Math.max(0.0, smoothness);
    }

    _calculateArmAngle(landmarks) {
        const offset = FEATURES_CONFIG.armAngleOffset;
        const leftShoulder = landmarks[11];
        const rightShoulder = landmarks[12];
        const leftWrist = landmarks[15];
        const rightWrist = landmarks[16];

        const armElevation = (shoulder, wrist) => {
            const dy = shoulder.y - wrist.y;
            return Math.max(0.0, Math.min(1.0, dy + offset));
        };

        const leftAngle = armElevation(leftShoulder, leftWrist);
        const rightAngle = armElevation(rightShoulder, rightWrist);

        return (leftAngle + rightAngle) / 2;
    }

    _calculateVerticalExtension(landmarks) {
        const nose = landmarks[0];
        const leftAnkle = landmarks[27];
        const rightAnkle = landmarks[28];

        const ankleY = (leftAnkle.y + rightAnkle.y) / 2;
        const height = ankleY - nose.y;

        return Math.max(0.0, Math.min(1.0, height * FEATURES_CONFIG.verticalExtensionMultiplier));
    }

    _smoothFeatures(features) {
        const smoothing = FEATURES_CONFIG.smoothingFactor;

        if (!this.prevFeatures) {
            this.prevFeatures = { ...features };
            return features;
        }

        const smoothed = {};
        for (const [key, value] of Object.entries(features)) {
            const prevValue = this.prevFeatures[key] ?? value;
            smoothed[key] = smoothing * value + (1 - smoothing) * prevValue;
        }

        this.prevFeatures = { ...smoothed };
        return smoothed;
    }

    _emptyFeatures() {
        return {
            energy: 0.0,
            symmetry: 0.0,
            smoothness: 0.5,
            armAngle: 0.0,
            verticalExtension: 0.5,
        };
    }
}
