export default function (/** @type {import('plop').NodePlopAPI} */plop) {
  plop.setGenerator('userscript', {
    description: '用户脚本模板生成器',
    prompts: [{
      type: 'input',
      name: 'name',
      message: '用户脚本的名字: ',
    }],
    actions: ({ name }) => {
      return [
        {
          type: 'addMany',
          destination: 'packages/{{name}}',
          templateFiles: 'templates/*',
          data: { name },
        },
        {
          type: 'add',
          path: 'packages/{{name}}/dist/{{name}}.user.js',
          template: '',
        },
        {
          type: 'modify',
          path: 'README.md',
          pattern: '<!-- add new userscript row here -->',
          template: '| \[<img src="" height="16px" \/>\](.) | \[{{pascalCase name}}\](packages\/{{name}}) | - | **\[安装\](https:\/\/fastly.jsdelivr.net\/gh\/asadahimeka\/userscripts@master\/packages\/{{name}}\/dist\/{{name}}.user.js)** |\n<!-- add new userscript row here -->',
        },
      ]
    },
  })
}
