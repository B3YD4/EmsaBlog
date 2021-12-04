var express = require('express');
var router = express.Router();
const Blog = require('../models/blogSchema');
const session = require('express-session');

//Tarihi Anlama
const moment = require('moment');
moment().format();

/* GET home page. */
router.get('/', function(req, res, next) {

	Blog.find({}, (err, data) => {
		if(data){
			res.render('index', {veri: data});
		}else{
			res.render('index');
		}
	});

  
});


/* Giriş Yap Sayfası*/
router.get('/giris-yap', (req, res) => {
	res.render('giris');
});

// Admin Safası
router.get('/emsawithadmin', (req, res) => {
	res.render('admin');
});

// Blog Ekleme Sayfası
router.get('/emsawithadmin/blog-ekle', (req, res) => {
	res.render('blog-ekle');
});

// Eklediğimiz Blogları Kaydettiğimiz Kod Parçacığı
router.post('/emsawithadmin/blog-ekle', (req, res) => {
	
	const resim = req.body.resim;
	const baslik = req.body.baslik;
    	const yazi = req.body.yazi;

    	const blog = new Blog({
		resim: resim,
		baslik: baslik,
		yazi: yazi,
		goruntulenme: 0,
		blog_date: moment().format('DD, MMMM, YYYY, k:mm')

    });

    blog.save((err, data) => {
    	if (err) {
    		console.log(err);
    	}else{

    		res.redirect('/emsawithadmin/blog-ekle');
    	}
    });
});

// Blog Silme Sayfası
router.get('/emsawithadmin/blog-sil', (req, res) => {
	res.render('blog-sil');
});

router.post('/emsawithadmin/blog-sil', (req, res) => {
	
	const blog_id = req.body.blog_sil;

	Blog.findByIdAndDelete(blog_id, (err, data) => {
		if(err){
			res.send("<h1><center>Yanlış Blog ID!</center></h1>");

		}else{
			res.redirect('/emsawithadmin/blog-sil');
		}
	});

});

//İstediğimiz Bloga Gittiğimiz Sayfa
router.get('/blog/:id', (req, res) => {

	const id = req.params.id;

	const post = Blog.findOne({ _id: id },(err, data) => {

		if (data == undefined) {
			res.send('Aradığınız Blog Bulunamadı!')
		}else{


			res.render('blog',{resim:data.resim, baslik:data.baslik, yazi:data.yazi, ziyaret: data.goruntulenme, numara:data._id, yorum:data.yorumlar, tarih: data.blog_date});
		}

	});
	
});

router.post('/blog/:id', (req, res) => {

	const id = req.params.id;

	Blog.findOne({_id: id}, (err, data) => { // Burada Blogun IDsi ile Görüntülenme Sayısını Aldık vede Aşağıdaki
											 // Veritabanı Sorgusunda çektiğimiz görüntülenme ile 1 i topladık!


		Blog.findByIdAndUpdate(id,{goruntulenme: data.goruntulenme + 1},(err, data) =>{
			res.redirect('/blog/' + id)
		});

	});

});

// Yorumları Çektiğimiz Sayfa
router.post('/blog/:id/yorum-yap', (req, res) => {

	const id = req.params.id;
	const yorum = req.body.yorum_yorum;
	const isim = req.body.yorum_isim;

	Blog.findByIdAndUpdate(id, {
		$push:{
			yorumlar: 
			{name:isim,message:yorum, tarih: moment().format('DD, MMMM, YYYY, k:mm')}
		}
	},(err, data) => {
		res.redirect('/blog/' + id)
	});

});

router.use((req, res) => {
	res.send("<h1><center>Açık mı Arıyosun Cnm :D");

});


/* KONU SİLME YERİMİZ
router.post('/konu-sil/:id', (req, res) => {

	Blog.findOneAndRemove({ _id: req.params.id }, () => {
		console.log('Silinme İşlemi Başarı ile Tamamlandı! Silinen ID: ' + req.params.id)
	});
});

*/

module.exports = router;
