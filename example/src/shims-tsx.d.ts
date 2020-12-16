import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {

    interface ElementAttributesProperty {
      $props: any
    }
    interface IntrinsicAttributes {
      on?: any
      vModel?: any
      vShow?: boolean
      value?: any
      oninput?: Function
      nativeOnClick?: (event: MouseEvent) => void
      oncontextmenu?: (event: MouseEvent) => void
      onmouseup?: (event: MouseEvent) => void
      onclick?: (event: MouseEvent) => void
      onclick_prevent?: (event: MouseEvent) => void
      ref?: string
      key?: string | number
      class?: string | string[]
      slot?: string
      style?: Partial<CSSStyleDeclaration> | string | object | object[]
    }
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
