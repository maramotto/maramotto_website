/**
 * Configuration for Cuerpo Sonoro Web Frontend
 */

const CONFIG = {
    // Camera settings
    camera: {
        width: 640,
        height: 480,
        frameRate: 30,
        facingMode: 'user'
    },

    // MediaPipe Pose settings
    pose: {
        modelComplexity: 1,           // 0 = lite, 1 = full, 2 = heavy
        smoothLandmarks: true,
        enableSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,

        // Skeleton drawing colors
        connectionColor: 'rgba(102, 126, 234, 0.6)',
        landmarkColor: 'rgba(118, 75, 162, 0.8)',
        connectionLineWidth: 2,
        landmarkRadius: 4
    },

    // Audio synthesis settings
    audio: {
        // Oscillators
        baseFrequency: 220,           // A3
        detuneRatio: 1.005,
        osc1Gain: 0.3,
        osc2Gain: 0.2,
        oscillatorType: 'sawtooth',

        // Filter
        filterCutoffMin: 200,
        filterCutoffMax: 3200,
        filterQBase: 2,
        filterQMax: 9,                // 1 + (energy * 8)

        // LFO
        lfoFrequency: 4,              // Hz
        lfoDepthMin: 0,
        lfoDepthMax: 15,

        // General
        maxVolume: 0.4,
        rampTime: 0.08,               // seconds

        // Pentatonic scale (A minor: A, C, D, E, G)
        pentatonicBaseFreq: 110,      // A2
        pentatonicRatios: [1, 1.2, 1.333, 1.5, 1.778, 2, 2.4, 2.667, 3]
    }
};
