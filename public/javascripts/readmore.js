let container = document.getElementById('blog-container').childElementCount;;

for (let i = 0; i < container; i++) {

	let yazi = document.getElementsByClassName('blog-aciklama')[i].innerHTML;

	let result = yazi.substring(0, 170);

	document.getElementsByClassName('blog-aciklama')[i].innerHTML = result + "...";
}



