let askMessages = null;

export function getAskMessages() {
  return Array.isArray(askMessages) ? askMessages : null;
}

export function setAskMessages(messages) {
  askMessages = Array.isArray(messages) ? messages : null;
}
