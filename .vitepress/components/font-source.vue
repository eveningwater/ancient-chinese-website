<template>
    <el-popover :title="props?.text" trigger="click" width="300">
        <template #reference>
            <el-text type="primary" size="large" class="cursor-pointer">{{ props?.text }}</el-text>
        </template>
        <div class="pinyin-explain">
            <div class="pinyin">{{ props?.explain?.pinyin }}</div>
            <div class="explain" v-for="(item, index) in props?.explain?.explain" :key="`${item}-${index}`">
                <div>{{ +index + 1 }}.{{ item?.explain }}</div>
                <el-text size="small" v-if="item?.source">内容来源:《{{ item?.source }}》</el-text>
            </div>
            <el-button @click="handleClick(props?.explain?.more)" link style="margin-top:10px;" type="primary">
                查看更多
            </el-button>
        </div>
    </el-popover>
</template>
<script setup lang="ts">
const props = defineProps({
    text: {
        type: String,
        default: ''
    },
    explain: {
        type: Object,
        default: () => ({
            pinyin: '',
            explain: [{
                explain: '',
                source: ''
            }],
            more: ''
        })
    }
})

const openNewWindow = (url: string) => {
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
const handleClick = (url: string) => {
    const baseUrl = window.location.origin;
    const filterUrl = url.includes('../') ? url.replace('../','') : url.includes('./') ? url.replace('./','') : url;
    console.log(filterUrl);
    const lastChar = filterUrl.slice(-2);
    const prevChar = filterUrl.slice(0,filterUrl.length - 2);
    const firstLetter = filterUrl.slice(0,1).toUpperCase();
    const lastUrl = baseUrl.includes('eveningwater.com') ? prevChar + '.html' + lastChar : filterUrl;
    const moreUrl = `${baseUrl}/ancient-chinese-website/docs${filterUrl.includes(firstLetter) ? '' : '/' + firstLetter}/${lastUrl}`;
    console.log(moreUrl);
    openNewWindow(moreUrl);
}
</script>