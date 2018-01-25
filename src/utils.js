export const getOptions = (fn, options) => {
  const newOptions = typeof fn === 'function' ? fn(options) : options
  return newOptions || options
}
