import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Dialog } from 'element-ui'

export interface iDialog {
  visible: boolean
  msg: string
}

@Component
export default class DialogComponent extends Vue {
  $props!: {
    service: iDialog
  }
  @Prop() service!: iDialog
  protected render() {
    return <Dialog
      title="我是弹窗"
      visible={this.service.visible}
      on={{
        'update:visible': (visible: boolean) => this.service.visible = visible
      }}
    >
      弹窗消息: {this.service.msg}
    </Dialog>
  }
}