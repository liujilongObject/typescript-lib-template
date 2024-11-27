export interface LibOptions {
  timeout?: number
}

export class JsLib {
  private timeout: number

  constructor(options: LibOptions = {}) {
    this.timeout = options.timeout ?? 5000
  }

  public invoke(): Promise<any> {
    return new Promise((resolve) => {
      // 基础实现
      console.log(this.timeout, 'this.timeout')
      resolve('示例返回')
    })
  }
}

export const testFnArrow = () => {
  console.log('testFnArrow')
}
