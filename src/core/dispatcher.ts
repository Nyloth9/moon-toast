import { produce } from 'solid-js/store'
import {
  CustomToast,
  CustomToastArgs,
  DispatcherConstructorArgs,
  Offset,
  ReturnValue,
  Toast,
  ToastBody,
  ToastFactoryOptions,
  ToastOptions,
  ToastOptionsUpdate,
} from './types'
import { JSX } from 'solid-js/jsx-runtime'
import { AnimatedCheckmark, AnimatedCrossMark, AnimatedSpinner } from '../components/Icons.jsx'

export default class Dispatcher {
  #toastCounter = 1
  #gutter
  #positionY
  #positionX
  #offsetY
  #offsetX
  store
  setStore
  duration
  toasterStyle
  style
  wrapperClass
  class
  iconWrapperStyle
  iconWrapperClass
  dismissButton
  dismissOnClick
  icon
  progressBar
  onEnter
  enterDuration
  onExit
  exitDuration
  onIdle
  pauseOnHover
  unstyled
  aria
  enterCallback
  updateCallback
  exitCallback

  constructor(options: DispatcherConstructorArgs) {
    this.store = options.store
    this.setStore = options.setStore
    this.#gutter = options.gutter || 16
    this.#positionY = options.positionY || 'top'
    this.#positionX = options.positionX || 'right'
    this.#offsetX = options.offsetX || 16
    this.#offsetY = options.offsetY || 16
    this.toasterStyle = this.#resolveToasterStyles(options.toasterStyle)
    this.style = options.style
    this.wrapperClass = {
      replaceDefault: options.wrapperClass?.replaceDefault ?? false,
      class: options.wrapperClass?.className ?? '',
    }
    this.class = {
      replaceDefault: options.class?.replaceDefault ?? false,
      class: options.class?.className ?? '',
    }
    this.duration = options.duration || 5000
    this.dismissButton = {
      show: options.dismissButton?.show ?? true,
      style: options.dismissButton?.style,
      className: options.dismissButton?.className,
      type: options.dismissButton?.type || 'floating',
    }
    this.dismissOnClick = options.dissmisOnClick ?? false
    this.icon = options.icon
    this.iconWrapperStyle = options.iconWrapperStyle
    this.iconWrapperClass = {
      replaceDefault: options.iconWrapperClass?.replaceDefault ?? false,
      class: options.iconWrapperClass?.className ?? '',
    }
    this.progressBar = {
      show: options.progressBar?.showDefault ?? true,
      style: options.progressBar?.style,
      className: options.progressBar?.className ?? 'moon-toast-progress-bar',
      animate: {
        keyframes: options.progressBar?.animate?.keyframes || [{ width: '100%' }, { width: '0' }],
        options: this.#resolveAnimationOptions(
          options.progressBar?.animate?.options?.duration || this.duration,
          options.progressBar?.animate?.options,
        ),
      },
    }
    this.onEnter = options.onEnter
    this.enterDuration = options.enterDuration ?? 300
    this.onExit = options.onExit
    this.exitDuration = options.exitDuration ?? 100
    this.onIdle = options.onIdle
    this.pauseOnHover = options.pauseOnHover ?? true
    this.unstyled = options.unstyled ?? false
    ;(this.aria = {
      role: options.aria?.role ?? 'status',
      'aria-live': options.aria?.['aria-live'] ?? 'polite',
    }),
      (this.enterCallback = options.enterCallback)
    this.updateCallback = options.updateCallback
    this.exitCallback = options.exitCallback
  }

  #toastFactory(
    action: 'add' | 'update',
    body: ToastBody,
    options?: ToastFactoryOptions,
  ): Toast | undefined {
    const toasts = this.store.toasts
    const existingToast = toasts.find(toast => toast.id === options?.id)
    const id = options?.id || `toast-${this.#toastCounter++}`
    existingToast?.timer?.remove()

    if (action === 'add' && existingToast) {
      console.log(
        `%cError creating toast: Toast with the provided id "${options?.id}" already exists. Did you mean to use %cupdate()%c instead?`,
        'color: red; font-weight: bold;',
        'color: blue; font-weight: bold;',
        'color: red; font-weight: bold;',
      )
      throw new Error('Invalid function call.')
    }

    if (action === 'update' && !options?.id) {
      console.log(
        '%cError updating toast: No id provided. Did you mean to use %notify()%c instead?',
        'color: red; font-weight: bold;',
        'color: blue; font-weight: bold;',
        'color: red; font-weight: bold;',
      )
      throw new Error('Invalid function call.')
    }

    if (action === 'update' && !existingToast) return

    switch (options?.type) {
      case 'success':
        options = {
          ...options,
          progressBar: {
            style: { background: '#34a853', ...options?.progressBar?.style },
          },
          icon: AnimatedCheckmark(),
        }
        break
      case 'error':
        options = {
          ...options,
          progressBar: {
            style: { background: '#ea4335', ...options?.progressBar?.style },
          },
          icon: AnimatedCrossMark(),
        }
        break
      case 'loading':
        options = {
          ...options,
          icon: AnimatedSpinner(),
          duration: options?.duration || 'infinite',
        }
        break
    }

    return {
      id,
      body,
      timer: options?.timer || this.#resolveTimer(() => this.dismissToast(id), options?.duration),
      duration: options?.duration || existingToast?.duration || this.duration,
      dismissButton: {
        show:
          options?.dismissButton?.show ??
          existingToast?.dismissButton?.show ??
          this.dismissButton.show,
        style:
          options?.dismissButton?.style ||
          existingToast?.dismissButton?.style ||
          this.dismissButton.style,
        className:
          options?.dismissButton?.className ??
          existingToast?.dismissButton?.className ??
          this.dismissButton.className,
        type:
          options?.dismissButton?.type ||
          existingToast?.dismissButton?.type ||
          this.dismissButton.type,
      },
      dissmisOnClick:
        options?.dissmisOnClick ?? existingToast?.dissmisOnClick ?? this.dismissOnClick,
      style: options?.style || existingToast?.style || this.style,
      wrapperClass: {
        replaceDefault:
          options?.wrapperClass?.replaceDefault ??
          existingToast?.wrapperClass?.replaceDefault ??
          this.wrapperClass.replaceDefault,
        className:
          options?.wrapperClass?.className ??
          existingToast?.wrapperClass?.className ??
          this.wrapperClass.class,
      },
      class: {
        replaceDefault:
          options?.class?.replaceDefault ??
          existingToast?.class?.replaceDefault ??
          this.class.replaceDefault,
        className: options?.class?.className ?? existingToast?.class?.className ?? this.class.class,
      },
      progressBar: {
        showDefault:
          options?.progressBar?.showDefault ??
          existingToast?.progressBar?.showDefault ??
          this.progressBar.show,
        style:
          options?.progressBar?.style ||
          existingToast?.progressBar?.style ||
          this.progressBar.style,
        className:
          options?.progressBar?.className ??
          existingToast?.progressBar?.className ??
          this.progressBar.className,
        animate: {
          keyframes:
            options?.progressBar?.animate?.keyframes ||
            existingToast?.progressBar?.animate?.keyframes ||
            this.progressBar.animate.keyframes,
          options: this.#resolveAnimationOptions(
            options?.progressBar?.animate?.options?.duration ||
              options?.duration ||
              existingToast?.progressBar?.animate?.options?.duration ||
              this.duration,
            options?.progressBar?.animate?.options ||
              existingToast?.progressBar?.animate?.options ||
              this.progressBar.animate.options,
          ),
        },
      },
      icon: options?.icon || existingToast?.icon || this.icon,
      iconWrapperStyle:
        options?.iconWrapperStyle || existingToast?.iconWrapperStyle || this.iconWrapperStyle,
      iconWrapperClass: {
        replaceDefault:
          options?.iconWrapperClass?.replaceDefault ??
          existingToast?.iconWrapperClass?.replaceDefault ??
          this.iconWrapperClass.replaceDefault,
        className:
          options?.iconWrapperClass?.className ??
          existingToast?.iconWrapperClass?.className ??
          this.iconWrapperClass.class,
      },
      onEnter: options?.onEnter ?? existingToast?.onEnter ?? this.onEnter,
      enterDuration: options?.enterDuration ?? existingToast?.enterDuration ?? this.enterDuration,
      onExit: options?.onExit ?? existingToast?.onExit ?? this.onExit,
      exitDuration: options?.exitDuration ?? existingToast?.exitDuration ?? this.exitDuration,
      onIdle: options?.onIdle ?? existingToast?.onIdle ?? this.onIdle,
      state: 'entering',
      pauseOnHover: options?.pauseOnHover ?? existingToast?.pauseOnHover ?? this.pauseOnHover,
      unstyled: options?.unstyled ?? existingToast?.unstyled ?? this.unstyled,
      aria: {
        role: options?.aria?.role ?? existingToast?.aria?.role ?? this.aria.role,
        'aria-live':
          options?.aria?.['aria-live'] ??
          existingToast?.aria?.['aria-live'] ??
          this.aria['aria-live'],
      },
      enterCallback: options?.enterCallback || existingToast?.enterCallback || this.enterCallback,
      updateCallback:
        options?.updateCallback || existingToast?.updateCallback || this.updateCallback,
      exitCallback: options?.exitCallback || existingToast?.exitCallback || this.exitCallback,
    }
  }

  addToast(body: ToastBody, options?: ToastOptions) {
    const newToast = this.#toastFactory('add', body, options)
    this.setStore('toasts', prev => [newToast!, ...prev])
    const toastRef = this.#getToastRef(newToast!.id)

    setTimeout(() => {
      this.#applyState(newToast!.id, 'idle')
    }, options?.enterDuration || this.enterDuration)

    this.#animateProgressBar(newToast!, toastRef!)
    newToast?.enterCallback?.()

    return {
      id: newToast!.id,
      ref: toastRef!,
      timer: this.#setTimerControls(newToast!),
    }
  }

  updateToast(body: ToastBody, options: ToastOptionsUpdate): ReturnValue | undefined {
    const updatedToast = this.#toastFactory('update', body, {
      ...options,
      progressBar: {
        ...options.progressBar,
        animate: {
          keyframes: options.progressBar?.animate?.keyframes || undefined,
          options: options.progressBar?.animate?.options || undefined,
        },
      },
      onEnter: options.onEnter ?? '',
    })
    if (!updatedToast) return

    this.setStore(
      produce(state => {
        state.toasts = state.toasts.map((toast: Toast) => {
          if (toast.id !== options.id) return toast
          return updatedToast
        })
      }),
    )

    const ref = this.#getToastRef(options.id)
    this.#animateProgressBar(updatedToast, ref!)
    updatedToast.updateCallback?.()

    return {
      id: options.id,
      ref: ref!,
      timer: this.#setTimerControls(updatedToast),
    }
  }

  addCustom: CustomToast = (func, data?) => {
    const args: CustomToastArgs = {
      id: data?.id || `toast-${this.#toastCounter++}`,
      duration: data?.duration || this.duration,
      timer: this.#resolveTimer(() => this.dismissToast(args.id), data?.duration),
    }

    const options = {
      ...data,
      id: args.id,
      timer: args.timer,
      duration: args.duration,
      unstyled: true,
      pauseOnHover: data?.pauseOnHover ?? false,
      dismissButton: {
        show: data?.dismissButton?.show ?? false,
        style: data?.dismissButton?.style,
        className: data?.dismissButton?.className ?? '',
        type: data?.dismissButton?.type ?? 'floating',
      },
      dissmisOnClick: data?.dissmisOnClick ?? false,
      progressBar: {
        showDefault: data?.progressBar?.showDefault ?? false,
      },
    }

    const toast = func(args)
    this.addToast(toast, options)

    const ref = this.#getToastRef(args.id)

    return { id: args.id, ref }
  }

  dismissToast(id: string) {
    const toastRef = this.#getToastRef(id)
    const toast = this.store.toasts.find(toast => toast.id === id)
    if (!toastRef || !toast) return

    toastRef.style.pointerEvents = 'none'
    this.#applyState(id, 'exiting')
    toast.exitCallback?.()

    setTimeout(() => {
      this.setStore(
        produce(state => {
          state.toasts = state.toasts.filter(toast => toast.id !== id)
          state.refArray = state.refArray.filter(ref => ref.id !== id)
        }),
      )
    }, toast.exitDuration || this.exitDuration)
  }

  dismissAllToasts() {
    this.store.refArray.forEach(toastRef => {
      toastRef.style.pointerEvents = 'none'
    })
    this.setStore(
      'toasts',
      produce(toasts =>
        toasts.forEach(toast => {
          toast.timer?.remove()
          return (toast.state = 'exiting')
        }),
      ),
    )

    setTimeout(() => {
      this.setStore(
        produce(state => {
          state.toasts = []
          state.refArray = []
        }),
      )
    }, this.exitDuration)
  }

  removeToast(id: string) {
    this.setStore(
      produce(state => {
        state.toasts = state.toasts.filter(toast => {
          return toast.id !== id
        })
        state.refArray = state.refArray.filter(ref => ref.id !== id)
      }),
    )
  }

  removeAllToasts() {
    this.setStore(
      produce(state => {
        state.toasts = []
        state.refArray = []
      }),
    )
  }

  reorderToasts() {
    let accumulatedHeight = 0

    const offsets = this.store.refArray.map(ref => {
      const newOffset = {
        id: ref.id,
        offset: accumulatedHeight,
      }
      accumulatedHeight = ref.offsetHeight + accumulatedHeight + this.#gutter
      return newOffset
    })

    this.setStore('offsetsArray', offsets)
    this.#preventHeightOverflow()

    if (document?.visibilityState === 'hidden') {
      this.store.toasts.forEach(toast => {
        toast.timer?.pause()
      })
    }
  }

  getOffset(id: string) {
    return {
      [this.#positionY]: `${
        this.store.offsetsArray.find((item: Offset) => item.id === id)?.offset
      }px`,
    }
  }

  resolvePresenceAnimation(
    state: 'entering' | 'idle' | 'exiting',
    onEnter: string | undefined,
    onExit: string | undefined,
    onIdle: string | undefined,
  ) {
    if (this.#positionX === 'right') {
      if (state === 'entering') return onEnter ?? 'moon-toast--slide-in-right'
      if (state === 'exiting') return onExit ?? 'moon-toast--slide-out-right'
      return onIdle ?? ''
    }

    if (this.#positionX === 'center' && this.#positionY === 'top') {
      if (state === 'entering') return onEnter ?? 'moon-toast--slide-in-top'
      if (state === 'exiting') return onExit ?? 'moon-toast--slide-out-top'
      return onIdle ?? ''
    }

    if (this.#positionX === 'center') {
      if (state === 'entering') return onEnter ?? 'moon-toast--slide-in-bottom'
      if (state === 'exiting') return onExit ?? 'moon-toast--slide-out-bottom'
      return onIdle ?? ''
    }

    if (this.#positionX === 'left') {
      if (state === 'entering') return onEnter ?? 'moon-toast--slide-in-left'
      if (state === 'exiting') return onExit ?? 'moon-toast--slide-out-left'
      return onIdle ?? ''
    }
  }

  handleTabChange(toasts: Toast[]) {
    if (document?.visibilityState === 'visible')
      return toasts.forEach(toast => {
        if (toast.timer?.static) return
        toast.timer?.resume()
      })

    return this.store.toasts.forEach(toast => {
      if (toast.timer?.static) return
      toast.timer?.pause()
    })
  }

  setToastRef = (id: string, ref: HTMLDivElement) => {
    const currentRef = this.#getToastRef(id)

    if (currentRef)
      return this.setStore(
        'refArray',
        this.store.refArray.map(storedRef => (storedRef === currentRef ? ref : storedRef)),
      )

    this.setStore('refArray', prev => [ref, ...prev])
  }

  resolveClass(
    defaultClass: string,
    newClass?: { className: string; replaceDefault?: boolean },
  ): string {
    if (!newClass) return defaultClass
    return newClass.replaceDefault
      ? newClass.className
      : `${defaultClass} ${newClass.className}`.trim()
  }

  #setTimerControls(toast: Toast) {
    return {
      pause: () => {
        toast.timer?.pause()
        toast.timer?.setStatic(true)
      },
      play: () => {
        toast.timer?.resume()
        toast.timer?.setStatic(false)
      },
      reset: () => {
        toast.timer?.reset()
        toast.timer?.setStatic(true)
      },
    }
  }

  #resolveAnimationOptions(
    duration: string | number | CSSNumericValue | undefined,
    options: KeyframeAnimationOptions = { fill: 'forwards', easing: 'linear' },
  ) {
    if (duration === 'infinite') return { ...options, duration: 0 }
    return { ...options, duration }
  }

  #getToastRef(id: string) {
    return this.store.refArray.find(ref => ref.id === id)
  }

  #applyState(id: string, state: 'entering' | 'exiting' | 'idle') {
    this.setStore('toasts', toasts => toasts.id === id, 'state', state)
  }

  #resolveTimer(
    callback: () => void,
    duration: number | 'infinite' = this.duration,
  ): Timer | undefined {
    if (duration === 'infinite') return undefined
    return new Timer(callback, duration)
  }

  #animateProgressBar(toast: Toast, ref: HTMLElement) {
    const progressBar = ref.querySelector("[data-role='progress']")

    const animationId = progressBar?.animate(
      toast.progressBar!.animate!.keyframes!,
      toast.progressBar!.animate!.options,
    )

    toast.timer?.setAnimation(animationId)
  }

  #preventHeightOverflow() {
    const refArray = this.store.refArray
    if (refArray.length <= 1) return

    const screenHeight = window?.innerHeight
    if (!screenHeight) return

    const lastToast = refArray.at(-1)
    if (!lastToast) return
    const lastToastPosition = lastToast.getBoundingClientRect()?.top - window.scrollY
    const lastToastHeight = lastToast.offsetHeight
    const isToastNearScreenEdge =
      (this.#positionY === 'top' && lastToastPosition + lastToastHeight > screenHeight * 0.85) ||
      (this.#positionY === 'bottom' && lastToastPosition < screenHeight * 0.05)

    if (isToastNearScreenEdge) {
      this.dismissToast(lastToast.id)
    }
  }

  #resolveToasterStyles(toasterStyle?: JSX.CSSProperties) {
    const getJustifyContent = () => {
      if (this.#positionX === 'center') return 'center'
      if (this.#positionX === 'left') return 'flex-start'
      return 'flex-end'
    }

    const getAlignItems = () => {
      if (this.#positionY === 'top') return 'flex-start'
      return 'flex-end'
    }

    return {
      ...toasterStyle,
      top: `${this.#offsetY}px`,
      bottom: `${this.#offsetY}px`,
      left: `${this.#offsetX}px`,
      right: `${this.#offsetX}px`,
      'justify-content': getJustifyContent(),
      'align-items': getAlignItems(),
    }
  }
}

export class Timer {
  id: number | undefined
  static: boolean
  private animation: Animation | undefined
  private duration: number
  private start: number
  private remaining: number
  private callback: () => void

  constructor(callback: () => void, delay: number) {
    this.id = undefined
    this.static = false
    this.duration = delay
    this.start = Date.now()
    this.remaining = delay
    this.callback = callback
    this.resume()
  }

  setStatic(arg: boolean) {
    this.static = arg
  }

  setAnimation(animation: Animation | undefined) {
    this.animation = animation
  }

  pause() {
    if (this.id !== undefined) {
      window.clearTimeout(this.id)
      this.id = undefined
      this.animation?.pause()
      this.remaining -= Date.now() - this.start
    }
  }

  resume() {
    if (this.id === undefined) {
      this.start = Date.now()
      this.animation?.play()
      this.id = window.setTimeout(this.callback, this.remaining)
    }
  }

  remove() {
    if (this.id !== undefined) {
      window.clearTimeout(this.id)
    }
  }

  reset() {
    this.pause()
    this.animation?.cancel()
    this.remaining = this.duration
  }
}
