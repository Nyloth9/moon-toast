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
    <li>Pass string or JSX as body</li>
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
</div>

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
