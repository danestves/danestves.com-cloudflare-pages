// Dependencis
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { ClientOnly } from 'remix-utils';

const Switch = (props: SwitchPrimitive.SwitchProps): JSX.Element => {
  return <ClientOnly>{() => <SwitchPrimitive.Root {...props} />}</ClientOnly>;
};

export { Switch };
