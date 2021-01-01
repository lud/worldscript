export class GameLogger {
  log(msg: string): void {
    console.log('[game log] %s', msg)
  }
}

export function logmsg(msg: string) {
  return function (logger: GameLogger) {
    logger.log(msg)
  }
}