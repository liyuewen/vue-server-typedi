type Class<T> = new () => T
type VueComponent<Props> = Class<{ $props: Props | { props: Props } }>
