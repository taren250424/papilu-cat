declare module '*.scss' {
    const content: Record<string, string>
    export default content
}

declare module '*.png' {
    const value: string
    export default value
}

// vite-env.d.ts
declare module '*.png?base64' {
  const src: string
  export default src
}