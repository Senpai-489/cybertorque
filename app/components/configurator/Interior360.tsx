"use client";

import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";

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
          near: 0.01,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <Panorama image={image} />
      </Canvas>

      {/* TOP CONTROL */}

      <div
        className="
          pointer-events-none
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          flex
          items-center
          border-x
          border-white/10
          bg-[#111111]/80
          backdrop-blur-sm
        "
      >
        </div>

      {/* BOTTOM CONTROL */}

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
          px-7
          py-4
          backdrop-blur-sm
        "
      >
        <span
          className="
            font-stint
            text-[9px]
            uppercase
            tracking-[0.25em]
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
  const { scene, camera, gl } = useThree();

  const [error, setError] = useState(false);

  const yaw = useRef(0);
  const pitch = useRef(0);

  const targetYaw = useRef(0);
  const targetPitch = useRef(0);

  const dragging = useRef(false);

  const startX = useRef(0);
  const startY = useRef(0);

  const startYaw = useRef(0);
  const startPitch = useRef(0);

  /* ==========================================================
     LOAD PANORAMA
  ========================================================== */

  useEffect(() => {
    let texture: THREE.Texture | null = null;

    const loader = new THREE.TextureLoader();

    loader.load(
      image,

      (loadedTexture) => {
        texture = loadedTexture;

        /*
         * Normal JPG / PNG panorama
         */

        texture.colorSpace = THREE.SRGBColorSpace;

        /*
         * IMPORTANT:
         *
         * Tell Three.js this is an equirectangular panorama.
         */

        texture.mapping =
          THREE.EquirectangularReflectionMapping;

        texture.needsUpdate = true;

        /*
         * Display panorama as the scene background.
         */

        scene.background = texture;

        setError(false);
      },

      undefined,

      (loadError) => {
        console.error(
          "[360 PANORAMA] Failed to load image:",
          image,
          loadError
        );

        setError(true);
      }
    );

    return () => {
      if (texture) {
        texture.dispose();
      }

      /*
       * Don't leave the old panorama around.
       */

      scene.background = null;
    };
  }, [image, scene]);

  /* ==========================================================
     DRAG CONTROLS
  ========================================================== */

  useEffect(() => {
    const canvas = gl.domElement;

    canvas.style.touchAction = "none";
    canvas.style.cursor = "grab";

    const onPointerDown = (
      event: PointerEvent
    ) => {
      dragging.current = true;

      startX.current = event.clientX;
      startY.current = event.clientY;

      startYaw.current = targetYaw.current;
      startPitch.current = targetPitch.current;

      canvas.style.cursor = "grabbing";

      try {
        canvas.setPointerCapture(
          event.pointerId
        );
      } catch {}
    };

    const onPointerMove = (
      event: PointerEvent
    ) => {
      if (!dragging.current) return;

      const dx =
        event.clientX - startX.current;

      const dy =
        event.clientY - startY.current;

      /*
       * Horizontal
       */

      targetYaw.current =
        startYaw.current -
        dx * 0.004;

      /*
       * Vertical
       */

      targetPitch.current =
        startPitch.current -
        dy * 0.004;

      /*
       * Limit vertical movement.
       */

      const maxPitch =
        THREE.MathUtils.degToRad(85);

      targetPitch.current =
        THREE.MathUtils.clamp(
          targetPitch.current,
          -maxPitch,
          maxPitch
        );
    };

    const onPointerUp = (
      event: PointerEvent
    ) => {
      dragging.current = false;

      canvas.style.cursor = "grab";

      try {
        canvas.releasePointerCapture(
          event.pointerId
        );
      } catch {}
    };

    canvas.addEventListener(
      "pointerdown",
      onPointerDown
    );

    canvas.addEventListener(
      "pointermove",
      onPointerMove
    );

    canvas.addEventListener(
      "pointerup",
      onPointerUp
    );

    canvas.addEventListener(
      "pointercancel",
      onPointerUp
    );

    return () => {
      canvas.removeEventListener(
        "pointerdown",
        onPointerDown
      );

      canvas.removeEventListener(
        "pointermove",
        onPointerMove
      );

      canvas.removeEventListener(
        "pointerup",
        onPointerUp
      );

      canvas.removeEventListener(
        "pointercancel",
        onPointerUp
      );
    };
  }, [gl]);

  /* ==========================================================
     CAMERA ROTATION
  ========================================================== */

  useEffect(() => {
    camera.rotation.order = "YXZ";

    let animationFrame: number;

    const animate = () => {
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

      camera.rotation.y = yaw.current;
      camera.rotation.x = pitch.current;
      camera.rotation.z = 0;

      animationFrame =
        requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [camera]);

  /* ==========================================================
     DEBUG ERROR
  ========================================================== */

  if (error) {
    console.error(
      "[360 PANORAMA] Image could not be loaded:",
      image
    );
  }

  return null;
}