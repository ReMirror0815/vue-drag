import { ElButton, ElInput } from 'element-plus';

// 物料库的创建
function createEditorConfig() {
    //闭包
    const componentList = [];
    const componentMap = {};

    return {
        // 注册函数，用于注册组件
        register: (component) => {
            componentList.push(component);
            componentMap[component.key] = component;
        },
        componentMap,
        componentList
    }
}

export const registerConfig = createEditorConfig();

registerConfig.register({
    label: "文本",
    preview: () => "预览文本",
    render: () => "渲染文本",
    key:'text'
})

registerConfig.register({
    label: "按钮",
    preview: () => <ElButton>预览按钮</ElButton>,
    render: () => <ElButton>渲染按钮</ElButton>,
    key:'button'
})

registerConfig.register({
    label: "输入框",
    preview: () => <ElInput placeholder="预览输入框"></ElInput>,
    render: () => <ElInput placeholder="渲染输入框"></ElInput>,
    key:'input'
})