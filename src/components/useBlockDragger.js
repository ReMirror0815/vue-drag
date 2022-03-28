
export function useBlockDragger(focusData, data) {

    let dragState = {
        startX: 0,
        startY: 0,
        dragging: false
    }

    const mousedown = (e) => {
        // 记录当前的状态
        dragState = {
            startX: e.clientX,
            startY: e.clientY,
            startPos: focusData.value.focus.map(({top, left}) => ({top, left}))
        }

        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
    }

    const mousemove = (e) => {
        let { clientX, clientY } = e;
        if(!dragState.dragging) {
            dragState.dragging = true;
        }
        // 计算当前的最新的值
        let durX = clientX - dragState.startX;
        let durY = clientY - dragState.startY;

        focusData.value.focus.forEach((block, idx) => {
            block.top = dragState.startPos[idx].top + durY;
            block.left = dragState.startPos[idx].left + durX;
        })
    }

    const mouseup = () => {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
        if(dragState.dragging) {
            dragState.dragging = false;
        }
    }

    return {
        mousedown
    }
}