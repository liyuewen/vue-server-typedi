import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Button } from 'element-ui'

export interface iTest {
  open(): void
}

@Component
export default class TestComponent extends Vue {
  $props!: {
    service: iTest
  }
  @Prop() service!: iTest
  protected render() {
    return <div style="margin-top: 20px;">
      <div>我是组件1</div>
      <Button onclick={() => this.service.open()} size='mini' type='primary'>打开注入的弹窗</Button>
    </div>
  }
}