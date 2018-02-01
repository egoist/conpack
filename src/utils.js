export const getOptions = (newOptions, options) => {
  newOptions = typeof newOptions === 'function' ? newOptions(options) : newOptions
  return newOptions || options
}
