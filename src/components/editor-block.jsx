import { inject, ref, defineComponent, computed, onMounted } from "vue"

export default defineComponent({
    props: {
        block: {type: Object}
    },
    setup(props) {

        const blockRef = ref(null);

        const blockStyles = computed(() => ({
            top: `${props.block.top}px`,
            left: `${props.block.left}px`,
            zIndex: `${props.block.zIndex}`,
            position: 'absolute'
        }))

        const config = inject('config');

        onMounted(() => {
            let { offsetWidth, offsetHeight } = blockRef.value;
            if(props.block.alignCenter) {
                // 说明是拖过来渲染才用的，其他的情况不需要
                props.block.left = props.block.left - offsetWidth / 2;
                props.block.top = props.block.top - offsetHeight / 2;
                props.block.alignCenter = false;
            }
            props.block.width = offsetWidth;
            props.block.height = offsetHeight;
        })

        return () => {
            const component = config.componentMap[props.block.key];
            const RenderComponent = component.render();
            return <div class="editor-block" style={blockStyles.value} ref={blockRef}>
                {RenderComponent}
            </div>
        }
    }
})