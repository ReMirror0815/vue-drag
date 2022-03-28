import { defineComponent, inject, ref, computed } from 'vue';
import deepcopy from 'deepcopy';


import { useMenuDragger } from './useMenuDragger';
import { useFocus } from './useFocus';
import EditorBlock from './editor-block';
import { useBlockDragger } from './useBlockDragger';

import './editor.scss';

export default defineComponent({
    props: {
        modelValue: { type: Object}
    },
    emits:['update:modelValue'],
    setup(props, ctx) {
        const data = computed({
            get() {
                return props.modelValue
            },
            set(newValue) {
                ctx.emit('update:modelValue', deepcopy(newValue))
            }
        })

        const containerRef = ref(null);



        

        const config = inject('config');

        const {dragStart, dragEnd} = useMenuDragger(containerRef, data);
        const { blockMouseDown, containerMouseDown, focusData } = useFocus(data, (e) => {
            mousedown(e)
        });
        const { mousedown } = useBlockDragger(focusData, data);



        return () => <div class="editor">
            <div class="editor-left">
                {
                    config.componentList.map(component => (
                        <div class="editor-left-item"
                            draggable
                            onDragstart={e => dragStart(e, component)}
                            onDragend={e => dragEnd(e)}
                        >
                            <span>{component.label}</span>
                            <div>{component.preview()}</div>
                        </div>
                    ))
                }
            </div>
            <div class="editor-top"></div>
            <div class="editor-right"></div>
            <div class="editor-container">
                <div class="editor-container-canvas">
                    <div class="editor-container-canvas__content"
                    ref={containerRef}
                    onMousedown={containerMouseDown}
                    >
                    {
                        data.value.blocks.map((block, idx) => (
                            <EditorBlock block={block}
                            onMousedown={(e) => blockMouseDown(e, block, idx)}
                            class={block.focus?"editor-block-focus":''}
                            ></EditorBlock>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
    }
})