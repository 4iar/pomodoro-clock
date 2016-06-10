import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { PomodoroClockAppComponent } from '../app/pomodoro-clock.component';

beforeEachProviders(() => [PomodoroClockAppComponent]);

describe('App: PomodoroClock', () => {
  it('should create the app',
    inject([PomodoroClockAppComponent], (app: PomodoroClockAppComponent) => {
      expect(app).toBeTruthy();
    }));

  it('should initialise startingDurationMinutes.break to 5',
    inject([PomodoroClockAppComponent], (app: PomodoroClockAppComponent) => {
      expect(app.startingDurationMinutes['break']).toEqual(5);
    }));

  it('should initialise startingDurationMinutes.work to 25',
    inject([PomodoroClockAppComponent], (app: PomodoroClockAppComponent) => {
      expect(app.startingDurationMinutes['work']).toEqual(25);
    }));

  describe('Function: decrementStartingDurationByOneMinute', () => {
    it('should decrement the duration of the relevant timer duration (work/break) by one minute',
      inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
        app.startingDurationMinutes = {
          'break': 5,
          'work': 25
        }
        app.decrementStartingDurationByOneMinute('break');
        expect(app.startingDurationMinutes['break']).toEqual(4);
        app.decrementStartingDurationByOneMinute('break');
        expect(app.startingDurationMinutes['break']).toEqual(3);

        app.decrementStartingDurationByOneMinute('work');
        expect(app.startingDurationMinutes['work']).toEqual(24);
        app.decrementStartingDurationByOneMinute('work');
        expect(app.startingDurationMinutes['work']).toEqual(23);
      }));
    it('should not allow the duration of either timer (break/work) to be less than 0',
      inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
        app.startingDurationMinutes = {
          'break': 5,
          'work': 2
        }
        app.decrementStartingDurationByOneMinute('break');
        app.decrementStartingDurationByOneMinute('break');
        app.decrementStartingDurationByOneMinute('break');
        app.decrementStartingDurationByOneMinute('break');
        app.decrementStartingDurationByOneMinute('break');
        app.decrementStartingDurationByOneMinute('break');
        expect(app.startingDurationMinutes['break']).toEqual(1);

        app.decrementStartingDurationByOneMinute('work');
        app.decrementStartingDurationByOneMinute('work');
        app.decrementStartingDurationByOneMinute('work');
        expect(app.startingDurationMinutes['work']).toEqual(1);
      }));
    describe('Function: incrementStartingDurationByOneMinute', () => {
      it('should increment the duration of the relevant timer duration (work/break) by one minute',
        inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
          app.startingDurationMinutes = {
            'break': 5,
            'work': 25
          }

          app.incrementStartingDurationByOneMinute('break');
          expect(app.startingDurationMinutes['break']).toEqual(6);
          app.incrementStartingDurationByOneMinute('break');
          expect(app.startingDurationMinutes['break']).toEqual(7);

          app.incrementStartingDurationByOneMinute('work');
          expect(app.startingDurationMinutes['work']).toEqual(26);
          app.incrementStartingDurationByOneMinute('work');
          expect(app.startingDurationMinutes['work']).toEqual(27);
        }));
    });
    describe('Function: timerStart', () => {
      it('sets this.status.ticking to true',
        inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
          app.startingDurationMinutes = {'work': 25, 'break': 5};
          app.timerStart();
          expect(app.status['ticking']).toBeTruthy();
        }));

      it('sets this.status.currentTimer to "work", because we do not start work with a break',
        inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
          app.startingDurationMinutes = {'work': 25, 'break': 5};
          app.timerStart();
          expect(app.status['currentTimer']).toEqual('work');
        }));

      it('sets this.status.minutesRemaining to the defined starting duration',
        inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
          app.startingDurationMinutes = {'work': 777, 'break': 5};
          app.timerStart();
          expect(app.status['minutesRemaining']).toEqual(777);
        }));

      it('calls the setInterval function with the correct callback and time interval',
        inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
          app.timerStart();
        }));
    });
  });
  describe('Function: timerTogglePause', () => {
    it('toggles this.status.ticking',
      inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
        app.status = {'ticking': true};
        app.timerTogglePause();
        expect(app.status['ticking']).toBeFalsy();
        app.timerTogglePause();
        expect(app.status['ticking']).toBeTruthy();
      }));

    it('calls setInterval with the remaining time',
      inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
        app.timerTogglePause();
      }));
  });
  describe('Function: timerReset', () => {
    it('sets this.status.ticking to false',
      inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
        app.timerReset()
      }));

    it('sets this.status.currentTimer to "work"',
      inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
        app.timerReset()
      }));

    it('sets this.status.minutesRemaining to the work starting duration',
      inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
        app.timerReset()
      }));
  });
  describe('Function: timerTickOneSecond', () => {
    it('decreases this.status.minutesRemaining by one second',
      inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
        app.timerTickOneSecond()
      }));

    it('switches the current timer to "break" once the work timer has reached 0',
      inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
        app.timerTickOneSecond()
      }));

    it('resets the timer when the break timer has ended',
      inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
        app.timerTickOneSecond()
      }));
  });
});

