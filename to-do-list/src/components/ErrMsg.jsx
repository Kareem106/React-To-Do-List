import React from 'react'

export default function ErrMsg({msg}) {
  return (
    <div class="p-3 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span class="font-medium">{msg}</span>
  </div>
  )
}
