import { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import '../styles/ParticleBackground.css';

function ParticleBackground() {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles-fullscreen"
            init={particlesInit}
            options={{
                fullScreen: {
                    enable: false,
                    zIndex: 0
                },
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 60,
                particles: {
                    color: {
                        value: "#fde269",
                    },
                    links: {
                        enable: false,
                    },
                    move: {
                        enable: true,
                        speed: 0.3,
                        direction: "none",
                        random: true,
                        straight: false,
                        outModes: {
                            default: "out",
                        },
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: { min: 0.1, max: 0.5 },
                        animation: {
                            enable: true,
                            speed: 1,
                            minimumValue: 0.1,
                            sync: false,
                        },
                    },
                    shape: {
                        type: ["circle", "square"],
                    },
                    size: {
                        value: { min: 1, max: 5 },
                        animation: {
                            enable: true,
                            speed: 2,
                            minimumValue: 0.5,
                            sync: false,
                        },
                    },
                },
                detectRetina: true,
            }}
            className="particle-background-canvas"
        />
    );
}

export default ParticleBackground;

