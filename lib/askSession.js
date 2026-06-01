let askMessages = null;
let checkedPageRefresh = false;
const ASK_MESSAGES_KEY = "dripup_ask_session_messages";

function canUseSessionStorage() {
  return typeof window !== "undefined" && Boolean(window.sessionStorage);
}

export function getAskMessages() {
  clearAskMessagesOnPageRefresh();

  if (Array.isArray(askMessages)) return askMessages;
  if (!canUseSessionStorage()) return null;

  try {
    const storedMessages = window.sessionStorage.getItem(ASK_MESSAGES_KEY);
    const parsedMessages = storedMessages ? JSON.parse(storedMessages) : null;
    askMessages = Array.isArray(parsedMessages) ? parsedMessages : null;
    return askMessages;
  } catch {
    return null;
  }
}

export function setAskMessages(messages) {
  askMessages = Array.isArray(messages) ? messages : null;

  if (!canUseSessionStorage()) return;

  try {
    if (askMessages) {
      window.sessionStorage.setItem(ASK_MESSAGES_KEY, JSON.stringify(askMessages));
    } else {
      window.sessionStorage.removeItem(ASK_MESSAGES_KEY);
    }
  } catch {
    // Session memory is a convenience layer; the chat can still run without it.
  }
}

export function clearAskMessages() {
  askMessages = null;

  if (!canUseSessionStorage()) return;

  try {
    window.sessionStorage.removeItem(ASK_MESSAGES_KEY);
  } catch {
    // Ignore storage failures.
  }
}

export function clearAskMessagesOnPageRefresh() {
  if (typeof window === "undefined") return;
  if (checkedPageRefresh) return;

  checkedPageRefresh = true;

  const navigationEntry = window.performance
    ?.getEntriesByType?.("navigation")
    ?.find((entry) => entry.type);

  if (navigationEntry?.type === "reload") {
    clearAskMessages();
  }
}
