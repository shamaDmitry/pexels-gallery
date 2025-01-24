import { useEffect } from 'react'

function useClickOutside(ref, callBack) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callBack()
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        console.log('ref', ref)

        callBack()
        ref?.current?.blur()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [ref, callBack])
}

export default useClickOutside
