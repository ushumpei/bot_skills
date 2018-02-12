import utterances from './utterances'

export const defaultThread = ({ nextThread, quitThread, label = 'default' }) => (convo) => {
  convo.addQuestion({
    text: 'Could you answer some questions? (ok/no)',
    quick_replies: [
      { title: 'OK', payload: 'ok' },
      { title: 'NO', payload: 'no' }
    ]
  }, [
    {
      pattern: utterances.yes,
      callback: (res, convo) => {
        convo.gotoThread(nextThread)
      }
    },
    {
      pattern: utterances.no,
      callback: (res, convo) => {
        convo.gotoThread(quitThread)
      }
    },
    {
      default: true,
      callback: (res, convo) => {
        convo.repeat()
        convo.next()
      }
    }
  ], {}, label)
}

export const nameThread = ({ nextThread, quitThread, label = 'name' }) => (convo) => {
  convo.addQuestion('What is your name?', [
    {
      pattern: utterances.quit,
      callback: (res, convo) => {
        convo.gotoThread(quitThread)
      }
    },
    {
      pattern: utterances.not_empty,
      callback: (res, convo) => {
        convo.gotoThread(nextThread)
      }
    },
    {
      default: true,
      callback: (res, convo) => {
        convo.addMessage('Something is wrong', label)
        convo.addMessage('If you want to quit this conversation, please enter "quit"', label)
        convo.repeat()
        convo.next()
      }
    }
  ], { key: 'name' }, label)
}

export const emailThread = ({ nextThread, quitThread, label = 'email' }) => (convo) => {
  convo.addQuestion('What is your email?', [
    {
      pattern: utterances.email,
      callback: (res, convo) => {
        convo.gotoThread(nextThread)
      }
    },
    {
      pattern: utterances.quit,
      callback: (res, convo) => {
        convo.gotoThread(quitThread)
      }
    },
    {
      default: true,
      callback: (res, convo) => {
        convo.addMessage('Something is wrong', label)
        convo.addMessage('If you want to quit this conversation, please enter "quit"', label)
        convo.repeat()
        convo.next()
      }
    }
  ], { key: 'email' }, label)
}

export const genderThread = ({ nextThread, quitThread, label = 'gender' }) => (convo) => {
  convo.addQuestion({
    text: 'Choose your gender (male/female/other)',
    quick_replies: [
      { title: 'Male', payload: 'male' },
      { title: 'Female', payload: 'female' },
      { title: 'Other', payload: 'other' }
    ]
  }, [
    {
      pattern: /^(male|female|other)$/,
      callback: (res, convo) => {
        convo.gotoThread(nextThread)
      }
    },
    {
      pattern: utterances.quit,
      callback: (res, convo) => {
        convo.gotoThread(quitThread)
      }
    },
    {
      default: true,
      callback: (res, convo) => {
        convo.addMessage('Something is wrong', label)
        convo.addMessage('If you want to quit this conversation, please enter "quit"', label)
        convo.repeat()
        convo.next()
      }
    }
  ], { key: 'gender' }, label)
}

export const confirmThread = ({ quitThread, label = 'confirm' }) => (convo) => {
  convo.addMessage('Thank you', label)
  convo.addMessage('Check your inputs', label)
  convo.addMessage(['name', 'email', 'gender'].map(n => `${n}: {{vars.${n}}}`).join('\n'), label)
  convo.addQuestion({
    text: 'Do you want to change inputs? (quit/name/email/gender)',
    quick_replies: [
      { title: 'Quit', payload: 'quit' },
      { title: 'Name', payload: 'name' },
      { title: 'Email', payload: 'email' },
      { title: 'Gender', payload: 'gender' }
    ]
  }, [
    {
      pattern: 'name',
      callback: (res, convo) => {
        convo.gotoThread('edit_name')
      }
    },
    {
      pattern: 'email',
      callback: (res, convo) => {
        convo.gotoThread('edit_email')
      }
    },
    {
      pattern: 'gender',
      callback: (res, convo) => {
        convo.gotoThread('edit_gender')
      }
    },
    {
      pattern: utterances.quit,
      callback: (res, convo) => {
        convo.gotoThread(quitThread)
      }
    },
    {
      pattern: utterances.no,
      callback: (res, convo) => {
        convo.gotoThread(quitThread)
      }
    },
    {
      default: true,
      callback: (res, convo) => {
        convo.repeat()
        convo.next()
      }
    }
  ], {}, label)
}

export const completeThread = ({ label = 'complete' }) => (convo) => {
  convo.addMessage('Bye', label)
}
