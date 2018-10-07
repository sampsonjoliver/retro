import * as React from 'react';

import { SprintService as SprintServiceType } from '../services/sprint';
import { Icon, Button, Tooltip, IconButton } from '@material-ui/core';
import { inject, observer } from 'mobx-react';

interface Props {
  SprintService?: SprintServiceType;
  isCurrentSprintEnded: boolean;
}

const SprintRolloverButton = (props: Props) => {
  const { SprintService, isCurrentSprintEnded } = props;

  return (
    <Tooltip id="tooltip" title="Click the things to rollover the sprint">
      <IconButton onClick={() => SprintService!.rolloverSprint()}>
        <Icon color={isCurrentSprintEnded ? 'secondary' : 'default'}>loop</Icon>
      </IconButton>
    </Tooltip>
  );
};

const injectedSprintRolloverButton = inject('SprintService')(
  observer(SprintRolloverButton)
);
export { injectedSprintRolloverButton as SprintRolloverButton };
