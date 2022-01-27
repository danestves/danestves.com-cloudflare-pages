// Dependencies
import * as React from 'react';
import Portal from '@reach/portal';
import { useTooltip } from '@reach/tooltip';
import clsx from 'clsx';
import type { Position, TooltipPopupProps } from '@reach/tooltip';

// Internal
import { TooltipArrow, TooltipContent } from './styles';

const centered: Position = (triggerRect, tooltipRect) => {
  const triggerCenter =
    Number(triggerRect?.left) + Number(triggerRect?.width) / 2;
  const left = triggerCenter - Number(tooltipRect?.width) / 2;
  const maxLeft = window.innerWidth - Number(tooltipRect?.width) - 2;
  return {
    left: Math.min(Math.max(2, left), maxLeft) + window.scrollX,
    top: Number(triggerRect?.bottom) + 8 + window.scrollY,
  };
};

type TooltipProps = Omit<TooltipPopupProps, 'triggerRect'> & {
  arrow?: {
    className?: string;
  };
  className?: string;
  'data-side'?: 'top' | 'bottom' | 'left' | 'right';
  triggerRect?: DOMRect | null;
};

const Tooltip = ({
  arrow,
  children,
  'data-side': dataSide = 'bottom',
  ...props
}: TooltipProps): JSX.Element => {
  let [trigger, tooltip] = useTooltip();

  let { isVisible, triggerRect } = tooltip;

  return (
    <React.Fragment>
      {React.cloneElement(children as any, trigger)}

      {isVisible && (
        // The Triangle. We position it relative to the trigger, not the popup
        // so that collisions don't have a triangle pointing off to nowhere.
        // Using a Portal may seem a little extreme, but we can keep the
        // positioning logic simpler here instead of needing to consider
        // the popup's position relative to the trigger and collisions
        <Portal>
          <TooltipArrow
            $left={
              (triggerRect && triggerRect.left - 10 + triggerRect.width / 2) ||
              0
            }
            $top={(triggerRect && triggerRect.bottom + window.scrollY) || 0}
            className={clsx(
              'absolute h-0 w-0 border-[10px] border-t-0 border-solid border-l-transparent border-r-transparent',
              arrow?.className
            )}
            data-side={dataSide}
          />
        </Portal>
      )}

      <TooltipContent
        {...tooltip}
        {...props}
        data-side={dataSide}
        position={centered}
        triggerRect={triggerRect}
      />
    </React.Fragment>
  );
};

export { Tooltip };
