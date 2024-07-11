"use client"
import React, { HTMLProps } from "react"
import { motion } from "framer-motion"

interface PropsI extends HTMLProps<HTMLDivElement> {
  children: React.ReactNode
  duration?: number
  delay?: number
  initialY?: number
  staggerChildren?: number
}

export const BaseFramerAnimation = ({
  children,
  duration,
  delay,
  initialY,
  ...props
}: PropsI) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: initialY, zIndex: -1 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration || 1, delay: delay || 0 }}
      className={props.className}
      id={props.id}
      style={props.style}
      ref={props.ref}
    >
      {children}
    </motion.div>
  )
}

export const ScrollTriggeredAnimation = ({
  children,
  duration,
  delay,
  initialY,
  ...props
}: PropsI) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: initialY, zIndex: -1 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: duration || 1, delay: delay || 0 }}
      className={props.className}
      id={props.id}
      style={props.style}
      ref={props.ref}
    >
      {children}
    </motion.div>
  )
}

export const MotionWithStagger = ({
  children,
  duration,
  delay,
  initialY,
  staggerChildren,
  ...props
}: PropsI) => {
  return (
    <motion.div
      initial={"hidden"}
      animate={"show"}
      className={props.className}
      id={props.id}
      style={props.style}
      ref={props.ref}
      variants={{
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: duration || 1,
            delay: delay || 0,
            staggerChildren,
          },
        },
        hidden: { opacity: 0, y: initialY, zIndex: -1 },
      }}
    >
      {children}
    </motion.div>
  )
}
