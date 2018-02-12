import Botkit from 'botkit'
import init from './init'

const controller = Botkit.consolebot()
init(controller)

controller.spawn()
