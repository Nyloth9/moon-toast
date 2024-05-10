import { Show, onCleanup } from 'solid-js'
import type { Toast, ToastProps } from '../core/types'

export default function Toast(props: ToastProps) {
  const d = props.dispatcher
  const dismiss = () => d.dismissToast(props.id)
  const wrapperClass = d.resolveClass('moon-toast-wrapper', props.wrapperClass)
  const toastClass = d.resolveClass('moon-toast', props.class)
  const iconWrapperClass = d.resolveClass('moon-toast-icon-wrapper', props.iconWrapperClass)
  onCleanup(() => props.timer?.remove())

  return (
    <div
      id={props.id}
      data-role="toast"
      style={d.getOffset(props.id)}
      ref={el => d.setToastRef(props.id, el)}
      onClick={event => {
        if (event.target.tagName === 'BUTTON') return
        props.dissmisOnClick && dismiss()
      }}
      onMouseEnter={() => {
        if (!props.pauseOnHover) return
        props.timer?.pause()
      }}
      onMouseLeave={() => {
        if (!props.pauseOnHover) return
        props.timer?.resume()
      }}
      class={`${wrapperClass} ${d.resolvePresenceAnimation(
        props.state,
        props.onEnter,
        props.onExit,
        props.onIdle,
      )}`.trim()}
      {...props.aria}
    >
      <Show when={props.unstyled}>
        {props.body}
        <Show when={props.timer && props.progressBar?.showDefault}>
          <div
            data-role="progress"
            style={props.progressBar?.style}
            class={props.progressBar?.className}
          />
        </Show>
      </Show>
      <Show when={!props.unstyled}>
        <div class={toastClass} style={props.style}>
          <Show when={props.icon}>
            <div class={iconWrapperClass} style={props.iconWrapperStyle}>
              {props.icon}
            </div>
          </Show>
          {props.body}
          <Show when={props.dismissButton?.show && props.dismissButton?.type === 'inline'}>
            <button
              type="button"
              onClick={dismiss}
              style={props.dismissButton?.style}
              class={props.dismissButton?.className ?? 'moon-toast-dismiss-button_inline'}
            >
              <span class="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </Show>

          <Show when={props.timer && props.progressBar?.showDefault}>
            <div
              data-role="progress"
              style={props.progressBar?.style}
              class={props.progressBar?.className}
            />
          </Show>
        </div>
      </Show>
      <Show when={props.dismissButton?.show && props.dismissButton?.type === 'floating'}>
        <button
          type="button"
          onClick={dismiss}
          style={props.dismissButton?.style}
          class={props.dismissButton?.className ?? 'moon-toast-dismiss-button_floating'}
        >
          <span class="sr-only">Close</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </Show>
    </div>
  )
}
