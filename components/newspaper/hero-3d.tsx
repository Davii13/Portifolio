"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Icosahedron, MeshDistortMaterial } from "@react-three/drei"
import { useRef } from "react"
import { Mesh } from "three"
import { useTheme } from "next-themes"

function AnimatedShape({ color }: { color: string }) {
  const meshRef = useRef<Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Icosahedron ref={meshRef} args={[1, 4]} scale={2}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.3}
        speed={1.2}
        wireframe={true}
      />
    </Icosahedron>
  )
}

export function Hero3D() {
  const { resolvedTheme } = useTheme()
  const wireColor = resolvedTheme === "dark" ? "#FFFFFF" : "#2563EB"

  return (
    <div className="absolute inset-0 z-0 opacity-[0.06] md:opacity-[0.10] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <AnimatedShape color={wireColor} />
      </Canvas>
    </div>
  )
}
