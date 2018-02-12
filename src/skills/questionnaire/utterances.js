export default {
  not_empty: new RegExp(/^.+$/),
  email: new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
  yes: new RegExp(/^(yes|yea|yup|yep|ya|sure|ok|y|yeah|yah)/i),
  no: new RegExp(/^(no|nah|nope|n)/i),
  quit: new RegExp(/^(quit|cancel|end|stop|done|exit|nevermind|never mind)/i)
}
