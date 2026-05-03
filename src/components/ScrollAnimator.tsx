import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const REVEAL_SELECTORS = [
  'main section',
  'main .card-base',
  'main .glass-card',
  'main .chip',
  'main .chip-active',
  'main .input-field',
  'main [class*="grid"] > a',
  'main [class*="grid"] > div',
].join(',');

const STAGGER_CONTAINERS = [
  'main [class*="grid"]',
  'main [class*="flex"][class*="wrap"]',
].join(',');

export default function ScrollAnimator() {
  const location = useLocation();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    );

    const prepare = () => {
      document.querySelectorAll<HTMLElement>(STAGGER_CONTAINERS).forEach(container => {
        Array.from(container.children).forEach((child, index) => {
          if (!(child instanceof HTMLElement)) return;
          child.style.setProperty('--reveal-delay', `${Math.min(index, 8) * 70}ms`);
        });
      });

      document.querySelectorAll<HTMLElement>(REVEAL_SELECTORS).forEach(element => {
        if (element.closest('[data-no-scroll-reveal]')) return;
        element.classList.add('scroll-reveal');
        observer.observe(element);
      });
    };

    const frame = window.requestAnimationFrame(prepare);
    const mutationObserver = new MutationObserver(prepare);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.cancelAnimationFrame(frame);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [location.pathname]);

  return null;
}
