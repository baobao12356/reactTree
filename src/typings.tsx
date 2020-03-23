//声明一个接口，名字叫TreeData ,定义一个变量的类型，定义对象的属性名和属性的类型 
export interface TreeData {
    name: string;
    key: string;
    type: string;
    collapsed: boolean;
    children?: TreeData[],//?:表示可选属性，可以给也可以不给
    parent?: TreeData;
    checked?: boolean;//是否选中
    loading?: boolean//是否正在加载中
}