"use client"

import { useAnimationFrame } from "motion/react"
import { useRef, useMemo, forwardRef } from "react"

const NUM_CUBES = 6

// Cube component using forwardRef (JS version, no TS)
const Cube = forwardRef((props, ref) => (
  <div className="cube" ref={ref} {...props}>
    <div className="side front" />
    <div className="side back" />
    <div className="side left" />
    <div className="side right" />
    <div className="side top" />
    <div className="side bottom" />
  </div>
))
Cube.displayName = "Cube"

export default function AnimatedCubes() {
  const containerRef = useRef(null)
  const cubesRef = useRef(Array(NUM_CUBES).fill(null))

  // Random positions, sizes, and speed
  const cubesData = useMemo(
    () =>
      Array(NUM_CUBES)
        .fill(0)
        .map(() => ({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: 150 + Math.random() * 150,
          speed: 0.0005 + Math.random() * 0.001,
        })),
    []
  )

  useAnimationFrame((t) => {
    cubesRef.current.forEach((cube, i) => {
      if (!cube) return
      const data = cubesData[i]
      const rotate = Math.sin(t * data.speed) * 360
      const y = data.y + Math.sin(t * data.speed * 2) * 50
      cube.style.transform = `translate(${data.x}px, ${y}px) rotateX(${rotate}deg) rotateY(${rotate}deg) scale(${data.size / 200})`
    })
  })

  return (
    <div ref={containerRef} className="cubes-container">
      {cubesData.map((_, i) => (
        <Cube key={i} ref={(el) => (cubesRef.current[i] = el)} />
      ))}
      <StyleSheet />
    </div>
  )
}

function StyleSheet() {
  return (
    <style>{`
      .cubes-container {
        position: fixed;
        width: 100%;
        height: 100%;
        overflow: hidden;
        top: 0;
        left: 0;
        z-index: -1;
        perspective: 1000px;
      }

      .cube {
        position: absolute;
        width: 200px;
        height: 200px;
        transform-style: preserve-3d;
        opacity: 0.25;
      }

      .side {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        opacity: 0.6;
      }

      .front { transform: rotateY(0deg) translateZ(100px); background-color: #FFB6C1; }
      .back  { transform: rotateY(180deg) translateZ(100px); background-color: #90EE90; }
      .right { transform: rotateY(90deg) translateZ(100px); background-color: #ADD8E6; }
      .left  { transform: rotateY(-90deg) translateZ(100px); background-color: #FFDAB9; }
      .top   { transform: rotateX(90deg) translateZ(100px); background-color: #E6E6FA; }
      .bottom{ transform: rotateX(-90deg) translateZ(100px); background-color: #FFFACD; }
    `}</style>
  )
}
