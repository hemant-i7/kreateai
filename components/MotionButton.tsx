'use client'
import React from "react";
import {motion} from "motion/react"
import { buttonVariants } from "./ui/button";

interface MotionButtonProps {
    variant: "link" | "outline" | "default" | "destructive" | "ghost" | "secondary" | null | undefined;
    size: "default" | "sm" | "lg" | "icon" | null | undefined;
    className?: string;
    label: string | React.ReactNode;
 
}

export default function MotionButton({variant, size, className, label}: MotionButtonProps = {
  variant: "default",
  size: "default",
  label: "Button",
 className: ""
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.1}}
      whileTap={{ scale: 0.99}}
      className={buttonVariants({
        variant: {variant},
        size: {size},
        className: {className},
      })}
    >
     {label}
    </motion.div>
  );
}
