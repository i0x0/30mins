import { BackgroundResponse, BackgroundSend } from ".."

export const getCalendarView = (): string => document.body.dataset.viewkey as string

const topBar = document.querySelector("#drawerMiniMonthNavigator > div > div.MSZkRb.O8VmIc > span.r4nke")

export const getMonth = (): string | undefined => topBar?.innerHTML.split(' ')[0]

export const getYear = (): string | undefined => topBar?.innerHTML.split(' ')[1]

export const getFirstDayInWeek = () => document.querySelector("#YPCqFe > div > div > div.v83gc.YoVtqb.eh5oYe > div.JE11kf.FEiQrc > div.H7IzGb > div.Uit9Se > div > div:nth-child(2) > h2 > div.MmhHI.KSxb4d.RKLVef.N4XV7d")

export const getLastDayInWeek = () => document.querySelector("#YPCqFe > div > div > div.v83gc.YoVtqb.eh5oYe > div.JE11kf.FEiQrc > div.H7IzGb > div.Uit9Se > div > div:nth-child(8) > h2 > div.MmhHI.KSxb4d.RKLVef.N4XV7d")

export const sendMsg = async (x: BackgroundSend): Promise<BackgroundResponse> => {
  console.log('new msg')
  return await chrome.runtime.sendMessage(x)
}