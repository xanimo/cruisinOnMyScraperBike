module.exports = (app, passport) => {
	require('./view/view')(app, passport);
	require('./api/api')(app, passport);
}