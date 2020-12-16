import { iTest } from '.'
import { Service, Inject } from 'vue-server-typedi'
import IDialog from '../dialog/service'

@Service()
export default class ITest implements iTest {
  @Inject() private dialog!: IDialog
  open() {
    this.dialog.open('这个弹窗由注入组件1后调用打开')
  }
}