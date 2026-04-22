import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px', padding: '32px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    errorMessage: { control: 'text' },
    disabled: { control: 'boolean' },
    value: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// ── Default ──────────────────────────────────────────────────────────────
export const Default: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    hint: "We'll never share your email.",
  },
};

// ── Filled ───────────────────────────────────────────────────────────────
export const Filled: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    hint: "We'll never share your email.",
    value: 'john@example.com',
  },
};

// ── Disabled ─────────────────────────────────────────────────────────────
export const Disabled: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    hint: 'This field is currently disabled.',
    disabled: true,
  },
};

// ── Error ────────────────────────────────────────────────────────────────
export const Error: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    value: 'not-an-email',
    errorMessage: 'Please enter a valid email address.',
  },
};

// ── No hint ──────────────────────────────────────────────────────────────
export const NoHint: Story = {
  args: {
    label: 'Full name',
    placeholder: 'Jane Smith',
    hint: '',
  },
};

// ── No label ─────────────────────────────────────────────────────────────
export const NoLabel: Story = {
  args: {
    label: '',
    placeholder: 'Search...',
    hint: '',
  },
};
