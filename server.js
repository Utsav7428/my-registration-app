// index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/yogaClasses', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const participantSchema = new mongoose.Schema({
  name: String,
  Lname: String,
  age: Number,
  email: String,
  Batch: String,
  gender: String,
  paymentStatus: Boolean,
});

const Participant = mongoose.model('Participant', participantSchema);

app.use(bodyParser.json());

// Create a new participant
app.post('/api/participants', async (req, res) => {
  try {
    const { name, Lname, age, email, Batch, gender } = req.body;

    // Basic validation
    if (!name || !Lname || !age || !email || !Batch || !gender) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Age validation
    if (age < 18 || age > 65) {
      return res.status(400).json({ error: 'Age must be between 18 and 65' });
    }

    // Check if participant already enrolled for the month
    const existingParticipant = await Participant.findOne({ name, Lname, paymentStatus: true });
    if (existingParticipant) {
      return res.status(400).json({ error: 'Participant already enrolled for the month' });
    }

    // Save data to the database
    const participant = new Participant({
      name,
      Lname,
      age,
      email,
      Batch,
      gender,
      paymentStatus: false,
    });
    await participant.save();

    // Mock payment processing (CompletePayment function)
    // Assume payment is successful
    const paymentResponse = { success: true };

    // Update payment status based on payment response
    if (paymentResponse.success) {
      await Participant.updateOne({ name, Lname, paymentStatus: false }, { paymentStatus: true });
      res.json({ success: true, message: 'Enrollment successful' });
    } else {
      res.json({ success: false, message: 'Payment failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all participants
app.get('/api/participants', async (req, res) => {
  try {
    const participants = await Participant.find();
    res.json(participants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific participant by ID
app.get('/api/participants/:id', async (req, res) => {
  try {
    const participant = await Participant.findById(req.params.id);
    if (!participant) {
      return res.status(404).json({ error: 'Participant not found' });
    }
    res.json(participant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
