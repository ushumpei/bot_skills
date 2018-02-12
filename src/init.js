import path from 'path'
import fs from 'fs'

export default (controller) => {
  const normalizedPath = path.join(__dirname, 'skills')
  fs.readdirSync(normalizedPath).forEach((file) => {
    import('./skills/' + file)
      .then(({ default: skill }) => skill(controller))
  })

  return controller;
}
