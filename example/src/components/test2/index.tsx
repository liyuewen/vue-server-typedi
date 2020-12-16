import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Button } from 'element-ui'

export interface iTest2 {
  open(): void
}

@Component
export default class Test2Component extends Vue {
  $props!: {
    service: iTest2
  }
  @Prop() service!: iTest2
  protected render() {
    return <div style="margin-top: 20px;">
      <div>我是组件2</div>
      <Button onclick={() => this.service.open()} size='mini' type='primary'>打开注入的弹窗</Button>
    </div>
  }
}