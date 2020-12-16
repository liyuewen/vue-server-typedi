# vue-server-typedi

## Usage

1. Install module:

`npm install vue-server-typedi --save`

3. in tsconfig.json:

```json
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

## Example

```ts
/*在子组件*/

import { Inject, Service, UseContainer } from 'vue-server-typedi';

@Service()
export class MyTest implements myTest {
  public name: string = '11'
}

export interface myTest {
  name: string
}

@Service()
export default class MyTestView extends Vue {

  $props!: {
    server: myTest
  }

  @Prop() readonly server!: myTest

  render() {
    return (
      <div>{this.server.name}</div>
    )
  }

}

```

```ts


import { Inject, Service, UseContainer } from 'vue-server-typedi';
import MyTestView, { MyTest } from './MyTest';

@UseContainer()
@Service()
export default class MyServer {

  @Inject()
  public MyTest!: MyTest;

}


@Component
export default class MyComponent extends Vue {

  public server: MyServer = new MyServer()

  render(){

    return(
      <MyTestView server={this.server.MyTest} />
    )

  }

}

```
