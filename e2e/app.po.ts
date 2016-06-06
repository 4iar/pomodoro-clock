export class PomodoroClockPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('pomodoro-clock-app h1')).getText();
  }
}
