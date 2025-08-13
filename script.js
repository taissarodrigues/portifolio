<script>
  function toggleMenu(){
    const wrap = document.querySelector('#hamburguer-nav');
    if(!wrap) return;
    const menu = wrap.querySelector('.menu-links');
    const icon = wrap.querySelector('.hamburguer-icon');
    menu.classList.toggle('open');
    icon.classList.toggle('open');
  }
</script>
