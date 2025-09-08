export const colors = {
  red: { bg: 'bg-red-200', text: 'text-red-700' },
  orange: { bg: 'bg-orange-200', text: 'text-orange-700' },
  yellow: { bg: 'bg-yellow-200', text: 'text-yellow-700' },
  green: { bg: 'bg-green-200', text: 'text-green-700' },
  teal: { bg: 'bg-teal-200', text: 'text-teal-700' },
  blue: { bg: 'bg-blue-200', text: 'text-blue-700' },
  purple: { bg: 'bg-purple-200', text: 'text-purple-700' },
  pink: { bg: 'bg-pink-200', text: 'text-pink-700' },
} as const

export type ColorKey = keyof typeof colors
