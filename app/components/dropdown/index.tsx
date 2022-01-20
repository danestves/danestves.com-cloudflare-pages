// Dependencies
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

// Internals
import { StyledContent } from './styles';

export const Dropdown = (
  props: DropdownMenuPrimitive.DropdownMenuProps
): JSX.Element => {
  return <DropdownMenuPrimitive.Root {...props} />;
};

Dropdown.Trigger = DropdownMenuPrimitive.Trigger;
Dropdown.Content = StyledContent;
Dropdown.Label = DropdownMenuPrimitive.Label;
Dropdown.Item = DropdownMenuPrimitive.Item;
Dropdown.Group = DropdownMenuPrimitive.Group;

export { Dropdown as default };
