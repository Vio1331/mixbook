// Keep a failed script or blocked database from leaving a permanent loading screen.
(() => {
  const retry = document.querySelector('#boot-retry');
  retry?.addEventListener('click', () => location.reload());
  setTimeout(() => {
    const message = document.querySelector('#boot-message');
    if (!message) return;
    message.textContent = '打开时间比预期长。请检查网络，或关闭其他旧版页面后重试。';
    if (retry) retry.hidden = false;
  }, 8000);
})();
