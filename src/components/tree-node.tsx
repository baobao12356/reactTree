import React from "react";
import { TreeData } from "../typings";
import file from "../assets/file.png";
import closedFolder from "../assets/closed-folder.png";
import openedFolder from "../assets/opened-folder.png";
import loadingSrc from "../assets/loading.gif";
interface Collapse {
  (key: string): void;
}
interface Props {
  //接口类型，可以用来装饰或者 说约束 组件属性对象
  data: TreeData;
  onCollapse: Collapse;
  onCheck: Collapse;
  setFromNode: any;
  onMove: any;
}
class TreeNode extends React.Component<Props> {
  treeNodeRef: React.RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);
    this.treeNodeRef = React.createRef();
  }
  componentDidMount() {
    this.treeNodeRef.current.addEventListener(
      "dragstart",
      (event: DragEvent): void => {
        this.props.setFromNode(this.props.data);
        event.stopPropagation();
      },
      false
    ); //useCapture=false
    this.treeNodeRef.current.addEventListener(
      "dragenter",
      (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
      },
      false
    );
    this.treeNodeRef.current.addEventListener(
      "dragover",
      (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
      },
      false
    );
    this.treeNodeRef.current.addEventListener(
      "drop",
      (event: DragEvent) => {
        event.preventDefault();
        this.props.onMove(this.props.data);
        event.stopPropagation();
      },
      false
    );
  }
  render() {
    let {
      data: { name, children, key, collapsed, checked, loading },
      onCollapse,
      onCheck
    } = this.props;
    let caret = null; //打开关闭的小箭头
    let icon = null; //图标
    if (children) {
      //如果children有值
      if (children.length > 0) {
        //   caret-right 关闭箭头
        // caret-down打开箭头
        caret = (
          <span
            className={`collapse ${collapsed ? "caret-right" : "caret-down"}`}
            onClick={() => onCollapse(key)}
          ></span>
        );
        icon = collapsed ? closedFolder : openedFolder; //关闭和打开的文件
      } else {
        caret = null;
        // 文件图标
        icon = file;
      }
    } else {
      //没有children属性 //加数据，，，
      caret = loading ? (
        <img
          src={loadingSrc}
          className="collapse"
          style={{ width: 14, top: "50%", marginTop: -7 }}
        />
      ) : (
        <span
          className={`collapse caret-right`}
          onClick={() => onCollapse(key)}
        ></span>
      );
      icon = closedFolder; //关闭的文件夹
    }
    return (
      <div className="tree-node" draggable={true} ref={this.treeNodeRef}>
        <div className="inner">
          {caret}
          <span className="content">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onCheck(key)}
            />
            <img style={{ width: 20 }} src={icon} />
            {name}
          </span>
        </div>
        {children && children.length > 0 && !collapsed && (
          <div className="children">
            {children.map((item: TreeData) => (
              <TreeNode
                onCollapse={this.props.onCollapse}
                data={item}
                onCheck={onCheck}
                key={item.key}
                setFromNode={this.props.setFromNode}
                onMove={this.props.onMove}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
export default TreeNode;
