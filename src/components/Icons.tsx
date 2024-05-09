const AnimatedSpinner = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width="16"
      height="16"
      style="shape-rendering: auto; display: block; background: transparent;"
    >
      <g>
        <g transform="rotate(0 50 50)">
          <rect
            x="45"
            y="5"
            rx="5"
            ry="11"
            width="10"
            height="22"
            fill="#111218"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.9090909090909091s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
        <g transform="rotate(32.72727272727273 50 50)">
          <rect
            x="45"
            y="5"
            rx="5"
            ry="11"
            width="10"
            height="22"
            fill="#111218"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.8181818181818182s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
        <g transform="rotate(65.45454545454545 50 50)">
          <rect
            x="45"
            y="5"
            rx="5"
            ry="11"
            width="10"
            height="22"
            fill="#111218"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.7272727272727273s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
        <g transform="rotate(98.18181818181819 50 50)">
          <rect
            x="45"
            y="5"
            rx="5"
            ry="11"
            width="10"
            height="22"
            fill="#111218"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.6363636363636364s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
        <g transform="rotate(130.9090909090909 50 50)">
          <rect
            x="45"
            y="5"
            rx="5"
            ry="11"
            width="10"
            height="22"
            fill="#111218"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.5454545454545454s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
        <g transform="rotate(163.63636363636363 50 50)">
          <rect
            x="45"
            y="5"
            rx="5"
            ry="11"
            width="10"
            height="22"
            fill="#111218"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.45454545454545453s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
        <g transform="rotate(196.36363636363637 50 50)">
          <rect
            x="45"
            y="5"
            rx="5"
            ry="11"
            width="10"
            height="22"
            fill="#111218"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.36363636363636365s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
        <g transform="rotate(229.0909090909091 50 50)">
          <rect
            x="45"
            y="5"
            rx="5"
            ry="11"
            width="10"
            height="22"
            fill="#111218"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.2727272727272727s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
        <g transform="rotate(261.8181818181818 50 50)">
          <rect
            x="45"
            y="5"
            rx="5"
            ry="11"
            width="10"
            height="22"
            fill="#111218"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.18181818181818182s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
        <g transform="rotate(294.54545454545456 50 50)">
          <rect
            x="45"
            y="5"
            rx="5"
            ry="11"
            width="10"
            height="22"
            fill="#111218"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.09090909090909091s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
        <g transform="rotate(327.27272727272725 50 50)">
          <rect
            x="45"
            y="5"
            rx="5"
            ry="11"
            width="10"
            height="22"
            fill="#111218"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="0s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
        <g />
      </g>
    </svg>
  );
};

const AnimatedCheckmark = () => {
  return (
    <svg
      class="mt-checkmark"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
    >
      <circle class="mt-checkmark__circle" cx="26" cy="26" r="25" fill="none" />
      <path
        class="mt-checkmark__check"
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
      />
    </svg>
  );
};

const AnimatedCrossMark = () => {
  return (
    <svg
      class="mt-crossmark"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
    >
      <circle class="mt-crossmark_circle" cx="26" cy="26" r="25" fill="none" />
      <path
        class="mt-crossmark_cross"
        fill="none"
        d="M14.1 14.1l23.8 23.8 m0,-23.8 l-23.8,23.8"
      />
    </svg>
  );
};

export { AnimatedCheckmark, AnimatedCrossMark, AnimatedSpinner };
