import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Login } from '../pages/components/Login';

export default {
  title: 'Example/Login',
  component: Login,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = (args) => <Login {...args} />;

export const WrongUsername = Template.bind({});
WrongUsername.args = {
 errorUsername:true
};

export const WrongPassword = Template.bind({});
WrongPassword.args = {
    errorPassword:true
};

export const Empty = Template.bind({});
Empty.args = {
    errorPassword:false,
    errorUsername:false
};