"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef } from "react";

interface Interior360Props {
  image: string;
  className?: string;
}

export default function Interior360({
  image,
  className = "",
}: Interior360Props) {
  return (
    <div
      className={`relative overflow-hidden bg-[#111111] ${className}`}
    >
      <Canvas
        camera={{
          position: [0, 0, 0],
          fov: 75,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: false,
        }}
        dpr={[1, 2]}
      >
        <Panorama image={image} />
      </Canvas>

      {/* UI */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-7
          left-1/2
          -translate-x-1/2
          border
          border-white/15
          bg-black/30
          px-5
          py-3
          backdrop-blur-sm
        "
      >
        <span
          className="
            font-stint
            text-[8px]
            uppercase
            tracking-[0.2em]
            text-white/60
          "
        >
          Drag to explore
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   PANORAMA
============================================================ */

function Panorama({
  image,
}: {
  image: string;
}) {
  const texture = useTexture(image);

  const { camera, gl } = useThree();

  const yaw = useRef(0);
  const pitch = useRef(0);

  const targetYaw = useRef(0);
  const targetPitch = useRef(0);

  const isDragging = useRef(false);

  const startX = useRef(0);
  const startY = useRef(0);

  const startYaw = useRef(0);
  const startPitch = useRef(0);

  /*
   * Prevent Three.js from flipping the panorama.
   */

  texture.colorSpace = THREE.SRGBColorSpace;

  /*
   * ---------------------------------------------------------
   * DRAG START
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const canvas = gl.domElement;

    const handlePointerDown = (
      event: PointerEvent
    ) => {
      isDragging.current = true;

      startX.current = event.clientX;
      startY.current = event.clientY;

      startYaw.current = targetYaw.current;
      startPitch.current = targetPitch.current;

      canvas.setPointerCapture(event.pointerId);
    };

    /*
     * -------------------------------------------------------
     * DRAG MOVE
     * -------------------------------------------------------
     */

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      if (!isDragging.current) return;

      const deltaX =
        event.clientX - startX.current;

      const deltaY =
        event.clientY - startY.current;

      /*
       * Horizontal movement
       */

      targetYaw.current =
        startYaw.current -
        deltaX * 0.005;

      /*
       * Vertical movement
       */

      targetPitch.current =
        startPitch.current -
        deltaY * 0.005;

      /*
       * Prevent looking completely upside down.
       */

      const maxPitch = Math.PI / 2 - 0.05;

      targetPitch.current = THREE.MathUtils.clamp(
        targetPitch.current,
        -maxPitch,
        maxPitch
      );
    };

    /*
     * -------------------------------------------------------
     * DRAG END
     * -------------------------------------------------------
     */

    const handlePointerUp = (
      event: PointerEvent
    ) => {
      isDragging.current = false;

      try {
        canvas.releasePointerCapture(
          event.pointerId
        );
      } catch {}
    };

    canvas.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    canvas.addEventListener(
      "pointermove",
      handlePointerMove
    );

    canvas.addEventListener(
      "pointerup",
      handlePointerUp
    );

    canvas.addEventListener(
      "pointercancel",
      handlePointerUp
    );

    return () => {
      canvas.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      canvas.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      canvas.removeEventListener(
        "pointerup",
        handlePointerUp
      );

      canvas.removeEventListener(
        "pointercancel",
        handlePointerUp
      );
    };
  }, [gl]);

  /*
   * ---------------------------------------------------------
   * CAMERA UPDATE
   * ---------------------------------------------------------
   */

  useEffect(() => {
    let frameId: number;

    const animate = () => {
      /*
       * Smooth movement.
       */

      yaw.current = THREE.MathUtils.lerp(
        yaw.current,
        targetYaw.current,
        0.12
      );

      pitch.current = THREE.MathUtils.lerp(
        pitch.current,
        targetPitch.current,
        0.12
      );

      /*
       * Camera rotation.
       */

      camera.rotation.order = "YXZ";

      camera.rotation.y = yaw.current;

      camera.rotation.x = pitch.current;

      frameId = requestAnimationFrame(
        animate
      );
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [camera]);

  /*
   * ---------------------------------------------------------
   * PANORAMA SPHERE
   * ---------------------------------------------------------
   */

  return (
    <mesh
      scale={[-1, 1, 1]}
      frustumCulled={false}
    >
      <sphereGeometry
        args={[50, 64, 64]}
      />

      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
      />
    </mesh>
  );
}