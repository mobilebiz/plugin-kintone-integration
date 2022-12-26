import React from 'react';
import { withTaskContext } from '@twilio/flex-ui';

import { Theme } from '@twilio-paste/core/theme';
import { Text } from '@twilio-paste/core/text';

const { FLEX_APP_KINTONE_SUB_DOMAIN, FLEX_APP_KINTONE_CUSTOMER_APP_ID } =
  process.env;

const CustomTaskItem = (props: any): JSX.Element | null => {
  if (!props.task) return null;

  // Show user page if a user exist, anything else show user create page.
  const url = props.task.attributes.recordId
    ? `https://${FLEX_APP_KINTONE_SUB_DOMAIN}.cybozu.com/k/${FLEX_APP_KINTONE_CUSTOMER_APP_ID}/show#record=${props.task.attributes.recordId}`
    : `https://${FLEX_APP_KINTONE_SUB_DOMAIN}.cybozu.com/k/${FLEX_APP_KINTONE_CUSTOMER_APP_ID}/edit?`;

  // Click kintone
  const kintoneClick = async () => {
    const number = props.task.attributes.from
      ? props.task.attributes.from.replace(/^\+81/, '0')
      : '';
    // Copy to clipboard
    await navigator.clipboard.writeText(number);
    // kintone window open
    window.open(url);
  };

  // Render
  return (
    <Theme.Provider theme='default'>
      <Text
        as='p'
        _hover={{ color: 'colorTextLink', cursor: 'pointer' }}
        margin='space30'
        onClick={kintoneClick}
      >
        kintone
      </Text>
    </Theme.Provider>
  );
};

export default withTaskContext(CustomTaskItem);
