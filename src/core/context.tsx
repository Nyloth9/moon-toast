import { createContext, createEffect, onCleanup, onMount, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import type {
  ContextStore,
  ToastBody,
  ToastContext,
  ToastOptions,
  ToastOptionsUpdate,
  ToastProviderProps,
} from './types.js'
import Toaster from '../components/Toaster.jsx'
import Dispatcher from './dispatcher.js'

const ToastContext = createContext<ToastContext>()

export const ToastProvider = (props: ToastProviderProps) => {
  const [store, setStore] = createStore<ContextStore>({
    toasts: [],
    refArray: [],
    offsetsArray: [],
  })

  const dispatcher = new Dispatcher({
    store,
    setStore,
    gutter: props.gutter,
    pauseOnTabSwitch: props.pauseOnTabSwitch,
    positionY: props.positionY,
    positionX: props.positionX,
    offsetX: props.offsetX,
    offsetY: props.offsetY,
    duration: props.duration,
    preventHeightOverflow: props.preventHeightOverflow,
    toasterStyle: props.toasterStyle,
    wrapperClass: props.wrapperClass,
    class: props.class,
    style: props.style,
    icon: props.icon,
    iconWrapperStyle: props.iconWrapperStyle,
    iconWrapperClass: props.iconWrapperClass,
    dismissButton: props.dismissButton,
    dissmisOnClick: props.dissmisOnClick,
    progressBar: props.progressBar,
    onEnter: props.onEnter,
    enterDuration: props.enterDuration,
    onExit: props.onExit,
    exitDuration: props.exitDuration,
    onIdle: props.onIdle,
    pauseOnHover: props.pauseOnHover,
    unstyled: props.unstyled,
    aria: props.aria,
    enterCallback: props.enterCallback,
    updateCallback: props.updateCallback,
    exitCallback: props.exitCallback,
  })

  const notify = (body: ToastBody = 'Welcome to the Adventure!', options?: ToastOptions) => {
    return dispatcher.addToast(body, options)
  }

  const update = (body: ToastBody, options: ToastOptionsUpdate) => {
    return dispatcher.updateToast(body, options)
  }

  const dismiss = (id?: string) => {
    if (!id) return dispatcher.dismissAllToasts()
    dispatcher.dismissToast(id)
  }

  const remove = (id?: string) => {
    if (!id) return dispatcher.removeAllToasts()
    dispatcher.removeToast(id)
  }

  const custom = dispatcher.addCustom

  createEffect(() => {
    dispatcher.reorderToasts()
  })

  createEffect(() => {
    const maxToasts = props.maxToasts ?? 8
    if (maxToasts === 0 || store.toasts.length <= maxToasts) return

    const lastToast = store.toasts.at(-1)
    if (lastToast) dispatcher.dismissToast(lastToast.id)
  })

  const handleVisibilityChange = () => {
    dispatcher.handleTabChange(store.toasts)
  }

  onMount(() => {
    if (typeof document === 'undefined') return
    if (props.pauseOnTabSwitch === false) return
    document?.addEventListener('visibilitychange', handleVisibilityChange)
  })

  onCleanup(() => {
    if (typeof document === 'undefined') return
    document?.removeEventListener('visibilitychange', handleVisibilityChange)
    store.toasts.forEach(toast => {
      toast.timer?.remove()
    })
  })

  return (
    <ToastContext.Provider value={{ notify, dismiss, update, remove, custom }}>
      <Toaster dispatcher={dispatcher} />
      {props.children}
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastContext => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a <ToastProvider></ToastProvider> component')
  }
  return context
}
