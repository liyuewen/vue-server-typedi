import { iTest2 } from '.'
import { Service, Inject } from 'vue-server-typedi'
import IDialog from '../dialog/service'

@Service()
export default class ITest2 implements iTest2 {
  @Inject() private dialog!: IDialog
  open() {
    this.dialog.open('这个弹窗由注入组件2后调用打开')
  }
}