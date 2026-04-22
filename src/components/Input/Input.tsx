import React, { useState } from 'react';

type InputState = 'default' | 'hover' | 'focused' | 'filled' | 'disabled' | 'error';

export interface InputProps {
  /** Field label shown above the input */
  label?: string;
  /** Placeholder text shown when empty */
  placeholder?: string;
  /** Helper text shown below the input */
  hint?: string;
  /** Error message — replaces hint and triggers error state */
  errorMessage?: string;
  /** Disables the input */
  disabled?: boolean;
  /** Controlled value */
  value?: string;
  /** onChange callback */
  onChange?: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({
  label = 'Label',
  placeholder = 'Placeholder',
  hint = 'Hint text goes here',
  errorMessage,
  disabled = false,
  value: controlledValue,
  onChange,
}) => {
  const [value, setValue] = useState(controlledValue ?? '');
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isError = !!errorMessage;
  const isFilled = value.length > 0;

  const getState = (): InputState => {
    if (disabled) return 'disabled';
    if (isError) return 'error';
    if (focused) return 'focused';
    if (isFilled) return 'filled';
    if (hovered) return 'hover';
    return 'default';
  };

  const state = getState();

  const borderColor: Record<InputState, string> = {
    default:  'var(--input-border-default)',
    hover:    'var(--color-border-strong)',
    focused:  'var(--color-interactive-primary)',
    filled:   'var(--input-border-default)',
    disabled: 'var(--input-border-default)',
    error:    'var(--input-border-error)',
  };

  const labelColor: Record<InputState, string> = {
    default:  'var(--input-text)',
    hover:    'var(--input-text)',
    focused:  'var(--color-interactive-primary)',
    filled:   'var(--input-text)',
    disabled: 'var(--color-text-disabled)',
    error:    'var(--color-error)',
  };

  const borderWidth = focused || isError ? 2 : 1;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-xs)',
      width: '100%',
      minWidth: '280px',
      fontFamily: 'var(--font-family-sans)',
    }}>
      {label && (
        <label style={{
          fontSize: 'var(--font-size-label-lg)',
          fontWeight: 'var(--font-weight-medium)' as React.CSSProperties['fontWeight'],
          lineHeight: 'var(--line-height-normal)',
          color: labelColor[state],
          cursor: disabled ? 'not-allowed' : 'default',
        }}>
          {label}
        </label>
      )}

      <input
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e.target.value);
        }}
        style={{
          width: '100%',
          padding: 'var(--space-sm) var(--space-lg)',
          fontSize: 'var(--font-size-body-md)',
          fontFamily: 'var(--font-family-sans)',
          fontWeight: 'var(--font-weight-regular)' as React.CSSProperties['fontWeight'],
          lineHeight: 'var(--line-height-normal)',
          color: disabled ? 'var(--color-text-disabled)' : 'var(--input-text)',
          backgroundColor: disabled ? 'var(--color-bg-tertiary)' : 'var(--input-bg)',
          border: `${borderWidth}px solid ${borderColor[state]}`,
          borderRadius: 'var(--border-radius-md)',
          outline: 'none',
          boxSizing: 'border-box',
          cursor: disabled ? 'not-allowed' : 'text',
          transition: 'border-color 0.15s ease, background-color 0.15s ease',
        }}
      />

      {(hint || errorMessage) && (
        <span style={{
          fontSize: 'var(--font-size-label-md)',
          fontFamily: 'var(--font-family-sans)',
          fontWeight: 'var(--font-weight-regular)' as React.CSSProperties['fontWeight'],
          lineHeight: 'var(--line-height-normal)',
          color: isError ? 'var(--color-error)' : 'var(--input-placeholder)',
        }}>
          {isError ? errorMessage : hint}
        </span>
      )}
    </div>
  );
};

export default Input;
