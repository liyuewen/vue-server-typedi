declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'element-ui' {
  const Dialog: VueComponent<{
    visible: boolean
    title?: string
  }>
  const Button: VueComponent<{
    size?: 'medium' | 'small' | 'mini'
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
  }>
  export {
    Dialog,
    Button
  }
}