// Dependencies
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

// Internals
import { StyledArrow, StyledContent } from './styles';

const Tooltip = (props: TooltipPrimitive.TooltipProps): JSX.Element => {
  return <TooltipPrimitive.Root {...props} />;
};
Tooltip.Arrow = StyledArrow;
Tooltip.Content = StyledContent;
Tooltip.Trigger = TooltipPrimitive.Trigger;

export { Tooltip };
