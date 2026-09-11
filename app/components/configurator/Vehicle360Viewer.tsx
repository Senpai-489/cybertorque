"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";

const DRAG_SENSITIVITY = 8;
const INITIAL_PRELOAD_COUNT = 4;

type Vehicle360ViewerProps = {
  frames: string[];
  fallbackImage: string;
  vehicleName: string;
};

export default function Vehicle360Viewer({
  frames,
  fallbackImage,
  vehicleName,
}: Vehicle360ViewerProps) {
  const safeFrames = useMemo(
    () => (frames.length > 0 ? frames : [fallbackImage]),
    [fallbackImage, frames]
  );
  const imageRef = useRef<HTMLImageElement>(null);
  const frameCache = useRef(new Map<number, HTMLImageElement>());
  const loadingFrames = useRef(new Set<number>());
  const frameIndex = useRef(0);
  const dragState = useRef({ active: false, lastX: 0, remainder: 0 });
  const animationFrame = useRef<number | null>(null);
  const pendingFrame = useRef(0);
  const [loadedFrames, setLoadedFrames] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [failed, setFailed] = useState(false);

  const showFrame = (index: number) => {
    const normalizedIndex = (index + safeFrames.length) % safeFrames.length;
    frameIndex.current = normalizedIndex;
    pendingFrame.current = normalizedIndex;

    if (animationFrame.current !== null) return;

    animationFrame.current = requestAnimationFrame(() => {
      animationFrame.current = null;
      const image = frameCache.current.get(pendingFrame.current);

      if (imageRef.current && image) {
        imageRef.current.src = image.src;
        setFailed(false);
      }
    });
  };

  const loadFrame = (index: number) => {
    const normalizedIndex = (index + safeFrames.length) % safeFrames.length;
    if (frameCache.current.has(normalizedIndex) || loadingFrames.current.has(normalizedIndex)) {
      return;
    }

    loadingFrames.current.add(normalizedIndex);
    const image = new window.Image();
    image.onload = () => {
      frameCache.current.set(normalizedIndex, image);
      loadingFrames.current.delete(normalizedIndex);
      setLoadedFrames(frameCache.current.size);
      if (normalizedIndex === frameIndex.current && imageRef.current) {
        imageRef.current.src = image.src;
        setFailed(false);
      }
    };
    image.onerror = () => {
      loadingFrames.current.delete(normalizedIndex);
      if (normalizedIndex === 0) setFailed(true);
    };
    image.src = safeFrames[normalizedIndex];
  };

  const rotate = (amount: number) => {
    showFrame(frameIndex.current + amount);
    loadFrame(frameIndex.current + amount);
  };

  useEffect(() => {
    frameCache.current.clear();
    loadingFrames.current.clear();
    frameIndex.current = 0;
    setLoadedFrames(0);
    setFailed(false);

    for (let index = 0; index < Math.min(INITIAL_PRELOAD_COUNT, safeFrames.length); index += 1) {
      loadFrame(index);
    }

    const timers = [] as number[];
    for (let index = INITIAL_PRELOAD_COUNT; index < safeFrames.length; index += 1) {
      timers.push(window.setTimeout(() => loadFrame(index), index * 35));
    }

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [safeFrames]);

  useEffect(() => () => {
    if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current);
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragState.current = { active: true, lastX: event.clientX, remainder: 0 };
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;
    const delta = event.clientX - dragState.current.lastX;
    dragState.current.lastX = event.clientX;
    dragState.current.remainder += delta;
    const frameDelta = Math.trunc(dragState.current.remainder / DRAG_SENSITIVITY);

    if (frameDelta !== 0) {
      dragState.current.remainder -= frameDelta * DRAG_SENSITIVITY;
      rotate(frameDelta);
    }
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragState.current.active = false;
    setIsDragging(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      rotate(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      rotate(1);
    }
  };

  const progress = Math.round((loadedFrames / safeFrames.length) * 100);

  return (
    <div className="relative">
      <div
        className={`relative aspect-[1.333333] overflow-hidden border border-white/10 bg-[#151515] ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="application"
        aria-label={`${vehicleName} 360 degree viewer. Use arrow keys or drag horizontally to rotate.`}
        style={{ touchAction: "none" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(189,152,82,0.12),transparent_62%)]" />
        <img
          ref={imageRef}
          src={failed ? fallbackImage : safeFrames[0]}
          alt={`${vehicleName} vehicle view`}
          className="relative h-full w-full object-contain p-5 transition-opacity duration-300 md:p-10"
          onError={() => setFailed(true)}
          draggable={false}
        />

        {safeFrames.length === 1 && (
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-stint text-[8px] uppercase tracking-[0.18em] text-white/45">
            360 experience coming soon
          </p>
        )}

        {progress < 100 && (
          <div className="absolute left-5 top-5 flex items-center gap-3 bg-black/45 px-3 py-2 backdrop-blur-sm">
            <span className="font-stint text-[8px] uppercase tracking-[0.12em] text-white/65">
              Loading experience {progress}%
            </span>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => rotate(-1)}
          aria-label="Rotate vehicle left"
          className="flex h-11 w-11 items-center justify-center border border-white/20 text-white/60 transition-colors hover:border-[#bd9852] hover:text-[#bd9852]"
        >
          <ChevronLeft size={18} strokeWidth={1.2} />
        </button>
        <div className="flex items-center gap-2 font-stint text-[8px] uppercase tracking-[0.18em] text-white/35">
          <RotateCw size={13} strokeWidth={1.2} />
          Drag to rotate
        </div>
        <button
          type="button"
          onClick={() => rotate(1)}
          aria-label="Rotate vehicle right"
          className="flex h-11 w-11 items-center justify-center border border-white/20 text-white/60 transition-colors hover:border-[#bd9852] hover:text-[#bd9852]"
        >
          <ChevronRight size={18} strokeWidth={1.2} />
        </button>
      </div>
    </div>
  );
}