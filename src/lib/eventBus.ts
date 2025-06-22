type Callback = (...args: any[]) => void;

class EventBus {
  private events: Record<string, Callback[]> = {};

  on(event: string, callback: Callback) {
    this.events[event] ||= [];
    this.events[event].push(callback);
  }

  off(event: string, callback: Callback) {
    this.events[event] = this.events[event]?.filter((c) => c != callback) || [];
  }

  emit(event: string, ...args: any[]) {
    this.events[event]?.forEach((callback) => callback(...args));
  }
}

export const eventBus = new EventBus();
