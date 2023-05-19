const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/calculatorDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const calculationSchema = new mongoose.Schema({
  num1: Number,
  num2: Number,
  operand: String,
  result: Number,
});

const Calculation = mongoose.model('Calculation', calculationSchema);

const app = express();
app.use(express.json());

app.post('/calculate', async (req, res) => {
  const { num1, num2, operand } = req.body;

  let result;

  switch (operand) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num1 / num2;
      break;
    default:
      return res.status(400).json({ error: 'Invalid operand' });
  }

  const calculation = new Calculation({
    num1,
    num2,
    operand,
    result,
  });

  await calculation.save();

  res.json({ result });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
