export function hexFormat(hex) {
  const regExp = /^#([a-fA-F0-9]){0,6}$/g

  const result = regExp.test(hex)

  if (result === false) return

  return hex
}
