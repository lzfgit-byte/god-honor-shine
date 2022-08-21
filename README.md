
ghs

## npm常用命令
npm install --save-dev <PACKAGENAME>
npm install --save <PACKAGENAME>
npm install --production
pnpm install @vuedx/typescript-plugin-vue@latest --save-dev

npm install <package>@<version>
npm install -g webpack@4.16.4

npm view cowsay versions

npm uninstall -S <package-name>

npm uninstall -D <package-name>

npm uninstall -g <package-name>
##git-prefix

| 命令  | 说明 |
|-----|-----|
|build|发布版本;|
|chore|改变构建流程,或者增加依赖;|
|ci|持续集成构建;|
|docs|文档修改;|
|feat|新特性;|
|fix|修改问题;|
|pref|新特性;|
|refactor|代码重构;|
|revert|回滚到上一个版本;|
|style|代码格式修改;|
|test|测试用例修改|




## git 从github克隆失败解决
git config --global http.sslVerify "false"
git config --global http.proxy 127.0.0.1:10808
git config --global https.proxy 127.0.0.1:10808
git config --global --unset http.proxy
git config --global --unset https.proxy
