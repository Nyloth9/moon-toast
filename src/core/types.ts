import { JSX } from 'solid-js'
import Dispatcher, { Timer } from './dispatcher'
import { SetStoreFunction } from 'solid-js/store'

export interface ToastContext {
  notify: (body?: ToastBody, options?: ToastOptions) => ReturnValue
  update: (body: ToastBody, options: ToastOptionsUpdate) => ReturnValue | undefined
  dismiss: (id?: string) => void
  remove: (id?: string) => void
  custom: CustomToast
}

export interface ReturnValue {
  id: string
  ref: HTMLDivElement
  timer: {
    pause: () => void
    play: () => void
    reset: () => void
  }
}

export type ToastBody = string | JSX.Element

export interface Offset {
  id: string
  offset: number
}

export interface ContextStore {
  toasts: Toast[]
  refArray: HTMLDivElement[]
  offsetsArray: Offset[]
}

export interface DispatcherConstructorArgs extends ToastProviderProps {
  store: ContextStore
  setStore: SetStoreFunction<ContextStore>
}

export interface ToastProviderProps extends CommonProperties {
  children?: JSX.Element
  gutter?: number
  maxToasts?: number
  pauseOnTabSwitch?: boolean
  positionY?: 'top' | 'bottom'
  positionX?: 'left' | 'right' | 'center'
  offsetY?: number
  offsetX?: number
  duration?: number | 'infinite'
  toasterStyle?: Omit<
    JSX.CSSProperties,
    'top' | 'bottom' | 'left' | 'right' | 'justify-content' | 'align-items' | 'pointer-events'
  >
}

export interface ToasterProps {
  dispatcher: Dispatcher
}

export interface ToastProps extends Toast {
  dispatcher: Dispatcher
}

export interface Toast extends CommonProperties {
  id: string
  body: ToastBody
  duration: number | 'infinite'
  timer: Timer | undefined
  state: 'entering' | 'idle' | 'exiting'
}

export type CustomToast = (
  func: (args: CustomToastArgs) => JSX.Element,
  options?: CustomToastOptions,
) => { id: string; ref: HTMLDivElement | undefined }

export interface CustomToastArgs {
  id: string
  duration: number | 'infinite'
  timer: Timer | undefined
}

type CustomToastOptions = Pick<
  ToastFactoryOptions,
  | 'duration'
  | 'dismissButton'
  | 'dissmisOnClick'
  | 'enterDuration'
  | 'exitDuration'
  | 'id'
  | 'onEnter'
  | 'onExit'
  | 'onIdle'
  | 'pauseOnHover'
  | 'progressBar'
  | 'wrapperClass'
>

export interface ToastFactoryOptions extends CommonProperties {
  id?: string
  duration?: number | 'infinite'
  type?: 'success' | 'error' | 'loading' | undefined
  timer?: Timer | undefined
}

export interface ToastOptions extends CommonProperties {
  id?: string
  duration?: number | 'infinite'
  type?: 'success' | 'error' | 'loading' | undefined
}

export interface ToastOptionsUpdate extends CommonProperties {
  id: string
  duration?: number | 'infinite'
  type?: 'success' | 'error' | 'loading' | undefined
}

interface CommonProperties {
  wrapperClass?: {
    className: string
    replaceDefault?: boolean
  }
  class?: {
    className: string
    replaceDefault?: boolean
  }
  style?: JSX.CSSProperties
  icon?: JSX.Element
  iconWrapperStyle?: JSX.CSSProperties
  iconWrapperClass?: {
    className: string
    replaceDefault?: boolean
  }
  dismissButton?: {
    show?: boolean
    className?: string
    style?: JSX.CSSProperties
    type?: 'inline' | 'floating'
  }
  dissmisOnClick?: boolean
  progressBar?: {
    showDefault?: boolean
    style?: JSX.CSSProperties
    className?: string
    animate?: {
      keyframes?: Keyframe[]
      options?: KeyframeAnimationOptions
    }
  }
  onEnter?: string
  enterDuration?: number
  onExit?: string
  exitDuration?: number
  onIdle?: string
  pauseOnHover?: boolean
  unstyled?: boolean
  aria?: {
    role: any
    'aria-live': any
  }
  enterCallback?: () => void
  exitCallback?: () => void
  updateCallback?: () => void
}
