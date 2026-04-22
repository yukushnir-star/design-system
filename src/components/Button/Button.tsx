import React, { useState } from 'react';

type ButtonState =
  | 'default'
  | 'hover'
  | 'active'
  | 'focused'
  | 'disabled'
  | 'loading'
  | 'error'
  | 'empty'
  | 'skeleton'
  | 'selected';

/** Default trailing icon — chevron-right, 16×16, uses currentColor. Matches the arrow in the Figma design. */
const DefaultIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    focusable="false"
    style={{ display: 'block' }}
  >
    <path
      d="M5.5 3 L10.5 8 L5.5 13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export interface ButtonProps {
  /** Button label / content. Defaults to "Label" to mirror the Figma source. */
  children?: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Native button type */
  type?: 'button' | 'submit' | 'reset';
  /** Disables the button and blocks interaction */
  disabled?: boolean;
  /** Shows "Loading…" with dimmed opacity and blocks interaction (matches Figma Loading variant) */
  loading?: boolean;
  /** Destructive / error variant (red background) */
  error?: boolean;
  /** Toggle-pressed / selected state (matches Figma Selected variant) */
  selected?: boolean;
  /** Render as a skeleton placeholder — gray pill with inner bar */
  skeleton?: boolean;
  /** Empty-state placeholder (bg-tertiary, 1px default border, disabled-colored text, no icon) */
  empty?: boolean;
  /** Show the trailing icon. Matches Figma `showIcon` property. Default true. */
  showIcon?: boolean;
  /** Icon to render. Defaults to a chevron-right arrow. */
  icon?: React.ReactNode;
  /** Force visual state — used in docs/stories; overrides interaction-derived states. */
  forceState?: 'hover' | 'active' | 'focused';
  /** Accessible label (useful when the button has no visible text) */
  'aria-label'?: string;
}

/** Icon only renders in these states (mirrors the Figma condition exactly). */
const ICON_STATES: ButtonState[] = ['default', 'hover', 'active', 'focused', 'error'];

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  error = false,
  selected = false,
  skeleton = false,
  empty = false,
  showIcon = true,
  icon,
  forceState,
  ...rest
}) => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const [focused, setFocused] = useState(false);

  const getState = (): ButtonState => {
    if (skeleton) return 'skeleton';
    if (disabled) return 'disabled';
    if (loading) return 'loading';
    if (error) return 'error';
    if (selected) return 'selected';
    if (empty) return 'empty';
    if (forceState === 'focused' || focused) return 'focused';
    if (forceState === 'active' || active) return 'active';
    if (forceState === 'hover' || hovered) return 'hover';
    return 'default';
  };

  const state = getState();

  const bg: Record<ButtonState, string> = {
    default:  'var(--button-bg-default)',
    hover:    'var(--button-bg-hover)',
    active:   'var(--button-bg-hover)',
    focused:  'var(--button-bg-default)',
    disabled: 'var(--color-bg-tertiary)',
    loading:  'var(--button-bg-default)',
    error:    'var(--color-error)',
    empty:    'var(--color-bg-tertiary)',
    skeleton: 'var(--color-bg-tertiary)',
    selected: 'var(--color-interactive-primary)',
  };

  const color: Record<ButtonState, string> = {
    default:  'var(--button-text)',
    hover:    'var(--button-text)',
    active:   'var(--button-text)',
    focused:  'var(--button-text)',
    disabled: 'var(--color-text-disabled)',
    loading:  'var(--button-text)',
    error:    'var(--button-text)',
    empty:    'var(--color-text-disabled)',
    skeleton: 'transparent',
    selected: 'var(--button-text)',
  };

  const border: Record<ButtonState, string> = {
    default:  '2px solid transparent',
    hover:    '2px solid transparent',
    active:   '2px solid transparent',
    focused:  '2px solid var(--color-interactive-primary)',
    disabled: '2px solid transparent',
    loading:  '2px solid transparent',
    error:    '2px solid transparent',
    empty:    '1px solid var(--color-border-default)',
    skeleton: '2px solid transparent',
    selected: '2px solid var(--color-interactive-primary)',
  };

  const opacity: Record<ButtonState, number> = {
    default:  1,
    hover:    1,
    active:   0.85,
    focused:  1,
    disabled: 1,
    loading:  0.7,
    error:    1,
    empty:    1,
    skeleton: 1,
    selected: 1,
  };

  const minWidth: Record<ButtonState, string | undefined> = {
    default:  '140px',
    hover:    '140px',
    active:   '140px',
    focused:  '140px',
    disabled: '140px',
    loading:  '140px',
    error:    '140px',
    empty:    undefined,
    skeleton: '110px',
    selected: undefined,
  };

  const gap: Record<ButtonState, string> = {
    default:  'var(--space-xs)',
    hover:    'var(--space-xs)',
    active:   'var(--space-xs)',
    focused:  'var(--space-xs)',
    disabled: '0',
    loading:  '0',
    error:    'var(--space-xs)',
    empty:    '0',
    skeleton: '0',
    selected: '0',
  };

  const cursor = disabled
    ? 'not-allowed'
    : loading
      ? 'progress'
      : skeleton
        ? 'default'
        : 'pointer';

  const shouldShowIcon = showIcon && ICON_STATES.includes(state);
  const iconEl = icon ?? <DefaultIcon />;

  const renderContent = () => {
    if (state === 'skeleton') {
      return (
        <span
          aria-hidden
          style={{
            display: 'block',
            width: 60,
            height: 12,
            borderRadius: 4,
            backgroundColor: '#d1d6de',
          }}
        />
      );
    }
    if (state === 'loading') {
      return <span>Loading…</span>;
    }
    const label = children ?? 'Label';
    return (
      <>
        <span>{label}</span>
        {shouldShowIcon && <span style={{ display: 'inline-flex' }}>{iconEl}</span>}
      </>
    );
  };

  return (
    <button
      type={type}
      disabled={disabled || loading || skeleton}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      aria-pressed={selected || undefined}
      aria-busy={loading || undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: gap[state],
        minWidth: minWidth[state],
        minHeight: '56px',
        padding: 'var(--space-lg) var(--space-2xl)',
        fontFamily: 'var(--font-family-sans)',
        fontSize: 'var(--font-size-body-md)',
        fontWeight: (state === 'loading'
          ? 'var(--font-weight-regular)'
          : 'var(--font-weight-medium)') as React.CSSProperties['fontWeight'],
        lineHeight: 'var(--line-height-normal)',
        color: color[state],
        backgroundColor: bg[state],
        border: border[state],
        borderRadius: 'var(--border-radius-full)',
        outline: 'none',
        opacity: opacity[state],
        cursor,
        userSelect: 'none',
        transition:
          'background-color 0.15s ease, border-color 0.15s ease, opacity 0.15s ease',
        animation:
          state === 'skeleton'
            ? 'button-skeleton-pulse 1.5s ease-in-out infinite'
            : 'none',
      }}
      {...rest}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
