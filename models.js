const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const AddressSchema = new mongoose.Schema({
    street: { type: String },
    city: { type: String },
    postCode: { type: String },
    country: { type: String }
})

const ItemsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true }
})

const invoiceSchema = new mongoose.Schema({
    id: { type: String, required: true },
    paymentDue: { type: String, required: true },
    description: { type: String, required: true },
    paymentTerms: { type: Number, default: 1 },
    clientName: { type: String, required: true },
    clientEmail: { type: String },
    senderAddress: AddressSchema,
    clientAddress: AddressSchema,
    items: [ItemsSchema] || [],    
    status: {
        type: String,
        enum: ['draft', 'pending', 'paid'],
        default: 'draft'
    },
    total: { type: Number, required: true },
    createdAt: { type: String, default: new Date().toISOString().substring(0, 10) },
})

const InvoiceModel = mongoose.model('invoices', invoiceSchema);

exports.Invoice = InvoiceModel;