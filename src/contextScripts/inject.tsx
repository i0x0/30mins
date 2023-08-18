export { Inject };
import React from 'react';
import { sendMsg, getCalendarView, getFirstDayInWeek, getLastDayInWeek, getYear } from './context';
import { copyTextToClipboard } from '../utils/index';

//function Inject() {
//  console.log(getCalendarView())
//  let isWeek = getCalendarView() === 'WEEK'
//  if (isWeek) {
//    return (
//      <div className="qXIcZc ZtL5hd">
//        <div className="fWMZdd">30 Mins</div>
//        <div className="ukir3 nNGgOd">
//          <p onClick={async () => await sendMsg('hi')}>Get current events</p>
//        </div>
//      </div>
//    )
//  } else {
//    return (
//      <div className="qXIcZc ZtL5hd">
//        <div className="fWMZdd">30 Mins</div>
//        <div className="ukir3 nNGgOd">
//          <p>Switch to week view</p>
//        </div>
//      </div>
//    )
//  }
//}

class Inject extends React.Component<{}, {
  isWeek: boolean,
  from: number,
  to: number,
  isDisabled: boolean
}> {
  observer: MutationObserver | undefined;

  isWeekUpdater() {
    console.log(getCalendarView())
    return getCalendarView() === 'WEEK'
  }
  constructor(props: any) {
    super(props);
    this.state = {
      from: 0,
      to: 0,
      isWeek: this.isWeekUpdater(),
      isDisabled: false
    }
    this.observer = undefined
  }
  componentDidMount(): void {
    const target = document.body
    this.observer = new MutationObserver((mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'attributes') {
          if (mutation.attributeName === 'data-viewkey') {
            this.setState({
              isWeek: this.isWeekUpdater()
            })
          }
        }
      }
    })
    this.observer.observe(target, {
      attributes: true
    });
  }
  componentWillUnmount(): void {
    this.observer?.disconnect();
  }

  disable() {
    this.setState({
      isDisabled: true
    })
  }

  enable() {
    this.setState({
      isDisabled: false
    })
  }

  render() {
    if (this.state.isWeek) {
      return (
        <div className="qXIcZc ZtL5hd">
          <div className="fWMZdd">30 Mins</div>
          <div className="ukir3 nNGgOd">
            <div>
              {/*<p onClick={async () => await sendMsg('test')}>Get current events</p>*/}
              <button disabled={this.state.isDisabled} onClick={async () => {
                this.disable()
                //await new Promise(resolve => setTimeout(resolve, 8000)); // 3 sec
                try {
                  //let lists = await sendMsg({ func: 'getList' })
                  let old = new Date(getFirstDayInWeek()?.ariaLabel as string)
                  console.log("old: ", old)
                  old.setFullYear(getYear() as unknown as number)
                  let _new = new Date(getLastDayInWeek()?.ariaLabel as string)
                  console.log("new", _new)
                  _new.setFullYear(getYear() as unknown as number)
                  let _events = await sendMsg({
                    func: "getEvents",
                    dat: {
                      calendarId: "primary",
                      timeMin: old.toISOString(),
                      timeMax: _new.toISOString(),
                      singleEvents: true,
                      orderBy: 'startTime'
                    }
                  })
                  console.log("events:", _events)
                  let events = (_events.dat as gapi.client.calendar.Events)
                  let slots = []

                  for (let i = 0; i < events.items.length - 1; i++) {
                    const currentEventEnd = new Date(events.items[i].end.dateTime as string);
                    const nextEventStart = new Date(events.items[i + 1].start.dateTime as string);
                    //@ts-expect-error
                    const timeDiff = Math.abs(nextEventStart - currentEventEnd)


                    if (timeDiff >= 30 * 60 * 1000) { // 30 minutes in milliseconds
                      slots.push({
                        start: currentEventEnd,
                        end: new Date(currentEventEnd.getTime() + 30 * 60 * 1000), // 30 minutes later
                      });
                    }
                  }
                  console.log('Available Slots:', slots);
                  if (slots.length === 0) {
                    alert('no available slots')
                  } else {
                    let chozenOne = slots[0]
                    console.log("uh: ", chozenOne)
                    let { start, end } = chozenOne
                    console.log("start: ", start)
                    console.log("end: ", end)
                    let name = prompt('Name of event?')
                    if (name === null || name === "") {
                      name = 'Scheduled meeting'
                    }
                    let newEvent = await sendMsg({
                      func: 'createEvent',
                      dat: {
                        calendarId: "primary",
                        resource: {
                          summary: name,
                          start: {
                            dateTime: start.toISOString(),
                            timeZone: events.timeZone
                          },
                          end: {
                            dateTime: end.toISOString(),
                            timeZone: events.timeZone
                          },
                        }
                      }
                    })

                    let url = (newEvent.dat as gapi.client.calendar.Event).htmlLink
                    console.log("url: ", url)
                    copyTextToClipboard(url)
                    alert('Event link in clipboard')
                  }

                } finally {
                  this.enable()
                }
              }}>Get current events</button>
              <div>
                <p>During</p>
              </div>
              <div>
                <input value={this.state.from} type="time" min="09:00" max="18:00" required />
              </div>
              {/*<br />*/}
              <small>
                to
              </small>
              {/*<br />*/}
              <div>
                <input value={this.state.to} type="time" min="09:00" max="18:00" required />
              </div>
            </div>
          </div>
        </div >
      )
    } else {
      return (
        <div className="qXIcZc ZtL5hd">
          <div className="fWMZdd">30 Mins</div>
          <div className="ukir3 nNGgOd">
            <p>Switch to week view</p>
          </div>
        </div>
      )
    }
  }
}