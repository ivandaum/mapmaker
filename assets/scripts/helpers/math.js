export const degToRad = (number) => (number * Math.PI) / 180

export const range = (input, min, max) => ((input - min) * 100) / (max - min)

export const lerp = (v0, v1, t) => (1 - t) * v0 + t * v1
