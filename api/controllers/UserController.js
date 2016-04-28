/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

		index: (req, res, next) => {
			User.find(function(err, users) {
				if (err)
					return next(err);
				return res.view({
					users: users
				})
			});
		},

		new: (req, res) => {
			res.view();
		},

		create: (req, res) => {

			var usuario = {
				name: req.param('name'),
				last_name: req.param('lastname'),
				email: req.param('email'),
				username: req.param('username')
			}

			User.create(usuario, function(err, user) {
				if (err) {
					console.log(err);
					return res.redirect('user/new');
				}
				console.log("todo bien");
				return res.redirect('user/show/' + user.id);
			});
		},

		show: (req, res, next) => {

			User.findOne(req.param('id'), function(err, user) {
				if (err) {
					console.log(err);
					return next(err);
				}
				res.view({
					usuario: user
				});
			});

			console.log('Bienvenido');
		},

		edit: (req, res, next) => {
			User.findOne(req.param('id'), function(err, user) {
				if (err) {
					return next(err);
				}
				res.view({
					user: user
				});
			})
		},

		update: (req, res, next) => {

			var UsuarioModificado = {
				name: req.param('name'),
				last_name: req.param('lastname'),
				email: req.param('email'),
				username: req.param('username')
			}
			User.update(req.param('id'), UsuarioModificado, function(err, user) {
				if (err) {
					req.session.flash = {
						err: err
					}

					return redirect('user/edit' + req.param('id'));
				}

				return res.redirect('user/show/' + req.param('id'));

			})
		},

		delete: (req, res, next) => {
			User.destroy(req.param('id'), function(err) {
				if (err)
					return next(err);

				return res.redirect('user');

			})

		},

		prueba: function (argument) {
			var exec = require('child_process').exec;

			if(typeof exec === 'function') {

				var getClipboard = function(func) {
					  exec('paste > prueba.txt', function(err, stdout, stderr) {
					    if (err || stderr) return func(err || new Error(stderr));
					    func(null, stdout);
					  });
					};

				getClipboard(function(err, text) {
					  if (err) throw err;
					  console.log(text);
				});
			}
			 
		}
		
};