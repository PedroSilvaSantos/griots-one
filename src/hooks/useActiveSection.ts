import { useEffect, useMemo, useState } from 'react'

export function useActiveSection(ids: string[]) {
  const [activeSection, setActiveSection] = useState(ids[0] ?? '')

  const sortedIds = useMemo(() => ids.filter(Boolean), [ids])

  useEffect(() => {
    if (!sortedIds.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (!visibleEntries.length) return

        const id = visibleEntries[0].target.getAttribute('id')

        if (id) setActiveSection(id)
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0.1, 0.2, 0.4, 0.6],
      },
    )

    const elements = sortedIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement)

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [sortedIds])

  return activeSection
}
