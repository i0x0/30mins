//import { GetAuthTokenResult } from 'chrome';
import { BackgroundSend, GetAuthTokenResult } from "..";
import { createEvent, getCalendarList, getCurrentEvents, getEvents, getFreeTime } from "./calendar";
//import { GetAuthTokenResult } from '@types/chrome';
export { };

console.log("background script loaded");

const getToken = async () => (await chrome.identity.getAuthToken({ interactive: true }) as unknown as GetAuthTokenResult).token
//getAuthToken();

//chrome.commands.onCommand.addListener((cmd) => {
//  console.log(cmd)
//  if (cmd === '30mins') {
//    getAuthToken()
//  }
//})

chrome.runtime.onMessage.addListener((msg: BackgroundSend, sender, sendRes) => {
  if (msg) {
    console.log("new message at", sender.origin)
    try {
      if (msg === 'hi') {
        (async () => {
          let token = await getToken()
          console.log("token: ", token)
          //console.log(getAuthToken())
          let dat = await getFreeTime(token!)
          console.log("test", dat)
          sendRes({
            err: false,
            dat
          })
        })()
        return true;
      } else if (msg.func === 'getEvents') {
        (async () => {
          let token = await getToken()
          let dat = await getEvents(token!, msg.dat)
          console.log('getEvents', dat)
          sendRes({
            err: false,
            dat
          })
        })()
        return true;
      } else if (msg.func === 'getList') {
        (async () => {
          let token = await getToken()
          let dat = await getCalendarList(token!)
          sendRes({
            err: false,
            dat
          })
        })()
        return true;
      } else if (msg.func === 'createEvent') {
        (async () => {
          let token = await getToken()
          let dat = await createEvent(token!, msg.dat)
          sendRes({
            err: false,
            dat
          })
        })()
        return true
      }

    } catch (e) {
      sendRes({
        err: true,
        dat: e
      })
    }
  }
})
