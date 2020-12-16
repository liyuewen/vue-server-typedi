export default class IDialog implements IDialog {
  visible = false
  msg = ''
  open(msg: string) {
    this.msg = msg
    this.visible = true
  }
}