import { Service, Inject, UseContainer } from 'vue-server-typedi'
import { iApp } from '.'
import IDialog from '@/components/dialog/service'
import ITest from '@/components/test/service'
import ITest2 from '@/components/test2/service'

@UseContainer()
@Service()
export default class IApp implements iApp {
  @Inject() dialog!: IDialog
  @Inject() test!: ITest
  @Inject() test2!: ITest2
}