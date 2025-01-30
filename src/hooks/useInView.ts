// import { useRef, useState, useEffect, RefObject } from 'react'

// interface IOptions {
//   root?: Element | null | undefined
//   rootMargin?: string
//   thresholds?: ReadonlyArray<number>
// }

// type useInViewType = {
//   inView: boolean
//   ref: RefObject<T> | null
//   observe: (
//     element: RefObject<T>,
//     callback: (entries: IntersectionObserverEntry[]) => void
//   ) => IntersectionObserver | null
//   unObserve: (observer: IntersectionObserver) => void
// }

// const useInView = (options?: IOptions): useInViewType => {
//   const [inView, setInView] = useState(false)

//   const containerRef = useRef(null)

//   const callback = (entries: IntersectionObserverEntry[]) => {
//     const [entry] = entries
//     setInView(entry.isIntersecting)
//   }

//   useEffect(() => {
//     const _observer = new IntersectionObserver(callback, options)
//     if (containerRef.current) _observer.observe(containerRef.current)

//     return () => {
//       if (containerRef.current) _observer.unobserve(containerRef.current)
//     }
//   }, [containerRef, options])

//   // For Manual observers
//   const observe = (element: RefObject<T>, callback: (entries: IntersectionObserverEntry[]) => void) => {
//     const _observer = new IntersectionObserver(callback, options)
//     containerRef.current = element.current

//     return _observer
//   }

//   const unObserve = (observer: IntersectionObserver) => {
//     if (containerRef.current) observer.unobserve(containerRef.current)
//   }

//   return {
//     inView,
//     ref: containerRef,
//     observe,
//     unObserve
//   }
// }

// export default useInView
