import {
  ListItem,
  ListItemIcon,
  Icon,
  ListItemText,
  Checkbox
} from "@material-ui/core";

interface Props {
  todo: Todo;
  sprint?: Sprint;
  isAddedToMyDay: boolean;
}

export const Todo = (props: Props) => {
  const secondaryText = props.sprint
    ? props.sprint.name
    : props.isAddedToMyDay
      ? "My Day"
      : null;
  return (
    <ListItem button disableRipple>
      <ListItemIcon>
        <Checkbox
          icon={<Icon>check_circle_outline</Icon>}
          checkedIcon={<Icon>check_circle</Icon>}
          checked={props.todo.status === "complete"}
        />
      </ListItemIcon>
      <ListItemText primary={props.todo.title} secondary={secondaryText} />
    </ListItem>
  );
};
