import { For, JSX } from "solid-js";
import Toast from "./Toast";
import { ToasterProps } from "../core/types";

export default function Toaster(props: ToasterProps): JSX.Element {
  return (
    <div class="moon-toast-root" style={props.dispatcher.toasterStyle}>
      <For each={props.dispatcher.store.toasts}>
        {(toast) => (
          <Toast
            id={toast.id!}
            dispatcher={props.dispatcher}
            body={toast.body}
            duration={toast.duration}
            style={toast.style}
            wrapperClass={toast.wrapperClass}
            class={toast.class}
            iconWrapperStyle={toast.iconWrapperStyle}
            icon={toast.icon}
            timer={toast.timer}
            dismissButton={toast.dismissButton}
            dissmisOnClick={toast.dissmisOnClick}
            iconWrapperClass={toast.iconWrapperClass}
            progressBar={toast.progressBar}
            state={toast.state}
            onEnter={toast.onEnter}
            enterDuration={toast.enterDuration}
            onExit={toast.onExit}
            exitDuration={toast.exitDuration}
            onIdle={toast.onIdle}
            pauseOnHover={toast.pauseOnHover}
            unstyled={toast.unstyled}
            aria={toast.aria}
          />
        )}
      </For>
    </div>
  );
}
