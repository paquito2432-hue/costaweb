const smoothScrollManual = (targetPosition: number, duration = 600) => {
  const startPosition = window.pageYOffset || document.documentElement.scrollTop;
  const distance = targetPosition - startPosition;
  const startTime = Date.now();

  const animateScroll = () => {
    const currentTime = Date.now();
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // Easing function (easeInOutCubic)
    const easeProgress = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startPosition + (distance * easeProgress));

    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

export const smoothScrollTo = (targetId: string, offset = 0) => {
  console.log(`[smoothScrollTo] target: #${targetId}, offset: ${offset}`);
  const targetElement = document.getElementById(targetId);
  if (!targetElement) {
    console.warn(`[smoothScrollTo] Element #${targetId} not found`);
    return;
  }

  // Calculate target position with offset
  const rect = targetElement.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const targetPosition = rect.top + scrollTop - offset;
  console.log(`[smoothScrollTo] rect.top: ${rect.top}, scrollTop: ${scrollTop}, targetPosition: ${targetPosition}`);

  // Always use manual smooth scroll for consistent speed
  smoothScrollManual(targetPosition, 1500); // 1500ms = 1.5 seconds for slow, smooth scroll
};

export const handleSmoothScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, offset = 0) => {
  e.preventDefault();
  const href = e.currentTarget.getAttribute("href");
  if (!href || !href.startsWith("#")) return;

  const targetId = href.replace("#", "");
  smoothScrollTo(targetId, offset);
};