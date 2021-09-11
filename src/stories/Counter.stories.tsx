// YourComponent.stories.js
import { Story } from '@storybook/react';
import Counter from 'components/Counter';
import React from 'react';

// This default export determines where your story goes in the story list
export default {
  title: 'Counter',
  component: Counter,
};

const Template: Story = (args) => <Counter {...args} />;

export const CounterStory = Template.bind({});

CounterStory.args = {};
