<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=solid-moon-toast&background=tiles&project=%20" alt="solid-moon-toast">
</p>

<!-- # solid-moon-toast -->

<div dir="auto">
<p align="center">
<strong>
A SolidJS toast library
</strong>
</p>
<p align="center" >
<a href="">Check out the Demo</a>
</p>
</div>

<div class="markdown-heading">
<h2 tabindex="-1" class="heading-element" dir="auto">Features</h2>
</div>
<ul dir="auto">
<li><strong>Solidjs context api</strong>
  <ul>
    <li>Uses the context api to create its own scope</li>
    <li>Exposes five methods: notify, dismiss, update, remove and custom</li>
  </ul>
</li>
<li><strong>Toast features</strong>
  <ul>
    <li>Easily customizable</li>
    <li>Pass string or JSX as toast body</li>
    <li>Control the position</li>
    <li>Update the toast and have the other toasts react to the height changes</li>
    <li>Custom entrance and exit animations</li>
    <li>On enter, update and exit callbacks</li>
    <li>Automatic toast screen overflow prevention</li>
    <li>Pause on hover / pause on tab change</li>
  </ul>
</li>
<li><strong>Customizable Progress Bar</strong>
  <ul>
    <li>Customize the look and the position</li>
    <li>Customize the progress animation</li>
    <li>Play, pause and reset controls</li>
  </ul>
</li>
</ul>

## Quick start

Installation:

```bash
npm i solid-moon-toast
# or
yarn add solid-moon-toast
# or
pnpm add solid-moon-toast
```

Usage:

```tsx
// App.tsx
import { ToastProvider } from 'solid-moon-toast'
import ToastsPage from './ToastsPage'

const App = () => {
  return (
    <ToastProvider>
      <ToastsPage />
    </ToastProvider>
  )
}

export default App
```

```tsx
// ToastsPage.tsx
import { useToast } from "solid-moon-toast";

const ToastsPage = () => {
  const { notify } = useToast();

  return (
    <div>
      <button onClick={() => notify("🎉 Operation Successful!")}>
    </div>
  )
}

```

<div class="markdown-heading">
  <h2 tabindex="-1" class="heading-element" dir="auto">Documentation</h2>
</div>

<div class="markdown-heading" dir="auto">
  <h3 tabindex="-1" dir="auto">Global options</h3>
</div>

<p>Global options apply to the toasts root element, all toast container elements, and all toasts. These options can be overriden on individual toasts.</p>

```tsx
<ToastProvider
// OPTIONS THAT CAN BE APPLIED ONLY GLOBALY:
  gutter={16} // distance between the toasts (global only)
  maxToasts={10} // set to 0 if you dont want to limit the number of toasts (global only)
  offsetX={16} // distance from the screen edge on the X axis (global only)
  offsetY={16} // distance from the screen edge on the Y axis (global only)
  positionX="right" // position on the X axis, accepts: left | center | right (global only)
  positionY="top" // position on the Y axis, accepts: top | bottom (global only)
  toasterStyle={{
   "background-color": "blue", // custom style for the toaster (global only)
  }}
  pauseOnTabSwitch={true} // pause the toast timer when switching browser tabs (global only)

// OPTIONS THAT CAN BE APPLIED GLOBALLY AND THEN CHANGED PER TOAST:
  class={{ className: "my-toast-class", replaceDefault: true }} // custom toast class, choose to replace default or not
  style={{ "background-color": "blue" }} // custom style for the toast
  dismissButton={{
   className: "my-dismiss-class", // custom class for dismiss button
   show: true, // show dismiss button
   style: { color: "red" }, // custom style for dismiss button
   type: "floating", // floating or inline
  }}
  dissmisOnClick={false} // dismiss toast when clicking on the body
  duration="infinite" // duration in ms or infinite
  enterCallback={() => null} // pass a function that will be called on toast enter
  updateCallback={() => null} // pass a function that will be called on toast update
  exitCallback={() => null} // pass a function that will be called on toast exit
  onEnter="my-entrance-animation" // class that will be applied to the toast container on enter
  onIdle="my-idle-animation" // class that will be applied to the toast container when idle
  onExit="my-exit-animation" // class that will be applied to the toast container on exit
  enterDuration={500} // entrance duration; should be the same as the duration of the entrance animation
  exitDuration={500} // entrance duration; should be the same as the duration of the entrance animation
  pauseOnHover={true} // pause the toast timer when hovering over it
  progressBar={{
   showDefault: true, // show the default progress bar
   className: "my-progress-bar-class", // custom class for progress bar
   style: { "background-color": "red" }, // custom style for progress bar
   animate: { // pass the arguments to the el.animate() method which will be called on the progress bar
      keyframes: [{ width: "0%" }, { width: "100%" }], // pass the keyframes, the options or both
      options: { // pass the keyframes, the options or both
        duration: 5000,
        fill: "forwards",
        easing: "linear",
      },
   },
  }}
  wrapperClass={{
   className: "my-wrapper-class",
   replaceDefault: false,
  }} // custom wrapper class, choose to replace default or not
  icon={<svg></svg>} // custom icon for the toast, accepts a JSX element
  iconWrapperClass={{
   className: "my-icon-wrapper-class", // custom icon wrapper class
   replaceDefault: false, // replace default icon wrapper
  }}
  iconWrapperStyle={{
   "background-color": "red", // custom style for the icon wrapper
  }}
  aria={{ "aria-live": "polite", role: "status" }} // accessibility props
  unstyled={false} // remove all default styles of the toast, doesn't affect the toast wrapper
>
```
