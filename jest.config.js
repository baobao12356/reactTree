module.exports = {
    verbose: true,//显示详细信息
    clearMocks: true,//清除mocks
    collectCoverage: true,//收集测试覆盖率信息
    reporters: ["default", "jest-junit"], //报告器
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    moduleDirectories: ['node_modules'], //从哪找文件？
    transform: {//如果模块是以.tsx结尾的话,需要用ts-jest进行转译 
        '^.+\\.tsx?$': "ts-jest"
    },
    //表示要进行单元测试的正则匹配  __test__文件下的 或者test|spec开头的以他结尾jsx|tsx的文件
    testRegex: '(/__test__/.*|(test|spec)\\.(jsx|tsx))$'
}