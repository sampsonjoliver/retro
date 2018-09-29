import * as React from 'react';

import { SprintService as SprintServiceType } from '../services/sprint';
import { Icon, Button } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import { inject, observer } from 'mobx-react';

interface Props extends ButtonProps {
  SprintService?: SprintServiceType;
}

const SprintRolloverButton = (props: Props) => {
  const { SprintService, ...rest } = props;

  return (
    <Button
      color={
        props.SprintService!.isCurrentSprintEnded ? 'secondary' : 'default'
      }
      variant="extendedFab"
      onClick={() => props.SprintService!.rolloverSprint()}
      {...rest}
    >
      <Icon>loop</Icon>
      Rollover
    </Button>
  );
};

const injectedSprintRolloverButton = inject('SprintService')(
  observer(SprintRolloverButton)
);
export { injectedSprintRolloverButton as SprintRolloverButton };
