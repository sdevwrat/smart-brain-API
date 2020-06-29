const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey : 'eee98fd319354c0781482fdc084189e8'
});

const handleApicall = (req,res) => {
app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err =>res.status(400).json('unable to work with API'))
}

const handleImage=(req,res,db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('not found'))
}

module.exports = {
	handleImage,
	handleApicall
} 