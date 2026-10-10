import { useEffect, useMemo, useState } from 'react';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const initializeParticles = (engine) => loadSlim(engine);

function StarBackground() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = (event) => setPrefersReducedMotion(event.matches);

    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  const particleOptions = useMemo(() => ({
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    detectRetina: false,
    fpsLimit: 60,
    responsive: [
      {
        maxWidth: 768,
        options: {
          particles: {
            number: { value: 30, density: { enable: false } },
          },
        },
      },
    ],
    particles: {
      number: {
        value: 125,
        density: { enable: true, width: 1200, height: 900 },
      },
      color: {
        value: ['#ffffff', '#f3e8ff', '#d8b4fe', '#c4b5fd'],
      },
      opacity: {
        value: { min: 0.28, max: 0.9 },
        animation: {
          enable: !prefersReducedMotion,
          speed: 0.7,
          sync: false,
          startValue: 'random',
        },
      },
      size: {
        value: { min: 1, max: 3 },
      },
      links: {
        enable: false,
      },
      move: {
        enable: !prefersReducedMotion,
        direction: 'top-right',
        speed: 0.5,
        random: true,
        straight: true,
        outModes: { default: 'out' },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: false },
        onClick: { enable: false },
      },
    },
  }), [prefersReducedMotion]);

  return (
    <ParticlesProvider init={initializeParticles}>
      <Particles
        id="galaxy-stars"
        className="pointer-events-none fixed inset-0 z-0"
        options={particleOptions}
      />
    </ParticlesProvider>
  );
}

export default StarBackground;
