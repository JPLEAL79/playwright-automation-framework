type LogLevel = 'INFO' | 'WARN' | 'ERROR';

class Logger {
  private readonly formatter = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'America/Santiago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  });

  private formatTimestamp(date: Date): string {
    const parts = this.formatter.formatToParts(date);
    const getPart = (type: Intl.DateTimeFormatPartTypes): string =>
      parts.find((part) => part.type === type)?.value ?? '';

    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    return `${getPart('year')}-${getPart('month')}-${getPart('day')} ${getPart('hour')}:${getPart('minute')}:${getPart('second')}.${milliseconds} ${getPart('timeZoneName')}`;
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = this.formatTimestamp(new Date());
    return `[${timestamp}] [${level}] ${message}`;
  }

  info(message: string): void {
    console.log(this.formatMessage('INFO', message));
  }

  warn(message: string): void {
    console.warn(this.formatMessage('WARN', message));
  }

  error(message: string): void {
    console.error(this.formatMessage('ERROR', message));
  }
}

export const logger = new Logger();
