import path from 'path'
import fs from 'fs'

export default (controller, importSkills) => {
  const normalizedPath = path.join(__dirname, 'skills')
  fs.readdirSync(normalizedPath).forEach((skill) => {
    if (importSkills && !importSkills.includes(skill)) return;
    import('./skills/' + skill)
      .then(({ default: skill }) => skill(controller))
  })

  return controller;
}
