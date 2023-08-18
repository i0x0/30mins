const URL = "https://www.googleapis.com/calendar/v3"

const helper = (token: string) => {
  const headers = new Headers({
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  })

  return { headers };
}

export const getCurrentEvents = async (token: string) => {
  const queryParams = helper(token)
  let res = await fetch(`${URL}/calendars/primary/events`, queryParams)
  let dat = await res.json() as gapi.client.calendar.FreeBusy
  console.log("getCurrentEvents: ", dat)
  return dat
}

export const getCalendarList = async (token: string) => {
  const queryParams = helper(token)
  let res = await fetch(`${URL}/users/me/calendarList`, queryParams)
  let dat = await res.json() as gapi.client.calendar.CalendarList
  console.log("getCalendarList: ", dat)
  return dat
}

export const getFreeTime = async (token: string) => {
  const queryParams = helper(token)

  const base = await getCalendarList(token)
  let ids: {
    id: string
  }[] = []
  base.items.forEach((x) => {
    ids.push({
      id: x.id
    })
  })


  const currentTime = new Date()
  const futureTime = new Date(currentTime.getTime() + 30 * 60000)

  let res = await fetch(`${URL}/freeBusy`, {
    ...queryParams,
    method: "POST", body: JSON.stringify({
      timeMin: currentTime.toISOString(),
      timeMax: futureTime.toISOString(),
      items: ids
    })
  })
  let dat = await res.json()
  console.log("freeTime: ", dat)
  return dat
}

export const getEvents = async (token: string, x?: gapi.client.calendar.EventsListParameters) => {
  const queryParams = helper(token)
  // @ts-expect-error
  const res = await fetch(`${URL}/calendars/primary/events?${new URLSearchParams(x)}`, {
    ...queryParams,
  })

  let dat = await res.json()
  console.log("getEvents: ", dat)
  return dat as gapi.client.calendar.Event
}

export const createEvent = async (token: string, x: gapi.client.calendar.EventsInsertParameters) => {
  const queryParams = helper(token)
  console.log("params: ", queryParams)
  console.log("creattt: ", x)
  const res = await fetch(`${URL}/calendars/primary/events`, {
    ...queryParams,
    method: "POST",
    body: JSON.stringify(x)
  })
  let dat = await res.json()
  console.log('createEvent: ', dat)
  return dat
}