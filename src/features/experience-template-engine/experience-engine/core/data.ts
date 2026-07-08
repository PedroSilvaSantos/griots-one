export function resolveDataSource(source: string, data: unknown) {
  return source.split('.').reduce<unknown>((current, key) => {
    if (current && typeof current === 'object' && key in current) {
      return (current as Record<string, unknown>)[key]
    }

    return ''
  }, data)
}

export function stringifyDataSource(source: string, data: unknown) {
  const value = resolveDataSource(source, data)
  return String(value || '')
}
