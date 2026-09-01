/**
 * Audio synthesis engine using Web Audio API
 */

class AudioEngine {
    constructor() {
        this.config = CONFIG.audio;
        this.ctx = null;
        this.isRunning = false;

        // Audio nodes
        this.osc1 = null;
        this.osc2 = null;
        this.filter = null;
        this.panner = null;
        this.gainNode = null;
        this.lfo = null;
        this.lfoGain = null;
    }

    async start() {
        if (this.isRunning) return;

        this.ctx = new (window.AudioContext || window.webkitAudioContext)();

        if (this.ctx.state === 'suspended') {
            await this.ctx.resume();
        }

        this.setupNodes();
        this.isRunning = true;
    }

    setupNodes() {
        const ctx = this.ctx;
        const cfg = this.config;

        // Main oscillator
        this.osc1 = ctx.createOscillator();
        this.osc1.type = cfg.oscillatorType;
        this.osc1.frequency.value = cfg.baseFrequency;

        // Second oscillator (slightly detuned)
        this.osc2 = ctx.createOscillator();
        this.osc2.type = cfg.oscillatorType;
        this.osc2.frequency.value = cfg.baseFrequency * cfg.detuneRatio;

        // Oscillator gains
        this.osc1Gain = ctx.createGain();
        this.osc1Gain.gain.value = cfg.osc1Gain;
        this.osc2Gain = ctx.createGain();
        this.osc2Gain.gain.value = cfg.osc2Gain;

        // Mix oscillators
        this.oscMix = ctx.createGain();

        // Filter
        this.filter = ctx.createBiquadFilter();
        this.filter.type = 'lowpass';
        this.filter.frequency.value = cfg.filterCutoffMin;
        this.filter.Q.value = cfg.filterQBase;

        // Panner
        this.panner = ctx.createStereoPanner();
        this.panner.pan.value = 0;

        // Master gain
        this.gainNode = ctx.createGain();
        this.gainNode.gain.value = 0;

        // LFO
        this.lfo = ctx.createOscillator();
        this.lfo.type = 'sine';
        this.lfo.frequency.value = cfg.lfoFrequency;
        this.lfoGain = ctx.createGain();
        this.lfoGain.gain.value = cfg.lfoDepthMin;

        // Connect LFO to oscillator frequencies
        this.lfo.connect(this.lfoGain);
        this.lfoGain.connect(this.osc1.frequency);
        this.lfoGain.connect(this.osc2.frequency);

        // Main signal chain
        this.osc1.connect(this.osc1Gain);
        this.osc2.connect(this.osc2Gain);
        this.osc1Gain.connect(this.oscMix);
        this.osc2Gain.connect(this.oscMix);
        this.oscMix.connect(this.filter);
        this.filter.connect(this.panner);
        this.panner.connect(this.gainNode);
        this.gainNode.connect(ctx.destination);

        // Start oscillators
        this.osc1.start();
        this.osc2.start();
        this.lfo.start();
    }

    update(features) {
        if (!this.isRunning || !this.ctx) return;

        const now = this.ctx.currentTime;
        const cfg = this.config;
        const ramp = cfg.rampTime;

        // Energy → Volume
        const volume = features.energy * cfg.maxVolume;
        this.gainNode.gain.linearRampToValueAtTime(volume, now + ramp);

        // Arm angle → Pitch (pentatonic scale)
        const baseFreq = this.mapToPentatonic(features.armAngle);
        this.osc1.frequency.linearRampToValueAtTime(baseFreq, now + ramp);
        this.osc2.frequency.linearRampToValueAtTime(baseFreq * cfg.detuneRatio, now + ramp);

        // Smoothness → Filter cutoff
        const cutoffRange = cfg.filterCutoffMax - cfg.filterCutoffMin;
        const cutoff = cfg.filterCutoffMin + (features.smoothness * cutoffRange);
        this.filter.frequency.linearRampToValueAtTime(cutoff, now + ramp);

        // Symmetry → Stereo pan
        this.panner.pan.linearRampToValueAtTime(features.symmetry, now + ramp);

        // Vertical extension → LFO depth (more extended = less vibrato)
        const lfoRange = cfg.lfoDepthMax - cfg.lfoDepthMin;
        const lfoDepth = cfg.lfoDepthMin + ((1 - features.verticalExtension) * lfoRange);
        this.lfoGain.gain.linearRampToValueAtTime(lfoDepth, now + ramp);

        // Energy → Filter resonance
        const qRange = cfg.filterQMax - cfg.filterQBase;
        const resonance = cfg.filterQBase + (features.energy * qRange);
        this.filter.Q.linearRampToValueAtTime(resonance, now + ramp);
    }

    mapToPentatonic(value) {
        const cfg = this.config;
        const ratios = cfg.pentatonicRatios;
        const index = Math.floor(value * (ratios.length - 1));
        const ratio = ratios[Math.min(index, ratios.length - 1)];
        return cfg.pentatonicBaseFreq * ratio;
    }

    stop() {
        if (!this.isRunning) return;

        if (this.gainNode) {
            this.gainNode.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.1);
        }

        setTimeout(() => {
            if (this.osc1) this.osc1.stop();
            if (this.osc2) this.osc2.stop();
            if (this.lfo) this.lfo.stop();
            if (this.ctx) this.ctx.close();

            this.ctx = null;
            this.isRunning = false;
        }, 150);
    }
}
