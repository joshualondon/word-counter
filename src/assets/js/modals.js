// modals
$('.button--security').on('click', function() {
	$('body').addClass('modal-active');
	$('.modal.security-statement').addClass('is-active');
});

$('.button--close-modal').on('click', function() {
	$('body').removeClass('modal-active');
	$('.modal').removeClass('is-active');
});
