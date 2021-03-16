import { socketAPI, SocketAPI_Type } from './app';
import { AppStateType, InferActionsTypes } from './redux-store';
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import maleProfilePic from './img/dialogs/male.png';

type ActionTypes = InferActionsTypes<typeof actions>
type Dispatch_Type = Dispatch<ActionTypes>;
export type InitialChatState_Type = typeof initialChatState;

export type ReadyStatus_Type = 'undefined' | 'pending' | 'opened' | 'closed';
type ChatArr_Type = { message: string, photo: string, userId: number, userName: string }
type ThunkAC_Type = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

const actions = {
  readyStatusSetter: (newReadyStatus: ReadyStatus_Type) => ({ type: 'SET_NEW_READY_STATUS', newReadyStatus } as const),
  socketSetter: (newWebSosket: null | WebSocket) => ({ type: 'SET_NEW_WEB_SOCKET', newWebSosket } as const),
  chatArrSetter: (newchatArr: ChatArr_Type[]) => ({ type: 'SET_NEW_CHAT_ARR', newchatArr } as const),
}



let setSocketChannelThunkAC = () => (dispatch: Dispatch_Type) => {
  dispatch(actions.readyStatusSetter('pending'))
  let newWs = socketAPI.createChannel();

  dispatch(actions.socketSetter(newWs))
  if (newWs !== null) {

    newWs.removeEventListener('close', socketAPI.createChannel);

    newWs.addEventListener('open', (e: Event) => {
      dispatch(actions.readyStatusSetter('opened'))
      console.log('opened')

      newWs.addEventListener('message', (e: MessageEvent) => {
        dispatch(actions.chatArrSetter(JSON.parse(e.data)))
        console.log('message')
      })

      newWs.addEventListener('close', () => {    // хз как отработает этот блок кода
        console.log('close')
        newWs?.close()
        dispatch(actions.readyStatusSetter('closed'));
        setTimeout(() => { console.log('setTimeout'); setSocketChannelThunkAC(); console.log('setTimeout2'); }, 3000)
      })

    })
  }
  console.log(newWs)
}


const chatActions = { setSocketChannelThunkAC, }


export const chatACs = (state = chatActions) => { return state }

let initialChatState = {
  webSocket: null as null | WebSocket,
  chatArr: [] as ChatArr_Type[],
  readyStatus: 'undefined' as ReadyStatus_Type,
  defaultAvatar: maleProfilePic as string,
}

export const chatReducer = (state = initialChatState, action: ActionTypes): InitialChatState_Type => {
  switch (action.type) {
    case 'SET_NEW_WEB_SOCKET': return { ...state, webSocket: action.newWebSosket }
    case 'SET_NEW_CHAT_ARR':
      return { ...state, chatArr: [...action.newchatArr.reverse(), ...state.chatArr] }
    case 'SET_NEW_READY_STATUS': return { ...state, readyStatus: action.newReadyStatus }
    default: return { ...state }
  }
}