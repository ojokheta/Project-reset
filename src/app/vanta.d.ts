declare module 'three'

declare module 'vanta/dist/vanta.birds.min' {
  export default function BIRDS(options: Record<string, unknown>): { destroy: () => void }
}
