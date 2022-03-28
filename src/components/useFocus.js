import { computed } from "vue";


export function useFocus(data, callback) {

    const focusData = computed(() => {
        let focus = [];
        let unfocused = [];
        data.value.blocks.forEach(block => (block.focus ? focus : unfocused).push(block));
        return {focus, unfocused}
    })

    const blockMouseDown = (e, block, idx) => {
        // block 上我们规划一个属性，focus 获取焦点后
        // 就将 focus 变为 true
        e.preventDefault();
        e.stopPropagation();
        if(e.shiftKey) {
            if(focusData.value.focus.length <= 1) {
                block.focus = true;
            } else {
                block.focus = !block.focus;
            }
        } else {
            if(!block.focus) {
                clearBlockFocus();
                block.focus = true;
            }
        }

        callback(e);
    }

    const clearBlockFocus = () => data.value.blocks.forEach(b => b.focus = false)
    
    const containerMouseDown = () => {
        clearBlockFocus();
    }

    return {
        blockMouseDown,
        containerMouseDown,
        focusData
    }
}