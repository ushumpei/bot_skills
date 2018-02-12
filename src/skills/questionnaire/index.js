import {
  defaultThread,
  nameThread,
  emailThread,
  genderThread,
  confirmThread,
  completeThread
} from './threads'

export default (controller) => {
  controller.on(['message_received'], (bot, message) => {
    bot.startConversation(message, (err, convo) => {
      if (err) throw err
      convo.say('Hello')
      convo.say('I\'m a prototype of a chatbot developed by ushumpei')
      convo.say('At the current version, I can conduct a simple questionnaire')
      convo.say({
        text: 'Please enter "start questionnaire", If you want',
        quick_replies: [
          { title: 'start questionnaire', payload: 'start questionnaire' }
        ]
      })
    })
  })

  controller.hears('start questionnaire', ['message_received'], (bot, message) => {
    bot.createConversation(message, (err, convo) => {
      if (err) throw err

      defaultThread({ nextThread: 'name', quitThread: 'complete' })(convo)

      nameThread({ nextThread: 'email', quitThread: 'complete' })(convo)
      emailThread({ nextThread: 'gender', quitThread: 'complete' })(convo)
      genderThread({ nextThread: 'confirm', quitThread: 'complete' })(convo)

      confirmThread({ quitThread: 'complete' })(convo)
      nameThread({ nextThread: 'confirm', quitThread: 'confirm', label: 'edit_name' })(convo)
      emailThread({ nextThread: 'confirm', quitThread: 'confirm', label: 'edit_email' })(convo)
      genderThread({ nextThread: 'confirm', quitThread: 'confirm', label: 'edit_gender' })(convo)

      completeThread({})(convo)

      convo.beforeThread('confirm', (convo, next) => {
        convo.setVar('name', convo.extractResponse('name'))
        convo.setVar('email', convo.extractResponse('email'))
        convo.setVar('gender', convo.extractResponse('gender'))
        next()
      })

      convo.activate()
    })
  })
}
