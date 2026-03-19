import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import tourCasaVideo from "@/assets/Casa-Costa/TOURCASA1.mp4";

const CentroCulturalTour = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);
  const animationRef = useRef<number | null>(null);
  const transitionAnimationRef = useRef<number | null>(null);
  const [totalFrames, setTotalFrames] = useState(0);
  const targetFrames = [0, 309, 475, 693, 896, 1370, 1809];
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);
  const totalFramesRef = useRef(0);
  const frameRateRef = useRef(30); // Suposición inicial, podríamos detectar
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Configurar video sin audio - mantener pausado inicialmente
    video.muted = true;
    video.pause();

    // Esperar a que el video cargue metadatos para conocer su duración
    const handleLoadedMetadata = () => {
      // Calcular total de frames basado en duración y frame rate (asumido 30 fps)
      if (video.duration && !isNaN(video.duration)) {
        const frames = Math.floor(video.duration * frameRateRef.current);
        totalFramesRef.current = frames;
        setTotalFrames(frames);
        console.log('Video metadata:', {
          duration: video.duration,
          totalFrames: frames,
          frameRate: frameRateRef.current
        });
      }
      // Inicializar targetProgress al frame inicial (0)
      setTargetProgress(0);
    };

    if (video.readyState >= 1) {
      // Video ya tiene metadatos
      handleLoadedMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    // Limpiar al desmontar
    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  // Efecto para actualizar la UI basada en el tiempo actual del video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgressFromVideo = () => {
      if (video.duration && !isNaN(video.duration)) {
        const currentProgress = video.currentTime / video.duration;
        setProgress(currentProgress);
      }
    };

    // Actualizar progreso periódicamente mientras el video se reproduce
    const handleTimeUpdate = () => {
      updateProgressFromVideo();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  // Efecto para manejar transiciones cuando targetProgress cambia
  useEffect(() => {
    console.log('useEffect triggered, targetProgress:', targetProgress);
    const video = videoRef.current;
    if (!video || !video.duration || isNaN(video.duration)) {
      console.log('Video not ready:', { video: !!video, duration: video?.duration });
      return;
    }

    // Cancelar cualquier transición anterior
    if (transitionAnimationRef.current) {
      cancelAnimationFrame(transitionAnimationRef.current);
      transitionAnimationRef.current = null;
    }

    // Detener cualquier reproducción en curso
    video.pause();
    video.playbackRate = 1.0;

    const targetTime = targetProgress * video.duration;
    const currentTime = video.currentTime;
    const timeDiff = targetTime - currentTime;
    const absTimeDiff = Math.abs(timeDiff);

    // Si ya estamos en el destino (o muy cerca), simplemente pausar
    if (absTimeDiff < 0.001) {
      video.currentTime = targetTime;
      video.pause();
      video.playbackRate = 1.0;
      isTransitioningRef.current = false;
      return;
    }

    // Duración de transición más lenta para mejor experiencia (5 segundos)
    const TARGET_TRANSITION_DURATION = 5.0; // 5000ms en segundos

    // Calcular velocidad necesaria (playback rate) para llegar al destino en el tiempo objetivo
    const requiredSpeed = absTimeDiff / TARGET_TRANSITION_DURATION; // segundos por segundo
    const playbackRate = Math.max(0.2, Math.min(8.0, requiredSpeed)); // Limitar entre 0.2x y 8x
    const direction = timeDiff > 0 ? 1 : -1;

    console.log('Starting transition', {
      currentTime,
      targetTime,
      timeDiff,
      requiredSpeed,
      playbackRate,
      direction,
      duration: TARGET_TRANSITION_DURATION
    });

    // Variables para los listeners de timeupdate
    let handleTimeUpdate: (() => void) | null = null;
    let reverseTimeUpdateListener: (() => void) | null = null;

    // Determinar si usar animación manual (para retrocesos o si playbackRate negativo no es compatible)
    const useManualAnimation = direction === -1;

    if (!useManualAnimation) {
      // Método usando playbackRate positivo (avance)
      video.playbackRate = playbackRate; // direction es 1, positivo
      isTransitioningRef.current = true;

      // Intentar iniciar reproducción
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error('Error al reproducir video:', error);
          // Si falla la reproducción, usar método alternativo
          isTransitioningRef.current = false;
          video.currentTime = targetTime;
          video.pause();
        });
      }

      // Función para verificar si hemos llegado al destino
      const checkDestinationReached = () => {
        if (!video || !isTransitioningRef.current) return;

        const current = video.currentTime;
        const diff = targetTime - current;
        const absDiff = Math.abs(diff);

        // Verificar si hemos pasado el destino
        const hasPassedDestination = current >= targetTime;

        if (hasPassedDestination || absDiff < 0.2) { // ~6 frames a 30fps
          // Destino alcanzado
          video.pause();
          video.currentTime = targetTime;
          video.playbackRate = 1.0;
          isTransitioningRef.current = false;

          if (transitionAnimationRef.current) {
            cancelAnimationFrame(transitionAnimationRef.current);
            transitionAnimationRef.current = null;
          }
          console.log('Transition completed (forward)');
        } else {
          // Continuar verificando
          transitionAnimationRef.current = requestAnimationFrame(checkDestinationReached);
        }
      };

      // Iniciar verificación
      transitionAnimationRef.current = requestAnimationFrame(checkDestinationReached);

      // También escuchar timeupdate como respaldo
      handleTimeUpdate = () => {
        if (!video || !isTransitioningRef.current) return;

        const current = video.currentTime;
        const diff = targetTime - current;
        const absDiff = Math.abs(diff);

        const hasPassedDestination = current >= targetTime;

        if (hasPassedDestination || absDiff < 0.2) {
          video.pause();
          video.currentTime = targetTime;
          video.playbackRate = 1.0;
          isTransitioningRef.current = false;

          if (transitionAnimationRef.current) {
            cancelAnimationFrame(transitionAnimationRef.current);
            transitionAnimationRef.current = null;
          }
          if (handleTimeUpdate) {
            video.removeEventListener('timeupdate', handleTimeUpdate);
          }
          console.log('Transition completed via timeupdate (forward)');
        }
      };

      video.addEventListener('timeupdate', handleTimeUpdate);
    } else {
      // Intentar usar playbackRate negativo primero (más fluido si es compatible)
      console.log('Using negative playbackRate for reverse transition');

      try {
        // Configurar playbackRate negativo
        video.playbackRate = -playbackRate; // Negativo para retroceso
        isTransitioningRef.current = true;

        // Intentar reproducir (algunos navegadores pueden rechazar playbackRate negativo)
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log('Negative playbackRate not supported, falling back to manual animation:', error);
            // Fallback a animación manual
            startManualReverseAnimation();
          });
        }

        // Función para verificar si hemos llegado al destino (para retroceso)
        const checkReverseDestinationReached = () => {
          if (!video || !isTransitioningRef.current) return;

          const current = video.currentTime;
          const diff = targetTime - current;
          const absDiff = Math.abs(diff);

          // Verificar si hemos pasado el destino (para retroceso, current <= targetTime)
          const hasPassedDestination = current <= targetTime;

          if (hasPassedDestination || absDiff < 0.2) { // ~6 frames a 30fps
            // Destino alcanzado
            video.pause();
            video.currentTime = targetTime;
            video.playbackRate = 1.0;
            isTransitioningRef.current = false;

            if (transitionAnimationRef.current) {
              cancelAnimationFrame(transitionAnimationRef.current);
              transitionAnimationRef.current = null;
            }

            // Limpiar listener de timeupdate si existe
            if (reverseTimeUpdateListener) {
              video.removeEventListener('timeupdate', reverseTimeUpdateListener);
            }

            console.log('Transition completed (negative playbackRate)');
          } else {
            // Continuar verificando
            transitionAnimationRef.current = requestAnimationFrame(checkReverseDestinationReached);
          }
        };

        // Iniciar verificación
        transitionAnimationRef.current = requestAnimationFrame(checkReverseDestinationReached);

        // También escuchar timeupdate como respaldo
        reverseTimeUpdateListener = () => {
          if (!video || !isTransitioningRef.current) return;

          const current = video.currentTime;
          const diff = targetTime - current;
          const absDiff = Math.abs(diff);

          const hasPassedDestination = current <= targetTime;

          if (hasPassedDestination || absDiff < 0.2) {
            video.pause();
            video.currentTime = targetTime;
            video.playbackRate = 1.0;
            isTransitioningRef.current = false;

            if (transitionAnimationRef.current) {
              cancelAnimationFrame(transitionAnimationRef.current);
              transitionAnimationRef.current = null;
            }
            if (reverseTimeUpdateListener) {
              video.removeEventListener('timeupdate', reverseTimeUpdateListener);
            }
            console.log('Transition completed via timeupdate (negative playbackRate)');
          }
        };

        video.addEventListener('timeupdate', reverseTimeUpdateListener);

      } catch (error) {
        console.log('Error with negative playbackRate, using manual animation:', error);
        startManualReverseAnimation();
      }

      // Función de animación manual como fallback
      function startManualReverseAnimation() {
        console.log('Starting manual reverse animation');
        isTransitioningRef.current = true;

        const startTime = video.currentTime;
        const distance = targetTime - startTime; // Negativo para retroceso
        const duration = Math.abs(distance) / playbackRate;

        let startTimestamp: number | null = null;
        let lastFrameTime: number | null = null;

        const animateManualTransition = (now: number) => {
          if (!video || !isTransitioningRef.current) return;

          try {
            if (startTimestamp === null) {
              startTimestamp = now;
              lastFrameTime = now;
            }

            const elapsed = (now - startTimestamp) / 1000; // segundos
            let progress = Math.min(1, elapsed / duration);

            // Usar interpolación lineal simple (más fluida que easing para retrocesos)
            const newTime = startTime + distance * progress;

            // Solo actualizar si ha pasado suficiente tiempo (para mantener 30fps, más fluido)
            if (lastFrameTime && now - lastFrameTime >= 32) { // ~30fps
              video.currentTime = Math.max(0, Math.min(video.duration, newTime));
              lastFrameTime = now;
            }

            if (progress >= 1 || Math.abs(targetTime - newTime) < 0.2) {
              // Transición completada
              video.currentTime = targetTime;
              video.pause();
              video.playbackRate = 1.0;
              isTransitioningRef.current = false;

              if (transitionAnimationRef.current) {
                cancelAnimationFrame(transitionAnimationRef.current);
                transitionAnimationRef.current = null;
              }
              console.log('Transition completed (manual reverse)');
            } else {
              transitionAnimationRef.current = requestAnimationFrame(animateManualTransition);
            }
          } catch (error) {
            console.error('Error en animación manual:', error);
            isTransitioningRef.current = false;
            if (transitionAnimationRef.current) {
              cancelAnimationFrame(transitionAnimationRef.current);
              transitionAnimationRef.current = null;
            }
            video.pause();
            video.currentTime = targetTime;
          }
        };

        transitionAnimationRef.current = requestAnimationFrame(animateManualTransition);
      }
    }

    // Limpieza al desmontar o cuando dependencias cambien
    return () => {
      if (transitionAnimationRef.current) {
        cancelAnimationFrame(transitionAnimationRef.current);
        transitionAnimationRef.current = null;
      }

      if (handleTimeUpdate) {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      }

      if (reverseTimeUpdateListener) {
        video.removeEventListener('timeupdate', reverseTimeUpdateListener);
      }

      // Si aún estamos en transición, detenerla limpiamente
      if (isTransitioningRef.current) {
        video.pause();
        video.playbackRate = 1.0;
        isTransitioningRef.current = false;
      }
    };
  }, [targetProgress]);

  // Funciones de navegación entre frames específicos
  const goToNextFrame = () => {
    console.log('goToNextFrame called', { totalFrames, isTransitioning: isTransitioningRef.current, currentFrameIndex });
    if (totalFrames <= 0 || isTransitioningRef.current) return;
    if (currentFrameIndex < targetFrames.length - 1) {
      const nextIndex = currentFrameIndex + 1;
      const targetFrame = targetFrames[nextIndex];
      const targetProgress = targetFrame / totalFrames;
      console.log('Moving to next frame', { nextIndex, targetFrame, targetProgress });
      setTargetProgress(targetProgress);
      setCurrentFrameIndex(nextIndex);
      setCanGoPrev(true);
      setCanGoNext(nextIndex < targetFrames.length - 1);
    }
  };

  const goToPrevFrame = () => {
    console.log('goToPrevFrame called', { totalFrames, isTransitioning: isTransitioningRef.current, currentFrameIndex });
    if (totalFrames <= 0 || isTransitioningRef.current) return;
    if (currentFrameIndex > 0) {
      const prevIndex = currentFrameIndex - 1;
      const targetFrame = targetFrames[prevIndex];
      const targetProgress = targetFrame / totalFrames;
      console.log('Moving to prev frame', { prevIndex, targetFrame, targetProgress });
      setTargetProgress(targetProgress);
      setCurrentFrameIndex(prevIndex);
      setCanGoNext(true);
      setCanGoPrev(prevIndex > 0);
    }
  };

  const goToFrameIndex = (index: number) => {
    if (totalFrames <= 0 || isTransitioningRef.current) return;
    if (index >= 0 && index < targetFrames.length) {
      const targetFrame = targetFrames[index];
      const targetProgress = targetFrame / totalFrames;
      setTargetProgress(targetProgress);
      setCurrentFrameIndex(index);
      setCanGoPrev(index > 0);
      setCanGoNext(index < targetFrames.length - 1);
    }
  };

  const currentFrame = totalFrames > 0 ? Math.round(progress * totalFrames) : 0;
  const frameProgress = totalFrames > 0 ? currentFrame / totalFrames : progress;
  const framePercentage = totalFrames > 0 ? Math.round((currentFrame / totalFrames) * 100) : Math.round(progress * 100);

  const formatProgress = () => {
    if (totalFrames > 0) {
      return `Frame ${currentFrame}`;
    }
    const percentage = Math.round(progress * 100);
    return `${percentage}%`;
  };

  return (
    <div className="min-h-screen bg-navy-deep">
      {/* Botón de volver */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Volver al sitio</span>
      </button>

      {/* Botones de navegación */}
      <button
        onClick={goToPrevFrame}
        disabled={!canGoPrev}
        className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 flex items-center justify-center w-12 h-12 rounded-full glass text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNextFrame}
        disabled={!canGoNext}
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex items-center justify-center w-12 h-12 rounded-full glass text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ArrowRight className="w-6 h-6" />
      </button>

      {/* Contenido principal - Navegación controlada por botones */}
      <div ref={sectionRef} className="w-full min-h-screen relative">
        <video
          ref={videoRef}
          src={tourCasaVideo}
          className="fixed inset-0 w-full h-full object-cover"
          playsInline
          preload="auto"
          muted
        />

        {/* Overlay de información */}
        <div className="fixed inset-0 flex flex-col justify-between p-8 md:p-12 pointer-events-none z-10">
          {/* Título en la parte superior */}
          <div className="max-w-3xl">
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-4">
              Tour Virtual de Casa Costa
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl">
              Usa los botones para explorar cada rincón de nuestro centro cultural.
            </p>
          </div>

          {/* Indicador de progreso en la parte inferior */}
          <div className="flex flex-col items-start">
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-white/80 text-sm">
                  {progress < 0.01 ? "Usa los botones para comenzar" : progress >= 0.99 ? "Tour completado" : "Presiona los botones para navegar"}
                </span>
                <span className="text-white text-sm font-medium px-2 py-1 rounded-md bg-white/20">
                  {formatProgress()}
                </span>
              </div>
              <div className="w-64 h-2 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow to-yellow-soft rounded-full transition-all duration-300"
                  style={{ width: `${frameProgress * 100}%` }}
                />
              </div>
            </div>

            {/* Puntos indicadores */}
            <div className="flex justify-center gap-2 mt-4 mb-2">
              {targetFrames.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToFrameIndex(index)}
                  className={`pointer-events-auto w-3 h-3 rounded-full transition-all ${currentFrameIndex === index ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/60'}`}
                  aria-label={`Ir al frame ${targetFrames[index]}`}
                />
              ))}
            </div>

            <p className="text-white/60 text-sm">
              El video avanza automáticamente según tu navegación • Sin audio
            </p>
          </div>
        </div>

        {/* Indicador en el centro cuando está inactivo */}
        {progress < 0.1 && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="flex flex-col items-center animate-pulse">
              <div className="text-white/60 text-lg mb-4">Presiona los botones para comenzar</div>
              <div className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center">
                <div className="w-1 h-4 bg-white/60 rounded-full mt-2 animate-bounce" />
              </div>
            </div>
          </div>
        )}

        {/* Degradado sutil en los bordes */}
        <div className="fixed inset-0 bg-gradient-to-b from-navy-deep/40 via-transparent to-navy-deep/40 pointer-events-none" />
        <div className="fixed inset-0 bg-gradient-to-r from-navy-deep/30 via-transparent to-navy-deep/30 pointer-events-none" />
      </div>
    </div>
  );
};

export default CentroCulturalTour;