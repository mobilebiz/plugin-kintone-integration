import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';

import CustomTaskItem from './components/CustomTaskItem/CustomTaskItem';

const PLUGIN_NAME = 'KintoneIntegrationPlugin';

export default class KintoneIntegrationPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   */
  async init(flex: typeof Flex, manager: Flex.Manager): Promise<void> {
    // Add the kintone link to TaskListItem component.
    flex.TaskListItem.Content.add(
      <CustomTaskItem key='custom-task-item-component' />,
    );
  }
}
