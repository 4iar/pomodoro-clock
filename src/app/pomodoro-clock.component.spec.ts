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

  it('should initialise startingDurationSeconds.break to 300',
    inject([PomodoroClockAppComponent], (app: PomodoroClockAppComponent) => {
      expect(app.startingDurationSeconds['break']).toEqual(300);
    }));

  it('should initialise startingDurationSeconds.work to 1500',
    inject([PomodoroClockAppComponent], (app: PomodoroClockAppComponent) => {
      expect(app.startingDurationSeconds['work']).toEqual(1500);
    }));

  describe('Function: decrementStartingDurationByOneMinute', () => {
    it('should decrement the duration of the relevant timer duration (work/break) by one minute',
      inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
        app.startingDurationSeconds = {
          'break': 300,
          'work': 1500 
        }
        app.decrementStartingDurationByOneMinute('break');
        expect(app.startingDurationSeconds['break']).toEqual(240);
        app.decrementStartingDurationByOneMinute('break');
        expect(app.startingDurationSeconds['break']).toEqual(180);

        app.decrementStartingDurationByOneMinute('work');
        expect(app.startingDurationSeconds['work']).toEqual(1440);
        app.decrementStartingDurationByOneMinute('work');
        expect(app.startingDurationSeconds['work']).toEqual(1380);
      }));
    it('should not allow the duration of either timer (break/work) to be less than one minute',
      inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
        app.startingDurationSeconds = {
          'break': 300,
          'work': 120 
        }
        app.decrementStartingDurationByOneMinute('break');
        app.decrementStartingDurationByOneMinute('break');
        app.decrementStartingDurationByOneMinute('break');
        app.decrementStartingDurationByOneMinute('break');
        app.decrementStartingDurationByOneMinute('break');
        app.decrementStartingDurationByOneMinute('break');
        expect(app.startingDurationSeconds['break']).toEqual(60);

        app.decrementStartingDurationByOneMinute('work');
        app.decrementStartingDurationByOneMinute('work');
        app.decrementStartingDurationByOneMinute('work');
        expect(app.startingDurationSeconds['work']).toEqual(60);
      }));
    describe('Function: incrementStartingDurationByOneMinute', () => {
      it('should increment the duration of the relevant timer duration (work/break) by one minute',
        inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
          app.startingDurationSeconds = {
            'break': 300,
            'work': 1500 
          }

          app.incrementStartingDurationByOneMinute('break');
          expect(app.startingDurationSeconds['break']).toEqual(360);
          app.incrementStartingDurationByOneMinute('break');
          expect(app.startingDurationSeconds['break']).toEqual(420);

          app.incrementStartingDurationByOneMinute('work');
          expect(app.startingDurationSeconds['work']).toEqual(1560);
          app.incrementStartingDurationByOneMinute('work');
          expect(app.startingDurationSeconds['work']).toEqual(1620);
        }));
    });
    describe('Function: timerStart', () => {
      it('if the timer has not been started, start it by setting this.status.ticking',
        inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
          app.startingDurationSeconds = {'work': 1500, 'break':300};
          app.timerStart();
          expect(app.status['ticking']).toBeTruthy();
        }));

      it('sets this.status.currentTimer to "work", because we do not start work with a break',
        inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
          app.startingDurationSeconds = {'work': 1500, 'break':300};
          app.timerStart();
          expect(app.status['currentTimer']).toEqual('work');
        }));

      it('sets this.status.secondsRemaining to the defined starting duration if the timer has not been started',
        inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
          app.startingDurationSeconds = {'work': 777, 'break':300};
          app.timerStart();
          expect(app.status['secondsRemaining']).toEqual(777);

          app.startingDurationSeconds = {'work': 777, 'break':300};
          app.status = {'ticking': false, 'currentTimer': 'work', 'secondsRemaining': 1500, 'paused': false};
          app.timerStart();
          expect(app.status['secondsRemaining']).toEqual(777);
        }));

      it('calls the setInterval function with the correct callback and time interval',
        inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
          app.timerStart();
        }));
    });
  });
  describe('Function: timerPause', () => {
    it('it sets status.paused',
      inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
        app.status = {'ticking': false, 'currentTimer': 'work', 'secondsRemaining': 1500, 'paused': false};
        app.timerPause();
        expect(app.status['paused']).toBeTruthy();
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

    it('sets this.status.secondsRemaining to the work starting duration',
      inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
        app.timerReset()
      }));
  });
  xdescribe('Function: timerTickOneSecond', () => {
    it('decreases this.status.secondsRemaining by one second',
      inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
        app.status = {'ticking': false, 'currentTimer': 'work', 'secondsRemaining': 1500, 'paused': false};
        app.timerTickOneSecond();
        expect(app.status['secondsRemaining']).toEqual(1499);
        app.timerTickOneSecond();
        expect(app.status['secondsRemaining']).toEqual(1498);
      }));

    it('switches the current timer to "break" once the work timer has reached 0',
      inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
        app.status = {'ticking': false, 'currentTimer': 'work', 'secondsRemaining': 0, 'paused': false};
        app.timerTickOneSecond();
        expect(app.status['currentTimer']).toEqual('break');
      }));

    it('resets the timer when the break timer has ended',
      inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
        app.startingDurationSeconds = {'work': 1500, 'break': 300};
        app.status = {'ticking': true, 'currentTimer': 'break', 'secondsRemaining': 0, 'paused': false};
        app.timerTickOneSecond();
        expect(app.status) .toEqual({'ticking': false, 'currentTimer': 'work', 'secondsRemaining': 1500, 'paused': false});
      }));

    it('calls timerEndNotification when either the work timer ends',
      inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
        app.status = {'ticking': true, 'currentTimer': 'work', 'secondsRemaining': 0, 'paused': false};
        app.timerTickOneSecond();
        spyOn(app, 'timerEndNotification');
        expect(app.timerEndNotification).toHaveBeenCalled();
      }));

    it('calls timerEndNotification when either the work timer ends',
      inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
        app.status = {'ticking': true, 'currentTimer': 'break', 'secondsRemaining': 0, 'paused': false};
        app.timerTickOneSecond();
        spyOn(app, 'timerEndNotification');
        expect(app.timerEndNotification).toHaveBeenCalled();
      }));
  });

  xdescribe('Function: timerEndNotification', () => {
    it('calls audio.play()',
      inject([PomodoroClockAppComponent], (app:PomodoroClockAppComponent) => {
        // TODO: write the spy
        expect(true).toBeTruthy();
      }));
  });
});

