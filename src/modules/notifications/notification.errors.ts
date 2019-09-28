class NotificationsErrors extends Error {
  constructor(message) {
    super(message);
  }
}

class NotificationSendError extends NotificationsErrors {
  constructor(message?: string) {
    super(message || 'Could not send notification right now');
  }
}

export {NotificationsErrors, NotificationSendError};
