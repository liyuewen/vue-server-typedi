import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import IApp from './service'
import DialogComponent, { iDialog } from '../components/dialog'
import TestComponent, { iTest } from '@/components/test'
import Test2Component, { iTest2 } from '@/components/test2'

export interface iApp {
  dialog: iDialog
  test: iTest
  test2: iTest2
}

@Component
export default class App extends Vue {
  service: iApp = new IApp
  render() {
    return <div>
      <DialogComponent service={this.service.dialog}></DialogComponent>
      <div>演示注入弹窗到组件1 组件2</div>
      <div>
        <TestComponent service={this.service.test} />
      </div>
      <div>
        <Test2Component service={this.service.test2} />
      </div>
    </div>
  }
}