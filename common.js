const watchIframe = (iframe, resolve, time = 1000) => {
  let timer = null;
  const handler = function () {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    if (["complete", "interactive"].indexOf(iframeDoc.readyState) > -1) {
      document.body.removeChild(iframe);
      if (timer) clearTimeout(timer);
      resolve("success");
    } else {
      timer = setTimeout(handler, time);
      resolve("downloading");
    }
  };
  handler();
};
window.onload = () => {
    const iframeEleNodes = document.querySelectorAll('.iframe');
    console.log(1111, iframeEleNodes);
    if(iframeEleNodes.length){
        iframeEleNodes.forEach(node => {
            watchIframe(node, (res) => {
                if(res ==='success'){
                   node.style.height = node.contentWindow.document.body.scrollHeight + 'px';
                }
            })
        })
    }
};
