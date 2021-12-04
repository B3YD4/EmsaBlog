$('.blog').slice(0, 8).show();
$('.daha-fazla').on('click', () => {
	$('.blog:hidden').slice(0,8).slideDown();
	if ($('.blog:hidden').length == 0) {
		$('.daha-fazla').fadeOut('slow');
	}
})