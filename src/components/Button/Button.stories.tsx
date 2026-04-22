import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '32px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    children: { control: 'text' },
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    error: { control: 'boolean' },
    selected: { control: 'boolean' },
    skeleton: { control: 'boolean' },
    empty: { control: 'boolean' },
    showIcon: {
      control: 'boolean',
      description: 'Show trailing icon (Figma `showIcon` property). Only applies in Default / Hover / Active / Focused / Error states.',
    },
    forceState: {
      control: 'select',
      options: [undefined, 'hover', 'active', 'focused'],
    },
  },
  args: {
    children: 'Label',
    showIcon: true,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ── Default ──────────────────────────────────────────────────────────────
export const Default: Story = {};

// ── Hover ────────────────────────────────────────────────────────────────
export const Hover: Story = {
  args: { forceState: 'hover' },
};

// ── Active (pressed) ─────────────────────────────────────────────────────
export const Active: Story = {
  args: { forceState: 'active' },
};

// ── Focused ──────────────────────────────────────────────────────────────
export const Focused: Story = {
  args: { forceState: 'focused' },
};

// ── Disabled ─────────────────────────────────────────────────────────────
export const Disabled: Story = {
  args: { disabled: true },
};

// ── Loading ──────────────────────────────────────────────────────────────
export const Loading: Story = {
  args: { loading: true },
};

// ── Error (destructive) ──────────────────────────────────────────────────
export const ErrorState: Story = {
  name: 'Error',
  args: { error: true },
};

// ── Empty ────────────────────────────────────────────────────────────────
export const Empty: Story = {
  args: { empty: true },
};

// ── Skeleton ─────────────────────────────────────────────────────────────
export const Skeleton: Story = {
  args: { skeleton: true },
};

// ── Selected ─────────────────────────────────────────────────────────────
export const Selected: Story = {
  args: { selected: true },
};

// ── Default without icon (demonstrates showIcon toggle) ──────────────────
export const DefaultNoIcon: Story = {
  name: 'Default (showIcon = false)',
  args: { showIcon: false },
};
