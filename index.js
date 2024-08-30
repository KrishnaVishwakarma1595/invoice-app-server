const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const { Invoice } = require('./models.js');

const app = express();

app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const allowedOrigins = ['http://localhost:3000/', 'https://invoice-app-server-phi.vercel.app/'];

const corsOptions = {
	origin: function (origin, callback) {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			// If the origin is in the allowed list, or if there's no origin (e.g., for curl requests)
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	}
};

app.use(cors(corsOptions));

// routes
app.get('/', (req, res) => {
	// res.write("Server is Running...");
	// res.end();	
	res.sendFile(__dirname + "/views/index.html");
})

app.get('/api/invoices', async (req, res) => {
	try {
		const results = await Invoice.find({});
		if(results.length) res.status(200).json({ message: 'Success!', invoices: results });
		else res.json({ message: 'No invoices!', invoices: [] });
	} catch (error) {
		res.json({ error: error });
	}
})

app.get('/api/invoices/:id', async (req, res) => {
	try {
		const results = await Invoice.find({
			id: req.params.id
		});
		if(results.length) res.status(200).json({ message: 'Success!', invoices: results });
		else res.json({ message: 'No invoices!', invoices: [] });
	} catch (error) {
		res.json({ error: error });
	}
})

app.post('/api/invoices', async (req, res) => {
	try {
		// console.log('req body', req.body);
		const body = req.body;
		const invoice = new Invoice({ ...body });
		const doc = await invoice.save();
		if(!doc) res.json({ message: 'Invoice not generated!' });
		else res.json({ message: 'Invoice generated!', _id: doc._id })
	} catch (error) {
		// console.log('error', error);
		res.json({ error: error });
	}
})

app.post('/api/updateinvoice', async (req, res) => {
	try {
		const result = await Invoice.findByIdAndUpdate(
			{ _id: req.body.id },
			{ ...req.body.invoice },
			{ new: true, runValidators: true }
		);
		if(!result) res.json({ message: 'Invoice not updated!' });
		else res.json({ message: 'Success!', invoice: result._doc });
	} catch (error) {
        res.json({ error: error });
	}
})

app.post('/api/markaspaid', async (req, res) => {
	try {
		const data = await Invoice.findByIdAndUpdate(
			{ _id: req.body.id },
			{  status: 'paid' },
			{ new: true, runValidators: true }
		);
		if(!data) res.json({ message: 'Invoice not marked as paid!' });
		else res.json({ message: 'Success!', invoice: data._doc });
	} catch (error) {
        res.json({ error: error });
	}
})

app.post('/api/removeinvoice', async (req, res) => {
	try {
		const result = await Invoice.findByIdAndDelete({ _id: req.body.id });
		if(result) res.json({ message: 'Success!', removed: true });
        else res.json({ message: result, removed: false });
	} catch (error) {
        res.json({ error: error });
	}
})

app.listen(process.env.PORN || 3001, () => {
	console.log('app is listening on port ' + process.env.PORT || 3001);
})