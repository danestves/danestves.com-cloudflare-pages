export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type Prefer<P, T> = P & Omit<T, keyof P>

export type ElementPropsWithoutRef<T extends React.ElementType> = Pick<
  React.ComponentPropsWithoutRef<T>,
  keyof React.ComponentPropsWithoutRef<T>
>

export type OverwritableType<OwnProps, Type extends React.ElementType> = Prefer<
  OwnProps,
  ElementPropsWithoutRef<Type>
>
